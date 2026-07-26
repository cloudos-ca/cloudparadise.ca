"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: ReactNode;
  /** Décalage pour faire arriver un bloc juste après son titre. */
  delay?: number;
  className?: string;
};

/**
 * Apparition à l'entrée dans le viewport : la section s'assemble quand on
 * arrive dessus, au lieu d'être déjà là.
 *
 * Priorité absolue : aucun texte ne doit jamais rester bloqué à `opacity:0`.
 *   1. En mouvement réduit, aucun wrapper animé n'est monté — contenu tel quel.
 *   2. Cas normal : `whileInView` (observateur interne de framer) révèle à
 *      l'entrée dans le viewport, y compris pour ce qui est déjà visible au
 *      montage. On n'ajoute AUCUN prop `animate` à côté : le faire cassait la
 *      détection « déjà visible » de framer et laissait les blocs du haut de
 *      page figés à l'état initial.
 *   3. Repli : un `setTimeout` bascule le rendu vers un `<div>` nu (hors du
 *      `motion.div`, donc sans interférer avec `whileInView`). Si l'observateur
 *      ne s'était jamais déclenché — absent, onglet en arrière-plan, seuil
 *      jamais atteint — le contenu redevient visible quoi qu'il arrive. Dans le
 *      cas normal, `whileInView` a déjà posé `opacity:1` avant l'échéance, donc
 *      la bascule est invisible (même contenu, même opacité).
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const [repliActif, setRepliActif] = useState(false);

  useEffect(() => {
    const repli = window.setTimeout(() => setRepliActif(true), 1500);
    return () => window.clearTimeout(repli);
  }, []);

  if (reduceMotion || repliActif) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
