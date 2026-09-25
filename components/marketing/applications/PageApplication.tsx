import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";
import { HreflangLinks } from "@/components/marketing/HreflangLinks";
import { ArticleJsonLd } from "@/components/marketing/blogue/ArticleJsonLd";
import { LECTURE, SECTION_Y, SHELL, type Lang } from "@/components/marketing/tokens";
import { LIBELLES_FORFAITS, LIBELLES_GROUPES, libelleApplications } from "@/content/applications/libelles";
import type { FicheApplication } from "@/content/applications/types";
import { CHEMIN_CATALOGUE, articlesDe, cheminFiche, jsonLdFiche, voisinesDe } from "@/lib/applications";
import { SITE_URL } from "@/lib/site";
import { CarteApplication } from "./CarteApplication";
import { CtaApplications } from "./CtaApplications";

/**
 * Une fiche — le corps commun de `/applications/[slug]` et `/en/apps/[slug]`.
 *
 * Tout le texte vient des données de la fiche, rendu en JSX : aucun HTML
 * injecté, à la différence des articles du blogue.
 *
 * Aucun lien vers l'application (voir `CtaApplications`) ; le seul lien qui
 * sort du site est celui du site officiel d'un logiciel tiers, avec la mention
 * qu'on n'est ni affilié ni approuvé.
 */
export function PageApplication({
  fiche,
  lang,
}: Readonly<{ fiche: FicheApplication; lang: Lang }>) {
  const chemin = cheminFiche(fiche, lang);
  const voisines = voisinesDe(fiche);
  const articles = articlesDe(fiche, lang);

  return (
    <>
      <section className="relative" data-page-sobre>
        <HreflangLinks fr={cheminFiche(fiche, "fr")} en={cheminFiche(fiche, "en")} />
        {jsonLdFiche(fiche, lang, `${SITE_URL}${chemin}`).map((data, i) => (
          <ArticleJsonLd key={i} data={data} />
        ))}
        <BreadcrumbJsonLd
          items={[
            { nom: libelleApplications("accueil", lang), chemin: lang === "en" ? "/en" : "/" },
            { nom: libelleApplications("eyebrow", lang), chemin: CHEMIN_CATALOGUE[lang] },
            { nom: fiche.nom[lang], chemin },
          ]}
        />
        <div className={`${SHELL} ${SECTION_Y}`}>
          <article className={`${LECTURE} mx-auto`}>
            <Link
              href={CHEMIN_CATALOGUE[lang]}
              className="text-sm font-semibold transition hover:underline focus-visible:outline-2 focus-visible:outline-white"
              style={{ color: "var(--cta)" }}
            >
              ← {libelleApplications("toutesLesApplications", lang)}
            </Link>

            <header className="mt-6">
              <p
                className="text-[13px] font-semibold tracking-[0.12em] uppercase"
                style={{ color: "var(--cta)" }}
              >
                {LIBELLES_GROUPES[fiche.groupe][lang]}
              </p>
              <h1 className="mt-2 font-display text-[1.7rem] leading-[1.2] font-extrabold tracking-tight text-balance text-cp-heading sm:text-3xl os:text-4xl">
                {fiche.titre[lang]}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-white/85">{fiche.accroche[lang]}</p>
              <p className="mt-4 inline-block rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white/85">
                {LIBELLES_FORFAITS[fiche.forfait][lang]}
              </p>
            </header>

            {fiche.captures.map((capture) => (
              // eslint-disable-next-line @next/next/no-img-element -- captures locales déjà en webp
              <img
                key={capture.src}
                src={capture.src}
                alt={capture.alt[lang]}
                width={capture.largeur}
                height={capture.hauteur}
                decoding="async"
                className="mt-8 w-full rounded-xl border border-white/10"
              />
            ))}

            <div className="mt-10 space-y-10">
              {fiche.corps[lang].map((section) => (
                <section key={section.titre}>
                  <h2 className="font-display text-xl font-extrabold tracking-tight text-cp-heading">
                    {section.titre}
                  </h2>
                  {section.paragraphes.map((p) => (
                    <p key={p} className="mt-4 text-[15px] leading-relaxed text-white/85">
                      {p}
                    </p>
                  ))}
                  {section.points ? (
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-white/85">
                      {section.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            {fiche.tiers ? (
              <aside className="mt-10 rounded-xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-relaxed text-white/80">
                <p>
                  {libelleApplications("editeur", lang)} : {fiche.tiers.editeur} ·{" "}
                  {libelleApplications("licence", lang)} : {fiche.tiers.licence} ·{" "}
                  <a
                    href={fiche.tiers.site}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="underline hover:text-white"
                  >
                    {libelleApplications("siteOfficiel", lang)}
                  </a>
                </p>
                <p className="mt-2 text-xs text-cp-muted">{libelleApplications("mentionTiers", lang)}</p>
              </aside>
            ) : null}

            {fiche.faq[lang].length > 0 ? (
              <section className="mt-12">
                <h2 className="font-display text-xl font-extrabold tracking-tight text-cp-heading">
                  {libelleApplications("questions", lang)}
                </h2>
                <dl className="mt-4 space-y-5">
                  {fiche.faq[lang].map((qr) => (
                    <div key={qr.question}>
                      <dt className="text-[15px] font-semibold text-white">{qr.question}</dt>
                      <dd className="mt-1.5 text-[15px] leading-relaxed text-white/85">{qr.reponse}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}

            {articles.length > 0 ? (
              <section className="mt-12">
                <h2 className="font-display text-xl font-extrabold tracking-tight text-cp-heading">
                  {libelleApplications("articles", lang)}
                </h2>
                <ul className="mt-4 space-y-2 text-[15px]">
                  {articles.map((a) => (
                    <li key={a.chemin}>
                      <Link href={a.chemin} className="underline hover:text-white" style={{ color: "var(--cta)" }}>
                        {a.titre}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </article>

          {voisines.length > 0 ? (
            <section className="mt-14">
              <h2 className="font-display text-xl font-extrabold tracking-tight text-cp-heading">
                {libelleApplications("voisines", lang)}
              </h2>
              <ul className="mt-5 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
                {voisines.map((v) => (
                  <li key={v.id} className="min-w-0">
                    <CarteApplication fiche={v} lang={lang} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </section>
      <CtaApplications lang={lang} />
    </>
  );
}
