import { IndexBlogue } from "@/components/marketing/blogue/IndexBlogue";
import { metadonneesIndex } from "@/components/marketing/blogue/metadonnees";

/**
 * /en/blog — les articles en anglais.
 *
 * Rendu à la demande : la clé de l'API se lit à l'exécution, pas au build
 * (voir l'en-tête de `lib/blogue.ts`). Les réponses de l'API sont mises en
 * cache par `fetch`, donc ce rendu ne coûte pas un appel réseau par visite.
 *
 * Le miroir français est `app/(marketing)/blogue/page.tsx`.
 */
export const dynamic = "force-dynamic";

export const metadata = metadonneesIndex("en");

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  return <IndexBlogue lang="en" page={page} />;
}
