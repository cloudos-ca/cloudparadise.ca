import type { FicheApplication } from "../types";

/**
 * Workflows — ÉBAUCHE, à relire avant publication.
 *
 * Ce que c'est : un éditeur visuel qui enchaîne plusieurs tâches de calcul (les moteurs de Plans)
 * en une seule suite, lancée d'un clic ou cédulée (app-catalog.ts : « Créer des flux de travail
 * automatisés enchaînant plusieurs tâches »).
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Canevas visuel (React Flow) avec palette à glisser-déposer, menus contextuels, panneau de
 *   propriétés par étape, validation en direct, enregistrement automatique
 *   (src/components/os/apps/workflow/workflow-editor.tsx).
 * - Étapes réellement proposées (PALETTE_AVAILABLE, src/lib/workflows/node-catalog.ts) : Entrée
 *   (fichier, dossier ou URL), Sortie ; Web : télécharger un fichier, appeler une source API ;
 *   Documents : extraire le texte d'un PDF, convertir, traduire, OCR, diagramme, analyse financière ;
 *   Données : requête SQL écrite ou décrite en français, sortie CSV, JSON ou graphique ;
 *   Géomatique : reprojection, conversion de couches, CSV → points, GPX, ombrage, courbes de niveau,
 *   interpolation, anomalies, dispersion glaciaire, forages ; Média : conversion, transcription,
 *   rendu Blender ; Images : redimensionner, convertir, détourer, améliorer, analyser, générer,
 *   agrandir ; impression 3D ; simulation, CUDA, « Traitement IA (LLM) » ; Utilitaires : fusionner,
 *   notifier, approbation manuelle, condition Si/Sinon en langage naturel.
 * - « Ce que je veux obtenir » + « Proposer les étapes » : l'IA propose les étapes
 *   (suggestStepsAction, src/lib/workflows/actions.ts ; libellés workflow.objective.*).
 * - « Vérifier » (dry run) : validation du graphe et recommandations applicables
 *   (runDryRunAction, src/lib/workflows/dry-run.ts ; workflow.suggestions.*).
 * - Lancement : suivi étape par étape, sortie et journal de chaque étape, « Contrôles réussis » /
 *   « À vérifier », historique des lancements (workflow/run-mode/*, workflow.run.*).
 * - Une étape Documents alimentée par un dossier s'exécute une fois par fichier (nodeCanFanOut,
 *   orchestrator.ts).
 * - L'approbation manuelle met le workflow en pause jusqu'à validation (APPROVAL, orchestrator.ts).
 * - Sortie : le livrable est classé dans Fichiers ; option « Livrer aussi vers le cloud » : Google
 *   Drive ou OneDrive, dossier « Cloud Paradise » (deliverFileToCloud, orchestrator.ts).
 * - « Planifier » depuis l'éditeur (scheduleWorkflowAction, src/lib/schedules/actions.ts).
 * - Liste : Brouillons, En vérification, En exécution, Terminés, Échoués, Corbeille ; partage à des
 *   équipes (« workflow + dataset source ») (workflows/workflows-app.tsx).
 * - Un plan peut être ouvert « comme workflow » (plans/plan-row.tsx).
 * - Forfait : `personnel` (GET /api/v1/apps/catalog en production).
 *
 * À vérifier à la relecture :
 * - La livraison Google Drive / OneDrive suppose un compte relié (lib/cloud) : la fiche le dit,
 *   mais le chemin exact pour relier le compte n'a pas été vu dans l'app.
 * - « Scraper une page web » n'est plus proposé dans l'éditeur (PALETTE_AVAILABLE) : la fiche ne le
 *   cite pas. L'estimation en « crédits » de la vérification n'est pas citée non plus.
 * - Le commentaire d'en-tête de workflow-editor.tsx (« Phase 1 — nothing executes ») est périmé :
 *   le lancement existe (runWorkflowAction, orchestrator.ts). À constater dans l'app.
 */
export const workflows: FicheApplication = {
  id: "workflows",
  apps: ["workflows"],
  slug: { fr: "automatisation-de-taches", en: "workflow-automation" },
  nom: { fr: "Workflows", en: "Workflows" },
  titre: {
    fr: "Workflows, pour automatiser le traitement de vos fichiers",
    en: "Workflows, to automate the processing of your files",
  },
  groupe: "gestion",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Automatiser le traitement de vos fichiers — Cloud OS",
      en: "Automate your file processing, no code — Cloud OS",
    },
    description: {
      fr: "Enchaînez OCR, traduction, requêtes de données, images et rendus dans un workflow visuel, sans code, puis lancez-le d'un clic ou à heure fixe.",
      en: "Chain OCR, translation, data queries, image processing and 3D renders in a visual workflow, with no code, then run it in one click or at a set time.",
    },
  },
  accroche: {
    fr: "Plusieurs traitements enchaînés en une seule suite, lancée d'un clic ou à heure fixe.",
    en: "Several processing steps chained into one flow, run in one click or at a set time.",
  },
  motsCles: {
    fr: ["automatiser le traitement de fichiers", "workflow sans code", "automatisation de tâches pme", "chaîne de traitement de documents"],
    en: ["automate file processing", "no-code workflow", "small business task automation", "document processing pipeline"],
  },
  corps: {
    fr: [
      {
        titre: "Vos traitements, bout à bout",
        paragraphes: [
          "Un workflow enchaîne plusieurs tâches en une seule suite : la sortie d'une étape devient l'entrée de la suivante. Vous partez d'un fichier, d'un dossier ou d'une adresse web, et le livrable final est classé dans vos Fichiers.",
          "Le tout se construit sur un canevas visuel : vous glissez les étapes depuis la palette, vous les reliez, vous réglez chacune dans son panneau. Aucun code à écrire, et chaque modification est enregistrée au fil de l'eau.",
        ],
        points: [
          "Documents : extraction du texte d'un PDF, OCR, conversion, traduction, analyse financière.",
          "Données : une requête décrite en français ou écrite en SQL, en tableau ou en graphique.",
          "Images, audio et vidéo : redimensionner, détourer, convertir, transcrire, rendre une scène Blender.",
          "Géomatique : reprojection, courbes de niveau, anomalies, traces de forage.",
        ],
      },
      {
        titre: "Décrivez le but, les étapes sont proposées",
        paragraphes: [
          "Écrivez ce que vous voulez obtenir : l'intelligence artificielle propose les étapes qui y mènent, et vous les gardez, les modifiez ou les retirez. Avant de lancer, « Vérifier » passe le workflow en revue et fait des recommandations que vous appliquez d'un clic.",
          "Des étapes utilitaires donnent de la souplesse : une condition Si/Sinon formulée en langage courant, une approbation manuelle qui met le workflow en pause jusqu'à votre accord, une notification à un moment précis. Une étape de documents qui reçoit un dossier traite chaque fichier à son tour.",
        ],
      },
      {
        titre: "Lancé d'un clic, ou tous les lundis matin",
        paragraphes: [
          "Pendant l'exécution, vous suivez chaque étape : ce qu'elle a produit, son journal, ses contrôles. Chaque lancement reste dans l'historique. Le livrable peut aussi partir vers votre Google Drive ou votre OneDrive, et le bouton « Planifier » en fait une cédule qui repart toute seule. Un workflow se partage avec une équipe, et Workflows est compris dès le forfait Personnel.",
        ],
      },
    ],
    en: [
      {
        titre: "Your processing steps, end to end",
        paragraphes: [
          "A workflow chains several tasks into one flow: the output of one step becomes the input of the next. You start from a file, a folder or a web address, and the final deliverable is filed in your Files.",
          "It is all built on a visual canvas: you drag steps from the palette, connect them and set each one up in its panel. No code to write, and every change is saved as you go.",
        ],
        points: [
          "Documents: PDF text extraction, OCR, conversion, translation, financial analysis.",
          "Data: a query described in plain language or written in SQL, as a table or a chart.",
          "Images, audio and video: resize, remove backgrounds, convert, transcribe, render a Blender scene.",
          "GIS: reprojection, contour lines, anomalies, drill hole traces.",
        ],
      },
      {
        titre: "Describe the goal, the steps are suggested",
        paragraphes: [
          "Write what you want to get: artificial intelligence suggests the steps that lead there, and you keep, change or remove them. Before running, “Check” reviews the workflow and makes recommendations you apply in one click.",
          "Utility steps add flexibility: an if/else condition written in plain language, a manual approval that pauses the workflow until you agree, a notification at a given point. A document step that receives a folder processes each file in turn.",
        ],
      },
      {
        titre: "Run in one click, or every Monday morning",
        paragraphes: [
          "While it runs, you follow each step: what it produced, its log, its checks. Every run stays in the history. The deliverable can also go to your Google Drive or OneDrive, and the “Schedule” button turns it into a schedule that runs again on its own. A workflow can be shared with a team, and Workflows is included from the Personal plan.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Faut-il savoir programmer ?",
        reponse: "Non. Les étapes se glissent sur un canevas et se règlent dans des formulaires. Vous pouvez même décrire le résultat voulu et laisser l'intelligence artificielle proposer les étapes.",
      },
      {
        question: "Quelle différence avec Plans ?",
        reponse: "Un plan est une seule tâche. Un workflow en enchaîne plusieurs, avec des conditions, des approbations et une livraison finale. Un plan existant peut d'ailleurs s'ouvrir comme workflow pour y ajouter des étapes.",
      },
      {
        question: "Un workflow peut-il tourner sans moi ?",
        reponse: "Oui. Le bouton « Planifier » le lance à la date et à l'heure choisies, une fois ou de façon récurrente, et le résultat vous attend dans vos Fichiers.",
      },
    ],
    en: [
      {
        question: "Do I need to know how to code?",
        reponse: "No. Steps are dragged onto a canvas and set up in forms. You can even describe the result you want and let artificial intelligence suggest the steps.",
      },
      {
        question: "How is it different from Plans?",
        reponse: "A plan is a single task. A workflow chains several, with conditions, approvals and a final delivery. An existing plan can also be opened as a workflow to add steps to it.",
      },
      {
        question: "Can a workflow run without me?",
        reponse: "Yes. The “Schedule” button runs it at the date and time you choose, once or on a recurring basis, and the result is waiting in your Files.",
      },
    ],
  },
  captures: [],
  voisines: ["plans", "planification", "rapports"],
  articles: [
    { slug: "planification-de-taches-cloud", titre: "Planification de tâches cloud : souveraineté et automatisation pour PME" },
  ],
};
