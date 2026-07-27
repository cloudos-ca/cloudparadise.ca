import { DEVISE, GRILLE, libelleDe } from "@/components/marketing/offre";
import type { Lang } from "@/components/marketing/tokens";

const nf = new Intl.NumberFormat("fr-CA", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const TEXTE: Record<Lang, { type: string; prix: string }> = {
  fr: { type: "Type de traitement", prix: `Prix indicatif (${DEVISE})` },
  en: { type: "Processing type", prix: `Indicative price (${DEVISE})` },
};

/**
 * Grille tarifaire des pages Conditions (article « Crédits, tarification et
 * facturation ») — générée depuis `offre.ts` (source de vérité unique des
 * prix, partagée avec la landing et /tarifs) plutôt que recopiée en dur, pour
 * qu'un prix qui change ne puisse pas diverger d'une page à l'autre sans
 * prévenir. Partagée entre les versions FR et EN.
 */
export function GrilleTarifaireLegale({ lang }: Readonly<{ lang: Lang }>) {
  const t = TEXTE[lang];
  return (
    <div className="overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-[#dbe6fb]">
            <th className="px-3 py-2 font-medium">{t.type}</th>
            <th className="px-3 py-2 font-medium">{t.prix}</th>
          </tr>
        </thead>
        <tbody>
          {GRILLE.map(({ type, cout }) => (
            <tr key={type} className="border-b border-white/5 last:border-0">
              <td className="px-3 py-2">{libelleDe(type, lang)}</td>
              <td className="px-3 py-2 tabular-nums">
                {nf.format(cout)} {DEVISE}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
