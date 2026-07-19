"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SOFT_WASH } from "./tokens";

type JobPanelProps = {
  /** Lignes de log, jouées en cascade. */
  logs: readonly string[];
};

/**
 * Le job qui tourne, tel qu'il apparaît dans la fenêtre « Plans ».
 *
 * Un seul pilote de cycle : progression, logs et badge sont keyés dessus et
 * repartent donc toujours ensemble. En mouvement réduit, l'état final est rendu
 * d'emblée et aucune boucle n'est armée.
 */
export function JobPanel({ logs }: JobPanelProps) {
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
        <p className="text-sm font-medium text-white">Rendre une vidéo 4K</p>
        <span
          data-cp-accent
          className="shrink-0 rounded px-2 py-0.5 text-[10px] font-medium tracking-wide"
          style={{ background: SOFT_WASH, color: "var(--soft)" }}
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
          onAnimationComplete={handleProgressComplete}
        />
      </div>

      <div className="mt-3 space-y-1">
        {logs.map((line, i) => (
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
          style={{ background: SOFT_WASH, color: "var(--soft)" }}
        >
          Terminé · télécharger
        </span>
      </motion.div>
    </div>
  );
}
