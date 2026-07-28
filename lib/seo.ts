import type { Metadata } from "next";

export const SITE_URL = "https://cloudparadise.ca";

/**
 * Vrai en production, faux partout ailleurs (dev.cloudparadise.cloud, aperçus,
 * local).
 *
 * Le défaut est « production » **volontairement**, et c'est le point délicat de
 * ce fichier : c'est un choix de sens de panne. Un environnement hors
 * production qui oublie la variable reste indexable — le problème qu'on
 * corrige. Mais l'inverse, un défaut « non-production », désindexerait le vrai
 * site au premier déploiement qui oublie la variable, et une désindexation se
 * paie en semaines de retour dans l'index. Entre les deux, on prend le risque
 * réversible. Conséquence : **c'est l'environnement de dev qui doit déclarer
 * `SITE_ENV`**, pas la production.
 *
 * Lu au build, pas à l'exécution : les métadonnées des pages statiques sont
 * calculées à la génération, donc une variable posée seulement à l'exécution
 * n'aurait aucun effet sur le HTML servi. D'où l'`ARG SITE_ENV` du Dockerfile —
 * côté Coolify, la variable doit être cochée « Build Variable ». Passer par un
 * `generateMetadata` dynamique aurait rendu tout le site dynamique, ce que le
 * projet refuse déjà par ailleurs (voir la note CSP de next.config.ts).
 *
 * Pas de `NEXT_PUBLIC_` : rien de tout ceci ne descend dans le bundle client.
 *
 * `||` et non `??` : le Dockerfile fait `ENV SITE_ENV=${SITE_ENV}`, ce qui pose
 * une chaîne **vide** quand l'`ARG` n'est pas fourni — c'est-à-dire en
 * production. `??` ne rattrape que `null`/`undefined`, laisserait passer `""`,
 * et désindexerait donc exactement l'environnement qu'il faut protéger.
 */
export const EST_PRODUCTION =
  (process.env.SITE_ENV || "production") === "production";

/**
 * Directives d'indexation, partagées par les deux layouts racines et par les
 * pages qui redéfinissent leur bloc `robots`.
 *
 * Hors production, `noindex, nofollow` — un environnement de préproduction
 * contient des affirmations non validées et une tarification que l'application
 * n'applique pas encore ; le `canonical` vers la production atténue mais
 * n'ordonne rien. `googleBot` est répété explicitement plutôt qu'omis : sans
 * lui, la balise `max-image-preview:large` disparaîtrait bien, mais on veut la
 * consigne négative écrite noir sur blanc pour le robot qui compte.
 */
export const ROBOTS: Metadata["robots"] = EST_PRODUCTION
  ? {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    }
  : {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    };

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
  "Cloud Paradise — Votre poste de travail cloud";
export const DESCRIPTION_ACCUEIL =
  "Un bureau en ligne complet : calcul lourd en langage humain, applications professionnelles et collaboration d'équipe. Hébergé au Québec, sans rien installer.";

/**
 * Canonical pour une paire de pages FR/EN.
 *
 * `metadataBase` (posé au layout racine) rend les chemins relatifs suffisants
 * ici : Next les résout en URL absolue à la génération de la balise.
 *
 * Ne couvre plus `alternates.languages` (hreflang) : le renderer React 19
 * bundlé avec cette version de Next sort ces balises avec l'attribut
 * `hrefLang` (casse camelCase) au lieu de `hreflang`, faute d'alias dans la
 * table d'attributs de `react-dom-server` — un vrai bug de cette version,
 * vérifié en comparant le HTML servi en prod au HTML documenté par Next
 * lui-même. Les pages rendent donc leurs propres balises hreflang via
 * `HreflangLinks`, en JSX minuscule, pour contourner le bug.
 */
export function alternatesBilingues(
  cheminFr: string,
  cheminEn: string,
  langueCourante: "fr" | "en",
): Metadata["alternates"] {
  return {
    canonical: langueCourante === "fr" ? cheminFr : cheminEn,
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
