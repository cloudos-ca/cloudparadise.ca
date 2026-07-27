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
 *
 * La fenêtre est un `<dialog>` ouvert par `showModal()`, et non un `<div
 * role="dialog">` : le navigateur fournit alors le piège à focus, la fermeture
 * par Échap et le retour du focus au déclencheur. La version précédente
 * n'avait pas de piège à focus — on tabulait hors de la fenêtre ouverte, dans
 * une page pourtant masquée par le voile.
 */
export function DemoVideo({ lang = "fr" }: Readonly<{ lang?: Lang }>) {
  const [ouvert, setOuvert] = useState(false);
  const t = TEXTES[lang];
  const titreId = useId();
  const dialogueRef = useRef<HTMLDialogElement>(null);
  const fermerRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  /*
   * Resynchronisation quand la fermeture ne vient pas de nous.
   *
   * Le navigateur peut fermer un `<dialog>` modal de son propre chef — Échap,
   * et le « close watcher » de Chrome qui l'implémente. Si on le laisse faire,
   * l'élément se retrouve fermé pendant que React le croit encore ouvert : le
   * contenu reste monté, le défilement reste bloqué, et le clic suivant sur
   * « Voir la démo » ne rouvre rien, puisque l'état n'a pas bougé.
   *
   * On intercepte donc `cancel` — l'annulation demandée, encore annulable — on
   * bloque la fermeture native, et on repasse par l'état : React reste la
   * seule source de vérité, et c'est notre effet qui referme réellement.
   *
   * Rien ne s'appuie sur `close`, volontairement : mesuré dans Chrome,
   * l'événement n'est pas délivré ici alors que `cancel` l'est. Un écouteur
   * `close` aurait eu l'allure d'un filet de sécurité sans en être un. Ce
   * n'est pas gênant — aucun chemin du composant n'appelle `close()` en
   * dehors de l'effet, qui n'agit que lorsque l'état est déjà à jour.
   *
   * Écouteur natif plutôt que `onCancel` en JSX : l'événement ne remonte pas,
   * et on ne veut pas faire dépendre la cohérence de l'état de la manière dont
   * React le rattache.
   */
  useEffect(() => {
    const dialogue = dialogueRef.current;
    if (!dialogue) return;

    function surAnnulation(e: Event) {
      e.preventDefault();
      setOuvert(false);
    }
    dialogue.addEventListener("cancel", surAnnulation);
    return () => dialogue.removeEventListener("cancel", surAnnulation);
  }, []);

  useEffect(() => {
    const dialogue = dialogueRef.current;
    if (!dialogue) return;

    if (!ouvert) {
      if (dialogue.open) dialogue.close();
      return;
    }

    if (!dialogue.open) dialogue.showModal();
    fermerRef.current?.focus();

    // `showModal()` rend l'arrière-plan inerte mais ne bloque pas le
    // défilement : ça reste à notre charge.
    const overflowPrecedent = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflowPrecedent;
    };
  }, [ouvert]);

  return (
    <>
      <button
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

      {/* Le `<dialog>` reste monté en permanence — `showModal()` exige que
          l'élément soit déjà dans le DOM. Son contenu, lui, n'est rendu qu'à
          l'ouverture : c'est ce qui rejoue l'animation d'entrée à chaque fois,
          et ça évite de charger la vidéo tant que personne ne l'a demandée.
          Pas d'`aria-modal` ici : `showModal()` l'implique déjà, le poser à la
          main est redondant. */}
      <dialog
        ref={dialogueRef}
        aria-labelledby={titreId}
        /* Le voile animé est rendu à l'intérieur (juste en dessous) : on garde
           le `::backdrop` natif transparent pour ne pas assombrir deux fois.
           Le reste neutralise le style par défaut du `<dialog>` — marge
           automatique, bordure, fond blanc, largeur et hauteur maximales. */
        className="fixed inset-0 m-0 flex h-full max-h-none w-full max-w-none items-center justify-center border-0 bg-transparent p-4 backdrop:bg-transparent"
      >
        {ouvert && (
          <>
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
              initial={
                reduceMotion ? undefined : { opacity: 0, scale: 0.97, y: 8 }
              }
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
                {/* `muted` : le fichier ne contient aucune piste audio (vérifié
                    au ffprobe — un seul flux h264), donc il n'y a rien à
                    couper, mais l'attribut garantit que la lecture automatique
                    ne soit pas bloquée. Pas de `<track>` non plus, pour la même
                    raison : des sous-titres restituent du son, et il n'y en a
                    pas. Le jour où la démo est renarrée, la piste devient
                    obligatoire. */}
                <video
                  key={SOURCE[lang]}
                  src={SOURCE[lang]}
                  controls
                  autoPlay
                  muted
                  playsInline
                  className="aspect-video w-full bg-black"
                />
              </WindowCard>
            </motion.div>
          </>
        )}
      </dialog>
    </>
  );
}
