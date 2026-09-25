import type { FicheApplication } from "../types";

/**
 * Agent de code — ÉBAUCHE, à relire avant publication.
 *
 * Faits : /fonctions (déjà relue) — vos dépôts Git, un plan de codage, une boucle interactive
 * asynchrone, un environnement isolé avec les outils MCP activés par défaut. Vu dans l'app le
 * 2026-09-25 : projets avec ou sans dépôt Git (GitLab, Forgejo/Gitea, GitHub, jeton personnel
 * chiffré), modes Discussion / Codage / Plan, onglets Éditeur, Terminal, Navigateur, Jupyter,
 * Changements, Statut Git, bouton « Ouvrir VS Code », serveurs MCP distants.
 */
export const agentDeCode: FicheApplication = {
  id: "agent-de-code",
  apps: ["coding"],
  slug: { fr: "agent-de-code", en: "coding-agent" },
  nom: { fr: "Agent de code", en: "Coding agent" },
  titre: {
    fr: "Un agent de code qui travaille dans un sandbox isolé",
    en: "A coding agent that works in an isolated sandbox",
  },
  groupe: "developpement",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Agent de code IA dans un sandbox isolé, avec Git — Cloud OS",
      en: "AI coding agent in an isolated sandbox, with Git — Cloud OS",
    },
    description: {
      fr: "Décrivez la tâche : l'agent lit, modifie, exécute et committe votre code dans un sandbox isolé, relié à vos dépôts GitLab, GitHub ou Gitea.",
      en: "Describe the task: the agent reads, edits, runs and commits your code in an isolated sandbox, connected to your GitLab, GitHub or Gitea repositories.",
    },
  },
  accroche: {
    fr: "Décrivez la tâche : l'agent écrit, exécute et committe le code.",
    en: "Describe the task: the agent writes, runs and commits the code.",
  },
  motsCles: {
    fr: ["agent de code ia", "assistant de programmation", "sandbox de développement", "agent ia git"],
    en: ["ai coding agent", "programming assistant", "development sandbox", "ai agent git"],
  },
  corps: {
    fr: [
      {
        titre: "Il fait le travail, pas seulement des suggestions",
        paragraphes: [
          "Vous écrivez ce qu'il faut faire, en langage courant. L'agent lit les fichiers du projet, les modifie, exécute les commandes et vous rend compte de ce qu'il a fait. Pour une tâche plus longue, il prépare d'abord un plan de codage, que vous validez, puis il l'exécute étape par étape.",
        ],
      },
      {
        titre: "Un environnement isolé, avec vos outils",
        paragraphes: [
          "Chaque session tourne dans un sandbox isolé. Vous y retrouvez un éditeur, un terminal, un navigateur et Jupyter, et vous pouvez ouvrir le projet dans VS Code. Les outils MCP sont activés par défaut, et vous pouvez y connecter vos propres serveurs MCP.",
        ],
      },
      {
        titre: "Relié à vos dépôts Git",
        paragraphes: [
          "Un projet peut vivre sans dépôt, ou être rattaché à GitLab, GitHub ou Forgejo/Gitea par un jeton d'accès personnel, chiffré et jamais réaffiché. L'agent committe dans vos branches, et l'onglet « Changements » montre exactement ce qu'il a modifié.",
        ],
      },
    ],
    en: [
      {
        titre: "It does the work, not just suggestions",
        paragraphes: [
          "You write what needs doing, in plain language. The agent reads the project files, edits them, runs the commands and reports on what it did. For a longer task, it first prepares a coding plan, which you approve, then carries it out step by step.",
        ],
      },
      {
        titre: "An isolated environment, with your tools",
        paragraphes: [
          "Each session runs in an isolated sandbox. You get an editor, a terminal, a browser and Jupyter, and you can open the project in VS Code. MCP tools are enabled by default, and you can connect your own MCP servers.",
        ],
      },
      {
        titre: "Connected to your Git repositories",
        paragraphes: [
          "A project can live without a repository, or be linked to GitLab, GitHub or Forgejo/Gitea with a personal access token, encrypted and never shown again. The agent commits to your branches, and the “Changes” tab shows exactly what it modified.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Faut-il un dépôt Git pour utiliser l'agent ?",
        reponse: "Non. Un projet peut exister sans dépôt ; vous le rattachez à GitLab, GitHub ou Forgejo/Gitea quand vous le souhaitez.",
      },
      {
        question: "Où le code s'exécute-t-il ?",
        reponse: "Dans un sandbox isolé propre à la session, pas sur votre ordinateur.",
      },
      {
        question: "Puis-je reprendre la main sur le code ?",
        reponse: "Oui. L'éditeur, le terminal et VS Code restent à votre disposition dans la même session, et l'onglet « Changements » montre chaque modification de l'agent.",
      },
    ],
    en: [
      {
        question: "Do I need a Git repository to use the agent?",
        reponse: "No. A project can exist without a repository; you link it to GitLab, GitHub or Forgejo/Gitea whenever you want.",
      },
      {
        question: "Where does the code run?",
        reponse: "In an isolated sandbox dedicated to the session, not on your computer.",
      },
      {
        question: "Can I take over the code myself?",
        reponse: "Yes. The editor, the terminal and VS Code remain available in the same session, and the “Changes” tab shows every change the agent made.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/agent-de-code/agent-de-code-session.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "Une session de l'Agent de code : l'agent a écrit et exécuté un script d'analyse de sondages",
        en: "A coding agent session: the agent wrote and ran a drillhole analysis script",
      },
    },
  ],
  voisines: ["freecad", "forages-3d"],
  articles: [],
};
