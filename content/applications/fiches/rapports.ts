import type { FicheApplication } from "../types";

/**
 * Rapports — ÉBAUCHE, à relire avant publication.
 *
 * Ce que c'est : un constructeur de tableaux de bord et de rapports PDF à partir de vos données
 * (app-catalog.ts : « Construire des rapports et tableaux de bord (type PowerBI) »). Pas un
 * générateur de rapports de texte.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Canevas libre : on glisse des visuels depuis une palette, on les déplace et les redimensionne,
 *   enregistrement automatique (src/components/os/apps/rapport/rapport-editor.tsx).
 * - Visuels : indicateur (KPI), tableau, barres, courbe, diagramme circulaire, carte (SIG)
 *   (TILE_CATALOG, src/lib/reports/report-schema.ts ; rapport.visuals.*).
 * - Réglages d'un visuel : source, dimension, mesure, agrégation (somme, moyenne, nombre, minimum,
 *   maximum), limite de lignes ou de catégories (rapport.props.*, rapport.agg.*).
 * - Sources : tout fichier CSV ou Excel (xlsx) de l'espace, à n'importe quelle profondeur de
 *   dossier, et les données tabulaires (CSV, JSON) des résultats de plans ; une couche GeoJSON pour
 *   la carte (src/lib/reports/data-source.ts, materialize.ts, geo.ts). Carte colorée par classe
 *   avec légende quand les entités en portent une (geo.ts).
 * - « Objectif » + « Générer (IA) » : l'IA conçoit les visuels à partir de l'objectif et des
 *   sources (generateReportFromGoalAction ; rapport.objective.*).
 * - « Générer » : un PDF produit en file d'attente, notification à la fin, liste des générations
 *   avec « Télécharger le PDF » (rapport.generate.*, rapport.generations.*).
 * - Livraison : « Me l'envoyer » (PDF en pièce jointe par courriel) et PDF vers Google Drive ou
 *   OneDrive (src/lib/docs/rapport-run.ts, rapport.exportEmail, rapport.exportCloud).
 * - Une source reliée à Google Drive ou OneDrive est rafraîchie depuis son origine avant chaque
 *   génération (pullFileFromRemote, rapport-run.ts).
 * - « Planifier » : régénération automatique à date et heure fixes, récurrente ou non
 *   (scheduleReportAction, src/lib/schedules/actions.ts).
 * - Partage à des équipes, qui peuvent voir et générer le rapport ; corbeille
 *   (rapports/rapports-app.tsx, rapports.row.shareDetail).
 * - Forfait : `personnel` (GET /api/v1/apps/catalog en production).
 *
 * À vérifier à la relecture :
 * - « Type PowerBI » vient du produit ; la fiche ne se dit pas « alternative à Power BI », pour ne
 *   pas promettre la même profondeur (pas de filtres croisés, pas de connecteurs de bases de
 *   données). À trancher : viser ou non cette intention de recherche.
 * - Le « Tableau de bord d'usage » (usage de crédits) n'est pas cité : la vitrine ne parle plus de
 *   crédits.
 * - Le rafraîchissement depuis Drive/OneDrive suppose un fichier relié à son origine dans Fichiers :
 *   à constater dans l'app avant de garder la phrase.
 */
export const rapports: FicheApplication = {
  id: "rapports",
  apps: ["rapports"],
  slug: { fr: "tableaux-de-bord", en: "dashboards-and-reports" },
  nom: { fr: "Rapports", en: "Reports" },
  titre: {
    fr: "Rapports, des tableaux de bord et des PDF tirés de vos données",
    en: "Reports, dashboards and PDFs built from your data",
  },
  groupe: "gestion",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Tableaux de bord et rapports PDF en ligne — Cloud OS",
      en: "Online dashboards and scheduled PDF reports — Cloud OS",
    },
    description: {
      fr: "Transformez vos fichiers CSV et Excel en tableau de bord : graphiques, indicateurs et cartes, exportés en PDF et envoyés par courriel à heure fixe.",
      en: "Turn your CSV and Excel files into an online dashboard: charts, key indicators and maps, exported to PDF and emailed to you on a set schedule.",
    },
  },
  accroche: {
    fr: "Vos fichiers CSV et Excel en graphiques, puis en rapport PDF livré à heure fixe.",
    en: "Your CSV and Excel files as charts, then as a PDF report delivered on schedule.",
  },
  motsCles: {
    fr: ["créer un tableau de bord en ligne", "rapport pdf automatique", "tableau de bord excel", "outil de reporting pme"],
    en: ["create an online dashboard", "automated pdf report", "excel dashboard", "small business reporting tool"],
  },
  corps: {
    fr: [
      {
        titre: "Un tableau de bord, glissé-déposé",
        paragraphes: [
          "Rapports est un canevas libre : vous y glissez des visuels depuis la palette, vous les placez et vous les redimensionnez comme sur une page. Chaque visuel lit une source de données, et vous choisissez la colonne à mettre en abscisse, la valeur à mesurer et le calcul à appliquer : somme, moyenne, nombre, minimum ou maximum.",
        ],
        points: [
          "Indicateur clé, tableau, barres, courbe et diagramme circulaire.",
          "Une carte, pour une couche géographique, colorée par classe avec sa légende.",
          "Enregistrement automatique à chaque modification.",
        ],
      },
      {
        titre: "Vos données, là où elles sont déjà",
        paragraphes: [
          "Les sources sont vos fichiers CSV et Excel, où qu'ils soient rangés dans vos Fichiers, et les résultats de vos plans : une analyse ou une requête de données devient directement un graphique. Pas d'import, pas de copie.",
          "Vous manquez de temps ? Décrivez l'objectif du rapport — « les ventes par région et l'évolution mensuelle du chiffre d'affaires » — et l'intelligence artificielle conçoit les visuels à partir de vos sources. Vous les ajustez ensuite à la main.",
        ],
      },
      {
        titre: "Un PDF, livré sans y penser",
        paragraphes: [
          "« Générer » produit le rapport en PDF, que vous retrouvez dans l'historique des générations. Il peut aussi vous arriver par courriel en pièce jointe, ou partir vers votre Google Drive ou votre OneDrive. Et avec « Planifier », le rapport se régénère tout seul, chaque semaine ou chaque mois, à partir des données du moment.",
          "Un rapport se partage avec une équipe, qui peut le consulter et le générer à son tour. Rapports est compris dès le forfait Personnel.",
        ],
      },
    ],
    en: [
      {
        titre: "A dashboard, by drag and drop",
        paragraphes: [
          "Reports is a free-form canvas: you drag visuals from the palette, then place and resize them as you would on a page. Each visual reads a data source, and you choose the column for the axis, the value to measure and the calculation to apply: sum, average, count, minimum or maximum.",
        ],
        points: [
          "Key indicator, table, bar chart, line chart and pie chart.",
          "A map for a geographic layer, coloured by class with its legend.",
          "Saved automatically with every change.",
        ],
      },
      {
        titre: "Your data, where it already lives",
        paragraphes: [
          "Sources are your CSV and Excel files, wherever they are filed in your Files, and the results of your plans: a data analysis or query becomes a chart directly. No import, no copy.",
          "Short on time? Describe what the report is for — “sales by region and monthly revenue trend” — and artificial intelligence designs the visuals from your sources. You then fine-tune them by hand.",
        ],
      },
      {
        titre: "A PDF, delivered without a second thought",
        paragraphes: [
          "“Generate” produces the report as a PDF, which you find in the generation history. It can also reach you by email as an attachment, or go to your Google Drive or OneDrive. And with “Schedule”, the report regenerates on its own, every week or every month, from the data of the day.",
          "A report can be shared with a team, who can view it and generate it in turn. Reports is included from the Personal plan.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Quelles données puis-je utiliser ?",
        reponse: "Vos fichiers CSV et Excel rangés dans Fichiers, et les données produites par vos plans. Pour une carte, une couche géographique au format GeoJSON.",
      },
      {
        question: "Puis-je recevoir le rapport chaque lundi ?",
        reponse: "Oui. « Planifier » régénère le rapport à la date, à l'heure et à la fréquence choisies, et l'option « Me l'envoyer » vous le fait parvenir en PDF par courriel.",
      },
      {
        question: "Mes collègues peuvent-ils voir le rapport ?",
        reponse: "Oui. Partagez-le avec une équipe : ses membres peuvent le consulter et le générer.",
      },
    ],
    en: [
      {
        question: "What data can I use?",
        reponse: "Your CSV and Excel files stored in Files, and the data produced by your plans. For a map, a geographic layer in GeoJSON format.",
      },
      {
        question: "Can I get the report every Monday?",
        reponse: "Yes. “Schedule” regenerates the report at the date, time and frequency you choose, and the “Email it to me” option sends it to you as a PDF.",
      },
      {
        question: "Can my colleagues see the report?",
        reponse: "Yes. Share it with a team: its members can view it and generate it.",
      },
    ],
  },
  captures: [],
  voisines: ["plans", "planification", "tableur", "workflows"],
  articles: [],
};
