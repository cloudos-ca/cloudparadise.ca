import { Reveal } from "./Reveal";
import { SECTION_Y, SHELL, SOFT_WASH, type Lang } from "./tokens";

/**
 * Le différenciateur central, en clair.
 *
 * L'argument le plus fort du produit et le moins coûteux à démontrer : il
 * suffit de l'énoncer. Réutilisé sur l'accueil, /calcul et /securite — d'où le
 * `lang` et l'absence de dépendance à un contexte de page.
 *
 * Le petit schéma en quatre temps est STATIQUE, volontairement : un flux animé
 * n'expliquerait rien de plus et contredirait la sobriété demandée. Seul le
 * dernier maillon (« résultat exact ») est mis en avant, parce que c'est lui la
 * promesse.
 */

const TEXTES = {
  fr: {
    eyebrow: "La garantie",
    titre: "L’IA choisit la méthode. Un moteur déterministe calcule le résultat exact.",
    texte:
      "L’intelligence artificielle lit votre demande, la planifie et choisit le bon outil. Mais elle ne calcule jamais le résultat elle-même : un moteur déterministe s’en charge et produit une réponse exacte, reproductible, jamais inventée.",
    etapes: ["Votre demande", "L’IA planifie", "Le moteur calcule", "Résultat exact"],
  },
  en: {
    eyebrow: "The guarantee",
    titre: "The AI picks the method. A deterministic engine computes the exact result.",
    texte:
      "The AI reads your request, plans it, and picks the right tool. But it never computes the result itself: a deterministic engine does, producing an exact, reproducible answer — never invented.",
    etapes: ["Your request", "The AI plans", "The engine computes", "Exact result"],
  },
} as const;

export function Determinisme({ lang = "fr" }: { lang?: Lang }) {
  const t = TEXTES[lang];

  return (
    <section className="relative">
      <div className={`${SHELL} ${SECTION_Y}`}>
        <div className="grid items-center gap-10 os:grid-cols-[48fr_52fr] os:gap-14">
          <Reveal>
            <p
              className="text-xs font-medium tracking-wide"
              style={{ color: "var(--cta)" }}
            >
              {t.eyebrow}
            </p>
            <h2 className="mt-3 max-w-[20ch] font-display text-[1.55rem] leading-[1.25] font-bold tracking-tight text-balance text-[#eef4ff] sm:text-3xl os:text-[2rem]">
              {t.titre}
            </h2>
            <p className="mt-5 max-w-[52ch] text-sm leading-relaxed text-white/85">
              {t.texte}
            </p>
          </Reveal>

          {/* Le schéma : quatre maillons reliés par des chevrons. Empilé sur
              mobile (chevrons pivotés), en ligne au-delà du seuil. */}
          <Reveal delay={0.1}>
            <ol
              aria-hidden="true"
              className="flex flex-col items-stretch gap-2 os:flex-row os:items-center os:gap-1.5"
            >
              {t.etapes.map((etape, i) => {
                const dernier = i === t.etapes.length - 1;
                return (
                  <li
                    key={etape}
                    className="flex items-center gap-2 os:flex-1 os:flex-col os:gap-2 os:text-center"
                  >
                    <span
                      data-cp-accent
                      className="w-full rounded-lg border px-3 py-2.5 text-[13px] font-medium"
                      style={
                        dernier
                          ? {
                              background: SOFT_WASH,
                              borderColor:
                                "color-mix(in srgb, var(--soft) 30%, transparent)",
                              color: "var(--soft)",
                            }
                          : {
                              background: "rgba(255,255,255,.04)",
                              borderColor: "rgba(255,255,255,.12)",
                              color: "rgba(255,255,255,.85)",
                            }
                      }
                    >
                      {etape}
                    </span>
                    {!dernier && (
                      <span
                        className="rotate-90 text-lg leading-none os:rotate-0"
                        style={{ color: "var(--acc-text)" }}
                      >
                        ›
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
