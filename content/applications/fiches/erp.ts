import type { FicheApplication } from "../types";

/**
 * ERP — ÉBAUCHE, à relire avant publication.
 *
 * Faits : la section « Gestion d'entreprise » de /fonctions (déjà relue) — devis et factures PDF,
 * TPS et TVQ calculées automatiquement, relances des retards, comptes fournisseurs, grand livre en
 * partie double, inventaire décrémenté à chaque facture, rôles par module. Modules vus dans l'app le
 * 2026-09-25 : clients, opportunités, catalogue, devis et factures (avoirs, récurrentes), comptes
 * fournisseurs, taxes, états financiers, grand livre, banque, paie, projets.
 */
export const erp: FicheApplication = {
  id: "erp",
  apps: ["erp"],
  slug: { fr: "erp", en: "erp" },
  nom: { fr: "ERP", en: "ERP" },
  titre: {
    fr: "Un ERP pour les PME du Québec",
    en: "An ERP for Canadian small businesses",
  },
  groupe: "gestion",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "ERP en ligne pour PME : factures, TPS et TVQ — Cloud OS",
      en: "Online ERP for small business: invoices and taxes — Cloud OS",
    },
    description: {
      fr: "Devis, factures avec TPS et TVQ, fournisseurs, grand livre et inventaire dans un seul ERP en ligne, compris dans votre forfait Cloud OS.",
      en: "Quotes, invoices with GST and QST, suppliers, general ledger and inventory in one online ERP, included in your Cloud OS plan.",
    },
  },
  accroche: {
    fr: "Devis, factures, fournisseurs et comptabilité, au même endroit.",
    en: "Quotes, invoices, suppliers and accounting, in one place.",
  },
  motsCles: {
    fr: ["erp pme québec", "logiciel de facturation tps tvq", "logiciel de comptabilité pme", "erp en ligne"],
    en: ["erp for small business", "gst qst invoicing software", "small business accounting software", "online erp"],
  },
  corps: {
    fr: [
      {
        titre: "De la soumission au grand livre",
        paragraphes: [
          "L'ERP de Cloud OS suit une vente de bout en bout : le client, le devis, la facture, le paiement, puis l'écriture comptable. Chaque étape reprend la précédente, sans ressaisie.",
        ],
        points: [
          "Devis et factures en PDF, TPS et TVQ calculées automatiquement.",
          "Relances des factures en retard, envoyées seules.",
          "Factures récurrentes et avoirs.",
          "Inventaire décrémenté à chaque facture.",
        ],
      },
      {
        titre: "Une vraie comptabilité, pas un tableur",
        paragraphes: [
          "Le grand livre tient une comptabilité en partie double, avec un plan de comptes par défaut et des écritures automatiques à chaque vente — ou saisies à la main quand il le faut. Les comptes fournisseurs sont ventilés et comptabilisés de la même façon que les ventes, et l'ERP couvre aussi la banque, la paie, les projets et les états financiers.",
        ],
      },
      {
        titre: "Chacun voit ce qui le concerne",
        paragraphes: [
          "Les accès se règlent module par module : la comptabilité générale, les fournisseurs ou la banque ne s'ouvrent qu'aux personnes qui en ont besoin. L'ERP est compris dès le forfait Personnel, sans module payant à ajouter.",
        ],
      },
    ],
    en: [
      {
        titre: "From quote to general ledger",
        paragraphes: [
          "The Cloud OS ERP follows a sale end to end: the client, the quote, the invoice, the payment, then the accounting entry. Each step picks up from the previous one, with no re-keying.",
        ],
        points: [
          "PDF quotes and invoices, GST and QST calculated automatically.",
          "Reminders for overdue invoices, sent on their own.",
          "Recurring invoices and credit notes.",
          "Inventory reduced with every invoice.",
        ],
      },
      {
        titre: "Real accounting, not a spreadsheet",
        paragraphes: [
          "The general ledger keeps double-entry accounting, with a default chart of accounts and automatic entries on every sale — or manual ones when needed. Accounts payable are broken down and posted the same way as sales, and the ERP also covers banking, payroll, projects and financial statements.",
        ],
      },
      {
        titre: "Everyone sees what concerns them",
        paragraphes: [
          "Access is set module by module: general accounting, suppliers or banking only open to the people who need them. The ERP is included from the Personal plan, with no paid add-on module.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "L'ERP calcule-t-il la TPS et la TVQ ?",
        reponse: "Oui. Les taxes sont calculées automatiquement sur les devis et les factures, et la TVQ n'est pas composée sur la TPS.",
      },
      {
        question: "Faut-il un logiciel de comptabilité à côté ?",
        reponse: "Non. L'ERP tient un grand livre en partie double, avec des écritures automatiques à chaque vente et les comptes fournisseurs.",
      },
      {
        question: "L'ERP coûte-t-il un supplément ?",
        reponse: "Non. Il est compris dans l'abonnement dès le forfait Personnel.",
      },
    ],
    en: [
      {
        question: "Does the ERP calculate GST and QST?",
        reponse: "Yes. Taxes are calculated automatically on quotes and invoices, and QST is not compounded on GST.",
      },
      {
        question: "Do I need separate accounting software?",
        reponse: "No. The ERP keeps a double-entry general ledger, with automatic entries on every sale and accounts payable.",
      },
      {
        question: "Does the ERP cost extra?",
        reponse: "No. It is included in the subscription from the Personal plan.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/erp/erp-facture.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "Une facture dans l'ERP de Cloud OS, avec la TPS et la TVQ calculées",
        en: "An invoice in the Cloud OS ERP, with GST and QST calculated",
      },
    },
  ],
  voisines: ["bureau-assistance", "writer"],
  articles: [{ slug: "crm-pour-pme", titre: "CRM pour PME : quel outil choisir selon votre stade de croissance" }],
};
