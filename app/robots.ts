import type { MetadataRoute } from "next";
import { EST_PRODUCTION, SITE_URL } from "@/lib/site";

/**
 * Hors production, tout est interdit et aucun sitemap n'est annoncé.
 *
 * Le `Disallow: /` et le `noindex` des pages ne font pas le même travail et se
 * complètent : le premier empêche l'exploration, le second ne vaut que pour
 * une page déjà explorée. Un robot qui respecte le `Disallow` ne lira jamais
 * le `noindex` ; un robot qui l'ignore tombe dessus.
 *
 * Ni l'un ni l'autre n'est étanche — seule une protection par mot de passe ou
 * par en-tête, posée par l'hébergeur, l'est.
 *
 * `EST_PRODUCTION` vaut vrai par défaut : la production n'a aucune variable à
 * poser et ce fichier rend exactement ce qu'il rendait avant.
 */
export default function robots(): MetadataRoute.Robots {
  if (!EST_PRODUCTION) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
