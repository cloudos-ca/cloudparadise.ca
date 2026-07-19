"use client";

import { motion, useReducedMotion } from "framer-motion";
import { WindowCard } from "./WindowCard";
import { WallpaperPicker } from "./WallpaperPicker";
import { JobPanel } from "./JobPanel";
import { BadgeOffre } from "./BadgeOffre";
import { BoutonCta } from "./BoutonCta";
import { SECTION_Y, SHELL, SOFT_WASH } from "./tokens";

const JOB_LOGS = [
  "→ Analyse du projet — 1 842 images détectées",
  "→ Attribution de 8 GPU · mode MEDIA",
  "→ Encodage H.265 — 1 842/1 842 images",
] as const;

const FOLDERS = ["Vidéos", "Blender", "Documents"] as const;

export function Hero() {
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
        <Copy />
        <Desktop reduceMotion={Boolean(reduceMotion)} />
      </div>
    </section>
  );
}

function Copy() {
  return (
    <div className="max-w-xl">
      <span
        data-cp-accent
        className="inline-block rounded-full px-3 py-1 text-xs font-medium"
        style={{ background: SOFT_WASH, color: "var(--soft)" }}
      >
        Un bureau à votre image
      </span>

      <h1 className="mt-5 font-display text-[1.75rem] leading-[1.15] font-bold tracking-tight text-white sm:text-4xl os:text-5xl">
        Décrivez la tâche.
        <br />
        <span data-cp-accent style={{ color: "var(--soft)" }}>
          On s’occupe du calcul.
        </span>
      </h1>

      <p className="mt-5 text-base leading-relaxed text-cp-subtle">
        Déposez vos fichiers, dites ce que vous voulez en mots simples. L’IA
        choisit le bon mode et lance le calcul dans le cloud. Vous n’avez qu’à
        récupérer le résultat.
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <BoutonCta href="/inscription" taille="lg">
          Commencer gratuitement
        </BoutonCta>
        <a
          href="#demo"
          className="flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-cp-ghost hover:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-3.5"
            fill="currentColor"
          >
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
          Voir la démo
        </a>
      </div>

      {/* L'offre juste sous le bouton, en or dilué : elle appuie le CTA au
          lieu de s'excuser en gris trois tailles plus bas. */}
      <BadgeOffre className="mt-5" />

      <WallpaperPicker />
    </div>
  );
}

function Desktop({ reduceMotion }: { reduceMotion: boolean }) {
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
        <WindowCard title="Fichiers">
          {/* Le padding bas absorbe le recouvrement de la fenêtre de devant :
              c'est le vide qui passe dessous, jamais la dernière ligne. */}
          <ul className="space-y-1.5 p-3 pb-10">
            {FOLDERS.map((name) => (
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
          <JobPanel title="Rendre une vidéo 4K" chip="MEDIA" logs={JOB_LOGS} />
        </WindowCard>
      </motion.div>
    </div>
  );
}
