"use client";

import { useEffect, useState } from "react";
import { SHELL, type Lang } from "./tokens";

/**
 * Barre d'ancres d'une page à sections (/plateforme, /calcul…) : des liens de
 * saut, non collants, dont l'ancre de la section courante passe en or.
 *
 * Seul composant client de ces pages : l'état actif suit le défilement via
 * `IntersectionObserver` (la page, qui exporte `metadata`, reste serveur, donc
 * cette logique ne peut pas y vivre). Le défilement doux est porté par le CSS
 * global, qui respecte déjà `prefers-reduced-motion`. Repli : sans observateur,
 * les liens restent de simples ancres, la première étant marquée active.
 *
 * `ancres` est fourni par la page (référence stable, définie au module) — c'est
 * ce qui rend la barre réutilisable d'une page à l'autre sans la dupliquer.
 */

export type Ancre = { id: string; libelle: { fr: string; en: string } };

/**
 * Deux dispositions, une seule logique.
 *
 * `barre` : la bande horizontale d'origine, sur toute la largeur de `SHELL`.
 * `colonne` : un sommaire vertical posé dans une colonne latérale, collant au
 * défilement à partir de `lg`. Les pages juridiques comptent une vingtaine de
 * sections, ce qu'une bande horizontale ne peut pas porter ; l'observateur, la
 * marque de section active et le repli sans `IntersectionObserver` sont
 * strictement les mêmes.
 */
type Disposition = "barre" | "colonne";

export function AncresSections({
  ancres,
  lang = "fr",
  disposition = "barre",
  titre,
}: Readonly<{
  ancres: readonly Ancre[];
  lang?: Lang;
  disposition?: Disposition;
  /** Intitulé visible, en disposition `colonne` uniquement. */
  titre?: string;
}>) {
  const [actif, setActif] = useState<string>(ancres[0]?.id ?? "");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const cibles = ancres
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (cibles.length === 0) return;
    // La bande morte haute/basse fait qu'une section n'est « active » qu'une
    // fois bien entrée dans le viewport, pas dès qu'elle l'effleure.
    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const e of entrees) if (e.isIntersecting) setActif(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    cibles.forEach((c) => observateur.observe(c));
    return () => observateur.disconnect();
  }, [ancres]);

  const etiquette = lang === "en" ? "Page sections" : "Sections de la page";

  if (disposition === "colonne") {
    return (
      <nav
        aria-label={etiquette}
        // `top-28` dégage la barre de menu collante (78px). La hauteur est
        // bornée et le débordement rendu défilable : une vingtaine de sections
        // dépassent l'écran, et un sommaire collant plus haut que le viewport
        // ne colle plus à rien.
        className="lg:sticky lg:top-28 lg:max-h-[calc(100svh-9rem)] lg:overflow-y-auto"
      >
        {titre ? (
          <p className="text-[11px] font-semibold tracking-[0.12em] text-white/45 uppercase">
            {titre}
          </p>
        ) : null}
        {/* Le filet vertical tient lieu de repère de progression : le lien
            actif épaissit son propre segment, ce qui situe la lecture dans le
            document sans ajouter d'indicateur séparé. */}
        <ul className="mt-3 border-l border-white/10">
          {ancres.map(({ id, libelle }) => {
            const estActif = actif === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={estActif ? "true" : undefined}
                  className="-ml-px block border-l-2 py-1.5 pl-3.5 text-[13px] leading-snug transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    color: estActif ? "var(--cta)" : "rgba(255,255,255,.6)",
                    borderColor: estActif ? "var(--cta)" : "transparent",
                    // Posée en ligne, pas par `outline-white` : l'utilitaire ne
                    // prend pas et la bordure de focus retombait sur
                    // `currentColor`, soit du blanc à 60 % sur un lien inactif.
                    // Sur un sommaire de vingt entrées, il faut voir sans
                    // hésiter où on se trouve.
                    outlineColor: "#ffffff",
                  }}
                >
                  {libelle[lang]}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <nav aria-label={etiquette} className={SHELL}>
      <ul className="flex flex-wrap gap-x-6 gap-y-2 border-y border-white/10 py-3.5">
        {ancres.map(({ id, libelle }) => {
          const estActif = actif === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={estActif ? "true" : undefined}
                className="text-sm font-medium transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                style={{
                  color: estActif ? "var(--cta)" : "rgba(255,255,255,.6)",
                }}
              >
                {libelle[lang]}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
