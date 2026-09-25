import type { FicheApplication } from "../types";

/**
 * Blender — ÉBAUCHE, à relire avant publication.
 *
 * Blender n'est pas un logiciel de bureau de desktop-apps-catalog : il a son propre module
 * (src/lib/blender/, src/components/os/apps/blender-editor/) et sa propre mécanique.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Le vrai Blender (5.2.0, téléchargé de download.blender.org) dans une image KasmVNC, un conteneur
 *   par session, diffusé dans une fenêtre du bureau (infra/kasm-images/blender-kasm/Dockerfile ;
 *   src/lib/blender/docker.ts).
 * - Il s'ouvre À PARTIR d'un fichier .blend de Fichiers, et seulement d'un .blend (erreur
 *   `blender.notBlendFile`, actions.ts) ; sans fichier, la fenêtre dit « Ouvrez un fichier .blend
 *   depuis l'application Fichiers » (mediaEditors.blender.openHint). Seul ce fichier entre dans la
 *   session (`seed: work.blend`) : textures et fichiers liés externes n'y sont pas.
 * - Démarrage « ~20-30 s » (mediaEditors.blender.starting) ; plus long si l'hôte de sessions doit se
 *   réveiller (WakingNotice).
 * - Enregistrer : Ctrl+S dans Blender, puis le bouton en haut de la fenêtre (« Enregistrer dans le
 *   dataset ») : une copie « <nom>-édité.blend » est créée à côté de l'original, qui n'est pas touché
 *   (saveBlenderSessionAction).
 * - Session temporaire : le conteneur et son espace de travail sont supprimés à la fermeture de la
 *   fenêtre (stopBlenderSessionAction), et au plus tard après 360 min (BLENDER_MAX_SESSION_MINUTES,
 *   src/worker/index.ts). Une session par utilisateur et par fichier.
 * - Pas de carte graphique : l'affichage 3D est rendu par le processeur (Mesa, « CPU-rendered
 *   viewport », docker.ts). Il existe une image blender-kasm-gpu, mais docker.ts lance BLENDER_IMAGE
 *   (cp-blender-kasm par défaut).
 * - Rendu final : les plans de rendu 3D (Blender / Cycles sur CPU) de l'app Plans
 *   (src/lib/plans/actions.ts, create-flows.ts ; documentation/content.ts, « Éditeurs en ligne »).
 * - Ordinateur seulement (`desktopOnly`, app-registry.tsx). Forfait Personnel (/api/v1/apps/catalog).
 * - Licence : les binaires de Blender sont distribués sous GPL v3 ou ultérieure
 *   (blender.org/about/license : le code est GPL-2.0-or-later, les binaires GPL-3.0-or-later).
 *
 * À vérifier à la relecture :
 * - Que la production lance bien l'image sans GPU (sinon la phrase sur l'affichage 3D est trop
 *   prudente) et que la version est toujours Blender 5.2 (non citée dans la fiche).
 * - Que les plans de rendu 3D ont des agents RENDER en ligne en production, et ce qu'ils coûtent en
 *   crédits de calcul : la fiche les cite sans rien promettre sur les délais.
 * - Le libellé de la fonction « Pack Resources » dans l'interface française de Blender 5.2.
 */
export const blender: FicheApplication = {
  id: "blender",
  apps: ["blender-editor"],
  slug: { fr: "blender", en: "blender" },
  nom: { fr: "Blender", en: "Blender" },
  tiers: { editeur: "Blender Foundation", licence: "GPL-3.0-or-later", site: "https://www.blender.org/" },
  titre: {
    fr: "Blender en ligne, sans rien installer",
    en: "Blender online, with nothing to install",
  },
  groupe: "audio-video",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Blender en ligne : la 3D dans le navigateur — Cloud OS",
      en: "Blender online: 3D in your browser, no install — Cloud OS",
    },
    description: {
      fr: "Ouvrez vos scènes .blend dans le vrai Blender, directement dans le navigateur : rien à installer, vos fichiers restent dans votre espace au Québec.",
      en: "Open your .blend scenes in the real Blender, right in your browser: nothing to install, and your files stay in your own space, hosted in Québec.",
    },
  },
  accroche: {
    fr: "Le logiciel 3D libre de référence, pour modifier vos scènes depuis le navigateur.",
    en: "The leading free 3D software, to edit your scenes from the browser.",
  },
  motsCles: {
    fr: ["blender en ligne", "blender sans installation", "blender dans le navigateur", "ouvrir un fichier blend en ligne", "logiciel 3d en ligne"],
    en: ["blender online", "blender without installing", "blender in the browser", "open a blend file online", "online 3d software"],
  },
  corps: {
    fr: [
      {
        titre: "Le vrai Blender, pas une visionneuse",
        paragraphes: [
          "Blender est le logiciel libre de création 3D de référence : modélisation, matériaux, éclairage, animation, rendu. Dans Cloud OS, c'est le logiciel lui-même qui tourne, dans une fenêtre de votre bureau en ligne — pas un simple aperçu de la scène.",
          "Vous ouvrez un fichier .blend depuis l'application Fichiers, et Blender démarre avec votre scène déjà chargée, en une vingtaine de secondes. Aucune installation sur votre poste, et le même Blender sur chaque ordinateur d'où vous vous connectez.",
        ],
      },
      {
        titre: "Votre scène reste dans votre espace",
        paragraphes: [
          "Une fois vos modifications faites, vous enregistrez dans Blender (Ctrl+S), puis un bouton en haut de la fenêtre renvoie la scène dans Fichiers.",
        ],
        points: [
          "La scène modifiée arrive comme une nouvelle version, nommée d'après l'original suivi de « -édité ».",
          "L'original n'est jamais écrasé.",
          "Vos fichiers sont hébergés au Québec.",
        ],
      },
      {
        titre: "Pour le rendu final : les plans de rendu 3D",
        paragraphes: [
          "La session Blender sert à modifier la scène. Pour produire les images finales, Cloud OS propose des plans de rendu 3D, qui calculent vos fichiers .blend avec le moteur Cycles sur ses serveurs plutôt que dans la fenêtre.",
        ],
      },
      {
        titre: "Ce qu'il faut savoir",
        paragraphes: [
          "La session est temporaire : ce qui n'est pas renvoyé dans Fichiers disparaît à la fermeture de la fenêtre. Seul le fichier .blend est ouvert ; pensez à y empaqueter vos textures et autres ressources externes (fonction « Pack Resources » de Blender).",
          "L'affichage 3D est calculé sans carte graphique : parfait pour modifier une scène, moins pour naviguer en temps réel dans une scène très lourde. Blender s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
        ],
      },
    ],
    en: [
      {
        titre: "The real Blender, not a viewer",
        paragraphes: [
          "Blender is the leading free software for 3D creation: modelling, materials, lighting, animation, rendering. In Cloud OS, the software itself runs in a window of your online desktop — not just a preview of the scene.",
          "You open a .blend file from the Files app, and Blender starts with your scene already loaded, in about twenty seconds. Nothing to install on your computer, and the same Blender on every computer you sign in from.",
        ],
      },
      {
        titre: "Your scene stays in your own space",
        paragraphes: [
          "Once your changes are made, you save in Blender (Ctrl+S), then a button at the top of the window sends the scene back to Files.",
        ],
        points: [
          "The edited scene arrives as a new version, named after the original followed by “-édité” (edited).",
          "The original is never overwritten.",
          "Your files are hosted in Québec.",
        ],
      },
      {
        titre: "For the final render: 3D rendering plans",
        paragraphes: [
          "The Blender session is for editing the scene. To produce the final images, Cloud OS offers 3D rendering plans, which render your .blend files with the Cycles engine on its servers rather than in the window.",
        ],
      },
      {
        titre: "Good to know",
        paragraphes: [
          "The session is temporary: anything not sent back to Files is gone when the window closes. Only the .blend file is opened, so remember to pack your textures and other external resources into it (Blender's “Pack Resources” feature).",
          "The 3D viewport is drawn without a graphics card: fine for editing a scene, less so for moving around a very heavy scene in real time. Blender is used from a computer; it is not offered on phones.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Faut-il installer Blender pour l'utiliser dans Cloud OS ?",
        reponse: "Non. Blender tourne dans une fenêtre de votre bureau en ligne, depuis le navigateur. Il n'y a rien à installer ni à mettre à jour sur votre ordinateur.",
      },
      {
        question: "Puis-je partir d'une scène vide ?",
        reponse: "Blender s'ouvre à partir d'un fichier .blend de vos Fichiers. Pour partir de zéro, téléversez d'abord un fichier .blend, même presque vide, puis ouvrez-le.",
      },
      {
        question: "Mon fichier .blend d'origine risque-t-il d'être écrasé ?",
        reponse: "Non. La scène renvoyée dans Fichiers arrive comme une nouvelle version, à côté de l'original, qui reste tel quel.",
      },
      {
        question: "Blender est-il compris dans l'abonnement ?",
        reponse: "Oui, dès le forfait Personnel, comme les autres logiciels du bureau. Il n'y a pas de frais par application.",
      },
    ],
    en: [
      {
        question: "Do I need to install Blender to use it in Cloud OS?",
        reponse: "No. Blender runs in a window of your online desktop, from the browser. There is nothing to install or update on your computer.",
      },
      {
        question: "Can I start from an empty scene?",
        reponse: "Blender opens from a .blend file in your Files. To start from scratch, first upload a .blend file, even a nearly empty one, then open it.",
      },
      {
        question: "Could my original .blend file be overwritten?",
        reponse: "No. The scene sent back to Files arrives as a new version, next to the original, which stays as it was.",
      },
      {
        question: "Is Blender included in the subscription?",
        reponse: "Yes, from the Personal plan, like the other desktop software. There is no fee per app.",
      },
    ],
  },
  captures: [],
  voisines: ["freecad", "plans"],
  articles: [],
};
