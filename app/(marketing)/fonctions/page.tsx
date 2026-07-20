import type { Metadata } from "next";
import { CommentCaMarche } from "@/components/marketing/CommentCaMarche";
import { FenetreCta } from "@/components/marketing/FenetreCta";
import { FenetresModes } from "@/components/marketing/FenetresModes";
import { PageEntete } from "@/components/marketing/PageEntete";
import { Reveal } from "@/components/marketing/Reveal";
import { LECTURE, SECTION_Y, SHELL } from "@/components/marketing/tokens";

export const metadata: Metadata = {
  title: "Fonctions — Cloud Paradise",
  description:
    "Documents, données, média, scraping, calcul GPU, rendu 3D, images, impression 3D, simulation : décrivez ce que vous voulez, l’IA choisit le bon moteur et lance le calcul dans le cloud.",
};

export default function FonctionsPage() {
  return (
    // `overflow-x-clip` : la lueur du CTA déborde volontairement de sa fenêtre
    // et pousserait la page hors cadre sur petit écran sans ce clip.
    <section className="relative overflow-x-clip">
      <div className={`${SHELL} ${SECTION_Y}`}>
        {/* 1 — En-tête, centré comme /tarifs : ces deux pages sont des
            vitrines, pas du texte suivi. */}
        <PageEntete
          centre
          eyebrow="Fonctions"
          titre="Un seul endroit. Toutes vos tâches lourdes."
          soustitre="Décrivez ce que vous voulez : l’IA choisit le bon moteur et lance le calcul dans le cloud."
        />

        {/* 2 — Les modes, un par fenêtre du bureau. */}
        <div className="mt-12">
          <FenetresModes />
        </div>
      </div>

      {/* 3 — Le pipeline de la landing, importé tel quel : c'est la même
          promesse, elle n'a pas à être réécrite ici. Il porte déjà son propre
          conteneur et son rythme vertical. */}
      <CommentCaMarche />

      <div className={`${SHELL} pb-12 os:pb-14`}>
        {/* 4 — CTA final : la fenêtre à halo et le bouton or, comme partout. */}
        <Reveal>
          <FenetreCta
            className={`${LECTURE} mx-auto`}
            soustitre={
              <>Créez votre compte et lancez votre première tâche aujourd’hui.</>
            }
            bouton={{
              href: "/inscription",
              libelle: "Commencer gratuitement",
            }}
            lien={{ href: "/tarifs", libelle: "Voir les tarifs" }}
          />
        </Reveal>
      </div>
    </section>
  );
}
