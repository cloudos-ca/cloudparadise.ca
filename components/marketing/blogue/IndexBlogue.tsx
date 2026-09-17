import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";
import { HreflangLinks } from "@/components/marketing/HreflangLinks";
import { PageEntete } from "@/components/marketing/PageEntete";
import { SECTION_Y, SHELL, type Lang } from "@/components/marketing/tokens";
import { libelleBlogue } from "@/content/blogue";
import {
  articlesParLangue,
  CHEMIN_BLOGUE,
  lirePage,
  paginer,
  TAILLE_PAGE,
} from "@/lib/blogue";
import { CarteArticle } from "./CarteArticle";
import { PaginationBlogue } from "./PaginationBlogue";

/**
 * L'index du blogue — le corps commun de `/blogue` et `/en/blog`.
 *
 * Un seul composant paramétré par la langue plutôt que deux pages recopiées
 * (le choix fait pour /pme) : ici les deux versions sont identiques au libellé
 * près, et c'est `lib/blogue.ts` qui trie les articles par langue.
 */
export async function IndexBlogue({
  lang,
  page,
}: Readonly<{ lang: Lang; page: string | undefined }>) {
  const articles = await articlesParLangue(lang);
  const pagination = paginer(articles, lirePage(page), TAILLE_PAGE);

  return (
    <section className="relative" data-page-sobre>
      <HreflangLinks fr={CHEMIN_BLOGUE.fr} en={CHEMIN_BLOGUE.en} />
      <BreadcrumbJsonLd
        items={[
          { nom: libelleBlogue("accueil", lang), chemin: lang === "en" ? "/en" : "/" },
          { nom: libelleBlogue("eyebrow", lang), chemin: CHEMIN_BLOGUE[lang] },
        ]}
      />
      <div className={`${SHELL} ${SECTION_Y}`}>
        <PageEntete
          eyebrow={libelleBlogue("eyebrow", lang)}
          titre={libelleBlogue("titre", lang)}
          soustitre={libelleBlogue("soustitre", lang)}
        />

        {pagination.elements.length === 0 ? (
          <p className="mt-10 text-base text-white/80">
            {libelleBlogue("aucunArticle", lang)}
          </p>
        ) : (
          <ul className="mt-10 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {pagination.elements.map((article) => (
              <li key={article.id} className="min-w-0">
                <CarteArticle article={article} lang={lang} />
              </li>
            ))}
          </ul>
        )}

        <PaginationBlogue
          page={pagination.page}
          pages={pagination.pages}
          lang={lang}
        />
      </div>
    </section>
  );
}
