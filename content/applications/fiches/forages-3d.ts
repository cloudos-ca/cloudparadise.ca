import type { FicheApplication } from "../types";

/**
 * Forages 3D — ÉBAUCHE, à relire avant publication.
 *
 * Faits : /fonctions (déjà relue) — le desurvey de vos relevés, et les traces affichées en trois
 * dimensions. Dans le produit (src/lib/drillholes/parse.ts, dépôt cloudparadise_hpc) : lecture d'un
 * GeoJSON de traces (LineString en Z), identifiant HOLE_ID et profondeur PROF_MAX, une couleur par
 * sondage, rotation, zoom et déplacement à la souris. Utilisable aussi sur téléphone (pas
 * `desktopOnly`).
 */
export const forages3d: FicheApplication = {
  id: "forages-3d",
  apps: ["drillholes-3d"],
  slug: { fr: "forages-3d", en: "3d-drillholes" },
  nom: { fr: "Forages 3D", en: "3D drillholes" },
  titre: {
    fr: "Vos sondages en trois dimensions, dans le navigateur",
    en: "Your drillholes in three dimensions, in the browser",
  },
  groupe: "mines",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Visualisation 3D des forages dans le navigateur — Cloud OS",
      en: "3D drillhole viewer in the browser — Cloud OS",
    },
    description: {
      fr: "Affichez les traces de vos sondages en trois dimensions à partir de leur desurvey, sans logiciel à installer. Pour l'exploration minière au Québec.",
      en: "Display your drillhole traces in three dimensions from their desurvey, with no software to install. Built for mineral exploration in Québec.",
    },
  },
  accroche: {
    fr: "Le desurvey de vos sondages, affiché en 3D.",
    en: "Your drillhole desurvey, displayed in 3D.",
  },
  motsCles: {
    fr: ["visualisation 3d forages", "desurvey sondages", "logiciel exploration minière", "traces de forage 3d"],
    en: ["3d drillhole viewer", "drillhole desurvey", "mineral exploration software", "3d drill traces"],
  },
  corps: {
    fr: [
      {
        titre: "Voir la campagne d'un coup d'œil",
        paragraphes: [
          "Forages 3D affiche les traces de vos sondages dans l'espace, à partir de leur desurvey : chaque sondage a sa couleur, son collet et sa profondeur, et la légende les liste tous. Vous faites pivoter la vue, zoomez et vous déplacez à la souris pour lire l'orientation et l'espacement des trous.",
        ],
      },
      {
        titre: "À partir de vos fichiers",
        paragraphes: [
          "L'application lit un fichier GeoJSON de traces de forage déposé dans votre espace Fichiers. Aucun logiciel de géologie à installer sur le poste : la vue s'ouvre dans le navigateur, y compris sur une tablette ou un téléphone sur le terrain.",
        ],
      },
      {
        titre: "Avec le reste de l'exploration",
        paragraphes: [
          "Forages 3D fait partie des outils d'exploration minière de Cloud OS, avec le suivi des titres miniers et de leurs échéances, et les couches SIGÉOM importées par district minier.",
        ],
      },
    ],
    en: [
      {
        titre: "See the campaign at a glance",
        paragraphes: [
          "3D drillholes displays your drillhole traces in space, from their desurvey: each hole has its colour, its collar and its depth, and the legend lists them all. You rotate, zoom and pan with the mouse to read the orientation and spacing of the holes.",
        ],
      },
      {
        titre: "From your own files",
        paragraphes: [
          "The app reads a GeoJSON file of drillhole traces stored in your Files space. No geology software to install on the computer: the view opens in the browser, including on a tablet or phone in the field.",
        ],
      },
      {
        titre: "Alongside the rest of your exploration",
        paragraphes: [
          "3D drillholes is part of the Cloud OS mineral exploration tools, together with tracking of mining claims and their deadlines, and SIGÉOM layers imported by mining district.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Quel format de fichier Forages 3D lit-il ?",
        reponse: "Un GeoJSON de traces de forage (lignes en trois dimensions), avec l'identifiant et la profondeur de chaque sondage.",
      },
      {
        question: "Faut-il un logiciel de géologie installé ?",
        reponse: "Non. La vue 3D s'ouvre dans le navigateur, sans rien installer.",
      },
      {
        question: "Forages 3D coûte-t-il un supplément ?",
        reponse: "Non. Il est compris dans l'abonnement dès le forfait Personnel.",
      },
    ],
    en: [
      {
        question: "What file format does 3D drillholes read?",
        reponse: "A GeoJSON file of drillhole traces (three-dimensional lines), with the identifier and depth of each hole.",
      },
      {
        question: "Do I need geology software installed?",
        reponse: "No. The 3D view opens in the browser, with nothing to install.",
      },
      {
        question: "Does 3D drillholes cost extra?",
        reponse: "No. It is included in the subscription from the Personal plan.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/forages-3d/forages-3d-sondages.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "Douze sondages fictifs affichés en trois dimensions dans Forages 3D, avec leur légende",
        en: "Twelve fictitious drillholes displayed in three dimensions in 3D drillholes, with their legend",
      },
    },
  ],
  voisines: ["freecad", "writer"],
  articles: [
    { slug: "planification-de-taches-cloud", titre: "Planification de tâches cloud : souveraineté et automatisation pour PME" },
  ],
};
