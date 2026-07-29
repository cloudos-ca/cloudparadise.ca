import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  AncresSections,
  type Ancre,
} from "@/components/marketing/AncresSections";
import { BoutonCta } from "@/components/marketing/BoutonCta";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";
import { FenetreCta } from "@/components/marketing/FenetreCta";
import { HreflangLinks } from "@/components/marketing/HreflangLinks";
import { JobPanel } from "@/components/marketing/JobPanel";
import { Reveal } from "@/components/marketing/Reveal";
import { WindowCard } from "@/components/marketing/WindowCard";
import { libelleDe, type TypeTache } from "@/components/marketing/offre";
import { SECTION_Y, SHELL } from "@/components/marketing/tokens";
import { alternatesBilingues, openGraphPage } from "@/lib/seo";
import { LIEN_INSCRIPTION } from "@/lib/site";

const TITRE = "Compute — Cloud Paradise";
const DESCRIPTION =
  "One place for your heavy tasks: documents, data, images and video, web, 3D compute. Describe the result you want; a deterministic engine produces it — exact, and never invented.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: alternatesBilingues("/calcul", "/en/calcul", "en"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "en"),
};

const ANCRES: readonly Ancre[] = [
  { id: "documents", libelle: { fr: "Documents", en: "Documents" } },
  { id: "donnees", libelle: { fr: "Données", en: "Data" } },
  { id: "medias", libelle: { fr: "Images et vidéos", en: "Images and video" } },
  { id: "web", libelle: { fr: "Web", en: "Web" } },
  { id: "calcul-lourd", libelle: { fr: "Calcul lourd", en: "Heavy compute" } },
  { id: "automatisation", libelle: { fr: "Automatisation", en: "Automation" } },
];

type Exemple = { entree: string; sortie: string };
type Geste = {
  id: string;
  surtitre: string;
  /** Types facturés couverts — libellés lus dans offre.ts, jamais écrits en dur. */
  factures: readonly TypeTache[];
  titre: string;
  texte: string;
  exemples: readonly Exemple[];
};

const GESTES: readonly Geste[] = [
  {
    id: "documents",
    surtitre: "Your documents",
    factures: ["Documents"],
    titre: "Convert, search, organize.",
    texte:
      "You drop in your files and describe the result you want. The content never leaves your space.",
    exemples: [
      { entree: "200 PDF contracts", sortie: "a spreadsheet with every due date" },
      {
        entree: "“Where is the warranty mentioned?”",
        sortie: "the exact passages, across all your documents",
      },
      { entree: "a template and a list of 500 clients", sortie: "500 personalized letters" },
      { entree: "sensitive files", sortie: "an encrypted archive, ready to share" },
    ],
  },
  {
    id: "donnees",
    surtitre: "Your data",
    factures: ["Données"],
    titre: "From raw data to a decision.",
    texte: "Query it, cross-reference it, visualize it — read-only on your sources.",
    exemples: [
      { entree: "a 12-month accounting export", sortie: "a cash-flow dashboard" },
      {
        entree: "“Revenue by region, this quarter”",
        sortie: "the answer, without writing a line of SQL",
      },
      { entree: "a dataset", sortie: "a chart ready to paste into your presentation" },
    ],
  },
  {
    id: "medias",
    surtitre: "Your images and video",
    factures: ["Images", "Média", "Génération d'images"],
    titre: "Your media, in batches.",
    texte: "Process, encode, generate, sort — without tying up your machine.",
    exemples: [
      { entree: "5,000 photos", sortie: "all resized and in the right format, in one go" },
      { entree: "a 4K video", sortie: "re-encoded to H.265, ready to publish" },
      { entree: "“a banner for the summer sale”", sortie: "the image, generated" },
      { entree: "a folder of unsorted photos", sortie: "sorted by subject, automatically" },
    ],
  },
  {
    id: "web",
    surtitre: "The web",
    factures: ["Scraping"],
    titre: "The web, as a table.",
    texte: "Extract what matters to you, retrieve files in bulk.",
    exemples: [
      { entree: "an online catalogue", sortie: "a spreadsheet with prices and availability" },
      { entree: "300 download links", sortie: "every file retrieved and filed" },
    ],
  },
  {
    id: "calcul-lourd",
    surtitre: "Heavy compute",
    factures: ["Calcul GPU", "Rendu 3D", "Impression 3D", "Simulation"],
    titre: "Power, on demand.",
    texte: "The heavy hardware runs on our side; all you do is collect the result.",
    exemples: [
      { entree: "a Blender scene", sortie: "the final render, computed on GPU" },
      { entree: "a 3D model", sortie: "a file ready to print" },
    ],
  },
];

const HERO_LOGS = [
  "→ reading 200 .pdf files",
  "→ locating the due dates",
  "→ spreadsheet ready · 200/200",
] as const;

// Première étape : « Scraping », le libellé anglais du mode dans `offre.ts` —
// pas « Web extraction », qui est la traduction littérale du libellé français.
// La même page facture déjà ce mode sous le nom « Scraping » (voir `factures`
// plus bas), et deux noms pour une seule notion sur une seule page se lisent
// comme deux services. Les deux étapes suivantes ne sont pas des modes.
const WORKFLOW = ["Scraping", "Structured data", "PDF report"] as const;

export default function CalculPageEn() {
  return (
    <>
      <HreflangLinks fr="/calcul" en="/en/calcul" />
      <BreadcrumbJsonLd
        items={[
          { nom: "Home", chemin: "/en" },
          { nom: "Compute", chemin: "/en/calcul" },
        ]}
      />

      {/* Héros */}
      <section className="relative">
        <div
          className={`${SHELL} ${SECTION_Y} grid gap-12 os:grid-cols-[1.45fr_1fr] os:items-center os:gap-10`}
        >
          <Reveal>
            <SurTitre>Compute</SurTitre>
            <h1 className="mt-2 font-display text-[2rem] leading-[1.1] font-bold tracking-[-0.02em] text-white sm:text-[2.2rem] os:text-[2.4rem]">
              One place.
              <br />
              All your heavy tasks.
            </h1>
            <p className="mt-6 max-w-[56ch] text-[15px] leading-relaxed text-white/85">
              Describe what you want to obtain. The artificial intelligence
              reads your request and decides how to go about it — but it never
              computes the result itself. A deterministic engine does that, and
              produces an answer that is exact, reproducible and never
              invented.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <BoutonCta
                href={LIEN_INSCRIPTION}
                taille="lg"
              >
                Run your first task
              </BoutonCta>
              <LienOr href="/en/tarifs">See pricing</LienOr>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mx-auto w-full max-w-[520px]">
            <WindowCard title="Plan · Cloud Paradise">
              <JobPanel
                lang="en"
                title="Extract the due dates from 200 contracts"
                chip={libelleDe("Documents", "en").toUpperCase()}
                logs={HERO_LOGS}
              />
            </WindowCard>
          </Reveal>
        </div>
      </section>

      {/* Barre d'ancres — non collante, état actif en or */}
      <AncresSections ancres={ANCRES} lang="en" />

      {GESTES.map((geste) => (
        <GesteSection key={geste.id} geste={geste} />
      ))}

      {/* Automatisation */}
      <section id="automatisation" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <div className="grid items-center gap-10 os:grid-cols-[1fr_1fr] os:gap-14">
            <Reveal className="max-w-xl">
              <SurTitre>Automation</SurTitre>
              <h2 className="mt-2 max-w-[20ch] font-display text-[1.6rem] leading-[1.2] font-bold tracking-tight text-balance text-[#eef4ff] sm:text-3xl os:text-4xl">
                Once. Or every Monday morning.
              </h2>
              <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-white/85">
                Chain several treatments into a single flow, schedule when it
                runs, and receive the report — charts and PDF — delivered by
                email.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mx-auto w-full max-w-[480px]">
              <WindowCard title="Flow · Cloud Paradise">
                <div className="p-5">
                  <ol className="space-y-2.5">
                    {WORKFLOW.map((etape, i) => (
                      <li key={etape} className="flex items-center gap-3">
                        <span
                          className="grid size-7 shrink-0 place-items-center rounded-lg text-[12px] font-semibold"
                          style={{
                            background:
                              "color-mix(in srgb, var(--soft) 14%, transparent)",
                            color: "var(--soft)",
                          }}
                        >
                          {i + 1}
                        </span>
                        <span className="text-sm text-white">{etape}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-4">
                    <span className="text-xs text-white/70">
                      Schedule · every Monday, 8 a.m.
                    </span>
                    <span
                      className="rounded-md px-2.5 py-1 text-[11px] font-medium"
                      style={{
                        background:
                          "color-mix(in srgb, var(--soft) 14%, transparent)",
                        color: "var(--soft)",
                      }}
                    >
                      Delivered by email
                    </span>
                  </div>
                </div>
              </WindowCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Closer */}
      <section className="relative overflow-x-clip">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal>
            <FenetreCta
              lang="en"
              soustitre="Describe your first task. We take care of the rest."
              bouton={{
                href: LIEN_INSCRIPTION,
                libelle: "Run your first task",
              }}
              lien={{ href: "/en/tarifs", libelle: "See pricing" }}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}

/** Sur-titre or, style système. */
function SurTitre({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <p
      className="text-[13px] font-semibold uppercase tracking-[0.12em]"
      style={{ color: "var(--cta)" }}
    >
      {children}
    </p>
  );
}

/** Lien or texte + flèche. */
function LienOr({ href, children }: Readonly<{ href: string; children: ReactNode }>) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-1.5 text-sm font-medium transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      style={{ color: "var(--cta)" }}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform group-hover:translate-x-0.5"
      >
        →
      </span>
    </a>
  );
}

/**
 * Une section « geste ». Sur-titre or + nom(s) facturé(s) (lus dans offre.ts,
 * discrets, blancs à faible opacité), titre, paragraphe, puis la liste
 * entrée → sortie — le cœur de la page.
 */
function GesteSection({ geste }: Readonly<{ geste: Geste }>) {
  // « facturé X » seulement quand un geste correspond à un seul type facturé.
  // Lister plusieurs noms réintroduirait un comptage : on renvoie alors vers
  // /tarifs par un lien discret plutôt que d'énumérer.
  const nomFacture =
    geste.factures.length === 1 ? libelleDe(geste.factures[0], "en") : null;
  return (
    <section id={geste.id} className="relative scroll-mt-24">
      <div className={`${SHELL} ${SECTION_Y}`}>
        {/* Deux colonnes : en-tête à gauche, exemples à droite. Remplit la
            largeur au lieu de laisser la moitié droite vide. Empilé sur mobile. */}
        <div className="grid gap-8 os:grid-cols-[2fr_3fr] os:items-start os:gap-12">
          <Reveal>
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em]">
              <span style={{ color: "var(--cta)" }}>{geste.surtitre}</span>
              {nomFacture && (
                <span className="font-normal tracking-normal text-white/70 normal-case">
                  {" · billed as "}
                  {nomFacture}
                </span>
              )}
            </p>
            <h2 className="mt-2 font-display text-[1.6rem] leading-[1.2] font-bold tracking-tight text-balance text-[#eef4ff] sm:text-3xl os:text-4xl">
              {geste.titre}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/85">
              {geste.texte}
            </p>
            {!nomFacture && (
              <div className="mt-4">
                <LienOr href="/en/tarifs">See the full pricing</LienOr>
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01]">
              {geste.exemples.map((ex) => (
                <li
                  key={ex.entree}
                  className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 px-5 py-4"
                >
                  <span className="text-sm text-white/70">
                    <Chiffres>{ex.entree}</Chiffres>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-sm font-semibold"
                    style={{ color: "var(--cta)" }}
                  >
                    →
                  </span>
                  <span className="text-sm font-medium text-white">
                    <Chiffres>{ex.sortie}</Chiffres>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * Dore les nombres « purs » d'une chaîne (« 200 », « 5,000 »), sans toucher à
 * ceux collés à une lettre (« 4K », « H.265 ») — les chiffres mis en évidence
 * sont en or.
 *
 * La virgule est dans la classe, là où la version française porte l'espace :
 * l'anglais groupe les milliers par virgule (« 5,000 »), et sans elle le
 * nombre se dorait en deux morceaux avec le séparateur resté blanc au milieu.
 */
const NOMBRE =
  /((?<![\p{L}\d.])\d[\d,  ]*\d(?![\p{L}\d])|(?<![\p{L}\d.])\d(?![\p{L}\d]))/gu;

function Chiffres({ children }: Readonly<{ children: string }>) {
  const segments = children.split(NOMBRE);
  // Clé par index, et c'est la seule correcte ici : `split` sur un motif à
  // groupe capturant rend des segments vides aux jointures, donc plusieurs
  // chaînes identiques dans le même tableau. Une clé tirée du contenu
  // collisionnerait. La liste est par ailleurs figée — même chaîne d'entrée,
  // mêmes segments, dans le même ordre, à chaque rendu.
  return (
    <>
      {segments.map((seg, i) =>
        i % 2 === 1 ? (
          <span key={i} className="font-semibold" style={{ color: "var(--cta)" }}>
            {seg}
          </span>
        ) : (
          <span key={i}>{seg}</span>
        ),
      )}
    </>
  );
}
