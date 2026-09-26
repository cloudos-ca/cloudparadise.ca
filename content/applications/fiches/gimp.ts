import type { FicheApplication } from "../types";

/**
 * GIMP — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - GIMP est l'image `linuxserver/gimp`, diffusée dans une fenêtre du bureau
 *   (src/lib/marketplace/desktop-apps-catalog.ts) ; ordinateur seulement
 *   (`desktopOnly`, app-registry.tsx).
 * - Un fichier importé depuis Fichiers s'ouvre directement dans GIMP
 *   (`openCmd: "gimp"`, importFilesToDesktopAppAction). La fenêtre d'import prend un fichier à la
 *   fois et reste ouverte (desktopApps.importDialogHint) : le plafond de 20 fichiers de l'action
 *   n'est pas atteignable d'un coup depuis l'interface (corrigé le 2026-09-25).
 * - « Enregistrer » renvoie les fichiers créés ou modifiés dans Fichiers, chacun
 *   comme un nouveau fichier : l'original n'est pas écrasé
 *   (exportDesktopAppFilesAction).
 * - La session de l'application est temporaire (reaper.ts) : ce qui n'est pas
 *   renvoyé dans Fichiers disparaît avec elle.
 *
 * À vérifier à la relecture : que le pont fichiers (MARKETPLACE_APPFILES) est
 * bien actif en production — sans lui, l'import et l'enregistrement décrits
 * ci-dessous n'existent pas.
 */
export const gimp: FicheApplication = {
  id: "gimp",
  apps: ["desktop-gimp"],
  slug: { fr: "gimp", en: "gimp" },
  nom: { fr: "GIMP", en: "GIMP" },
  tiers: { editeur: "The GIMP Team", licence: "GPL-3.0", site: "https://www.gimp.org/" },
  titre: {
    fr: "GIMP en ligne, sans rien installer",
    en: "GIMP online, with nothing to install",
  },
  groupe: "images",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "GIMP en ligne : retouche photo sans installation — Cloud OS",
      en: "GIMP online: photo editing, nothing to install — Cloud OS",
    },
    description: {
      fr: "Retouchez vos images avec GIMP directement dans le navigateur : rien à installer, vos fichiers restent dans votre espace, hébergé au Québec.",
      en: "Edit your images with GIMP right in your browser: nothing to install, and your files stay in your own space, hosted in Québec.",
    },
  },
  accroche: {
    fr: "La retouche d'image libre de référence, dans votre navigateur.",
    en: "The leading free image editor, in your browser.",
  },
  motsCles: {
    fr: ["gimp en ligne", "gimp sans installation", "gimp dans le navigateur", "retouche photo en ligne", "alternative à photoshop"],
    en: ["gimp online", "gimp without installing", "gimp in the browser", "online photo editor", "photoshop alternative"],
  },
  corps: {
    fr: [
      {
        titre: "Le vrai GIMP, pas une imitation",
        paragraphes: [
          "GIMP est le logiciel libre de retouche et de montage d'images de référence : calques, masques, sélections, filtres, correction des couleurs, outils de dessin. Dans Cloud OS, c'est le logiciel lui-même qui tourne, dans une fenêtre de votre bureau en ligne — pas une version allégée pour le web.",
          "Vous l'ouvrez comme n'importe quelle autre application du bureau. Aucune installation sur votre poste, aucune mise à jour à suivre, et le même GIMP sur chaque ordinateur d'où vous vous connectez.",
        ],
      },
      {
        titre: "Vos images restent dans votre espace",
        paragraphes: [
          "Vous choisissez des images dans l'application Fichiers, et elles s'ouvrent directement dans GIMP. Une fois le travail fait, vous les renvoyez dans Fichiers.",
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
          "La session de GIMP est temporaire : pensez à renvoyer votre travail dans Fichiers avant de la fermer, c'est là qu'il est conservé. GIMP s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
        ],
      },
    ],
    en: [
      {
        titre: "The real GIMP, not an imitation",
        paragraphes: [
          "GIMP is the leading free software for editing and compositing images: layers, masks, selections, filters, colour correction, drawing tools. In Cloud OS, the software itself runs in a window of your online desktop — not a cut-down web version.",
          "You open it like any other app on the desktop. Nothing to install on your computer, no updates to keep up with, and the same GIMP on every computer you sign in from.",
        ],
      },
      {
        titre: "Your images stay in your own space",
        paragraphes: [
          "You pick images in the Files app, and they open straight in GIMP. Once the work is done, you send them back to Files.",
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
          "A GIMP session is temporary: remember to send your work back to Files before closing it, since that is where it is kept. GIMP is used from a computer; it is not offered on phones.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Faut-il installer GIMP pour l'utiliser dans Cloud OS ?",
        reponse: "Non. GIMP tourne dans une fenêtre de votre bureau en ligne, depuis le navigateur. Il n'y a rien à installer ni à mettre à jour sur votre ordinateur.",
      },
      {
        question: "GIMP est-il compris dans l'abonnement ?",
        reponse: "Oui, dès le forfait Personnel, comme les autres logiciels du bureau. Il n'y a pas de frais par application : chaque ouverture compte comme une tâche dans l'enveloppe de votre forfait.",
      },
      {
        question: "Mes images originales risquent-elles d'être écrasées ?",
        reponse: "Non. Les fichiers que vous renvoyez de GIMP vers Fichiers arrivent comme de nouveaux fichiers ; l'original reste tel quel.",
      },
    ],
    en: [
      {
        question: "Do I need to install GIMP to use it in Cloud OS?",
        reponse: "No. GIMP runs in a window of your online desktop, from the browser. There is nothing to install or update on your computer.",
      },
      {
        question: "Is GIMP included in the subscription?",
        reponse: "Yes, from the Personal plan, like the other desktop software. There is no fee per app: each launch counts as one task in your plan's allowance.",
      },
      {
        question: "Could my original images be overwritten?",
        reponse: "No. Files you send back from GIMP to Files arrive as new files; the original stays as it was.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/gimp/gimp-retouche.webp",
      largeur: 1364,
      hauteur: 896,
      alt: {
        fr: "GIMP ouvert dans Cloud OS sur une illustration de paysage importée depuis Fichiers",
        en: "GIMP open in Cloud OS on a landscape illustration imported from Files",
      },
    },
  ],
  voisines: ["freecad", "writer"],
  articles: [],
};
