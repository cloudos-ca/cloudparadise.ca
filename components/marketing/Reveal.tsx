"use client";

import type { ReactNode } from "react";
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
 * En mouvement réduit, aucun wrapper animé n'est monté — le contenu est rendu
 * tel quel, donc pas d'état initial transparent qui resterait figé si
 * l'observateur ne se déclenchait jamais.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
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
