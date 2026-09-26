import type { FicheApplication } from "../types";

/**
 * Krita — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Krita est l'image `infra/kasm-images/apps/krita` du produit (arm64, 2026-09-25 : LinuxServer.io ne publie `linuxserver/krita` qu'en amd64), diffusée dans une fenêtre du bureau
 *   (src/lib/marketplace/desktop-apps-catalog.ts) ; ordinateur seulement (`desktopOnly`, comme
 *   tous les logiciels de bureau, app-registry.tsx).
 * - Un fichier importé depuis Fichiers s'ouvre directement dans Krita (`openCmd: "krita"`,
 *   importFilesToDesktopAppAction, src/lib/marketplace/actions.ts) ; jusqu'à 20 fichiers par import
 *   (MAX_IMPORT_FILES).
 * - « Enregistrer » renvoie dans Fichiers les fichiers créés ou modifiés du dossier « Stockage »,
 *   chacun comme un nouveau fichier (exportDesktopAppFilesAction) ; seuls les fichiers posés
 *   directement dans « Stockage » repartent, pas ceux d'un sous-dossier (listStorageFiles, non
 *   récursif, appfiles-session.ts).
 * - La session est temporaire (reaper.ts, /config en RAM) : ce qui n'est pas renvoyé disparaît.
 * - Forfait : `personnel` (GET /api/v1/apps/catalog, production, 2026-09-25).
 * - Licence GPL-3.0 et « Krita Foundation » : krita.org/en/about/license.
 *
 * À vérifier à la relecture :
 * - que le pont fichiers (MARKETPLACE_APPFILES) est actif en production ;
 * - la pression d'une tablette graphique à travers le navigateur (KasmVNC) : non vérifiée, donc
 *   volontairement absente de la fiche ;
 * - « ouvre les fichiers PSD » vient des capacités connues de Krita, pas d'un essai dans Cloud OS.
 */
export const krita: FicheApplication = {
  id: "krita",
  apps: ["desktop-krita"],
  slug: { fr: "krita", en: "krita" },
  nom: { fr: "Krita", en: "Krita" },
  tiers: { editeur: "Krita Foundation", licence: "GPL-3.0", site: "https://krita.org/" },
  titre: {
    fr: "Krita en ligne, sans rien installer",
    en: "Krita online, with nothing to install",
  },
  groupe: "images",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Krita en ligne : peindre sans installation — Cloud OS",
      en: "Krita online: digital painting, no install — Cloud OS",
    },
    description: {
      fr: "Peignez et illustrez avec Krita directement dans le navigateur : rien à installer, vos fichiers restent dans votre espace, hébergé au Québec.",
      en: "Paint, draw and illustrate with Krita right in your web browser: nothing to install, and your files stay in your own space, hosted in Québec.",
    },
  },
  accroche: {
    fr: "Le logiciel libre de peinture numérique et d'illustration, dans votre navigateur.",
    en: "The free digital painting and illustration software, in your browser.",
  },
  motsCles: {
    fr: ["krita en ligne", "krita sans installation", "krita dans le navigateur", "logiciel de dessin en ligne", "peinture numérique en ligne"],
    en: ["krita online", "krita without installing", "krita in the browser", "online drawing software", "online digital painting"],
  },
  corps: {
    fr: [
      {
        titre: "Un atelier de peinture complet",
        paragraphes: [
          "Krita est un logiciel libre conçu par et pour des artistes : illustration, bande dessinée, concept art, peinture numérique. Il réunit des centaines de pinceaux réglables, les calques et leurs masques, les outils de sélection et de transformation, et des aides au dessin comme les règles de perspective.",
          "Dans Cloud OS, c'est le logiciel lui-même qui tourne, dans une fenêtre de votre bureau en ligne. Vous l'ouvrez comme n'importe quelle autre application, sans installation ni mise à jour à suivre, et vous retrouvez le même Krita sur chaque ordinateur d'où vous vous connectez.",
        ],
      },
      {
        titre: "Vos dessins restent dans votre espace",
        paragraphes: [
          "Vous choisissez des images dans l'application Fichiers, et elles s'ouvrent directement dans Krita. Krita lit son propre format, KRA, qui garde les calques, ainsi que les formats d'image courants et les fichiers PSD. Une fois le travail fait, vous renvoyez vos fichiers dans Fichiers.",
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
          "La session de Krita est temporaire : enregistrez votre travail dans le dossier « Stockage » de l'application, puis renvoyez-le dans Fichiers avant de fermer la fenêtre, c'est là qu'il est conservé. Krita s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
        ],
      },
    ],
    en: [
      {
        titre: "A complete painting studio",
        paragraphes: [
          "Krita is free software made by and for artists: illustration, comics, concept art, digital painting. It brings together hundreds of adjustable brushes, layers and their masks, selection and transform tools, and drawing aids such as perspective rulers.",
          "In Cloud OS, the software itself runs in a window of your online desktop. You open it like any other app, with nothing to install and no updates to keep up with, and you find the same Krita on every computer you sign in from.",
        ],
      },
      {
        titre: "Your artwork stays in your own space",
        paragraphes: [
          "You pick images in the Files app, and they open straight in Krita. Krita reads its own KRA format, which keeps layers, as well as common image formats and PSD files. Once the work is done, you send your files back to Files.",
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
          "A Krita session is temporary: save your work in the app's “Stockage” folder, then send it back to Files before closing the window, since that is where it is kept. Krita is used from a computer; it is not offered on phones.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Faut-il installer Krita pour l'utiliser dans Cloud OS ?",
        reponse: "Non. Krita tourne dans une fenêtre de votre bureau en ligne, depuis le navigateur. Il n'y a rien à installer ni à mettre à jour sur votre ordinateur.",
      },
      {
        question: "Krita est-il compris dans l'abonnement ?",
        reponse: "Oui, dès le forfait Personnel, comme les autres logiciels du bureau. Il n'y a pas de frais par application : chaque ouverture compte comme une tâche dans l'enveloppe de votre forfait.",
      },
      {
        question: "Puis-je garder les calques de mon dessin ?",
        reponse: "Oui. Enregistrez-le au format KRA de Krita dans le dossier « Stockage », puis renvoyez-le dans Fichiers : vous le rouvrirez plus tard avec tous ses calques.",
      },
      {
        question: "Les dessins que je crée m'appartiennent-ils ?",
        reponse: "Oui. Krita est un logiciel libre, sous licence GPL, et ce que vous créez avec lui vous appartient, y compris pour un usage commercial.",
      },
    ],
    en: [
      {
        question: "Do I need to install Krita to use it in Cloud OS?",
        reponse: "No. Krita runs in a window of your online desktop, from the browser. There is nothing to install or update on your computer.",
      },
      {
        question: "Is Krita included in the subscription?",
        reponse: "Yes, from the Personal plan, like the other desktop software. There is no fee per app: each launch counts as one task in your plan's allowance.",
      },
      {
        question: "Can I keep the layers of my drawing?",
        reponse: "Yes. Save it in Krita's KRA format in the “Stockage” folder, then send it back to Files: you can reopen it later with all its layers.",
      },
      {
        question: "Does the artwork I create belong to me?",
        reponse: "Yes. Krita is free software under the GPL licence, and what you create with it is yours, including for commercial use.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/krita/krita-illustration.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "Krita dans Cloud OS : une illustration ouverte depuis Fichiers",
        en: "Krita in Cloud OS: an illustration opened from Files",
      },
    },
  ],
  voisines: ["gimp", "retouche-image", "inkscape"],
  articles: [],
};
