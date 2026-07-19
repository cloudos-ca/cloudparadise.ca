"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { WindowCard } from "./WindowCard";
import { Reveal } from "./Reveal";
import { IconMessage, IconServer, IconTerminal } from "./icons";
import { SECTION_Y, SHELL, SOFT_WASH } from "./tokens";

/** Étapes du plan proposé par l'IA. */
const PLAN = [
  "Lecture des .docx",
  "Traduction FR → EN",
  "Archive .zip",
] as const;

const POINTS = [
  {
    Icone: IconMessage,
    titre: "Vous décrivez, l’IA planifie",
    texte: "Elle choisit le bon mode et découpe la tâche pour vous.",
  },
  {
    Icone: IconTerminal,
    titre: "Tout est visible en direct",
    texte:
      "Logs en temps réel, progression, et le résultat prêt à télécharger.",
  },
  {
    Icone: IconServer,
    titre: "Des nœuds spécialisés",
    texte: "GPU/CUDA, média, données… le bon matériel pour chaque calcul.",
  },
] as const;

/** Cadence de la conversation, en ms depuis l'entrée dans le viewport. */
const TEMPS = { bulle: 0, saisie: 600, plan: 1700 };

export function Reassurance() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section className="relative">
      <div className={`${SHELL} ${SECTION_Y}`}>
        {/* Miroir du hero : le visuel passe à gauche et le texte à droite.
            L'ordre du DOM garde le texte en premier — c'est lui qui porte le
            sens, donc il ouvre la section une fois empilé. */}
        <div className="grid items-center gap-10 os:grid-cols-[52fr_48fr] os:gap-12">
          <Reveal delay={0.1} className="os:order-2">
            <Texte />
          </Reveal>
          <Reveal className="os:order-1">
            <Conversation reduceMotion={reduceMotion} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Texte() {
  return (
    <div>
      <p
        className="text-xs font-medium tracking-wide"
        style={{ color: "var(--acc)" }}
      >
        La preuve
      </p>
      <h2 className="mt-3 max-w-[22ch] font-display text-[1.6rem] leading-[1.2] font-bold tracking-tight text-balance text-[#eef4ff] sm:text-3xl os:text-4xl">
        Ce n’est pas magique. C’est de l’infrastructure.
      </h2>

      <ul className="mt-8 space-y-5">
        {POINTS.map(({ Icone, titre, texte }) => (
          <li key={titre} className="flex gap-3.5">
            <span
              data-cp-accent
              className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full"
              style={{
                background: "color-mix(in srgb, var(--acc) 15%, transparent)",
                color: "var(--acc)",
              }}
            >
              <Icone className="size-4" />
            </span>
            <div>
              <p className="text-sm font-medium text-[#eef4ff]">{titre}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#93a3c2]">
                {texte}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Barre de statut, comme dans l'app.
          Pas de compte de nœuds : l'afficher ici le ferait passer pour une
          donnée live alors que rien n'est branché sur l'infra. Le nombre de
          modes, lui, est une constante d'architecture — et il se recompte sur
          la section Univers : Docs, Auto, Media, Render, GPU, Data, Scrape. */}
      <p
        data-cp-accent
        className="mt-7 text-xs"
        style={{ color: "var(--soft)" }}
      >
        Infrastructure dédiée · 7 modes de traitement
      </p>
    </div>
  );
}

/**
 * La conversation de planification.
 *
 * Elle se joue une fois, à l'entrée dans le viewport — pas en boucle : c'est
 * une démonstration, pas un décor. Purement illustrative, donc masquée aux
 * lecteurs d'écran ; le sens est porté par les trois points texte à côté.
 */
function Conversation({ reduceMotion }: { reduceMotion: boolean }) {
  // 0 rien · 1 la demande · 2 l'IA réfléchit · 3 le plan
  const [etape, setEtape] = useState(reduceMotion ? 3 : 0);
  const lance = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const encours = timers.current;
    return () => encours.forEach(clearTimeout);
  }, []);

  function demarrer() {
    if (reduceMotion || lance.current) return;
    lance.current = true;
    timers.current = [
      setTimeout(() => setEtape(1), TEMPS.bulle),
      setTimeout(() => setEtape(2), TEMPS.saisie),
      setTimeout(() => setEtape(3), TEMPS.plan),
    ];
  }

  return (
    <motion.div
      aria-hidden="true"
      onViewportEnter={demarrer}
      viewport={{ once: true, amount: 0.35 }}
      whileInView={{}}
    >
      <WindowCard title="Planification · Cloud Paradise">
        <div className="flex min-h-[248px] flex-col gap-3 p-4">
          {etape >= 1 && (
            <Apparition reduceMotion={reduceMotion}>
              <div className="flex justify-end">
                <p
                  data-cp-accent
                  className="max-w-[80%] rounded-xl rounded-br-sm px-3 py-2 text-xs leading-relaxed text-[#eef4ff]"
                  style={{
                    background:
                      "color-mix(in srgb, var(--acc) 14%, transparent)",
                  }}
                >
                  Traduisez ces 200 contrats en anglais.
                </p>
              </div>
            </Apparition>
          )}

          {etape === 2 && (
            <Apparition reduceMotion={reduceMotion}>
              <span className="inline-flex gap-1 rounded-xl rounded-bl-sm bg-white/5 px-3 py-2.5">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="block size-1.5 rounded-full bg-white/40"
                    animate={{ opacity: [0.25, 1, 0.25] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.16,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </span>
            </Apparition>
          )}

          {etape >= 3 && (
            <Apparition reduceMotion={reduceMotion}>
              <div className="rounded-xl rounded-bl-sm border border-white/10 bg-white/5 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-medium text-[#eef4ff]">
                    Plan proposé
                  </p>
                  <span
                    data-cp-accent
                    className="shrink-0 rounded px-2 py-0.5 text-[10px] font-medium tracking-wide"
                    style={{ background: SOFT_WASH, color: "var(--soft)" }}
                  >
                    DOCUMENTS
                  </span>
                </div>

                <ol className="mt-2.5 space-y-1.5">
                  {PLAN.map((etapePlan, i) => (
                    <li
                      key={etapePlan}
                      className="flex items-center gap-2 text-xs text-[#93a3c2]"
                    >
                      <span
                        data-cp-accent
                        className="grid size-4 shrink-0 place-items-center rounded-full text-[9px] font-medium"
                        style={{
                          background:
                            "color-mix(in srgb, var(--acc) 18%, transparent)",
                          color: "var(--soft)",
                        }}
                      >
                        {i + 1}
                      </span>
                      {etapePlan}
                    </li>
                  ))}
                </ol>

                <span
                  data-cp-accent
                  className="mt-3 inline-block rounded-md px-3 py-1.5 text-xs font-medium text-white"
                  style={{ background: "var(--acc)" }}
                >
                  Lancer
                </span>
              </div>
            </Apparition>
          )}
        </div>
      </WindowCard>
    </motion.div>
  );
}

/** Entrée d'un message. Sans mouvement réduit, le contenu est posé tel quel. */
function Apparition({
  children,
  reduceMotion,
}: {
  children: React.ReactNode;
  reduceMotion: boolean;
}) {
  if (reduceMotion) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
