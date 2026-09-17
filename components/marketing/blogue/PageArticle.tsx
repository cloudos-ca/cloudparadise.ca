import type { BlogArticle } from "babylovegrowth-next-js-blog";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";
import { LECTURE, SECTION_Y, SHELL, type Lang } from "@/components/marketing/tokens";
import { libelleBlogue } from "@/content/blogue";
import { CHEMIN_BLOGUE, corpsSansEntete } from "@/lib/blogue";
import { ArticleJsonLd } from "./ArticleJsonLd";
import { formaterDate } from "./dates";

/**
 * Un article — le corps commun de `/blogue/[slug]` et `/en/blog/[slug]`.
 *
 * Le HTML de l'article est injecté tel quel (`dangerouslySetInnerHTML`). C'est
 * le premier endroit du site qui injecte du HTML, et le commentaire de la CSP
 * (next.config.ts) en tient compte : la source est notre propre compte
 * BabyLoveGrowth, lu côté serveur avec une clé privée — pas une entrée
 * utilisateur. Le jour où ce HTML viendrait d'ailleurs, il faudrait le
 * nettoyer avant de l'injecter.
 *
 * Pas de `HreflangLinks` : un article est écrit dans une langue, il n'a pas de
 * jumeau dans l'autre (voir l'en-tête de `lib/blogue.ts`).
 */
export function PageArticle({
  article,
  lang,
}: Readonly<{ article: BlogArticle; lang: Lang }>) {
  const index = CHEMIN_BLOGUE[lang];
  const publie = formaterDate(article.created_at, lang);
  const misAJour =
    article.updated_at && article.updated_at !== article.created_at
      ? formaterDate(article.updated_at, lang)
      : "";

  return (
    <section className="relative" data-page-sobre>
      <ArticleJsonLd data={article.jsonLd} />
      <ArticleJsonLd data={article.faqJsonLd} />
      <BreadcrumbJsonLd
        items={[
          { nom: libelleBlogue("accueil", lang), chemin: lang === "en" ? "/en" : "/" },
          { nom: libelleBlogue("eyebrow", lang), chemin: index },
          { nom: article.title, chemin: `${index}/${article.slug}` },
        ]}
      />
      <div className={`${SHELL} ${SECTION_Y}`}>
        <article className={`${LECTURE} mx-auto`}>
          <Link
            href={index}
            className="text-sm font-semibold transition hover:underline focus-visible:outline-2 focus-visible:outline-white"
            style={{ color: "var(--cta)" }}
          >
            ← {libelleBlogue("tousLesArticles", lang)}
          </Link>

          <header className="mt-6">
            <h1 className="font-display text-[1.7rem] leading-[1.2] font-extrabold tracking-tight text-balance text-cp-heading sm:text-3xl os:text-4xl">
              {article.title}
            </h1>
            <p className="mt-4 text-sm text-cp-muted">
              {publie ? (
                <>
                  {libelleBlogue("publieLe", lang)}{" "}
                  <time dateTime={article.created_at}>{publie}</time>
                </>
              ) : null}
              {misAJour ? (
                <>
                  {" · "}
                  {libelleBlogue("misAJourLe", lang)}{" "}
                  <time dateTime={article.updated_at}>{misAJour}</time>
                </>
              ) : null}
            </p>
          </header>

          {/* `<img>` voulu — pas `next/image` sur un host tiers, voir CarteArticle.tsx. */}
          {article.hero_image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.hero_image_url}
              alt=""
              decoding="async"
              className="mt-8 aspect-[16/9] w-full rounded-xl border border-white/10 object-cover"
            />
          ) : null}

          <div
            className="prose-blogue mt-10"
            dangerouslySetInnerHTML={{
              __html: corpsSansEntete(article.content_html, article.hero_image_url),
            }}
          />
        </article>
      </div>
    </section>
  );
}
