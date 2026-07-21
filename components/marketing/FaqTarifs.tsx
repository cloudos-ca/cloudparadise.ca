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
export function FaqTarifs({ lang = "fr" }: { lang?: Lang }) {
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
    <ul className="divide-y divide-white/[0.08] overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
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
                className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--acc)]"
              >
                <span className="text-[13px] font-medium text-[#eef4ff]">
                  {q}
                </span>
                <IconChevronDown
                  data-cp-accent
                  className={`size-4 shrink-0 transition-transform duration-200 ${
                    ouverte ? "rotate-180" : ""
                  }`}
                  style={{ color: "var(--acc-text)" }}
                />
              </button>
            </h3>
            {/* Toujours rendu, masqué par `hidden` plutôt que démonté : la
                réponse reste dans le HTML servi, donc lisible par un moteur de
                recherche et présente sans JavaScript. `hidden` la retire aussi
                de l'arbre d'accessibilité et de l'ordre de tabulation — la
                démonter n'apportait que la perte du contenu. */}
            <div
              id={`faq-panneau-${i}`}
              role="region"
              aria-labelledby={`faq-bouton-${i}`}
              hidden={!ouverte}
              className="px-4 pb-4 text-[13px] leading-relaxed text-[#93a3c2]"
            >
              {r}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
