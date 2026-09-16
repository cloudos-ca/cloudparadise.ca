import { EST_PRODUCTION, SITE_URL } from "@/lib/site";

/**
 * Balises hreflang rendues à la main, dans le corps de la page (Next les
 * remonte vers `<head>`).
 *
 * Rien du tout hors production, pour la même raison que le canonical (voir
 * `alternatesBilingues`) : `rel="alternate"` est de la même famille que
 * `rel="canonical"`, et une préproduction qui déclare « la version française
 * de cette page est sur cloudos.ca » revendique les URL de production
 * depuis un site qu'on demande par ailleurs de ne pas explorer. Un jeu de
 * hreflang non réciproque — la production ne renvoie évidemment pas vers le
 * dev — est de toute façon ignoré par Google, donc on ne perd rien à le taire.
 *
 * On utilise la prop React standard `hrefLang` (camelCase), et **le HTML servi
 * porte bien `hrefLang` en camelCase** — vérifié en production le 2026-07-30
 * sur `/pme`. Un commentaire antérieur affirmait ici que react-dom rendait
 * l'attribut en minuscules : c'est faux, il ne le fait pas.
 *
 * Et ça n'a aucune importance. Les noms d'attributs HTML sont insensibles à la
 * casse : le tokeniseur du parseur les met en minuscules avant même que le
 * document existe. `hrefLang="fr"` dans une page HTML *est* l'attribut
 * `hreflang`, pour Google comme pour n'importe quel autre client. Il n'y a donc
 * rien à corriger dans la sortie.
 *
 * **Ne pas « réparer » ceci.** Une version antérieure forçait la clé `hreflang`
 * en minuscules via un cast : même résultat une fois la page parsée, mais
 * l'avertissement dev « Invalid DOM property `hreflang` » (le « 1 Issue » de
 * l'overlay Next) à chaque rendu. La prop standard est le bon choix.
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
  if (!EST_PRODUCTION) return null;

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
