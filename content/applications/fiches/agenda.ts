import type { FicheApplication } from "../types";

/**
 * Agenda — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Vue mensuelle ; création, modification et suppression d'événements : titre, description, date,
 *   heure de début et de fin (fin par défaut une heure après le début), lieu, « Toute la journée »,
 *   « Me rappeler » (src/components/os/apps/agenda/agenda-app.tsx ; libellés `agenda.*` de fr.json).
 * - Le rappel est une notification dans Cloud OS (centre de notifications), envoyée à l'heure de
 *   début de l'événement : remindAt = startAt (parseEventForm, src/lib/calendar/actions.ts),
 *   dispatchDueReminders (src/lib/jobs/scheduler.ts). Un rappel sur un événement récurrent se réarme
 *   pour l'occurrence suivante.
 * - Les heures sont celles du fuseau de l'utilisateur (getCalendarMonthAction).
 * - Les cédules de l'espace actif (tâches planifiées) sont superposées à la grille, en lecture
 *   seule (getScheduleMonthAction réutilisé ; libellé « Cédule »).
 * - Serveur CalDAV relié depuis les Paramètres (settings/dav-accounts-section.tsx) : adresse
 *   détectée automatiquement à partir de l'adresse courriel (src/lib/dav/discovery.ts), préréglages
 *   iCloud et Fastmail ; mot de passe d'application exigé par iCloud, Fastmail et Yahoo
 *   (dav.appPasswordHint). Google Agenda n'est pas pris en charge (OAuth « à venir », même libellé).
 * - Synchronisation toutes les cinq minutes (SYNC_INTERVAL_MS, src/lib/dav/sync.ts) et bouton
 *   « Synchroniser maintenant ». Chaque calendrier relié a sa couleur et une case pour l'afficher ou
 *   le masquer. Retirer un serveur ne supprime rien sur le serveur (dav.confirmUnlink).
 * - Événements récurrents affichés avec leur règle (« Toutes les 2 semaines ») ; ils ne se modifient
 *   pas dans l'Agenda, mais on peut y armer un rappel (setEventReminderAction, dav.recurringEvent).
 * - Spotlight trouve un événement et ouvre l'Agenda sur son mois (readSearchFocus, agenda-app.tsx).
 * - Forfait : `personnel` (GET /api/v1/apps/catalog en production).
 *
 * À vérifier à la relecture :
 * - L'écriture vers un calendrier CalDAV relié : le code la gère (lib/dav/write.ts, phase « push »
 *   de lib/dav/sync.ts), mais le texte des Paramètres dit encore « La synchronisation est descendante
 *   pour l'instant : les éléments externes sont affichés en lecture seule ». La fiche ne promet donc
 *   que l'affichage des calendriers externes. À trancher dans l'app, puis à ajouter si ça marche.
 * - /fonctions parle d'« Agenda partagé » : dans le code, les événements sont personnels
 *   (userId) ; aucun calendrier d'équipe. Seul un calendrier partagé sur le serveur CalDAV relié
 *   apparaît chez chacun. D'où `articles: []` (l'article « calendrier partagé » promettrait plus) et
 *   aucune mention de partage dans la fiche.
 * - Pas de création de récurrence dans le formulaire (pas de champ) : la fiche n'en promet pas.
 */
export const agenda: FicheApplication = {
  id: "agenda",
  apps: ["agenda"],
  slug: { fr: "agenda", en: "calendar" },
  nom: { fr: "Agenda", en: "Agenda" },
  titre: {
    fr: "Un agenda en ligne, avec rappels et vos calendriers CalDAV",
    en: "An online calendar, with reminders and your CalDAV calendars",
  },
  groupe: "gestion",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Agenda en ligne avec rappels et CalDAV — Cloud OS",
      en: "Online calendar with reminders and CalDAV — Cloud OS",
    },
    description: {
      fr: "Vos rendez-vous, vos rappels et vos calendriers iCloud ou Fastmail dans un seul agenda en ligne, à côté de vos tâches planifiées. Hébergé au Québec.",
      en: "Your appointments, reminders and iCloud or Fastmail calendars in one online calendar, right next to your scheduled tasks. Hosted in Québec, in Canada.",
    },
  },
  accroche: {
    fr: "Vos rendez-vous, vos rappels et vos calendriers externes, au même endroit.",
    en: "Your appointments, reminders and external calendars, in one place.",
  },
  motsCles: {
    fr: ["agenda en ligne", "calendrier en ligne avec rappels", "agenda caldav", "calendrier icloud dans le navigateur"],
    en: ["online calendar", "online calendar with reminders", "caldav calendar", "icloud calendar in the browser"],
  },
  corps: {
    fr: [
      {
        titre: "Votre mois, d'un coup d'œil",
        paragraphes: [
          "L'Agenda de Cloud OS affiche le mois entier. Un clic sur un jour ajoute un événement : un titre, une date, une heure de début et de fin, un lieu et une description, ou la journée entière. Les heures suivent votre propre fuseau horaire.",
        ],
        points: [
          "« Me rappeler » : une notification dans Cloud OS à l'heure de l'événement.",
          "Le lieu d'un événement, ou sa récurrence, se lit directement dans la case du jour.",
          "La recherche Spotlight retrouve un événement et ouvre l'Agenda sur le bon mois.",
        ],
      },
      {
        titre: "Vos calendriers externes, dans la même grille",
        paragraphes: [
          "Reliez votre serveur de calendrier depuis les Paramètres : il suffit souvent de votre adresse courriel, l'adresse du serveur est trouvée pour vous. Les calendriers compatibles CalDAV, comme ceux d'iCloud ou de Fastmail, apparaissent alors dans l'Agenda, chacun avec sa couleur et une case pour l'afficher ou le masquer.",
          "La synchronisation repasse toutes les cinq minutes, ou tout de suite sur demande. Les événements récurrents s'affichent avec leur règle, et vous pouvez y ajouter un rappel même s'ils se modifient dans leur application d'origine.",
        ],
      },
      {
        titre: "Vos tâches planifiées, à côté de vos rendez-vous",
        paragraphes: [
          "Les cédules de votre espace — un rapport qui part tous les lundis, un traitement qui tourne chaque nuit — apparaissent dans la grille, à leur date. Vous voyez d'un seul regard ce qui vous attend et ce que Cloud OS fera pour vous ce jour-là.",
        ],
      },
    ],
    en: [
      {
        titre: "Your month at a glance",
        paragraphes: [
          "The Cloud OS Agenda shows the whole month. One click on a day adds an event: a title, a date, a start and end time, a location and a description, or the whole day. Times follow your own time zone.",
        ],
        points: [
          "“Remind me”: a notification in Cloud OS at the time of the event.",
          "An event's location, or its recurrence, shows right in the day's cell.",
          "Spotlight search finds an event and opens the Agenda on the right month.",
        ],
      },
      {
        titre: "Your external calendars, in the same grid",
        paragraphes: [
          "Link your calendar server from Settings: your email address is often enough, and the server address is found for you. CalDAV-compatible calendars, such as iCloud or Fastmail, then show up in the Agenda, each with its own colour and a checkbox to show or hide it.",
          "Sync runs again every five minutes, or right away on request. Recurring events are shown with their rule, and you can add a reminder to them even though they are edited in their original app.",
        ],
      },
      {
        titre: "Your scheduled tasks, next to your appointments",
        paragraphes: [
          "Your space's schedules — a report sent every Monday, a job that runs every night — appear in the grid on their date. You see at a glance what is ahead of you and what Cloud OS will do for you that day.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Puis-je voir mon calendrier iCloud dans l'Agenda ?",
        reponse: "Oui. Reliez votre compte depuis les Paramètres avec un mot de passe d'application, comme iCloud l'exige ; vos calendriers apparaissent dans l'Agenda et se synchronisent toutes les cinq minutes. Fastmail et les autres serveurs CalDAV se relient de la même façon.",
      },
      {
        question: "Et Google Agenda ?",
        reponse: "Pas pour l'instant : Google exige une connexion d'un autre type, que l'Agenda ne propose pas encore. Les serveurs compatibles CalDAV, eux, se relient directement.",
      },
      {
        question: "Comment fonctionnent les rappels ?",
        reponse: "Cochez « Me rappeler » sur un événement : une notification vous attend dans Cloud OS à l'heure où il commence. Sur un événement récurrent, le rappel revient à chaque occurrence.",
      },
      {
        question: "Retirer un serveur relié efface-t-il mes événements ?",
        reponse: "Non. Ses calendriers disparaissent de l'Agenda, mais rien n'est supprimé sur le serveur.",
      },
    ],
    en: [
      {
        question: "Can I see my iCloud calendar in the Agenda?",
        reponse: "Yes. Link your account from Settings with an app-specific password, as iCloud requires; your calendars appear in the Agenda and sync every five minutes. Fastmail and other CalDAV servers are linked the same way.",
      },
      {
        question: "What about Google Calendar?",
        reponse: "Not for now: Google requires a different kind of sign-in, which the Agenda does not offer yet. CalDAV-compatible servers, on the other hand, link directly.",
      },
      {
        question: "How do reminders work?",
        reponse: "Tick “Remind me” on an event: a notification is waiting for you in Cloud OS when it starts. On a recurring event, the reminder comes back for every occurrence.",
      },
      {
        question: "Does removing a linked server delete my events?",
        reponse: "No. Its calendars disappear from the Agenda, but nothing is deleted on the server.",
      },
    ],
  },
  captures: [],
  voisines: ["carnet-adresses", "courriel", "planification"],
  articles: [],
};
