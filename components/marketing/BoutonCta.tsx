import type { ReactNode } from "react";

type Taille = "sm" | "md" | "lg";

const TAILLES: Record<Taille, string> = {
  sm: "px-3.5 py-1.5 text-[13px] rounded-full",
  md: "px-5 py-2.5 text-sm rounded-lg",
  lg: "px-6 py-3 text-[15px] rounded-lg",
};

/**
 * Le bouton de conversion — doré, unique, toujours le même.
 *
 * Un seul composant pour toutes les surfaces (barre de menu, hero, closers) :
 * la couleur d'action ne doit pas pouvoir diverger d'une page à l'autre, sinon
 * le visiteur cesse de la reconnaître comme « le bouton qui compte ».
 *
 * Pas de `data-cp-accent` : contrairement au reste du site, ce bouton ne suit
 * pas la recoloration du bureau. C'est délibéré — voir `--cta` dans
 * globals.css.
 */
export function BoutonCta({
  href,
  children,
  taille = "md",
  className = "",
}: Readonly<{
  href: string;
  children: ReactNode;
  taille?: Taille;
  className?: string;
}>) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap transition-[filter,transform] duration-150 hover:brightness-110 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${TAILLES[taille]} ${className}`}
      style={{
        background: "var(--cta)",
        color: "var(--cta-texte)",
        // La lueur dorée décolle le bouton du fond : c'est elle qui fait le
        // « pop », plus encore que la couleur seule.
        boxShadow: "0 6px 22px -6px color-mix(in srgb, var(--cta) 55%, transparent)",
      }}
    >
      {children}
    </a>
  );
}
