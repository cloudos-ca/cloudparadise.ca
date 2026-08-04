import type { Lang } from "./tokens";

/**
 * Paliers d'abonnement — une option d'économie pour un usage régulier,
 * à côté des crédits (voir `offre.ts`), qui restent le modèle par défaut.
 *
 * Actifs en production depuis le 2026-08-12 (PayPal en mode live, webhook
 * vérifié, trois paliers synchronisés). Relevés ce jour-là contre la base de
 * production ; comme pour `GRILLE`, un administrateur peut les modifier sans
 * déploiement — un relevé daté est le meilleur garde-fou disponible.
 *
 * Facturés en dollars américains côté PayPal, à la différence du reste du
 * site (crédits en $ CA) : affichés tels quels, avec la devise toujours
 * explicite, plutôt que convertis — une conversion introduirait un taux à
 * tenir à jour, source probable d'une troisième divergence après celle de
 * `GRILLE`.
 */
export const DEVISE_ABONNEMENT = "$ US";

export const PALIERS_ABONNEMENT = [
  {
    id: "decouverte",
    nom: { fr: "Découverte", en: "Discovery" },
    prixMensuel: 10,
    creditsMensuels: 12,
  },
  {
    id: "pro",
    nom: { fr: "Pro", en: "Pro" },
    prixMensuel: 25,
    creditsMensuels: 32,
  },
  {
    id: "entreprise",
    nom: { fr: "Entreprise", en: "Business" },
    prixMensuel: 60,
    creditsMensuels: 80,
  },
] as const;

export type PalierAbonnement = (typeof PALIERS_ABONNEMENT)[number];

/**
 * Le palier mis en avant dans l'interface — une carte « Recommandé » sur
 * l'accueil et sur `/tarifs`, plutôt que trois paliers à égalité. Un seul
 * identifiant ici évite que les deux endroits divergent sur lequel pousser.
 */
export const PALIER_RECOMMANDE_ID: PalierAbonnement["id"] = "pro";

/** « 10 $ US/mois », prêt à insérer dans une phrase ou une carte. */
export function prixAbonnement(palier: PalierAbonnement, lang: Lang): string {
  const suffixe = lang === "en" ? "/mo" : "/mois";
  return `${palier.prixMensuel} ${DEVISE_ABONNEMENT}${suffixe}`;
}

/**
 * « dès 10 $ US/mois », pour un rappel court dans un héros de page produit.
 * Dérivé du premier palier de `PALIERS_ABONNEMENT` (le moins cher, la liste
 * est écrite en ordre croissant) plutôt que d'un montant recopié à la main.
 */
export function prixAbonnementDepuis(lang: Lang): string {
  const [moinsCher] = PALIERS_ABONNEMENT;
  const prix = prixAbonnement(moinsCher, lang);
  return lang === "en" ? `from ${prix}` : `dès ${prix}`;
}
