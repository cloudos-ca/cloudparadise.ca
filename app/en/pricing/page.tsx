import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  AncresSections,
  type Ancre,
} from "@/components/marketing/AncresSections";
import { BadgeOffre } from "@/components/marketing/BadgeOffre";
import { BandeauConfiance } from "@/components/marketing/BandeauConfiance";
import { BoutonCta } from "@/components/marketing/BoutonCta";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";
import { CartesForfaits } from "@/components/marketing/CartesForfaits";
import { FaqTarifs } from "@/components/marketing/FaqTarifs";
import { questionsDe } from "@/components/marketing/faqTarifsContenu";
import { FenetreCta } from "@/components/marketing/FenetreCta";
import { HreflangLinks } from "@/components/marketing/HreflangLinks";
import { OffreJsonLd } from "@/components/marketing/OffreJsonLd";
import { Reveal } from "@/components/marketing/Reveal";
import {
  IconCheck,
  IconGift,
  IconLock,
} from "@/components/marketing/icons";
import {
  DUREES,
  ESSAI_JOURS,
  GARANTIE_DUREE_MIN,
  GARANTIE_JOURS,
  GRILLE,
  PALIERS,
  enDevise,
  prixDuree,
} from "@/components/marketing/offre";
import { SECTION_Y, SHELL } from "@/components/marketing/tokens";
import { alternatesBilingues, openGraphPage } from "@/lib/seo";
import { lienInscription } from "@/lib/site";

/** Remise maximale, dérivée de `DUREES` : jamais réécrite en toutes lettres,
 * pour ne pas s'en écarter le jour où une durée change. */
const REMISE_MAX = Math.max(...DUREES.map((d) => d.remisePct));

const TITRE = "Pricing: two all-inclusive plans — Cloud OS";
const DESCRIPTION = `Personal at ${enDevise(PALIERS[0].prixMensuel)}/mo, Business at ${enDevise(PALIERS[1].prixMensuel)}/mo: two all-inclusive plans, a ${ESSAI_JOURS}-day free trial, and a discount of up to ${REMISE_MAX}% on longer commitments.`;

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: alternatesBilingues("/tarifs", "/en/pricing", "en"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "en", "/en/pricing"),
};

/**
 * FAQPage en JSON-LD, à partir des mêmes Q/R que l'accordéon affiché plus
 * bas : une seule source de texte, pas de copie qui pourrait diverger.
 */
const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: questionsDe("en").map(({ q, r }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: r },
  })),
};

const ANCRES: readonly Ancre[] = [
  { id: "forfaits", libelle: { fr: "Les forfaits", en: "The plans" } },
  { id: "durees", libelle: { fr: "Durées et remises", en: "Terms and discounts" } },
  { id: "moteurs", libelle: { fr: "Les moteurs", en: "The engines" } },
  { id: "garanties", libelle: { fr: "Essai et garantie", en: "Trial and guarantee" } },
  { id: "questions", libelle: { fr: "Questions", en: "Questions" } },
];

/**
 * Ce qu'un forfait garantit, au-delà du prix — l'essai, la garantie et
 * l'absence de supplément par moteur. Trois cartes plutôt qu'un paragraphe :
 * ce sont trois engagements distincts, pas une seule idée déclinée.
 */
const GARANTIES = [
  {
    Icone: IconGift,
    titre: `${ESSAI_JOURS}-day free trial`,
    texte: "No credit card. Try it, then decide.",
  },
  {
    Icone: IconLock,
    titre: "Satisfaction guaranteed",
    texte: `${GARANTIE_JOURS} days, on commitments of at least ${GARANTIE_DUREE_MIN} months.`,
  },
  {
    Icone: IconCheck,
    titre: "Everything included, no add-ons",
    texte: "Every engine is in the plan. No paid engine on the side.",
  },
] as const;

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <OffreJsonLd lang="en" />
      <HreflangLinks fr="/tarifs" en="/en/pricing" />
      <BreadcrumbJsonLd
        items={[
          { nom: "Home", chemin: "/en" },
          { nom: "Pricing", chemin: "/en/pricing" },
        ]}
      />

      {/* Héros — texte seul, aligné à gauche comme /mines et /securite. */}
      <section className="relative">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-4xl">
            <SurTitre>Pricing</SurTitre>
            <h1 className="mt-2 font-display text-[1.7rem] leading-[1.12] font-extrabold tracking-[-0.02em] text-white sm:text-[2.3rem] os:text-[2.7rem]">
              One subscription.
              <br />
              Everything included.
            </h1>
            <div className="mt-5">
              <BandeauConfiance lang="en" />
            </div>
            <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-white/85">
              Two monthly plans, sized to your team. Commit for longer for a
              discount of up to {REMISE_MAX}%. {ESSAI_JOURS} days free trial to start,
              no card required.
            </p>
            <div className="mt-7">
              <BoutonCta href={lienInscription("pricing-hero")} taille="lg">
                Start for free
              </BoutonCta>
            </div>
            <div className="mt-5">
              <BadgeOffre lang="en" />
            </div>
          </Reveal>
        </div>
      </section>

      <AncresSections ancres={ANCRES} lang="en" />

      {/* 1 — Les forfaits. Le sélecteur de durée et les deux cartes, seul
          rendu de prix de la page : `CartesForfaits` est la source unique. */}
      <section id="forfaits" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-2xl">
            <SurTitre>The plans</SurTitre>
            <TitreSection>A fixed amount, every month.</TitreSection>
            <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-white/85">
              The amount doesn’t depend on how much you process: it’s the
              size of your team that decides which plan to pick.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <CartesForfaits lang="en" />
          </Reveal>
        </div>
      </section>

      {/* 2 — Durées et remises. Un tableau, les cinq durées de `offre.ts`. */}
      <section id="durees" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-2xl">
            <SurTitre>Terms and discounts</SurTitre>
            <TitreSection>Longer term, lower price.</TitreSection>
            <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-white/85">
              The displayed price never changes on renewal: the discount is
              fixed at signature, for the whole term you choose.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 overflow-x-auto rounded-lg border border-white/10">
            <table className="w-full min-w-[28rem] text-left text-[14px]">
              <thead>
                <tr className="border-b border-white/15">
                  <th className="px-4 py-2.5 font-semibold text-white">Term</th>
                  <th className="px-4 py-2.5 font-semibold text-white">Discount</th>
                  {PALIERS.map((p) => (
                    <th key={p.id} className="px-4 py-2.5 font-semibold text-white">
                      {p.nom.en}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DUREES.map((duree) => (
                  <tr key={duree.mois} className="border-b border-white/10 text-white/85 last:border-0">
                    <td className="px-4 py-2.5">
                      {duree.mois} {duree.mois === 1 ? "month" : "months"}
                    </td>
                    <td className="px-4 py-2.5 tabular-nums">
                      {duree.remisePct === 0 ? "—" : `${duree.remisePct}%`}
                    </td>
                    {PALIERS.map((p) => (
                      <td key={p.id} className="px-4 py-2.5 tabular-nums whitespace-nowrap">
                        {enDevise(prixDuree(p, duree.mois).mensuel)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* 3 — Les moteurs. Ce que chaque forfait inclut, sans prix : la grille
          ne porte plus aucun montant depuis la bascule. */}
      <section id="moteurs" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-2xl">
            <SurTitre>The engines</SurTitre>
            <TitreSection>Every engine, in the plan.</TitreSection>
            <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-white/85">
              No engine on the side: switch between them with no billing
              surprise.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-2.5">
            {GRILLE.map(({ type, libelle }) => (
              <span
                key={type}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-cp-heading"
              >
                {libelle.en}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 4 — Essai et garantie. Trois engagements, en cartes. */}
      <section id="garanties" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-2xl">
            <SurTitre>Trial and guarantee</SurTitre>
            <TitreSection>Try it risk-free.</TitreSection>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 grid gap-3.5 os:grid-cols-3">
            {GARANTIES.map(({ Icone, titre, texte }) => (
              <div
                key={titre}
                className="flex gap-4 rounded-xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors hover:border-white/15"
              >
                <span
                  className="grid size-10 shrink-0 place-items-center rounded-lg"
                  style={{
                    background: "color-mix(in srgb, var(--soft) 12%, transparent)",
                    color: "var(--soft)",
                  }}
                >
                  <Icone className="size-[21px]" />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-[15px] font-extrabold text-white">
                    {titre}
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-white/85">
                    {texte}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 5 — Les questions. En-tête à gauche, accordéon à droite : du texte
          suivi, donc deux colonnes plutôt que la pleine largeur. */}
      <section id="questions" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <div className="grid gap-8 os:grid-cols-[2fr_3fr] os:items-start os:gap-12">
            <Reveal>
              <SurTitre>Questions</SurTitre>
              <TitreSection>Before you start.</TitreSection>
            </Reveal>
            <Reveal delay={0.1}>
              <FaqTarifs lang="en" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Closer. Pas de badge d'offre : le héros l'a déjà annoncée. */}
      <section className="relative overflow-x-clip">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal>
            <FenetreCta
              badge={false}
              lang="en"
              soustitre="Create your account and launch your first task today."
              bouton={{
                href: lienInscription("pricing-closer"),
                libelle: "Start for free",
              }}
              lien={{
                href: "/en/contact",
                libelle: "Questions? Contact us",
              }}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}

/** Sur-titre or, style système. */
function SurTitre({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <p
      className="text-[13px] font-semibold uppercase tracking-[0.12em]"
      style={{ color: "var(--cta)" }}
    >
      {children}
    </p>
  );
}

/** Titre de section, style système, collé au sur-titre. */
function TitreSection({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <h2 className="mt-2 font-display text-[1.6rem] leading-[1.2] font-extrabold tracking-tight text-balance text-cp-heading sm:text-3xl os:text-4xl">
      {children}
    </h2>
  );
}
