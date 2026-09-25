import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageArticle } from "@/components/marketing/blogue/PageArticle";
import { metadonneesArticle } from "@/components/marketing/blogue/metadonnees";
import { articleParSlug } from "@/lib/blogue";

/**
 * /blogue/[slug] — un article en français.
 *
 * Rendu à la demande, comme l'index (voir `lib/blogue.ts`). `articleParSlug`
 * renvoie `null` pour un slug inconnu, non publié ou écrit dans l'autre
 * langue : les trois cas sont un 404. Une panne de l'API sans copie de
 * secours lève une erreur : la page répond 500, que les moteurs repassent.
 *
 * L'article est lu deux fois par requête (métadonnées, puis page) ; la
 * seconde lecture sort du cache de `fetch`, pas du réseau.
 *
 * Le miroir anglais est `app/en/blog/[slug]/page.tsx`.
 */
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await articleParSlug(slug, "fr");
  return article ? metadonneesArticle(article, "fr") : {};
}

export default async function ArticleBloguePage({ params }: Props) {
  const { slug } = await params;
  const article = await articleParSlug(slug, "fr");
  if (!article) notFound();
  return <PageArticle article={article} lang="fr" />;
}
