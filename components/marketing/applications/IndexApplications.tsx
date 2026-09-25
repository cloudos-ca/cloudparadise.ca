import { AncresSections, type Ancre } from "@/components/marketing/AncresSections";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";
import { HreflangLinks } from "@/components/marketing/HreflangLinks";
import { PageEntete } from "@/components/marketing/PageEntete";
import { SECTION_Y, SHELL, type Lang } from "@/components/marketing/tokens";
import { LIBELLES_GROUPES, libelleApplications } from "@/content/applications/libelles";
import { CHEMIN_CATALOGUE, fichesParGroupe } from "@/lib/applications";
import { CarteApplication } from "./CarteApplication";
import { CtaApplications } from "./CtaApplications";

/**
 * L'index du catalogue — le corps commun de `/applications` et `/en/apps`.
 *
 * Toutes les fiches sur une seule page, rangées par groupe, avec une barre
 * d'ancres vers chaque groupe. Le plan prévoyait un filtre `?groupe=` ; une
 * page à ancres le remplace : lire les paramètres de la requête rendrait la
 * page dynamique, alors qu'elle se génère au build comme le reste du site, et
 * un seul document qui liste toutes les fiches est aussi ce qui sert le mieux
 * leur indexation.
 */

/** Les ancres sont calculées au chargement du module : `AncresSections` attend une référence stable. */
const ANCRES: Readonly<Record<Lang, readonly Ancre[]>> = {
  fr: fichesParGroupe("fr").map(({ groupe }) => ({ id: groupe, libelle: LIBELLES_GROUPES[groupe] })),
  en: fichesParGroupe("en").map(({ groupe }) => ({ id: groupe, libelle: LIBELLES_GROUPES[groupe] })),
};

export function IndexApplications({ lang }: Readonly<{ lang: Lang }>) {
  const groupes = fichesParGroupe(lang);
  return (
    <>
      <section className="relative" data-page-sobre>
        <HreflangLinks fr={CHEMIN_CATALOGUE.fr} en={CHEMIN_CATALOGUE.en} />
        <BreadcrumbJsonLd
          items={[
            { nom: libelleApplications("accueil", lang), chemin: lang === "en" ? "/en" : "/" },
            { nom: libelleApplications("eyebrow", lang), chemin: CHEMIN_CATALOGUE[lang] },
          ]}
        />
        <div className={`${SHELL} ${SECTION_Y}`}>
          <PageEntete
            eyebrow={libelleApplications("eyebrow", lang)}
            titre={libelleApplications("titre", lang)}
            soustitre={libelleApplications("soustitre", lang)}
          />
        </div>
        {groupes.length > 1 ? <AncresSections ancres={ANCRES[lang]} lang={lang} /> : null}
        <div className={`${SHELL} ${SECTION_Y}`}>
          {groupes.map(({ groupe, fiches }) => (
            <section key={groupe} id={groupe} className="scroll-mt-24 pb-10">
              <h2 className="font-display text-xl font-extrabold tracking-tight text-cp-heading">
                {LIBELLES_GROUPES[groupe][lang]}
              </h2>
              <ul className="mt-5 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
                {fiches.map((fiche) => (
                  <li key={fiche.id} className="min-w-0">
                    <CarteApplication fiche={fiche} lang={lang} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
      <CtaApplications lang={lang} />
    </>
  );
}
