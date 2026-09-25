import type { FicheApplication } from "../types";

/**
 * Messagerie — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - /fonctions (déjà relue) : « Canaux, messages directs, présence. »
 * - Messages directs avec un autre utilisateur de Cloud OS, retrouvé par prénom, nom ou adresse
 *   courriel (src/lib/chat/social.ts, `searchUsers`, `startDm`).
 * - Canaux : groupe personnel (le créateur invite qui il veut) ou canal d'équipe (tous les membres de
 *   l'équipe y sont ajoutés) ; chaque équipe a un canal par défaut, créé d'office, qu'on ne peut ni
 *   supprimer ni quitter (social.ts `createChannel`, chat/service.ts, chat/types.ts `isDefault`).
 * - Invitations à un canal, acceptées ou refusées, avec notification ; une personne hors de
 *   l'équipe devient invitée de l'équipe en acceptant (social.ts `inviteToChannel`).
 * - Messages reçus en direct (flux /messages/stream, use-messages-stream), compteur de non-lus par
 *   conversation, nombre de membres en ligne (messagerie-app.tsx) ; bouton de la barre des tâches
 *   avec le total des non-lus (messagerie-button.tsx).
 * - Message direct reçu hors ligne : une notification dans le bureau, une seule par conversation
 *   tant qu'elle n'est pas lue (service.ts `notifyDmRecipient`).
 * - Supprimer une conversation directe (elle disparaît pour les deux), quitter ou supprimer un canal
 *   (fr.json `messaging.confirmDeleteDm`, `confirmDeleteChannel`). Messages texte, 8000 caractères
 *   au plus (service.ts).
 * - S'ouvre aussi en panneau latéral du Courriel (mail-app.tsx). Pas `desktopOnly`. Forfait
 *   Personnel (GET /api/v1/apps/catalog).
 *
 * Volontairement absent : envoi de fichiers ou d'images (le message n'a qu'un `body` texte), appels
 * audio ou vidéo, notification par courriel (la notification est dans le bureau seulement).
 *
 * À vérifier à la relecture : la recherche de personnes porte sur tous les comptes actifs de la
 * plateforme (pas seulement l'équipe) ; la fiche le dit sobrement (« un autre utilisateur de Cloud
 * OS »), à confirmer que c'est bien ce qu'on veut mettre en avant. La création d'équipe est réservée
 * au forfait Entreprise : la fiche parle des canaux d'équipe sans dire qui crée l'équipe.
 */
export const messagerie: FicheApplication = {
  id: "messagerie",
  apps: ["messagerie"],
  slug: { fr: "messagerie", en: "team-chat" },
  nom: { fr: "Messagerie", en: "Messaging" },
  titre: {
    fr: "Une messagerie d'équipe en ligne, hébergée au Québec",
    en: "Team chat in your browser, hosted in Québec",
  },
  groupe: "communication",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Messagerie d'équipe en ligne : canaux et messages — Cloud OS",
      en: "Online team chat: channels and direct messages — Cloud OS",
    },
    description: {
      fr: "Messages directs, canaux d'équipe, présence et non-lus en direct, dans le navigateur. Une messagerie d'équipe hébergée au Québec, comprise dans Cloud OS.",
      en: "Direct messages, team channels, live presence and unread counts, in the browser. Team chat hosted in Québec, included in Cloud OS.",
    },
  },
  accroche: {
    fr: "Messages directs et canaux d'équipe, dans le même bureau que vos dossiers.",
    en: "Direct messages and team channels, on the same desktop as your files.",
  },
  motsCles: {
    fr: ["messagerie d'équipe", "messagerie instantanée entreprise", "clavardage d'équipe", "alternative à slack québec"],
    en: ["team chat", "business instant messaging", "team messaging app canada", "slack alternative canada"],
  },
  corps: {
    fr: [
      {
        titre: "Messages directs et canaux",
        paragraphes: [
          "La Messagerie de Cloud OS réunit deux façons d'échanger. Le message direct, d'abord : vous retrouvez un autre utilisateur de Cloud OS par son nom ou son adresse, et la conversation s'ouvre. Le canal, ensuite : un groupe nommé, où plusieurs personnes discutent d'un même sujet.",
        ],
        points: [
          "Un canal personnel, où vous invitez qui vous voulez.",
          "Un canal d'équipe, où tous les membres de l'équipe sont ajoutés d'office.",
          "Un canal par défaut pour chaque équipe, créé avec elle.",
        ],
      },
      {
        titre: "Vous voyez qui est là, et ce qui vous attend",
        paragraphes: [
          "Les messages arrivent en direct, sans recharger la fenêtre. Chaque conversation affiche ses messages non lus et le nombre de membres en ligne, et un bouton de la barre des tâches donne le total des non-lus.",
          "Quand quelqu'un vous écrit alors que vous n'êtes pas connecté, une notification vous attend dans le bureau à votre retour.",
        ],
      },
      {
        titre: "Inviter, quitter, faire le ménage",
        paragraphes: [
          "Une invitation à un canal arrive dans l'application et dans vos notifications ; vous l'acceptez ou la refusez. Une personne extérieure à l'équipe qui accepte y entre comme invitée. Vous pouvez quitter un canal, ou supprimer une conversation directe : elle disparaît alors pour les deux participants.",
        ],
      },
      {
        titre: "Dans votre bureau, pas dans un onglet de plus",
        paragraphes: [
          "La Messagerie est une fenêtre de votre bureau Cloud OS, à côté de vos fichiers et de vos applications ; elle s'ouvre aussi en panneau latéral du Courriel. Les conversations restent sur des serveurs hébergés au Québec, et l'application fonctionne aussi sur tablette et téléphone, dans le navigateur.",
        ],
      },
    ],
    en: [
      {
        titre: "Direct messages and channels",
        paragraphes: [
          "Cloud OS Messaging brings together two ways to talk. The direct message, first: you find another Cloud OS user by name or address, and the conversation opens. The channel, next: a named group where several people discuss the same topic.",
        ],
        points: [
          "A personal channel, where you invite whoever you want.",
          "A team channel, where every team member is added automatically.",
          "A default channel for each team, created along with it.",
        ],
      },
      {
        titre: "See who is around, and what is waiting for you",
        paragraphes: [
          "Messages arrive live, without reloading the window. Each conversation shows its unread messages and how many members are online, and a taskbar button shows the total unread count.",
          "When someone writes to you while you are signed out, a notification is waiting on your desktop when you come back.",
        ],
      },
      {
        titre: "Invite, leave, tidy up",
        paragraphes: [
          "A channel invitation shows up in the app and in your notifications; you accept or decline it. Someone outside the team who accepts joins it as a guest. You can leave a channel, or delete a direct conversation: it then disappears for both participants.",
        ],
      },
      {
        titre: "On your desktop, not in yet another tab",
        paragraphes: [
          "Messaging is a window on your Cloud OS desktop, next to your files and apps; it also opens in a side panel of Mail. Conversations stay on servers hosted in Québec, and the app also works on tablets and phones, in the browser.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Avec qui puis-je discuter ?",
        reponse: "Avec les autres utilisateurs de Cloud OS : en message direct, dans un canal personnel où vous les invitez, ou dans le canal de votre équipe.",
      },
      {
        question: "Suis-je averti d'un message reçu hors ligne ?",
        reponse: "Oui. Un message direct reçu pendant votre absence laisse une notification dans votre bureau, et le compteur de non-lus vous attend à votre retour.",
      },
      {
        question: "Où sont conservées les conversations ?",
        reponse: "Sur les serveurs de Cloud OS, hébergés au Québec, comme le reste de votre espace.",
      },
      {
        question: "La Messagerie coûte-t-elle un supplément ?",
        reponse: "Non. Elle est comprise dans l'abonnement dès le forfait Personnel.",
      },
    ],
    en: [
      {
        question: "Who can I chat with?",
        reponse: "With other Cloud OS users: by direct message, in a personal channel you invite them to, or in your team's channel.",
      },
      {
        question: "Am I told about messages received while I was away?",
        reponse: "Yes. A direct message received while you were away leaves a notification on your desktop, and the unread count is waiting when you come back.",
      },
      {
        question: "Where are conversations stored?",
        reponse: "On Cloud OS servers, hosted in Québec, like the rest of your space.",
      },
      {
        question: "Does Messaging cost extra?",
        reponse: "No. It is included in the subscription from the Personal plan.",
      },
    ],
  },
  captures: [],
  voisines: ["equipes", "courriel", "agenda"],
  articles: [],
};
