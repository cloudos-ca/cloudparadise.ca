import { Footer } from "@/components/marketing/Footer";
import { HtmlLangSync } from "@/components/marketing/HtmlLangSync";
import { PopupLoi25 } from "@/components/marketing/PopupLoi25";
import { TopBar } from "@/components/marketing/TopBar";

/**
 * Layout de la vitrine anglaise — miroir de `app/(marketing)/layout.tsx`,
 * avec `lang="en"` posé sur les composants partagés. Volontairement dupliqué
 * plutôt que paramétré depuis un segment `[lang]` commun : les URLs
 * françaises actuelles ne bougent pas d'un octet.
 */
export default function MarketingLayoutEn({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative isolate flex flex-1 flex-col">
      <HtmlLangSync lang="en" />
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
  );
}
