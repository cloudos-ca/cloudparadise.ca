import type { FicheApplication } from "../types";

/**
 * Audacity — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Audacity est l'image `infra/kasm-images/apps/audacity` du produit (arm64, 2026-09-25 : LinuxServer.io ne publie `linuxserver/audacity` qu'en amd64), diffusée dans une fenêtre du bureau
 *   (src/lib/marketplace/desktop-apps-catalog.ts, « Enregistrement et édition audio ») ; ordinateur
 *   seulement (`desktopOnly`, app-registry.tsx). Forfait : `personnel` (GET /api/v1/apps/catalog).
 * - Un fichier importé depuis Fichiers s'ouvre directement dans Audacity (`openCmd: "audacity"`,
 *   importFilesToDesktopAppAction) ; jusqu'à 20 fichiers par import (MAX_IMPORT_FILES).
 * - Les fichiers arrivent dans le dossier « Stockage » de l'application ; « Enregistrer » renvoie dans
 *   Fichiers les fichiers nouveaux ou modifiés de ce dossier, chacun comme un nouveau fichier
 *   (exportDesktopAppFilesAction). Renvoi non récursif.
 * - Session temporaire, sur un espace en mémoire (appfiles-session.ts, reaper.ts).
 * - PAS D'ENREGISTREMENT AU MICRO : la fenêtre du logiciel est une iframe d'une autre origine dont
 *   l'attribut `allow` ne donne que « clipboard-read; clipboard-write; fullscreen »
 *   (src/components/os/apps/marketplace/desktop-app-window.tsx) — le navigateur refuse donc le micro.
 *   La fiche le dit et positionne Audacity sur l'édition de fichiers existants, malgré la description
 *   du catalogue du produit (« Enregistrement et édition audio »).
 * - Éditeur et licence : Audacity Team (Muse Group) ; GPL-3.0 (LICENSE.txt du dépôt audacity/audacity :
 *   « Audacity is released under the GNU General Public License version 3 »).
 *
 * Positionnement (anti-cannibalisation) : Audacity = ÉDITER un fichier audio (couper, nettoyer,
 * convertir). Ardour = station audionumérique multipiste (mixage, production). « Audio » (app maison
 * audio-editor) = l'éditeur léger intégré.
 *
 * À vérifier à la relecture :
 * - Que le pont fichiers (MARKETPLACE_APPFILES) est actif en production.
 * - L'ÉCOUTE : que le son d'Audacity parvient bien au navigateur par le flux KasmVNC. La fiche ne le
 *   promet pas explicitement, mais un éditeur audio sans écoute serait peu utile : à tester avant
 *   publication.
 * - L'export MP3 intégré (Audacity 3.x embarque l'encodeur ; l'image arm64 installe Audacity 3.7.3 de Debian trixie).
 */
export const audacity: FicheApplication = {
  id: "audacity",
  apps: ["desktop-audacity"],
  slug: { fr: "audacity", en: "audacity" },
  nom: { fr: "Audacity", en: "Audacity" },
  tiers: { editeur: "Audacity Team (Muse Group)", licence: "GPL-3.0", site: "https://www.audacityteam.org/" },
  titre: {
    fr: "Audacity en ligne : éditez vos fichiers audio sans rien installer",
    en: "Audacity online: edit your audio files with nothing to install",
  },
  groupe: "audio-video",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Audacity en ligne : éditer un fichier audio — Cloud OS",
      en: "Audacity online: edit audio files, no install — Cloud OS",
    },
    description: {
      fr: "Coupez, nettoyez et convertissez vos fichiers audio avec Audacity dans le navigateur : rien à installer, vos fichiers restent dans votre espace au Québec.",
      en: "Cut, clean up and convert your audio files with Audacity in your browser: nothing to install, and your files stay in your own space in Québec.",
    },
  },
  accroche: {
    fr: "L'éditeur audio libre le plus connu, pour couper, nettoyer et convertir vos sons.",
    en: "The best-known free audio editor, to cut, clean up and convert your recordings.",
  },
  motsCles: {
    fr: ["audacity en ligne", "audacity sans installation", "éditer un fichier audio en ligne", "couper un fichier audio", "réduire le bruit d'un enregistrement"],
    en: ["audacity online", "audacity without installing", "edit audio file online", "cut an audio file", "remove background noise from audio"],
  },
  corps: {
    fr: [
      {
        titre: "L'édition audio, simplement",
        paragraphes: [
          "Audacity est le logiciel libre d'édition audio de référence. On y ouvre un fichier, on voit sa forme d'onde, et on la travaille : couper un passage, en déplacer un autre, ajouter un fondu, régler le volume.",
          "Ses effets couvrent les besoins courants d'un balado, d'une entrevue ou d'une narration : normalisation, réduction du bruit de fond, compression, égalisation, changement de tempo ou de hauteur. Il sert aussi à convertir un fichier d'un format à l'autre, par exemple de WAV vers FLAC ou OGG.",
        ],
      },
      {
        titre: "Le vrai Audacity, dans une fenêtre du bureau",
        paragraphes: [
          "Dans Cloud OS, c'est le logiciel lui-même qui tourne, dans une fenêtre de votre bureau en ligne. Rien à installer sur le poste, aucune mise à jour à suivre, et le même Audacity sur chaque ordinateur d'où vous vous connectez.",
        ],
      },
      {
        titre: "Vos enregistrements restent dans votre espace",
        paragraphes: [
          "Vous choisissez vos fichiers audio dans l'application Fichiers, et ils s'ouvrent directement dans Audacity. Une fois le résultat exporté dans le dossier « Stockage » de l'application, un clic le renvoie dans Fichiers.",
        ],
        points: [
          "Plusieurs fichiers importés à la suite, sans refermer la fenêtre d'import.",
          "Chaque fichier renvoyé arrive comme un nouveau fichier : l'enregistrement original n'est jamais écrasé.",
          "Vos fichiers sont hébergés au Québec.",
        ],
      },
      {
        titre: "Ce qu'il faut savoir",
        paragraphes: [
          "Dans Cloud OS, Audacity sert à éditer des fichiers audio existants : l'enregistrement par le micro de votre ordinateur n'y est pas disponible. Enregistrez d'abord sur votre appareil, puis versez le fichier dans Fichiers.",
          "La session d'Audacity est temporaire : exportez votre travail dans le dossier « Stockage » et renvoyez-le dans Fichiers avant de fermer la fenêtre. Audacity s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
        ],
      },
    ],
    en: [
      {
        titre: "Audio editing, made simple",
        paragraphes: [
          "Audacity is the leading free audio editing software. You open a file, see its waveform, and work on it: cut a passage, move another, add a fade, adjust the volume.",
          "Its effects cover the everyday needs of a podcast, an interview or a voice-over: normalization, background noise reduction, compression, equalization, tempo or pitch changes. It also converts files from one format to another, for example from WAV to FLAC or OGG.",
        ],
      },
      {
        titre: "The real Audacity, in a desktop window",
        paragraphes: [
          "In Cloud OS, the software itself runs in a window of your online desktop. Nothing to install on your computer, no updates to keep up with, and the same Audacity on every computer you sign in from.",
        ],
      },
      {
        titre: "Your recordings stay in your own space",
        paragraphes: [
          "You pick your audio files in the Files app, and they open straight in Audacity. Once the result is exported to the app's “Stockage” folder, one click sends it back to Files.",
        ],
        points: [
          "Several files imported one after another, without closing the import window.",
          "Every file sent back arrives as a new file: the original recording is never overwritten.",
          "Your files are hosted in Québec.",
        ],
      },
      {
        titre: "Good to know",
        paragraphes: [
          "In Cloud OS, Audacity is for editing existing audio files: recording from your computer's microphone is not available there. Record on your device first, then upload the file to Files.",
          "An Audacity session is temporary: export your work to the “Stockage” folder and send it back to Files before closing the window. Audacity is used from a computer; it is not offered on phones.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Faut-il installer Audacity pour l'utiliser dans Cloud OS ?",
        reponse: "Non. Audacity tourne dans une fenêtre de votre bureau en ligne, depuis le navigateur. Il n'y a rien à installer ni à mettre à jour sur votre ordinateur.",
      },
      {
        question: "Puis-je enregistrer ma voix directement dans Audacity ?",
        reponse: "Pas dans Cloud OS : le micro de votre ordinateur n'est pas relié au logiciel. Enregistrez sur votre appareil, versez le fichier dans Fichiers, puis ouvrez-le dans Audacity pour le monter et le nettoyer.",
      },
      {
        question: "Audacity ou Ardour : lequel choisir ?",
        reponse: "Audacity, pour éditer un fichier : couper, nettoyer, convertir. Ardour, pour produire un morceau à plusieurs pistes et le mixer. Les deux sont compris dans Cloud OS.",
      },
      {
        question: "Audacity est-il compris dans l'abonnement ?",
        reponse: "Oui, dès le forfait Personnel, comme les autres logiciels du bureau. Il n'y a pas de frais par application : chaque ouverture compte comme une tâche dans l'enveloppe de votre forfait.",
      },
    ],
    en: [
      {
        question: "Do I need to install Audacity to use it in Cloud OS?",
        reponse: "No. Audacity runs in a window of your online desktop, from the browser. There is nothing to install or update on your computer.",
      },
      {
        question: "Can I record my voice directly in Audacity?",
        reponse: "Not in Cloud OS: your computer's microphone is not connected to the software. Record on your device, upload the file to Files, then open it in Audacity to edit and clean it up.",
      },
      {
        question: "Audacity or Ardour: which should I choose?",
        reponse: "Audacity, to edit a file: cut, clean up, convert. Ardour, to produce a multitrack piece and mix it. Both are included in Cloud OS.",
      },
      {
        question: "Is Audacity included in the subscription?",
        reponse: "Yes, from the Personal plan, like the other desktop software. There is no fee per app: each launch counts as one task in your plan's allowance.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/audacity/audacity-piste.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "Audacity dans Cloud OS : une piste audio importée depuis Fichiers",
        en: "Audacity in Cloud OS: an audio track imported from Files",
      },
    },
  ],
  voisines: ["audio", "openshot"],
  articles: [],
};
