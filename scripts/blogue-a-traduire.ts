import { BlogClient } from "babylovegrowth-next-js-blog";
import type { ArticleTraduit } from "../content/blogue/en";
import { articlesParLangue, etatDesTraductions } from "../lib/blogue";

/**
 * Qu'est-ce qui reste à traduire en anglais ?
 *
 *   npm run blogue:a-traduire            — l'état de chaque article français
 *   npm run blogue:a-traduire -- <slug>  — l'article français, prêt à traduire
 *
 * Lit la clé dans `.env.local` (`--env-file`, voir package.json). Sans
 * argument, une ligne par article : `traduit`, `absente` (pas de traduction)
 * ou `modifiee` (l'article FR a changé depuis sa traduction). Avec un slug,
 * écrit sur la sortie standard le JSON de l'article — les champs à traduire,
 * ceux à recopier, et `source` déjà rempli — à traduire puis à enregistrer
 * sous `content/blogue/en/<slug-en>.json` (voir l'en-tête de son `index.ts`).
 */
async function main(): Promise<void> {
  const slug = process.argv[2];

  if (!slug) {
    const etats = etatDesTraductions(await articlesParLangue("fr"));
    if (etats.length === 0) {
      console.log("Aucun article français (clé absente ou API injoignable ?).");
      return;
    }
    for (const { slug, etat, traduction } of etats) {
      console.log(`${etat.padEnd(9)} ${slug}${traduction ? `  → ${traduction}` : ""}`);
    }
    return;
  }

  const client = new BlogClient({
    apiKey: process.env.BABYLOVEGROWTH_BLOG_API_KEY,
    baseUrl: process.env.BABYLOVEGROWTH_BLOG_API_URL,
    revalidate: false,
  });
  const article = await client.getArticleBySlug(slug);
  if (!article) {
    console.error(`Aucun article « ${slug} ».`);
    process.exitCode = 1;
    return;
  }

  const aTraduire: ArticleTraduit = {
    id: article.id,
    title: article.title,
    slug: article.slug,
    hero_image_url: article.hero_image_url,
    meta_description: article.meta_description,
    excerpt: article.excerpt,
    created_at: article.created_at,
    updated_at: article.updated_at,
    keywords: article.keywords,
    content_html: article.content_html,
    jsonLd: article.jsonLd,
    faqJsonLd: article.faqJsonLd,
    source: { slug: article.slug, updated_at: article.updated_at },
  };
  console.log(JSON.stringify(aTraduire, null, 2));
}

main().catch((erreur) => {
  console.error(erreur);
  process.exitCode = 1;
});
