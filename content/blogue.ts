import type { Bilingue, Lang } from "@/components/marketing/tokens";

/**
 * Libellés du blogue, dans les deux langues.
 *
 * Objets `{ fr, en }` et non deux fichiers comme pour /pme : ici les deux
 * versions disent bien la même chose — ce sont des libellés d'interface, pas
 * de l'argumentaire. Le contenu lui-même (les articles) vient de
 * BabyLoveGrowth, déjà dans sa langue.
 */
const LIBELLES = {
  eyebrow: { fr: "Blogue", en: "Blog" },
  titre: {
    fr: "Le blogue Cloud OS",
    en: "The Cloud OS blog",
  },
  soustitre: {
    fr: "Guides, retours d'expérience et nouvelles du poste de travail en ligne hébergé au Québec.",
    en: "Guides, field notes, and news from the online workstation hosted in Québec.",
  },
  /** `<title>` et description de l'index — lus par les moteurs. */
  titreSeo: {
    fr: "Blogue — Cloud OS",
    en: "Blog — Cloud OS",
  },
  descriptionSeo: {
    fr: "Articles et guides sur le travail en ligne, le calcul lourd en langage humain et l'hébergement au Québec.",
    en: "Articles and guides on online work, plain-language heavy compute, and hosting in Québec.",
  },
  aucunArticle: {
    fr: "Aucun article pour l'instant — revenez bientôt.",
    en: "No articles yet — check back soon.",
  },
  tousLesArticles: { fr: "Tous les articles", en: "All articles" },
  lireLaSuite: { fr: "Lire l'article", en: "Read the article" },
  minutesDeLecture: { fr: "min de lecture", en: "min read" },
  pagePrecedente: { fr: "Page précédente", en: "Previous page" },
  pageSuivante: { fr: "Page suivante", en: "Next page" },
  /** « Page 2 sur 5 » — `{page}` et `{pages}` sont remplacés. */
  pageSur: { fr: "Page {page} sur {pages}", en: "Page {page} of {pages}" },
  pagination: { fr: "Pagination du blogue", en: "Blog pagination" },
  accueil: { fr: "Accueil", en: "Home" },
  publieLe: { fr: "Publié le", en: "Published on" },
  misAJourLe: { fr: "Mis à jour le", en: "Updated on" },
} as const satisfies Record<string, Bilingue>;

export type CleLibelleBlogue = keyof typeof LIBELLES;

/** Un libellé du blogue dans la langue affichée. */
export function libelleBlogue(cle: CleLibelleBlogue, lang: Lang): string {
  return LIBELLES[cle][lang];
}
