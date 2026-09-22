import { GARANTIE_JOURS, PALIERS, dureeMaxMois, dureesGarantie, enDevise } from "./offre";
import type { Lang } from "./tokens";

const [PERSONNEL, ENTREPRISE] = PALIERS;

/** Total mensuel d'une équipe de cinq : la personne qui mène (Entreprise) plus quatre membres
 * (Personnel) — dérivé de `PALIERS`, jamais réécrit en toutes lettres. */
const TOTAL_EQUIPE_5 = ENTREPRISE.prixMensuel + 4 * PERSONNEL.prixMensuel;

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
 *
 * Huit questions, dans l'ordre de la spec §8.2 — aucune ne recourt au
 * vocabulaire de l'ancien modèle (une unité de compte rechargeable) ni à un
 * prix par tâche : le modèle est un abonnement et une jauge.
 */
export function questionsDe(lang: Lang): readonly { q: string; r: string }[] {
  if (lang === "en") {
    return [
      {
        q: "What is a task?",
        r: `A job you run: a document analysis, a render, an extraction, a conversation with the assistant. Heavy tasks use more than light ones — which is why we speak of an order of magnitude (“≈ ${PERSONNEL.tachesParMois} tasks a month”) rather than a quota.`,
      },
      {
        q: "What happens at 100%?",
        r: `We warn you at 80%. At 100%, you choose: wait for the renewal, or add a month’s allowance right away at your plan’s price, without changing your subscription or its date. A long-running task already under way waits 24 hours for your decision, then delivers what it produced. Whatever is left at the end of the month is carried over once, capped at one month.`,
      },
      {
        q: "The team pool?",
        r: "In a team whose owner has an active Business plan, any member with their own paid, active plan (a trial does not pool) can pool their allowance. The pool is shared by everyone; when you take yours back, you get your share of what remains, prorated to what you put in.",
      },
      {
        q: "How much for a team of 5?",
        r: `${enDevise(TOTAL_EQUIPE_5)} a month: ${enDevise(ENTREPRISE.prixMensuel)} for the person leading the team (${ENTREPRISE.nom.en} plan) and ${enDevise(PERSONNEL.prixMensuel)} for each of the other four (${PERSONNEL.nom.en} plan).`,
      },
      {
        q: "Can I pause?",
        r: `Yes, for 1 to 3 months, once every 12 months — available on recurring subscriptions only (not a ${dureeMaxMois()}-month commitment paid up front, nor the trial). Nothing is billed during the pause, nothing is lost: your gauge is waiting for you.`,
      },
      {
        q: "What if I change my mind?",
        r: `On a commitment of ${dureesGarantie("en")} months, you get a full refund within ${GARANTIE_JOURS} days, once per account and provided you have not purchased any extra month of allowance since. Otherwise, you can cancel any time and keep access until the end of the period already paid for.`,
      },
      {
        q: "Taxes?",
        r: "Prices are shown before tax. Canadian taxes applicable to your province are shown before payment and appear on the invoice.",
      },
      {
        q: "Where is my data?",
        r: "In Quebec, on our servers. Your files remain yours, including after cancellation: you can retrieve them.",
      },
    ];
  }
  return [
    {
      q: "Qu’est-ce qu’une tâche ?",
      r: `Un traitement que vous lancez : une analyse de document, un rendu, une extraction, une conversation avec l’assistant. Les tâches lourdes consomment plus que les légères — c’est pourquoi nous parlons d’un ordre de grandeur (« ≈ ${PERSONNEL.tachesParMois} tâches par mois ») plutôt que d’un quota.`,
    },
    {
      q: "Que se passe-t-il à 100 % ?",
      r: "On vous prévient à 80 %. À 100 %, vous choisissez : attendre le renouvellement, ou ajouter un mois d’enveloppe tout de suite au prix de votre forfait, sans changer d’abonnement ni de date. Une tâche longue déjà lancée attend 24 h que vous décidiez, puis livre ce qu’elle a produit. Ce qui reste à la fin du mois est reporté une fois, jusqu’à concurrence d’un mois.",
    },
    {
      q: "Le pool d’équipe ?",
      r: "Dans une équipe dont le titulaire a un forfait Entreprise actif, tout membre disposant de son propre forfait payé et actif (l’essai ne poole pas) peut mettre son enveloppe en commun. Le pool se consomme par tout le monde ; en reprenant la sienne, on récupère sa part de ce qui reste, au prorata de ce qu’on a mis.",
    },
    {
      q: "Combien pour une équipe de 5 ?",
      r: `${enDevise(TOTAL_EQUIPE_5)} par mois : ${enDevise(ENTREPRISE.prixMensuel)} pour la personne qui mène l’équipe (forfait ${ENTREPRISE.nom.fr}) et ${enDevise(PERSONNEL.prixMensuel)} pour chacun des quatre autres (forfait ${PERSONNEL.nom.fr}).`,
    },
    {
      q: "Puis-je mettre en pause ?",
      r: `Oui, de 1 à 3 mois, une fois par période de 12 mois — réservé aux abonnements récurrents (pas à un engagement de ${dureeMaxMois()} mois payé en une fois, ni à l’essai). Rien n’est facturé pendant la pause, rien n’est perdu : votre jauge vous attend.`,
    },
    {
      q: "Et si je change d’avis ?",
      r: `Sur un engagement de ${dureesGarantie("fr")} mois, vous êtes remboursé intégralement dans les ${GARANTIE_JOURS} jours, une seule fois par compte et à condition de n’avoir acheté aucun mois d’enveloppe supplémentaire depuis. Sinon, vous résiliez quand vous voulez et gardez l’accès jusqu’à la fin de la période déjà payée.`,
    },
    {
      q: "Les taxes ?",
      r: "Les prix sont hors taxes. Les taxes canadiennes applicables à votre province s’affichent avant le paiement et figurent sur la facture.",
    },
    {
      q: "Où sont mes données ?",
      r: "Au Québec, sur nos serveurs. Vos fichiers restent les vôtres, y compris après une résiliation : vous pouvez les récupérer.",
    },
  ];
}
