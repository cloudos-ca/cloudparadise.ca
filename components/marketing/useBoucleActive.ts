"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Faut-il laisser tourner une boucle d'animation ?
 *
 * Une animation `repeat: Infinity` maintient un `requestAnimationFrame` actif
 * en permanence : le fil principal n'est jamais au repos, ce qui dégrade le
 * défilement, l'hydratation et la batterie — y compris hors écran et onglet en
 * arrière-plan. Aucune boucle du site n'était gardée.
 *
 * Les DEUX gardes, jamais une seule :
 *   - hors écran — sinon la respiration de la fenêtre de clôture tourne pour
 *     tous les visiteurs qui ne descendent jamais jusqu'au bas de page ;
 *   - onglet caché — sinon elle tourne dans un onglet que personne ne regarde.
 *
 * `IntersectionObserver` natif plutôt que le `useInView` de framer-motion :
 * `JobPanel` n'a plus aucune autre raison d'importer la bibliothèque depuis
 * qu'il s'anime en CSS, et il aurait suffi de cette garde pour l'y ramener.
 *
 * Le défaut est `true` : si rien ne s'exécute, les animations tournent comme
 * avant plutôt que de rester figées à leur première frame.
 *
 * Écouteur et observateur sont tous deux retirés au démontage.
 */
export function useBoucleActive(ref: RefObject<Element | null>): boolean {
  const [dansEcran, setDansEcran] = useState(true);
  const [ongletVisible, setOngletVisible] = useState(true);

  useEffect(() => {
    const noeud = ref.current;
    if (!noeud) return;

    const observateur = new IntersectionObserver(
      ([entree]) => setDansEcran(entree.isIntersecting),
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );
    observateur.observe(noeud);
    return () => observateur.disconnect();
  }, [ref]);

  useEffect(() => {
    const surChangement = () =>
      setOngletVisible(document.visibilityState === "visible");
    surChangement();
    document.addEventListener("visibilitychange", surChangement);
    return () =>
      document.removeEventListener("visibilitychange", surChangement);
  }, []);

  return dansEcran && ongletVisible;
}
