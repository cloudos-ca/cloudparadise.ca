"use client";

import type { ReactNode } from "react";

export type Univers = {
  id: string;
  /** Nom affiché dans la barre de titre. */
  nom: string;
  titre: string;
  description: string;
  /** Tâche concrète, sans nommer de métier : on ne catalogue pas le visiteur. */
  exemple: string;
  modes: readonly string[];
  /** Couleur d'identité, catégorielle et fixe. */
  couleur: string;
  href: string;
  icone: ReactNode;
  /** Aperçu du résultat — stand-in CSS, voir MediaSlot. */
  apercu: ReactNode;
};

/**
 * Emplacement du résultat en vedette.
 *
 * TODO média — ce bloc est un STAND-IN en CSS. Il doit être remplacé par le
 * vrai résultat de chaque univers : `next/image` pour une capture, ou une
 * balise vidéo en autoplay/muted/loop pour une démo animée. Conserver la
 * hauteur (h-28) et le fond sombre pour que la grille ne bouge pas au swap.
 */
function MediaSlot({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="relative h-28 overflow-hidden bg-black/15"
      data-media-slot
    >
      {children}
    </div>
  );
}

export function UniversCard({ univers }: { univers: Univers }) {
  const {
    nom,
    titre,
    description,
    exemple,
    modes,
    couleur,
    href,
    icone,
    apercu,
  } = univers;

  return (
    <a
      href={href}
      style={{ ["--u" as string]: couleur }}
      className="group block rounded-xl border border-white/10 bg-[rgba(27,39,61,.9)] shadow-2xl shadow-black/40 backdrop-blur-sm transition duration-200 hover:-translate-y-1 hover:border-[var(--u)] focus-visible:-translate-y-1 focus-visible:border-[var(--u)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--u)] motion-reduce:transform-none motion-reduce:transition-none"
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span
            className="size-2.5 rounded-full"
            style={{ background: "var(--u)" }}
          />
        </span>
        <p className="truncate text-xs font-medium text-white/70">{nom}</p>
        <span className="ml-auto" style={{ color: "var(--u)" }}>
          {icone}
        </span>
      </div>

      <MediaSlot>{apercu}</MediaSlot>

      <div className="p-3.5">
        <h3 className="font-display text-base font-bold text-[#eef4ff]">
          {titre}
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-[#93a3c2]">
          {description}
        </p>

        <p className="mt-2.5 text-xs leading-relaxed text-[#93a3c2]">
          <span className="font-medium" style={{ color: "var(--u)" }}>
            Par exemple —{" "}
          </span>
          {exemple}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {modes.map((mode) => (
            <span
              key={mode}
              className="rounded px-1.5 py-0.5 text-[10px] font-medium"
              style={{
                color: "var(--u)",
                background: "color-mix(in srgb, var(--u) 14%, transparent)",
              }}
            >
              {mode}
            </span>
          ))}
        </div>

        {/* Pas un <a> : la carte entière en est déjà un, et imbriquer deux
            liens est invalide. Le rôle visuel suffit. */}
        <span
          className="mt-3.5 inline-flex items-center gap-1 text-xs font-medium"
          style={{ color: "var(--u)" }}
        >
          Voir des exemples
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
          >
            →
          </span>
        </span>
      </div>
    </a>
  );
}
