import type { Lang } from "./tokens";

/**
 * Bac à sable (renommé le 2026-08-24) — vrai bureau Linux persistant, à la
 * différence du reste de la plateforme qui tourne en conteneur éphémère.
 * Synchronisation bidirectionnelle continue entre `~/Stockage` et l'app
 * Fichiers.
 *
 * ⚠️ Vendable **seulement en supplément** d'un abonnement Crédits actif
 * (Découverte/Pro/Entreprise) — jamais seul. Ne jamais le présenter comme une
 * option autonome ; toute copie qui le mentionne doit porter cette condition
 * à côté du prix, pas dans une note à part qu'on saute.
 *
 * Facturé en dollars américains, comme `abonnements.ts` et `hebergement.ts` —
 * même raison : pas de taux de conversion à tenir à jour. Un administrateur
 * peut modifier ce montant sans déploiement.
 */
export const DEVISE_BAC_A_SABLE = "$ US";

export const PRIX_BAC_A_SABLE_MENSUEL = 15;

/** « 15 $ US/mois, en supplément d'un abonnement Crédits actif ». */
export function prixBacASable(lang: Lang): string {
  const suffixe = lang === "en" ? "/mo" : "/mois";
  return `${PRIX_BAC_A_SABLE_MENSUEL} ${DEVISE_BAC_A_SABLE}${suffixe}`;
}
