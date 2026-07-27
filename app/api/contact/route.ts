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

/** Même règle que côté client — revalidée ici, un client ne doit jamais faire foi seul. */
function champsInvalides(corps: Corps): string[] {
  const invalides: string[] = [];
  if (!corps.nom?.trim()) invalides.push("nom");
  if (
    !corps.courriel?.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(corps.courriel.trim())
  ) {
    invalides.push("courriel");
  }
  if (!corps.sujet?.trim()) invalides.push("sujet");
  if (!corps.message?.trim() || corps.message.length > LIMITE_MESSAGE) {
    invalides.push("message");
  }
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
