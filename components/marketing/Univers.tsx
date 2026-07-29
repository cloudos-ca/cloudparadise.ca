"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { IconDatabase, IconFileText, IconMovie } from "./icons";
import { Reveal } from "./Reveal";
import { UniversCard, type Univers as UniversType } from "./UniversCard";
import { SECTION_Y, SHELL, type Lang } from "./tokens";

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

/* ---------------------------------------------------------------------------
 * Aperçus des résultats.
 *
 * Pas de vraie capture ni vidéo ici, par choix : le site n'a de photographie
 * nulle part (fonds en dégradés, logos vectoriels), en introduire aurait
 * détonné dans ce langage entièrement illustré. À la place, chaque aperçu
 * anime la transformation en cours plutôt qu'un état figé — même grammaire
 * que le « job qui tourne » de JobPanel.tsx (barre qui se remplit, lignes qui
 * s'enchaînent, repli complet sur l'état final quand `useReducedMotion` est
 * vrai). `delaiDepart` décale le départ de chaque carte pour qu'elles ne
 * pulsent pas à l'unisson dans la grille.
 * ------------------------------------------------------------------------- */

type ApercuProps = Readonly<{ delaiDepart?: number }>;

/** Documents : un survol lumineux balaie la page, façon OCR/traduction en cours. */
function ApercuDocuments({ delaiDepart = 0 }: ApercuProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-[86px] w-[68px] overflow-hidden rounded-sm bg-[#eef1f7] p-2 shadow-lg">
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
        {!reduceMotion && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-3"
            style={{
              background: `linear-gradient(180deg, transparent, color-mix(in srgb, ${TEAL} 60%, transparent), transparent)`,
            }}
            initial={{ y: 0 }}
            animate={{ y: [0, 74, 0] }}
            transition={{
              duration: 2.8,
              delay: delaiDepart,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </div>
    </div>
  );
}

/** Créa : la barre de rendu se remplit jusqu'au bout avant que le badge « 4K » n'apparaisse. */
function ApercuCrea({ delaiDepart = 0 }: ApercuProps) {
  const reduceMotion = useReducedMotion();
  const [cycle, setCycle] = useState(0);
  const minuteur = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (minuteur.current) clearTimeout(minuteur.current);
    };
  }, []);

  function surFinDeBarre() {
    if (reduceMotion) return;
    minuteur.current = setTimeout(() => setCycle((c) => c + 1), 1000);
  }

  const delai = cycle === 0 ? delaiDepart : 0;

  return (
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
          <motion.div
            key={`barre-${cycle}`}
            className="h-full rounded-full"
            style={{ background: CORAIL }}
            initial={{ width: reduceMotion ? "100%" : "8%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: reduceMotion ? 0 : 3,
              delay: reduceMotion ? 0 : delai,
              ease: "easeInOut",
            }}
            onAnimationComplete={surFinDeBarre}
          />
        </div>
        <motion.span
          key={`badge-${cycle}`}
          className="rounded px-1 py-px text-[9px] font-medium"
          style={{
            color: CORAIL,
            background: "color-mix(in srgb, #ef8b6a 16%, transparent)",
          }}
          initial={{
            opacity: reduceMotion ? 1 : 0,
            scale: reduceMotion ? 1 : 0.85,
          }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: reduceMotion ? 0 : 0.3,
            delay: reduceMotion ? 0 : delai + 3,
          }}
        >
          4K
        </motion.span>
      </div>
    </div>
  );
}

/** Tech : les lignes du tableau arrivent l'une après l'autre, façon extraction en direct. */
function ApercuTech({ delaiDepart = 0 }: ApercuProps) {
  const reduceMotion = useReducedMotion();
  const [cycle, setCycle] = useState(0);
  const minuteur = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (minuteur.current) clearTimeout(minuteur.current);
    };
  }, []);

  function surDerniereLigne() {
    if (reduceMotion) return;
    minuteur.current = setTimeout(() => setCycle((c) => c + 1), 1600);
  }

  const delai = cycle === 0 ? delaiDepart : 0;

  // Prix en dollars : le reste de la page annonce du CAD, un catalogue en
  // euros jurerait dans la démonstration.
  const lignes = [
    ["/p/1042", "24,90 $", "en stock"],
    ["/p/1043", "18,50 $", "3 restants"],
    ["/p/1044", "31,00 $", "en stock"],
  ] as const;

  return (
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
        {lignes.map(([url, prix, stock], i) => (
          <motion.div
            key={`${url}-${cycle}`}
            className="flex gap-2 text-cp-muted"
            initial={{ opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.3,
              delay: reduceMotion ? 0 : delai + i * 0.45,
            }}
            onAnimationComplete={
              i === lignes.length - 1 ? surDerniereLigne : undefined
            }
          >
            <span className="w-[46%]">{url}</span>
            <span className="w-[27%]">{prix}</span>
            <span className="w-[27%]">{stock}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function universDe(lang: Lang): readonly UniversType[] {
  const chemin = lang === "en" ? "/en/fonctions" : "/fonctions";
  if (lang === "en") {
    return [
      {
        id: "documents",
        nom: "contracts-fr-en.zip",
        titre: "Documents",
        description: "Translate, convert, and process your files in batches.",
        exemple: "translate 200 contracts at once.",
        modes: ["Docs", "Auto"],
        couleur: TEAL,
        href: chemin,
        icone: <IconFileText />,
        apercu: <ApercuDocuments delaiDepart={0} />,
      },
      {
        id: "crea",
        nom: "promo-4k.mp4",
        titre: "Creative & media",
        description:
          "Encode, render, and export without locking up your machine.",
        exemple: "export a 4K video without waiting.",
        modes: ["Media", "Render", "GPU"],
        couleur: CORAIL,
        href: chemin,
        icone: <IconMovie />,
        apercu: <ApercuCrea delaiDepart={0.6} />,
      },
      {
        id: "tech",
        nom: "catalog.csv",
        titre: "Tech & data",
        description: "Scrape, query, and transform your data.",
        exemple: "scrape 10,000 pages in one pass.",
        modes: ["Data", "Scrape", "GPU"],
        couleur: BLEU,
        href: chemin,
        icone: <IconDatabase />,
        apercu: <ApercuTech delaiDepart={1.2} />,
      },
    ];
  }
  return [
    {
      id: "documents",
      nom: "contrats-fr-en.zip",
      titre: "Documents",
      description: "Traduisez, convertissez et traitez vos fichiers par lots.",
      exemple: "traduire 200 contrats d’un coup.",
      modes: ["Docs", "Auto"],
      couleur: TEAL,
      href: chemin,
      icone: <IconFileText />,
      apercu: <ApercuDocuments delaiDepart={0} />,
    },
    {
      id: "crea",
      nom: "promo-4k.mp4",
      titre: "Créa & média",
      description: "Encodez, rendez et exportez sans bloquer votre machine.",
      exemple: "exporter une vidéo 4K sans attendre.",
      modes: ["Media", "Render", "GPU"],
      couleur: CORAIL,
      href: chemin,
      icone: <IconMovie />,
      apercu: <ApercuCrea delaiDepart={0.6} />,
    },
    {
      id: "tech",
      nom: "catalogue.csv",
      titre: "Tech & data",
      description: "Scrapez, interrogez et transformez vos données.",
      exemple: "scraper 10 000 pages en une passe.",
      modes: ["Data", "Scrape", "GPU"],
      couleur: BLEU,
      href: chemin,
      icone: <IconDatabase />,
      apercu: <ApercuTech delaiDepart={1.2} />,
    },
  ];
}

const TEXTES = {
  fr: {
    eyebrow: "Vos univers",
    titre: "Vous faites quoi, vous ?",
    soustitre: "Cliquez le vôtre — chaque univers a sa propre démo.",
  },
  en: {
    eyebrow: "Your world",
    titre: "What do you do?",
    soustitre: "Pick yours — each one comes with its own demo.",
  },
} as const;

export function Univers({ lang = "fr" }: Readonly<{ lang?: Lang }>) {
  const t = TEXTES[lang];
  const univers = universDe(lang);

  return (
    <section id="univers" className="relative scroll-mt-20">
      <div className={`${SHELL} ${SECTION_Y}`}>
        <Reveal>
          <p
            className="text-xs font-medium tracking-wide"
            style={{ color: "var(--acc-text)" }}
          >
            {t.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-[1.6rem] leading-[1.2] font-bold tracking-tight text-[#eef4ff] sm:text-3xl os:text-4xl">
            {t.titre}
          </h2>
          <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-cp-muted">
            {t.soustitre}
          </p>
        </Reveal>

        {/* `auto-fit` avec un minimum de 0 fait générer au navigateur des
            dizaines de pistes qu'il effondre ensuite : le rendu tombe juste,
            mais par accident. Trois colonnes explicites au-delà du seuil, une
            seule en dessous — c'est exactement la règle voulue. */}
        <Reveal delay={0.1} className="mt-10 grid gap-3.5 os:grid-cols-3">
          {univers.map((u) => (
            <UniversCard key={u.id} univers={u} lang={lang} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
