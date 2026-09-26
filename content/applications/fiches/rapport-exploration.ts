import type { FicheApplication } from "../types";

/**
 * Rapport d'exploration — ÉBAUCHE, à relire avant publication.
 *
 * Faits : /fonctions (déjà relue) — « Un premier jet rédigé à partir des données de votre projet, que
 * vous révisez. » Dans le produit (cloudparadise_hpc), vérifié le 2026-09-25 :
 * - Deux types : rapport de travaux statutaires (MRNF/MERN) ou sections techniques « style NI
 *   43-101 » (fr.json `explorationReport.options`, src/lib/docs/exploration-report-actions.ts).
 * - Formulaire : projet, substance, titulaire, auteur, secteur, feuillet SNRC, date, claims visés,
 *   contexte géologique (facultatif), travaux réalisés, résultats clés ; au minimum le projet ou les
 *   travaux (exploration-report-actions.ts).
 * - Sections imposées au modèle : statutaire = Résumé ; Introduction et objectifs ; Localisation et
 *   accès ; Contexte géologique ; Travaux réalisés ; Résultats ; Interprétation et discussion ;
 *   Conclusions et recommandations. NI 43-101 = Résumé ; Introduction et termes de référence ;
 *   Contexte et localisation de la propriété ; Historique ; Contexte géologique et minéralisation ;
 *   Travaux d'exploration ; Résultats ; Interprétation ; Conclusions et recommandations. Plus
 *   Références (src/lib/docs/exploration-report-run.ts).
 * - Consigne : n'inventer aucune donnée chiffrée, marqueurs « [À COMPLÉTER : …] » là où il manque
 *   de l'information. PDF avec page de titre (tableau des renseignements du projet) et avertissement
 *   « brouillon à réviser et valider par un géologue qualifié » (exploration-report-run.ts
 *   `buildPrompt`, `buildHtml`).
 * - Rédigé en français (« Écris en français » dans le prompt) — la fiche EN le dit.
 * - Le PDF arrive dans Fichiers, avec une notification à la fin (fr.json `explorationReport.toast`).
 * - Chaque génération débite une tâche de type Documents (`chargeForJob(user.id, "DOCS")`).
 * - Pas `desktopOnly`. Forfait Personnel (GET /api/v1/apps/catalog).
 *
 * Volontairement absent : la révision « en langage courant » avec l'assistant que décrit /mines
 * (« Vous lui demandez les modifications en langage courant ») — l'app est un formulaire qui produit
 * un PDF, sans conversation ; et « à partir des données de votre projet » au sens de fichiers lus
 * automatiquement : l'app ne lit que ce que vous saisissez dans le formulaire.
 *
 * L'écart avec /mines ci-dessus est corrigé sur /mines et /en/mining le 2026-09-25.
 *
 * À vérifier à la relecture : la mention « compte pour une tâche », formulation à aligner sur la
 * page /tarifs.
 */
export const rapportExploration: FicheApplication = {
  id: "rapport-exploration",
  apps: ["exploration-report"],
  slug: { fr: "rapport-exploration", en: "exploration-report" },
  nom: { fr: "Rapport d'exploration", en: "Exploration report" },
  titre: {
    fr: "Le premier jet de votre rapport d'exploration, rédigé avec l'IA",
    en: "The first draft of your exploration report, written with AI",
  },
  groupe: "mines",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Rapport de travaux statutaires assisté par IA — Cloud OS",
      en: "AI-assisted draft of your exploration report — Cloud OS",
    },
    description: {
      fr: "Décrivez vos travaux et vos résultats : l'IA rédige le brouillon d'un rapport de travaux statutaires ou de sections NI 43-101, en PDF, sans inventer de données.",
      en: "Describe your work and results: AI drafts a Québec statutory work report or NI 43-101-style sections as a PDF, in French, without making up data.",
    },
  },
  accroche: {
    fr: "Le premier jet est déjà écrit ; il reste à le réviser et à le signer.",
    en: "The first draft is already written; all that is left is to review and sign it.",
  },
  motsCles: {
    fr: ["rapport de travaux statutaires", "rapport d'exploration minière", "rédaction rapport ni 43-101", "rapport géologique ia"],
    en: ["mining exploration report", "quebec statutory work report", "ni 43-101 report writing", "ai geology report"],
  },
  corps: {
    fr: [
      {
        titre: "Du formulaire au PDF",
        paragraphes: [
          "Rapport d'exploration part de ce que vous savez déjà sur votre projet. Vous remplissez un formulaire : la propriété, le titulaire, l'auteur, le secteur, le feuillet SNRC, les claims visés, la substance recherchée, puis les travaux réalisés et les résultats clés. L'IA rédige les sections du rapport, et un PDF mis en page arrive dans votre espace Fichiers, avec une notification quand il est prêt.",
        ],
      },
      {
        titre: "Deux gabarits",
        paragraphes: [
          "Vous choisissez le type de rapport, et l'IA suit la structure correspondante :",
        ],
        points: [
          "Rapport de travaux statutaires (MRNF) : résumé, introduction et objectifs, localisation et accès, contexte géologique, travaux réalisés, résultats, interprétation, conclusions et recommandations.",
          "Sections techniques dans le style d'un rapport NI 43-101 : on y ajoute les termes de référence, l'historique, la minéralisation.",
        ],
      },
      {
        titre: "Aucune teneur inventée",
        paragraphes: [
          "L'IA a une consigne stricte : n'inventer aucune donnée chiffrée. Teneurs, coordonnées, dates, mètres forés, nombres d'échantillons : elle n'utilise que ce que vous avez fourni. Là où une information manque, elle laisse un marqueur « [À COMPLÉTER] » plutôt que de combler le vide.",
          "Le PDF le dit en page de titre : c'est un brouillon, à réviser, compléter et valider par un géologue qualifié avant tout dépôt. Il vous épargne la page blanche ; la signature reste la vôtre.",
        ],
      },
      {
        titre: "Avec le reste de l'exploration",
        paragraphes: [
          "Rapport d'exploration fait partie des outils d'exploration minière de Cloud OS, avec le suivi des titres miniers, les couches SIGÉOM importées par district et les forages en trois dimensions. Chaque brouillon généré compte comme une tâche dans l'enveloppe de votre forfait.",
        ],
      },
    ],
    en: [
      {
        titre: "From form to PDF",
        paragraphes: [
          "Exploration report starts from what you already know about your project. You fill in a form: the property, the holder, the author, the area, the NTS sheet, the claims concerned, the target commodity, then the work carried out and the key results. AI writes the report sections, and a laid-out PDF lands in your Files space, with a notification when it is ready. The draft is written in French.",
        ],
      },
      {
        titre: "Two templates",
        paragraphes: [
          "You choose the type of report, and the AI follows the matching structure:",
        ],
        points: [
          "Québec statutory work report (MRNF): summary, introduction and objectives, location and access, geological setting, work carried out, results, interpretation, conclusions and recommendations.",
          "Technical sections in the style of an NI 43-101 report, which add terms of reference, history and mineralization.",
        ],
      },
      {
        titre: "No made-up grades",
        paragraphes: [
          "The AI has a strict instruction: invent no figures. Grades, coordinates, dates, metres drilled, sample counts: it only uses what you provided. Where information is missing, it leaves a “[À COMPLÉTER]” (to be completed) marker rather than filling the gap.",
          "The PDF says so on its title page: it is a draft, to be reviewed, completed and approved by a qualified geologist before any filing. It spares you the blank page; the signature remains yours.",
        ],
      },
      {
        titre: "Alongside the rest of your exploration",
        paragraphes: [
          "Exploration report is part of the Cloud OS mineral exploration tools, together with mining claim tracking, SIGÉOM layers imported by district and 3D drillholes. Each generated draft counts as one task in your plan's allowance.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Le rapport peut-il être déposé tel quel ?",
        reponse: "Non. C'est un brouillon : il doit être révisé, complété là où figurent les marqueurs « [À COMPLÉTER] », puis validé par un géologue qualifié avant tout dépôt.",
      },
      {
        question: "L'IA peut-elle inventer des résultats ?",
        reponse: "Elle a pour consigne de ne jamais inventer de données chiffrées et de n'élaborer que les éléments que vous fournissez. Une information absente devient un marqueur à compléter.",
      },
      {
        question: "Quels types de rapports puis-je produire ?",
        reponse: "Un rapport de travaux statutaires, ou les sections techniques d'un rapport dans le style NI 43-101.",
      },
      {
        question: "Le Rapport d'exploration est-il compris dans mon forfait ?",
        reponse: "Oui, dès le forfait Personnel. Chaque brouillon généré compte comme une tâche dans l'enveloppe de votre forfait.",
      },
    ],
    en: [
      {
        question: "Can the report be filed as is?",
        reponse: "No. It is a draft: it must be reviewed, completed wherever the “[À COMPLÉTER]” markers appear, then approved by a qualified geologist before any filing.",
      },
      {
        question: "Can the AI make up results?",
        reponse: "It is instructed never to invent figures and to elaborate only on the information you provide. Missing information becomes a marker to complete.",
      },
      {
        question: "What kinds of reports can I produce?",
        reponse: "A Québec statutory work report, or the technical sections of an NI 43-101-style report. Drafts are written in French.",
      },
      {
        question: "Is Exploration report included in my plan?",
        reponse: "Yes, from the Personal plan. Each generated draft counts as one task in your plan's allowance.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/rapport-exploration/rapport-exploration-formulaire.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "Le Rapport d'exploration de Cloud OS : les faits d'une campagne, avant la rédaction du brouillon",
        en: "The Cloud OS Exploration Report: a campaign's facts, before the draft is written",
      },
    },
  ],
  voisines: ["titres-miniers", "forages-3d", "donnees-ouvertes"],
  articles: [],
};
