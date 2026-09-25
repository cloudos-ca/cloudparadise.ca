import type { FicheApplication } from "../types";

/**
 * digiKam — ÉBAUCHE, à relire avant publication.
 *
 * Positionnement : trier, étiqueter, renseigner et traiter PAR LOTS une série de photos (renommer,
 * redimensionner, convertir, métadonnées EXIF/IPTC/XMP) ; intentions « renommer des photos par
 * lot », « redimensionner des photos par lot », « gestionnaire de photos gratuit ». Le
 * développement RAW reste à darktable et RawTherapee, la retouche à GIMP.
 *
 * ATTENTION, limite honnête : digiKam est d'abord un gestionnaire de photothèque PERSISTANTE (base
 * de données d'albums, d'étiquettes, de notes). Dans Cloud OS, la session est temporaire (/config
 * en RAM, appfiles-session.ts ; reaper.ts) : la base de digiKam disparaît avec elle. La fiche ne
 * promet donc PAS une photothèque qui se conserve ; elle vend le traitement d'un lot de photos le
 * temps d'une séance, et dit comment garder étiquettes et notes (les écrire dans les fichiers).
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Image `linuxserver/digikam`, diffusée dans une fenêtre du bureau ; description du produit :
 *   « Gestion et retouche de collections de photos » (src/lib/marketplace/desktop-apps-catalog.ts) ;
 *   ordinateur seulement (`desktopOnly`, app-registry.tsx).
 * - PAS d'`openCmd` : un fichier importé est copié dans le dossier « Stockage » de l'application
 *   mais ne s'ouvre pas tout seul (importFilesToDesktopAppAction) ; la boîte d'import reste ouverte
 *   pour en choisir d'autres (desktop-app-window.tsx). Le texte le dit.
 * - « Enregistrer » renvoie les fichiers nouveaux ou modifiés du dossier « Stockage » dans Fichiers,
 *   comme nouveaux fichiers ; un original importé et inchangé (même nom, même taille) n'est pas
 *   renvoyé ; liste non récursive (listExportableFiles, listStorageFiles).
 * - Par défaut, digiKam n'écrit NI étiquettes NI notes dans les fichiers (`saveTags`, `saveRating`…
 *   = false, core/libs/metadataengine/engine/metaenginesettingscontainer.cpp) : elles restent dans
 *   sa base. D'où le conseil de l'activer.
 * - Licence : GPL-2.0-or-later (SPDX de core/app/main/main.cpp, invent.kde.org/graphics/digikam).
 *
 * À vérifier à la relecture :
 * - que le pont fichiers (MARKETPLACE_APPFILES) est actif en production ;
 * - qu'à chaque session digiKam affiche son assistant de premier lancement (configuration perdue
 *   avec /config) et qu'on peut y désigner le dossier « Stockage » comme collection : le texte dit
 *   seulement d'indiquer ce dossier, sans décrire l'assistant ;
 * - qu'une photo dont on a écrit les métadonnées revient bien dans Fichiers comme une copie (taille
 *   changée) : c'est le comportement attendu de listExportableFiles ;
 * - le dossier de sortie par défaut du gestionnaire de traitement par lots (le texte dit seulement
 *   d'enregistrer dans « Stockage ») ;
 * - la reconnaissance des visages n'est PAS citée : digiKam télécharge ses modèles au premier
 *   lancement, ce qui, à chaque session temporaire, reste à tester.
 */
export const digikam: FicheApplication = {
  id: "digikam",
  apps: ["desktop-digikam"],
  slug: { fr: "digikam", en: "digikam" },
  nom: { fr: "digiKam", en: "digiKam" },
  tiers: { editeur: "The digiKam team (KDE)", licence: "GPL-2.0-or-later", site: "https://www.digikam.org/" },
  titre: {
    fr: "digiKam en ligne, pour trier et traiter vos photos par lots",
    en: "digiKam online, to sort and batch-process your photos",
  },
  groupe: "images",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "digiKam en ligne : trier et traiter vos photos — Cloud OS",
      en: "digiKam online: sort and batch-process photos — Cloud OS",
    },
    description: {
      fr: "Triez, étiquetez, renommez et redimensionnez vos photos par lots avec digiKam, dans le navigateur : rien à installer, vos fichiers restent hébergés au Québec.",
      en: "Sort, tag, rename and resize your photos in batches with digiKam, right in your browser: nothing to install, and your files stay hosted in Québec.",
    },
  },
  accroche: {
    fr: "Trier, étiqueter et traiter une série de photos d'un coup, dans le navigateur.",
    en: "Sort, tag and process a whole series of photos at once, in your browser.",
  },
  motsCles: {
    fr: ["digikam en ligne", "renommer des photos par lot", "redimensionner des photos par lot", "gestionnaire de photos gratuit", "modifier les métadonnées exif"],
    en: ["digikam online", "batch rename photos", "batch resize photos", "free photo manager", "edit exif metadata"],
  },
  corps: {
    fr: [
      {
        titre: "Le vrai digiKam, dans une fenêtre du bureau",
        paragraphes: [
          "digiKam est un logiciel libre de gestion de photos, issu de la communauté KDE. Il sert à voir, trier et décrire un grand nombre d'images, puis à leur appliquer des traitements en série.",
          "Dans Cloud OS, c'est le logiciel lui-même qui tourne, dans une fenêtre de votre bureau en ligne. Rien à installer sur votre poste, aucune mise à jour à suivre, et le même digiKam sur chaque ordinateur d'où vous vous connectez.",
        ],
      },
      {
        titre: "Mettre de l'ordre dans une série de photos",
        paragraphes: [
          "Un reportage, un chantier, un événement : digiKam vous aide à passer une série de photos en revue et à la préparer pour la suite, sans les ouvrir une à une.",
        ],
        points: [
          "Étiquettes, notes et libellés de couleur, avec des filtres pour ne voir que ce qui compte.",
          "Lecture et modification des métadonnées EXIF, IPTC et XMP : date, auteur, légende, droits.",
          "Un gestionnaire de traitement par lots : renommer, redimensionner, convertir de format ou ajouter un filigrane à toute une série.",
          "Un éditeur pour les corrections courantes : recadrage, rotation, couleurs.",
        ],
      },
      {
        titre: "Vos photos restent dans votre espace",
        paragraphes: [
          "Vous choisissez vos photos dans l'application Fichiers, une à la fois : elles sont copiées dans le dossier « Stockage » de digiKam, où vous les retrouvez. Une fois le travail fait, le bouton Enregistrer renvoie les photos traitées dans Fichiers.",
        ],
        points: [
          "Chaque fichier renvoyé arrive comme un nouveau fichier : vos originaux ne sont jamais écrasés.",
          "Seuls les fichiers nouveaux ou modifiés repartent : une photo que vous n'avez pas touchée n'est pas dupliquée.",
          "Vos fichiers sont hébergés au Québec.",
        ],
      },
      {
        titre: "Ce qu'il faut savoir",
        paragraphes: [
          "La session de digiKam est temporaire, et sa photothèque avec elle : dans Cloud OS, digiKam sert à traiter un lot de photos le temps d'une séance, pas à conserver une collection d'une fois à l'autre. Indiquez-lui le dossier « Stockage » comme emplacement de vos photos, et enregistrez-y vos résultats : les sous-dossiers ne sont pas renvoyés.",
          "Par défaut, digiKam garde étiquettes et notes dans sa propre base. Pour les conserver, demandez-lui de les écrire dans les fichiers, dans ses réglages de métadonnées, avant d'enregistrer. digiKam s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
        ],
      },
    ],
    en: [
      {
        titre: "The real digiKam, in a desktop window",
        paragraphes: [
          "digiKam is free photo management software from the KDE community. It is built to view, sort and describe large numbers of images, then apply processing to them in series.",
          "In Cloud OS, the software itself runs in a window of your online desktop. Nothing to install on your computer, no updates to keep up with, and the same digiKam on every computer you sign in from.",
        ],
      },
      {
        titre: "Bringing order to a series of photos",
        paragraphes: [
          "A photo shoot, a job site, an event: digiKam helps you review a series of photos and get it ready for what comes next, without opening them one by one.",
        ],
        points: [
          "Tags, ratings and colour labels, with filters so you only see what matters.",
          "Read and edit EXIF, IPTC and XMP metadata: date, author, caption, rights.",
          "A batch queue manager: rename, resize, convert or watermark a whole series.",
          "An editor for everyday fixes: cropping, rotation, colour.",
        ],
      },
      {
        titre: "Your photos stay in your own space",
        paragraphes: [
          "You pick your photos in the Files app, one at a time: they are copied into digiKam's “Stockage” (Storage) folder, where you will find them. Once the work is done, the Save button sends the processed photos back to Files.",
        ],
        points: [
          "Every file sent back arrives as a new file: your originals are never overwritten.",
          "Only new or changed files go back: a photo you did not touch is not duplicated.",
          "Your files are hosted in Québec.",
        ],
      },
      {
        titre: "Good to know",
        paragraphes: [
          "A digiKam session is temporary, and so is its photo library: in Cloud OS, digiKam is for processing a batch of photos during one session, not for keeping a collection from one session to the next. Point it to the “Stockage” (Storage) folder as the location of your photos, and save your results there: subfolders are not sent back.",
          "By default, digiKam keeps tags and ratings in its own database. To keep them, have it write them into the files, in its metadata settings, before you save. digiKam is used from a computer; it is not offered on phones.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Faut-il installer digiKam pour l'utiliser dans Cloud OS ?",
        reponse: "Non. digiKam tourne dans une fenêtre de votre bureau en ligne, depuis le navigateur. Il n'y a rien à installer ni à mettre à jour sur votre ordinateur.",
      },
      {
        question: "Peut-on renommer ou redimensionner des photos par lots ?",
        reponse: "Oui, avec le gestionnaire de traitement par lots de digiKam : vous choisissez les photos, la suite d'opérations (renommer, redimensionner, convertir…), et il les applique à toute la série. Enregistrez le résultat dans le dossier « Stockage » pour le renvoyer ensuite dans Fichiers.",
      },
      {
        question: "digiKam garde-t-il ma photothèque d'une session à l'autre ?",
        reponse: "Non : dans Cloud OS, sa session est temporaire. Vos photos, elles, restent dans Fichiers. Pour conserver étiquettes et notes, faites-les écrire dans les fichiers avant de les renvoyer.",
      },
      {
        question: "Quelle différence avec darktable et RawTherapee ?",
        reponse: "darktable et RawTherapee développent des fichiers RAW, photo par photo, pour en tirer le meilleur rendu. digiKam sert plutôt à trier, décrire et traiter des séries de photos. Les trois sont offerts dans Cloud OS, dès le forfait Personnel.",
      },
    ],
    en: [
      {
        question: "Do I need to install digiKam to use it in Cloud OS?",
        reponse: "No. digiKam runs in a window of your online desktop, from the browser. There is nothing to install or update on your computer.",
      },
      {
        question: "Can I rename or resize photos in batches?",
        reponse: "Yes, with digiKam's batch queue manager: you choose the photos and the sequence of operations (rename, resize, convert…), and it applies them to the whole series. Save the result to the “Stockage” (Storage) folder so you can then send it back to Files.",
      },
      {
        question: "Does digiKam keep my photo library between sessions?",
        reponse: "No: in Cloud OS, its session is temporary. Your photos themselves stay in Files. To keep tags and ratings, have them written into the files before you send them back.",
      },
      {
        question: "How is it different from darktable and RawTherapee?",
        reponse: "darktable and RawTherapee develop RAW files, photo by photo, to get the best rendering out of them. digiKam is for sorting, describing and processing series of photos. All three are offered in Cloud OS, from the Personal plan.",
      },
    ],
  },
  captures: [],
  voisines: ["darktable", "rawtherapee", "gimp", "fichiers"],
  articles: [],
};
