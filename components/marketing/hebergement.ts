import type { Lang } from "./tokens";

/**
 * Hébergement Web — produit indépendant (`SubscriptionPlan`, clé
 * `hebergement-web`, `productType: HOSTING`), souscriptible sans abonnement
 * Crédits actif. Distinct de `abonnements.ts` : ce n'est pas un palier de
 * crédits, c'est un plan facturé seul.
 *
 * Facturé en dollars américains, comme les abonnements — même raison : une
 * conversion introduirait un taux à tenir à jour, source probable d'une
 * divergence de plus après celle de `GRILLE`. Relevé sur la foi du brief du
 * 2026-09-03 ; comme `GRILLE` et `PALIERS_ABONNEMENT`, un administrateur peut
 * modifier ce montant sans déploiement.
 */
export const DEVISE_HEBERGEMENT = "$ US";

export const PRIX_HEBERGEMENT_MENSUEL = 9;

/** « 9 $ US/mois », prêt à insérer dans une phrase. */
export function prixHebergement(lang: Lang): string {
  const suffixe = lang === "en" ? "/mo" : "/mois";
  return `${PRIX_HEBERGEMENT_MENSUEL} ${DEVISE_HEBERGEMENT}${suffixe}`;
}
