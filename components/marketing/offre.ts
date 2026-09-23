import type { Lang } from "./tokens";

/**
 * L'offre commerciale, en un seul endroit : deux forfaits tout inclus, cinq durées, l'essai et la
 * garantie. Le modèle « crédits » (grille de prix par tâche, recharge minimale, crédits offerts) a
 * disparu le jour de la bascule — ce que le visiteur voit maintenant, c'est un abonnement et une
 * jauge en pourcentage.
 *
 * Ces valeurs sont modifiables par un administrateur sans déploiement, côté application. Le test
 * `lib/offre.test.ts` compare ce fichier à `GET /api/v1/pricing` de la production : si un prix bouge
 * là-bas sans bouger ici, la CI rougit. C'est la réponse à deux divergences déjà vécues.
 */

/** Dollar canadien. La forme « $ CA » lève l'ambiguïté pour un visiteur hors Canada. */
export const DEVISE = "$ CA";

/** Essai gratuit, sans carte (spec §2). */
export const ESSAI_JOURS = 14;

/** Satisfait ou remboursé, sur les engagements d'au moins `GARANTIE_DUREE_MIN` mois. */
export const GARANTIE_JOURS = 30;
export const GARANTIE_DUREE_MIN = 12;

/**
 * Sursis laissé à une tâche par lots déjà lancée qui atteint 100 % en cours d'exécution : elle est
 * mise en pause ce nombre d'heures, le temps d'ajouter de l'enveloppe, avant que ce qui a été
 * produit soit livré et le reste abandonné (`CREDIT_HOLD_HOURS` côté application,
 * `src/lib/jobs/batch-credit-hold.ts`). La FAQ le promettait déjà ; les Conditions le disent
 * maintenant aussi, et toutes deux lisent ce nombre ici.
 */
export const SURSIS_TACHE_HEURES = 24;

const nf = new Intl.NumberFormat("fr-CA");

/** « 10 $ CA », prêt à insérer dans une phrase. */
export function enDevise(montant: number): string {
  return `${nf.format(montant)} ${DEVISE}`;
}

export type Palier = {
  id: "personnel" | "entreprise";
  nom: { fr: string; en: string };
  /** Prix mensuel sans engagement, hors taxes. */
  prixMensuel: number;
  /** Enveloppe interne — jamais affichée telle quelle, elle sert à situer « ≈ N tâches ». */
  enveloppe: number;
  /** Ordre de grandeur affiché, arrondi : c'est la promesse, pas un quota. */
  tachesParMois: number;
  inclusions: { fr: readonly string[]; en: readonly string[] };
  /**
   * Ce que `GET /api/v1/pricing` publie sous `includes` pour ce palier — la forme MACHINE des
   * `inclusions` ci-dessus, et la seule que le test anti-divergence puisse comparer (une phrase
   * traduite, non). Le jour où un administrateur retire le Bac à sable d'Entreprise ou change
   * `maxTeamSize`, c'est ce champ-là qui fait rougir la CI.
   *
   * `maxTeamSize` est renseigné même sur un palier qui ne crée pas d'équipe (`teams: false`) : la
   * colonne existe pour tous les forfaits côté application et vaut 25 par défaut. La comparer
   * partout évite qu'une modification passe inaperçue là où elle ne se voit pas à l'écran.
   */
  inclus: { desktop: boolean; hosting: boolean; teams: boolean; maxTeamSize: number };
};

/** Taille maximale d'une équipe (spec §3) : écrite une fois, lue par `inclus.maxTeamSize` ET par la
 * phrase d'inclusion d'Entreprise — jamais retapée dans une page. */
const EQUIPE_MAX = 25;

export const PALIERS: readonly Palier[] = [
  {
    id: "personnel",
    nom: { fr: "Personnel", en: "Personal" },
    prixMensuel: 10,
    enveloppe: 30,
    tachesParMois: 100,
    // Les applications de gestion sont nommées, et pas seulement les moteurs :
    // une PME n'achète pas « des moteurs », elle achète une comptabilité et une
    // billetterie. L'ERP et le Bureau d'assistance fonctionnent en espace
    // personnel (`erp/access.ts` : « personal space is fully the user's own »),
    // sans équipe et sans capacité particulière — ils sont donc bien dans le
    // forfait d'entrée, et le taire coûtait la moitié de l'argument.
    inclusions: {
      fr: [
        "Tous les moteurs de calcul",
        "Le bureau et ses applications : bureautique, image, vidéo, 3D, SIG",
        "Gestion d'entreprise : CRM, facturation, comptabilité en partie double",
        "Bureau d'assistance : billetterie, portail client, courriel, clavardage",
        "Rejoindre une équipe et mettre son enveloppe en commun",
      ],
      en: [
        "Every compute engine",
        "The desktop and its applications: office, image, video, 3D, GIS",
        "Business management: CRM, invoicing, double-entry accounting",
        "Service Desk: ticketing, customer portal, email, live chat",
        "Join a team and pool your allowance",
      ],
    },
    inclus: { desktop: false, hosting: false, teams: false, maxTeamSize: EQUIPE_MAX },
  },
  {
    id: "entreprise",
    nom: { fr: "Entreprise", en: "Business" },
    prixMensuel: 60,
    enveloppe: 200,
    tachesParMois: 650,
    inclusions: {
      fr: [
        "Tout ce que contient Personnel",
        "Bac à sable (bureau persistant)",
        "1 site Hébergement Web",
        `Créer une équipe jusqu'à ${EQUIPE_MAX} membres, avec pool`,
      ],
      en: [
        "Everything in Personal",
        "Sandbox (persistent desktop)",
        "1 Web Hosting site",
        `Create a team of up to ${EQUIPE_MAX} members, with pooling`,
      ],
    },
    inclus: { desktop: true, hosting: true, teams: true, maxTeamSize: EQUIPE_MAX },
  },
] as const;

/** Le Bac à sable n'est plus vendu à part : il est inclus dans Entreprise (spec §3). Le nom reste
 * pour les pages qui le citent comme fonctionnalité. */
export const BAC_A_SABLE_NOM = { fr: "Bac à sable", en: "Sandbox" } as const;

export type Duree = { mois: number; remisePct: number };

/** Cinq durées, la remise croît avec l'engagement ; le prix ne change jamais au renouvellement. */
export const DUREES: readonly Duree[] = [
  { mois: 1, remisePct: 0 },
  { mois: 3, remisePct: 5 },
  { mois: 6, remisePct: 10 },
  { mois: 12, remisePct: 20 },
  { mois: 24, remisePct: 30 },
] as const;

/** Prix total et mensuel équivalent d'une durée. L'ORDRE des opérations compte : c'est celui de
 * `termPrice` côté application (`src/lib/billing/plans.ts:21` — total d'abord, mensuel déduit), et
 * le test anti-divergence compare les deux valeurs au cent près. Calculer le mensuel d'abord
 * donnerait un total différent dès qu'une remise tombe mal. */
export function prixDuree(palier: Palier, mois: number): { mensuel: number; total: number } {
  const duree = DUREES.find((d) => d.mois === mois);
  if (!duree) throw new Error(`durée inconnue : ${mois}`);
  const au_cent = (n: number) => Math.round(n * 100) / 100;
  const total = au_cent(palier.prixMensuel * mois * (1 - duree.remisePct / 100));
  return { mensuel: au_cent(total / mois), total };
}

/** « 3, 6 ou 12 » / « 3, 6 or 12 » — jamais à la main : une énumération de plus de deux éléments
 * mérite l'Oxford comma que `join(", ")` seul ne pose pas. */
function enumerer(mots: readonly string[], lang: Lang): string {
  if (mots.length <= 1) return mots.join("");
  const conjonction = lang === "en" ? "or" : "ou";
  return `${mots.slice(0, -1).join(", ")} ${conjonction} ${mots[mots.length - 1]}`;
}

/**
 * « 1, 3, 6, 12 ou 24 » / « 1, 3, 6, 12 or 24 » — toutes les durées d'engagement offertes, dérivées
 * de `DUREES` plutôt que réécrites en toutes lettres dans une page ou une réponse de FAQ.
 */
export function dureesToutes(lang: Lang): string {
  return enumerer(DUREES.map((d) => String(d.mois)), lang);
}

/**
 * « 12 ou 24 » / « 12 or 24 » — les seules durées d'engagement qui ouvrent droit à la garantie
 * (spec §6.K : `termMonths >= GARANTIE_DUREE_MIN`), dérivées de `DUREES` plutôt que réécrites en
 * toutes lettres. Source unique : les Conditions (fr/en) et `faqTarifsContenu.ts` s'y réfèrent tous
 * les trois, pour ne jamais diverger sur ce que couvre la garantie.
 */
export function dureesGarantie(lang: Lang): string {
  return enumerer(
    DUREES.filter((d) => d.mois >= GARANTIE_DUREE_MIN).map((d) => String(d.mois)),
    lang,
  );
}

/** La plus longue durée offerte (24 aujourd'hui) : la seule payée en un seul versement, à la
 * souscription (spec §6.B). Dérivée de `DUREES` plutôt que réécrite en dur — voir `dureesGarantie`
 * pour le même principe appliqué à la garantie. */
export function dureeMaxMois(): number {
  return Math.max(...DUREES.map((d) => d.mois));
}

/**
 * « 1 à 12 » / « 1 to 12 » — l'intervalle des durées RECONDUITES automatiquement, c'est-à-dire
 * toutes sauf `dureeMaxMois()` (payée en une fois et jamais reconduite, spec §6.B). Dérivé de
 * `DUREES` plutôt que réécrit en toutes lettres dans les Conditions ou la FAQ.
 *
 * « Récurrent » qualifie la RECONDUCTION, pas un étalement : chacune de ces durées est prélevée en
 * UNE fois au début de sa période. Côté application, `termPlanBody`
 * (`src/lib/billing/paypal-bodies.ts`) pose `interval_count: months` et le prix TOTAL du terme en
 * `fixed_price` — un engagement de 12 mois Personnel est un prélèvement unique tous les 12 mois,
 * pas douze mensualités.
 */
export function dureesRecurrentes(lang: Lang): string {
  const max = dureeMaxMois();
  const recurrentes = DUREES.filter((d) => d.mois !== max).map((d) => d.mois);
  const separateur = lang === "en" ? "to" : "à";
  return `${Math.min(...recurrentes)} ${separateur} ${Math.max(...recurrentes)}`;
}

/**
 * Grille des types de tâches — ce que fait chaque moteur, et l'unité qu'il consomme quand ce n'est
 * pas la tâche.
 *
 * Le modèle « crédits » (prix par tâche) a disparu le jour de la bascule vers les forfaits : cette
 * grille ne porte plus aucun montant. Elle reste la source unique de ce que fait chaque moteur —
 * `libelleDe`, `uniteDe`, `estALaPiece` et `uniteExceptionDe` en dépendent, et plusieurs pages
 * produit (/fonctions, /mines, /calcul, /pme, …) l'utilisent pour lister leurs moteurs.
 *
 * Les types listés ici doivent refléter les modes réellement offerts par l'application. Aucune
 * surface de la vitrine n'affiche leur nombre : ce décompte change avec le produit et un chiffre
 * figé devient faux sans prévenir.
 *
 * **Unité de débit.** La tâche est l'unité par défaut, consommée dans l'enveloppe du forfait. Deux
 * exceptions seulement, et elles sont portées par les champs ci-dessous plutôt que par la copie,
 * parce que c'est un fait de facturation et non une tournure de page :
 *
 * - `unite` — la ligne entière se compte à la pièce. Deux cas : le traitement d'images, compté par
 *   image, et la source de données API, comptée par appel.
 * - `uniteException` — la ligne reste à la tâche, sauf une opération. Deux cas : le publipostage,
 *   compté par document généré — écrire « par document » sec sur Documents serait faux pour la
 *   conversion, l'OCR, la fusion, le classement, la traduction et l'indexation — et le rendu 3D en
 *   séquence d'animation, compté par frame.
 *
 * La génération d'images n'en fait pas partie : une tâche y produit une image, donc la tâche et la
 * pièce coïncident.
 *
 * `type` est un identifiant interne stable, jamais affiché — c'est lui que lisent `modes.ts`
 * (couleurs) et le typage `TypeTache`. Le texte montré au visiteur vit dans `libelle`, par langue.
 */
export const GRILLE = [
  { type: "IA", libelle: { fr: "IA", en: "AI" } },
  {
    type: "Documents",
    libelle: { fr: "Documents", en: "Documents" },
    uniteException: {
      fr: "publipostage : par document",
      en: "mail merge: per document",
    },
  },
  {
    type: "Données",
    libelle: { fr: "Données", en: "Data" },
  },
  { type: "Média", libelle: { fr: "Média", en: "Media" } },
  {
    type: "Scraping",
    libelle: { fr: "Extraction web", en: "Scraping" },
  },
  {
    type: "Calcul GPU",
    libelle: { fr: "Calcul GPU", en: "GPU Compute" },
  },
  {
    type: "Rendu 3D",
    libelle: { fr: "Rendu 3D", en: "3D Rendering" },
    uniteException: {
      fr: "séquence d’animation : par frame",
      en: "animation sequence: per frame",
    },
  },
  {
    type: "Images",
    libelle: { fr: "Images", en: "Images" },
    unite: { fr: "image", en: "image" },
  },
  {
    type: "Génération d'images",
    // Apostrophe typographique dans le libellé affiché ; l'identifiant `type`,
    // lui, garde l'apostrophe droite — il n'est jamais montré.
    libelle: { fr: "Génération d’images", en: "Image Generation" },
  },
  {
    type: "Impression 3D",
    libelle: { fr: "Impression 3D", en: "3D Printing" },
  },
  {
    type: "Simulation",
    libelle: { fr: "Simulation", en: "Simulation" },
  },
  {
    type: "Géomatique",
    libelle: { fr: "Géomatique et SIG", en: "Geomatics and GIS" },
  },
  {
    type: "Mémo vocal",
    libelle: { fr: "Mémo vocal", en: "Voice Memo" },
  },
  {
    type: "Source de données",
    libelle: { fr: "Source de données", en: "Data Source" },
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
