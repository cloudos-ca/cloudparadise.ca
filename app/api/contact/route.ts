import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { COURRIEL } from "@/components/marketing/coordonnees";
import { empreinteIp, jetonValide } from "@/lib/jetonContact";

/**
 * Route serveur du formulaire de contact.
 *
 * Remplace l'ancien `mailto:` (voir l'historique de `FenetreContact.tsx`) :
 * ici l'envoi est réel, filtré sans tiers (champ piège, jeton horodaté signé,
 * limite de débit par empreinte d'IP — voir `lib/jetonContact.ts`) et
 * journalisé côté serveur en cas d'échec.
 */

const LIMITE_MESSAGE = 5000;

const RATE_LIMIT_FENETRE_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

/**
 * Garde-fou de taille de la table, pas une règle de débit.
 *
 * La purge ci-dessous suffit en régime normal ; ce plafond n'existe que pour
 * le cas pathologique d'une avalanche d'IP distinctes dans une même fenêtre,
 * où la table grossirait plus vite qu'elle n'expire.
 */
const RATE_LIMIT_ENTREES_MAX = 10_000;

/**
 * Compteur en mémoire, indexé par EMPREINTE d'IP — jamais par l'adresse elle-
 * même. Pas de Redis en place, et le déploiement Coolify actuel tourne sur une
 * seule instance. Insuffisant si l'app est un jour répliquée, mais évite qu'un
 * script épuise le quota SMTP ou fasse blacklister le domaine d'envoi.
 *
 * Rétention : une entrée vit au plus la durée de sa fenêtre, soit dix minutes.
 * Rien n'est écrit sur disque, et les soumissions rejetées ne sont pas
 * journalisées. C'est ce qui tient en une phrase dans la politique de
 * confidentialité.
 */
const compteurs = new Map<string, { count: number; resetAt: number }>();

/**
 * Retire les entrées expirées à chaque requête.
 *
 * Sans ça, une entrée n'était nettoyée que si la même source revenait : la
 * table grossissait indéfiniment et gardait des traces bien au-delà de la
 * fenêtre utile. Balayage O(n) sur une table qui compte quelques dizaines
 * d'entrées — le coût est sans commune mesure avec un envoi SMTP.
 */
function purger(maintenant: number): void {
  for (const [cle, entree] of compteurs) {
    if (entree.resetAt <= maintenant) compteurs.delete(cle);
  }
  if (compteurs.size > RATE_LIMIT_ENTREES_MAX) compteurs.clear();
}

function debitDepasse(request: Request): boolean {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "inconnue";
  const maintenant = Date.now();

  purger(maintenant);

  const cle = empreinteIp(ip);
  const entree = compteurs.get(cle);

  if (!entree || entree.resetAt <= maintenant) {
    compteurs.set(cle, {
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
  /** Jeton horodaté signé, posé dans la page rendue. */
  jeton?: string;
  /** Champ piège : vide chez un humain, rempli par un robot qui remplit tout. */
  piege?: string;
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
 * sur une route publique : sans borne, une seule requête portant une chaîne de
 * quelques centaines de milliers de caractères bloquait la boucle d'événements,
 * et le compteur par source (5 requêtes / 10 min, en mémoire, une seule
 * instance) n'y suffisait pas. Sous 254 caractères, le pire cas est négligeable.
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

/** Un seul transporteur réutilisé entre les requêtes plutôt que reconnecté à chaque envoi. */
let transporteur: nodemailer.Transporter | null = null;

function obtenirTransporteur() {
  if (!transporteur) {
    const port = Number(process.env.SMTP_PORT ?? 465);

    transporteur = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      // 465 chiffre dès la poignée de main ; les autres ports partent en clair
      // et montent en TLS via STARTTLS.
      secure: port === 465,
      // Sur ces ports-là, exiger STARTTLS plutôt que l'espérer : sans ça,
      // nodemailer poursuit en clair si le serveur ne l'annonce pas, et le mot
      // de passe part sur le réseau en clair avec le message.
      requireTLS: port !== 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  return transporteur;
}

export async function POST(request: Request) {
  if (debitDepasse(request)) {
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

  // Champ piège rempli : c'est un robot. On répond comme si tout s'était bien
  // passé — un rejet explicite lui apprendrait quel champ éviter au prochain
  // essai. Rien n'est envoyé, rien n'est journalisé.
  if (corps.piege?.trim()) {
    return NextResponse.json({ ok: true });
  }

  const invalides = champsInvalides(corps);
  if (invalides.length > 0) {
    return NextResponse.json(
      { ok: false, erreur: "Champs invalides.", champs: invalides },
      { status: 400 },
    );
  }

  // Statut distinct du 400 : ici la saisie est bonne, c'est le jeton de page
  // qui manque, a expiré, ou est arrivé trop vite. Le client peut donc dire au
  // visiteur de recharger plutôt que de le laisser corriger un champ correct.
  if (!jetonValide(corps.jeton)) {
    return NextResponse.json(
      { ok: false, erreur: "Session expirée." },
      { status: 403 },
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
  } catch (error_) {
    // Seule variable anglaise du fichier : pour un paramètre de `catch`,
    // l'analyse statique n'accepte que `error` ou un nom finissant par
    // `Error`. Le reste du code demeure francisé, y compris la clé `erreur`
    // de la réponse JSON quelques lignes plus bas.
    //
    // Le message seul, pas l'objet : une erreur nodemailer transporte
    // l'enveloppe, donc l'adresse du visiteur, et les journaux du serveur ne
    // sont pas l'endroit où la conserver.
    console.error(
      "Échec de l'envoi du courriel de contact :",
      error_ instanceof Error ? error_.message : "cause inconnue",
    );
    return NextResponse.json(
      { ok: false, erreur: "L'envoi a échoué. Réessayez plus tard." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
