import Link from "next/link";
import {
  IconCube,
  IconFileText,
  IconMapPin,
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
 * Ici on énonce ce qui est disponible, sobrement : des cellules fixes, un seul
 * renvoi doré vers /plateforme. Aucune carte n'est cliquable — c'est un
 * inventaire, pas un questionnaire.
 *
 * Icônes monochromes (l'or est réservé aux sur-titres, aux icônes de piliers et
 * aux flèches de liens) pour garder la hiérarchie : les piliers portent l'or,
 * cet inventaire reste en retrait.
 */

type Famille = {
  Icone: typeof IconFileText;
  nom: string;
  ligne: string;
};

const TEXTES = {
  fr: {
    eyebrow: "L’ampleur",
    titre: "Un poste de travail, toutes vos apps.",
    soustitre:
      "Les mêmes outils qu’en local, dans le navigateur. Vos fichiers restent dans votre espace, rien à installer, rien à téléverser ailleurs.",
    lien: "Voir la plateforme",
    familles: [
      {
        Icone: IconFileText,
        nom: "Bureautique",
        ligne: "Traitement de texte, tableur et présentation, en co-édition.",
      },
      {
        Icone: IconPhoto,
        nom: "Image & photo",
        ligne: "Retouche rapide et édition par calques.",
      },
      {
        Icone: IconMovie,
        nom: "Vidéo & audio",
        ligne: "Montage et traitement, dans le navigateur.",
      },
      {
        Icone: IconCube,
        nom: "3D",
        ligne: "Blender, streamé en session éphémère.",
      },
      {
        Icone: IconMapPin,
        nom: "Cartographie",
        ligne: "QGIS Desktop, streamé.",
      },
      {
        Icone: IconMessage,
        nom: "Collaboration",
        ligne: "Messagerie, courriel et agenda partagé.",
      },
    ] as Famille[],
  },
  en: {
    eyebrow: "The breadth",
    titre: "One workstation, all your apps.",
    soustitre:
      "The same tools as on your machine, in the browser. Your files stay in your space — nothing to install, nothing to upload elsewhere.",
    lien: "See the platform",
    familles: [
      {
        Icone: IconFileText,
        nom: "Office",
        ligne: "Word processor, spreadsheet and slides, co-edited.",
      },
      {
        Icone: IconPhoto,
        nom: "Image & photo",
        ligne: "Quick retouching and layer-based editing.",
      },
      {
        Icone: IconMovie,
        nom: "Video & audio",
        ligne: "Editing and processing, in the browser.",
      },
      {
        Icone: IconCube,
        nom: "3D",
        ligne: "Blender, streamed in an ephemeral session.",
      },
      {
        Icone: IconMapPin,
        nom: "Mapping",
        ligne: "QGIS Desktop, streamed.",
      },
      {
        Icone: IconMessage,
        nom: "Collaboration",
        ligne: "Messaging, email and a shared calendar.",
      },
    ] as Famille[],
  },
} as const;

export function FamillesApps({ lang = "fr" }: { lang?: Lang }) {
  const t = TEXTES[lang];
  const hrefPlateforme = lang === "en" ? "/en/plateforme" : "/plateforme";

  return (
    <section className="relative">
      <div className={`${SHELL} ${SECTION_Y}`}>
        <Reveal>
          <p
            className="text-xs font-medium tracking-wide"
            style={{ color: "var(--cta)" }}
          >
            {t.eyebrow}
          </p>
          <h2 className="mt-3 max-w-[22ch] font-display text-[1.6rem] leading-[1.2] font-bold tracking-tight text-balance text-[#eef4ff] sm:text-3xl os:text-4xl">
            {t.titre}
          </h2>
          <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-white/85">
            {t.soustitre}
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-10 grid gap-3.5 sm:grid-cols-2 os:grid-cols-3"
        >
          {t.familles.map(({ Icone, nom, ligne }) => (
            <div
              key={nom}
              className="flex gap-4 rounded-xl border border-white/[0.08] bg-[rgba(27,39,61,.4)] p-5"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white/[0.05] text-white/70">
                <Icone className="size-[21px]" />
              </span>
              <div className="min-w-0">
                <p className="font-display text-[15px] font-semibold text-[#eef4ff]">
                  {nom}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-white/75">
                  {ligne}
                </p>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.15} className="mt-8">
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
