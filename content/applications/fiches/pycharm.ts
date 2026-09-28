import type { FicheApplication } from "../types";

/**
 * PyCharm Community — ÉBAUCHE, à relire avant publication.
 *
 * LICENCE — publication décidée par Maxime le 2026-09-28. L'image est bâtie par le produit pour arm64
 * (cloudparadise_hpc, infra/kasm-images/apps/pycharm/Dockerfile) : binaire Community 2025.2.6.2 téléchargé
 * chez JetBrains (download.jetbrains.com/python/pycharm-community-*.tar.gz), la dernière édition Community — JetBrains l'a fondue dans ses
 * produits unifiés, sous licence propriétaire, à partir de la 2025.3. Au lancement, ce binaire affiche
 * les « JetBrains Community Edition Terms » : code sous Apache 2.0, plus quelques plugins propriétaires
 * fournis gratuitement. D'où `tiers.licence`, et une fiche qui ne dit plus « compilée depuis les
 * sources » ni « logiciel libre » tout court. Ce n'est NI la distribution unifiée NI l'édition
 * Professional. Si l'image passait un jour au binaire unifié, la fiche et l'offre seraient à reprendre.
 *
 * Marque : « PyCharm » et « JetBrains » sont des marques de JetBrains, employées seulement pour
 * désigner le logiciel ; aucun logo, aucune affiliation suggérée (question dédiée dans la FAQ). Aucune
 * fonction Professional citée (pas de Django/Flask, bases de données, Jupyter, développement web).
 *
 * Faits vérifiés le 2026-09-25, image revue le 2026-09-28 :
 * - Image locale `pycharm` (imageLocale, src/lib/marketplace/desktop-apps-catalog.ts), fenêtre du bureau,
 *   ordinateur seulement (`desktopOnly`, app-registry.tsx).
 * - Python 3 (`python3`, `python3-venv`, `python3-pip`, paquets Debian) est installé avec l'IDE, et Git aussi.
 * - PAS d'`openCmd` (IDE : on ouvre un projet, pas un fichier) : l'import depuis Fichiers dépose les
 *   fichiers dans ~/Stockage sans les ouvrir. Le renvoi vers Fichiers n'est PAS récursif
 *   (listStorageFiles) : un projet avec sous-dossiers ne revient pas tel quel. D'où le passage sur Git.
 * - Session temporaire (RAM), démontée à la fermeture.
 * - Capture du 2026-09-28 (dev) : conditions JetBrains à accepter à chaque lancement (session neuve),
 *   puis « Data Sharing » (Don't Send). Python 3.13 posé d'office comme interpréteur du projet.
 *   Bulle, onglet « What's New » et bouton « Update Now » vers le PyCharm unifié (propriétaire, un mois
 *   de Pro) : la fiche dit de les ignorer.
 * - Forfait : `personnel` (GET /api/v1/apps/catalog).
 *
 * À vérifier à la relecture :
 * - Git installé dans l'image (Dockerfile) mais pas essayé ; accès réseau sortant
 *   (clone/push) pas essayé non plus.
 * - Ouvrir le logiciel débite l'enveloppe (chargeForJob « MARKETPLACE ») : pas de « sans supplément ».
 */
export const pycharm: FicheApplication = {
  id: "pycharm",
  apps: ["desktop-pycharm"],
  slug: { fr: "pycharm", en: "pycharm" },
  nom: { fr: "PyCharm Community", en: "PyCharm Community" },
  tiers: {
    editeur: "JetBrains (édition Community 2025.2)",
    licence: "Apache-2.0, avec les JetBrains Community Edition Terms",
    site: "https://github.com/JetBrains/intellij-community",
  },
  titre: {
    fr: "PyCharm Community en ligne, un IDE Python sans rien installer",
    en: "PyCharm Community online, a Python IDE with nothing to install",
  },
  groupe: "developpement",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "PyCharm Community en ligne : IDE Python — Cloud OS",
      en: "PyCharm Community online: Python IDE, no install — Cloud OS",
    },
    description: {
      fr: "Programmez en Python avec l'édition gratuite de PyCharm, directement dans le navigateur : Python déjà installé, rien sur votre poste, hébergé au Québec.",
      en: "Write Python with the free Community edition of PyCharm, right in your browser: Python already installed, nothing on your computer, hosted in Québec.",
    },
  },
  accroche: {
    fr: "L'édition gratuite de PyCharm, avec Python déjà installé, dans votre navigateur.",
    en: "The free Community edition of PyCharm, with Python already installed, in your browser.",
  },
  motsCles: {
    fr: ["pycharm en ligne", "ide python en ligne", "pycharm community", "pycharm sans installation", "programmer en python dans le navigateur"],
    en: ["pycharm online", "online python ide", "pycharm community", "pycharm without installing", "python in the browser"],
  },
  corps: {
    fr: [
      {
        titre: "L'édition gratuite de PyCharm",
        paragraphes: [
          "PyCharm est un environnement de développement Python : éditeur avec complétion et vérification du code, refactorisation, débogueur, exécution des tests, environnements virtuels. Cloud OS diffuse son édition gratuite (Community), dans sa dernière version, 2025.2 : son code est publié par JetBrains sous licence Apache 2.0.",
          "Python 3 est installé avec l'IDE : vous créez un projet et l'exécutez tout de suite, sans rien préparer. Les fonctions réservées à l'édition payante de JetBrains ne font pas partie de cette édition.",
        ],
      },
      {
        titre: "Votre code, dans Fichiers ou dans Git",
        paragraphes: [
          "Pour quelques scripts, envoyez-les depuis l'application Fichiers : ils arrivent dans le dossier « Stockage » de la session, où vous les ouvrez depuis PyCharm. Vous les renvoyez ensuite dans Fichiers, comme de nouveaux fichiers ; l'original n'est jamais écrasé.",
          "Seuls les fichiers placés directement dans « Stockage » sont renvoyés, pas ses sous-dossiers. Pour un projet complet, travaillez plutôt avec votre dépôt Git : clonez-le, puis poussez vos commits avant de fermer.",
        ],
      },
      {
        titre: "Ce qu'il faut savoir",
        paragraphes: [
          "La session de PyCharm est temporaire : ce qui n'est ni renvoyé dans Fichiers ni poussé dans votre dépôt disparaît à la fermeture, réglages et paquets installés compris. PyCharm s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
          "À chaque ouverture, PyCharm affiche les conditions d'utilisation de l'édition Community de JetBrains, à accepter pour continuer. L'IDE propose aussi de passer au PyCharm unifié de JetBrains : ce n'est pas l'édition diffusée par Cloud OS, ignorez ces invitations.",
        ],
      },
    ],
    en: [
      {
        titre: "The free Community edition of PyCharm",
        paragraphes: [
          "PyCharm is a Python development environment: an editor with code completion and inspections, refactoring, a debugger, test running, virtual environments. Cloud OS runs its free edition (Community), in its latest release, 2025.2: JetBrains publishes its code under the Apache 2.0 licence.",
          "Python 3 is installed with the IDE: you create a project and run it right away, with no setup. Features reserved for JetBrains' paid edition are not part of this edition.",
        ],
      },
      {
        titre: "Your code, in Files or in Git",
        paragraphes: [
          "For a few scripts, send them from the Files app: they land in the session's “Stockage” (storage) folder, where you open them from PyCharm. You then send them back to Files as new files; the original is never overwritten.",
          "Only files placed directly in “Stockage” are sent back, not its subfolders. For a full project, work with your Git repository instead: clone it, then push your commits before closing.",
        ],
      },
      {
        titre: "Good to know",
        paragraphes: [
          "A PyCharm session is temporary: anything neither sent back to Files nor pushed to your repository is gone when it closes, settings and installed packages included. PyCharm is used from a computer; it is not offered on phones.",
          "Each time it opens, PyCharm shows the JetBrains terms for the Community edition, which you accept to continue. The IDE also offers to move to JetBrains' unified PyCharm: that is not the edition Cloud OS provides, so ignore those prompts.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Quelle édition de PyCharm est proposée ?",
        reponse: "L'édition gratuite (Community) 2025.2, la dernière publiée par JetBrains, dont le code est sous licence Apache 2.0. Les fonctions de l'édition payante n'y sont pas.",
      },
      {
        question: "Cloud OS est-il lié à JetBrains ?",
        reponse: "Non. Cloud OS diffuse tel quel ce logiciel, dans la version gratuite distribuée par JetBrains. Cloud OS n'est ni affilié à JetBrains ni approuvé par JetBrains.",
      },
      {
        question: "Mon projet est-il conservé après la fermeture ?",
        reponse: "Seulement ce que vous avez renvoyé dans Fichiers ou poussé dans votre dépôt Git. La session est temporaire : le reste disparaît à sa fermeture.",
      },
      {
        question: "PyCharm Community est-il compris dans l'abonnement ?",
        reponse: "Oui, dès le forfait Personnel, comme les autres logiciels du bureau.",
      },
    ],
    en: [
      {
        question: "Which edition of PyCharm is offered?",
        reponse: "The free edition (Community) 2025.2, the last one JetBrains released, whose code is under the Apache 2.0 licence. The paid edition's features are not included.",
      },
      {
        question: "Is Cloud OS connected to JetBrains?",
        reponse: "No. Cloud OS runs this software as is, in the free version distributed by JetBrains. Cloud OS is not affiliated with or endorsed by JetBrains.",
      },
      {
        question: "Is my project kept after closing?",
        reponse: "Only what you sent back to Files or pushed to your Git repository. The session is temporary: everything else is gone when it closes.",
      },
      {
        question: "Is PyCharm Community included in the subscription?",
        reponse: "Yes, from the Personal plan, like the other desktop software.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/pycharm/pycharm-code.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "PyCharm Community dans Cloud OS : un script Python importé depuis Fichiers",
        en: "PyCharm Community in Cloud OS: a Python script imported from Files",
      },
    },
  ],
  voisines: ["intellij-idea", "vscodium", "agent-de-code"],
  articles: [],
};
