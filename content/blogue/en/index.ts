import type { BlogArticle } from "babylovegrowth-next-js-blog";
import migratingToTheCloud from "./migrating-to-the-cloud.json";

/**
 * Les articles du blogue traduits en anglais — un fichier JSON par article,
 * et la liste ci-dessous qui les enregistre.
 *
 * ## Pourquoi des traductions dans le dépôt
 *
 * BabyLoveGrowth rédige les articles en français ; la version anglaise est un
 * supplément payant chez eux. On traduit donc nous-mêmes, à la main (dans une
 * session Claude Code, gratuite dans l'abonnement), et le résultat vit ici :
 * relu avant d'être publié, versionné, et servi sans dépendance de plus à
 * l'exécution — ni clé d'API, ni service de traduction.
 *
 * Importés statiquement, et non lus par `fs` à la requête : le site est
 * livré en `output: "standalone"` (next.config.ts), et un dossier lu à
 * l'exécution devrait être déclaré au traçage de fichiers. Un import est
 * empaqueté avec le reste, sans réglage.
 *
 * ## Ajouter une traduction
 *
 * 1. `npm run blogue:a-traduire` liste ce qui manque ou a changé côté FR ;
 *    `npm run blogue:a-traduire -- <slug-fr>` sort l'article à traduire.
 * 2. Écrire `content/blogue/en/<slug-en>.json` (voir la forme
 *    `ArticleTraduit`) — le slug anglais est libre, en anglais comme le reste
 *    des routes `/en/*`.
 * 3. L'importer et l'ajouter à `TRADUCTIONS` ci-dessous.
 *
 * ## Ce que le fichier contient
 *
 * Les champs que `lib/blogue.ts` sert tels quels pour un article de l'API,
 * traduits — sauf `id`, `hero_image_url` et les dates, recopiés de la source
 * (l'image est la même, et la date de publication est celle du texte
 * d'origine). `source` retient le slug français et sa date de modification :
 * c'est ce qui permet au script de repérer un article FR retouché depuis sa
 * traduction, et à `lib/blogue.ts` de jumeler les deux versions (hreflang).
 *
 * Le HTML du corps commence par le `<h1>` puis l'image de tête, comme celui
 * de l'API : `corpsSansEntete` les retire à l'affichage.
 */
export type ArticleTraduit = Pick<
  BlogArticle,
  | "id"
  | "title"
  | "slug"
  | "hero_image_url"
  | "meta_description"
  | "excerpt"
  | "created_at"
  | "updated_at"
  | "keywords"
  | "content_html"
  | "jsonLd"
  | "faqJsonLd"
> & {
  source: { slug: string; updated_at: string };
};

export const TRADUCTIONS: readonly ArticleTraduit[] = [migratingToTheCloud];
