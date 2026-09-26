import type { FicheApplication } from "../types";

/**
 * Arcades — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Provenance : le feed officiel de GameMonetize (rss.gamemonetize.com), indexé périodiquement par le
 *   worker ; seuls les jeux servis depuis html5.gamemonetize.co sont acceptés
 *   (src/lib/arcades/feed.ts, index-feed.ts). Les jeux sont des documents HTML5 tiers affichés dans
 *   un iframe : aucun conteneur, rien de facturé (en-tête de src/lib/arcades/actions.ts).
 * - Nombre : 30 740 jeux uniques mesurés sur le feed le 2026-08-08 (feed.ts ; PR de mise en ligne).
 *   Les jeux retirés du feed sont masqués (`delistedAt`). La fiche dit « plus de 30 000 » plutôt
 *   que le chiffre exact.
 * - 8 538 jeux en format portrait (feed.ts ; 8 537 selon app-registry.tsx) : salle « Sur mobile ».
 *   Arcades est la seule app à iframe du registre qui n'est PAS `desktopOnly` (app-registry.tsx).
 * - 12 salles thématiques (src/lib/arcades/rooms.ts) : Nouveautés, Populaires, À deux, Arcade &
 *   rétro, Réflexion, Action & tir, Course, Sport, Créatif & cuisine, Détente, Sur mobile, .IO &
 *   aventure ; filtre par catégorie ; recherche plein texte ; favoris ; « Reprendre » (parties
 *   récentes) ; lecteur avec « Comment jouer » et plein écran (fr.json, arcades.*).
 * - Classement sur trois axes observés (parties jouées, jeux essayés, séries de jours), tous ou mon
 *   équipe, semaine / mois / depuis toujours ; aucun score, les jeux n'en transmettent pas
 *   (src/lib/arcades/leaderboard.ts, fr.json arcades.leaderboard.disclaimer).
 * - « Mon profil » : parties, jeux essayés, série, jours actifs, catégories, moments de jeu, jeux les
 *   plus relancés, et un portrait de joueur rédigé par l'IA à partir de 5 parties
 *   (player-stats.ts MIN_PLAYS_FOR_PORTRAIT, actions.ts).
 * - Publicité : mesuré sur 60 jeux, les messages émis étaient tous publicitaires (IMA, GPT…)
 *   (actions.ts, reportArcadeUnknownMessageAction). Les jeux GameMonetize sont financés par la pub :
 *   la fiche le dit.
 * - Forfait : `personnel` (GET /api/v1/apps/catalog, 2026-09-25).
 *
 * Volontairement absent de la fiche : l'enregistrement des parties (capture d'écran opt-in pour lire
 * un score, score-template.ts) — les libellés disent que le score n'existe que pour quelques jeux
 * dotés d'une « lecture dédiée » ; trop étroit et trop conditionnel pour une page de vente.
 *
 * À vérifier à la relecture :
 * - Le nombre de jeux réellement listés en production (ArcadeGame où hidden = false et delistedAt
 *   est nul) et que ARCADES_INDEX_ENABLED est bien posé dans le .env d'aws-cloudos : il l'avait été à
 *   la main sur l'ancien serveur (.10), rien dans infra/aws ne le montre depuis la migration. Sans
 *   lui la grille est vide.
 * - Le chiffre de la vitrine (« environ 30 700 », /fonctions) date du 2026-08-08.
 */
export const arcades: FicheApplication = {
  id: "arcades",
  apps: ["arcades"],
  slug: { fr: "jeux-en-ligne-gratuits", en: "free-online-games" },
  nom: { fr: "Arcades", en: "Arcades" },
  titre: {
    fr: "Arcades, des milliers de jeux en ligne gratuits",
    en: "Arcades, thousands of free online games",
  },
  groupe: "jeux",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Jeux en ligne gratuits, sans téléchargement — Cloud OS",
      en: "Free online games, no download needed — Cloud OS",
    },
    description: {
      fr: "Plus de 30 000 jeux HTML5 gratuits, rangés en salles, à lancer d'un clic depuis votre bureau en ligne, sur ordinateur comme sur téléphone.",
      en: "Over 30,000 free HTML5 games, sorted into themed rooms, launched in one click from your online desktop, on a computer or a phone, with nothing to install.",
    },
  },
  accroche: {
    fr: "Plus de 30 000 jeux HTML5, jouables tout de suite, sans rien décompter du forfait.",
    en: "Over 30,000 HTML5 games, playable right away, without counting against your plan.",
  },
  motsCles: {
    fr: ["jeux en ligne gratuits", "jeux html5", "jeux sans téléchargement", "jeux gratuits sur navigateur", "jeux sur mobile gratuits"],
    en: ["free online games", "html5 games", "games without downloading", "free browser games", "free mobile games"],
  },
  corps: {
    fr: [
      {
        titre: "Une salle d'arcade dans votre bureau",
        paragraphes: [
          "Arcades rassemble plus de 30 000 jeux HTML5 : course, réflexion, action, sport, jeux à deux, jeux de détente. Un clic sur une vignette ouvre le jeu dans sa propre fenêtre ; il démarre aussitôt, sans installation ni téléchargement.",
          "Les jeux sont rangés en douze salles, des Nouveautés aux Populaires en passant par Réflexion, Course ou Arcade et rétro. Une recherche par mot, un filtre par catégorie et vos favoris font le reste, et « Reprendre » ramène les derniers jeux lancés.",
        ],
      },
      {
        titre: "Sur ordinateur comme sur téléphone",
        paragraphes: [
          "Arcades fonctionne aussi au doigt. Plus de 8 000 jeux sont conçus en format vertical, pour le téléphone, et la salle « Sur mobile » les réunit. Sur ordinateur, le lecteur passe en plein écran et affiche les consignes du jeu.",
          "Jouer ne coûte rien : ces jeux s'exécutent dans votre navigateur, sans occuper de serveur, et ne sont donc pas décomptés de votre forfait.",
        ],
      },
      {
        titre: "Un classement honnête, et votre profil de joueur",
        paragraphes: [
          "Les jeux ne transmettent pas de score. Plutôt que d'en inventer, le classement mesure ce que Cloud OS observe vraiment : les parties jouées, les jeux essayés et les séries de jours consécutifs. Vous le consultez pour tout le monde ou pour votre équipe, à la semaine, au mois ou depuis le début.",
          "Votre profil réunit vos chiffres, vos catégories préférées, vos moments de jeu et vos jeux les plus relancés. Après quelques parties, l'IA vous en rédige un portrait de joueur.",
        ],
      },
      {
        titre: "D'où viennent les jeux",
        paragraphes: [
          "Les jeux viennent du catalogue de GameMonetize, un distributeur de jeux HTML5 : ce sont des jeux tiers, que Cloud OS ne crée ni ne modifie. Comme sur la plupart des sites de jeux gratuits, ils peuvent afficher de la publicité.",
        ],
      },
    ],
    en: [
      {
        titre: "An arcade on your desktop",
        paragraphes: [
          "Arcades brings together over 30,000 HTML5 games: racing, puzzles, action, sports, two-player and casual games. One click on a thumbnail opens the game in its own window; it starts right away, with nothing to install or download.",
          "The games are sorted into twelve rooms, from New arrivals and Most played to Brain teasers, Racing or Arcade & retro. Keyword search, a category filter and your favourites do the rest, and “Jump back in” brings back the games you launched last.",
        ],
      },
      {
        titre: "On a computer or a phone",
        paragraphes: [
          "Arcades works by touch too. Over 8,000 games are designed in portrait format, for phones, and the “Made for mobile” room gathers them. On a computer, the player goes full screen and shows the game's instructions.",
          "Playing costs nothing: these games run in your browser, without taking up a server, so they do not count against your plan.",
        ],
      },
      {
        titre: "An honest leaderboard, and your player profile",
        paragraphes: [
          "The games do not report scores. Rather than make one up, the leaderboard measures what Cloud OS actually sees: games played, distinct games tried and streaks of consecutive days. You can view it for everyone or for your team, by week, by month or all-time.",
          "Your profile gathers your numbers, favourite categories, playing times and most-replayed games. After a few games, the AI writes you a player portrait.",
        ],
      },
      {
        titre: "Where the games come from",
        paragraphes: [
          "The games come from the catalogue of GameMonetize, an HTML5 game distributor: they are third-party games that Cloud OS neither makes nor modifies. As on most free game sites, they may show ads.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Les jeux d'Arcades sont-ils vraiment gratuits ?",
        reponse: "Oui. L'application est comprise dès le forfait Personnel, et les parties ne sont pas décomptées de votre forfait. Les jeux, fournis par un tiers, peuvent afficher de la publicité.",
      },
      {
        question: "Faut-il télécharger quelque chose ?",
        reponse: "Non. Chaque jeu s'ouvre dans une fenêtre du bureau en ligne et démarre aussitôt dans le navigateur.",
      },
      {
        question: "Peut-on jouer sur téléphone ?",
        reponse: "Oui. Arcades fonctionne au toucher, et la salle « Sur mobile » réunit les jeux conçus pour un écran vertical.",
      },
      {
        question: "Pourquoi le classement n'affiche-t-il pas de meilleur score ?",
        reponse: "Parce que les jeux ne transmettent pas leur score. Le classement porte sur ce qui se mesure vraiment : parties jouées, jeux essayés et jours consécutifs.",
      },
    ],
    en: [
      {
        question: "Are the Arcades games really free?",
        reponse: "Yes. The app is included from the Personal plan, and games do not count against your plan. The games, supplied by a third party, may show ads.",
      },
      {
        question: "Do I need to download anything?",
        reponse: "No. Each game opens in a window of your online desktop and starts right away in the browser.",
      },
      {
        question: "Can I play on a phone?",
        reponse: "Yes. Arcades works by touch, and the “Made for mobile” room gathers the games designed for a portrait screen.",
      },
      {
        question: "Why doesn't the leaderboard show a high score?",
        reponse: "Because the games do not report their score. The leaderboard covers what can actually be measured: games played, games tried and consecutive days.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/arcades/arcades-recherche.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "Arcades dans Cloud OS : une recherche de jeux de sudoku dans le catalogue",
        en: "Arcades in Cloud OS: searching the catalogue for sudoku games",
      },
    },
  ],
  voisines: ["jeux", "studio-de-jeux"],
  articles: [],
};
