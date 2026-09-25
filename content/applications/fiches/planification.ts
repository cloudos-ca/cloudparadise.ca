import type { FicheApplication } from "../types";

/**
 * Planification (Cédules) — ÉBAUCHE, à relire avant publication.
 *
 * Ce que c'est : l'app `schedule`, intitulée « Cédules » dans le produit (« Schedules » en anglais),
 * qui lance à date et heure fixes, une fois ou de façon récurrente, un plan, un workflow ou un
 * rapport (app-catalog.ts : « Planifier des tâches récurrentes (cédules) »). Ce n'est pas un agenda
 * de rendez-vous ni un outil de planification de projet.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Une cédule vise exactement un plan soumis, un workflow ou un rapport ; les brouillons de plan ne
 *   se cédulent pas (resolveScheduleFields, getSchedulablePlansAction,
 *   src/lib/schedules/actions.ts ; schedule.form.*).
 * - Date et heure dans le fuseau de l'utilisateur ; la date doit être dans le futur (idem).
 * - Récurrence facultative, écrite en langage courant (« tous les lundis 9h ») et traduite une seule
 *   fois par l'IA en règle quotidienne, hebdomadaire ou mensuelle avec intervalle (« toutes les 2
 *   semaines ») ; ensuite, le planificateur est entièrement déterministe
 *   (src/lib/schedules/parse-recurrence.ts). Texte non compris → exécution unique (repli à NONE).
 * - Vue liste des prochaines exécutions (par défaut) et vue calendrier mensuelle ; menu Modifier,
 *   Ouvrir la cible, Annuler la cédule (src/components/os/apps/schedule/*).
 * - À l'échéance : nouvelle exécution du plan, du workflow ou du rapport, et notification
 *   (src/lib/jobs/scheduler.ts). Un plan d'extraction web rejoue les consignes de sa dernière
 *   exécution réussie (resolveScheduleFields).
 * - Courriel récapitulatif le matin (à partir de 7 h, heure locale) les jours où une cédule doit
 *   partir, au plus un par jour (src/lib/schedules/daily-summary.ts).
 * - Les cédules apparaissent aussi dans l'Agenda (src/lib/calendar/actions.ts).
 * - « Planifier » existe aussi dans l'éditeur de workflow et dans celui de rapport
 *   (scheduleWorkflowAction, scheduleReportAction).
 * - Cédules par espace (personnel ou équipe) (getUpcomingSchedulesAction, teamId).
 * - Forfait : `personnel` (GET /api/v1/apps/catalog en production).
 *
 * À vérifier à la relecture :
 * - Le nom : la fiche s'appelle « Cédules » (le libellé de l'app) avec un titre qui porte
 *   « planifier des tâches ». Le québécisme « cédule » est voulu dans le produit ; à garder ?
 * - Une récurrence non comprise retombe silencieusement sur une exécution unique : la FAQ ne cite
 *   que les récurrences prises en charge (jour, semaine, mois, avec intervalle).
 */
export const planification: FicheApplication = {
  id: "planification",
  apps: ["schedule"],
  slug: { fr: "planification-de-taches", en: "task-scheduling" },
  nom: { fr: "Cédules", en: "Schedules" },
  titre: {
    fr: "Cédules, pour planifier vos tâches récurrentes",
    en: "Schedules, to plan your recurring tasks",
  },
  groupe: "gestion",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Planifier des tâches récurrentes en ligne — Cloud OS",
      en: "Schedule recurring tasks in the cloud — Cloud OS",
    },
    description: {
      fr: "Lancez vos traitements, vos workflows et vos rapports à heure fixe, tous les jours, chaque semaine ou chaque mois, sans serveur à gérer. Hébergé au Québec.",
      en: "Run your processing tasks, workflows and PDF reports at a set time, daily, weekly or monthly, with no server of your own to manage. Hosted in Québec.",
    },
  },
  accroche: {
    fr: "Vos tâches, vos workflows et vos rapports repartent seuls, à l'heure fixée.",
    en: "Your tasks, workflows and reports run again on their own, at the time you set.",
  },
  motsCles: {
    fr: ["planifier des tâches récurrentes", "planificateur de tâches en ligne", "automatiser un rapport hebdomadaire", "tâche planifiée cloud"],
    en: ["schedule recurring tasks", "online task scheduler", "automate a weekly report", "cloud scheduled task"],
  },
  corps: {
    fr: [
      {
        titre: "Une fois, ou tous les lundis matin",
        paragraphes: [
          "Une cédule lance, à la date et à l'heure que vous fixez, un plan, un workflow ou un rapport déjà prêt. Vous choisissez la cible, le jour, l'heure — dans votre fuseau horaire — et, si vous le voulez, une récurrence.",
          "La récurrence s'écrit en langage courant : « tous les jours », « toutes les 2 semaines », « chaque mois ». Elle est traduite une seule fois en règle précise ; ensuite, le calendrier des exécutions est fixe et prévisible.",
        ],
      },
      {
        titre: "Ce que vous pouvez céduler",
        paragraphes: [
          "Tout ce qui se lance dans Cloud OS peut repartir seul. Quelques exemples :",
        ],
        points: [
          "Un rapport PDF régénéré chaque lundi à partir des données du moment.",
          "Un workflow qui convertit, traduit ou analyse ce qui est arrivé dans la semaine.",
          "Une extraction de données d'un site web, reprise chaque mois avec les mêmes consignes.",
          "Une analyse de tableur, relancée le premier de chaque mois.",
        ],
      },
      {
        titre: "Vous savez toujours ce qui va partir",
        paragraphes: [
          "La vue liste montre les prochaines exécutions, de la plus proche à la plus lointaine ; la vue calendrier les place sur le mois. Chaque cédule se modifie ou s'annule en un clic, et ses exécutions apparaissent aussi dans votre Agenda.",
          "Les jours où une cédule doit partir, un courriel récapitulatif vous l'annonce le matin, et une notification vous prévient quand elle s'exécute. Les cédules sont comprises dès le forfait Personnel, et rien ne tourne sur votre ordinateur : il peut rester éteint.",
        ],
      },
    ],
    en: [
      {
        titre: "Once, or every Monday morning",
        paragraphes: [
          "A schedule runs a ready-made plan, workflow or report at the date and time you set. You choose the target, the day, the time — in your own time zone — and, if you like, a recurrence.",
          "The recurrence is written in plain language: “every day”, “every 2 weeks”, “every month”. It is translated once into a precise rule; after that, the run calendar is fixed and predictable.",
        ],
      },
      {
        titre: "What you can schedule",
        paragraphes: [
          "Anything you launch in Cloud OS can run again on its own. A few examples:",
        ],
        points: [
          "A PDF report regenerated every Monday from the data of the day.",
          "A workflow that converts, translates or analyzes what came in during the week.",
          "Data extraction from a website, repeated every month with the same instructions.",
          "A spreadsheet analysis, run again on the first of every month.",
        ],
      },
      {
        titre: "You always know what is coming up",
        paragraphes: [
          "The list view shows the upcoming runs, nearest first; the calendar view places them on the month. Each schedule is edited or cancelled in one click, and its runs also show up in your Agenda.",
          "On days when a schedule is due, a summary email tells you in the morning, and a notification lets you know when it runs. Schedules are included from the Personal plan, and nothing runs on your computer: it can stay off.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Quelles récurrences sont possibles ?",
        reponse: "Tous les jours, toutes les semaines ou tous les mois, avec un intervalle au besoin : tous les 3 jours, toutes les 2 semaines, tous les 6 mois. Le jour et l'heure de la première exécution fixent le rythme des suivantes.",
      },
      {
        question: "Mon ordinateur doit-il rester allumé ?",
        reponse: "Non. Les cédules s'exécutent sur les serveurs de Cloud OS ; le résultat vous attend dans vos Fichiers à votre retour.",
      },
      {
        question: "Puis-je céduler un plan encore en brouillon ?",
        reponse: "Non. Seul un plan déjà soumis se cédule, pour que chaque exécution refasse exactement ce que vous avez validé. Les workflows et les rapports se cédulent directement depuis leur éditeur.",
      },
    ],
    en: [
      {
        question: "Which recurrences are possible?",
        reponse: "Every day, every week or every month, with an interval if needed: every 3 days, every 2 weeks, every 6 months. The day and time of the first run set the rhythm for the next ones.",
      },
      {
        question: "Does my computer need to stay on?",
        reponse: "No. Schedules run on Cloud OS servers; the result is waiting in your Files when you come back.",
      },
      {
        question: "Can I schedule a plan that is still a draft?",
        reponse: "No. Only a plan that has already been submitted can be scheduled, so that every run does exactly what you approved. Workflows and reports are scheduled straight from their editor.",
      },
    ],
  },
  captures: [],
  voisines: ["plans", "workflows", "rapports", "agenda"],
  articles: [
    { slug: "planification-de-taches-cloud", titre: "Planification de tâches cloud : souveraineté et automatisation pour PME" },
  ],
};
