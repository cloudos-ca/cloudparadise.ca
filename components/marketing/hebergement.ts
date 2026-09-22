import type { Lang } from "./tokens";

/**
 * Hébergement Web — produit indépendant (`SubscriptionPlan`, clé
 * `hebergement-web`, `productType: HOSTING`), distinct des deux forfaits
 * Cloud OS de `offre.ts` : ce n'est pas une inclusion, c'est un plan facturé
 * à part (sauf le site inclus d'office dans Entreprise, voir `offre.ts`).
 *
 * Facturé en dollars CANADIENS, comme tout le catalogue (spec §2 : « $ CA
 * partout »). La vitrine a longtemps affiché « 9 $ US » : le forfait
 * `hebergement-web` est pourtant créé avec `currency: BILLING_CURRENCY`
 * (`src/lib/billing/subscription.ts`), et la migration
 * `20260921100100_billing_catalog_cad` a repassé en CAD toutes les lignes de
 * `SubscriptionPlan` qui ne l'étaient pas. Le visiteur lisait donc un prix
 * dans une devise qui n'est pas celle de sa facture.
 *
 * Comme les deux forfaits, un administrateur peut modifier ce montant sans
 * déploiement — un relevé daté reste le meilleur garde-fou disponible.
 */
export const DEVISE_HEBERGEMENT = "$ CA";

export const PRIX_HEBERGEMENT_MENSUEL = 9;

/** « 9 $ CA/mois », prêt à insérer dans une phrase. */
export function prixHebergement(lang: Lang): string {
  const suffixe = lang === "en" ? "/mo" : "/mois";
  return `${PRIX_HEBERGEMENT_MENSUEL} ${DEVISE_HEBERGEMENT}${suffixe}`;
}
