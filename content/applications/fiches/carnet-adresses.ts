import type { FicheApplication } from "../types";

/**
 * Carnet d'adresses — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - /fonctions (déjà relue) : « Agenda et contacts […] Synchronisation avec un service externe
 *   compatible CalDAV/CardDAV. »
 * - Carnet personnel, propre à chaque utilisateur, sans partage d'équipe (app-registry.tsx,
 *   src/lib/contacts/actions.ts).
 * - Champs : prénom (obligatoire), nom, entreprise, poste, courriel, téléphone, cellulaire, adresse,
 *   notes ; favoris affichés en tête ; recherche dans la liste (contacts/serialize.ts,
 *   address-book-app.tsx).
 * - Contacts d'un serveur CardDAV relié dans Paramètres → Comptes externes, le même compte que pour
 *   l'Agenda ; détection du serveur à partir de l'adresse, préréglages iCloud et Fastmail,
 *   synchronisation toutes les 5 minutes et « Synchroniser maintenant » ; un carnet externe en
 *   lecture seule est respecté ; retirer le compte ne supprime rien sur le serveur
 *   (settings/dav-accounts-section.tsx, src/lib/dav/discovery.ts, sync.ts `SYNC_INTERVAL_MS`,
 *   fr.json `dav`). Les numéros et adresses courriel supplémentaires de la vCard sont affichés.
 * - Contacts retrouvables depuis la recherche du bureau (src/lib/search/registry.ts, groupe
 *   « contacts », cible `address-book`).
 * - S'ouvre en panneau latéral du Courriel (mail-app.tsx). Pas `desktopOnly`. Forfait Personnel
 *   (GET /api/v1/apps/catalog).
 *
 * Volontairement absent : l'écriture vers le serveur CardDAV. Le code la prépare (src/lib/dav/write.ts,
 * `dirtyAt`, PUT dans dav/client.ts), mais l'interface dit encore « La synchronisation est descendante
 * pour l'instant : les éléments externes sont affichés en lecture seule » (fr.json `dav.intro`).
 * Google Contacts : refusé (OAuth « à venir », dav/discovery.ts). Import/export de fichiers vCard :
 * pas trouvé dans l'app.
 *
 * À vérifier à la relecture : si la synchronisation est désormais dans les deux sens, on peut le dire
 * (et corriger `dav.intro` dans le produit).
 */
export const carnetAdresses: FicheApplication = {
  id: "carnet-adresses",
  apps: ["address-book"],
  slug: { fr: "carnet-adresses", en: "address-book" },
  nom: { fr: "Carnet d'adresses", en: "Address book" },
  titre: {
    fr: "Un carnet d'adresses en ligne, relié à votre serveur CardDAV",
    en: "An online address book, connected to your CardDAV server",
  },
  groupe: "communication",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Carnet d'adresses en ligne, synchro CardDAV — Cloud OS",
      en: "Online address book with CardDAV sync — Cloud OS",
    },
    description: {
      fr: "Vos contacts dans le navigateur : favoris, recherche, et les carnets de votre serveur CardDAV (Nextcloud, iCloud, Fastmail…). Compris dans Cloud OS.",
      en: "Your contacts in the browser: favourites, search, and the address books from your CardDAV server (Nextcloud, iCloud, Fastmail…). Included in Cloud OS.",
    },
  },
  accroche: {
    fr: "Vos contacts, et ceux de votre serveur CardDAV, au même endroit.",
    en: "Your contacts, and those from your CardDAV server, in one place.",
  },
  motsCles: {
    fr: ["carnet d'adresses en ligne", "gestion de contacts en ligne", "synchronisation carddav", "contacts nextcloud"],
    en: ["online address book", "online contact manager", "carddav sync", "nextcloud contacts"],
  },
  corps: {
    fr: [
      {
        titre: "Vos contacts, sous la main",
        paragraphes: [
          "Le Carnet d'adresses de Cloud OS garde, pour chaque personne, ce qui sert au quotidien : nom, entreprise, poste, courriel, téléphone, cellulaire, adresse et notes. Vos favoris restent en tête de liste, et une recherche retrouve un contact en quelques lettres.",
        ],
      },
      {
        titre: "Vos carnets existants, sans ressaisie",
        paragraphes: [
          "Vos contacts vivent déjà sur un serveur CardDAV, comme Nextcloud, iCloud ou Fastmail ? Vous reliez ce serveur une seule fois, dans les Paramètres, et ses carnets apparaissent dans le Carnet d'adresses. Le même compte alimente aussi l'Agenda.",
        ],
        points: [
          "L'adresse du serveur est détectée à partir de votre adresse courriel quand c'est possible.",
          "Synchronisation automatique toutes les cinq minutes, ou sur demande.",
          "Tous les numéros et toutes les adresses courriel d'une fiche sont affichés, pas seulement les premiers.",
          "Retirer le serveur ne supprime rien chez lui.",
        ],
      },
      {
        titre: "Relié au reste de votre bureau",
        paragraphes: [
          "Un contact se retrouve depuis la recherche du bureau, sans ouvrir l'application. Le Carnet d'adresses s'ouvre aussi en panneau latéral du Courriel, pour retrouver un numéro sans quitter le message que vous lisez.",
        ],
      },
      {
        titre: "Un carnet à vous",
        paragraphes: [
          "Le carnet est personnel : vos contacts ne sont pas partagés avec votre équipe. Ils restent dans votre espace, hébergé au Québec, et vous les consultez aussi sur une tablette ou un téléphone, dans le navigateur.",
        ],
      },
    ],
    en: [
      {
        titre: "Your contacts, close at hand",
        paragraphes: [
          "The Cloud OS Address book keeps, for each person, what you need day to day: name, company, job title, email, phone, mobile, address and notes. Your favourites stay at the top of the list, and search finds a contact in a few letters.",
        ],
      },
      {
        titre: "Your existing address books, without re-keying",
        paragraphes: [
          "Do your contacts already live on a CardDAV server, such as Nextcloud, iCloud or Fastmail? You connect that server once, in Settings, and its address books appear in the Address book. The same account also feeds the Calendar.",
        ],
        points: [
          "The server address is detected from your email address when possible.",
          "Automatic sync every five minutes, or on demand.",
          "Every phone number and email address on a card is shown, not just the first ones.",
          "Removing the server deletes nothing on it.",
        ],
      },
      {
        titre: "Connected to the rest of your desktop",
        paragraphes: [
          "A contact can be found from the desktop search, without opening the app. The Address book also opens in a side panel of Mail, so you can find a number without leaving the message you are reading.",
        ],
      },
      {
        titre: "An address book of your own",
        paragraphes: [
          "The address book is personal: your contacts are not shared with your team. They stay in your space, hosted in Québec, and you can also look them up on a tablet or phone, in the browser.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Puis-je retrouver mes contacts Nextcloud ou iCloud ?",
        reponse: "Oui. Vous reliez votre serveur CardDAV dans les Paramètres, et ses carnets apparaissent dans le Carnet d'adresses. iCloud et Fastmail demandent un mot de passe d'application.",
      },
      {
        question: "Et mes contacts Google ?",
        reponse: "Pas encore. Google exige une connexion que Cloud OS n'offre pas encore pour les contacts.",
      },
      {
        question: "Mes contacts sont-ils partagés avec mon équipe ?",
        reponse: "Non. Le Carnet d'adresses est personnel : seul vous y avez accès.",
      },
      {
        question: "Le Carnet d'adresses coûte-t-il un supplément ?",
        reponse: "Non. Il est compris dans l'abonnement dès le forfait Personnel.",
      },
    ],
    en: [
      {
        question: "Can I bring in my Nextcloud or iCloud contacts?",
        reponse: "Yes. You connect your CardDAV server in Settings, and its address books appear in the Address book. iCloud and Fastmail require an app password.",
      },
      {
        question: "What about my Google contacts?",
        reponse: "Not yet. Google requires a type of sign-in that Cloud OS does not offer for contacts yet.",
      },
      {
        question: "Are my contacts shared with my team?",
        reponse: "No. The Address book is personal: only you have access to it.",
      },
      {
        question: "Does the Address book cost extra?",
        reponse: "No. It is included in the subscription from the Personal plan.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/carnet-adresses/carnet-contact.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "Le Carnet d'adresses de Cloud OS : la fiche d'un contact",
        en: "The Cloud OS Address Book: a contact's details",
      },
    },
  ],
  voisines: ["courriel", "agenda", "messagerie"],
  articles: [],
};
