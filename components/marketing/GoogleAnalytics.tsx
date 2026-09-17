"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  aAccepteLesTemoinsNonEssentiels,
  surChangementConsentement,
} from "./consentement";

/** Identifiant de mesure GA4 de la propriété « Cloud OS » (site vitrine). */
const ID_MESURE = "G-DNL35D2Z78";

/**
 * Google Analytics 4 (gtag.js), chargé seulement après un « Accepter »
 * explicite dans la bannière Loi 25 (`PopupLoi25.tsx`) — voir la section 6
 * de /confidentialite. A remplacé Matomo auto-hébergé le 2026-09-17 ; la
 * politique de confidentialité (FR et EN) a été réécrite en conséquence, les
 * données de navigation partant désormais chez Google.
 *
 * Écoute le consentement plutôt que de ne le lire qu'au montage : si le
 * visiteur clique « Accepter » après le premier rendu, le suivi démarre tout
 * de suite, sans recharger la page.
 *
 * Pas de `page_view` manuel sur les navigations `next/link` : la mesure
 * améliorée de GA4 (« Modifications de page basées sur les événements
 * d'historique du navigateur », active par défaut sur la propriété) écoute
 * déjà `pushState`, et un appel explicite en plus compterait chaque page
 * deux fois. Si cette option est un jour désactivée dans l'administration
 * GA4, c'est ici qu'il faudra réintroduire un `gtag("event", "page_view")`
 * sur changement de `usePathname()`.
 */
export function GoogleAnalytics() {
  const [actif, setActif] = useState(false);

  useEffect(() => {
    // rAF plutôt qu'un appel synchrone : même garde que `PopupLoi25`, pour ne
    // pas déclencher de re-rendu en cascade directement dans l'effet.
    const id = globalThis.requestAnimationFrame(() =>
      setActif(aAccepteLesTemoinsNonEssentiels()),
    );
    const desabonner = surChangementConsentement(() =>
      setActif(aAccepteLesTemoinsNonEssentiels()),
    );
    return () => {
      globalThis.cancelAnimationFrame(id);
      desabonner();
    };
  }, []);

  if (!actif) return null;

  // Deux scripts, dans l'ordre du snippet officiel : le chargeur externe,
  // puis l'amorce inline qui déclare `dataLayer` et configure la propriété.
  // `afterInteractive` pour les deux — la mesure n'a rien à faire avant
  // l'hydratation. Le domaine des témoins reste en `auto` (défaut de gtag) :
  // il retombe sur `cloudos.ca`, donc apex et www comptent comme un seul site.
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ID_MESURE}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag("js", new Date());
          gtag("config", "${ID_MESURE}");
        `}
      </Script>
    </>
  );
}
