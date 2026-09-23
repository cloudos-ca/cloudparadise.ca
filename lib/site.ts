/**
 * Les adresses du site — la seule définition de domaine du dépôt.
 *
 * Tout ce qui a besoin d'une URL absolue passe par ici : `metadataBase` (donc
 * canonical et Open Graph), les balises hreflang, le sitemap, `llms.txt`, le
 * JSON-LD, le fil d'Ariane, et les liens vers l'application. Avant, chacun
 * portait sa propre chaîne : le sitemap et `llms.txt` annonçaient les URL de
 * production depuis le dev, et les boutons de connexion pointaient vers un
 * domaine que le reste du site ne connaissait plus.
 *
 * Ce module ne connaît que des constantes : pas de lecture de `Request`, pas
 * d'en-tête `Host`. C'est délibéré — les pages sont générées statiquement, et
 * une origine lue à l'exécution rendrait tout le site dynamique (voir la note
 * sur `generateMetadata` dans `seo.ts`). Le pilotage se fait donc au build,
 * par `SITE_ENV`.
 */

/**
 * Vrai en production, faux partout ailleurs (cloudparadise.dev, aperçus,
 * local).
 *
 * Le défaut est « production » **volontairement**, et c'est le point délicat
 * de ce fichier : c'est un choix de sens de panne. Un environnement hors
 * production qui oublie la variable reste indexable — le problème qu'on
 * corrige. Mais l'inverse, un défaut « non-production », désindexerait le vrai
 * site au premier déploiement qui oublie la variable, et une désindexation se
 * paie en semaines de retour dans l'index. Entre les deux, on prend le risque
 * réversible. Conséquence : **c'est l'environnement de dev qui doit déclarer
 * `SITE_ENV`**, pas la production.
 *
 * Lu au build, pas à l'exécution : les métadonnées des pages statiques sont
 * calculées à la génération, donc une variable posée seulement à l'exécution
 * n'aurait aucun effet sur le HTML servi. D'où l'`ARG SITE_ENV` du Dockerfile —
 * côté Coolify, la variable doit être cochée « Build Variable ».
 *
 * Pas de `NEXT_PUBLIC_`, et pourtant la valeur **descend dans le bundle
 * client** : `TopBar` et `Hero` sont des composants clients et importent ce
 * module. Vérifié sur un build réel — Turbopack résout `process.env.SITE_ENV`
 * à la compilation pour ces modules, serveur et client rendent donc la même
 * chose et l'hydratation est propre. Ce n'est pas un problème de
 * confidentialité (le nom d'un environnement n'est pas un secret), mais c'est
 * à savoir : **rien de secret dans ce fichier**.
 *
 * Les liens vers l'application ne dépendent plus de cette variable (voir
 * `APP_URL`), donc plus rien de ce que rendent ces deux composants clients
 * n'en dépend aujourd'hui. La remarque reste valable pour la suite.
 *
 * `||` et non `??` : le Dockerfile fait `ENV SITE_ENV=${SITE_ENV}`, ce qui pose
 * une chaîne **vide** quand l'`ARG` n'est pas fourni — c'est-à-dire en
 * production. `??` ne rattrape que `null`/`undefined`, laisserait passer `""`,
 * et désindexerait donc exactement l'environnement qu'il faut protéger.
 */
export const EST_PRODUCTION =
  (process.env.SITE_ENV || "production") === "production";

/**
 * Origine de la vitrine.
 *
 * Trois adresses, trois rôles :
 *   - `cloudos.ca` — la vitrine publique (l'ancien `cloudparadise.ca`
 *     y redirige en 301, voir `next.config.ts`) ;
 *   - `app.cloudparadise.cloud` — l'application (voir `APP_URL`) ;
 *   - `cloudparadise.dev` — cet environnement-ci.
 *
 * Une extension par rôle. Le `.ca` est celui du public ; le `.cloud` reste le
 * domaine de service de l'application, ce n'est donc pas un domaine à faire
 * disparaître ; le développement a désormais le sien, `cloudparadise.dev`, et
 * n'habite plus `dev.cloudparadise.cloud`.
 *
 * La forme canonique est l'apex, sans `www` — c'est ce vers quoi la
 * redirection `www` pointe déjà (`next.config.ts`), et il faut que les deux
 * disent la même chose, sinon le canonical contredit la redirection.
 *
 * Hors production, le dev s'annonce sous son propre nom plutôt que sous celui
 * de la production. Une origine lue sur la requête courante serait plus juste
 * en théorie, mais elle n'existe pas au moment où les pages statiques sont
 * générées ; et de toute façon, hors production, aucune de ces URL n'est
 * publiée : `alternatesBilingues` et `HreflangLinks` ne rendent rien, le
 * sitemap est vide et le robots.txt interdit tout.
 */
export const SITE_URL = EST_PRODUCTION
  ? "https://cloudos.ca"
  : "https://cloudparadise.dev";

/**
 * Origine de l'application — le produit, pas la vitrine.
 *
 * Sur `.cloud`, et dans tous les environnements : l'application a une seule
 * adresse, quelle que soit la vitrine depuis laquelle on y arrive. Il n'y a
 * donc rien à faire dépendre de `SITE_ENV` ici — le dev et la production
 * envoient au même endroit, ce qui est aussi le seul comportement qu'on puisse
 * tester depuis le dev.
 *
 * Constante et non dérivée, mais centralisée quand même : la valeur était
 * recopiée dans une vingtaine de `href` à travers les deux locales, et c'est ça
 * le problème qu'on règle ici, pas l'environnement.
 */
export const APP_URL = "https://app.cloudparadise.cloud";

/** Connexion à un compte existant — barre de menu, menu mobile, pied de page. */
export const LIEN_CONNEXION = `${APP_URL}/login`;

/**
 * Création de compte — tous les CTA primaires du site.
 *
 * `src` nomme l'emplacement qui a produit le clic, pas la page : « d'où
 * viennent-ils » se répond mal quand le héros et le pied de page d'une même
 * page sont confondus. Convention `<page>-<emplacement>`, en français, la même
 * valeur dans les deux langues — l'application enregistre déjà la langue à
 * l'inscription, la dédoubler ici ne ferait que diviser les compteurs.
 *
 * **Cette donnée n'existe pas encore.** L'événement d'inscription ne retient
 * aujourd'hui que la méthode et la langue, et le paramètre est jeté. Les liens
 * sont prêts ; la capture reste à faire côté applicatif, confirmation de
 * courriel comprise. Ne pas présenter la traçabilité comme disponible avant.
 *
 * Aucun encodage n'est appliqué : les sources sont des identifiants écrits ici,
 * en minuscules sans accent ni espace. Une valeur qui aurait besoin d'être
 * encodée serait une valeur mal nommée.
 */
export function lienInscription(src: string): string {
  return `${APP_URL}/register?src=${src}`;
}

/**
 * Les pages du site, dans les deux langues — liste unique.
 *
 * Vit ici et non dans `app/sitemap.ts` parce que deux sorties la consomment :
 * le sitemap XML et `llms.txt`. Elles divergeaient (la section anglaise de
 * `llms.txt` n'en listait que six sur dix), ce qui est exactement ce qui arrive
 * à deux listes tenues à la main.
 *
 * Une page ajoutée ici sans son miroir anglais annoncerait un `hreflang` vers
 * une URL en 404 — une erreur que la Search Console remonte, et qui jette un
 * doute sur les paires valides déclarées à côté. Une page qui n'existerait que
 * dans une langue doit donc être déclarée sans `alternates`, pas ajoutée ici.
 */
export type PageSite = {
  fr: string;
  en: string;
  priority: number;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  /** Titre et résumé pour `llms.txt`. Le résumé est facultatif. */
  titre: { fr: string; en: string };
  resume?: { fr: string; en: string };
};

export const PAGES: readonly PageSite[] = [
  {
    fr: "/",
    en: "/en",
    priority: 1,
    changeFrequency: "weekly",
    titre: { fr: "Accueil", en: "Home" },
    resume: {
      fr: "présentation du service et du fonctionnement.",
      en: "what the service is and how it works.",
    },
  },
  {
    fr: "/plateforme",
    en: "/en/platform",
    priority: 0.8,
    changeFrequency: "monthly",
    titre: { fr: "Plateforme", en: "Platform" },
    resume: {
      fr: "le bureau en ligne — fenêtres, dock, fichiers, applications professionnelles, bureaux d'équipe.",
      en: "the online desktop — windows, dock, files, professional applications, team desktops.",
    },
  },
  {
    fr: "/calcul",
    en: "/en/compute",
    priority: 0.8,
    changeFrequency: "monthly",
    titre: { fr: "Calcul", en: "Compute" },
    resume: {
      fr: "les tâches lourdes — documents, données, images et vidéos, extraction web, calcul lourd, automatisation.",
      en: "heavy tasks — documents, data, images and video, web extraction, heavy compute, automation.",
    },
  },
  {
    fr: "/mines",
    en: "/en/mining",
    priority: 0.8,
    changeFrequency: "monthly",
    titre: { fr: "Mines", en: "Mining" },
    resume: {
      fr: "l'exploration minière au Québec — titres miniers, forages en trois dimensions, couches SIGÉOM, rapports.",
      en: "mineral exploration in Québec — mining claims, three-dimensional drill holes, SIGÉOM layers, reports.",
    },
  },
  {
    fr: "/pme",
    // Pas `/en/pme` : tout l'arbre anglais est en mots anglais, et `smb` est
    // un sigle de vendeur — `small-business` porte l'intention de recherche.
    en: "/en/small-business",
    priority: 0.8,
    changeFrequency: "monthly",
    titre: { fr: "PME", en: "Small business" },
    resume: {
      fr: "les PME québécoises sans département informatique — comptabilité, administration, marketing, travail d'équipe, essai gratuit.",
      en: "Canadian small businesses with no IT department — accounting, administration, marketing, teamwork, free trial.",
    },
  },
  {
    fr: "/assistance",
    // Pas `/en/assistance` : l'arbre anglais est en mots anglais, et
    // « service desk » est le terme cherché — c'est aussi le nom affiché de
    // l'application côté produit (`desk` : « Bureau d'assistance » / « Service
    // Desk »), donc le site et le produit disent le même mot.
    en: "/en/service-desk",
    priority: 0.8,
    changeFrequency: "monthly",
    titre: { fr: "Bureau d'assistance", en: "Service Desk" },
    resume: {
      fr: "la billetterie de service à la clientèle — portail client, courriel, clavardage, base de connaissances, engagements de service, rapports.",
      en: "the customer support ticketing system — customer portal, email, live chat, knowledge base, service commitments, reports.",
    },
  },
  {
    fr: "/fonctions",
    en: "/en/features",
    priority: 0.8,
    changeFrequency: "monthly",
    titre: { fr: "Fonctions", en: "Features" },
    resume: {
      fr: "la liste complète des fonctionnalités du poste de travail, par usage.",
      en: "the complete list of workstation features, by use case.",
    },
  },
  {
    fr: "/tarifs",
    en: "/en/pricing",
    priority: 0.8,
    changeFrequency: "monthly",
    titre: { fr: "Tarifs", en: "Pricing" },
    resume: {
      fr: "deux forfaits tout inclus, essai gratuit, remise selon la durée d'engagement.",
      en: "two all-inclusive plans, free trial, discount based on commitment length.",
    },
  },
  {
    fr: "/securite",
    en: "/en/security",
    priority: 0.6,
    changeFrequency: "monthly",
    titre: { fr: "Sécurité", en: "Security" },
    resume: {
      fr: "hébergement au Québec sur du matériel appartenant à l'entreprise, modèle de langage exécuté sur place, calcul déterministe, isolation des accès.",
      en: "hosted in Québec on hardware the company owns, language model run on site, deterministic compute, access isolation.",
    },
  },
  {
    // Les index seulement : les articles n'ont pas de paire FR/EN (chaque
    // texte est écrit dans une langue), ils sont annoncés par le sitemap du
    // blogue (`/blogue/sitemap.xml`), sans hreflang. Voir `lib/blogue.ts`.
    fr: "/blogue",
    en: "/en/blog",
    priority: 0.7,
    changeFrequency: "weekly",
    titre: { fr: "Blogue", en: "Blog" },
    resume: {
      fr: "articles et guides sur le travail en ligne, le calcul lourd en langage humain et l'hébergement au Québec.",
      en: "articles and guides on online work, plain-language heavy compute, and hosting in Québec.",
    },
  },
  {
    fr: "/contact",
    en: "/en/contact",
    priority: 0.5,
    changeFrequency: "yearly",
    titre: { fr: "Contact", en: "Contact" },
    resume: {
      fr: "coordonnées de l'entreprise.",
      en: "company contact details.",
    },
  },
  {
    fr: "/conditions",
    en: "/en/terms",
    priority: 0.3,
    changeFrequency: "yearly",
    titre: { fr: "Conditions d'utilisation", en: "Terms of Use" },
  },
  {
    fr: "/confidentialite",
    en: "/en/privacy",
    priority: 0.3,
    changeFrequency: "yearly",
    titre: { fr: "Politique de confidentialité", en: "Privacy Policy" },
  },
];

/** URL absolue d'un chemin du site, dans l'origine de l'environnement courant. */
export function urlSite(chemin: string): string {
  return `${SITE_URL}${chemin}`;
}
