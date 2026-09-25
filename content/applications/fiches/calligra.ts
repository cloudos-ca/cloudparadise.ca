import type { FicheApplication } from "../types";

/**
 * Calligra — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Calligra est l'image `linuxserver/calligra`, diffusée dans une fenêtre du bureau
 *   (src/lib/marketplace/desktop-apps-catalog.ts, « Suite bureautique et graphique alternative ») ;
 *   ordinateur seulement (`desktopOnly`).
 * - PAS d'`openCmd` : un fichier importé depuis Fichiers est copié dans le dossier « Stockage » de
 *   l'application, mais ne s'ouvre pas tout seul (importFilesToDesktopAppAction ; libellé
 *   `importDialogHint` de fr.json : « il sera copié dans le dossier « Stockage » de l'application, où
 *   vous pourrez l'ouvrir »). On l'ouvre depuis le logiciel.
 * - Jusqu'à 20 fichiers par import (MAX_IMPORT_FILES) ; « Enregistrer » renvoie les fichiers dans
 *   Fichiers, chacun comme un nouveau fichier (exportDesktopAppFilesAction) ; session temporaire.
 * - Forfait : `personnel` (GET /api/v1/apps/catalog en production).
 * - Modules : l'image installe calligra, calligraplan, calligrastage et kexi, et pose sur son bureau
 *   Words, Sheets, Stage, Karbon, Plan et Kexi (Dockerfile et root/defaults/autostart de
 *   github.com/linuxserver/docker-calligra, branche master, lus le 2026-09-25).
 * - Licence : le code de Calligra est sous plusieurs licences libres (dossier LICENSES du dépôt
 *   invent.kde.org/office/calligra : GPL et LGPL surtout) ; « GPL-2.0-or-later » retenue comme
 *   licence principale.
 *
 * À vérifier à la relecture :
 * - La licence affichée (GPL-2.0-or-later) : Calligra n'a pas de licence unique.
 * - Le dossier s'appelle « Stockage » dans l'app ; l'interface anglaise le nomme « Storage » (en.json) : la
 *   version EN reprend « Storage ». À constater dans une session en anglais.
 * - Les six modules, constatés dans le Dockerfile amont et non dans l'app : ouvrir l'app et regarder.
 * - Que le pont fichiers (MARKETPLACE_APPFILES) est actif en production.
 * - L'intérêt commercial de cette fiche est mince face à LibreOffice et ONLYOFFICE : elle vise surtout
 *   la recherche « Calligra en ligne » et les utilisateurs de KDE.
 */
export const calligra: FicheApplication = {
  id: "calligra",
  apps: ["desktop-calligra"],
  slug: { fr: "calligra", en: "calligra" },
  nom: { fr: "Calligra", en: "Calligra" },
  tiers: { editeur: "KDE", licence: "GPL-2.0-or-later", site: "https://calligra.org/" },
  titre: {
    fr: "Calligra en ligne, sans rien installer",
    en: "Calligra online, with nothing to install",
  },
  groupe: "bureautique",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Calligra en ligne : la suite bureautique de KDE — Cloud OS",
      en: "Calligra online: KDE's office suite, no install — Cloud OS",
    },
    description: {
      fr: "Utilisez Calligra, la suite bureautique et graphique de KDE, dans le navigateur : Words, Sheets, Stage, Karbon. Rien à installer, fichiers hébergés au Québec.",
      en: "Use Calligra, KDE's office and graphics suite, in your browser: Words, Sheets, Stage, Karbon. Nothing to install, and your files hosted in Québec.",
    },
  },
  accroche: {
    fr: "La suite bureautique et graphique de KDE, dans votre navigateur.",
    en: "KDE's office and graphics suite, in your browser.",
  },
  motsCles: {
    fr: ["calligra en ligne", "calligra sans installation", "suite bureautique kde", "calligra words", "karbon dessin vectoriel"],
    en: ["calligra online", "calligra without installing", "kde office suite", "calligra words", "karbon vector drawing"],
  },
  corps: {
    fr: [
      {
        titre: "Une suite bureautique et graphique",
        paragraphes: [
          "Calligra est la suite bureautique libre de la communauté KDE. Elle réunit, dans une même famille de logiciels, la bureautique, le dessin et la gestion de projet. Dans Cloud OS, elle tourne dans une fenêtre de votre bureau en ligne, avec ses modules :",
        ],
        points: [
          "Words pour le texte, Sheets pour le tableur, Stage pour les présentations ;",
          "Karbon pour le dessin vectoriel ;",
          "Plan pour la planification de projets ;",
          "Kexi pour les bases de données.",
        ],
      },
      {
        titre: "Vos fichiers restent dans votre espace",
        paragraphes: [
          "Vous importez des fichiers depuis l'application Fichiers : ils arrivent dans le dossier « Stockage » de Calligra, d'où vous les ouvrez avec le module de votre choix. Une fois le travail fait, vous les renvoyez dans Fichiers.",
        ],
        points: [
          "Plusieurs fichiers importés à la suite, sans refermer la fenêtre d'import.",
          "Chaque fichier renvoyé arrive comme un nouveau fichier : l'original n'est jamais écrasé.",
          "Vos fichiers sont hébergés au Québec.",
        ],
      },
      {
        titre: "Pour qui ?",
        paragraphes: [
          "Pour qui connaît déjà Calligra, pour qui travaille au format OpenDocument, ou pour qui cherche Karbon ou Plan sans rien installer. Pour les documents Word, Excel et PowerPoint de tous les jours, et surtout pour travailler à plusieurs, la suite bureautique de Cloud OS (Writer, Calc, Impress) est plus indiquée.",
        ],
      },
      {
        titre: "Ce qu'il faut savoir",
        paragraphes: [
          "La session de Calligra est temporaire : pensez à renvoyer votre travail dans Fichiers avant de la fermer, c'est là qu'il est conservé. Calligra s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
        ],
      },
    ],
    en: [
      {
        titre: "An office and graphics suite",
        paragraphes: [
          "Calligra is the free office suite of the KDE community. It brings office work, drawing and project management together in one family of programs. In Cloud OS, it runs in a window of your online desktop, with its modules:",
        ],
        points: [
          "Words for text, Sheets for spreadsheets, Stage for presentations;",
          "Karbon for vector drawing;",
          "Plan for project planning;",
          "Kexi for databases.",
        ],
      },
      {
        titre: "Your files stay in your own space",
        paragraphes: [
          "You import files from the Files app: they land in Calligra's “Storage” folder, where you open them with the module of your choice. Once the work is done, you send them back to Files.",
        ],
        points: [
          "Several files imported one after another, without closing the import window.",
          "Every file sent back arrives as a new file: the original is never overwritten.",
          "Your files are hosted in Québec.",
        ],
      },
      {
        titre: "Who is it for?",
        paragraphes: [
          "For people who already know Calligra, who work in OpenDocument format, or who want Karbon or Plan with nothing to install. For everyday Word, Excel and PowerPoint documents, and above all for working together, the Cloud OS office suite (Writer, Calc, Impress) is the better fit.",
        ],
      },
      {
        titre: "Good to know",
        paragraphes: [
          "A Calligra session is temporary: remember to send your work back to Files before closing it, since that is where it is kept. Calligra is used from a computer; it is not offered on phones.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Faut-il installer Calligra pour l'utiliser dans Cloud OS ?",
        reponse: "Non. Calligra tourne dans une fenêtre de votre bureau en ligne, depuis le navigateur. Il n'y a rien à installer ni à mettre à jour sur votre ordinateur.",
      },
      {
        question: "Comment ouvrir un de mes fichiers dans Calligra ?",
        reponse: "Importez-le depuis Fichiers : il est copié dans le dossier « Stockage » de l'application. Ouvrez-le ensuite depuis le module voulu, par exemple Words ou Sheets.",
      },
      {
        question: "Mes fichiers originaux risquent-ils d'être écrasés ?",
        reponse: "Non. Les fichiers que vous renvoyez de Calligra vers Fichiers arrivent comme de nouveaux fichiers ; l'original reste tel quel.",
      },
      {
        question: "Calligra est-il compris dans l'abonnement ?",
        reponse: "Oui, dès le forfait Personnel, comme les autres logiciels du bureau. Il n'y a pas de frais par application : chaque ouverture compte comme une tâche dans l'enveloppe de votre forfait.",
      },
    ],
    en: [
      {
        question: "Do I need to install Calligra to use it in Cloud OS?",
        reponse: "No. Calligra runs in a window of your online desktop, from the browser. There is nothing to install or update on your computer.",
      },
      {
        question: "How do I open one of my files in Calligra?",
        reponse: "Import it from Files: it is copied to the app's “Storage” folder. Then open it from the module you want, such as Words or Sheets.",
      },
      {
        question: "Could my original files be overwritten?",
        reponse: "No. Files you send back from Calligra to Files arrive as new files; the original stays as it was.",
      },
      {
        question: "Is Calligra included in the subscription?",
        reponse: "Yes, from the Personal plan, like the other desktop software. There is no fee per app: each launch counts as one task in your plan's allowance.",
      },
    ],
  },
  captures: [],
  voisines: ["libreoffice", "onlyoffice", "writer"],
  articles: [],
};
