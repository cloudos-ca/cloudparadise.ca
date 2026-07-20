import type { Metadata } from "next";
import { BadgeOffre } from "@/components/marketing/BadgeOffre";
import { Estimateur } from "@/components/marketing/Estimateur";
import { FaqTarifs } from "@/components/marketing/FaqTarifs";
import { FenetreCta } from "@/components/marketing/FenetreCta";
import { GrilleDetaillee } from "@/components/marketing/GrilleDetaillee";
import { PageEntete } from "@/components/marketing/PageEntete";
import { Reveal } from "@/components/marketing/Reveal";
import { IconInfinity, IconRefresh } from "@/components/marketing/icons";
import { OFFRE_EN_DEVISE } from "@/components/marketing/offre";
import { LECTURE, SECTION_Y, SHELL } from "@/components/marketing/tokens";

export const metadata: Metadata = {
  title: "Pricing — Cloud Paradise",
  description: `Credits, not a subscription. ${OFFRE_EN_DEVISE} in free credits on signup, plus the full cost breakdown for every processing mode.`,
};

/**
 * Rappel du modèle.
 *
 * L'offre d'accueil n'est plus dans cette liste : elle est portée par le badge
 * doré juste au-dessus, où on la voit. La répéter ici en gris l'aurait diluée.
 */
const POINTS = [
  {
    Icone: IconRefresh,
    texte: "Top up on demand, never a subscription",
  },
  {
    Icone: IconInfinity,
    texte: "Credits never expire",
  },
] as const;

export default function TarifsPageEn() {
  return (
    // `overflow-x-clip` : la lueur du CTA déborde volontairement de sa fenêtre
    // et pousserait la page hors cadre sur petit écran sans ce clip.
    <section className="relative overflow-x-clip">
      <div className={`${SHELL} ${SECTION_Y}`}>
        {/* 1 — En-tête, le même composant que Contact et les pages légales. */}
        <PageEntete
          centre
          eyebrow="Pricing"
          titre="Pay for what you use. Nothing more."
          soustitre="Credits, not a subscription. You only pay for what you run."
        />

        {/* 2 — L'offre, puis le rappel du modèle */}
        <Reveal delay={0.1} className="mt-7 text-center">
          <BadgeOffre lang="en" />
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3"
        >
          {POINTS.map(({ Icone, texte }) => (
            <p
              key={texte}
              className="flex items-center gap-2 text-[13px] text-[#dbe6fb]"
            >
              <Icone
                className="size-4 shrink-0"
                style={{ color: "var(--acc-text)" }}
              />
              {texte}
            </p>
          ))}
        </Reveal>

        {/* 3 — Grille détaillée : le seul bloc pleine largeur, parce que c'est
            un tableau à quatre colonnes. */}
        <Reveal delay={0.1} className="mt-14">
          <TitreSection
            titre="The price of each mode"
            intro="Each task is billed according to the mode it uses. A small task costs little; a heavy render costs more."
          />
          <div className="mt-5">
            <GrilleDetaillee lang="en" />
          </div>
        </Reveal>

        {/* 4 — Estimateur. À partir d'ici, tous les blocs partagent la même
            colonne (`LECTURE`) centrée : un seul axe médian de haut en bas,
            plutôt qu'une largeur et un alignement par section. */}
        <Reveal delay={0.1} className="mt-14">
          <TitreSection
            titre="Estimate your budget"
            intro="Choose an amount of credits: see right away how many tasks it represents, depending on the mode."
          />
          <div className={`${LECTURE} mx-auto mt-5`}>
            {/* Sans le renvoi « Voir les détails » : il pointerait vers cette
                page-ci, où la grille complète est déjà juste au-dessus. */}
            <Estimateur lienDetails={false} lang="en" />
          </div>
        </Reveal>

        {/* 5 — FAQ */}
        <Reveal delay={0.1} className="mt-14">
          <TitreSection titre="Frequently asked questions" />
          <div className={`${LECTURE} mx-auto mt-5`}>
            <FaqTarifs lang="en" />
          </div>
        </Reveal>

        {/* 6 — CTA final : la même fenêtre à halo que le closer de la landing,
            sur la même colonne centrée que l'estimateur et la FAQ. */}
        <Reveal delay={0.1} className="mt-16">
          <FenetreCta
            lang="en"
            className={`${LECTURE} mx-auto`}
            soustitre={
              <>Create your account, your first task follows right away.</>
            }
            bouton={{
              href: "/en/inscription",
              libelle: `Start with ${OFFRE_EN_DEVISE} free`,
            }}
            lien={{
              href: "/en/contact",
              libelle: "Questions? Contact us",
            }}
          />
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Titre de section de la page.
 *
 * Tous centrés et tous au même gabarit : c'est ce qui donne à la page un axe
 * unique à suivre, là où alterner centré et aligné à gauche faisait repartir
 * l'œil d'ailleurs à chaque bloc.
 */
function TitreSection({ titre, intro }: { titre: string; intro?: string }) {
  return (
    <div className="text-center">
      <h2 className="font-display text-lg font-bold tracking-tight text-[#eef4ff]">
        {titre}
      </h2>
      {intro ? (
        <p
          className={`${LECTURE} mx-auto mt-2 text-sm leading-relaxed text-[#93a3c2]`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
