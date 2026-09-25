import {
  BlogClient,
  type BlogArticle,
  type BlogArticleSummary,
} from "babylovegrowth-next-js-blog";
import type { Lang } from "@/components/marketing/tokens";
import { type ArticleTraduit, TRADUCTIONS } from "@/content/blogue/en";

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
 * Sauf pour une page d'**article** (voir `articleParSlug`) : une panne y
 * répond 500, pas 404 — un 404 ferait désindexer un article qui existe.
 *
 * ## Une langue par section
 *
 * Chaque article porte un `languageCode` (`fr`, `en`, parfois régionalisé :
 * `fr-CA`). `/blogue` n'affiche que les articles français, `/en/blog` que les
 * anglais — et un slug français demandé sous `/en/blog` est un 404, pas une
 * page anglaise qui parle français.
 *
 * ## Les traductions du dépôt
 *
 * BabyLoveGrowth n'écrit qu'en français (l'anglais est un supplément payant).
 * La section anglaise sert donc, en plus des articles `en` que l'API pourrait
 * un jour renvoyer, les traductions maintenues dans `content/blogue/en/` (voir
 * l'en-tête de son `index.ts`). Un article de l'API et une traduction de même
 * slug : la traduction gagne — un slug ne peut pas mener à deux pages, et la
 * traduction se lit sans réseau, donc un slug traduit ne coûte aucun appel à
 * l'API (ni son erreur au journal quand elle ne le connaît pas). Les slugs
 * anglais sont choisis ici, une collision serait de notre fait. Chaque traduction connaît son article source, ce qui jumelle
 * les deux versions : `jumeaux` donne le pendant d'un article dans
 * l'autre langue, et les pages en font des `hreflang`. Un article sans
 * pendant n'en déclare aucun.
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

/** Nouvelles tentatives après un 429, au plus. */
const REPRISES_MAX = 4;
/** Plafond d'une attente, en millisecondes, quoi que dise `Retry-After`. */
const ATTENTE_MAX_MS = 5000;

/**
 * `fetch`, repris quand l'API répond 429.
 *
 * L'API n'accepte que deux requêtes par fenêtre (`ratelimit-limit: 2`) et
 * répond 429 avec `Retry-After: 1` au-delà (relevé le 2026-09-25) ; une
 * seconde plus tard, la même requête passe. Après un déploiement, cache de
 * `fetch` vide, un robot qui parcourt le blogue déclenche des rafales : sans
 * reprise, la moitié des articles répondait 500 le temps que le cache se
 * remplisse. On attend donc ce que demande l'API (plafonné), plus un
 * décalage aléatoire pour que les reprises simultanées ne retombent pas
 * ensemble, jusqu'à `REPRISES_MAX` fois ; au pire quelques secondes, puis
 * le 429 remonte (et la page d'article répond 500, voir `articleParSlug`).
 *
 * `fetch` est lu à l'appel, pas capturé : c'est celui que Next a enrichi
 * (cache, `next.revalidate`). Next mémoïse aussi, le temps d'un rendu, les
 * `GET` identiques : une reprise nue recevrait le même 429, sans jamais
 * repartir sur le réseau. Chaque reprise porte donc son propre `signal`, ce
 * qui la sort de la mémoïsation (docs Next, `fetch`, « Memoization ») sans
 * changer sa clé de cache — un succès est gardé pour les visites suivantes.
 * `attendre` et `fetchImpl` servent aux tests.
 */
export async function fetchAvecReprise(
  entree: string | URL | Request,
  init?: RequestInit,
  {
    fetchImpl = (e: string | URL | Request, i?: RequestInit) => fetch(e, i),
    attendre = (ms: number) => new Promise<void>((ok) => setTimeout(ok, ms)),
    alea = Math.random,
  }: {
    fetchImpl?: typeof fetch;
    attendre?: (ms: number) => Promise<void>;
    alea?: () => number;
  } = {},
): Promise<Response> {
  for (let reprise = 0; ; reprise++) {
    const reponse = await fetchImpl(
      entree,
      reprise === 0 ? init : { ...init, signal: new AbortController().signal },
    );
    if (reponse.status !== 429 || reprise >= REPRISES_MAX) return reponse;
    const secondes = Number(reponse.headers.get("retry-after"));
    const base = Number.isFinite(secondes) && secondes > 0 ? secondes * 1000 : 1000;
    await attendre(Math.min(base, ATTENTE_MAX_MS) + Math.floor(alea() * 500));
  }
}

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
    fetch: (entree, init) => fetchAvecReprise(entree, init),
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

/**
 * Le corps d'un article, sans le titre ni l'image de tête que la page rend
 * déjà elle-même.
 *
 * BabyLoveGrowth ouvre chaque `content_html` par un `<h1>` (le titre) suivi
 * d'un `<p><img></p>` (l'image `hero_image_url`) — vérifié sur les deux
 * premiers articles, 2026-09-17. La page pose son propre `<h1>` et sa propre
 * image de tête, mis en forme avec le reste du site : gardés dans le corps,
 * les deux apparaîtraient en double, et deux `<h1>` sur une page est aussi
 * une erreur pour les moteurs.
 *
 * On ne retire que ce qui ouvre le document : un `<h1>` en tête, puis un
 * paragraphe qui ne contient que l'image de tête (même `src`). Une première
 * image différente reste — c'est une illustration, pas la vignette. Rien
 * n'est touché plus loin dans le texte.
 */
export function corpsSansEntete(html: string, heroImageUrl: string): string {
  let corps = html.replace(/^\s*<h1\b[^>]*>[\s\S]*?<\/h1>\s*/i, "");
  if (heroImageUrl) {
    const src = heroImageUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    corps = corps.replace(
      new RegExp(`^\\s*<p\\b[^>]*>\\s*<img\\b[^>]*\\bsrc="${src}"[^>]*>\\s*<\\/p>\\s*`, "i"),
      "",
    );
  }
  return corps;
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
 * Une traduction du dépôt, dans la forme d'un article de l'API : c'est ce que
 * les composants attendent, et ils n'ont pas à savoir d'où vient le texte.
 */
export function enArticle(traduction: ArticleTraduit): BlogArticle {
  return {
    id: traduction.id,
    title: traduction.title,
    slug: traduction.slug,
    hero_image_url: traduction.hero_image_url,
    meta_description: traduction.meta_description,
    excerpt: traduction.excerpt,
    created_at: traduction.created_at,
    updated_at: traduction.updated_at,
    keywords: traduction.keywords,
    content_html: traduction.content_html,
    jsonLd: traduction.jsonLd,
    faqJsonLd: traduction.faqJsonLd,
    languageCode: "en",
    published: true,
    orgWebsite: "",
    seedKeyword: null,
    content_markdown: "",
  };
}

/**
 * Les articles anglais de l'API complétés des traductions, du plus récent au
 * plus ancien. À slug égal, la traduction gagne (voir l'en-tête).
 */
export function avecTraductions(
  api: readonly BlogArticleSummary[],
  traductions: readonly ArticleTraduit[] = TRADUCTIONS,
): BlogArticleSummary[] {
  const slugsTraduits = new Set(traductions.map((t) => t.slug));
  const apiSansDoublon = api.filter((a) => !slugsTraduits.has(a.slug));
  return [...apiSansDoublon, ...traductions.map(enArticle)].sort(
    (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at),
  );
}

/** Chemins d'un article et de son pendant dans l'autre langue. */
export type Jumeaux = Readonly<Record<Lang, string>>;

/**
 * Le pendant d'un article dans l'autre langue, ou `null` s'il n'en a pas.
 *
 * Seules les traductions du dépôt créent des paires : un article FR est
 * jumelé à la traduction qui le cite en `source`, une traduction à sa source.
 * Un article `en` venu de l'API n'a pas de pendant connu.
 */
export function jumeaux(
  slug: string,
  lang: Lang,
  traductions: readonly ArticleTraduit[] = TRADUCTIONS,
): Jumeaux | null {
  const traduction =
    lang === "fr"
      ? traductions.find((t) => t.source.slug === slug)
      : traductions.find((t) => t.slug === slug);
  if (!traduction) return null;
  return {
    fr: `${CHEMIN_BLOGUE.fr}/${traduction.source.slug}`,
    en: `${CHEMIN_BLOGUE.en}/${traduction.slug}`,
  };
}

/** État d'un article français vis-à-vis de sa traduction, pour le script `blogue:a-traduire`. */
export type EtatTraduction = "traduit" | "absente" | "modifiee";

/**
 * Pour chaque article français, dit si sa traduction existe et est à jour.
 * `modifiee` : l'article FR a été retouché après la traduction (sa
 * `updated_at` n'est plus celle notée dans `source`).
 */
export function etatDesTraductions(
  articlesFr: readonly BlogArticleSummary[],
  traductions: readonly ArticleTraduit[] = TRADUCTIONS,
): { slug: string; etat: EtatTraduction; traduction?: string }[] {
  return articlesFr.map((a) => {
    const t = traductions.find((x) => x.source.slug === a.slug);
    if (!t) return { slug: a.slug, etat: "absente" };
    return {
      slug: a.slug,
      etat: t.source.updated_at === a.updated_at ? "traduit" : "modifiee",
      traduction: t.slug,
    };
  });
}

/**
 * Journalise une panne de lecture : voir l'en-tête, « Sans clé, un blogue
 * vide ».
 */
function signaler(contexte: string, erreur: unknown): void {
  const message = erreur instanceof Error ? erreur.message : String(erreur);
  console.error(`[blogue] ${contexte} : ${message}`);
}

/** Tous les articles publiés dans une langue, ou `[]` si l'API est injoignable ou la clé absente. */
export async function articlesParLangue(
  lang: Lang,
): Promise<BlogArticleSummary[]> {
  let api: BlogArticleSummary[] = [];
  try {
    const tous = await clientBlogue().getAllArticles({ publishedOnly: true });
    api = articlesVisibles(tous, lang);
  } catch (erreur) {
    signaler("liste des articles", erreur);
  }
  return lang === "en" ? avecTraductions(api) : api;
}

/**
 * Un article par slug, s'il est publié **et** dans la langue de la section ;
 * `null` sinon — la page en fait un 404. En anglais, une traduction du dépôt
 * répond d'abord, sans passer par l'API.
 *
 * API en panne (429, 5xx, réseau) : l'erreur remonte et la page répond 500.
 * Surtout pas `null` : un 404 dit aux moteurs que l'article n'existe plus,
 * une 5xx qu'il faut repasser. L'API limite sévèrement le débit (429 dès la
 * troisième requête d'une rafale, relevé le 2026-09-25) : après chaque
 * déploiement, cache de `fetch` vide, un robot qui parcourait le blogue
 * voyait des articles existants répondre 404. Seule l'absence de clé reste
 * un 404 — sans clé, le blogue est vide.
 */
export async function articleParSlug(
  slug: string,
  lang: Lang,
): Promise<BlogArticle | null> {
  if (lang === "en") {
    const traduction = TRADUCTIONS.find((t) => t.slug === slug);
    if (traduction) return enArticle(traduction);
  }
  if (!process.env.BABYLOVEGROWTH_BLOG_API_KEY) return null;
  let article: BlogArticle | null;
  try {
    article = await clientBlogue().getArticleBySlug(slug);
  } catch (erreur) {
    signaler(`article « ${slug} »`, erreur);
    throw erreur;
  }
  if (!article?.published || !estDansLangue(article.languageCode, lang)) {
    return null;
  }
  return article;
}

/** Slugs et dates des articles publiés, par langue, pour le sitemap du blogue. */
export async function entreesSitemap(
  lang: Lang,
): Promise<{ slug: string; updated_at: string }[]> {
  let api: { slug: string; updated_at: string }[] = [];
  try {
    const entrees = await clientBlogue().getSitemapEntries();
    api = entrees.filter((e) => estDansLangue(e.languageCode, lang));
  } catch (erreur) {
    signaler("sitemap", erreur);
  }
  if (lang !== "en") return api;
  const slugsTraduits = new Set(TRADUCTIONS.map((t) => t.slug));
  return [
    ...api.filter((e) => !slugsTraduits.has(e.slug)),
    ...TRADUCTIONS.map((t) => ({ slug: t.slug, updated_at: t.updated_at })),
  ];
}
