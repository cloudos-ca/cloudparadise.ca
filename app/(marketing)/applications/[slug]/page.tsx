import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageApplication } from "@/components/marketing/applications/PageApplication";
import { metadonneesFiche } from "@/components/marketing/applications/metadonnees";
import { FICHES } from "@/content/applications";
import { ficheParSlug } from "@/lib/applications";

/**
 * /applications/[slug] — une fiche d'application.
 *
 * Une page par fiche, générée au build. `dynamicParams = false` : un slug
 * absent de `generateStaticParams` est un 404, sans rendu à la demande.
 *
 * Le miroir est `app/en/apps/[slug]/page.tsx`.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return FICHES.map((fiche) => ({ slug: fiche.slug.fr }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fiche = ficheParSlug(slug, "fr");
  return fiche ? metadonneesFiche(fiche, "fr") : {};
}

export default async function FicheApplicationPage({ params }: Props) {
  const { slug } = await params;
  const fiche = ficheParSlug(slug, "fr");
  if (!fiche) notFound();
  return <PageApplication fiche={fiche} lang="fr" />;
}
