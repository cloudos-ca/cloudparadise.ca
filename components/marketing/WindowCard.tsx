import type { ReactNode } from "react";

type WindowCardProps = {
  title: string;
  children: ReactNode;
  className?: string;
  /**
   * Couleur de la 3e pastille. Par défaut l'accent du bureau ; la fenêtre en
   * échec passe au rouge pour signaler qu'elle n'appartient pas à Cloud Paradise.
   */
  accent?: string;
  /** Bordure du châssis, à surcharger pour une fenêtre en échec. */
  borderColor?: string;
};

/**
 * Châssis de fenêtre du web OS.
 *
 * Purement présentationnel et sans état : le flottement est piloté par le
 * parent, qui seul connaît le contexte d'animation et `prefers-reduced-motion`.
 */
export function WindowCard({
  title,
  children,
  className = "",
  accent = "var(--acc)",
  borderColor = "rgba(255,255,255,.09)",
}: WindowCardProps) {
  return (
    <div
      style={{ borderColor }}
      className={`overflow-hidden rounded-xl border bg-[rgba(27,39,61,.9)] shadow-2xl shadow-black/40 backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span
            className="size-2.5 rounded-full"
            style={{ background: accent }}
            data-cp-accent
          />
        </span>
        <p className="truncate text-xs font-medium text-white/70">{title}</p>
      </div>
      {children}
    </div>
  );
}
