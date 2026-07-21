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
 * validé (aucune garantie de remboursement, de délai ou de disponibilité).
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
        r: "Credit purchases are non-refundable. Unused credits, however, remain available indefinitely (they don’t expire).",
      },
      {
        q: "Do I need to subscribe?",
        r: "No. No subscription: you only pay for the credits you choose to add, whenever you want.",
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
      r: "Les achats de crédits ne sont pas remboursables. Les crédits inutilisés restent toutefois disponibles indéfiniment (ils n’expirent pas).",
    },
    {
      q: "Dois-je m’abonner ?",
      r: "Non. Aucun abonnement : vous ne payez que les crédits que vous choisissez d’ajouter, quand vous le voulez.",
    },
  ];
}
