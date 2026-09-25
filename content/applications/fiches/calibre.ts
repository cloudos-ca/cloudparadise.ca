import type { FicheApplication } from "../types";

/**
 * Calibre — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Calibre est l'image `linuxserver/calibre`, diffusée dans une fenêtre du bureau
 *   (src/lib/marketplace/desktop-apps-catalog.ts) ; ordinateur seulement (`desktopOnly`).
 * - PAS d'`openCmd` : un fichier importé depuis Fichiers est seulement copié dans le dossier
 *   « Stockage » de l'application ; on l'ajoute ensuite soi-même à Calibre (commentaire du
 *   catalogue : « library/IDE apps (Calibre…) whose "open" is a vault/project »). Jusqu'à 20
 *   fichiers par import (MAX_IMPORT_FILES, actions.ts).
 * - « Enregistrer » renvoie dans Fichiers, comme nouveaux fichiers, les fichiers posés DIRECTEMENT
 *   dans « Stockage » (listStorageFiles, non récursif, appfiles-session.ts). Or « Enregistrer sur le
 *   disque » de Calibre range par défaut dans des sous-dossiers auteur/titre : d'où la consigne de la
 *   fiche d'enregistrer le livre dans « Stockage » même.
 * - Session temporaire, /config en RAM (reaper.ts, appfiles-session.ts) : la bibliothèque Calibre
 *   (« Calibre Library », sous /config) n'est PAS conservée d'une session à l'autre. La fiche vend
 *   donc la conversion et la lecture, pas une bibliothèque permanente.
 * - Forfait : `personnel` (GET /api/v1/apps/catalog, production, 2026-09-25).
 * - Licence GPL-3.0 (LICENSE du dépôt kovidgoyal/calibre) ; développé principalement par Kovid
 *   Goyal (calibre-ebook.com/about).
 *
 * À vérifier à la relecture :
 * - que le pont fichiers (MARKETPLACE_APPFILES) est actif en production ;
 * - le parcours complet dans l'app (importer un EPUB, le convertir, l'enregistrer dans « Stockage »,
 *   le renvoyer) : décrit d'après le code et les fonctions connues de Calibre, pas essayé.
 */
export const calibre: FicheApplication = {
  id: "calibre",
  apps: ["desktop-calibre"],
  slug: { fr: "calibre", en: "calibre" },
  nom: { fr: "Calibre", en: "Calibre" },
  tiers: { editeur: "Kovid Goyal", licence: "GPL-3.0", site: "https://calibre-ebook.com/" },
  titre: {
    fr: "Calibre en ligne, pour convertir vos livres numériques",
    en: "Calibre online, to convert your e-books",
  },
  groupe: "gestion",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Calibre en ligne : convertir un livre numérique — Cloud OS",
      en: "Calibre online: convert e-books in your browser — Cloud OS",
    },
    description: {
      fr: "Convertissez, lisez et retouchez vos livres numériques EPUB, MOBI ou AZW3 avec Calibre, dans le navigateur, sans rien installer sur votre ordinateur.",
      en: "Convert, read and touch up your EPUB, MOBI or AZW3 e-books with Calibre, right in your browser, with nothing to install on your computer.",
    },
  },
  accroche: {
    fr: "Le couteau suisse libre du livre numérique, dans votre navigateur.",
    en: "The free Swiss Army knife for e-books, in your browser.",
  },
  motsCles: {
    fr: ["calibre en ligne", "calibre sans installation", "convertir epub en ligne", "convertir un livre numérique", "éditeur epub en ligne"],
    en: ["calibre online", "calibre without installing", "convert epub online", "e-book converter", "online epub editor"],
  },
  corps: {
    fr: [
      {
        titre: "Le logiciel de référence du livre numérique",
        paragraphes: [
          "Calibre est un logiciel libre de gestion de livres numériques. Il convertit un livre d'un format à l'autre (EPUB, MOBI, AZW3, PDF, DOCX et bien d'autres), l'affiche dans sa liseuse, modifie ses métadonnées (titre, auteur, couverture) et, avec son éditeur intégré, permet de retoucher le contenu d'un EPUB.",
          "Dans Cloud OS, c'est le logiciel lui-même qui tourne, dans une fenêtre de votre bureau en ligne. Rien à installer sur votre poste, et le même Calibre sur chaque ordinateur d'où vous vous connectez.",
        ],
      },
      {
        titre: "Du fichier au livre converti",
        paragraphes: [
          "Vous choisissez vos livres dans l'application Fichiers : ils sont copiés dans le dossier « Stockage » de Calibre, d'où vous les ajoutez à la bibliothèque. Une fois le livre converti ou corrigé, vous l'enregistrez dans ce même dossier et vous le renvoyez dans Fichiers.",
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
          "La session de Calibre est temporaire, et la bibliothèque qu'il se constitue disparaît avec elle : Calibre sert ici à convertir, lire et corriger des livres, pas à garder une collection d'une fois à l'autre. Vos livres, eux, restent dans Fichiers.",
          "Seuls les fichiers posés directement dans le dossier « Stockage » reviennent dans Fichiers, pas ceux d'un sous-dossier : au moment d'enregistrer un livre, choisissez ce dossier lui-même. Calibre s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
        ],
      },
    ],
    en: [
      {
        titre: "The go-to e-book software",
        paragraphes: [
          "Calibre is free software for managing e-books. It converts a book from one format to another (EPUB, MOBI, AZW3, PDF, DOCX and many more), displays it in its reader, edits its metadata (title, author, cover) and, with its built-in editor, lets you touch up the contents of an EPUB.",
          "In Cloud OS, the software itself runs in a window of your online desktop. Nothing to install on your computer, and the same Calibre on every computer you sign in from.",
        ],
      },
      {
        titre: "From file to converted book",
        paragraphes: [
          "You pick your books in the Files app: they are copied to Calibre's “Stockage” folder, from which you add them to the library. Once the book is converted or corrected, you save it to that same folder and send it back to Files.",
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
          "A Calibre session is temporary, and the library it builds goes away with it: here, Calibre is for converting, reading and correcting books, not for keeping a collection from one session to the next. Your books themselves stay in Files.",
          "Only files placed directly in the “Stockage” folder go back to Files, not those in a subfolder: when you save a book, pick that folder itself. Calibre is used from a computer; it is not offered on phones.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Faut-il installer Calibre pour l'utiliser dans Cloud OS ?",
        reponse: "Non. Calibre tourne dans une fenêtre de votre bureau en ligne, depuis le navigateur. Il n'y a rien à installer ni à mettre à jour sur votre ordinateur.",
      },
      {
        question: "Calibre est-il compris dans l'abonnement ?",
        reponse: "Oui, dès le forfait Personnel, comme les autres logiciels du bureau. Il n'y a pas de frais par application : chaque ouverture compte comme une tâche dans l'enveloppe de votre forfait.",
      },
      {
        question: "Ma bibliothèque Calibre est-elle conservée ?",
        reponse: "Non. La session est temporaire et la bibliothèque de Calibre disparaît quand vous la fermez. Ce que vous renvoyez dans Fichiers, en revanche, y reste.",
      },
      {
        question: "Calibre retire-t-il les verrous des livres achetés ?",
        reponse: "Non. Calibre ne retire pas les verrous numériques (DRM) : il convertit et lit les livres qui n'en ont pas.",
      },
    ],
    en: [
      {
        question: "Do I need to install Calibre to use it in Cloud OS?",
        reponse: "No. Calibre runs in a window of your online desktop, from the browser. There is nothing to install or update on your computer.",
      },
      {
        question: "Is Calibre included in the subscription?",
        reponse: "Yes, from the Personal plan, like the other desktop software. There is no fee per app: each launch counts as one task in your plan's allowance.",
      },
      {
        question: "Is my Calibre library kept?",
        reponse: "No. The session is temporary and Calibre's library goes away when you close it. Whatever you send back to Files, however, stays there.",
      },
      {
        question: "Does Calibre remove the locks on purchased books?",
        reponse: "No. Calibre does not remove digital locks (DRM): it converts and reads books that have none.",
      },
    ],
  },
  captures: [],
  voisines: ["zotero", "writer", "libreoffice"],
  articles: [],
};
