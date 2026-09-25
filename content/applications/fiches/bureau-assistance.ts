import type { FicheApplication } from "../types";

/**
 * Bureau d'assistance — ÉBAUCHE, à relire avant publication.
 *
 * Faits : la section « Bureau d'assistance » de /fonctions (déjà relue) et la page /assistance —
 * billets avec fil public et notes internes, portail client à vos couleurs sans mot de passe, canal
 * courriel IMAP/SMTP, clavardage, base de connaissances, tri et brouillon à l'arrivée, macros,
 * engagements de service, rapports et sondage de satisfaction.
 */
export const bureauAssistance: FicheApplication = {
  id: "bureau-assistance",
  apps: ["desk"],
  slug: { fr: "bureau-d-assistance", en: "service-desk" },
  nom: { fr: "Bureau d'assistance", en: "Service Desk" },
  titre: {
    fr: "Le Bureau d'assistance, la billetterie de vos clients",
    en: "The Service Desk, your customers' ticketing system",
  },
  groupe: "gestion",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Logiciel de billetterie pour PME, avec portail — Cloud OS",
      en: "Help desk software for small business — Cloud OS",
    },
    description: {
      fr: "Billets, portail client, courriel, clavardage et base de connaissances dans un seul Bureau d'assistance, compris dans votre forfait Cloud OS.",
      en: "Tickets, customer portal, email, live chat and knowledge base in one Service Desk, included in your Cloud OS plan.",
    },
  },
  accroche: {
    fr: "Billets, portail client, courriel et clavardage, au même endroit.",
    en: "Tickets, customer portal, email and live chat, in one place.",
  },
  motsCles: {
    fr: ["logiciel de billetterie", "service à la clientèle pme", "portail client", "help desk en français"],
    en: ["help desk software", "small business customer support", "customer portal", "ticketing system"],
  },
  corps: {
    fr: [
      {
        titre: "Chaque demande devient un billet",
        paragraphes: [
          "Vos clients écrivent par courriel, depuis votre portail ou depuis le clavardage de votre site : chaque demande arrive au même endroit, sous forme de billet numéroté. Le fil public et les notes internes vivent dans le même billet, et chaque réponse repart de votre propre adresse, avec ses pièces jointes.",
        ],
        points: [
          "Canal courriel : votre boîte IMAP/SMTP, relevée toutes les minutes.",
          "Portail client à votre nom et à vos couleurs, sans mot de passe à créer.",
          "Clavardage : un widget à coller sur votre site.",
        ],
      },
      {
        titre: "Répondre vite, et bien",
        paragraphes: [
          "À l'arrivée, chaque demande est classée — priorité, langue, catégorie — et une proposition de réponse est préparée pour l'agent. Les macros appliquent une réponse type et règlent le billet en un geste, et la base de connaissances propose vos articles au client avant même qu'il n'ouvre un billet.",
        ],
      },
      {
        titre: "Savoir où vous en êtes",
        paragraphes: [
          "Les rapports montrent le volume, les délais médians et au 90ᵉ centile, la charge par agent et la tenue de vos engagements de service. Un sondage de satisfaction part à la fermeture d'un billet, et sa moyenne entre dans les rapports.",
        ],
      },
    ],
    en: [
      {
        titre: "Every request becomes a ticket",
        paragraphes: [
          "Your customers write by email, from your portal or from your website's live chat: every request lands in the same place, as a numbered ticket. The public thread and internal notes live in the same ticket, and every reply goes out from your own address, with its attachments.",
        ],
        points: [
          "Email channel: your IMAP/SMTP mailbox, checked every minute.",
          "Customer portal under your name and colours, with no password to create.",
          "Live chat: a widget to paste on your website.",
        ],
      },
      {
        titre: "Answer quickly, and well",
        paragraphes: [
          "On arrival, each request is triaged — priority, language, category — and a draft reply is prepared for the agent. Macros apply a template reply and update the ticket in one step, and the knowledge base suggests your articles to the customer before they even open a ticket.",
        ],
      },
      {
        titre: "Know where you stand",
        paragraphes: [
          "Reports show volume, median and 90th-percentile response times, workload per agent and how well you keep your service commitments. A satisfaction survey goes out when a ticket is closed, and its average feeds into the reports.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Mes clients doivent-ils créer un compte ?",
        reponse: "Non. Sur le portail, ils s'identifient par un lien reçu par courriel, sans mot de passe ni compte à créer.",
      },
      {
        question: "Puis-je répondre depuis ma propre adresse courriel ?",
        reponse: "Oui. Le Bureau d'assistance relève votre boîte IMAP/SMTP, et vos réponses repartent de votre adresse avec leurs pièces jointes.",
      },
      {
        question: "Le Bureau d'assistance coûte-t-il un supplément ?",
        reponse: "Non. Il est compris dans l'abonnement dès le forfait Personnel.",
      },
    ],
    en: [
      {
        question: "Do my customers need to create an account?",
        reponse: "No. On the portal, they sign in with a link received by email, with no password or account to create.",
      },
      {
        question: "Can I reply from my own email address?",
        reponse: "Yes. The Service Desk checks your IMAP/SMTP mailbox, and your replies go out from your address with their attachments.",
      },
      {
        question: "Does the Service Desk cost extra?",
        reponse: "No. It is included in the subscription from the Personal plan.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/bureau-assistance/bureau-assistance-billet.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "Le Bureau d'assistance de Cloud OS : la liste des billets et un billet urgent ouvert",
        en: "The Cloud OS Service Desk: the ticket list and an urgent ticket open",
      },
    },
  ],
  voisines: ["erp", "writer"],
  articles: [],
};
