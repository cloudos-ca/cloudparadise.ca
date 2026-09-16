import { IconGift } from "./icons";
import { OFFRE_EN_DEVISE } from "./offre";
import type { Lang } from "./tokens";

const TEXTES = {
  fr: { credits: "de crédits offerts", sansCarte: " · sans carte" },
  en: { credits: "in free credits", sansCarte: " · no card required" },
} as const;

/**
 * L'offre d'accueil, présentée comme un objet et non comme une phrase.
 *
 * Elle vivait en `text-xs` gris sous les boutons : l'argument le plus fort du
 * site, au poste le plus faible. Ici le montant est en or, en Archivo, et
 * porté par une pastille — on le voit avant de le lire.
 *
 * Or DILUÉ, pas plein : le bouton doré doit rester l'élément le plus fort de
 * l'écran. Même famille de couleur, poids inférieur — c'est ce qui crée la
 * hiérarchie au lieu de deux éléments qui se disputent l'attention.
 */
export function BadgeOffre({
  /** Mention « sans carte », à couper là où elle a déjà été dite. */
  sansCarte = true,
  className = "",
  lang = "fr",
}: Readonly<{
  sansCarte?: boolean;
  className?: string;
  lang?: Lang;
}>) {
  const t = TEXTES[lang];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full py-1.5 pr-4 pl-3 ${className}`}
      style={{
        background: "var(--cta-wash)",
        boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--cta) 32%, transparent)",
      }}
    >
      <IconGift
        className="size-4 shrink-0"
        style={{ color: "var(--cta)" }}
      />
      <span className="text-[13px] text-[#dbe6fb]">
        <strong
          className="font-display text-[15px] font-extrabold"
          style={{ color: "var(--cta)" }}
        >
          {OFFRE_EN_DEVISE}
        </strong>{" "}
        {t.credits}
        {/* Pas le gris secondaire du site ici : le fond de la pastille est un
            or dilué, donc plus clair que la page, et `--color-cp-muted` y
            tombait à 4,35:1. Un blanc à 75 % tient 5,5:1 sur ce fond-là tout
            en restant en retrait du `#dbe6fb` de la phrase. */}
        {sansCarte ? (
          <span className="text-white/75">{t.sansCarte}</span>
        ) : null}
      </span>
    </span>
  );
}
