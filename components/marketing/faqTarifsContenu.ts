import { DUREES, ESSAI_JOURS, GARANTIE_DUREE_MIN, GARANTIE_JOURS, PALIERS, enDevise } from "./offre";
import type { Lang } from "./tokens";

const [PERSONNEL, ENTREPRISE] = PALIERS;

/** Remise maximale, dérivée de `DUREES` : jamais réécrite en toutes lettres. */
const REMISE_MAX = Math.max(...DUREES.map((d) => d.remisePct));

/**
 * « 3, 6, 12 ou 24 mois » / « 3, 6, 12 or 24 months » — les durées
 * d'engagement (hors le mois seul, qui n'en est pas un), dérivées de
 * `DUREES` plutôt que réécrites en toutes lettres dans la réponse.
 */
function dureesEngagement(lang: Lang): string {
  const mois = DUREES.filter((d) => d.mois > 1).map((d) => String(d.mois));
  const dernier = mois[mois.length - 1];
  const conjonction = lang === "en" ? "or" : "ou";
  return `${mois.slice(0, -1).join(", ")} ${conjonction} ${dernier}`;
}

/**
 * Questions/réponses de tarification.
 *
 * Ajouter les futures Q/R ici : une entrée par question, l'accordéon et
 * l'accessibilité suivent tout seuls. Les montants s'insèrent depuis
 * `offre.ts` (les deux forfaits) — ne jamais réécrire un prix en toutes
 * lettres dans une réponse.
 *
 * Ce sont des engagements commerciaux réels : ne rien y ajouter qui n'ait été
 * validé (aucune garantie de remboursement, de délai ou de disponibilité). Les
 * réponses doivent rester alignées sur les conditions d'utilisation — c'est le
 * texte qui engage, et une réponse plus tranchée que lui devient un litige.
 *
 * Module à part, sans `"use client"` : `FaqTarifs.tsx` (client, pour
 * l'accordéon) et les pages /tarifs (serveur, pour le JSON-LD `FAQPage`)
 * s'en servent tous les deux, et un composant client ne peut pas être
 * importé depuis du code serveur juste pour appeler une fonction.
 */
export function questionsDe(lang: Lang): readonly { q: string; r: string }[] {
  if (lang === "en") {
    return [
      {
        q: "Can I switch plans later?",
        r: "Yes, at any time: you move from Personal to Business (or back) from your account.",
      },
      {
        q: "How does payment work?",
        r: `A fixed-price monthly subscription: Personal at ${enDevise(PERSONNEL.prixMensuel)} a month, Business at ${enDevise(ENTREPRISE.prixMensuel)}. Commit for longer (${dureesEngagement("en")} months) for a discount of up to ${REMISE_MAX}%.`,
      },
      {
        q: "Are there refunds?",
        r: `Satisfaction guaranteed: ${GARANTIE_JOURS} days, on commitments of at least ${GARANTIE_DUREE_MIN} months. For any request, write to us; the terms of use set out the cases provided for.`,
      },
      {
        q: "Can I try it before I pay?",
        r: `Yes: ${ESSAI_JOURS} days free trial, no credit card required.`,
      },
    ];
  }
  return [
    {
      q: "Puis-je changer de forfait plus tard ?",
      r: "Oui, à tout moment : vous passez de Personnel à Entreprise (et inversement) depuis votre compte.",
    },
    {
      q: "Comment fonctionne le paiement ?",
      r: `Un abonnement mensuel à prix fixe : Personnel à ${enDevise(PERSONNEL.prixMensuel)} par mois, Entreprise à ${enDevise(ENTREPRISE.prixMensuel)}. Engagez-vous plus longtemps (${dureesEngagement("fr")} mois) pour une remise pouvant aller jusqu’à ${REMISE_MAX} %.`,
    },
    {
      q: "Y a-t-il des remboursements ?",
      r: `Satisfait ou remboursé : ${GARANTIE_JOURS} jours, sur les engagements d’au moins ${GARANTIE_DUREE_MIN} mois. Pour toute demande, écrivez-nous ; les conditions d’utilisation détaillent les cas prévus.`,
    },
    {
      q: "Puis-je essayer avant de payer ?",
      r: `Oui : ${ESSAI_JOURS} jours d’essai gratuit, sans carte de crédit.`,
    },
  ];
}
