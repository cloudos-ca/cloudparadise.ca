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

const TITRE = "Mines — Cloud Paradise";
const DESCRIPTION =
  "Le poste de travail de l’exploration minière au Québec : suivi des titres et des échéances, forages en trois dimensions, couches SIGÉOM, reprojection et export. Conçu en Abitibi, serveurs au Québec.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: alternatesBilingues("/mines", "/en/mines", "fr"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "fr"),
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
  "→ lecture des collets X/Y/Z et des relevés de déviation",
  "→ calcul de desurvey — traces reconstruites",
  "→ export .geojson prêt pour la visionneuse 3D",
] as const;

/** Les gestes SIG : des opérations, pas un récit — d'où les cartes courtes. */
const OPERATIONS_SIG: readonly OperationSig[] = [
  {
    Icone: IconRefresh,
    titre: "Reprojection",
    texte: "NAD83 UTM 17N et 18N, MTM.",
  },
  {
    Icone: IconCube,
    titre: "Desurvey",
    texte: "Des relevés de déviation aux traces en trois dimensions.",
  },
  {
    Icone: IconFlask,
    titre: "Anomalies géochimiques",
    texte: "Repérage et mise en carte de vos résultats.",
  },
  {
    Icone: IconMapPin,
    titre: "Ombrage et courbes de niveau",
    texte: "Le relief, lisible d’un coup d’œil.",
  },
  {
    Icone: IconDownload,
    titre: "Export GPX",
    texte: "Vos points, exportés au format GPX pour un GPS Garmin.",
  },
  {
    Icone: IconWindow,
    titre: "QGIS Desktop en ligne",
    texte: "Le SIG complet, dans le navigateur.",
  },
];

export default function MinesPage() {
  return (
    <>
      <HreflangLinks fr="/mines" en="/en/mines" />
      <BreadcrumbJsonLd
        items={[
          { nom: "Accueil", chemin: "/" },
          { nom: "Mines", chemin: "/mines" },
        ]}
      />

      {/* Héros — texte seul, comme /securite : c'est une preuve de compétence,
          pas une page à effet. Deux sorties : la démo (principale) et le
          compte gratuit (secondaire). */}
      <section className="relative">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-4xl">
            <SurTitre>Exploration minière</SurTitre>
            <h1 className="mt-2 font-display text-[1.7rem] leading-[1.12] font-bold tracking-[-0.02em] text-white sm:text-[2.15rem] os:text-[2.5rem]">
              Le poste de travail de
              <br />
              l’exploration minière au Québec.
              <br />
              Conçu en Abitibi.
            </h1>
            <p className="mt-6 max-w-[60ch] text-[17px] leading-relaxed text-white/85">
              Vos titres, vos forages, vos couches et vos rapports dans le même
              espace de travail que le reste de vos dossiers. Les serveurs sont
              dans la même région que vous.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <BoutonCta href="/contact" taille="lg">
                Réservez une démo
              </BoutonCta>
              <LienOr href="https://app.cloudparadise.cloud/register">
                Créez votre compte
              </LienOr>
            </div>
          </Reveal>
        </div>
      </section>

      <AncresSections ancres={ANCRES} />

      {/* 1 — Les titres miniers */}
      <section id="titres" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <div className="grid gap-8 os:grid-cols-[2fr_3fr] os:items-start os:gap-12">
            <Reveal>
              <SurTitre>Les titres miniers</SurTitre>
              <TitreSection>Aucun claim ne tombe sans prévenir.</TitreSection>
            </Reveal>
            <Reveal delay={0.1}>
              {/* Fenêtre en tête de colonne (alignée au titre à gauche, grâce à
                  `items-start`), texte descriptif dessous : comble le vide sous
                  l'en-tête. La maquette n'a ni date ni numéro de titre réels. */}
              <WindowCard title="Bureau · Cloud Paradise">
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
                        Échéance de titre à venir
                      </p>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-white/70">
                        Un de vos titres approche de sa date d’expiration.
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
                      Rappel par courriel
                    </span>
                    <span className="text-xs text-white/60">
                      notification dans le bureau
                    </span>
                  </div>
                </div>
              </WindowCard>

              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-white/85">
                <p>
                  Vous suivez vos titres, et le calcul des dates d’expiration
                  déclenche une alerte avant l’échéance — par courriel et par
                  notification dans le bureau.
                </p>
                <p>Les couches GESTIM se superposent à vos cartes.</p>
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
              <SurTitre>Les forages</SurTitre>
              <TitreSection>
                De vos relevés à la trace en trois dimensions.
              </TitreSection>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4 text-[15px] leading-relaxed text-white/85">
                <p>
                  Vous déposez un ZIP de deux CSV : les collets X/Y/Z et les
                  relevés de déviation. Le calcul de desurvey produit les traces,
                  que la visionneuse 3D affiche — vous faites pivoter la vue et
                  vous suivez chaque forage sur toute sa longueur.
                </p>
                <p className="text-[13px] leading-relaxed text-white/70">
                  Entrée du calcul : <Ext>.zip</Ext> de deux <Ext>.csv</Ext>.
                  Entrée de la visionneuse : le fichier <Ext>.geojson</Ext>{" "}
                  produit par le desurvey.
                </p>
              </div>

              {/* La chaîne CSV → desurvey → traces 3D : du calcul déterministe
                  sur une opération que le public connaît par cœur — d'où la
                  fenêtre plutôt que la seule description. */}
              <WindowCard title="Desurvey · Cloud Paradise" className="mt-6">
                <JobPanel
                  title="Calculer les traces de forage"
                  chip="DONNÉES"
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
              <SurTitre>Les rapports</SurTitre>
              <TitreSection>Le premier jet est déjà écrit.</TitreSection>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4 text-[15px] leading-relaxed text-white/85">
                <p>
                  L’assistant rédige un premier jet à partir des données de
                  votre projet : rapport de travaux statutaires MRNF, sections
                  d’un rapport NI 43-101.
                </p>
                <p>
                  Vous lui demandez les modifications en langage courant, vous
                  révisez, vous corrigez, vous signez. Export PDF.
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
              <SurTitre>Les données ouvertes</SurTitre>
              <TitreSection>SIGÉOM, chargé par district.</TitreSection>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4 text-[15px] leading-relaxed text-white/85">
                <p>
                  Vous importez les couches SIGÉOM et MERN par district minier —
                  c’est opérationnel.
                </p>
                <p>
                  Vos autres couches se superposent par-dessus : <Ext>.gpkg</Ext>,{" "}
                  <Ext>.geojson</Ext>, <Ext>.kml</Ext>, et <Ext>.zip</Ext> pour
                  un shapefile compressé.
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
            <SurTitre>Le SIG</SurTitre>
            <TitreSection>Reprojeter, croiser, exporter.</TitreSection>
            <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-white/85">
              Les opérations SIG de l’exploration, dans le même espace de
              travail que vos données.
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
              <SurTitre>L’ancrage local</SurTitre>
              <TitreSection>Vos serveurs sont dans votre région.</TitreSection>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4 text-[15px] leading-relaxed text-white/85">
                <p>
                  Nos serveurs sont dans la même région que vos projets : Amos,
                  Val-d’Or, Rouyn-Noranda.
                </p>
                <p>
                  Le matériel appartient à Cloud Paradise, au Québec, en
                  Abitibi.
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
              badge={false}
              soustitre="Réservez une démo. On vous montre le poste de travail, adapté à l’exploration."
              bouton={{ href: "/contact", libelle: "Réservez une démo" }}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}

/** Sur-titre or, style système. */
function SurTitre({ children }: { children: ReactNode }) {
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
function TitreSection({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-2 font-display text-[1.6rem] leading-[1.2] font-bold tracking-tight text-balance text-[#eef4ff] sm:text-3xl os:text-4xl">
      {children}
    </h2>
  );
}

/** Extension de fichier, en mono discret : un géologue lit `.geojson` mieux
 *  en code qu'en prose. */
function Ext({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-white/[0.06] px-1 py-0.5 font-mono text-[0.85em] text-white/80">
      {children}
    </code>
  );
}

/** Lien or texte + flèche. */
function LienOr({ href, children }: { href: string; children: ReactNode }) {
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
