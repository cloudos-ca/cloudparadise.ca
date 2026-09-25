import Link from "next/link";
import type { Lang } from "@/components/marketing/tokens";
import { LIBELLES_FORFAITS, libelleApplications } from "@/content/applications/libelles";
import type { FicheApplication } from "@/content/applications/types";
import { cheminFiche } from "@/lib/applications";

/**
 * Une application dans l'index du catalogue.
 *
 * Même construction que `CarteArticle` : le lien du titre s'étend à toute la
 * carte (`after:inset-0`), un seul lien par carte pour le clavier et les
 * lecteurs d'écran. Une fiche sans capture affiche la carte sans image.
 */
export function CarteApplication({
  fiche,
  lang,
}: Readonly<{ fiche: FicheApplication; lang: Lang }>) {
  const capture = fiche.captures[0];
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] transition hover:border-white/20 hover:bg-white/[0.07]">
      {capture ? (
        // eslint-disable-next-line @next/next/no-img-element -- captures légères, déjà en webp
        <img
          src={capture.src}
          alt=""
          width={capture.largeur}
          height={capture.hauteur}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover object-top"
        />
      ) : null}
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <h3 className="font-display text-lg leading-snug font-extrabold tracking-tight text-white">
          <Link
            href={cheminFiche(fiche, lang)}
            className="rounded-sm outline-offset-4 after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-white"
          >
            {fiche.nom[lang]}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-white/80">{fiche.accroche[lang]}</p>
        <p className="mt-auto pt-1 text-xs font-medium text-cp-muted">
          {LIBELLES_FORFAITS[fiche.forfait][lang]}
        </p>
        <span aria-hidden="true" className="text-sm font-semibold" style={{ color: "var(--cta)" }}>
          {libelleApplications("voirLaFiche", lang)} →
        </span>
      </div>
    </article>
  );
}
