import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  AncresSections,
  type Ancre,
} from "@/components/marketing/AncresSections";
import { BadgeOffre } from "@/components/marketing/BadgeOffre";
import { BoutonCta } from "@/components/marketing/BoutonCta";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";
import { Estimateur } from "@/components/marketing/Estimateur";
import { FaqTarifs } from "@/components/marketing/FaqTarifs";
import { questionsDe } from "@/components/marketing/faqTarifsContenu";
import { FenetreCta } from "@/components/marketing/FenetreCta";
import { GrilleDetaillee } from "@/components/marketing/GrilleDetaillee";
import { HreflangLinks } from "@/components/marketing/HreflangLinks";
import { Reveal } from "@/components/marketing/Reveal";
import { WindowCard } from "@/components/marketing/WindowCard";
import {
  IconRefresh,
  IconSearch,
  IconWindow,
} from "@/components/marketing/icons";
import {
  OFFRE_EN_DEVISE,
  coutDe,
  libelleDe,
  type TypeTache,
} from "@/components/marketing/offre";
import { SECTION_Y, SHELL } from "@/components/marketing/tokens";
import { alternatesBilingues, openGraphPage } from "@/lib/seo";

const TITRE = "Tarifs — Cloud Paradise";
const DESCRIPTION = `Des crédits, pas d’abonnement. ${OFFRE_EN_DEVISE} de crédits offerts à l’inscription, et le coût de chaque tâche lancée.`;

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: alternatesBilingues("/tarifs", "/en/tarifs", "fr"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "fr"),
};

/**
 * FAQPage en JSON-LD, à partir des mêmes Q/R que l'accordéon affiché plus
 * bas : une seule source de texte, pas de copie qui pourrait diverger.
 */
const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: questionsDe("fr").map(({ q, r }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: r },
  })),
};

const ANCRES: readonly Ancre[] = [
  { id: "grille", libelle: { fr: "La grille", en: "The grid" } },
  { id: "estimateur", libelle: { fr: "L’estimateur", en: "The estimator" } },
  { id: "facturation", libelle: { fr: "Ce qui est facturé", en: "What’s billed" } },
  { id: "questions", libelle: { fr: "Questions", en: "Questions" } },
];

/** Deux décimales toujours : les coûts sont des fractions de crédit. */
const nfCredit = new Intl.NumberFormat("fr-CA", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Le flux d'exemple : trois traitements enchaînés, donc trois tâches.
 *
 * Seuls les identifiants sont écrits ici — libellés et montants viennent de
 * `offre.ts`, et le total est calculé. Un tarif qui change met donc la
 * démonstration à jour tout seul, au lieu de la laisser mentir.
 */
const FLUX: readonly TypeTache[] = ["Scraping", "Données", "Documents"];

function fluxChiffre() {
  const etapes = FLUX.flatMap((type) => {
    const cout = coutDe(type);
    // Un type sans tarif arrêté sortirait un total faux : il est écarté, et le
    // décompte de tâches suit ce qui reste réellement chiffrable.
    return cout === null ? [] : [{ type, libelle: libelleDe(type, "fr"), cout }];
  });
  const total = Math.round(etapes.reduce((s, e) => s + e.cout, 0) * 100) / 100;
  return { etapes, total };
}

/**
 * Ce qui est facturé — les quatre points qu'un client découvrait jusqu'ici en
 * cours de route. Icônes en cyan : ce sont des repères de lecture, pas des
 * piliers ; l'or reste aux montants.
 */
const FACTURATION = [
  {
    Icone: IconWindow,
    titre: "Tout le produit",
    texte:
      "Le coût s’applique à l’ensemble des fonctionnalités, pas seulement aux tâches lourdes.",
  },
  {
    Icone: IconRefresh,
    titre: "Chaque étape d’un flux",
    texte:
      "Un flux qui enchaîne trois traitements est facturé comme trois tâches distinctes.",
  },
  {
    Icone: IconSearch,
    titre: "Consulter ne coûte rien",
    texte:
      "Ouvrir un fichier, le prévisualiser, naviguer dans vos dossiers : gratuit. Seule la génération débite des crédits.",
  },
] as const;

export default function TarifsPage() {
  const { etapes, total } = fluxChiffre();
  const uniteTotal = total <= 1 ? "crédit" : "crédits";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <HreflangLinks fr="/tarifs" en="/en/tarifs" />
      <BreadcrumbJsonLd
        items={[
          { nom: "Accueil", chemin: "/" },
          { nom: "Tarifs", chemin: "/tarifs" },
        ]}
      />

      {/* Héros — texte seul, aligné à gauche comme /mines et /securite. */}
      <section className="relative">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-4xl">
            <SurTitre>Tarification</SurTitre>
            <h1 className="mt-2 font-display text-[1.7rem] leading-[1.12] font-bold tracking-[-0.02em] text-white sm:text-[2.3rem] os:text-[2.7rem]">
              Payez ce que vous utilisez.
              <br />
              Rien de plus.
            </h1>
            <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-white/85">
              Des crédits, pas d’abonnement. Un crédit vaut un dollar canadien.
              Vous en recevez pour commencer, vous en rachetez quand vous
              voulez.
            </p>
            {/* Bouton puis badge, dans cet ordre — le même que sur l'accueil :
                l'offre confirme l'action, elle ne la précède pas. */}
            <div className="mt-7">
              <BoutonCta
                href="https://app.cloudparadise.cloud/register"
                taille="lg"
              >
                Commencer gratuitement
              </BoutonCta>
            </div>
            <div className="mt-5">
              <BadgeOffre />
            </div>
          </Reveal>
        </div>
      </section>

      <AncresSections ancres={ANCRES} />

      {/* 1 — La grille. En-tête étroit, tableau pleine largeur : quatre
          colonnes de données ont besoin de toute la place. */}
      <section id="grille" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-2xl">
            <SurTitre>La grille</SurTitre>
            <TitreSection>Le coût par tâche lancée.</TitreSection>
            <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-white/85">
              Une petite tâche coûte peu ; un rendu lourd coûte plus. Le montant
              est débité au lancement.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <GrilleDetaillee />
          </Reveal>
        </div>
      </section>

      {/* 2 — L'estimateur, pleine largeur : le curseur gagne à respirer et les
          équivalences se lisent en regard. */}
      <section id="estimateur" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-2xl">
            <SurTitre>L’estimateur</SurTitre>
            <TitreSection>Combien pour votre usage ?</TitreSection>
            <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-white/85">
              Choisissez un montant de crédits : vous voyez tout de suite
              combien de tâches il représente.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            {/* Sans le renvoi « Voir les détails » : il pointerait vers cette
                page-ci, où la grille complète est déjà juste au-dessus. */}
            <Estimateur lienDetails={false} variante="large" />
          </Reveal>
        </div>
      </section>

      {/* 3 — Ce qui est facturé. Les quatre points à gauche, la démonstration
          chiffrée du flux à droite. */}
      <section id="facturation" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-2xl">
            <SurTitre>Ce qui est facturé</SurTitre>
            <TitreSection>Ce qui débite des crédits.</TitreSection>
            <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-white/85">
              Le compte se débite au lancement d’une tâche. Voici ce qui compte
              comme une tâche.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-8 os:grid-cols-[3fr_2fr] os:items-start os:gap-12">
            <Reveal delay={0.1} className="space-y-3.5">
              {FACTURATION.map(({ Icone, titre, texte }) => (
                <div
                  key={titre}
                  className="flex gap-4 rounded-xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors hover:border-white/15"
                >
                  <span
                    className="grid size-10 shrink-0 place-items-center rounded-lg"
                    style={{
                      background:
                        "color-mix(in srgb, var(--soft) 12%, transparent)",
                      color: "var(--soft)",
                    }}
                  >
                    <Icone className="size-[21px]" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-[15px] font-semibold text-white">
                      {titre}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-white/85">
                      {texte}
                    </p>
                  </div>
                </div>
              ))}
            </Reveal>

            {/* La découverte après coup qui coûte un client : trois traitements
                enchaînés, trois débits. Dit une fois en carte, montré une fois
                en chiffres — avec les vrais tarifs. */}
            <Reveal delay={0.1}>
              <WindowCard title="Flux · Cloud Paradise">
                <div className="p-5">
                  <p className="text-xs text-white/60">Exemple de flux</p>
                  <ol className="mt-3.5 space-y-2.5">
                    {etapes.map(({ type, libelle, cout }, i) => (
                      <li key={type} className="flex items-center gap-3">
                        <span
                          className="grid size-7 shrink-0 place-items-center rounded-lg text-[12px] font-semibold"
                          style={{
                            background:
                              "color-mix(in srgb, var(--soft) 14%, transparent)",
                            color: "var(--soft)",
                          }}
                        >
                          {i + 1}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-sm text-white">
                          {libelle}
                        </span>
                        <span
                          className="font-display text-sm font-bold tabular-nums"
                          style={{ color: "var(--cta)" }}
                        >
                          {nfCredit.format(cout)}
                        </span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-white/10 pt-3.5">
                    <span className="text-[13px] text-white/85">
                      {etapes.length} tâches lancées
                    </span>
                    <span
                      className="font-display text-[15px] font-bold tabular-nums"
                      style={{ color: "var(--cta)" }}
                    >
                      {nfCredit.format(total)} {uniteTotal}
                    </span>
                  </div>
                </div>
              </WindowCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4 — Les questions. En-tête à gauche, accordéon à droite : du texte
          suivi, donc deux colonnes plutôt que la pleine largeur. */}
      <section id="questions" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <div className="grid gap-8 os:grid-cols-[2fr_3fr] os:items-start os:gap-12">
            <Reveal>
              <SurTitre>Questions</SurTitre>
              <TitreSection>Avant de commencer.</TitreSection>
            </Reveal>
            <Reveal delay={0.1}>
              <FaqTarifs />
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
              soustitre="Créez votre compte et lancez votre première tâche aujourd’hui."
              bouton={{
                href: "https://app.cloudparadise.cloud/register",
                libelle: "Commencer gratuitement",
              }}
              lien={{
                href: "/contact",
                libelle: "Des questions ? Contactez-nous",
              }}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}

/** Sur-titre or, style système. */
function SurTitre({ children }: { children: ReactNode }) {
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
function TitreSection({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-2 font-display text-[1.6rem] leading-[1.2] font-bold tracking-tight text-balance text-[#eef4ff] sm:text-3xl os:text-4xl">
      {children}
    </h2>
  );
}
