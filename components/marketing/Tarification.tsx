import { CarteForfait } from "./CarteForfait";
import { Reveal } from "./Reveal";
import { ESSAI_JOURS, PALIERS, type Palier } from "./offre";
import { SECTION_Y, SHELL, type Lang } from "./tokens";

const TEXTES = {
  fr: {
    eyebrow: "Tarification",
    titre: "Un forfait fixe, tout inclus.",
    soustitre: `${ESSAI_JOURS} jours d’essai gratuit, sans carte. Ensuite, un abonnement mensuel — deux formats selon votre taille.`,
    parMois: "/mois",
    voirTarifs: "Voir tous les tarifs et les durées",
  },
  en: {
    eyebrow: "Pricing",
    titre: "One flat plan, everything included.",
    soustitre: `${ESSAI_JOURS} days free trial, no card required. After that, a monthly subscription — two sizes depending on your team.`,
    parMois: "/mo",
    voirTarifs: "See all pricing and terms",
  },
} as const;

export function Tarification({ lang = "fr" }: Readonly<{ lang?: Lang }>) {
  const t = TEXTES[lang];
  return (
    // Cible de « Voir les tarifs », depuis le closer.
    <section id="tarifs" className="relative scroll-mt-20">
      <div className={`${SHELL} ${SECTION_Y}`}>
        <Reveal>
          <p
            className="text-[13px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: "var(--cta)" }}
          >
            {t.eyebrow}
          </p>
          <h2 className="mt-2 max-w-[22ch] font-display text-[1.6rem] leading-[1.2] font-extrabold tracking-tight text-balance text-cp-heading sm:text-3xl os:text-4xl">
            {t.titre}
          </h2>
          <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-white/85">
            {t.soustitre}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 grid gap-5 os:grid-cols-2">
          {PALIERS.map((palier) => (
            <CartePalier key={palier.id} palier={palier} lang={lang} suffixe={t.parMois} />
          ))}
        </Reveal>

        <Reveal delay={0.15} className="mt-8">
          <a
            href={lang === "en" ? "/en/pricing#forfaits" : "/tarifs#forfaits"}
            data-cp-accent
            className="inline-flex items-center gap-1.5 text-sm text-cp-subtle underline-offset-4 hover:text-[var(--acc-text)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {t.voirTarifs}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/** L'habillage de carte de l'accueil, autour du cœur partagé `CarteForfait`
 * — prix de base, sans engagement (l'accueil n'a pas de sélecteur de durée). */
function CartePalier({
  palier,
  lang,
  suffixe,
}: Readonly<{ palier: Palier; lang: Lang; suffixe: string }>) {
  return (
    <div
      className="flex flex-col gap-4 rounded-xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors hover:border-white/15"
    >
      <CarteForfait
        palier={palier}
        lang={lang}
        mensuel={palier.prixMensuel}
        suffixe={suffixe}
      />
    </div>
  );
}
