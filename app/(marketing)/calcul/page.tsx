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

const TITRE = "Calcul lourd et rendu 3D — Cloud Paradise";
const DESCRIPTION =
  "Un seul endroit pour vos tâches lourdes : documents, données, images et vidéos, web, calcul 3D. Décrivez le résultat ; un moteur déterministe le produit.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: alternatesBilingues("/calcul", "/en/compute", "fr"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "fr"),
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
    surtitre: "Vos documents",
    factures: ["Documents"],
    titre: "Convertir, chercher, classer.",
    texte:
      "Vous déposez vos fichiers et vous décrivez le résultat voulu. Le contenu ne quitte jamais votre espace.",
    exemples: [
      { entree: "200 contrats PDF", sortie: "un tableur avec toutes les dates d’échéance" },
      {
        entree: "« Où est-il question de garantie ? »",
        sortie: "les passages exacts, dans tous vos documents",
      },
      { entree: "un modèle et une liste de 500 clients", sortie: "500 lettres personnalisées" },
      { entree: "des dossiers sensibles", sortie: "une archive chiffrée, prête à partager" },
    ],
  },
  {
    id: "donnees",
    surtitre: "Vos données",
    factures: ["Données"],
    titre: "De la donnée brute à la décision.",
    texte: "Interrogez, croisez, visualisez — en lecture seule sur vos sources.",
    exemples: [
      { entree: "un export comptable de 12 mois", sortie: "un tableau de bord de trésorerie" },
      {
        entree: "« Le chiffre d’affaires par région, ce trimestre »",
        sortie: "la réponse, sans écrire une requête SQL",
      },
      { entree: "un jeu de données", sortie: "un diagramme prêt à coller dans votre présentation" },
    ],
  },
  {
    id: "medias",
    surtitre: "Vos images et vidéos",
    factures: ["Images", "Média", "Génération d'images"],
    titre: "Vos médias, par lots.",
    texte: "Traitez, encodez, générez, triez — sans bloquer votre machine.",
    exemples: [
      { entree: "5 000 photos", sortie: "toutes redimensionnées et au bon format, d’un coup" },
      { entree: "une vidéo 4K", sortie: "réencodée en H.265, prête à diffuser" },
      { entree: "« une bannière pour la promo d’été »", sortie: "l’image, générée" },
      { entree: "un dossier de photos en vrac", sortie: "triées par sujet, automatiquement" },
    ],
  },
  {
    id: "web",
    surtitre: "Le web",
    factures: ["Scraping"],
    titre: "Le web, en tableau.",
    texte: "Extrayez ce qui vous intéresse, récupérez des fichiers en masse.",
    exemples: [
      { entree: "un catalogue en ligne", sortie: "un tableur avec les prix et les disponibilités" },
      { entree: "300 liens de téléchargement", sortie: "tous les fichiers récupérés et rangés" },
    ],
  },
  {
    id: "calcul-lourd",
    surtitre: "Le calcul lourd",
    factures: ["Calcul GPU", "Rendu 3D", "Impression 3D", "Simulation"],
    titre: "La puissance, à la demande.",
    texte: "Le matériel lourd tourne chez nous ; vous n’avez qu’à récupérer le résultat.",
    exemples: [
      { entree: "une scène Blender", sortie: "le rendu final, calculé sur GPU" },
      { entree: "un modèle 3D", sortie: "un fichier prêt pour l’impression" },
    ],
  },
];

const HERO_LOGS = [
  "→ lecture de 200 fichiers .pdf",
  "→ repérage des dates d’échéance",
  "→ tableur prêt · 200/200",
] as const;

const WORKFLOW = ["Extraction web", "Données structurées", "Rapport PDF"] as const;

export default function CalculPage() {
  return (
    <>
      <HreflangLinks fr="/calcul" en="/en/compute" />
      <BreadcrumbJsonLd
        items={[
          { nom: "Accueil", chemin: "/" },
          { nom: "Calcul", chemin: "/calcul" },
        ]}
      />

      {/* Héros */}
      <section className="relative">
        <div
          className={`${SHELL} ${SECTION_Y} grid gap-12 os:grid-cols-[1.45fr_1fr] os:items-center os:gap-10`}
        >
          <Reveal>
            <SurTitre>Calcul</SurTitre>
            <h1 className="mt-2 font-display text-[2rem] leading-[1.1] font-bold tracking-[-0.02em] text-white sm:text-[2.2rem] os:text-[2.4rem]">
              Un seul endroit.
              <br />
              Toutes vos tâches lourdes.
            </h1>
            <p className="mt-6 max-w-[56ch] text-[15px] leading-relaxed text-white/85">
              Décrivez ce que vous voulez obtenir. L’intelligence artificielle
              lit votre demande et choisit comment s’y prendre — mais elle ne
              calcule jamais le résultat elle-même. Un moteur déterministe s’en
              charge et produit une réponse exacte, reproductible, jamais
              inventée.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <BoutonCta
                href={LIEN_INSCRIPTION}
                taille="lg"
              >
                Lancez votre première tâche
              </BoutonCta>
              <LienOr href="/tarifs">Voir les tarifs</LienOr>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mx-auto w-full max-w-[520px]">
            <WindowCard title="Plan · Cloud Paradise">
              <JobPanel
                title="Extraire les échéances de 200 contrats"
                chip={libelleDe("Documents", "fr").toUpperCase()}
                logs={HERO_LOGS}
              />
            </WindowCard>
          </Reveal>
        </div>
      </section>

      {/* Barre d'ancres — non collante, état actif en or */}
      <AncresSections ancres={ANCRES} />

      {GESTES.map((geste) => (
        <GesteSection key={geste.id} geste={geste} />
      ))}

      {/* Automatisation */}
      <section id="automatisation" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <div className="grid items-center gap-10 os:grid-cols-[1fr_1fr] os:gap-14">
            <Reveal className="max-w-xl">
              <SurTitre>Automatisation</SurTitre>
              <h2 className="mt-2 max-w-[20ch] font-display text-[1.6rem] leading-[1.2] font-bold tracking-tight text-balance text-[#eef4ff] sm:text-3xl os:text-4xl">
                Une fois. Ou tous les lundis matin.
              </h2>
              <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-white/85">
                Enchaînez plusieurs traitements en un seul flux, planifiez son
                exécution, et recevez le rapport — graphiques et PDF — livré par
                courriel.
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mx-auto w-full max-w-[480px]">
              <WindowCard title="Flux · Cloud Paradise">
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
                      Cédule · tous les lundis, 8 h
                    </span>
                    <span
                      className="rounded-md px-2.5 py-1 text-[11px] font-medium"
                      style={{
                        background:
                          "color-mix(in srgb, var(--soft) 14%, transparent)",
                        color: "var(--soft)",
                      }}
                    >
                      Livré par courriel
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
              soustitre="Décrivez votre première tâche. On s’occupe du reste."
              bouton={{
                href: LIEN_INSCRIPTION,
                libelle: "Lancez votre première tâche",
              }}
              lien={{ href: "/tarifs", libelle: "Voir les tarifs" }}
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
    geste.factures.length === 1 ? libelleDe(geste.factures[0], "fr") : null;
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
                  {" · facturé "}
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
                <LienOr href="/tarifs">Voir le détail des tarifs</LienOr>
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
 * Dore les nombres « purs » d'une chaîne (« 200 », « 10 000 »), sans toucher à
 * ceux collés à une lettre (« 4K », « H.265 ») — les chiffres mis en évidence
 * sont en or.
 */
const NOMBRE =
  /((?<![\p{L}\d.])\d[\d\u00A0\u0020]*\d(?![\p{L}\d])|(?<![\p{L}\d.])\d(?![\p{L}\d]))/gu;

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
