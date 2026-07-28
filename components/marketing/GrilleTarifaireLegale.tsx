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
    // `overflow-x-auto` ne contient le tableau que si le conteneur peut lui-même
    // rétrécir : la colonne de texte porte `min-w-0` pour ça. Sur téléphone, la
    // grille défile donc dans son cadre au lieu d'élargir la page.
    <div className="overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full min-w-[22rem] text-left text-[15px]">
        <thead>
          {/* Filets en blanc translucide, jamais de fond plein : sur le marine,
              un aplat clair ferait une bande lumineuse au milieu du texte. */}
          <tr className="border-b border-white/15">
            <th className="px-4 py-2.5 font-semibold text-white">{t.type}</th>
            <th className="px-4 py-2.5 font-semibold text-white">{t.prix}</th>
          </tr>
        </thead>
        <tbody>
          {GRILLE.map(({ type, cout }) => (
            <tr
              key={type}
              className="border-b border-white/10 text-white/85 last:border-0"
            >
              <td className="px-4 py-2.5">{libelleDe(type, lang)}</td>
              <td className="px-4 py-2.5 tabular-nums whitespace-nowrap">
                {nf.format(cout)} {DEVISE}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
