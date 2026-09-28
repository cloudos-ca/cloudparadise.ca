import type { FicheApplication } from "../types";

/**
 * Caméra (« Webcam » en anglais) — ÉBAUCHE, à relire avant publication.
 *
 * App maison (id `camera`), ajoutée au produit le 2026-09-28. Spec :
 * cloudparadise_hpc/docs/superpowers/specs/2026-09-27-app-camera-design.md.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-28 :
 * - Libellés : « Caméra » / « Webcam » (src/i18n/messages/{fr,en}.json, os.apps.camera). Utilisable
 *   sur téléphone : pas de `desktopOnly`, `keepMountedOnMobile` (app-registry.tsx). Forfait
 *   `personnel` (GET /api/v1/apps/catalog).
 * - Photos (JPEG) et vidéos, pause / reprise en vidéo ; qualité Standard 720p ou Haute 1080p
 *   (QUALITY, src/lib/camera/model.ts) ; bascule entre caméras quand il y en a plusieurs.
 * - Tout va dans un dossier « Caméra » à la racine de l'espace personnel (CAMERA_FOLDER).
 * - Galerie : filtre Tout / Photos / Vidéos ; Renommer, Mettre à la corbeille, Afficher dans Fichiers,
 *   ouvrir une photo dans l'éditeur d'image (`image-editor`) ou une vidéo dans l'éditeur vidéo
 *   (`video-editor`) (capture-detail.tsx).
 * - Transcription des vidéos EN OPTION : interrupteur désactivé par défaut, plus un bouton
 *   « Transcrire » par vidéo (mediaStatus « off », spec § 4.3).
 * - Reprise après fermeture ou plantage, comme l'Enregistreur (chunk store IndexedDB).
 * - La caméra n'est allumée que lorsque la fenêtre est visible ou qu'une vidéo est en cours ; voyant
 *   dans la barre des tâches (spec § 2 et § 3.1).
 *
 * À vérifier à la relecture :
 * - Pas de lien vers la fiche Montage vidéo (retenue dans A_ECRIRE) : la fiche dit « l'éditeur vidéo ».
 * - Le miroir de l'aperçu (caméra frontale) n'est pas cité.
 */
export const camera: FicheApplication = {
  id: "camera",
  apps: ["camera"],
  slug: { fr: "camera-webcam", en: "webcam" },
  nom: { fr: "Caméra", en: "Webcam" },
  titre: {
    fr: "Prendre des photos et des vidéos avec votre webcam, en ligne",
    en: "Take photos and videos with your webcam, online",
  },
  groupe: "audio-video",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Caméra en ligne : photos et vidéos par webcam — Cloud OS",
      en: "Online webcam: take photos and videos — Cloud OS",
    },
    description: {
      fr: "Prenez des photos et filmez des vidéos avec la caméra de votre ordinateur ou de votre téléphone, rangées aussitôt dans vos fichiers hébergés au Québec.",
      en: "Take photos and record videos with your computer's or phone's camera, saved straight to your own files, hosted in Québec. Nothing to install.",
    },
  },
  accroche: {
    fr: "Photos et vidéos prises avec votre caméra, rangées aussitôt dans vos fichiers.",
    en: "Photos and videos from your camera, saved straight to your files.",
  },
  motsCles: {
    fr: ["webcam en ligne", "prendre une photo avec sa webcam", "enregistrer une vidéo webcam en ligne", "caméra en ligne"],
    en: ["online webcam", "take a photo with webcam", "record webcam video online", "online camera"],
  },
  corps: {
    fr: [
      {
        titre: "Votre caméra, directement dans Cloud OS",
        paragraphes: [
          "L'application Caméra utilise la webcam de votre ordinateur ou les caméras de votre téléphone : un viseur, un déclencheur, et une bascule entre photo et vidéo. En vidéo, un chronomètre tourne, et vous mettez en pause puis reprenez sans créer plusieurs fichiers.",
          "Chaque prise part aussitôt dans vos fichiers, dans un dossier « Caméra ». Pas de câble, pas de copie depuis le téléphone : la photo prise sur le chantier est déjà sur votre bureau en ligne.",
        ],
        points: [
          "Qualité Standard (720p) ou Haute (1080p), au choix.",
          "Passage d'une caméra à l'autre, avant ou arrière, quand il y en a plusieurs.",
          "La caméra ne s'allume que lorsque vous vous en servez, avec un voyant dans la barre des tâches.",
        ],
      },
      {
        titre: "Une galerie reliée à vos fichiers",
        paragraphes: [
          "La galerie montre vos photos et vos vidéos, les plus récentes d'abord, avec un filtre pour n'afficher que l'une ou l'autre. Vous renommez une prise, la mettez à la corbeille, l'affichez dans Fichiers, ou l'ouvrez dans l'éditeur d'image ou l'éditeur vidéo de Cloud OS.",
        ],
      },
      {
        titre: "La transcription des vidéos, si vous la voulez",
        paragraphes: [
          "Une vidéo peut être transcrite par les serveurs de Cloud OS, hébergés au Québec : le texte apparaît sous la vidéo et sert à la retrouver par recherche. C'est désactivé par défaut ; activez-le pour toutes vos vidéos, ou demandez-le pour une seule avec le bouton Transcrire.",
          "Si l'onglet se ferme en pleine vidéo, rien n'est perdu : à la prochaine ouverture, l'application propose de récupérer la prise.",
        ],
      },
    ],
    en: [
      {
        titre: "Your camera, right inside Cloud OS",
        paragraphes: [
          "The Webcam app uses your computer's webcam or your phone's cameras: a viewfinder, a shutter button, and a switch between photo and video. In video mode a timer runs, and you pause and resume without creating several files.",
          "Every shot goes straight to your files, in a “Caméra” folder. No cable, no copying from your phone: the photo taken on site is already on your online desktop.",
        ],
        points: [
          "Standard (720p) or High (1080p) quality, your choice.",
          "Switch between cameras, front or back, when there is more than one.",
          "The camera only turns on while you use it, with an indicator in the taskbar.",
        ],
      },
      {
        titre: "A gallery tied to your files",
        paragraphes: [
          "The gallery shows your photos and videos, newest first, with a filter to show only one or the other. You rename a shot, move it to the trash, show it in Files, or open it in the Cloud OS image editor or video editor.",
        ],
      },
      {
        titre: "Video transcripts, if you want them",
        paragraphes: [
          "A video can be transcribed by Cloud OS servers, hosted in Québec: the text appears under the video and lets you find it through search. It is off by default; turn it on for all your videos, or ask for a single one with the Transcribe button.",
          "If the tab closes in the middle of a video, nothing is lost: next time you open the app, it offers to recover the shot.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Est-ce que ça fonctionne sur téléphone ?",
        reponse: "Oui, dans le navigateur de votre téléphone, avec ses caméras avant et arrière. Passer à une autre application de Cloud OS n'interrompt pas une vidéo en cours.",
      },
      {
        question: "Où vont mes photos et mes vidéos ?",
        reponse: "Dans vos fichiers Cloud OS, dans le dossier « Caméra », hébergé au Québec. Rien ne reste sur l'appareil une fois la prise envoyée.",
      },
      {
        question: "Mes vidéos sont-elles transcrites automatiquement ?",
        reponse: "Non, pas par défaut. Vous activez la transcription dans les réglages de l'application, ou vous la demandez vidéo par vidéo.",
      },
    ],
    en: [
      {
        question: "Does it work on a phone?",
        reponse: "Yes, in your phone's browser, with its front and back cameras. Switching to another Cloud OS app doesn't interrupt a video in progress.",
      },
      {
        question: "Where do my photos and videos go?",
        reponse: "To your Cloud OS files, in the “Caméra” folder, hosted in Québec. Nothing stays on the device once the shot is uploaded.",
      },
      {
        question: "Are my videos transcribed automatically?",
        reponse: "No, not by default. You turn transcription on in the app's settings, or ask for it one video at a time.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/camera/camera-galerie.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "La Caméra de Cloud OS : la galerie des photos et d'une vidéo, rangées dans Fichiers",
        en: "The Cloud OS Webcam app: the gallery of photos and a video, stored in Files",
      },
    },
  ],
  voisines: ["enregistreur", "retouche-image", "kdenlive", "fichiers"],
  articles: [],
};
