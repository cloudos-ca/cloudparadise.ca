import type { Lang } from "./tokens";

/**
 * Hébergement Web — produit indépendant (`SubscriptionPlan`, clé
 * `hebergement-web`, `productType: HOSTING`), distinct des deux forfaits
 * Cloud OS de `offre.ts` : ce n'est pas une inclusion, c'est un plan facturé
 * à part (sauf le site inclus d'office dans Entreprise, voir `offre.ts`).
 *
 * Facturé en dollars américains — même raison que pour les anciens paliers
 * d'abonnement : une conversion introduirait un taux à tenir à jour, source
 * probable d'une divergence de plus après celle de `GRILLE`. Comme les deux
 * forfaits, un administrateur peut modifier ce montant sans déploiement — un
 * relevé daté reste le meilleur garde-fou disponible.
 */
export const DEVISE_HEBERGEMENT = "$ US";

export const PRIX_HEBERGEMENT_MENSUEL = 9;

/** « 9 $ US/mois », prêt à insérer dans une phrase. */
export function prixHebergement(lang: Lang): string {
  const suffixe = lang === "en" ? "/mo" : "/mois";
  return `${PRIX_HEBERGEMENT_MENSUEL} ${DEVISE_HEBERGEMENT}${suffixe}`;
}
