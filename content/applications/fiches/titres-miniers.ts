import type { FicheApplication } from "../types";

/**
 * Titres miniers — ÉBAUCHE, à relire avant publication.
 *
 * Faits : /fonctions et /mines (déjà relues) — vous inscrivez vos titres et leurs échéances, le
 * décompte est suivi, alerte avant la date par courriel et par notification dans le bureau. Les dates
 * sont saisies à la main : GESTIM n'offre aucun service interrogeable (commentaire de /fonctions).
 * Dans le produit (cloudparadise_hpc), vérifié le 2026-09-25 :
 * - Champs : numéro de titre et échéance (obligatoires), description, secteur, travaux requis ($),
 *   délai d'alerte en jours, notes (fr.json `miningClaims.fields`, src/lib/claims/actions.ts).
 * - Délai d'alerte de 1 à 365 jours, 30 par défaut ; statut en jours restants, « bientôt » dans le
 *   délai, « expiré » après (actions.ts `parseInput`, `statusOf`).
 * - Deux alertes par titre, chacune envoyée une seule fois : à l'approche (dans le délai choisi) et
 *   à l'expiration ; notification dans le bureau + courriel ; modifier l'échéance réarme l'alerte
 *   (src/lib/claims/alerts.ts, commentaire de actions.ts).
 * - Liste propre à chaque utilisateur, sans partage d'équipe (actions.ts, `userId`).
 * - La notification ouvre l'app Titres miniers (`targetApp: "mining-claims"`). Pas `desktopOnly`.
 *   Forfait Personnel (GET /api/v1/apps/catalog).
 *
 * À vérifier à la relecture : le suivi n'est pas partagé avec l'équipe — la fiche le dit en FAQ,
 * à garder ou retirer selon ce qu'on veut mettre en avant. Les couches GESTIM citées sur /mines ne
 * font pas partie de cette app : non mentionnées.
 */
export const titresMiniers: FicheApplication = {
  id: "titres-miniers",
  apps: ["mining-claims"],
  slug: { fr: "titres-miniers", en: "mining-claims" },
  nom: { fr: "Titres miniers", en: "Mining claims" },
  titre: {
    fr: "Le suivi de vos titres miniers, avec une alerte avant l'échéance",
    en: "Track your mining claims, with an alert before each deadline",
  },
  groupe: "mines",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Suivi des titres miniers et de leurs échéances — Cloud OS",
      en: "Mining claim tracker with deadline alerts — Cloud OS",
    },
    description: {
      fr: "Inscrivez vos claims, leurs échéances et les travaux requis : Cloud OS suit le décompte et vous alerte par courriel avant la date. Conçu en Abitibi.",
      en: "Enter your claims, their expiry dates and required work: Cloud OS tracks the countdown and emails you before the date. Built in Abitibi, Québec.",
    },
  },
  accroche: {
    fr: "Aucun claim ne tombe sans prévenir.",
    en: "No claim lapses without warning.",
  },
  motsCles: {
    fr: ["suivi des titres miniers", "échéance claim minier", "renouvellement titre minier québec", "gestion de claims"],
    en: ["mining claim tracker", "mining claim expiry", "quebec mining claim renewal", "claim management software"],
  },
  corps: {
    fr: [
      {
        titre: "Tous vos claims sur une seule liste",
        paragraphes: [
          "Titres miniers tient la liste de vos titres : numéro, secteur, échéance, travaux requis et notes. Pour chacun, l'application affiche le nombre de jours qui restent, puis le signale quand l'échéance approche ou qu'elle est dépassée.",
        ],
      },
      {
        titre: "Une alerte avant la date, par courriel",
        paragraphes: [
          "Vous choisissez, titre par titre, combien de jours à l'avance être prévenu : trente par défaut, jusqu'à un an. Le jour venu, une notification arrive dans votre bureau et un courriel dans votre boîte. Une seconde alerte part si la date passe sans que le titre ait été mis à jour.",
          "Vous renouvelez un titre et modifiez son échéance ? L'alerte se réarme d'elle-même pour la nouvelle date.",
        ],
      },
      {
        titre: "Une saisie à la main, et c'est voulu",
        paragraphes: [
          "Le registre GESTIM n'offre pas de service que l'on puisse interroger : vous inscrivez vos titres vous-même, à partir de vos relevés. Ce que Cloud OS calcule, c'est le décompte jusqu'à l'échéance, et c'est lui qui déclenche l'alerte.",
        ],
      },
      {
        titre: "Avec le reste de l'exploration",
        paragraphes: [
          "Titres miniers fait partie des outils d'exploration minière de Cloud OS, avec les couches SIGÉOM importées par district, les forages en trois dimensions et le rapport d'exploration assisté. La liste s'ouvre aussi sur un téléphone, sur le terrain.",
        ],
      },
    ],
    en: [
      {
        titre: "All your claims on one list",
        paragraphes: [
          "Mining claims keeps the list of your titles: number, area, expiry date, required work and notes. For each one, the app shows the number of days left, then flags it when the deadline is near or has passed.",
        ],
      },
      {
        titre: "An alert before the date, by email",
        paragraphes: [
          "You choose, claim by claim, how many days ahead to be warned: thirty by default, up to a year. When the time comes, a notification appears on your desktop and an email lands in your inbox. A second alert goes out if the date passes without the claim being updated.",
          "You renew a claim and change its expiry date? The alert re-arms itself for the new date.",
        ],
      },
      {
        titre: "Entered by hand, on purpose",
        paragraphes: [
          "The GESTIM registry offers no service that can be queried: you enter your claims yourself, from your records. What Cloud OS calculates is the countdown to the deadline, and that is what triggers the alert.",
        ],
      },
      {
        titre: "Alongside the rest of your exploration",
        paragraphes: [
          "Mining claims is part of the Cloud OS mineral exploration tools, together with SIGÉOM layers imported by district, 3D drillholes and the assisted exploration report. The list also opens on a phone, in the field.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Titres miniers se relie-t-il à GESTIM ?",
        reponse: "Non. GESTIM n'offre pas de service interrogeable : vous inscrivez vos titres et leurs échéances vous-même, et Cloud OS suit le décompte.",
      },
      {
        question: "Comment suis-je prévenu ?",
        reponse: "Par une notification dans votre bureau et par courriel, quand l'échéance entre dans le délai que vous avez choisi, puis une seconde fois si elle est dépassée.",
      },
      {
        question: "Mon équipe voit-elle mes titres ?",
        reponse: "Non. La liste est propre à chaque compte : chacun suit les titres qu'il a inscrits.",
      },
      {
        question: "Titres miniers coûte-t-il un supplément ?",
        reponse: "Non. Il est compris dans l'abonnement dès le forfait Personnel.",
      },
    ],
    en: [
      {
        question: "Does Mining claims connect to GESTIM?",
        reponse: "No. GESTIM offers no queryable service: you enter your claims and their expiry dates yourself, and Cloud OS tracks the countdown.",
      },
      {
        question: "How am I warned?",
        reponse: "By a notification on your desktop and by email, when the deadline comes within the period you chose, then a second time if it has passed.",
      },
      {
        question: "Can my team see my claims?",
        reponse: "No. The list belongs to each account: everyone tracks the claims they entered.",
      },
      {
        question: "Does Mining claims cost extra?",
        reponse: "No. It is included in the subscription from the Personal plan.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/titres-miniers/titres-miniers-echeances.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "Titres miniers dans Cloud OS : les claims suivis et leurs échéances",
        en: "Mining Claims in Cloud OS: tracked claims and their deadlines",
      },
    },
  ],
  voisines: ["forages-3d", "donnees-ouvertes", "rapport-exploration"],
  articles: [],
};
