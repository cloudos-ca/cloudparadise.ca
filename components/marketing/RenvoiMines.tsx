import Link from "next/link";
import { Reveal } from "./Reveal";
import { SHELL, type Lang } from "./tokens";

/**
 * Renvoi discret vers /mines — pour le visiteur du secteur, sans détourner
 * l'accueil de son message horizontal. Une bande sobre, pas un second hero.
 */

const TEXTES = {
  fr: {
    lead: "Vous œuvrez dans l’exploration minière ?",
    texte: "Cloud Paradise a été conçu en Abitibi, pour le terrain québécois.",
    lien: "Voir la page Mines",
    href: "/mines",
  },
  en: {
    lead: "Working in mineral exploration?",
    texte: "Cloud Paradise was built in Abitibi, for Québec field conditions.",
    lien: "See the Mining page",
    href: "/en/mines",
  },
} as const;

export function RenvoiMines({ lang = "fr" }: { lang?: Lang }) {
  const t = TEXTES[lang];
  return (
    <section className="relative">
      <div className={`${SHELL} pb-2`}>
        <Reveal>
          <Link
            href={t.href}
            className="group flex flex-col gap-2 rounded-xl border border-white/[0.08] bg-[rgba(27,39,61,.45)] px-6 py-5 transition-colors hover:border-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-sm leading-relaxed text-white/85">
              <span className="font-medium text-[#eef4ff]">{t.lead}</span>{" "}
              {t.texte}
            </p>
            <span
              className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-medium"
              style={{ color: "var(--cta)" }}
            >
              {t.lien}
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
