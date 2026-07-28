import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pagesBilingues: Array<{
    fr: string;
    en: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { fr: "/", en: "/en", priority: 1, changeFrequency: "weekly" },
    {
      fr: "/fonctions",
      en: "/en/fonctions",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      fr: "/tarifs",
      en: "/en/tarifs",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      fr: "/contact",
      en: "/en/contact",
      priority: 0.5,
      changeFrequency: "yearly",
    },
    {
      fr: "/conditions",
      en: "/en/conditions",
      priority: 0.3,
      changeFrequency: "yearly",
    },
    {
      fr: "/confidentialite",
      en: "/en/confidentialite",
      priority: 0.3,
      changeFrequency: "yearly",
    },
  ];

  /**
   * Pages qui n'existent qu'en français, en attendant leur miroir anglais.
   *
   * Déclarées sans `alternates` : annoncer un `hreflang` vers une URL qui
   * répond 404 est une erreur que la Search Console remonte, et qui jette un
   * doute sur les paires bilingues valides du même fichier. Chacune se déplace
   * dans `pagesBilingues` le jour où sa version anglaise existe — et pas avant.
   */
  const pagesFrancaisSeulement: Array<{
    fr: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }> = [
    { fr: "/plateforme", priority: 0.8, changeFrequency: "monthly" },
    { fr: "/calcul", priority: 0.8, changeFrequency: "monthly" },
    { fr: "/mines", priority: 0.8, changeFrequency: "monthly" },
    { fr: "/securite", priority: 0.6, changeFrequency: "monthly" },
  ];

  const lastModified = new Date();

  const entreesFrancaisSeulement: MetadataRoute.Sitemap =
    pagesFrancaisSeulement.map(({ fr, priority, changeFrequency }) => ({
      url: `${SITE_URL}${fr}`,
      lastModified,
      changeFrequency,
      priority,
    }));

  // Littéral étalé plutôt que `.concat()` : `flatMap` infère le type étroit de
  // ses propres objets, contre lequel les entrées françaises — sans
  // `alternates` — ne s'assignent pas. Ici c'est le type de retour annoncé de
  // la fonction qui sert de référence, et il accepte les deux formes.
  const entreesBilingues = pagesBilingues.flatMap(
    ({ fr, en, priority, changeFrequency }) => [
      {
        url: `${SITE_URL}${fr}`,
        lastModified,
        changeFrequency,
        priority,
        alternates: {
          languages: { fr: `${SITE_URL}${fr}`, en: `${SITE_URL}${en}` },
        },
      },
      {
        url: `${SITE_URL}${en}`,
        lastModified,
        changeFrequency,
        priority,
        alternates: {
          languages: { fr: `${SITE_URL}${fr}`, en: `${SITE_URL}${en}` },
        },
      },
    ],
  );

  return [...entreesBilingues, ...entreesFrancaisSeulement];
}
