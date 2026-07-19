import { FenetreCta } from "./FenetreCta";
import { Reveal } from "./Reveal";
import { IconCheck } from "./icons";
import { SECTION_Y, SHELL } from "./tokens";

const PROMESSES = [
  "Crédits offerts",
  "Sans carte requise",
  "Sans abonnement",
] as const;

/**
 * Le closer de la landing.
 *
 * Le châssis (fenêtre, lueur, halo, flottement) vit dans `FenetreCta`, partagé
 * avec la page /tarifs ; il ne reste ici que ce qui est propre à la landing.
 */
export function CtaFinal() {
  return (
    // La lueur déborde volontairement de la fenêtre ; sans ce clip horizontal
    // elle poussait la page hors cadre sur petit écran.
    <section className="relative overflow-x-clip">
      <div className={`${SHELL} ${SECTION_Y}`}>
        <Reveal>
          <FenetreCta
            // « Sans carte » est déjà dans les puces juste dessous.
            badgeSansCarte={false}
            soustitre={
              <>
                Créez votre compte et lancez votre première tâche aujourd’hui.
              </>
            }
            bouton={{ href: "/inscription", libelle: "Commencer gratuitement" }}
            lien={{ href: "/tarifs", libelle: "Voir les tarifs" }}
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
