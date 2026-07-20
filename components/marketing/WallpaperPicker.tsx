"use client";

import { useState } from "react";
import {
  applyWallpaper,
  DEFAULT_WALLPAPER,
  WALLPAPERS,
  type Wallpaper,
} from "./wallpapers";
import type { Lang } from "./tokens";

const TEXTE = {
  fr: "Changez de fond — tout se recolore",
  en: "Change the background — everything recolors",
} as const;

export function WallpaperPicker({ lang = "fr" }: { lang?: Lang }) {
  const [activeId, setActiveId] = useState(DEFAULT_WALLPAPER.id);

  async function handleSelect(wp: Wallpaper) {
    setActiveId(wp.id);
    // Les tokens vivent sur :root — la page entière suit, pas seulement le hero.
    await applyWallpaper(document.documentElement, wp);
  }

  return (
    <div className="mt-8">
      <p className="text-xs text-cp-subtle">{TEXTE[lang]}</p>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {WALLPAPERS.map((wp) => {
          const isActive = wp.id === activeId;
          return (
            <button
              key={wp.id}
              type="button"
              onClick={() => handleSelect(wp)}
              aria-label={wp.aria[lang]}
              aria-pressed={isActive}
              className={`group flex cursor-pointer flex-col items-center gap-1.5 rounded-lg p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--soft)] ${
                isActive ? "" : "opacity-70 hover:opacity-100"
              }`}
            >
              <span
                className={`size-8 rounded-full border transition-transform group-hover:scale-105 ${
                  isActive
                    ? "border-white/70 ring-2 ring-white/25"
                    : "border-white/20"
                }`}
                style={{ background: wp.swatch }}
              />
              <span className="text-[10px] text-cp-subtle">
                {wp.label[lang]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
