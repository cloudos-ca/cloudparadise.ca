import { execFileSync } from "node:child_process";
import { mkdirSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { chromium, type Locator, type Page } from "playwright";
import sharp from "sharp";

/**
 * Refait les captures des fiches du catalogue (`public/applications/<fiche>/<nom>.webp`), dans
 * l'application réelle, avec un compte jetable. Voir `docs/plan-catalogue-applications.md`, « Captures ».
 *
 *   npm run captures                                — toutes les fiches de SCENARIOS
 *   npm run captures -- --seulement bac-a-sable     — une fiche (répétable, ou ids séparés par des virgules)
 *   npm run captures -- --seulement gimp --sortie /tmp/comparaison
 *                                                   — écrit ailleurs que dans public/ (comparer sans écraser)
 *   npm run captures -- --liste                     — les scénarios connus
 *
 * OÙ LE LANCER. Sur aws-dev (la machine qui porte l'environnement de dev et sa base) : le compte jetable
 * se fabrique par `scripts/compte-captures.ts` du produit, qui écrit directement dans la base de dev.
 * Il faut Chromium : `npx playwright install chromium` (et, sur une machine neuve,
 * `sudo npx playwright install-deps chromium` pour les bibliothèques système).
 *
 * LE COMPTE. Par défaut, le script le crée lui-même (`npx tsx scripts/compte-captures.ts creer` dans le
 * dépôt du produit, `CAPTURES_PRODUIT`, défaut `../cloudparadise_hpc`), garde le jeton en mémoire, et le
 * supprime à la fin — `supprimer`, dans un `finally` : même une séance qui échoue ne laisse pas de compte.
 * Si `CAPTURES_JETON` est déjà dans l'environnement, il s'en sert et ne supprime rien : c'est alors à
 * l'appelant de lancer `supprimer`. Le jeton n'est jamais écrit sur disque ni affiché.
 *
 * CE QUE FAIT UNE CAPTURE. `/dashboard?open=<app>` (le lien d'ouverture du bureau, voir
 * `src/app/dashboard/page.tsx` du produit), ferme les autres fenêtres (le bureau restaure celles du
 * passage précédent), agrandit la fenêtre, attend qu'elle soit prête (flux diffusé connecté pour les
 * logiciels de bureau et le Bac à sable), joue les actions préalables du scénario, attend que l'image
 * ne bouge plus, vérifie que le flux est toujours connecté (une page 502 est immobile, elle aussi), puis
 * capture la fenêtre seule. Fenêtre agrandie dans un écran de 1598×998 : 1582×942, le format des
 * captures du lot pilote — moins les bandes noires d'un flux KasmVNC plus petit que la fenêtre
 * (`rognerNoir`, GIMP : 1365×897). WebP dont la qualité descend jusqu'à tenir sous ~70 Ko. Un logiciel
 * de bureau qui répond « Impossible de démarrer » (démarrage plus long que la requête) est rouvert,
 * jusqu'à trois fois. En cas d'échec, l'écran du moment est gardé dans le dossier temporaire.
 * Le script affiche la largeur et la hauteur à reporter dans le champ `captures` de la fiche, avec les
 * textes alt proposés. Il ne modifie jamais les fiches.
 *
 * AJOUTER UNE FICHE = ajouter une ligne à SCENARIOS : l'id de la fiche (le dossier de `public/applications`),
 * l'id de l'app dans le registre du produit (`src/components/os/app-registry.tsx`), le titre de sa
 * fenêtre, et, au besoin, `flux` (app diffusée), `avant` (actions préalables) et `repos`. Les données
 * fictives qu'une capture montre se sèment côté produit, dans `semerDonnees` de compte-captures.ts.
 *
 * Variables : CAPTURES_URL (défaut https://dev.cloudparadise.cloud), CAPTURES_PRODUIT, CAPTURES_JETON.
 *
 * Une séance complète, sur aws-dev :
 *   cd /srv/dev/cloudparadise.ca && npm run captures -- --seulement bac-a-sable
 * puis regarder chaque image produite avant de la reporter dans sa fiche : le script juge qu'une image
 * est stable, pas qu'elle est belle. Avec un compte fourni par l'appelant :
 *   export CAPTURES_JETON=$(cd ../cloudparadise_hpc && npx tsx scripts/compte-captures.ts creer)
 *   npm run captures; (cd ../cloudparadise_hpc && npx tsx scripts/compte-captures.ts supprimer)
 */

type Bilingue = { fr: string; en: string };

type Scenario = {
  /** L'id de la fiche : dossier `public/applications/<fiche>/`. */
  fiche: string;
  /** L'id de l'app dans le registre du produit — ouvert par `/dashboard?open=<app>`. */
  app: string;
  /** Le titre de sa fenêtre (`aria-label` de la fenêtre : le libellé du registre). */
  titre: string;
  /** Nom du fichier, sans extension. */
  nom: string;
  alt: Bilingue;
  /** App diffusée dans un cadre (KasmVNC/Selkies) : le texte de l'en-tête quand le flux est prêt. */
  flux?: { pret: RegExp };
  /** Le flux à attendre est celui de la fenêtre que rend `avant` (un éditeur diffusé ouvert depuis Fichiers,
   *  voir depuisFichiers), pas celui de la fenêtre de départ. `flux.pret` sert alors à masquer la poignée
   *  Selkies et à vérifier la connexion avant la capture. */
  fluxDansAvant?: boolean;
  /** Attente propre à l'app, pour une app qui n'est pas diffusée (sinon : aucune). */
  pret?: (fenetre: Locator) => Promise<void>;
  /** Actions préalables, fenêtre ouverte, agrandie et prête. Rend une AUTRE fenêtre quand c'est elle qu'il
   *  faut capturer (un éditeur ouvert depuis Fichiers, « Nouveau plan » ouvert depuis Plans…). */
  avant?: (fenetre: Locator, page: Page) => Promise<Locator | void>;
  /** Où laisser le pointeur, en fraction de la fenêtre (défaut : hors de la fenêtre). Une app diffusée
   *  dessine son propre pointeur à la dernière position connue : autant le poser où il gêne le moins. */
  pointeur?: { x: number; y: number };
  /** Repos minimal avant la capture, en ms (défaut : 8 s diffusée, 2 s sinon). */
  repos?: number;
  /** Rogner les bandes noires à droite et en bas : un flux KasmVNC garde sa propre définition (GIMP :
   *  ~1365×815) et ne remplit pas une fenêtre agrandie. Les captures faites à la main l'étaient aussi. */
  rognerNoir?: boolean;
};

// --- Aides aux scénarios ---------------------------------------------------------------------------

/** Les touches à Maj d'un clavier US. Le flux diffusé (Selkies) transmet les touches, pas les caractères :
 *  `keyboard.type("S")` y arrive en « s ». On enfonce donc Maj soi-même. */
const AVEC_MAJ: Record<string, string> = {
  "~": "Backquote", "!": "Digit1", "@": "Digit2", "#": "Digit3", $: "Digit4", "%": "Digit5", "^": "Digit6",
  "&": "Digit7", "*": "Digit8", "(": "Digit9", ")": "Digit0", _: "Minus", "+": "Equal", "{": "BracketLeft",
  "}": "BracketRight", "|": "Backslash", ":": "Semicolon", '"': "Quote", "<": "Comma", ">": "Period", "?": "Slash",
};

/** Tape du texte dans une app diffusée (voir AVEC_MAJ). */
async function taper(page: Page, texte: string) {
  for (const c of texte) {
    const touche = /[A-Z]/.test(c) ? `Key${c}` : AVEC_MAJ[c];
    if (touche) {
      await page.keyboard.down("Shift");
      await page.keyboard.press(touche);
      await page.keyboard.up("Shift");
    } else if (c === "\n") await page.keyboard.press("Enter");
    else await page.keyboard.type(c);
    await dormir(25);
  }
}

/** Lance une commande dans le bureau XFCE diffusé, par sa boîte « Exécuter » (Alt+F2). */
async function executer(page: Page, commande: string) {
  await page.keyboard.press("Alt+F2");
  await dormir(3000);
  await taper(page, `${commande}\n`);
}

/** La couleur (r, g, b) d'un pixel de la fenêtre, lue sur une capture à l'instant. */
async function pixel(fenetre: Locator, x: number, y: number): Promise<[number, number, number]> {
  const { data } = await sharp(await fenetre.screenshot())
    .extract({ left: x, top: y, width: 1, height: 1 })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return [data[0], data[1], data[2]];
}

/** Clic à (x, y) pixels du coin haut gauche de la fenêtre capturée — les coordonnées se lisent donc
 *  directement sur une capture précédente. */
async function cliquerDansLaFenetre(fenetre: Locator, page: Page, x: number, y: number) {
  const boite = await fenetre.boundingBox();
  if (!boite) throw new Error("fenêtre invisible");
  await page.mouse.click(boite.x + x, boite.y + y);
}

/** Importe un fichier de Fichiers dans un logiciel de bureau (bouton « Importer » de la fenêtre) : le
 *  logiciel l'ouvre de lui-même quand il sait le faire. `chemin` : les dossiers à traverser d'abord. */
function importer(nomDuFichier: string, chemin: string[] = []) {
  return async (fenetre: Locator) => {
    await fenetre.getByRole("button", { name: "Importer", exact: true }).click();
    for (const dossier of chemin) {
      await fenetre.getByText(dossier, { exact: true }).first().dblclick();
      await dormir(1500);
    }
    const entree = fenetre.getByText(nomDuFichier, { exact: true }).first();
    await entree.waitFor({ timeout: 30_000 });
    await entree.click(); // un seul clic : un double-clic l'importe deux fois
    // Le dialogue se ferme de lui-même si le logiciel a ouvert le fichier ; sinon, on le ferme.
    const termine = fenetre.getByRole("button", { name: "Terminé", exact: true });
    await termine.waitFor({ state: "detached", timeout: 30_000 }).catch(async () => {
      if (await termine.count()) await termine.click();
    });
  };
}

const PRET = /Prêt/;

/** La fenêtre qui vient de s'ouvrir par-dessus les autres (la première dont le titre n'est pas dans `sauf`),
 *  agrandie. */
async function nouvelleFenetre(page: Page, sauf: string[]): Promise<Locator> {
  const fenetre = page.locator(`section[role="dialog"]${sauf.map((t) => `:not([aria-label="${t}"])`).join("")}`).first();
  await fenetre.waitFor({ timeout: 60_000 });
  const agrandir = fenetre.locator('button[aria-label="Agrandir"]');
  if (await agrandir.count()) await agrandir.first().click();
  await dormir(800);
  return fenetre;
}

/** Ouvre un fichier semé par compte-captures.ts depuis Fichiers (scénario `app: "files"`) : les dossiers de
 *  `chemin` au double-clic, puis `action` du menu contextuel du fichier (« Éditer l'audio »…) ou, sans
 *  action, un double-clic. Rend la fenêtre ouverte ; pour une app diffusée, attend d'abord son flux. */
function depuisFichiers(chemin: string[], fichier: string, options: { action?: string; pret?: RegExp } = {}) {
  return async (fichiers: Locator, page: Page) => {
    for (const dossier of chemin) {
      await fichiers.getByText(dossier, { exact: true }).first().dblclick();
      await dormir(1500);
    }
    const entree = fichiers.getByText(fichier, { exact: true }).first();
    if (options.action) {
      await entree.click({ button: "right" });
      await page.locator('[role="menu"]').getByText(options.action, { exact: true }).click();
    } else await entree.dblclick();
    const fenetre = await nouvelleFenetre(page, ["Fichiers"]);
    if (options.pret) await attendreFlux(page, fenetre, options.pret);
    return fenetre;
  };
}

/** Une réponse d'IA arrive au fil de l'eau : attend que le texte de la fenêtre ait grandi, puis qu'il
 *  cesse de changer (trois relevés identiques de suite), `limite` ms au plus. */
async function attendreTexteStable(fenetre: Locator, limite: number) {
  const depart = (await fenetre.innerText()).length;
  let avant = "";
  let calmes = 0;
  const fin = Date.now() + limite;
  while (Date.now() < fin) {
    await dormir(3000);
    const texte = await fenetre.innerText();
    calmes = texte.length > depart + 100 && texte === avant ? calmes + 1 : 0;
    if (calmes >= 3) return;
    avant = texte;
  }
}

/** Remplit les champs d'un formulaire, repérés par leur texte indicatif. */
async function remplir(fenetre: Locator, champs: [RegExp, string][]) {
  for (const [indice, valeur] of champs) await fenetre.getByPlaceholder(indice).fill(valeur);
}

// --- Les scénarios, un par fiche ---------------------------------------------------------------------


/** Clic à (x, y) lus sur une capture de la fenêtre RÉDUITE À 1100 PX DE LARGE (l'échelle des captures de
 *  mise au point des scénarios ci-dessous) : converti à la taille réelle de la fenêtre agrandie. */
async function clic(fenetre: Locator, page: Page, x: number, y: number, options: { double?: boolean } = {}) {
  const boite = await fenetre.boundingBox();
  if (!boite) throw new Error("fenêtre invisible");
  const k = boite.width / 1100;
  if (options.double) await page.mouse.dblclick(boite.x + x * k, boite.y + y * k);
  else await page.mouse.click(boite.x + x * k, boite.y + y * k);
}

/** Glisser de (x1, y1) à (x2, y2), même échelle que clic(). */
async function glisser(fenetre: Locator, page: Page, [x1, y1]: [number, number], [x2, y2]: [number, number]) {
  const boite = await fenetre.boundingBox();
  if (!boite) throw new Error("fenêtre invisible");
  const k = boite.width / 1100;
  await page.mouse.move(boite.x + x1 * k, boite.y + y1 * k);
  await page.mouse.down();
  await dormir(300);
  await page.mouse.move(boite.x + ((x1 + x2) / 2) * k, boite.y + ((y1 + y2) / 2) * k, { steps: 10 });
  await page.mouse.move(boite.x + x2 * k, boite.y + y2 * k, { steps: 10 });
  await dormir(300);
  await page.mouse.up();
}

/** Importe plusieurs fichiers d'un même dossier en une ouverture de la boîte « Importer » (elle reste ouverte
 *  tant que le logiciel n'ouvre pas le fichier de lui-même). */
function importerPlusieurs(chemin: string[], fichiers: string[]) {
  return async (fenetre: Locator) => {
    await fenetre.getByRole("button", { name: "Importer", exact: true }).click();
    for (const dossier of chemin) {
      await fenetre.getByText(dossier, { exact: true }).first().dblclick();
      await dormir(1500);
    }
    for (const fichier of fichiers) {
      await fenetre.getByText(fichier, { exact: true }).first().click();
      await dormir(3500);
    }
    const termine = fenetre.getByRole("button", { name: "Terminé", exact: true });
    if (await termine.count()) await termine.click();
    await dormir(1500);
  };
}

const alt = (fr: string, en: string): Bilingue => ({ fr, en });

/** Les apps maison. Les données qu'elles montrent (équipe, workflow, rapport, cédules, titres miniers…) sont
 *  semées par compte-captures.ts ; les scénarios n'ont plus qu'à les ouvrir. */
const MAISON: Scenario[] = [
  {
    fiche: "agenda", app: "agenda", titre: "Agenda", nom: "agenda-mois",
    alt: alt("L'Agenda de Cloud OS : le mois en cours, avec des rendez-vous et les cédules superposées", "The Cloud OS Calendar: the current month, with appointments and scheduled runs overlaid"),
  },
  {
    fiche: "arcades", app: "arcades", titre: "Arcades", nom: "arcades-recherche",
    alt: alt("Arcades dans Cloud OS : une recherche de jeux de sudoku dans le catalogue", "Arcades in Cloud OS: searching the catalogue for sudoku games"),
    avant: async (fenetre, page) => {
      await fenetre.getByPlaceholder(/Chercher un jeu/).fill("sudoku");
      await page.keyboard.press("Enter");
      await fenetre.getByText("Arcades", { exact: true }).nth(1).click(); // le champ perd le focus
      await dormir(5000);
    },
    repos: 6000,
  },
  {
    fiche: "assistant", app: "assistant", titre: "Assistant", nom: "assistant-reponse",
    alt: alt("L'Assistant de Cloud OS répond à une question sur l'utilisation du bureau", "The Cloud OS Assistant answering a question about using the desktop"),
    avant: async (fenetre) => {
      await fenetre.getByPlaceholder(/Comment puis-je utiliser/).fill("Comment partager un dossier avec mon équipe ?");
      await fenetre.getByRole("button", { name: "Envoyer" }).click();
      await attendreTexteStable(fenetre, 120_000);
    },
  },
  {
    fiche: "audio", app: "files", titre: "Fichiers", nom: "audio-selection",
    alt: alt("L'éditeur audio de Cloud OS : la forme d'onde d'une piste, un passage sélectionné", "The Cloud OS audio editor: a track's waveform with a passage selected"),
    avant: async (fichiers, page) => {
      const fenetre = await depuisFichiers(["Médias"], "ambiance-lac-vert.mp3", { action: "Éditer l'audio" })(fichiers, page);
      await dormir(12_000);
      await clic(fenetre, page, 710, 473); // « OK » de l'accueil d'AudioMass
      await dormir(1500);
      await glisser(fenetre, page, [420, 360], [700, 360]);
      return fenetre;
    },
  },
  {
    fiche: "carnet-adresses", app: "address-book", titre: "Carnet d’adresses", nom: "carnet-contact",
    alt: alt("Le Carnet d'adresses de Cloud OS : la fiche d'un contact", "The Cloud OS Address Book: a contact's details"),
    avant: async (fenetre) => { await fenetre.getByText("Émilie Gagnon").first().click(); await dormir(1500); },
  },
  {
    fiche: "courriel", app: "mail", titre: "Courriel", nom: "courriel-lier",
    alt: alt("Courriel dans Cloud OS : lier une boîte existante, sur n'importe quel serveur", "Mail in Cloud OS: linking an existing mailbox, on any server"),
    avant: async (fenetre) => { await fenetre.getByRole("button", { name: /Lier une boîte/ }).click(); await dormir(1500); },
  },
  {
    fiche: "donnees-ouvertes", app: "open-data", titre: "Données ouvertes", nom: "donnees-ouvertes-couches",
    alt: alt("Données ouvertes dans Cloud OS : les couches géoscientifiques du Québec, prêtes à importer", "Open Data in Cloud OS: Québec's geoscience layers, ready to import"),
    avant: async (fenetre) => { await fenetre.getByText("Indices — Or (Au)").first().click(); await dormir(2000); },
  },
  {
    fiche: "equipes", app: "teams", titre: "Équipes", nom: "equipes-membres",
    alt: alt("Équipes dans Cloud OS : une équipe de cinq membres et ses réglages", "Teams in Cloud OS: a five-member team and its settings"),
    avant: async (fenetre) => { await fenetre.getByText("Campagne Lac-Vert").first().click(); await dormir(2500); },
  },
  {
    fiche: "fichiers", app: "files", titre: "Fichiers", nom: "fichiers-dossiers",
    alt: alt("Fichiers dans Cloud OS : les dossiers et documents de l'espace personnel", "Files in Cloud OS: the folders and documents of the personal space"),
  },
  {
    fiche: "jeux", app: "games-wesnoth", titre: "Wesnoth", nom: "jeux-wesnoth",
    alt: alt("La Bataille pour Wesnoth dans Cloud OS : le menu principal du jeu", "The Battle for Wesnoth in Cloud OS: the game's main menu"),
    flux: { pret: PRET }, repos: 15_000,
  },
  {
    fiche: "marketplace", app: "marketplace", titre: "Marketplace", nom: "marketplace-conception",
    alt: alt("Marketplace dans Cloud OS : l'IA propose une pile de conteneurs pour un projet décrit en français", "Marketplace in Cloud OS: the AI proposes a container stack for a project described in plain language"),
    avant: async (fenetre) => {
      await fenetre.getByPlaceholder(/Décris ton projet/).fill("Je veux un site WordPress avec sa base de données.");
      await fenetre.getByRole("button", { name: "Envoyer" }).click();
      await attendreTexteStable(fenetre, 120_000);
    },
  },
  {
    fiche: "hebergement-web", app: "hosting", titre: "Hébergement", nom: "hebergement-modeles",
    alt: alt("Hébergement dans Cloud OS : créer un site à partir d'un modèle", "Hosting in Cloud OS: creating a site from a template"),
  },
  {
    fiche: "messagerie", app: "messagerie", titre: "Messagerie", nom: "messagerie-equipe",
    alt: alt("Messagerie dans Cloud OS : la conversation du groupe d'une équipe", "Messaging in Cloud OS: a team group conversation"),
    avant: async (fenetre) => { await fenetre.getByText("Campagne Lac-Vert").first().click(); await dormir(2500); },
  },
  {
    fiche: "navigateur", app: "browser", titre: "Navigateur", nom: "navigateur-site",
    alt: alt("Le Navigateur de Cloud OS : une session de navigation isolée, dans le nuage", "The Cloud OS Browser: an isolated browsing session, in the cloud"),
    flux: { pret: /Session sécurisée/ }, pointeur: { x: 0.005, y: 0.99 }, repos: 5000,
    // Notre propre site, plutôt que la page d'accueil de Bing et ses manchettes : puis la bulle de traduction
    // de Chromium (site en français, navigateur en anglais) et notre bandeau de confidentialité (« Refuser »).
    avant: async (fenetre, page) => {
      await clic(fenetre, page, 440, 300);
      await page.keyboard.press("Control+l");
      await dormir(800);
      await taper(page, "cloudos.ca\n");
      await dormir(12_000);
      await clic(fenetre, page, 1019, 128);
      await dormir(1500);
      await clic(fenetre, page, 927, 594);
      await dormir(2500);
    },
  },
  {
    fiche: "planification", app: "schedule", titre: "Cédules", nom: "cedules-calendrier",
    alt: alt("Cédules dans Cloud OS : un rapport et un workflow planifiés chaque semaine, vus au calendrier", "Schedules in Cloud OS: a report and a workflow scheduled weekly, in calendar view"),
    avant: async (fenetre) => {
      await fenetre.locator("button:has(svg.lucide-calendar), button:has(svg.lucide-calendar-days)").first().click();
      await dormir(2500);
    },
  },
  {
    fiche: "plans", app: "plans", titre: "Plans", nom: "plans-modes",
    alt: alt("Plans dans Cloud OS : choisir le mode de calcul d'une tâche lancée sur un fichier CSV", "Plans in Cloud OS: choosing the compute mode for a task run on a CSV file"),
    avant: async (plans, page) => {
      await plans.getByRole("button", { name: /Nouveau plan/ }).first().click();
      await page.locator('[role="menu"]').getByText("Assistant avancé").click();
      const fenetre = await nouvelleFenetre(page, ["Plans"]);
      await fenetre.getByPlaceholder("ex: Rapport trimestriel").fill("Synthèse de la campagne Lac-Vert");
      await fenetre.getByText("Campagne Lac-Vert", { exact: true }).first().dblclick();
      await dormir(1500);
      await fenetre.getByText("sondages-lac-vert.csv", { exact: true }).first().click();
      await fenetre.getByRole("button", { name: "Suivant" }).click();
      await dormir(3000);
      return fenetre;
    },
  },
  {
    fiche: "presentation", app: "files", titre: "Fichiers", nom: "presentation-diapos",
    alt: alt("Impress dans Cloud OS : une présentation PowerPoint ouverte depuis Fichiers", "Impress in Cloud OS: a PowerPoint presentation opened from Files"),
    avant: async (fichiers, page) => {
      const fenetre = await depuisFichiers(["Campagne Lac-Vert"], "campagne-forage-automne-2026.pptx")(fichiers, page);
      await dormir(20_000);
      await clic(fenetre, page, 773, 181); // l'accueil de Collabora
      await dormir(2000);
      await clic(fenetre, page, 97, 322); // la diapo 2, celle du graphique
      await dormir(3000);
      return fenetre;
    },
  },
  {
    fiche: "rapport-exploration", app: "exploration-report", titre: "Rapport d’exploration", nom: "rapport-exploration-formulaire",
    alt: alt("Le Rapport d'exploration de Cloud OS : les faits d'une campagne, avant la rédaction du brouillon", "The Cloud OS Exploration Report: a campaign's facts, before the draft is written"),
    avant: async (fenetre) => {
      await remplir(fenetre, [
        [/Ex\. Propriété/, "Propriété Lac-Vert"],
        [/Ex\. Or \(Au\)/, "Or (Au)"],
        [/Ex\. Exploration ABC/, "Forages Boréal inc."],
        [/Ex\. Jean Géologue/, "Émilie Gagnon, géo."],
        [/Ex\. Val-d/, "Val-d'Or, Abitibi"],
        [/Ex\. 32C04/, "32C04"],
        [/Ex\. 2026-07-27/, "2026-11-13"],
        [/Ex\. 2612345/, "2710451, 2710452, 2710453, 2710454"],
        [/Notes sur la géologie/, "Roches volcaniques mafiques de la sous-province de l'Abitibi, recoupées par un couloir de cisaillement est-ouest. Minéralisation aurifère associée à des veines de quartz-tourmaline."],
        [/Décrivez la nature/, "Dix sondages au diamant (LV-26-01 à LV-26-10), 3 710 m au total, du 2 juin au 10 août 2026. 1 240 échantillons de carottes envoyés au laboratoire."],
        [/Principaux résultats/, "Meilleur intervalle : 11,6 g/t Au sur 1,4 m (LV-26-04). Huit sondages sur dix recoupent la zone minéralisée. Analyses de LV-26-09 et LV-26-10 en cours."],
      ]);
      await fenetre.getByText("Type de rapport").click(); // le dernier champ perd le focus
    },
  },
  {
    fiche: "rapports", app: "rapports", titre: "Rapports", nom: "rapports-tableau-de-bord",
    alt: alt("Rapports dans Cloud OS : un tableau de bord construit sur un fichier CSV", "Reports in Cloud OS: a dashboard built on a CSV file"),
    avant: async (rapports, page) => {
      await rapports.getByText("Tableau de bord — campagne Lac-Vert").first().click();
      const fenetre = await nouvelleFenetre(page, ["Rapports"]);
      await dormir(6000);
      return fenetre;
    },
  },
  {
    fiche: "retouche-image", app: "files", titre: "Fichiers", nom: "retouche-image-minipaint",
    alt: alt("miniPaint dans Cloud OS : une image ouverte depuis Fichiers pour la retouche par calques", "miniPaint in Cloud OS: an image opened from Files for layer-based editing"),
    avant: depuisFichiers([], "lac-vert.png", { action: "Édition avancée" }), repos: 12_000,
  },
  {
    fiche: "sources-api", app: "api-sources", titre: "Sources de données", nom: "sources-api-fournisseurs",
    alt: alt("Sources de données dans Cloud OS : les fournisseurs d'API qu'on peut activer", "Data Sources in Cloud OS: the API providers you can enable"),
  },
  {
    // L'accueil, sans conversation : la conception demandée à l'IA n'est pas revenue dans le temps d'une séance
    // de captures (2026-09-25), et le Studio ne montre rien d'autre avant un premier échange.
    fiche: "studio-de-jeux", app: "game-studio", titre: "Studio de jeux", nom: "studio-de-jeux-accueil",
    alt: alt("Le Studio de jeux de Cloud OS : décrire le jeu qu'on veut créer", "The Cloud OS Game Studio: describing the game you want to build"),
  },
  {
    fiche: "tableur", app: "files", titre: "Fichiers", nom: "tableur-classeur",
    alt: alt("Calc dans Cloud OS : un classeur Excel avec son graphique, ouvert depuis Fichiers", "Calc in Cloud OS: an Excel workbook with its chart, opened from Files"),
    avant: async (fichiers, page) => {
      const fenetre = await depuisFichiers(["Campagne Lac-Vert"], "suivi-forages-2026.xlsx")(fichiers, page);
      await dormir(20_000);
      await clic(fenetre, page, 773, 181); // l'accueil de Collabora
      await dormir(2500);
      return fenetre;
    },
  },
  {
    fiche: "terminal", app: "terminal", titre: "Terminal", nom: "terminal-fichiers",
    alt: alt("Le Terminal de Cloud OS : les fichiers de l'espace, au clavier", "The Cloud OS Terminal: the space's files, from the keyboard"),
    avant: async (_fenetre, page) => { await page.keyboard.type("3"); await page.keyboard.press("Enter"); await dormir(3000); },
  },
  {
    fiche: "titres-miniers", app: "mining-claims", titre: "Titres miniers", nom: "titres-miniers-echeances",
    alt: alt("Titres miniers dans Cloud OS : les claims suivis et leurs échéances", "Mining Claims in Cloud OS: tracked claims and their deadlines"),
  },
  {
    fiche: "workflows", app: "workflows", titre: "Workflows", nom: "workflows-editeur",
    alt: alt("Workflows dans Cloud OS : une suite de traitements enchaînés, prête à lancer", "Workflows in Cloud OS: a chain of processing steps, ready to run"),
    avant: async (workflows, page) => {
      await workflows.getByText("Synthèse hebdomadaire de la campagne").first().click();
      const fenetre = await nouvelleFenetre(page, ["Workflows"]);
      await dormir(3000);
      // Le canevas s'ouvre de loin, et un cran de zoom coupe déjà l'Entrée : « ajuster à la vue » cadre
      // tout le graphe, au plus grand qui tienne.
      await fenetre.locator(".react-flow__controls-fitview").click();
      await dormir(1000);
      return fenetre;
    },
  },
];

/** Les logiciels de bureau (flux KasmVNC/Selkies). Beaucoup ouvrent au premier lancement un assistant ou un
 *  accueil : les coordonnées de leurs boutons ont été relevées sur des captures à 1100 px de large. Neuf
 *  logiciels du catalogue n'ont pas d'image arm64 (Audacity, digiKam, IntelliJ IDEA, Krita, ONLYOFFICE,
 *  OpenShot, PyCharm, Shotcut, Zotero) : ils ne démarrent pas sur l'infrastructure Graviton, pas de scénario. */
const BUREAU: Scenario[] = [
  {
    fiche: "calibre", app: "desktop-calibre", titre: "Calibre", nom: "calibre-bibliotheque",
    alt: alt("Calibre dans Cloud OS : une bibliothèque de romans québécois du domaine public", "Calibre in Cloud OS: a library of public-domain Québec novels"),
    flux: { pret: PRET }, rognerNoir: true, repos: 10_000,
    avant: async (fenetre, page) => {
      await dormir(10_000);
      for (let i = 0; i < 3; i++) { await clic(fenetre, page, 1003, 637); await dormir(3000); } // l'assistant d'accueil
      await dormir(5000);
      await importerPlusieurs(["Bibliothèque"], [
        "Maria Chapdelaine - Louis Hémon.epub", "Angéline de Montbrun - Laure Conan.epub", "Un amour vrai - Laure Conan.epub",
        "L'influence d'un livre - Philippe Aubert de Gaspé.epub", "Félix Poutré - Louis Fréchette.epub", "La belle que voilà - Louis Hémon.epub",
      ])(fenetre);
      await clic(fenetre, page, 30, 95); // « Add books »
      await dormir(4000);
      // Le dossier de départ de la boîte varie (/config, ou la bibliothèque) : on tape le chemin.
      await clic(fenetre, page, 548, 615); // « File name »
      await taper(page, "/config/Stockage\n");
      await dormir(2500);
      // Les six livres : DEUX clics dans la liste (le premier ne fait que lui rendre le focus, pris par le
      // champ « File name »), puis Ctrl+A. Maj+clic ne marche pas : Maj n'arrive pas avec le clic.
      await dormir(4000);
      await clic(fenetre, page, 290, 126);
      await dormir(1500);
      await clic(fenetre, page, 290, 126);
      await dormir(1500);
      await page.keyboard.press("Control+a");
      await dormir(1500);
      await clic(fenetre, page, 1062, 615); // « Open »
      await dormir(15_000);
      await clic(fenetre, page, 380, 243); // un livre, pour sa couverture et sa fiche
      await dormir(3000);
    },
  },
  {
    fiche: "calligra", app: "desktop-calligra", titre: "Calligra", nom: "calligra-suite",
    alt: alt("Calligra dans Cloud OS : les applications de la suite, prêtes à lancer", "Calligra in Cloud OS: the suite's applications, ready to launch"),
    flux: { pret: PRET }, repos: 12_000,
  },
  {
    fiche: "darktable", app: "desktop-darktable", titre: "Darktable", nom: "darktable-chambre-noire",
    alt: alt("Darktable dans Cloud OS : une photo ouverte en chambre noire", "Darktable in Cloud OS: a photo open in the darkroom"),
    flux: { pret: PRET }, repos: 10_000,
    avant: async (fenetre, page) => {
      await dormir(10_000);
      await clic(fenetre, page, 1077, 637); // « close » de l'assistant d'accueil
      await dormir(5000);
      await importer("lac-vert-automne.jpg", ["Médias", "Photos"])(fenetre);
      await clic(fenetre, page, 62, 129); // module « import »
      await dormir(2500);
      await clic(fenetre, page, 50, 159); // « add to library… »
      await dormir(4000);
      await clic(fenetre, page, 58, 326); // Stockage
      await dormir(3000);
      await clic(fenetre, page, 1053, 636); // « add to library » : une seule photo, Darktable l'ouvre en chambre noire
      await dormir(8000);
    },
  },
  {
    fiche: "github-desktop", app: "desktop-github-desktop", titre: "GitHub Desktop", nom: "github-desktop-accueil",
    alt: alt("GitHub Desktop dans Cloud OS : l'accueil, avant la connexion à un compte GitHub", "GitHub Desktop in Cloud OS: the welcome screen, before signing in to a GitHub account"),
    flux: { pret: PRET }, repos: 8000,
    avant: async (fenetre, page) => {
      await dormir(12_000);
      await clic(fenetre, page, 356, 86, { double: true }); // agrandir sa fenêtre
      await dormir(3000);
    },
  },
  {
    fiche: "inkscape", app: "desktop-inkscape", titre: "Inkscape", nom: "inkscape-vectoriel",
    alt: alt("Inkscape dans Cloud OS : une illustration vectorielle, une forme sélectionnée", "Inkscape in Cloud OS: a vector illustration with a shape selected"),
    flux: { pret: PRET }, repos: 10_000,
    avant: async (fenetre, page) => {
      await dormir(10_000);
      await importer("lac-vert.svg", ["Médias"])(fenetre);
      await dormir(15_000);
      await clic(fenetre, page, 250, 380); // une montagne : poignées de sélection et sa couleur dans « Fill »
      await dormir(3000);
    },
  },
  {
    fiche: "kdenlive", app: "desktop-kdenlive", titre: "Kdenlive", nom: "kdenlive-montage",
    alt: alt("Kdenlive dans Cloud OS : une vidéo posée sur la ligne de temps, avec sa piste son", "Kdenlive in Cloud OS: a video on the timeline, with its audio track"),
    flux: { pret: PRET }, repos: 10_000,
    avant: async (fenetre, page) => {
      await dormir(15_000);
      // L'import d'abord (Kdenlive ne l'ouvre pas pendant son assistant : le fichier attend dans ~/Stockage),
      // puis l'assistant, puis la boîte d'import de Kdenlive elle-même.
      await importer("lac-vert-panorama.mp4", ["Médias"])(fenetre);
      await dormir(5000);
      await clic(fenetre, page, 201, 623); // « Start Editing »
      await dormir(25_000);
      await clic(fenetre, page, 170, 220, { double: true }); // le chutier : « double-cliquer pour importer »
      await dormir(8000);
      await clic(fenetre, page, 600, 557);
      await taper(page, "/config/Stockage/lac-vert-panorama.mp4\n");
      await dormir(8000);
      await clic(fenetre, page, 257, 322); // adopter le profil du clip (« Switch »)
      await dormir(4000);
      await glisser(fenetre, page, [110, 180], [125, 505]); // du chutier à la piste V1
      await dormir(3000);
      await clic(fenetre, page, 218, 430); // la tête de lecture à 8 s : une image dans le moniteur
      await dormir(4000);
    },
  },
  {
    fiche: "kicad", app: "desktop-kicad", titre: "KiCad", nom: "kicad-circuit",
    alt: alt("KiCad dans Cloud OS : le circuit imprimé d'un projet de démonstration", "KiCad in Cloud OS: the circuit board of a demo project"),
    flux: { pret: PRET }, pointeur: { x: 0.1, y: 0.85 }, repos: 10_000,
    avant: async (fenetre, page) => {
      await dormir(12_000);
      for (let i = 0; i < 6; i++) { await clic(fenetre, page, 490, 494); await dormir(2500); } // l'assistant d'accueil
      await dormir(4000);
      await importerPlusieurs(["Électronique"], ["pic_programmer.kicad_pro", "pic_programmer.kicad_sch", "pic_sockets.kicad_sch", "pic_programmer.kicad_pcb"])(fenetre);
      await clic(fenetre, page, 600, 550);
      await page.keyboard.press("Control+o");
      await dormir(4000);
      await clic(fenetre, page, 148, 149, { double: true }); // Stockage
      await dormir(2500);
      await clic(fenetre, page, 1064, 637); // « Open » : le projet
      await dormir(6000);
      await clic(fenetre, page, 130, 131, { double: true }); // le .kicad_pcb dans l'arborescence
      await dormir(25_000);
    },
  },
  {
    fiche: "libreoffice", app: "desktop-libreoffice", titre: "LibreOffice", nom: "libreoffice-impress",
    alt: alt("LibreOffice Impress dans Cloud OS : une présentation PowerPoint importée depuis Fichiers", "LibreOffice Impress in Cloud OS: a PowerPoint presentation imported from Files"),
    flux: { pret: PRET }, pointeur: { x: 0.45, y: 0.9 }, repos: 10_000,
    avant: async (fenetre, page) => {
      await dormir(10_000);
      await importer("campagne-forage-automne-2026.pptx", ["Campagne Lac-Vert"])(fenetre);
      await dormir(20_000);
      await clic(fenetre, page, 778, 230); // l'accueil du premier lancement
      await dormir(2500);
      await clic(fenetre, page, 62, 270); // la diapo 2
      await dormir(4000);
    },
  },
  {
    fiche: "rawtherapee", app: "desktop-rawtherapee", titre: "RawTherapee", nom: "rawtherapee-editeur",
    alt: alt("RawTherapee dans Cloud OS : une photo dans l'éditeur, avec son histogramme", "RawTherapee in Cloud OS: a photo in the editor, with its histogram"),
    flux: { pret: PRET }, pointeur: { x: 0.88, y: 0.75 }, repos: 12_000, // le panneau droit, vide : pas d'infobulle
    avant: async (fenetre, page) => {
      await dormir(10_000);
      await importer("lac-vert-aube.jpg", ["Médias", "Photos"])(fenetre);
      await dormir(15_000);
      await clic(fenetre, page, 1062, 634); // « Close » de l'accueil
      await dormir(4000);
      await clic(fenetre, page, 420, 85); // le champ d'adresse du navigateur de fichiers
      await taper(page, "/config/Stockage\n");
      await dormir(6000);
      await clic(fenetre, page, 290, 185, { double: true }); // la vignette : l'éditeur
      await dormir(10_000);
    },
  },
  {
    fiche: "vscodium", app: "desktop-vscodium", titre: "VSCodium", nom: "vscodium-code",
    alt: alt("VSCodium dans Cloud OS : un script Python ouvert depuis Fichiers", "VSCodium in Cloud OS: a Python script opened from Files"),
    flux: { pret: PRET }, repos: 8000,
    avant: async (fenetre, page) => {
      // Importer avant que VSCodium ait fini de démarrer lance `codium <fichier>` sur une instance à
      // moitié prête : la fenêtre plante (« terminated unexpectedly », code 133). 30 s suffisent.
      await dormir(30_000);
      await importer("resume_sondages.py", ["analyse-sondages"])(fenetre);
      await dormir(15_000);
      await clic(fenetre, page, 410, 90); // « Manage » : sortir du mode restreint
      await dormir(4000);
      await clic(fenetre, page, 379, 446); // « Trust »
      await dormir(4000);
      await clic(fenetre, page, 975, 138); // fermer l'onglet de confiance
      await dormir(2500);
    },
  },
  // --- Les logiciels rebâtis en arm64 par le produit (infra/kasm-images/apps, blender-kasm), 2026-09-25.
  // IntelliJ IDEA et PyCharm n'ont pas de scénario : leur binaire Community ouvre au lancement des
  // conditions JetBrains à accepter (plugins propriétaires inclus), voir A_ECRIRE.
  {
    fiche: "audacity", app: "desktop-audacity", titre: "Audacity", nom: "audacity-piste",
    alt: alt("Audacity dans Cloud OS : une piste audio importée depuis Fichiers", "Audacity in Cloud OS: an audio track imported from Files"),
    flux: { pret: PRET }, repos: 10_000,
    avant: async (fenetre, page) => {
      await dormir(20_000);
      await clic(fenetre, page, 511, 507); // « OK » de l'accueil « What's new »
      await dormir(2000);
      await importer("ambiance-lac-vert.mp3", ["Médias"])(fenetre);
      await dormir(15_000);
      await clic(fenetre, page, 569, 397); // « No » : Audacity propose la vue musique (tempo détecté)
      await dormir(2000);
      await glisser(fenetre, page, [400, 215], [700, 215]); // un passage sélectionné, de 7 à 15 s
      await dormir(1500);
    },
  },
  {
    fiche: "krita", app: "desktop-krita", titre: "Krita", nom: "krita-illustration",
    alt: alt("Krita dans Cloud OS : une illustration ouverte depuis Fichiers", "Krita in Cloud OS: an illustration opened from Files"),
    flux: { pret: PRET }, repos: 12_000,
    avant: async (fenetre) => {
      await dormir(30_000);
      await importer("lac-vert.png")(fenetre);
      await dormir(20_000);
    },
  },
  {
    fiche: "openshot", app: "desktop-openshot", titre: "OpenShot", nom: "openshot-projet",
    alt: alt("OpenShot dans Cloud OS : une vidéo importée depuis Fichiers", "OpenShot in Cloud OS: a video imported from Files"),
    flux: { pret: PRET }, repos: 10_000,
    avant: async (fenetre, page) => {
      await dormir(25_000);
      await clic(fenetre, page, 299, 637); // « Hide Tutorial » du premier lancement
      await dormir(2000);
      await importer("lac-vert-panorama.mp4", ["Médias"])(fenetre);
      await dormir(15_000);
      await clic(fenetre, page, 299, 637); // le tutoriel s'ouvre parfois APRÈS l'import : on le referme
      await dormir(3000);
      await glisser(fenetre, page, [42, 188], [112, 545]); // le clip, au tout début de la piste du haut
      await dormir(3000);
      await clic(fenetre, page, 143, 505); // la tête de lecture vers 8 s : l'aperçu n'est plus noir
      await dormir(3000);
    },
  },
  {
    fiche: "shotcut", app: "desktop-shotcut", titre: "Shotcut", nom: "shotcut-video",
    alt: alt("Shotcut dans Cloud OS : une vidéo ouverte depuis Fichiers", "Shotcut in Cloud OS: a video opened from Files"),
    flux: { pret: PRET }, repos: 10_000,
    avant: async (fenetre, page) => {
      await dormir(25_000);
      await importer("lac-vert-panorama.mp4", ["Médias"])(fenetre);
      await dormir(15_000);
      await clic(fenetre, page, 626, 373); // la tête de lecture vers 8 s : Shotcut s'ouvre sur la dernière image, noire
      await dormir(3000);
    },
  },
  {
    fiche: "onlyoffice", app: "desktop-onlyoffice", titre: "ONLYOFFICE", nom: "onlyoffice-classeur",
    alt: alt("ONLYOFFICE dans Cloud OS : un classeur Excel et ses formules, importé depuis Fichiers", "ONLYOFFICE in Cloud OS: an Excel workbook and its formulas, imported from Files"),
    flux: { pret: PRET }, repos: 10_000,
    avant: async (fenetre, page) => {
      await dormir(25_000);
      await importer("suivi-forages-2026.xlsx", ["Campagne Lac-Vert"])(fenetre);
      await dormir(20_000);
      await clic(fenetre, page, 558, 243); // « Got it » de la bulle « New button: Format »
      await dormir(1500);
      // L'onglet Budget : le graphique de l'onglet Sondages (openpyxl) sort mal dans ONLYOFFICE.
      await clic(fenetre, page, 173, 643);
      await dormir(3000);
    },
  },
  {
    fiche: "digikam", app: "desktop-digikam", titre: "digiKam", nom: "digikam-collection",
    alt: alt("digiKam dans Cloud OS : une collection de photos", "digiKam in Cloud OS: a photo collection"),
    flux: { pret: PRET }, repos: 12_000,
    avant: async (fenetre, page) => {
      await dormir(30_000);
      // Les photos d'abord (la boîte « Importer » est celle de Cloud OS, l'assistant de digiKam peut attendre),
      // puis l'assistant du premier lancement, avec ~/Stockage comme dossier des albums : digiKam y trouve
      // les cinq photos et les affiche.
      await importerPlusieurs(["Médias", "Photos"], ["lac-vert-aube.jpg", "lac-vert-midi.jpg", "lac-vert-automne.jpg", "lac-vert-hiver.jpg", "lac-vert-nuit.jpg"])(fenetre);
      await clic(fenetre, page, 957, 637); // « Next » : l'accueil
      await dormir(3000);
      await clic(fenetre, page, 570, 481, { double: true }); // le chemin des albums
      await page.keyboard.press("Control+a");
      await taper(page, "/config/Stockage");
      await dormir(1000);
      for (let i = 0; i < 8; i++) { await clic(fenetre, page, 957, 637); await dormir(2500); } // « Next » … « Finish »
      await dormir(20_000);
      // digiKam propose ensuite 855 Mo de modèles (visages, étiquettes automatiques) : « Close ». La fiche ne
      // cite pas ces fonctions, justement.
      await clic(fenetre, page, 1003, 637);
      await dormir(8000);
      await clic(fenetre, page, 76, 157); // l'album « Stockage » : ses photos dans la grille
      await dormir(6000);
      for (let i = 0; i < 4; i++) { await clic(fenetre, page, 1030, 643); await dormir(700); } // « Zoom In »
      await dormir(4000);
    },
  },
  {
    fiche: "zotero", app: "desktop-zotero", titre: "Zotero", nom: "zotero-bibliotheque",
    alt: alt("Zotero dans Cloud OS : une bibliothèque de romans québécois et la notice de l'un d'eux", "Zotero in Cloud OS: a library of Québec novels and the record of one of them"),
    flux: { pret: PRET }, repos: 10_000,
    avant: async (fenetre, page) => {
      await dormir(25_000);
      await clic(fenetre, page, 1063, 136); // « Done » du bandeau « upgraded to Zotero 10 »
      await dormir(1500);
      await importer("romans-quebecois.ris", ["Bibliothèque"])(fenetre);
      await dormir(2000);
      // Le RIS arrive dans ~/Stockage ; c'est l'import de Zotero (Ctrl+Maj+I) qui le verse dans la
      // bibliothèque : « A file » (déjà coché), le chemin tapé dans la boîte GTK, puis « Next » ×2.
      await clic(fenetre, page, 600, 400);
      await page.keyboard.press("Control+Shift+i");
      await dormir(4000);
      await clic(fenetre, page, 1048, 623);
      await dormir(4000);
      await clic(fenetre, page, 600, 300);
      await taper(page, "/config/Stockage/romans-quebecois.ris\n");
      await dormir(4000);
      await clic(fenetre, page, 1048, 623);
      await dormir(6000);
      await clic(fenetre, page, 1048, 623);
      await dormir(4000);
      await clic(fenetre, page, 1086, 135); // le bandeau jaune « Back up your library »
      await dormir(1500);
      await clic(fenetre, page, 300, 245); // Maria Chapdelaine : sa notice dans le panneau de droite
      await dormir(3000);
    },
  },
  {
    fiche: "blender", app: "files", titre: "Fichiers", nom: "blender-modele",
    alt: alt("Blender dans Cloud OS : un modèle 3D de jumelles ouvert depuis Fichiers", "Blender in Cloud OS: a 3D model of binoculars opened from Files"),
    // La fenêtre de l'éditeur Blender ne dit pas « Prêt » : son en-tête, une fois la session lancée, invite à
    // enregistrer (« Enregistre dans Blender (Ctrl+S)… »).
    flux: { pret: /Enregistre dans Blender/ }, fluxDansAvant: true, rognerNoir: true, repos: 20_000,
    // Un démarrage à froid peut dépasser le délai de la requête (« Impossible de démarrer la session
    // Blender ») ; le suivant part de la réserve chaude en quelques secondes. Trois essais.
    avant: async (fichiers, page) => {
      for (let essai = 1; ; essai++) {
        try {
          return await depuisFichiers([], "jumelles.blend", { action: "Éditer dans Blender", pret: /Enregistre dans Blender/ })(fichiers, page);
        } catch (err) {
          if (essai >= 3) throw err;
          console.log(`    ${(err as Error).message} — nouvel essai dans 30 s (${essai}/3)`);
          await page.locator('section[role="dialog"]:not([aria-label="Fichiers"]) button[aria-label="Fermer"]').first().click().catch(() => {});
          await dormir(30_000);
        }
      }
    },
  },
];

export const SCENARIOS: readonly Scenario[] = [
  {
    fiche: "bac-a-sable",
    app: "persistent-desktop",
    titre: "Bac à sable",
    nom: "bac-a-sable-bureau",
    alt: {
      fr: "Le Bac à sable dans Cloud OS : un bureau Linux avec LibreOffice Calc et un terminal ouverts sur le dossier Stockage",
      en: "The Sandbox in Cloud OS: a Linux desktop with LibreOffice Calc and a terminal open on the Stockage folder",
    },
    flux: { pret: /configuration conservée/ },
    // Le budget du dossier « Bureau persistant » de Fichiers (semé par compte-captures.ts), retrouvé dans
    // ~/Stockage : ouvert dans Calc, et listé dans un terminal posé dans le coin des cellules vides.
    // Une seule commande lance les deux : le terminal arrive 45 s après Calc, par-dessus, une fois les
    // deux dialogues du premier lancement de LibreOffice passés au clavier.
    avant: async (fenetre, page) => {
      await cliquerDansLaFenetre(fenetre, page, 790, 500); // le focus au bureau (vide)
      await executer(
        page,
        "sh -c \"libreoffice --calc /config/Stockage/budget-2026.csv & sleep 45; " +
          "xfce4-terminal --geometry 76x13+830+500 --working-directory /config/Stockage -x sh -c 'ls -l; exec bash'\"",
      );
      await dormir(22_000);
      await page.keyboard.press("Enter"); // import du CSV, réglages par défaut
      await dormir(6000);
      await page.keyboard.press("Escape"); // accueil du premier lancement de LibreOffice
      await dormir(2000);
      await page.keyboard.press("Alt+F10"); // Calc en fenêtre : le bureau reste visible autour
      await dormir(20_000); // le terminal
    },
    pointeur: { x: 0.012, y: 0.985 },
    repos: 5000,
  },
  {
    fiche: "gimp",
    app: "desktop-gimp",
    titre: "GIMP",
    nom: "gimp-retouche",
    alt: {
      fr: "GIMP ouvert dans Cloud OS sur une illustration de paysage importée depuis Fichiers",
      en: "GIMP open in Cloud OS on a landscape illustration imported from Files",
    },
    flux: { pret: PRET },
    avant: async (fenetre, page) => {
      // À chaque session neuve, GIMP ouvre son accueil « Welcome to GIMP » par-dessus l'image, une fois
      // celle-ci chargée (Échap ne le ferme pas : il change d'onglet). Son bouton « Close » est à
      // (652, 720) de la fenêtre agrandie.
      await importer("lac-vert.png")(fenetre);
      await attendreImmobile(fenetre, 8000);
      // Le bouton est gris neutre ; à sa place sans accueil, il y a le lac de l'image (bleu) : on ne
      // clique que sur du gris, pour ne pas peindre un point dans l'image.
      const [r, g, b] = await pixel(fenetre, 640, 720);
      if (Math.max(r, g, b) - Math.min(r, g, b) < 12 && Math.max(r, g, b) < 110) {
        await cliquerDansLaFenetre(fenetre, page, 652, 720);
        await dormir(1500);
      }
    },
    rognerNoir: true,
    repos: 12_000,
  },
  ...MAISON,
  ...BUREAU,
];

// ---------------------------------------------------------------------------------------------------

const RACINE = path.resolve(__dirname, "..");
const BASE = (process.env.CAPTURES_URL || "https://dev.cloudparadise.cloud").replace(/\/$/, "");
const PRODUIT = path.resolve(RACINE, process.env.CAPTURES_PRODUIT || "../cloudparadise_hpc");
/** Écran du navigateur : la fenêtre agrandie (8 px de marge, 48 px de barre des tâches) y fait 1582×942. */
const ECRAN = { width: 1598, height: 998 };
const POIDS_VISE = 70 * 1024;
/** Ce que la fenêtre d'une app diffusée affiche tant que son chargement n'est pas fini (KasmLoading). */
const CHARGEMENT = /Ouverture de |Démarrage du conteneur/;
const ERREUR_FENETRE = /Démarrage annulé|Impossible de démarrer|introuvable|n'est pas configuré|Aucun abonnement/;

const dormir = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Le produit a refusé de démarrer l'app (« Impossible de démarrer… ») : ça se retente. */
class DemarrageRefuse extends Error {}

function lireOptions(argv: string[]) {
  const seulement: string[] = [];
  let sortie = path.join(RACINE, "public", "applications");
  let liste = false;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--seulement") seulement.push(...(argv[++i] ?? "").split(",").filter(Boolean));
    else if (a === "--sortie") sortie = path.resolve(argv[++i] ?? "");
    else if (a === "--liste") liste = true;
    else throw new Error(`Option inconnue : ${a}`);
  }
  return { seulement, sortie, liste };
}

/** Lance une commande de compte-captures.ts dans le dépôt du produit ; stdout seulement est rendu. */
function compteCaptures(commande: "creer" | "supprimer"): string {
  return execFileSync("npx", ["tsx", "scripts/compte-captures.ts", commande], {
    cwd: PRODUIT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
  }).trim();
}

/** Ferme toutes les fenêtres sauf celle du scénario (le bureau restaure celles d'avant au chargement). */
async function fermerLesAutres(page: Page, titre: string) {
  for (let i = 0; i < 20; i++) {
    const autre = page.locator(`section[role="dialog"]:not([aria-label="${titre}"]) button[aria-label="Fermer"]`).first();
    if ((await autre.count()) === 0) return;
    await autre.evaluate((el: HTMLElement) => el.click()).catch(() => {});
    await dormir(300);
  }
}

/** Ce que le client Selkies superpose à l'image du bureau (la poignée de son panneau latéral). */
const CSS_FLUX = ".toggle-handle{display:none!important}";

async function masquerDansLeFlux(page: Page, fenetre: Locator) {
  const src = await fenetre.locator("iframe").first().getAttribute("src").catch(() => null);
  const cadre = src ? page.frames().find((f) => f.url().startsWith(src)) : undefined;
  if (!cadre) return;
  for (const f of [cadre, ...cadre.childFrames()]) await f.addStyleTag({ content: CSS_FLUX }).catch(() => {});
}

/** Le flux diffusé est-il connecté ? Un canvas (ou une vidéo) dans le cadre ou ses sous-cadres, et aucun
 *  bandeau de déconnexion — même sonde que scripts/e2e-vague4b-sessions.mjs du produit. */
async function fluxConnecte(page: Page, src: string): Promise<boolean> {
  const cadre = page.frames().find((f) => f.url().startsWith(src));
  if (!cadre) return false;
  const sondes = await Promise.all(
    [cadre, ...cadre.childFrames()].map((f) =>
      f
        .evaluate(() => ({
          canvas: document.querySelectorAll("canvas, video").length,
          erreur: /WebSocket disconnected|Attempting to reconnect|Failed to connect|Bad Gateway|Gateway Time-out/i.test(document.body?.innerText ?? ""),
        }))
        .catch(() => null),
    ),
  );
  const lues = sondes.filter((s) => s !== null);
  return lues.length > 0 && !lues.some((s) => s.erreur) && lues.some((s) => s.canvas > 0);
}

async function attendreFlux(page: Page, fenetre: Locator, pret: RegExp) {
  // Jusqu'à 10 min : l'hôte de sessions dort peut-être (page d'attente « Démarrage de l'hôte… »).
  const limite = Date.now() + 10 * 60_000;
  let vu = "";
  while (Date.now() < limite) {
    const texte = await fenetre.innerText().catch(() => "");
    if (ERREUR_FENETRE.test(texte)) {
      const ligne = texte.split("\n").find((l) => ERREUR_FENETRE.test(l)) ?? "";
      const message = `la fenêtre affiche une erreur : ${ligne}`;
      throw /Impossible de démarrer/.test(ligne) ? new DemarrageRefuse(message) : new Error(message);
    }
    const src = await fenetre.locator("iframe").first().getAttribute("src").catch(() => null);
    if (src && pret.test(texte) && !CHARGEMENT.test(texte) && (await fluxConnecte(page, src))) return;
    const etat = texte.split("\n").slice(0, 3).join(" · ");
    if (etat !== vu) {
      console.log(`    … ${etat.slice(0, 120)}`);
      vu = etat;
    }
    await dormir(1000);
  }
  throw new Error("flux pas prêt en 10 min");
}

/** Écart moyen (0-255) entre deux captures réduites en niveaux de gris. */
async function ecart(a: Buffer, b: Buffer): Promise<number> {
  const reduire = (x: Buffer) => sharp(x).resize(200, 120, { fit: "fill" }).grayscale().raw().toBuffer();
  const [ra, rb] = await Promise.all([reduire(a), reduire(b)]);
  let somme = 0;
  for (let i = 0; i < ra.length; i++) somme += Math.abs(ra[i] - rb[i]);
  return somme / ra.length;
}

/** Attend que l'image de la fenêtre se fige (deux relevés de suite presque identiques), 90 s au plus. */
async function attendreImmobile(fenetre: Locator, reposMs: number) {
  await dormir(reposMs);
  let avant = await fenetre.screenshot();
  let calmes = 0;
  const limite = Date.now() + 90_000;
  while (Date.now() < limite) {
    await dormir(1500);
    const apres = await fenetre.screenshot();
    calmes = (await ecart(avant, apres)) < 0.4 ? calmes + 1 : 0;
    if (calmes >= 2) return;
    avant = apres;
  }
  console.log("    (l'image bouge encore après 90 s : capture quand même)");
}

/** Retire les bandes noires (flux plus petit que la fenêtre) à droite et en bas, bordure comprise.
 *  L'en-tête de la fenêtre (80 px) n'entre pas dans le calcul : il occupe toute la largeur. */
async function rognerNoir(png: Buffer): Promise<Buffer> {
  const { data, info } = await sharp(png).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: l, height: h } = info;
  const HAUT = 80;
  const noir = (x: number, y: number) => {
    const i = (y * l + x) * 3;
    return Math.max(data[i], data[i + 1], data[i + 2]) < 12;
  };
  const colonneNoire = (x: number) => {
    let n = 0;
    for (let y = HAUT; y < h; y++) if (noir(x, y)) n++;
    return n >= 0.98 * (h - HAUT);
  };
  const ligneNoire = (y: number, largeur: number) => {
    let n = 0;
    for (let x = 0; x < largeur; x++) if (noir(x, y)) n++;
    return n >= 0.98 * largeur;
  };
  // On part du bord en sautant les 3 px de la bordure de la fenêtre.
  let largeur = l - 3;
  while (largeur > l / 2 && colonneNoire(largeur - 1)) largeur--;
  let hauteur = h - 3;
  while (hauteur > h / 2 && ligneNoire(hauteur - 1, largeur)) hauteur--;
  if (largeur === l - 3 && hauteur === h - 3) return png;
  return sharp(png).extract({ left: 0, top: 0, width: largeur, height: hauteur }).png().toBuffer();
}

/** PNG → WebP, qualité descendante jusqu'à passer sous POIDS_VISE (plancher 50). */
async function versWebp(png: Buffer): Promise<{ octets: Buffer; qualite: number }> {
  let qualite = 82;
  let octets = await sharp(png).webp({ quality: qualite, effort: 6 }).toBuffer();
  while (octets.length > POIDS_VISE && qualite > 50) {
    qualite -= 6;
    octets = await sharp(png).webp({ quality: qualite, effort: 6 }).toBuffer();
  }
  return { octets, qualite };
}

/** Ouvre la fenêtre du scénario, seule, agrandie et prête.
 *
 *  Un logiciel de bureau lourd (GIMP, ~4 Go) peut dépasser le délai de la requête qui le démarre : la
 *  fenêtre affiche « Impossible de démarrer » alors que son conteneur finit de démarrer. En rouvrant, le
 *  produit rend la pile déjà en marche (`launchDesktopApp`, src/lib/marketplace/stack-core.ts) : on
 *  retente donc jusqu'à trois fois. */
async function ouvrir(page: Page, s: Scenario): Promise<Locator> {
  for (let essai = 1; ; essai++) {
    await page.goto(`${BASE}/dashboard?open=${encodeURIComponent(s.app)}`, { waitUntil: "domcontentloaded", timeout: 60_000 });
    if (page.url().includes("/login")) throw new Error("renvoyé vers /login : la session n'a pas été acceptée");
    const fenetre = page.locator(`section[role="dialog"][aria-label="${s.titre}"]`).first();
    await fenetre.waitFor({ timeout: 60_000 });
    await fermerLesAutres(page, s.titre);

    const agrandir = fenetre.locator('button[aria-label="Agrandir"]');
    if (await agrandir.count()) await agrandir.first().click();
    await dormir(600);

    try {
      if (s.flux && !s.fluxDansAvant) await attendreFlux(page, fenetre, s.flux.pret);
      if (s.pret) await s.pret(fenetre);
      return fenetre;
    } catch (err) {
      if (!(err instanceof DemarrageRefuse) || essai >= 3) throw err;
      console.log(`    ${err.message} — nouvel essai dans 20 s (${essai}/3)`);
      await fenetre.locator('button[aria-label="Fermer"]').first().click().catch(() => {});
      await dormir(20_000);
    }
  }
}

async function capturer(page: Page, s: Scenario, sortie: string) {
  const depart = await ouvrir(page, s);
  const fenetre = (s.avant && (await s.avant(depart, page))) || depart;

  // Rien de passager sur l'image : pas de notification (sonner), pas de poignée de panneau Selkies, et
  // le pointeur là où le scénario le veut (hors de la fenêtre par défaut).
  await page.addStyleTag({ content: "[data-sonner-toaster]{display:none!important}" });
  if (s.flux) await masquerDansLeFlux(page, fenetre);
  const boite = await fenetre.boundingBox();
  if (s.pointeur && boite) await page.mouse.move(boite.x + boite.width * s.pointeur.x, boite.y + boite.height * s.pointeur.y, { steps: 8 });
  else await page.mouse.move(2, 2);
  await attendreImmobile(fenetre, s.repos ?? (s.flux ? 8_000 : 2_000));

  // Une image figée n'est pas forcément la bonne : une page d'erreur du mandataire (502) l'est aussi.
  if (s.flux) {
    const src = await fenetre.locator("iframe").first().getAttribute("src").catch(() => null);
    if (!src || !(await fluxConnecte(page, src))) throw new Error("le flux diffusé s'est déconnecté avant la capture");
  }

  const brut = await fenetre.screenshot();
  const png = s.rognerNoir ? await rognerNoir(brut) : brut;
  const { width, height } = await sharp(png).metadata();
  const { octets, qualite } = await versWebp(png);
  const dossier = path.join(sortie, s.fiche);
  mkdirSync(dossier, { recursive: true });
  const fichier = path.join(dossier, `${s.nom}.webp`);
  writeFileSync(fichier, octets);

  const affiche = fichier.startsWith(RACINE) ? path.relative(RACINE, fichier) : fichier;
  console.log(`  ✓ ${affiche} — ${width}×${height}, ${Math.round(statSync(fichier).size / 1024)} Ko (qualité ${qualite})`);
  console.log("    À reporter dans la fiche :");
  console.log(
    [
      "    {",
      `      src: "/applications/${s.fiche}/${s.nom}.webp",`,
      `      largeur: ${width},`,
      `      hauteur: ${height},`,
      "      alt: {",
      `        fr: ${JSON.stringify(s.alt.fr)},`,
      `        en: ${JSON.stringify(s.alt.en)},`,
      "      },",
      "    },",
    ].join("\n"),
  );

  // Fermer la fenêtre arrête ce qu'elle a démarré (logiciel de bureau, Bac à sable) ; celle du départ aussi,
  // quand le scénario en a ouvert une autre.
  for (const f of fenetre === depart ? [fenetre] : [fenetre, depart]) {
    await f.locator('button[aria-label="Fermer"]').first().click().catch(() => {});
  }
  await dormir(1500);
}

async function main(): Promise<number> {
  const { seulement, sortie, liste } = lireOptions(process.argv.slice(2));
  if (liste) {
    for (const s of SCENARIOS) console.log(`${s.fiche.padEnd(22)} ${s.app.padEnd(22)} ${s.nom}.webp`);
    return 0;
  }
  const inconnues = seulement.filter((id) => !SCENARIOS.some((s) => s.fiche === id));
  if (inconnues.length) throw new Error(`Pas de scénario pour : ${inconnues.join(", ")} (voir --liste)`);
  const aFaire = seulement.length ? SCENARIOS.filter((s) => seulement.includes(s.fiche)) : SCENARIOS;

  const jetonFourni = process.env.CAPTURES_JETON;
  let jeton = jetonFourni ?? "";
  let echecs = 0;
  try {
    if (!jeton) {
      console.log(`Compte jetable : création (${PRODUIT})`);
      jeton = compteCaptures("creer");
    }
    if (!/^[0-9a-f]{64}$/.test(jeton)) throw new Error("jeton de session illisible");

    const navigateur = await chromium.launch({ args: ["--no-sandbox", "--disable-dev-shm-usage"] });
    try {
      const contexte = await navigateur.newContext({ viewport: ECRAN, locale: "fr-CA", timezoneId: "America/Toronto" });
      await contexte.addCookies([
        { name: "session", value: jeton, domain: new URL(BASE).hostname, path: "/", httpOnly: true, secure: BASE.startsWith("https"), sameSite: "Lax" },
        { name: "NEXT_LOCALE", value: "fr", domain: new URL(BASE).hostname, path: "/", sameSite: "Lax" },
      ]);
      const page = await contexte.newPage();
      for (const s of aFaire) {
        console.log(`• ${s.fiche} (${s.app})`);
        try {
          await capturer(page, s, sortie);
        } catch (err) {
          echecs++;
          console.error(`  ✗ ${s.fiche} : ${(err as Error).message}`);
          // Hors de public/ : une trace d'échec n'a rien à faire dans le site.
          const trace = path.join(tmpdir(), `captures-${s.fiche}-echec.png`);
          await page.screenshot({ path: trace }).then(() => console.error(`    écran au moment de l'échec : ${trace}`)).catch(() => {});
        }
      }
    } finally {
      await navigateur.close();
    }
  } finally {
    if (!jetonFourni) {
      console.log("Compte jetable : suppression");
      try {
        compteCaptures("supprimer");
      } catch (err) {
        echecs++;
        console.error(`La suppression du compte jetable a échoué : ${(err as Error).message}`);
      }
    }
  }
  return echecs ? 1 : 0;
}

main().then(
  (code) => process.exit(code),
  (err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  },
);
