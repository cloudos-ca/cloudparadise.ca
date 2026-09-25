import type { FicheApplication } from "../types";

/**
 * Présentation (Impress) — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - L'app `impress` (libellé « Impress ») crée une nouvelle présentation .pptx dans Fichiers et
 *   l'ouvre dans l'éditeur de la suite bureautique maison (Collabora Online, comme Writer) :
 *   ImpressApp, src/components/os/apps/office/writer-app.tsx ; commentaire du registre.
 * - Ordinateur seulement (`desktopOnly`, app-registry.tsx).
 * - Formats ouverts dans l'éditeur depuis Fichiers : pptx, ppt, odp, fodp
 *   (EDITABLE_EXTS, src/lib/office/extensions.ts).
 * - « Enregistrer sous » crée un NOUVEAU fichier à côté de l'original (PutRelativeFile,
 *   src/lib/office/put-relative.ts).
 * - Insertion d'une image, ou d'un fichier audio ou vidéo, choisi dans Fichiers
 *   (EnableInsertRemoteImage / EnableInsertRemoteFile, prepareInsertMediaAction « image » et
 *   « multimedia » : src/lib/office/actions.ts, collabora-frame.tsx).
 * - Co-édition : « Texte, tableur et présentation, en co-édition » (/fonctions, déjà relue).
 * - Forfait : `personnel` (GET /api/v1/apps/catalog en production).
 *
 * À vérifier à la relecture :
 * - Les fonctions citées (dispositions, thèmes, transitions, diaporama en plein écran) sont celles
 *   de l'éditeur Collabora Impress : à constater dans l'app, en particulier le plein écran dans la
 *   fenêtre du bureau.
 * - L'insertion audio/vidéo : vérifiée dans le code, pas constatée dans l'app.
 * - Même question que Writer : nommer Collabora, ou non (ici, non).
 */
export const presentation: FicheApplication = {
  id: "presentation",
  apps: ["impress"],
  slug: { fr: "presentation", en: "presentations" },
  nom: { fr: "Impress", en: "Impress" },
  titre: {
    fr: "Impress, vos présentations PowerPoint en ligne",
    en: "Impress, your PowerPoint presentations online",
  },
  groupe: "bureautique",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Présentations en ligne compatibles PowerPoint — Cloud OS",
      en: "Online presentations for PowerPoint files — Cloud OS",
    },
    description: {
      fr: "Créez et modifiez vos présentations PowerPoint dans le navigateur, à plusieurs, sans rien installer. Vos fichiers restent dans votre espace, hébergé au Québec.",
      en: "Create and edit your PowerPoint presentations in the browser, several people at once, with nothing to install. Your files stay in your space, hosted in Québec.",
    },
  },
  accroche: {
    fr: "Vos présentations PowerPoint, dans le navigateur, à plusieurs.",
    en: "Your PowerPoint presentations, in the browser, together.",
  },
  motsCles: {
    fr: ["logiciel de présentation en ligne", "éditeur pptx en ligne", "ouvrir un powerpoint sans powerpoint", "alternative à powerpoint en ligne"],
    en: ["online presentation software", "online pptx editor", "open powerpoint without powerpoint", "online powerpoint alternative"],
  },
  corps: {
    fr: [
      {
        titre: "Des diapositives, sans logiciel à installer",
        paragraphes: [
          "Impress est l'outil de présentation de la suite bureautique de Cloud OS, avec Writer pour le texte et Calc pour le tableur. Il s'ouvre dans une fenêtre de votre bureau en ligne : dispositions de diapositives, texte, images, formes, transitions, puis le diaporama pour présenter.",
          "Une nouvelle présentation est enregistrée au format PowerPoint (.pptx) : celle que vous envoyez à un client ou projetez chez un partenaire s'ouvre sans surprise.",
        ],
      },
      {
        titre: "Vos images et vos vidéos sont déjà là",
        paragraphes: [
          "Une présentation s'ouvre directement depuis l'application Fichiers. Pour l'illustrer, vous insérez une image, un extrait audio ou une vidéo choisis dans votre espace, sans les télécharger d'abord sur votre ordinateur.",
        ],
        points: [
          "Formats PowerPoint (.pptx, .ppt) et OpenDocument (.odp).",
          "« Enregistrer sous » crée une copie dans Fichiers, à côté de l'original, qui reste intact.",
        ],
      },
      {
        titre: "À plusieurs sur la même présentation",
        paragraphes: [
          "La suite bureautique de Cloud OS fonctionne en co-édition : chacun prépare ses diapositives dans le même fichier, au même moment, au lieu d'assembler cinq versions la veille de la réunion.",
        ],
      },
      {
        titre: "Ce qu'il faut savoir",
        paragraphes: [
          "Chaque présentation vit dans l'application Fichiers de votre espace, hébergé au Québec. Impress s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone. À ne pas confondre avec LibreOffice Impress, offert aussi dans Cloud OS comme logiciel de bureau complet, dans une session à part et sans co-édition.",
        ],
      },
    ],
    en: [
      {
        titre: "Slides, with no software to install",
        paragraphes: [
          "Impress is the presentation tool of the Cloud OS office suite, with Writer for text and Calc for spreadsheets. It opens in a window of your online desktop: slide layouts, text, images, shapes, transitions, then the slideshow to present.",
          "A new presentation is saved in PowerPoint format (.pptx): the deck you send to a client or project at a partner's office opens without surprises.",
        ],
      },
      {
        titre: "Your images and videos are already there",
        paragraphes: [
          "A presentation opens straight from the Files app. To illustrate it, you insert an image, an audio clip or a video picked from your space, without downloading it to your computer first.",
        ],
        points: [
          "PowerPoint (.pptx, .ppt) and OpenDocument (.odp) formats.",
          "“Save As” creates a copy in Files, next to the original, which stays untouched.",
        ],
      },
      {
        titre: "Several people on the same presentation",
        paragraphes: [
          "The Cloud OS office suite supports co-editing: everyone prepares their slides in the same file at the same time, instead of stitching five versions together the night before the meeting.",
        ],
      },
      {
        titre: "Good to know",
        paragraphes: [
          "Every presentation lives in the Files app of your own space, hosted in Québec. Impress is used from a computer; it is not offered on phones. Not to be confused with LibreOffice Impress, also offered in Cloud OS as a full desktop program, in a separate session and without co-editing.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Impress ouvre-t-il les fichiers PowerPoint ?",
        reponse: "Oui. Impress ouvre les présentations PowerPoint (.pptx et .ppt) et OpenDocument (.odp) ; une nouvelle présentation est créée au format .pptx.",
      },
      {
        question: "Peut-on insérer une vidéo dans une présentation ?",
        reponse: "Oui. Impress insère une image, un fichier audio ou une vidéo choisis dans votre espace Fichiers, sans passer par votre ordinateur.",
      },
      {
        question: "Peut-on préparer une présentation à plusieurs ?",
        reponse: "Oui. La suite bureautique de Cloud OS fonctionne en co-édition : plusieurs personnes modifient la même présentation en même temps.",
      },
      {
        question: "Faut-il acheter une licence de logiciel de présentation ?",
        reponse: "Non. Impress est compris dans l'abonnement dès le forfait Personnel, comme le reste de la suite bureautique.",
      },
    ],
    en: [
      {
        question: "Does Impress open PowerPoint files?",
        reponse: "Yes. Impress opens PowerPoint (.pptx and .ppt) and OpenDocument (.odp) presentations; a new presentation is created in .pptx format.",
      },
      {
        question: "Can I put a video in a presentation?",
        reponse: "Yes. Impress inserts an image, an audio file or a video picked from your Files space, without going through your computer.",
      },
      {
        question: "Can several people prepare a presentation together?",
        reponse: "Yes. The Cloud OS office suite supports co-editing: several people edit the same presentation at the same time.",
      },
      {
        question: "Do I need to buy a presentation software licence?",
        reponse: "No. Impress is included in the subscription from the Personal plan, like the rest of the office suite.",
      },
    ],
  },
  captures: [],
  voisines: ["writer", "tableur", "libreoffice", "onlyoffice"],
  articles: [
    { slug: "onlyoffice-vs-libreoffice", titre: "OnlyOffice vs LibreOffice : quelle suite choisir pour votre PME ?" },
  ],
};
