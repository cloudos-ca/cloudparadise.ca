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

const nf = new Intl.NumberFormat("fr-CA");

/** « 10 $ », prêt à insérer dans une phrase. */
export const OFFRE_EN_DEVISE = `${nf.format(CREDITS_OFFERTS * CREDIT_EN_DEVISE)} ${DEVISE}`;
