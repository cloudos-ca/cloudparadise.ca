import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import {
  AncresSections,
  type Ancre,
} from "@/components/marketing/AncresSections";
import { prixAbonnementDepuis } from "@/components/marketing/abonnements";
import { BoutonCta } from "@/components/marketing/BoutonCta";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";
import { FenetreCta } from "@/components/marketing/FenetreCta";
import { FenetrePlan } from "@/components/marketing/FenetrePlan";
import { HreflangLinks } from "@/components/marketing/HreflangLinks";
import { Reveal } from "@/components/marketing/Reveal";
import {
  IconCalendar,
  IconCube,
  IconFileText,
  IconGamepad,
  IconInfinity,
  IconMail,
  IconMessage,
  IconMovie,
  IconPhoto,
  IconSearch,
  IconSparkles,
  IconUsers,
  IconWindow,
} from "@/components/marketing/icons";
import { SECTION_Y, SHELL } from "@/components/marketing/tokens";
import { alternatesBilingues, openGraphPage } from "@/lib/seo";
import { lienInscription } from "@/lib/site";

const TITRE = "Platform — Cloud Paradise";
const DESCRIPTION =
  "A real desktop in your browser: windows, dock, files, professional applications and team collaboration. Like a local machine, nothing to install.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: alternatesBilingues("/plateforme", "/en/platform", "en"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "en", "/en/platform"),
};

const ANCRES: readonly Ancre[] = [
  { id: "bureau", libelle: { fr: "Le bureau", en: "The desktop" } },
  { id: "applications", libelle: { fr: "Les applications", en: "Applications" } },
  { id: "equipe", libelle: { fr: "L’équipe", en: "The team" } },
  { id: "jeux", libelle: { fr: "Jeux", en: "Games" } },
];

type Carte = { Icone: typeof IconWindow; titre: string; texte: string };

const BUREAU: Carte[] = [
  {
    Icone: IconWindow,
    titre: "Windows and dock",
    texte:
      "Movable, stackable, light and dark themes, a wallpaper that recolours the interface.",
  },
  {
    Icone: IconSearch,
    titre: "Spotlight",
    texte:
      "Full-text search inside your files, not just across their names. A voice shortcut (Ctrl+Alt+V) to open, close and arrange a window, or launch an application by name.",
  },
  {
    Icone: IconFileText,
    titre: "Your files",
    texte:
      "Storage, trash, sharing, drag and drop. Google Drive and OneDrive connected.",
  },
  {
    Icone: IconSparkles,
    titre: "Assistant and updates",
    texte:
      "Guided onboarding, documentation, notifications in the desktop and by email.",
  },
];

const APPLICATIONS: Carte[] = [
  {
    Icone: IconFileText,
    titre: "Office",
    texte: "Documents, spreadsheets, presentations — co-edited.",
  },
  {
    Icone: IconPhoto,
    titre: "Images",
    texte: "Quick retouching and layer-based editing.",
  },
  {
    Icone: IconMovie,
    titre: "Video and audio",
    texte: "Editing in the browser.",
  },
  {
    Icone: IconCube,
    titre: "3D and GIS",
    texte: "Blender and QGIS Desktop, streamed in an ephemeral session.",
  },
];

const EQUIPE: Carte[] = [
  {
    Icone: IconUsers,
    titre: "Team desktops",
    texte:
      "Several desktops, sharing between teams, invitations and approvals.",
  },
  {
    Icone: IconMessage,
    titre: "Messaging",
    texte: "Channels, direct messages, presence.",
  },
  {
    Icone: IconMail,
    titre: "Email",
    texte:
      "A @cloudparadise.ca address and built-in webmail. Connect an external account (Gmail, Outlook) too, via IMAP/SMTP or OAuth.",
  },
  {
    Icone: IconCalendar,
    titre: "Calendar and contacts",
    texte:
      "Shared calendar, reminders, and sync with an external CalDAV/CardDAV-compatible service.",
  },
];

const JEUX: Carte[] = [
  {
    Icone: IconGamepad,
    titre: "Game studio",
    texte:
      "Describe a game in conversation; the AI discusses the mechanics, writes it, compiles it and tests it automatically before handing it to you. One credit per compile; playing and rolling back are free.",
  },
  {
    Icone: IconInfinity,
    titre: "Arcades",
    texte:
      "A free HTML5 games room, searchable from Spotlight, ranked on what can actually be measured — games played, games tried, active-day streaks.",
  },
];

export default function PlateformePageEn() {
  return (
    <>
      <HreflangLinks fr="/plateforme" en="/en/platform" />
      <BreadcrumbJsonLd
        items={[
          { nom: "Home", chemin: "/en" },
          { nom: "Platform", chemin: "/en/platform" },
        ]}
      />

      {/* Héros — texte à gauche, capture du bureau en pleine largeur dessous
          (le vrai visuel est ultra-large : il respire bien mieux ainsi que
          coincé dans une colonne). */}
      <section className="relative">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-3xl">
            <SurTitre>Platform</SurTitre>
            <h1 className="mt-2 font-display text-[2rem] leading-[1.08] font-bold tracking-[-0.02em] text-white sm:text-[2.9rem] os:text-[3.35rem]">
              Not a dashboard.
              <br />
              A real desktop.
            </h1>
            <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-white/85">
              Windows, dock, files, applications, team. The same working
              environment you have on your own machine, in your browser, with
              nothing to install.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <BoutonCta
                href={lienInscription("plateforme-hero")}
                taille="lg"
              >
                Create your desktop for free
              </BoutonCta>
              <LienOr href="/en/pricing">See pricing</LienOr>
            </div>
            <p className="mt-4 text-[13px] text-white/60">
              Also available as a subscription,{" "}
              <a
                href="/en/pricing#abonnements"
                data-cp-accent
                className="text-cp-subtle underline-offset-4 hover:text-[var(--acc-text)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {prixAbonnementDepuis("en")}
              </a>
              .
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <Capture
              src="/plateforme/bureau.jpg"
              width={2048}
              height={760}
              alt="The Cloud Paradise desktop: wallpaper, application dock on the left and bottom bar."
              priority
            />
          </Reveal>
        </div>
      </section>

      {/* Barre d'ancres — non collante, état actif en or */}
      <AncresSections ancres={ANCRES} lang="en" />

      <SectionAncre
        id="bureau"
        surtitre="The desktop"
        titre="Everything is where you left it."
        texte="You open a session and your windows, your files and your running tasks are exactly in the state you left them."
        cartes={BUREAU}
      />

      <SectionAncre
        id="applications"
        surtitre="Applications"
        titre={
          <>
            Your files never leave
            <br />
            your own space.
          </>
        }
        texte="You open, you edit, you save. Nothing to upload somewhere else, nothing to re-import afterwards."
        cartes={APPLICATIONS}
      >
        <Reveal delay={0.15} className="mt-8">
          <FenetrePlan lang="en" />
        </Reveal>
      </SectionAncre>

      <SectionAncre
        id="equipe"
        surtitre="The team"
        titre="The same desktop, together."
        texte="Create team desktops, invite whoever you want, approve access. Messaging, email and calendar are already inside."
        cartes={EQUIPE}
      />

      {/* Jeux — Studio de jeux et Arcades, livrés récemment et jamais montrés
          sur la vitrine avant cette section. Deux cartes seulement : la
          grille sm:grid-cols-2 se remplit exactement, pas de case vide. */}
      <SectionAncre
        id="jeux"
        surtitre="Games"
        titre="A game studio, and a free arcade."
        texte="From conversation to a playable game, tested before it’s handed to you — plus a free games room, right next to it."
        cartes={JEUX}
      />

      {/* Closer */}
      <section className="relative overflow-x-clip">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal>
            <FenetreCta
              lang="en"
              soustitre="Create your desktop, open your applications, invite your team — today."
              bouton={{
                href: lienInscription("plateforme-closer"),
                libelle: "Create your desktop for free",
              }}
              lien={{ href: "/en/pricing", libelle: "See pricing" }}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}

/** Sur-titre or, style système de l'accueil — collé au titre. */
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

/** Lien or texte + flèche, comme partout sur l'accueil. */
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
 * En-tête de section (à gauche) + grille 2 × 2. Icônes secondaires en bleu
 * `--soft`, la valeur exacte lue sur « Vos outils » de l'accueil.
 */
function SectionAncre({
  id,
  surtitre,
  titre,
  texte,
  cartes,
  children,
}: Readonly<{
  id: string;
  surtitre: string;
  titre: ReactNode;
  texte: string;
  cartes: Carte[];
  children?: ReactNode;
}>) {
  return (
    <section id={id} className="relative scroll-mt-24">
      <div className={`${SHELL} ${SECTION_Y}`}>
        <Reveal className="max-w-2xl">
          <SurTitre>{surtitre}</SurTitre>
          <h2 className="mt-2 max-w-[24ch] font-display text-[1.6rem] leading-[1.2] font-bold tracking-tight text-balance text-[#eef4ff] sm:text-3xl os:text-4xl">
            {titre}
          </h2>
          <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-white/85">
            {texte}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 grid gap-3.5 sm:grid-cols-2">
          {cartes.map(({ Icone, titre, texte }) => (
            <div
              key={titre}
              className="flex gap-4 rounded-xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors hover:border-white/15"
            >
              <span
                className="grid size-10 shrink-0 place-items-center rounded-lg"
                style={{
                  background: "color-mix(in srgb, var(--soft) 12%, transparent)",
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

        {children}
      </div>
    </section>
  );
}

/**
 * Capture réelle, encadrée sobrement (bord + ombre, comme les fenêtres du
 * site). Le visuel porte déjà son propre chrome (barre du bureau, titre de
 * fenêtre), donc pas de cadre « fenêtre » supplémentaire par-dessus.
 */
function Capture({
  src,
  width,
  height,
  alt,
  priority = false,
}: Readonly<{
  src: string;
  width: number;
  height: number;
  alt: string;
  priority?: boolean;
}>) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 shadow-[0_24px_50px_-14px_rgba(0,0,0,.55)]">
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        priority={priority}
        sizes="(min-width: 1280px) 1216px, 100vw"
        className="h-auto w-full"
      />
    </div>
  );
}
