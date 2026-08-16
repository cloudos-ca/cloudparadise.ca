import { Fragment } from "react";
import { Reveal } from "./Reveal";
import { SECTION_Y, SHELL, type Lang } from "./tokens";

/**
 * Le différenciateur central, en clair.
 *
 * L'argument le plus fort du produit et le moins coûteux à démontrer : il
 * suffit de l'énoncer. Réutilisé sur l'accueil, /calcul et /securite — d'où le
 * `lang` et l'absence de dépendance à un contexte de page.
 *
 * Composition : deux colonnes — en-tête à gauche, chaîne des quatre étapes à
 * droite (comme toutes les sections sans cartes du site). La chaîne porte
 * l'argument : c'est un vrai enchaînement (demande → plan → calcul → résultat),
 * donc les flèches ont un sens, elles ne décorent pas.
 *
 * Le schéma est STATIQUE, volontairement : un flux animé n'expliquerait rien de
 * plus et contredirait la sobriété demandée. Seule la conclusion (« résultat
 * exact ») porte l'or, en texte — c'est l'aboutissement du raisonnement.
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

export function Determinisme({ lang = "fr" }: Readonly<{ lang?: Lang }>) {
  const t = TEXTES[lang];

  return (
    <section className="relative">
      <div className={`${SHELL} ${SECTION_Y}`}>
        {/* Deux colonnes : en-tête à gauche, chaîne à droite — elles se
            répondent au lieu de laisser l'en-tête flotter seul à gauche. */}
        <div className="grid items-center gap-10 os:grid-cols-[2fr_3fr] os:gap-12">
          <Reveal>
            <p
              className="text-[13px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: "var(--cta)" }}
            >
              {t.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-[1.6rem] leading-[1.2] font-bold tracking-tight text-balance text-cp-heading sm:text-3xl os:text-4xl">
              {t.titre}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/85">
              {t.texte}
            </p>
          </Reveal>

          {/* La chaîne, dans la colonne de droite. Empilée sur mobile (chevrons
              pivotés vers le bas), en ligne au-delà du seuil. `items-stretch` +
              `min-h` garantissent quatre boîtes de même hauteur ; les chevrons,
              dans un conteneur étiré à contenu centré, tombent entre les boîtes. */}
          <Reveal delay={0.1}>
            <div
              aria-hidden="true"
              className="flex flex-col items-stretch gap-2.5 sm:flex-row sm:gap-2"
            >
            {t.etapes.map((etape, i) => {
              const conclusion = i === t.etapes.length - 1;
              return (
                <Fragment key={etape}>
                  <div
                    className="flex min-h-[76px] flex-1 items-center justify-center rounded-xl border bg-gradient-to-b from-white/[0.055] to-white/[0.01] px-4 py-4 text-center text-[15px] font-medium"
                    style={
                      conclusion
                        ? {
                            borderColor:
                              "color-mix(in srgb, var(--cta) 42%, transparent)",
                            color: "var(--cta)",
                            // Léger halo doré : la conclusion « rayonne » sans
                            // fond plein.
                            boxShadow:
                              "inset 0 1px 0 rgba(255,255,255,.08), 0 0 24px -8px color-mix(in srgb, var(--cta) 45%, transparent)",
                          }
                        : {
                            borderColor: "rgba(255,255,255,.12)",
                            color: "rgba(255,255,255,.88)",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,.06)",
                          }
                    }
                  >
                    {etape}
                  </div>
                  {!conclusion && (
                    <div className="flex shrink-0 items-center justify-center">
                      <span
                        className="rotate-90 text-base leading-none sm:rotate-0"
                        style={{ color: "var(--cta)", opacity: 0.6 }}
                      >
                        ›
                      </span>
                    </div>
                  )}
                </Fragment>
              );
            })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
