import type { Metadata } from "next";

export const SITE_URL = "https://cloudparadise.ca";

/**
 * Icônes de l'app — partagées entre les deux layouts racines (FR et EN).
 *
 * Pas de détection automatique par convention de fichier ici : `icon.tsx` et
 * `apple-icon.tsx` vivent à la racine de `app/`, hors de tout layout racine
 * (le site en a deux, voir RootDocument.tsx) — Next ne les relie donc pas
 * tout seul au `<head>`. On les référence explicitement à la place.
 */
export const ICONS: Metadata["icons"] = {
  icon: [
    { url: "/favicon.ico", sizes: "any" },
    { url: "/icon/192", type: "image/png", sizes: "192x192" },
    { url: "/icon/512", type: "image/png", sizes: "512x512" },
  ],
  apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
};

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
 * `openGraph: { title, description }` sur une page ferait perdre le type et
 * la locale hérités du layout racine. Cette fonction reconstruit l'objet
 * complet à chaque appel pour ne rien perdre.
 *
 * `images` est optionnel et volontairement absent par défaut : une route qui
 * a son propre `opengraph-image.tsx` (fonctions, tarifs, contact) le fait
 * détecter par convention de fichier par Next tout seul — lui fixer `images`
 * ici l'aurait court-circuité. Vérifié : une route SANS fichier propre
 * n'hérite PAS de celui d'un ancêtre dès qu'elle définit son propre objet
 * `openGraph` (même sans `images`) ; ces routes (accueil, conditions,
 * confidentialite) doivent donc passer explicitement `["/opengraph-image"]`.
 */
export function openGraphPage(
  titre: string,
  description: string,
  langue: "fr" | "en",
  images?: readonly string[],
): Metadata["openGraph"] {
  return {
    title: titre,
    description,
    locale: langue === "en" ? "en_CA" : "fr_CA",
    type: "website",
    ...(images ? { images: [...images] } : {}),
  };
}
