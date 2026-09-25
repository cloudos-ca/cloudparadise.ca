import type { FicheApplication } from "../types";

/**
 * Studio de jeux — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Conversation avec l'IA « architecte » : elle propose des mécaniques, les explique simplement et,
 *   quand la conception tient debout, émet une spécification contrainte qui apparaît comme une carte
 *   « Construire ce jeu » (src/lib/game-studio/architect.ts, game-studio-app.tsx).
 * - Vocabulaire fermé (src/lib/game-studio/spec-validate.ts) : 8 genres (plateforme, casse-briques,
 *   serpent, tir spatial, labyrinthe, puzzle, course, survie), 16 mécaniques (saut, gravité, tir,
 *   vies, niveaux, minuterie, objets à ramasser, défilement…, 8 au plus par jeu), 10 entités au plus,
 *   commandes au clavier seulement (lettres, chiffres, flèches, Espace, Entrée, Échap).
 * - Compilation (src/lib/jobs/game-executor.ts, compilation-steps.tsx) : l'IA écrit le code en
 *   JavaScript sur Phaser 3 (moteur par défaut, `GameEngine @default(WEB_PHASER)`), l'agent le
 *   compile et l'éprouve dans un Chromium sans tête ; une correction automatique si le test échoue.
 *   Résultat : un document HTML autonome (2 Mio au plus). Étapes affichées : attribution d'un agent,
 *   génération des visuels, écriture du code, compilation et test dans un navigateur.
 * - Visuels : un sprite généré par IA par entité (hors décor) ; tout échec retombe sur des formes
 *   dessinées (game-executor.ts). La fiche le dit au conditionnel.
 * - Le jeu se joue dans une fenêtre, iframe sandbox sans allow-same-origin (game-player.tsx) ; une
 *   icône du jeu est posée sur le bureau à la première compilation réussie (desktop/game-icon.ts).
 * - Versions : chaque compilation en crée une ; revenir à une version antérieure est gratuit
 *   (core.ts revenirALaVersion). Archiver (réversible) et supprimer définitivement.
 * - La spécification est enregistrée comme fichier « <titre>.jeu.json » dans Fichiers (core.ts).
 * - Facturation : GAME_BUILD à chaque compilation et recompilation ; jouer et revenir en arrière ne
 *   coûtent rien (src/lib/billing/pricing.ts). /fonctions (relue) : « La compilation compte comme une
 *   tâche ; rejouer et revenir en arrière sont gratuits. » Repris tel quel.
 * - Gaté par la capacité `gamestudio.use`, donnée à tous les utilisateurs (permissions/capabilities.ts).
 * - Interface ET conversation en français seulement : aucun useTranslations dans
 *   src/components/os/apps/game-studio/, invite de l'architecte « Réponds d'abord en français
 *   simple ». La version anglaise de la fiche le dit.
 * - Pas `desktopOnly` (app-registry.tsx), mais les jeux se commandent au clavier : la fiche ne
 *   promet pas le téléphone.
 * - Forfait : `personnel` (GET /api/v1/apps/catalog, 2026-09-25).
 *
 * À vérifier à la relecture :
 * - Que l'agent gamedev et un nœud GAME tournent en production (aws-cloudos) : la PR des Arcades notait
 *   que le Studio « n'a pas été éprouvé en production ».
 * - Le bouton affiche encore « Construire ce jeu (1 crédit) » : libellé de l'ancien modèle à crédits.
 * - Les délais : « compte une à deux minutes » par réponse de l'IA (game-studio-app.tsx) ; l'écriture
 *   du code a été mesurée à 420 s sur le serveur d'inférence de dev. La fiche dit « quelques minutes ».
 */
export const studioDeJeux: FicheApplication = {
  id: "studio-de-jeux",
  apps: ["game-studio"],
  slug: { fr: "creer-un-jeu-avec-l-ia", en: "ai-game-maker" },
  nom: { fr: "Studio de jeux", en: "Game Studio" },
  titre: {
    fr: "Créer un jeu vidéo avec l'IA, sans écrire une ligne de code",
    en: "Make a video game with AI, without writing a line of code",
  },
  groupe: "jeux",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Créer un jeu vidéo avec l'IA, sans coder — Cloud OS",
      en: "Make a video game with AI, no coding needed — Cloud OS",
    },
    description: {
      fr: "Décrivez votre jeu en conversation : l'IA en propose les mécaniques, l'écrit sur Phaser 3, le compile et le teste avant de vous le livrer, prêt à jouer.",
      en: "Describe your game in a chat: the AI suggests the mechanics, writes it on Phaser 3, compiles and tests it, then hands it to you ready to play.",
    },
  },
  accroche: {
    fr: "Décrivez un jeu en quelques phrases ; l'IA le conçoit, l'écrit et le teste.",
    en: "Describe a game in a few sentences; the AI designs, writes and tests it.",
  },
  motsCles: {
    fr: ["créer un jeu vidéo avec l'ia", "créer un jeu sans coder", "générateur de jeux ia", "créer un jeu phaser"],
    en: ["make a game with ai", "create a game without coding", "ai game generator", "phaser game maker"],
  },
  corps: {
    fr: [
      {
        titre: "De l'idée au jeu jouable, en conversation",
        paragraphes: [
          "Vous décrivez le jeu que vous aimeriez : un serpent qui mange des pommes, un vaisseau qui esquive des astéroïdes, un personnage qui saute de plateforme en plateforme. L'IA vous répond simplement, suggère des mécaniques auxquelles vous n'aviez pas pensé et, quand l'idée tient debout, vous présente une proposition claire : genre, personnages, commandes, conditions de victoire et de défaite.",
          "Un clic sur « Construire ce jeu », et le studio se met au travail. Vous suivez les étapes à l'écran jusqu'au jeu prêt, qui s'ouvre dans sa propre fenêtre et reçoit son icône sur votre bureau.",
        ],
      },
      {
        titre: "Ce que le studio fabrique",
        paragraphes: [
          "Le studio produit de vrais petits jeux d'arcade en 2D, écrits en JavaScript sur le moteur Phaser 3 et livrés comme une page web autonome. Il vise ce qu'il sait réussir, plutôt que de promettre n'importe quel jeu.",
        ],
        points: [
          "Huit genres : plateforme, casse-briques, serpent, tir spatial, labyrinthe, puzzle, course et survie.",
          "Des mécaniques à combiner : saut et gravité, tir, vies, niveaux, minuterie, objets à ramasser, ennemis qui patrouillent ou vous poursuivent, défilement.",
          "Des commandes au clavier : flèches, lettres, Espace, Entrée.",
          "Les personnages peuvent recevoir une image générée par l'IA ; à défaut, ils sont dessinés en formes simples.",
        ],
      },
      {
        titre: "Testé avant de vous être livré",
        paragraphes: [
          "Chaque jeu est compilé puis lancé à blanc dans un navigateur avant de vous parvenir. Si ce test échoue, l'IA lit l'erreur et corrige son code une fois d'elle-même. Vous ne recevez pas un jeu qui ne démarre pas.",
          "Pour l'améliorer, vous le demandez dans la même conversation : plus d'ennemis, un niveau de plus, une minuterie. Chaque compilation crée une nouvelle version, et vous pouvez revenir à une version précédente à tout moment. La description du jeu est aussi enregistrée comme fichier dans Fichiers.",
        ],
      },
      {
        titre: "Ce qu'il faut savoir",
        paragraphes: [
          "Chaque compilation compte comme une tâche de votre forfait, qu'il s'agisse de la première ou d'une amélioration. Jouer à vos jeux et revenir à une version antérieure ne comptent pas. Une compilation prend quelques minutes, le temps que l'IA écrive le code et que le jeu soit testé.",
        ],
      },
    ],
    en: [
      {
        titre: "From idea to playable game, in a chat",
        paragraphes: [
          "You describe the game you would like: a snake that eats apples, a spaceship dodging asteroids, a character jumping from platform to platform. The AI answers in plain words, suggests mechanics you had not thought of and, once the idea holds together, presents a clear proposal: genre, characters, controls, how to win and how to lose.",
          "One click on “Construire ce jeu” (Build this game) and the studio gets to work. You follow the steps on screen until the game is ready; it opens in its own window and gets its own icon on your desktop.",
        ],
      },
      {
        titre: "What the studio makes",
        paragraphes: [
          "The studio produces real little 2D arcade games, written in JavaScript on the Phaser 3 engine and delivered as a self-contained web page. It aims for what it can do well, rather than promising any game at all.",
        ],
        points: [
          "Eight genres: platformer, brick breaker, snake, space shooter, maze, puzzle, racing and survival.",
          "Mechanics to combine: jumping and gravity, shooting, lives, levels, timer, items to collect, enemies that patrol or chase you, scrolling.",
          "Keyboard controls: arrows, letters, Space, Enter.",
          "Characters can get an AI-generated image; failing that, they are drawn as simple shapes.",
        ],
      },
      {
        titre: "Tested before it reaches you",
        paragraphes: [
          "Every game is compiled, then given a dry run in a browser before it reaches you. If that test fails, the AI reads the error and fixes its own code once. You do not get a game that will not start.",
          "To improve it, you ask in the same chat: more enemies, an extra level, a timer. Each build creates a new version, and you can go back to an earlier one at any time. The game's description is also saved as a file in Files.",
        ],
      },
      {
        titre: "Good to know",
        paragraphes: [
          "Each build counts as one task on your plan, whether it is the first one or an improvement. Playing your games and going back to an earlier version do not count. A build takes a few minutes, while the AI writes the code and the game is tested. The studio currently works in French only: its interface and the AI's replies are in French.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Faut-il savoir programmer ?",
        reponse: "Non. Vous décrivez le jeu en français courant ; l'IA en fait la conception, écrit le code et le teste. Vous n'avez jamais à toucher au code.",
      },
      {
        question: "Quels jeux peut-on créer ?",
        reponse: "Des jeux d'arcade en 2D, joués au clavier : plateforme, casse-briques, serpent, tir spatial, labyrinthe, puzzle, course ou survie. Le studio s'en tient à ce qu'il sait construire de façon fiable.",
      },
      {
        question: "Que se passe-t-il si le jeu ne fonctionne pas ?",
        reponse: "Chaque jeu est testé dans un navigateur avant d'être livré, et l'IA corrige elle-même une erreur détectée. Si la compilation échoue quand même, le studio vous l'indique ; vous pouvez reformuler et relancer.",
      },
      {
        question: "Qu'est-ce qui est décompté de mon forfait ?",
        reponse: "Seulement les compilations : chacune compte comme une tâche. Jouer, rejouer et revenir à une version précédente ne comptent pas.",
      },
    ],
    en: [
      {
        question: "Do I need to know how to code?",
        reponse: "No. You describe the game in everyday words; the AI designs it, writes the code and tests it. You never have to touch the code. Note that the studio currently talks to you in French.",
      },
      {
        question: "What kinds of games can I make?",
        reponse: "2D arcade games, played with the keyboard: platformer, brick breaker, snake, space shooter, maze, puzzle, racing or survival. The studio sticks to what it can build reliably.",
      },
      {
        question: "What if the game does not work?",
        reponse: "Every game is tested in a browser before delivery, and the AI fixes a detected error on its own. If the build still fails, the studio tells you; you can rephrase and try again.",
      },
      {
        question: "What counts against my plan?",
        reponse: "Only builds: each one counts as one task. Playing, replaying and going back to an earlier version do not count.",
      },
    ],
  },
  captures: [],
  voisines: ["arcades", "jeux", "agent-de-code"],
  articles: [],
};
