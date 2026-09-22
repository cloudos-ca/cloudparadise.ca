import type { ReactNode } from "react";
import { IconCheck } from "./icons";
import { enDevise, type Palier } from "./offre";
import type { Lang } from "./tokens";

const TACHES = {
  fr: (n: number) => `≈ ${n} tâches par mois`,
  en: (n: number) => `≈ ${n} tasks a month`,
} as const;

/**
 * Le cœur d'une carte de forfait : nom, prix, enveloppe traduite en tâches,
 * inclusions.
 *
 * Seul rendu de prix du site. `Tarification.tsx` (accueil, prix de base sans
 * engagement) et `CartesForfaits.tsx` (/tarifs et /en/pricing, prix de la
 * durée choisie) l'utilisent tous les deux — chacun porte sa propre habillage
 * (bordure, CTA, garantie, note de facturation…) autour de ce cœur via
 * `notePrix` et son propre wrapper, mais aucun des deux ne rappelle `enDevise`
 * de son côté. C'est le troisième rendu de prix en trop qui existait avant :
 * une carte locale par page, recalculant et réaffichant le même prix.
 */
export function CarteForfait({
  palier,
  lang,
  mensuel,
  suffixe,
  notePrix,
}: Readonly<{
  palier: Palier;
  lang: Lang;
  mensuel: number;
  suffixe: ReactNode;
  /** Rendu entre le prix et l'enveloppe — total facturé, équivalence USD… */
  notePrix?: ReactNode;
}>) {
  return (
    <>
      <div>
        <p className="font-display text-[15px] font-extrabold text-white">
          {palier.nom[lang]}
        </p>
        <p
          className="mt-1 flex items-baseline gap-1 font-display text-2xl font-extrabold tabular-nums"
          style={{ color: "var(--cta)" }}
        >
          {enDevise(mensuel)}
          <span className="text-[13px] font-medium text-white/70">{suffixe}</span>
        </p>
        {notePrix}
        <p className="mt-1 text-[13px] text-white/70">{TACHES[lang](palier.tachesParMois)}</p>
      </div>
      <ul className="space-y-2">
        {palier.inclusions[lang].map((inclusion) => (
          <li key={inclusion} className="flex items-start gap-2 text-[13px] text-white/85">
            <IconCheck className="mt-0.5 size-4 shrink-0" style={{ color: "var(--soft)" }} />
            {inclusion}
          </li>
        ))}
      </ul>
    </>
  );
}
