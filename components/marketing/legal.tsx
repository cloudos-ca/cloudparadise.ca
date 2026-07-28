import type { ReactNode } from "react";
import { IconAlert } from "./icons";

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
      <ul className="space-y-2 pl-1">
        {avecCles(bloc.liste, (point) =>
          point.terme ? `terme:${point.terme}` : "point",
        ).map(({ cle, element: { terme, texte } }) => (
          <li key={cle} className="flex gap-2.5">
            <span
              aria-hidden="true"
              className="mt-[0.55em] size-1 shrink-0 rounded-full"
              style={{ background: "var(--acc-text)" }}
            />
            <span>
              {terme ? (
                <>
                  <strong className="font-medium text-[#dbe6fb]">
                    {terme}
                  </strong>{" "}
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
    <div className="space-y-8">
      {sections.map(({ titre, blocs }, i) => (
        <section key={titre}>
          <h2 className="font-display text-lg font-bold tracking-tight text-[#eef4ff]">
            <span
              aria-hidden="true"
              className="mr-2 tabular-nums text-[#93a3c2]"
            >
              {i + 1}.
            </span>
            {titre}
          </h2>
          <div className="mt-2 space-y-3 text-sm leading-relaxed text-[#93a3c2]">
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
              className="mr-2 tabular-nums text-[#93a3c2]"
            >
              {i + 1}.
            </span>
            {titre}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#93a3c2] italic">
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
