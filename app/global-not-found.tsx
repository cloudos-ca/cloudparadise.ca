import type { Metadata } from "next";
import { Footer } from "@/components/marketing/Footer";
import { TopBar } from "@/components/marketing/TopBar";
import { PageEntete } from "@/components/marketing/PageEntete";
import { BoutonCta } from "@/components/marketing/BoutonCta";
import { RootDocument } from "@/components/marketing/RootDocument";
import { LECTURE, SECTION_Y, SHELL } from "@/components/marketing/tokens";

export const metadata: Metadata = {
  title: "Page introuvable — Cloud Paradise",
  description: "Cette page n'existe pas.",
};

/**
 * 404 pour les chemins qui ne correspondent à aucune route, ni FR ni /en —
 * nécessaire depuis que le site a deux layouts racines (voir
 * `experimental.globalNotFound` dans next.config.ts) : sans ce fichier, Next
 * n'a pas de layout unique où composer une 404 globale.
 *
 * Toujours en français, même sous `/en/*` : ce gabarit est mis en cache et
 * partagé pour toute URL non appariée (vérifié — un en-tête de locale posé
 * en amont n'est pas relu à chaque requête, la réponse vient du cache de
 * fallback). Un lien cassé reste un cas marginal ; le français par défaut
 * n'affecte aucune vraie page, qui garde son `lang` correct (voir
 * `(marketing)/not-found.tsx` et `en/not-found.tsx` pour les appels
 * `notFound()` explicites depuis une page existante, ceux-là bien localisés).
 */
export default function GlobalNotFound() {
  return (
    <RootDocument lang="fr">
      <TopBar />
      <section className="relative flex-1">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <PageEntete
            eyebrow="Erreur 404"
            titre="Cette page n’existe pas."
            soustitre="Le lien est peut-être périmé, ou l’adresse comporte une faute de frappe."
          />
          <div className={`${LECTURE} mt-8`}>
            <BoutonCta href="/">Retour à l’accueil</BoutonCta>
          </div>
        </div>
      </section>
      <Footer />
    </RootDocument>
  );
}
