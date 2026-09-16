import type { ReactNode } from "react";

type WindowCardProps = Readonly<{
  title: string;
  children: ReactNode;
  className?: string;
  /**
   * Couleur de la 3e pastille. Par défaut l'accent du bureau ; la fenêtre en
   * échec passe au rouge pour signaler qu'elle n'appartient pas à Cloud OS.
   */
  accent?: string;
  /** Bordure du châssis, à surcharger pour une fenêtre en échec. */
  borderColor?: string;
  /**
   * Glyphe posé devant le titre, comme l'icône d'application d'une vraie barre
   * de titre. Décoratif : le titre porte déjà l'information.
   */
  icone?: ReactNode;
}>;

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
  icone,
}: WindowCardProps) {
  return (
    <div
      style={{
        borderColor,
        // Ombre portée profonde + fin liseré clair en haut : la fenêtre décolle
        // du fond et prend un aspect « verre » sans recourir à une image.
        boxShadow:
          "0 24px 50px -14px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.07)",
      }}
      className={`overflow-hidden rounded-xl border bg-gradient-to-b from-[rgba(33,47,72,.92)] to-[rgba(23,34,54,.92)] backdrop-blur-sm ${className}`}
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
        {icone ? (
          <span aria-hidden="true" className="ml-1 shrink-0 text-white/50">
            {icone}
          </span>
        ) : null}
        <p className="truncate text-xs font-medium text-white/70">{title}</p>
      </div>
      {children}
    </div>
  );
}
