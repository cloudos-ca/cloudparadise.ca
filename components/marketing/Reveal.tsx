"use client";

import type { ReactNode } from "react";
import { useEffect, useLayoutEffect, useRef } from "react";

type RevealProps = Readonly<{
  children: ReactNode;
  /** Décalage pour faire arriver un bloc juste après son titre. */
  delay?: number;
  className?: string;
}>;

/**
 * `useLayoutEffect` côté navigateur, `useEffect` au rendu serveur.
 *
 * Il faut poser `.reveal-init` AVANT la peinture qui suit l'hydratation, sinon
 * l'élément se voit masqué après coup. Mais `useLayoutEffect` appelé pendant le
 * rendu serveur déclenche un avertissement React — d'où l'aiguillage.
 */
const useEffetDeMiseEnPage =
  globalThis.window === undefined ? useEffect : useLayoutEffect;

/**
 * L'observateur, UN SEUL pour tout le document.
 *
 * Créé à la première utilisation et jamais détruit : il est partagé par les
 * quelque 80 instances de `Reveal` du site. Un observateur par instance — ce
 * que faisait `whileInView` de framer-motion — c'est autant de rappels que de
 * blocs à chaque frame de défilement.
 */
let observateur: IntersectionObserver | null = null;

function obtenirObservateur(): IntersectionObserver {
  observateur ??= new IntersectionObserver(
    (entrees) => {
      for (const entree of entrees) {
        if (!entree.isIntersecting) continue;
        entree.target.classList.remove("reveal-init");
        entree.target.classList.add("reveal-in");
        observateur?.unobserve(entree.target);
      }
    },
    // Se déclenche quand le bloc a franchi le dixième bas de l'écran : il
    // s'anime pendant qu'on arrive dessus, pas une fois qu'on est passé.
    // Seuil 0 plutôt qu'une fraction : un bloc plus haut que l'écran
    // n'atteindrait jamais un seuil exprimé en pourcentage de sa hauteur.
    { rootMargin: "0px 0px -10% 0px", threshold: 0 },
  );
  return observateur;
}

/**
 * Apparition à l'entrée dans le viewport : la section s'assemble quand on
 * arrive dessus, au lieu d'être déjà là.
 *
 * Tout le rendu est en CSS (voir `.reveal` dans globals.css). Ce composant ne
 * fait qu'une chose : décider si le bloc doit être masqué au départ.
 *
 *   - Déjà à l'écran, ou au-dessus, au moment de l'hydratation → on ne touche à
 *     rien. Le navigateur l'a déjà peint, et l'animation CSS de chargement lui
 *     a déjà donné son entrée. Le masquer ici le ferait clignoter.
 *   - Encore sous la ligne de flottaison → `.reveal-init` le masque et
 *     l'observateur partagé le révélera au passage.
 *
 * En mouvement réduit, le composant ne fait rien du tout et le CSS neutralise
 * les trois classes : le contenu est là, immobile.
 *
 * Ce qui a disparu par rapport à la version framer-motion, et pourquoi :
 * plus de bascule `motion.div` → `div` à T+1500 ms (elle remontait tout le
 * sous-arbre et réinitialisait l'état des enfants — c'est ce repli qui figeait
 * le sommaire d'`AncresSections`), plus d'observateur par instance, plus
 * d'`opacity:0` par défaut, et plus de framer-motion dans le bundle des pages
 * qui ne font qu'apparaître au défilement.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffetDeMiseEnPage(() => {
    const noeud = ref.current;
    if (!noeud) return;

    if (globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    if (noeud.getBoundingClientRect().top < globalThis.innerHeight) return;

    noeud.classList.add("reveal-init");
    const obs = obtenirObservateur();
    obs.observe(noeud);
    return () => obs.unobserve(noeud);
  }, []);

  return (
    <div
      ref={ref}
      className={className ? `reveal ${className}` : "reveal"}
      // Les deux, parce que les deux mécanismes coexistent : `animation` pour
      // ce qui est déjà à l'écran, `transition` pour ce qui arrive au
      // défilement. Aucun des deux ne peut rester bloqué à l'état initial.
      style={
        delay
          ? { animationDelay: `${delay}s`, transitionDelay: `${delay}s` }
          : undefined
      }
    >
      {children}
    </div>
  );
}
