import { agentDeCode } from "./fiches/agent-de-code";
import { bureauAssistance } from "./fiches/bureau-assistance";
import { erp } from "./fiches/erp";
import { forages3d } from "./fiches/forages-3d";
import { freecad } from "./fiches/freecad";
import { gimp } from "./fiches/gimp";
import { writer } from "./fiches/writer";
import type { FicheApplication } from "./types";

/**
 * Le catalogue des applications — un fichier par fiche dans `fiches/`, et la
 * liste ci-dessous qui les enregistre. Importées statiquement, comme les
 * traductions du blogue : les pages sont générées au build, sans lecture de
 * dossier à l'exécution (`output: "standalone"`).
 *
 * Chaque application du produit (`GET /api/v1/apps/catalog`) doit figurer dans
 * exactement une de ces trois listes — `lib/applications.test.ts` le vérifie
 * contre la production, dans les deux sens :
 *
 * - `FICHES` : elle a sa page ;
 * - `A_ECRIRE` : elle aura sa page, pas encore rédigée ;
 * - `SANS_FICHE` : elle n'en aura pas — un utilitaire du système, rien à vendre.
 *
 * Une application ajoutée au produit fait donc échouer la CI de la vitrine tant
 * qu'on n'a pas décidé de son sort. C'est voulu.
 */
export const FICHES: readonly FicheApplication[] = [
  writer,
  erp,
  bureauAssistance,
  agentDeCode,
  forages3d,
  gimp,
  freecad,
];

/** Les applications qui auront une fiche. Une fiche rédigée sort d'ici pour entrer dans `FICHES`. */
export const A_ECRIRE: readonly string[] = [
  // Bureautique
  "calc",
  "impress",
  "desktop-libreoffice",
  "desktop-onlyoffice",
  "desktop-calligra",
  "desktop-wps-office", // licence à vérifier avant publication (voir le plan)
  // Communication
  "mail",
  "messagerie",
  "address-book",
  // Gestion et productivité
  "agenda",
  "plans",
  "workflows",
  "rapports",
  "schedule",
  "desktop-calibre",
  "desktop-zotero",
  "desktop-obsidian",
  // Image et photo
  "image-editor-advanced",
  "desktop-krita",
  "desktop-darktable",
  "desktop-rawtherapee",
  "desktop-inkscape",
  "desktop-digikam",
  // Audio et vidéo
  "video-editor",
  "audio-editor",
  "blender-editor",
  "desktop-kdenlive",
  "desktop-openshot",
  "desktop-shotcut",
  "desktop-audacity",
  "desktop-ardour",
  // Développement et CAO
  "desktop-kicad",
  "desktop-vscodium",
  "desktop-github-desktop",
  "desktop-vscode", // licence à vérifier avant publication
  "desktop-pycharm", // licence à vérifier avant publication
  "desktop-intellij-idea", // licence à vérifier avant publication
  "terminal",
  "api-sources",
  "marketplace",
  // Géosciences et mines
  "open-data",
  "mining-claims",
  "exploration-report",
  // Votre bureau
  "files",
  "assistant",
  "teams",
  "browser",
  "persistent-desktop",
  "hosting",
  // Jeux — une seule fiche pour les six, plus l'arcade et le studio
  "games-wesnoth",
  "games-freeciv",
  "games-chess",
  "games-frozen-bubble",
  "games-supertux",
  "games-steel-sky",
  "arcades",
  "game-studio",
];

/** Les applications sans fiche : des utilitaires du bureau, qui ne se vendent pas seuls. */
export const SANS_FICHE: readonly string[] = [
  "settings",
  "notification-center",
  "download-manager",
  "calculator",
  "documentation",
  "monitor",
  // « Nouveau plan » est une porte d'entrée de Plans, pas une application distincte : la fiche Plans le couvre.
  "new-plan",
];
