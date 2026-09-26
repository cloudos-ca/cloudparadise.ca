import type { Lang } from "@/components/marketing/tokens";
import { FICHES } from "@/content/applications";
import { GROUPES, type FicheApplication, type GroupeId } from "@/content/applications/types";
import { CHEMIN_BLOGUE } from "@/lib/blogue";
import { TRADUCTIONS } from "@/content/blogue/en";

/**
 * Le catalogue des applications — lecture des fiches de `content/applications/`.
 *
 * Tout est dans le dépôt : les pages sont générées au build
 * (`generateStaticParams`), sans API ni clé à l'exécution, à l'inverse du
 * blogue. Les pages (`/applications`, `/en/apps`) n'importent que les
 * fonctions ci-dessous.
 */

/** Chemin de l'index du catalogue, par langue. */
export const CHEMIN_CATALOGUE: Readonly<Record<Lang, string>> = {
  fr: "/applications",
  en: "/en/apps",
};

/** Le chemin d'une fiche dans une langue. */
export function cheminFiche(fiche: FicheApplication, lang: Lang): string {
  return `${CHEMIN_CATALOGUE[lang]}/${fiche.slug[lang]}`;
}

export function ficheParSlug(
  slug: string,
  lang: Lang,
  fiches: readonly FicheApplication[] = FICHES,
): FicheApplication | null {
  return fiches.find((f) => f.slug[lang] === slug) ?? null;
}

export function ficheParId(
  id: string,
  fiches: readonly FicheApplication[] = FICHES,
): FicheApplication | null {
  return fiches.find((f) => f.id === id) ?? null;
}

/** Les fiches regroupées pour l'index : les groupes dans l'ordre de `GROUPES`, les vides omis, les fiches par nom. */
export function fichesParGroupe(
  lang: Lang,
  fiches: readonly FicheApplication[] = FICHES,
): { groupe: GroupeId; fiches: FicheApplication[] }[] {
  return GROUPES.map((groupe) => ({
    groupe,
    fiches: fiches
      .filter((f) => f.groupe === groupe)
      .sort((a, b) => a.nom[lang].localeCompare(b.nom[lang], lang)),
  })).filter((g) => g.fiches.length > 0);
}

/** Les fiches voisines d'une fiche, dans l'ordre où elle les cite. Une clé inconnue est ignorée (le test la signale). */
export function voisinesDe(fiche: FicheApplication): FicheApplication[] {
  return fiche.voisines.flatMap((id) => {
    const v = ficheParId(id);
    return v ? [v] : [];
  });
}

/**
 * Les articles du blogue liés à une fiche, en liens prêts à rendre.
 *
 * En anglais, seulement ceux qui ont une traduction dans le dépôt : un article
 * resté en français ne se propose pas à un lecteur anglais.
 */
export function articlesDe(fiche: FicheApplication, lang: Lang): { chemin: string; titre: string }[] {
  return fiche.articles.flatMap(({ slug, titre }) => {
    if (lang === "fr") return [{ chemin: `${CHEMIN_BLOGUE.fr}/${slug}`, titre }];
    const traduction = TRADUCTIONS.find((t) => t.source.slug === slug);
    return traduction ? [{ chemin: `${CHEMIN_BLOGUE.en}/${traduction.slug}`, titre: traduction.title }] : [];
  });
}

/**
 * Le maillage dans l'autre sens : les fiches qui citent un article du blogue,
 * affichées sous l'article (`PageArticle`).
 *
 * Les fiches citent les articles par leur slug FR. Un slug anglais est d'abord
 * ramené à celui de l'article français qu'il traduit ; un article anglais sans
 * source dans le dépôt n'est cité par aucune fiche.
 */
export function fichesDeLArticle(
  slug: string,
  lang: Lang,
  fiches: readonly FicheApplication[] = FICHES,
): FicheApplication[] {
  const slugFr = lang === "fr" ? slug : TRADUCTIONS.find((t) => t.slug === slug)?.source.slug;
  if (!slugFr) return [];
  return fiches.filter((f) => f.articles.some((a) => a.slug === slugFr));
}

/**
 * Le JSON-LD d'une fiche : sa FAQ (`FAQPage`), et ce dont parle la page.
 *
 * Une app du produit se déclare `SoftwareApplication` éditée par Cloud OS. Un
 * logiciel tiers, non : la page n'est pas celle de GIMP et Cloud OS ne le vend
 * pas — elle se déclare `WebPage` à propos du logiciel, avec son vrai éditeur,
 * et sans `offers`.
 */
export function jsonLdFiche(fiche: FicheApplication, lang: Lang, url: string): Record<string, unknown>[] {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: fiche.faq[lang].map((qr) => ({
      "@type": "Question",
      name: qr.question,
      acceptedAnswer: { "@type": "Answer", text: qr.reponse },
    })),
  };
  const sujet = fiche.tiers
    ? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url,
        name: fiche.seo.titre[lang],
        inLanguage: lang === "en" ? "en-CA" : "fr-CA",
        about: {
          "@type": "SoftwareApplication",
          name: fiche.nom[lang],
          url: fiche.tiers.site,
          author: { "@type": "Organization", name: fiche.tiers.editeur },
          license: fiche.tiers.licence,
        },
      }
    : {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: fiche.nom[lang],
        url,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: fiche.accroche[lang],
        inLanguage: lang === "en" ? "en-CA" : "fr-CA",
        publisher: { "@type": "Organization", name: "Cloud OS" },
      };
  return fiche.faq[lang].length > 0 ? [sujet, faq] : [sujet];
}

/**
 * Une fiche telle que la lit la Logithèque du produit (`GET /api/applications`) : le texte de la page,
 * sans ce qui ne sert qu'à vendre ou à référencer — ni FAQ, ni titre SEO, ni mots-clés, ni articles.
 *
 * Les voisines sont traduites en ids du produit (la première app de chaque fiche citée) : la Logithèque
 * les ouvre par ces ids, elle ne connaît pas les clés de fiche. Les captures gardent leur chemin
 * relatif (`/applications/…`) : le produit les résout contre l'origine d'où il a lu la fiche.
 */
export type FicheProduit = Pick<FicheApplication, "id" | "apps" | "nom" | "accroche" | "tiers" | "corps" | "captures"> & {
  voisines: string[];
};

export function fichesPourLeProduit(fiches: readonly FicheApplication[] = FICHES): FicheProduit[] {
  return fiches.map((f) => ({
    id: f.id,
    apps: f.apps,
    nom: f.nom,
    accroche: f.accroche,
    ...(f.tiers ? { tiers: f.tiers } : {}),
    corps: f.corps,
    captures: f.captures,
    voisines: voisinesDe(f).flatMap((v) => (v.apps[0] ? [v.apps[0]] : [])),
  }));
}
