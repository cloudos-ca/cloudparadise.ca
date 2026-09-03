import type { Lang } from "./tokens";

/**
 * Conditions commerciales, en un seul endroit.
 *
 * Ces valeurs apparaissent à plusieurs endroits de la page — le hero les
 * promet, la section Tarification les détaille. Les centraliser évite qu'un
 * montant change ici sans changer là.
 */

/** Taux réel : un crédit vaut une unité de devise. */
export const CREDIT_EN_DEVISE = 1;

/**
 * Dollar canadien. La forme « $ CA » est celle recommandée en français
 * canadien ; elle lève l'ambiguïté pour un visiteur hors Canada, ce que le
 * simple « $ » ne fait pas.
 */
export const DEVISE = "$ CA";

/** Crédits offerts à la création du compte. */
export const CREDITS_OFFERTS = 10;

/** Montant minimal d'une recharge. */
export const RECHARGE_MINIMALE = 5;

const nf = new Intl.NumberFormat("fr-CA");

/** « 10 $ CA », prêt à insérer dans une phrase. */
export const OFFRE_EN_DEVISE = `${nf.format(CREDITS_OFFERTS * CREDIT_EN_DEVISE)} ${DEVISE}`;

/** « 5 $ CA », idem. */
export const RECHARGE_MINIMALE_EN_DEVISE = `${nf.format(
  RECHARGE_MINIMALE * CREDIT_EN_DEVISE,
)} ${DEVISE}`;

/**
 * Grille tarifaire — coût en crédits, et unité de débit quand ce n'est pas la
 * tâche.
 *
 * Source de vérité unique des prix : la section Tarification de la landing et
 * la page /tarifs lisent toutes les deux ici. Un prix ne doit jamais être
 * réécrit dans du JSX, sinon les deux surfaces divergent en silence.
 *
 * Les types listés ici doivent refléter les modes réellement facturés par
 * l'application (`src/lib/billing/pricing.ts` côté produit). Aucune surface de
 * la vitrine n'affiche leur nombre : ce décompte change avec le produit et un
 * chiffre figé devient faux sans prévenir.
 *
 * **Ces montants sont modifiables par un administrateur sans déploiement.**
 * Relevés contre la base de production le 2026-08-02 ; c'est la deuxième fois
 * qu'ils divergent de ce fichier. Les lire dynamiquement n'est pas possible
 * aujourd'hui : l'application n'expose aucune API de tarification, `lib/site.ts`
 * s'interdit toute origine lue à l'exécution, et la CSP de `next.config.ts`
 * bloquerait l'appel côté client. Un relevé daté est donc le meilleur garde-fou
 * disponible — et il vaut mieux qu'il soit visible ici que nulle part.
 *
 * **Unité de débit.** Le forfait par tâche est la règle : une tâche coûte son
 * prix, quel que soit le volume qu'elle traite. Deux exceptions seulement, et
 * elles sont portées par les champs ci-dessous plutôt que par la copie, parce
 * que c'est un fait de facturation et non une tournure de page :
 *
 * - `unite` — le débit se compte à la pièce sur toute la ligne. Deux cas : le
 *   traitement d'images, facturé par image, et la source de données API,
 *   facturée par appel.
 * - `uniteException` — la ligne reste au forfait, sauf une opération. Deux
 *   cas : le publipostage, facturé par document généré — écrire « par document »
 *   sec sur Documents serait faux pour la conversion, l'OCR, la fusion, le
 *   classement, la traduction et l'indexation — et le rendu 3D en séquence
 *   d'animation, facturé par frame.
 *
 * La génération d'images n'en fait pas partie : une tâche y produit une image,
 * donc le forfait et la pièce coïncident.
 *
 * `type` est un identifiant interne stable, jamais affiché — c'est lui que
 * lisent `modes.ts` (couleurs) et le typage `TypeTache`. Le texte montré au
 * visiteur vit dans `libelle`, par langue.
 */
export const GRILLE = [
  { type: "IA", libelle: { fr: "IA", en: "AI" }, cout: 0.1 },
  {
    type: "Documents",
    libelle: { fr: "Documents", en: "Documents" },
    cout: 0.25,
    uniteException: {
      fr: "publipostage : par document",
      en: "mail merge: per document",
    },
  },
  {
    type: "Données",
    libelle: { fr: "Données", en: "Data" },
    cout: 0.25,
  },
  { type: "Média", libelle: { fr: "Média", en: "Media" }, cout: 0.5 },
  {
    type: "Scraping",
    libelle: { fr: "Extraction web", en: "Scraping" },
    cout: 0.5,
  },
  {
    type: "Calcul GPU",
    libelle: { fr: "Calcul GPU", en: "GPU Compute" },
    cout: 0.5,
  },
  {
    // Corrigé le 2026-09-03 : 1,00 → 0,10 pour un rendu unique (frame, preview
    // ou raw). Deuxième correction en un mois — le prix avait déjà bougé de
    // 3,00 à 1,00 le 2026-08-02, puis de nouveau le 2026-08-26 (commentaire
    // daté dans `pricing.ts`, dépôt applicatif). Une séquence d'animation
    // (`render-sequence`) n'est plus au forfait plafonné à 10 images : elle se
    // facture à la frame, garde-fou technique à 2000 frames seulement. Fait
    // relevé sur la foi du brief du 2026-09-03, pas vérifié directement dans
    // ce dépôt-ci — à confronter au code applicatif au prochain accès.
    type: "Rendu 3D",
    libelle: { fr: "Rendu 3D", en: "3D Rendering" },
    cout: 0.1,
    uniteException: {
      fr: "séquence d’animation : par frame",
      en: "animation sequence: per frame",
    },
  },
  {
    type: "Images",
    libelle: { fr: "Images", en: "Images" },
    cout: 0.25,
    unite: { fr: "image", en: "image" },
  },
  {
    type: "Génération d'images",
    // Apostrophe typographique dans le libellé affiché ; l'identifiant `type`,
    // lui, garde l'apostrophe droite — il n'est jamais montré.
    libelle: { fr: "Génération d’images", en: "Image Generation" },
    cout: 0.25,
  },
  {
    type: "Impression 3D",
    libelle: { fr: "Impression 3D", en: "3D Printing" },
    cout: 0.5,
  },
  {
    type: "Simulation",
    libelle: { fr: "Simulation", en: "Simulation" },
    cout: 0.5,
  },
  {
    // Ajouté le 2026-08-02. Il était déjà annoncé comme fonctionnalité sur
    // /fonctions et /en/features, sans prix — et une fonctionnalité annoncée
    // sans prix se lit comme gratuite ou comme un devis. Les deux sont faux :
    // c'est 0,50. Les trois autres moteurs facturés par l'application et
    // absents d'ici (Téléchargement, Marketplace, Jeux) restent dehors ;
    // celui-ci porte le positionnement de /mines, son absence coûtait quelque
    // chose.
    //
    // `type` reste à confronter à l'identifiant interne de l'application : il
    // a été choisi ici sans accès au dépôt du produit.
    type: "Géomatique",
    libelle: { fr: "Géomatique et SIG", en: "Geomatics and GIS" },
    cout: 0.5,
  },
  {
    // Ajouté le 2026-09-03. Nouveau moteur (job `VOICE`) : transcription d'un
    // mémo vocal déposé directement dans l'assistant, 0,50 $ par mémo quelle
    // que soit sa durée — pas un débit à la minute. `type` reste à confronter
    // à l'identifiant interne de l'application, comme pour Géomatique.
    type: "Mémo vocal",
    libelle: { fr: "Mémo vocal", en: "Voice Memo" },
    cout: 0.5,
  },
  {
    // Ajouté le 2026-09-03. Passerelle vers un fournisseur externe (Google
    // Geocoding, Microsoft Translator, etc.), facturée par appel — c'est un
    // coût qui varie avec l'usage, pas une tâche au forfait. `type` reste à
    // confronter à l'identifiant interne de l'application.
    type: "Source de données",
    libelle: { fr: "Source de données", en: "Data Source" },
    cout: 0.1,
    unite: { fr: "appel", en: "call" },
  },
] as const;

export type TypeTache = (typeof GRILLE)[number]["type"];

/** Texte affiché pour un type donné, dans la langue demandée. */
export function libelleDe(type: TypeTache, lang: Lang): string {
  const ligne = GRILLE.find((g) => g.type === type);
  if (!ligne) throw new Error(`Type de tâche inconnu : ${type}`);
  return ligne.libelle[lang];
}

/** Libellé affiché à la place d'un prix encore indéterminé. */
export function tarifAVenir(lang: Lang): string {
  return lang === "en" ? "Pricing coming soon" : "Tarif à venir";
}

/**
 * Unité de débit d'un type donné — « tâche » sauf exception.
 *
 * Sert deux surfaces qui doivent dire la même chose : le suffixe de la colonne
 * Prix, et le `unitText` du balisage `UnitPriceSpecification`. Ce dernier posait
 * « tâche » sur tous les moteurs, Images comprise : un moteur de recherche
 * conservait donc l'erreur même une fois la page corrigée.
 */
export function uniteDe(type: TypeTache, lang: Lang): string {
  const ligne = GRILLE.find((g) => g.type === type);
  if (!ligne) throw new Error(`Type de tâche inconnu : ${type}`);
  if ("unite" in ligne) return ligne.unite[lang];
  return lang === "en" ? "task" : "tâche";
}

/**
 * Vrai quand la ligne entière se compte à la pièce, et non à la tâche.
 *
 * Un prédicat plutôt qu'une comparaison de `uniteDe` avec « tâche » : le jour
 * où un moteur se facturera « par tâche » dans un libellé traduit autrement,
 * la comparaison de chaînes rendrait silencieusement le mauvais résultat.
 */
export function estALaPiece(type: TypeTache): boolean {
  const ligne = GRILLE.find((g) => g.type === type);
  if (!ligne) throw new Error(`Type de tâche inconnu : ${type}`);
  return "unite" in ligne;
}

/**
 * Opération de la ligne qui se compte autrement — `null` quand il n'y en a pas.
 *
 * Séparé de `uniteDe` parce que les deux ne s'affichent pas au même endroit :
 * l'unité principale suffixe le montant, l'exception se lit en dessous. Les
 * fondre donnerait une chaîne que ni le balisage ni la cellule ne peuvent
 * utiliser telle quelle.
 */
export function uniteExceptionDe(type: TypeTache, lang: Lang): string | null {
  const ligne = GRILLE.find((g) => g.type === type);
  if (!ligne) throw new Error(`Type de tâche inconnu : ${type}`);
  return "uniteException" in ligne ? ligne.uniteException[lang] : null;
}

/**
 * Coût d'un type donné, en crédits — `null` tant que le prix n'est pas arrêté.
 *
 * Le type de retour inclut volontairement `null` : c'est lui qui force chaque
 * appelant à décider quoi afficher (ou à s'abstenir de calculer) au lieu de
 * propager un `NaN` silencieux jusqu'à l'écran.
 */
export function coutDe(type: TypeTache): number | null {
  const ligne = GRILLE.find((g) => g.type === type);
  if (!ligne) throw new Error(`Type de tâche inconnu : ${type}`);
  return ligne.cout;
}
