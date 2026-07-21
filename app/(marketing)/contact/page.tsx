import type { Metadata } from "next";
import Script from "next/script";
import { FenetreContact } from "@/components/marketing/FenetreContact";
import { PageEntete } from "@/components/marketing/PageEntete";
import { Reveal } from "@/components/marketing/Reveal";
import { SECTION_Y, SHELL } from "@/components/marketing/tokens";
import { alternatesBilingues, openGraphPage } from "@/lib/seo";

const TITRE = "Contact — Cloud Paradise";
const DESCRIPTION =
  "Écrivez-nous : courriel, téléphone et adresse de Cloud Paradise, à Amos au Québec.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: alternatesBilingues("/contact", "/en/contact", "fr"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "fr"),
};

export default function ContactPage() {
  return (
    // Pas de hauteur minimale forcée : la fenêtre plus le pied de page
    // dépassent déjà l'écran, donc centrer sur `100svh` ne supprimait aucun
    // défilement — ça ne faisait qu'ajouter un vide sous la barre de menu.
    // C'est le rythme vertical commun qui cadre la page.
    <section className={`relative ${SECTION_Y}`}>
      <div className={`${SHELL} w-full`}>
        <PageEntete
          eyebrow="Contact"
          titre="Contactez-nous"
          soustitre="Une question sur le service, la tarification ou un projet particulier ? Écrivez-nous, on répond."
        />

        <Reveal delay={0.1} className="mt-8">
          <FenetreContact />
        </Reveal>
      </div>

      {/* Chargé seulement ici, pas dans le layout : c'est la seule page où le
          formulaire en a besoin, inutile de le tirer sur tout le site. */}
      {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      ) : null}
    </section>
  );
}
