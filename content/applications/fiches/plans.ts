import type { FicheApplication } from "../types";

/**
 * Plans — ÉBAUCHE, à relire avant publication. Couvre aussi « Nouveau plan » (`new-plan`), la porte
 * d'entrée de Plans.
 *
 * Ce que c'est : un « plan » est une tâche de calcul (un job) lancée sur les serveurs de Cloud OS à
 * partir d'un fichier de votre espace, ou sans fichier. Ce n'est ni un plan de projet ni un plan
 * d'architecture (app-catalog.ts : « Consulter et gérer vos plans (tâches de calcul) »).
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Déposer UN fichier dans Plans lance un plan tout seul (« dépose et va »,
 *   plans/new-plan-menu.tsx) : un CSV ou un classeur Excel donne une analyse de données (rapport PDF
 *   + classeur XLSX), un PDF ou un Word une synthèse citée (rapport PDF)
 *   (quickStartOutputFormat, src/lib/plans/quick-start.ts). Un type non pris en charge renvoie vers
 *   l'assistant « Nouveau plan ».
 * - La synthèse citée : « chaque affirmation cite sa page et est vérifiée » (plan.conversation
 *   .documentHint, fr.json). L'analyse de données : « profil, requêtes SQL réelles, rapport relu,
 *   classeur Excel » (tabularHint).
 * - « Nouveau plan » : un titre, un fichier facultatif, puis un mode (new-plan/mode-cards.tsx,
 *   newPlan.families) : Automatique (recommandé, l'IA décide), GPU / CUDA, Média (ffmpeg), Images,
 *   Données (DuckDB), Documents (conversion, OCR, génération), Rendu 3D (Blender), Scraping web,
 *   Impression 3D (G-code), Simulation, Géomatique (GDAL), Mémo vocal (transcription), Source de
 *   données (API). Simulation, GPU et génération d'images ne demandent aucun fichier
 *   (step1.datasetOptionalHint).
 * - Opérations Documents (src/lib/docs/templates.ts) : conversion, OCR, fusion et compression de PDF,
 *   extraction de texte, classement de documents et de photos, analyse financière, traduction,
 *   publipostage, indexation (on pose ensuite des questions aux documents dans la conversation du
 *   plan : newPlan.docsNotes.rag-index), diagramme, archive chiffrée.
 * - Mode Automatique : on décrit le résultat voulu dans une conversation, puis « Soumettre comme
 *   job » (plan/conversation-panel.tsx, plan.conversation.*).
 * - Résultat : aperçu, « Télécharger », « Ouvrir dans Fichiers » ; onglet « Vérification » : résumé,
 *   contrôles, ce qui a été fait, ce qui a été ignoré ou tronqué ; pastille « Vérifié » / « À
 *   vérifier » (plan/verification-tab.tsx, qualityOf dans src/lib/jobs/trace-core.ts).
 * - « Relancer » et « Relancer avec ces corrections » (plan.frame.*).
 * - Liste : Brouillons, Actifs, Terminés, Archivés ; recherche par titre, filtre par mode, vue liste
 *   ou grille (plans/plans-app.tsx). Partage à des équipes (« plan + dataset + résultats »),
 *   « Modifier (éditer comme workflow) » (plans/plan-row.tsx).
 * - Un plan soumis peut être cédulé (getSchedulablePlansAction, src/lib/schedules/actions.ts).
 * - L'IA ne calcule pas le résultat elle-même : un moteur déterministe le produit (page /calcul de
 *   la vitrine, déjà relue).
 * - Forfait : `personnel` pour `plans` et `new-plan` (GET /api/v1/apps/catalog en production). Les
 *   tâches se comptent dans l'enveloppe du forfait (components/marketing/offre.ts).
 *
 * À vérifier à la relecture :
 * - Le nom « Plans » prête à confusion ; la fiche le dit d'emblée. Le slug vise le besoin
 *   (`taches-de-calcul` / `compute-tasks`) : à confirmer, ou `analyse-de-fichiers`.
 * - L'interface parle encore de « crédits » (estimation du publipostage, workflows) alors que la
 *   vitrine n'en parle plus : la fiche n'en dit rien.
 * - Non cités exprès : le webhook signé (« Turbo Cloud », API), la carte graphique de la note GPU
 *   (règle du plan de contenu : aucune fiche technique), les simulations financières.
 */
export const plans: FicheApplication = {
  id: "plans",
  apps: ["plans", "new-plan"],
  slug: { fr: "taches-de-calcul", en: "compute-tasks" },
  nom: { fr: "Plans", en: "Plans" },
  titre: {
    fr: "Plans, vos fichiers analysés et traités en ligne",
    en: "Plans, your files analyzed and processed online",
  },
  groupe: "gestion",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Analyser et traiter vos fichiers en ligne — Cloud OS",
      en: "Analyze and process your files online — Cloud OS",
    },
    description: {
      fr: "Déposez un tableur, un PDF ou des photos : Plans en tire un rapport vérifié, une conversion, une transcription ou un rendu, sur nos serveurs au Québec.",
      en: "Drop a spreadsheet, a PDF or photos: Plans turns them into a checked report, a conversion, a transcription or a render, on our servers in Québec.",
    },
  },
  accroche: {
    fr: "Déposez un fichier, décrivez le résultat : la tâche tourne sur nos serveurs.",
    en: "Drop a file, describe the result: the task runs on our servers.",
  },
  motsCles: {
    fr: ["analyser un fichier excel en ligne", "synthèse de pdf avec citations", "traitement de fichiers par lots", "ocr et conversion de documents en ligne"],
    en: ["analyze an excel file online", "pdf summary with citations", "batch file processing", "online ocr and document conversion"],
  },
  corps: {
    fr: [
      {
        titre: "Un plan, c'est une tâche que Cloud OS fait pour vous",
        paragraphes: [
          "Dans Cloud OS, un plan est une tâche de calcul : vous partez d'un fichier de votre espace — ou d'aucun fichier — et vous décrivez le résultat voulu. La tâche tourne sur nos serveurs, pas sur votre ordinateur, et le résultat revient dans vos Fichiers.",
          "Le plus court chemin : déposer un fichier dans Plans. Un tableur CSV ou Excel devient une analyse de données, avec un rapport PDF et un classeur Excel. Un PDF ou un document Word devient une synthèse dont chaque affirmation cite sa page.",
        ],
      },
      {
        titre: "Décrivez, ou choisissez le moteur",
        paragraphes: [
          "En mode Automatique, vous expliquez ce que vous voulez dans une conversation ; l'intelligence artificielle monte le plan, puis un moteur déterministe produit le résultat. Elle ne l'invente jamais. Si vous savez déjà ce qu'il faut, choisissez le moteur vous-même.",
        ],
        points: [
          "Documents : conversion, OCR, fusion de PDF, traduction, publipostage, archive chiffrée.",
          "Données : requêtes SQL et graphiques sur vos tableurs.",
          "Images, audio et vidéo : traitement par lots, transcription d'un mémo vocal.",
          "Rendu 3D avec Blender, découpe pour l'impression 3D, simulation, géomatique.",
          "Indexation d'un dossier de documents, puis questions posées en langage courant.",
        ],
      },
      {
        titre: "Un résultat que vous pouvez vérifier",
        paragraphes: [
          "Chaque plan terminé montre son travail : un résumé, les contrôles effectués, ce qui a été fait et ce qui a été laissé de côté. Une pastille « Vérifié » ou « À vérifier » le dit d'un coup d'œil. Un détail ne vous convient pas ? Relancez avec vos corrections.",
        ],
      },
      {
        titre: "Rangé, partagé, répété",
        paragraphes: [
          "Vos plans se classent en brouillons, actifs, terminés et archivés, avec une recherche et un filtre par moteur. Vous pouvez partager un plan et ses résultats avec une équipe, le transformer en workflow pour enchaîner d'autres étapes, ou le céduler pour qu'il reparte seul. Plans est compris dès le forfait Personnel ; chaque tâche se compte dans l'enveloppe mensuelle du forfait.",
        ],
      },
    ],
    en: [
      {
        titre: "A plan is a task Cloud OS does for you",
        paragraphes: [
          "In Cloud OS, a plan is a compute task: you start from a file in your space — or from no file at all — and describe the result you want. The task runs on our servers, not on your computer, and the result comes back to your Files.",
          "The quickest way: drop a file into Plans. A CSV or Excel spreadsheet becomes a data analysis, with a PDF report and an Excel workbook. A PDF or Word document becomes a summary in which every statement cites its page.",
        ],
      },
      {
        titre: "Describe it, or pick the engine",
        paragraphes: [
          "In Automatic mode, you explain what you want in a conversation; artificial intelligence builds the plan, then a deterministic engine produces the result. It never makes the result up. If you already know what you need, pick the engine yourself.",
        ],
        points: [
          "Documents: conversion, OCR, PDF merging, translation, mail merge, encrypted archive.",
          "Data: SQL queries and charts on your spreadsheets.",
          "Images, audio and video: batch processing, voice memo transcription.",
          "3D rendering with Blender, slicing for 3D printing, simulation, GIS.",
          "Indexing a folder of documents, then asking questions in plain language.",
        ],
      },
      {
        titre: "A result you can check",
        paragraphes: [
          "Every finished plan shows its work: a summary, the checks performed, what was done and what was left out. A “Verified” or “Needs review” badge says so at a glance. Something is not quite right? Run it again with your corrections.",
        ],
      },
      {
        titre: "Organized, shared, repeated",
        paragraphes: [
          "Your plans are sorted into drafts, active, finished and archived, with search and a filter by engine. You can share a plan and its results with a team, turn it into a workflow to chain more steps, or schedule it to run again on its own. Plans is included from the Personal plan; each task counts toward the plan's monthly allowance.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Faut-il un fichier pour lancer un plan ?",
        reponse: "Pas toujours. La plupart des moteurs travaillent sur un fichier de votre espace, mais la simulation, le calcul sur carte graphique et la génération d'images partent de simples paramètres.",
      },
      {
        question: "L'IA peut-elle inventer un résultat ?",
        reponse: "Non. Elle comprend votre demande et choisit comment s'y prendre, mais c'est un moteur déterministe qui calcule le résultat. L'onglet « Vérification » montre les contrôles effectués et ce qui a été laissé de côté.",
      },
      {
        question: "Où vont les résultats ?",
        reponse: "Dans vos Fichiers, dans votre espace hébergé au Québec. Vous pouvez aussi les télécharger depuis le plan.",
      },
      {
        question: "Plans coûte-t-il un supplément ?",
        reponse: "Non. Plans est compris dès le forfait Personnel ; les tâches lancées se comptent dans l'enveloppe mensuelle de votre forfait.",
      },
    ],
    en: [
      {
        question: "Do I need a file to start a plan?",
        reponse: "Not always. Most engines work on a file from your space, but simulation, graphics-card compute and image generation start from simple parameters.",
      },
      {
        question: "Can the AI make up a result?",
        reponse: "No. It understands your request and chooses how to go about it, but a deterministic engine computes the result. The “Verification” tab shows the checks performed and what was left out.",
      },
      {
        question: "Where do the results go?",
        reponse: "To your Files, in your space hosted in Québec. You can also download them from the plan.",
      },
      {
        question: "Does Plans cost extra?",
        reponse: "No. Plans is included from the Personal plan; the tasks you run count toward your plan's monthly allowance.",
      },
    ],
  },
  captures: [],
  voisines: ["workflows", "planification", "rapports", "assistant"],
  articles: [
    { slug: "planification-de-taches-cloud", titre: "Planification de tâches cloud : souveraineté et automatisation pour PME" },
  ],
};
