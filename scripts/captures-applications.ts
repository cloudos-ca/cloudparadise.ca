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
  /** Attente propre à l'app, pour une app qui n'est pas diffusée (sinon : aucune). */
  pret?: (fenetre: Locator) => Promise<void>;
  /** Actions préalables, fenêtre ouverte, agrandie et prête. */
  avant?: (fenetre: Locator, page: Page) => Promise<void>;
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
 *  logiciel l'ouvre de lui-même quand il sait le faire. */
function importer(nomDuFichier: string) {
  return async (fenetre: Locator) => {
    await fenetre.getByRole("button", { name: "Importer", exact: true }).click();
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

// --- Les scénarios, un par fiche ---------------------------------------------------------------------

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
      if (s.flux) await attendreFlux(page, fenetre, s.flux.pret);
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
  const fenetre = await ouvrir(page, s);
  if (s.avant) await s.avant(fenetre, page);

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

  // Fermer la fenêtre arrête ce qu'elle a démarré (logiciel de bureau, Bac à sable).
  await fenetre.locator('button[aria-label="Fermer"]').first().click().catch(() => {});
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
