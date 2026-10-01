import type { FicheApplication } from "../types";

/**
 * Ardour — publiée le 2026-10-01, une fois le son et le micro confirmés en production par le client.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Ardour est l'image `linuxserver/ardour`, diffusée dans une fenêtre du bureau
 *   (src/lib/marketplace/desktop-apps-catalog.ts, « Station de travail audio numérique (production
 *   musicale) ») ; ordinateur seulement (`desktopOnly`, app-registry.tsx). Forfait : `personnel`
 *   (GET /api/v1/apps/catalog).
 * - PAS D'`openCmd` : un fichier importé depuis Fichiers est seulement copié dans le dossier
 *   « Stockage » de l'application (importFilesToDesktopAppAction) ; on l'ajoute ensuite à la session
 *   depuis Ardour. La fiche le dit ainsi. Jusqu'à 20 fichiers par import.
 * - « Enregistrer » renvoie dans Fichiers les fichiers nouveaux ou modifiés posés DIRECTEMENT dans
 *   « Stockage », chacun comme un nouveau fichier ; le renvoi n'est pas récursif (listStorageFiles,
 *   appfiles-session.ts). Or une session Ardour est un DOSSIER : elle ne revient pas dans Fichiers.
 *   La fiche ne promet donc que le renvoi des fichiers exportés (le mixage).
 * - Session temporaire, sur un espace en mémoire (appfiles-session.ts, reaper.ts).
 * - MICRO ET SON (depuis le 2026-09-26, 64078b46 ; confirmé en production par le client le
 *   2026-10-01) : bouton « Ouvrir le micro » dans la fenêtre, accord demandé à la première ouverture,
 *   micro choisi dans Paramètres › Son parmi les entrées que voit le navigateur — une interface audio
 *   y figure comme un micro. Un clavier MIDI n'est relié par rien : la fiche le dit.
 * - Éditeur et licence : Paul Davis et la communauté Ardour ; GPL-2.0-or-later (COPYING du dépôt
 *   Ardour/ardour).
 *
 * Positionnement (anti-cannibalisation) : Ardour = station audionumérique (DAW) multipiste —
 * arranger, mixer, automatiser, exporter un mixage. Audacity = éditer un fichier audio.
 *
 * À vérifier à la relecture :
 * - Que le pont fichiers (MARKETPLACE_APPFILES) est actif en production.
 * - La tenue d'une session chargée dans le plafond par défaut de 2 Go de RAM et 1,5 processeur
 *   (compose-validate.ts).
 * - Les greffons intégrés cités (égaliseur, compresseur, réverbération : la série « ACE » d'Ardour)
 *   dans la version de l'image.
 * - Piste possible, non écrite dans la fiche : « Session > Archiver » produit un seul fichier
 *   compressé, qui reviendrait dans Fichiers s'il est enregistré dans « Stockage » — non testé.
 */
export const ardour: FicheApplication = {
  id: "ardour",
  apps: ["desktop-ardour"],
  slug: { fr: "ardour", en: "ardour" },
  nom: { fr: "Ardour", en: "Ardour" },
  tiers: { editeur: "Paul Davis et la communauté Ardour", licence: "GPL-2.0", site: "https://ardour.org/" },
  titre: {
    fr: "Ardour en ligne : une station audionumérique multipiste, sans rien installer",
    en: "Ardour online: a multitrack digital audio workstation, with nothing to install",
  },
  groupe: "audio-video",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Ardour en ligne : station audionumérique (DAW) — Cloud OS",
      en: "Ardour online: a multitrack DAW in your browser — Cloud OS",
    },
    description: {
      fr: "Arrangez et mixez vos pistes avec Ardour, la station audionumérique libre, dans le navigateur : rien à installer, vos fichiers restent dans votre espace.",
      en: "Arrange and mix your tracks with Ardour, the free digital audio workstation, in your browser: nothing to install, and your files stay in your own space.",
    },
  },
  accroche: {
    fr: "La station audionumérique libre pour arranger et mixer en multipiste.",
    en: "The free digital audio workstation for multitrack arranging and mixing.",
  },
  motsCles: {
    fr: ["ardour en ligne", "station audionumérique en ligne", "daw en ligne", "logiciel de mixage audio gratuit", "alternative gratuite à pro tools"],
    en: ["ardour online", "online daw", "digital audio workstation in the browser", "free audio mixing software", "free pro tools alternative"],
  },
  corps: {
    fr: [
      {
        titre: "Une station audionumérique complète",
        paragraphes: [
          "Ardour est une station audionumérique (DAW) libre : le type de logiciel où l'on assemble un morceau, un balado ou une bande sonore à partir de nombreuses pistes. On y dispose ses fichiers audio sur une ligne de temps, on les découpe et on les cale, puis on mixe.",
          "Sa table de mixage donne à chaque piste son volume, son panoramique et ses effets ; les réglages s'automatisent dans le temps. Ardour gère aussi les pistes MIDI et fournit ses propres greffons de base (égaliseur, compresseur, réverbération). Le résultat s'exporte en un fichier audio, par exemple en WAV ou en FLAC.",
        ],
      },
      {
        titre: "Le vrai Ardour, dans une fenêtre du bureau",
        paragraphes: [
          "Dans Cloud OS, c'est le logiciel lui-même qui tourne, dans une fenêtre de votre bureau en ligne. Rien à installer ni à configurer sur le poste, aucune mise à jour à suivre, et le même Ardour sur chaque ordinateur d'où vous vous connectez.",
          "Vous entendez votre mixage, et vous enregistrez avec le micro de votre ordinateur : un bouton de la fenêtre l'ouvre, après votre accord, et il se ferme avec elle. Le micro utilisé se choisit dans les Paramètres ; une interface audio reconnue par votre navigateur y figure aussi.",
        ],
      },
      {
        titre: "Vos pistes restent dans votre espace",
        paragraphes: [
          "Vous choisissez vos fichiers audio dans l'application Fichiers : ils arrivent dans le dossier « Stockage » de l'application, d'où vous les ajoutez à votre session Ardour. Une fois le mixage exporté dans ce même dossier, un clic le renvoie dans Fichiers.",
        ],
        points: [
          "Plusieurs fichiers importés à la suite, sans refermer la fenêtre d'import.",
          "Chaque fichier renvoyé arrive comme un nouveau fichier : vos prises originales ne sont jamais écrasées.",
          "Vos fichiers sont hébergés au Québec.",
        ],
      },
      {
        titre: "Ce qu'il faut savoir",
        paragraphes: [
          "Le son fait l'aller-retour par Internet : comptez un léger décalage à l'enregistrement, et recalez la prise sur la ligne de temps au besoin. Un clavier MIDI branché sur votre ordinateur n'est pas relié au logiciel.",
          "La session est temporaire, et seuls les fichiers placés directement dans le dossier « Stockage » reviennent dans Fichiers : exportez-y votre mixage avant de fermer la fenêtre. Ardour s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
        ],
      },
    ],
    en: [
      {
        titre: "A complete digital audio workstation",
        paragraphes: [
          "Ardour is a free digital audio workstation (DAW): the kind of software where you build a song, a podcast or a soundtrack from many tracks. You lay out your audio files on a timeline, trim and align them, then mix.",
          "Its mixer gives each track its own volume, panning and effects, and settings can be automated over time. Ardour also handles MIDI tracks and comes with its own basic plug-ins (equalizer, compressor, reverb). The result is exported as an audio file, for example in WAV or FLAC.",
        ],
      },
      {
        titre: "The real Ardour, in a desktop window",
        paragraphes: [
          "In Cloud OS, the software itself runs in a window of your online desktop. Nothing to install or configure on your computer, no updates to keep up with, and the same Ardour on every computer you sign in from.",
          "You hear your mix, and you record with your computer's microphone: a button in the window opens it once you agree, and it closes with the window. You pick which microphone to use in Settings; an audio interface your browser recognizes shows up there too.",
        ],
      },
      {
        titre: "Your tracks stay in your own space",
        paragraphes: [
          "You pick your audio files in the Files app: they land in the app's “Stockage” folder, from which you add them to your Ardour session. Once the mix is exported to that same folder, one click sends it back to Files.",
        ],
        points: [
          "Several files imported one after another, without closing the import window.",
          "Every file sent back arrives as a new file: your original takes are never overwritten.",
          "Your files are hosted in Québec.",
        ],
      },
      {
        titre: "Good to know",
        paragraphes: [
          "Sound makes a round trip over the internet: expect a slight delay when recording, and nudge the take into place on the timeline if needed. A MIDI keyboard plugged into your computer is not connected to the software.",
          "The session is temporary, and only files placed directly in the “Stockage” folder go back to Files: export your mix there before closing the window. Ardour is used from a computer; it is not offered on phones.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Faut-il installer Ardour pour l'utiliser dans Cloud OS ?",
        reponse: "Non. Ardour tourne dans une fenêtre de votre bureau en ligne, depuis le navigateur. Il n'y a rien à installer ni à configurer sur votre ordinateur.",
      },
      {
        question: "Puis-je enregistrer des instruments ou ma voix dans Ardour ?",
        reponse: "Oui, par le micro : ouvrez-le avec le bouton de la fenêtre d'Ardour et donnez votre accord. Une interface audio reconnue par votre navigateur peut servir de micro, au choix dans les Paramètres. Les claviers MIDI, eux, ne sont pas reliés.",
      },
      {
        question: "Ardour ou Audacity : lequel choisir ?",
        reponse: "Audacity, pour éditer un fichier : couper, nettoyer, convertir. Ardour, pour assembler un morceau à plusieurs pistes et le mixer. Les deux sont compris dans Cloud OS.",
      },
      {
        question: "Ardour est-il compris dans l'abonnement ?",
        reponse: "Oui, dès le forfait Personnel, comme les autres logiciels du bureau. Il n'y a pas de frais par application : chaque ouverture compte comme une tâche dans l'enveloppe de votre forfait.",
      },
    ],
    en: [
      {
        question: "Do I need to install Ardour to use it in Cloud OS?",
        reponse: "No. Ardour runs in a window of your online desktop, from the browser. There is nothing to install or configure on your computer.",
      },
      {
        question: "Can I record instruments or my voice in Ardour?",
        reponse: "Yes, through the microphone: open it with the button in the Ardour window and give your consent. An audio interface your browser recognizes can serve as the microphone, chosen in Settings. MIDI keyboards, however, are not connected.",
      },
      {
        question: "Ardour or Audacity: which should I choose?",
        reponse: "Audacity, to edit a file: cut, clean up, convert. Ardour, to build a multitrack piece and mix it. Both are included in Cloud OS.",
      },
      {
        question: "Is Ardour included in the subscription?",
        reponse: "Yes, from the Personal plan, like the other desktop software. There is no fee per app: each launch counts as one task in your plan's allowance.",
      },
    ],
  },
  captures: [],
  voisines: ["audacity", "audio", "kdenlive"],
  articles: [],
};
