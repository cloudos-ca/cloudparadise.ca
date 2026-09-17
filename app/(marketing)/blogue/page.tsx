import { IndexBlogue } from "@/components/marketing/blogue/IndexBlogue";
import { metadonneesIndex } from "@/components/marketing/blogue/metadonnees";

/**
 * /blogue — les articles en français.
 *
 * Rendu à la demande : la clé de l'API se lit à l'exécution, pas au build
 * (voir l'en-tête de `lib/blogue.ts`). Les réponses de l'API sont mises en
 * cache par `fetch`, donc ce rendu ne coûte pas un appel réseau par visite.
 *
 * Le miroir anglais est `app/en/blog/page.tsx`.
 */
export const dynamic = "force-dynamic";

export const metadata = metadonneesIndex("fr");

export default async function BloguePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  return <IndexBlogue lang="fr" page={page} />;
}
