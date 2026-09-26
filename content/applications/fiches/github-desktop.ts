import type { FicheApplication } from "../types";

/**
 * GitHub Desktop — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Image `linuxserver/github-desktop` (src/lib/marketplace/desktop-apps-catalog.ts), diffusée dans
 *   une fenêtre du bureau ; ordinateur seulement (`desktopOnly`, app-registry.tsx).
 * - L'image n'installe PAS un binaire de GitHub : GitHub Desktop n'est publié par GitHub que pour
 *   Windows et macOS. Elle installe le portage Linux communautaire `shiftkey/desktop` (licence MIT),
 *   plus `git`, un terminal, Chromium et VSCodium comme éditeur (Dockerfile de
 *   github.com/linuxserver/docker-github-desktop, lu le 2026-09-25). D'où `tiers.editeur` et
 *   `tiers.site` qui pointent vers ce projet, et la mention dans le corps.
 * - PAS d'`openCmd` : l'import depuis Fichiers dépose les fichiers dans ~/Stockage sans les ouvrir.
 *   La fiche ne met donc pas l'accent sur le pont fichiers, mais sur le dépôt distant.
 * - Session temporaire : tout /config (dépôts clonés compris) est en RAM et disparaît à la fermeture.
 * - Forfait : `personnel` (GET /api/v1/apps/catalog).
 *
 * Marque : aucune formulation d'affiliation avec GitHub (ni « officiel », ni « partenaire ») ; le nom
 * n'est employé que pour désigner le logiciel. Titre SEO et h1 portés par « client Git graphique ».
 *
 * À vérifier à la relecture :
 * - La connexion à un compte GitHub depuis la session (flux OAuth via le Chromium du conteneur) et
 *   l'accès réseau sortant (clone/push) : pas essayés. La fiche parle de « vos dépôts » sans promettre
 *   la connexion au compte.
 * - Chaque ouverture consomme des crédits (chargeForJob « MARKETPLACE ») : pas de « sans supplément ».
 */
export const githubDesktop: FicheApplication = {
  id: "github-desktop",
  apps: ["desktop-github-desktop"],
  slug: { fr: "github-desktop", en: "github-desktop" },
  nom: { fr: "GitHub Desktop", en: "GitHub Desktop" },
  tiers: {
    editeur: "shiftkey/desktop (portage Linux communautaire)",
    licence: "MIT",
    site: "https://github.com/shiftkey/desktop",
  },
  titre: {
    fr: "Un client Git graphique dans le navigateur, avec GitHub Desktop",
    en: "A graphical Git client in your browser, with GitHub Desktop",
  },
  groupe: "developpement",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Client Git graphique en ligne (GitHub Desktop) — Cloud OS",
      en: "Graphical Git client online (GitHub Desktop) — Cloud OS",
    },
    description: {
      fr: "Clonez, comparez, committez et poussez vos dépôts avec GitHub Desktop, un client Git graphique qui tourne dans le navigateur. Rien à installer.",
      en: "Clone, compare, commit and push your repositories with GitHub Desktop, a graphical Git client that runs in your browser. Nothing to install.",
    },
  },
  accroche: {
    fr: "Git sans la ligne de commande, dans votre navigateur.",
    en: "Git without the command line, in your browser.",
  },
  motsCles: {
    fr: ["client git graphique", "github desktop linux", "git sans ligne de commande", "interface graphique git en ligne"],
    en: ["graphical git client", "github desktop linux", "git without command line", "online git gui"],
  },
  corps: {
    fr: [
      {
        titre: "Git, sans la ligne de commande",
        paragraphes: [
          "GitHub Desktop est un client Git graphique : vous clonez un dépôt, voyez les modifications fichier par fichier, choisissez ce qui entre dans un commit, changez de branche, puis poussez votre travail. Les commandes Git restent en coulisse.",
          "GitHub ne publie GitHub Desktop que pour Windows et macOS. Cloud OS diffuse son portage Linux communautaire, le projet libre shiftkey/desktop, dans une fenêtre de votre bureau en ligne.",
        ],
      },
      {
        titre: "Un poste Git complet dans la session",
        paragraphes: [
          "Git, un terminal et l'éditeur de code VSCodium sont installés à côté de GitHub Desktop : vous ouvrez un fichier du dépôt pour le modifier, puis vous revenez committer, sans quitter la fenêtre.",
        ],
        points: [
          "Aucune installation sur votre poste, et le même outil sur chaque ordinateur d'où vous vous connectez.",
          "Pratique sur un ordinateur où vous ne pouvez pas installer de logiciel.",
        ],
      },
      {
        titre: "Ce qu'il faut savoir",
        paragraphes: [
          "La session est temporaire : les dépôts clonés disparaissent à sa fermeture. Poussez vos commits vers votre dépôt distant avant de fermer ; c'est là que votre travail est conservé. GitHub Desktop s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
        ],
      },
    ],
    en: [
      {
        titre: "Git, without the command line",
        paragraphes: [
          "GitHub Desktop is a graphical Git client: you clone a repository, see changes file by file, pick what goes into a commit, switch branches, then push your work. The Git commands stay behind the scenes.",
          "GitHub only publishes GitHub Desktop for Windows and macOS. Cloud OS runs its community Linux port, the open-source shiftkey/desktop project, in a window of your online desktop.",
        ],
      },
      {
        titre: "A complete Git workstation in the session",
        paragraphes: [
          "Git, a terminal and the VSCodium code editor are installed alongside GitHub Desktop: you open a file from the repository to edit it, then come back to commit, without leaving the window.",
        ],
        points: [
          "Nothing to install on your computer, and the same tool on every computer you sign in from.",
          "Handy on a computer where you cannot install software.",
        ],
      },
      {
        titre: "Good to know",
        paragraphes: [
          "The session is temporary: cloned repositories are gone when it closes. Push your commits to your remote repository before closing; that is where your work is kept. GitHub Desktop is used from a computer; it is not offered on phones.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Cloud OS est-il lié à GitHub ?",
        reponse: "Non. Cloud OS diffuse le portage Linux communautaire et libre de GitHub Desktop (projet shiftkey/desktop), tel quel. Cloud OS n'est ni affilié à GitHub ni approuvé par GitHub.",
      },
      {
        question: "Mes dépôts clonés sont-ils conservés après la fermeture ?",
        reponse: "Non. La session est temporaire : poussez vos commits vers votre dépôt distant avant de la fermer, et clonez-le de nouveau à la prochaine ouverture.",
      },
      {
        question: "GitHub Desktop est-il compris dans l'abonnement ?",
        reponse: "Oui, dès le forfait Personnel, comme les autres logiciels du bureau.",
      },
    ],
    en: [
      {
        question: "Is Cloud OS connected to GitHub?",
        reponse: "No. Cloud OS runs the free, community Linux port of GitHub Desktop (the shiftkey/desktop project), as is. Cloud OS is not affiliated with or endorsed by GitHub.",
      },
      {
        question: "Are my cloned repositories kept after closing?",
        reponse: "No. The session is temporary: push your commits to your remote repository before closing it, and clone it again next time.",
      },
      {
        question: "Is GitHub Desktop included in the subscription?",
        reponse: "Yes, from the Personal plan, like the other desktop software.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/github-desktop/github-desktop-accueil.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "GitHub Desktop dans Cloud OS : l'accueil, avant la connexion à un compte GitHub",
        en: "GitHub Desktop in Cloud OS: the welcome screen, before signing in to a GitHub account",
      },
    },
  ],
  voisines: ["vscodium", "agent-de-code"],
  articles: [],
};
