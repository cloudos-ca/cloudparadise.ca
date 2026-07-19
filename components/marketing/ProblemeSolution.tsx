"use client";

import { motion, useReducedMotion } from "framer-motion";
import { WindowCard } from "./WindowCard";
import { JobPanel } from "./JobPanel";
import { SHELL } from "./tokens";

/**
 * Rouge d'échec. Hors charte à dessein, et cantonné à la fenêtre de gauche :
 * il ne sert qu'à signifier que ça bloque, jamais à habiller l'interface.
 */
const FAIL = "#e0806f";
const FAIL_BORDER = "rgba(224,106,90,.28)";
const FAIL_MUTED = "#8f7a74";

/** Progression figée : elle n'avance jamais, c'est tout le propos. */
const STUCK_WIDTH = "34%";
const STUCK_LABEL = "34 % · bloqué";

/**
 * Un autre univers que le hero, qui montre déjà un rendu vidéo : la vitrine
 * doit donner à voir que l'app ne fait pas qu'encoder de la vidéo.
 */
const CLOUD_LOGS = [
  "→ lecture de 200 fichiers .docx",
  "→ traduction FR→EN · 200/200",
  "→ archive prête",
] as const;

export function ProblemeSolution() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section className="relative">
      <div className={`${SHELL} py-14 os:py-20`}>
        <p
          className="text-xs font-medium tracking-wide"
          style={{ color: "var(--acc)" }}
        >
          Le problème
        </p>
        <h2 className="mt-3 max-w-[19ch] font-display text-[1.6rem] leading-[1.2] font-bold tracking-tight text-balance text-[#eef4ff] sm:text-3xl os:text-4xl">
          Les tâches lourdes ne devraient pas vous ralentir.
        </h2>

        {/* La scène : ça bloque à gauche, ça aboutit à droite, et le regard
            circule de l'un vers l'autre. `items-stretch` égalise la hauteur des
            deux fenêtres, ce qui aligne les légendes qui les suivent. */}
        <div className="mt-12 flex flex-col items-stretch gap-8 os:flex-row os:gap-4">
          <StuckWindow reduceMotion={reduceMotion} />
          <Flow reduceMotion={reduceMotion} />
          <CloudWindow />
        </div>
      </div>
    </section>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-sm leading-relaxed text-cp-subtle">{children}</p>
  );
}

function StuckWindow({ reduceMotion }: { reduceMotion: boolean }) {
  // En mouvement réduit, la fenêtre gèle sur l'état « bloqué » : aucune boucle.
  const pulse = reduceMotion
    ? {}
    : {
        animate: { opacity: [1, 0.45, 1] },
        transition: {
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <WindowCard
        title="Traitement · votre ordinateur"
        accent={FAIL}
        borderColor={FAIL_BORDER}
        className="flex flex-1 flex-col"
      >
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center gap-3">
            {/* Plus gros que dans une fenêtre saine : c'est le signal « ça rame ». */}
            <motion.span
              aria-hidden="true"
              className="block size-7 shrink-0 rounded-full border-[3px] border-transparent"
              style={{ borderTopColor: FAIL, borderRightColor: FAIL }}
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 0.9, repeat: Infinity, ease: "linear" }
              }
            />
            <p className="text-sm font-medium text-white">Traitement local…</p>
          </div>

          <motion.p
            className="mt-3 text-xs font-medium"
            style={{ color: FAIL }}
            {...pulse}
          >
            {STUCK_LABEL}
          </motion.p>

          {/* Largeur figée, seule l'opacité respire : le job n'avance pas. */}
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full"
              style={{ width: STUCK_WIDTH, background: FAIL }}
              {...pulse}
            />
          </div>

          <p
            className="mt-3 font-mono text-[11px]"
            style={{ color: FAIL_MUTED }}
          >
            <span aria-hidden="true">⚠</span> le ventilateur s’emballe · CPU 98°
          </p>
        </div>
      </WindowCard>

      <Caption>
        Ça plante sur les gros fichiers, il faut tout installer, et vous
        attendez, immobilisé.
      </Caption>
    </div>
  );
}

function Flow({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div
      className="flex shrink-0 flex-col items-center justify-center gap-2 os:w-36 os:self-start os:pt-16"
      aria-hidden="true"
    >
      {/* Empilé, la scène se lit de haut en bas : les chevrons pivotent. */}
      <div className="flex rotate-90 gap-1 os:rotate-0">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="text-3xl leading-none"
            style={{ color: "var(--acc)" }}
            animate={
              reduceMotion
                ? { opacity: 0.8 }
                : { opacity: [0.15, 1, 0.15], x: [-5, 5, -5] }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.18,
                  }
            }
          >
            ›
          </motion.span>
        ))}
      </div>
      <p
        className="text-center text-xs leading-snug font-medium text-balance"
        style={{ color: "var(--soft)" }}
      >
        Cloud Paradise s’en charge
      </p>
    </div>
  );
}

function CloudWindow() {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <WindowCard
        title="Plans · Cloud Paradise"
        className="flex flex-1 flex-col"
      >
        <JobPanel
          title="Traduire 200 contrats"
          chip="DOCUMENTS"
          logs={CLOUD_LOGS}
        />
      </WindowCard>

      <Caption>
        Aucune installation. Vous décrivez, l’IA lance le calcul dans le cloud,
        c’est terminé.
      </Caption>
    </div>
  );
}
