"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { IconAdjustments, IconGift, IconRefresh } from "./icons";
import { CREDIT_EN_DEVISE, DEVISE, OFFRE_EN_DEVISE } from "./offre";
import { SECTION_Y, SHELL } from "./tokens";

/**
 * Grille tarifaire — coût débité en crédits par tâche lancée.
 *
 * Ce sont les valeurs réelles du produit. Les sept types correspondent aux
 * sept modes annoncés par la section Réassurance : si l'un bouge, l'autre
 * aussi.
 */
const GRILLE = [
  { type: "IA", cout: 0.1 },
  { type: "Documents", cout: 0.25 },
  { type: "Données", cout: 0.25 },
  { type: "Média", cout: 0.5 },
  { type: "Scraping", cout: 0.5 },
  { type: "Calcul GPU", cout: 2 },
  { type: "Rendu 3D", cout: 3 },
] as const;

/** Types mis en avant dans l'estimateur : le moins cher, un intermédiaire, le plus cher. */
const VEDETTES = ["Documents", "Calcul GPU", "Rendu 3D"] as const;

const CONFIG = {
  /**
   * Bornes du curseur — choix d'interface, pas un tarif : elles cadrent
   * l'estimation sur des montants abordables. À aligner sur les vrais paliers
   * de recharge quand ils seront arrêtés.
   */
  credits: { min: 10, max: 500, pas: 10, defaut: 100 },
  creditEnDevise: CREDIT_EN_DEVISE,
  devise: DEVISE,
};

/** Arrondit à un pas lisible : 33 412 devient 33 400, pas 33 412,33. */
function arrondi(valeur: number, pas: number) {
  return Math.round(valeur / pas) * pas;
}

const nf = new Intl.NumberFormat("fr-CA");
/** Les coûts sont des fractions de crédit : deux décimales, toujours. */
const nfCredit = new Intl.NumberFormat("fr-CA", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Combien de tâches de chaque type pour le budget choisi.
 *
 * Le pas d'arrondi suit l'ordre de grandeur : à 4 000, la dizaine près suffit
 * et évite d'afficher une précision que le chiffre n'a pas.
 */
function equivalences(credits: number) {
  return VEDETTES.map((type) => {
    const ligne = GRILLE.find((g) => g.type === type)!;
    const nombre = credits / ligne.cout;
    const pas = nombre >= 1000 ? 10 : nombre >= 100 ? 5 : 1;
    return {
      cle: type,
      valeur: nf.format(arrondi(nombre, pas)),
      libelle: `tâches ${type}`,
    };
  });
}

const ARGUMENTS = [
  {
    Icone: IconGift,
    titre: `${OFFRE_EN_DEVISE} de crédits offerts à l’inscription`,
    texte: "Testez sans sortir votre carte.",
  },
  {
    Icone: IconRefresh,
    titre: "Rechargez quand vous voulez",
    texte: "Vous ajoutez des crédits à la demande, jamais d’abonnement.",
  },
  {
    Icone: IconAdjustments,
    titre: "Le prix suit l’usage",
    texte: "Une petite tâche coûte peu ; un gros rendu coûte plus. Logique.",
  },
] as const;

export function Tarification() {
  return (
    // Cible de « Voir les tarifs », depuis le closer.
    <section id="tarifs" className="relative scroll-mt-16">
      <div className={`${SHELL} ${SECTION_Y}`}>
        <Reveal className="text-center">
          <p
            className="text-xs font-medium tracking-wide"
            style={{ color: "var(--acc-text)" }}
          >
            Tarification
          </p>
          <h2 className="mx-auto mt-3 max-w-[22ch] font-display text-[1.6rem] leading-[1.2] font-bold tracking-tight text-balance text-[#eef4ff] sm:text-3xl os:text-4xl">
            Payez ce que vous utilisez. Rien de plus.
          </h2>
          <p className="mx-auto mt-3 max-w-[52ch] text-sm leading-relaxed text-[#93a3c2]">
            Des crédits, pas d’abonnement. On vous en offre pour commencer.
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-10 grid items-center gap-8 os:grid-cols-[46fr_54fr] os:gap-12"
        >
          <ul className="space-y-5">
            {ARGUMENTS.map(({ Icone, titre, texte }) => (
              <li key={titre} className="flex gap-3.5">
                <span
                  data-cp-accent
                  className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full"
                  style={{
                    background:
                      "color-mix(in srgb, var(--acc) 15%, transparent)",
                    color: "var(--acc-text)",
                  }}
                >
                  <Icone className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-medium text-[#eef4ff]">{titre}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#93a3c2]">
                    {texte}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <Estimateur />
        </Reveal>

        <Reveal delay={0.15} className="mt-10">
          <Grille />
        </Reveal>
      </div>
    </section>
  );
}

/** La grille complète : sept types, sept modes, un seul endroit qui fait foi. */
function Grille() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
      <p className="text-xs text-[#93a3c2]">
        Coût débité par tâche lancée, en crédits — 1 crédit ={" "}
        {nf.format(CONFIG.creditEnDevise)} {CONFIG.devise}
      </p>
      <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-2.5">
        {GRILLE.map(({ type, cout }) => (
          <div key={type} className="flex items-baseline gap-1.5">
            <dt className="text-[13px] text-[#eef4ff]">{type}</dt>
            <dd
              data-cp-accent
              className="text-[13px] font-medium tabular-nums"
              style={{ color: "var(--soft)" }}
            >
              {nfCredit.format(cout)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Estimateur() {
  const [credits, setCredits] = useState(CONFIG.credits.defaut);
  const { min, max, pas } = CONFIG.credits;
  const pourcent = ((credits - min) / (max - min)) * 100;

  return (
    <div className="rounded-xl border border-white/10 bg-[rgba(27,39,61,.9)] p-5 shadow-2xl shadow-black/40 backdrop-blur-sm">
      <p className="text-sm font-medium text-[#eef4ff]">Estimez votre coût</p>

      <div className="mt-5 flex items-baseline gap-2">
        <span
          data-cp-accent
          className="font-display text-3xl font-bold"
          style={{ color: "var(--soft)" }}
        >
          {nf.format(credits)}
        </span>
        <span className="text-sm text-[#93a3c2]">crédits</span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={pas}
        value={credits}
        onChange={(e) => setCredits(Number(e.target.value))}
        aria-label="Nombre de crédits"
        aria-valuetext={`${nf.format(credits)} crédits`}
        style={{ ["--pct" as string]: `${pourcent}%` }}
        className="mt-4 h-4 w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--acc)] [&::-moz-range-progress]:h-1.5 [&::-moz-range-progress]:rounded-full [&::-moz-range-progress]:bg-[var(--acc)] [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[var(--acc)] [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-white/12 [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,var(--acc)_var(--pct),rgb(255_255_255/0.12)_var(--pct))] [&::-webkit-slider-thumb]:mt-[-5px] [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--acc)]"
      />

      <div className="mt-1 flex justify-between text-[11px] text-[#93a3c2]">
        <span>{nf.format(min)}</span>
        <span>{nf.format(max)}</span>
      </div>

      {/* Les équivalences sont le vrai contenu utile : elles sont annoncées. */}
      <dl
        aria-live="polite"
        className="mt-5 space-y-2 border-t border-white/10 pt-4"
      >
        {equivalences(credits).map(({ cle, valeur, libelle }) => (
          <div key={cle} className="flex items-baseline gap-2 text-sm">
            <span aria-hidden="true" className="text-[#93a3c2]">
              ≈
            </span>
            <dt
              data-cp-accent
              className="font-medium tabular-nums"
              style={{ color: "var(--soft)" }}
            >
              {valeur}
            </dt>
            <dd className="text-[#93a3c2]">{libelle}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-2 border-t border-white/10 pt-4">
        {/* Le taux est réel, donc plus de « prix indicatif » : la grille se lit
            directement en devise. */}
        <p className="text-[11px] text-[#93a3c2]">
          1 crédit = {nf.format(CONFIG.creditEnDevise)} {CONFIG.devise} — soit{" "}
          <span className="tabular-nums">{nf.format(credits)}</span>{" "}
          {CONFIG.devise} pour ce budget.
        </p>
        <a
          href="/tarifs"
          data-cp-accent
          className="text-xs font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
          style={{ color: "var(--acc-text)" }}
        >
          Voir les détails
        </a>
      </div>
    </div>
  );
}
