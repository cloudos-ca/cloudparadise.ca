import { SITE_URL } from "@/lib/site";
import {
  CREDIT_EN_DEVISE,
  GRILLE,
  coutDe,
  libelleDe,
  type TypeTache,
} from "./offre";
import type { Lang } from "./tokens";

/**
 * Grille tarifaire en JSON-LD, sans rendu visuel — la page affiche déjà les
 * prix, ce balisage les rend lisibles par un moteur de recherche.
 *
 * **Aucun prix n'est écrit ici.** Tout vient de `offre.ts`, la même source que
 * `GrilleDetaillee` et `Tarification` : un JSON-LD qui diverge de la grille
 * affichée est pire que pas de JSON-LD du tout, puisqu'il annonce au moteur un
 * prix que le visiteur ne verra jamais.
 *
 * Le prix est exprimé en dollars, pas en crédits : `CREDIT_EN_DEVISE` vaut 1 et
 * la page le dit sous le tableau (« 1 crédit = 1 $ CA »), donc les deux chiffres
 * coïncident aujourd'hui. La multiplication reste écrite pour que le jour où le
 * taux change, le balisage suive au lieu de mentir.
 *
 * `Product` plutôt que `Service` : schema.org définit `Product` comme « any
 * offered product **or service** », et c'est le seul des deux que Google
 * exploite pour les offres.
 */
export function OffreJsonLd({ lang }: Readonly<{ lang: Lang }>) {
  // `coutDe` peut rendre `null` — un tarif encore indéterminé, affiché « Tarif
  // à venir » par la grille. Il ne doit surtout pas devenir un prix.
  const tarifs = GRILLE.map(({ type }) => ({ type, cout: coutDe(type) })).filter(
    (t): t is { type: TypeTache; cout: number } => t.cout !== null,
  );

  const prix = (cout: number) => (cout * CREDIT_EN_DEVISE).toFixed(2);
  const montants = tarifs.map(({ cout }) => cout);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Cloud Paradise",
    url: `${SITE_URL}${lang === "en" ? "/en/pricing" : "/tarifs"}`,
    image: `${SITE_URL}/brand/logo-bleu-fonce.png`,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "CAD",
      lowPrice: prix(Math.min(...montants)),
      highPrice: prix(Math.max(...montants)),
      offerCount: tarifs.length,
      offers: tarifs.map(({ type, cout }) => ({
        "@type": "Offer",
        name: libelleDe(type, lang),
        url: `${SITE_URL}${lang === "en" ? "/en/pricing" : "/tarifs"}`,
        priceCurrency: "CAD",
        price: prix(cout),
        availability: "https://schema.org/InStock",
        // Sans l'unité, le balisage laisserait croire à un prix d'abonnement.
        // Le débit suit la tâche, unité par unité — c'est la règle réelle.
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          priceCurrency: "CAD",
          price: prix(cout),
          unitText: lang === "en" ? "task" : "tâche",
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
