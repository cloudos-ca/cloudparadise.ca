import type { FicheApplication } from "../types";

/**
 * RawTherapee — ÉBAUCHE, à relire avant publication.
 *
 * Positionnement (pour ne pas cannibaliser les fiches voisines) : RawTherapee = convertir des RAW
 * avec un contrôle fin du rendu, et une file de traitement qui applique un même profil à plusieurs
 * photos ; intention « convertir RAW en JPEG », « logiciel RAW gratuit ». darktable garde
 * « alternative à Lightroom » ; digiKam, le tri et l'étiquetage.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Image `linuxserver/rawtherapee`, diffusée dans une fenêtre du bureau
 *   (src/lib/marketplace/desktop-apps-catalog.ts) ; ordinateur seulement (`desktopOnly`,
 *   app-registry.tsx).
 * - `openCmd: "rawtherapee"` : un fichier importé depuis Fichiers s'ouvre directement dans
 *   RawTherapee (importFilesToDesktopAppAction, src/lib/marketplace/actions.ts).
 * - L'interface importe UN fichier par choix (desktop-app-window.tsx, desktopApps.importDialogHint).
 * - « Enregistrer » renvoie les fichiers nouveaux ou modifiés du dossier « Stockage » dans Fichiers,
 *   comme nouveaux fichiers ; liste non récursive (listStorageFiles, appfiles-session.ts).
 * - RawTherapee enregistre par défaut la file de traitement dans `%p1/converted/%f`
 *   (`savePathTemplate`, rtgui/options.cc) : un sous-dossier « converted », donc non renvoyé. D'où le
 *   conseil de régler la sortie sur « Stockage ».
 * - RawTherapee écrit par défaut un profil .pp3 à côté de l'image (`saveParamsFile = true`,
 *   rtgui/options.cc) : il est renvoyé dans Fichiers avec le reste.
 * - Bouton d'aide vers la documentation officielle, RawPedia (`docsUrl`).
 * - Session temporaire (reaper.ts ; /config en RAM, appfiles-session.ts).
 * - Licence : GPL-3.0-or-later (en-têtes du dépôt RawTherapee/RawTherapee).
 *
 * À vérifier à la relecture :
 * - que le pont fichiers (MARKETPLACE_APPFILES) est actif en production ;
 * - le dossier que propose par défaut la boîte « Enregistrer l'image » de l'éditeur (le texte dit
 *   seulement de choisir « Stockage », sans affirmer le défaut) ;
 * - que `rawtherapee <fichier>` ouvre bien l'image dans l'éditeur quand RawTherapee tourne déjà.
 */
export const rawtherapee: FicheApplication = {
  id: "rawtherapee",
  apps: ["desktop-rawtherapee"],
  slug: { fr: "rawtherapee", en: "rawtherapee" },
  nom: { fr: "RawTherapee", en: "RawTherapee" },
  tiers: { editeur: "The RawTherapee team", licence: "GPL-3.0-or-later", site: "https://www.rawtherapee.com/" },
  titre: {
    fr: "RawTherapee en ligne, pour convertir vos RAW avec précision",
    en: "RawTherapee online, to convert your RAW files with precision",
  },
  groupe: "images",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "RawTherapee en ligne : convertir vos RAW — Cloud OS",
      en: "RawTherapee online: convert RAW files precisely — Cloud OS",
    },
    description: {
      fr: "Convertissez vos photos RAW en JPEG ou en TIFF avec RawTherapee, directement dans le navigateur : rien à installer, vos fichiers restent hébergés au Québec.",
      en: "Convert your RAW photos to JPEG or TIFF with RawTherapee, right in your browser: nothing to install, and your files stay in your own space, hosted in Québec.",
    },
  },
  accroche: {
    fr: "Le convertisseur RAW libre qui règle chaque détail du rendu.",
    en: "The free RAW converter that gives you control over every detail.",
  },
  motsCles: {
    fr: ["rawtherapee en ligne", "convertir raw en jpeg", "logiciel raw gratuit", "rawtherapee sans installation", "traitement raw en ligne"],
    en: ["rawtherapee online", "convert raw to jpeg", "free raw software", "rawtherapee without installing", "online raw converter"],
  },
  corps: {
    fr: [
      {
        titre: "Le vrai RawTherapee, dans une fenêtre du bureau",
        paragraphes: [
          "RawTherapee est un logiciel libre de traitement des photos RAW, reconnu pour la précision de ses outils. Il ne modifie jamais le fichier d'origine : vos réglages vivent dans un profil, et l'image finale est produite à part.",
          "Dans Cloud OS, c'est le logiciel lui-même qui tourne, dans une fenêtre de votre bureau en ligne. Rien à installer sur votre poste, aucune mise à jour à suivre, et le même RawTherapee sur chaque ordinateur d'où vous vous connectez.",
        ],
      },
      {
        titre: "Pour qui veut maîtriser le rendu",
        paragraphes: [
          "RawTherapee s'adresse à ceux qui aiment comprendre et régler chaque étape du développement, du dématriçage à la netteté. Il sait aussi traiter plusieurs photos d'un coup.",
        ],
        points: [
          "Plusieurs algorithmes de dématriçage au choix, selon l'appareil et le sujet.",
          "Exposition, courbes de tons, balance des blancs et gestion des couleurs.",
          "Réduction du bruit, netteté fine, correction de l'objectif.",
          "Une file de traitement : appliquez le même profil à une série de photos et convertissez-les en JPEG, TIFF ou PNG.",
        ],
      },
      {
        titre: "Vos photos restent dans votre espace",
        paragraphes: [
          "Vous choisissez une photo dans l'application Fichiers, et elle s'ouvre directement dans RawTherapee ; répétez pour en ajouter d'autres. Une fois le travail fait, le bouton Enregistrer renvoie vos images converties dans Fichiers.",
        ],
        points: [
          "Chaque fichier renvoyé arrive comme un nouveau fichier : votre RAW d'origine n'est jamais écrasé.",
          "Le profil .pp3 que RawTherapee écrit à côté de chaque photo, avec vos réglages, est renvoyé avec le reste.",
          "Vos fichiers sont hébergés au Québec.",
        ],
      },
      {
        titre: "Ce qu'il faut savoir",
        paragraphes: [
          "Par défaut, la file de traitement enregistre dans un sous-dossier « converted ». Réglez le dossier de sortie, et celui de la boîte d'enregistrement, sur le dossier « Stockage » lui-même : c'est de là, et pas des sous-dossiers, que vos fichiers repartent vers Fichiers.",
          "La session de RawTherapee est temporaire : ce qui n'est pas renvoyé dans Fichiers disparaît avec elle. RawTherapee s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
        ],
      },
    ],
    en: [
      {
        titre: "The real RawTherapee, in a desktop window",
        paragraphes: [
          "RawTherapee is free software for processing RAW photos, known for the precision of its tools. It never changes the original file: your adjustments live in a profile, and the final image is produced separately.",
          "In Cloud OS, the software itself runs in a window of your online desktop. Nothing to install on your computer, no updates to keep up with, and the same RawTherapee on every computer you sign in from.",
        ],
      },
      {
        titre: "For those who want to control the rendering",
        paragraphes: [
          "RawTherapee is made for people who like to understand and fine-tune every step of development, from demosaicing to sharpening. It can also process several photos at once.",
        ],
        points: [
          "Several demosaicing algorithms to choose from, depending on the camera and the subject.",
          "Exposure, tone curves, white balance and colour management.",
          "Noise reduction, fine sharpening, lens correction.",
          "A processing queue: apply the same profile to a series of photos and convert them to JPEG, TIFF or PNG.",
        ],
      },
      {
        titre: "Your photos stay in your own space",
        paragraphes: [
          "You pick a photo in the Files app, and it opens straight in RawTherapee; repeat to add more. Once the work is done, the Save button sends your converted images back to Files.",
        ],
        points: [
          "Every file sent back arrives as a new file: your original RAW is never overwritten.",
          "The .pp3 profile RawTherapee writes next to each photo, holding your adjustments, is sent back along with the rest.",
          "Your files are hosted in Québec.",
        ],
      },
      {
        titre: "Good to know",
        paragraphes: [
          "By default, the processing queue saves to a “converted” subfolder. Set the output folder, and the one in the save dialog, to the “Stockage” (Storage) folder itself: files go back to Files from there, not from its subfolders.",
          "A RawTherapee session is temporary: anything not sent back to Files disappears with it. RawTherapee is used from a computer; it is not offered on phones.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Faut-il installer RawTherapee pour l'utiliser dans Cloud OS ?",
        reponse: "Non. RawTherapee tourne dans une fenêtre de votre bureau en ligne, depuis le navigateur. Il n'y a rien à installer ni à mettre à jour sur votre ordinateur.",
      },
      {
        question: "Peut-on convertir plusieurs photos RAW en JPEG d'un coup ?",
        reponse: "Oui, avec la file de traitement de RawTherapee : vous y placez vos photos avec le profil de réglages voulu, et il les convertit l'une après l'autre. Enregistrez le résultat dans le dossier « Stockage » pour le renvoyer ensuite dans Fichiers.",
      },
      {
        question: "RawTherapee ou darktable : lequel choisir ?",
        reponse: "Les deux sont offerts. RawTherapee convient si vous voulez régler finement le rendu et convertir des séries de photos ; darktable, si vous cherchez un flux de travail complet à la manière de Lightroom, avec masques et retouches locales.",
      },
      {
        question: "RawTherapee est-il compris dans l'abonnement ?",
        reponse: "Oui, dès le forfait Personnel, comme les autres logiciels du bureau. Il n'y a pas de frais par application : chaque ouverture compte comme une tâche dans l'enveloppe de votre forfait.",
      },
    ],
    en: [
      {
        question: "Do I need to install RawTherapee to use it in Cloud OS?",
        reponse: "No. RawTherapee runs in a window of your online desktop, from the browser. There is nothing to install or update on your computer.",
      },
      {
        question: "Can I convert several RAW photos to JPEG at once?",
        reponse: "Yes, with RawTherapee's processing queue: you add your photos with the processing profile you want, and it converts them one after another. Save the result to the “Stockage” (Storage) folder so you can then send it back to Files.",
      },
      {
        question: "RawTherapee or darktable: which should I choose?",
        reponse: "Both are offered. RawTherapee suits you if you want fine control over the rendering and to convert series of photos; darktable, if you are after a complete Lightroom-style workflow, with masks and local adjustments.",
      },
      {
        question: "Is RawTherapee included in the subscription?",
        reponse: "Yes, from the Personal plan, like the other desktop software. There is no fee per app: each launch counts as one task in your plan's allowance.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/rawtherapee/rawtherapee-editeur.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "RawTherapee dans Cloud OS : une photo dans l'éditeur, avec son histogramme",
        en: "RawTherapee in Cloud OS: a photo in the editor, with its histogram",
      },
    },
  ],
  voisines: ["darktable", "digikam", "gimp"],
  articles: [],
};
