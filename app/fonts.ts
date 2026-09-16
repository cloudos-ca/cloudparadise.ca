import { Archivo, Manrope } from "next/font/google";

/**
 * Les deux familles de la charte Cloud OS (2026), en fontes variables : tout
 * l'axe de graisse arrive dans un seul fichier, donc pas de liste `weight` à
 * tenir à jour. La charte réserve 800-900 au titrage — c'est `font-extrabold`
 * sur les blocs `font-display` — et le texte courant se tient en 400-500.
 */

/** Titrage et éléments d'affichage — H1 en 800. */
export const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

/** Texte courant — 400, et 500 pour boutons et accents. */
export const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});
