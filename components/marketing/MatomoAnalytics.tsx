"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  aAccepteLesTemoinsNonEssentiels,
  surChangementConsentement,
} from "./consentement";

declare global {
  interface Window {
    _paq?: unknown[][];
  }
}

/**
 * Matomo, chargé seulement après un « Accepter » explicite dans la bannière
 * Loi 25 (`PopupLoi25.tsx`) — voir la section 6 de /confidentialite.
 * Auto-hébergé sur matomo.cloudparadise.cloud : aucune donnée de navigation
 * ne part chez un tiers.
 *
 * Écoute le consentement plutôt que de ne le lire qu'au montage : si le
 * visiteur clique « Accepter » après le premier rendu, le suivi démarre tout
 * de suite, sans recharger la page.
 */
export function MatomoAnalytics() {
  const [actif, setActif] = useState(false);
  const pathname = usePathname();
  const cheminAuDemarrage = useRef<string | null>(null);

  useEffect(() => {
    // rAF plutôt qu'un appel synchrone : même garde que `PopupLoi25`, pour ne
    // pas déclencher de re-rendu en cascade directement dans l'effet.
    const id = window.requestAnimationFrame(() =>
      setActif(aAccepteLesTemoinsNonEssentiels()),
    );
    const desabonner = surChangementConsentement(() =>
      setActif(aAccepteLesTemoinsNonEssentiels()),
    );
    return () => {
      window.cancelAnimationFrame(id);
      desabonner();
    };
  }, []);

  /*
   * Le script Matomo suit déjà lui-même la page où il démarre (son propre
   * `trackPageView` à l'initialisation) ; seules les navigations *suivantes*
   * ont besoin d'un appel explicite — la barre de menu navigue par endroits
   * via `next/link`, donc un changement de route ne recharge pas toujours la
   * page et ne relance donc pas le script.
   */
  useEffect(() => {
    if (!actif) return;
    if (cheminAuDemarrage.current === null) {
      cheminAuDemarrage.current = pathname;
      return;
    }
    if (pathname === cheminAuDemarrage.current) return;
    // Une commande par `push`, jamais groupées en un seul appel : c'est le
    // contrat de Matomo, dont le proxy ne lit qu'un tableau à la fois et
    // ignorerait silencieusement les suivants. La boucle réunit les trois
    // appels sans rien changer à ce qui part sur le réseau.
    const commandes = [
      ["setCustomUrl", window.location.href],
      ["setDocumentTitle", document.title],
      ["trackPageView"],
    ];
    for (const commande of commandes) window._paq?.push(commande);
  }, [pathname, actif]);

  if (!actif) return null;

  return (
    <Script id="matomo-analytics" strategy="afterInteractive">
      {`
        var _paq = window._paq = window._paq || [];
        _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
        _paq.push(["setCookieDomain", ".cloudparadise.ca"]);
        _paq.push(["trackPageView"]);
        _paq.push(["enableLinkTracking"]);
        (function() {
          var u = "https://matomo.cloudparadise.cloud/";
          _paq.push(["setTrackerUrl", u + "matomo.php"]);
          _paq.push(["setSiteId", "1"]);
          var d = document, g = d.createElement("script"), s = d.getElementsByTagName("script")[0];
          g.async = true; g.src = u + "matomo.js";
          s.parentNode.insertBefore(g, s);
        })();
      `}
    </Script>
  );
}
