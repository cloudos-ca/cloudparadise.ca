import { IconCoin } from "./icons";
import { WindowCard } from "./WindowCard";
import {
  CREDIT_EN_DEVISE,
  DEVISE,
  coutDe,
  estALaPiece,
  libelleDe,
  tarifAVenir,
  uniteDe,
  uniteExceptionDe,
  type TypeTache,
} from "./offre";
import type { Bilingue, Exemple, Lang } from "./tokens";

/** Deux décimales toujours : les coûts sont des fractions de crédit. */
const nfCredit = new Intl.NumberFormat("fr-CA", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const nf = new Intl.NumberFormat("fr-CA");

/**
 * Descriptif de chaque type de tâche.
 *
 * Uniquement de la copie : aucun prix ici. Les montants viennent de `GRILLE` et
 * l'exemple les affiche tels quels — un tarif qui change met donc l'exemple à
 * jour tout seul, au lieu de le laisser mentir.
 *
 * `exemple` décrit un **nombre de tâches**, et le montant affiché à côté est le
 * tarif du type multiplié par ce nombre (voir `coutExemple`).
 *
 * La règle de facturation réelle est le **forfait par tâche** : une tâche coûte
 * son prix quel que soit le volume qu'elle traite. Un lot de 200 contrats
 * convertis est une tâche à 0,25, pas 200. Deux exceptions se comptent à la
 * pièce, et elles sont déclarées dans `offre.ts` (`unite`, `uniteException`) :
 * le traitement d'images, et le publipostage.
 *
 * Ce commentaire a déjà affirmé l'inverse — « le débit suit l'avancement, unité
 * par unité », donné comme règle générale — et cette erreur s'était propagée
 * aux exemples et à la page /tarifs. Une ligne d'exemple qui nomme un volume de
 * contenu (« 200 contrats ») au lieu d'un nombre de tâches multiplie donc le
 * prix affiché par ce volume : c'est le piège à ne pas rouvrir.
 *
 * `details` détaille une ligne qui en regroupe plusieurs.
 */
const LIGNES: readonly {
  type: TypeTache;
  fait: Bilingue;
  details?: { fr: readonly string[]; en: readonly string[] };
  exemple: Exemple;
}[] = [
  {
    type: "IA",
    fait: {
      fr: "Planification, choix du traitement, petites tâches",
      en: "Planning, choice of processing, small tasks",
    },
    exemple: { quantite: 10, unite: { fr: "tâches", en: "tasks" } },
  },
  {
    type: "Documents",
    fait: {
      fr: "Traduction, conversion, traitement par lots",
      en: "Translation, conversion, batch processing",
    },
    // 20 tâches, et non « 200 contrats » : au forfait, le volume d'un lot
    // n'entre pas dans le prix. L'ancienne formulation multipliait le tarif par
    // le nombre de fichiers et annonçait 50 crédits pour une tâche à 0,25.
    exemple: { quantite: 20, unite: { fr: "tâches", en: "tasks" } },
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
    exemple: { quantite: 40, unite: { fr: "tâches", en: "tasks" } },
  },
  {
    type: "Scraping",
    fait: { fr: "Extraction de pages web", en: "Web page extraction" },
    // Équivalence en tâches, comme les autres lignes : c'est de l'arithmétique
    // sur le tarif, et ça n'affirme rien sur le nombre de pages qu'une tâche
    // couvre — règle qui n'est pas établie côté vitrine.
    exemple: { quantite: 10, unite: { fr: "tâches", en: "tasks" } },
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
    exemple: { quantite: 33, unite: { fr: "tâches", en: "tasks" } },
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
    // Seul moteur facturé à la pièce : ici la multiplication est la règle, et
    // 100 images coûtent bien 25 crédits. Voir `unite` dans `offre.ts`.
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
    // « images » et non « tâches » : le détail juste au-dessus dit « Texte →
    // image », donc une tâche produit une image et les deux comptes coïncident.
    // C'est la seule ligne au forfait où nommer le produit reste exact.
    exemple: { quantite: 100, unite: { fr: "images", en: "images" } },
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
    exemple: { quantite: 200, unite: { fr: "tâches", en: "tasks" } },
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

function libelleExemple(m: (typeof LIGNES)[number], lang: Lang) {
  const { quantite, unite } = m.exemple;
  const total = coutExemple(m.type, quantite);
  // Sans tarif arrêté, l'exemple ne peut pas se chiffrer : la colonne Prix dit
  // déjà « tarif à venir », ce retour vide évite de l'écrire deux fois.
  if (total === null) return "";
  // « ≈ » quand l'arrondi d'affichage masque une décimale, « = » sinon.
  const exact = Number.isInteger(total);
  // « 1 crédit » et non « 1 crédits » : le cas se produit vraiment (10 tâches
  // IA à 0,10 font exactement 1).
  const singulier = lang === "en" ? "credit" : "crédit";
  const pluriel = lang === "en" ? "credits" : "crédits";
  const unites = total <= 1 ? singulier : pluriel;
  return `${nf.format(quantite)} ${unite[lang]} ${exact ? "=" : "≈"} ${nf.format(
    total,
  )} ${unites}`;
}

/**
 * Grille tarifaire détaillée, un type de tâche par ligne.
 *
 * Deux rendus pour une seule source : un vrai `<table>` à partir de 900px —
 * c'est de la donnée tabulaire, et un lecteur d'écran doit pouvoir la parcourir
 * comme telle — et des cartes empilées en dessous, parce qu'un tableau à quatre
 * colonnes à 360px déborde forcément.
 */
const TABLEAU: Record<
  Lang,
  {
    titre: string;
    caption: string;
    tache: string;
    description: string;
    prix: string;
    exemple: string;
    /**
     * Le forfait, dit en clair sous le tableau — dans les deux langues.
     *
     * C'est la phrase qui manquait : le malentendu naissait de ce que rien ne
     * disait qu'un lot ne coûte pas plus cher qu'une tâche. Elle remplace un
     * « Cost charged per task. » qui n'existait qu'en anglais et qui répétait
     * la légende sans rien ajouter.
     */
    forfait: string;
  }
> = {
  fr: {
    titre: "Tarifs · Cloud Paradise",
    caption: "Coût en crédits par tâche, pour chaque type de traitement",
    tache: "Tâche",
    description: "Description",
    prix: "Prix",
    exemple: "Exemple",
    forfait:
      "Une tâche coûte le même prix quel que soit le volume qu’elle traite. Deux exceptions se comptent à la pièce, signalées dans la colonne Prix.",
  },
  en: {
    titre: "Pricing · Cloud Paradise",
    caption: "Cost in credits per task, for each type of processing",
    tache: "Task",
    description: "Description",
    prix: "Price",
    exemple: "Example",
    forfait:
      "A task costs the same whatever volume it handles. Two exceptions are counted per item, flagged in the Price column.",
  },
};

export function GrilleDetaillee({ lang = "fr" }: Readonly<{ lang?: Lang }>) {
  const tt = TABLEAU[lang];
  return (
    <div>
      <WindowCard title={tt.titre} icone={<IconCoin className="size-3.5" />}>
        {/* ---- Cartes : sous 900px ---- */}
        <ul className="divide-y divide-white/[0.06] os:hidden">
          {LIGNES.map((m) => (
            <li key={m.type} className="p-4">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-sm font-medium text-white">
                  {libelleDe(m.type, lang)}
                </p>
                <Prix type={m.type} lang={lang} />
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-white/85">
                {m.fait[lang]}
              </p>
              <SousLignes details={m.details} lang={lang} />
              <p className="mt-1.5 text-[12px] leading-relaxed text-white/70">
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
                <Th>{tt.tache}</Th>
                <Th>{tt.description}</Th>
                <Th className="text-right">{tt.prix}</Th>
                <Th>{tt.exemple}</Th>
              </tr>
            </thead>
            <tbody>
              {LIGNES.map((m) => (
                <tr
                  key={m.type}
                  // Zébrure très basse et surlignage au survol : la ligne se
                  // suit à l'œil sur quatre colonnes sans ajouter de filets.
                  className="border-b border-white/[0.06] transition-colors last:border-b-0 even:bg-white/[0.015] hover:bg-white/[0.05]"
                >
                  <td className="px-4 py-3 align-top">
                    <span className="text-[13px] font-medium whitespace-nowrap text-white">
                      {libelleDe(m.type, lang)}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-top text-[13px] leading-relaxed text-white/85">
                    {m.fait[lang]}
                    <SousLignes details={m.details} lang={lang} />
                  </td>
                  <td className="px-4 py-3 text-right align-top">
                    <Prix type={m.type} lang={lang} />
                  </td>
                  <td className="px-4 py-3 align-top text-[13px] leading-relaxed text-white/70">
                    {libelleExemple(m, lang)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </WindowCard>

      <p className="mt-3 max-w-[68ch] text-[12px] leading-relaxed text-white/75">
        1 {lang === "en" ? "credit" : "crédit"} ={" "}
        {nf.format(CREDIT_EN_DEVISE)} {DEVISE}. {tt.forfait}
      </p>
    </div>
  );
}

/**
 * Détail d'une ligne qui regroupe plusieurs traitements.
 *
 * Rendu comme une vraie liste : ce sont deux traitements distincts sous un même
 * nom, pas une phrase coupée en deux.
 */
function SousLignes({
  details,
  lang,
}: Readonly<{
  details?: { fr: readonly string[]; en: readonly string[] };
  lang: Lang;
}>) {
  if (!details) return null;
  return (
    <ul className="mt-1.5 space-y-1">
      {details[lang].map((d) => (
        <li
          key={d}
          className="flex gap-1.5 text-[12px] leading-relaxed text-white/70"
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
 *
 * L'unité n'apparaît que sur les deux exceptions. La suffixer partout
 * apprendrait à l'œil à sauter cette ligne, et la neutraliserait précisément là
 * où elle compte : la légende du tableau dit déjà « par tâche », exact pour
 * neuf moteurs sur onze, et c'est elle qui fait des deux autres des exceptions
 * lisibles. Le suffixe se lit d'un tenant avec le montant — « 0,25 par image »
 * — là où une colonne séparée obligerait un lecteur d'écran à réassocier
 * l'en-tête et la cellule.
 */
function Prix({ type, lang }: Readonly<{ type: TypeTache; lang: Lang }>) {
  const cout = coutDe(type);

  if (cout === null) {
    return (
      <span className="text-[12px] whitespace-nowrap text-white/70 italic">
        {tarifAVenir(lang)}
      </span>
    );
  }

  const exception = uniteExceptionDe(type, lang);
  const par = lang === "en" ? "per" : "par";

  return (
    <span className="inline-flex flex-col items-end gap-0.5">
      <span
        className="font-display text-[16px] font-bold tabular-nums"
        style={{ color: "var(--cta)" }}
      >
        {nfCredit.format(cout)}
      </span>
      {estALaPiece(type) && (
        // Chaîne composée en JS et non « {par} {unite} » : deux expressions
        // adjacentes en JSX sortent séparées par un commentaire de React, ce
        // qui casse la copie du texte et le débit d'un lecteur d'écran.
        <span className="text-[11px] leading-tight whitespace-nowrap text-white/75">
          {`${par} ${uniteDe(type, lang)}`}
        </span>
      )}
      {exception && (
        <span className="text-[11px] leading-tight text-white/75">
          {exception}
        </span>
      )}
    </span>
  );
}

function Th({
  children,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <th
      scope="col"
      className={`px-4 py-2.5 text-[11px] font-medium tracking-wide text-white/60 ${className}`}
    >
      {children}
    </th>
  );
}
