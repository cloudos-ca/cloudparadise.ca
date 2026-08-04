import Link from "next/link";
import { Reveal } from "./Reveal";
import { SECTION_Y, SHELL, type Lang } from "./tokens";

/**
 * Section d'appel pour l'exploration minière — soutien à la vente, pas
 * conquête SEO. Le vocabulaire métier EST l'argument : un géologue reconnaît
 * en quelques secondes qu'on connaît le domaine. Les mots-clés sont donc rendus
 * bien visibles, en pastilles techniques (police mono), comme une barre d'outils
 * de capacités.
 *
 * En-tête à gauche, comme toutes les sections. Le lien renvoie à /mines, seul
 * appel à l'action de la section.
 *
 * **Placée après `RenvoiPme` depuis le 2026-07-30**, et le paragraphe a été
 * resserré pour que la hiérarchie se lise : les PME arrivent par la recherche
 * organique, les mines se travaillent en démarchage direct.
 *
 * Rien n'a été retiré du fond. Le resserrage n'a enlevé que « NI 43-101 » et
 * « SIGÉOM », parce que les deux sont en pastilles quarante pixels plus bas et
 * que les dire deux fois allongeait le bloc sans rien apprendre. Les capacités,
 * elles, sont toutes restées — alertes d'échéance comprise.
 */

/** Termes métier, identiques FR/EN : ce sont des noms propres et des normes. */
const MOTS_CLES = [
  "GESTIM",
  "desurvey",
  "NI 43-101",
  "SIGÉOM",
  // Les deux zones, comme /mines : tronquée à 17N, la pastille se lisait comme
  // une couverture partielle devant un public qui reconnaît les zones.
  "NAD83 UTM 17N/18N",
  "GPX Garmin",
] as const;

const TEXTES = {
  fr: {
    eyebrow: "Exploration minière",
    titre: "Conçu en Abitibi, pour le terrain québécois.",
    texte:
      "Suivi des claims et alertes d’échéance, forages 3D, anomalies géochimiques, rapports MRNF. Les outils de l’exploration, dans le même espace de travail que le reste.",
    lien: "Voir la page Mines",
    href: "/mines",
    ariaMots: "Termes métier pris en charge",
  },
  en: {
    eyebrow: "Mineral exploration",
    titre: "Built in Abitibi, for Québec field conditions.",
    texte:
      "Claim tracking and deadline alerts, 3D drillholes, geochemical anomalies, MRNF reports. Exploration tools, in the same workspace as everything else.",
    lien: "See the Mining page",
    href: "/en/mining",
    ariaMots: "Supported domain terms",
  },
} as const;

export function RenvoiMines({ lang = "fr" }: Readonly<{ lang?: Lang }>) {
  const t = TEXTES[lang];
  return (
    <section className="relative">
      <div className={`${SHELL} ${SECTION_Y}`}>
        <Reveal className="max-w-2xl">
          <p
            className="text-[13px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: "var(--cta)" }}
          >
            {t.eyebrow}
          </p>
          <h2 className="mt-2 max-w-[20ch] font-display text-[1.6rem] leading-[1.2] font-bold tracking-tight text-balance text-[#eef4ff] sm:text-3xl os:text-4xl">
            {t.titre}
          </h2>
          <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-white/85">
            {t.texte}
          </p>
        </Reveal>

        {/* Les mots-clés, bien visibles : la preuve de compétence tient dans le
            vocabulaire. Pastilles mono, avec le liseré interne du standard. */}
        <Reveal delay={0.1} className="mt-6">
          <ul aria-label={t.ariaMots} className="flex flex-wrap gap-2">
            {MOTS_CLES.map((mot) => (
              <li
                key={mot}
                className="rounded-full border border-white/[0.14] bg-white/[0.04] px-3.5 py-1.5 font-mono text-[13px] tracking-tight text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
              >
                {mot}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15} className="mt-7">
          <Link
            href={t.href}
            className="group inline-flex items-center gap-1.5 text-sm font-medium transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ color: "var(--cta)" }}
          >
            {t.lien}
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
