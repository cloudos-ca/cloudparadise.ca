import type { Bilingue, Lang } from "@/components/marketing/tokens";
import type { Forfait, GroupeId } from "./types";

/** Les libellés d'interface du catalogue, dans les deux langues. */
const LIBELLES = {
  accueil: { fr: "Accueil", en: "Home" },
  eyebrow: { fr: "Applications", en: "Apps" },
  titre: {
    fr: "Toutes les applications de votre poste de travail.",
    en: "Every application on your workstation.",
  },
  soustitre: {
    fr: "Bureautique, image, vidéo, CAO, gestion, géosciences : elles tournent dans votre navigateur, sans rien installer, et vos fichiers restent dans votre espace, hébergé au Québec.",
    en: "Office, image, video, CAD, business management, geoscience: they run in your browser with nothing to install, and your files stay in your own space, hosted in Québec.",
  },
  titreSeo: {
    fr: "Applications en ligne, sans installation — Cloud OS",
    en: "Online apps in your browser, nothing to install — Cloud OS",
  },
  descriptionSeo: {
    fr: "Le catalogue des applications de Cloud OS : bureautique, retouche d'image, montage vidéo, CAO, gestion d'entreprise et géosciences, dans le navigateur.",
    en: "The Cloud OS app catalogue: office, image editing, video editing, CAD, business management and geoscience, right in your browser.",
  },
  toutesLesApplications: { fr: "Toutes les applications", en: "All apps" },
  voirLaFiche: { fr: "Voir l'application", en: "See the app" },
  editeur: { fr: "Éditeur", en: "Publisher" },
  licence: { fr: "Licence", en: "License" },
  siteOfficiel: { fr: "Site officiel", en: "Official website" },
  mentionTiers: {
    fr: "Logiciel tiers, proposé tel quel dans Cloud OS. Cloud OS n'est ni affilié à son éditeur ni approuvé par lui.",
    en: "Third-party software, offered as is in Cloud OS. Cloud OS is not affiliated with or endorsed by its publisher.",
  },
  questions: { fr: "Questions fréquentes", en: "Frequently asked questions" },
  voisines: { fr: "Dans le même esprit", en: "Related apps" },
  articles: { fr: "À lire sur le blogue", en: "On the blog" },
  // Sous un article du blogue : les fiches qui le citent.
  applicationsDeLArticle: { fr: "Les applications de cet article", en: "Apps from this article" },
  // Pas de durée d'essai ici : le badge de `FenetreCta`, juste dessous, l'annonce déjà.
  cta: {
    fr: "Toutes ces applications sont comprises dans votre forfait, sans frais par application.",
    en: "All these apps come with your plan, with no fee per app.",
  },
  voirLesTarifs: { fr: "Voir les tarifs", en: "See pricing" },
  nousJoindre: { fr: "Nous joindre", en: "Contact us" },
} as const satisfies Record<string, Bilingue>;

export function libelleApplications(cle: keyof typeof LIBELLES, lang: Lang): string {
  return LIBELLES[cle][lang];
}

export const LIBELLES_GROUPES: Readonly<Record<GroupeId, Bilingue>> = {
  bureautique: { fr: "Bureautique", en: "Office" },
  communication: { fr: "Communication", en: "Communication" },
  gestion: { fr: "Gestion et productivité", en: "Business and productivity" },
  images: { fr: "Image et photo", en: "Image and photo" },
  "audio-video": { fr: "Audio et vidéo", en: "Audio and video" },
  developpement: { fr: "Développement et CAO", en: "Development and CAD" },
  mines: { fr: "Géosciences et mines", en: "Geoscience and mining" },
  bureau: { fr: "Votre bureau", en: "Your desktop" },
  jeux: { fr: "Jeux", en: "Games" },
};

/** Le badge de forfait. « Inclus dans » : le forfait le moins cher qui ouvre l'app, Entreprise contenant Personnel. */
export const LIBELLES_FORFAITS: Readonly<Record<Forfait, Bilingue>> = {
  personnel: { fr: "Inclus dès le forfait Personnel", en: "Included from the Personal plan" },
  entreprise: { fr: "Inclus dans le forfait Entreprise", en: "Included in the Business plan" },
};
