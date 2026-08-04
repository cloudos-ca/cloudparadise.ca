import type { Metadata } from "next";
import { Footer } from "@/components/marketing/Footer";
import { PopupLoi25 } from "@/components/marketing/PopupLoi25";
import { RootDocument } from "@/components/marketing/RootDocument";
import { TopBar } from "@/components/marketing/TopBar";
import {
  TITRE_ACCUEIL,
  DESCRIPTION_ACCUEIL,
  ICONS,
  ROBOTS,
} from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITRE_ACCUEIL,
  description: DESCRIPTION_ACCUEIL,
  robots: ROBOTS,
  openGraph: {
    title: TITRE_ACCUEIL,
    description: DESCRIPTION_ACCUEIL,
    siteName: "Cloud Paradise",
    locale: "fr_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: ICONS,
};

/**
 * Layout racine de la vitrine française — volontairement minimal : pas de
 * châssis OS ici.
 *
 * Layout racine (pas seulement de section) : voir `RootDocument` pour le
 * pourquoi de deux layouts racines plutôt qu'un seul partagé avec `/en`.
 *
 * La page est une seule pièce : le fond est posé une fois, en `fixed`, et les
 * sections défilent par-dessus sans jamais le recouper. Elles sont donc toutes
 * transparentes ; aucune ne porte son propre dégradé.
 */
export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootDocument lang="fr">
      <main className="relative isolate flex flex-1 flex-col">
        {/* Deux couches de composition, et deux seulement — leur contenu vit
            dans `globals.css` (`.fond-page`, `.fond-grain`), partagé avec le
            layout anglais. Le compositeur gère chacune à chaque frame de
            défilement ; il y en avait quatre. */}
        <div aria-hidden="true" className="fond-page fixed inset-0 -z-20" />
        <div
          aria-hidden="true"
          className="fond-grain pointer-events-none fixed inset-0 -z-10"
        />
        {/* La barre vit ici, pas dans le hero : `sticky` la libérerait dès que
            la section qui la contient sort de l'écran. */}
        <TopBar />
        {/* `flex-1` pousse le pied de page en bas même sur une page courte. */}
        <div className="flex-1">{children}</div>
        {/* Barre et pied de page vivent au layout : toutes les pages de la
            vitrine partagent ainsi le même châssis, sans le réimporter. */}
        <Footer />
        <PopupLoi25 />
      </main>
    </RootDocument>
  );
}
