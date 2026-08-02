import { OFFRE_EN_DEVISE } from "@/components/marketing/offre";
import type { ContenuPme } from "./pme";

/**
 * La copie française de /pme — PME québécoises.
 *
 * **L'ancrage est la proximité**, pas la souveraineté : les serveurs sont dans
 * la même région que vous, sur du matériel qui nous appartient. L'anglais
 * retournera l'argument (les données ne sortent pas du Canada) parce qu'il
 * s'adresse à un marché pancanadien pour qui « au Québec » n'est pas un
 * argument de vente mais une précision géographique. Voir l'en-tête de
 * `pme.ts` pour le pourquoi de deux fichiers plutôt qu'un objet bilingue.
 *
 * Contraintes que ce fichier respecte, et qu'il faut continuer de respecter :
 *   - aucun montant écrit à la main — `OFFRE_EN_DEVISE` vient de `offre.ts` ;
 *   - aucun décompte de modes (« nos 8 modes »), le produit en gagne et en perd ;
 *   - rien de plus que le brief sur l'hébergement : pas de certification, pas
 *     d'audit, pas de conformité nommée. Une formulation qui semble manquer se
 *     signale, elle ne s'invente pas.
 */
export const PME_FR: ContenuPme = {
  meta: {
    titre: "Le poste de travail des PME québécoises — Cloud Paradise",
    description:
      "Comptabilité, administration, marketing : le poste de travail des PME québécoises, sans département informatique. Serveurs au Québec, crédits sans abonnement.",
  },

  og: {
    alt: "Cloud Paradise — PME",
    titre: "PME",
    soustitre: "Le poste de travail des PME québécoises",
  },

  filAriane: { accueil: "Accueil", page: "PME" },

  facturation: { prefixe: "facturé", separateur: ", ", joncteur: " et " },

  hero: {
    surtitre: "PME",
    lignes: [
      "Le poste de travail",
      "des PME québécoises.",
      "Sans département informatique.",
    ],
    texte:
      "Vos documents, vos chiffres et vos médias dans le même espace de travail. Vous décrivez ce que vous voulez obtenir, le calcul se fait chez nous — rien à installer, personne à embaucher.",
    cta: "Réservez une démo",
    lienCompte: "Créez votre compte",
  },

  ancres: [
    { id: "comptabilite", libelle: "La comptabilité" },
    { id: "administration", libelle: "L’administration" },
    { id: "marketing", libelle: "Le marketing" },
    { id: "equipe", libelle: "À plusieurs" },
    { id: "budget", libelle: "Le budget" },
    { id: "donnees", libelle: "Vos données" },
  ],

  metiers: [
    {
      id: "comptabilite",
      surtitre: "La comptabilité",
      factures: ["Données"],
      titre: "De l’export comptable au tableau de bord.",
      texte:
        "Vous déposez vos exports, vous posez votre question en français. Vos sources sont lues en lecture seule, jamais modifiées.",
      // La fenêtre ouvre la section : la comptabilité est le métier où « ça
      // tourne tout seul » demande le plus à être montré avant d'être promis.
      jobEnTete: true,
      job: {
        titre: "Croiser 12 mois d’exports comptables",
        logs: [
          "→ lecture de 14 fichiers .csv",
          "→ croisement par fournisseur et par mois",
          "→ tableau de bord prêt · 12/12",
        ],
      },
      transformations: [
        {
          entree: "un export comptable de 12 mois",
          sortie: "un tableau de bord de trésorerie",
        },
        {
          entree: "« Le chiffre d’affaires par région, ce trimestre »",
          sortie: "la réponse, sans écrire une requête SQL",
        },
        {
          entree: "200 factures fournisseurs en PDF",
          sortie: "un tableur avec les montants et les dates",
        },
        {
          entree: "un lot d’écritures",
          sortie: "les anomalies repérées, listées",
        },
      ],
    },
    {
      id: "administration",
      surtitre: "L’administration",
      factures: ["Documents"],
      titre: "Vos dossiers, enfin cherchables.",
      texte:
        "Vos fichiers restent dans votre espace. Vous décrivez le résultat voulu ; le contenu ne sort jamais.",
      transformations: [
        {
          entree: "200 contrats PDF",
          sortie: "un tableur avec toutes les dates d’échéance",
        },
        {
          entree: "« Où est-il question de garantie ? »",
          sortie: "les passages exacts, dans tous vos documents",
        },
        {
          entree: "un modèle et une liste de 500 clients",
          sortie: "500 lettres personnalisées",
        },
        {
          entree: "des dossiers sensibles",
          sortie: "une archive chiffrée, prête à partager",
        },
        { entree: "un dossier en vrac", sortie: "classé, renommé, rangé" },
      ],
      lienTarifs: "Voir le détail des tarifs",
    },
    {
      id: "marketing",
      // Trois types facturés et non deux : le dernier exemple est une
      // extraction web, pas un traitement d'image. Annoncer « Média et
      // Images » au-dessus d'une ligne facturée « Extraction web » aurait
      // contredit /tarifs pour quiconque compare les deux pages.
      surtitre: "Le marketing",
      factures: ["Média", "Images", "Scraping"],
      titre: "Vos médias, par lots.",
      // « pendant trois heures » sous-entendait qu'on va plus vite qu'un poste
      // local : rien ne permet de l'affirmer. Ce qui reste vrai, et suffit,
      // c'est que le travail ne se fait pas sur votre machine.
      texte: "Traitez, encodez, générez, triez — sans bloquer votre poste.",
      transformations: [
        {
          entree: "500 photos de produits",
          sortie: "toutes redimensionnées et au bon format",
        },
        {
          entree: "une vidéo 4K",
          sortie: "réencodée en H.265, prête à diffuser",
        },
        {
          entree: "« une bannière pour la promo d’été »",
          sortie: "l’image, générée",
        },
        {
          entree: "un catalogue concurrent en ligne",
          sortie: "un tableur avec les prix et les disponibilités",
        },
      ],
      job: {
        titre: "Redimensionner 500 photos de produits",
        logs: [
          "→ lecture du dossier — 500 images détectées",
          "→ conversion en trois formats",
          "→ archive prête · 1 500/1 500",
        ],
      },
    },
  ],

  equipe: {
    id: "equipe",
    surtitre: "À plusieurs",
    titre: "Le même bureau, toute l’équipe.",
    texte:
      "Créez des bureaux d’équipe, invitez qui vous voulez, approuvez les accès. La discussion, le courriel et l’agenda sont déjà dedans.",
    cartes: [
      {
        cle: "bureaux",
        titre: "Bureaux d’équipe",
        texte:
          "Plusieurs bureaux, partage entre équipes, invitations et approbation des accès.",
      },
      {
        cle: "messagerie",
        titre: "Messagerie",
        texte: "Canaux, messages directs, présence.",
      },
      {
        cle: "courriel",
        titre: "Courriel",
        texte:
          "Webmail intégré, avec une adresse @cloudparadise.ca que vous activez depuis votre bureau.",
      },
      {
        cle: "agenda",
        titre: "Agenda",
        texte: "Agenda partagé et rappels.",
      },
    ],
    lien: "Voir la plateforme",
  },

  budget: {
    id: "budget",
    surtitre: "Le budget",
    titre: "Pas de licence par siège. Pas d’abonnement.",
    texte:
      "Des crédits. Vous en recevez pour commencer, vous en rachetez quand vous voulez. Une petite tâche coûte peu ; un gros traitement coûte plus. Rien ne se périme.",
    points: [
      {
        cle: "offert",
        // Le montant vient de `offre.ts` : c'est la seule valeur de ce fichier
        // qui doit suivre un changement de prix sans qu'on y repense.
        titre: `${OFFRE_EN_DEVISE} de crédits offerts à l’inscription`,
        texte: "Testez sans sortir votre carte.",
      },
      {
        cle: "traite",
        titre: "Un prix par tâche",
        texte: "Un lot coûte le prix d’une tâche, quel que soit son volume.",
      },
      {
        cle: "consulter",
        titre: "Consulter ne coûte rien",
        texte:
          "Ouvrir, prévisualiser, naviguer dans vos dossiers : gratuit.",
      },
    ],
    lien: "Voir les tarifs",
  },

  donnees: {
    id: "donnees",
    surtitre: "Vos données",
    titre: "Au Québec, sur notre matériel.",
    paragraphes: [
      "Nos serveurs sont au Québec, dans un local, sur du matériel qui appartient à Cloud Paradise. Ce n’est pas de la capacité louée chez un fournisseur infonuagique étranger.",
      "Le modèle de langage qui lit vos demandes s’exécute sur notre matériel. Vos fichiers et vos demandes ne sont jamais envoyés à un fournisseur d’intelligence artificielle tiers — un point qui compte quand vous manipulez des dossiers clients.",
    ],
    lien: "Voir la sécurité",
  },

  closer: {
    soustitre:
      "Réservez une démo, ou créez votre compte et lancez votre première tâche aujourd’hui.",
    bouton: "Réservez une démo",
    lien: "Créez votre compte →",
  },
};
