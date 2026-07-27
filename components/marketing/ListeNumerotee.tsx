/**
 * Liste numérotée — distincte de `liste` (à puces) fournie par
 * `SectionsRedigees` : les interdictions de l'article « Utilisation
 * acceptable » des Conditions sont énumérées dans le texte source, une puce
 * leur ferait perdre ce repère. Partagée entre les versions FR et EN de la
 * page.
 */
export function ListeNumerotee({ items }: Readonly<{ items: readonly string[] }>) {
  return (
    <ol className="space-y-2 pl-1">
      {items.map((texte, i) => (
        <li key={texte} className="flex gap-2.5">
          <span aria-hidden="true" className="tabular-nums text-[#93a3c2]">
            {i + 1}.
          </span>
          <span>{texte}</span>
        </li>
      ))}
    </ol>
  );
}
