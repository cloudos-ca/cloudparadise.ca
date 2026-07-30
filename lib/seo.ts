import type { Metadata } from "next";
import { EST_PRODUCTION } from "./site";

/**
 * Ce module ne définit plus d'URL : `lib/site.ts` est la seule définition de
 * domaine du dépôt. Il n'en réexporte pas non plus — deux chemins d'import
 * pour la même constante finissent toujours par diverger dans la tête de
 * quelqu'un. Ce qui a besoin de `SITE_URL` l'importe de `@/lib/site`.
 *
 * Passer les métadonnées par un `generateMetadata` dynamique pour lire
 * l'origine de la requête aurait rendu tout le site dynamique, ce que le projet
 * refuse déjà par ailleurs (voir la note CSP de next.config.ts) : d'où le
 * pilotage au build par `SITE_ENV`.
 */

/**
 * Directives d'indexation, partagées par les deux layouts racines et par les
 * pages qui redéfinissent leur bloc `robots`.
 *
 * Hors production, `noindex, nofollow` — un environnement de préproduction
 * contient des affirmations non validées et une tarification que l'application
 * n'applique pas encore. `googleBot` est répété explicitement plutôt qu'omis :
 * sans lui, la balise `max-image-preview:large` disparaîtrait bien, mais on
 * veut la consigne négative écrite noir sur blanc pour le robot qui compte.
 *
 * Se lit avec `alternatesBilingues`, qui retire le `canonical` sur les mêmes
 * environnements : les deux vont ensemble, voir le pourquoi là-bas.
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
 * **Hors production, aucun canonical n'est émis.** Une préproduction qui sert
 * `<link rel="canonical" href="https://cloudparadise.ca/...">` ne se protège
 * pas — elle demande explicitement que ses pages soient créditées à la
 * production, c'est-à-dire qu'on lise et qu'on fusionne. C'est le contraire de
 * ce que `noindex` et le `Disallow: /` du robots.txt demandent, et le signal
 * contradictoire est exactement le genre d'ambiguïté qu'un moteur tranche à
 * notre place. Rien vaut mieux qu'une mauvaise consigne : sans canonical, une
 * page de dev explorée par erreur ne revendique rien.
 *
 * `metadataBase` reste posé dans les deux cas : Next refuse au build tout
 * champ d'URL relatif sans lui (og:image en tête), et lui, contrairement au
 * canonical, ne donne aucune consigne d'indexation.
 *
 * Ne couvre pas `alternates.languages` (hreflang) : les pages rendent leurs
 * propres balises via `HreflangLinks`, ce qui leur permet d'omettre `en` quand
 * le miroir anglais n'existe pas, d'émettre `x-default`, et de ne rien rendre
 * du tout hors production.
 *
 * **Ce n'est pas un contournement de bug**, contrairement à ce que ce
 * commentaire a longtemps affirmé. Le renderer React 19 sort bien ces balises
 * avec l'attribut `hrefLang` en camelCase — vérifié en production le
 * 2026-07-30 — mais `HreflangLinks` produit exactement la même chose, et c'est
 * sans conséquence : les noms d'attributs HTML sont insensibles à la casse.
 * Voir l'en-tête de `HreflangLinks.tsx`, qui porte le détail.
 */
export function alternatesBilingues(
  cheminFr: string,
  cheminEn: string,
  langueCourante: "fr" | "en",
): Metadata["alternates"] {
  if (!EST_PRODUCTION) return undefined;

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
