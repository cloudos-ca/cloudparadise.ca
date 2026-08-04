import type { Metadata } from "next";
import { Footer } from "@/components/marketing/Footer";
import { PopupLoi25 } from "@/components/marketing/PopupLoi25";
import { RootDocument } from "@/components/marketing/RootDocument";
import { TopBar } from "@/components/marketing/TopBar";
import { ICONS, ROBOTS } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

/**
 * Pas de title/description par défaut ici : chaque page `/en/*` définit déjà
 * les siens. Un repli le ferait en anglais uniquement s'il manquait — un
 * repli en français serait pire qu'aucun repli.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: ROBOTS,
  twitter: {
    card: "summary_large_image",
  },
  icons: ICONS,
};

/**
 * Layout racine de la vitrine anglaise — miroir de
 * `app/(marketing)/layout.tsx`, avec `lang="en"` posé directement dans le
 * HTML servi par le serveur (voir `RootDocument`). Volontairement dupliqué
 * plutôt que paramétré depuis un segment `[lang]` commun : les URLs
 * françaises actuelles ne bougent pas d'un octet.
 */
export default function MarketingLayoutEn({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootDocument lang="en">
      <main className="relative isolate flex flex-1 flex-col">
        {/* Deux couches de composition, et deux seulement — leur contenu vit
            dans `globals.css` (`.fond-page`, `.fond-grain`), partagé avec le
            layout français. Le compositeur gère chacune à chaque frame de
            défilement ; il y en avait quatre. */}
        <div aria-hidden="true" className="fond-page fixed inset-0 -z-20" />
        <div
          aria-hidden="true"
          className="fond-grain pointer-events-none fixed inset-0 -z-10"
        />
        <TopBar lang="en" />
        <div className="flex-1">{children}</div>
        <Footer lang="en" />
        <PopupLoi25 lang="en" />
      </main>
    </RootDocument>
  );
}
