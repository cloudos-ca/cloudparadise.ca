import type { FicheApplication } from "../types";

/**
 * Shotcut — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Shotcut est l'image `linuxserver/shotcut`, diffusée dans une fenêtre du bureau
 *   (src/lib/marketplace/desktop-apps-catalog.ts, « Montage vidéo multiplateforme ») ; ordinateur
 *   seulement (`desktopOnly`, app-registry.tsx). Forfait : `personnel` (GET /api/v1/apps/catalog).
 * - Un fichier importé depuis Fichiers s'ouvre directement dans Shotcut (`openCmd: "shotcut"`,
 *   importFilesToDesktopAppAction) ; jusqu'à 20 fichiers par import (MAX_IMPORT_FILES).
 * - Les fichiers arrivent dans le dossier « Stockage » de l'application ; « Enregistrer » renvoie dans
 *   Fichiers les fichiers nouveaux ou modifiés de ce dossier, chacun comme un nouveau fichier
 *   (exportDesktopAppFilesAction). Renvoi non récursif : seuls les fichiers posés directement dans
 *   « Stockage » reviennent.
 * - Session temporaire, sur un espace en mémoire (appfiles-session.ts, reaper.ts).
 * - Éditeur et licence : Meltytech, LLC ; GPL-3.0 (licence du dépôt mltframework/shotcut sur GitHub).
 *   Shotcut repose sur le cadriciel MLT et FFmpeg (d'où la large prise en charge des formats).
 *
 * Positionnement (anti-cannibalisation) : Shotcut = l'éditeur vidéo « technique » — nombreux formats
 * ouverts tels quels, filtres, réglages fins. OpenShot = le montage facile ; Kdenlive = le multipiste
 * avancé.
 *
 * À vérifier à la relecture :
 * - Que le pont fichiers (MARKETPLACE_APPFILES) est actif en production.
 * - Les performances d'export : plafond par défaut de 2 Go de RAM et 1,5 processeur par conteneur
 *   (compose-validate.ts), sans GPU. Rien n'est promis sur la vitesse de rendu.
 * - Le son de l'aperçu dans le flux KasmVNC (non promis dans la fiche).
 * - Reprendre un projet (.mlt) dans une session ultérieure : non testé, non promis.
 */
export const shotcut: FicheApplication = {
  id: "shotcut",
  apps: ["desktop-shotcut"],
  slug: { fr: "shotcut", en: "shotcut" },
  nom: { fr: "Shotcut", en: "Shotcut" },
  tiers: { editeur: "Meltytech, LLC", licence: "GPL-3.0", site: "https://shotcut.org/" },
  titre: {
    fr: "Shotcut en ligne : un éditeur vidéo libre et précis, sans rien installer",
    en: "Shotcut online: a free, precise video editor with nothing to install",
  },
  groupe: "audio-video",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Shotcut en ligne : éditeur vidéo libre et précis — Cloud OS",
      en: "Shotcut online: video editor, nothing to install — Cloud OS",
    },
    description: {
      fr: "Utilisez Shotcut directement dans le navigateur : filtres, formats variés, réglages fins. Rien à installer, vos fichiers restent dans votre espace au Québec.",
      en: "Use Shotcut right in your browser: filters, a wide range of formats, fine control. Nothing to install, and your files stay in your own space in Québec.",
    },
  },
  accroche: {
    fr: "L'éditeur vidéo libre riche en filtres, qui ouvre vos fichiers tels quels.",
    en: "The free video editor packed with filters, which opens your files as they are.",
  },
  motsCles: {
    fr: ["shotcut en ligne", "shotcut sans installation", "éditeur vidéo gratuit", "logiciel de montage vidéo libre", "alternative gratuite à premiere pro"],
    en: ["shotcut online", "shotcut without installing", "free video editor", "open source video editing software", "free premiere pro alternative"],
  },
  corps: {
    fr: [
      {
        titre: "Un éditeur vidéo pour qui aime régler les détails",
        paragraphes: [
          "Shotcut est un logiciel libre de montage vidéo bâti sur le cadriciel MLT et sur FFmpeg. Sa force : il ouvre directement un très grand nombre de formats vidéo, audio et image, sans conversion préalable, et les dépose tels quels sur la ligne de temps.",
          "Autour de la ligne de temps multipiste, une riche bibliothèque de filtres vidéo et audio : correction des couleurs, recadrage, stabilisation, incrustation, texte, fondus, réglage du volume. La plupart s'animent par images clés, et les panneaux se disposent à votre goût.",
        ],
      },
      {
        titre: "Le vrai Shotcut, dans une fenêtre du bureau",
        paragraphes: [
          "Dans Cloud OS, c'est le logiciel lui-même qui tourne, dans une fenêtre de votre bureau en ligne. Rien à installer sur le poste, aucune mise à jour à suivre, et le même Shotcut sur chaque ordinateur d'où vous vous connectez. L'export se fait sur le serveur, pas sur votre machine.",
        ],
      },
      {
        titre: "Vos médias restent dans votre espace",
        paragraphes: [
          "Vous choisissez vos clips dans l'application Fichiers, et ils s'ouvrent directement dans Shotcut. Une fois la vidéo exportée dans le dossier « Stockage » de l'application, un clic la renvoie dans Fichiers.",
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
          "La session de Shotcut est temporaire : exportez votre vidéo dans le dossier « Stockage » et renvoyez-la dans Fichiers avant de fermer la fenêtre, c'est là qu'elle est conservée. Shotcut s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
        ],
      },
    ],
    en: [
      {
        titre: "A video editor for people who like to fine-tune",
        paragraphes: [
          "Shotcut is free video editing software built on the MLT framework and FFmpeg. Its strength: it opens a very wide range of video, audio and image formats directly, with no prior conversion, and places them on the timeline as they are.",
          "Around the multitrack timeline sits a rich library of video and audio filters: colour correction, cropping, stabilization, compositing, text, fades, volume control. Most of them can be animated with keyframes, and the panels can be arranged the way you like.",
        ],
      },
      {
        titre: "The real Shotcut, in a desktop window",
        paragraphes: [
          "In Cloud OS, the software itself runs in a window of your online desktop. Nothing to install on your computer, no updates to keep up with, and the same Shotcut on every computer you sign in from. The export happens on the server, not on your machine.",
        ],
      },
      {
        titre: "Your media stays in your own space",
        paragraphes: [
          "You pick your clips in the Files app, and they open straight in Shotcut. Once the video is exported to the app's “Stockage” folder, one click sends it back to Files.",
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
          "A Shotcut session is temporary: export your video to the “Stockage” folder and send it back to Files before closing the window, since that is where it is kept. Shotcut is used from a computer; it is not offered on phones.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Faut-il installer Shotcut pour l'utiliser dans Cloud OS ?",
        reponse: "Non. Shotcut tourne dans une fenêtre de votre bureau en ligne, depuis le navigateur. Il n'y a rien à installer ni à mettre à jour sur votre ordinateur.",
      },
      {
        question: "Quelle différence entre Shotcut et OpenShot ?",
        reponse: "OpenShot mise sur la simplicité, pour un premier montage ou une vidéo courte. Shotcut offre davantage de filtres et de réglages, et ouvre sans conversion un très grand nombre de formats. Les deux sont compris dans Cloud OS, tout comme Kdenlive.",
      },
      {
        question: "Shotcut est-il compris dans l'abonnement ?",
        reponse: "Oui, dès le forfait Personnel, comme les autres logiciels du bureau. Il n'y a pas de frais par application : chaque ouverture compte comme une tâche dans l'enveloppe de votre forfait.",
      },
      {
        question: "Mes vidéos originales risquent-elles d'être écrasées ?",
        reponse: "Non. Les fichiers que vous renvoyez de Shotcut vers Fichiers arrivent comme de nouveaux fichiers ; vos originaux restent tels quels.",
      },
    ],
    en: [
      {
        question: "Do I need to install Shotcut to use it in Cloud OS?",
        reponse: "No. Shotcut runs in a window of your online desktop, from the browser. There is nothing to install or update on your computer.",
      },
      {
        question: "What is the difference between Shotcut and OpenShot?",
        reponse: "OpenShot focuses on simplicity, for a first edit or a short video. Shotcut offers more filters and settings, and opens a very wide range of formats with no conversion. Both are included in Cloud OS, as is Kdenlive.",
      },
      {
        question: "Is Shotcut included in the subscription?",
        reponse: "Yes, from the Personal plan, like the other desktop software. There is no fee per app: each launch counts as one task in your plan's allowance.",
      },
      {
        question: "Could my original videos be overwritten?",
        reponse: "No. Files you send back from Shotcut to Files arrive as new files; your originals stay as they were.",
      },
    ],
  },
  captures: [],
  voisines: ["kdenlive", "openshot", "audacity"],
  articles: [
    { slug: "premiere-pro-vs-davinci-resolve", titre: "Premiere Pro vs DaVinci Resolve : quel logiciel choisir en 2026 ?" },
  ],
};
