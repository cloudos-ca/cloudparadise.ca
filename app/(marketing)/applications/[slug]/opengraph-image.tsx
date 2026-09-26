import { ogFiche } from "@/components/marketing/applications/ogFiche";

/** L'image Open Graph d'une fiche. Le miroir est `app/en/apps/[slug]/opengraph-image.tsx`. */
export const alt = "Cloud OS — applications";
export { OG_SIZE as size } from "@/lib/ogImage";
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return ogFiche(slug, "fr");
}
