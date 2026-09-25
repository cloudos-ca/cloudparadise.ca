import type { Metadata } from "next";
import type { Lang } from "@/components/marketing/tokens";
import { libelleApplications } from "@/content/applications/libelles";
import type { FicheApplication } from "@/content/applications/types";
import { CHEMIN_CATALOGUE, cheminFiche } from "@/lib/applications";
import { alternatesBilingues, IMAGE_OG_PARTAGEE, openGraphPage, ROBOTS } from "@/lib/seo";

/** Métadonnées de l'index du catalogue, dans une langue. */
export function metadonneesIndex(lang: Lang): Metadata {
  const titre = libelleApplications("titreSeo", lang);
  const description = libelleApplications("descriptionSeo", lang);
  return {
    title: titre,
    description,
    robots: ROBOTS,
    alternates: alternatesBilingues(CHEMIN_CATALOGUE.fr, CHEMIN_CATALOGUE.en, lang),
    openGraph: openGraphPage(titre, description, lang, CHEMIN_CATALOGUE[lang], [IMAGE_OG_PARTAGEE]),
  };
}

/**
 * Métadonnées d'une fiche. L'image Open Graph est l'image partagée du site tant
 * que les fiches n'ont pas la leur (une par fiche, tirée de sa capture : étape
 * suivante du plan).
 */
export function metadonneesFiche(fiche: FicheApplication, lang: Lang): Metadata {
  const titre = fiche.seo.titre[lang];
  const description = fiche.seo.description[lang];
  return {
    title: titre,
    description,
    keywords: [...fiche.motsCles[lang]],
    robots: ROBOTS,
    alternates: alternatesBilingues(cheminFiche(fiche, "fr"), cheminFiche(fiche, "en"), lang),
    openGraph: openGraphPage(titre, description, lang, cheminFiche(fiche, lang), [IMAGE_OG_PARTAGEE]),
  };
}
