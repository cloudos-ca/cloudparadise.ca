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
