"use client";

import { useState } from "react";
import { BoutonCta } from "./BoutonCta";
import { CarteForfait } from "./CarteForfait";
import { DUREES, GARANTIE_JOURS, PALIERS, enDevise } from "./offre";
import type { Lang } from "./tokens";
import { lienInscription } from "@/lib/site";
import { etatCartes } from "@/lib/forfaits";

const T = {
  fr: {
    duree: (m: number) => (m === 1 ? "1 mois" : `${m} mois`),
    memePrix: "Même prix au renouvellement.",
    factureTotal: (total: string, mois: number) => `facturé ${total} pour ${mois} mois, + taxes`,
    parMois: "/ mois",
    taxes: "+ taxes",
    garantie: `Satisfait ou remboursé ${GARANTIE_JOURS} jours`,
    usd: "≈ 7 $ US",
    equipe:
      "Vos collègues rejoignent l'équipe avec un forfait Personnel à 10 $ CA et chacun peut mettre son enveloppe dans le pool.",
    cta: "Essayer 14 jours gratuitement",
  },
  en: {
    duree: (m: number) => (m === 1 ? "1 month" : `${m} months`),
    memePrix: "Same price when it renews.",
    factureTotal: (total: string, mois: number) => `billed ${total} for ${mois} months, + taxes`,
    parMois: "/ month",
    taxes: "+ taxes",
    garantie: `${GARANTIE_JOURS}-day money-back guarantee`,
    usd: "≈ US$7",
    equipe:
      "Your colleagues join the team on a Personal plan at CAD 10 and each can pool their allowance.",
    cta: "Try it free for 14 days",
  },
} as const;

/** Préfixe de `src` pour `lienInscription`, aligné sur les CTA déjà en place
 * sur chaque page (`tarifs-hero`/`tarifs-closer` en français,
 * `pricing-hero`/`pricing-closer` en anglais) : une carte anglaise ne doit
 * jamais rapporter un `src` commençant par `tarifs-`. */
const PREFIXE_SRC = { fr: "tarifs", en: "pricing" } as const;

/**
 * Les deux cartes de forfait, avec le sélecteur de durée (spec §8.2, décision G).
 *
 * Le prix, l'enveloppe et les inclusions sont rendus par `CarteForfait`, le
 * seul rendu de prix du site — ce composant ne fait qu'y ajouter la note de
 * facturation, la garantie et le CTA, propres à cette page. La décision pure
 * du sélecteur (mensuel/total par palier, et si la garantie s'affiche) vient
 * de `etatCartes` (`lib/forfaits.ts`), testée là où ce dépôt peut tester —
 * sans navigateur.
 */
export function CartesForfaits({ lang }: Readonly<{ lang: Lang }>) {
  const [mois, setMois] = useState(12);
  const t = T[lang];
  const etats = etatCartes(mois);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <div
          role="group"
          aria-label={lang === "fr" ? "Durée d'engagement" : "Commitment length"}
          className="flex flex-wrap justify-center gap-2"
        >
          {DUREES.map((d) => (
            <button
              key={d.mois}
              type="button"
              aria-pressed={d.mois === mois}
              onClick={() => setMois(d.mois)}
              className={`rounded-full px-4 py-1.5 text-sm ${d.mois === mois ? "bg-white text-slate-900" : "bg-white/10 text-white/80"}`}
            >
              {t.duree(d.mois)}
            </button>
          ))}
        </div>
        <p className="text-sm text-white/60">{t.memePrix}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {PALIERS.map((p) => {
          const etat = etats.find((e) => e.id === p.id);
          if (!etat) throw new Error(`palier inconnu : ${p.id}`);
          return (
            <article
              key={p.id}
              className="flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
            >
              <CarteForfait
                palier={p}
                lang={lang}
                mensuel={etat.mensuel}
                suffixe={`${t.parMois} ${t.taxes}`}
                notePrix={
                  <>
                    {mois > 1 && (
                      <p className="text-sm text-white/60">
                        {t.factureTotal(enDevise(etat.total), mois)}
                      </p>
                    )}
                    {/* L'équivalent en dollars américains glose le PRIX DE LISTE (spec §8.2 :
                        « sous 10 $ CA »), pas le mensuel remisé d'un engagement : à 12 mois la
                        carte affichait « 8 $ CA / mois … ≈ 7 $ US », et à 24 mois « 7 $ CA …
                        ≈ 7 $ US ». Il n'a de sens qu'à la durée où le prix affiché EST le prix de
                        liste, donc à 1 mois. */}
                    {p.id === "personnel" && mois === 1 && (
                      <p className="text-xs text-white/50">{t.usd}</p>
                    )}
                  </>
                }
              />
              {etat.afficheGarantie && <p className="text-sm text-emerald-300">{t.garantie}</p>}
              <BoutonCta href={lienInscription(`${PREFIXE_SRC[lang]}-${p.id}`)}>{t.cta}</BoutonCta>
            </article>
          );
        })}
      </div>
      <p className="text-center text-sm text-white/70">{t.equipe}</p>
    </div>
  );
}
