import type { TypeTache } from "./offre";

/**
 * Teinte de chaque mode — source unique, lue par /tarifs et /fonctions.
 *
 * Les trois premières viennent de la section Univers (teal, corail, bleu) : un
 * mode doit garder la même couleur d'un bout à l'autre du site. Les autres sont
 * choisies dans le même registre (pastels désaturés qui tiennent sur le navy)
 * plutôt qu'inventées vives.
 *
 * Aucune n'est `--acc` : ces teintes ne suivent pas la recoloration, sinon les
 * modes deviendraient indiscernables. Le jaune de marque est exclu — il
 * n'appartient qu'au halo et au bouton de conversion.
 */
export const TEINTES: Record<TypeTache, string> = {
  IA: "#bbecee",
  Documents: "#35d0c0",
  Données: "#5b9be6",
  Média: "#ef8b6a",
  Scraping: "#a78bfa",
  "Calcul GPU": "#7dd3a0",
  "Rendu 3D": "#f0a8c8",
  // Orchidée : la seule plage de teinte encore libre entre le violet du
  // scraping et le rose du rendu 3D, et assez loin du jaune de marque pour
  // qu'aucune puce ne puisse être prise pour un élément doré.
  Images: "#d98ce6",
  // Rose, entre le corail du média et le rose du rendu 3D : assez proche
  // d'Images pour se lire comme sa variante, assez distinct pour ne pas se
  // confondre avec elle sur la grille tarifaire.
  "Génération d'images": "#f28ba3",
  // Indigo, entre le bleu des données et le violet du scraping — plage encore
  // libre.
  "Impression 3D": "#8ea6f0",
  // Lime désaturé : la seule plage encore libre entre le corail et le vert,
  // assez loin du jaune de marque pour ne pas s'y confondre.
  Simulation: "#c9dd7a",
};
