import { SITE_URL } from "@/lib/seo";

/**
 * Balises hreflang rendues à la main, dans le corps de la page (Next les
 * remonte vers `<head>`).
 *
 * On utilise la prop React standard `hrefLang` (camelCase) : react-dom la sort
 * en attribut minuscule `hreflang`, la forme attendue par les moteurs. Une
 * version antérieure forçait la clé `hreflang` en minuscules via un cast, ce
 * qui produisait bien l'attribut voulu mais déclenchait l'avertissement dev
 * « Invalid DOM property `hreflang` » (le « 1 Issue » de l'overlay Next) à
 * chaque rendu. La prop standard donne le même HTML sans l'avertissement.
 *
 * `x-default` pointe vers la version FR : c'est la langue par défaut du site.
 *
 * `en` est facultatif, et doit être omis tant que la page anglaise n'existe
 * pas : un `hreflang` vers une URL qui répond 404 est signalé en erreur par la
 * Search Console, et une paire cassée fait douter des paires valides déclarées
 * ailleurs. Omis, la page reste correctement déclarée comme française — elle ne
 * ment simplement pas sur l'existence d'un pendant.
 */
export function HreflangLinks({
  fr,
  en,
}: Readonly<{ fr: string; en?: string }>) {
  return (
    <>
      <link rel="alternate" hrefLang="fr" href={`${SITE_URL}${fr}`} />
      {en ? (
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}${en}`} />
      ) : null}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${fr}`} />
    </>
  );
}
