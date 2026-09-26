import type { FicheApplication } from "../types";

/**
 * Assistant — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Un assistant d'AIDE À L'USAGE de Cloud OS, et rien d'autre : sa consigne lui fait décliner toute
 *   question sans rapport avec la plateforme (GUARDRAILS, src/lib/assistant/system-prompt.ts ;
 *   commentaire du registre, app-registry.tsx).
 * - Il s'appuie sur la documentation intégrée : les articles les plus proches de la question sont
 *   retrouvés par similarité et joints à la demande (src/lib/assistant/retrieval.ts). Quand ils ne
 *   couvrent pas la question, sa consigne est de le dire et de renvoyer vers le soutien, plutôt que
 *   d'inventer.
 * - Outils : lister vos Plans, vos cédules à venir et vos équipes, ouvrir une fenêtre parmi une liste
 *   fermée d'apps (Fichiers, Cédules, Plans, Workflows, Paramètres, Équipes, Agenda, Courriel…), et
 *   annuler une tâche — seule action qui modifie quelque chose, TOUJOURS soumise à confirmation
 *   (src/lib/assistant/tools.ts, RISKY_TOOLS ; boutons « Confirmer » / « Refuser », fr.json).
 *   Il y a aussi un outil de solde de crédits : non cité (vocabulaire de l'ancien modèle).
 * - Un seul fil de conversation par utilisateur, conservé, avec un bouton « Effacer »
 *   (clearAssistantHistoryAction, src/lib/assistant/actions.ts).
 * - Sa consigne lui fait répondre EN FRANÇAIS (« Réponds en français ») : dit tel quel dans la FAQ
 *   anglaise.
 * - Forfait Personnel (GET /api/v1/apps/catalog : `plan: "personnel"`).
 *
 * Volontairement ABSENT de la fiche :
 * - Tout nom de modèle ou de fournisseur d'IA : les modèles sont choisis par configuration
 *   (variables AI_*, pool AiNode, src/lib/ai.ts, src/lib/ai-pool.ts) et peuvent changer sans
 *   déploiement.
 * - Où tournent les modèles : l'ancien serveur Amos a disparu avec la migration AWS, et le code ne
 *   permet pas de dire où le pool d'IA tourne aujourd'hui. Ne rien affirmer sur un hébergement des
 *   modèles au Québec tant que ce n'est pas vérifié en production.
 * - L'analyse d'image : elle existe côté serveur (sendImageMessage, service.ts) mais la fenêtre du
 *   bureau n'a pas de bouton pour joindre une image.
 *
 * À vérifier à la relecture :
 * - /fonctions (déjà relue) décrit l'Assistant ainsi : « Vous décrivez la tâche en langage courant ;
 *   il monte le plan et le lance. » Ce n'est PAS ce que fait l'app `assistant` : elle ne crée ni ne
 *   lance de Plan (elle peut seulement lister les Plans et annuler une tâche). La phrase de /fonctions
 *   décrit plutôt l'app Plans. Corrigé sur /fonctions le 2026-09-25.
 * - L'aperçu général injecté dans sa consigne parle encore de « crédits prépayés, 1 crédit = 1 $ »
 *   (PLATFORM_OVERVIEW, system-prompt.ts) : l'Assistant peut donc donner une information de
 *   facturation périmée. Corrigé dans le produit le 2026-09-25 (commit 5dcb1c3d).
 */
export const assistant: FicheApplication = {
  id: "assistant",
  apps: ["assistant"],
  slug: { fr: "assistant-ia", en: "ai-assistant" },
  nom: { fr: "Assistant", en: "Assistant" },
  titre: {
    fr: "L'Assistant, une aide IA pour prendre Cloud OS en main",
    en: "The Assistant, AI help to find your way around Cloud OS",
  },
  groupe: "bureau",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Assistant IA intégré pour apprendre Cloud OS — Cloud OS",
      en: "Built-in AI assistant to help you learn — Cloud OS",
    },
    description: {
      fr: "Posez vos questions sur Cloud OS en langage courant : l'Assistant répond à partir de la documentation, retrouve vos Plans et ouvre la bonne fenêtre.",
      en: "Ask questions about Cloud OS in plain language: the Assistant answers from the documentation, finds your Plans and opens the right window.",
    },
  },
  accroche: {
    fr: "Une question sur Cloud OS ? Posez-la comme à un collègue.",
    en: "A question about Cloud OS? Ask it as you would a colleague.",
  },
  motsCles: {
    fr: ["assistant ia intégré", "aide en ligne logiciel", "assistant virtuel pour pme", "prise en main cloud os"],
    en: ["built-in ai assistant", "in-app help assistant", "ai help for small business software", "getting started with cloud os"],
  },
  corps: {
    fr: [
      {
        titre: "L'aide de Cloud OS, en conversation",
        paragraphes: [
          "L'Assistant répond à vos questions sur l'utilisation de Cloud OS, dans une fenêtre de votre bureau : comment lancer un traitement, ranger vos fichiers, planifier une tâche récurrente, inviter quelqu'un dans une équipe. Vous écrivez comme vous parleriez à un collègue ; il répond de façon courte et concrète.",
          "Pour répondre, il s'appuie sur la documentation intégrée au bureau. Quand elle ne couvre pas votre question, il a pour consigne de le dire et de vous orienter vers le soutien, plutôt que d'inventer une réponse.",
        ],
      },
      {
        titre: "Il connaît votre bureau",
        paragraphes: [
          "L'Assistant ne se contente pas d'expliquer : il peut consulter une partie de votre compte pour vous répondre, et vous mener au bon endroit.",
        ],
        points: [
          "Retrouver vos Plans et leur statut, vos tâches planifiées à venir et vos équipes.",
          "Ouvrir pour vous la bonne fenêtre : Fichiers, Plans, Agenda, Paramètres, Courriel…",
          "Annuler une tâche en cours, seulement après votre confirmation.",
        ],
      },
      {
        titre: "Un assistant qui reste dans son rôle",
        paragraphes: [
          "L'Assistant est fait pour vous aider à utiliser Cloud OS, et seulement pour cela : il décline poliment les questions qui n'ont rien à voir avec la plateforme. Il ne modifie rien sans votre accord explicite, et vous gardez un seul fil de conversation, que vous pouvez effacer quand vous le voulez.",
          "L'Assistant est compris dès le forfait Personnel. Pour écrire ou modifier du code dans vos dépôts, c'est l'Agent de code qu'il vous faut : un autre outil, avec d'autres permissions.",
        ],
      },
    ],
    en: [
      {
        titre: "Cloud OS help, as a conversation",
        paragraphes: [
          "The Assistant answers your questions about using Cloud OS, in a window on your desktop: how to run a task, organize your files, schedule a recurring job, invite someone to a team. You write the way you would talk to a colleague; it answers briefly and to the point.",
          "To answer, it draws on the documentation built into the desktop. When that does not cover your question, it is instructed to say so and point you to support, rather than make up an answer.",
        ],
      },
      {
        titre: "It knows your desktop",
        paragraphes: [
          "The Assistant does more than explain: it can look up part of your account to answer you, and take you to the right place.",
        ],
        points: [
          "Find your Plans and their status, your upcoming scheduled tasks and your teams.",
          "Open the right window for you: Files, Plans, Calendar, Settings, Mail…",
          "Cancel a running task, only after you confirm.",
        ],
      },
      {
        titre: "An assistant that stays in its lane",
        paragraphes: [
          "The Assistant is there to help you use Cloud OS, and only that: it politely declines questions that have nothing to do with the platform. It changes nothing without your explicit approval, and you keep a single conversation thread that you can clear whenever you like.",
          "The Assistant is included from the Personal plan. To write or change code in your repositories, you want the Coding agent: a different tool, with different permissions.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "L'Assistant peut-il agir à ma place ?",
        reponse: "Très peu, et jamais sans vous. Il peut consulter vos Plans, vos tâches planifiées et vos équipes, et ouvrir une fenêtre. La seule action qui modifie quelque chose, annuler une tâche, attend toujours votre confirmation.",
      },
      {
        question: "Répond-il à des questions générales, hors de Cloud OS ?",
        reponse: "Non. Il est réservé à l'aide sur la plateforme et décline les autres sujets, pour rester fiable sur ce qu'il connaît.",
      },
      {
        question: "Quelle différence avec l'Agent de code ?",
        reponse: "L'Assistant répond à vos questions sur l'utilisation de Cloud OS. L'Agent de code, lui, travaille sur vos dépôts de code dans un environnement isolé. Ce sont deux applications distinctes.",
      },
    ],
    en: [
      {
        question: "Can the Assistant act on my behalf?",
        reponse: "Very little, and never without you. It can look up your Plans, scheduled tasks and teams, and open a window. The only action that changes anything, cancelling a task, always waits for your confirmation.",
      },
      {
        question: "Does it answer general questions, outside Cloud OS?",
        reponse: "No. It is limited to help with the platform and declines other topics, so that it stays reliable on what it knows. Note that it is currently set up to answer in French.",
      },
      {
        question: "How is it different from the Coding agent?",
        reponse: "The Assistant answers your questions about using Cloud OS. The Coding agent works on your code repositories in an isolated environment. They are two separate apps.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/assistant/assistant-reponse.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "L'Assistant de Cloud OS répond à une question sur l'utilisation du bureau",
        en: "The Cloud OS Assistant answering a question about using the desktop",
      },
    },
  ],
  voisines: ["agent-de-code", "fichiers", "equipes"],
  articles: [],
};
