/**
 * Gabarits partagés par les panneaux de la landing.
 *
 * Chaque section est un « écran » : le châssis est borné et centré, le contenu
 * l'est une seconde fois plus étroitement. Sur ultrawide la composition reste
 * groupée au lieu de se coller aux deux bords — et surtout, toutes les sections
 * s'alignent sur la même colonne.
 */

/** Le panneau lui-même. L'espacement vertical est géré par la page. */
export const PANEL =
  "relative isolate mx-auto w-[calc(100%-1.5rem)] max-w-[1600px] overflow-hidden rounded-2xl os:w-[calc(100%-3rem)]";

/** La colonne de contenu à l'intérieur d'un panneau. */
export const SHELL = "mx-auto w-full max-w-[1280px] px-6 os:px-10";

/** Fond translucide dérivé de --soft, pour puces et badges. */
export const SOFT_WASH = "color-mix(in srgb, var(--soft) 16%, transparent)";

/** Accents de la charte, appliqués en inline pour être corrects dès le SSR. */
export const CHARTE_ACC = "#2d66ae";
export const CHARTE_SOFT = "#bbecee";
