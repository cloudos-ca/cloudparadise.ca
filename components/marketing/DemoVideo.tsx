"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { WindowCard } from "./WindowCard";
import type { Lang } from "./tokens";

const TEXTES = {
  fr: { demo: "Voir la démo", titre: "Démo · Cloud Paradise", fermer: "Fermer" },
  en: { demo: "See the demo", titre: "Demo · Cloud Paradise", fermer: "Close" },
} as const;

const SOURCE: Record<Lang, string> = {
  fr: "/video/fr.mp4",
  en: "/video/en.mp4",
};

/**
 * Bouton « Voir la démo » du hero + la fenêtre qu'il ouvre.
 *
 * La vidéo s'affiche dans une `WindowCard` plutôt qu'un lightbox générique :
 * même châssis que le reste du bureau, pour que la démo reste dans le monde
 * du site au lieu d'ouvrir un composant visuellement étranger.
 */
export function DemoVideo({ lang = "fr" }: { lang?: Lang }) {
  const [ouvert, setOuvert] = useState(false);
  const t = TEXTES[lang];
  const titreId = useId();
  const declencheurRef = useRef<HTMLButtonElement>(null);
  const fermerRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!ouvert) return;

    const declencheur = declencheurRef.current;
    fermerRef.current?.focus();

    function surTouche(e: KeyboardEvent) {
      if (e.key === "Escape") setOuvert(false);
    }
    document.addEventListener("keydown", surTouche);
    // Empêche la page de défiler derrière la fenêtre ouverte.
    const overflowPrecedent = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", surTouche);
      document.body.style.overflow = overflowPrecedent;
      declencheur?.focus();
    };
  }, [ouvert]);

  return (
    <>
      <button
        ref={declencheurRef}
        type="button"
        onClick={() => setOuvert(true)}
        data-cp-accent
        className="flex items-center gap-2 rounded-lg border border-[color-mix(in_srgb,var(--acc)_35%,transparent)] px-5 py-2.5 text-sm font-medium text-cp-ghost hover:border-[color-mix(in_srgb,var(--acc)_65%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-3.5"
          fill="currentColor"
        >
          <path d="M8 5.5v13l11-6.5z" />
        </svg>
        {t.demo}
      </button>

      {ouvert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titreId}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
        >
          {/* Le clic sur le voile ferme la fenêtre ; le contenu arrête sa
              propagation plus bas pour qu'un clic sur la vidéo ne ferme rien. */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={reduceMotion ? undefined : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOuvert(false)}
          />

          <motion.div
            className="relative w-full max-w-3xl"
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.97, y: 8 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <WindowCard title={t.titre}>
              <div className="flex items-center justify-end border-b border-white/10 px-2 py-1">
                <button
                  ref={fermerRef}
                  type="button"
                  onClick={() => setOuvert(false)}
                  aria-label={t.fermer}
                  className="grid size-7 cursor-pointer place-items-center rounded-md text-white/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              <span id={titreId} className="sr-only">
                {t.titre}
              </span>
              <video
                key={SOURCE[lang]}
                src={SOURCE[lang]}
                controls
                autoPlay
                playsInline
                className="aspect-video w-full bg-black"
              />
            </WindowCard>
          </motion.div>
        </div>
      )}
    </>
  );
}
