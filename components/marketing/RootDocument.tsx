import { GoogleAnalytics } from "@/components/marketing/GoogleAnalytics";
import { EST_PRODUCTION, SITE_URL } from "@/lib/site";
import { archivo, manrope } from "@/app/fonts";
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
 *
 * `SITE_URL` vient de `lib/site.ts` et suit donc l'environnement : le dev
 * déclarait jusqu'ici l'organisation et le site sous l'URL de production,
 * c'est-à-dire qu'il revendiquait l'identité du vrai site depuis une
 * préproduction qu'on demande par ailleurs de ne pas explorer.
 */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Cloud OS",
      legalName: "Cloud OS S.E.N.C.",
      url: SITE_URL,
      logo: `${SITE_URL}/brand/symbole-couleur.png`,
    },
    {
      "@type": "WebSite",
      name: "Cloud OS",
      url: SITE_URL,
      inLanguage: ["fr-CA", "en-CA"],
    },
    {
      "@type": "LocalBusiness",
      name: "Cloud OS",
      legalName: "Cloud OS S.E.N.C.",
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
 *
 * La prop reste `"fr" | "en"` — c'est l'identifiant de sous-arbre que passent
 * les deux layouts racines et `global-not-found`. La traduction en étiquette
 * BCP 47 se fait ici, au seul endroit qui écrit l'attribut : le site déclarait
 * `lang="fr"` là où `openGraph.locale` dit `fr_CA` et le `WebSite` ci-dessus
 * `inLanguage: "fr-CA"`, soit trois façons de nommer la même langue. C'est
 * `fr-CA` qui est juste — la variante québécoise, celle de la tarification en
 * dollars canadiens et des textes légaux qui citent la Loi 25.
 */
export function RootDocument({
  lang,
  children,
}: Readonly<{
  lang: "fr" | "en";
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={lang === "en" ? "en-CA" : "fr-CA"}
      className={`${archivo.variable} ${manrope.variable} h-full antialiased`}
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
        {/* Site entier (FR + EN), et production seulement.
            Le consentement (voir GoogleAnalytics.tsx) est une deuxième porte,
            pas la première : hors production le composant ne monte pas du tout.
            L'identifiant de mesure est le même partout, et le trafic de
            développement se mélangerait sinon aux statistiques du vrai site. */}
        {EST_PRODUCTION ? <GoogleAnalytics /> : null}
      </body>
    </html>
  );
}
