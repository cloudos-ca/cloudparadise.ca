import type { Lang } from "./tokens";

/** Bandeau de tête de /tarifs (spec §8.2, décision G) : trois promesses vérifiables, dans l'ordre des
 * objections observées — le prix, l'hébergement, la loi. */
const TEXTE = {
  fr: ["Prix en $ CA, taxes affichées", "Données hébergées au Québec", "Conforme à la Loi 25"],
  en: ["Prices in CAD, taxes shown", "Data hosted in Québec", "Law 25 compliant"],
} as const;

export function BandeauConfiance({ lang }: Readonly<{ lang: Lang }>) {
  return (
    <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/70">
      {TEXTE[lang].map((t) => (
        <li key={t} className="flex items-center gap-2">
          <span aria-hidden className="size-1.5 rounded-full bg-emerald-400" />
          {t}
        </li>
      ))}
    </ul>
  );
}
