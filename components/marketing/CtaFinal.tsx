import { FenetreCta } from "./FenetreCta";
import { Reveal } from "./Reveal";
import { IconCheck } from "./icons";
import { SECTION_Y, SHELL, type Lang } from "./tokens";

const PROMESSES = {
  fr: ["Crédits offerts", "Sans carte requise", "Sans abonnement"],
  en: ["Free credits", "No card required", "No subscription"],
} as const;

const TEXTES = {
  fr: {
    soustitre: "Créez votre compte et lancez votre première tâche aujourd’hui.",
    bouton: "Commencer gratuitement",
    lien: "Voir les tarifs",
  },
  en: {
    soustitre: "Create your account and run your first task today.",
    bouton: "Start for free",
    lien: "See pricing",
  },
} as const;

/**
 * Le closer de la landing.
 *
 * Le châssis (fenêtre, lueur, halo, flottement) vit dans `FenetreCta`, partagé
 * avec la page /tarifs ; il ne reste ici que ce qui est propre à la landing.
 */
export function CtaFinal({ lang = "fr" }: { lang?: Lang }) {
  const t = TEXTES[lang];
  return (
    // La lueur déborde volontairement de la fenêtre ; sans ce clip horizontal
    // elle poussait la page hors cadre sur petit écran.
    <section className="relative overflow-x-clip">
      <div className={`${SHELL} ${SECTION_Y}`}>
        <Reveal>
          <FenetreCta
            lang={lang}
            // « Sans carte » est déjà dans les puces juste dessous.
            badgeSansCarte={false}
            soustitre={<>{t.soustitre}</>}
            bouton={{
              href: lang === "en" ? "/en/inscription" : "/inscription",
              libelle: t.bouton,
            }}
            lien={{
              href: lang === "en" ? "/en/tarifs" : "/tarifs",
              libelle: t.lien,
            }}
          >
            <ul className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2.5">
              {PROMESSES[lang].map((promesse) => (
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
