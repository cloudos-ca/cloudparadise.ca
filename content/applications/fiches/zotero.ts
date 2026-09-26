import type { FicheApplication } from "../types";

/**
 * Zotero — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Zotero est l'image `infra/kasm-images/apps/zotero` du produit (arm64, 2026-09-25 : LinuxServer.io ne publie `linuxserver/zotero` qu'en amd64), diffusée dans une fenêtre du bureau
 *   (src/lib/marketplace/desktop-apps-catalog.ts) ; ordinateur seulement (`desktopOnly`).
 * - PAS d'`openCmd` : un fichier importé depuis Fichiers est seulement copié dans le dossier
 *   « Stockage » de l'application ; on l'importe ensuite soi-même dans Zotero (Fichier > Importer).
 *   Jusqu'à 20 fichiers par import (MAX_IMPORT_FILES, actions.ts).
 * - « Enregistrer » renvoie dans Fichiers, comme nouveaux fichiers, les fichiers posés DIRECTEMENT
 *   dans « Stockage » (listStorageFiles, non récursif, appfiles-session.ts).
 * - Session temporaire, /config en RAM : la base de Zotero (~/Zotero, sous /config) n'est PAS
 *   conservée. La fiche le dit, et propose de garder sa bibliothèque sous forme d'un fichier
 *   d'export (RIS, BibTeX) dans Fichiers.
 * - Forfait : `personnel` (GET /api/v1/apps/catalog, production, 2026-09-25).
 * - Licence AGPL-3.0, Corporation for Digital Scholarship (COPYING du dépôt zotero/zotero).
 *
 * Volontairement absents de la fiche (non vérifiés) : la synchronisation avec un compte zotero.org et
 * l'ajout d'une référence par DOI ou ISBN, qui supposent un accès à Internet depuis la session (non
 * vérifié dans compose-validate.ts) ; le module Zotero Connector du navigateur et les modules de
 * traitement de texte (Word, LibreOffice), absents de la session.
 *
 * À vérifier à la relecture :
 * - que le pont fichiers (MARKETPLACE_APPFILES) est actif en production ;
 * - le parcours import RIS/BibTeX → bibliographie → export dans « Stockage », pas essayé.
 */
export const zotero: FicheApplication = {
  id: "zotero",
  apps: ["desktop-zotero"],
  slug: { fr: "zotero", en: "zotero" },
  nom: { fr: "Zotero", en: "Zotero" },
  tiers: { editeur: "Corporation for Digital Scholarship", licence: "AGPL-3.0", site: "https://www.zotero.org/" },
  titre: {
    fr: "Zotero en ligne, sans rien installer",
    en: "Zotero online, with nothing to install",
  },
  groupe: "gestion",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Zotero en ligne : bibliographie sans installation — Cloud OS",
      en: "Zotero online: bibliographies, nothing to install — Cloud OS",
    },
    description: {
      fr: "Classez vos références et produisez une bibliographie en APA, Chicago ou MLA avec Zotero, dans le navigateur, sans rien installer sur votre ordinateur.",
      en: "Sort your references and produce a bibliography in APA, Chicago or MLA style with Zotero, right in your browser, with nothing to install on your computer.",
    },
  },
  accroche: {
    fr: "Le gestionnaire de références libre des chercheurs, dans votre navigateur.",
    en: "The free reference manager researchers rely on, in your browser.",
  },
  motsCles: {
    fr: ["zotero en ligne", "zotero sans installation", "gestionnaire de références bibliographiques", "créer une bibliographie apa", "alternative à endnote"],
    en: ["zotero online", "zotero without installing", "reference manager", "apa bibliography generator", "endnote alternative"],
  },
  corps: {
    fr: [
      {
        titre: "Vos références, classées et citées",
        paragraphes: [
          "Zotero est un logiciel libre de gestion de références bibliographiques, très répandu dans les universités. Il range articles, livres et rapports dans des collections, avec leurs étiquettes et leurs notes, et produit une bibliographie dans le style demandé : APA, Chicago, MLA et bien d'autres.",
          "Dans Cloud OS, c'est le logiciel lui-même qui tourne, dans une fenêtre de votre bureau en ligne. Rien à installer sur votre poste, et le même Zotero sur chaque ordinateur d'où vous vous connectez.",
        ],
      },
      {
        titre: "De vos fichiers à la bibliographie",
        paragraphes: [
          "Vous choisissez dans l'application Fichiers vos exports de références (RIS, BibTeX) ou vos articles en PDF : ils sont copiés dans le dossier « Stockage » de Zotero, d'où vous les importez. Vous triez, complétez, puis vous enregistrez la bibliographie ou un export de votre bibliothèque dans ce même dossier et le renvoyez dans Fichiers.",
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
          "La session de Zotero est temporaire, et la bibliothèque qu'il contient disparaît quand vous la fermez. Pour la retrouver la fois suivante, exportez-la dans un fichier (RIS ou BibTeX) enregistré dans « Stockage », renvoyez-le dans Fichiers, et réimportez-le à la prochaine session.",
          "Seuls les fichiers posés directement dans le dossier « Stockage » reviennent dans Fichiers, pas ceux d'un sous-dossier. Zotero s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
        ],
      },
    ],
    en: [
      {
        titre: "Your references, sorted and cited",
        paragraphes: [
          "Zotero is free reference management software, widely used in universities. It files articles, books and reports into collections, with their tags and notes, and produces a bibliography in the required style: APA, Chicago, MLA and many more.",
          "In Cloud OS, the software itself runs in a window of your online desktop. Nothing to install on your computer, and the same Zotero on every computer you sign in from.",
        ],
      },
      {
        titre: "From your files to the bibliography",
        paragraphes: [
          "You pick your reference exports (RIS, BibTeX) or your PDF articles in the Files app: they are copied to Zotero's “Stockage” folder, from which you import them. You sort, fill in the details, then save the bibliography or an export of your library to that same folder and send it back to Files.",
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
          "A Zotero session is temporary, and the library inside it goes away when you close it. To get it back next time, export it to a file (RIS or BibTeX) saved in “Stockage”, send it back to Files, and import it again in your next session.",
          "Only files placed directly in the “Stockage” folder go back to Files, not those in a subfolder. Zotero is used from a computer; it is not offered on phones.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Faut-il installer Zotero pour l'utiliser dans Cloud OS ?",
        reponse: "Non. Zotero tourne dans une fenêtre de votre bureau en ligne, depuis le navigateur. Il n'y a rien à installer ni à mettre à jour sur votre ordinateur.",
      },
      {
        question: "Zotero est-il compris dans l'abonnement ?",
        reponse: "Oui, dès le forfait Personnel, comme les autres logiciels du bureau. Il n'y a pas de frais par application : chaque ouverture compte comme une tâche dans l'enveloppe de votre forfait.",
      },
      {
        question: "Ma bibliothèque Zotero est-elle conservée d'une fois à l'autre ?",
        reponse: "Pas dans Zotero lui-même : la session est temporaire. Exportez votre bibliothèque dans un fichier RIS ou BibTeX et renvoyez-le dans Fichiers ; vous le réimporterez à la session suivante.",
      },
    ],
    en: [
      {
        question: "Do I need to install Zotero to use it in Cloud OS?",
        reponse: "No. Zotero runs in a window of your online desktop, from the browser. There is nothing to install or update on your computer.",
      },
      {
        question: "Is Zotero included in the subscription?",
        reponse: "Yes, from the Personal plan, like the other desktop software. There is no fee per app: each launch counts as one task in your plan's allowance.",
      },
      {
        question: "Is my Zotero library kept from one session to the next?",
        reponse: "Not inside Zotero itself: the session is temporary. Export your library to a RIS or BibTeX file and send it back to Files; you can import it again in your next session.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/zotero/zotero-bibliotheque.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "Zotero dans Cloud OS : une bibliothèque de romans québécois et la notice de l'un d'eux",
        en: "Zotero in Cloud OS: a library of Québec novels and the record of one of them",
      },
    },
  ],
  voisines: ["calibre", "writer", "libreoffice"],
  articles: [],
};
