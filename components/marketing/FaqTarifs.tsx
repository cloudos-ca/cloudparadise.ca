"use client";

import { useState } from "react";
import { IconChevronDown } from "./icons";
import { questionsDe } from "./faqTarifsContenu";
import type { Lang } from "./tokens";

/**
 * Accordéon de FAQ.
 *
 * Plusieurs réponses peuvent rester ouvertes en même temps : sur une page de
 * tarifs on compare, et refermer la précédente à chaque clic oblige à faire des
 * allers-retours. D'où un `Set` plutôt qu'un index unique.
 */
export function FaqTarifs({ lang = "fr" }: Readonly<{ lang?: Lang }>) {
  const [ouvertes, setOuvertes] = useState<ReadonlySet<number>>(new Set());
  const questions = questionsDe(lang);

  function basculer(i: number) {
    setOuvertes((actuelles) => {
      const suivantes = new Set(actuelles);
      if (suivantes.has(i)) suivantes.delete(i);
      else suivantes.add(i);
      return suivantes;
    });
  }

  return (
    <ul className="divide-y divide-white/[0.08] overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      {questions.map(({ q, r }, i) => {
        const ouverte = ouvertes.has(i);
        return (
          <li key={q}>
            <h3>
              <button
                type="button"
                onClick={() => basculer(i)}
                aria-expanded={ouverte}
                aria-controls={`faq-panneau-${i}`}
                id={`faq-bouton-${i}`}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.03] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--cta)]"
              >
                <span className="text-[15px] font-medium text-white">{q}</span>
                {/* Chevron en or, comme les flèches de liens. Pas de
                    `data-cp-accent` : l'or ne suit pas la recoloration du
                    bureau, c'est la couleur d'action, constante partout. */}
                <IconChevronDown
                  className={`size-4 shrink-0 transition-transform duration-200 ${
                    ouverte ? "rotate-180" : ""
                  }`}
                  style={{ color: "var(--cta)" }}
                />
              </button>
            </h3>
            {/* Toujours rendu, masqué par `hidden` plutôt que démonté : la
                réponse reste dans le HTML servi, donc lisible par un moteur de
                recherche et présente sans JavaScript. `hidden` la retire aussi
                de l'arbre d'accessibilité et de l'ordre de tabulation — la
                démonter n'apportait que la perte du contenu.

                `<section>` nommée plutôt que `<div role="region">` : une
                section pourvue d'un nom accessible EST une région, sans avoir à
                le déclarer. Un rôle posé à la main sur un `<div>` est une
                promesse que rien ne vérifie ; l'élément natif, lui, ne peut pas
                mentir. */}
            <section
              id={`faq-panneau-${i}`}
              aria-labelledby={`faq-bouton-${i}`}
              hidden={!ouverte}
              className="px-5 pb-5 text-[14px] leading-relaxed text-white/85"
            >
              {r}
            </section>
          </li>
        );
      })}
    </ul>
  );
}
