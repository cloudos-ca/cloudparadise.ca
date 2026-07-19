import type { ReactNode } from "react";

type WindowCardProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

/**
 * Châssis de fenêtre du web OS.
 *
 * Purement présentationnel et sans état : le flottement est piloté par le
 * parent, qui seul connaît le contexte d'animation et `prefers-reduced-motion`.
 */
export function WindowCard({ title, children, className = "" }: WindowCardProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-[rgba(27,39,61,.9)] shadow-2xl shadow-black/40 backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          {/* La 3e pastille suit l'accent : la fenêtre appartient au bureau. */}
          <span
            className="size-2.5 rounded-full bg-[var(--acc)]"
            data-cp-accent
          />
        </span>
        <p className="truncate text-xs font-medium text-white/70">{title}</p>
      </div>
      {children}
    </div>
  );
}
