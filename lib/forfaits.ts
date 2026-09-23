import { GARANTIE_DUREE_MIN, PALIERS, prixDuree, type Palier } from "@/components/marketing/offre";

export type EtatCarte = {
  id: Palier["id"];
  mensuel: number;
  total: number;
  /** Vrai à partir de `GARANTIE_DUREE_MIN` mois — jamais avant. */
  afficheGarantie: boolean;
};

/**
 * L'état pur des deux cartes de `/tarifs` et `/en/pricing`, pour une durée
 * donnée : un état par palier, calculé depuis `offre.ts`.
 *
 * Extrait de `CartesForfaits.tsx` pour rester testable sans navigateur : ce
 * dépôt n'a pas de pile de test DOM, et `node:test` ne collecte que
 * `lib/*.test.ts`. Sortir la décision du composant est donc la seule façon de
 * vérifier, sans clic réel, que la garantie ne s'affiche qu'à partir de
 * `GARANTIE_DUREE_MIN` mois et que les deux paliers lisent la même durée —
 * ce dernier point tient par construction : un seul appel à `mois`, jamais un
 * par palier.
 */
export function etatCartes(mois: number): readonly EtatCarte[] {
  return PALIERS.map((palier) => {
    const prix = prixDuree(palier, mois);
    return {
      id: palier.id,
      mensuel: prix.mensuel,
      total: prix.total,
      afficheGarantie: mois >= GARANTIE_DUREE_MIN,
    };
  });
}
