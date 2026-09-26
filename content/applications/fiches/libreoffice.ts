import type { FicheApplication } from "../types";

/**
 * LibreOffice — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - LibreOffice est l'image `linuxserver/libreoffice`, diffusée dans une fenêtre du bureau
 *   (src/lib/marketplace/desktop-apps-catalog.ts) ; ordinateur seulement (`desktopOnly`).
 * - Un fichier importé depuis Fichiers s'ouvre directement dans LibreOffice (`openCmd: "soffice"`,
 *   importFilesToDesktopAppAction, src/lib/marketplace/actions.ts) ; jusqu'à 20 fichiers par import
 *   (MAX_IMPORT_FILES).
 * - « Enregistrer » renvoie les fichiers créés ou modifiés dans Fichiers, chacun comme un nouveau
 *   fichier (exportDesktopAppFilesAction).
 * - Session temporaire (reaper.ts), comme GIMP.
 * - Forfait : `personnel` (GET /api/v1/apps/catalog en production).
 * - Modules : l'image installe le paquet `libreoffice` complet et un JRE, et pose Writer, Calc,
 *   Impress, Draw, Math et Base sur son bureau (Dockerfile et root/defaults/autostart de
 *   github.com/linuxserver/docker-libreoffice, branche master, lus le 2026-09-25).
 * - Licence MPL-2.0, éditée par The Document Foundation (libreoffice.org).
 *
 * À vérifier à la relecture :
 * - Que le pont fichiers (MARKETPLACE_APPFILES) est actif en production, comme pour GIMP.
 * - Les six modules, constatés dans le Dockerfile amont et non dans l'app : ouvrir l'app et regarder
 *   (Base en particulier, qui dépend de Java).
 * - Pas de co-édition dans le logiciel de bureau (session d'une personne) : c'est ce qui le
 *   distingue de la suite maison (fiches writer, tableur, presentation).
 */
export const libreoffice: FicheApplication = {
  id: "libreoffice",
  apps: ["desktop-libreoffice"],
  slug: { fr: "libreoffice", en: "libreoffice" },
  nom: { fr: "LibreOffice", en: "LibreOffice" },
  tiers: { editeur: "The Document Foundation", licence: "MPL-2.0", site: "https://www.libreoffice.org/" },
  titre: {
    fr: "LibreOffice en ligne, sans rien installer",
    en: "LibreOffice online, with nothing to install",
  },
  groupe: "bureautique",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "LibreOffice en ligne : suite bureautique complète — Cloud OS",
      en: "LibreOffice online: the full suite, no install — Cloud OS",
    },
    description: {
      fr: "Utilisez LibreOffice complet dans le navigateur : Writer, Calc, Impress, Draw et Base. Rien à installer, et vos fichiers restent hébergés au Québec.",
      en: "Use the full LibreOffice in your browser: Writer, Calc, Impress, Draw and Base. Nothing to install, and your files stay in your own space, hosted in Québec.",
    },
  },
  accroche: {
    fr: "La suite bureautique libre complète, dans votre navigateur.",
    en: "The complete free office suite, in your browser.",
  },
  motsCles: {
    fr: ["libreoffice en ligne", "libreoffice sans installation", "libreoffice dans le navigateur", "suite bureautique gratuite", "alternative à microsoft office"],
    en: ["libreoffice online", "libreoffice without installing", "libreoffice in the browser", "free office suite", "microsoft office alternative"],
  },
  corps: {
    fr: [
      {
        titre: "Le vrai LibreOffice, avec tous ses modules",
        paragraphes: [
          "LibreOffice est la suite bureautique libre de référence, développée par The Document Foundation. Dans Cloud OS, c'est le logiciel de bureau lui-même qui tourne dans une fenêtre de votre bureau en ligne, avec ses menus, ses options et ses modules :",
        ],
        points: [
          "Writer pour le texte, Calc pour le tableur, Impress pour les présentations ;",
          "Draw pour les schémas et les diagrammes ;",
          "Math pour les formules ;",
          "Base pour les petites bases de données.",
        ],
      },
      {
        titre: "Vos documents restent dans votre espace",
        paragraphes: [
          "Vous choisissez des documents dans l'application Fichiers, et ils s'ouvrent directement dans LibreOffice. Une fois le travail fait, vous les renvoyez dans Fichiers.",
        ],
        points: [
          "Plusieurs fichiers importés à la suite, sans refermer la fenêtre d'import.",
          "Chaque fichier renvoyé arrive comme un nouveau fichier : l'original n'est jamais écrasé.",
          "Vos fichiers sont hébergés au Québec.",
        ],
      },
      {
        titre: "LibreOffice ou la suite bureautique de Cloud OS ?",
        paragraphes: [
          "Cloud OS a aussi sa propre suite bureautique — Writer, Calc et Impress — qui ouvre vos fichiers d'un double-clic dans Fichiers et permet de travailler à plusieurs sur le même document. C'est elle qu'on prend au quotidien. LibreOffice sert quand il vous faut le logiciel de bureau complet : Draw, Math ou Base, des options avancées, ou des documents conçus pour lui.",
        ],
      },
      {
        titre: "Ce qu'il faut savoir",
        paragraphes: [
          "La session de LibreOffice est temporaire : pensez à renvoyer votre travail dans Fichiers avant de la fermer, c'est là qu'il est conservé. LibreOffice s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
        ],
      },
    ],
    en: [
      {
        titre: "The real LibreOffice, with all its modules",
        paragraphes: [
          "LibreOffice is the leading free office suite, developed by The Document Foundation. In Cloud OS, the desktop program itself runs in a window of your online desktop, with its menus, its options and its modules:",
        ],
        points: [
          "Writer for text, Calc for spreadsheets, Impress for presentations;",
          "Draw for diagrams and drawings;",
          "Math for formulas;",
          "Base for small databases.",
        ],
      },
      {
        titre: "Your documents stay in your own space",
        paragraphes: [
          "You pick documents in the Files app, and they open straight in LibreOffice. Once the work is done, you send them back to Files.",
        ],
        points: [
          "Several files imported one after another, without closing the import window.",
          "Every file sent back arrives as a new file: the original is never overwritten.",
          "Your files are hosted in Québec.",
        ],
      },
      {
        titre: "LibreOffice or the Cloud OS office suite?",
        paragraphes: [
          "Cloud OS also has its own office suite — Writer, Calc and Impress — which opens your files with a double-click in Files and lets several people work on the same document. That is the one for everyday work. LibreOffice is there when you need the full desktop program: Draw, Math or Base, advanced options, or documents built for it.",
        ],
      },
      {
        titre: "Good to know",
        paragraphes: [
          "A LibreOffice session is temporary: remember to send your work back to Files before closing it, since that is where it is kept. LibreOffice is used from a computer; it is not offered on phones.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Faut-il installer LibreOffice pour l'utiliser dans Cloud OS ?",
        reponse: "Non. LibreOffice tourne dans une fenêtre de votre bureau en ligne, depuis le navigateur. Il n'y a rien à installer ni à mettre à jour sur votre ordinateur.",
      },
      {
        question: "Peut-on travailler à plusieurs dans LibreOffice ?",
        reponse: "Pas dans le logiciel de bureau : chaque session est la vôtre. Pour écrire à plusieurs sur le même document, utilisez la suite bureautique de Cloud OS (Writer, Calc, Impress), qui fonctionne en co-édition.",
      },
      {
        question: "Mes documents originaux risquent-ils d'être écrasés ?",
        reponse: "Non. Les fichiers que vous renvoyez de LibreOffice vers Fichiers arrivent comme de nouveaux fichiers ; l'original reste tel quel.",
      },
      {
        question: "LibreOffice est-il compris dans l'abonnement ?",
        reponse: "Oui, dès le forfait Personnel, comme les autres logiciels du bureau. Il n'y a pas de frais par application : chaque ouverture compte comme une tâche dans l'enveloppe de votre forfait.",
      },
    ],
    en: [
      {
        question: "Do I need to install LibreOffice to use it in Cloud OS?",
        reponse: "No. LibreOffice runs in a window of your online desktop, from the browser. There is nothing to install or update on your computer.",
      },
      {
        question: "Can several people work together in LibreOffice?",
        reponse: "Not in the desktop program: each session is your own. To write together on the same document, use the Cloud OS office suite (Writer, Calc, Impress), which supports co-editing.",
      },
      {
        question: "Could my original documents be overwritten?",
        reponse: "No. Files you send back from LibreOffice to Files arrive as new files; the original stays as it was.",
      },
      {
        question: "Is LibreOffice included in the subscription?",
        reponse: "Yes, from the Personal plan, like the other desktop software. There is no fee per app: each launch counts as one task in your plan's allowance.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/libreoffice/libreoffice-impress.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "LibreOffice Impress dans Cloud OS : une présentation PowerPoint importée depuis Fichiers",
        en: "LibreOffice Impress in Cloud OS: a PowerPoint presentation imported from Files",
      },
    },
  ],
  voisines: ["writer", "tableur", "onlyoffice", "calligra"],
  articles: [
    { slug: "onlyoffice-vs-libreoffice", titre: "OnlyOffice vs LibreOffice : quelle suite choisir pour votre PME ?" },
  ],
};
