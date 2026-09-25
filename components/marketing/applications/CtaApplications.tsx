import { FenetreCta } from "@/components/marketing/FenetreCta";
import { Reveal } from "@/components/marketing/Reveal";
import { SECTION_Y, SHELL, type Lang } from "@/components/marketing/tokens";
import { libelleApplications } from "@/content/applications/libelles";

/**
 * Le closer du catalogue.
 *
 * **Aucun lien vers l'application** (décision du plan) : le catalogue informe
 * et vend, il ne fait pas entrer dans l'app. Le bouton mène aux tarifs, le lien
 * secondaire au contact — les deux restent sur la vitrine. C'est la différence
 * avec `CtaFinal`, dont le bouton crée un compte.
 */
export function CtaApplications({ lang }: Readonly<{ lang: Lang }>) {
  return (
    <section className="relative overflow-x-clip">
      <div className={`${SHELL} ${SECTION_Y}`}>
        <Reveal>
          <FenetreCta
            lang={lang}
            soustitre={<>{libelleApplications("cta", lang)}</>}
            bouton={{
              href: lang === "en" ? "/en/pricing" : "/tarifs",
              libelle: libelleApplications("voirLesTarifs", lang),
            }}
            lien={{
              href: lang === "en" ? "/en/contact" : "/contact",
              libelle: libelleApplications("nousJoindre", lang),
            }}
          />
        </Reveal>
      </div>
    </section>
  );
}
