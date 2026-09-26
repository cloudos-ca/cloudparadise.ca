import type { FicheApplication } from "../types";

/**
 * KiCad — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Image `linuxserver/kicad` (src/lib/marketplace/desktop-apps-catalog.ts), diffusée dans une
 *   fenêtre du bureau ; ordinateur seulement (`desktopOnly`, app-registry.tsx).
 * - L'image installe le paquet Alpine `kicad` avec `kicad-library` et `kicad-library-3d`
 *   (bibliothèques de symboles, d'empreintes et de modèles 3D) : Dockerfile de
 *   github.com/linuxserver/docker-kicad, lu le 2026-09-25.
 * - PAS d'`openCmd` : un fichier importé depuis Fichiers arrive dans le dossier ~/Stockage de la
 *   session, mais ne s'ouvre pas tout seul ; on l'ouvre depuis KiCad (importFilesToDesktopAppAction).
 * - « Enregistrer » renvoie dans Fichiers les fichiers nouveaux ou modifiés de ~/Stockage, chacun
 *   comme un nouveau fichier (exportDesktopAppFilesAction). La liste n'est PAS récursive
 *   (listStorageFiles, appfiles-session.ts) : un fichier rangé dans un sous-dossier de ~/Stockage
 *   (ex. un dossier de sorties Gerber) n'est pas renvoyé. D'où le conseil de la fiche.
 * - Session temporaire (RAM, démontée à la fermeture ; TTL MARKETPLACE_TTL_HOURS, 2 h par défaut).
 * - Licence : GPL-3.0-or-later (kicad.org/about/licenses).
 * - Forfait : `personnel` (GET /api/v1/apps/catalog).
 *
 * À vérifier à la relecture :
 * - Le pont fichiers (MARKETPLACE_APPFILES) est actif en production.
 * - L'import se fait un fichier à la fois dans la fenêtre (handleImport envoie [entry.id]) : la
 *   limite de 20 fichiers de l'action n'est pas atteignable depuis l'interface. Je ne l'ai pas citée
 *   (la fiche GIMP, elle, la cite).
 * - Chaque ouverture consomme des crédits (chargeForJob « MARKETPLACE », stack-core.ts) : je n'ai
 *   donc pas écrit « sans supplément ». À harmoniser avec la FAQ de GIMP et FreeCAD.
 */
export const kicad: FicheApplication = {
  id: "kicad",
  apps: ["desktop-kicad"],
  slug: { fr: "kicad", en: "kicad" },
  nom: { fr: "KiCad", en: "KiCad" },
  tiers: { editeur: "The KiCad project", licence: "GPL-3.0-or-later", site: "https://www.kicad.org/" },
  titre: {
    fr: "KiCad en ligne, pour vos schémas et circuits imprimés",
    en: "KiCad online, for your schematics and circuit boards",
  },
  groupe: "developpement",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "KiCad en ligne : conception de circuits imprimés — Cloud OS",
      en: "KiCad online: PCB design with nothing to install — Cloud OS",
    },
    description: {
      fr: "Dessinez vos schémas électroniques et vos circuits imprimés avec KiCad, dans le navigateur : rien à installer, fichiers conservés dans votre espace.",
      en: "Draw your electronic schematics and circuit boards with KiCad, right in your browser: nothing to install, and your files stay in your own space.",
    },
  },
  accroche: {
    fr: "La conception électronique libre, du schéma au circuit imprimé.",
    en: "Free electronic design, from schematic to circuit board.",
  },
  motsCles: {
    fr: ["kicad en ligne", "logiciel de circuit imprimé", "conception pcb en ligne", "kicad sans installation", "schéma électronique en ligne"],
    en: ["kicad online", "pcb design software", "online pcb design", "kicad without installing", "online schematic editor"],
  },
  corps: {
    fr: [
      {
        titre: "KiCad, du schéma au circuit imprimé",
        paragraphes: [
          "KiCad est une suite libre de conception électronique : saisie de schémas, routage de circuits imprimés, visualisation 3D de la carte et production des fichiers de fabrication. Dans Cloud OS, c'est le logiciel lui-même qui tourne, dans une fenêtre de votre bureau en ligne.",
          "Les bibliothèques de symboles, d'empreintes et de modèles 3D de KiCad sont installées avec lui : vous commencez un projet sans rien télécharger.",
        ],
      },
      {
        titre: "Vos projets restent dans votre espace",
        paragraphes: [
          "Vous envoyez des fichiers depuis l'application Fichiers vers KiCad : ils arrivent dans son dossier « Stockage », où vous les ouvrez depuis le logiciel. Une fois le travail fait, vous renvoyez vos fichiers dans Fichiers.",
        ],
        points: [
          "Chaque fichier renvoyé arrive comme un nouveau fichier : l'original n'est jamais écrasé.",
          "Seuls les fichiers enregistrés directement dans « Stockage » sont renvoyés, pas ceux de ses sous-dossiers : enregistrez-y aussi vos fichiers de fabrication.",
          "Vos fichiers sont hébergés au Québec.",
        ],
      },
      {
        titre: "Ce qu'il faut savoir",
        paragraphes: [
          "La session de KiCad est temporaire : pensez à renvoyer votre travail dans Fichiers avant de la fermer, c'est là qu'il est conservé. KiCad s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
        ],
      },
    ],
    en: [
      {
        titre: "KiCad, from schematic to circuit board",
        paragraphes: [
          "KiCad is a free, open-source electronic design suite: schematic capture, printed circuit board layout, 3D board viewing and fabrication output. In Cloud OS, the software itself runs in a window of your online desktop.",
          "KiCad's symbol, footprint and 3D model libraries are installed with it: you start a project without downloading anything.",
        ],
      },
      {
        titre: "Your projects stay in your own space",
        paragraphes: [
          "You send files from the Files app to KiCad: they land in its “Stockage” (storage) folder, where you open them from the software. Once the work is done, you send your files back to Files.",
        ],
        points: [
          "Every file sent back arrives as a new file: the original is never overwritten.",
          "Only files saved directly in “Stockage” are sent back, not those in its subfolders: save your fabrication files there too.",
          "Your files are hosted in Québec.",
        ],
      },
      {
        titre: "Good to know",
        paragraphes: [
          "A KiCad session is temporary: remember to send your work back to Files before closing it, since that is where it is kept. KiCad is used from a computer; it is not offered on phones.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Faut-il installer KiCad pour l'utiliser dans Cloud OS ?",
        reponse: "Non. KiCad tourne dans une fenêtre de votre bureau en ligne, depuis le navigateur, avec ses bibliothèques de composants. Il n'y a rien à installer ni à mettre à jour sur votre ordinateur.",
      },
      {
        question: "Comment ouvrir un projet KiCad que j'ai déjà ?",
        reponse: "Envoyez ses fichiers depuis l'application Fichiers : ils arrivent dans le dossier « Stockage » de la session, et vous les ouvrez depuis KiCad.",
      },
      {
        question: "KiCad est-il compris dans l'abonnement ?",
        reponse: "Oui, dès le forfait Personnel, comme les autres logiciels du bureau.",
      },
    ],
    en: [
      {
        question: "Do I need to install KiCad to use it in Cloud OS?",
        reponse: "No. KiCad runs in a window of your online desktop, from the browser, with its component libraries. There is nothing to install or update on your computer.",
      },
      {
        question: "How do I open a KiCad project I already have?",
        reponse: "Send its files from the Files app: they land in the session's “Stockage” folder, and you open them from KiCad.",
      },
      {
        question: "Is KiCad included in the subscription?",
        reponse: "Yes, from the Personal plan, like the other desktop software.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/kicad/kicad-circuit.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "KiCad dans Cloud OS : le circuit imprimé d'un projet de démonstration",
        en: "KiCad in Cloud OS: the circuit board of a demo project",
      },
    },
  ],
  voisines: ["freecad", "vscodium", "agent-de-code"],
  articles: [],
};
