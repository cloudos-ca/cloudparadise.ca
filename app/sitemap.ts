import type { MetadataRoute } from "next";
import { EST_PRODUCTION, PAGES, urlSite } from "@/lib/site";

/**
 * Sitemap XML.
 *
 * La liste des pages vit dans `lib/site.ts` : `llms.txt` la consomme aussi, et
 * deux listes tenues à la main finissent par diverger — c'était déjà le cas,
 * la section anglaise de `llms.txt` n'en comptait que six sur dix.
 *
 * **Vide hors production.** Le `Disallow: /` du robots.txt n'annonçait plus le
 * sitemap, mais l'URL restait devinable et servait vingt adresses de
 * production depuis le dev : de quoi soumettre par erreur, depuis la
 * préproduction, un plan du site qui parle du vrai site. Un sitemap vide est
 * un fichier valide, et il ne dit rien plutôt que de dire faux.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!EST_PRODUCTION) return [];

  const lastModified = new Date();

  return PAGES.flatMap(({ fr, en, priority, changeFrequency }) => {
    const languages = { fr: urlSite(fr), en: urlSite(en) };
    return [
      {
        url: urlSite(fr),
        lastModified,
        changeFrequency,
        priority,
        alternates: { languages },
      },
      {
        url: urlSite(en),
        lastModified,
        changeFrequency,
        priority,
        alternates: { languages },
      },
    ];
  });
}
