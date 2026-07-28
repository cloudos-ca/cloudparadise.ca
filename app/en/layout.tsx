import type { Metadata } from "next";
import { Footer } from "@/components/marketing/Footer";
import { PopupLoi25 } from "@/components/marketing/PopupLoi25";
import { RootDocument } from "@/components/marketing/RootDocument";
import { TopBar } from "@/components/marketing/TopBar";
import { SITE_URL, ICONS, ROBOTS } from "@/lib/seo";

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
        {/* Grain très léger : de la matière sur le navy, sans motif
            perceptible. Posé une fois au layout, donc valable sur tout le
            site. `img-src data:` couvre ce data-URI côté CSP. */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 opacity-[0.06]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "140px 140px",
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
