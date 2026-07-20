import { IconCoin } from "./icons";
import { TEINTES } from "./modes";
import { WindowCard } from "./WindowCard";
import {
  CREDIT_EN_DEVISE,
  DEVISE,
  coutDe,
  libelleDe,
  tarifAVenir,
  type TypeTache,
} from "./offre";
import type { Lang } from "./tokens";

type Bilingue = { fr: string; en: string };


/** Deux décimales toujours : les coûts sont des fractions de crédit. */
const nfCredit = new Intl.NumberFormat("fr-CA", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const nf = new Intl.NumberFormat("fr-CA");

/**
 * Descriptif de chaque mode.
 *
 * Uniquement de la copie : aucun prix ici. Les montants viennent de `GRILLE`
 * et les exemples sont *calculés* à partir d'eux — un tarif qui change met donc
 * l'exemple à jour tout seul, au lieu de le laisser mentir.
 *
 * `exemple` décrit une quantité de tâches ; le coût affiché en est déduit.
 * `note` remplace le calcul quand la facturation dépend du découpage réel —
 * ou quand le tarif n'est pas encore arrêté.
 * `details` détaille un mode qui en regroupe plusieurs.
 */
const MODES: readonly {
  type: TypeTache;
  fait: Bilingue;
  details?: { fr: readonly string[]; en: readonly string[] };
  exemple?: { quantite: number; unite: Bilingue };
  note?: Bilingue;
}[] = [
  {
    type: "IA",
    fait: {
      fr: "Planification, choix du mode, petites tâches",
      en: "Planning, mode selection, small tasks",
    },
    exemple: { quantite: 10, unite: { fr: "tâches", en: "tasks" } },
  },
  {
    type: "Documents",
    fait: {
      fr: "Traduction, conversion, traitement par lots",
      en: "Translation, conversion, batch processing",
    },
    exemple: { quantite: 200, unite: { fr: "contrats", en: "contracts" } },
  },
  {
    type: "Données",
    fait: {
      fr: "Requêtes, transformations, exports",
      en: "Queries, transformations, exports",
    },
    exemple: { quantite: 100, unite: { fr: "tâches", en: "tasks" } },
  },
  {
    type: "Média",
    fait: {
      fr: "Encodage, conversion audio/vidéo",
      en: "Encoding, audio/video conversion",
    },
    exemple: { quantite: 40, unite: { fr: "exports", en: "exports" } },
  },
  {
    type: "Scraping",
    fait: { fr: "Extraction de pages web", en: "Web page extraction" },
    // 10 000 pages ne font pas 10 000 tâches : le découpage dépend du site et
    // du lot. Annoncer un total ici serait une promesse qu'on ne tient pas.
    note: {
      fr: "10 000 pages : le coût dépend du découpage en tâches",
      en: "10,000 pages: cost depends on how the job gets split into tasks",
    },
  },
  {
    type: "Calcul GPU",
    fait: {
      fr: "Traitements GPU/CUDA intensifs",
      en: "Intensive GPU/CUDA processing",
    },
    exemple: { quantite: 50, unite: { fr: "tâches", en: "tasks" } },
  },
  {
    type: "Rendu 3D",
    fait: {
      fr: "Rendu 3D / scènes lourdes",
      en: "3D rendering / heavy scenes",
    },
    exemple: { quantite: 33, unite: { fr: "rendus", en: "renders" } },
  },
  {
    type: "Images",
    fait: {
      fr: "Traitement et analyse d’images",
      en: "Image processing and analysis",
    },
    details: {
      fr: [
        "Redimensionner, convertir, détourer, améliorer",
        "Analyse par IA de vision : décrire, classer, détecter, OCR",
      ],
      en: [
        "Resize, convert, remove background, enhance",
        "AI vision analysis: describe, classify, detect, OCR",
      ],
    },
    exemple: { quantite: 100, unite: { fr: "images", en: "images" } },
  },
  {
    // Séparé d'Images : la génération est facturée à un tarif différent, un
    // seul prix pour les deux aurait été faux dans un sens ou dans l'autre.
    type: "Génération d'images",
    fait: { fr: "Générez des images par IA", en: "Generate images with AI" },
    details: {
      fr: ["Texte → image", "Agrandissement IA ×4"],
      en: ["Text → image", "AI upscale ×4"],
    },
    exemple: { quantite: 20, unite: { fr: "images", en: "images" } },
  },
  {
    type: "Impression 3D",
    fait: {
      fr: "Générez des modèles prêts à imprimer",
      en: "Generate print-ready models",
    },
    details: {
      fr: ["Texte → modèle 3D"],
      en: ["Text → 3D model"],
    },
    exemple: { quantite: 200, unite: { fr: "modèles", en: "models" } },
  },
  {
    type: "Simulation",
    fait: { fr: "Simulations scientifiques", en: "Scientific simulations" },
    exemple: {
      quantite: 200,
      unite: { fr: "simulations", en: "simulations" },
    },
  },
];

/** Coût d'un exemple, arrondi au centième près comme les crédits. */
function coutExemple(type: TypeTache, quantite: number) {
  const cout = coutDe(type);
  if (cout === null) return null;
  return Math.round(quantite * cout * 100) / 100;
}

function libelleExemple(m: (typeof MODES)[number], lang: Lang) {
  if (m.note) return m.note[lang];
  const { quantite, unite } = m.exemple!;
  const total = coutExemple(m.type, quantite);
  // Sans tarif arrêté, l'exemple ne peut pas se chiffrer : `note` prend le
  // relais plus haut, ce retour n'est qu'un filet.
  if (total === null) return "";
  // « ≈ » quand l'arrondi d'affichage masque une décimale, « = » sinon.
  const exact = Number.isInteger(total);
  // « 1 crédit » et non « 1 crédits » : le cas se produit vraiment (10 tâches
  // IA à 0,10 font exactement 1).
  const unites =
    lang === "en"
      ? total <= 1
        ? "credit"
        : "credits"
      : total <= 1
        ? "crédit"
        : "crédits";
  return `${nf.format(quantite)} ${unite[lang]} ${exact ? "=" : "≈"} ${nf.format(
    total,
  )} ${unites}`;
}

/**
 * Grille tarifaire détaillée, un mode par ligne.
 *
 * Deux rendus pour une seule source : un vrai `<table>` à partir de 900px —
 * c'est de la donnée tabulaire, et un lecteur d'écran doit pouvoir la parcourir
 * comme telle — et des cartes empilées en dessous, parce qu'un tableau à quatre
 * colonnes à 360px déborde forcément.
 */
const TABLEAU = {
  fr: {
    titre: "Tarifs · Cloud Paradise",
    caption: "Coût en crédits par tâche lancée, pour chaque mode de traitement",
    mode: "Mode",
    description: "Description",
    prix: "Prix",
    exemple: "Exemple",
    pied: "Coût débité par tâche lancée.",
  },
  en: {
    titre: "Pricing · Cloud Paradise",
    caption: "Cost in credits per task, for each processing mode",
    mode: "Mode",
    description: "Description",
    prix: "Price",
    exemple: "Example",
    pied: "Cost charged per task.",
  },
} as const;

export function GrilleDetaillee({ lang = "fr" }: { lang?: Lang }) {
  const tt = TABLEAU[lang];
  return (
    <div>
      <WindowCard title={tt.titre} icone={<IconCoin className="size-3.5" />}>
        {/* ---- Cartes : sous 900px ---- */}
        <ul className="divide-y divide-white/[0.06] os:hidden">
          {MODES.map((m) => (
            <li key={m.type} className="p-4">
              <div className="flex items-baseline justify-between gap-3">
                <p className="flex items-center gap-2 text-sm font-medium text-[#eef4ff]">
                  <Puce type={m.type} />
                  {libelleDe(m.type, lang)}
                </p>
                <Prix type={m.type} lang={lang} />
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-[#93a3c2]">
                {m.fait[lang]}
              </p>
              <SousLignes details={m.details} lang={lang} />
              <p className="mt-1.5 text-[12px] leading-relaxed text-[#8494b6]">
                {libelleExemple(m, lang)}
              </p>
            </li>
          ))}
        </ul>

        {/* ---- Tableau : à partir de 900px ---- */}
        <div className="hidden os:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{tt.caption}</caption>
            <thead>
              <tr className="border-b border-white/10">
                <Th>{tt.mode}</Th>
                <Th>{tt.description}</Th>
                <Th className="text-right">{tt.prix}</Th>
                <Th>{tt.exemple}</Th>
              </tr>
            </thead>
            <tbody>
              {MODES.map((m) => (
                <tr
                  key={m.type}
                  // Zébrure très basse et surlignage au survol : la ligne se
                  // suit à l'œil sur quatre colonnes sans ajouter de filets.
                  className="border-b border-white/[0.06] transition-colors last:border-b-0 even:bg-white/[0.015] hover:bg-white/[0.05]"
                >
                  <td className="px-4 py-3 align-top">
                    <span className="flex items-center gap-2.5 text-[13px] font-medium whitespace-nowrap text-[#eef4ff]">
                      <Puce type={m.type} />
                      {libelleDe(m.type, lang)}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-top text-[13px] leading-relaxed text-[#93a3c2]">
                    {m.fait[lang]}
                    <SousLignes details={m.details} lang={lang} />
                  </td>
                  <td className="px-4 py-3 text-right align-top">
                    <Prix type={m.type} lang={lang} />
                  </td>
                  <td className="px-4 py-3 align-top text-[13px] leading-relaxed text-[#8494b6]">
                    {libelleExemple(m, lang)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </WindowCard>

      <p className="mt-3 text-[12px] text-[#93a3c2]">
        1 {lang === "en" ? "credit" : "crédit"} ={" "}
        {nf.format(CREDIT_EN_DEVISE)} {DEVISE}. {tt.pied}
      </p>
    </div>
  );
}

/**
 * Détail d'un mode qui en regroupe plusieurs.
 *
 * Rendu comme une vraie liste : ce sont deux traitements distincts sous un même
 * nom, pas une phrase coupée en deux.
 */
function SousLignes({
  details,
  lang,
}: {
  details?: { fr: readonly string[]; en: readonly string[] };
  lang: Lang;
}) {
  if (!details) return null;
  return (
    <ul className="mt-1.5 space-y-1">
      {details[lang].map((d) => (
        <li
          key={d}
          className="flex gap-1.5 text-[12px] leading-relaxed text-[#8494b6]"
        >
          <span aria-hidden="true">·</span>
          {d}
        </li>
      ))}
    </ul>
  );
}

/**
 * Le prix, mis en avant : c'est la colonne qu'on vient lire.
 *
 * Tant qu'un tarif n'est pas arrêté, on le dit — en atténué et sans graisse,
 * pour que l'absence de chiffre se lise comme une information et non comme un
 * champ resté vide.
 */
function Prix({ type, lang }: { type: TypeTache; lang: Lang }) {
  const cout = coutDe(type);

  if (cout === null) {
    return (
      <span className="text-[12px] whitespace-nowrap text-[#8494b6] italic">
        {tarifAVenir(lang)}
      </span>
    );
  }

  return (
    <span
      data-cp-accent
      className="font-display text-[15px] font-bold tabular-nums"
      style={{ color: "var(--soft)" }}
    >
      {nfCredit.format(cout)}
    </span>
  );
}

/**
 * Puce de mode, dans la teinte du mode.
 *
 * Un point coloré plus un halo de la même teinte : assez pour distinguer les
 * sept lignes d'un coup d'œil, trop discret pour virer au bariolage. La couleur
 * ne porte aucune information seule — le nom du mode est juste à côté.
 */
function Puce({ type }: { type: TypeTache }) {
  const teinte = TEINTES[type];
  return (
    <span
      aria-hidden="true"
      className="size-2 shrink-0 rounded-full"
      style={{
        background: teinte,
        boxShadow: `0 0 8px 1px ${teinte}55`,
      }}
    />
  );
}

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      scope="col"
      className={`px-4 py-2.5 text-[11px] font-medium tracking-wide text-white/50 ${className}`}
    >
      {children}
    </th>
  );
}
