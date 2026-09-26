import type { FicheApplication } from "../types";

/**
 * ONLYOFFICE — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - ONLYOFFICE est l'image `infra/kasm-images/apps/onlyoffice` du produit (arm64, 2026-09-25 : LinuxServer.io ne publie `linuxserver/onlyoffice` qu'en amd64), diffusée dans une fenêtre du bureau
 *   (src/lib/marketplace/desktop-apps-catalog.ts, libellé « ONLYOFFICE », « Suite bureautique
 *   compatible Microsoft Office ») ; ordinateur seulement (`desktopOnly`).
 * - L'image installe ONLYOFFICE Desktop Editors, la version de bureau (paquet
 *   onlyoffice-desktopeditors des publications de github.com/ONLYOFFICE/DesktopEditors : Dockerfile
 *   de github.com/linuxserver/docker-onlyoffice, lu le 2026-09-25 ; l'image arm64 du produit installe le même
 *   paquet, le `.deb` officiel d'ONLYOFFICE).
 * - Un fichier importé depuis Fichiers s'ouvre directement dans l'éditeur
 *   (`openCmd: "onlyoffice-desktopeditors"`, importFilesToDesktopAppAction) ; jusqu'à 20 fichiers
 *   par import (MAX_IMPORT_FILES).
 * - « Enregistrer » renvoie les fichiers dans Fichiers, chacun comme un nouveau fichier
 *   (exportDesktopAppFilesAction) ; session temporaire (reaper.ts).
 * - Forfait : `personnel` (GET /api/v1/apps/catalog en production).
 * - Licence AGPL-3.0 (API GitHub du dépôt ONLYOFFICE/DesktopEditors), éditeur Ascensio System SIA.
 *
 * À vérifier à la relecture :
 * - Que le pont fichiers (MARKETPLACE_APPFILES) est actif en production.
 * - Les fonctions citées (documents, classeurs, présentations, PDF, formulaires) sont celles que
 *   l'éditeur annonce pour Desktop Editors : à constater dans l'app.
 * - Pas de co-édition dans Cloud OS : Desktop Editors peut se connecter à un espace ONLYOFFICE en
 *   ligne pour co-éditer, ce que Cloud OS ne fournit pas. La fiche n'en parle pas.
 * - Graphie : l'éditeur écrit « ONLYOFFICE » ; l'article du blogue écrit « OnlyOffice ».
 */
export const onlyoffice: FicheApplication = {
  id: "onlyoffice",
  apps: ["desktop-onlyoffice"],
  slug: { fr: "onlyoffice", en: "onlyoffice" },
  nom: { fr: "ONLYOFFICE", en: "ONLYOFFICE" },
  tiers: { editeur: "Ascensio System SIA", licence: "AGPL-3.0", site: "https://www.onlyoffice.com/" },
  titre: {
    fr: "ONLYOFFICE en ligne, sans rien installer",
    en: "ONLYOFFICE online, with nothing to install",
  },
  groupe: "bureautique",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "ONLYOFFICE en ligne, compatible Microsoft Office — Cloud OS",
      en: "ONLYOFFICE online, Microsoft Office compatible — Cloud OS",
    },
    description: {
      fr: "Utilisez ONLYOFFICE Desktop Editors dans le navigateur pour vos fichiers Word, Excel et PowerPoint : rien à installer, fichiers hébergés au Québec.",
      en: "Use ONLYOFFICE Desktop Editors in your browser for your Word, Excel and PowerPoint files: nothing to install, and your files hosted in Québec.",
    },
  },
  accroche: {
    fr: "La suite bureautique libre pensée pour les formats Microsoft, dans votre navigateur.",
    en: "The free office suite built around Microsoft formats, in your browser.",
  },
  motsCles: {
    fr: ["onlyoffice en ligne", "onlyoffice sans installation", "onlyoffice desktop editors", "suite bureautique compatible microsoft office", "alternative à microsoft office"],
    en: ["onlyoffice online", "onlyoffice without installing", "onlyoffice desktop editors", "microsoft office compatible suite", "microsoft office alternative"],
  },
  corps: {
    fr: [
      {
        titre: "ONLYOFFICE Desktop Editors, tel quel",
        paragraphes: [
          "ONLYOFFICE est une suite bureautique libre construite autour des formats de Microsoft Office : documents Word (.docx), classeurs Excel (.xlsx) et présentations PowerPoint (.pptx) sont ses formats de travail, pas des formats convertis. Son éditeur y ajoute l'édition de PDF et les formulaires.",
          "Dans Cloud OS, c'est ONLYOFFICE Desktop Editors, la version de bureau, qui tourne dans une fenêtre de votre bureau en ligne, avec son interface à onglets. Aucune installation sur votre poste, aucune mise à jour à suivre.",
        ],
      },
      {
        titre: "Vos documents restent dans votre espace",
        paragraphes: [
          "Vous choisissez des documents dans l'application Fichiers, et ils s'ouvrent directement dans ONLYOFFICE. Une fois le travail fait, vous les renvoyez dans Fichiers.",
        ],
        points: [
          "Plusieurs fichiers importés à la suite, sans refermer la fenêtre d'import.",
          "Chaque fichier renvoyé arrive comme un nouveau fichier : l'original n'est jamais écrasé.",
          "Vos fichiers sont hébergés au Québec.",
        ],
      },
      {
        titre: "ONLYOFFICE ou la suite bureautique de Cloud OS ?",
        paragraphes: [
          "Cloud OS a aussi sa propre suite bureautique — Writer, Calc et Impress — qui ouvre vos fichiers d'un double-clic et permet de travailler à plusieurs sur le même document. ONLYOFFICE est là quand vous préférez son interface, proche de celle de Microsoft Office, ou quand un document complexe s'y affiche mieux : le plus simple reste d'essayer vos propres fichiers dans les deux.",
        ],
      },
      {
        titre: "Ce qu'il faut savoir",
        paragraphes: [
          "La session d'ONLYOFFICE est temporaire : pensez à renvoyer votre travail dans Fichiers avant de la fermer, c'est là qu'il est conservé. ONLYOFFICE s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
        ],
      },
    ],
    en: [
      {
        titre: "ONLYOFFICE Desktop Editors, as is",
        paragraphes: [
          "ONLYOFFICE is a free office suite built around Microsoft Office formats: Word documents (.docx), Excel workbooks (.xlsx) and PowerPoint presentations (.pptx) are its working formats, not converted ones. Its publisher adds PDF editing and forms.",
          "In Cloud OS, ONLYOFFICE Desktop Editors, the desktop version, runs in a window of your online desktop, with its tabbed interface. Nothing to install on your computer, no updates to keep up with.",
        ],
      },
      {
        titre: "Your documents stay in your own space",
        paragraphes: [
          "You pick documents in the Files app, and they open straight in ONLYOFFICE. Once the work is done, you send them back to Files.",
        ],
        points: [
          "Several files imported one after another, without closing the import window.",
          "Every file sent back arrives as a new file: the original is never overwritten.",
          "Your files are hosted in Québec.",
        ],
      },
      {
        titre: "ONLYOFFICE or the Cloud OS office suite?",
        paragraphes: [
          "Cloud OS also has its own office suite — Writer, Calc and Impress — which opens your files with a double-click and lets several people work on the same document. ONLYOFFICE is there when you prefer its interface, close to Microsoft Office, or when a complex document displays better in it: the simplest way to know is to try your own files in both.",
        ],
      },
      {
        titre: "Good to know",
        paragraphes: [
          "An ONLYOFFICE session is temporary: remember to send your work back to Files before closing it, since that is where it is kept. ONLYOFFICE is used from a computer; it is not offered on phones.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Faut-il installer ONLYOFFICE pour l'utiliser dans Cloud OS ?",
        reponse: "Non. ONLYOFFICE Desktop Editors tourne dans une fenêtre de votre bureau en ligne, depuis le navigateur. Il n'y a rien à installer ni à mettre à jour sur votre ordinateur.",
      },
      {
        question: "Peut-on co-éditer un document dans ONLYOFFICE ?",
        reponse: "Pas dans Cloud OS : chaque session d'ONLYOFFICE est la vôtre. Pour écrire à plusieurs sur le même document, utilisez la suite bureautique de Cloud OS (Writer, Calc, Impress), qui fonctionne en co-édition.",
      },
      {
        question: "Mes documents originaux risquent-ils d'être écrasés ?",
        reponse: "Non. Les fichiers que vous renvoyez d'ONLYOFFICE vers Fichiers arrivent comme de nouveaux fichiers ; l'original reste tel quel.",
      },
      {
        question: "ONLYOFFICE est-il compris dans l'abonnement ?",
        reponse: "Oui, dès le forfait Personnel, comme les autres logiciels du bureau. Il n'y a pas de frais par application : chaque ouverture compte comme une tâche dans l'enveloppe de votre forfait.",
      },
    ],
    en: [
      {
        question: "Do I need to install ONLYOFFICE to use it in Cloud OS?",
        reponse: "No. ONLYOFFICE Desktop Editors runs in a window of your online desktop, from the browser. There is nothing to install or update on your computer.",
      },
      {
        question: "Can I co-edit a document in ONLYOFFICE?",
        reponse: "Not in Cloud OS: each ONLYOFFICE session is your own. To write together on the same document, use the Cloud OS office suite (Writer, Calc, Impress), which supports co-editing.",
      },
      {
        question: "Could my original documents be overwritten?",
        reponse: "No. Files you send back from ONLYOFFICE to Files arrive as new files; the original stays as it was.",
      },
      {
        question: "Is ONLYOFFICE included in the subscription?",
        reponse: "Yes, from the Personal plan, like the other desktop software. There is no fee per app: each launch counts as one task in your plan's allowance.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/onlyoffice/onlyoffice-classeur.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "ONLYOFFICE dans Cloud OS : un classeur Excel et ses formules, importé depuis Fichiers",
        en: "ONLYOFFICE in Cloud OS: an Excel workbook and its formulas, imported from Files",
      },
    },
  ],
  voisines: ["libreoffice", "writer", "tableur", "calligra"],
  articles: [
    { slug: "onlyoffice-vs-libreoffice", titre: "OnlyOffice vs LibreOffice : quelle suite choisir pour votre PME ?" },
  ],
};
