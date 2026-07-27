import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import {
  AncresSections,
  type Ancre,
} from "@/components/marketing/AncresSections";
import { BoutonCta } from "@/components/marketing/BoutonCta";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";
import { FenetreCta } from "@/components/marketing/FenetreCta";
import { HreflangLinks } from "@/components/marketing/HreflangLinks";
import { Reveal } from "@/components/marketing/Reveal";
import {
  IconCalendar,
  IconCube,
  IconFileText,
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

const TITRE = "Plateforme — Cloud Paradise";
const DESCRIPTION =
  "Un vrai bureau en ligne : fenêtres, dock, fichiers, applications professionnelles et collaboration d’équipe. Le même environnement qu’en local, sans rien installer.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: alternatesBilingues("/plateforme", "/en/plateforme", "fr"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "fr"),
};

const ANCRES: readonly Ancre[] = [
  { id: "bureau", libelle: { fr: "Le bureau", en: "The desktop" } },
  { id: "applications", libelle: { fr: "Les applications", en: "Applications" } },
  { id: "equipe", libelle: { fr: "L’équipe", en: "The team" } },
];

type Carte = { Icone: typeof IconWindow; titre: string; texte: string };

const BUREAU: Carte[] = [
  {
    Icone: IconWindow,
    titre: "Fenêtres et dock",
    texte: "Déplaçables, empilables, thème jour/nuit, fond d’écran au choix.",
  },
  {
    Icone: IconSearch,
    titre: "Spotlight",
    texte:
      "Recherche plein-texte à l’intérieur de vos fichiers, pas juste les noms.",
  },
  {
    Icone: IconFileText,
    titre: "Vos fichiers",
    texte:
      "Stockage, corbeille, partage, glisser-déposer. Google Drive et OneDrive branchés.",
  },
  {
    Icone: IconSparkles,
    titre: "Assistant et suivi",
    texte:
      "Parcours d’accueil, documentation, notifications dans le bureau et par courriel.",
  },
];

const APPLICATIONS: Carte[] = [
  {
    Icone: IconFileText,
    titre: "Bureautique",
    texte: "Texte, tableur, présentation — en co-édition.",
  },
  {
    Icone: IconPhoto,
    titre: "Image",
    texte: "Retouche rapide et édition par calques.",
  },
  {
    Icone: IconMovie,
    titre: "Vidéo et audio",
    texte: "Montage dans le navigateur.",
  },
  {
    Icone: IconCube,
    titre: "3D et SIG",
    texte: "Blender et QGIS Desktop, streamés en session éphémère.",
  },
];

const EQUIPE: Carte[] = [
  {
    Icone: IconUsers,
    titre: "Bureaux d’équipe",
    texte:
      "Plusieurs bureaux, partage entre équipes, invitations et approbation.",
  },
  {
    Icone: IconMessage,
    titre: "Messagerie",
    texte: "Canaux, messages directs, présence.",
  },
  {
    Icone: IconMail,
    titre: "Courriel",
    texte: "Adresse @cloudparadise.ca et webmail intégré.",
  },
  {
    Icone: IconCalendar,
    titre: "Agenda",
    texte: "Agenda partagé et rappels.",
  },
];

export default function PlateformePage() {
  return (
    <>
      <HreflangLinks fr="/plateforme" en="/en/plateforme" />
      <BreadcrumbJsonLd
        items={[
          { nom: "Accueil", chemin: "/" },
          { nom: "Plateforme", chemin: "/plateforme" },
        ]}
      />

      {/* Héros — texte à gauche, capture du bureau en pleine largeur dessous
          (le vrai visuel est ultra-large : il respire bien mieux ainsi que
          coincé dans une colonne). */}
      <section className="relative">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-3xl">
            <SurTitre>Plateforme</SurTitre>
            <h1 className="mt-2 font-display text-[2rem] leading-[1.08] font-bold tracking-[-0.02em] text-white sm:text-[2.9rem] os:text-[3.35rem]">
              Pas un tableau de bord.
              <br />
              Un vrai bureau.
            </h1>
            <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-white/85">
              Fenêtres, dock, fichiers, applications, équipe. Le même
              environnement de travail qu’en local, dans votre navigateur, sans
              rien installer.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <BoutonCta
                href="https://app.cloudparadise.cloud/register"
                taille="lg"
              >
                Créez votre bureau gratuitement
              </BoutonCta>
              <LienOr href="/tarifs">Voir les tarifs</LienOr>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <Capture
              src="/plateforme/bureau.jpg"
              width={2048}
              height={760}
              alt="Le bureau Cloud Paradise : fond d’écran, dock d’applications à gauche et barre inférieure."
              priority
            />
          </Reveal>
        </div>
      </section>

      {/* Barre d'ancres — non collante, état actif en or */}
      <AncresSections ancres={ANCRES} />

      <SectionAncre
        id="bureau"
        surtitre="Le bureau"
        titre="Tout est là où vous l’avez laissé."
        texte="Vous ouvrez une session, vos fenêtres, vos fichiers et vos tâches en cours sont exactement dans l’état où vous les avez quittés."
        cartes={BUREAU}
      />

      <SectionAncre
        id="applications"
        surtitre="Les applications"
        titre={
          <>
            Vos fichiers ne sortent
            <br />
            jamais de votre espace.
          </>
        }
        texte="Vous ouvrez, vous modifiez, vous enregistrez. Rien à téléverser ailleurs, rien à réimporter ensuite."
        cartes={APPLICATIONS}
      >
        <Reveal delay={0.15} className="mt-8">
          <Capture
            src="/plateforme/plan.jpg"
            width={2048}
            height={756}
            alt="Un plan Cloud Paradise : la conversion d’un document, sa spécification, son exécution et le résultat à télécharger."
          />
        </Reveal>
      </SectionAncre>

      <SectionAncre
        id="equipe"
        surtitre="L’équipe"
        titre="Le même bureau, à plusieurs."
        texte="Créez des bureaux d’équipe, invitez qui vous voulez, approuvez les accès. La discussion, le courriel et l’agenda sont déjà dedans."
        cartes={EQUIPE}
      />

      {/* Closer */}
      <section className="relative overflow-x-clip">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal>
            <FenetreCta
              soustitre="Créez votre bureau, ouvrez vos applications, invitez votre équipe — dès aujourd’hui."
              bouton={{
                href: "https://app.cloudparadise.cloud/register",
                libelle: "Créez votre bureau gratuitement",
              }}
              lien={{ href: "/tarifs", libelle: "Voir les tarifs" }}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}

/** Sur-titre or, style système de l'accueil — collé au titre. */
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

/** Lien or texte + flèche, comme partout sur l'accueil. */
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
}: {
  id: string;
  surtitre: string;
  titre: ReactNode;
  texte: string;
  cartes: Carte[];
  children?: ReactNode;
}) {
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
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  priority?: boolean;
}) {
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
