"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import Image from "next/image";
import { useBoucleActive } from "./useBoucleActive";
import { BadgeOffre } from "./BadgeOffre";
import { BoutonCta } from "./BoutonCta";
import { WindowCard } from "./WindowCard";
import type { Lang } from "./tokens";

const TAGLINE = {
  fr: { ligne1: "Décrivez la tâche.", ligne2: "On s’occupe du calcul." },
  en: { ligne1: "Describe the task.", ligne2: "We handle the compute." },
} as const;

type FenetreCtaProps = Readonly<{
  /** Phrase sous le titre. Le titre, lui, est le même partout : c'est la signature. */
  soustitre: ReactNode;
  bouton: { href: string; libelle: string };
  /** Lien secondaire sous le bouton. Optionnel : une page à sortie unique
   *  (ex. /securite) n'en met pas. */
  lien?: { href: string; libelle: string };
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
}>;

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
  const cadre = useRef<HTMLDivElement>(null);
  // Ce composant clôt une vingtaine de pages : sans garde, sa boucle tourne
  // pour chaque visiteur qui ne descend jamais jusqu'ici. Le respect de
  // `prefers-reduced-motion` est dans la règle CSS (`.cp-flotte`), plus dans
  // une branche ici — voir JobPanel.
  const anime = useBoucleActive(cadre);

  return (
    <div className={`relative ${className}`} ref={cadre} data-anime={anime ? "true" : "false"}>
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

      <div
        className="cp-flotte rounded-xl shadow-[0_40px_90px_-30px_rgba(0,0,0,.85)]"
        style={{ ["--flotte-distance" as string]: "-6px", ["--flotte-duree" as string]: "9s" }}
      >
        <WindowCard title="Cloud Paradise">
          <div className="px-6 py-10 text-center os:px-10">
            <Halo />

            <h2 className="mt-6 font-display text-[1.6rem] leading-[1.15] font-extrabold tracking-tight text-white sm:text-3xl">
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
              {lien ? (
                <a
                  href={lien.href}
                  data-cp-accent
                  className="text-xs text-cp-subtle underline-offset-4 hover:text-[var(--acc-text)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {lien.libelle}
                </a>
              ) : null}
            </div>

            {children}
          </div>
        </WindowCard>
      </div>
    </div>
  );
}

/**
 * Le logo, seul, en clôture de page.
 *
 * Contrairement au reste de la fenêtre, sa couleur est écrite en dur (fichier
 * SVG) : aucun thème ne doit l'atteindre.
 */
function Halo() {
  return (
    <span
      aria-hidden="true"
      className="relative mx-auto block h-16 aspect-[401/295]"
    >
      <Image
        src="/brand/logo-blanc-et-jaune.svg"
        alt=""
        width={401}
        height={295}
        className="relative h-full w-auto"
      />
    </span>
  );
}
