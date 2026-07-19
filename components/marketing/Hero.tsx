"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { WindowCard } from "./WindowCard";
import { WallpaperPicker } from "./WallpaperPicker";
import { DEFAULT_ACC, DEFAULT_SKY, DEFAULT_SOFT } from "./wallpapers";

/** Fond translucide dérivé d'un token, pour puces et badges. */
const softWash = "color-mix(in srgb, var(--soft) 16%, transparent)";

/**
 * Gabarit commun à la barre de menu et aux colonnes.
 *
 * Le châssis (bordures, fond, lueurs) va bien d'un bord à l'autre — c'est un
 * écran. Le contenu, lui, reste borné et centré : sur un 32" le texte et les
 * fenêtres gardent la même composition qu'en 1280, au lieu de se retrouver
 * plaqués aux deux extrémités avec un vide au milieu.
 */
const SHELL = "mx-auto w-full max-w-[1280px] px-6 os:px-10";

const JOB_LOGS = [
  "→ Analyse du projet — 1 842 images détectées",
  "→ Attribution de 8 GPU · mode MEDIA",
  "→ Encodage H.265 — 1 842/1 842 images",
] as const;

const FOLDERS = ["Vidéos", "Blender", "Documents"] as const;

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();

  // Pilote unique : progression, logs et badge sont keyés dessus et redémarrent
  // donc toujours ensemble.
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function handleProgressComplete() {
    if (reduceMotion) return;
    timerRef.current = setTimeout(() => setCycle((c) => c + 1), 1400);
  }

  return (
    // La gouttière passe par la largeur, pas par une marge latérale : `mx-auto`
    // reste ainsi libre de centrer le panneau une fois la largeur max atteinte.
    <section
      ref={rootRef}
      style={
        {
          "--acc": DEFAULT_ACC,
          "--soft": DEFAULT_SOFT,
          "--sky": DEFAULT_SKY,
          "--veil": 0,
        } as React.CSSProperties
      }
      className="relative isolate mx-auto my-3 w-[calc(100%-1.5rem)] max-w-[1600px] overflow-hidden rounded-2xl os:my-6 os:w-[calc(100%-3rem)]"
    >
      {/* Fond : lueur claire en haut à gauche, doublée d'un halo d'accent plus
          profond côté fenêtres — les deux suivent le fond courant. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{
          background: [
            `radial-gradient(620px 320px at 16% 10%, color-mix(in srgb, var(--soft) 26%, transparent), transparent 62%)`,
            `radial-gradient(520px 300px at 78% 78%, color-mix(in srgb, var(--acc) 22%, transparent), transparent 65%)`,
            `var(--sky)`,
          ].join(","),
        }}
      />
      {/* Voile de lisibilité, actif uniquement sur les fonds photo. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-black/35"
        style={{ opacity: "var(--veil)" }}
      />

      <MenuBar />

      {/* Hauteur dictée par le contenu : le padding fait respirer, sans étirer
          le bloc jusqu'en bas de l'écran. */}
      <div
        className={`${SHELL} grid gap-12 py-12 os:grid-cols-[46fr_54fr] os:items-start os:gap-10 os:py-16`}
      >
        {/* Le sélecteur vit dans la colonne texte : sous les boutons en empilé,
            sous la trust line en deux colonnes. Une seule instance, un seul état. */}
        <Copy rootRef={rootRef} />
        <Desktop
          cycle={cycle}
          reduceMotion={Boolean(reduceMotion)}
          onProgressComplete={handleProgressComplete}
        />
      </div>
    </section>
  );
}

function MenuBar() {
  return (
    <div className="border-b border-white/10">
      <div className={`${SHELL} flex items-center justify-between py-3`}>
        {/* Lockup empilé (ratio 1.35) : sous ~28px le mot « cloud » décroche. */}
        <Image
          src="/brand/logo-blanc-et-jaune.png"
          alt="Cloud Paradise"
          width={512}
          height={380}
          className="h-7 w-auto"
          loading="eager"
        />
        <div className="flex items-center gap-4">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-4 text-white/60"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <span className="text-xs tabular-nums text-white/60">14:32</span>
          <span
            data-cp-accent
            className="grid size-6 place-items-center rounded-full"
            style={{ background: softWash }}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-3.5"
              fill="none"
              stroke="var(--soft)"
              strokeWidth="2"
            >
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

function Copy({ rootRef }: { rootRef: React.RefObject<HTMLElement | null> }) {
  return (
    <div className="max-w-xl">
      <span
        data-cp-accent
        className="inline-block rounded-full px-3 py-1 text-xs font-medium"
        style={{ background: softWash, color: "var(--soft)" }}
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

      <div className="mt-7 flex flex-wrap gap-3">
        <a
          href="/inscription"
          data-cp-accent
          className="rounded-lg px-5 py-2.5 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          style={{ background: "var(--acc)" }}
        >
          Commencer gratuitement
        </a>
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

      <p className="mt-4 text-xs text-cp-subtle">
        Crédits offerts à l’inscription · sans carte
      </p>

      <WallpaperPicker targetRef={rootRef} />
    </div>
  );
}

type DesktopProps = {
  cycle: number;
  reduceMotion: boolean;
  onProgressComplete: () => void;
};

function Desktop({ cycle, reduceMotion, onProgressComplete }: DesktopProps) {
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
          <JobPanel
            cycle={cycle}
            reduceMotion={reduceMotion}
            onProgressComplete={onProgressComplete}
          />
        </WindowCard>
      </motion.div>
    </div>
  );
}

function JobPanel({ cycle, reduceMotion, onProgressComplete }: DesktopProps) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-white">Rendre une vidéo 4K</p>
        <span
          data-cp-accent
          className="shrink-0 rounded px-2 py-0.5 text-[10px] font-medium tracking-wide"
          style={{ background: softWash, color: "var(--soft)" }}
        >
          MEDIA
        </span>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          key={`progress-${cycle}`}
          data-cp-accent
          className="h-full rounded-full"
          style={{ background: "var(--acc)" }}
          initial={{ width: reduceMotion ? "100%" : "12%" }}
          animate={{ width: "100%" }}
          transition={{ duration: reduceMotion ? 0 : 3, ease: "easeInOut" }}
          onAnimationComplete={onProgressComplete}
        />
      </div>

      <div className="mt-3 space-y-1">
        {JOB_LOGS.map((line, i) => (
          <motion.p
            key={`log-${cycle}-${i}`}
            className="font-mono text-[11px] text-cp-log"
            initial={{ opacity: reduceMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: reduceMotion ? 0 : 0.4,
              delay: reduceMotion ? 0 : i * 0.5,
            }}
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.div
        key={`badge-${cycle}`}
        className="mt-3"
        initial={
          reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
        }
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 0.35,
          delay: reduceMotion ? 0 : 2.8,
        }}
      >
        <span
          data-cp-accent
          className="inline-block rounded-md px-2.5 py-1 text-[11px] font-medium"
          style={{ background: softWash, color: "var(--soft)" }}
        >
          Terminé · télécharger
        </span>
      </motion.div>
    </div>
  );
}
