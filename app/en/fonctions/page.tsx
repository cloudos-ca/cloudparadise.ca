import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";
import { CommentCaMarche } from "@/components/marketing/CommentCaMarche";
import { FenetreCta } from "@/components/marketing/FenetreCta";
import { FenetresModes } from "@/components/marketing/FenetresModes";
import { IconCheck } from "@/components/marketing/icons";
import { PageEntete } from "@/components/marketing/PageEntete";
import { Reveal } from "@/components/marketing/Reveal";
import { LECTURE, SECTION_Y, SHELL } from "@/components/marketing/tokens";
import { alternatesBilingues, openGraphPage } from "@/lib/seo";

const PROMESSES = ["Free credits", "No card required", "No subscription"];

const TITRE = "Features — Cloud Paradise";
const DESCRIPTION =
  "Documents, data, media, scraping, GPU compute, 3D rendering, images, 3D printing, simulation: describe what you want, the AI picks the right engine and runs the job in the cloud.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: alternatesBilingues("/fonctions", "/en/fonctions", "en"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "en"),
};

export default function FonctionsPageEn() {
  return (
    // `overflow-x-clip` : la lueur du CTA déborde volontairement de sa fenêtre
    // et pousserait la page hors cadre sur petit écran sans ce clip.
    <section className="relative overflow-x-clip">
      <BreadcrumbJsonLd
        items={[
          { nom: "Home", chemin: "/en" },
          { nom: "Features", chemin: "/en/fonctions" },
        ]}
      />
      <div className={`${SHELL} ${SECTION_Y}`}>
        {/* 1 — En-tête, centré comme /tarifs : ces deux pages sont des
            vitrines, pas du texte suivi. */}
        <PageEntete
          centre
          eyebrow="Features"
          titre="One place. All your heavy tasks."
          soustitre="Describe what you want: the AI picks the right engine and runs the job in the cloud."
        />

        {/* 2 — Les modes, un par fenêtre du bureau. */}
        <div className="mt-12">
          <FenetresModes lang="en" />
        </div>
      </div>

      {/* 3 — Le pipeline de la landing, importé tel quel : c'est la même
          promesse, elle n'a pas à être réécrite ici. Il porte déjà son propre
          conteneur et son rythme vertical. */}
      <CommentCaMarche lang="en" />

      <div className={`${SHELL} pb-12 os:pb-14`}>
        {/* 4 — CTA final : la fenêtre à halo et le bouton or, comme partout. */}
        <Reveal>
          <FenetreCta
            lang="en"
            className={`${LECTURE} mx-auto`}
            soustitre={<>Create your account and run your first task today.</>}
            bouton={{
              href: "https://app.cloudparadise.cloud/register",
              libelle: "Start for free",
            }}
            lien={{ href: "/en/tarifs", libelle: "See pricing" }}
            badgeSansCarte={false}
          >
            <ul className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2.5">
              {PROMESSES.map((promesse) => (
                <li
                  key={promesse}
                  className="flex items-center gap-1.5 text-xs text-[#93a3c2]"
                >
                  <span data-cp-accent style={{ color: "var(--soft)" }}>
                    <IconCheck className="size-3.5" />
                  </span>
                  {promesse}
                </li>
              ))}
            </ul>
          </FenetreCta>
        </Reveal>
      </div>
    </section>
  );
}
