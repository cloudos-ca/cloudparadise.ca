import { PageEntete } from "@/components/marketing/PageEntete";
import { BoutonCta } from "@/components/marketing/BoutonCta";
import { LECTURE, SECTION_Y, SHELL } from "@/components/marketing/tokens";

export default function NotFound() {
  return (
    <section className="relative">
      <div className={`${SHELL} ${SECTION_Y}`}>
        <PageEntete
          eyebrow="Erreur 404"
          titre="Cette page n'existe pas."
          soustitre="Le lien est peut-être périmé, ou l'adresse comporte une faute de frappe."
        />
        <div className={`${LECTURE} mt-8`}>
          <BoutonCta href="/">Retour à l’accueil</BoutonCta>
        </div>
      </div>
    </section>
  );
}
