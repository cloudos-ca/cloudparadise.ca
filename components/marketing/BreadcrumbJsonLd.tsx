import { SITE_URL } from "@/lib/site";

/**
 * Fil d'Ariane en JSON-LD, sans rendu visuel — le site n'a pas de fil
 * d'Ariane affiché (la nav est plate, deux niveaux tout au plus), mais le
 * balisage aide Google à afficher le chemin dans les résultats de recherche.
 */
export function BreadcrumbJsonLd({
  items,
}: Readonly<{
  items: readonly { nom: string; chemin: string }[];
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ nom, chemin }, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: nom,
      item: `${SITE_URL}${chemin}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
