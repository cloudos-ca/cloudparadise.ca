import type { FicheApplication } from "../types";

/**
 * FreeCAD — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25, comme pour GIMP : image
 * `linuxserver/freecad` diffusée dans une fenêtre du bureau, ordinateur seulement, import depuis
 * Fichiers qui ouvre le fichier directement (`openCmd: "freecad"`), enregistrement vers Fichiers en
 * nouveau fichier, session temporaire. Capture : FreeCAD 1.1 avec un pignon fictif importé en STL.
 */
export const freecad: FicheApplication = {
  id: "freecad",
  apps: ["desktop-freecad"],
  slug: { fr: "freecad", en: "freecad" },
  nom: { fr: "FreeCAD", en: "FreeCAD" },
  titre: {
    fr: "FreeCAD en ligne, sans rien installer",
    en: "FreeCAD online, with nothing to install",
  },
  tiers: { editeur: "The FreeCAD project", licence: "LGPL-2.0", site: "https://www.freecad.org/" },
  groupe: "developpement",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "FreeCAD en ligne : CAO 3D sans installation — Cloud OS",
      en: "FreeCAD online: 3D CAD with nothing to install — Cloud OS",
    },
    description: {
      fr: "Concevez vos pièces avec FreeCAD directement dans le navigateur : rien à installer, vos fichiers restent dans votre espace, hébergé au Québec.",
      en: "Design your parts with FreeCAD right in your browser: nothing to install, and your files stay in your own space, hosted in Québec.",
    },
  },
  accroche: {
    fr: "La CAO 3D paramétrique libre, dans votre navigateur.",
    en: "Free parametric 3D CAD, in your browser.",
  },
  motsCles: {
    fr: ["freecad en ligne", "cao 3d en ligne", "logiciel de cao gratuit", "freecad sans installation"],
    en: ["freecad online", "online 3d cad", "free cad software", "freecad without installing"],
  },
  corps: {
    fr: [
      {
        titre: "Le vrai FreeCAD, dans une fenêtre du bureau",
        paragraphes: [
          "FreeCAD est un logiciel libre de conception assistée par ordinateur (CAO) 3D paramétrique : esquisses contraintes, pièces, assemblages, mise en plan. Dans Cloud OS, c'est le logiciel lui-même qui tourne, dans une fenêtre de votre bureau en ligne.",
          "Aucune installation ni mise à jour sur le poste, et la même version de FreeCAD sur chaque ordinateur d'où vous vous connectez.",
        ],
      },
      {
        titre: "Vos modèles restent dans votre espace",
        paragraphes: [
          "Vous choisissez un fichier dans l'application Fichiers, et il s'ouvre directement dans FreeCAD. Une fois le travail fait, vous le renvoyez dans Fichiers.",
        ],
        points: [
          "Chaque fichier renvoyé arrive comme un nouveau fichier : l'original n'est jamais écrasé.",
          "Vos fichiers sont hébergés au Québec.",
        ],
      },
      {
        titre: "Ce qu'il faut savoir",
        paragraphes: [
          "La session de FreeCAD est temporaire : pensez à renvoyer votre travail dans Fichiers avant de la fermer, c'est là qu'il est conservé. FreeCAD s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
        ],
      },
    ],
    en: [
      {
        titre: "The real FreeCAD, in a desktop window",
        paragraphes: [
          "FreeCAD is free, open-source parametric 3D computer-aided design (CAD) software: constrained sketches, parts, assemblies, technical drawings. In Cloud OS, the software itself runs in a window of your online desktop.",
          "Nothing to install or update on your computer, and the same version of FreeCAD on every computer you sign in from.",
        ],
      },
      {
        titre: "Your models stay in your own space",
        paragraphes: [
          "You pick a file in the Files app, and it opens straight in FreeCAD. Once the work is done, you send it back to Files.",
        ],
        points: [
          "Every file sent back arrives as a new file: the original is never overwritten.",
          "Your files are hosted in Québec.",
        ],
      },
      {
        titre: "Good to know",
        paragraphes: [
          "A FreeCAD session is temporary: remember to send your work back to Files before closing it, since that is where it is kept. FreeCAD is used from a computer; it is not offered on phones.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Faut-il installer FreeCAD pour l'utiliser dans Cloud OS ?",
        reponse: "Non. FreeCAD tourne dans une fenêtre de votre bureau en ligne, depuis le navigateur. Il n'y a rien à installer ni à mettre à jour.",
      },
      {
        question: "FreeCAD est-il compris dans l'abonnement ?",
        reponse: "Oui, dès le forfait Personnel, comme les autres logiciels du bureau. Il n'y a pas de supplément par application.",
      },
      {
        question: "Mes fichiers originaux risquent-ils d'être écrasés ?",
        reponse: "Non. Les fichiers que vous renvoyez de FreeCAD vers Fichiers arrivent comme de nouveaux fichiers ; l'original reste tel quel.",
      },
    ],
    en: [
      {
        question: "Do I need to install FreeCAD to use it in Cloud OS?",
        reponse: "No. FreeCAD runs in a window of your online desktop, from the browser. There is nothing to install or update.",
      },
      {
        question: "Is FreeCAD included in the subscription?",
        reponse: "Yes, from the Personal plan, like the other desktop software. There is no extra charge per app.",
      },
      {
        question: "Could my original files be overwritten?",
        reponse: "No. Files you send back from FreeCAD to Files arrive as new files; the original stays as it was.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/freecad/freecad-piece.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "FreeCAD ouvert dans Cloud OS sur un pignon de 24 dents, en vue isométrique",
        en: "FreeCAD open in Cloud OS on a 24-tooth gear, in isometric view",
      },
    },
  ],
  voisines: ["gimp", "agent-de-code"],
  articles: [],
};
