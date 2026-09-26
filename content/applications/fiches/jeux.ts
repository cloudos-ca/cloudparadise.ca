import type { FicheApplication } from "../types";

/**
 * Jeux (les six jeux libres ou gratuits diffusés) — ÉBAUCHE, à relire avant publication.
 *
 * Une fiche pour six apps du produit. Pas de `tiers` : six projets, six licences ; ils sont cités un
 * par un dans la section « Six jeux, six projets ».
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Chaque jeu tourne dans son propre conteneur (bureau KasmVNC), diffusé dans une fenêtre de Cloud OS,
 *   un par partie (src/lib/games/docker.ts, src/components/os/apps/games/game-window.tsx).
 *   Ordinateur seulement (`desktopOnly` sur les six, app-registry.tsx).
 * - Démarrage annoncé « ~20-30 s » (games.starting, fr.json) ; bouton « Nouvelle partie » qui relance
 *   une session neuve (game-window.tsx).
 * - Aucune sauvegarde : pas de volume, « closing the window loses progress » (docker.ts) ; le conteneur
 *   est supprimé à la fermeture de la fenêtre (stopGameSessionAction) ou de l'onglet (beacon).
 * - Une session par joueur et par jeu (launchSession, actions.ts) : ouvrir un autre titre ne ferme pas
 *   le premier.
 * - Ce qui tourne, d'après les Dockerfile (infra/kasm-images/games-kasm/<jeu>/Dockerfile, paquets
 *   Ubuntu 24.04) : wesnoth ; freeciv-client-gtk3 + freeciv-server (partie locale, contre l'IA) ;
 *   pychess + gnuchess ; frozen-bubble ; supertux ; scummvm + Beneath a Steel Sky, version CD 1.2
 *   (« CD talkie », avec voix) téléchargée depuis downloads.scummvm.org.
 * - Chaque lancement est facturé : `chargeForJob(user, "GAMES")`, forfait de 0,5 par défaut
 *   (src/lib/billing/pricing.ts, réglable par l'admin, 0 = gratuit), prélevé sur l'enveloppe du
 *   forfait sous le modèle PLANS (billing/credits.ts). D'où la phrase « chaque partie lancée est
 *   décomptée de votre forfait » — sans chiffre.
 * - Forfait : `personnel` pour les six (GET /api/v1/apps/catalog, 2026-09-25).
 *
 * Licences vérifiées (fichiers copyright Debian, readme du jeu) :
 * - Battle for Wesnoth : GPL-2.0-or-later (projet Battle for Wesnoth, wesnoth.org). NB : le code xBRZ
 *   est en GPL-3, ce qui rend l'exécutable GPL-3 dans son ensemble ; le contenu récent est en
 *   CC-BY-SA-4.0. La fiche dit « GPL (v2 ou ultérieure) » pour le projet.
 * - Freeciv : GPL-2.0-or-later (The Freeciv project, freeciv.org).
 * - PyChess : GPL-3.0-or-later (pychess.github.io) ; moteur GNU Chess : GPL-3.0-or-later (projet GNU).
 * - Frozen Bubble : GPL-2.0-only (The Frozen-Bubble Team, frozen-bubble.org).
 * - SuperTux : GPL-3.0-or-later (SuperTux Team, supertux.org).
 * - Beneath a Steel Sky : © Revolution Software Ltd, freeware depuis 2003. Pas une licence SPDX : le
 *   readme de l'archive autorise la redistribution gratuite, y compris dans une collection logicielle
 *   commerciale, à condition de garder le readme et les mentions de copyright intacts et de citer
 *   l'auteur ; il interdit de faire payer le jeu lui-même (« You may not charge a fee for the game
 *   itself »). Moteur ScummVM : GPL-3.0-or-later.
 *
 * À vérifier à la relecture :
 * - Beneath a Steel Sky se lance sans débit depuis le 2026-09-25 (`sansDebit`, src/lib/games/catalog.ts,
 *   commit 5dcb1c3d du produit) : la licence interdit de « faire payer le jeu lui-même ». Le readme
 *   est bien conservé dans l'image (unzip complet), mais n'est pas visible par le joueur.
 * - Le prix GAMES réel en production (jobPrices de SystemConfig) : s'il vaut 0, retirer la phrase sur
 *   le décompte.
 * - Que l'hôte de sessions (aws-sessions) et les six images GAME_*_IMAGE sont bien en place en
 *   production.
 * - Wesnoth et Freeciv en réseau : non vérifié, donc la fiche ne parle que de parties contre l'IA.
 */
export const jeux: FicheApplication = {
  id: "jeux",
  apps: ["games-wesnoth", "games-freeciv", "games-chess", "games-frozen-bubble", "games-supertux", "games-steel-sky"],
  slug: { fr: "jeux-libres", en: "open-source-games" },
  nom: { fr: "Jeux", en: "Games" },
  titre: {
    fr: "Six jeux libres classiques, en ligne sans installation",
    en: "Six classic open-source games, online with nothing to install",
  },
  groupe: "jeux",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Wesnoth, Freeciv et jeux libres en ligne — Cloud OS",
      en: "Wesnoth, Freeciv and open-source games online — Cloud OS",
    },
    description: {
      fr: "Battle for Wesnoth, Freeciv, échecs, Frozen Bubble, SuperTux et Beneath a Steel Sky, joués dans le navigateur : rien à installer sur votre ordinateur.",
      en: "Battle for Wesnoth, Freeciv, chess, Frozen Bubble, SuperTux and Beneath a Steel Sky, played in your browser: nothing to install on your computer.",
    },
  },
  accroche: {
    fr: "Stratégie, échecs, plateforme, aventure : six jeux libres, dans une fenêtre du bureau.",
    en: "Strategy, chess, platformer, adventure: six open-source games, in a desktop window.",
  },
  motsCles: {
    fr: ["wesnoth en ligne", "freeciv en ligne", "jeux libres en ligne", "jeux sans installation", "beneath a steel sky en ligne"],
    en: ["wesnoth online", "freeciv online", "open source games online", "games without installing", "beneath a steel sky online"],
  },
  corps: {
    fr: [
      {
        titre: "Les vrais jeux, dans votre navigateur",
        paragraphes: [
          "Cloud OS fait tourner six jeux libres ou gratuits reconnus, chacun dans sa propre fenêtre du bureau en ligne. Ce ne sont pas des adaptations pour le web : c'est le jeu lui-même, lancé sur nos serveurs et diffusé dans votre navigateur.",
          "Rien à télécharger ni à installer sur votre ordinateur. Vous ouvrez le jeu depuis le bureau, il démarre en une vingtaine de secondes, et un bouton « Nouvelle partie » en relance une neuve quand vous le voulez.",
        ],
      },
      {
        titre: "Six jeux, six projets",
        paragraphes: [
          "Chaque jeu est un logiciel tiers, proposé tel quel. Cloud OS n'est affilié à aucun de ces projets.",
        ],
        points: [
          "Battle for Wesnoth : stratégie tactique au tour par tour, dans un univers de fantasy. Projet Battle for Wesnoth, licence GPL (v2 ou ultérieure).",
          "Freeciv : bâtir une civilisation au tour par tour, contre l'IA. Projet Freeciv, licence GPL (v2 ou ultérieure).",
          "Échecs : l'interface PyChess, contre le moteur GNU Chess. Tous deux sous licence GPL (v3 ou ultérieure).",
          "Frozen Bubble : le jeu de bulles à faire éclater. Équipe Frozen-Bubble, licence GPL v2.",
          "SuperTux : plateforme 2D, avec le manchot Tux. Équipe SuperTux, licence GPL (v3 ou ultérieure).",
          "Beneath a Steel Sky : aventure en pointer-cliquer de science-fiction, version CD avec voix. © Revolution Software, jeu gratuit (freeware) depuis 2003, joué avec le moteur libre ScummVM.",
        ],
      },
      {
        titre: "Ce qu'il faut savoir",
        paragraphes: [
          "Chaque partie est temporaire : quand vous fermez la fenêtre, la partie s'arrête et rien n'est conservé, pas même une sauvegarde faite dans le jeu. Les jeux se jouent depuis un ordinateur, au clavier et à la souris ; ils ne sont pas proposés sur téléphone.",
          "Chaque partie lancée est décomptée de votre forfait, puisqu'elle occupe un serveur le temps de jouer — sauf Beneath a Steel Sky, gratuit comme le veut sa licence. Vous pouvez avoir plusieurs jeux différents ouverts en même temps.",
        ],
      },
    ],
    en: [
      {
        titre: "The real games, in your browser",
        paragraphes: [
          "Cloud OS runs six well-known open-source or freeware games, each in its own window on your online desktop. They are not web adaptations: it is the game itself, running on our servers and streamed to your browser.",
          "Nothing to download or install on your computer. You open the game from the desktop, it starts in about twenty seconds, and a “New session” button starts a fresh one whenever you like.",
        ],
      },
      {
        titre: "Six games, six projects",
        paragraphes: [
          "Each game is third-party software, offered as is. Cloud OS is not affiliated with any of these projects.",
        ],
        points: [
          "Battle for Wesnoth: turn-based tactical strategy in a fantasy world. Battle for Wesnoth project, GPL licence (v2 or later).",
          "Freeciv: build a civilization turn by turn, against the AI. Freeciv project, GPL licence (v2 or later).",
          "Chess: the PyChess interface, against the GNU Chess engine. Both under the GPL (v3 or later).",
          "Frozen Bubble: the bubble-popping puzzle game. Frozen-Bubble Team, GPL v2 licence.",
          "SuperTux: a 2D platformer starring Tux the penguin. SuperTux Team, GPL licence (v3 or later).",
          "Beneath a Steel Sky: a science-fiction point-and-click adventure, CD version with speech. © Revolution Software, freeware since 2003, played with the open-source ScummVM engine.",
        ],
      },
      {
        titre: "Good to know",
        paragraphes: [
          "Each game session is temporary: when you close the window, the game stops and nothing is kept, not even a save made inside the game. The games are played from a computer, with keyboard and mouse; they are not offered on phones.",
          "Each game you launch counts against your plan, since it takes up a server while you play — except Beneath a Steel Sky, free as its licence requires. You can have several different games open at the same time.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Faut-il installer les jeux sur mon ordinateur ?",
        reponse: "Non. Les jeux tournent sur nos serveurs et s'affichent dans une fenêtre de votre bureau en ligne, depuis le navigateur. Il n'y a rien à installer.",
      },
      {
        question: "Mes parties sont-elles sauvegardées ?",
        reponse: "Non. Une partie dure le temps de la fenêtre : à sa fermeture, tout est effacé, sauvegardes du jeu comprises. Ces jeux se prêtent mieux à des parties d'une séance.",
      },
      {
        question: "Peut-on y jouer sur téléphone ?",
        reponse: "Non, ces six jeux sont réservés à l'ordinateur. Sur téléphone, l'application Arcades propose des milliers de jeux HTML5 pensés pour le toucher.",
      },
      {
        question: "Ces jeux sont-ils compris dans l'abonnement ?",
        reponse: "Oui, dès le forfait Personnel. Chaque partie lancée est décomptée de votre forfait, comme les autres travaux qui occupent un serveur ; Beneath a Steel Sky est l'exception, gratuit.",
      },
    ],
    en: [
      {
        question: "Do I need to install the games on my computer?",
        reponse: "No. The games run on our servers and appear in a window of your online desktop, from the browser. There is nothing to install.",
      },
      {
        question: "Are my games saved?",
        reponse: "No. A game lasts as long as its window: when you close it, everything is wiped, in-game saves included. These games suit single-sitting sessions best.",
      },
      {
        question: "Can I play them on a phone?",
        reponse: "No, these six games are for computers only. On a phone, the Arcades app offers thousands of HTML5 games designed for touch.",
      },
      {
        question: "Are these games included in the subscription?",
        reponse: "Yes, from the Personal plan. Each game you launch counts against your plan, like other work that takes up a server; Beneath a Steel Sky is the exception, and free.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/jeux/jeux-wesnoth.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "La Bataille pour Wesnoth dans Cloud OS : le menu principal du jeu",
        en: "The Battle for Wesnoth in Cloud OS: the game's main menu",
      },
    },
  ],
  voisines: ["arcades", "studio-de-jeux"],
  articles: [],
};
