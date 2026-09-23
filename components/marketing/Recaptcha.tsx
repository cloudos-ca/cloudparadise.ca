"use client";

import { useEffect, useRef } from "react";
import { CLE_SITE_RECAPTCHA } from "@/lib/recaptcha";
import type { Lang } from "./tokens";

/**
 * Le widget reCAPTCHA v2 « Je ne suis pas un robot ».
 *
 * Rendu **explicite** (`render=explicit`) plutôt qu'automatique : le rendu
 * automatique cherche les `.g-recaptcha` au chargement du script, ce qui ne
 * marche pas pour un formulaire monté après coup par React. Ici c'est nous qui
 * appelons `grecaptcha.render` quand le conteneur existe.
 *
 * Le jeton obtenu vit environ deux minutes côté Google. D'où
 * `expired-callback` : sans lui, un visiteur qui coche puis met dix minutes à
 * écrire son message enverrait un jeton périmé et se ferait refuser sans
 * comprendre pourquoi. Le parent reçoit `null` et réaffiche la demande.
 */
type Grecaptcha = {
  render: (
    conteneur: HTMLElement,
    parametres: {
      sitekey: string;
      theme?: "dark" | "light";
      callback: (jeton: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => number;
  reset: (widget?: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha & { ready?: (rappel: () => void) => void };
  }
}

const ID_SCRIPT = "recaptcha-api";

/** Charge le script une seule fois pour toute la page, quel que soit le nombre de widgets. */
function chargerScript(lang: Lang): Promise<void> {
  const existant = document.getElementById(ID_SCRIPT);
  if (existant) return Promise.resolve();

  return new Promise((resoudre, rejeter) => {
    const script = document.createElement("script");
    script.id = ID_SCRIPT;
    // `hl` fixe la langue du widget : sans lui, Google suit celle du navigateur,
    // qui n'est pas forcément celle de la page qu'on est en train de lire.
    script.src = `https://www.google.com/recaptcha/api.js?render=explicit&hl=${lang}`;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => resoudre());
    script.addEventListener("error", () => rejeter(new Error("recaptcha")));
    document.head.append(script);
  });
}

export function Recaptcha({
  lang = "fr",
  onJeton,
  reinitialiser = 0,
}: Readonly<{
  lang?: Lang;
  /** Appelé avec le jeton à la validation, avec `null` à l'expiration ou en erreur. */
  onJeton: (jeton: string | null) => void;
  /** Incrémenter pour vider le widget — après un envoi réussi, par exemple. */
  reinitialiser?: number;
}>) {
  const conteneur = useRef<HTMLDivElement>(null);
  const widget = useRef<number | null>(null);
  // Le rappel est gardé dans une ref : `grecaptcha.render` ne prend sa fonction
  // qu'une fois, et refaire un rendu à chaque changement de rappel remonterait
  // le widget (donc effacerait une case déjà cochée) à chaque frappe du parent.
  // Synchronisé dans un effet, jamais pendant le rendu — voir la règle
  // « Store Event Handlers in Refs » des bonnes pratiques React du dépôt.
  const rappel = useRef(onJeton);
  useEffect(() => {
    rappel.current = onJeton;
  }, [onJeton]);

  useEffect(() => {
    let annule = false;

    chargerScript(lang)
      .then(() => {
        // `grecaptcha.ready` garantit que l'API est utilisable ; le script peut
        // être chargé sans que ses objets internes le soient encore.
        const pret = () => {
          if (annule || !conteneur.current || widget.current !== null) return;
          const api = globalThis.window.grecaptcha;
          if (!api) return;
          widget.current = api.render(conteneur.current, {
            sitekey: CLE_SITE_RECAPTCHA,
            theme: "dark",
            callback: (jeton) => rappel.current(jeton),
            "expired-callback": () => rappel.current(null),
            "error-callback": () => rappel.current(null),
          });
        };
        const api = globalThis.window.grecaptcha;
        if (api?.ready) api.ready(pret);
        else pret();
      })
      .catch(() => {
        // Script bloqué (extension, réseau, pays) : le parent l'apprend par un
        // jeton nul et affiche son message plutôt que de laisser une case morte.
        if (!annule) rappel.current(null);
      });

    return () => {
      annule = true;
    };
  }, [lang]);

  useEffect(() => {
    if (reinitialiser === 0 || widget.current === null) return;
    globalThis.window.grecaptcha?.reset(widget.current);
    rappel.current(null);
  }, [reinitialiser]);

  // `min-height` réservée à la hauteur du widget : sans elle, son apparition
  // pousse le bouton d'envoi vers le bas au moment où l'utilisateur va cliquer.
  return <div ref={conteneur} className="min-h-[78px]" />;
}
