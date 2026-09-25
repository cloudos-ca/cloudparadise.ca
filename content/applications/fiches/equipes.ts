import type { FicheApplication } from "../types";

/**
 * Équipes — ÉBAUCHE, à relire avant publication.
 *
 * Forfait : l'APP est ouverte dès Personnel (GET /api/v1/apps/catalog : `plan: "personnel"` ;
 * src/lib/os/public-app-catalog.ts : « un compte Personnel rejoint une équipe, seul Entreprise en
 * crée une »). La fiche distingue donc les deux :
 * - REJOINDRE une équipe : tout compte (offre.ts de la vitrine, inclusions de Personnel : « Rejoindre
 *   une équipe et mettre son enveloppe en commun »).
 * - CRÉER une équipe : forfait Entreprise payé, ni en essai ni résilié (canCreateTeamsNow,
 *   src/lib/teams/actions.ts : status ACTIVE, provider ≠ TRIAL, cancelledAt null, canCreateTeams).
 *   Jusqu'à 25 membres (maxTeamSize du forfait du propriétaire ; EQUIPE_MAX d'offre.ts, comparé à
 *   /api/v1/pricing par lib/offre.test.ts). Les invitations en attente comptent dans le plafond.
 *
 * Autres faits vérifiés le 2026-09-25 :
 * - Invitation par courriel, par un propriétaire de l'équipe (requireOwner) ; valable 7 jours
 *   (INVITATION_TTL_MS) ; acceptée par le lien du courriel ou dans l'app, et une fenêtre d'approbation
 *   s'affiche à la connexion (src/components/os/invitation-approval.tsx). Révocation possible.
 * - Rôles propriétaire / membre ; promouvoir, rétrograder, transférer la propriété, renommer, retirer
 *   un membre, quitter, supprimer l'équipe (teams.detail, fr.json).
 * - Chaque équipe a son bureau : sélecteur d'espace (Personnel ou une équipe) dans la barre des tâches,
 *   que Fichiers, Plans, Workflows… suivent (src/components/os/workspace-context.tsx).
 * - Partage de fichiers, de Plans et de workflows avec une ou plusieurs équipes (ShareTeamsDialog,
 *   « reused for files, plans and workflows »).
 * - Applications par défaut des nouveaux membres : lots ajoutés en dossiers à leur bureau d'équipe
 *   (setTeamDefaultBundlesAction).
 * - Suppression d'une équipe : les fichiers et Plans partagés redeviennent personnels à leurs
 *   créateurs (teams.detail.deleteDescription ; FileNode.team `onDelete: SetNull`, schema.prisma).
 *   Les autres données d'équipe (ERP, etc.) n'ont pas été vérifiées : la fiche ne dit pas « rien n'est
 *   effacé ».
 * - Pool : un membre avec un forfait payé (ni essai ni résilié) peut mettre son enveloppe en commun,
 *   si le propriétaire a le forfait Entreprise (teams.pool.why ; src/lib/billing/pool.ts).
 *
 * À vérifier à la relecture :
 * - Qu'un compte en ESSAI peut bien rejoindre une équipe (rien ne l'interdit dans
 *   acceptTeamInvitationAction ; il ne peut simplement pas mettre son enveloppe en commun). La fiche
 *   ne l'affirme pas explicitement.
 * - Les « invités » (accès au clavardage de l'équipe) existent mais ne sont pas décrits : leur
 *   ajout ne se fait pas depuis l'app Équipes.
 */
export const equipes: FicheApplication = {
  id: "equipes",
  apps: ["teams"],
  slug: { fr: "espace-de-travail-equipe", en: "team-workspace" },
  nom: { fr: "Équipes", en: "Teams" },
  titre: {
    fr: "Équipes, un espace de travail partagé pour votre PME",
    en: "Teams, a shared workspace for your business",
  },
  groupe: "bureau",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Espace de travail d'équipe en ligne pour PME — Cloud OS",
      en: "Online team workspace for small businesses — Cloud OS",
    },
    description: {
      fr: "Un bureau commun pour votre équipe : fichiers et Plans partagés, invitations par courriel, rôles et propriétaires. Jusqu'à 25 membres, hébergé au Québec.",
      en: "A shared desktop for your whole team: shared files and Plans, email invitations, roles and several owners. Up to 25 members, hosted in Québec.",
    },
  },
  accroche: {
    fr: "Un bureau commun pour votre équipe, à côté de votre bureau personnel.",
    en: "A shared desktop for your team, right next to your personal one.",
  },
  motsCles: {
    fr: ["espace de travail partagé", "espace de travail d'équipe en ligne", "collaboration en équipe pme", "bureau virtuel d'équipe"],
    en: ["shared workspace", "online team workspace", "team collaboration for small business", "virtual team desktop"],
  },
  corps: {
    fr: [
      {
        titre: "Un bureau pour l'équipe, à côté du vôtre",
        paragraphes: [
          "Chaque équipe a son propre bureau dans Cloud OS. Un sélecteur, dans la barre des tâches, fait passer de votre espace personnel à celui d'une équipe : Fichiers, Plans et Workflows affichent alors le contenu de l'équipe, et vous retrouvez le vôtre d'un clic.",
          "Vous pouvez aussi partager avec une ou plusieurs équipes un fichier, un dossier entier, un Plan ou un workflow que vous avez créé dans votre espace personnel.",
        ],
      },
      {
        titre: "Inviter, accueillir, organiser",
        paragraphes: [
          "Un propriétaire invite une personne par son adresse courriel. Elle reçoit un lien valable sept jours, et si elle a déjà un compte, l'invitation l'attend aussi dans Cloud OS, à sa prochaine connexion.",
        ],
        points: [
          "Deux rôles, propriétaire et membre, et plusieurs propriétaires possibles.",
          "Transfert de la propriété, retrait d'un membre, invitation révoquée avant d'être acceptée.",
          "Des applications prêtes sur le bureau de chaque nouveau membre, choisies par le propriétaire.",
          "Une équipe supprimée rend ses fichiers et ses Plans partagés à leurs créateurs.",
        ],
      },
      {
        titre: "Une enveloppe commune",
        paragraphes: [
          "Les membres qui ont un forfait payé peuvent mettre leur enveloppe d'usage en commun dans le pool de l'équipe, quand le propriétaire a le forfait Entreprise. L'équipe puise alors dans une réserve partagée plutôt que dans l'enveloppe de chacun.",
        ],
      },
      {
        titre: "Rejoindre ou créer une équipe",
        paragraphes: [
          "Rejoindre une équipe est compris dès le forfait Personnel. En créer une demande le forfait Entreprise, payé : une équipe compte alors jusqu'à 25 membres, invitations en attente comprises.",
        ],
      },
    ],
    en: [
      {
        titre: "A desktop for the team, next to yours",
        paragraphes: [
          "Every team has its own desktop in Cloud OS. A switcher in the taskbar takes you from your personal space to a team's: Files, Plans and Workflows then show the team's content, and yours is one click away.",
          "You can also share a file, a whole folder, a Plan or a workflow you created in your personal space with one or more teams.",
        ],
      },
      {
        titre: "Invite, welcome, organize",
        paragraphes: [
          "An owner invites someone by email address. They receive a link valid for seven days, and if they already have an account, the invitation also waits for them in Cloud OS the next time they sign in.",
        ],
        points: [
          "Two roles, owner and member, with several owners possible.",
          "Transfer ownership, remove a member, revoke an invitation before it is accepted.",
          "Apps ready on every new member's desktop, chosen by the owner.",
          "Deleting a team hands its shared files and Plans back to their creators.",
        ],
      },
      {
        titre: "A shared allowance",
        paragraphes: [
          "Members with a paid plan can put their usage allowance into the team pool, when the owner has the Business plan. The team then draws on a shared reserve rather than on each person's allowance.",
        ],
      },
      {
        titre: "Joining or creating a team",
        paragraphes: [
          "Joining a team is included from the Personal plan. Creating one requires the Business plan, paid: a team then has up to 25 members, pending invitations included.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Quel forfait faut-il pour utiliser Équipes ?",
        reponse: "Pour rejoindre une équipe, le forfait Personnel suffit. Pour en créer une, il faut le forfait Entreprise, payé : la création n'est pas ouverte pendant l'essai gratuit.",
      },
      {
        question: "Combien de personnes une équipe peut-elle compter ?",
        reponse: "Jusqu'à 25 membres. Les invitations en attente comptent dans ce total, pour qu'une équipe ne se retrouve pas au-delà une fois toutes acceptées.",
      },
      {
        question: "Que deviennent les fichiers si l'équipe est supprimée ?",
        reponse: "Les fichiers et les Plans partagés redeviennent personnels : chacun retourne à la personne qui l'a créé, au lieu d'être effacé avec l'équipe.",
      },
    ],
    en: [
      {
        question: "Which plan do I need to use Teams?",
        reponse: "To join a team, the Personal plan is enough. To create one, you need the Business plan, paid: team creation is not available during the free trial.",
      },
      {
        question: "How many people can a team have?",
        reponse: "Up to 25 members. Pending invitations count toward that total, so a team never ends up over the limit once they are all accepted.",
      },
      {
        question: "What happens to the files if the team is deleted?",
        reponse: "Shared files and Plans become personal again: each one goes back to the person who created it, instead of being erased along with the team.",
      },
    ],
  },
  captures: [],
  voisines: ["fichiers", "messagerie", "agenda", "plans"],
  articles: [
    { slug: "partage-de-fichiers-securise", titre: "Partage de fichiers sécurisé : ce que les équipes doivent exiger" },
  ],
};
