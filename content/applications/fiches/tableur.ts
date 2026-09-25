import type { FicheApplication } from "../types";

/**
 * Tableur (Calc) — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - L'app `calc` (libellé « Calc ») crée un nouveau tableur .xlsx dans Fichiers et l'ouvre dans
 *   l'éditeur de la suite bureautique maison (Collabora Online, comme Writer) : CalcApp,
 *   src/components/os/apps/office/writer-app.tsx ; commentaire du registre (app-registry.tsx).
 * - Ordinateur seulement (`desktopOnly`, app-registry.tsx).
 * - Formats ouverts dans l'éditeur depuis Fichiers : xlsx, xls, ods, csv, fods
 *   (EDITABLE_EXTS, src/lib/office/extensions.ts).
 * - « Enregistrer sous » crée un NOUVEAU fichier à côté de l'original, qui n'est pas modifié
 *   (PutRelativeFile, src/lib/office/put-relative.ts ; UserCanNotWriteRelative: false dans
 *   src/app/wopi/files/[id]/route.ts).
 * - Insertion d'une image choisie dans Fichiers (EnableInsertRemoteImage, collabora-frame.tsx).
 * - Co-édition : « Texte, tableur et présentation, en co-édition » (/fonctions de la vitrine, déjà
 *   relue) ; la co-édition est coordonnée par l'instance Collabora (commentaire des verrous WOPI).
 * - Forfait : `personnel` (GET /api/v1/apps/catalog en production).
 *
 * À vérifier à la relecture :
 * - Les fonctions de tableur citées (formules, tri et filtres, graphiques) sont celles de l'éditeur
 *   Collabora Calc, pas du code de Cloud OS : à constater dans l'app avant publication.
 * - Même question que Writer : nommer Collabora sur la fiche, ou non (ici, non).
 * - Le nom « Calc » est aussi celui du module de LibreOffice : la fiche insiste sur la différence avec
 *   la fiche `libreoffice` (logiciel de bureau diffusé, sans co-édition).
 */
export const tableur: FicheApplication = {
  id: "tableur",
  apps: ["calc"],
  slug: { fr: "tableur", en: "spreadsheet" },
  nom: { fr: "Calc", en: "Calc" },
  titre: {
    fr: "Calc, le tableur en ligne pour vos fichiers Excel",
    en: "Calc, the online spreadsheet for your Excel files",
  },
  groupe: "bureautique",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Tableur en ligne compatible Excel, en co-édition — Cloud OS",
      en: "Online spreadsheet for Excel files, co-editing — Cloud OS",
    },
    description: {
      fr: "Ouvrez et modifiez vos classeurs Excel dans le navigateur, à plusieurs en même temps, sans rien installer. Vos fichiers restent hébergés au Québec.",
      en: "Open and edit your Excel workbooks in the browser, several people at once, with nothing to install. Your files stay in your own space, hosted in Québec.",
    },
  },
  accroche: {
    fr: "Vos classeurs Excel, dans le navigateur, à plusieurs.",
    en: "Your Excel workbooks, in the browser, together.",
  },
  motsCles: {
    fr: ["tableur en ligne", "éditeur xlsx en ligne", "ouvrir un fichier excel sans excel", "alternative à excel en ligne", "tableur partagé"],
    en: ["online spreadsheet", "online xlsx editor", "open excel file without excel", "online excel alternative", "shared spreadsheet"],
  },
  corps: {
    fr: [
      {
        titre: "Un tableur complet, dans une fenêtre du bureau",
        paragraphes: [
          "Calc est le tableur de la suite bureautique de Cloud OS, aux côtés de Writer pour le texte et d'Impress pour les présentations. Il s'ouvre dans une fenêtre de votre bureau en ligne, avec ce qu'on attend d'un tableur : formules, tri et filtres, mise en forme, graphiques.",
          "Un nouveau classeur est enregistré au format Excel (.xlsx), celui que vos clients, votre comptable et vos partenaires ouvrent sans se poser de question.",
        ],
      },
      {
        titre: "Vos classeurs existants s'ouvrent tels quels",
        paragraphes: [
          "Depuis l'application Fichiers, un classeur s'ouvre directement dans Calc. Budgets, listes de prix, suivis de projet : vous reprenez vos fichiers là où vous les aviez laissés.",
        ],
        points: [
          "Formats Excel (.xlsx, .xls), OpenDocument (.ods) et CSV.",
          "« Enregistrer sous » crée une copie dans Fichiers, à côté de l'original, qui reste intact.",
          "Une image de votre espace s'insère dans la feuille sans passer par votre ordinateur.",
        ],
      },
      {
        titre: "À plusieurs sur le même classeur",
        paragraphes: [
          "La suite bureautique de Cloud OS fonctionne en co-édition : plusieurs personnes travaillent dans le même classeur au même moment, sans s'échanger de versions par courriel ni se demander laquelle est la bonne.",
        ],
      },
      {
        titre: "Ce qu'il faut savoir",
        paragraphes: [
          "Chaque classeur vit dans l'application Fichiers de votre espace, hébergé au Québec. Rien à installer ni à mettre à jour sur votre poste. Calc s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
          "À ne pas confondre avec LibreOffice, aussi offert dans Cloud OS : c'est un logiciel de bureau complet, qu'on ouvre dans une session à part, sans co-édition.",
        ],
      },
    ],
    en: [
      {
        titre: "A full spreadsheet, in a window of the desktop",
        paragraphes: [
          "Calc is the spreadsheet of the Cloud OS office suite, alongside Writer for text and Impress for presentations. It opens in a window of your online desktop, with what you expect from a spreadsheet: formulas, sorting and filters, formatting, charts.",
          "A new workbook is saved in Excel format (.xlsx), the one your clients, your accountant and your partners open without a second thought.",
        ],
      },
      {
        titre: "Your existing workbooks open as they are",
        paragraphes: [
          "From the Files app, a workbook opens straight in Calc. Budgets, price lists, project trackers: you pick up your files where you left them.",
        ],
        points: [
          "Excel (.xlsx, .xls), OpenDocument (.ods) and CSV formats.",
          "“Save As” creates a copy in Files, next to the original, which stays untouched.",
          "An image from your space goes into the sheet without going through your computer.",
        ],
      },
      {
        titre: "Several people on the same workbook",
        paragraphes: [
          "The Cloud OS office suite supports co-editing: several people work in the same workbook at the same time, without emailing versions back and forth or wondering which one is current.",
        ],
      },
      {
        titre: "Good to know",
        paragraphes: [
          "Every workbook lives in the Files app of your own space, hosted in Québec. Nothing to install or update on your computer. Calc is used from a computer; it is not offered on phones.",
          "Not to be confused with LibreOffice, also offered in Cloud OS: that is a full desktop program, opened in a separate session, without co-editing.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Calc ouvre-t-il les fichiers Excel ?",
        reponse: "Oui. Calc ouvre les classeurs Excel (.xlsx et .xls), OpenDocument (.ods) et CSV ; un nouveau classeur est créé au format .xlsx.",
      },
      {
        question: "Peut-on travailler à plusieurs dans le même classeur ?",
        reponse: "Oui. La suite bureautique de Cloud OS fonctionne en co-édition : plusieurs personnes modifient le même fichier en même temps.",
      },
      {
        question: "Quelle différence avec LibreOffice Calc ?",
        reponse: "Calc fait partie de la suite bureautique intégrée de Cloud OS : il ouvre vos fichiers directement depuis Fichiers et permet la co-édition. LibreOffice, aussi offert, est le logiciel de bureau complet, ouvert dans une session à part, sans co-édition.",
      },
      {
        question: "Faut-il acheter une licence de tableur ?",
        reponse: "Non. Calc est compris dans l'abonnement dès le forfait Personnel, comme le reste de la suite bureautique.",
      },
    ],
    en: [
      {
        question: "Does Calc open Excel files?",
        reponse: "Yes. Calc opens Excel (.xlsx and .xls), OpenDocument (.ods) and CSV workbooks; a new workbook is created in .xlsx format.",
      },
      {
        question: "Can several people work in the same workbook?",
        reponse: "Yes. The Cloud OS office suite supports co-editing: several people edit the same file at the same time.",
      },
      {
        question: "How is it different from LibreOffice Calc?",
        reponse: "Calc is part of the built-in Cloud OS office suite: it opens your files straight from Files and supports co-editing. LibreOffice, also offered, is the full desktop program, opened in a separate session, without co-editing.",
      },
      {
        question: "Do I need to buy a spreadsheet licence?",
        reponse: "No. Calc is included in the subscription from the Personal plan, like the rest of the office suite.",
      },
    ],
  },
  captures: [],
  voisines: ["writer", "presentation", "libreoffice", "erp"],
  articles: [
    { slug: "onlyoffice-vs-libreoffice", titre: "OnlyOffice vs LibreOffice : quelle suite choisir pour votre PME ?" },
    { slug: "partage-de-fichiers-securise", titre: "Partage de fichiers sécurisé : ce que les équipes doivent exiger" },
  ],
};
