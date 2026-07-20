/**
 * Fonds du hero + extraction de teintes.
 *
 * Deux familles de fonds :
 *  - dégradés (`sky`/`acc`/`soft` fournis) — set de démo, valeurs de la charte ;
 *  - photos (`image`) — les teintes sont extraites à l'exécution via node-vibrant.
 *
 * Le halo de marque (#edbe54) est inclus dans le fichier logo et n'est jamais
 * recoloré ici : aucun token ne le pilote.
 */

/**
 * Deux accents, deux rôles opposés.
 *
 * `acc` sert de SURFACE : fond de bouton, remplissage de progression. Il doit
 * donc être assez sombre pour que du texte blanc reste lisible dessus.
 * `accText` sert de TEXTE sur le fond sombre : eyebrows, liens, icônes. Il doit
 * donc être assez clair pour ressortir.
 *
 * Un seul token ne peut pas tenir les deux — c'était le cas, et les deux rôles
 * échouaient au contraste selon le thème. Chaque valeur ci-dessous atteint au
 * moins 4,5:1 dans son rôle.
 */

/** Accent vif de la charte — fond de bouton, progression. */
export const DEFAULT_ACC = "#2d66ae";
/** Même accent, éclairci pour rester lisible en texte sur le fond. */
export const DEFAULT_ACC_TEXT = "#6a92c5";
/** Accent clair de la charte — 2e ligne du titre, puces, badge, avatar. */
export const DEFAULT_SOFT = "#bbecee";
/** Fond par défaut — bleu nuit de la charte. */
export const DEFAULT_SKY = "linear-gradient(140deg,#151f33,#1b273d)";

export type Wallpaper = {
  id: string;
  /** Libellé court affiché sous la puce. */
  label: { fr: string; en: string };
  /** Libellé complet pour les lecteurs d'écran. */
  aria: { fr: string; en: string };
  /** Aperçu de la pastille dans le sélecteur. */
  swatch: string;
  /** Fond appliqué tel quel — dégradé, ou remplacé par la photo si `image`. */
  sky: string;
  /** Accent de surface — fond de bouton. Assez sombre pour du texte blanc. */
  acc: string;
  /** Accent de texte — eyebrows, liens, icônes. Assez clair sur le fond. */
  accText: string;
  /** Accent clair ; sur une photo, sert de repli si l'extraction échoue. */
  soft: string;
  /** Photo de fond ; déclenche l'extraction de teintes et le voile. */
  image?: string;
};

export const WALLPAPERS: readonly Wallpaper[] = [
  {
    id: "ciel",
    label: { fr: "Ciel", en: "Sky" },
    aria: { fr: "Fond ciel", en: "Sky background" },
    swatch: "linear-gradient(140deg,#2d66ae,#bbecee)",
    sky: DEFAULT_SKY,
    acc: DEFAULT_ACC,
    accText: DEFAULT_ACC_TEXT,
    soft: DEFAULT_SOFT,
  },
  {
    id: "foret",
    label: { fr: "Forêt", en: "Forest" },
    aria: { fr: "Fond forêt", en: "Forest background" },
    swatch: "linear-gradient(140deg,#2f9e6a,#a6e3c8)",
    sky: "linear-gradient(140deg,#0f2019,#143a2c)",
    acc: "#278459",
    accText: "#52ae83",
    soft: "#a6e3c8",
  },
  {
    id: "nebuleuse",
    label: { fr: "Nébuleuse", en: "Nebula" },
    aria: { fr: "Fond nébuleuse", en: "Nebula background" },
    swatch: "linear-gradient(140deg,#8a5fd0,#d6bff0)",
    sky: "linear-gradient(140deg,#191030,#2a1745)",
    acc: "#895ece",
    accText: "#9c77d7",
    soft: "#d6bff0",
  },
  {
    id: "coucher",
    label: { fr: "Coucher", en: "Sunset" },
    aria: { fr: "Fond coucher de soleil", en: "Sunset background" },
    swatch: "linear-gradient(140deg,#d9743e,#f3c79a)",
    sky: "linear-gradient(140deg,#241019,#3a1c22)",
    acc: "#b15f33",
    accText: "#d9743e",
    soft: "#f3c79a",
  },
  {
    id: "glace",
    label: { fr: "Glace", en: "Ice" },
    aria: { fr: "Fond glace", en: "Ice background" },
    swatch: "linear-gradient(140deg,#2f9bcf,#bfe9f4)",
    sky: "linear-gradient(140deg,#08222b,#0f3a45)",
    acc: "#267da7",
    accText: "#4ca9d6",
    soft: "#bfe9f4",
  },
] as const;

export const DEFAULT_WALLPAPER = WALLPAPERS[0];

/**
 * Applique un fond au conteneur du hero en écrivant les tokens CSS.
 *
 * Sur une photo, les teintes sont extraites du visuel pour que l'interface se
 * recolore ; un voile sombre est activé en parallèle pour garder le texte
 * lisible sur les images claires.
 */
export async function applyWallpaper(
  el: HTMLElement,
  wp: Wallpaper,
): Promise<void> {
  const { image } = wp;

  // Les valeurs de la fiche s'appliquent d'abord : sur une photo elles servent
  // de repli immédiat, le temps que l'extraction réponde (ou si elle échoue).
  el.style.setProperty("--acc", wp.acc);
  el.style.setProperty("--acc-text", wp.accText);
  el.style.setProperty("--soft", wp.soft);

  if (!image) {
    el.style.setProperty("--sky", wp.sky);
    el.style.setProperty("--veil", "0");
    return;
  }

  el.style.setProperty("--sky", `url(${image}) center/cover`);
  el.style.setProperty("--veil", "1");

  try {
    const { Vibrant } = await import("node-vibrant/browser");
    const palette = await Vibrant.from(image).getPalette();
    el.style.setProperty("--acc", palette.Vibrant?.hex ?? wp.acc);
    el.style.setProperty("--soft", palette.LightVibrant?.hex ?? wp.soft);
  } catch {
    // Le repli est déjà posé ci-dessus.
  }
}
