import { agenda } from "./fiches/agenda";
import { agentDeCode } from "./fiches/agent-de-code";
import { arcades } from "./fiches/arcades";
import { assistant } from "./fiches/assistant";
import { audacity } from "./fiches/audacity";
import { audio } from "./fiches/audio";
import { bacASable } from "./fiches/bac-a-sable";
import { blender } from "./fiches/blender";
import { bureauAssistance } from "./fiches/bureau-assistance";
import { calibre } from "./fiches/calibre";
import { calligra } from "./fiches/calligra";
import { carnetAdresses } from "./fiches/carnet-adresses";
import { courriel } from "./fiches/courriel";
import { darktable } from "./fiches/darktable";
import { digikam } from "./fiches/digikam";
import { donneesOuvertes } from "./fiches/donnees-ouvertes";
import { equipes } from "./fiches/equipes";
import { erp } from "./fiches/erp";
import { fichiers } from "./fiches/fichiers";
import { forages3d } from "./fiches/forages-3d";
import { freecad } from "./fiches/freecad";
import { gimp } from "./fiches/gimp";
import { githubDesktop } from "./fiches/github-desktop";
import { hebergementWeb } from "./fiches/hebergement-web";
import { inkscape } from "./fiches/inkscape";
import { intellijIdea } from "./fiches/intellij-idea";
import { jeux } from "./fiches/jeux";
import { kdenlive } from "./fiches/kdenlive";
import { kicad } from "./fiches/kicad";
import { krita } from "./fiches/krita";
import { libreoffice } from "./fiches/libreoffice";
import { marketplace } from "./fiches/marketplace";
import { messagerie } from "./fiches/messagerie";
import { navigateur } from "./fiches/navigateur";
import { onlyoffice } from "./fiches/onlyoffice";
import { openshot } from "./fiches/openshot";
import { planification } from "./fiches/planification";
import { plans } from "./fiches/plans";
import { presentation } from "./fiches/presentation";
import { pycharm } from "./fiches/pycharm";
import { rapportExploration } from "./fiches/rapport-exploration";
import { rapports } from "./fiches/rapports";
import { rawtherapee } from "./fiches/rawtherapee";
import { retoucheImage } from "./fiches/retouche-image";
import { shotcut } from "./fiches/shotcut";
import { sourcesApi } from "./fiches/sources-api";
import { studioDeJeux } from "./fiches/studio-de-jeux";
import { tableur } from "./fiches/tableur";
import { terminal } from "./fiches/terminal";
import { titresMiniers } from "./fiches/titres-miniers";
import { vscodium } from "./fiches/vscodium";
import { workflows } from "./fiches/workflows";
import { writer } from "./fiches/writer";
import { zotero } from "./fiches/zotero";
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
  agenda,
  agentDeCode,
  arcades,
  assistant,
  audacity,
  audio,
  bacASable,
  blender,
  bureauAssistance,
  calibre,
  calligra,
  carnetAdresses,
  courriel,
  darktable,
  digikam,
  donneesOuvertes,
  equipes,
  erp,
  fichiers,
  forages3d,
  freecad,
  gimp,
  githubDesktop,
  hebergementWeb,
  inkscape,
  intellijIdea,
  jeux,
  kdenlive,
  kicad,
  krita,
  libreoffice,
  marketplace,
  messagerie,
  navigateur,
  onlyoffice,
  openshot,
  planification,
  plans,
  presentation,
  pycharm,
  rapportExploration,
  rapports,
  rawtherapee,
  retoucheImage,
  shotcut,
  sourcesApi,
  studioDeJeux,
  tableur,
  terminal,
  titresMiniers,
  vscodium,
  workflows,
  writer,
  zotero,
];

/**
 * Les applications qui auront une fiche. Une fiche rédigée sort d'ici pour entrer dans `FICHES`.
 *
 * Ce qui reste ici au 2026-09-25 n'attend plus la rédaction mais une décision :
 */
export const A_ECRIRE: readonly string[] = [
  // Fiche écrite (fiches/montage-video.ts), retenue : l'éditeur vidéo est un fork de clip-js, qui
  // dépend de Remotion — licence d'entreprise payante au-delà de trois personnes.
  "video-editor",
  // Fiche écrite (fiches/ardour.ts), retenue : l'écoute du son à travers la session n'est pas
  // vérifiée, et sans son la fiche ne tient pas.
  "desktop-ardour",
  // Licences qui interdisent l'offre hébergée : pas de fiche, et à retirer du produit lui-même.
  // VS Code : binaire Microsoft (« provide the software as a stand-alone offering for others to
  // use » interdit) ; WPS Office : EULA personnelle, SaaS interdit ; Obsidian : « make any of them
  // available for access by third parties » interdit.
  "desktop-vscode",
  "desktop-wps-office",
  "desktop-obsidian",
];

/** Les applications sans fiche : des utilitaires du bureau, qui ne se vendent pas seuls. */
export const SANS_FICHE: readonly string[] = [
  "settings",
  "notification-center",
  "download-manager",
  "calculator",
  "documentation",
  "monitor",
];
