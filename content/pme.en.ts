import type { ContenuPme } from "./pme";

/**
 * La copie anglaise de /pme — squelette, pas encore rédigé.
 *
 * **Ce n'est pas une traduction de `pme.fr.ts`, et il ne faut pas la traiter
 * comme telle.** Le français s'adresse aux PME québécoises et vend la
 * proximité ; l'anglais s'adresse aux PME canadiennes, pour qui « au Québec »
 * n'est pas un argument mais une coordonnée. Même fait, angle inversé : les
 * données ne sortent pas du Canada. Passer ce fichier à un traducteur
 * automatique produirait une page correcte et inutile.
 *
 * Ce qui n'est **pas** du texte est déjà juste et ne doit pas bouger : les `id`
 * d'ancres (ce sont des cibles de `#lien`), les `cle` d'icônes, et les
 * `factures` — ce sont des identifiants de `offre.ts`, dont `libelleDe()` tire
 * le libellé anglais tout seul.
 *
 * Points de vigilance au moment de rédiger :
 *   - `budget.points[0].titre` doit interpoler `OFFRE_EN_DEVISE` (`offre.ts`),
 *     jamais écrire le montant. Vérifier au passage le format : `/en/pricing`
 *     formate ses montants en `en-CA`, `OFFRE_EN_DEVISE` en `fr-CA`.
 *   - `meta.description` : fenêtre 140-160 caractères.
 *   - Ne rien affirmer de plus que le français sur l'hébergement — aucune
 *     certification, aucun audit, aucune conformité nommée. PIPEDA et les lois
 *     de la C.-B. et de l'Alberta se mentionnent comme cadre, pas comme label
 *     obtenu.
 *   - Anglais canadien.
 */
export const PME_EN: ContenuPme = {
  meta: {
    titre: "TODO — titre EN (souveraineté canadienne, pas « Québec »)",
    description: "TODO — description EN, 140-160 caractères",
  },

  og: {
    alt: "TODO — texte alternatif EN",
    titre: "TODO — titre de l’image OG",
    soustitre: "TODO — sous-titre de l’image OG",
  },

  filAriane: { accueil: "TODO — Home", page: "TODO — SMB" },

  facturation: { prefixe: "TODO — billed as", separateur: ", ", joncteur: " and " },

  hero: {
    surtitre: "TODO — sur-titre EN",
    lignes: ["TODO — ligne 1", "TODO — ligne 2", "TODO — ligne 3"],
    texte: "TODO — paragraphe du héros EN",
    cta: "TODO — CTA principal EN",
    lienCompte: "TODO — lien de création de compte EN",
  },

  ancres: [
    { id: "comptabilite", libelle: "TODO — Accounting" },
    { id: "administration", libelle: "TODO — Administration" },
    { id: "marketing", libelle: "TODO — Marketing" },
    { id: "equipe", libelle: "TODO — Together" },
    { id: "budget", libelle: "TODO — Budget" },
    { id: "donnees", libelle: "TODO — Your data" },
  ],

  metiers: [
    {
      id: "comptabilite",
      surtitre: "TODO — sur-titre EN",
      factures: ["Données"],
      titre: "TODO — titre EN",
      texte: "TODO — paragraphe EN",
      jobEnTete: true,
      job: {
        titre: "TODO — intitulé de la tâche EN",
        logs: ["TODO — ligne 1", "TODO — ligne 2", "TODO — ligne 3"],
      },
      transformations: [
        { entree: "TODO — entrée 1", sortie: "TODO — sortie 1" },
        { entree: "TODO — entrée 2", sortie: "TODO — sortie 2" },
        { entree: "TODO — entrée 3", sortie: "TODO — sortie 3" },
        { entree: "TODO — entrée 4", sortie: "TODO — sortie 4" },
      ],
    },
    {
      id: "administration",
      surtitre: "TODO — sur-titre EN",
      factures: ["Documents"],
      titre: "TODO — titre EN",
      texte: "TODO — paragraphe EN",
      transformations: [
        { entree: "TODO — entrée 1", sortie: "TODO — sortie 1" },
        { entree: "TODO — entrée 2", sortie: "TODO — sortie 2" },
        { entree: "TODO — entrée 3", sortie: "TODO — sortie 3" },
        { entree: "TODO — entrée 4", sortie: "TODO — sortie 4" },
        { entree: "TODO — entrée 5", sortie: "TODO — sortie 5" },
      ],
      lienTarifs: "TODO — lien vers /en/pricing",
    },
    {
      id: "marketing",
      surtitre: "TODO — sur-titre EN",
      factures: ["Média", "Images", "Scraping"],
      titre: "TODO — titre EN",
      texte: "TODO — paragraphe EN",
      transformations: [
        { entree: "TODO — entrée 1", sortie: "TODO — sortie 1" },
        { entree: "TODO — entrée 2", sortie: "TODO — sortie 2" },
        { entree: "TODO — entrée 3", sortie: "TODO — sortie 3" },
        { entree: "TODO — entrée 4", sortie: "TODO — sortie 4" },
      ],
      job: {
        titre: "TODO — intitulé de la tâche EN",
        logs: ["TODO — ligne 1", "TODO — ligne 2", "TODO — ligne 3"],
      },
    },
  ],

  equipe: {
    id: "equipe",
    surtitre: "TODO — sur-titre EN",
    titre: "TODO — titre EN",
    texte: "TODO — paragraphe EN",
    cartes: [
      { cle: "bureaux", titre: "TODO — Team desktops", texte: "TODO — texte EN" },
      { cle: "messagerie", titre: "TODO — Messaging", texte: "TODO — texte EN" },
      { cle: "courriel", titre: "TODO — Email", texte: "TODO — texte EN" },
      { cle: "agenda", titre: "TODO — Calendar", texte: "TODO — texte EN" },
    ],
    lien: "TODO — lien vers /en/platform",
  },

  budget: {
    id: "budget",
    surtitre: "TODO — sur-titre EN",
    titre: "TODO — titre EN",
    texte: "TODO — paragraphe EN",
    points: [
      // Interpoler `OFFRE_EN_DEVISE` ici — voir l'en-tête du fichier.
      { cle: "offert", titre: "TODO — crédits offerts", texte: "TODO — texte EN" },
      { cle: "traite", titre: "TODO — titre EN", texte: "TODO — texte EN" },
      { cle: "consulter", titre: "TODO — titre EN", texte: "TODO — texte EN" },
    ],
    lien: "TODO — lien vers /en/pricing",
  },

  donnees: {
    id: "donnees",
    // Le bloc qui diverge le plus. En français : la proximité (« nos serveurs
    // sont dans votre région »). En anglais : la souveraineté (« vos données
    // ne quittent pas le Canada »), avec PIPEDA et les lois provinciales de la
    // C.-B. et de l'Alberta comme cadre légal de référence — cité comme cadre,
    // jamais comme certification obtenue.
    surtitre: "TODO — sur-titre EN",
    titre: "TODO — titre EN, angle souveraineté canadienne",
    paragraphes: [
      "TODO — paragraphe 1 : le matériel nous appartient, il est au Canada, ce n’est pas de la capacité louée chez un fournisseur étranger.",
      "TODO — paragraphe 2 : le modèle de langage tourne sur notre matériel, aucun fournisseur d’IA tiers ne voit vos fichiers.",
    ],
    lien: "TODO — lien vers /en/security",
  },

  closer: {
    soustitre: "TODO — sous-titre du closer EN",
    bouton: "TODO — CTA principal EN",
    lien: "TODO — lien secondaire EN",
  },
};

/**
 * Faux tant que la copie ci-dessus n'est pas rédigée.
 *
 * C'est le seul garde-fou entre ces `TODO` et la production : `contenuPme()`
 * sert le français tant que ce drapeau est bas. Il se lève **en même temps**
 * que la dernière chaîne remplacée, pas avant — et la route `/en/pme` ne doit
 * pas exister avant lui non plus, sinon elle publierait une page française
 * sous une URL anglaise.
 */
export const PME_EN_PRET = false;
