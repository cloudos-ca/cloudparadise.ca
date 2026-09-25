import type { FicheApplication } from "../types";

/**
 * Données ouvertes — ÉBAUCHE, à relire avant publication.
 *
 * Faits : /fonctions et /mines (déjà relues) — les couches SIGÉOM importées par district minier (pas
 * par feuillet SNRC : voir les commentaires de ces deux pages). Dans le produit (cloudparadise_hpc),
 * vérifié le 2026-09-25 :
 * - Catalogue fixe de 17 couches en cinq thèmes : Géologie (géologie régionale et générale, provinces
 *   géologiques, failles régionales et générales, affleurements), Indices minéralisés (or, cuivre,
 *   zinc, nickel, lithium, tous éléments), Mines & projets (mines et projets, propriétés
 *   d'exploration), Géophysique & Quaternaire (anomalies électromagnétiques, blocs erratiques),
 *   Contraintes (contraintes à l'activité minière) (src/lib/opendata/catalog.ts).
 * - Secteurs proposés dans l'app : Val-d'Or, Malartic, Rouyn-Noranda, faille de Cadillac
 *   (Rouyn↔Val-d'Or), Chibougamau, Abitibi étendu (`REGION_PRESETS` ; l'app n'offre que ces
 *   préréglages, open-data-app).
 * - Jusqu'à 10 000 objets par import (2000 par défaut) ; requête faite côté serveur au WFS public
 *   SIGÉOM ; résultat enregistré dans Fichiers en GeoJSON, coordonnées WGS84 (actions.ts, fr.json
 *   `openData.source`).
 * - Le fichier s'ouvre dans QGIS, se superpose à vos données ou s'affiche dans un Rapport (tuile
 *   Carte) (fr.json `openData.result.hint`).
 * - Aucune tâche débitée (pas de `chargeForJob` dans actions.ts). Pas `desktopOnly`. Forfait
 *   Personnel (GET /api/v1/apps/catalog).
 *
 * À vérifier à la relecture : la fiche ne cite QGIS qu'en passant, comme le fait l'app ; la fiche
 * QGIS n'est pas dans la liste des fiches prévues. Les couches GESTIM (citées sur /mines) ne font pas
 * partie de cette app : non mentionnées.
 */
export const donneesOuvertes: FicheApplication = {
  id: "donnees-ouvertes",
  apps: ["open-data"],
  slug: { fr: "donnees-ouvertes", en: "open-data" },
  nom: { fr: "Données ouvertes", en: "Open data" },
  titre: {
    fr: "Les couches SIGÉOM de votre district minier, en un clic",
    en: "The SIGÉOM layers for your mining district, in one click",
  },
  groupe: "mines",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Couches SIGÉOM en GeoJSON, par district minier — Cloud OS",
      en: "SIGÉOM layers as GeoJSON, by mining district — Cloud OS",
    },
    description: {
      fr: "Géologie, indices minéralisés, failles, anomalies EM : importez les couches SIGÉOM d'un district minier du Québec en GeoJSON, directement dans vos fichiers.",
      en: "Geology, mineral showings, faults, EM anomalies: import the SIGÉOM layers for a Québec mining district as GeoJSON, straight into your files.",
    },
  },
  accroche: {
    fr: "Les couches SIGÉOM d'un district minier, importées dans vos fichiers.",
    en: "SIGÉOM layers for a mining district, imported into your files.",
  },
  motsCles: {
    fr: ["données sigéom", "télécharger couches sigéom", "données géoscientifiques québec", "indices minéralisés abitibi"],
    en: ["sigeom data", "download sigeom layers", "quebec geoscience open data", "abitibi mineral showings"],
  },
  corps: {
    fr: [
      {
        titre: "Le SIGÉOM, sans passer par le portail",
        paragraphes: [
          "Données ouvertes interroge pour vous le service public du SIGÉOM, le système d'information géominière du Québec. Vous choisissez une couche et un district minier ; l'application récupère les objets de ce secteur et les enregistre dans votre espace Fichiers, en GeoJSON.",
        ],
      },
      {
        titre: "Les couches qui servent à l'exploration",
        paragraphes: [
          "Le catalogue retient dix-sept couches, rangées par thème :",
        ],
        points: [
          "Géologie : géologie régionale et générale, provinces géologiques, failles, affleurements.",
          "Indices minéralisés : or, cuivre, zinc, nickel, lithium, ou tous les éléments.",
          "Mines et projets, propriétés d'exploration.",
          "Géophysique et Quaternaire : anomalies électromagnétiques, blocs erratiques.",
          "Contraintes à l'activité minière.",
        ],
      },
      {
        titre: "Par district minier",
        paragraphes: [
          "Les secteurs proposés couvrent la ceinture de l'Abitibi et au-delà : Val-d'Or, Malartic, Rouyn-Noranda, la faille de Cadillac entre Rouyn et Val-d'Or, Chibougamau, et l'Abitibi dans son ensemble. Vous fixez le nombre maximal d'objets, jusqu'à 10 000 par import.",
        ],
      },
      {
        titre: "Prêtes pour la suite",
        paragraphes: [
          "Chaque import devient un fichier GeoJSON en coordonnées WGS84, nommé d'après la couche et le secteur. Vous l'ouvrez dans QGIS, le superposez à vos propres données ou l'affichez sur la carte d'un rapport, sans quitter Cloud OS. L'application cite sa source : SIGÉOM, ministère des Ressources naturelles et des Forêts du Québec.",
        ],
      },
    ],
    en: [
      {
        titre: "SIGÉOM, without going through the portal",
        paragraphes: [
          "Open data queries the public SIGÉOM service, Québec's geomining information system, on your behalf. You choose a layer and a mining district; the app fetches the features in that area and saves them to your Files space as GeoJSON.",
        ],
      },
      {
        titre: "The layers exploration relies on",
        paragraphes: [
          "The catalogue keeps seventeen layers, grouped by theme:",
        ],
        points: [
          "Geology: regional and general geology, geological provinces, faults, outcrops.",
          "Mineral showings: gold, copper, zinc, nickel, lithium, or all elements.",
          "Mines and projects, exploration properties.",
          "Geophysics and Quaternary: electromagnetic anomalies, erratic boulders.",
          "Constraints on mining activity.",
        ],
      },
      {
        titre: "By mining district",
        paragraphes: [
          "The areas on offer cover the Abitibi belt and beyond: Val-d'Or, Malartic, Rouyn-Noranda, the Cadillac fault between Rouyn and Val-d'Or, Chibougamau, and Abitibi as a whole. You set the maximum number of features, up to 10,000 per import.",
        ],
      },
      {
        titre: "Ready for what comes next",
        paragraphes: [
          "Each import becomes a GeoJSON file in WGS84 coordinates, named after the layer and the area. You open it in QGIS, overlay it on your own data or show it on a report map, without leaving Cloud OS. The app credits its source: SIGÉOM, Québec's ministère des Ressources naturelles et des Forêts.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "D'où viennent les données ?",
        reponse: "Du service public du SIGÉOM, le système d'information géominière du ministère des Ressources naturelles et des Forêts du Québec. Ce sont des données ouvertes.",
      },
      {
        question: "Dans quel format sont-elles enregistrées ?",
        reponse: "En GeoJSON, en coordonnées WGS84, dans votre espace Fichiers. Le fichier s'ouvre dans QGIS et dans la plupart des logiciels de SIG.",
      },
      {
        question: "Quels secteurs sont couverts ?",
        reponse: "Val-d'Or, Malartic, Rouyn-Noranda, la faille de Cadillac, Chibougamau et l'Abitibi dans son ensemble.",
      },
      {
        question: "Données ouvertes coûte-t-elle un supplément ?",
        reponse: "Non. L'application est comprise dans l'abonnement dès le forfait Personnel.",
      },
    ],
    en: [
      {
        question: "Where does the data come from?",
        reponse: "From the public SIGÉOM service, the geomining information system of Québec's ministère des Ressources naturelles et des Forêts. It is open data.",
      },
      {
        question: "What format is it saved in?",
        reponse: "GeoJSON, in WGS84 coordinates, in your Files space. The file opens in QGIS and most GIS software.",
      },
      {
        question: "Which areas are covered?",
        reponse: "Val-d'Or, Malartic, Rouyn-Noranda, the Cadillac fault, Chibougamau and Abitibi as a whole.",
      },
      {
        question: "Does Open data cost extra?",
        reponse: "No. The app is included in the subscription from the Personal plan.",
      },
    ],
  },
  captures: [],
  voisines: ["forages-3d", "titres-miniers", "rapport-exploration", "rapports"],
  articles: [],
};
