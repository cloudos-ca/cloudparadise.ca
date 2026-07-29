"use client";

import { useRef } from "react";
import { SOFT_WASH, type Lang } from "./tokens";
import { useBoucleActive } from "./useBoucleActive";

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
 * Entièrement animé en CSS (voir `.job-*` dans globals.css) : progression,
 * cascade des journaux et badge partagent la même durée de cycle et repartent
 * donc toujours ensemble, sans que React ne retouche le DOM.
 *
 * Ce composant n'a plus d'état, plus de minuterie, plus de `key` incrémentée et
 * plus de framer-motion. Il ne garde qu'une chose : la garde de visibilité, qui
 * suspend le cycle quand le panneau sort de l'écran ou que l'onglet passe en
 * arrière-plan. Sans elle, quatre pages entretiendraient une boucle infinie en
 * permanence.
 *
 * Le respect de `prefers-reduced-motion` est descendu dans le CSS : il n'y a
 * plus de branche à tenir ici, donc plus de risque qu'un élément l'oublie.
 */
export function JobPanel({ title, chip, logs, lang = "fr" }: JobPanelProps) {
  const cadre = useRef<HTMLDivElement>(null);
  const anime = useBoucleActive(cadre);

  return (
    <div className="p-4" ref={cadre} data-anime={anime ? "true" : "false"}>
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

      {/* `scaleX` sur un nœud vide qui occupe toute la barre : `transform` est
          composée, `width` déclencherait un layout à chaque frame. */}
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          data-cp-accent
          className="job-jauge h-full w-full rounded-full"
          style={{ background: "var(--acc)" }}
        />
      </div>

      <div className="mt-3 space-y-1">
        {logs.map((line, i) => (
          <p
            key={line}
            className="job-log font-mono text-[11px] text-cp-muted"
            // Le décalage porte sur le cycle entier, pas sur une entrée jouée
            // une fois : chaque ligne garde donc sa place dans la cascade à
            // chaque tour.
            style={{ animationDelay: `${i * 0.5}s` }}
          >
            {line}
          </p>
        ))}
        {/* Curseur de terminal : la fenêtre a l'air vivante, prête à recevoir
            la suite. Purement décoratif ; le CSS le masque en mouvement
            réduit. */}
        <span
          aria-hidden="true"
          className="job-curseur mt-0.5 block h-3 w-[7px] rounded-[1px]"
          style={{ background: "var(--soft)" }}
        />
      </div>

      <div className="job-badge mt-3">
        <span
          data-cp-accent
          className="inline-block rounded-md px-2.5 py-1 text-[11px] font-medium"
          style={{ background: SOFT_WASH, color: "var(--soft)" }}
        >
          {BADGE[lang]}
        </span>
      </div>
    </div>
  );
}
