import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { COURRIEL } from "@/components/marketing/coordonnees";

/**
 * Route serveur du formulaire de contact.
 *
 * Remplace l'ancien `mailto:` (voir l'historique de `FenetreContact.tsx`) :
 * ici l'envoi est réel, vérifié par reCAPTCHA v3 et journalisé côté serveur
 * en cas d'échec.
 */

const LIMITE_MESSAGE = 5000;

const RATE_LIMIT_FENETRE_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

/**
 * Compteur en mémoire, par IP — pas de Redis en place, et le déploiement
 * Coolify actuel tourne sur une seule instance. Insuffisant si l'app est un
 * jour répliquée, mais évite qu'un script épuise le quota SMTP ou fasse
 * blacklister le domaine d'envoi.
 */
const compteurParIp = new Map<string, { count: number; resetAt: number }>();

function ipDepassee(request: Request): boolean {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "inconnue";
  const maintenant = Date.now();
  const entree = compteurParIp.get(ip);

  if (!entree || entree.resetAt <= maintenant) {
    compteurParIp.set(ip, {
      count: 1,
      resetAt: maintenant + RATE_LIMIT_FENETRE_MS,
    });
    return false;
  }

  entree.count += 1;
  return entree.count > RATE_LIMIT_MAX;
}

type Corps = {
  nom?: string;
  courriel?: string;
  sujet?: string;
  message?: string;
  /** Provenance facultative (ex. « exploration » depuis /mines). */
  source?: string;
  recaptchaToken?: string;
};

/**
 * Longueurs maximales acceptées, vérifiées avant tout traitement du contenu.
 *
 * 254 pour l'adresse : c'est le maximum d'une adresse de courriel selon la
 * RFC 5321. Les autres bornes sont larges — elles n'existent pas pour
 * contraindre un visiteur, mais pour qu'aucun champ public n'arrive sans
 * limite jusqu'au moteur d'expressions régulières ou jusqu'au serveur SMTP.
 */
const LIMITES = {
  nom: 200,
  courriel: 254,
  sujet: 200,
  message: LIMITE_MESSAGE,
} as const;

/**
 * Même règle que côté client — revalidée ici, un client ne doit jamais faire
 * foi seul.
 *
 * L'ordre compte : la longueur est vérifiée **avant** l'expression régulière.
 * `[^\s@]` accepte le point, donc dans `[^\s@]+\.[^\s@]+$` le moteur a
 * plusieurs découpages possibles et les essaie tous quand l'adresse ne
 * correspond pas — coût quadratique en la longueur. Cette fonction s'exécute
 * avant la vérification reCAPTCHA, sur une route publique : sans borne, une
 * seule requête portant une chaîne de quelques centaines de milliers de
 * caractères bloquait la boucle d'événements, et le compteur par IP
 * (5 requêtes / 10 min, en mémoire, une seule instance) n'y suffisait pas.
 * Sous 254 caractères, le pire cas est négligeable.
 */
function champsInvalides(corps: Corps): string[] {
  const invalides: string[] = [];

  const nom = corps.nom?.trim() ?? "";
  if (!nom || nom.length > LIMITES.nom) invalides.push("nom");

  const courriel = corps.courriel?.trim() ?? "";
  if (
    !courriel ||
    courriel.length > LIMITES.courriel ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(courriel)
  ) {
    invalides.push("courriel");
  }

  const sujet = corps.sujet?.trim() ?? "";
  if (!sujet || sujet.length > LIMITES.sujet) invalides.push("sujet");

  const message = corps.message?.trim() ?? "";
  if (!message || message.length > LIMITES.message) invalides.push("message");

  return invalides;
}

/**
 * Vérifie le jeton reCAPTCHA v3 auprès de Google.
 *
 * Seuil de score à 0.5 : la valeur par défaut recommandée par Google entre
 * « probablement humain » et « probablement robot ». `action` doit
 * correspondre à celle déclarée côté client (`contact`), sinon un jeton
 * valide obtenu ailleurs sur le site pourrait être rejoué ici.
 */
async function recaptchaValide(token: string | undefined): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!token || !secret) return false;

  const reponse = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    },
  );
  const donnees = await reponse.json();
  return (
    donnees.success === true &&
    (donnees.score ?? 0) >= 0.5 &&
    donnees.action === "contact"
  );
}

/** Un seul transporteur réutilisé entre les requêtes plutôt que reconnecté à chaque envoi. */
let transporteur: nodemailer.Transporter | null = null;

function obtenirTransporteur() {
  if (!transporteur) {
    transporteur = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  return transporteur;
}

export async function POST(request: Request) {
  if (ipDepassee(request)) {
    return NextResponse.json(
      { ok: false, erreur: "Trop de tentatives. Réessayez plus tard." },
      { status: 429 },
    );
  }

  let corps: Corps;
  try {
    corps = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, erreur: "Requête invalide." },
      { status: 400 },
    );
  }

  const invalides = champsInvalides(corps);
  if (invalides.length > 0) {
    return NextResponse.json(
      { ok: false, erreur: "Champs invalides.", champs: invalides },
      { status: 400 },
    );
  }

  if (!(await recaptchaValide(corps.recaptchaToken))) {
    return NextResponse.json(
      { ok: false, erreur: "Vérification anti-robot échouée." },
      { status: 400 },
    );
  }

  // Provenance : facultative, bornée, et confinée au corps texte (aucun
  // en-tête), donc pas de risque d'injection. Absente sur un envoi ordinaire.
  const source = corps.source?.trim().slice(0, 60);
  const ligneSource = source ? `Provenance : ${source}\n` : "";

  try {
    await obtenirTransporteur().sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: COURRIEL,
      // Répondre au courriel part directement chez le visiteur, pas besoin
      // de recopier son adresse à la main.
      replyTo: corps.courriel,
      subject: `[Site] ${corps.sujet}`,
      text: `Nom : ${corps.nom}\nCourriel : ${corps.courriel}\n${ligneSource}\n${corps.message}`,
    });
  } catch (erreur) {
    console.error("Échec de l'envoi du courriel de contact :", erreur);
    return NextResponse.json(
      { ok: false, erreur: "L'envoi a échoué. Réessayez plus tard." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
