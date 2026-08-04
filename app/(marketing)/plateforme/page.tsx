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

const TITRE = "Plateforme — Cloud Paradise";
const DESCRIPTION =
  "Un vrai bureau en ligne : fenêtres, dock, fichiers, applications professionnelles et collaboration d’équipe. Comme en local, sans rien installer.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: alternatesBilingues("/plateforme", "/en/platform", "fr"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "fr", "/plateforme"),
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
    titre: "Fenêtres et dock",
    texte:
      "Déplaçables, empilables, thème jour/nuit, fond d’écran qui recolore l’interface.",
  },
  {
    Icone: IconSearch,
    titre: "Spotlight",
    texte:
      "Recherche plein-texte à l’intérieur de vos fichiers, pas juste les noms. Un raccourci vocal (Ctrl+Alt+V) pour ouvrir, fermer et ranger une fenêtre, ou lancer une application par son nom.",
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
    texte:
      "Adresse @cloudparadise.ca et webmail intégré. Connectez aussi un compte externe (Gmail, Outlook) par IMAP/SMTP ou OAuth.",
  },
  {
    Icone: IconCalendar,
    titre: "Agenda et contacts",
    texte:
      "Agenda partagé, rappels, et synchronisation avec un service externe compatible CalDAV/CardDAV.",
  },
];

const JEUX: Carte[] = [
  {
    Icone: IconGamepad,
    titre: "Studio de jeux",
    texte:
      "Décrivez un jeu en conversation ; l’IA en discute les mécaniques, l’écrit, le compile et le teste automatiquement avant de vous le livrer. Un crédit par compilation ; rejouer et revenir en arrière sont gratuits.",
  },
  {
    Icone: IconInfinity,
    titre: "Arcades",
    texte:
      "Une salle de jeux HTML5 gratuite, cherchable depuis Spotlight, classée sur ce qui se mesure — parties jouées, jeux essayés, séries de jours actifs.",
  },
];

export default function PlateformePage() {
  return (
    <>
      <HreflangLinks fr="/plateforme" en="/en/platform" />
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
                href={lienInscription("plateforme-hero")}
                taille="lg"
              >
                Créez votre bureau gratuitement
              </BoutonCta>
              <LienOr href="/tarifs">Voir les tarifs</LienOr>
            </div>
            <p className="mt-4 text-[13px] text-white/60">
              Aussi disponible en abonnement,{" "}
              <a
                href="/tarifs#abonnements"
                data-cp-accent
                className="text-cp-subtle underline-offset-4 hover:text-[var(--acc-text)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {prixAbonnementDepuis("fr")}
              </a>
              .
            </p>
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
          <FenetrePlan />
        </Reveal>
      </SectionAncre>

      <SectionAncre
        id="equipe"
        surtitre="L’équipe"
        titre="Le même bureau, à plusieurs."
        texte="Créez des bureaux d’équipe, invitez qui vous voulez, approuvez les accès. La discussion, le courriel et l’agenda sont déjà dedans."
        cartes={EQUIPE}
      />

      {/* Jeux — Studio de jeux et Arcades, livrés récemment et jamais montrés
          sur la vitrine avant cette section. Deux cartes seulement : la
          grille sm:grid-cols-2 se remplit exactement, pas de case vide. */}
      <SectionAncre
        id="jeux"
        surtitre="Jeux"
        titre="Un studio de jeux, et une arcade gratuite."
        texte="De la conversation au jeu jouable, testé avant d’être livré — et une salle de jeux gratuite, à côté."
        cartes={JEUX}
      />

      {/* Closer */}
      <section className="relative overflow-x-clip">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal>
            <FenetreCta
              soustitre="Créez votre bureau, ouvrez vos applications, invitez votre équipe — dès aujourd’hui."
              bouton={{
                href: lienInscription("plateforme-closer"),
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
