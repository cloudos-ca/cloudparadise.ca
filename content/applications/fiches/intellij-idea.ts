import type { FicheApplication } from "../types";

/**
 * IntelliJ IDEA Community — ÉBAUCHE, à relire avant publication.
 *
 * LICENCE — le verdict « publiable » dépend de l'image. `linuxserver/intellij-idea` installe le paquet
 * Arch `intellij-idea-community-edition` (2026.2.3 au 2026-09-25), qu'Arch compile depuis le code
 * source ouvert de JetBrains (github.com/JetBrains/intellij-community), sous licence Apache-2.0 : aucune
 * restriction d'usage hébergé. Ce n'est NI la distribution unifiée NI l'édition Ultimate de JetBrains,
 * qui relèvent de leurs conditions commerciales. Si l'image passait un jour au binaire unifié de
 * JetBrains, cette fiche et l'offre elle-même seraient à reprendre (relire le Dockerfile de
 * github.com/linuxserver/docker-intellij-idea à chaque mise à jour majeure).
 *
 * Marque : « IntelliJ IDEA » et « JetBrains » sont des marques de JetBrains, employées seulement pour
 * désigner le logiciel ; aucun logo, aucune affiliation suggérée (question dédiée dans la FAQ). Aucune
 * fonction Ultimate citée (pas de Spring, frameworks web, bases de données, profileur).
 *
 * Faits vérifiés le 2026-09-25 :
 * - Image `linuxserver/intellij-idea` (src/lib/marketplace/desktop-apps-catalog.ts), fenêtre du
 *   bureau, ordinateur seulement (`desktopOnly`, app-registry.tsx).
 * - Le paquet Arch dépend de `java-environment-openjdk=21` : un JDK OpenJDK 21 est installé avec
 *   l'IDE (archlinux.org/packages).
 * - PAS d'`openCmd` (IDE : on ouvre un projet, pas un fichier) : l'import depuis Fichiers dépose les
 *   fichiers dans ~/Stockage sans les ouvrir. Le renvoi vers Fichiers n'est PAS récursif
 *   (listStorageFiles) : un projet Maven/Gradle, fait de sous-dossiers, ne revient pas tel quel. D'où
 *   le passage sur Git.
 * - Session temporaire (RAM), démontée à la fermeture.
 * - Forfait : `personnel` (GET /api/v1/apps/catalog).
 *
 * À vérifier à la relecture :
 * - Git présent dans l'image : il figure dans les paquets de l'étape finale de
 *   linuxserver/docker-baseimage-selkies (branche arch), mais pas essayé ; accès réseau sortant
 *   (clone/push, téléchargement des dépendances Maven/Gradle) pas essayé non plus.
 * - Ouvrir le logiciel débite l'enveloppe (chargeForJob « MARKETPLACE ») : pas de « sans supplément ».
 */
export const intellijIdea: FicheApplication = {
  id: "intellij-idea",
  apps: ["desktop-intellij-idea"],
  slug: { fr: "intellij-idea", en: "intellij-idea" },
  nom: { fr: "IntelliJ IDEA Community", en: "IntelliJ IDEA Community" },
  tiers: {
    editeur: "JetBrains (édition Community, compilée par Arch Linux)",
    licence: "Apache-2.0",
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
      fr: "Programmez en Java et en Kotlin avec l'édition libre d'IntelliJ IDEA, dans le navigateur : JDK déjà installé, rien sur votre poste, hébergé au Québec.",
      en: "Write Java and Kotlin with the free, open-source edition of IntelliJ IDEA, right in your browser: JDK already installed, nothing on your computer.",
    },
  },
  accroche: {
    fr: "L'édition libre d'IntelliJ IDEA, avec un JDK déjà installé, dans votre navigateur.",
    en: "The open-source edition of IntelliJ IDEA, with a JDK already installed, in your browser.",
  },
  motsCles: {
    fr: ["intellij idea en ligne", "ide java en ligne", "intellij community", "intellij sans installation", "programmer en java dans le navigateur"],
    en: ["intellij idea online", "online java ide", "intellij community", "intellij without installing", "java in the browser"],
  },
  corps: {
    fr: [
      {
        titre: "L'édition libre d'IntelliJ IDEA",
        paragraphes: [
          "IntelliJ IDEA est un environnement de développement pour Java et Kotlin : complétion et analyse du code, refactorisation, débogueur, exécution des tests, projets Maven et Gradle. Cloud OS diffuse son édition libre (Community), compilée à partir du code source ouvert publié par JetBrains, sous licence Apache 2.0.",
          "Un JDK (OpenJDK 21) est installé avec l'IDE : vous créez un projet et le compilez tout de suite. Les fonctions réservées à l'édition payante de JetBrains ne font pas partie de cette édition.",
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
        ],
      },
    ],
    en: [
      {
        titre: "The open-source edition of IntelliJ IDEA",
        paragraphes: [
          "IntelliJ IDEA is a development environment for Java and Kotlin: code completion and analysis, refactoring, a debugger, test running, Maven and Gradle projects. Cloud OS runs its free, open-source edition (Community), built from the source code JetBrains publishes under the Apache 2.0 licence.",
          "A JDK (OpenJDK 21) is installed with the IDE: you create a project and build it right away. Features reserved for JetBrains' paid edition are not part of this edition.",
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
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Quelle édition d'IntelliJ IDEA est proposée ?",
        reponse: "L'édition libre (Community), compilée à partir du code source ouvert de JetBrains, sous licence Apache 2.0. Les fonctions de l'édition payante n'y sont pas.",
      },
      {
        question: "Cloud OS est-il lié à JetBrains ?",
        reponse: "Non. Cloud OS diffuse tel quel ce logiciel libre, compilé à partir de son code source ouvert. Cloud OS n'est ni affilié à JetBrains ni approuvé par JetBrains.",
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
        reponse: "The free, open-source edition (Community), built from JetBrains' open-source code under the Apache 2.0 licence. The paid edition's features are not included.",
      },
      {
        question: "Is Cloud OS connected to JetBrains?",
        reponse: "No. Cloud OS runs this open-source software as is, built from its public source code. Cloud OS is not affiliated with or endorsed by JetBrains.",
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
  captures: [],
  voisines: ["pycharm", "vscodium", "github-desktop", "agent-de-code"],
  articles: [],
};
