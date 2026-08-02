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
import { OffreJsonLd } from "@/components/marketing/OffreJsonLd";
import { Reveal } from "@/components/marketing/Reveal";
import { WindowCard } from "@/components/marketing/WindowCard";
import {
  IconAdjustments,
  IconCheck,
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
import { LIEN_INSCRIPTION } from "@/lib/site";

const TITRE = "Pricing and credits, no subscription — Cloud Paradise";
const DESCRIPTION = `Credits, not a subscription. ${OFFRE_EN_DEVISE} in credits on signup, the cost of every task, and an estimator to work out your budget before you start.`;

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
  { id: "grille", libelle: { fr: "La grille", en: "The grid" } },
  { id: "estimateur", libelle: { fr: "L’estimateur", en: "The estimator" } },
  { id: "facturation", libelle: { fr: "Ce qui est facturé", en: "What’s billed" } },
  { id: "questions", libelle: { fr: "Questions", en: "Questions" } },
];

/** Deux décimales toujours : les coûts sont des fractions de crédit. */
const nfCredit = new Intl.NumberFormat("en-CA", {
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
    return cout === null ? [] : [{ type, libelle: libelleDe(type, "en"), cout }];
  });
  const total = Math.round(etapes.reduce((s, e) => s + e.cout, 0) * 100) / 100;
  return { etapes, total };
}

/**
 * Ce qui est facturé — les cinq points qu'un client découvrait jusqu'ici en
 * cours de route. Icônes en cyan : ce sont des repères de lecture, pas des
 * piliers ; l'or reste aux montants.
 *
 * Les deux derniers points sont des garanties, pas des avertissements : le
 * forfait par tâche et l'essai gratuit répondent à la crainte du paiement à
 * l'usage. D'où la coche et les curseurs plutôt qu'une icône d'alerte — traiter
 * le sujet en rouge transformerait un argument en excuse.
 *
 * **Le quatrième point disait l'inverse du produit.** Il annonçait un débit
 * « fichier par fichier » comme règle générale, sous le titre « You only pay
 * for what is processed ». Or la règle est le forfait par tâche : un lot de 200
 * contrats est une tâche à 0,25, et le débit à la pièce n'existe que pour le
 * traitement d'images et le publipostage. Le titre était donc faux avec le
 * corps, et pas seulement à côté : au forfait, on paie au lancement, quel que
 * soit le résultat.
 *
 * Deux clauses en sont sorties — la reprise « with no new credit » après une
 * panne, et la relance « on the same credit, as many times as it takes ».
 * Elles ne sont pas adoucies, elles sont retirées : elles ne peuvent pas être
 * atténuées sans devenir creuses, et elles restent à confirmer contre le code
 * de facturation. Ne pas les réécrire de mémoire.
 *
 * « Dry run » et non « simulation » : la grille, deux sections plus haut,
 * facture un type de tâche nommé « Simulation ». Deux objets sous le même mot
 * sur la même page rendraient les deux incompréhensibles — même raison qui
 * réserve « estimator » au curseur de budget. C'est l'exact pendant du choix
 * fait en français avec « essai à blanc », et il attend la même confirmation
 * contre le mot affiché par l'application.
 */
const FACTURATION = [
  {
    Icone: IconWindow,
    titre: "The whole product",
    texte:
      "The cost applies to every feature, not only to the heavy tasks.",
  },
  {
    Icone: IconRefresh,
    titre: "Every step of a flow",
    texte:
      "A flow that chains three treatments is billed as three separate tasks.",
  },
  {
    Icone: IconSearch,
    titre: "Looking costs nothing",
    texte:
      "Opening a file, previewing it, moving through your folders: free. Only generating draws credits.",
  },
  {
    Icone: IconCheck,
    titre: "One price per task, whatever the volume",
    // « et les 150 résultats sont à vous » n'est pas décoratif : sans cette
    // clause, la phrase dirait qu'on facture un travail que le client ne reçoit
    // pas. Elle reste, mais rattachée aux deux seuls traitements comptés à la
    // pièce — c'est là, et là seulement, qu'un lot peut s'arrêter en cours.
    texte:
      "A batch of 200 contracts costs the price of one task, not 200. Two treatments are the exception and are counted per item: image processing and mail merge. There, only the items produced are charged — if a batch of 200 stops at the 150th, those 150 results are yours, available right away.",
  },
  {
    Icone: IconAdjustments,
    titre: "Try it, see the price, then launch",
    // La dernière phrase est l'engagement le plus fort de la page : aucun cas
    // ne permet à un débit réel de dépasser le montant affiché. Elle ne se
    // dilue pas — pas d'astérisque, pas de « dans la plupart des cas », pas de
    // renvoi aux conditions. Si elle ne peut pas s'écrire telle quelle, c'est
    // qu'elle est fausse.
    //
    // Sa justification a changé, pas sa portée : elle s'appuyait sur un débit
    // « qui suit l'avancement », mécanisme qui n'existe que pour deux moteurs.
    // Le forfait la rend plus simple à tenir — un prix fixé avant le lancement
    // ne peut pas dériver — donc la phrase se garde, avec sa vraie raison.
    texte:
      "The assistant shows you what the task will produce and what it will cost, before anything is charged. The dry run costs nothing: you adjust until it matches, then you launch. If your balance is not enough, we tell you before it starts. The price is set before launch: you will never pay more than the amount shown.",
  },
] as const;

export default function TarifsPageEn() {
  const { etapes, total } = fluxChiffre();
  const uniteTotal = total <= 1 ? "credit" : "credits";

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
            <h1 className="mt-2 font-display text-[1.7rem] leading-[1.12] font-bold tracking-[-0.02em] text-white sm:text-[2.3rem] os:text-[2.7rem]">
              Pay for what you use.
              <br />
              Nothing more.
            </h1>
            <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-white/85">
              Credits, not a subscription. One credit is worth one Canadian
              dollar. You get some to begin with, and you buy more whenever you
              want.
            </p>
            {/* Bouton puis badge, dans cet ordre — le même que sur l'accueil :
                l'offre confirme l'action, elle ne la précède pas. */}
            <div className="mt-7">
              <BoutonCta
                href={LIEN_INSCRIPTION}
                taille="lg"
              >
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

      {/* 1 — La grille. En-tête étroit, tableau pleine largeur : quatre
          colonnes de données ont besoin de toute la place. */}
      <section id="grille" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-2xl">
            <SurTitre>The grid</SurTitre>
            <TitreSection>The cost per task.</TitreSection>
            <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-white/85">
              A small task costs little; a heavy render costs more. The amount
              does not depend on the volume handled: a task costs its price.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <GrilleDetaillee lang="en" />
          </Reveal>
        </div>
      </section>

      {/* 2 — L'estimateur, pleine largeur : le curseur gagne à respirer et les
          équivalences se lisent en regard. */}
      <section id="estimateur" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-2xl">
            <SurTitre>The estimator</SurTitre>
            <TitreSection>How much for your usage?</TitreSection>
            <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-white/85">
              Choose an amount of credits: you see straight away how many tasks
              it represents.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            {/* Sans le renvoi « Voir les détails » : il pointerait vers cette
                page-ci, où la grille complète est déjà juste au-dessus. */}
            <Estimateur lienDetails={false} variante="large" lang="en" />
          </Reveal>
        </div>
      </section>

      {/* 3 — Ce qui est facturé. Cinq points et la démonstration chiffrée du
          flux, en six cases d'une grille à deux colonnes.

          La fenêtre longeait une colonne de cartes ; à cinq cartes, dont deux
          longues, elle laissait 411 px de vide sous elle. En sixième case, elle
          ferme la grille : trois rangées pleines, plus de trou latéral. La
          section ne raccourcit que de 910 à 834 px — des cartes deux fois plus
          étroites rewrappent — mais c'est le vide qui gênait, pas la hauteur. */}
      <section id="facturation" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-2xl">
            <SurTitre>What is billed</SurTitre>
            <TitreSection>What draws credits.</TitreSection>
            <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-white/85">
              The price applies to the task, not to the volume it handles. Here
              is what counts as a
              task.
            </p>
          </Reveal>

          {/* Le `Reveal` porte lui-même la grille : un seul bloc animé pour les
              six cases, au lieu d'un wrapper par carte. Les cases s'étirent à
              la hauteur de leur rangée (comportement par défaut d'une grille),
              d'où des cartes alignées deux à deux sans hauteur écrite. */}
          <Reveal delay={0.1} className="mt-10 grid gap-3.5 os:grid-cols-2">
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

            {/* La découverte après coup qui coûte un client : trois traitements
                enchaînés, trois débits. Dit une fois en carte, montré une fois
                en chiffres — avec les vrais tarifs. */}
            <WindowCard title="Flow · Cloud Paradise">
              <div className="p-5">
                <p className="text-xs text-white/60">Example flow</p>
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
                    {etapes.length} tasks
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
      </section>

      {/* 4 — Les questions. En-tête à gauche, accordéon à droite : du texte
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
              lang="en"
              badge={false}
              soustitre="Create your account and run your first task today."
              bouton={{
                href: LIEN_INSCRIPTION,
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
    <h2 className="mt-2 font-display text-[1.6rem] leading-[1.2] font-bold tracking-tight text-balance text-[#eef4ff] sm:text-3xl os:text-4xl">
      {children}
    </h2>
  );
}
