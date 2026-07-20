import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Conditions et confidentialité sont volontairement absentes : elles portent
 * `robots: { index: false }` tant qu'un juriste n'a pas validé le texte, et un
 * sitemap ne doit lister que des pages indexables.
 */
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
  ];

  const lastModified = new Date();

  return pagesBilingues.flatMap(({ fr, en, priority, changeFrequency }) => [
    {
      url: `${SITE_URL}${fr}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: { fr: `${SITE_URL}${fr}`, en: `${SITE_URL}${en}` } },
    },
    {
      url: `${SITE_URL}${en}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: { fr: `${SITE_URL}${fr}`, en: `${SITE_URL}${en}` } },
    },
  ]);
}
