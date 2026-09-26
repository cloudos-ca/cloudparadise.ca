import type { FicheApplication } from "../types";

/**
 * Retouche d'image (miniPaint) — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - L'app `image-editor-advanced` intègre miniPaint, éditeur d'images web libre, dans une iframe
 *   (src/components/os/apps/image-editor-advanced/image-editor-advanced-app.tsx). C'est un fork servi
 *   par l'infrastructure de Cloud OS (infra/aws/cloudos/compose/editeurs.yml) ; le registre l'affiche
 *   sous le nom « miniPaint » (app-registry.tsx), épinglée, ordinateur seulement (`desktopOnly`).
 * - Elle s'ouvre sur une image choisie dans Fichiers (menu « Édition avancée », file-grid.tsx,
 *   src/lib/formats/apps.ts) ; ouverte seule, elle invite à ouvrir une image depuis Fichiers
 *   (`mediaEditors.imageAdvanced.openHint`). Formats proposés : PNG, JPEG, GIF, WebP, BMP, TIFF,
 *   AVIF, ICO, SVG (src/lib/formats/catalog.ts). La fiche ne cite que PNG, JPEG, WebP et GIF : les
 *   autres dépendent du décodage du navigateur (TIFF notamment), non vérifié.
 * - « Enregistrer dans le dataset » aplatit l'image en PNG et la crée comme NOUVEAU fichier
 *   « <nom>-édité.png », dans le dossier de l'original (parentId) : l'original n'est pas touché, les
 *   calques ne sont pas conservés (handleSave).
 * - Rien ne tourne sur le poste : c'est une page web, pas une session de logiciel de bureau.
 * - Description du produit : « Édition d'image avancée avec calques (type Photoshop) — retouche
 *   photo, dessin » (src/lib/os/app-catalog.ts).
 * - Forfait : `personnel` (GET /api/v1/apps/catalog, production, 2026-09-25).
 *
 * À vérifier à la relecture :
 * - les outils cités (calques, sélection, pinceau, texte, recadrage, redimensionnement, réglages des
 *   couleurs, filtres) sont ceux de miniPaint en amont ; le fork maison n'a pas été ouvert (son code
 *   est hors dépôt, /srv/cloudos/editeurs) ;
 * - nommer miniPaint sur la fiche (fait ici : c'est le nom affiché dans le bureau) — licence MIT,
 *   auteur ViliusL, à confirmer si on veut la citer ;
 * - le menu « Édition avancée » n'est pas traduit (EDITOR_LABEL, FR seulement) : la fiche EN le cite
 *   en français, avec sa traduction entre parenthèses ;
 * - le bouton dit « dataset » : libellé de l'interface à revoir côté produit, la fiche dit « Fichiers ».
 */
export const retoucheImage: FicheApplication = {
  id: "retouche-image",
  apps: ["image-editor-advanced"],
  slug: { fr: "retouche-image", en: "image-editor" },
  nom: { fr: "Retouche d'image", en: "Image editor" },
  titre: {
    fr: "Retouche photo en ligne, avec calques",
    en: "Online photo editor, with layers",
  },
  groupe: "images",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Retouche photo en ligne, avec calques — Cloud OS",
      en: "Online photo editor with layers, in your browser — Cloud OS",
    },
    description: {
      fr: "Retouchez vos photos dans le navigateur : calques, sélection, texte, recadrage, filtres. L'image retouchée revient dans vos fichiers, sans écraser l'original.",
      en: "Edit your photos in the browser: layers, selections, text, cropping and filters. The edited image goes back to your files without overwriting the original.",
    },
  },
  accroche: {
    fr: "Une retouche d'image à calques, ouverte en un clic depuis vos fichiers.",
    en: "A layer-based image editor, opened in one click from your files.",
  },
  motsCles: {
    fr: ["retouche photo en ligne", "éditeur d'image en ligne avec calques", "retoucher une photo sans logiciel", "alternative à photoshop en ligne"],
    en: ["online photo editor", "online image editor with layers", "edit a photo without software", "online photoshop alternative"],
  },
  corps: {
    fr: [
      {
        titre: "Retoucher une image sans quitter vos fichiers",
        paragraphes: [
          "Dans l'application Fichiers, un clic droit sur une photo, « Édition avancée », et elle s'ouvre dans l'éditeur. Pas de logiciel à lancer, pas de téléversement vers un site tiers : l'image passe directement de votre espace à l'éditeur, et l'éditeur est servi par Cloud OS.",
          "L'éditeur s'appuie sur miniPaint, un éditeur d'images libre qui fonctionne dans le navigateur ; c'est sous ce nom qu'il apparaît sur votre bureau.",
        ],
      },
      {
        titre: "Les outils d'un éditeur à calques",
        paragraphes: [
          "Il travaille par calques, comme les logiciels de retouche de bureau : vous superposez une photo, un texte, une forme, et vous les modifiez séparément.",
        ],
        points: [
          "Calques, sélections, pinceau et gomme.",
          "Texte et formes.",
          "Recadrage, rotation et redimensionnement.",
          "Réglages des couleurs, de la luminosité et du contraste, filtres et effets.",
          "Photos PNG, JPEG, WebP ou GIF.",
        ],
      },
      {
        titre: "L'original n'est jamais écrasé",
        paragraphes: [
          "« Enregistrer » crée un nouveau fichier PNG, nommé d'après l'original suivi de « -édité », dans le même dossier que lui. Votre photo de départ reste intacte, et vos fichiers sont hébergés au Québec.",
          "À l'enregistrement, les calques sont fusionnés en une seule image. L'éditeur s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
        ],
      },
    ],
    en: [
      {
        titre: "Edit an image without leaving your files",
        paragraphes: [
          "In the Files app, right-click a photo, choose “Édition avancée” (advanced editing), and it opens in the editor. No software to launch, no upload to a third-party site: the image goes straight from your space to the editor, and the editor is served by Cloud OS.",
          "The editor is built on miniPaint, a free image editor that runs in the browser; that is the name it goes by on your desktop.",
        ],
      },
      {
        titre: "The tools of a layer-based editor",
        paragraphes: [
          "It works with layers, like desktop photo editing software: you stack a photo, some text and a shape, and edit each one separately.",
        ],
        points: [
          "Layers, selections, brush and eraser.",
          "Text and shapes.",
          "Cropping, rotating and resizing.",
          "Colour, brightness and contrast adjustments, filters and effects.",
          "PNG, JPEG, WebP or GIF photos.",
        ],
      },
      {
        titre: "The original is never overwritten",
        paragraphes: [
          "“Save” creates a new PNG file, named after the original followed by “-édité”, in the same folder. Your starting photo stays untouched, and your files are hosted in Québec.",
          "When you save, the layers are merged into a single image. The editor is used from a computer; it is not offered on phones.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Faut-il installer un logiciel pour retoucher mes photos ?",
        reponse: "Non. L'éditeur s'ouvre dans une fenêtre de votre bureau en ligne, depuis le navigateur. Il n'y a rien à installer sur votre ordinateur.",
      },
      {
        question: "Mes photos sont-elles envoyées à un site externe ?",
        reponse: "Non. L'éditeur est servi par Cloud OS, et l'image retouchée revient dans votre espace, hébergé au Québec.",
      },
      {
        question: "Les calques sont-ils conservés à l'enregistrement ?",
        reponse: "Non. L'enregistrement produit une image PNG aplatie. Pour un projet qu'on reprend souvent, calques compris, GIMP ou Krita, aussi offerts dans Cloud OS, conviennent mieux.",
      },
      {
        question: "La retouche d'image coûte-t-elle un supplément ?",
        reponse: "Non. Elle est comprise dans l'abonnement dès le forfait Personnel.",
      },
    ],
    en: [
      {
        question: "Do I need to install software to edit my photos?",
        reponse: "No. The editor opens in a window of your online desktop, from the browser. There is nothing to install on your computer.",
      },
      {
        question: "Are my photos sent to an outside website?",
        reponse: "No. The editor is served by Cloud OS, and the edited image goes back to your own space, hosted in Québec.",
      },
      {
        question: "Are layers kept when I save?",
        reponse: "No. Saving produces a flattened PNG image. For a project you come back to often, layers included, GIMP or Krita, also offered in Cloud OS, are a better fit.",
      },
      {
        question: "Does the image editor cost extra?",
        reponse: "No. It is included in the subscription from the Personal plan.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/retouche-image/retouche-image-minipaint.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "miniPaint dans Cloud OS : une image ouverte depuis Fichiers pour la retouche par calques",
        en: "miniPaint in Cloud OS: an image opened from Files for layer-based editing",
      },
    },
  ],
  voisines: ["gimp", "krita", "fichiers"],
  articles: [],
};
