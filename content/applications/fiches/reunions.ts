import type { FicheApplication } from "../types";

/**
 * Réunions (« Meetings » en anglais).
 *
 * App maison (id `meetings`), en production depuis le 2026-09-29 (lot 1, cloudparadise_hpc #41), complétée
 * jusqu'au lot 4 le 2026-09-30. Specs : cloudparadise_hpc/docs/superpowers/specs/2026-09-28-reunions-lot1-design.md,
 * 2026-09-29-reunions-lot2-design.md, 2026-09-29-reunions-lot3-design.md, 2026-09-30-reunions-lot4-design.md.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc, origin/main) le 2026-10-01 :
 * - Libellés : « Réunions » / « Meetings » (os.apps.meetings, fr.json / en.json). Utilisable sur téléphone :
 *   pas de `desktopOnly`, `keepMountedOnMobile` (app-registry.tsx). Forfait `personnel`
 *   (GET /api/v1/apps/catalog en production). Aucun interrupteur : MEETINGS_ENV="prod" posé par deploy.yml.
 * - Plafonds (MEETING_LIMITS, src/lib/meetings/model.ts) : 25 participants admis à la fois, 4 h par réunion
 *   (avertissement 5 min avant), 3 réunions simultanées par hôte.
 * - Salle à lien permanent (« Nouvelle réunion », « Copier le lien », « Mes salles »). Accès des invités réglé par
 *   l'hôte : « Pas d'invités », « Salle d'attente », « Entrée libre » (meetings.panel.access*). L'hôte et les membres
 *   de l'équipe de la salle entrent directement ; un invité sans compte passe par la page /r/<code>, donne son nom,
 *   attend d'être admis. L'hôte admet, refuse, retire, coupe le micro d'un participant ou de tous, baisse les mains,
 *   termine pour tous (meetings.panel.*, meetings.room.*).
 * - Préparation : micro, caméra, entrer micro ou caméra coupés (meetings.prejoin.*). Partage d'écran, un à la fois
 *   (meetings.room.shareBusy).
 * - Lot 2 : chat à tout le monde ou privé, fichiers joints (25 Mo, 20 par personne et par réunion, conservés 90 jours ;
 *   « Enregistrer dans Fichiers › Réunions »), main levée, réactions ; historique du chat relu après coup par l'hôte et
 *   les membres, pas les invités (spec lot 2 ; meetings.files.*, meetings.history.*).
 * - Lot 3 : « Planifier » dans l'app et « Réunion vidéo » dans Nouvel événement de l'Agenda ; date, heure, durée,
 *   récurrence chaque jour / semaine / mois jusqu'à une date ou un nombre de séances ; invités par nom ou adresse ;
 *   courriel au nom de l'organisateur avec .ics, réponse Oui / Peut-être / Non sur une page web (meetings.rsvp.*) ;
 *   un utilisateur Cloud OS invité reçoit l'événement dans son Agenda et entre sans salle d'attente ; modification et
 *   annulation envoyées aux invités. « Lancer une réunion » dans la Messagerie (messaging.startMeeting).
 * - Lot 4 : seul l'hôte enregistre ; tous les participants sont avertis (bandeau) et une personne qui arrive pendant
 *   l'enregistrement le sait avant d'entrer et peut ne pas entrer (meetings.recording.notice / decline). Vidéo composée
 *   de la salle, transcription horodatée (.srt, whisper du media-agent), compte rendu (Résumé, Points abordés,
 *   Décisions, Actions) par le LLM du parc (src/lib/meetings/recording-summary.ts). Le tout dans les Fichiers de
 *   l'hôte ; case « Partager l'enregistrement avec les autres membres de l'équipe » (commit 18ed8eb0). Plafond mensuel
 *   d'heures enregistrées par hôte, réglable par l'admin (SystemConfig.meetingRecordingMonthlyMinutes, 600 par défaut).
 *
 * Décisions et limites :
 * - Le plafond mensuel d'enregistrement n'est pas chiffré (réglable par l'admin, 10 h par défaut) : décision du
 *   client du 2026-10-01, la page Tarifs cite les Réunions sans chiffre.
 * - Hébergement (décision du client du 2026-10-01) : on dit seulement que les données sont au Canada, région de
 *   Montréal — le média passe par un service géré dans la région ca-central-1, le compte rendu par le LLM du parc.
 *   Ni « notre matériel », ni nom de fournisseur, ni « produit par les serveurs de Cloud OS ».
 * - Pas de capture : compte-captures.ts (produit) ne sème aucune salle ; il faut y ajouter des salles, une réunion
 *   planifiée et un enregistrement prêt, puis une ligne dans SCENARIOS (scripts/captures-applications.ts).
 * - Non promis : arrière-plan flou, sous-titres en direct, webinaires, appels qui sonnent dans la Messagerie,
 *   visio dans l'app mobile native (hors programme, spec lot 1 et lot 4).
 */
export const reunions: FicheApplication = {
  id: "reunions",
  apps: ["meetings"],
  slug: { fr: "reunions-video", en: "video-meetings" },
  nom: { fr: "Réunions", en: "Meetings" },
  titre: {
    fr: "Des réunions vidéo dans votre bureau en ligne, avec vos invités",
    en: "Video meetings in your online desktop, with your guests",
  },
  groupe: "communication",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Réunions vidéo en ligne, invités par lien — Cloud OS",
      en: "Online video meetings with guest links — Cloud OS",
    },
    description: {
      fr: "Réunions vidéo jusqu'à 25 personnes, invités sans compte par simple lien, partage d'écran, planification dans l'agenda, enregistrement transcrit.",
      en: "Video meetings for up to 25 people, guests join by link with no account, screen sharing, calendar scheduling, and recordings with a transcript.",
    },
  },
  accroche: {
    fr: "Réunions vidéo jusqu'à 25 personnes, invités par lien, enregistrement avec transcription et compte rendu.",
    en: "Video meetings for up to 25 people, guests by link, recordings with a transcript and minutes.",
  },
  motsCles: {
    fr: ["réunion vidéo en ligne", "visioconférence", "logiciel de visioconférence", "réunion en ligne avec invités", "enregistrer une réunion et la transcrire"],
    en: ["online video meeting", "video conferencing", "video conferencing software", "online meeting with guests", "record and transcribe a meeting"],
  },
  corps: {
    fr: [
      {
        titre: "Une salle, un lien, et tout le monde entre",
        paragraphes: [
          "« Nouvelle réunion » crée une salle et son lien. Le lien ne change pas : la même salle sert à la réunion d'équipe du lundi, semaine après semaine. Les membres de votre équipe entrent directement ; une personne de l'extérieur ouvre le lien dans son navigateur, donne son nom, et attend que vous l'admettiez. Elle n'a ni compte à créer ni logiciel à installer.",
          "Avant d'entrer, chacun choisit son micro et sa caméra, et peut arriver micro ou caméra coupés. Dans la salle, un participant à la fois partage son écran.",
        ],
        points: [
          "Jusqu'à 25 participants, et jusqu'à 4 heures par réunion.",
          "Accès des invités au choix : salle d'attente, entrée libre, ou pas d'invités du tout.",
          "Dans le navigateur d'un ordinateur ou d'un téléphone. Passer à une autre application de Cloud OS ne coupe pas la réunion.",
        ],
      },
      {
        titre: "Pendant la réunion",
        paragraphes: [
          "Le chat s'adresse à tout le monde ou à une seule personne, en privé. On y joint un fichier depuis son ordinateur ou depuis ses Fichiers, jusqu'à 25 Mo ; les participants le téléchargent ou l'enregistrent dans leurs propres Fichiers. On lève la main, on réagit sans interrompre.",
          "L'hôte garde la main : il admet ou refuse les personnes en attente, retire un participant, coupe le micro d'une personne ou de tous, baisse les mains levées et termine la réunion pour tout le monde. Après coup, l'hôte et les membres de l'équipe relisent l'historique du chat de la salle.",
        ],
      },
      {
        titre: "Planifier et inviter",
        paragraphes: [
          "Planifiez une réunion depuis l'application Réunions ou depuis l'Agenda, en cochant « Réunion vidéo » dans un nouvel événement : date, heure, durée, et au besoin une récurrence chaque jour, chaque semaine ou chaque mois. Ajoutez vos invités par leur nom ou leur adresse courriel.",
          "Chaque invité reçoit un courriel envoyé à votre nom, avec le lien et l'invitation à ajouter à son calendrier, et répond Oui, Peut-être ou Non. Un collègue qui utilise Cloud OS trouve la réunion dans son Agenda et entre sans passer par la salle d'attente. Si vous modifiez l'heure ou annulez, les invités en sont avisés.",
          "Pour une réunion improvisée, « Lancer une réunion » dans la Messagerie dépose le lien dans la conversation.",
        ],
      },
      {
        titre: "Enregistrer, transcrire, résumer",
        paragraphes: [
          "L'hôte peut enregistrer la réunion. Tous les participants en sont avertis, et une personne qui arrive pendant l'enregistrement le sait avant d'entrer : elle peut choisir de ne pas entrer.",
          "À la fin, trois fichiers arrivent dans les Fichiers de l'hôte : la vidéo de la salle, avec l'écran partagé en grand ; la transcription horodatée de ce qui a été dit ; et un compte rendu rédigé par l'IA de Cloud OS — résumé, points abordés, décisions et actions à faire. Personne d'autre n'y a accès tant que l'hôte ne partage pas ; une case suffit pour les partager avec l'équipe de la salle.",
        ],
        points: [
          "Le son et la vidéo des réunions passent par des serveurs de la région de Montréal.",
          "La vidéo, la transcription et le compte rendu sont conservés au Canada, dans la région de Montréal, chiffrés.",
          "L'enregistrement est compris dans le forfait, avec un plafond mensuel d'heures enregistrées.",
        ],
      },
    ],
    en: [
      {
        titre: "One room, one link, and everyone gets in",
        paragraphes: [
          "“New meeting” creates a room and its link. The link doesn't change: the same room serves Monday's team meeting, week after week. Members of your team walk straight in; someone from outside opens the link in their browser, enters their name, and waits for you to let them in. They have no account to create and no software to install.",
          "Before joining, everyone picks their microphone and camera, and can arrive with either one off. In the room, one participant at a time shares their screen.",
        ],
        points: [
          "Up to 25 participants, and up to 4 hours per meeting.",
          "Guest access is your call: a waiting room, open entry, or no guests at all.",
          "In the browser on a computer or a phone. Switching to another Cloud OS app doesn't cut the meeting.",
        ],
      },
      {
        titre: "During the meeting",
        paragraphes: [
          "The chat goes to everyone or, privately, to one person. You attach a file from your computer or from your Files, up to 25 MB; participants download it or save it to their own Files. You raise your hand, or react without interrupting.",
          "The host stays in charge: they let in or turn away people who are waiting, remove a participant, mute one person or everyone, lower raised hands and end the meeting for all. Afterwards, the host and team members can read back the room's chat history.",
        ],
      },
      {
        titre: "Schedule and invite",
        paragraphes: [
          "Schedule a meeting from the Meetings app or from the Agenda, by ticking “Video meeting” in a new event: date, time, length, and if needed a repeat every day, week or month. Add your guests by name or email address.",
          "Each guest gets an email sent in your name, with the link and an invitation to add to their calendar, and answers Yes, Maybe or No. A colleague who uses Cloud OS finds the meeting in their Agenda and walks in without the waiting room. If you change the time or cancel, your guests are told.",
          "For an impromptu meeting, “Start a meeting” in Messaging drops the link into the conversation.",
        ],
      },
      {
        titre: "Record, transcribe, summarize",
        paragraphes: [
          "The host can record the meeting. Every participant is told, and someone arriving during a recording knows it before they join: they can choose not to come in.",
          "At the end, three files land in the host's Files: the video of the room, with the shared screen shown large; a timestamped transcript of what was said; and minutes written by Cloud OS's AI — summary, topics, decisions and action items. Nobody else can see them until the host shares them; one checkbox shares them with the room's team.",
        ],
        points: [
          "Meeting audio and video go through servers in the Montréal region.",
          "The video, the transcript and the minutes are stored in Canada, in the Montréal region, encrypted.",
          "Recording is included in the plan, with a monthly cap on recorded hours.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Mes invités doivent-ils créer un compte ?",
        reponse: "Non. Ils ouvrent le lien dans leur navigateur, donnent leur nom et attendent que vous les admettiez. Vous pouvez aussi ouvrir l'entrée à tous ceux qui ont le lien, ou fermer la salle aux invités.",
      },
      {
        question: "Combien de personnes peuvent participer ?",
        reponse: "Jusqu'à 25 à la fois, pour une réunion de 4 heures au plus. La salle prévient cinq minutes avant la fin.",
      },
      {
        question: "Quel forfait faut-il ?",
        reponse: "Les Réunions sont comprises dès le forfait Personnel, enregistrement compris, dans la limite d'un plafond mensuel d'heures enregistrées.",
      },
      {
        question: "Qui a accès à l'enregistrement ?",
        reponse: "L'hôte seulement : la vidéo, la transcription et le compte rendu arrivent dans ses Fichiers. Il les partage s'il le veut, par exemple avec l'équipe de la salle.",
      },
      {
        question: "Est-ce que ça fonctionne sur téléphone ?",
        reponse: "Oui, dans le navigateur du téléphone, pour l'hôte comme pour les invités. Passer à une autre application de Cloud OS ne coupe pas la réunion.",
      },
    ],
    en: [
      {
        question: "Do my guests need to create an account?",
        reponse: "No. They open the link in their browser, enter their name and wait for you to let them in. You can also open the room to anyone with the link, or close it to guests.",
      },
      {
        question: "How many people can join?",
        reponse: "Up to 25 at a time, for a meeting of up to 4 hours. The room gives a five-minute warning before the end.",
      },
      {
        question: "Which plan do I need?",
        reponse: "Meetings are included from the Personal plan, recording included, within a monthly cap on recorded hours.",
      },
      {
        question: "Who can access the recording?",
        reponse: "Only the host: the video, the transcript and the minutes land in their Files. They share them if they want, for example with the room's team.",
      },
      {
        question: "Does it work on a phone?",
        reponse: "Yes, in the phone's browser, for the host and for guests alike. Switching to another Cloud OS app doesn't cut the meeting.",
      },
    ],
  },
  captures: [],
  voisines: ["messagerie", "agenda", "enregistreur", "equipes"],
  articles: [],
};
