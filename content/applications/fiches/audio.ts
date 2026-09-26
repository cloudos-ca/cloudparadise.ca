import type { FicheApplication } from "../types";

/**
 * Éditeur audio — ÉBAUCHE, à relire avant publication.
 *
 * Ce n'est PAS une app maison : c'est AudioMass, un éditeur audio web libre (licence MIT, Pantelis
 * Kalogiros), servi en fork par Cloud OS et affiché dans une fenêtre du bureau
 * (infra/aws/cloudos/compose/editeurs.yml : « applications web tierces, en forks maison » ;
 * .env.example, AUDIO_EDITOR_URL). D'où `tiers`.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - La fenêtre part d'un fichier audio de Fichiers : sans fichier, elle affiche « Ouvrez un fichier
 *   audio depuis l'application Fichiers pour l'éditer » (audio-editor-app.tsx ; fr.json).
 * - Formats ouverts dans l'éditeur : MP3, WAV, Ogg, M4A, AAC, FLAC, AIFF (src/lib/formats/catalog.ts).
 *   La fiche n'en cite que quatre, courants dans tous les navigateurs.
 * - Un bouton « Enregistrer » en haut de la fenêtre exporte le travail en WAV, enregistré dans
 *   Fichiers comme NOUVEAU fichier « <nom>-édité.wav », dans le dossier de l'original ; l'original
 *   n'est pas touché (requestSave / handleSave, audio-editor-app.tsx). Le libellé réel du bouton est
 *   « Enregistrer dans le dataset » (mediaEditors.common.saveToDataset).
 * - « couper, mixer et exporter du son » : description du produit (src/lib/os/app-catalog.ts) ;
 *   « découpe, montage » : documentation intégrée (documentation/content.ts, « Éditeurs en ligne »).
 * - Ordinateur seulement (`desktopOnly`, app-registry.tsx). Forfait Personnel (/api/v1/apps/catalog).
 *
 * À vérifier à la relecture :
 * - Le code du fork n'est pas dans le dépôt (/srv/cloudos/editeurs/audiomass-editor, sur l'hôte) : la
 *   forme d'onde, la sélection et les effets (volume, fondus, normalisation) viennent d'AudioMass
 *   amont. À confirmer dans l'app. Non cités : le mode multipiste et l'enregistrement au micro, ajoutés
 *   récemment en amont, peut-être absents du fork (copié d'Amos, date inconnue).
 * - Le rendu est toujours en WAV (fichier plus lourd qu'un MP3) : dit dans la fiche.
 * - La mention de la fiche « Logiciel tiers, proposé tel quel » : c'est un fork, avec un pont vers
 *   Fichiers ajouté par Cloud OS.
 * - Que AUDIO_EDITOR_URL et le conteneur audiomass-editor sont bien en service en production.
 */
export const audio: FicheApplication = {
  id: "audio",
  apps: ["audio-editor"],
  slug: { fr: "editeur-audio", en: "audio-editor" },
  nom: { fr: "Éditeur audio", en: "Audio editor" },
  tiers: { editeur: "Pantelis Kalogiros (projet AudioMass)", licence: "MIT", site: "https://audiomass.co/" },
  titre: {
    fr: "Un éditeur audio en ligne, sans rien installer",
    en: "An online audio editor, with nothing to install",
  },
  groupe: "audio-video",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Éditeur audio en ligne, sans installation — Cloud OS",
      en: "Online audio editor, nothing to install — Cloud OS",
    },
    description: {
      fr: "Coupez, nettoyez et ajustez vos fichiers audio dans le navigateur, puis enregistrez le résultat dans vos fichiers, hébergés au Québec. Rien à installer.",
      en: "Cut, clean up and adjust your audio files right in your browser, then save the result to your own files, hosted in Québec. Nothing to install.",
    },
  },
  accroche: {
    fr: "Couper et retoucher un enregistrement, en quelques clics, dans votre navigateur.",
    en: "Cut and touch up a recording in a few clicks, right in your browser.",
  },
  motsCles: {
    fr: ["éditeur audio en ligne", "couper un fichier audio en ligne", "montage audio en ligne", "éditer un mp3 en ligne"],
    en: ["online audio editor", "cut an audio file online", "edit mp3 online", "audio editing in the browser"],
  },
  corps: {
    fr: [
      {
        titre: "Retoucher un son sans logiciel à installer",
        paragraphes: [
          "L'éditeur audio de Cloud OS sert aux retouches de tous les jours : raccourcir un enregistrement, couper un silence ou une hésitation, ajuster le volume, adoucir un début ou une fin. Il s'ouvre dans une fenêtre de votre bureau en ligne, directement dans le navigateur.",
          "C'est AudioMass, un éditeur audio web libre, intégré à Cloud OS : vous voyez la forme d'onde, vous sélectionnez un passage et vous le modifiez.",
        ],
      },
      {
        titre: "Vos fichiers, du début à la fin",
        paragraphes: [
          "Vous ouvrez un fichier audio de l'application Fichiers dans l'éditeur, en MP3, WAV, FLAC ou Ogg par exemple. Un bouton en haut de la fenêtre enregistre votre travail dans Fichiers, à côté de l'original.",
        ],
        points: [
          "Le résultat est un fichier WAV, nommé d'après l'original suivi de « -édité ».",
          "L'original n'est jamais modifié.",
          "Vos fichiers sont hébergés au Québec.",
        ],
      },
      {
        titre: "Ce qu'il faut savoir",
        paragraphes: [
          "Le résultat est toujours enregistré en WAV, un format sans perte, plus lourd qu'un MP3. L'éditeur s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
          "Pour enregistrer ou mixer plusieurs pistes, Cloud OS propose aussi Audacity, un logiciel audio complet, dans une fenêtre du même bureau.",
        ],
      },
    ],
    en: [
      {
        titre: "Touch up audio with nothing to install",
        paragraphes: [
          "The Cloud OS audio editor handles everyday touch-ups: shortening a recording, cutting a silence or a stumble, adjusting the volume, softening a start or an ending. It opens in a window of your online desktop, right in the browser.",
          "It is AudioMass, a free web-based audio editor, built into Cloud OS: you see the waveform, select a passage and edit it.",
        ],
      },
      {
        titre: "Your files, from start to finish",
        paragraphes: [
          "You open an audio file from the Files app in the editor, for example an MP3, WAV, FLAC or Ogg file. A button at the top of the window saves your work to Files, next to the original.",
        ],
        points: [
          "The result is a WAV file, named after the original followed by “-édité” (edited).",
          "The original is never modified.",
          "Your files are hosted in Québec.",
        ],
      },
      {
        titre: "Good to know",
        paragraphes: [
          "The result is always saved as WAV, a lossless format that is larger than an MP3. The editor is used from a computer; it is not offered on phones.",
          "To record or mix several tracks, Cloud OS also offers Audacity, a full audio application, in a window of the same desktop.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Quels fichiers audio puis-je ouvrir ?",
        reponse: "Les formats courants : MP3, WAV, FLAC, Ogg, M4A ou AAC, par exemple. Vous les ouvrez depuis l'application Fichiers de Cloud OS.",
      },
      {
        question: "Dans quel format mon travail est-il enregistré ?",
        reponse: "En WAV, comme un nouveau fichier placé à côté de l'original. Le fichier d'origine reste tel quel.",
      },
      {
        question: "L'éditeur audio est-il compris dans l'abonnement ?",
        reponse: "Oui, dès le forfait Personnel, comme les autres applications du bureau. Il n'y a pas de supplément par application.",
      },
    ],
    en: [
      {
        question: "Which audio files can I open?",
        reponse: "Common formats: MP3, WAV, FLAC, Ogg, M4A or AAC, for example. You open them from the Files app in Cloud OS.",
      },
      {
        question: "What format is my work saved in?",
        reponse: "WAV, as a new file placed next to the original. The original file stays as it was.",
      },
      {
        question: "Is the audio editor included in the subscription?",
        reponse: "Yes, from the Personal plan, like the other apps on the desktop. There is no extra charge per app.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/audio/audio-selection.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "L'éditeur audio de Cloud OS : la forme d'onde d'une piste, un passage sélectionné",
        en: "The Cloud OS audio editor: a track's waveform with a passage selected",
      },
    },
  ],
  voisines: ["audacity", "kdenlive"],
  articles: [],
};
