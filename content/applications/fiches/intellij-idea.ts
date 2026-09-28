import type { FicheApplication } from "../types";

/**
 * IntelliJ IDEA Community — ÉBAUCHE, à relire avant publication.
 *
 * LICENCE — publication décidée par Maxime le 2026-09-28. L'image est bâtie par le produit pour arm64
 * (cloudparadise_hpc, infra/kasm-images/apps/intellij-idea/Dockerfile) : binaire Community 2025.2.6.3 téléchargé
 * chez JetBrains (download.jetbrains.com/idea/ideaIC-*.tar.gz), la dernière édition Community — JetBrains l'a fondue dans ses
 * produits unifiés, sous licence propriétaire, à partir de la 2025.3. Au lancement, ce binaire affiche
 * les « JetBrains Community Edition Terms » : code sous Apache 2.0, plus quelques plugins propriétaires
 * fournis gratuitement. D'où `tiers.licence`, et une fiche qui ne dit plus « compilée depuis les
 * sources » ni « logiciel libre » tout court. Ce n'est NI la distribution unifiée NI l'édition
 * Ultimate. Si l'image passait un jour au binaire unifié, la fiche et l'offre seraient à reprendre.
 *
 * Marque : « IntelliJ IDEA » et « JetBrains » sont des marques de JetBrains, employées seulement pour
 * désigner le logiciel ; aucun logo, aucune affiliation suggérée (question dédiée dans la FAQ). Aucune
 * fonction Ultimate citée (pas de Spring, frameworks web, bases de données, profileur).
 *
 * Faits vérifiés le 2026-09-25, image revue le 2026-09-28 :
 * - Image locale `intellij-idea` (imageLocale, src/lib/marketplace/desktop-apps-catalog.ts), fenêtre du bureau,
 *   ordinateur seulement (`desktopOnly`, app-registry.tsx).
 * - Un JDK OpenJDK 21 (paquet Debian `openjdk-21-jdk`) est installé avec l'IDE, et Git aussi.
 * - PAS d'`openCmd` (IDE : on ouvre un projet, pas un fichier) : l'import depuis Fichiers dépose les
 *   fichiers dans ~/Stockage sans les ouvrir. Le renvoi vers Fichiers n'est PAS récursif
 *   (listStorageFiles) : un projet Maven/Gradle, fait de sous-dossiers, ne revient pas tel quel. D'où
 *   le passage sur Git.
 * - Session temporaire (RAM), démontée à la fermeture.
 * - Capture du 2026-09-28 (dev) : conditions JetBrains à accepter à chaque lancement (session neuve),
 *   puis « Data Sharing » (Don't Send). L'OpenJDK 21 est DÉTECTÉ mais pas posé comme SDK du projet
 *   (« Project JDK is not defined » → Setup SDK) : la fiche le dit. Notifications « IntelliJ IDEA 2025.3
 *   available » et invitation à la version unifiée : la fiche dit de les ignorer.
 * - Forfait : `personnel` (GET /api/v1/apps/catalog).
 *
 * À vérifier à la relecture :
 * - Git installé dans l'image (Dockerfile) mais pas essayé ; accès réseau sortant
 *   (clone/push, téléchargement des dépendances Maven/Gradle) pas essayé non plus.
 * - Ouvrir le logiciel débite l'enveloppe (chargeForJob « MARKETPLACE ») : pas de « sans supplément ».
 */
export const intellijIdea: FicheApplication = {
  id: "intellij-idea",
  apps: ["desktop-intellij-idea"],
  slug: { fr: "intellij-idea", en: "intellij-idea" },
  nom: { fr: "IntelliJ IDEA Community", en: "IntelliJ IDEA Community" },
  tiers: {
    editeur: "JetBrains (édition Community 2025.2)",
    licence: "Apache-2.0, avec les JetBrains Community Edition Terms",
    site: "https://github.com/JetBrains/intellij-community",
  },
  titre: {
    fr: "IntelliJ IDEA Community en ligne, un IDE Java sans rien installer",
    en: "IntelliJ IDEA Community online, a Java IDE with nothing to install",
  },
  groupe: "developpement",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "IntelliJ IDEA Community en ligne : IDE Java — Cloud OS",
      en: "IntelliJ IDEA Community online: Java IDE — Cloud OS",
    },
    description: {
      fr: "Programmez en Java et en Kotlin avec l'édition gratuite d'IntelliJ IDEA, dans le navigateur : JDK déjà installé, rien sur votre poste, hébergé au Québec.",
      en: "Write Java and Kotlin with the free Community edition of IntelliJ IDEA, right in your browser: JDK already installed, nothing on your computer.",
    },
  },
  accroche: {
    fr: "L'édition gratuite d'IntelliJ IDEA, avec un JDK déjà installé, dans votre navigateur.",
    en: "The free Community edition of IntelliJ IDEA, with a JDK already installed, in your browser.",
  },
  motsCles: {
    fr: ["intellij idea en ligne", "ide java en ligne", "intellij community", "intellij sans installation", "programmer en java dans le navigateur"],
    en: ["intellij idea online", "online java ide", "intellij community", "intellij without installing", "java in the browser"],
  },
  corps: {
    fr: [
      {
        titre: "L'édition gratuite d'IntelliJ IDEA",
        paragraphes: [
          "IntelliJ IDEA est un environnement de développement pour Java et Kotlin : complétion et analyse du code, refactorisation, débogueur, exécution des tests, projets Maven et Gradle. Cloud OS diffuse son édition gratuite (Community), dans sa dernière version, 2025.2 : son code est publié par JetBrains sous licence Apache 2.0.",
          "Un JDK (OpenJDK 21) est installé avec l'IDE : IntelliJ IDEA le détecte, vous le choisissez comme SDK du projet et vous compilez. Les fonctions réservées à l'édition payante de JetBrains ne font pas partie de cette édition.",
        ],
      },
      {
        titre: "Votre code, dans Fichiers ou dans Git",
        paragraphes: [
          "Pour quelques fichiers, envoyez-les depuis l'application Fichiers : ils arrivent dans le dossier « Stockage » de la session, où vous les ouvrez depuis IntelliJ IDEA. Vous les renvoyez ensuite dans Fichiers, comme de nouveaux fichiers ; l'original n'est jamais écrasé.",
          "Seuls les fichiers placés directement dans « Stockage » sont renvoyés, pas ses sous-dossiers. Pour un projet complet, travaillez plutôt avec votre dépôt Git : clonez-le, puis poussez vos commits avant de fermer.",
        ],
      },
      {
        titre: "Ce qu'il faut savoir",
        paragraphes: [
          "La session d'IntelliJ IDEA est temporaire : ce qui n'est ni renvoyé dans Fichiers ni poussé dans votre dépôt disparaît à la fermeture, réglages et dépendances téléchargées compris. IntelliJ IDEA s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
          "À chaque ouverture, IntelliJ IDEA affiche les conditions d'utilisation de l'édition Community de JetBrains, à accepter pour continuer. L'IDE propose aussi de passer à la version unifiée de JetBrains : ce n'est pas l'édition diffusée par Cloud OS, ignorez ces invitations.",
        ],
      },
    ],
    en: [
      {
        titre: "The free Community edition of IntelliJ IDEA",
        paragraphes: [
          "IntelliJ IDEA is a development environment for Java and Kotlin: code completion and analysis, refactoring, a debugger, test running, Maven and Gradle projects. Cloud OS runs its free edition (Community), in its latest release, 2025.2: JetBrains publishes its code under the Apache 2.0 licence.",
          "A JDK (OpenJDK 21) is installed with the IDE: IntelliJ IDEA detects it, you pick it as the project SDK and you build. Features reserved for JetBrains' paid edition are not part of this edition.",
        ],
      },
      {
        titre: "Your code, in Files or in Git",
        paragraphes: [
          "For a few files, send them from the Files app: they land in the session's “Stockage” (storage) folder, where you open them from IntelliJ IDEA. You then send them back to Files as new files; the original is never overwritten.",
          "Only files placed directly in “Stockage” are sent back, not its subfolders. For a full project, work with your Git repository instead: clone it, then push your commits before closing.",
        ],
      },
      {
        titre: "Good to know",
        paragraphes: [
          "An IntelliJ IDEA session is temporary: anything neither sent back to Files nor pushed to your repository is gone when it closes, settings and downloaded dependencies included. IntelliJ IDEA is used from a computer; it is not offered on phones.",
          "Each time it opens, IntelliJ IDEA shows the JetBrains terms for the Community edition, which you accept to continue. The IDE also offers to move to JetBrains' unified version: that is not the edition Cloud OS provides, so ignore those prompts.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Quelle édition d'IntelliJ IDEA est proposée ?",
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
        question: "IntelliJ IDEA Community est-il compris dans l'abonnement ?",
        reponse: "Oui, dès le forfait Personnel, comme les autres logiciels du bureau.",
      },
    ],
    en: [
      {
        question: "Which edition of IntelliJ IDEA is offered?",
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
        question: "Is IntelliJ IDEA Community included in the subscription?",
        reponse: "Yes, from the Personal plan, like the other desktop software.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/intellij-idea/intellij-idea-code.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "IntelliJ IDEA Community dans Cloud OS : une classe Java importée depuis Fichiers",
        en: "IntelliJ IDEA Community in Cloud OS: a Java class imported from Files",
      },
    },
  ],
  voisines: ["pycharm", "vscodium", "github-desktop", "agent-de-code"],
  articles: [],
};
