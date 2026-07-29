import type { ReactNode } from "react";
import { IconAlert } from "./icons";
import type { Ancre } from "./AncresSections";

/**
 * Bloc centré des pages juridiques — en-tête **et** corps.
 *
 * Des constantes partagées plutôt qu'un composant : les quatre pages (FR/EN ×
 * conditions/confidentialité) doivent poser exactement le même cadre, et deux
 * chaînes exportées suffisent à le garantir sans introduire d'indirection.
 *
 * L'en-tête vit dans ce conteneur au même titre que le texte, sinon il reste
 * collé au bord de `SHELL` pendant que le corps se centre — les deux se
 * décalent alors l'un par rapport à l'autre, ce qui est pire que le vide de
 * départ. `57.5rem` = 40rem de texte + 14rem de sommaire + 3.5rem d'écart :
 * la mesure tombe donc pile sur 40rem, autour de 70 caractères. Sous `lg`, tout
 * retombe sur une colonne de 40rem, toujours centrée.
 */
export const CONTENEUR_LEGAL = "mx-auto max-w-[40rem] lg:max-w-[57.5rem]";

/**
 * La grille elle-même. Sous `lg` elle n'a qu'une colonne, et le sommaire —
 * premier dans le DOM — se replie naturellement au-dessus du texte.
 */
export const GABARIT_LEGAL =
  "mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-14";

/**
 * Identifiant d'ancre dérivé du titre de section.
 *
 * Dérivé plutôt qu'écrit à la main : le sommaire et les sections lisent la même
 * fonction, donc un titre qui change emporte son ancre avec lui et les deux ne
 * peuvent pas se désynchroniser. Les accents sont dépliés puis retirés, tout le
 * reste (apostrophes typographiques comprises) devient un tiret.
 */
export function slugSection(titre: string): string {
  return titre
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Construit les ancres du sommaire à partir des sections rendues.
 *
 * Les deux langues portent la même chaîne : contrairement aux pages de la
 * landing, où un même composant sert les deux versions, chaque page juridique
 * a déjà son propre tableau de sections dans sa langue. Le libellé reprend donc
 * le titre tel quel — c'est exactement ce qu'on veut lire dans le sommaire.
 *
 * À appeler au niveau module d'une page : `AncresSections` garde `ancres` en
 * dépendance d'effet, une référence recréée à chaque rendu relancerait
 * l'observateur pour rien.
 */
export function ancresDe(sections: readonly SectionRedigee[]): readonly Ancre[] {
  return sections.map(({ titre }) => ({
    id: slugSection(titre),
    libelle: { fr: titre, en: titre },
  }));
}

/**
 * Bandeau d'avertissement des pages juridiques.
 *
 * Non négociable tant que le texte n'est pas validé : ces pages ressemblent à
 * des conditions d'utilisation, donc sans avertissement explicite un visiteur —
 * ou l'équipe elle-même — les prendrait pour du contenu opposable. Le bandeau
 * disparaît quand un juriste a signé, pas avant.
 *
 * `texte` permet de nuancer l'avertissement : une page encore à l'état de plan
 * et une page rédigée mais non validée ne méritent pas la même phrase.
 */
export function BandeauJuridique({ texte }: Readonly<{ texte?: ReactNode }>) {
  return (
    <div
      role="note"
      className="flex gap-3 rounded-xl border p-4"
      style={{
        background: "color-mix(in srgb, var(--acc) 12%, transparent)",
        borderColor: "color-mix(in srgb, var(--acc) 32%, transparent)",
      }}
    >
      <IconAlert
        className="mt-0.5 size-[18px] shrink-0"
        style={{ color: "var(--acc-text)" }}
      />
      <p className="text-[13px] leading-relaxed text-[#dbe6fb]">
        {texte ?? (
          <>
            <strong className="font-medium text-[#eef4ff]">
              Modèle à faire valider par un juriste avant mise en ligne.
            </strong>{" "}
            Le texte ci-dessous est un placeholder de structure, pas un avis
            juridique.
          </>
        )}
      </p>
    </div>
  );
}

/**
 * Marque un trou de rédaction au milieu d'un texte par ailleurs définitif.
 *
 * Rendu dans la couleur d'accent, non italique : une page presque finie ne doit
 * pas laisser un « [À compléter] » se fondre dans la prose et partir en ligne
 * sans que personne ne le voie.
 */
export function AFaire({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <span className="not-italic" style={{ color: "var(--acc-text)" }}>
      [{children}]
    </span>
  );
}

/**
 * Un bloc de texte : un paragraphe, une liste de points, ou un élément de
 * bloc brut (table, citation, liste numérotée…) qui ne doit pas se retrouver
 * imbriqué dans un `<p>` — imbrication invalide en HTML, et source de
 * décalages d'hydratation.
 */
export type BlocLegal =
  | ReactNode
  | {
      /** Chaque point peut ouvrir sur un terme mis en évidence. */
      liste: readonly { terme?: string; texte: ReactNode }[];
    }
  | { brut: ReactNode };

export type SectionRedigee = {
  titre: string;
  blocs: readonly BlocLegal[];
};

function estListe(bloc: BlocLegal): bloc is { liste: readonly { terme?: string; texte: ReactNode }[] } {
  return typeof bloc === "object" && bloc !== null && "liste" in bloc;
}

function estBrut(bloc: BlocLegal): bloc is { brut: ReactNode } {
  return typeof bloc === "object" && bloc !== null && "brut" in bloc;
}

/**
 * Apparie des éléments à des clés uniques, dérivées de leur contenu.
 *
 * Le contenu juridique est fait de `ReactNode` quelconques, dont aucune
 * identité ne s'extrait directement. On en tire donc une empreinte, et on
 * numérote les empreintes identiques : les clés restent uniques sans jamais
 * retomber sur la position dans le tableau.
 *
 * Calculé en amont du rendu plutôt que dans le `map` : la numérotation a
 * besoin de connaître les éléments déjà vus, ce qu'une expression de clé posée
 * sur place ne peut pas faire.
 */
function avecCles<T>(
  elements: readonly T[],
  empreinteDe: (element: T) => string,
): readonly { cle: string; element: T }[] {
  const vus = new Map<string, number>();
  return elements.map((element) => {
    const empreinte = empreinteDe(element);
    const rang = vus.get(empreinte) ?? 0;
    vus.set(empreinte, rang + 1);
    return { cle: `${empreinte}#${rang}`, element };
  });
}

/** Empreinte d'un bloc : son texte s'il en est un, sa nature sinon. */
function empreinteBloc(bloc: BlocLegal): string {
  if (typeof bloc === "string") return `texte:${bloc}`;
  if (estListe(bloc)) return `liste:${bloc.liste.length}`;
  if (estBrut(bloc)) return "brut";
  return "noeud";
}

/**
 * Un bloc de section : liste à puces, élément brut, ou paragraphe.
 *
 * Sorti de `SectionsRedigees` et écrit en retours successifs plutôt qu'en
 * ternaires enchaînés : trois formes de bloc dans une seule expression
 * conditionnelle obligeaient à lire les deux branches pour comprendre la
 * troisième.
 */
function Bloc({ bloc }: Readonly<{ bloc: BlocLegal }>) {
  if (estListe(bloc)) {
    return (
      // Les listes portent l'essentiel de ces deux pages : interligne aéré
      // (`space-y-3`) et marqueur discret en cyan — la valeur de support du
      // site — plutôt que le point bleu-gris qui traînait ici.
      <ul className="space-y-3">
        {avecCles(bloc.liste, (point) =>
          point.terme ? `terme:${point.terme}` : "point",
        ).map(({ cle, element: { terme, texte } }) => (
          <li key={cle} className="flex gap-3">
            <span
              aria-hidden="true"
              data-cp-accent
              className="mt-[0.62em] size-[5px] shrink-0 rounded-full"
              style={{ background: "var(--soft)" }}
            />
            <span className="min-w-0">
              {terme ? (
                <>
                  <strong className="font-semibold text-white">{terme}</strong>{" "}
                </>
              ) : null}
              {texte}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  if (estBrut(bloc)) return <div>{bloc.brut}</div>;

  return <p>{bloc}</p>;
}

/**
 * Rend des sections juridiques rédigées, par opposition à `SectionsLegales` qui
 * n'affiche qu'un plan.
 *
 * Même numérotation et même hiérarchie de titres que le gabarit, pour qu'une
 * page passe de l'un à l'autre sans changer d'allure une fois le texte écrit.
 */
export function SectionsRedigees({
  sections,
}: Readonly<{
  sections: readonly SectionRedigee[];
}>) {
  return (
    // `space-y-14` contre `mt-4` sous le titre : un titre est bien plus proche
    // du bloc qu'il ouvre que de celui qui le précède, donc il se rattache à
    // son texte au lieu de flotter entre deux.
    // `prose-legal` porte le traitement des liens (or) — voir globals.css.
    <div className="prose-legal space-y-14">
      {sections.map(({ titre, blocs }, i) => (
        <section
          key={titre}
          id={slugSection(titre)}
          // La barre de menu est collante et haute de 78px : sans cette marge
          // de défilement, une ancre déposait son titre juste dessous.
          className="scroll-mt-28"
        >
          <h2 className="font-display text-[1.35rem] leading-snug font-bold tracking-tight text-white">
            <span
              aria-hidden="true"
              data-cp-accent
              className="mr-2.5 tabular-nums"
              style={{ color: "var(--soft)" }}
            >
              {i + 1}.
            </span>
            {titre}
          </h2>
          <div className="mt-4 space-y-4 text-base leading-[1.7] text-white/85">
            {avecCles(blocs, empreinteBloc).map(({ cle, element }) => (
              <Bloc key={cle} bloc={element} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export type SectionLegale = {
  titre: string;
  /** Piste de rédaction — jamais du texte définitif. */
  note: string;
};

/**
 * Rend la liste des sections types.
 *
 * Chaque paragraphe est atténué, en italique et préfixé d'un marqueur : au
 * premier coup d'œil, on doit voir que c'est un gabarit et non le texte final.
 */
export function SectionsLegales({
  sections,
  marqueur = "[À rédiger / à faire valider]",
}: Readonly<{
  sections: readonly SectionLegale[];
  marqueur?: string;
}>) {
  return (
    <div className="space-y-8">
      {sections.map(({ titre, note }, i) => (
        <section key={titre}>
          <h2 className="font-display text-lg font-bold tracking-tight text-[#eef4ff]">
            <span
              aria-hidden="true"
              className="mr-2 tabular-nums text-cp-muted"
            >
              {i + 1}.
            </span>
            {titre}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-cp-muted italic">
            <span className="not-italic" style={{ color: "var(--acc-text)" }}>
              {marqueur}
            </span>{" "}
            {note}
          </p>
        </section>
      ))}
    </div>
  );
}
