import { Estimateur } from "./Estimateur";
import { Reveal } from "./Reveal";
import { IconAdjustments, IconGift, IconRefresh } from "./icons";
import {
  CREDIT_EN_DEVISE,
  DEVISE,
  GRILLE,
  OFFRE_EN_DEVISE,
  TARIF_A_VENIR,
} from "./offre";
import { SECTION_Y, SHELL } from "./tokens";

const nf = new Intl.NumberFormat("fr-CA");
/** Les coûts sont des fractions de crédit : deux décimales, toujours. */
const nfCredit = new Intl.NumberFormat("fr-CA", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const ARGUMENTS = [
  {
    Icone: IconGift,
    titre: `${OFFRE_EN_DEVISE} de crédits offerts à l’inscription`,
    texte: "Testez sans sortir votre carte.",
  },
  {
    Icone: IconRefresh,
    titre: "Rechargez quand vous voulez",
    texte: "Vous ajoutez des crédits à la demande, jamais d’abonnement.",
  },
  {
    Icone: IconAdjustments,
    titre: "Le prix suit l’usage",
    texte: "Une petite tâche coûte peu ; un gros rendu coûte plus. Logique.",
  },
] as const;

export function Tarification() {
  return (
    // Cible de « Voir les tarifs », depuis le closer.
    <section id="tarifs" className="relative scroll-mt-16">
      <div className={`${SHELL} ${SECTION_Y}`}>
        <Reveal className="text-center">
          <p
            className="text-xs font-medium tracking-wide"
            style={{ color: "var(--acc-text)" }}
          >
            Tarification
          </p>
          <h2 className="mx-auto mt-3 max-w-[22ch] font-display text-[1.6rem] leading-[1.2] font-bold tracking-tight text-balance text-[#eef4ff] sm:text-3xl os:text-4xl">
            Payez ce que vous utilisez. Rien de plus.
          </h2>
          <p className="mx-auto mt-3 max-w-[52ch] text-sm leading-relaxed text-[#93a3c2]">
            Des crédits, pas d’abonnement. On vous en offre pour commencer.
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-10 grid items-start gap-8 os:grid-cols-[46fr_54fr] os:items-center os:gap-12"
        >
          {/* Arguments puis grille : la colonne gauche porte tout le discours
              sur les prix, ce qui l'amène à la hauteur de l'estimateur. */}
          <div className="space-y-8">
            <ul className="space-y-5">
              {ARGUMENTS.map(({ Icone, titre, texte }) => (
                <li key={titre} className="flex gap-3.5">
                  <span
                    data-cp-accent
                    className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full"
                    style={{
                      background:
                        "color-mix(in srgb, var(--acc) 15%, transparent)",
                      color: "var(--acc-text)",
                    }}
                  >
                    <Icone className="size-[18px]" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-[#eef4ff]">{titre}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-[#93a3c2]">
                      {texte}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <Grille />
          </div>

          {/* L'estimateur seul, centré en face : les prix se lisent à gauche,
              on chiffre son budget à droite. */}
          <Estimateur />
        </Reveal>
      </div>
    </section>
  );
}

/** La grille complète, un seul endroit qui fait foi. */
function Grille() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
      <p className="text-xs text-[#93a3c2]">
        Coût débité par tâche lancée, en crédits — 1 crédit ={" "}
        {nf.format(CREDIT_EN_DEVISE)} {DEVISE}
      </p>
      <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-2.5">
        {GRILLE.map(({ type, cout }) => (
          <div key={type} className="flex items-baseline gap-1.5">
            <dt className="text-[13px] text-[#eef4ff]">{type}</dt>
            {/* Un mode sans tarif arrêté reste listé — le masquer donnerait une
                offre incomplète — mais il le dit au lieu d'afficher un prix. */}
            {cout === null ? (
              <dd className="text-[12px] text-[#8494b6] italic">
                {TARIF_A_VENIR}
              </dd>
            ) : (
              <dd
                data-cp-accent
                className="text-[13px] font-medium tabular-nums"
                style={{ color: "var(--soft)" }}
              >
                {nfCredit.format(cout)}
              </dd>
            )}
          </div>
        ))}
      </dl>
    </div>
  );
}
