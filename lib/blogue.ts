import {
  BlogClient,
  type BlogArticle,
  type BlogArticleSummary,
} from "babylovegrowth-next-js-blog";
import type { Lang } from "@/components/marketing/tokens";

/**
 * Le blogue — lecture des articles publiés sur BabyLoveGrowth.
 *
 * Les articles sont rédigés là-bas et lus ici, côté serveur uniquement, par
 * le client officiel (`babylovegrowth-next-js-blog`, sans dépendance). Ce
 * module est le seul à le manipuler : les pages (`/blogue`, `/en/blog`)
 * n'importent que les fonctions ci-dessous.
 *
 * ## La clé se lit à l'exécution, jamais au build
 *
 * `BABYLOVEGROWTH_BLOG_API_KEY` est un secret. Le Dockerfile et `proxy.ts`
 * posent déjà la règle : un secret n'a rien à faire dans une « Build
 * Variable » Coolify (il finirait dans l'historique de l'image et dans le
 * journal de déploiement). Les routes du blogue sont donc rendues **à la
 * demande** (`dynamic = "force-dynamic"` dans chaque page) et non
 * pré-générées : la clé n'est lue qu'à la requête. Les réponses de l'API,
 * elles, sont mises en cache par `fetch` (`next.revalidate`, voir
 * `REVALIDATION`), donc l'API n'est pas appelée à chaque visite.
 *
 * ## Sans clé, un blogue vide — pas une page d'erreur
 *
 * Le client lève une exception si la clé manque, et `fetch` en lève une si
 * l'API ne répond pas. Dans les deux cas la page affiche « aucun article »
 * plutôt qu'une 500 : un blogue vide sur un site qui marche vaut mieux qu'un
 * site qui semble cassé parce qu'un service tiers a le hoquet. L'erreur est
 * écrite au journal du serveur, une fois par requête, pour qu'on la voie.
 *
 * ## Une langue par section
 *
 * Chaque article porte un `languageCode` (`fr`, `en`, parfois régionalisé :
 * `fr-CA`). `/blogue` n'affiche que les articles français, `/en/blog` que les
 * anglais — et un slug français demandé sous `/en/blog` est un 404, pas une
 * page anglaise qui parle français. Il n'y a pas de paire FR/EN par article
 * (chaque texte est écrit dans une langue, pas traduit), donc pas de
 * `hreflang` entre articles : seuls les index `/blogue` ↔ `/en/blog` sont
 * jumelés (voir `PAGES`, lib/site.ts).
 */

/** Chemin de l'index du blogue, par langue. Le miroir de `PAGES` — les deux doivent coïncider. */
export const CHEMIN_BLOGUE: Readonly<Record<Lang, string>> = {
  fr: "/blogue",
  en: "/en/blog",
};

/** Articles par page d'index. */
export const TAILLE_PAGE = 12;

/**
 * Durée de cache des réponses de l'API, en secondes.
 *
 * Un jour en production : publier sur BabyLoveGrowth vide leur cache à eux,
 * pas le nôtre — un article neuf peut mettre jusqu'à 24 h à paraître ici, ou
 * paraît dès le prochain déploiement. Dix secondes en développement, pour
 * voir ce qu'on fait.
 */
const REVALIDATION = process.env.NODE_ENV === "development" ? 10 : 86400;

/**
 * Client partagé, créé au premier usage et non à l'import : le constructeur
 * lit la clé dans l'environnement, et un import au build (par exemple depuis
 * un test, ou un module évalué à la génération) ne doit pas en dépendre.
 */
let client: BlogClient | undefined;
function clientBlogue(): BlogClient {
  client ??= new BlogClient({
    apiKey: process.env.BABYLOVEGROWTH_BLOG_API_KEY,
    baseUrl: process.env.BABYLOVEGROWTH_BLOG_API_URL,
    revalidate: REVALIDATION,
  });
  return client;
}

/** Vrai si `languageCode` désigne `lang`, variante régionale comprise (`fr-CA` est du français). */
export function estDansLangue(languageCode: string, lang: Lang): boolean {
  const code = languageCode.toLowerCase();
  return code === lang || code.startsWith(`${lang}-`);
}

/** Les articles publiés dans une langue, dans l'ordre de l'API (du plus récent au plus ancien). */
export function articlesVisibles(
  articles: readonly BlogArticleSummary[],
  lang: Lang,
): BlogArticleSummary[] {
  return articles.filter(
    (a) => a.published && estDansLangue(a.languageCode, lang),
  );
}

/** Numéro de page depuis `?page=` : un entier strictement positif, sinon 1. */
export function lirePage(valeur: string | undefined): number {
  if (!valeur || !/^\d+$/.test(valeur)) return 1;
  const n = Number.parseInt(valeur, 10);
  return n >= 1 ? n : 1;
}

export type Pagination<T> = {
  elements: T[];
  /** Page effectivement affichée — ramenée à la dernière si demandée au-delà. */
  page: number;
  /** Nombre total de pages, jamais inférieur à 1. */
  pages: number;
};

/** Découpe une liste en pages. Une page hors bornes affiche la dernière plutôt qu'une page vide. */
export function paginer<T>(
  elements: readonly T[],
  pageDemandee: number,
  taille: number,
): Pagination<T> {
  const pages = Math.max(1, Math.ceil(elements.length / taille));
  const page = Math.min(Math.max(1, pageDemandee), pages);
  const debut = (page - 1) * taille;
  return { elements: elements.slice(debut, debut + taille), page, pages };
}

/**
 * Journalise une panne de lecture sans la propager : voir l'en-tête, « Sans
 * clé, un blogue vide ».
 */
function signaler(contexte: string, erreur: unknown): void {
  const message = erreur instanceof Error ? erreur.message : String(erreur);
  console.error(`[blogue] ${contexte} : ${message}`);
}

/** Tous les articles publiés dans une langue, ou `[]` si l'API est injoignable ou la clé absente. */
export async function articlesParLangue(
  lang: Lang,
): Promise<BlogArticleSummary[]> {
  try {
    const tous = await clientBlogue().getAllArticles({ publishedOnly: true });
    return articlesVisibles(tous, lang);
  } catch (erreur) {
    signaler("liste des articles", erreur);
    return [];
  }
}

/**
 * Un article par slug, s'il est publié **et** dans la langue de la section ;
 * `null` sinon — la page en fait un 404.
 */
export async function articleParSlug(
  slug: string,
  lang: Lang,
): Promise<BlogArticle | null> {
  try {
    const article = await clientBlogue().getArticleBySlug(slug);
    if (!article?.published || !estDansLangue(article.languageCode, lang)) {
      return null;
    }
    return article;
  } catch (erreur) {
    signaler(`article « ${slug} »`, erreur);
    return null;
  }
}

/** Slugs et dates des articles publiés, par langue, pour le sitemap du blogue. */
export async function entreesSitemap(
  lang: Lang,
): Promise<{ slug: string; updated_at: string }[]> {
  try {
    const entrees = await clientBlogue().getSitemapEntries();
    return entrees.filter((e) => estDansLangue(e.languageCode, lang));
  } catch (erreur) {
    signaler("sitemap", erreur);
    return [];
  }
}
