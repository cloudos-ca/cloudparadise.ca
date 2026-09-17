import Link from "next/link";
import { libelleBlogue } from "@/content/blogue";
import { CHEMIN_BLOGUE } from "@/lib/blogue";
import type { Lang } from "@/components/marketing/tokens";

/**
 * Précédent / suivant sous l'index. La page 1 est l'index nu, sans `?page=1` :
 * une seule URL par page, donc un seul canonical à indexer.
 */
export function PaginationBlogue({
  page,
  pages,
  lang,
}: Readonly<{ page: number; pages: number; lang: Lang }>) {
  if (pages <= 1) return null;

  const base = CHEMIN_BLOGUE[lang];
  const hrefPage = (n: number) => (n <= 1 ? base : `${base}?page=${n}`);
  const classeLien =
    "rounded-md border border-white/15 px-3 py-1.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-white";

  return (
    <nav
      aria-label={libelleBlogue("pagination", lang)}
      className="mt-12 flex items-center justify-between gap-4"
    >
      {page > 1 ? (
        <Link href={hrefPage(page - 1)} className={classeLien}>
          ← {libelleBlogue("pagePrecedente", lang)}
        </Link>
      ) : (
        <span />
      )}
      <span className="text-sm text-cp-muted">
        {libelleBlogue("pageSur", lang)
          .replace("{page}", String(page))
          .replace("{pages}", String(pages))}
      </span>
      {page < pages ? (
        <Link href={hrefPage(page + 1)} className={classeLien}>
          {libelleBlogue("pageSuivante", lang)} →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
