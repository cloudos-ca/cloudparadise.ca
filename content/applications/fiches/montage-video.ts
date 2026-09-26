import type { FicheApplication } from "../types";

/**
 * Montage vidéo — ÉBAUCHE, à relire avant publication.
 *
 * Ce n'est PAS une app maison : c'est clip-js, un éditeur vidéo web libre (Next.js, Remotion pour
 * l'aperçu, ffmpeg en WebAssembly pour le rendu), servi en fork par Cloud OS et affiché dans une
 * fenêtre du bureau (infra/aws/cloudos/compose/editeurs.yml : « applications web tierces, en forks
 * maison » ; .env.example, VIDEO_EDITOR_URL). D'où `tiers`.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - La fenêtre part d'une vidéo de Fichiers : sans fichier, elle affiche « Ouvrez une vidéo depuis
 *   l'application Fichiers pour l'éditer » (video-editor-app.tsx ; mediaEditors.video, fr.json).
 * - Formats ouverts dans l'éditeur : MP4, WebM, MOV, M4V, MKV, OGV, AVI (src/lib/formats/catalog.ts).
 *   La fiche ne cite que MP4 et WebM : les autres dépendent de ce que le navigateur sait décoder.
 * - Le rendu est un MP4 enregistré dans Fichiers comme NOUVEAU fichier « <nom>-édité.mp4 », dans le
 *   dossier de l'original ; l'original n'est pas touché (handleSave, video-editor-app.tsx).
 * - « couper, assembler et exporter des vidéos » : description du produit (src/lib/os/app-catalog.ts).
 * - Le rendu se fait dans le navigateur (ffmpeg WebAssembly, README de clip-js) : c'est l'ordinateur
 *   de l'utilisateur qui calcule.
 * - Ordinateur seulement (`desktopOnly`, app-registry.tsx). Forfait Personnel (/api/v1/apps/catalog).
 *
 * À vérifier à la relecture :
 * - Le code du fork n'est pas dans le dépôt (/srv/cloudos/editeurs/clipjs-editor, sur l'hôte) : les
 *   fonctions citées (ligne de temps, découpe, texte) viennent du README amont de clip-js
 *   (github.com/mohyware/clip-js). À confirmer dans l'app. Non cité : l'export « jusqu'à 1080p » du
 *   README amont, et l'import d'autres médias depuis l'ordinateur à l'intérieur de clip-js.
 * - Que le fork vient bien de mohyware/clip-js (l'éditeur cité dans `tiers`) ; licence MIT d'après
 *   ce dépôt.
 * - LICENCE : clip-js dépend de Remotion, qui n'est pas un logiciel libre — sa licence exige une
 *   licence d'entreprise payante pour une organisation à but lucratif de plus de trois personnes.
 *   À faire trancher avant publication (même question que VS Code ou WPS dans le plan).
 * - La mention de la fiche « Logiciel tiers, proposé tel quel » : c'est un fork, avec un pont vers
 *   Fichiers ajouté par Cloud OS.
 * - Que VIDEO_EDITOR_URL et le conteneur clipjs-editor sont bien en service en production.
 */
export const montageVideo: FicheApplication = {
  id: "montage-video",
  apps: ["video-editor"],
  slug: { fr: "montage-video", en: "video-editor" },
  nom: { fr: "Montage vidéo", en: "Video editor" },
  tiers: { editeur: "mohyware (projet clip-js)", licence: "MIT", site: "https://github.com/mohyware/clip-js" },
  titre: {
    fr: "Montage vidéo en ligne, sans rien installer",
    en: "Online video editing, with nothing to install",
  },
  groupe: "audio-video",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Montage vidéo en ligne, sans installation — Cloud OS",
      en: "Online video editor, nothing to install — Cloud OS",
    },
    description: {
      fr: "Coupez et assemblez vos vidéos dans le navigateur, puis enregistrez le rendu MP4 dans vos fichiers, hébergés au Québec. Rien à installer sur votre poste.",
      en: "Cut and assemble your videos in the browser, then save the MP4 render to your files, hosted in Québec. Nothing to install on your computer.",
    },
  },
  accroche: {
    fr: "Un montage rapide de vos vidéos, sans quitter votre bureau en ligne.",
    en: "Quick edits to your videos, without leaving your online desktop.",
  },
  motsCles: {
    fr: ["montage vidéo en ligne", "éditeur vidéo en ligne", "couper une vidéo en ligne", "montage vidéo sans installation"],
    en: ["online video editor", "video editing in the browser", "cut a video online", "video editor with nothing to install"],
  },
  corps: {
    fr: [
      {
        titre: "Un montage simple, directement dans le navigateur",
        paragraphes: [
          "L'éditeur vidéo de Cloud OS sert aux montages de tous les jours : raccourcir une séquence, couper les passages inutiles, assembler des plans, ajouter un titre. Il s'ouvre dans une fenêtre de votre bureau en ligne, sans logiciel à installer.",
          "C'est clip-js, un éditeur vidéo web libre, intégré à Cloud OS : vous travaillez sur une ligne de temps, avec un aperçu en direct de votre montage.",
        ],
      },
      {
        titre: "De Fichiers au rendu, sans téléchargement",
        paragraphes: [
          "Vous ouvrez une vidéo de l'application Fichiers dans l'éditeur, en MP4 ou en WebM par exemple. Une fois le montage terminé, le rendu est enregistré dans Fichiers, à côté de l'original.",
        ],
        points: [
          "Le rendu est un fichier MP4, nommé d'après l'original suivi de « -édité ».",
          "L'original n'est jamais modifié.",
          "Vos fichiers sont hébergés au Québec.",
        ],
      },
      {
        titre: "Ce qu'il faut savoir",
        paragraphes: [
          "Le rendu est calculé dans votre navigateur : sa durée dépend de la puissance de votre ordinateur et de la longueur de la vidéo. L'éditeur s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
          "Pour un montage multipiste plus poussé, Cloud OS propose aussi Kdenlive, un logiciel de montage complet, dans une fenêtre du même bureau.",
        ],
      },
    ],
    en: [
      {
        titre: "Simple editing, right in the browser",
        paragraphes: [
          "The Cloud OS video editor handles everyday edits: shortening a sequence, cutting out the parts you don't need, assembling shots, adding a title. It opens in a window of your online desktop, with no software to install.",
          "It is clip-js, a free web-based video editor, built into Cloud OS: you work on a timeline, with a live preview of your edit.",
        ],
      },
      {
        titre: "From Files to render, with no downloads",
        paragraphes: [
          "You open a video from the Files app in the editor, for example an MP4 or WebM file. Once the edit is done, the render is saved to Files, next to the original.",
        ],
        points: [
          "The render is an MP4 file, named after the original followed by “-édité” (edited).",
          "The original is never modified.",
          "Your files are hosted in Québec.",
        ],
      },
      {
        titre: "Good to know",
        paragraphes: [
          "The render is computed in your browser: how long it takes depends on your computer and on the length of the video. The editor is used from a computer; it is not offered on phones.",
          "For more advanced multi-track editing, Cloud OS also offers Kdenlive, a full video editing application, in a window of the same desktop.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Faut-il installer un logiciel pour monter une vidéo dans Cloud OS ?",
        reponse: "Non. L'éditeur s'ouvre dans une fenêtre de votre bureau en ligne, depuis le navigateur, à partir d'une vidéo de vos Fichiers.",
      },
      {
        question: "Ma vidéo d'origine est-elle modifiée ?",
        reponse: "Non. Le rendu est enregistré comme un nouveau fichier MP4 dans le même dossier ; la vidéo d'origine reste telle quelle.",
      },
      {
        question: "Quelle différence avec Kdenlive ?",
        reponse: "L'éditeur vidéo convient aux montages rapides sur une vidéo de vos Fichiers. Kdenlive est un logiciel de montage complet, multipiste, pour les projets plus longs ou plus travaillés. Les deux sont compris dès le forfait Personnel.",
      },
    ],
    en: [
      {
        question: "Do I need to install software to edit a video in Cloud OS?",
        reponse: "No. The editor opens in a window of your online desktop, from the browser, starting from a video in your Files.",
      },
      {
        question: "Is my original video modified?",
        reponse: "No. The render is saved as a new MP4 file in the same folder; the original video stays as it was.",
      },
      {
        question: "How is it different from Kdenlive?",
        reponse: "The video editor suits quick edits to a video from your Files. Kdenlive is a full multi-track editing application, for longer or more polished projects. Both are included from the Personal plan.",
      },
    ],
  },
  captures: [],
  voisines: ["kdenlive", "audio", "shotcut", "openshot"],
  articles: [
    { slug: "premiere-pro-vs-davinci-resolve", titre: "Premiere Pro vs DaVinci Resolve : quel logiciel choisir en 2026 ?" },
  ],
};
