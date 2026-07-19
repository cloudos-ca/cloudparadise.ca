"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SECTION_Y, SHELL } from "./tokens";

/** Durée d'un tour complet de l'impulsion, de l'étape 1 à l'étape 4. */
const CYCLE = 3.4;
/** Temps d'illumination d'un rond au passage de l'impulsion. */
const FLASH = 0.8;

/**
 * Glyphes repris de Tabler (upload, message-2, bolt, download), tracés en
 * inline : le projet n'embarque aucune librairie d'icônes et quatre symboles
 * ne justifient pas une dépendance.
 */
const ICONS: Record<string, ReactNode> = {
  upload: (
    <>
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
      <path d="M7 9l5-5l5 5" />
      <path d="M12 4v12" />
    </>
  ),
  message: (
    <>
      <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5l-5 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z" />
      <path d="M8 9h8" />
      <path d="M8 13h6" />
    </>
  ),
  bolt: <path d="M13 3v7h6l-8 11v-7H5l8-11" />,
  download: (
    <>
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
      <path d="M7 11l5 5l5-5" />
      <path d="M12 4v12" />
    </>
  ),
};

const STEPS = [
  {
    icon: "upload",
    title: "Déposez",
    text: "Glissez vos fichiers ou importez depuis une URL.",
  },
  {
    icon: "message",
    title: "Décrivez",
    text: "Dites ce que vous voulez. L’IA planifie et choisit le mode.",
  },
  {
    icon: "bolt",
    title: "On exécute",
    text: "Le calcul tourne sur nos nœuds spécialisés.",
  },
  {
    icon: "download",
    title: "Récupérez",
    text: "Votre résultat, prêt à télécharger.",
  },
] as const;

export function CommentCaMarche() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section className="relative">
      {/* Troisième amorce volontairement différente : les deux sections
          précédentes ouvrent à gauche, celle-ci est centrée — ce que sa
          composition symétrique en quatre temps appelle de toute façon. */}
      <div className={`${SHELL} ${SECTION_Y} text-center`}>
        <Reveal>
          <p
            className="text-xs font-medium tracking-wide"
            style={{ color: "var(--acc)" }}
          >
            Comment ça marche
          </p>
          <h2 className="mx-auto mt-3 max-w-[20ch] font-display text-[1.6rem] leading-[1.2] font-bold tracking-tight text-balance text-[#eef4ff] sm:text-3xl os:text-4xl">
            Quatre étapes. Zéro configuration.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="relative mt-10">
          {/* Le rail relie les centres des ronds et passe derrière eux. Il n'a
              de sens qu'en ligne : empilé, les colonnes ne sont plus côte à côte. */}
          <div className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-0.5 bg-white/10 os:block">
            {!reduceMotion && (
              <motion.span
                aria-hidden="true"
                className="absolute top-1/2 block size-2 -translate-y-1/2 rounded-full"
                style={{
                  background: "var(--acc)",
                  boxShadow:
                    "0 0 12px 3px color-mix(in srgb, var(--acc) 55%, transparent)",
                }}
                initial={{ left: "0%" }}
                animate={{ left: "100%" }}
                transition={{
                  duration: CYCLE,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
          </div>

          <ol className="relative grid gap-10 os:grid-cols-4 os:gap-6">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="flex flex-col items-center text-center"
              >
                <span className="relative grid size-12 shrink-0 place-items-center rounded-full">
                  {/* Halo séparé : on n'anime que son opacité, car framer-motion
                      n'interpole pas une box-shadow écrite en color-mix(). */}
                  {!reduceMotion && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full"
                      style={{
                        boxShadow:
                          "0 0 20px 5px color-mix(in srgb, var(--acc) 22%, transparent)",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{
                        duration: FLASH,
                        repeat: Infinity,
                        repeatDelay: CYCLE - FLASH,
                        delay: i * (CYCLE / STEPS.length),
                        ease: "easeInOut",
                      }}
                    />
                  )}
                  <span
                    data-cp-accent
                    className="absolute inset-0 rounded-full border"
                    style={{
                      background:
                        "color-mix(in srgb, var(--acc) 15%, transparent)",
                      borderColor:
                        "color-mix(in srgb, var(--acc) 35%, transparent)",
                    }}
                  />
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="relative size-5"
                    fill="none"
                    stroke="var(--acc)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {ICONS[step.icon]}
                  </svg>
                </span>

                <p className="mt-4 text-sm font-medium text-[#eef4ff]">
                  {step.title}
                </p>
                <p className="mt-1.5 max-w-[24ch] text-xs leading-relaxed text-[#93a3c2]">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
