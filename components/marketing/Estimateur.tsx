"use client";

import { useState } from "react";
import { CREDIT_EN_DEVISE, DEVISE, coutDe, libelleDe, type TypeTache } from "./offre";
import type { Lang } from "./tokens";

/** Types mis en avant : le moins cher, un intermédiaire, le plus cher. */
const VEDETTES: readonly TypeTache[] = ["Documents", "Calcul GPU", "Rendu 3D"];

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

/**
 * Combien de tâches de chaque type pour le budget choisi.
 *
 * Le pas d'arrondi suit l'ordre de grandeur : à 4 000, la dizaine près suffit
 * et évite d'afficher une précision que le chiffre n'a pas.
 *
 * Un mode sans prix arrêté est écarté sans bruit : on ne peut pas diviser par
 * un tarif qui n'existe pas, et afficher « ≈ ∞ tâches » serait pire que de ne
 * rien dire. Les vedettes actuelles sont toutes tarifées — ce filtre est un
 * garde-fou pour le jour où l'une d'elles ne le sera plus.
 */
function equivalences(credits: number, lang: Lang) {
  return VEDETTES.flatMap((type) => {
    const cout = coutDe(type);
    if (cout === null) return [];
    const nombre = credits / cout;
    const pas = nombre >= 1000 ? 10 : nombre >= 100 ? 5 : 1;
    const nom = libelleDe(type, lang);
    return [
      {
        cle: type,
        valeur: nf.format(arrondi(nombre, pas)),
        libelle: lang === "en" ? `${nom} tasks` : `tâches ${nom}`,
      },
    ];
  });
}

/**
 * Estimateur de budget — curseur de crédits et équivalences en tâches.
 *
 * Partagé par la section Tarification de la landing et la page /tarifs : c'est
 * le même objet à deux endroits, pas deux variantes à maintenir.
 */
const TEXTES = {
  fr: {
    titre: "Estimez votre coût",
    credits: "crédits",
    ariaCredits: "Nombre de crédits",
    voirDetails: "Voir les détails",
  },
  en: {
    titre: "Estimate your cost",
    credits: "credits",
    ariaCredits: "Number of credits",
    voirDetails: "See details",
  },
} as const;

export function Estimateur({
  /**
   * Renvoi vers /tarifs. À couper sur la page /tarifs elle-même, où le lien
   * pointerait vers la page déjà ouverte.
   */
  lienDetails = true,
  lang = "fr",
}: {
  lienDetails?: boolean;
  lang?: Lang;
} = {}) {
  const [credits, setCredits] = useState(CONFIG.credits.defaut);
  const { min, max, pas } = CONFIG.credits;
  const pourcent = ((credits - min) / (max - min)) * 100;
  const t = TEXTES[lang];

  return (
    <div className="rounded-xl border border-white/10 bg-[rgba(27,39,61,.9)] p-5 shadow-2xl shadow-black/40 backdrop-blur-sm">
      <p className="text-sm font-medium text-[#eef4ff]">{t.titre}</p>

      <div className="mt-5 flex items-baseline gap-2">
        <span
          className="font-display text-3xl font-bold"
          style={{ color: "var(--cta)" }}
        >
          {nf.format(credits)}
        </span>
        <span className="text-sm text-[#93a3c2]">{t.credits}</span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={pas}
        value={credits}
        onChange={(e) => setCredits(Number(e.target.value))}
        aria-label={t.ariaCredits}
        aria-valuetext={`${nf.format(credits)} ${t.credits}`}
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
        {equivalences(credits, lang).map(({ cle, valeur, libelle }) => (
          <div key={cle} className="flex items-baseline gap-2 text-sm">
            <span aria-hidden="true" className="text-[#93a3c2]">
              ≈
            </span>
            <dt
              className="font-medium tabular-nums"
              style={{ color: "var(--cta)" }}
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
          {lang === "en" ? (
            <>
              1 credit = {nf.format(CONFIG.creditEnDevise)} {CONFIG.devise} —{" "}
              <span className="tabular-nums">{nf.format(credits)}</span>{" "}
              {CONFIG.devise} for this budget.
            </>
          ) : (
            <>
              1 crédit = {nf.format(CONFIG.creditEnDevise)} {CONFIG.devise}{" "}
              — soit{" "}
              <span className="tabular-nums">{nf.format(credits)}</span>{" "}
              {CONFIG.devise} pour ce budget.
            </>
          )}
        </p>
        {lienDetails ? (
          <a
            href={lang === "en" ? "/en/tarifs" : "/tarifs"}
            data-cp-accent
            className="text-xs font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
            style={{ color: "var(--acc-text)" }}
          >
            {t.voirDetails}
          </a>
        ) : null}
      </div>
    </div>
  );
}
