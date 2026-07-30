import { OFFRE_EN_DEVISE } from "@/components/marketing/offre";
import type { ContenuPme } from "./pme";

/**
 * La copie anglaise de /pme — PME canadiennes.
 *
 * **Ce n'est pas la traduction de `pme.fr.ts`, et deux blocs le montrent.** Le
 * français s'adresse à des PME québécoises et vend la **proximité** : nos
 * serveurs sont dans la même région que vous. L'anglais s'adresse à une PME de
 * Toronto ou de Vancouver, pour qui « au Québec » n'est pas un argument mais
 * une coordonnée — il vend donc la **souveraineté** : vos données ne sortent
 * pas du pays. Même fait, argument inversé. Le segment (bloc 1) et l'ancrage
 * (bloc 8) divergent complètement ; les sept autres disent la même chose
 * autrement.
 *
 * Orthographe : anglais canadien. `licence` en nom, `catalogue`, `-our`
 * (favour, behaviour), mais `-ize` (organize, personalized). Séparateur de
 * milliers : la virgule (`5,000`), pas l'espace du français — c'est pour ça que
 * la page anglaise dore les nombres avec sa propre expression régulière.
 *
 * Les `id` restent ceux du français : ce sont des cibles de `#lien`, pas du
 * texte, et tous les miroirs anglais du site font pareil (`/en/compute` garde
 * `donnees` et `calcul-lourd`). Les `factures` et les `cle` d'icônes sont eux
 * aussi des identifiants — `libelleDe()` en tire le libellé anglais tout seul.
 *
 * **Aucune mention de PIPEDA, de conformité, de certification ou d'audit.**
 * Décision du client, et elle est juste : « nos serveurs sont au Canada et vos
 * fichiers ne partent pas chez un tiers » est un fait vérifiable ; « PIPEDA
 * compliant » est une revendication juridique — et sous PIPEDA, l'hébergement
 * au Canada n'est justement pas ce qui détermine la conformité. Les deux ne se
 * déduisent pas l'un de l'autre. Cette mention appartient au même lot que la
 * politique de confidentialité : juriste, en même temps que la Loi 25.
 */
export const PME_EN: ContenuPme = {
  meta: {
    titre: "The workstation for Canadian businesses — Cloud Paradise",
    description:
      "Accounting, administration, marketing: the workstation for Canadian businesses, with no IT department. Your data stays in Canada, credits not subscriptions.",
  },

  og: {
    alt: "Cloud Paradise — Small business",
    titre: "Small business",
    soustitre: "The workstation for Canadian businesses",
  },

  filAriane: { accueil: "Home", page: "Small business" },

  facturation: { prefixe: "billed as", separateur: ", ", joncteur: " and " },

  hero: {
    surtitre: "For small and medium-sized businesses",
    lignes: [
      "The workstation",
      "for Canadian businesses.",
      "No IT department required.",
    ],
    texte:
      "Your documents, your numbers and your media in one workspace. Describe what you want back — the heavy work runs on our hardware. Nothing to install, nobody to hire.",
    cta: "Book a demo",
    lienCompte: "Create your account",
  },

  ancres: [
    { id: "comptabilite", libelle: "Accounting" },
    { id: "administration", libelle: "Administration" },
    { id: "marketing", libelle: "Marketing" },
    { id: "equipe", libelle: "Your team" },
    { id: "budget", libelle: "Pricing" },
    { id: "donnees", libelle: "Your data" },
  ],

  metiers: [
    {
      id: "comptabilite",
      surtitre: "Accounting",
      factures: ["Données"],
      titre: "From accounting export to dashboard.",
      texte:
        "Drop in your exports and ask your question in plain English. Your sources are read-only — nothing you upload is altered.",
      jobEnTete: true,
      job: {
        titre: "Cross-reference 12 months of accounting exports",
        logs: [
          "→ reading 14 .csv files",
          "→ cross-referencing by vendor and by month",
          "→ dashboard ready · 12/12",
        ],
      },
      transformations: [
        {
          entree: "12 months of accounting exports",
          sortie: "a cash-flow dashboard",
        },
        {
          entree: "“Revenue by region, this quarter”",
          sortie: "the answer, without writing a SQL query",
        },
        {
          entree: "200 vendor invoices in PDF",
          sortie: "a spreadsheet with amounts and dates",
        },
        {
          entree: "a batch of journal entries",
          sortie: "the outliers, flagged and listed",
        },
      ],
    },
    {
      id: "administration",
      surtitre: "Administration",
      factures: ["Documents"],
      titre: "Your files, finally searchable.",
      texte:
        "Your files stay in your workspace. You describe the result you want; the contents never leave.",
      transformations: [
        {
          entree: "200 contracts in PDF",
          sortie: "a spreadsheet with every renewal date",
        },
        {
          entree: "“Where does this mention warranty?”",
          sortie: "the exact passages, across every document",
        },
        {
          entree: "one template and a list of 500 clients",
          sortie: "500 personalized letters",
        },
        {
          entree: "sensitive files",
          sortie: "an encrypted archive, ready to share",
        },
        { entree: "a folder in disarray", sortie: "sorted, renamed, filed" },
      ],
      lienTarifs: "See detailed pricing",
    },
    {
      id: "marketing",
      surtitre: "Marketing",
      // Trois types facturés, comme en français : le dernier exemple est une
      // extraction web. L'étiquette du brief anglais (« Media and Images »)
      // aurait contredit /en/pricing, exactement comme en français.
      factures: ["Média", "Images", "Scraping"],
      titre: "Your media, in batches.",
      texte:
        "Process, encode, generate, sort — without tying up your own machine for three hours.",
      transformations: [
        {
          entree: "5,000 product photos",
          sortie: "resized and reformatted, all at once",
        },
        {
          entree: "a 4K video",
          sortie: "re-encoded to H.265, ready to publish",
        },
        {
          entree: "“a banner for the summer promo”",
          sortie: "the image, generated",
        },
        {
          entree: "a competitor’s online catalogue",
          sortie: "a spreadsheet of prices and availability",
        },
      ],
      job: {
        titre: "Resize 5,000 product photos",
        logs: [
          "→ reading folder — 5,000 images found",
          "→ converting to three formats",
          "→ archive ready · 15,000/15,000",
        ],
      },
    },
  ],

  equipe: {
    id: "equipe",
    surtitre: "Your team",
    titre: "One workspace, your whole team.",
    texte:
      "Create team workspaces, invite who you want, approve access. Chat, email and calendar are already in there.",
    cartes: [
      {
        cle: "bureaux",
        titre: "Team workspaces",
        texte:
          "Multiple workspaces, sharing across teams, invitations and access approval.",
      },
      {
        cle: "messagerie",
        titre: "Messaging",
        texte: "Channels, direct messages, presence.",
      },
      {
        cle: "courriel",
        titre: "Email",
        texte:
          "Built-in webmail, with an @cloudparadise.ca address you activate from your workspace.",
      },
      {
        cle: "agenda",
        titre: "Calendar",
        texte: "Shared calendar and reminders.",
      },
    ],
    lien: "See the platform",
  },

  budget: {
    id: "budget",
    surtitre: "Pricing",
    titre: "No per-seat licences. No subscription.",
    texte:
      "Credits. You get some to start, you buy more when you want. A small task costs little; a heavy job costs more. Nothing expires.",
    points: [
      {
        cle: "offert",
        // Même montant que le français, lu dans `offre.ts`. Il sort formaté en
        // fr-CA (« 10 $ CA ») : c'est la forme retenue pour toute la vitrine
        // anglaise, `BadgeOffre` l'affiche déjà telle quelle sur les six pages
        // /en existantes. Ne pas la reformater ici seule.
        titre: `${OFFRE_EN_DEVISE} in credits on sign-up`,
        texte: "Try it without reaching for your card.",
      },
      {
        cle: "traite",
        titre: "You pay for what gets processed",
        texte: "Billing follows progress, file by file.",
      },
      {
        cle: "consulter",
        titre: "Looking costs nothing",
        texte: "Opening, previewing and browsing your folders are free.",
      },
    ],
    lien: "See pricing",
  },

  donnees: {
    id: "donnees",
    surtitre: "Your data",
    titre: "Your data stays in Canada.",
    paragraphes: [
      "Our servers are in Quebec, in a room, on hardware Cloud Paradise owns. This isn’t rented capacity from a foreign cloud provider — your files sit on disks we hold.",
      "The language model that reads your requests runs on that same hardware. Your files and your requests are never sent to a third-party AI provider, and they never leave the country — which matters when the files are your clients’.",
    ],
    lien: "See security",
  },

  closer: {
    soustitre:
      "Book a demo, or create your account and run your first task today.",
    bouton: "Book a demo",
    lien: "Create your account →",
  },
};

/**
 * La copie anglaise est écrite : `contenuPme("en")` sert désormais l'anglais.
 *
 * Le drapeau existait pour empêcher les `TODO` d'atteindre la production tant
 * que ce fichier n'était qu'un squelette. Il ne se lève qu'avec la route
 * `/en/...` correspondante — sinon le `hreflang` annoncerait une page qui
 * n'existe pas.
 */
export const PME_EN_PRET = true;
