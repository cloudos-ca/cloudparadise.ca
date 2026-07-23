"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ecrireConsentement, lireConsentement, type Consentement } from "./consentement";
import { IconLock } from "./icons";
import { WindowCard } from "./WindowCard";
import type { Lang } from "./tokens";

/**
 * Le lien de politique reste vers la page française dans les deux langues :
 * elle n'a pas encore de pendant `/en` (voir Footer.tsx).
 */
const TEXTES = {
  fr: {
    dialogue: "Consentement Loi 25",
    titre: "Confidentialité",
    corps: "Le nécessaire, pour faire tourner le site. Le reste, c’est vous qui décidez.",
    accepter: "Accepter",
    refuser: "Refuser",
    conforme: "Conforme à la Loi 25 · ",
    lien: "Politique de confidentialité",
  },
  en: {
    dialogue: "Law 25 consent",
    titre: "Privacy",
    corps: "The essentials, to run the site. The rest is your call.",
    accepter: "Accept",
    refuser: "Decline",
    conforme: "Law 25 compliant · ",
    lien: "Privacy policy (in French)",
  },
} as const;

/**
 * Notification de consentement affichée à la première visite.
 *
 * Posée en coin comme une fenêtre du bureau, pas en barre pleine largeur :
 * ça la garde cohérente avec le reste du site, et surtout ça évite qu'elle
 * n'avale le pied de page ou le bas du contenu sur les pages courtes.
 *
 * Le choix est mémorisé côté navigateur pour éviter les répétitions.
 */
export function PopupLoi25({ lang = "fr" }: { lang?: Lang }) {
  const [visible, setVisible] = useState(false);
  const reduceMotion = Boolean(useReducedMotion());
  const t = TEXTES[lang];

  useEffect(() => {
    if (lireConsentement()) return;

    const id = window.requestAnimationFrame(() => setVisible(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const enregistrerChoix = (choix: Consentement) => {
    ecrireConsentement(choix);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <motion.div
      role="dialog"
      aria-label={t.dialogue}
      className="fixed right-4 bottom-4 left-4 z-[60] sm:right-6 sm:bottom-6 sm:left-auto sm:w-[360px]"
      initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <WindowCard title={t.titre} icone={<IconLock className="size-3.5" />}>
        <div className="px-4 py-4">
          <p className="text-sm leading-relaxed text-white">{t.corps}</p>

          <div className="mt-3 flex items-center gap-3">
            {/* Bouton d'action, pas un lien : `BoutonCta` est fait pour de la
                navigation (il rend un `<a>`), ici c'est un choix qui écrit
                dans `localStorage` sans changer de page. Mêmes tokens visuels
                que `BoutonCta` pour rester le seul doré du site. */}
            <button
              type="button"
              onClick={() => enregistrerChoix("accepte")}
              className="cursor-pointer rounded-full px-3.5 py-1.5 text-[13px] font-semibold whitespace-nowrap text-[color:var(--cta-texte)] transition-[filter,transform] duration-150 hover:brightness-110 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              style={{
                background: "var(--cta)",
                boxShadow:
                  "0 6px 22px -6px color-mix(in srgb, var(--cta) 55%, transparent)",
              }}
            >
              {t.accepter}
            </button>

            <button
              type="button"
              onClick={() => enregistrerChoix("refuse")}
              data-cp-accent
              className="cursor-pointer rounded-md border border-[color-mix(in_srgb,var(--acc)_35%,transparent)] bg-white/[0.04] px-3.5 py-1.5 text-[13px] font-medium text-white transition-colors hover:border-[color-mix(in_srgb,var(--acc)_55%,transparent)] hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t.refuser}
            </button>
          </div>

          <p className="mt-3 text-xs text-cp-subtle">
            {t.conforme}
            {/* Toujours vers la page française : voir la note plus haut. */}
            <Link
              href="/confidentialite"
              className="underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t.lien}
            </Link>
          </p>
        </div>
      </WindowCard>
    </motion.div>
  );
}
