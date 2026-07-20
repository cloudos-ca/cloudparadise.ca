"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeOffre } from "./BadgeOffre";
import { BoutonCta } from "./BoutonCta";
import { WindowCard } from "./WindowCard";
import type { Lang } from "./tokens";

const TAGLINE = {
  fr: { ligne1: "Décrivez la tâche.", ligne2: "On s’occupe du calcul." },
  en: { ligne1: "Describe the task.", ligne2: "We handle the compute." },
} as const;

/** Jaune de marque. Constante, jamais dérivée de l'accent : le halo ne bouge pas. */
const HALO = "#edbe54";

type FenetreCtaProps = {
  /** Phrase sous le titre. Le titre, lui, est le même partout : c'est la signature. */
  soustitre: ReactNode;
  bouton: { href: string; libelle: string };
  lien: { href: string; libelle: string };
  children?: ReactNode;
  /**
   * Badge d'offre au-dessus du bouton. À couper si la page a déjà annoncé
   * l'offre juste au-dessus — deux fois, elle cesse d'être une nouvelle.
   */
  badge?: boolean;
  /** Passé au badge : évite de redire « sans carte » si les puces le disent. */
  badgeSansCarte?: boolean;
  /**
   * Cadrage du bloc. Centré par défaut, comme sur la landing ; la page /tarifs
   * le cale à gauche pour suivre l'alignement du reste de la page.
   */
  className?: string;
  lang?: Lang;
};

/**
 * Le closer du site : une fenêtre du bureau posée sur sa propre lueur.
 *
 * Partagé par la landing et la page /tarifs — même objet, pas deux variantes.
 * Ce qui le distingue des autres fenêtres tient à la lueur derrière lui, jamais
 * à un cadre supplémentaire : un bandeau encadré ferait retomber la page dans
 * le générique qu'on cherche justement à éviter.
 */
export function FenetreCta({
  soustitre,
  bouton,
  lien,
  children,
  badge = true,
  badgeSansCarte = true,
  className = "mx-auto max-w-[640px]",
  lang = "fr",
}: FenetreCtaProps) {
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
    <div className={`relative ${className}`}>
      {/* La lueur vit sur le fond de page, derrière la fenêtre : c'est ce qui
          met le closer en avant, sans lui ajouter de cadre. */}
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
              {TAGLINE[lang].ligne1}
              <br />
              <span data-cp-accent style={{ color: "var(--soft)" }}>
                {TAGLINE[lang].ligne2}
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-[46ch] text-sm leading-relaxed text-cp-subtle">
              {soustitre}
            </p>

            {badge ? (
              <BadgeOffre className="mt-6" sansCarte={badgeSansCarte} lang={lang} />
            ) : null}

            <div className="mt-5 flex flex-col items-center gap-3">
              <BoutonCta href={bouton.href} taille="lg">
                {bouton.libelle}
              </BoutonCta>
              <a
                href={lien.href}
                className="text-xs text-cp-subtle underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {lien.libelle}
              </a>
            </div>

            {children}
          </div>
        </WindowCard>
      </motion.div>
    </div>
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
        <ellipse cx="60" cy="17" rx="52" ry="12" stroke={HALO} strokeWidth="7" />
      </svg>
    </span>
  );
}
