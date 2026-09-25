import type { FicheApplication } from "../types";

/**
 * OpenShot — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - OpenShot est l'image `linuxserver/openshot`, diffusée dans une fenêtre du bureau
 *   (src/lib/marketplace/desktop-apps-catalog.ts, « Montage vidéo simple et rapide ») ; ordinateur
 *   seulement (`desktopOnly`, app-registry.tsx). Forfait : `personnel` (GET /api/v1/apps/catalog).
 * - Un fichier importé depuis Fichiers s'ouvre directement dans OpenShot (`openCmd: "openshot-qt"`,
 *   importFilesToDesktopAppAction) ; jusqu'à 20 fichiers par import (MAX_IMPORT_FILES).
 * - Les fichiers arrivent dans le dossier « Stockage » de l'application ; « Enregistrer » renvoie dans
 *   Fichiers les fichiers nouveaux ou modifiés de ce dossier, chacun comme un nouveau fichier
 *   (exportDesktopAppFilesAction, appfiles-session.ts). Le renvoi n'est PAS récursif : seuls les
 *   fichiers posés directement dans « Stockage » reviennent.
 * - La session est temporaire, sur un espace en mémoire (appfiles-session.ts, reaper.ts) : ce qui
 *   n'est pas renvoyé dans Fichiers disparaît avec elle.
 * - Éditeur et licence : OpenShot Studios, LLC ; GPL-3.0-or-later (README de OpenShot/openshot-qt).
 *
 * Positionnement (anti-cannibalisation) : OpenShot = le montage FACILE, pour débuter ou pour une
 * vidéo simple. Shotcut = l'éditeur plus technique (filtres, formats) ; Kdenlive = le montage
 * multipiste avancé.
 *
 * À vérifier à la relecture :
 * - Que le pont fichiers (MARKETPLACE_APPFILES) est actif en production.
 * - Les performances d'export : le conteneur est plafonné par défaut à 2 Go de RAM et 1,5 processeur
 *   (MARKETPLACE_MEM_LIMIT / MARKETPLACE_CPU_LIMIT, compose-validate.ts), sans GPU. Rien n'est promis
 *   sur la vitesse de rendu ; une vidéo longue en haute définition peut être lente.
 * - Le son de l'aperçu dans le flux KasmVNC (non promis dans la fiche).
 * - Reprendre un projet (.osp) dans une session ultérieure : le fichier de projet revient bien dans
 *   Fichiers s'il est enregistré dans « Stockage », mais la réouverture avec ses médias n'a pas été
 *   testée — non promise.
 */
export const openshot: FicheApplication = {
  id: "openshot",
  apps: ["desktop-openshot"],
  slug: { fr: "openshot", en: "openshot" },
  nom: { fr: "OpenShot", en: "OpenShot" },
  tiers: { editeur: "OpenShot Studios, LLC", licence: "GPL-3.0", site: "https://www.openshot.org/" },
  titre: {
    fr: "OpenShot en ligne : le montage vidéo facile, sans rien installer",
    en: "OpenShot online: easy video editing, with nothing to install",
  },
  groupe: "audio-video",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "OpenShot en ligne : montage vidéo facile — Cloud OS",
      en: "OpenShot online: easy video editing — Cloud OS",
    },
    description: {
      fr: "Montez vos vidéos avec OpenShot directement dans le navigateur : un logiciel simple, rien à installer, vos fichiers dans votre espace hébergé au Québec.",
      en: "Edit your videos with OpenShot right in your browser: simple software, nothing to install, and your files stay in your own space, hosted in Québec.",
    },
  },
  accroche: {
    fr: "Le montage vidéo libre pensé pour aller droit au but, dans votre navigateur.",
    en: "Free video editing built to get straight to the point, in your browser.",
  },
  motsCles: {
    fr: ["openshot en ligne", "montage vidéo facile", "logiciel de montage vidéo pour débutant", "openshot sans installation", "monter une vidéo en ligne"],
    en: ["openshot online", "easy video editor", "video editing software for beginners", "openshot without installing", "edit a video online"],
  },
  corps: {
    fr: [
      {
        titre: "Un montage vidéo qu'on prend en main en quelques minutes",
        paragraphes: [
          "OpenShot est un logiciel libre de montage vidéo conçu pour être simple : on dépose ses clips sur la ligne de temps, on coupe, on ajoute une transition, un titre, une musique, et on exporte. Il sait aussi faire plus — pistes illimitées, animation par images clés, changement de vitesse — sans l'imposer à qui veut seulement assembler quelques séquences.",
          "C'est le bon choix pour une vidéo de présentation, un tutoriel, un souvenir d'événement ou une capsule pour les réseaux sociaux, quand on n'est pas monteur de métier.",
        ],
      },
      {
        titre: "Le vrai OpenShot, dans une fenêtre du bureau",
        paragraphes: [
          "Dans Cloud OS, c'est le logiciel lui-même qui tourne, dans une fenêtre de votre bureau en ligne. Rien à installer sur le poste, aucune mise à jour à suivre, et le même OpenShot sur chaque ordinateur d'où vous vous connectez. L'export de la vidéo se fait sur le serveur, pas sur votre machine.",
        ],
      },
      {
        titre: "Vos clips restent dans votre espace",
        paragraphes: [
          "Vous choisissez vos clips, images et musiques dans l'application Fichiers, et ils s'ouvrent directement dans OpenShot. Une fois la vidéo exportée dans le dossier « Stockage » de l'application, un clic la renvoie dans Fichiers.",
        ],
        points: [
          "Plusieurs fichiers importés à la suite, sans refermer la fenêtre d'import.",
          "Chaque fichier renvoyé arrive comme un nouveau fichier : vos rushes originaux ne sont jamais écrasés.",
          "Vos fichiers sont hébergés au Québec.",
        ],
      },
      {
        titre: "Ce qu'il faut savoir",
        paragraphes: [
          "La session d'OpenShot est temporaire : exportez votre vidéo dans le dossier « Stockage » et renvoyez-la dans Fichiers avant de fermer la fenêtre, c'est là qu'elle est conservée. OpenShot s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone. Pour un montage multipiste plus poussé, Kdenlive est aussi offert dans Cloud OS.",
        ],
      },
    ],
    en: [
      {
        titre: "Video editing you can pick up in minutes",
        paragraphes: [
          "OpenShot is free video editing software designed to be simple: drop your clips on the timeline, trim, add a transition, a title, some music, and export. It can do more — unlimited tracks, keyframe animation, speed changes — without forcing any of it on someone who just wants to put a few shots together.",
          "It is the right choice for a presentation video, a tutorial, an event recap or a short clip for social media, when you are not an editor by trade.",
        ],
      },
      {
        titre: "The real OpenShot, in a desktop window",
        paragraphes: [
          "In Cloud OS, the software itself runs in a window of your online desktop. Nothing to install on your computer, no updates to keep up with, and the same OpenShot on every computer you sign in from. The video is exported on the server, not on your machine.",
        ],
      },
      {
        titre: "Your clips stay in your own space",
        paragraphes: [
          "You pick your clips, pictures and music in the Files app, and they open straight in OpenShot. Once the video is exported to the app's “Stockage” folder, one click sends it back to Files.",
        ],
        points: [
          "Several files imported one after another, without closing the import window.",
          "Every file sent back arrives as a new file: your original footage is never overwritten.",
          "Your files are hosted in Québec.",
        ],
      },
      {
        titre: "Good to know",
        paragraphes: [
          "An OpenShot session is temporary: export your video to the “Stockage” folder and send it back to Files before closing the window, since that is where it is kept. OpenShot is used from a computer; it is not offered on phones. For more advanced multitrack editing, Kdenlive is also available in Cloud OS.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Faut-il installer OpenShot pour l'utiliser dans Cloud OS ?",
        reponse: "Non. OpenShot tourne dans une fenêtre de votre bureau en ligne, depuis le navigateur. Il n'y a rien à installer ni à mettre à jour sur votre ordinateur.",
      },
      {
        question: "OpenShot, Shotcut ou Kdenlive : lequel choisir ?",
        reponse: "OpenShot est le plus simple à prendre en main, pour une vidéo courte ou un premier montage. Shotcut convient à qui veut plus de filtres et de réglages ; Kdenlive, à un montage multipiste plus ambitieux. Les trois sont compris dans Cloud OS : vous pouvez les essayer tour à tour.",
      },
      {
        question: "OpenShot est-il compris dans l'abonnement ?",
        reponse: "Oui, dès le forfait Personnel, comme les autres logiciels du bureau. Il n'y a pas de frais par application : chaque ouverture compte comme une tâche dans l'enveloppe de votre forfait.",
      },
      {
        question: "Mes vidéos originales risquent-elles d'être écrasées ?",
        reponse: "Non. Les fichiers que vous renvoyez d'OpenShot vers Fichiers arrivent comme de nouveaux fichiers ; vos originaux restent tels quels.",
      },
    ],
    en: [
      {
        question: "Do I need to install OpenShot to use it in Cloud OS?",
        reponse: "No. OpenShot runs in a window of your online desktop, from the browser. There is nothing to install or update on your computer.",
      },
      {
        question: "OpenShot, Shotcut or Kdenlive: which should I choose?",
        reponse: "OpenShot is the easiest to pick up, for a short video or a first edit. Shotcut suits people who want more filters and settings; Kdenlive, a more ambitious multitrack edit. All three are included in Cloud OS, so you can try each one in turn.",
      },
      {
        question: "Is OpenShot included in the subscription?",
        reponse: "Yes, from the Personal plan, like the other desktop software. There is no fee per app: each launch counts as one task in your plan's allowance.",
      },
      {
        question: "Could my original videos be overwritten?",
        reponse: "No. Files you send back from OpenShot to Files arrive as new files; your originals stay as they were.",
      },
    ],
  },
  captures: [],
  voisines: ["kdenlive", "shotcut", "audacity"],
  articles: [
    { slug: "premiere-pro-vs-davinci-resolve", titre: "Premiere Pro vs DaVinci Resolve : quel logiciel choisir en 2026 ?" },
  ],
};
