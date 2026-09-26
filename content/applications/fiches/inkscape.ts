import type { FicheApplication } from "../types";

/**
 * Inkscape — ÉBAUCHE, à relire avant publication.
 *
 * Positionnement : le seul logiciel VECTORIEL du groupe images (logos, illustrations, SVG, fichiers
 * pour l'impression) ; intentions « Inkscape en ligne », « éditeur SVG en ligne », « alternative à
 * Illustrator ». GIMP et Krita travaillent au pixel ; darktable, RawTherapee et digiKam, sur des
 * photos.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Image `linuxserver/inkscape`, diffusée dans une fenêtre du bureau ; description du produit :
 *   « Dessin vectoriel (logos, illustrations, plans) » (src/lib/marketplace/desktop-apps-catalog.ts) ;
 *   ordinateur seulement (`desktopOnly`, app-registry.tsx).
 * - `openCmd: "inkscape"` : un fichier importé depuis Fichiers s'ouvre directement dans Inkscape
 *   (importFilesToDesktopAppAction, src/lib/marketplace/actions.ts).
 * - L'interface importe UN fichier par choix (desktop-app-window.tsx, desktopApps.importDialogHint).
 * - « Enregistrer » renvoie les fichiers nouveaux ou modifiés du dossier « Stockage » dans Fichiers,
 *   comme nouveaux fichiers (exportDesktopAppFilesAction) ; un fichier importé puis modifié change de
 *   taille et repart donc, sans écraser l'original dans Fichiers ; liste non récursive
 *   (listStorageFiles).
 * - Bouton d'aide vers la documentation officielle (`docsUrl: https://inkscape.org/learn/`).
 * - Session temporaire (reaper.ts ; /config en RAM, appfiles-session.ts).
 * - Licence : GPL-2.0-or-later (SPDX des sources, gitlab.com/inkscape/inkscape).
 *
 * Fonctions d'Inkscape citées (SVG natif, courbes de Bézier, texte, calques, export PNG/PDF/EPS,
 * ouverture de PDF) : fonctions de base du logiciel, non propres à Cloud OS.
 *
 * À vérifier à la relecture :
 * - que le pont fichiers (MARKETPLACE_APPFILES) est actif en production ;
 * - les polices disponibles dans l'image : un document qui utilise une police absente du conteneur
 *   s'affichera avec une police de remplacement (non dit dans le texte) ;
 * - que `inkscape <fichier>` ouvre bien le document quand Inkscape tourne déjà.
 */
export const inkscape: FicheApplication = {
  id: "inkscape",
  apps: ["desktop-inkscape"],
  slug: { fr: "inkscape", en: "inkscape" },
  nom: { fr: "Inkscape", en: "Inkscape" },
  tiers: { editeur: "The Inkscape Project", licence: "GPL-2.0-or-later", site: "https://inkscape.org/" },
  titre: {
    fr: "Inkscape en ligne, le dessin vectoriel sans installation",
    en: "Inkscape online, vector drawing with nothing to install",
  },
  groupe: "images",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Inkscape en ligne : dessin vectoriel et SVG — Cloud OS",
      en: "Inkscape online: vector drawing and SVG editing — Cloud OS",
    },
    description: {
      fr: "Dessinez logos, illustrations et fichiers SVG avec Inkscape, l'alternative libre à Illustrator, dans le navigateur : rien à installer, fichiers au Québec.",
      en: "Draw logos, illustrations and SVG files with Inkscape, the free Illustrator alternative, in your browser: nothing to install, files hosted in Québec.",
    },
  },
  accroche: {
    fr: "Le dessin vectoriel libre, pour vos logos et vos SVG, dans le navigateur.",
    en: "Free vector drawing for your logos and SVG files, in your browser.",
  },
  motsCles: {
    fr: ["inkscape en ligne", "éditeur svg en ligne", "alternative à illustrator", "logiciel de dessin vectoriel gratuit", "inkscape sans installation"],
    en: ["inkscape online", "online svg editor", "illustrator alternative", "free vector graphics software", "inkscape without installing"],
  },
  corps: {
    fr: [
      {
        titre: "Le vrai Inkscape, dans une fenêtre du bureau",
        paragraphes: [
          "Inkscape est le logiciel libre de dessin vectoriel de référence. Ses dessins sont faits de formes et de courbes, pas de pixels : un logo reste net qu'on l'imprime sur une carte d'affaires ou sur une bannière.",
          "Dans Cloud OS, c'est le logiciel lui-même qui tourne, dans une fenêtre de votre bureau en ligne. Rien à installer sur votre poste, aucune mise à jour à suivre, et le même Inkscape sur chaque ordinateur d'où vous vous connectez.",
        ],
      },
      {
        titre: "Logos, illustrations, plans et SVG",
        paragraphes: [
          "Inkscape travaille nativement en SVG, le format vectoriel du web, et sait produire les fichiers qu'attendent un imprimeur ou un site.",
        ],
        points: [
          "Formes, courbes de Bézier, texte et calques, avec des outils d'alignement précis.",
          "Logos, icônes, schémas, affiches et plans simples.",
          "Export en PNG à la résolution voulue, en PDF ou en EPS pour l'impression.",
          "Ouverture de fichiers SVG et PDF existants, pour les retoucher.",
        ],
      },
      {
        titre: "Vos dessins restent dans votre espace",
        paragraphes: [
          "Vous choisissez un fichier dans l'application Fichiers, et il s'ouvre directement dans Inkscape ; répétez pour en ajouter d'autres. Une fois le travail fait, le bouton Enregistrer renvoie vos dessins et vos exports dans Fichiers.",
        ],
        points: [
          "Chaque fichier renvoyé arrive comme un nouveau fichier : la version d'origine n'est jamais écrasée.",
          "Seuls les fichiers nouveaux ou modifiés repartent : un original que vous n'avez pas touché n'est pas dupliqué.",
          "Vos fichiers sont hébergés au Québec.",
        ],
      },
      {
        titre: "Ce qu'il faut savoir",
        paragraphes: [
          "Enregistrez et exportez directement dans le dossier « Stockage » de l'application : c'est de là, et pas des sous-dossiers, que vos fichiers repartent vers Fichiers. La session d'Inkscape est temporaire : ce qui n'est pas renvoyé dans Fichiers disparaît avec elle.",
          "Inkscape s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
        ],
      },
    ],
    en: [
      {
        titre: "The real Inkscape, in a desktop window",
        paragraphes: [
          "Inkscape is the leading free vector drawing software. Its drawings are made of shapes and curves, not pixels: a logo stays sharp whether it is printed on a business card or a banner.",
          "In Cloud OS, the software itself runs in a window of your online desktop. Nothing to install on your computer, no updates to keep up with, and the same Inkscape on every computer you sign in from.",
        ],
      },
      {
        titre: "Logos, illustrations, plans and SVG",
        paragraphes: [
          "Inkscape works natively in SVG, the web's vector format, and produces the files a printer or a website expects.",
        ],
        points: [
          "Shapes, Bézier curves, text and layers, with precise alignment tools.",
          "Logos, icons, diagrams, posters and simple plans.",
          "Export to PNG at the resolution you need, or to PDF or EPS for print.",
          "Opens existing SVG and PDF files, so you can rework them.",
        ],
      },
      {
        titre: "Your drawings stay in your own space",
        paragraphes: [
          "You pick a file in the Files app, and it opens straight in Inkscape; repeat to add more. Once the work is done, the Save button sends your drawings and exports back to Files.",
        ],
        points: [
          "Every file sent back arrives as a new file: the original version is never overwritten.",
          "Only new or changed files go back: an original you did not touch is not duplicated.",
          "Your files are hosted in Québec.",
        ],
      },
      {
        titre: "Good to know",
        paragraphes: [
          "Save and export straight into the app's “Stockage” (Storage) folder: files go back to Files from there, not from its subfolders. An Inkscape session is temporary: anything not sent back to Files disappears with it.",
          "Inkscape is used from a computer; it is not offered on phones.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Faut-il installer Inkscape pour l'utiliser dans Cloud OS ?",
        reponse: "Non. Inkscape tourne dans une fenêtre de votre bureau en ligne, depuis le navigateur. Il n'y a rien à installer ni à mettre à jour sur votre ordinateur.",
      },
      {
        question: "Inkscape peut-il remplacer Illustrator ?",
        reponse: "Pour une grande part du dessin vectoriel (logos, illustrations, schémas, fichiers SVG et PDF), oui : c'est un logiciel libre qui couvre ce travail. Son interface et ses raccourcis diffèrent ; comptez un temps d'adaptation si vous venez d'Illustrator.",
      },
      {
        question: "Quelle différence avec GIMP ?",
        reponse: "GIMP retouche des images faites de pixels, comme des photos. Inkscape dessine en vectoriel : formes et courbes qui restent nettes à toutes les tailles. Pour un logo, c'est Inkscape ; pour retoucher une photo, GIMP. Les deux sont offerts dans Cloud OS.",
      },
      {
        question: "Inkscape est-il compris dans l'abonnement ?",
        reponse: "Oui, dès le forfait Personnel, comme les autres logiciels du bureau. Il n'y a pas de frais par application : chaque ouverture compte comme une tâche dans l'enveloppe de votre forfait.",
      },
    ],
    en: [
      {
        question: "Do I need to install Inkscape to use it in Cloud OS?",
        reponse: "No. Inkscape runs in a window of your online desktop, from the browser. There is nothing to install or update on your computer.",
      },
      {
        question: "Can Inkscape replace Illustrator?",
        reponse: "For much of vector drawing (logos, illustrations, diagrams, SVG and PDF files), yes: it is free software that covers that work. Its interface and shortcuts differ, so expect some time to adjust if you are coming from Illustrator.",
      },
      {
        question: "How is it different from GIMP?",
        reponse: "GIMP edits images made of pixels, such as photos. Inkscape draws in vector form: shapes and curves that stay sharp at any size. For a logo, use Inkscape; to retouch a photo, GIMP. Both are offered in Cloud OS.",
      },
      {
        question: "Is Inkscape included in the subscription?",
        reponse: "Yes, from the Personal plan, like the other desktop software. There is no fee per app: each launch counts as one task in your plan's allowance.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/inkscape/inkscape-vectoriel.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "Inkscape dans Cloud OS : une illustration vectorielle, une forme sélectionnée",
        en: "Inkscape in Cloud OS: a vector illustration with a shape selected",
      },
    },
  ],
  voisines: ["gimp", "krita", "retouche-image"],
  articles: [],
};
