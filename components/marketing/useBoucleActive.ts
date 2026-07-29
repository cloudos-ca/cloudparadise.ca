"use client";

import { useEffect, useState, type RefObject } from "react";
import { useInView } from "framer-motion";

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
 * L'écouteur est retiré au démontage. `useInView` pose un observateur par
 * appel : c'est assumé ici, il n'y a que trois composants concernés, là où
 * l'apparition au défilement (`Reveal`) en aurait créé un par bloc.
 */
export function useBoucleActive(ref: RefObject<Element | null>): boolean {
  const dansEcran = useInView(ref, { margin: "0px 0px -10% 0px" });
  const [ongletVisible, setOngletVisible] = useState(true);

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
