import type { MetadataRoute } from "next";
import { EST_PRODUCTION, PAGES, urlSite } from "@/lib/site";

/**
 * Sitemap XML.
 *
 * La liste des pages vit dans `lib/site.ts` : `llms.txt` la consomme aussi, et
 * deux listes tenues à la main finissent par diverger — c'était déjà le cas,
 * la section anglaise de `llms.txt` n'en comptait que six sur dix.
 *
 * **Vide hors production.** Le `Disallow: /` du robots.txt n'annonçait plus le
 * sitemap, mais l'URL restait devinable et servait vingt adresses de
 * production depuis le dev : de quoi soumettre par erreur, depuis la
 * préproduction, un plan du site qui parle du vrai site. Un sitemap vide est
 * un fichier valide, et il ne dit rien plutôt que de dire faux.
 *
 * **Pas de `lastModified`, volontairement.** Le champ valait `new Date()`,
 * c'est-à-dire l'heure du build : chaque déploiement annonçait les vingt-deux
 * pages comme modifiées, y compris les pages légales qui affichent en toutes
 * lettres leur date de mise à jour et un numéro de version figés. Un `lastmod`
 * qui bouge partout à chaque déploiement n'apprend rien à un moteur — Google
 * ne s'en sert que s'il le juge fiable, et cesse d'y prêter attention sinon,
 * ce qui coûte la confiance accordée au reste du fichier.
 *
 * Le champ est facultatif dans la spécification sitemap. On applique donc ici
 * la même règle qu'au canonical hors production (voir `alternatesBilingues`) :
 * rien vaut mieux qu'une mauvaise consigne.
 *
 * Le jour où une date réelle existera par page, sa place est dans `PAGES`
 * (`lib/site.ts`), à côté du reste — et elle devra venir de la même constante
 * que celle affichée par la page, jamais d'une seconde saisie à la main.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!EST_PRODUCTION) return [];

  return PAGES.flatMap(({ fr, en, priority, changeFrequency }) => {
    const languages = { fr: urlSite(fr), en: urlSite(en) };
    return [
      {
        url: urlSite(fr),
        changeFrequency,
        priority,
        alternates: { languages },
      },
      {
        url: urlSite(en),
        changeFrequency,
        priority,
        alternates: { languages },
      },
    ];
  });
}
