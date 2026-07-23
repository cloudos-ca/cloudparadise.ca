import type { JSX } from "react";
import { SITE_URL } from "@/lib/seo";

/**
 * Balises hreflang rendues à la main.
 *
 * Contourne un bug du renderer React 19 bundlé avec cette version de Next :
 * `metadata.alternates.languages` produit un attribut `hrefLang` (casse
 * camelCase) au lieu de `hreflang`, faute d'alias pour cette prop dans
 * `react-dom-server`. Un `<link>` dont l'attribut est littéralement en
 * minuscules passe par le même mécanisme de hoisting vers `<head>` que les
 * balises générées par Next, sans passer par la prop cassée — donc sans le
 * bug. Les types de `link` n'exposent que `hrefLang` (camelCase) : l'objet
 * est donc construit hors JSX puis étalé, pour poser la vraie clé `hreflang`
 * au moment du rendu plutôt que celle que TypeScript propose.
 *
 * `x-default` pointe vers la version FR : c'est la langue par défaut du site.
 */
function attributsLien(hreflang: string, href: string) {
  return { rel: "alternate", hreflang, href } as unknown as JSX.IntrinsicElements["link"];
}

export function HreflangLinks({ fr, en }: { fr: string; en: string }) {
  return (
    <>
      <link {...attributsLien("fr", `${SITE_URL}${fr}`)} />
      <link {...attributsLien("en", `${SITE_URL}${en}`)} />
      <link {...attributsLien("x-default", `${SITE_URL}${fr}`)} />
    </>
  );
}
