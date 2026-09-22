"use client";

import { useState } from "react";
import { BoutonCta } from "./BoutonCta";
import { DUREES, GARANTIE_DUREE_MIN, GARANTIE_JOURS, PALIERS, enDevise, prixDuree } from "./offre";
import type { Lang } from "./tokens";
import { lienInscription } from "@/lib/site";

const T = {
  fr: {
    duree: (m: number) => (m === 1 ? "1 mois" : `${m} mois`),
    memePrix: "Même prix au renouvellement.",
    factureTotal: (total: string, mois: number) => `facturé ${total} pour ${mois} mois, + taxes`,
    parMois: "/ mois",
    taxes: "+ taxes",
    taches: (n: number) => `≈ ${n} tâches / mois`,
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
    taches: (n: number) => `≈ ${n} tasks / month`,
    garantie: `${GARANTIE_JOURS}-day money-back guarantee`,
    usd: "≈ US$7",
    equipe:
      "Your colleagues join the team on a Personal plan at CAD 10 and each can pool their allowance.",
    cta: "Try it free for 14 days",
  },
} as const;

/**
 * Les deux cartes de forfait, avec le sélecteur de durée (spec §8.2, décision G).
 *
 * Seul rendu de prix de /tarifs et /en/pricing : `Tarification.tsx` (accueil) et le JSON-LD
 * (`OffreJsonLd.tsx`) lisent tous deux `offre.ts` directement, indépendamment de ce composant, mais
 * aucun d'eux ne duplique la logique de sélection de durée qui vit ici.
 */
export function CartesForfaits({ lang }: Readonly<{ lang: Lang }>) {
  const [mois, setMois] = useState(12);
  const t = T[lang];
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <div
          role="tablist"
          aria-label={lang === "fr" ? "Durée d'engagement" : "Commitment length"}
          className="flex flex-wrap justify-center gap-2"
        >
          {DUREES.map((d) => (
            <button
              key={d.mois}
              type="button"
              role="tab"
              aria-selected={d.mois === mois}
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
          const prix = prixDuree(p, mois);
          return (
            <article key={p.id} className="flex flex-col gap-4 rounded-2xl border border-white/10 p-6">
              <h3 className="text-xl font-semibold">{p.nom[lang]}</h3>
              <p className="text-3xl font-bold">
                {enDevise(prix.mensuel)}{" "}
                <span className="text-base font-normal text-white/60">
                  {t.parMois} {t.taxes}
                </span>
              </p>
              {mois > 1 && <p className="text-sm text-white/60">{t.factureTotal(enDevise(prix.total), mois)}</p>}
              {p.id === "personnel" && <p className="text-xs text-white/50">{t.usd}</p>}
              <p className="text-sm text-white/80">{t.taches(p.tachesParMois)}</p>
              <ul className="flex flex-col gap-1 text-sm text-white/70">
                {p.inclusions[lang].map((i) => (
                  <li key={i}>• {i}</li>
                ))}
              </ul>
              {mois >= GARANTIE_DUREE_MIN && <p className="text-sm text-emerald-300">{t.garantie}</p>}
              <BoutonCta href={lienInscription(`tarifs-${p.id}`)}>{t.cta}</BoutonCta>
            </article>
          );
        })}
      </div>
      <p className="text-center text-sm text-white/70">{t.equipe}</p>
    </div>
  );
}
