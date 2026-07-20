import { Reveal } from "./Reveal";
import { LECTURE } from "./tokens";

type PageEnteteProps = {
  eyebrow: string;
  titre: string;
  /** Ligne d'appoint sous le titre — date de mise à jour, résumé, etc. */
  soustitre?: string;
  /**
   * Centre l'en-tête. Les pages de texte suivi (légal, contact) restent à
   * gauche ; /tarifs est une vitrine et suit l'axe médian de la landing.
   */
  centre?: boolean;
};

/**
 * En-tête des pages intérieures.
 *
 * Aligné à gauche sur la colonne de lecture par défaut : ces pages sont du
 * texte suivi, pas une vitrine. L'eyebrow reprend la couleur d'accent des
 * sections.
 */
export function PageEntete({
  eyebrow,
  titre,
  soustitre,
  centre = false,
}: PageEnteteProps) {
  return (
    <Reveal className={centre ? `${LECTURE} mx-auto text-center` : LECTURE}>
      <p
        className="text-xs font-medium tracking-wide"
        style={{ color: "var(--acc-text)" }}
      >
        {eyebrow}
      </p>
      <h1 className="mt-3 font-display text-[1.7rem] leading-[1.2] font-bold tracking-tight text-balance text-[#eef4ff] sm:text-3xl os:text-4xl">
        {titre}
      </h1>
      {soustitre ? (
        <p className="mt-3 text-sm leading-relaxed text-[#93a3c2]">
          {soustitre}
        </p>
      ) : null}
    </Reveal>
  );
}
