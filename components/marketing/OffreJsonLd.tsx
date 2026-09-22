import { SITE_URL } from "@/lib/site";
import { PALIERS } from "./offre";
import type { Lang } from "./tokens";

/**
 * Les deux forfaits en JSON-LD, sans rendu visuel — la page affiche déjà les
 * prix, ce balisage les rend lisibles par un moteur de recherche.
 *
 * **Aucun prix n'est écrit ici.** Tout vient de `offre.ts`, la même source que
 * `Tarification` et la page `/tarifs` : un JSON-LD qui diverge des prix
 * affichés est pire que pas de JSON-LD du tout, puisqu'il annonce au moteur un
 * prix que le visiteur ne verra jamais.
 *
 * `Product` plutôt que `Service` : schema.org définit `Product` comme « any
 * offered product **or service** », et c'est le seul des deux que Google
 * exploite pour les offres.
 */
export function OffreJsonLd({ lang }: Readonly<{ lang: Lang }>) {
  const montants = PALIERS.map((p) => p.prixMensuel);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Cloud OS",
    url: `${SITE_URL}${lang === "en" ? "/en/pricing" : "/tarifs"}`,
    image: `${SITE_URL}/brand/symbole-couleur.png`,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "CAD",
      lowPrice: Math.min(...montants).toFixed(2),
      highPrice: Math.max(...montants).toFixed(2),
      offerCount: PALIERS.length,
      offers: PALIERS.map((palier) => ({
        "@type": "Offer",
        name: palier.nom[lang],
        url: `${SITE_URL}${lang === "en" ? "/en/pricing" : "/tarifs"}`,
        priceCurrency: "CAD",
        price: palier.prixMensuel.toFixed(2),
        availability: "https://schema.org/InStock",
        // Un abonnement mensuel, pas un achat unique : le balisage le dit
        // explicitement, sinon un moteur de recherche pourrait lire le prix
        // comme celui d'un achat ponctuel.
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          priceCurrency: "CAD",
          price: palier.prixMensuel.toFixed(2),
          unitText: lang === "en" ? "month" : "mois",
          billingDuration: 1,
          billingDurationUnit: "MON",
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
