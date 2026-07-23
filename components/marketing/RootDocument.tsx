import { MatomoAnalytics } from "@/components/marketing/MatomoAnalytics";
import { SITE_URL } from "@/lib/seo";
import { comfortaa, workSans } from "@/app/fonts";
import {
  COURRIEL,
  RUE,
  VILLE,
  PROVINCE,
  CODE_POSTAL,
  PAYS,
  TELEPHONE_LIEN,
} from "@/components/marketing/coordonnees";
import "@/app/globals.css";

/**
 * Organisation + site + établissement, en JSON-LD — sert de repère stable à
 * Google pour le nom de marque, le lien officiel et l'adresse dans les
 * résultats de recherche. L'adresse vient de `coordonnees.ts`, seule source
 * de vérité pour ces champs (utilisée aussi par /contact et les pages légales).
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
    {
      "@type": "LocalBusiness",
      name: "Cloud Paradise",
      url: SITE_URL,
      email: COURRIEL,
      telephone: TELEPHONE_LIEN,
      address: {
        "@type": "PostalAddress",
        streetAddress: RUE,
        addressLocality: VILLE,
        addressRegion: PROVINCE,
        postalCode: CODE_POSTAL,
        addressCountry: PAYS,
      },
    },
  ],
};

/**
 * Coquille `<html>`/`<body>` partagée par les deux layouts racines (FR et EN).
 *
 * Le site a deux layouts racines plutôt qu'un seul avec un `lang` corrigé côté
 * client : chaque sous-arbre reste ainsi statiquement générable, et `lang` est
 * correct dès le HTML servi par le serveur (pas seulement après hydratation).
 * Contrepartie acceptée : naviguer entre FR et EN recharge la page entière.
 */
export function RootDocument({
  lang,
  children,
}: {
  lang: "fr" | "en";
  children: React.ReactNode;
}) {
  return (
    <html
      lang={lang}
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
