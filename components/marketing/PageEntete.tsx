import { Reveal } from "./Reveal";
import { LECTURE } from "./tokens";

type PageEnteteProps = Readonly<{
  eyebrow: string;
  titre: string;
  /** Ligne d'appoint sous le titre — date de mise à jour, résumé, etc. */
  soustitre?: string;
  /**
   * Centre l'en-tête. Les pages de texte suivi (légal, contact) restent à
   * gauche ; /tarifs est une vitrine et suit l'axe médian de la landing.
   */
  centre?: boolean;
}>;

/**
 * En-tête des pages intérieures.
 *
 * Aligné à gauche sur la colonne de lecture par défaut : ces pages sont du
 * texte suivi, pas une vitrine.
 *
 * Le sur-titre suit le traitement verrouillé des pages refondues — majuscules,
 * or, 0,12em, graisse 600, collé au titre par `mt-2` — identique au `SurTitre`
 * de /calcul, /securite, /mines et des autres. Il portait jusqu'ici
 * `--acc-text`, un bleu-gris pâle en bas de casse qui ne correspondait à aucune
 * autre section du site : ces pages divergeaient sans que ce soit voulu.
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
        className="text-[13px] font-semibold tracking-[0.12em] uppercase"
        style={{ color: "var(--cta)" }}
      >
        {eyebrow}
      </p>
      <h1 className="mt-2 font-display text-[1.7rem] leading-[1.2] font-bold tracking-tight text-balance text-[#eef4ff] sm:text-3xl os:text-4xl">
        {titre}
      </h1>
      {soustitre ? (
        <p className="mt-3 text-sm leading-relaxed text-white/85">
          {soustitre}
        </p>
      ) : null}
    </Reveal>
  );
}
