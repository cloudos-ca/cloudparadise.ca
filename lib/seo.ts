import type { Metadata } from "next";

export const SITE_URL = "https://cloudparadise.ca";

/** Titre/description de l'accueil FR — partagés entre le layout racine
 * (valeurs par défaut) et `app/(marketing)/page.tsx` (metadata explicite +
 * alternates), pour ne pas les dupliquer en texte libre à deux endroits. */
export const TITRE_ACCUEIL =
  "Cloud Paradise — Décrivez la tâche. On s'occupe du calcul.";
export const DESCRIPTION_ACCUEIL =
  "Déposez vos fichiers, dites ce que vous voulez en mots simples. L'IA choisit le bon mode et lance le calcul dans le cloud. Vous n'avez qu'à récupérer le résultat.";

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

/**
 * Open Graph par page.
 *
 * Next remplace entièrement `openGraph` d'un ancêtre dès qu'un segment plus
 * spécifique en définit un (pas de fusion champ par champ) — donc poser
 * `openGraph: { title, description }` sur une page ferait perdre l'image, le
 * type et la locale hérités du layout racine. Cette fonction reconstruit
 * l'objet complet à chaque appel pour ne rien perdre.
 */
export function openGraphPage(
  titre: string,
  description: string,
  langue: "fr" | "en",
): Metadata["openGraph"] {
  return {
    title: titre,
    description,
    locale: langue === "en" ? "en_CA" : "fr_CA",
    type: "website",
    images: ["/opengraph-image"],
  };
}
