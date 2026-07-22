"use client";

import { motion, useReducedMotion } from "framer-motion";
import { WindowCard } from "./WindowCard";
import { WallpaperPicker } from "./WallpaperPicker";
import { JobPanel } from "./JobPanel";
import { BadgeOffre } from "./BadgeOffre";
import { BoutonCta } from "./BoutonCta";
import { DemoVideo } from "./DemoVideo";
import { SECTION_Y, SHELL, SOFT_WASH, type Lang } from "./tokens";

const JOB_LOGS = {
  fr: [
    "→ Analyse du projet — 1 842 images détectées",
    "→ Attribution de 8 GPU · mode MEDIA",
    "→ Encodage H.265 — 1 842/1 842 images",
  ],
  en: [
    "→ Analyzing project — 1,842 images found",
    "→ Assigning 8 GPUs · MEDIA mode",
    "→ Encoding H.265 — 1,842/1,842 images",
  ],
} as const;

const FOLDERS = {
  fr: ["Vidéos", "Blender", "Documents"],
  en: ["Videos", "Blender", "Documents"],
} as const;

const TEXTES = {
  fr: {
    eyebrow: "Un bureau à votre image",
    titreLigne1: "Décrivez la tâche.",
    titreLigne2: "On s’occupe du calcul.",
    texte:
      "Déposez vos fichiers, dites ce que vous voulez en mots simples. L’IA choisit le bon mode et lance le calcul dans le cloud. Vous n’avez qu’à récupérer le résultat.",
    cta: "Commencer gratuitement",
  },
  en: {
    eyebrow: "A desktop, your way",
    titreLigne1: "Describe the task.",
    titreLigne2: "We handle the compute.",
    texte:
      "Drop your files, say what you want in plain words. The AI picks the right mode and runs the job in the cloud. You just grab the result.",
    cta: "Start for free",
  },
} as const;

export function Hero({ lang = "fr" }: { lang?: Lang }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative">
      {/* Hauteur dictée par le contenu : le padding fait respirer, sans étirer
          le bloc jusqu'en bas de l'écran. */}
      <div
        className={`${SHELL} ${SECTION_Y} grid gap-12 os:grid-cols-[46fr_54fr] os:items-start os:gap-10`}
      >
        {/* Le sélecteur vit dans la colonne texte : sous les boutons en empilé,
            sous la trust line en deux colonnes. */}
        <Copy lang={lang} />
        <Desktop reduceMotion={Boolean(reduceMotion)} lang={lang} />
      </div>
    </section>
  );
}

function Copy({ lang }: { lang: Lang }) {
  const t = TEXTES[lang];
  return (
    <div className="max-w-xl">
      <span
        data-cp-accent
        className="inline-block rounded-full px-3 py-1 text-xs font-medium"
        style={{ background: SOFT_WASH, color: "var(--soft)" }}
      >
        {t.eyebrow}
      </span>

      <h1 className="mt-5 font-display text-[1.75rem] leading-[1.15] font-bold tracking-tight text-white sm:text-4xl os:text-5xl">
        {t.titreLigne1}
        <br />
        <span data-cp-accent style={{ color: "var(--soft)" }}>
          {t.titreLigne2}
        </span>
      </h1>

      <p className="mt-5 text-base leading-relaxed text-cp-subtle">
        {t.texte}
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <BoutonCta
          href="https://app.cloudparadise.cloud/register"
          taille="lg"
        >
          {t.cta}
        </BoutonCta>
        <DemoVideo lang={lang} />
      </div>

      {/* L'offre juste sous le bouton, en or dilué : elle appuie le CTA au
          lieu de s'excuser en gris trois tailles plus bas. */}
      <BadgeOffre className="mt-5" lang={lang} />

      <WallpaperPicker lang={lang} />
    </div>
  );
}

function Desktop({
  reduceMotion,
  lang,
}: {
  reduceMotion: boolean;
  lang: Lang;
}) {
  const float = (distance: number, duration: number) =>
    reduceMotion
      ? undefined
      : {
          animate: { y: [0, distance, 0] },
          transition: {
            duration,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };

  const back = float(-7, 7);
  const front = float(7, 8);

  // Le bloc s'aligne sur le haut de la colonne texte et reste calé à gauche de
  // sa colonne : les fenêtres ne partent jamais toucher le bord droit.
  return (
    <div className="relative mx-auto w-full max-w-[480px] os:mt-1 os:max-w-[520px]">
      <motion.div {...back} className="ml-auto w-[62%]" aria-hidden="true">
        <WindowCard title={lang === "en" ? "Files" : "Fichiers"}>
          {/* Le padding bas absorbe le recouvrement de la fenêtre de devant :
              c'est le vide qui passe dessous, jamais la dernière ligne. */}
          <ul className="space-y-1.5 p-3 pb-10">
            {FOLDERS[lang].map((name) => (
              <li
                key={name}
                className="flex items-center gap-2 text-xs text-white/70"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-4 shrink-0 text-white/35"
                  fill="currentColor"
                >
                  <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h4l2 2h9A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z" />
                </svg>
                {name}
              </li>
            ))}
          </ul>
        </WindowCard>
      </motion.div>

      <motion.div {...front} className="relative z-10 -mt-8 w-[92%]">
        <WindowCard title="Plans · Cloud Paradise">
          <JobPanel
            title={lang === "en" ? "Render a 4K video" : "Rendre une vidéo 4K"}
            chip="MEDIA"
            logs={JOB_LOGS[lang]}
            lang={lang}
          />
        </WindowCard>
      </motion.div>
    </div>
  );
}
