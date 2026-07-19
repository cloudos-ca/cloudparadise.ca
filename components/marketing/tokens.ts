/**
 * Gabarits partagés par les sections de la landing.
 *
 * Le fond est porté une seule fois par le layout : les sections sont des blocs
 * transparents posés dessus. Ce qu'elles partagent, c'est la colonne de contenu
 * — c'est elle qui garantit que titres et fenêtres s'alignent d'une section à
 * l'autre, y compris sur ultrawide où le contenu reste groupé au centre.
 */
export const SHELL = "mx-auto w-full max-w-[1280px] px-6 os:px-10";

/**
 * Rythme vertical commun. Deux sections voisines additionnent leurs paddings,
 * d'où un intervalle constant de ~112px : assez pour respirer, assez serré
 * pour que la page se lise d'un trait plutôt qu'en blocs détachés.
 */
export const SECTION_Y = "py-12 os:py-14";

/** Fond translucide dérivé de --soft, pour puces et badges. */
export const SOFT_WASH = "color-mix(in srgb, var(--soft) 16%, transparent)";
