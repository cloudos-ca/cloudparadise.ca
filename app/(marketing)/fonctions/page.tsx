import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";
import { CommentCaMarche } from "@/components/marketing/CommentCaMarche";
import { FenetreCta } from "@/components/marketing/FenetreCta";
import { FenetresModes } from "@/components/marketing/FenetresModes";
import { HreflangLinks } from "@/components/marketing/HreflangLinks";
import { IconCheck } from "@/components/marketing/icons";
import { PageEntete } from "@/components/marketing/PageEntete";
import { Reveal } from "@/components/marketing/Reveal";
import { LECTURE, SECTION_Y, SHELL } from "@/components/marketing/tokens";
import { alternatesBilingues, openGraphPage } from "@/lib/seo";

const PROMESSES = ["Crédits offerts", "Sans carte requise", "Sans abonnement"];

const TITRE = "Fonctions — Cloud Paradise";
const DESCRIPTION =
  "Documents, données, média, scraping, calcul GPU, rendu 3D, images, impression 3D, simulation : décrivez ce que vous voulez, l’IA choisit le bon moteur et lance le calcul dans le cloud.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: alternatesBilingues("/fonctions", "/en/fonctions", "fr"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "fr"),
};

export default function FonctionsPage() {
  return (
    // `overflow-x-clip` : la lueur du CTA déborde volontairement de sa fenêtre
    // et pousserait la page hors cadre sur petit écran sans ce clip.
    <section className="relative overflow-x-clip">
      <HreflangLinks fr="/fonctions" en="/en/fonctions" />
      <BreadcrumbJsonLd
        items={[
          { nom: "Accueil", chemin: "/" },
          { nom: "Fonctions", chemin: "/fonctions" },
        ]}
      />
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
              href: "https://app.cloudparadise.cloud/register",
              libelle: "Commencer gratuitement",
            }}
            lien={{ href: "/tarifs", libelle: "Voir les tarifs" }}
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
