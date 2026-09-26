import type { FicheApplication } from "../types";

/**
 * Navigateur — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Un vrai Chromium (image cp-browser-kasm, `wrapped-chromium`) dans un conteneur par session,
 *   diffusé dans une fenêtre du bureau ; ses propres onglets, barre d'adresse, précédent/suivant ;
 *   tous les sites fonctionnent, contrairement à une simple iframe (src/lib/browser/docker.ts,
 *   src/components/os/apps/browser/browser-app.tsx). NB : app-catalog.ts dit « Chrome » ; c'est
 *   Chromium, et la fiche dit Chromium.
 * - Session ÉPHÉMÈRE : le conteneur est détruit à la fermeture de la fenêtre (stopBrowserSessionAction,
 *   et sendBeacon à la fermeture de l'onglet) ; « Nouvelle session » repart d'un navigateur neuf. Une
 *   seule session vivante par utilisateur (launchSession).
 * - Aucun pont de fichiers : « a browser session has NO input/output file » (docker.ts). Ce qui est
 *   téléchargé dans le Navigateur n'arrive pas dans Fichiers.
 * - Démarrage « ~20-30 s » selon l'interface (browser.starting, fr.json) ; davantage quand l'hôte de
 *   sessions, qui s'éteint après 20 min sans session, doit se réveiller (src/lib/sessions-host/wake.ts).
 * - L'hôte de sessions est dans AWS ca-central-1 (infra/aws/README.md, `aws-sessions`).
 * - Ordinateur seulement (`desktopOnly`, app-registry.tsx). Forfait Personnel
 *   (GET /api/v1/apps/catalog : `plan: "personnel"`).
 *
 * Volontairement absent : toute promesse d'anonymat, de « VPN » ou de protection contre les logiciels
 * malveillants. Le Navigateur isole la page de l'ordinateur de l'utilisateur ; il ne rend pas la
 * navigation anonyme. La page d'accueil (BROWSER_HOME_URL, par défaut Bing ; le registre parle de
 * cloudos.ca) n'est pas citée : elle dépend de la configuration.
 */
export const navigateur: FicheApplication = {
  id: "navigateur",
  apps: ["browser"],
  slug: { fr: "navigateur-isole", en: "cloud-browser" },
  nom: { fr: "Navigateur", en: "Browser" },
  titre: {
    fr: "Navigateur, un Chromium isolé qui tourne dans le nuage",
    en: "Browser, an isolated Chromium that runs in the cloud",
  },
  groupe: "bureau",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Navigateur Web isolé, qui tourne dans le nuage — Cloud OS",
      en: "Isolated web browser that runs in the cloud — Cloud OS",
    },
    description: {
      fr: "Un vrai navigateur Chromium qui tourne sur un serveur et s'affiche dans votre bureau en ligne. Chaque session repart à neuf et disparaît à la fermeture.",
      en: "A real Chromium browser that runs on a server and shows up in your online desktop. Every session starts fresh and disappears when you close it.",
    },
  },
  accroche: {
    fr: "Un navigateur neuf à chaque session, qui tourne loin de votre ordinateur.",
    en: "A fresh browser every session, running away from your computer.",
  },
  motsCles: {
    fr: ["navigateur isolé", "navigateur dans le nuage", "navigateur web à distance", "navigateur jetable"],
    en: ["isolated browser", "cloud browser", "remote web browser", "disposable browser"],
  },
  corps: {
    fr: [
      {
        titre: "Un vrai navigateur, pas une page dans une page",
        paragraphes: [
          "Le Navigateur de Cloud OS est un Chromium complet, avec ses onglets et sa barre d'adresse, qui tourne sur un serveur et s'affiche dans une fenêtre de votre bureau. Comme c'est un vrai navigateur, tous les sites fonctionnent, y compris ceux qui refusent de s'afficher à l'intérieur d'une autre page.",
        ],
      },
      {
        titre: "Neuf à chaque session",
        paragraphes: [
          "Chaque session démarre sur un navigateur vierge et disparaît quand vous fermez la fenêtre : historique, témoins et onglets ouverts partent avec elle. Le bouton « Nouvelle session » repart à zéro sans fermer la fenêtre.",
          "Les pages s'exécutent sur le serveur, pas sur votre ordinateur. C'est utile pour ouvrir un lien dont vous n'êtes pas sûr, consulter un site sans rien laisser sur votre poste, ou naviguer depuis un appareil où vous ne pouvez rien installer.",
        ],
      },
      {
        titre: "Ce qu'il faut savoir",
        paragraphes: [
          "Le démarrage prend souvent une trentaine de secondes, parfois davantage. Le Navigateur ne garde rien d'une session à l'autre ; pour un environnement qui conserve vos réglages et vos favoris, c'est le Bac à sable qu'il vous faut. Ce que vous y téléchargez n'arrive pas dans vos Fichiers.",
          "Le Navigateur est compris dès le forfait Personnel. Il s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
        ],
      },
    ],
    en: [
      {
        titre: "A real browser, not a page inside a page",
        paragraphes: [
          "The Cloud OS Browser is a full Chromium, with its tabs and address bar, that runs on a server and shows up in a window on your desktop. Because it is a real browser, every site works, including those that refuse to display inside another page.",
        ],
      },
      {
        titre: "Fresh every session",
        paragraphes: [
          "Every session starts on a blank browser and disappears when you close the window: history, cookies and open tabs go with it. The “New session” button starts over without closing the window.",
          "Pages run on the server, not on your computer. That helps when you want to open a link you are unsure about, look at a site without leaving anything on your machine, or browse from a device where you cannot install anything.",
        ],
      },
      {
        titre: "Good to know",
        paragraphes: [
          "Starting up often takes about thirty seconds, sometimes longer. The Browser keeps nothing from one session to the next; for an environment that keeps your settings and bookmarks, you want the Sandbox. What you download in it does not land in your Files.",
          "The Browser is included from the Personal plan. It is used from a computer; it is not offered on phones.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Mon historique est-il conservé ?",
        reponse: "Non. Chaque session repart d'un navigateur vierge, et tout ce qu'elle contenait disparaît à la fermeture de la fenêtre.",
      },
      {
        question: "Est-ce un VPN ou un outil d'anonymat ?",
        reponse: "Non. Le Navigateur éloigne les pages de votre ordinateur, puisqu'elles s'exécutent sur un serveur, mais il ne rend pas votre navigation anonyme. Les sites où vous vous connectez savent toujours qui vous êtes.",
      },
      {
        question: "Quelle différence avec le Bac à sable ?",
        reponse: "Le Navigateur est jetable : il repart à neuf à chaque session. Le Bac à sable est un bureau Linux complet, compris dans le forfait Entreprise, qui garde vos réglages, vos favoris et vos fichiers d'une visite à l'autre.",
      },
    ],
    en: [
      {
        question: "Is my history kept?",
        reponse: "No. Every session starts from a blank browser, and everything in it disappears when you close the window.",
      },
      {
        question: "Is it a VPN or an anonymity tool?",
        reponse: "No. The Browser keeps pages away from your computer, since they run on a server, but it does not make your browsing anonymous. The sites you sign in to still know who you are.",
      },
      {
        question: "How is it different from the Sandbox?",
        reponse: "The Browser is disposable: it starts fresh every session. The Sandbox is a full Linux desktop, included in the Business plan, that keeps your settings, bookmarks and files from one visit to the next.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/navigateur/navigateur-site.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "Le Navigateur de Cloud OS : une session de navigation isolée, dans le nuage",
        en: "The Cloud OS Browser: an isolated browsing session, in the cloud",
      },
    },
  ],
  voisines: ["bac-a-sable", "fichiers", "courriel"],
  articles: [],
};
