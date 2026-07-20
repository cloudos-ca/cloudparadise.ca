import type { Metadata } from "next";
import Script from "next/script";
import { FenetreContact } from "@/components/marketing/FenetreContact";
import { PageEntete } from "@/components/marketing/PageEntete";
import { Reveal } from "@/components/marketing/Reveal";
import { SECTION_Y, SHELL } from "@/components/marketing/tokens";

export const metadata: Metadata = {
  title: "Contact — Cloud Paradise",
  description:
    "Get in touch: Cloud Paradise’s email, phone, and address, in Amos, Quebec.",
};

export default function ContactPageEn() {
  return (
    // Pas de hauteur minimale forcée : la fenêtre plus le pied de page
    // dépassent déjà l'écran, donc centrer sur `100svh` ne supprimait aucun
    // défilement — ça ne faisait qu'ajouter un vide sous la barre de menu.
    // C'est le rythme vertical commun qui cadre la page.
    <section className={`relative ${SECTION_Y}`}>
      <div className={`${SHELL} w-full`}>
        <PageEntete
          eyebrow="Contact"
          titre="Contact us"
          soustitre="A question about the service, pricing, or a specific project? Write to us, we reply."
        />

        <Reveal delay={0.1} className="mt-8">
          <FenetreContact lang="en" />
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
