import type { FicheApplication } from "../types";

/**
 * Marketplace — ÉBAUCHE, à relire avant publication.
 *
 * ATTENTION au nom : ce n'est PAS une boutique d'applications ni une place de marché où l'on achète
 * quoi que ce soit. C'est un « marché de conteneurs » (libellé de /fonctions) : un chat IA qui propose
 * une pile de conteneurs Docker (docker-compose) à partir d'une description en langage courant, la
 * lance en conteneurs éphémères et la maintient (src/components/os/apps/marketplace/marketplace-app.tsx,
 * src/lib/marketplace/). La fiche le dit dès le premier paragraphe, et le slug suit le besoin.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Deux modes dans le chat : « Concevoir » (l'IA propose et explique une pile, carte « Installer cette
 *   pile ») et « Gérer » (redémarrer, arrêter, voir les journaux en langage courant, l'IA agit après
 *   confirmation : carte « Confirmer cette action ? ») (fr.json, marketplace.*).
 * - L'IA ne peut utiliser QUE des images indexées : images officielles de Docker Hub (`library/`) et
 *   les éditeurs bitnami et linuxserver (index-dockerhub.ts) ; la proposition est revalidée côté
 *   serveur contre cette liste (compose-validate.ts). Tags stables seulement (constants.ts). Au plus
 *   6 services (MAX_SERVICES), volumes nommés seulement, plafonds de mémoire, CPU et processus.
 * - Panneau de pile : services, « Ouvrir » (service web, nouvel onglet), « Ouvrir le bureau » (image de
 *   bureau, dans une fenêtre de Cloud OS), journaux en direct, terminal dans le conteneur (nouvel
 *   onglet), Redémarrer, Arrêter, Modifier (retour au chat), Exporter (docker-compose.yml), Supprimer.
 * - Pile éphémère : « Pile éphémère — expire le {date} » ; TTL MARKETPLACE_TTL_HOURS, 2 h par défaut
 *   (constants.ts : « pour essayer, pas pour héberger »). La fiche renvoie vers Hébergement Web.
 * - Onglet « Mes conteneurs » : les conteneurs qu'un administrateur vous a assignés, avec démarrer,
 *   arrêter, redémarrer, journaux et terminal (my-containers-app.tsx, fr.json myContainers.*).
 * - Forfait : `personnel` (GET /api/v1/apps/catalog).
 *
 * À vérifier à la relecture :
 * - Chaque lancement de pile est facturé en crédits (chargeForJob « MARKETPLACE », stack-core.ts) :
 *   la fiche ne dit ni « gratuit » ni « sans supplément ».
 * - L'interface du chat tutoie l'utilisateur (« Décris ton projet ») ; la fiche vouvoie, comme le site.
 * - « Docker » est une marque de Docker, Inc. : employée ici seulement pour désigner le format des
 *   images et du fichier exporté. Titre SEO et mots-clés à valider sous cet angle.
 * - Durée exacte d'une pile en production (variable d'environnement) : non chiffrée dans la fiche.
 */
export const marketplace: FicheApplication = {
  id: "marketplace",
  apps: ["marketplace"],
  slug: { fr: "conteneurs-docker", en: "docker-containers" },
  nom: { fr: "Marketplace", en: "Marketplace" },
  titre: {
    fr: "Marketplace : décrivez votre projet, l'IA monte les conteneurs",
    en: "Marketplace: describe your project, the AI sets up the containers",
  },
  groupe: "developpement",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Conteneurs Docker proposés et lancés par l'IA — Cloud OS",
      en: "Docker containers designed and launched by AI — Cloud OS",
    },
    description: {
      fr: "Décrivez ce qu'il vous faut : l'IA propose une pile de conteneurs, vous l'explique simplement, la démarre et la gère. Sans ligne de commande.",
      en: "Describe what you need: the AI proposes a stack of containers, explains it in plain terms, starts it and manages it. No command line needed.",
    },
  },
  accroche: {
    fr: "Une pile de conteneurs, proposée et lancée à partir d'une simple description.",
    en: "A container stack, proposed and launched from a plain description.",
  },
  motsCles: {
    fr: ["docker compose généré par ia", "déployer des conteneurs sans ligne de commande", "essayer un logiciel open source", "conteneurs docker en ligne"],
    en: ["ai-generated docker compose", "deploy containers without command line", "try open-source software", "online docker containers"],
  },
  corps: {
    fr: [
      {
        titre: "Décrivez le projet, l'IA propose la pile",
        paragraphes: [
          "Malgré son nom, la Marketplace n'est pas une boutique : c'est un atelier de conteneurs. Vous décrivez en langage courant ce qu'il vous faut, par exemple « un site WordPress avec sa base de données » ou « une base PostgreSQL avec une interface pour la gérer ». L'IA propose un assemblage de conteneurs, vous l'explique sans jargon, et l'installe quand vous cliquez sur « Installer cette pile ».",
          "Vous pouvez ensuite la gérer de la même façon, en mode « Gérer » : « redémarre la base », « arrête tout », « montre les journaux ». L'IA n'agit qu'après votre confirmation.",
        ],
      },
      {
        titre: "Des images connues, et des garde-fous",
        paragraphes: [
          "L'IA ne choisit que parmi un catalogue d'images indexées : les images officielles de Docker Hub et celles des éditeurs Bitnami et LinuxServer.io, en versions stables. Chaque proposition est revérifiée par Cloud OS avant d'être lancée.",
        ],
        points: [
          "Jusqu'à six services par pile, avec des plafonds de mémoire et de processeur.",
          "Un panneau pour chaque pile : services, journaux en direct, terminal dans un conteneur, redémarrage et arrêt.",
          "Le fichier docker-compose.yml s'exporte, pour reprendre la pile ailleurs.",
        ],
      },
      {
        titre: "Pour essayer, pas pour héberger",
        paragraphes: [
          "Une pile de la Marketplace est éphémère : elle s'arrête d'elle-même à l'échéance affichée dans son panneau. C'est l'endroit pour essayer un logiciel libre, monter une maquette ou apprendre Docker sans rien installer. Pour un site qui doit rester en ligne, voyez l'Hébergement Web.",
          "L'onglet « Mes conteneurs » réunit en plus les conteneurs qu'un administrateur vous a confiés, avec leurs journaux et un terminal.",
        ],
      },
    ],
    en: [
      {
        titre: "Describe the project, the AI proposes the stack",
        paragraphes: [
          "Despite its name, the Marketplace is not a store: it is a container workshop. You describe what you need in plain language, for example “a WordPress site with its database” or “a PostgreSQL database with an interface to manage it”. The AI proposes a set of containers, explains it without jargon, and installs it when you click “Install this stack”.",
          "You can then manage it the same way, in “Manage” mode: “restart the database”, “stop everything”, “show the logs”. The AI only acts once you confirm.",
        ],
      },
      {
        titre: "Well-known images, and guardrails",
        paragraphes: [
          "The AI only picks from a catalogue of indexed images: official Docker Hub images and those from the Bitnami and LinuxServer.io publishers, in stable versions. Every proposal is checked again by Cloud OS before it is launched.",
        ],
        points: [
          "Up to six services per stack, with memory and CPU caps.",
          "A panel for each stack: services, live logs, a terminal inside a container, restart and stop.",
          "The docker-compose.yml file can be exported, to run the stack elsewhere.",
        ],
      },
      {
        titre: "For trying out, not for hosting",
        paragraphes: [
          "A Marketplace stack is ephemeral: it stops on its own at the expiry time shown in its panel. It is the place to try out open-source software, build a mock-up or learn Docker with nothing to install. For a site that must stay online, see Web Hosting.",
          "The “My containers” tab also gathers the containers an administrator has entrusted to you, with their logs and a terminal.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "La Marketplace vend-elle des applications ?",
        reponse: "Non. Rien ne s'y achète : c'est un outil qui propose, lance et gère des piles de conteneurs à partir de votre description.",
      },
      {
        question: "Faut-il connaître Docker ?",
        reponse: "Non. L'IA vous explique en mots simples ce qu'elle propose, et vous la pilotez en langage courant. Si vous connaissez Docker, vous pouvez exporter le docker-compose.yml de la pile.",
      },
      {
        question: "Combien de temps une pile reste-t-elle en marche ?",
        reponse: "Une pile est éphémère : son panneau affiche l'heure à laquelle elle s'arrêtera d'elle-même. Pour un site permanent, utilisez l'Hébergement Web.",
      },
      {
        question: "Puis-je utiliser n'importe quelle image Docker ?",
        reponse: "Non. L'IA choisit parmi un catalogue d'images indexées : les images officielles de Docker Hub et celles de Bitnami et LinuxServer.io. C'est ce qui permet de revérifier chaque pile avant de la lancer.",
      },
    ],
    en: [
      {
        question: "Does the Marketplace sell apps?",
        reponse: "No. Nothing is bought there: it is a tool that proposes, launches and manages container stacks from your description.",
      },
      {
        question: "Do I need to know Docker?",
        reponse: "No. The AI explains what it proposes in simple words, and you drive it in plain language. If you know Docker, you can export the stack's docker-compose.yml.",
      },
      {
        question: "How long does a stack keep running?",
        reponse: "A stack is ephemeral: its panel shows when it will stop on its own. For a permanent site, use Web Hosting.",
      },
      {
        question: "Can I use any Docker image?",
        reponse: "No. The AI picks from a catalogue of indexed images: official Docker Hub images and those from Bitnami and LinuxServer.io. That is what makes it possible to check every stack before launching it.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/marketplace/marketplace-conception.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "Marketplace dans Cloud OS : l'IA propose une pile de conteneurs pour un projet décrit en français",
        en: "Marketplace in Cloud OS: the AI proposes a container stack for a project described in plain language",
      },
    },
  ],
  voisines: ["hebergement-web", "bac-a-sable", "agent-de-code"],
  articles: [],
};
