"use client";

import { motion, useReducedMotion } from "framer-motion";
import { WindowCard } from "./WindowCard";
import { JobPanel } from "./JobPanel";
import { BadgeOffre } from "./BadgeOffre";
import { BoutonCta } from "./BoutonCta";
import { libelleDe } from "./offre";
import { SECTION_Y, SHELL, type Lang } from "./tokens";
import { LIEN_INSCRIPTION } from "@/lib/site";

const JOB_LOGS = {
  fr: [
    "→ Analyse du projet — 1 842 images détectées",
    "→ Répartition en 12 segments",
    "→ Encodage H.265 — 1 842/1 842 images",
  ],
  en: [
    "→ Analyzing project — 1,842 images found",
    "→ Splitting into 12 segments",
    "→ Encoding H.265 — 1,842/1,842 images",
  ],
} as const;

const FOLDERS = {
  fr: ["Vidéos", "Blender", "Documents"],
  en: ["Videos", "Blender", "Documents"],
} as const;

const TEXTES = {
  fr: {
    titreLigne1: "Décrivez la tâche.",
    titreLigne2: "On s’occupe du calcul.",
    texte:
      "Votre poste de travail cloud : calcul lourd en langage humain, applications professionnelles et collaboration d’équipe. Décrivez ce que vous voulez, on s’occupe du reste — sans rien installer.",
    cta: "Commencer gratuitement",
  },
  en: {
    titreLigne1: "Describe the task.",
    titreLigne2: "We handle the compute.",
    texte:
      "Your cloud workstation: heavy compute in plain language, professional software and team collaboration. Say what you want, we handle the rest — nothing to install.",
    cta: "Start for free",
  },
} as const;

export function Hero({ lang = "fr" }: Readonly<{ lang?: Lang }>) {
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

function Copy({ lang }: Readonly<{ lang: Lang }>) {
  const t = TEXTES[lang];
  return (
    <div className="max-w-xl">
      <h1 className="font-display text-[2rem] leading-[1.08] font-bold tracking-[-0.02em] text-white sm:text-[2.9rem] os:text-[3.5rem]">
        {t.titreLigne1}
        <br />
        <span data-cp-accent style={{ color: "var(--soft)" }}>
          {t.titreLigne2}
        </span>
      </h1>

      <p className="mt-6 text-[17px] leading-relaxed text-white/85">
        {t.texte}
      </p>

      {/* Un seul CTA : « Voir la démo » est retiré tant qu'une capture animée
          à jour n'existe pas (le composant DemoVideo et la vidéo publique
          restent en place, hors rendu). */}
      <div className="mt-7">
        <BoutonCta
          href={LIEN_INSCRIPTION}
          taille="lg"
        >
          {t.cta}
        </BoutonCta>
      </div>

      {/* L'offre juste sous le bouton, en or dilué : elle appuie le CTA au
          lieu de s'excuser en gris trois tailles plus bas. */}
      <BadgeOffre className="mt-5" lang={lang} />
    </div>
  );
}

function Desktop({
  reduceMotion,
  lang,
}: Readonly<{
  reduceMotion: boolean;
  lang: Lang;
}>) {
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
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="size-4 shrink-0 text-white/55"
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
            // Dérivé d'`offre.ts` : le littéral « MÉDIA » s'affichait avec
            // son accent français sur la page d'accueil anglaise, où le
            // mode s'appelle « Media ».
            chip={libelleDe("Média", lang).toUpperCase()}
            logs={JOB_LOGS[lang]}
            lang={lang}
          />
        </WindowCard>
      </motion.div>
    </div>
  );
}
