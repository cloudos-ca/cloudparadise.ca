import Link from "next/link";
import type { GroupeId } from "@/content/applications/types";
import { CHEMIN_CATALOGUE, fichesParGroupe } from "@/lib/applications";
import {
  IconCube,
  IconFileText,
  IconGamepad,
  IconMessage,
  IconMovie,
  IconPhoto,
} from "./icons";
import { Reveal } from "./Reveal";
import { SECTION_Y, SHELL, type Lang } from "./tokens";

/**
 * L'aperçu de l'ampleur : les familles d'apps du poste de travail.
 *
 * Remplace l'ancienne section « Vous faites quoi, vous ? » qui demandait au
 * visiteur de se classer lui-même dans un univers, et animait chaque carte.
 * Ici on énonce ce qui est disponible, sobrement : des cellules fixes, et deux
 * renvois dorés, vers le catalogue et vers /plateforme. C'est un inventaire,
 * pas un questionnaire.
 *
 * Depuis l'ouverture du catalogue (2026-09-25), une famille mène à son groupe
 * dans l'index (`/applications#images`) — mais seulement si ce groupe a déjà
 * une fiche : un groupe vide n'a pas d'ancre, et le lien retomberait en haut de
 * l'index sans rien montrer. Les autres restent de simples cellules jusqu'à
 * leur première fiche, sans rien à changer ici.
 *
 * Icônes monochromes (l'or est réservé aux sur-titres, aux icônes de piliers et
 * aux flèches de liens) pour garder la hiérarchie : les piliers portent l'or,
 * cet inventaire reste en retrait.
 */

type Famille = {
  Icone: typeof IconFileText;
  nom: string;
  ligne: string;
  /** Le groupe du catalogue où mène la cellule (voir `content/applications/types.ts`). */
  groupe: GroupeId;
};

/** Les groupes du catalogue qui ont au moins une fiche, donc une ancre dans l'index. */
const GROUPES_PEUPLES = new Set(fichesParGroupe("fr").map((g) => g.groupe));

const TEXTES = {
  fr: {
    eyebrow: "Vos outils",
    titre: "Un poste de travail, toutes vos applications.",
    soustitre:
      "Les mêmes outils qu’en local, dans le navigateur. Vos fichiers restent dans votre espace, rien à installer, rien à téléverser ailleurs.",
    lien: "Voir la plateforme",
    lienCatalogue: "Toutes les applications",
    familles: [
      {
        Icone: IconFileText,
        nom: "Bureautique",
        groupe: "bureautique",
        ligne: "Traitement de texte, tableur et présentation, en co-édition.",
      },
      {
        Icone: IconPhoto,
        nom: "Image",
        groupe: "images",
        ligne: "Retouche rapide et édition par calques.",
      },
      {
        Icone: IconMovie,
        nom: "Vidéo et audio",
        groupe: "audio-video",
        ligne: "Montage et traitement, dans le navigateur.",
      },
      {
        Icone: IconCube,
        nom: "3D et SIG",
        groupe: "developpement",
        ligne: "Blender et QGIS Desktop, streamés en session éphémère.",
      },
    ],
    collaboration: {
      Icone: IconMessage,
      nom: "Collaboration",
      groupe: "communication",
      ligne: "Messagerie, courriel et agenda partagé.",
    },
    jeux: {
      Icone: IconGamepad,
      nom: "Jeux",
      groupe: "jeux",
      ligne:
        "Un studio de jeux généré par IA, et une arcade de près de 30 700 jeux gratuits.",
    },
  },
  en: {
    eyebrow: "Your tools",
    titre: "One workstation, all your apps.",
    soustitre:
      "The same tools as on your machine, in the browser. Your files stay in your space — nothing to install, nothing to upload elsewhere.",
    lien: "See the platform",
    lienCatalogue: "All apps",
    familles: [
      {
        Icone: IconFileText,
        nom: "Office",
        groupe: "bureautique",
        ligne: "Word processor, spreadsheet and slides, co-edited.",
      },
      {
        Icone: IconPhoto,
        nom: "Image",
        groupe: "images",
        ligne: "Quick retouching and layer-based editing.",
      },
      {
        Icone: IconMovie,
        nom: "Video and audio",
        groupe: "audio-video",
        ligne: "Editing and processing, in the browser.",
      },
      {
        Icone: IconCube,
        nom: "3D and GIS",
        groupe: "developpement",
        ligne: "Blender and QGIS Desktop, streamed in an ephemeral session.",
      },
    ],
    collaboration: {
      Icone: IconMessage,
      nom: "Collaboration",
      groupe: "communication",
      ligne: "Messaging, email and a shared calendar.",
    },
    jeux: {
      Icone: IconGamepad,
      nom: "Games",
      groupe: "jeux",
      ligne: "An AI-generated game studio, and a free arcade of nearly 30,700 games.",
    },
  },
} as const;

export function FamillesApps({ lang = "fr" }: Readonly<{ lang?: Lang }>) {
  const t = TEXTES[lang];
  const hrefPlateforme = lang === "en" ? "/en/platform" : "/plateforme";

  return (
    <section className="relative">
      <div className={`${SHELL} ${SECTION_Y}`}>
        <Reveal>
          <p
            className="text-[13px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: "var(--cta)" }}
          >
            {t.eyebrow}
          </p>
          <h2 className="mt-2 max-w-[22ch] font-display text-[1.6rem] leading-[1.2] font-extrabold tracking-tight text-balance text-cp-heading sm:text-3xl os:text-4xl">
            {t.titre}
          </h2>
          <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-white/85">
            {t.soustitre}
          </p>
        </Reveal>

        {/* Les quatre logiciels dans une grille 2×2. */}
        <Reveal delay={0.1} className="mt-10 grid gap-3.5 sm:grid-cols-2">
          {t.familles.map((famille) => (
            <CarteFamille key={famille.nom} famille={famille} lang={lang} />
          ))}
        </Reveal>

        {/* Collaboration et Jeux, côte à côte sous la grille : ni l'une ni
            l'autre n'est un logiciel comme les quatre premiers, mais les
            deux se lisent mieux ensemble qu'empilées l'une sur l'autre. */}
        <Reveal delay={0.15} className="mt-3.5 grid gap-3.5 sm:grid-cols-2">
          <CarteFamille famille={t.collaboration} lang={lang} />
          <CarteFamille famille={t.jeux} lang={lang} />
        </Reveal>

        <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          <Link
            href={CHEMIN_CATALOGUE[lang]}
            className="group inline-flex items-center gap-1.5 text-sm font-medium transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ color: "var(--cta)" }}
          >
            {t.lienCatalogue}
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
          <Link
            href={hrefPlateforme}
            className="group inline-flex items-center gap-1.5 text-sm font-medium transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ color: "var(--cta)" }}
          >
            {t.lien}
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Une cellule d'outil. Rendue à l'identique dans la grille (les quatre
 * logiciels) et en pleine largeur (Collaboration) : seule la largeur du
 * conteneur change, jamais la carte.
 *
 * Cliquable quand son groupe a une fiche : même construction que
 * `CarteApplication`, le lien du nom s'étend à toute la cellule
 * (`after:inset-0`), un seul lien pour le clavier et les lecteurs d'écran.
 */
function CarteFamille({ famille, lang }: Readonly<{ famille: Famille; lang: Lang }>) {
  const { Icone, nom, ligne, groupe } = famille;
  const href = GROUPES_PEUPLES.has(groupe) ? `${CHEMIN_CATALOGUE[lang]}#${groupe}` : null;
  return (
    <div className="relative flex h-full gap-4 rounded-xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors hover:border-white/15">
      {/* Cyan (--soft) : l'accent secondaire de la charte, réservé ici aux
          outils, là où l'or reste sur les piliers et la conversion. */}
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
        <p className="font-display text-[15px] font-extrabold text-cp-heading">
          {href ? (
            <Link
              href={href}
              className="rounded-sm outline-offset-4 after:absolute after:inset-0 after:rounded-xl focus-visible:outline-2 focus-visible:outline-white"
            >
              {nom}
            </Link>
          ) : (
            nom
          )}
        </p>
        <p className="mt-1 text-[13px] leading-relaxed text-white/75">
          {ligne}
        </p>
      </div>
    </div>
  );
}
