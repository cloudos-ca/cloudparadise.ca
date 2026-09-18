import type { BlogArticle } from "babylovegrowth-next-js-blog";
import type { Metadata } from "next";
import type { Lang } from "@/components/marketing/tokens";
import { libelleBlogue } from "@/content/blogue";
import { CHEMIN_BLOGUE } from "@/lib/blogue";
import {
  alternatesBilingues,
  IMAGE_OG_PARTAGEE,
  openGraphPage,
  ROBOTS,
} from "@/lib/seo";
import { EST_PRODUCTION } from "@/lib/site";

/** Métadonnées de l'index du blogue, dans une langue. */
export function metadonneesIndex(lang: Lang): Metadata {
  const titre = libelleBlogue("titreSeo", lang);
  const description = libelleBlogue("descriptionSeo", lang);
  return {
    title: titre,
    description,
    robots: ROBOTS,
    alternates: alternatesBilingues(CHEMIN_BLOGUE.fr, CHEMIN_BLOGUE.en, lang),
    openGraph: openGraphPage(titre, description, lang, CHEMIN_BLOGUE[lang], [
      IMAGE_OG_PARTAGEE,
    ]),
  };
}

/**
 * Métadonnées d'un article.
 *
 * Canonical et `og:url` seulement en production, pour la raison développée
 * dans `alternatesBilingues` (lib/seo.ts) : une préproduction ne revendique
 * pas les adresses du vrai site. Pas d'`alternates.languages` : les hreflang
 * d'un article, quand il a un pendant traduit, sont rendus par
 * `HreflangLinks` dans `PageArticle`, comme sur le reste du site.
 *
 * `openGraphPage` n'est pas réutilisée : elle décrit une page (`type:
 * "website"`), et un article se déclare comme tel, avec ses dates — ce que
 * les agrégateurs et LinkedIn lisent pour dater l'aperçu.
 */
export function metadonneesArticle(article: BlogArticle, lang: Lang): Metadata {
  const chemin = `${CHEMIN_BLOGUE[lang]}/${article.slug}`;
  const description = article.meta_description || article.excerpt;
  return {
    title: `${article.title} — Cloud OS`,
    description,
    robots: ROBOTS,
    alternates: EST_PRODUCTION ? { canonical: chemin } : undefined,
    openGraph: {
      type: "article",
      title: article.title,
      description,
      siteName: "Cloud OS",
      locale: lang === "en" ? "en_CA" : "fr_CA",
      publishedTime: article.created_at,
      modifiedTime: article.updated_at,
      ...(EST_PRODUCTION ? { url: chemin } : {}),
      images: article.hero_image_url
        ? [{ url: article.hero_image_url, alt: article.title }]
        : [IMAGE_OG_PARTAGEE],
    },
  };
}
