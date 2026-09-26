import { notFound } from "next/navigation";
import type { Lang } from "@/components/marketing/tokens";
import { ficheParSlug } from "@/lib/applications";
import { renderOgImage } from "@/lib/ogImage";

/**
 * L'image Open Graph d'une fiche : le `<h1>` et l'accroche, dans le gabarit
 * commun du site (`renderOgImage`).
 *
 * Sans la capture, pour l'instant : satori ne lit ni le WebP des captures, ni
 * rien d'autre que le PNG et le JPEG, et les convertir au build demanderait
 * `sharp`, qui n'est qu'une dépendance facultative de Next ici.
 */
export function ogFiche(slug: string, lang: Lang) {
  const fiche = ficheParSlug(slug, lang);
  if (!fiche) notFound();
  return renderOgImage(fiche.titre[lang], fiche.accroche[lang]);
}
