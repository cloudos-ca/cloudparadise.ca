import type { Metadata } from "next";
import { MatomoAnalytics } from "@/components/marketing/MatomoAnalytics";
import { SITE_URL, TITRE_ACCUEIL, DESCRIPTION_ACCUEIL } from "@/lib/seo";
import { comfortaa, workSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITRE_ACCUEIL,
  description: DESCRIPTION_ACCUEIL,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
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
  icons: {
    icon: "/favicon.ico",
  },
};

/**
 * Organisation + site, en JSON-LD — sert de repère stable à Google pour le
 * nom de marque et le lien officiel dans les résultats de recherche.
 */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Cloud Paradise",
      url: SITE_URL,
      logo: `${SITE_URL}/brand/logo-bleu-fonce.png`,
    },
    {
      "@type": "WebSite",
      name: "Cloud Paradise",
      url: SITE_URL,
      inLanguage: ["fr-CA", "en-CA"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${comfortaa.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        {/* Organisation + site : repère stable pour Google, voir JSON_LD
            ci-dessus. `dangerouslySetInnerHTML` est sans risque ici, le
            contenu est un objet littéral du code, pas une entrée utilisateur. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {children}
        {/* Site entier (FR + EN) : voir MatomoAnalytics.tsx pour la porte de
            consentement. */}
        <MatomoAnalytics />
      </body>
    </html>
  );
}
