"use client";

import { Reveal } from "./Reveal";
import { UniversCard, type Univers as UniversType } from "./UniversCard";
import { SECTION_Y, SHELL } from "./tokens";

/**
 * Couleurs d'identité des univers.
 *
 * Catégorielles et FIXES : elles distinguent trois familles de tâches, donc
 * elles ne suivent pas la recoloration globale du fond — sinon les trois
 * cartes deviendraient indiscernables dès qu'on change de wallpaper.
 */
const TEAL = "#35d0c0";
const CORAIL = "#ef8b6a";
const BLEU = "#5b9be6";

/** Glyphes Tabler (file-text, movie, database) tracés en inline. */
const ICON_PROPS = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  className: "size-4",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const IconFileText = (
  <svg {...ICON_PROPS}>
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
    <path d="M9 13h6" />
    <path d="M9 17h4" />
  </svg>
);

const IconMovie = (
  <svg {...ICON_PROPS}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M8 4v16M16 4v16M4 12h16M4 8h4M4 16h4M16 8h4M16 16h4" />
  </svg>
);

const IconDatabase = (
  <svg {...ICON_PROPS}>
    <ellipse cx="12" cy="6" rx="8" ry="3" />
    <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
    <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
  </svg>
);

/* ---------------------------------------------------------------------------
 * Aperçus des résultats — STAND-IN CSS.
 *
 * TODO média : chacun de ces trois blocs sera remplacé par le vrai résultat
 * (capture via next/image, ou courte vidéo muette en boucle). Ils sont écrits
 * pour occuper exactement la hauteur du slot afin que le remplacement ne
 * décale rien.
 * ------------------------------------------------------------------------- */

/** Documents : une page claire en cours de traitement. */
const ApercuDocuments = (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="h-[86px] w-[68px] rounded-sm bg-[#eef1f7] p-2 shadow-lg">
      <div className="h-1 w-3/4 rounded-full bg-[#c3cbd9]" />
      <div className="mt-1.5 h-1 w-full rounded-full bg-[#dde2ea]" />
      <div className="mt-1 h-1 w-full rounded-full bg-[#dde2ea]" />
      <div className="mt-1 h-1 w-5/6 rounded-full bg-[#dde2ea]" />
      <div
        className="mt-1.5 h-1 w-2/3 rounded-full"
        style={{ background: TEAL }}
      />
      <div className="mt-1 h-1 w-full rounded-full bg-[#dde2ea]" />
      <div className="mt-1 h-1 w-4/5 rounded-full bg-[#dde2ea]" />
    </div>
  </div>
);

/** Créa : un export vidéo prêt à lire. */
const ApercuCrea = (
  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-black/20">
    <span
      className="grid size-9 place-items-center rounded-full"
      style={{ background: "color-mix(in srgb, #ef8b6a 22%, transparent)" }}
    >
      <svg viewBox="0 0 24 24" className="size-4" fill={CORAIL}>
        <path d="M8 5.5v13l11-6.5z" />
      </svg>
    </span>
    <div className="flex w-3/5 items-center gap-2">
      <div className="h-0.5 flex-1 rounded-full bg-white/15">
        <div
          className="h-full w-2/3 rounded-full"
          style={{ background: CORAIL }}
        />
      </div>
      <span
        className="rounded px-1 py-px text-[9px] font-medium"
        style={{
          color: CORAIL,
          background: "color-mix(in srgb, #ef8b6a 16%, transparent)",
        }}
      >
        4K
      </span>
    </div>
  </div>
);

/** Tech : les données extraites, en table. */
const ApercuTech = (
  <div className="absolute inset-0 flex items-center px-4">
    <div className="w-full font-mono text-[8px] leading-[1.9]">
      <div
        className="flex gap-2 border-b pb-0.5 font-medium"
        style={{
          color: BLEU,
          borderColor: "color-mix(in srgb, #5b9be6 30%, transparent)",
        }}
      >
        <span className="w-[46%]">url</span>
        <span className="w-[27%]">prix</span>
        <span className="w-[27%]">stock</span>
      </div>
      {[
        ["/p/1042", "24,90 €", "en stock"],
        ["/p/1043", "18,50 €", "3 restants"],
        ["/p/1044", "31,00 €", "en stock"],
      ].map(([url, prix, stock]) => (
        <div key={url} className="flex gap-2 text-[#8fa0bd]">
          <span className="w-[46%]">{url}</span>
          <span className="w-[27%]">{prix}</span>
          <span className="w-[27%]">{stock}</span>
        </div>
      ))}
    </div>
  </div>
);

const UNIVERS: readonly UniversType[] = [
  {
    id: "documents",
    nom: "contrats-fr-en.zip",
    titre: "Documents",
    description: "Traduisez, convertissez et traitez vos fichiers par lots.",
    exemple: "traduire 200 contrats d’un coup.",
    modes: ["Docs", "Auto"],
    couleur: TEAL,
    href: "/exemples/documents",
    icone: IconFileText,
    apercu: ApercuDocuments,
  },
  {
    id: "crea",
    nom: "promo-4k.mp4",
    titre: "Créa & média",
    description: "Encodez, rendez et exportez sans bloquer votre machine.",
    exemple: "exporter une vidéo 4K sans attendre.",
    modes: ["Media", "Render", "GPU"],
    couleur: CORAIL,
    href: "/exemples/media",
    icone: IconMovie,
    apercu: ApercuCrea,
  },
  {
    id: "tech",
    nom: "catalogue.csv",
    titre: "Tech & data",
    description: "Scrapez, interrogez et transformez vos données.",
    exemple: "scraper 10 000 pages en une passe.",
    modes: ["Data", "Scrape", "GPU"],
    couleur: BLEU,
    href: "/exemples/data",
    icone: IconDatabase,
    apercu: ApercuTech,
  },
];

export function Univers() {
  return (
    <section className="relative">
      <div className={`${SHELL} ${SECTION_Y}`}>
        <Reveal>
          <p
            className="text-xs font-medium tracking-wide"
            style={{ color: "var(--acc)" }}
          >
            Vos univers
          </p>
          <h2 className="mt-3 font-display text-[1.6rem] leading-[1.2] font-bold tracking-tight text-[#eef4ff] sm:text-3xl os:text-4xl">
            Vous faites quoi, vous ?
          </h2>
          <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-[#93a3c2]">
            Cliquez le vôtre — chaque univers a sa propre démo.
          </p>
        </Reveal>

        {/* `auto-fit` avec un minimum de 0 fait générer au navigateur des
            dizaines de pistes qu'il effondre ensuite : le rendu tombe juste,
            mais par accident. Trois colonnes explicites au-delà du seuil, une
            seule en dessous — c'est exactement la règle voulue. */}
        <Reveal delay={0.1} className="mt-10 grid gap-3.5 os:grid-cols-3">
          {UNIVERS.map((u) => (
            <UniversCard key={u.id} univers={u} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
