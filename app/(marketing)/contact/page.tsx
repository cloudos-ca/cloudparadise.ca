import type { Metadata } from "next";
import { connection } from "next/server";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";
import { FenetreContact } from "@/components/marketing/FenetreContact";
import { HreflangLinks } from "@/components/marketing/HreflangLinks";
import { PageEntete } from "@/components/marketing/PageEntete";
import { Reveal } from "@/components/marketing/Reveal";
import { SECTION_Y, SHELL } from "@/components/marketing/tokens";
import { emettreJeton } from "@/lib/jetonContact";
import { alternatesBilingues, openGraphPage } from "@/lib/seo";

const TITRE = "Contact — Cloud OS";
const DESCRIPTION =
  "Écrivez-nous : courriel, téléphone et adresse de Cloud OS, à Amos en Abitibi. Une question sur le service, la tarification ou un projet particulier ?";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: alternatesBilingues("/contact", "/en/contact", "fr"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "fr", "/contact"),
};

export default async function ContactPage() {
  // Le jeton anti-robot porte l'heure de rendu : il doit donc être émis à la
  // requête, pas figé au build. `connection()` sort cette page seule du
  // prérendu — le reste du site demeure statique. Les métadonnées, elles, sont
  // évaluées à part et restent inchangées.
  await connection();
  const jeton = emettreJeton();

  return (
    // Pas de hauteur minimale forcée : la fenêtre plus le pied de page
    // dépassent déjà l'écran, donc centrer sur `100svh` ne supprimait aucun
    // défilement — ça ne faisait qu'ajouter un vide sous la barre de menu.
    // C'est le rythme vertical commun qui cadre la page.
    <section className={`relative ${SECTION_Y}`}>
      <HreflangLinks fr="/contact" en="/en/contact" />
      <BreadcrumbJsonLd
        items={[
          { nom: "Accueil", chemin: "/" },
          { nom: "Contact", chemin: "/contact" },
        ]}
      />
      <div className={`${SHELL} w-full`}>
        <PageEntete
          eyebrow="Contact"
          titre="Contactez-nous"
          soustitre="Le service, la tarification, un projet particulier : écrivez-nous."
        />

        <Reveal delay={0.1} className="mt-8">
          <FenetreContact jeton={jeton} />
        </Reveal>
      </div>
    </section>
  );
}
