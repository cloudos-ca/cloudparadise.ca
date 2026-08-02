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
import { WindowCard } from "@/components/marketing/WindowCard";
import { libelleDe } from "@/components/marketing/offre";
import {
  IconAlert,
  IconCube,
  IconDownload,
  IconFlask,
  IconMapPin,
  IconRefresh,
  IconWindow,
} from "@/components/marketing/icons";
import { Reveal } from "@/components/marketing/Reveal";
import { SECTION_Y, SHELL } from "@/components/marketing/tokens";
import { alternatesBilingues, openGraphPage } from "@/lib/seo";
import { lienInscription } from "@/lib/site";

const TITRE = "Mineral exploration in Quebec — Cloud Paradise";
const DESCRIPTION =
  "The workstation for mineral exploration in Quebec: titles and expiry dates, drill holes in three dimensions, SIGÉOM layers, export. Built in Abitibi.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: alternatesBilingues("/mines", "/en/mining", "en"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "en", "/en/mining"),
};

const ANCRES: readonly Ancre[] = [
  { id: "titres", libelle: { fr: "Les titres", en: "Titles" } },
  { id: "forages", libelle: { fr: "Les forages", en: "Drilling" } },
  { id: "rapports", libelle: { fr: "Les rapports", en: "Reports" } },
  { id: "donnees-ouvertes", libelle: { fr: "Données ouvertes", en: "Open data" } },
  { id: "sig", libelle: { fr: "Le SIG", en: "GIS" } },
  { id: "ancrage", libelle: { fr: "L’ancrage local", en: "Local hosting" } },
];

type OperationSig = {
  Icone: typeof IconRefresh;
  titre: string;
  texte: string;
};

/** Chaîne du desurvey : lecture des CSV → calcul → export .geojson. Pas de
 *  compte de sondages (chiffre métier), seulement les étapes. */
const FORAGES_LOGS = [
  "→ reading X/Y/Z collars and downhole surveys",
  "→ desurvey computation — traces reconstructed",
  "→ .geojson export ready for the 3D viewer",
] as const;

/** Les gestes SIG : des opérations, pas un récit — d'où les cartes courtes. */
const OPERATIONS_SIG: readonly OperationSig[] = [
  {
    Icone: IconRefresh,
    titre: "Reprojection",
    texte: "NAD83 UTM 17N and 18N, MTM.",
  },
  {
    Icone: IconCube,
    titre: "Desurvey",
    texte: "From downhole surveys to traces in three dimensions.",
  },
  {
    Icone: IconFlask,
    titre: "Geochemical anomalies",
    texte: "Spotting your results and putting them on the map.",
  },
  {
    Icone: IconMapPin,
    titre: "Hillshade and contour lines",
    texte: "The relief, readable at a glance.",
  },
  {
    Icone: IconDownload,
    titre: "GPX export",
    texte: "Your waypoints, exported as GPX for a Garmin unit.",
  },
  {
    Icone: IconWindow,
    titre: "QGIS Desktop online",
    texte: "The full GIS, in the browser.",
  },
];

export default function MinesPageEn() {
  return (
    <>
      <HreflangLinks fr="/mines" en="/en/mining" />
      <BreadcrumbJsonLd
        items={[
          { nom: "Home", chemin: "/en" },
          { nom: "Mining", chemin: "/en/mining" },
        ]}
      />

      {/* Héros — texte seul, comme /securite : c'est une preuve de compétence,
          pas une page à effet. Deux sorties : la démo (principale) et le
          compte gratuit (secondaire). */}
      <section className="relative">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-4xl">
            <SurTitre>Mineral exploration</SurTitre>
            <h1 className="mt-2 font-display text-[1.7rem] leading-[1.12] font-bold tracking-[-0.02em] text-white sm:text-[2.15rem] os:text-[2.5rem]">
              The workstation for
              <br />
              mineral exploration in Quebec.
              <br />
              Built in Abitibi.
            </h1>
            <p className="mt-6 max-w-[60ch] text-[17px] leading-relaxed text-white/85">
              Your titles, your drill holes, your layers and your reports in the
              same workspace as the rest of your files. The servers are in the
              same region as you are.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <BoutonCta href="/en/contact#sujet=exploration" taille="lg">
                Book a demo
              </BoutonCta>
              <LienOr href={lienInscription("mines")}>
                Create your account
              </LienOr>
            </div>
          </Reveal>
        </div>
      </section>

      <AncresSections ancres={ANCRES} lang="en" />

      {/* 1 — Les titres miniers */}
      <section id="titres" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <div className="grid gap-8 os:grid-cols-[2fr_3fr] os:items-start os:gap-12">
            <Reveal>
              <SurTitre>Mining titles</SurTitre>
              <TitreSection>No claim lapses without warning.</TitreSection>
            </Reveal>
            <Reveal delay={0.1}>
              {/* Fenêtre en tête de colonne (alignée au titre à gauche, grâce à
                  `items-start`), texte descriptif dessous : comble le vide sous
                  l'en-tête. La maquette n'a ni date ni numéro de titre réels. */}
              <WindowCard title="Desktop · Cloud Paradise">
                <div className="p-5">
                  <p className="text-xs text-white/60">Notification</p>
                  <div className="mt-3 flex gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3.5">
                    <span
                      className="grid size-9 shrink-0 place-items-center rounded-lg"
                      style={{
                        background:
                          "color-mix(in srgb, var(--soft) 14%, transparent)",
                        color: "var(--soft)",
                      }}
                    >
                      <IconAlert className="size-[18px]" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white">
                        Title expiry approaching
                      </p>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-white/70">
                        One of your titles is nearing its expiry date.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-white/10 pt-3">
                    <span
                      className="rounded-md px-2.5 py-1 text-[11px] font-medium"
                      style={{
                        background:
                          "color-mix(in srgb, var(--soft) 14%, transparent)",
                        color: "var(--soft)",
                      }}
                    >
                      Email reminder
                    </span>
                    <span className="text-xs text-white/60">
                      notification in the desktop
                    </span>
                  </div>
                </div>
              </WindowCard>

              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-white/85">
                <p>
                  You track your titles, and the expiry-date computation raises
                  an alert before the deadline — by email and by notification in
                  the desktop.
                </p>
                <p>GESTIM layers overlay your maps.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2 — Les forages */}
      <section id="forages" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <div className="grid gap-8 os:grid-cols-[2fr_3fr] os:items-start os:gap-12">
            <Reveal>
              <SurTitre>Drilling</SurTitre>
              <TitreSection>
                From your surveys to the trace in three dimensions.
              </TitreSection>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4 text-[15px] leading-relaxed text-white/85">
                <p>
                  You drop in a ZIP of two CSV files: the X/Y/Z collars and the
                  downhole surveys. The desurvey computation produces the
                  traces, which the 3D viewer displays — you rotate the view and
                  follow each hole along its full length.
                </p>
                <p className="text-[13px] leading-relaxed text-white/70">
                  Computation input: a <Ext>.zip</Ext> of two <Ext>.csv</Ext>{" "}
                  files. Viewer input: the <Ext>.geojson</Ext> file produced by
                  the desurvey.
                </p>
              </div>

              {/* La chaîne CSV → desurvey → traces 3D : du calcul déterministe
                  sur une opération que le public connaît par cœur — d'où la
                  fenêtre plutôt que la seule description. */}
              <WindowCard title="Desurvey · Cloud Paradise" className="mt-6">
                <JobPanel
                  lang="en"
                  title="Compute the drill hole traces"
                  chip={libelleDe("Données", "en").toUpperCase()}
                  logs={FORAGES_LOGS}
                />
              </WindowCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3 — Les rapports */}
      <section id="rapports" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <div className="grid gap-8 os:grid-cols-[2fr_3fr] os:items-start os:gap-12">
            <Reveal>
              <SurTitre>Reports</SurTitre>
              <TitreSection>The first draft is already written.</TitreSection>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4 text-[15px] leading-relaxed text-white/85">
                <p>
                  The assistant drafts a first version from your project data:
                  an MRNF statutory work report, sections of an NI 43-101
                  report.
                </p>
                <p>
                  You ask it for changes in plain language, you review, you
                  correct, you sign. PDF export.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4 — Les données ouvertes */}
      <section id="donnees-ouvertes" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <div className="grid gap-8 os:grid-cols-[2fr_3fr] os:items-start os:gap-12">
            <Reveal>
              <SurTitre>Open data</SurTitre>
              <TitreSection>SIGÉOM, loaded district by district.</TitreSection>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4 text-[15px] leading-relaxed text-white/85">
                {/* « feuillet SNRC » jusqu'au 2026-07-28 : la requête d'import
                    ne travaille pas par feuillet mais par emprise géographique
                    d'un district minier. /fonctions portait déjà la bonne
                    formulation, cette page était restée en arrière. */}
                <p>
                  You import SIGÉOM layers by mining district — that one is
                  operational.
                </p>
                <p>
                  Your other layers overlay on top: <Ext>.gpkg</Ext>,{" "}
                  <Ext>.geojson</Ext>, <Ext>.kml</Ext>, and <Ext>.zip</Ext> for
                  a compressed shapefile.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5 — Le SIG : des opérations, en cartes courtes */}
      <section id="sig" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-2xl">
            <SurTitre>GIS</SurTitre>
            <TitreSection>Reproject, cross-reference, export.</TitreSection>
            <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-white/85">
              The GIS operations of exploration work, in the same workspace as
              your data.
            </p>
          </Reveal>

          <Reveal
            delay={0.1}
            className="mt-10 grid gap-3.5 sm:grid-cols-2 os:grid-cols-3"
          >
            {OPERATIONS_SIG.map(({ Icone, titre, texte }) => (
              <div
                key={titre}
                className="flex gap-4 rounded-xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors hover:border-white/15"
              >
                <span
                  className="grid size-10 shrink-0 place-items-center rounded-lg"
                  style={{
                    background:
                      "color-mix(in srgb, var(--soft) 12%, transparent)",
                    color: "var(--soft)",
                  }}
                >
                  <Icone className="size-[21px]" />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-[15px] font-semibold text-[#eef4ff]">
                    {titre}
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-white/75">
                    {texte}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 6 — L'ancrage local */}
      <section id="ancrage" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <div className="grid gap-8 os:grid-cols-[2fr_3fr] os:items-start os:gap-12">
            <Reveal>
              <SurTitre>Local hosting</SurTitre>
              <TitreSection>Your servers are in your own region.</TitreSection>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4 text-[15px] leading-relaxed text-white/85">
                <p>
                  Our servers are in the same region as your projects: Amos,
                  Val-d’Or, Rouyn-Noranda.
                </p>
                <p>
                  The hardware belongs to Cloud Paradise, in Quebec, in Abitibi.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Closer — une seule sortie : la démo. Pas de badge d'offre : le CTA
          n'est pas l'essai gratuit mais la prise de contact. */}
      <section className="relative overflow-x-clip">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal>
            <FenetreCta
              lang="en"
              badge={false}
              soustitre="Book a demo. We’ll show you the workstation, set up for exploration."
              bouton={{
                href: "/en/contact#sujet=exploration",
                libelle: "Book a demo",
              }}
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

/** Titre de section, style système, collé au sur-titre. */
function TitreSection({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <h2 className="mt-2 font-display text-[1.6rem] leading-[1.2] font-bold tracking-tight text-balance text-[#eef4ff] sm:text-3xl os:text-4xl">
      {children}
    </h2>
  );
}

/** Extension de fichier, en mono discret : un géologue lit `.geojson` mieux
 *  en code qu'en prose. */
function Ext({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <code className="rounded bg-white/[0.06] px-1 py-0.5 font-mono text-[0.85em] text-white/80">
      {children}
    </code>
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
