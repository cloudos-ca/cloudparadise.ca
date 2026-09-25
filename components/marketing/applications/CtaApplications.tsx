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
 *
 * Chaque clic envoie l'événement GA4 `cta_catalogue` (la fiche, ou `index`,
 * et la destination) : c'est ce qui mesure ce que le catalogue apporte à la
 * conversion.
 */
export function CtaApplications({ lang, fiche }: Readonly<{ lang: Lang; fiche?: string }>) {
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
            mesure={{ evenement: "cta_catalogue", parametres: { fiche: fiche ?? "index", langue: lang } }}
          />
        </Reveal>
      </div>
    </section>
  );
}
