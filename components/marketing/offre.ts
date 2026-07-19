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
 */
export const GRILLE = [
  { type: "IA", cout: 0.1 },
  { type: "Documents", cout: 0.25 },
  { type: "Données", cout: 0.25 },
  { type: "Média", cout: 0.5 },
  { type: "Scraping", cout: 0.5 },
  { type: "Calcul GPU", cout: 2 },
  { type: "Rendu 3D", cout: 3 },
  // Prix Images à définir — remplacer null par la valeur en crédits quand
  // décidé. Le mode est déjà listé pour ne pas masquer une partie de l'offre,
  // mais `null` interdit d'afficher ou de calculer quoi que ce soit avec.
  { type: "Images", cout: null },
] as const;

export type TypeTache = (typeof GRILLE)[number]["type"];

/** Libellé affiché à la place d'un prix encore indéterminé. */
export const TARIF_A_VENIR = "Tarif à venir";

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
