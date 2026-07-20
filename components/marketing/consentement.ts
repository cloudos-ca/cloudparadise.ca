/**
 * Source unique du consentement Loi 25.
 *
 * Lu et écrit par `PopupLoi25`, et lu par tout script qui ne doit démarrer
 * qu'après un « Accepter » explicite (Matomo, pour l'instant — voir
 * `MatomoAnalytics.tsx` et la section 6 de /confidentialite).
 */

export type Consentement = "accepte" | "refuse";

const CLE = "cp-loi25-consentement-v1";
const EVENEMENT = "cp-consentement-change";

export function lireConsentement(): Consentement | null {
  const valeur = window.localStorage.getItem(CLE);
  return valeur === "accepte" || valeur === "refuse" ? valeur : null;
}

/**
 * Enregistre le choix et prévient le reste de la page.
 *
 * Le `localStorage.setItem` seul ne déclenche pas d'événement dans l'onglet
 * qui l'écrit (seulement dans les *autres* onglets) : sans cet événement
 * manuel, un script déjà monté ne saurait pas qu'un « Accepter » vient
 * d'arriver sans recharger la page.
 */
export function ecrireConsentement(choix: Consentement): void {
  window.localStorage.setItem(CLE, choix);
  window.dispatchEvent(new Event(EVENEMENT));
}

export function aAccepteLesTemoinsNonEssentiels(): boolean {
  return lireConsentement() === "accepte";
}

/** S'abonne aux changements de consentement ; retourne la fonction de désabonnement. */
export function surChangementConsentement(callback: () => void): () => void {
  window.addEventListener(EVENEMENT, callback);
  return () => window.removeEventListener(EVENEMENT, callback);
}
