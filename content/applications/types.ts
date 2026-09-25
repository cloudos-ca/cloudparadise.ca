import type { Bilingue } from "@/components/marketing/tokens";

/**
 * La forme d'une fiche du catalogue des applications (`/applications`,
 * `/en/apps`). Voir `docs/plan-catalogue-applications.md`.
 *
 * Une fiche décrit une application, ou un petit groupe d'applications qui se
 * vendent ensemble (les six jeux sur une seule page). `apps` porte les ids du
 * produit : c'est par eux que `lib/applications.test.ts` compare le catalogue
 * à `GET /api/v1/apps/catalog`.
 */

/** Les groupes de l'index, dans l'ordre d'affichage. Taxonomie de la vitrine :
 *  elle reprend l'esprit des groupes de la Logithèque, mais range selon ce que
 *  cherche un visiteur, pas selon le menu Démarrer — la Logithèque met par
 *  exemple Équipes et Hébergement Web dans « Système ». */
export const GROUPES = [
  "bureautique",
  "communication",
  "gestion",
  "images",
  "audio-video",
  "developpement",
  "mines",
  "bureau",
  "jeux",
] as const;

export type GroupeId = (typeof GROUPES)[number];

/** Le forfait le moins cher qui ouvre l'application — comparé au produit. */
export type Forfait = "personnel" | "entreprise";

/** Une section du corps d'une fiche : un intertitre (`h2`), des paragraphes, une liste facultative. */
export type Section = {
  titre: string;
  paragraphes: readonly string[];
  points?: readonly string[];
};

export type QuestionReponse = { question: string; reponse: string };

/** Une capture de l'application qui tourne dans Cloud OS, servie depuis `public/applications/`. */
export type Capture = {
  src: string;
  largeur: number;
  hauteur: number;
  alt: Bilingue;
};

export type FicheApplication = {
  /** Clé de la fiche, stable : c'est elle que citent les `voisines` des autres fiches. */
  id: string;
  /** Les ids du produit couverts par la fiche (`desktop-gimp`, `erp`…). */
  apps: readonly string[];
  slug: Bilingue;
  nom: Bilingue;
  /** Logiciels tiers seulement : l'éditeur et la licence, cités tels quels. Pas de logo (voir le plan). */
  tiers?: { editeur: string; licence: string; site: string };
  groupe: GroupeId;
  forfait: Forfait;
  /** Le `<h1>` de la fiche : le nom, porté par l'intention de recherche (« GIMP en ligne… »). */
  titre: Bilingue;
  /** `<title>`, entre 45 et 60 caractères, et `meta description`. */
  seo: { titre: Bilingue; description: Bilingue };
  /** Une phrase pour la carte d'index, et le sous-titre de la fiche. */
  accroche: Bilingue;
  /** L'intention de recherche visée — alimente `keywords`, et guide le titre et le `h1`. */
  motsCles: { fr: readonly string[]; en: readonly string[] };
  corps: { fr: readonly Section[]; en: readonly Section[] };
  faq: { fr: readonly QuestionReponse[]; en: readonly QuestionReponse[] };
  captures: readonly Capture[];
  /** `id` d'autres fiches, affichées en bas de page. */
  voisines: readonly string[];
  /** Articles du blogue qui parlent du sujet : slug et titre FR. Le titre est recopié ici parce que
   *  les articles français vivent chez BabyLoveGrowth, illisible au build (clé lue à l'exécution) ;
   *  la version anglaise, elle, se retrouve dans les traductions du dépôt. */
  articles: readonly { slug: string; titre: string }[];
};
