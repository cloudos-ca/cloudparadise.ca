import type { FicheApplication } from "../types";

/**
 * Courriel — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - /fonctions (déjà relue) : webmail intégré, adresse @cloudos.ca activée depuis le bureau, compte
 *   externe (Gmail, Outlook) par IMAP/SMTP ou OAuth.
 * - Créer une boîte @cloudos.ca (API mailcow, MAIL_DOMAIN = BRAND_DOMAIN « cloudos.ca ») ou lier une
 *   boîte existante sur n'importe quel serveur IMAP/SMTP, avec détection automatique des réglages et
 *   réglages manuels en secours (src/lib/mail-app/service.ts, discovery.ts ; fr.json `mail.setup*`).
 * - Préréglages : Gmail, Outlook.com / Microsoft 365, iCloud, Yahoo, Fastmail, OVH, Vidéotron
 *   (providers.ts). Mot de passe d'application signalé pour Gmail, iCloud, Yahoo, Fastmail ;
 *   connexion Microsoft par OAuth (oauth.ts, `MailOAuthProvider = "microsoft"`).
 * - Identifiants vérifiés avant d'être gardés, chiffrés au repos en AES-256-GCM (crypto.ts,
 *   config.ts). Dissocier une boîte ne la supprime pas sur le serveur (`mail.confirmUnlink`).
 * - Plusieurs comptes, un compte par défaut, vue « Tous les comptes » (boîte unifiée) ; dossiers,
 *   recherche côté serveur dans un dossier ; répondre, répondre à tous, transférer, Cc, suivi
 *   (étoile), marquer non lu, supprimer ; pièces jointes reçues téléchargeables (mail-app.tsx,
 *   actions.ts).
 * - Option par compte « Inclure dans la recherche » : objet, correspondants et 2000 premiers
 *   caractères des 24 derniers mois, copie effacée si on décoche (`mail.indexing`, index-sync.ts).
 * - Panneau latéral dans la fenêtre : Agenda, Messagerie, Carnet d'adresses (mail-app.tsx,
 *   `MailPanel`).
 * - Pas `desktopOnly` (app-registry.tsx). Forfait Personnel (GET /api/v1/apps/catalog).
 *
 * Volontairement absent de la fiche : l'envoi de pièces jointes (ComposePayload.attachments n'est pas
 * posé par l'app Courriel : « l'app Courriel ne les pose pas encore ») ; l'enregistrement d'une pièce
 * jointe dans Google Drive ou OneDrive (n'apparaît que si un nuage externe est relié).
 *
 * À vérifier à la relecture : que la création de boîte @cloudos.ca est bien ouverte en production
 * (MAILCOW_API_URL / MAILCOW_API_KEY posés, IP de l'app autorisée dans l'API mailcow — voir
 * infra/mailcow/README.md) et que l'OAuth Microsoft est configuré (sinon « Outlook » passe par le
 * message « connexion non configurée »). Le relais sortant SES est encore en bac à sable
 * (infra/mailcow/README.md) : sans effet tant que mailcow envoie en direct.
 */
export const courriel: FicheApplication = {
  id: "courriel",
  apps: ["mail"],
  slug: { fr: "courriel", en: "email" },
  nom: { fr: "Courriel", en: "Mail" },
  titre: {
    fr: "Un webmail en ligne pour toutes vos boîtes courriel",
    en: "Webmail in your browser for all your mailboxes",
  },
  groupe: "communication",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Webmail en ligne pour toutes vos boîtes — Cloud OS",
      en: "Webmail in your browser for all your mailboxes — Cloud OS",
    },
    description: {
      fr: "Une adresse @cloudos.ca ou vos boîtes Gmail, Outlook et IMAP dans un seul webmail, avec une boîte unifiée. Hébergé au Québec, rien à installer.",
      en: "A @cloudos.ca address or your Gmail, Outlook and IMAP mailboxes in one webmail, with a unified inbox. Hosted in Québec, nothing to install.",
    },
  },
  accroche: {
    fr: "Votre adresse @cloudos.ca et vos autres boîtes, au même endroit.",
    en: "Your @cloudos.ca address and your other mailboxes, in one place.",
  },
  motsCles: {
    fr: ["webmail en ligne", "client courriel en ligne", "adresse courriel québec", "boîte unifiée gmail outlook"],
    en: ["online webmail", "web email client", "email address hosted in canada", "unified inbox gmail outlook"],
  },
  corps: {
    fr: [
      {
        titre: "Une adresse à vous, ou celles que vous avez déjà",
        paragraphes: [
          "Le Courriel de Cloud OS vous propose deux chemins. Vous créez une boîte @cloudos.ca depuis l'application, en choisissant l'adresse et le mot de passe. Ou vous liez une boîte que vous avez déjà, sur n'importe quel serveur IMAP et SMTP : vous entrez l'adresse et le mot de passe, et les réglages du serveur sont détectés pour vous.",
        ],
        points: [
          "Réglages connus pour Gmail, Outlook.com et Microsoft 365, iCloud, Yahoo, Fastmail, OVH et Vidéotron.",
          "Connexion Microsoft directe pour Outlook ; mot de passe d'application signalé quand le fournisseur l'exige.",
          "Réglages manuels quand la détection ne suffit pas.",
        ],
      },
      {
        titre: "Toutes vos boîtes dans une seule fenêtre",
        paragraphes: [
          "Vous ajoutez autant de comptes qu'il vous en faut et choisissez celui qui envoie par défaut. La vue « Tous les comptes » rassemble les messages reçus de toutes vos boîtes ; chaque compte garde aussi ses dossiers.",
          "Le reste est ce qu'on attend d'un client courriel : répondre, répondre à tous, transférer, mettre un message en suivi, le marquer non lu, chercher dans un dossier, télécharger les pièces jointes.",
        ],
      },
      {
        titre: "Vos identifiants, protégés",
        paragraphes: [
          "Avant d'enregistrer une boîte, Cloud OS vérifie que le serveur accepte la connexion ; les identifiants sont ensuite conservés chiffrés. Dissocier une boîte efface ces identifiants, sans toucher à la boîte elle-même chez son fournisseur.",
          "Si vous le choisissez, compte par compte, le courrier des 24 derniers mois devient cherchable depuis la recherche du bureau. Décocher l'option efface la copie qui servait à la recherche.",
        ],
      },
      {
        titre: "À côté de l'agenda et des contacts",
        paragraphes: [
          "La fenêtre du Courriel ouvre en panneau latéral l'Agenda, la Messagerie et le Carnet d'adresses : vous vérifiez une date ou retrouvez un numéro sans quitter le message que vous lisez. Le Courriel s'ouvre aussi sur une tablette ou un téléphone, dans le navigateur.",
        ],
      },
    ],
    en: [
      {
        titre: "An address of your own, or the ones you already have",
        paragraphes: [
          "Cloud OS Mail gives you two options. You create a @cloudos.ca mailbox from the app, choosing the address and the password. Or you link a mailbox you already have, on any IMAP and SMTP server: you enter the address and password, and the server settings are detected for you.",
        ],
        points: [
          "Known settings for Gmail, Outlook.com and Microsoft 365, iCloud, Yahoo, Fastmail, OVH and Vidéotron.",
          "Direct Microsoft sign-in for Outlook; an app password is flagged when the provider requires one.",
          "Manual settings when detection is not enough.",
        ],
      },
      {
        titre: "All your mailboxes in one window",
        paragraphes: [
          "You add as many accounts as you need and choose the one that sends by default. The “All accounts” view brings together the messages received in every mailbox; each account also keeps its own folders.",
          "The rest is what you expect from an email client: reply, reply all, forward, flag a message, mark it unread, search a folder, download attachments.",
        ],
      },
      {
        titre: "Your credentials, protected",
        paragraphes: [
          "Before saving a mailbox, Cloud OS checks that the server accepts the connection; the credentials are then stored encrypted. Unlinking a mailbox deletes those credentials, without touching the mailbox itself at its provider.",
          "If you choose to, account by account, the last 24 months of mail become searchable from the desktop search. Unchecking the option deletes the copy used for searching.",
        ],
      },
      {
        titre: "Next to your calendar and contacts",
        paragraphes: [
          "The Mail window opens the Calendar, Messaging and the Address book in a side panel: you check a date or find a phone number without leaving the message you are reading. Mail also opens on a tablet or phone, in the browser.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Puis-je obtenir une adresse @cloudos.ca ?",
        reponse: "Oui. Vous la créez depuis l'application Courriel, en choisissant la partie avant le @ et un mot de passe d'au moins 10 caractères, avec lettres et chiffres.",
      },
      {
        question: "Puis-je lire mon Gmail ou mon Outlook dans Cloud OS ?",
        reponse: "Oui. Vous liez la boîte avec son adresse et son mot de passe : un mot de passe d'application pour Gmail, la connexion Microsoft pour Outlook. Les autres fournisseurs IMAP et SMTP fonctionnent aussi.",
      },
      {
        question: "Dissocier une boîte supprime-t-il mes messages ?",
        reponse: "Non. Cloud OS efface seulement les identifiants qu'il gardait. La boîte et ses messages restent chez leur fournisseur.",
      },
      {
        question: "Le Courriel coûte-t-il un supplément ?",
        reponse: "Non. Il est compris dans l'abonnement dès le forfait Personnel.",
      },
    ],
    en: [
      {
        question: "Can I get a @cloudos.ca address?",
        reponse: "Yes. You create it from the Mail app, choosing the part before the @ and a password of at least 10 characters, with letters and numbers.",
      },
      {
        question: "Can I read my Gmail or Outlook in Cloud OS?",
        reponse: "Yes. You link the mailbox with its address and password: an app password for Gmail, Microsoft sign-in for Outlook. Other IMAP and SMTP providers work too.",
      },
      {
        question: "Does unlinking a mailbox delete my messages?",
        reponse: "No. Cloud OS only deletes the credentials it was keeping. The mailbox and its messages stay with their provider.",
      },
      {
        question: "Does Mail cost extra?",
        reponse: "No. It is included in the subscription from the Personal plan.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/courriel/courriel-lier.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "Courriel dans Cloud OS : lier une boîte existante, sur n'importe quel serveur",
        en: "Mail in Cloud OS: linking an existing mailbox, on any server",
      },
    },
  ],
  voisines: ["carnet-adresses", "agenda", "messagerie", "bureau-assistance"],
  articles: [],
};
