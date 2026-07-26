"use client";

import { useEffect, useState } from "react";
import { SHELL, type Lang } from "./tokens";

/**
 * Barre d'ancres de /plateforme : trois liens de saut vers #bureau,
 * #logiciels, #equipe. Non collante. L'ancre de la section courante passe en or.
 *
 * Seul composant client de la page : l'état actif suit le défilement via
 * `IntersectionObserver` (la page, qui exporte `metadata`, reste serveur, donc
 * cette logique ne peut pas y vivre). Le défilement doux est porté par le CSS
 * global, qui respecte déjà `prefers-reduced-motion`. Repli : sans observateur,
 * les liens restent de simples ancres, la première étant marquée active.
 */

const ANCRES = [
  { id: "bureau", libelle: { fr: "Le bureau", en: "The desktop" } },
  { id: "logiciels", libelle: { fr: "Les logiciels", en: "Software" } },
  { id: "equipe", libelle: { fr: "L’équipe", en: "The team" } },
] as const;

export function AncresSections({ lang = "fr" }: { lang?: Lang }) {
  const [actif, setActif] = useState<string>(ANCRES[0].id);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const cibles = ANCRES.map(({ id }) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
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
  }, []);

  return (
    <nav
      aria-label={
        lang === "en" ? "Platform sections" : "Sections de la plateforme"
      }
      className={SHELL}
    >
      <ul className="flex flex-wrap gap-x-6 gap-y-2 border-y border-white/10 py-3.5">
        {ANCRES.map(({ id, libelle }) => {
          const estActif = actif === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={estActif ? "true" : undefined}
                className="text-sm font-medium transition-colors hover:text-white"
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
