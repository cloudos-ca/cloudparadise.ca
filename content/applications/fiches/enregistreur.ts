import type { FicheApplication } from "../types";

/**
 * Enregistreur — ÉBAUCHE, à relire avant publication.
 *
 * App maison (id `recorder`), ajoutée au produit le 2026-09-28. Spec :
 * cloudparadise_hpc/docs/superpowers/specs/2026-09-26-enregistreur-numerique-design.md.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-28 :
 * - Libellés : « Enregistreur » / « Recorder » (src/i18n/messages/{fr,en}.json, os.apps.recorder).
 *   Utilisable sur téléphone : pas de `desktopOnly`, `keepMountedOnMobile` (app-registry.tsx).
 *   Forfait `personnel` (GET /api/v1/apps/catalog).
 * - Enregistrer, Pause / Reprendre, Arrêter et enregistrer, Jeter (fr.json, recorder.*). Pendant une
 *   pause, le micro est réellement fermé (use-recorder.ts).
 * - Les enregistrements vont dans un dossier « Enregistrements » à la racine de l'espace personnel,
 *   créé au premier usage (RECORDINGS_FOLDER, src/lib/recorder/model.ts).
 * - Écoute à ×1, ×1,5 ou ×2 (SPEEDS, recording-detail.tsx) ; Renommer, Mettre à la corbeille, Ouvrir
 *   dans l'Éditeur audio, Afficher dans Fichiers (recording-detail.tsx ; fr.json).
 * - Transcription automatique par whisper.cpp dans l'agent média de la plateforme (index-media.ts),
 *   texte copiable, « Relancer » en cas d'échec, plafond 500 Mo (MAX_MEDIA_BYTES). Le texte alimente
 *   aussi la recherche plein texte des fichiers (FileSearchDocument.content).
 * - Reprise : les morceaux sont gardés en local (IndexedDB, chunk-store.ts) ; après une fermeture ou
 *   un plantage, bandeau « Récupérer / Jeter » (fr.json, recorder.recovery).
 * - Micro choisi dans Paramètres, permission par application (AudioProvider).
 *
 * À vérifier à la relecture :
 * - « hébergé au Québec » : l'agent média tourne chez AWS ca-central-1 comme le reste (infra/aws).
 * - Langues de la transcription : `lang: "auto"` (spec) ; la fiche dit « détecte la langue » sans
 *   promettre de liste.
 */
export const enregistreur: FicheApplication = {
  id: "enregistreur",
  apps: ["recorder"],
  slug: { fr: "enregistreur-vocal", en: "voice-recorder" },
  nom: { fr: "Enregistreur", en: "Recorder" },
  titre: {
    fr: "Un enregistreur vocal en ligne qui transcrit ce qui a été dit",
    en: "An online voice recorder that transcribes what was said",
  },
  groupe: "audio-video",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Enregistreur vocal en ligne avec transcription — Cloud OS",
      en: "Online voice recorder with transcription — Cloud OS",
    },
    description: {
      fr: "Enregistrez une réunion, une entrevue ou un mémo vocal dans le navigateur, sur ordinateur ou téléphone, et obtenez sa transcription. Hébergé au Québec.",
      en: "Record a meeting, an interview or a voice memo in your browser, on a computer or a phone, and get its transcript. Hosted in Québec.",
    },
  },
  accroche: {
    fr: "Enregistrer une réunion ou un mémo vocal, et retrouver le texte de ce qui a été dit.",
    en: "Record a meeting or a voice memo, and get back the text of what was said.",
  },
  motsCles: {
    fr: ["enregistreur vocal en ligne", "dictaphone en ligne", "enregistrer sa voix en ligne", "transcrire un enregistrement audio", "mémo vocal"],
    en: ["online voice recorder", "online dictaphone", "record voice online", "transcribe an audio recording", "voice memo"],
  },
  corps: {
    fr: [
      {
        titre: "Un dictaphone dans votre navigateur",
        paragraphes: [
          "L'Enregistreur de Cloud OS enregistre le micro de votre ordinateur ou de votre téléphone : un gros bouton pour commencer, un chronomètre, et un vumètre qui montre que le son passe. Vous mettez en pause et reprenez autant de fois que nécessaire ; le tout reste un seul enregistrement.",
          "Une réunion, une entrevue, une idée à ne pas oublier : quand vous arrêtez, l'enregistrement part dans vos fichiers, dans un dossier « Enregistrements » créé pour l'occasion.",
        ],
      },
      {
        titre: "La transcription, sans rien faire de plus",
        paragraphes: [
          "Chaque enregistrement est transcrit automatiquement par la plateforme. Le texte s'affiche sous l'enregistrement, prêt à copier dans un compte rendu ou un courriel.",
        ],
        points: [
          "La langue est détectée d'elle-même.",
          "Le texte sert aussi à la recherche : vous retrouvez un enregistrement par ce qui y a été dit.",
          "La transcription est faite sur les serveurs de Cloud OS, hébergés au Québec, pas par un service externe.",
        ],
      },
      {
        titre: "Écouter, ranger, retoucher",
        paragraphes: [
          "La liste montre vos enregistrements, du plus récent au plus ancien, avec leur durée. Vous les écoutez à vitesse normale, ×1,5 ou ×2, vous les renommez, vous les mettez à la corbeille, ou vous les ouvrez dans l'éditeur audio pour couper un passage.",
          "Si l'onglet se ferme ou si le navigateur plante en plein enregistrement, rien n'est perdu : à la prochaine ouverture, l'Enregistreur vous propose de récupérer ce qui avait été capté.",
        ],
      },
    ],
    en: [
      {
        titre: "A dictaphone in your browser",
        paragraphes: [
          "The Cloud OS Recorder records the microphone of your computer or phone: a big button to start, a timer, and a level meter that shows the sound is coming through. You pause and resume as often as you need; it all stays one recording.",
          "A meeting, an interview, an idea you don't want to lose: when you stop, the recording goes to your files, in a “Enregistrements” (recordings) folder created for it.",
        ],
      },
      {
        titre: "The transcript, with nothing else to do",
        paragraphes: [
          "Every recording is transcribed automatically by the platform. The text appears under the recording, ready to copy into minutes or an email.",
        ],
        points: [
          "The language is detected automatically.",
          "The text also feeds search: you find a recording by what was said in it.",
          "Transcription runs on Cloud OS servers, hosted in Québec, not on an outside service.",
        ],
      },
      {
        titre: "Listen, organize, touch up",
        paragraphes: [
          "The list shows your recordings, newest first, with their length. You play them at normal speed, ×1.5 or ×2, rename them, move them to the trash, or open them in the audio editor to cut a passage.",
          "If the tab closes or the browser crashes in the middle of a recording, nothing is lost: next time you open it, the Recorder offers to recover what was captured.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Puis-je enregistrer depuis mon téléphone ?",
        reponse: "Oui. L'Enregistreur fonctionne dans le navigateur de votre téléphone comme sur ordinateur, et passer à une autre application de Cloud OS n'interrompt pas l'enregistrement en cours.",
      },
      {
        question: "Où vont mes enregistrements et leur transcription ?",
        reponse: "Dans vos fichiers Cloud OS, dans le dossier « Enregistrements ». La transcription est faite par les serveurs de la plateforme, hébergés au Québec.",
      },
      {
        question: "Y a-t-il une limite de durée ?",
        reponse: "Pas pour l'enregistrement. La transcription, elle, s'arrête aux fichiers de plus de 500 Mo, soit bien plus que plusieurs heures de voix.",
      },
    ],
    en: [
      {
        question: "Can I record from my phone?",
        reponse: "Yes. The Recorder works in your phone's browser just like on a computer, and switching to another Cloud OS app doesn't interrupt a recording in progress.",
      },
      {
        question: "Where do my recordings and their transcripts go?",
        reponse: "To your Cloud OS files, in the “Enregistrements” (recordings) folder. Transcription is done by the platform's servers, hosted in Québec.",
      },
      {
        question: "Is there a length limit?",
        reponse: "Not for recording. Transcription stops at files over 500 MB, which is well beyond several hours of speech.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/enregistreur/enregistreur-transcription.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "L'Enregistreur de Cloud OS : un compte rendu de réunion enregistré, et sa transcription",
        en: "The Cloud OS Recorder: a recorded site meeting and its transcript",
      },
    },
  ],
  voisines: ["camera", "audio", "audacity", "fichiers"],
  articles: [],
};
