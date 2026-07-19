"use client";

import { motion, useReducedMotion } from "framer-motion";
import { WindowCard } from "./WindowCard";
import { Reveal } from "./Reveal";
import { IconCheck } from "./icons";
import { OFFRE_EN_DEVISE } from "./offre";
import { SECTION_Y, SHELL } from "./tokens";

/** Jaune de marque. Constante, jamais dérivée de l'accent : le halo ne bouge pas. */
const HALO = "#edbe54";

const PROMESSES = [
  "Crédits offerts",
  "Sans carte requise",
  "Sans abonnement",
] as const;

/**
 * Le closer : une dernière fenêtre du bureau.
 *
 * Pas un bandeau encadré posé par-dessus la page — la landing referme sur le
 * même objet qu'elle a ouvert. Ce qui la distingue des autres fenêtres tient à
 * la lueur derrière elle, pas à un cadre de plus.
 */
export function CtaFinal() {
  const reduceMotion = Boolean(useReducedMotion());

  const flottement = reduceMotion
    ? {}
    : {
        animate: { y: [0, -6, 0] },
        transition: {
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  return (
    // La lueur déborde volontairement de la fenêtre ; sans ce clip horizontal
    // elle poussait la page hors cadre sur petit écran.
    <section className="relative overflow-x-clip">
      <div className={`${SHELL} ${SECTION_Y}`}>
        <Reveal>
          <div className="relative mx-auto max-w-[560px]">
            {/* La lueur vit sur le fond de page, derrière la fenêtre : c'est ce
                qui met le closer en avant, sans lui ajouter de cadre. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-16 -inset-y-10 -z-10"
              style={{
                background:
                  "radial-gradient(60% 55% at 50% 45%, color-mix(in srgb, var(--acc) 22%, transparent), transparent 70%)",
              }}
            />

            <motion.div
              {...flottement}
              className="rounded-xl shadow-[0_40px_90px_-30px_rgba(0,0,0,.85)]"
            >
              <WindowCard title="Cloud Paradise">
                <div className="px-6 py-10 text-center os:px-10">
                  <Halo reduceMotion={reduceMotion} />

                  <h2 className="mt-6 font-display text-[1.6rem] leading-[1.15] font-bold tracking-tight text-white sm:text-3xl">
                    Décrivez la tâche.
                    <br />
                    <span data-cp-accent style={{ color: "var(--soft)" }}>
                      On s’occupe du calcul.
                    </span>
                  </h2>

                  <p className="mx-auto mt-4 max-w-[46ch] text-sm leading-relaxed text-cp-subtle">
                    Créez votre compte, recevez {OFFRE_EN_DEVISE} de crédits
                    offerts, lancez votre première tâche aujourd’hui.
                  </p>

                  <div className="mt-7 flex flex-col items-center gap-3">
                    <a
                      href="/inscription"
                      data-cp-accent
                      className="rounded-lg px-6 py-3 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      style={{ background: "var(--acc)" }}
                    >
                      Commencer gratuitement
                    </a>
                    <a
                      href="#tarifs"
                      className="text-xs text-cp-subtle underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Voir les tarifs
                    </a>
                  </div>

                  <ul className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2.5">
                    {PROMESSES.map((promesse) => (
                      <li
                        key={promesse}
                        className="flex items-center gap-1.5 text-xs text-[#93a3c2]"
                      >
                        <span data-cp-accent style={{ color: "var(--soft)" }}>
                          <IconCheck className="size-3.5" />
                        </span>
                        {promesse}
                      </li>
                    ))}
                  </ul>
                </div>
              </WindowCard>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * L'anneau de marque, seul.
 *
 * Le logo complet vit déjà dans la barre de menu et dans le pied de page ; le
 * redonner ici ferait trois signatures. Le halo suffit à signer la fin de page.
 * Sa couleur est écrite en dur : aucun thème ne doit l'atteindre.
 */
function Halo({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <span aria-hidden="true" className="relative mx-auto block h-6 w-[104px]">
      {/* Le souffle lumineux, séparé de l'anneau : on n'anime qu'une opacité. */}
      {!reduceMotion && (
        <motion.span
          className="absolute inset-0 rounded-[50%]"
          style={{ boxShadow: `0 0 26px 6px ${HALO}40` }}
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <svg
        viewBox="0 0 120 34"
        className="relative h-full w-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <ellipse
          cx="60"
          cy="17"
          rx="52"
          ry="12"
          stroke={HALO}
          strokeWidth="7"
        />
      </svg>
    </span>
  );
}
