import type { ReactNode } from "react";

/**
 * Glyphes repris de Tabler, tracés en inline.
 *
 * Le projet n'embarque aucune librairie d'icônes : une dizaine de symboles ne
 * justifie pas une dépendance. Ils vivent ici plutôt que dans chaque section,
 * pour qu'un même glyphe ne soit pas redessiné à deux endroits.
 */
type IconProps = { className?: string };

function Glyph({
  className = "size-4",
  children,
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export function IconUpload(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
      <path d="M7 9l5-5l5 5" />
      <path d="M12 4v12" />
    </Glyph>
  );
}

export function IconMessage(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5l-5 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z" />
      <path d="M8 9h8" />
      <path d="M8 13h6" />
    </Glyph>
  );
}

export function IconBolt(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M13 3v7h6l-8 11v-7H5l8-11" />
    </Glyph>
  );
}

export function IconDownload(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
      <path d="M7 11l5 5l5-5" />
      <path d="M12 4v12" />
    </Glyph>
  );
}

export function IconFileText(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
      <path d="M9 13h6" />
      <path d="M9 17h4" />
    </Glyph>
  );
}

export function IconMovie(props: IconProps) {
  return (
    <Glyph {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 4v16M16 4v16M4 12h16M4 8h4M4 16h4M16 8h4M16 16h4" />
    </Glyph>
  );
}

export function IconDatabase(props: IconProps) {
  return (
    <Glyph {...props}>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
      <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </Glyph>
  );
}

export function IconTerminal(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M5 7l5 5l-5 5" />
      <path d="M13 17h6" />
    </Glyph>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M5 12l5 5l9-9" />
    </Glyph>
  );
}

/*
 * Ces deux glyphes ont été redessinés plus simplement : leur version d'origine
 * empilait trop de traits pour 16px et se lisait grise à côté des autres.
 */
export function IconGift(props: IconProps) {
  return (
    <Glyph {...props}>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
      <path d="M12 8v13" />
      <path d="M8.5 8a2.5 2.5 0 1 1 3.5-3.4A2.5 2.5 0 1 1 15.5 8" />
    </Glyph>
  );
}

export function IconRefresh(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4" />
      <path d="M4 13a8.1 8.1 0 0 0 15.5 2M20 19v-4h-4" />
    </Glyph>
  );
}

export function IconAdjustments(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M4 8h5M15 8h5" />
      <circle cx="12" cy="8" r="2.6" />
      <path d="M4 16h9M19 16h1" />
      <circle cx="16" cy="16" r="2.6" />
    </Glyph>
  );
}

export function IconServer(props: IconProps) {
  return (
    <Glyph {...props}>
      <rect x="3" y="4" width="18" height="6" rx="2" />
      <rect x="3" y="14" width="18" height="6" rx="2" />
      <path d="M7 7h.01M7 17h.01" />
    </Glyph>
  );
}
