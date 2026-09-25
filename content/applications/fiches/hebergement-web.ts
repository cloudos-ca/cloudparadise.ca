import type { FicheApplication } from "../types";

/**
 * Hébergement Web — ÉBAUCHE, à relire avant publication.
 *
 * Forfait : `plan: "entreprise"` (GET /api/v1/apps/catalog). Ouvert par HOSTING_GRANTING_PLAN
 * (src/lib/hosting/entitlement.ts) : l'abonnement Hébergement Web seul (productType HOSTING), OU un
 * forfait `includesHosting` (Entreprise, qui compte « 1 site Hébergement Web », offre.ts de la
 * vitrine). Un site par abonnement couvrant (HOSTING_SITES_PER_SUBSCRIPTION). Un compte qui n'a QUE
 * l'abonnement Hébergement voit un bureau réduit (isHostingOnlyUser). Aucun prix dans la fiche : le
 * prix de l'abonnement seul vit dans components/marketing/hebergement.ts.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Quatre modèles : WordPress + MySQL, PHP + MySQL, Node.js + PostgreSQL, site statique servi par
 *   Nginx (src/lib/hosting/catalog.ts).
 * - Adresse de préversion avant tout domaine ; rattachement d'un domaine qu'on possède déjà (www ajouté
 *   automatiquement) en changeant ses serveurs de noms ; tests avant la bascule : site, base de
 *   données, DNS, courriel (src/lib/hosting/preflight.ts ; hosting.preflight*, fr.json).
 * - HTTPS automatique après la bascule des serveurs de noms (Let's Encrypt, src/lib/hosting/tls.ts).
 * - Courriel du domaine : une boîte créée sur le domaine et lue dans l'app Courriel
 *   (src/lib/hosting/mail.ts).
 * - Sauvegardes : chaque nuit (7 dernières conservées) et à la demande (3 dernières) ; restauration avec
 *   sauvegarde de sécurité de l'état actuel juste avant (hosting.backupsHint / restoreConfirm).
 * - Migration depuis un autre hébergeur par SSH/SFTP ou par jeton d'API cPanel, jusqu'à 200 Mo
 *   compressés ; la base d'un WordPress est migrée aussi (hosting.migration*, src/lib/migration/).
 * - phpMyAdmin ou pgAdmin à la demande ; la base n'est joignable que depuis le site
 *   (src/lib/hosting/db-admin.ts ; hosting.dbConnectionHint).
 * - Terminal, gestionnaire de fichiers du site avec édition, journaux, redémarrage (hosting-app.tsx,
 *   fr.json).
 * - 50 Go par site, fichiers et base compris (src/lib/hosting/disk.ts).
 * - Les sites tournent sur l'hôte de l'application, dans AWS ca-central-1
 *   (infra/aws/cloudos/compose/hebergement.yml) : « hébergé au Québec » tient pour le site.
 *
 * À vérifier à la relecture :
 * - Le courriel du domaine en production : il passe par le serveur mailcow partagé et, pour l'envoi,
 *   par un relais Amazon SES en cours de mise en place (infra/mailcow/, non versionné au 2026-09-25 ;
 *   chaque domaine client doit y être vérifié). La fiche cite la boîte du domaine, pas sa localisation.
 * - Que le rattachement de domaine est actif en production (sinon « Le rattachement de domaine n'est
 *   pas disponible sur ce serveur pour le moment », hosting.domainUnavailable).
 * - Le mot « Entreprise » dans le texte : la fiche dit qu'un site est compris dans Entreprise ET que
 *   l'Hébergement Web existe en abonnement seul — c'est l'offre publiée (offre.ts, hebergement.ts,
 *   /fonctions « un produit à part »), mais le badge de la fiche, lui, n'affiche qu'Entreprise.
 */
export const hebergementWeb: FicheApplication = {
  id: "hebergement-web",
  apps: ["hosting"],
  slug: { fr: "hebergement-web", en: "web-hosting" },
  nom: { fr: "Hébergement Web", en: "Web Hosting" },
  titre: {
    fr: "Hébergement Web au Québec : WordPress, PHP, Node ou statique",
    en: "Web hosting in Québec: WordPress, PHP, Node or static",
  },
  groupe: "bureau",
  forfait: "entreprise",
  seo: {
    titre: {
      fr: "Hébergement Web au Québec, WordPress compris — Cloud OS",
      en: "Web hosting in Québec, WordPress included — Cloud OS",
    },
    description: {
      fr: "Hébergez votre site WordPress, PHP, Node ou statique au Québec : HTTPS automatique, sauvegarde chaque nuit, courriel du domaine et migration assistée.",
      en: "Host your WordPress, PHP, Node or static site in Québec: automatic HTTPS, nightly backups, a mailbox on your domain and guided migration.",
    },
  },
  accroche: {
    fr: "Votre site en ligne, sauvegardé chaque nuit, géré depuis votre bureau.",
    en: "Your website online, backed up every night, managed from your desktop.",
  },
  motsCles: {
    fr: ["hébergement web québec", "hébergement wordpress québec", "hébergement site web pme", "migrer un site wordpress", "hébergeur web canadien"],
    en: ["web hosting quebec", "wordpress hosting canada", "small business web hosting", "migrate a wordpress site", "canadian web host"],
  },
  corps: {
    fr: [
      {
        titre: "Un site en ligne en quelques clics",
        paragraphes: [
          "L'Hébergement Web met votre site en ligne depuis une fenêtre de Cloud OS. Vous choisissez un modèle, et le site se prépare en quelques minutes, avec une adresse de préversion pour le consulter avant de brancher votre domaine.",
        ],
        points: [
          "WordPress, avec sa base MySQL, prêt à l'emploi.",
          "PHP et MySQL, pour un site PHP classique.",
          "Node.js et PostgreSQL, pour une application Node.",
          "Un site statique HTML, CSS et JavaScript.",
        ],
      },
      {
        titre: "Votre domaine, en HTTPS, avec son courriel",
        paragraphes: [
          "Vous rattachez un domaine que vous possédez déjà, et la version www suit d'elle-même. Avant de changer vos serveurs de noms, une suite de vérifications teste le site, la base de données, le DNS et le courriel : vous ne basculez que lorsque tout répond. Le certificat HTTPS s'active ensuite automatiquement.",
          "Une boîte courriel sur votre domaine peut être créée avec le site, et vous la lisez dans l'application Courriel de Cloud OS.",
        ],
      },
      {
        titre: "Sauvegardé, et facile à rapatrier",
        paragraphes: [
          "Votre site, fichiers et base de données compris, est sauvegardé chaque nuit ; les sept dernières sauvegardes sont conservées, et vous pouvez en lancer une vous-même à tout moment. Avant chaque restauration, l'état actuel est lui aussi sauvegardé.",
          "Votre site est déjà ailleurs ? Importez-le depuis votre hébergeur actuel par SSH, SFTP ou cPanel, jusqu'à 200 Mo compressés. Pour un WordPress, la base de données suit.",
        ],
      },
      {
        titre: "Les outils d'un hébergeur, sans le panneau compliqué",
        paragraphes: [
          "Terminal, gestionnaire de fichiers avec édition, journaux, redémarrage, et phpMyAdmin ou pgAdmin ouverts à la demande : tout se gère depuis la même fenêtre. La base de données n'est joignable que depuis votre site, jamais depuis Internet. Chaque site dispose de 50 Go, fichiers et base compris, et il est hébergé au Québec.",
          "Un site est compris dans le forfait Entreprise. L'Hébergement Web existe aussi en abonnement distinct, pour qui n'a besoin que de son site.",
        ],
      },
    ],
    en: [
      {
        titre: "A website online in a few clicks",
        paragraphes: [
          "Web Hosting puts your site online from a Cloud OS window. You pick a template, and the site is ready within minutes, with a preview address so you can look at it before connecting your domain.",
        ],
        points: [
          "WordPress, with its MySQL database, ready to use.",
          "PHP and MySQL, for a classic PHP site.",
          "Node.js and PostgreSQL, for a Node application.",
          "A static HTML, CSS and JavaScript site.",
        ],
      },
      {
        titre: "Your domain, over HTTPS, with its email",
        paragraphes: [
          "You connect a domain you already own, and the www version follows on its own. Before you change your name servers, a set of checks tests the site, the database, DNS and email: you only switch over once everything responds. The HTTPS certificate then turns on automatically.",
          "A mailbox on your domain can be created along with the site, and you read it in the Cloud OS Mail app.",
        ],
      },
      {
        titre: "Backed up, and easy to bring over",
        paragraphes: [
          "Your site, files and database included, is backed up every night; the last seven backups are kept, and you can start one yourself at any time. Before any restore, the current state is backed up too.",
          "Is your site hosted somewhere else? Import it from your current host over SSH, SFTP or cPanel, up to 200 MB compressed. For WordPress, the database comes along.",
        ],
      },
      {
        titre: "A host's tools, without the complicated control panel",
        paragraphes: [
          "Terminal, file manager with editing, logs, restart, and phpMyAdmin or pgAdmin opened on demand: it is all managed from the same window. The database can only be reached from your site, never from the Internet. Each site has 50 GB, files and database included, and it is hosted in Québec.",
          "One site is included in the Business plan. Web Hosting is also available as a separate subscription, for those who only need their website.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Puis-je déménager mon site WordPress existant ?",
        reponse: "Oui. L'onglet Migration copie les fichiers de votre site depuis votre hébergeur actuel, par SSH, SFTP ou cPanel, et la base de données d'un WordPress avec eux. Une sauvegarde est prise juste avant.",
      },
      {
        question: "Mon site est-il sauvegardé ?",
        reponse: "Oui, chaque nuit, fichiers et base de données compris. Les sept dernières sauvegardes sont conservées, et vous pouvez restaurer celle de votre choix depuis l'onglet Sauvegardes.",
      },
      {
        question: "Faut-il le forfait Entreprise pour héberger un site ?",
        reponse: "Un site est compris dans le forfait Entreprise. Si vous n'avez besoin que d'héberger votre site, l'Hébergement Web existe aussi en abonnement distinct : voyez les tarifs.",
      },
      {
        question: "Le HTTPS est-il compris ?",
        reponse: "Oui. Le certificat s'active automatiquement dès que vos serveurs de noms pointent vers Cloud OS, sans autre démarche de votre part.",
      },
    ],
    en: [
      {
        question: "Can I move my existing WordPress site?",
        reponse: "Yes. The Migration tab copies your site's files from your current host, over SSH, SFTP or cPanel, and a WordPress database along with them. A backup is taken just before.",
      },
      {
        question: "Is my site backed up?",
        reponse: "Yes, every night, files and database included. The last seven backups are kept, and you can restore the one you choose from the Backups tab.",
      },
      {
        question: "Do I need the Business plan to host a site?",
        reponse: "One site is included in the Business plan. If all you need is to host your website, Web Hosting is also available as a separate subscription: see pricing.",
      },
      {
        question: "Is HTTPS included?",
        reponse: "Yes. The certificate turns on automatically as soon as your name servers point to Cloud OS, with nothing else for you to do.",
      },
    ],
  },
  captures: [],
  voisines: ["courriel", "bac-a-sable", "equipes"],
  articles: [
    { slug: "migration-vers-le-cloud", titre: "Migration vers le cloud : la méthode qui évite les échecs" },
  ],
};
