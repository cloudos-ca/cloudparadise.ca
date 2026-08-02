import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  AncresSections,
  type Ancre,
} from "@/components/marketing/AncresSections";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";
import { FenetreCta } from "@/components/marketing/FenetreCta";
import { HreflangLinks } from "@/components/marketing/HreflangLinks";
import { Reveal } from "@/components/marketing/Reveal";
import { libelleDe } from "@/components/marketing/offre";
import { SECTION_Y, SHELL } from "@/components/marketing/tokens";
import { alternatesBilingues, openGraphPage } from "@/lib/seo";
import { lienInscription } from "@/lib/site";

const TITRE = "Features — Cloud Paradise";
const DESCRIPTION =
  "The complete list of what the workstation can do: the desktop, applications, compute, automation, teamwork, mineral exploration and account management.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: alternatesBilingues("/fonctions", "/en/features", "en"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "en", "/en/features"),
};

/**
 * Une entrée = une fonctionnalité.
 *
 * `lien` ne sert qu'aux renvois qui sortent de la page de la section : celle-ci
 * porte déjà son lien dans son en-tête, et le répéter sur chaque ligne ferait
 * huit fois le même renvoi.
 */
type Entree = {
  nom: string;
  texte: string;
  lien?: { href: string; libelle: string };
};

type SectionFonctions = {
  id: string;
  surtitre: string;
  titre: string;
  /** Ligne d'orientation sous le titre. Absente quand elle n'apprendrait rien. */
  intro?: string;
  /** La page qui développe les entrées de la section. */
  page: { href: string; libelle: string };
  entrees: readonly Entree[];
};

const PLATEFORME = { href: "/en/platform", libelle: "See the platform" };
const CALCUL = { href: "/en/compute", libelle: "See compute" };
const MINES = { href: "/en/mining", libelle: "See mineral exploration" };
const TARIFS = { href: "/en/pricing", libelle: "See pricing" };

/**
 * Le contenu de la page.
 *
 * Les entrées qui correspondent à un type facturé lisent leur nom dans
 * `offre.ts` plutôt que de le réécrire : /tarifs et /fonctions listent alors le
 * même libellé par construction, et un renommage se propage tout seul. C'est la
 * page où une divergence se verrait le plus, puisque tout y est côte à côte.
 */
const SECTIONS: readonly SectionFonctions[] = [
  {
    id: "bureau",
    surtitre: "Your desktop",
    titre: "The desktop, and what is inside it.",
    page: PLATEFORME,
    entrees: [
      {
        nom: "Windows and dock",
        texte:
          "Movable and stackable windows, a dock, a light and dark theme.",
      },
      {
        nom: "Files",
        texte: "Storage, folders, trash, sharing, drag and drop.",
      },
      {
        nom: "Google Drive and OneDrive connections",
        texte: "Your Drive and OneDrive files, reachable from your desktop.",
      },
      {
        // Ici et pas dans « Vos applications » : l'app est `hidden` au registre,
        // elle ne se lance ni depuis le dock ni depuis le lanceur — s'ouvrir en
        // double-cliquant un fichier est un comportement du bureau, pas une
        // application qu'on irait chercher. Le passage aperçu → édition est ce
        // qui la distingue d'un simple stockage : c'est la partie à dire.
        nom: "File preview",
        texte:
          "Open an image, a video or a sound file straight in the desktop, with no download. A button sends you to the matching editing application.",
      },
      {
        nom: "Spotlight",
        texte:
          "Full-text search inside your files, not only across their names.",
      },
      {
        nom: "Wallpaper",
        texte:
          "Choose your image: the interface adjusts its colours to match it.",
      },
      {
        nom: "Assistant",
        texte:
          "You describe the task in plain language; it builds the plan and runs it.",
      },
      {
        nom: "Built-in documentation",
        texte:
          "A knowledge base inside the desktop, covering every feature and every application. It follows the product as it evolves.",
      },
      {
        nom: "Notifications",
        texte:
          "In the desktop and by email: task finished, deadline approaching.",
      },
      {
        nom: "Monitor",
        texte: "Live tracking of your tasks and their logs.",
      },
    ],
  },
  {
    id: "applications",
    surtitre: "Your applications",
    titre: "The applications, in the browser.",
    intro:
      "Streamed and hosted applications open on a computer screen; they are hidden on mobile.",
    page: PLATEFORME,
    entrees: [
      {
        nom: "Office",
        texte: "Documents, spreadsheets and presentations, co-edited.",
      },
      { nom: "Image", texte: "Quick retouching and layer-based editing." },
      { nom: "Video", texte: "Editing and encoding in the browser." },
      { nom: "Audio", texte: "Sound editing and processing." },
      { nom: "3D", texte: "Blender, streamed in an ephemeral session." },
      { nom: "GIS", texte: "QGIS Desktop, streamed in an ephemeral session." },
      { nom: "PDF reader", texte: "Your PDFs open in the desktop." },
    ],
  },
  {
    id: "calcul",
    surtitre: "Your compute tasks",
    titre: "The tasks you launch.",
    page: CALCUL,
    entrees: [
      {
        nom: libelleDe("Documents", "en"),
        texte:
          "Convert, search inside the content, classify, generate in batches.",
      },
      {
        nom: libelleDe("Données", "en"),
        texte:
          "Query, cross-reference, visualize — read-only on your sources.",
      },
      {
        nom: libelleDe("Images", "en"),
        texte: "Resize, convert, retouch in batches.",
      },
      {
        nom: libelleDe("Génération d'images", "en"),
        texte: "An image produced from your description.",
      },
      {
        nom: libelleDe("Média", "en"),
        texte: "Encode, convert, extract a track, process in batches.",
      },
      {
        nom: libelleDe("Scraping", "en"),
        texte:
          "Put what interests you on a site into a table, retrieve files in bulk.",
      },
    ],
  },
  {
    // L'identifiant reste `puissance` : il est dans des liens et des ancres.
    // Seul le texte change — « the power » promettait une quantité que les
    // plafonds réels démentent, là où « the compute » dit ce qui est vraiment
    // servi. Aucune fiche technique matérielle, règle du plan de contenu.
    id: "puissance",
    surtitre: "The compute",
    titre: "Exact compute runs on our side.",
    page: CALCUL,
    entrees: [
      {
        nom: libelleDe("Calcul GPU", "en"),
        texte:
          "The workloads that need a graphics card — from a template, from your code, or from your files.",
      },
      {
        nom: libelleDe("Rendu 3D", "en"),
        texte: "Your scenes computed on GPU; you collect the render.",
      },
      {
        nom: libelleDe("Impression 3D", "en"),
        texte: "A model prepared and sliced for printing.",
      },
      {
        nom: libelleDe("Simulation", "en"),
        texte: "A simulation launched from parameters — nothing to upload.",
      },
      // L'entrée de regroupement reste, et chaque geste prend sa ligne en
      // dessous : sur une page de référence, c'est la ligne nommée qui répond
      // au Ctrl-F d'un évaluateur, pas le résumé qui la précède.
      {
        nom: "Geomatics and GIS",
        texte: "Reprojection, layer cross-referencing, export.",
        lien: MINES,
      },
      {
        nom: "Reprojection",
        texte: "NAD83 UTM 17N and 18N, MTM.",
      },
      {
        nom: "Desurvey",
        texte: "From your downhole surveys to traces in three dimensions.",
      },
      {
        nom: "Geochemical anomalies",
        texte: "Spotting your results and putting them on the map.",
      },
      {
        nom: "Hillshade and contour lines",
        texte: "The relief, readable at a glance.",
      },
      {
        nom: "GPX export",
        texte: "Your waypoints, exported for a Garmin GPS.",
      },
    ],
  },
  {
    id: "automatisation",
    surtitre: "Automate and deliver",
    titre: "Once, or every Monday morning.",
    page: CALCUL,
    entrees: [
      {
        nom: "Flows",
        texte: "Several treatments chained into a single sequence.",
      },
      {
        nom: "Schedules",
        texte: "A flow that starts on its own, at the time you set.",
      },
      {
        nom: "Reports",
        texte:
          "Chart builder, PDF export, delivery that can be scheduled by email.",
      },
      {
        nom: "Download manager",
        texte:
          "Fetch a file from an external address without going through your own machine. You can shut your computer down, the download carries on — and it resumes where it stopped if something goes wrong.",
      },
    ],
  },
  {
    id: "equipe",
    surtitre: "Together",
    titre: "The same desktop, together.",
    page: PLATEFORME,
    entrees: [
      {
        nom: "Team desktops",
        texte:
          "Several desktops, sharing between teams, invitations and access approval.",
      },
      { nom: "Messaging", texte: "Channels, direct messages, presence." },
      {
        nom: "Email",
        texte:
          "Built-in webmail, with a @cloudparadise.ca address you activate from your desktop.",
      },
      { nom: "Calendar", texte: "Shared calendar and reminders." },
    ],
  },
  {
    id: "mines",
    surtitre: "Mineral exploration",
    titre: "The tools of exploration.",
    page: MINES,
    entrees: [
      {
        // « le calcul des échéances » était faux : GESTIM n'offre aucun service
        // interrogeable, les dates sont saisies à la main. Ce qui est calculé,
        // c'est le décompte jusqu'à la date, et c'est lui qui déclenche l'alerte.
        nom: "Mining titles",
        texte:
          "You enter your titles and their deadlines; the countdown is tracked and you are alerted before the date.",
      },
      {
        nom: "3D drill holes",
        texte:
          "The desurvey of your surveys, and the traces displayed in three dimensions.",
      },
      {
        nom: "Exploration report",
        texte:
          "A first draft written from your project data, which you then review.",
      },
      {
        // « feuillet SNRC » n'existe nulle part dans le code d'import : la
        // requête se fait par emprise géographique d'un district minier, plus
        // un thème. Balayé sur /mines et /en/mining le 2026-07-28.
        nom: "SIGÉOM open data",
        texte: "The SIGÉOM layers, imported by mining district.",
      },
      {
        nom: "Layer import",
        texte: ".gpkg, .geojson, .kml, and .zip for a compressed shapefile.",
      },
    ],
  },
  {
    id: "compte",
    surtitre: "Your account",
    titre: "Your credits, your invoices, your access.",
    page: TARIFS,
    entrees: [
      {
        nom: "Credits and top-up",
        texte: "Your balance, and a top-up whenever you want one.",
      },
      {
        nom: "Invoices",
        texte:
          "Your invoices, viewable and downloadable from your account.",
      },
      {
        // Sans lien vers /securite : « Clés API », juste en dessous, en porte
        // déjà un — deux fois le même renvoi à la suite ne guide plus, il
        // encombre.
        nom: "Second factor at sign-in",
        texte:
          "A code by email at every sign-in, so that no account rests on a password alone.",
      },
      {
        nom: "API keys",
        texte: "A limited scope, and an expiry date you set.",
        lien: { href: "/en/security", libelle: "See security" },
      },
      {
        nom: "Onboarding tour",
        texte: "A guided tour of the desktop, the first time you open it.",
      },
    ],
  },
];

/** Une ancre par section — la seule navigation possible sur une page si longue. */
const ANCRES: readonly Ancre[] = [
  { id: "bureau", libelle: { fr: "Le bureau", en: "Desktop" } },
  { id: "applications", libelle: { fr: "Applications", en: "Applications" } },
  { id: "calcul", libelle: { fr: "Calcul", en: "Compute" } },
  { id: "puissance", libelle: { fr: "Calcul", en: "Compute" } },
  { id: "automatisation", libelle: { fr: "Automatiser", en: "Automate" } },
  { id: "equipe", libelle: { fr: "À plusieurs", en: "Together" } },
  { id: "mines", libelle: { fr: "Mines", en: "Mining" } },
  { id: "compte", libelle: { fr: "Compte", en: "Account" } },
];

export default function FonctionsPageEn() {
  return (
    <>
      <HreflangLinks fr="/fonctions" en="/en/features" />
      <BreadcrumbJsonLd
        items={[
          { nom: "Home", chemin: "/en" },
          { nom: "Features", chemin: "/en/features" },
        ]}
      />

      {/* Héros — court, sans bouton : cette page n'est pas une page de
          conversion, elle se consulte. Le closer en bas suffit. */}
      <section className="relative">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-3xl">
            <SurTitre>Features</SurTitre>
            <h1 className="mt-2 font-display text-[1.9rem] leading-[1.1] font-bold tracking-[-0.02em] text-white sm:text-[2.4rem] os:text-[2.8rem]">
              Everything the
              <br />
              workstation can do.
            </h1>
            <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-white/85">
              The complete list, by use. What is here is available today.
            </p>
          </Reveal>
        </div>
      </section>

      <AncresSections ancres={ANCRES} lang="en" />

      {SECTIONS.map((section) => (
        <SectionListe key={section.id} section={section} />
      ))}

      {/* Closer */}
      <section className="relative overflow-x-clip">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal>
            <FenetreCta
              lang="en"
              soustitre="Create your account and open the desktop — everything listed here is already inside."
              bouton={{
                href: lienInscription("fonctions-closer"),
                libelle: "Start for free",
              }}
              lien={{ href: "/en/pricing", libelle: "See pricing" }}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}

/**
 * Une section : en-tête à gauche, liste à droite — le gabarit des pages à
 * sections du site.
 *
 * La liste est une `<dl>` : un nom, sa définition. C'est la structure exacte de
 * ce que la page est, et elle donne aux moteurs de recherche le couple
 * terme/description plutôt qu'une suite de paragraphes indistincts.
 */
function SectionListe({ section }: Readonly<{ section: SectionFonctions }>) {
  const { id, surtitre, titre, intro, page, entrees } = section;
  return (
    <section id={id} className="relative scroll-mt-24">
      <div className={`${SHELL} ${SECTION_Y}`}>
        <div className="grid gap-6 os:grid-cols-[2fr_3fr] os:items-start os:gap-12">
          <Reveal>
            <SurTitre>{surtitre}</SurTitre>
            <h2 className="mt-2 font-display text-[1.5rem] leading-[1.2] font-bold tracking-tight text-balance text-[#eef4ff] sm:text-[1.75rem] os:text-[2rem]">
              {titre}
            </h2>
            {intro ? (
              <p className="mt-4 max-w-[46ch] text-[13px] leading-relaxed text-white/75">
                {intro}
              </p>
            ) : null}
            <div className="mt-4">
              <LienOr href={page.href}>{page.libelle}</LienOr>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01]">
              {entrees.map(({ nom, texte, lien }) => (
                <div
                  key={nom}
                  className="grid gap-x-6 gap-y-1 px-5 py-3.5 sm:grid-cols-[minmax(0,11rem)_1fr]"
                >
                  <dt className="font-display text-[14px] font-semibold text-white">
                    {nom}
                  </dt>
                  <dd className="text-[13px] leading-relaxed text-white/85">
                    {texte}
                    {lien ? (
                      <>
                        {" "}
                        <LienOr href={lien.href} petit>
                          {lien.libelle}
                        </LienOr>
                      </>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
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

/**
 * Lien or texte + flèche. `petit` le fait tenir dans la ligne d'une entrée,
 * où il suit une phrase au lieu de vivre seul sous un titre.
 */
function LienOr({
  href,
  children,
  petit = false,
}: Readonly<{
  href: string;
  children: ReactNode;
  petit?: boolean;
}>) {
  return (
    <a
      href={href}
      className={`group inline-flex items-baseline gap-1 font-medium transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
        petit ? "text-[13px]" : "gap-1.5 text-sm"
      }`}
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
