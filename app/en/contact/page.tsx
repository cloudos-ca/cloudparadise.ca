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

const TITRE = "Contact — Cloud Paradise";
const DESCRIPTION =
  "Get in touch: Cloud Paradise’s email, phone and address, in Amos, Abitibi. A question about the service, pricing, or a specific project? Write to us.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: alternatesBilingues("/contact", "/en/contact", "en"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "en", "/en/contact"),
};

export default async function ContactPageEn() {
  // Voir la version française : le jeton anti-robot porte l'heure de rendu,
  // donc cette page seule sort du prérendu.
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
          { nom: "Home", chemin: "/en" },
          { nom: "Contact", chemin: "/en/contact" },
        ]}
      />
      <div className={`${SHELL} w-full`}>
        <PageEntete
          eyebrow="Contact"
          titre="Contact us"
          soustitre="The service, pricing, a specific project: write to us."
        />

        <Reveal delay={0.1} className="mt-8">
          <FenetreContact lang="en" jeton={jeton} />
        </Reveal>
      </div>
    </section>
  );
}
