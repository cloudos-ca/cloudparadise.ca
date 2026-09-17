import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageArticle } from "@/components/marketing/blogue/PageArticle";
import { metadonneesArticle } from "@/components/marketing/blogue/metadonnees";
import { articleParSlug } from "@/lib/blogue";

/**
 * /en/blog/[slug] — un article en anglais.
 *
 * Rendu à la demande, comme l'index (voir `lib/blogue.ts`). `articleParSlug`
 * renvoie `null` pour un slug inconnu, non publié ou écrit dans l'autre
 * langue : les trois cas sont un 404.
 *
 * L'article est lu deux fois par requête (métadonnées, puis page) ; la
 * seconde lecture sort du cache de `fetch`, pas du réseau.
 *
 * Le miroir français est `app/(marketing)/blogue/[slug]/page.tsx`.
 */
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await articleParSlug(slug, "en");
  return article ? metadonneesArticle(article, "en") : {};
}

export default async function ArticleBlogPage({ params }: Props) {
  const { slug } = await params;
  const article = await articleParSlug(slug, "en");
  if (!article) notFound();
  return <PageArticle article={article} lang="en" />;
}
