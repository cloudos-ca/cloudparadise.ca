# Plan — catalogue des applications sur la vitrine

Rédigé le 2026-09-25. Statut : **implémenté** (étapes 1 à 3, lot pilote complet) ; restent la
relecture des huit fiches et les vagues de contenu.

## Où on en est (2026-09-25)

Fait :

- **Produit** : `GET /api/v1/apps/catalog`, publique (`cloudparadise_hpc`, commit `5920445c`), et le
  commentaire de `containers/catalog/route.ts` mis à jour.
- **Données et test anti-divergence** : `content/applications/`, `lib/applications.test.ts`.
- **Pages** : index `/applications` et `/en/apps` (groupes et barre d'ancres, à la place du filtre
  `?groupe=` : voir `IndexApplications`), fiches générées au build, JSON-LD, fil d'Ariane, sitemap.
- **Une image Open Graph par fiche** (`[slug]/opengraph-image.tsx`) : le `<h1>` et l'accroche dans le
  gabarit du site. Sans la capture : satori ne lit pas le WebP (voir `ogFiche.ts`).
- **Maillage** : « À lire sur le blogue » sur les fiches, et « Les applications de cet article » sous
  les articles du blogue (`fichesDeLArticle`), dans les deux langues.
- **Suivi** : événement GA4 `cta_catalogue` (paramètres `fiche`, `langue`, `destination`) au clic sur
  les boutons de fin de page du catalogue, seulement après consentement.
- **Navigation** : « Applications » / « Apps » dans la barre (neuf entrées, seuils `bar` et `horloge`
  relevés à 1210 et 1260px — **estimés** d'après les chasses de Manrope, à remesurer dans un
  navigateur), dans le pied de page, et `FamillesApps` qui mène au groupe de l'index quand il a une
  fiche.
- **Lot pilote : huit fiches**, Bac à sable compris.
- **Captures automatisées** : `npm run captures` (`scripts/captures-applications.ts`, Playwright) crée
  un compte jetable au forfait Entreprise par `scripts/compte-captures.ts` du produit, capture chaque
  fiche de sa table `SCENARIOS` et supprime le compte à la fin. Éprouvé sur dev le 2026-09-25 : capture
  du Bac à sable (Calc et un terminal sur `~/Stockage`), et GIMP refait à l'identique de la capture
  manuelle. Une nouvelle fiche = une ligne dans `SCENARIOS` (mode d'emploi en tête du script).

Reste :

- **Relecture** des huit fiches (chacune note en tête ce qui reste à vérifier) avant la PR `dev` →
  `main` — qui emporte aussi le correctif `CarteArticle`. Le Bac à sable suppose en production le
  correctif `b3e8c304` du produit (le forfait Entreprise ouvre le Bac à sable).
- **Vagues de contenu** : les ~50 applications de `A_ECRIRE`.
- Les scénarios de capture des fiches des vagues suivantes (`SCENARIOS`, avec leurs données fictives
  dans `semerDonnees` de `compte-captures.ts` si besoin).

Objectif : un catalogue public des applications de Cloud OS sur cloudos.ca, dans l'esprit de la
Logithèque du produit (grille filtrable par catégorie), où **chaque application a sa propre page
promotionnelle**, en français et en anglais.

Le catalogue est **purement informatif**. Il a deux rôles :

1. **Alimenter le site en mots-clés et en pages de contenu.** Comme le blogue, qu'il assiste : chaque
   fiche vise des recherches précises (« GIMP en ligne », « FreeCAD dans le navigateur », « logiciel
   de billetterie PME ») et renvoie vers les articles qui en parlent.
2. **Vendre à notre audience les applications contenues dans l'app**, pour augmenter le taux de
   conversion : montrer ce que le forfait donne concrètement, application par application.

## Décisions prises

| Question | Décision |
| --- | --- |
| Périmètre | **Tout** : les apps maison et les 25 logiciels de bureau diffusés. Le forfait requis est affiché sur chaque page. |
| Source de vérité | **Copie + test anti-divergence**, sur le modèle des prix (`lib/offre.test.ts` ↔ `/api/v1/pricing`). |
| Rédaction | **Claude rédige, Maxime relit.** Un lot pilote, puis des vagues. |
| Logos tiers | **Aucun logo.** Des captures du logiciel qui tourne dans Cloud OS, avec son nom et son éditeur cités. |
| Liens vers l'app | **Aucun.** Une fiche ne mène jamais dans l'application (pas de « Ouvrir dans Cloud OS », pas de lien profond vers l'app). Ses appels à l'action restent sur la vitrine : `/tarifs`, contact, fiches et articles voisins. |
| Bandeau et pied de page | Ils **gardent** leurs liens « Se connecter » et « Commencer » vers l'app sur les pages du catalogue : la règle « aucun lien vers l'app » vaut pour le contenu des fiches, pas pour la navigation commune du site. |
| Captures | Un **compte jetable**, créé pour la séance de captures et supprimé ensuite. |
| Correctif `CarteArticle` | Le correctif « Lire l'article » (commit `0a25165`, déjà sur `dev`) part en production **avec le catalogue**, dans la même PR `dev` → `main`. |

Conséquence de la première décision : la liste des logiciels offerts devient publique. Le commentaire
de `src/app/api/v1/containers/catalog/route.ts` (dépôt `cloudparadise_hpc`) dit l'inverse (« la
liste des logiciels offerts n'a pas à être publique ») ; il faudra le mettre à jour, et cette route-là
reste authentifiée (voir l'étape 1).

## Ce qui existe

**Dans le produit** (`cloudparadise_hpc`) :

- `src/components/os/app-registry.tsx` — le registre des apps (~60 entrées), avec `hidden`,
  `adminOnly`, `hostingSafe`. C'est lui que la Logithèque affiche (`visibleApps`).
- `src/lib/os/app-catalog.ts` — descriptions FR/EN et groupes du menu Démarrer (`START_GROUP_LABELS`,
  `START_MENU_GROUP_ORDER`) : bureautique, communication, géoscience, images, audio-vidéo,
  développement & CAO, utilitaires, jeux, système.
- `src/lib/marketplace/desktop-apps-catalog.ts` — les 25 logiciels de bureau (GIMP, Krita, FreeCAD,
  Kdenlive, VS Code, OnlyOffice, Zotero…) : nom, description FR/EN, documentation officielle.

**Dans la vitrine** (`cloudparadise.ca`) :

- `components/marketing/FamillesApps.tsx` — six familles d'apps, non cliquables.
- `lib/site.ts` (`PAGES`) — la liste des pages FR/EN, qui alimente le sitemap, `llms.txt`, les
  `hreflang` et la navigation.
- Le blogue (`/blogue/[slug]`, `/en/blog/[slug]`) — le modèle le plus proche pour des pages
  générées depuis des données, FR/EN jumelées.

**Forfaits** (vérifié dans `components/marketing/offre.ts`) : le forfait **Personnel** comprend « le
bureau et ses applications » — donc les 25 logiciels de bureau. Seuls le **Bac à sable** (bureau
persistant), **Hébergement Web** et la **création d'équipe** sont réservés à **Entreprise**. Le
drapeau `inclus.desktop` désigne le Bac à sable, pas les logiciels de bureau.

## Inventaire : ce qui mérite une page

Toutes les apps visibles ne méritent pas une page promotionnelle : Paramètres, Corbeille, Centre de
notifications ou Gestionnaire de téléchargements sont des utilitaires du système. Proposition :

- **Page dédiée (~55)** : les apps maison qui répondent à un besoin (Rédaction, Tableur,
  Présentation, Courriel, Messagerie, Agenda, Carnet d'adresses, ERP, Bureau d'assistance, Équipes,
  Plans, Workflows, Rapports, Planification, Agent de codage, Assistant, Données ouvertes, Titres
  miniers, Forages 3D, Rapport d'exploration, Montage vidéo, Retouche d'image, Audio, Blender,
  Navigateur, Bac à sable, Hébergement Web, Studio de jeux, Arcades, Marketplace, Sources d'API…) et
  les 25 logiciels de bureau.
- **Une page groupée** : les six jeux (Wesnoth, Freeciv, Échecs, Frozen Bubble, SuperTux, Beneath a
  Steel Sky) sur une seule page « Jeux ».
- **Pas de page** : utilitaires système et apps d'administration (`adminOnly`, `hidden`). Ils peuvent
  figurer dans l'index sans lien, ou en être absents — à trancher au lot pilote.

La liste exacte se fixe à l'étape 1, depuis la route publique du produit.

## Étapes

### 1. Produit : une route publique du catalogue (`cloudparadise_hpc`)

Nouvelle route **non authentifiée** `GET /api/v1/apps/catalog` (même esprit que `/api/v1/pricing`) :

```json
{ "apps": [ { "id": "desktop-gimp", "label": "GIMP", "group": "images", "plan": "personnel" } ] }
```

- Seulement les apps que voit un client ordinaire : `visibleApps(false)` sans la Logithèque.
- `plan` : `"entreprise"` pour le Bac à sable, Hébergement Web et la création d'équipe ; `"personnel"`
  sinon. Cette correspondance doit vivre **dans le produit**, à côté de ce qui applique vraiment ces
  limites. Sinon la vitrine la recopierait et elle ne serait vérifiée par rien.
- Pas de description ni de lien : la vitrine a les siens. La route ne sert qu'à dire **ce qui existe**.
- Mettre à jour le commentaire de `containers/catalog/route.ts`.

Ce travail touche l'autre dépôt ; il passe par sa propre PR `dev` → `main`.

### 2. Vitrine : les données (`content/applications/`)

Un fichier par application, importé statiquement comme les traductions du blogue (le site est en
`output: "standalone"`, voir `content/blogue/en/index.ts`) :

```ts
type FicheApplication = {
  id: string;                    // l'id du produit : "desktop-gimp", "erp"…
  slug: { fr: string; en: string };
  nom: string;                   // "GIMP", ou { fr, en } pour les apps maison
  editeur?: string;              // logiciels tiers : "The GIMP Team"
  licence?: string;              // "GPL-3.0" — pour les tiers
  groupe: GroupeId;              // les groupes du menu Démarrer
  forfait: "personnel" | "entreprise";
  accroche: { fr: string; en: string };       // une phrase, pour la carte d'index
  corps: { fr: Section[]; en: Section[] };    // argumentaire, usages, « dans Cloud OS »
  captures: { src: string; alt: { fr: string; en: string } }[];
  faq: { fr: QR[]; en: QR[] };
  voisines: string[];            // ids d'applications liées
  motsCles: { fr: string[]; en: string[] };  // l'intention de recherche visée (étape 4)
  articles: string[];            // slugs FR des articles du blogue liés (étape 4)
};
```

**Test anti-divergence** (`lib/applications.test.ts`), calqué sur `lib/offre.test.ts` :

- Il compare aux données de `/api/v1/apps/catalog` en production, **dans les deux sens** : une fiche
  sans app, ou une app promotionnable sans fiche, est un écart.
- Le `forfait` de chaque fiche doit être celui du produit.
- Seule une erreur réseau fait sauter le test, jamais un écart.
- Tests locaux : slugs uniques par langue, `voisines` qui existent, chaque fiche a FR **et** EN.

### 3. Vitrine : les pages

- **Index** `/applications` et `/en/apps` : grille de cartes, filtre par groupe (liens `?groupe=`
  plutôt qu'un état client, pour que chaque filtre soit une URL), recherche simple. Carte : capture,
  nom, accroche, badge du forfait. La carte entière est cliquable, comme `CarteArticle` après le
  correctif `0a25165`.
- **Fiche** `/applications/[slug]` et `/en/apps/[slug]` : en-tête (nom, éditeur, badge forfait),
  captures, corps, « ce que Cloud OS ajoute » (rien à installer, fichiers dans votre espace, hébergé
  au Québec), FAQ, applications voisines, articles du blogue liés, puis l'appel à l'action.
- **Appels à l'action** : jamais vers l'app. Le badge du forfait et le bouton principal mènent à
  `/tarifs` (ancre du forfait concerné) ; un second bouton mène au contact. L'essai de 14 jours sans
  carte est cité dans le texte, comme argument, pas comme lien.
- **Générées au build** (`generateStaticParams`) : tout le contenu est dans le dépôt. À l'inverse du
  blogue, aucune clé ni API à l'exécution.
- **SEO** : `alternatesBilingues` et `hreflang` par fiche, fil d'Ariane (`BreadcrumbJsonLd`), une
  image OG par fiche (`opengraph-image.tsx` avec la capture), FAQ en `FAQPage`. JSON-LD
  `SoftwareApplication` **seulement pour les apps maison** ; pour un logiciel tiers, une `WebPage` dont
  le sujet est le logiciel, sans `offers`. Il ne faut pas laisser croire qu'on vend GIMP.
- **Sitemap et `llms.txt`** : ils lisent `PAGES`. Soit on y ajoute les fiches, soit `sitemap.ts`
  concatène `PAGES` et les fiches. La seconde option évite d'enregistrer 110 URL à la main.
- **Navigation** : entrée « Applications » dans `TopBar`, et `FamillesApps` qui devient cliquable
  vers l'index filtré.

### 4. Mots-clés et maillage avec le blogue

C'est la raison d'être du catalogue ; elle se décide **avant** la rédaction de chaque fiche.

- **Une intention de recherche par fiche**, notée dans ses données (`motsCles: { fr: string[]; en:
  string[] }`, qui alimente aussi `keywords`) : le nom du logiciel + « en ligne », « dans le
  navigateur », « sans installation », « alternative à … » ; pour les apps maison, le besoin (« CRM
  PME Québec », « logiciel de billetterie »).
- **Le titre, la description et le `<h1>` suivent cette intention**, dans les limites que la vitrine
  s'impose déjà (titres de 45 à 60 caractères, commit `d170151`).
- **Maillage dans les deux sens.** Une fiche liste les articles du blogue qui parlent de son sujet
  (par exemple « OnlyOffice vs LibreOffice » depuis les fiches OnlyOffice et Rédaction ; « Premiere
  Pro vs DaVinci Resolve » depuis Kdenlive et Montage vidéo). Dans l'autre sens, `PageArticle` affiche
  les fiches liées sous l'article. La correspondance vit dans les données de la fiche (`articles:
  string[]`, des slugs FR), pas dans le HTML de BabyLoveGrowth, qu'on ne contrôle pas.
- **Les sujets du blogue.** Les fiches donnent à BabyLoveGrowth des sujets d'articles (« Retoucher des
  photos sans installer de logiciel »…) : la liste des intentions de recherche sert aussi de réserve
  de sujets.
- **Suivi.** Google Analytics est déjà en place : un événement au clic sur les appels à l'action des
  fiches (vers `/tarifs` et le contact) mesure ce que le catalogue apporte à la conversion.

### 5. Contenu : lot pilote, puis vagues

**Lot pilote (8 fiches)**, choisies pour couvrir chaque gabarit et chaque forfait :

| Fiche | Pourquoi |
| --- | --- |
| Rédaction | app maison, bureautique, la plus cherchée |
| ERP | app maison, argument PME |
| Bureau d'assistance | app maison, argument PME |
| Agent de codage | app maison, différenciant |
| Forages 3D | app maison, secteur minier |
| GIMP | logiciel tiers, image |
| FreeCAD | logiciel tiers, CAO |
| Bac à sable | forfait Entreprise |

Pour chaque fiche : corps FR rédigé, traduction EN, 2 ou 3 captures prises dans l'application réelle,
FAQ de 3 à 5 questions. Relecture par Maxime avant publication. Ensuite, vagues de ~10 fiches par
groupe.

**Règles de rédaction** (les leçons du blogue) :

- Aucun prix dans les fiches : un renvoi vers `/tarifs`. Le forfait vient de la donnée, jamais du
  texte.
- Ne rien promettre que le produit ne fait pas : chaque fonction citée est vérifiée dans le code ou
  dans l'app.
- Pour un logiciel tiers, décrire le logiciel honnêtement et dire ce que Cloud OS y ajoute. Pas de
  logo, pas de « partenaire », pas de « officiel ».

**Captures** : prises avec Playwright sur un **compte jetable** (créé pour la séance, rempli de
données fictives, supprimé ensuite), en `webp`, dans `public/applications/<id>/`. Un script
(`scripts/captures-applications.ts`) permet de refaire les captures quand l'interface change : il
crée un nouveau compte jetable à chaque séance, plutôt que de garder des identifiants. Aucune donnée
réelle de client à l'écran.

## Risques et prérequis

- **Licences des logiciels tiers.** Avant de publier leur page — et idéalement avant de les offrir —
  vérifier les conditions de **VS Code** (licence Microsoft du binaire), **WPS Office**
  (propriétaire), **PyCharm** et **IntelliJ IDEA** (JetBrains). Les logiciels libres (GPL, MPL…) ne
  posent pas cette question. Ces quatre fiches sortent du lot pilote et attendent la vérification.
- **Contenu mince.** 55 pages × 2 langues : une page qui se contente d'une phrase serait mal jugée par
  Google. D'où le corps rédigé, les captures et la FAQ — et le choix de ne pas publier d'ébauches.
- **Environnement de dev.** Les déploiements automatiques vers dev échouent actuellement : l'utilisateur
  IAM `vps-dev-waker` n'a pas `ec2:DescribeInstances` (job `wake-dev`). À régler avant de valider le lot
  pilote sur dev.
- **Maintenance.** Une app ajoutée au produit fait échouer le test anti-divergence tant qu'elle n'a pas
  sa fiche. C'est voulu, mais il faut une issue de procédure : soit une fiche, soit une liste
  d'exclusions explicite dans le test.

## Ordre de livraison proposé

1. Route publique du produit (PR `cloudparadise_hpc`).
2. Données, gabarits d'index et de fiche, test anti-divergence, sitemap — avec les 8 fiches pilotes,
   **non liées dans la navigation** tant qu'elles ne sont pas relues.
3. Relecture, puis ouverture : entrée de menu, `FamillesApps` cliquable. C'est cette PR `dev` →
   `main` qui emporte aussi le correctif `CarteArticle` (`0a25165`).
4. Vagues de contenu jusqu'à couvrir l'inventaire.

## Questions encore ouvertes

- Les utilitaires sans page : absents de l'index, ou listés sans lien ?
- Slugs FR des logiciels tiers : le nom seul (`/applications/gimp`) dans les deux langues ?
