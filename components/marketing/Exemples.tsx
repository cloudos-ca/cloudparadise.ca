import { Reveal } from "./Reveal";
import { SECTION_Y, SHELL, type Lang } from "./tokens";

/**
 * Ce que les gens lancent — des tâches réelles, une ligne chacune.
 *
 * Volontairement sans carte cliquable ni image : une liste nue rend l'argument
 * plus crédible qu'une vitrine. Le marqueur « → » reprend la grammaire des
 * logs de JobPanel (une tâche qu'on lance). Seuls les chiffres portent l'or —
 * ce sont les ordres de grandeur qui frappent ; le reste est en blanc.
 */

type Segment = { t: string; or?: boolean };

const TEXTES = {
  fr: {
    eyebrow: "Exemples",
    titre: "Ce que les gens lancent.",
    exemples: [
      [{ t: "Traduire " }, { t: "200", or: true }, { t: " contrats .docx d’un coup" }],
      [{ t: "Encoder une vidéo " }, { t: "4K", or: true }, { t: " en H.265 sans bloquer sa machine" }],
      [{ t: "Scraper " }, { t: "10 000", or: true }, { t: " pages et en sortir un tableau" }],
      [{ t: "Transcrire " }, { t: "40 heures", or: true }, { t: " d’entrevues" }],
      [{ t: "Rendre une scène Blender sur " }, { t: "8 GPU", or: true }],
      [{ t: "Interroger " }, { t: "2 Go", or: true }, { t: " de données en SQL" }],
    ] as Segment[][],
  },
  en: {
    eyebrow: "Examples",
    titre: "What people run.",
    exemples: [
      [{ t: "Translate " }, { t: "200", or: true }, { t: " .docx contracts in one go" }],
      [{ t: "Encode a " }, { t: "4K", or: true }, { t: " video to H.265 without locking up your machine" }],
      [{ t: "Scrape " }, { t: "10,000", or: true }, { t: " pages into a table" }],
      [{ t: "Transcribe " }, { t: "40 hours", or: true }, { t: " of interviews" }],
      [{ t: "Render a Blender scene on " }, { t: "8 GPUs", or: true }],
      [{ t: "Query " }, { t: "2 GB", or: true }, { t: " of data with SQL" }],
    ] as Segment[][],
  },
} as const;

export function Exemples({ lang = "fr" }: { lang?: Lang }) {
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
          <h2 className="mt-2 font-display text-[1.6rem] leading-[1.2] font-bold tracking-tight text-balance text-[#eef4ff] sm:text-3xl os:text-4xl">
            {t.titre}
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <ul className="max-w-3xl divide-y divide-white/10 border-y border-white/10">
            {t.exemples.map((segments, i) => (
              <li key={i} className="flex items-baseline gap-3 py-3.5">
                <span
                  aria-hidden="true"
                  className="shrink-0 font-mono text-sm text-white/35"
                >
                  →
                </span>
                <span className="text-[15px] leading-relaxed text-white/90">
                  {segments.map((seg, j) =>
                    seg.or ? (
                      <span
                        key={j}
                        className="font-semibold"
                        style={{ color: "var(--cta)" }}
                      >
                        {seg.t}
                      </span>
                    ) : (
                      <span key={j}>{seg.t}</span>
                    ),
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
