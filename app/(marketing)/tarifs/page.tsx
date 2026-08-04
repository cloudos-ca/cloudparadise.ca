import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  AncresSections,
  type Ancre,
} from "@/components/marketing/AncresSections";
import { BadgeOffre } from "@/components/marketing/BadgeOffre";
import { BoutonCta } from "@/components/marketing/BoutonCta";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";
import {
  PALIER_RECOMMANDE_ID,
  PALIERS_ABONNEMENT,
  prixAbonnement,
} from "@/components/marketing/abonnements";
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
  IconCoin,
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
import { lienInscription } from "@/lib/site";

const TITRE = "Tarifs : crédits à l’usage ou abonnement mensuel — Cloud Paradise";
const DESCRIPTION = `Un abonnement mensuel à prix fixe dès ${prixAbonnement(PALIERS_ABONNEMENT[0], "fr")}, ou des crédits à l’usage : ${OFFRE_EN_DEVISE} offerts à l’inscription, le coût de chaque tâche, un estimateur pour chiffrer votre budget d’avance.`;

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: alternatesBilingues("/tarifs", "/en/pricing", "fr"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "fr", "/tarifs"),
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
  { id: "abonnements", libelle: { fr: "Abonnements", en: "Subscriptions" } },
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
 * « fichier par fichier » comme règle générale, sous le titre « Vous ne payez
 * que ce qui est traité ». Or la règle est le forfait par tâche : un lot de 200
 * contrats est une tâche à 0,25, et le débit à la pièce n'existe que pour le
 * traitement d'images et le publipostage. Le titre était donc faux avec le
 * corps, et pas seulement à côté : au forfait, on paie au lancement, quel que
 * soit le résultat.
 *
 * Deux clauses en sont sorties — la reprise « sans nouveau crédit » après une
 * panne, et la relance « sur le même crédit, autant de fois qu'il le faut ».
 * Elles ne sont pas adoucies, elles sont retirées : elles ne peuvent pas être
 * atténuées sans devenir creuses, et elles restent à confirmer contre le code
 * de facturation. Ne pas les réécrire de mémoire.
 *
 * « Essai à blanc » et non « simulation » : la grille, deux sections plus haut,
 * facture un type de tâche nommé « Simulation ». Deux objets sous le même mot
 * sur la même page rendraient les deux incompréhensibles — même raison qui
 * réserve « estimateur » au curseur de budget.
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
  {
    Icone: IconCheck,
    titre: "Un prix par tâche, quel que soit le volume",
    // « et les 150 résultats sont à vous » n'est pas décoratif : sans cette
    // clause, la phrase dirait qu'on facture un travail que le client ne reçoit
    // pas. Elle reste, mais rattachée aux deux seuls traitements comptés à la
    // pièce — c'est là, et là seulement, qu'un lot peut s'arrêter en cours.
    texte:
      "Un lot de 200 contrats coûte le prix d’une tâche, pas de 200. Deux traitements font exception et se comptent à la pièce : le traitement d’images et le publipostage. Là, seules les pièces produites sont débitées — si un lot de 200 s’arrête au 150ᵉ, les 150 résultats sont à vous, récupérables tout de suite.",
  },
  {
    Icone: IconAdjustments,
    titre: "Faites l’essai, voyez le prix, puis lancez",
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
      "L’assistant vous montre ce que la tâche va produire et ce qu’elle va coûter, avant que rien ne soit débité. L’essai à blanc ne coûte rien : vous ajustez jusqu’à ce que ça corresponde, puis vous lancez. Si votre solde ne suffit pas, on vous le dit avant de partir. Le prix est fixé avant le lancement : vous ne paierez jamais plus que le montant affiché.",
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
      <OffreJsonLd lang="fr" />
      <HreflangLinks fr="/tarifs" en="/en/pricing" />
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
              Un abonnement mensuel à prix fixe, ou des crédits à l’usage. Un
              crédit vaut un dollar canadien — vous en recevez pour
              commencer, vous en rachetez quand vous voulez, ou vous optez
              pour une allocation fixe chaque mois.
            </p>
            {/* Bouton puis badge, dans cet ordre — le même que sur l'accueil :
                l'offre confirme l'action, elle ne la précède pas. */}
            <div className="mt-7">
              <BoutonCta
                href={lienInscription("tarifs-hero")}
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

      {/* 1 — Abonnements. En tête de page, avant même la grille : c'est
          l'option qu'on veut voir en premier. Trois cartes, une par palier ;
          celle du milieu porte la pastille « Recommandé » (voir
          `PALIER_RECOMMANDE_ID`). Les crédits sont redits en une phrase, pas
          en ouverture — la grille qui les détaille suit juste après. */}
      <section id="abonnements" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-2xl">
            <SurTitre>Abonnements</SurTitre>
            <TitreSection>Un montant fixe, chaque mois.</TitreSection>
            <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-white/85">
              Pour un usage régulier, un abonnement mensuel donne une
              allocation de crédits fixe chaque mois, facturée en dollars
              américains via PayPal — un montant prévisible plutôt qu’une
              recharge à la demande. Les crédits à l’usage restent
              disponibles à tout moment, sans carte requise, si vous
              préférez ne rien planifier.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 grid gap-3.5 os:grid-cols-3">
            {PALIERS_ABONNEMENT.map((palier) => {
              const recommande = palier.id === PALIER_RECOMMANDE_ID;
              return (
                <div
                  key={palier.id}
                  className={`flex flex-col gap-3 rounded-xl border p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors ${
                    recommande
                      ? "border-transparent bg-gradient-to-b from-white/[0.06] to-white/[0.01]"
                      : "border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:border-white/15"
                  }`}
                  style={
                    recommande
                      ? {
                          boxShadow:
                            "inset 0 0 0 1px color-mix(in srgb, var(--cta) 45%, transparent), inset 0 1px 0 rgba(255,255,255,0.04)",
                        }
                      : undefined
                  }
                >
                  <span
                    className="grid size-10 shrink-0 place-items-center rounded-lg"
                    style={{
                      background:
                        "color-mix(in srgb, var(--soft) 12%, transparent)",
                      color: "var(--soft)",
                    }}
                  >
                    <IconCoin className="size-[21px]" />
                  </span>
                  <div>
                    <p className="flex items-center gap-2 font-display text-[15px] font-semibold text-white">
                      {palier.nom.fr}
                      {recommande ? (
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                          style={{
                            background: "var(--cta-wash)",
                            color: "var(--cta)",
                          }}
                        >
                          Recommandé
                        </span>
                      ) : null}
                    </p>
                    <p
                      className="mt-1 font-display text-lg font-bold tabular-nums"
                      style={{ color: "var(--cta)" }}
                    >
                      {prixAbonnement(palier, "fr")}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-white/85">
                      {palier.creditsMensuels} crédits chaque mois
                    </p>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* 2 — La grille. En-tête étroit, tableau pleine largeur : quatre
          colonnes de données ont besoin de toute la place. */}
      <section id="grille" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-2xl">
            <SurTitre>La grille</SurTitre>
            <TitreSection>Le coût par tâche.</TitreSection>
            <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-white/85">
              Une petite tâche coûte peu ; un rendu lourd coûte plus. Le montant
              ne dépend pas du volume traité : une tâche coûte son prix.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <GrilleDetaillee />
          </Reveal>
        </div>
      </section>

      {/* 3 — L'estimateur, pleine largeur : le curseur gagne à respirer et les
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

      {/* 4 — Ce qui est facturé. Cinq points et la démonstration chiffrée du
          flux, en six cases d'une grille à deux colonnes.

          La fenêtre longeait une colonne de cartes ; à cinq cartes, dont deux
          longues, elle laissait 411 px de vide sous elle. En sixième case, elle
          ferme la grille : trois rangées pleines, plus de trou latéral. La
          section ne raccourcit que de 910 à 834 px — des cartes deux fois plus
          étroites rewrappent — mais c'est le vide qui gênait, pas la hauteur. */}
      <section id="facturation" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-2xl">
            <SurTitre>Ce qui est facturé</SurTitre>
            <TitreSection>Ce qui débite des crédits.</TitreSection>
            <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-white/85">
              Le prix s’applique à la tâche, pas au volume qu’elle traite. Voici
              ce qui compte comme une tâche.
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
                    {etapes.length} tâches
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

      {/* 5 — Les questions. En-tête à gauche, accordéon à droite : du texte
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
                href: lienInscription("tarifs-closer"),
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
