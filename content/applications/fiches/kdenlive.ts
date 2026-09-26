import type { FicheApplication } from "../types";

/**
 * Kdenlive — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25, même mécanique que GIMP :
 * - Kdenlive est l'image `linuxserver/kdenlive`, diffusée dans une fenêtre du bureau
 *   (src/lib/marketplace/desktop-apps-catalog.ts) ; ordinateur seulement (`desktopOnly`).
 * - Import depuis Fichiers : jusqu'à 20 fichiers par import (MAX_IMPORT_FILES,
 *   importFilesToDesktopAppAction), copiés dans le dossier ~/Stockage de la session.
 * - Renvoi dans Fichiers : ce qui se trouve dans ~/Stockage, chacun comme un nouveau fichier
 *   (exportDesktopAppFilesAction, listExportableFiles). D'où la consigne de la fiche : enregistrer
 *   projet et rendu dans le dossier Stockage.
 * - Session temporaire (reaper.ts) : ce qui n'est pas renvoyé dans Fichiers disparaît avec elle.
 * - Forfait Personnel (/api/v1/apps/catalog).
 *
 * `openCmd: "kdenlive"` existe, mais le code de Kdenlive (src/main.cpp, invent.kde.org) traite UN
 * argument seul comme un « document Kdenlive à ouvrir » ; une vidéo passée seule n'est ajoutée au
 * chutier que s'il y a plusieurs arguments, et Cloud OS lance `kdenlive <fichier>` un fichier à la
 * fois. La fiche ne promet donc PAS qu'une vidéo importée s'ouvre directement : elle dit que les
 * fichiers arrivent dans le dossier Stockage, d'où on les ajoute au projet.
 *
 * À vérifier à la relecture :
 * - Ce que fait réellement l'import d'une vidéo MP4 dans Kdenlive (ouverture, erreur, rien) ; et
 *   qu'un projet .kdenlive importé s'ouvre bien directement.
 * - Que le pont fichiers (MARKETPLACE_APPFILES) est actif en production, comme pour GIMP.
 * - Licence : le dépôt GitHub (miroir KDE) est déclaré GPL-3.0 ; les sources portent « GPL-3.0-only
 *   OR LicenseRef-KDE-Accepted-GPL », soit en pratique GPL v3 ou une version ultérieure acceptée par
 *   KDE e.V. `GPL-3.0-or-later` retenu, à confirmer.
 * - Temps de rendu : non chiffré, le rendu se fait sur le processeur du serveur de sessions.
 */
export const kdenlive: FicheApplication = {
  id: "kdenlive",
  apps: ["desktop-kdenlive"],
  slug: { fr: "kdenlive", en: "kdenlive" },
  nom: { fr: "Kdenlive", en: "Kdenlive" },
  tiers: { editeur: "KDE (projet Kdenlive)", licence: "GPL-3.0-or-later", site: "https://kdenlive.org/" },
  titre: {
    fr: "Kdenlive en ligne, sans rien installer",
    en: "Kdenlive online, with nothing to install",
  },
  groupe: "audio-video",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Kdenlive en ligne : montage vidéo multipiste — Cloud OS",
      en: "Kdenlive online: multi-track video editing — Cloud OS",
    },
    description: {
      fr: "Montez vos vidéos avec Kdenlive directement dans le navigateur : montage multipiste, rien à installer, vos fichiers restent dans votre espace au Québec.",
      en: "Edit your videos with Kdenlive right in your browser: multi-track editing, nothing to install, and your files stay in your own space, hosted in Québec.",
    },
  },
  accroche: {
    fr: "Le montage vidéo multipiste libre, dans votre navigateur.",
    en: "Free multi-track video editing, in your browser.",
  },
  motsCles: {
    fr: ["kdenlive en ligne", "kdenlive sans installation", "logiciel de montage vidéo gratuit", "alternative à premiere pro", "montage vidéo multipiste en ligne"],
    en: ["kdenlive online", "kdenlive without installing", "free video editing software", "premiere pro alternative", "online multi-track video editor"],
  },
  corps: {
    fr: [
      {
        titre: "Le vrai Kdenlive, pas une version allégée",
        paragraphes: [
          "Kdenlive est le logiciel libre de montage vidéo de la communauté KDE : ligne de temps multipiste, pistes audio et vidéo, transitions, effets, titres, rendu dans de nombreux formats. Dans Cloud OS, c'est le logiciel lui-même qui tourne, dans une fenêtre de votre bureau en ligne.",
          "Vous l'ouvrez comme n'importe quelle autre application du bureau. Aucune installation sur votre poste, aucune mise à jour à suivre, et le même Kdenlive sur chaque ordinateur d'où vous vous connectez.",
        ],
      },
      {
        titre: "Vos rushs arrivent depuis vos Fichiers",
        paragraphes: [
          "Vous choisissez vos vidéos, sons et images dans l'application Fichiers : ils arrivent dans le dossier « Stockage » de la session Kdenlive, d'où vous les ajoutez à votre projet. Une fois le montage fait, vous enregistrez le rendu et le projet dans ce même dossier, puis vous les renvoyez dans Fichiers.",
        ],
        points: [
          "Plusieurs fichiers importés à la suite, sans refermer la fenêtre d'import.",
          "Chaque fichier renvoyé arrive comme un nouveau fichier : l'original n'est jamais écrasé.",
          "Vos fichiers sont hébergés au Québec.",
        ],
      },
      {
        titre: "Ce qu'il faut savoir",
        paragraphes: [
          "La session de Kdenlive est temporaire : pensez à renvoyer votre rendu et votre projet dans Fichiers avant de la fermer, c'est là qu'ils sont conservés. Kdenlive s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
          "Pour une coupe rapide sur une seule vidéo, l'éditeur vidéo intégré de Cloud OS suffit souvent ; Kdenlive prend le relais dès que le projet compte plusieurs pistes.",
        ],
      },
    ],
    en: [
      {
        titre: "The real Kdenlive, not a cut-down version",
        paragraphes: [
          "Kdenlive is the KDE community's free video editing software: multi-track timeline, audio and video tracks, transitions, effects, titles, rendering to many formats. In Cloud OS, the software itself runs in a window of your online desktop.",
          "You open it like any other app on the desktop. Nothing to install on your computer, no updates to keep up with, and the same Kdenlive on every computer you sign in from.",
        ],
      },
      {
        titre: "Your footage comes from your Files",
        paragraphes: [
          "You pick your videos, sounds and images in the Files app: they arrive in the “Stockage” (storage) folder of the Kdenlive session, where you add them to your project. Once the edit is done, you save the render and the project in that same folder, then send them back to Files.",
        ],
        points: [
          "Several files imported one after another, without closing the import window.",
          "Every file sent back arrives as a new file: the original is never overwritten.",
          "Your files are hosted in Québec.",
        ],
      },
      {
        titre: "Good to know",
        paragraphes: [
          "A Kdenlive session is temporary: remember to send your render and project back to Files before closing it, since that is where they are kept. Kdenlive is used from a computer; it is not offered on phones.",
          "For a quick trim on a single video, the built-in Cloud OS video editor is often enough; Kdenlive takes over as soon as the project has several tracks.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Faut-il installer Kdenlive pour l'utiliser dans Cloud OS ?",
        reponse: "Non. Kdenlive tourne dans une fenêtre de votre bureau en ligne, depuis le navigateur. Il n'y a rien à installer ni à mettre à jour sur votre ordinateur.",
      },
      {
        question: "Kdenlive peut-il remplacer Premiere Pro ?",
        reponse: "Pour beaucoup de projets, oui : montage multipiste, transitions, effets et titres sont au rendez-vous, et c'est un logiciel libre, sans licence à acheter. Les équipes très liées à l'écosystème Adobe garderont leurs habitudes ; les autres y trouveront l'essentiel.",
      },
      {
        question: "Où retrouver ma vidéo une fois le montage terminé ?",
        reponse: "Enregistrez le rendu dans le dossier « Stockage » de la session, puis renvoyez-le dans Fichiers : il y arrive comme un nouveau fichier. Faites de même pour le projet si vous comptez le reprendre.",
      },
      {
        question: "Kdenlive est-il compris dans l'abonnement ?",
        reponse: "Oui, dès le forfait Personnel, comme les autres logiciels du bureau. Il n'y a pas de frais par application : chaque ouverture compte comme une tâche dans l'enveloppe de votre forfait.",
      },
    ],
    en: [
      {
        question: "Do I need to install Kdenlive to use it in Cloud OS?",
        reponse: "No. Kdenlive runs in a window of your online desktop, from the browser. There is nothing to install or update on your computer.",
      },
      {
        question: "Can Kdenlive replace Premiere Pro?",
        reponse: "For many projects, yes: multi-track editing, transitions, effects and titles are all there, and it is free software, with no licence to buy. Teams deeply tied to the Adobe ecosystem will keep their habits; others will find what they need.",
      },
      {
        question: "Where do I find my video once the edit is done?",
        reponse: "Save the render in the session's “Stockage” folder, then send it back to Files: it arrives there as a new file. Do the same with the project if you plan to pick it up again.",
      },
      {
        question: "Is Kdenlive included in the subscription?",
        reponse: "Yes, from the Personal plan, like the other desktop software. There is no fee per app: each launch counts as one task in your plan's allowance.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/kdenlive/kdenlive-montage.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "Kdenlive dans Cloud OS : une vidéo posée sur la ligne de temps, avec sa piste son",
        en: "Kdenlive in Cloud OS: a video on the timeline, with its audio track",
      },
    },
  ],
  voisines: ["shotcut", "openshot", "audacity"],
  articles: [
    { slug: "premiere-pro-vs-davinci-resolve", titre: "Premiere Pro vs DaVinci Resolve : quel logiciel choisir en 2026 ?" },
  ],
};
