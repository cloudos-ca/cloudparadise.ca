import { CHEMIN_BLOGUE, entreesSitemap } from "@/lib/blogue";
import { EST_PRODUCTION, urlSite } from "@/lib/site";

/**
 * Sitemap des articles du blogue, dans les deux langues — `/blogue/sitemap.xml`.
 *
 * À part du sitemap principal (`app/sitemap.ts`), et pour la même raison que
 * les pages du blogue sont rendues à la demande : la liste des articles vient
 * de l'API, avec une clé qui n'existe qu'à l'exécution, alors que le sitemap
 * principal est généré au build. Un gestionnaire de route dynamique lit la
 * clé à la requête. Le robots.txt annonce les deux fichiers.
 *
 * **Vide hors production**, comme le principal : voir son en-tête.
 *
 * `lastmod` est ici posé, contrairement au sitemap principal qui le refuse :
 * la date vient de l'article lui-même (`updated_at`), pas de l'heure du build,
 * et elle ne bouge que quand le texte change — c'est exactement le `lastmod`
 * qu'un moteur peut croire.
 *
 * Les index eux-mêmes (`/blogue`, `/en/blog`) ne sont pas ici : ils sont dans
 * `PAGES`, donc dans le sitemap principal, avec leurs hreflang.
 */
export const dynamic = "force-dynamic";

function echapper(texte: string): string {
  return texte
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function GET(): Promise<Response> {
  const urls: string[] = [];

  if (EST_PRODUCTION) {
    for (const lang of ["fr", "en"] as const) {
      const entrees = await entreesSitemap(lang);
      for (const { slug, updated_at } of entrees) {
        const loc = echapper(urlSite(`${CHEMIN_BLOGUE[lang]}/${slug}`));
        const lastmod = new Date(updated_at);
        urls.push(
          Number.isNaN(lastmod.getTime())
            ? `  <url><loc>${loc}</loc></url>`
            : `  <url><loc>${loc}</loc><lastmod>${lastmod.toISOString()}</lastmod></url>`,
        );
      }
    }
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // Une heure : l'API derrière est déjà mise en cache une journée, et un
      // robot qui relit le fichier toutes les heures ne coûte rien.
      "Cache-Control": "public, max-age=3600",
    },
  });
}
