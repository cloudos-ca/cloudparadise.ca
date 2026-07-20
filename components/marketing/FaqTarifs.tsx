"use client";

import { useState, type ReactNode } from "react";
import { IconChevronDown } from "./icons";
import {
  CREDIT_EN_DEVISE,
  DEVISE,
  RECHARGE_MINIMALE_EN_DEVISE,
} from "./offre";
import type { Lang } from "./tokens";

const nf = new Intl.NumberFormat("fr-CA");

/**
 * Questions/réponses de tarification.
 *
 * Ajouter les futures Q/R ici : une entrée par question, l'accordéon et
 * l'accessibilité suivent tout seuls. Les montants s'insèrent depuis `offre.ts`
 * — ne jamais réécrire un prix en toutes lettres dans une réponse.
 *
 * Ce sont des engagements commerciaux réels : ne rien y ajouter qui n'ait été
 * validé (aucune garantie de remboursement, de délai ou de disponibilité).
 */
function questionsDe(lang: Lang): readonly { q: string; r: ReactNode }[] {
  if (lang === "en") {
    return [
      {
        q: "Do credits expire?",
        r: (
          <>
            No. Your credits never expire: they stay available as long as
            your account is active.
          </>
        ),
      },
      {
        q: "How does payment work?",
        r: (
          <>
            You work with credits (1 credit = {nf.format(CREDIT_EN_DEVISE)}{" "}
            {DEVISE}). You top up on demand by credit card via PayPal.
            Minimum top-up of {RECHARGE_MINIMALE_EN_DEVISE}.
          </>
        ),
      },
      {
        q: "Are there refunds?",
        r: (
          <>
            Credit purchases are non-refundable. Unused credits, however,
            remain available indefinitely (they don’t expire).
          </>
        ),
      },
      {
        q: "Do I need to subscribe?",
        r: (
          <>
            No. No subscription: you only pay for the credits you choose to
            add, whenever you want.
          </>
        ),
      },
    ];
  }
  return [
    {
      q: "Les crédits expirent-ils ?",
      r: (
        <>
          Non. Vos crédits n’expirent jamais : ils restent disponibles tant que
          votre compte est actif.
        </>
      ),
    },
    {
      q: "Comment fonctionne le paiement ?",
      r: (
        <>
          Vous fonctionnez par crédits (1 crédit = {nf.format(CREDIT_EN_DEVISE)}{" "}
          {DEVISE}). Vous rechargez à la demande par carte de crédit via PayPal.
          Recharge minimale de {RECHARGE_MINIMALE_EN_DEVISE}.
        </>
      ),
    },
    {
      q: "Y a-t-il des remboursements ?",
      r: (
        <>
          Les achats de crédits ne sont pas remboursables. Les crédits inutilisés
          restent toutefois disponibles indéfiniment (ils n’expirent pas).
        </>
      ),
    },
    {
      q: "Dois-je m’abonner ?",
      r: (
        <>
          Non. Aucun abonnement : vous ne payez que les crédits que vous
          choisissez d’ajouter, quand vous le voulez.
        </>
      ),
    },
  ];
}

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
