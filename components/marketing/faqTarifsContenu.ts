import { CREDIT_EN_DEVISE, DEVISE, RECHARGE_MINIMALE_EN_DEVISE } from "./offre";
import type { Lang } from "./tokens";

const nf = new Intl.NumberFormat("fr-CA");

/**
 * Questions/réponses de tarification.
 *
 * Ajouter les futures Q/R ici : une entrée par question, l'accordéon et
 * l'accessibilité suivent tout seuls. Les montants s'insèrent depuis `offre.ts`
 * — ne jamais réécrire un prix en toutes lettres dans une réponse.
 *
 * Ce sont des engagements commerciaux réels : ne rien y ajouter qui n'ait été
 * validé (aucune garantie de remboursement, de délai ou de disponibilité). Les
 * réponses doivent rester alignées sur les conditions d'utilisation — c'est le
 * texte qui engage, et une réponse plus tranchée que lui devient un litige.
 *
 * Aucune question sur l'abonnement : les paliers mensuels sont désactivés, et
 * la page /tarifs n'en dit rien sous aucune forme.
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
        q: "Do credits expire?",
        r: "No. Your credits never expire: they stay available as long as your account is active.",
      },
      {
        q: "How does payment work?",
        r: `You work with credits (1 credit = ${nf.format(CREDIT_EN_DEVISE)} ${DEVISE}). You top up on demand by credit card via PayPal. Minimum top-up of ${RECHARGE_MINIMALE_EN_DEVISE}.`,
      },
      {
        q: "Are there refunds?",
        r: "Credits already spent are non-refundable. Unused credits stay available indefinitely — they don’t expire. For any request, write to us; the terms of use set out the cases provided for.",
      },
    ];
  }
  return [
    {
      q: "Les crédits expirent-ils ?",
      r: "Non. Vos crédits n’expirent jamais : ils restent disponibles tant que votre compte est actif.",
    },
    {
      q: "Comment fonctionne le paiement ?",
      r: `Vous fonctionnez par crédits (1 crédit = ${nf.format(CREDIT_EN_DEVISE)} ${DEVISE}). Vous rechargez à la demande par carte de crédit via PayPal. Recharge minimale de ${RECHARGE_MINIMALE_EN_DEVISE}.`,
    },
    {
      q: "Y a-t-il des remboursements ?",
      r: "Les crédits déjà consommés ne sont pas remboursables. Les crédits inutilisés, eux, restent disponibles indéfiniment — ils n’expirent pas. Pour toute demande, écrivez-nous ; les conditions d’utilisation détaillent les cas prévus.",
    },
  ];
}
