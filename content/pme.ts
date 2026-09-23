import type { TypeTache } from "@/components/marketing/offre";
import type { Lang } from "@/components/marketing/tokens";
import { PME_FR } from "./pme.fr";
import { PME_EN, PME_EN_PRET } from "./pme.en";

/**
 * Forme du contenu de /pme, et résolution par langue.
 *
 * **Pourquoi un fichier de contenu par langue plutôt qu'un objet bilingue.**
 * Partout ailleurs sur le site, le texte vit dans des objets `{ fr, en }` :
 * c'est le bon outil quand les deux versions disent la même chose. Ici elles ne
 * la disent pas. Le marché québécois s'achète sur la proximité (les serveurs
 * sont dans votre région, la Loi 25), le marché canadien sur la souveraineté
 * (vos données ne sortent pas du Canada, PIPEDA). Un objet bilingue mettrait
 * ces deux arguments côte à côte sur la même ligne et laisserait croire que
 * l'un est la traduction de l'autre — la première personne qui corrigerait le
 * français « corrigerait » l'anglais dans la foulée. Deux fichiers séparés
 * rendent la divergence visible et volontaire.
 *
 * Ce qu'ils partagent, c'est `ContenuPme` : même squelette de sections, même
 * nombre de blocs, mêmes clés. La page est donc un seul composant, qui ne
 * connaît que la forme.
 *
 * Ce qui ne descend PAS ici : les prix, les libellés de modes facturés et les
 * icônes. Les deux premiers vivent dans `offre.ts` (source unique, voir son
 * en-tête) et sont résolus par la page ; les icônes sont des composants React,
 * donc du rendu, pas du texte.
 */

/** Une ligne « X → Y » de la liste de transformations. */
export type Transformation = { entree: string; sortie: string };

/** Une entrée de la barre d'ancres, dans la langue active. */
export type AncrePme = { id: string; libelle: string };

/** Fenêtre de tâche : intitulé + lignes de journal. */
export type Journal = { titre: string; logs: readonly string[] };

/**
 * Clé d'icône. Le contenu ne transporte pas de composant React : il nomme le
 * pictogramme voulu, la page fait la correspondance. C'est aussi ce qui empêche
 * les deux fichiers de langue de diverger sur autre chose que du texte.
 */
export type CleCarteEquipe = "bureaux" | "messagerie" | "courriel" | "agenda";
export type ClePointBudget = "offert" | "traite" | "consulter";
export type CleCarteErp =
  | "crm"
  | "facturation"
  | "grandLivre"
  | "etatsFinanciers"
  | "banque"
  | "inventaire";
/** Bureau d'assistance — le module `desk`, qui partage le référentiel clients
 *  de l'ERP. Quatre cartes seulement : la page dédiée porte le détail. */
export type CleCarteDesk =
  | "portail"
  | "courriel"
  | "clavardage"
  | "engagements";

export type CarteEquipe = {
  cle: CleCarteEquipe;
  titre: string;
  texte: string;
};

export type CarteErp = {
  cle: CleCarteErp;
  titre: string;
  texte: string;
};

export type CarteDesk = {
  cle: CleCarteDesk;
  titre: string;
  texte: string;
};

export type PointBudget = {
  cle: ClePointBudget;
  titre: string;
  texte: string;
};

/**
 * Une section « métier » : comptabilité, administration, marketing.
 *
 * `factures` porte des identifiants de `offre.ts`, jamais des noms écrits à la
 * main — le libellé affiché dépend de la langue et un littéral recopié a déjà
 * fait apparaître un même mode sous deux noms.
 */
export type SectionMetier = {
  id: string;
  surtitre: string;
  factures: readonly TypeTache[];
  titre: string;
  texte: string;
  transformations: readonly Transformation[];
  job?: Journal;
  /**
   * Fenêtre avant la liste plutôt qu'après. Choix de rythme, pas de contenu :
   * la comptabilité ouvre sur la machine qui tourne, le marketing la garde en
   * conclusion. Les trois sections seraient sinon typographiquement identiques.
   */
  jobEnTete?: boolean;
  /** Libellé du lien vers /tarifs, quand la section en porte un. */
  lienTarifs?: string;
};

export type ContenuPme = {
  meta: { titre: string; description: string };
  /** Titre et sous-titre de l'image Open Graph, + son texte alternatif. */
  og: { alt: string; titre: string; soustitre: string };
  filAriane: { accueil: string; page: string };
  /**
   * De quoi écrire « facturé Média, Images et Extraction web » sans jamais
   * coder l'énumération en dur : le préfixe, le séparateur des premiers termes
   * et la conjonction finale. Les noms de modes, eux, restent lus dans
   * `offre.ts`. L'anglais posera `", "` / `" and "`.
   */
  facturation: { prefixe: string; separateur: string; joncteur: string };
  hero: {
    surtitre: string;
    /** Une entrée par ligne du titre — les sauts sont voulus, pas subis. */
    lignes: readonly string[];
    texte: string;
    cta: string;
    lienCompte: string;
  };
  ancres: readonly AncrePme[];
  metiers: readonly SectionMetier[];
  /**
   * Gestion d'entreprise (CRM, devis/factures, inventaire, tableau de bord) —
   * livrée fin juillet 2026, jamais couverte sur la vitrine avant le
   * 2026-08-12. Section à part plutôt qu'un 4ᵉ `SectionMetier` : elle ne
   * facture aucune tâche au sens d'`offre.ts`, donc `factures` (obligatoire
   * sur `SectionMetier`) ne s'y applique pas — même raison qui a gardé
   * `equipe` et `donnees` hors du tableau `metiers`.
   */
  erp: {
    id: string;
    surtitre: string;
    titre: string;
    texte: string;
    cartes: readonly CarteErp[];
    lien: string;
  };
  /** Le Bureau d'assistance, juste après l'ERP dont il partage les clients. */
  desk: {
    id: string;
    surtitre: string;
    titre: string;
    texte: string;
    cartes: readonly CarteDesk[];
    lien: string;
  };
  equipe: {
    id: string;
    surtitre: string;
    titre: string;
    texte: string;
    cartes: readonly CarteEquipe[];
    lien: string;
  };
  budget: {
    id: string;
    surtitre: string;
    titre: string;
    texte: string;
    points: readonly PointBudget[];
    lien: string;
  };
  donnees: {
    id: string;
    surtitre: string;
    titre: string;
    paragraphes: readonly string[];
    lien: string;
  };
  closer: { soustitre: string; bouton: string; lien: string };
};

/**
 * Le contenu de la locale demandée.
 *
 * Repli sur le français tant que `PME_EN_PRET` est faux : une page à moitié
 * traduite est pire qu'une page dans l'autre langue — le visiteur anglophone
 * verrait des marqueurs de traduction manquante en production. Le drapeau se
 * lève dans `pme.en.ts`, en même temps que la copie, en une seule modification.
 */
export function contenuPme(lang: Lang): ContenuPme {
  return lang === "en" && PME_EN_PRET ? PME_EN : PME_FR;
}
