/**
 * Gabarits partagés par les sections de la landing.
 *
 * Le fond est porté une seule fois par le layout : les sections sont des blocs
 * transparents posés dessus. Ce qu'elles partagent, c'est la colonne de contenu
 * — c'est elle qui garantit que titres et fenêtres s'alignent d'une section à
 * l'autre, y compris sur ultrawide où le contenu reste groupé au centre.
 */
export const SHELL = "mx-auto w-full max-w-[1280px] px-6 os:px-10";

/** Langue d'affichage — le français reste le défaut partout, l'anglais se demande explicitement. */
export type Lang = "fr" | "en";

/** Une chaîne dans les deux langues du site, indexable par `Lang`. */
export type Bilingue = { fr: string; en: string };

/**
 * Exemple chiffré d'une ligne de grille tarifaire.
 *
 * La quantité est un nombre et non de la copie : elle est multipliée par le
 * tarif du type pour afficher un total, donc l'écrire dans une chaîne
 * bilingue la rendrait incalculable — et laisserait le total se désynchroniser
 * du prix réel.
 */
export type Exemple = { quantite: number; unite: Bilingue };

/**
 * Rythme vertical commun. Deux sections voisines additionnent leurs paddings,
 * d'où un intervalle constant de ~112px : assez pour respirer, assez serré
 * pour que la page se lise d'un trait plutôt qu'en blocs détachés.
 */
export const SECTION_Y = "py-8 os:py-9";

/** Fond translucide dérivé de --soft, pour puces et badges. */
export const SOFT_WASH = "color-mix(in srgb, var(--soft) 16%, transparent)";

/**
 * Colonne de lecture des pages de texte (légal, contact).
 *
 * La landing s'étale sur toute la largeur de SHELL parce qu'elle alterne
 * fenêtres et colonnes ; du texte suivi, lui, devient pénible au-delà d'une
 * grosse soixantaine de caractères par ligne — d'où ce plafond plus bas.
 */
export const LECTURE = "max-w-[720px]";
