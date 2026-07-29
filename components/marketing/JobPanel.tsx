"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SOFT_WASH, type Lang } from "./tokens";

type JobPanelProps = Readonly<{
  /** Intitulé du job, tel qu'il apparaît en tête de fenêtre. */
  title: string;
  /**
   * Mode retenu par l'IA, en capitales.
   *
   * Passer `libelleDe(type, lang).toUpperCase()` plutôt qu'un littéral : le
   * libellé dépend de la langue (« MÉDIA » / « MEDIA », « DONNÉES » / « DATA »,
   * « EXTRACTION WEB » / « SCRAPING ») et un littéral recopié à la main a déjà
   * fait afficher un mode sous deux noms. Reste un `string` et non un
   * `TypeTache` : certaines fenêtres affichent un nom de service (`DOCS` dans
   * FenetrePlan), qui n'est pas un mode.
   */
  chip: string;
  /** Lignes de log, jouées en cascade. */
  logs: readonly string[];
  lang?: Lang;
}>;

const BADGE = { fr: "Terminé · télécharger", en: "Done · download" } as const;

/**
 * Le job qui tourne, tel qu'il apparaît dans la fenêtre « Plans ».
 *
 * Un seul pilote de cycle : progression, logs et badge sont keyés dessus et
 * repartent donc toujours ensemble. En mouvement réduit, l'état final est rendu
 * d'emblée et aucune boucle n'est armée.
 */
export function JobPanel({ title, chip, logs, lang = "fr" }: JobPanelProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();
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
    <div className="p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-white">{title}</p>
        <span
          data-cp-accent
          className="shrink-0 rounded px-2 py-0.5 text-[10px] font-medium tracking-wide"
          style={{ background: SOFT_WASH, color: "var(--soft)" }}
        >
          {chip}
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
          onAnimationComplete={handleProgressComplete}
        />
      </div>

      <div className="mt-3 space-y-1">
        {logs.map((line, i) => (
          <motion.p
            key={`log-${cycle}-${i}`}
            className="font-mono text-[11px] text-cp-muted"
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
        {/* Curseur de terminal : la fenêtre a l'air vivante, prête à recevoir
            la suite. Purement décoratif et masqué en mouvement réduit. */}
        {!reduceMotion && (
          <motion.span
            aria-hidden="true"
            className="mt-0.5 block h-3 w-[7px] rounded-[1px]"
            style={{ background: "var(--soft)" }}
            animate={{ opacity: [1, 0.1, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
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
          style={{ background: SOFT_WASH, color: "var(--soft)" }}
        >
          {BADGE[lang]}
        </span>
      </motion.div>
    </div>
  );
}
