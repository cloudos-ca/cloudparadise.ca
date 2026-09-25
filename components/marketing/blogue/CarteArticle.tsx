import type { BlogArticleSummary } from "babylovegrowth-next-js-blog";
import Link from "next/link";
import { libelleBlogue } from "@/content/blogue";
import { CHEMIN_BLOGUE } from "@/lib/blogue";
import type { Lang } from "@/components/marketing/tokens";
import { formaterDate } from "./dates";

/**
 * Une vignette d'article dans l'index.
 *
 * `<img>` et non `next/image` : les images vivent chez BabyLoveGrowth, et
 * `next/image` exigerait de déclarer leur host dans `remotePatterns` — le
 * starter du paquet propose `hostname: "*"`, ce qui ferait de notre serveur un
 * redimensionneur d'images ouvert à n'importe quelle URL. Un `<img>` avec
 * `loading="lazy"` suffit pour une vignette. Le host doit en revanche être
 * autorisé par la CSP (`img-src`, next.config.ts).
 */
export function CarteArticle({
  article,
  lang,
}: Readonly<{ article: BlogArticleSummary; lang: Lang }>) {
  const href = `${CHEMIN_BLOGUE[lang]}/${article.slug}`;
  const date = formaterDate(article.created_at, lang);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] transition hover:border-white/20 hover:bg-white/[0.07]">
      {article.hero_image_url ? (
        // eslint-disable-next-line @next/next/no-img-element -- voulu, voir l'en-tête
        <img
          src={article.hero_image_url}
          alt=""
          loading="lazy"
          decoding="async"
          className="aspect-[16/9] w-full object-cover"
        />
      ) : null}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {date ? (
          <time
            dateTime={article.created_at}
            className="text-xs font-medium tracking-wide text-cp-muted uppercase"
          >
            {date}
          </time>
        ) : null}
        <h2 className="font-display text-lg leading-snug font-extrabold tracking-tight text-white">
          {/* Le lien du titre s'étend à toute la carte (`after:inset-0`) : image,
              extrait et « Lire l'article » y mènent aussi, sans second lien. */}
          <Link
            href={href}
            className="rounded-sm outline-offset-4 after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-white"
          >
            {article.title}
          </Link>
        </h2>
        {article.excerpt ? (
          <p className="line-clamp-3 text-sm leading-relaxed text-white/80">
            {article.excerpt}
          </p>
        ) : null}
        <span
          aria-hidden="true"
          className="mt-auto pt-1 text-sm font-semibold"
          style={{ color: "var(--cta)" }}
        >
          {libelleBlogue("lireLaSuite", lang)} →
        </span>
      </div>
    </article>
  );
}
