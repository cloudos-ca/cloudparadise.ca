import { PageEntete } from "@/components/marketing/PageEntete";
import { BoutonCta } from "@/components/marketing/BoutonCta";
import { LECTURE, SECTION_Y, SHELL } from "@/components/marketing/tokens";

export default function NotFound() {
  return (
    <section className="relative">
      <div className={`${SHELL} ${SECTION_Y}`}>
        <PageEntete
          eyebrow="404 error"
          titre="This page doesn't exist."
          soustitre="The link may be outdated, or the address may be misspelled."
        />
        <div className={`${LECTURE} mt-8`}>
          <BoutonCta href="/en">Back to home</BoutonCta>
        </div>
      </div>
    </section>
  );
}
