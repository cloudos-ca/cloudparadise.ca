/**
 * Liste numérotée — distincte de `liste` (à puces) fournie par
 * `SectionsRedigees` : les interdictions de l'article « Utilisation
 * acceptable » des Conditions sont énumérées dans le texte source, une puce
 * leur ferait perdre ce repère. Partagée entre les versions FR et EN de la
 * page.
 */
export function ListeNumerotee({ items }: Readonly<{ items: readonly string[] }>) {
  return (
    // Même respiration et même marqueur cyan que les listes à puces de
    // `SectionsRedigees` : les deux formes cohabitent dans une même page, elles
    // ne doivent pas donner l'impression de venir de deux documents.
    <ol className="space-y-3">
      {items.map((texte, i) => (
        <li key={texte} className="flex gap-3">
          <span
            aria-hidden="true"
            data-cp-accent
            className="shrink-0 tabular-nums"
            style={{ color: "var(--soft)" }}
          >
            {i + 1}.
          </span>
          <span className="min-w-0">{texte}</span>
        </li>
      ))}
    </ol>
  );
}
