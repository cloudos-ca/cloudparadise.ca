import type { FicheApplication } from "../types";

/**
 * Bac à sable — ÉBAUCHE, à relire avant publication. La fiche pilote du forfait Entreprise.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Un bureau Linux XFCE complet (LinuxServer webtop) avec LibreOffice, gestionnaire de fichiers et
 *   terminal (infra/kasm-images/desktop-kasm/Dockerfile), diffusé dans une fenêtre du bureau.
 * - Toujours le même conteneur pour un utilisateur, et un dossier personnel sur disque qui n'est
 *   jamais effacé à l'arrêt : réglages, favoris et téléchargements survivent d'une visite à l'autre
 *   (src/lib/persistent-desktop/docker.ts).
 * - Premier démarrage d'environ 20 à 30 s, instantané ensuite (persistentDesktop.starting, fr.json).
 * - Le dossier ~/Stockage du bac à sable se synchronise dans les deux sens avec un dossier
 *   « Bureau persistant » de Fichiers, sous-dossiers compris : tiré à l'ouverture, renvoyé à la
 *   fermeture ou sur demande (src/lib/persistent-desktop/sync.ts, actions.ts).
 * - Ordinateur seulement (`desktopOnly`, app-registry.tsx).
 * - Forfait Entreprise (GET /api/v1/apps/catalog : `plan: "entreprise"`).
 *
 * À vérifier avant publication : le correctif b3e8c304 (« le forfait Entreprise ouvre le Bac à
 * sable ») est en production. Tant qu'il n'y est pas, un client Entreprise ne peut pas ouvrir ce que
 * la fiche promet.
 */
export const bacASable: FicheApplication = {
  id: "bac-a-sable",
  apps: ["persistent-desktop"],
  slug: { fr: "bac-a-sable", en: "sandbox" },
  nom: { fr: "Bac à sable", en: "Sandbox" },
  titre: {
    fr: "Bac à sable, un bureau Linux en ligne qui garde vos réglages",
    en: "Sandbox, an online Linux desktop that keeps your settings",
  },
  groupe: "bureau",
  forfait: "entreprise",
  seo: {
    titre: {
      fr: "Bureau Linux en ligne, toujours configuré — Cloud OS",
      en: "Persistent Linux desktop in your browser — Cloud OS",
    },
    description: {
      fr: "Un vrai bureau Linux dans le navigateur, avec terminal et LibreOffice, qui reste configuré d'une visite à l'autre. Hébergé au Québec, rien à installer.",
      en: "A real Linux desktop in your browser, with a terminal and LibreOffice, that stays configured between visits. Hosted in Québec, nothing to install.",
    },
  },
  accroche: {
    fr: "Un bureau Linux complet, à vous, qui reste tel que vous l'avez laissé.",
    en: "A full Linux desktop of your own, left exactly as you left it.",
  },
  motsCles: {
    fr: ["bureau linux en ligne", "bureau virtuel persistant", "linux dans le navigateur", "poste de travail virtuel pme"],
    en: ["online linux desktop", "persistent virtual desktop", "linux in the browser", "virtual workstation for business"],
  },
  corps: {
    fr: [
      {
        titre: "Un vrai bureau Linux, dans une fenêtre",
        paragraphes: [
          "Le Bac à sable ouvre, dans une fenêtre de Cloud OS, un bureau Linux complet : un environnement XFCE avec son gestionnaire de fichiers, un terminal et la suite LibreOffice (texte, tableur, présentation). C'est un poste de travail entier, pas une application isolée.",
          "Il sert là où les applications de Cloud OS ne suffisent pas : essayer un outil en ligne de commande, garder un environnement de travail monté pour un projet, ou disposer d'un bureau Linux sans en installer un.",
        ],
      },
      {
        titre: "Il reste tel que vous l'avez laissé",
        paragraphes: [
          "La plupart des logiciels de bureau de Cloud OS tournent en session temporaire. Le Bac à sable, non : c'est toujours le même bureau qui vous attend. Vos réglages, vos favoris et vos téléchargements sont conservés d'une visite à l'autre.",
        ],
        points: [
          "Premier démarrage en une trentaine de secondes, puis réouverture quasi instantanée.",
          "Un bureau par utilisateur, qui n'est partagé avec personne.",
          "Vos données sont hébergées au Québec.",
        ],
      },
      {
        titre: "Relié à vos Fichiers",
        paragraphes: [
          "Le dossier « Stockage » du Bac à sable se synchronise avec un dossier « Bureau persistant » de l'application Fichiers, sous-dossiers compris. Ce que vous y déposez depuis Cloud OS apparaît dans le bureau à son ouverture ; ce que vous y enregistrez dans le bureau revient dans Fichiers à sa fermeture, ou quand vous le demandez.",
        ],
      },
      {
        titre: "Compris dans le forfait Entreprise",
        paragraphes: [
          "Le Bac à sable fait partie du forfait Entreprise, avec l'hébergement Web et la création d'équipe. Il s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
        ],
      },
    ],
    en: [
      {
        titre: "A real Linux desktop, in a window",
        paragraphes: [
          "The Sandbox opens a full Linux desktop in a Cloud OS window: an XFCE environment with its file manager, a terminal and the LibreOffice suite (documents, spreadsheets, slides). It is a whole workstation, not a single app.",
          "It covers what the Cloud OS apps do not: trying out a command-line tool, keeping a working environment set up for a project, or having a Linux desktop without installing one.",
        ],
      },
      {
        titre: "It stays the way you left it",
        paragraphes: [
          "Most desktop software in Cloud OS runs in a temporary session. Not the Sandbox: the same desktop is always waiting for you. Your settings, bookmarks and downloads are kept from one visit to the next.",
        ],
        points: [
          "First start in about thirty seconds, then near-instant reopening.",
          "One desktop per user, shared with no one.",
          "Your data is hosted in Québec.",
        ],
      },
      {
        titre: "Connected to your Files",
        paragraphes: [
          "The Sandbox's “Stockage” (storage) folder syncs with a “Bureau persistant” folder in the Files app, subfolders included. What you drop there from Cloud OS shows up in the desktop when it opens; what you save there in the desktop goes back to Files when it closes, or whenever you ask.",
        ],
      },
      {
        titre: "Included in the Business plan",
        paragraphes: [
          "The Sandbox is part of the Business plan, along with web hosting and team creation. It is used from a computer; it is not offered on phones.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Quelle différence avec les autres logiciels de bureau de Cloud OS ?",
        reponse: "Les logiciels comme GIMP ou FreeCAD s'ouvrent dans une session temporaire : ce qui n'est pas renvoyé dans Fichiers disparaît à la fermeture. Le Bac à sable est un bureau entier qui vous est réservé et qui conserve sa configuration d'une visite à l'autre.",
      },
      {
        question: "Mes fichiers sont-ils conservés si je ferme le Bac à sable ?",
        reponse: "Oui. Le dossier personnel du bureau est conservé entre vos visites, et son dossier « Stockage » est en plus synchronisé avec vos Fichiers dans Cloud OS.",
      },
      {
        question: "Quel forfait faut-il pour utiliser le Bac à sable ?",
        reponse: "Le forfait Entreprise. Il n'est pas compris dans les autres forfaits, qui donnent accès au reste des applications et des logiciels de bureau.",
      },
    ],
    en: [
      {
        question: "How is it different from the other desktop software in Cloud OS?",
        reponse: "Software such as GIMP or FreeCAD opens in a temporary session: anything not sent back to Files is gone when it closes. The Sandbox is a whole desktop reserved for you, and it keeps its configuration from one visit to the next.",
      },
      {
        question: "Are my files kept if I close the Sandbox?",
        reponse: "Yes. The desktop's home folder is kept between visits, and its “Stockage” folder is also synced with your Files in Cloud OS.",
      },
      {
        question: "Which plan do I need for the Sandbox?",
        reponse: "The Business plan. It is not part of the other plans, which give access to the rest of the apps and desktop software.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/bac-a-sable/bac-a-sable-bureau.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "Le Bac à sable dans Cloud OS : un bureau Linux avec LibreOffice Calc et un terminal ouverts sur le dossier Stockage",
        en: "The Sandbox in Cloud OS: a Linux desktop with LibreOffice Calc and a terminal open on the Stockage folder",
      },
    },
  ],
  voisines: ["agent-de-code", "writer", "freecad"],
  articles: [],
};
