import type { Metadata } from "next";

export const SITE_URL = "https://cloudparadise.ca";

/**
 * Alternates hreflang pour une paire de pages FR/EN.
 *
 * `metadataBase` (posé au layout racine) rend les chemins relatifs suffisants
 * ici : Next les résout en URLs absolues à la génération des balises.
 */
export function alternatesBilingues(
  cheminFr: string,
  cheminEn: string,
  langueCourante: "fr" | "en",
): Metadata["alternates"] {
  return {
    canonical: langueCourante === "fr" ? cheminFr : cheminEn,
    languages: {
      fr: cheminFr,
      en: cheminEn,
      "x-default": cheminFr,
    },
  };
}
