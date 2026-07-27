"use client";

import { motion, useReducedMotion } from "framer-motion";
import { IconBolt, IconDownload, IconMessage, IconUpload } from "./icons";
import { Reveal } from "./Reveal";
import { SECTION_Y, SHELL, type Lang } from "./tokens";

/** Durée d'un tour complet de l'impulsion, de l'étape 1 à l'étape 4. */
const CYCLE = 3.4;
/** Temps d'illumination d'un rond au passage de l'impulsion. */
const FLASH = 0.8;

const STEPS = {
  fr: [
    {
      Icone: IconUpload,
      title: "Déposez",
      text: "Glissez vos fichiers ou importez depuis une URL.",
    },
    {
      Icone: IconMessage,
      title: "Décrivez",
      text: "Dites ce que vous voulez. L’IA planifie et choisit le mode.",
    },
    {
      Icone: IconBolt,
      title: "On exécute",
      text: "Le calcul tourne sur nos nœuds spécialisés.",
    },
    {
      Icone: IconDownload,
      title: "Récupérez",
      text: "Votre résultat, prêt à télécharger.",
    },
  ],
  en: [
    {
      Icone: IconUpload,
      title: "Upload",
      text: "Drag in your files or import from a URL.",
    },
    {
      Icone: IconMessage,
      title: "Describe",
      text: "Say what you want. The AI plans it and picks the mode.",
    },
    {
      Icone: IconBolt,
      title: "We run it",
      text: "The job runs on our specialized nodes.",
    },
    {
      Icone: IconDownload,
      title: "Get it back",
      text: "Your result, ready to download.",
    },
  ],
} as const;

const TEXTES = {
  fr: { eyebrow: "Comment ça marche", titre: "Quatre étapes. Zéro configuration." },
  en: { eyebrow: "How it works", titre: "Four steps. Zero setup." },
} as const;

export function CommentCaMarche({ lang = "fr" }: { lang?: Lang }) {
  const reduceMotion = Boolean(useReducedMotion());
  const t = TEXTES[lang];
  const steps = STEPS[lang];

  return (
    // Cible de « Voir la démo », depuis le hero : cette section est la
    // démonstration du parcours. L'ancre pointait jusqu'ici dans le vide.
    <section id="demo" className="relative scroll-mt-20">
      {/* Troisième amorce volontairement différente : les deux sections
          précédentes ouvrent à gauche, celle-ci est centrée — ce que sa
          composition symétrique en quatre temps appelle de toute façon. */}
      <div className={`${SHELL} ${SECTION_Y}`}>
        <Reveal>
          <p
            className="text-[13px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: "var(--cta)" }}
          >
            {t.eyebrow}
          </p>
          <h2 className="mt-2 max-w-[20ch] font-display text-[1.6rem] leading-[1.2] font-bold tracking-tight text-balance text-[#eef4ff] sm:text-3xl os:text-4xl">
            {t.titre}
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
                  background: "var(--cta)",
                  boxShadow:
                    "0 0 12px 3px color-mix(in srgb, var(--cta) 55%, transparent)",
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
            {steps.map((step, i) => (
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
                        delay: i * (CYCLE / steps.length),
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
                  <span
                    className="relative"
                    style={{ color: "var(--acc-text)" }}
                  >
                    <step.Icone className="size-5" />
                  </span>
                </span>

                <p className="mt-4 text-sm font-medium text-[#eef4ff]">
                  {step.title}
                </p>
                <p className="mt-1.5 max-w-[24ch] text-xs leading-relaxed text-white/75">
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
