import type { FicheApplication } from "../types";

/**
 * Terminal — ÉBAUCHE, à relire avant publication.
 *
 * ATTENTION au nom : ce n'est PAS un shell Linux. C'est une console texte « façon mainframe 3270 »
 * (menus numérotés, touches de fonction tapées en texte) qui pilote les applications de Cloud OS par
 * les mêmes server actions que les fenêtres du bureau (src/components/os/apps/terminal/terminal-app.tsx,
 * commentaire de l'entrée `terminal` d'app-registry.tsx). La fiche le dit dès le premier paragraphe.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Menu principal de 17 entrées (MAIN_MENU, terminal-app.tsx) : Plans & Jobs, Workflows, Fichiers,
 *   Agenda, Contacts, Notifications, Équipes, Courriel, ERP, Hébergement, Messagerie, Agent de code,
 *   Mes conteneurs, Surveillance, Corbeille, Réglages, Assistant IA.
 * - Conventions : 1, 2, 3… pour choisir, F1 aide, F3 retour, F5 rafraîchir ; les touches se tapent en
 *   texte (« F3 » puis Entrée) (help-screen.tsx).
 * - Exemples d'actions réelles (help-screen.tsx) : nouveau plan et lancement, journaux, téléchargement
 *   du résultat ; devis et factures de l'ERP (envoyer, paiement, convertir un devis en facture) ;
 *   écritures du grand livre ; lire, répondre et supprimer des courriels ; demandes à l'Agent de code
 *   (F11/F12 approuver/refuser) ; Surveillance rafraîchie aux 10 s ; double authentification dans
 *   Réglages.
 * - Forfait : `personnel` (GET /api/v1/apps/catalog).
 * - L'interface de la console est en français seulement (libellés en dur ; un seul écran,
 *   workflow-create-screen.tsx, passe par next-intl). La version anglaise de la fiche le dit.
 *
 * À vérifier à la relecture :
 * - Le positionnement : « accessibilité / tout au clavier » est une lecture de ma part ; rien dans le
 *   code ne revendique la compatibilité avec les lecteurs d'écran, donc la fiche ne la promet pas.
 * - Les écrans ERP et Hébergement du Terminal suivent les droits de l'utilisateur (non vérifié
 *   écran par écran) : la fiche dit « les applications auxquelles vous avez accès ».
 * - L'usage sur téléphone : l'app n'est pas `desktopOnly`, mais rien n'a été essayé ; non mentionné.
 */
export const terminal: FicheApplication = {
  id: "terminal",
  apps: ["terminal"],
  slug: { fr: "console-clavier", en: "keyboard-console" },
  nom: { fr: "Terminal", en: "Terminal" },
  titre: {
    fr: "Terminal, tout Cloud OS au clavier dans une console texte",
    en: "Terminal, all of Cloud OS from the keyboard in a text console",
  },
  groupe: "developpement",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Console texte façon mainframe, tout au clavier — Cloud OS",
      en: "Mainframe-style text console, keyboard only — Cloud OS",
    },
    description: {
      fr: "Plans, fichiers, courriel, ERP, agent de code : pilotez Cloud OS depuis une console texte à menus numérotés et touches de fonction, sans souris.",
      en: "Plans, files, email, ERP, coding agent: run all of Cloud OS from a text console with numbered menus and function keys, no mouse needed.",
    },
  },
  accroche: {
    fr: "Vos applications en menus numérotés et touches de fonction, sans souris.",
    en: "Your apps as numbered menus and function keys, no mouse needed.",
  },
  motsCles: {
    fr: ["console texte", "interface mainframe 3270", "logiciel sans souris", "gestion au clavier", "interface en mode texte"],
    en: ["text console", "3270 mainframe interface", "software without a mouse", "keyboard-driven interface", "text-mode interface"],
  },
  corps: {
    fr: [
      {
        titre: "Une console à menus, pas une ligne de commande",
        paragraphes: [
          "Le Terminal de Cloud OS n'est pas un shell Linux : c'est une console texte dans l'esprit des terminaux mainframe. Chaque écran affiche un menu numéroté ; vous tapez un chiffre ou une commande d'une lettre, puis Entrée. F1 affiche l'aide, F3 revient à l'écran précédent, F5 rafraîchit.",
          "Aucune syntaxe à apprendre : les commandes de chaque écran sont affichées au bas de la fenêtre, et l'aide les récapitule toutes.",
        ],
      },
      {
        titre: "Tout Cloud OS, écran par écran",
        paragraphes: [
          "Le menu principal ouvre les applications auxquelles vous avez accès, sans quitter le clavier :",
        ],
        points: [
          "Plans & Jobs et Workflows : créer, lancer, suivre l'exécution, télécharger le résultat d'un plan.",
          "Fichiers, Corbeille, Agenda, Contacts, Notifications et Équipes.",
          "Courriel et Messagerie : lire, répondre, écrire dans un canal.",
          "ERP : devis, factures, paiements, stocks, projets et écritures au grand livre.",
          "Agent de code : envoyer une demande à l'agent, approuver ou refuser ses actions.",
          "Surveillance des travaux en cours, Réglages et Assistant IA.",
        ],
      },
      {
        titre: "Pour qui",
        paragraphes: [
          "Pour ceux qui vont plus vite au clavier qu'à la souris, pour la saisie répétitive (des factures, des écritures), et pour ceux qui ont connu les terminaux d'antan et en gardent l'efficacité. Le Terminal agit sur les mêmes données que les fenêtres du bureau : une facture créée dans la console est la même que dans l'ERP.",
        ],
      },
    ],
    en: [
      {
        titre: "A menu console, not a command line",
        paragraphes: [
          "The Cloud OS Terminal is not a Linux shell: it is a text console in the spirit of mainframe terminals. Each screen shows a numbered menu; you type a number or a one-letter command, then Enter. F1 shows help, F3 goes back to the previous screen, F5 refreshes.",
          "No syntax to learn: each screen's commands are listed at the bottom of the window, and the help screen sums them all up. The console's screens are in French for now.",
        ],
      },
      {
        titre: "All of Cloud OS, screen by screen",
        paragraphes: [
          "The main menu opens the apps you have access to, without leaving the keyboard:",
        ],
        points: [
          "Plans & Jobs and Workflows: create, run, follow progress, download a plan's result.",
          "Files, Trash, Calendar, Contacts, Notifications and Teams.",
          "Email and Messaging: read, reply, post in a channel.",
          "ERP: quotes, invoices, payments, stock, projects and general ledger entries.",
          "Coding agent: send the agent a request, approve or reject its actions.",
          "Job monitoring, Settings and the AI Assistant.",
        ],
      },
      {
        titre: "Who it is for",
        paragraphes: [
          "For people who are faster on the keyboard than with a mouse, for repetitive data entry (invoices, ledger entries), and for those who used the terminals of old and still value their efficiency. The Terminal works on the same data as the desktop windows: an invoice created in the console is the same one you see in the ERP.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Puis-je y taper des commandes Linux ?",
        reponse: "Non. Le Terminal est une console à menus qui pilote les applications de Cloud OS, pas un shell. Pour un vrai bureau Linux avec un terminal, voyez le Bac à sable.",
      },
      {
        question: "Comment utiliser les touches de fonction ?",
        reponse: "Tapez-les en texte, par exemple « F3 », puis Entrée. Une ligne vide suivie d'Entrée revient aussi à l'écran précédent.",
      },
      {
        question: "Ce que je fais dans le Terminal apparaît-il dans les autres applications ?",
        reponse: "Oui. La console travaille sur les mêmes données que les fenêtres du bureau : un courriel supprimé ou une facture envoyée l'est partout.",
      },
    ],
    en: [
      {
        question: "Can I type Linux commands in it?",
        reponse: "No. The Terminal is a menu console that runs the Cloud OS apps, not a shell. For a real Linux desktop with a terminal, see the Sandbox.",
      },
      {
        question: "How do I use the function keys?",
        reponse: "Type them as text, for example “F3”, then press Enter. An empty line followed by Enter also goes back to the previous screen.",
      },
      {
        question: "Does what I do in the Terminal show up in the other apps?",
        reponse: "Yes. The console works on the same data as the desktop windows: an email deleted or an invoice sent there is deleted or sent everywhere.",
      },
    ],
  },
  captures: [],
  voisines: ["erp", "agent-de-code", "bac-a-sable", "workflows"],
  articles: [],
};
