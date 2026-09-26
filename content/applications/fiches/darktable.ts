import type { FicheApplication } from "../types";

/**
 * darktable — ÉBAUCHE, à relire avant publication.
 *
 * Positionnement (pour ne pas cannibaliser les fiches voisines) : darktable = le flux de travail
 * complet du photographe sur ses fichiers RAW, « alternative à Lightroom ». RawTherapee = le
 * convertisseur RAW au réglage fin et à la file de traitement ; digiKam = trier, étiqueter et
 * traiter par lots ; GIMP = retouche au pixel.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Image `linuxserver/darktable`, diffusée dans une fenêtre du bureau
 *   (src/lib/marketplace/desktop-apps-catalog.ts) ; ordinateur seulement (`desktopOnly`,
 *   app-registry.tsx, pour toutes les entrées dérivées du catalogue).
 * - `openCmd: "darktable"` : un fichier importé depuis Fichiers s'ouvre directement dans darktable
 *   (importFilesToDesktopAppAction, src/lib/marketplace/actions.ts).
 * - L'interface importe UN fichier par choix, « Répétez pour en importer plusieurs »
 *   (desktop-app-window.tsx, desktopApps.importDialogHint). Le plafond de 20 fichiers
 *   (MAX_IMPORT_FILES) vaut par appel de l'action, pas par geste de l'utilisateur : non cité ici.
 * - « Enregistrer » renvoie dans Fichiers, comme nouveaux fichiers, les fichiers nouveaux ou modifiés
 *   du dossier « Stockage » ; un original importé et inchangé n'est pas renvoyé
 *   (exportDesktopAppFilesAction, listExportableFiles). La liste n'est PAS récursive
 *   (listStorageFiles, appfiles-session.ts) : un sous-dossier n'est pas renvoyé.
 * - darktable exporte par défaut dans `$(FILE_FOLDER)/darktable_exported/` (darktableconfig.xml.in,
 *   `plugins/imageio/storage/disk/file_directory`) : un sous-dossier, donc non renvoyé. D'où le
 *   conseil de régler le dossier de sortie sur « Stockage ».
 * - darktable écrit par défaut un fichier .xmp à côté de chaque image importée (`write_sidecar_files`
 *   = « on import », darktableconfig.xml.in) : il contient l'historique des réglages, et il est
 *   renvoyé dans Fichiers avec le reste (nouveau fichier dans « Stockage »).
 * - Bouton d'aide qui ouvre la documentation officielle (`docsUrl`, desktop-app-window.tsx).
 * - Session temporaire (reaper.ts, appfiles-session.ts : /config en RAM) : la bibliothèque de
 *   darktable (sa base de données) ne survit pas à la session.
 * - Licence : GPL-3.0-or-later (en-têtes du dépôt darktable-org/darktable).
 *
 * À vérifier à la relecture :
 * - que le pont fichiers (MARKETPLACE_APPFILES) est actif en production, comme pour GIMP ;
 * - que `darktable <fichier>` ouvre bien l'image quand darktable tourne déjà (verrou de la base de
 *   données d'une seconde instance) ;
 * - qu'en réimportant la photo ET son .xmp dans une session suivante, darktable reprend les réglages
 *   (plausible, non promis dans le texte) ;
 * - que le nom de fichier d'un export qui existe déjà dans Fichiers n'écrase rien (même hypothèse que
 *   GIMP) ; le nom « darktable » s'écrit en minuscules chez l'éditeur (le produit affiche
 *   « Darktable »).
 */
export const darktable: FicheApplication = {
  id: "darktable",
  apps: ["desktop-darktable"],
  slug: { fr: "darktable", en: "darktable" },
  nom: { fr: "darktable", en: "darktable" },
  tiers: { editeur: "The darktable project", licence: "GPL-3.0-or-later", site: "https://www.darktable.org/" },
  titre: {
    fr: "darktable en ligne, pour développer vos photos RAW",
    en: "darktable online, to develop your RAW photos",
  },
  groupe: "images",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "darktable en ligne : développer vos RAW — Cloud OS",
      en: "darktable online: develop your RAW photos — Cloud OS",
    },
    description: {
      fr: "Développez vos photos RAW avec darktable, l'alternative libre à Lightroom, dans le navigateur : rien à installer, vos fichiers restent hébergés au Québec.",
      en: "Develop your RAW photos with darktable, the free Lightroom alternative, right in your browser: nothing to install, and your files stay hosted in Québec.",
    },
  },
  accroche: {
    fr: "Le développement RAW libre des photographes, dans votre navigateur.",
    en: "The photographer's free RAW developer, in your browser.",
  },
  motsCles: {
    fr: ["darktable en ligne", "développement raw en ligne", "alternative à lightroom", "darktable sans installation", "logiciel photo raw gratuit"],
    en: ["darktable online", "online raw editor", "lightroom alternative", "darktable without installing", "free raw photo software"],
  },
  corps: {
    fr: [
      {
        titre: "Le vrai darktable, pas une version web",
        paragraphes: [
          "darktable est le logiciel libre de développement de photos RAW que beaucoup de photographes utilisent à la place de Lightroom. Il travaille de façon non destructive : vos réglages s'empilent comme une recette appliquée à la photo, jamais au fichier d'origine.",
          "Dans Cloud OS, c'est le logiciel lui-même qui tourne, dans une fenêtre de votre bureau en ligne. Rien à installer sur votre poste, aucune mise à jour à suivre, et le même darktable sur chaque ordinateur d'où vous vous connectez.",
        ],
      },
      {
        titre: "Du fichier RAW à la photo finie",
        paragraphes: [
          "darktable prend le fichier brut de votre appareil et vous laisse en tirer l'image que vous aviez en tête, puis l'exporter pour le web ou l'impression.",
        ],
        points: [
          "Exposition, balance des blancs, couleurs, tons et contraste, réglés module par module.",
          "Masques dessinés et paramétriques, pour ne corriger qu'une partie de l'image.",
          "Réduction du bruit, netteté, correction de l'objectif, recadrage et redressement.",
          "Export en JPEG, TIFF, PNG et d'autres formats, aux dimensions voulues.",
        ],
      },
      {
        titre: "Vos photos restent dans votre espace",
        paragraphes: [
          "Vous choisissez une photo dans l'application Fichiers, et elle s'ouvre directement dans darktable ; répétez pour en ajouter d'autres. Une fois le travail fait, le bouton Enregistrer renvoie vos exports dans Fichiers.",
        ],
        points: [
          "Chaque fichier renvoyé arrive comme un nouveau fichier : votre RAW d'origine n'est jamais écrasé.",
          "Le fichier .xmp que darktable écrit à côté de chaque photo, qui garde la trace de vos réglages, est renvoyé avec le reste.",
          "Vos fichiers sont hébergés au Québec.",
        ],
      },
      {
        titre: "Ce qu'il faut savoir",
        paragraphes: [
          "Par défaut, darktable exporte dans un sous-dossier « darktable_exported ». Dans le module d'export, choisissez plutôt le dossier « Stockage » lui-même : c'est de là, et pas des sous-dossiers, que vos fichiers repartent vers Fichiers.",
          "La session de darktable est temporaire : sa bibliothèque ne se conserve pas d'une fois à l'autre, et ce qui n'est pas renvoyé dans Fichiers disparaît avec elle. darktable s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
        ],
      },
    ],
    en: [
      {
        titre: "The real darktable, not a web version",
        paragraphes: [
          "darktable is the free RAW photo developer that many photographers use instead of Lightroom. It works non-destructively: your adjustments stack up like a recipe applied to the photo, never to the original file.",
          "In Cloud OS, the software itself runs in a window of your online desktop. Nothing to install on your computer, no updates to keep up with, and the same darktable on every computer you sign in from.",
        ],
      },
      {
        titre: "From RAW file to finished photo",
        paragraphes: [
          "darktable takes the raw file from your camera and lets you draw out the image you had in mind, then export it for the web or for print.",
        ],
        points: [
          "Exposure, white balance, colour, tones and contrast, adjusted module by module.",
          "Drawn and parametric masks, to correct only part of the image.",
          "Noise reduction, sharpening, lens correction, cropping and straightening.",
          "Export to JPEG, TIFF, PNG and other formats, at the size you need.",
        ],
      },
      {
        titre: "Your photos stay in your own space",
        paragraphes: [
          "You pick a photo in the Files app, and it opens straight in darktable; repeat to add more. Once the work is done, the Save button sends your exports back to Files.",
        ],
        points: [
          "Every file sent back arrives as a new file: your original RAW is never overwritten.",
          "The .xmp file darktable writes next to each photo, which records your adjustments, is sent back along with the rest.",
          "Your files are hosted in Québec.",
        ],
      },
      {
        titre: "Good to know",
        paragraphes: [
          "By default, darktable exports to a “darktable_exported” subfolder. In the export module, pick the “Stockage” (Storage) folder itself instead: files go back to Files from there, not from its subfolders.",
          "A darktable session is temporary: its library is not kept from one session to the next, and anything not sent back to Files disappears with it. darktable is used from a computer; it is not offered on phones.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Faut-il installer darktable pour l'utiliser dans Cloud OS ?",
        reponse: "Non. darktable tourne dans une fenêtre de votre bureau en ligne, depuis le navigateur. Il n'y a rien à installer ni à mettre à jour sur votre ordinateur.",
      },
      {
        question: "darktable est-il une alternative à Lightroom ?",
        reponse: "Pour le développement des fichiers RAW, oui : c'est un logiciel libre qui couvre le même travail, de l'exposition à l'export. Il a sa propre logique et son propre vocabulaire ; comptez un temps d'adaptation si vous venez de Lightroom.",
      },
      {
        question: "Quelle différence avec RawTherapee et digiKam, aussi offerts dans Cloud OS ?",
        reponse: "darktable et RawTherapee développent tous deux des fichiers RAW ; darktable mise sur un flux de travail complet par modules et masques, RawTherapee sur le réglage fin du rendu et une file de traitement. digiKam, lui, sert d'abord à trier, étiqueter et traiter des lots de photos.",
      },
      {
        question: "darktable est-il compris dans l'abonnement ?",
        reponse: "Oui, dès le forfait Personnel, comme les autres logiciels du bureau. Il n'y a pas de frais par application : chaque ouverture compte comme une tâche dans l'enveloppe de votre forfait.",
      },
    ],
    en: [
      {
        question: "Do I need to install darktable to use it in Cloud OS?",
        reponse: "No. darktable runs in a window of your online desktop, from the browser. There is nothing to install or update on your computer.",
      },
      {
        question: "Is darktable an alternative to Lightroom?",
        reponse: "For developing RAW files, yes: it is free software that covers the same work, from exposure to export. It has its own logic and vocabulary, so expect some time to adjust if you are coming from Lightroom.",
      },
      {
        question: "How is it different from RawTherapee and digiKam, also offered in Cloud OS?",
        reponse: "darktable and RawTherapee both develop RAW files; darktable focuses on a complete workflow built on modules and masks, RawTherapee on fine control of the rendering and a processing queue. digiKam is first and foremost for sorting, tagging and batch-processing photos.",
      },
      {
        question: "Is darktable included in the subscription?",
        reponse: "Yes, from the Personal plan, like the other desktop software. There is no fee per app: each launch counts as one task in your plan's allowance.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/darktable/darktable-chambre-noire.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "Darktable dans Cloud OS : une photo ouverte en chambre noire",
        en: "Darktable in Cloud OS: a photo open in the darkroom",
      },
    },
  ],
  voisines: ["rawtherapee", "digikam", "gimp", "retouche-image"],
  articles: [],
};
