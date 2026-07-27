import type { Lang } from "./tokens";

/**
 * Conditions commerciales, en un seul endroit.
 *
 * Ces valeurs apparaissent à plusieurs endroits de la page — le hero les
 * promet, la section Tarification les détaille. Les centraliser évite qu'un
 * montant change ici sans changer là.
 */

/** Taux réel : un crédit vaut une unité de devise. */
export const CREDIT_EN_DEVISE = 1;

/**
 * Dollar canadien. La forme « $ CA » est celle recommandée en français
 * canadien ; elle lève l'ambiguïté pour un visiteur hors Canada, ce que le
 * simple « $ » ne fait pas.
 */
export const DEVISE = "$ CA";

/** Crédits offerts à la création du compte. */
export const CREDITS_OFFERTS = 10;

/** Montant minimal d'une recharge. */
export const RECHARGE_MINIMALE = 5;

const nf = new Intl.NumberFormat("fr-CA");

/** « 10 $ CA », prêt à insérer dans une phrase. */
export const OFFRE_EN_DEVISE = `${nf.format(CREDITS_OFFERTS * CREDIT_EN_DEVISE)} ${DEVISE}`;

/** « 5 $ CA », idem. */
export const RECHARGE_MINIMALE_EN_DEVISE = `${nf.format(
  RECHARGE_MINIMALE * CREDIT_EN_DEVISE,
)} ${DEVISE}`;

/**
 * Grille tarifaire — coût débité en crédits par tâche lancée.
 *
 * Source de vérité unique des prix : la section Tarification de la landing et
 * la page /tarifs lisent toutes les deux ici. Un prix ne doit jamais être
 * réécrit dans du JSX, sinon les deux surfaces divergent en silence.
 *
 * Les types listés ici doivent refléter les modes réellement facturés par
 * l'application (`src/lib/billing/pricing.ts` côté produit). Aucune surface de
 * la vitrine n'affiche leur nombre : ce décompte change avec le produit et un
 * chiffre figé devient faux sans prévenir.
 *
 * `type` est un identifiant interne stable, jamais affiché — c'est lui que
 * lisent `modes.ts` (couleurs) et le typage `TypeTache`. Le texte montré au
 * visiteur vit dans `libelle`, par langue.
 */
export const GRILLE = [
  { type: "IA", libelle: { fr: "IA", en: "AI" }, cout: 0.1 },
  {
    type: "Documents",
    libelle: { fr: "Documents", en: "Documents" },
    cout: 0.25,
  },
  {
    type: "Données",
    libelle: { fr: "Données", en: "Data" },
    cout: 0.25,
  },
  { type: "Média", libelle: { fr: "Média", en: "Media" }, cout: 0.5 },
  {
    type: "Scraping",
    libelle: { fr: "Extraction web", en: "Scraping" },
    cout: 0.5,
  },
  {
    type: "Calcul GPU",
    libelle: { fr: "Calcul GPU", en: "GPU Compute" },
    cout: 2,
  },
  {
    type: "Rendu 3D",
    libelle: { fr: "Rendu 3D", en: "3D Rendering" },
    cout: 3,
  },
  { type: "Images", libelle: { fr: "Images", en: "Images" }, cout: 0.25 },
  {
    type: "Génération d'images",
    libelle: { fr: "Génération d'images", en: "Image Generation" },
    cout: 2,
  },
  {
    type: "Impression 3D",
    libelle: { fr: "Impression 3D", en: "3D Printing" },
    cout: 0.5,
  },
  {
    type: "Simulation",
    libelle: { fr: "Simulation", en: "Simulation" },
    cout: 0.5,
  },
] as const;

export type TypeTache = (typeof GRILLE)[number]["type"];

/** Texte affiché pour un type donné, dans la langue demandée. */
export function libelleDe(type: TypeTache, lang: Lang): string {
  const ligne = GRILLE.find((g) => g.type === type);
  if (!ligne) throw new Error(`Type de tâche inconnu : ${type}`);
  return ligne.libelle[lang];
}

/** Libellé affiché à la place d'un prix encore indéterminé. */
export function tarifAVenir(lang: Lang): string {
  return lang === "en" ? "Pricing coming soon" : "Tarif à venir";
}

/**
 * Coût d'un type donné, en crédits — `null` tant que le prix n'est pas arrêté.
 *
 * Le type de retour inclut volontairement `null` : c'est lui qui force chaque
 * appelant à décider quoi afficher (ou à s'abstenir de calculer) au lieu de
 * propager un `NaN` silencieux jusqu'à l'écran.
 */
export function coutDe(type: TypeTache): number | null {
  const ligne = GRILLE.find((g) => g.type === type);
  if (!ligne) throw new Error(`Type de tâche inconnu : ${type}`);
  return ligne.cout;
}
