import type { Metadata } from "next";
import { Footer } from "@/components/marketing/Footer";
import { PopupLoi25 } from "@/components/marketing/PopupLoi25";
import { RootDocument } from "@/components/marketing/RootDocument";
import { TopBar } from "@/components/marketing/TopBar";
import { SITE_URL, ICONS } from "@/lib/seo";

/**
 * Pas de title/description par défaut ici : chaque page `/en/*` définit déjà
 * les siens. Un repli le ferait en anglais uniquement s'il manquait — un
 * repli en français serait pire qu'aucun repli.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
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
        <div
          aria-hidden="true"
          className="fixed inset-0 -z-20"
          style={{
            background: [
              "radial-gradient(760px 420px at 14% 6%, color-mix(in srgb, var(--soft) 20%, transparent), transparent 62%)",
              "radial-gradient(620px 420px at 86% 48%, color-mix(in srgb, var(--acc) 18%, transparent), transparent 64%)",
              "var(--sky)",
            ].join(","),
          }}
        />
        {/* Voile de lisibilité, actif uniquement sur les fonds photo. */}
        <div
          aria-hidden="true"
          className="fixed inset-0 -z-10 bg-black/35"
          style={{ opacity: "var(--veil)" }}
        />
        <TopBar lang="en" />
        <div className="flex-1">{children}</div>
        <Footer lang="en" />
        <PopupLoi25 lang="en" />
      </main>
    </RootDocument>
  );
}
