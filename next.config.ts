import type { NextConfig } from "next";

/**
 * Sans nonce, volontairement : un nonce exigerait un rendu dynamique sur
 * tout le site (voir le guide CSP de Next — un nonce ne peut être injecté
 * qu'à la requête, donc plus de pages statiques), ce qui contredirait le
 * choix déjà fait pour corriger `lang` (voir RootDocument.tsx). Conséquence
 * acceptée : `'unsafe-inline'` reste nécessaire dans `script-src`, non pas à
 * cause de notre code, mais parce que Next.js lui-même injecte des dizaines
 * de blocs `<script>` inline par page pour l'hydratation React (vérifié
 * empiriquement — une seule page en contient plus de 20, générés par le
 * framework, impossibles à figer par hash puisqu'ils diffèrent par page et
 * par build). Le résidu de risque est faible ici : aucun point du site
 * n'injecte de HTML à partir d'une entrée utilisateur (voir l'audit
 * sécurité) — sans point d'injection, `'unsafe-inline'` n'a rien à exploiter.
 * `style-src` a besoin d'`'unsafe-inline'` pour la même raison structurelle :
 * la recoloration du thème (`--acc`, `--soft`, `--sky`) repose sur des
 * attributs `style=""` en ligne dans de nombreux composants.
 *
 * Domaines externes autorisés : reCAPTCHA v3 (google.com, gstatic.com,
 * contact uniquement) et Matomo auto-hébergé (matomo.cloudparadise.cloud).
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com https://matomo.cloudparadise.cloud",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://matomo.cloudparadise.cloud https://www.google.com https://www.gstatic.com",
  "frame-src https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  output: "standalone",

  experimental: {
    // Le site a deux layouts racines (FR et EN, voir RootDocument.tsx) : sans
    // ce flag, Next n'a pas de layout unique où composer une 404 globale pour
    // les chemins qui ne correspondent à aucune route (ni FR ni /en).
    globalNotFound: true,
  },

  /**
   * `www.cloudparadise.ca` répondait 200 sans redirection, en servant le même
   * contenu que `cloudparadise.ca` (le host canonique partout ailleurs :
   * `SITE_URL` dans lib/seo.ts, sitemap, hreflang). Un crawler qui visite les
   * deux hosts voit donc deux pages dupliquées par URL — et sur le host
   * `www`, aucune balise hreflang ne s'auto-référence puisqu'elles pointent
   * toutes vers `cloudparadise.ca` : c'est ce qui faisait échouer le check
   * « self-referencing hreflang » d'un audit SEO malgré des balises par
   * ailleurs correctes. Redirection permanente vers le host canonique plutôt
   * que de dupliquer `SITE_URL` par host.
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.cloudparadise.ca" }],
        destination: "https://cloudparadise.ca/:path*",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "Content-Security-Policy", value: CSP },
        ],
      },
    ];
  },
};

export default nextConfig;
