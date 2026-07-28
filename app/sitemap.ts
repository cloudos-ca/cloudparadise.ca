import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * Toutes les pages du site existent dans les deux langues, donc une seule
 * liste : chaque entrée produit son URL française, son URL anglaise, et le
 * couple `hreflang` qui les relie l'une à l'autre.
 *
 * Une page ajoutée ici sans son miroir anglais annoncerait un `hreflang` vers
 * une URL en 404 — une erreur que la Search Console remonte, et qui jette un
 * doute sur les paires valides déclarées à côté. Une page qui n'existerait que
 * dans une langue doit donc être déclarée sans `alternates`, pas ajoutée ici.
 */
const PAGES: ReadonlyArray<{
  fr: string;
  en: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { fr: "/", en: "/en", priority: 1, changeFrequency: "weekly" },
  {
    fr: "/plateforme",
    en: "/en/plateforme",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    fr: "/calcul",
    en: "/en/calcul",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    fr: "/mines",
    en: "/en/mines",
    priority: 0.8,
    changeFrequency: "monthly",
  },
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
    fr: "/securite",
    en: "/en/securite",
    priority: 0.6,
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

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PAGES.flatMap(({ fr, en, priority, changeFrequency }) => [
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
  ]);
}
