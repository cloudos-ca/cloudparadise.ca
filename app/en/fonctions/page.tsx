import type { Metadata } from "next";
import { CommentCaMarche } from "@/components/marketing/CommentCaMarche";
import { FenetreCta } from "@/components/marketing/FenetreCta";
import { FenetresModes } from "@/components/marketing/FenetresModes";
import { PageEntete } from "@/components/marketing/PageEntete";
import { Reveal } from "@/components/marketing/Reveal";
import { LECTURE, SECTION_Y, SHELL } from "@/components/marketing/tokens";

export const metadata: Metadata = {
  title: "Features — Cloud Paradise",
  description:
    "Documents, data, media, scraping, GPU compute, 3D rendering, images, 3D printing, simulation: describe what you want, the AI picks the right engine and runs the job in the cloud.",
};

export default function FonctionsPageEn() {
  return (
    // `overflow-x-clip` : la lueur du CTA déborde volontairement de sa fenêtre
    // et pousserait la page hors cadre sur petit écran sans ce clip.
    <section className="relative overflow-x-clip">
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
              href: "/en/inscription",
              libelle: "Start for free",
            }}
            lien={{ href: "/en/tarifs", libelle: "See pricing" }}
          />
        </Reveal>
      </div>
    </section>
  );
}
