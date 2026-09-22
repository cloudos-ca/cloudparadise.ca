import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  AncresSections,
  type Ancre,
} from "@/components/marketing/AncresSections";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";
import { FenetreCta } from "@/components/marketing/FenetreCta";
import { HreflangLinks } from "@/components/marketing/HreflangLinks";
import { Reveal } from "@/components/marketing/Reveal";
import { prixHebergement } from "@/components/marketing/hebergement";
import { BAC_A_SABLE_NOM, PALIERS, enDevise, libelleDe } from "@/components/marketing/offre";
import { SECTION_Y, SHELL } from "@/components/marketing/tokens";
import { alternatesBilingues, openGraphPage } from "@/lib/seo";
import { lienInscription } from "@/lib/site";

const TITRE = "Fonctions — Cloud OS";
const DESCRIPTION =
  "Tout ce que le poste de travail sait faire : le bureau, les applications, le calcul, l’automatisation, le travail d’équipe, les mines et la gestion du compte.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: alternatesBilingues("/fonctions", "/en/features", "fr"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "fr", "/fonctions"),
};

/**
 * Une entrée = une fonctionnalité.
 *
 * `lien` ne sert qu'aux renvois qui sortent de la page de la section : celle-ci
 * porte déjà son lien dans son en-tête, et le répéter sur chaque ligne ferait
 * huit fois le même renvoi.
 */
type Entree = {
  nom: string;
  texte: string;
  lien?: { href: string; libelle: string };
};

type SectionFonctions = {
  id: string;
  surtitre: string;
  titre: string;
  /** Ligne d'orientation sous le titre. Absente quand elle n'apprendrait rien. */
  intro?: string;
  /**
   * La page qui développe les entrées de la section. Absente quand la section
   * n'a pas de page dédiée — Hébergement Web n'en a pas encore, `/fonctions`
   * en est la seule couverture pour l'instant.
   */
  page?: { href: string; libelle: string };
  entrees: readonly Entree[];
};

const PLATEFORME = { href: "/plateforme", libelle: "Voir la plateforme" };
const CALCUL = { href: "/calcul", libelle: "Voir le calcul" };
const MINES = { href: "/mines", libelle: "Voir l’exploration minière" };
const TARIFS = { href: "/tarifs", libelle: "Voir les tarifs" };
const PME = { href: "/pme", libelle: "Voir les PME" };

/**
 * Le contenu de la page.
 *
 * Les entrées qui correspondent à un type facturé lisent leur nom dans
 * `offre.ts` plutôt que de le réécrire : /tarifs et /fonctions listent alors le
 * même libellé par construction, et un renommage se propage tout seul. C'est la
 * page où une divergence se verrait le plus, puisque tout y est côte à côte.
 */
const SECTIONS: readonly SectionFonctions[] = [
  {
    id: "bureau",
    surtitre: "Votre bureau",
    titre: "Le bureau, et ce qu’il y a dedans.",
    page: PLATEFORME,
    entrees: [
      {
        nom: "Fenêtres et dock",
        texte:
          "Des fenêtres déplaçables et empilables, un dock, un thème jour/nuit.",
      },
      {
        nom: "Fichiers",
        texte: "Stockage, dossiers, corbeille, partage, glisser-déposer.",
      },
      {
        nom: "Connexions Google Drive et OneDrive",
        texte: "Vos fichiers de Drive et de OneDrive, accessibles depuis votre bureau.",
      },
      {
        nom: BAC_A_SABLE_NOM.fr,
        texte: "Un vrai bureau Linux persistant, synchronisé en continu avec l’app Fichiers — à la différence du reste de la plateforme, qui tourne en conteneur éphémère. Inclus dans le forfait Entreprise.",
      },
      {
        // Ici et pas dans « Vos applications » : l'app est `hidden` au registre,
        // elle ne se lance ni depuis le dock ni depuis le lanceur — s'ouvrir en
        // double-cliquant un fichier est un comportement du bureau, pas une
        // application qu'on irait chercher. Le passage aperçu → édition est ce
        // qui la distingue d'un simple stockage : c'est la partie à dire.
        nom: "Aperçu des fichiers",
        texte:
          "Ouvrez une image, une vidéo ou un son directement dans le bureau, sans téléchargement. Un bouton vous envoie vers l’application d’édition correspondante.",
      },
      {
        nom: "Spotlight",
        texte:
          "Recherche plein-texte à l’intérieur de vos fichiers, pas seulement dans leurs noms. Un raccourci vocal (Ctrl+Alt+V) pour ouvrir, fermer et ranger une fenêtre, ou lancer une application par son nom.",
      },
      {
        nom: "Fond d’écran",
        texte:
          "Choisissez votre image : l’interface ajuste ses couleurs pour s’accorder avec elle.",
      },
      {
        nom: "Assistant",
        texte:
          "Vous décrivez la tâche en langage courant ; il monte le plan et le lance.",
      },
      {
        nom: "Documentation intégrée",
        texte:
          "Une base de connaissances dans le bureau, qui couvre chaque fonction et chaque application. Elle suit l’évolution du produit.",
      },
      {
        nom: "Notifications",
        texte:
          "Dans le bureau et par courriel : tâche terminée, échéance qui approche.",
      },
      {
        nom: "Moniteur",
        texte: "Le suivi de vos tâches et leurs journaux, en direct.",
      },
    ],
  },
  {
    id: "applications",
    surtitre: "Vos applications",
    titre: "Les applications, dans le navigateur.",
    intro:
      "Les applications streamées et hébergées s’ouvrent sur écran d’ordinateur ; elles sont masquées sur mobile.",
    page: PLATEFORME,
    entrees: [
      {
        nom: "Bureautique",
        texte: "Texte, tableur et présentation, en co-édition.",
      },
      { nom: "Image", texte: "Retouche rapide et édition par calques." },
      { nom: "Vidéo", texte: "Montage et encodage dans le navigateur." },
      { nom: "Audio", texte: "Montage et traitement du son." },
      { nom: "3D", texte: "Blender, streamé en session éphémère." },
      { nom: "SIG", texte: "QGIS Desktop, streamé en session éphémère." },
      { nom: "Lecteur PDF", texte: "Vos PDF s’ouvrent dans le bureau." },
      {
        nom: "Agent de code",
        texte:
          "Vos dépôts Git, un plan de codage et une boucle interactive asynchrone, dans un environnement isolé avec les outils MCP activés par défaut.",
      },
    ],
  },
  {
    id: "calcul",
    surtitre: "Vos gestes de calcul",
    titre: "Les tâches que vous lancez.",
    page: CALCUL,
    entrees: [
      {
        nom: libelleDe("Documents", "fr"),
        texte: "Convertir, chercher dans le contenu, classer, générer par lots.",
      },
      {
        nom: libelleDe("Données", "fr"),
        texte: "Interroger, croiser, visualiser — en lecture seule sur vos sources.",
      },
      {
        nom: libelleDe("Images", "fr"),
        texte: "Redimensionner, convertir, retoucher par lots.",
      },
      {
        nom: libelleDe("Génération d'images", "fr"),
        texte: "Une image produite à partir de votre description.",
      },
      {
        nom: libelleDe("Média", "fr"),
        texte: "Encoder, convertir, extraire une piste, traiter par lots.",
      },
      {
        nom: libelleDe("Scraping", "fr"),
        texte:
          "Mettre en tableau ce qui vous intéresse sur un site, récupérer des fichiers en masse.",
      },
      {
        nom: libelleDe("Mémo vocal", "fr"),
        texte:
          "Déposez un enregistrement, récupérez le texte — brut, sous-titré (SRT/WebVTT), en français ou dans une autre langue détectée automatiquement. Tourne sur notre infrastructure, jamais un service tiers.",
      },
      {
        nom: libelleDe("Source de données", "fr"),
        texte:
          "Passerelle vers un fournisseur externe (géocodage, traduction) quand la demande le justifie.",
      },
    ],
  },
  {
    // L'identifiant reste `puissance` : il est dans des liens et des ancres.
    // Seul le texte change — « la puissance » promettait une quantité que les
    // plafonds réels démentent, là où « le calcul » dit ce qui est vraiment
    // servi. Aucune fiche technique matérielle, règle du plan de contenu.
    id: "puissance",
    surtitre: "Le calcul",
    titre: "Le calcul exact tourne chez nous.",
    page: CALCUL,
    entrees: [
      {
        nom: libelleDe("Calcul GPU", "fr"),
        texte:
          "Les traitements qui demandent une carte graphique — à partir d’un gabarit, de votre code, ou de vos fichiers.",
      },
      {
        nom: libelleDe("Rendu 3D", "fr"),
        texte: "Vos scènes calculées sur GPU ; vous récupérez le rendu.",
      },
      {
        nom: libelleDe("Impression 3D", "fr"),
        texte: "Un modèle préparé et découpé pour l’impression.",
      },
      {
        nom: libelleDe("Simulation", "fr"),
        texte:
          "Une simulation lancée à partir de paramètres — rien à téléverser.",
      },
      // L'entrée de regroupement reste, et chaque geste prend sa ligne en
      // dessous : sur une page de référence, c'est la ligne nommée qui répond
      // au Ctrl-F d'un évaluateur, pas le résumé qui la précède.
      {
        // Le nom vient de `offre.ts` depuis que le mode est facturé : il était
        // écrit ici en dur du temps où il n'avait pas de prix.
        nom: libelleDe("Géomatique", "fr"),
        texte: "Reprojection, croisement de couches, export.",
        lien: MINES,
      },
      {
        nom: "Reprojection",
        texte: "NAD83 UTM 17N et 18N, MTM.",
      },
      {
        nom: "Desurvey",
        texte: "De vos relevés de déviation aux traces en trois dimensions.",
      },
      {
        nom: "Anomalies géochimiques",
        texte: "Repérage et mise en carte de vos résultats.",
      },
      {
        nom: "Ombrage et courbes de niveau",
        texte: "Le relief, lisible d’un coup d’œil.",
      },
      {
        nom: "Export GPX",
        texte: "Vos points, exportés pour un GPS Garmin.",
      },
    ],
  },
  {
    id: "automatisation",
    surtitre: "Automatiser et livrer",
    titre: "Une fois, ou tous les lundis matin.",
    page: CALCUL,
    entrees: [
      {
        nom: "Flux",
        texte: "Plusieurs traitements enchaînés en une seule suite.",
      },
      {
        nom: "Cédules",
        texte: "Un flux qui part tout seul, à l’heure que vous fixez.",
      },
      {
        nom: "Rapports",
        texte:
          "Constructeur de graphiques, export PDF, livraison planifiable par courriel.",
      },
      {
        nom: "Gestionnaire de téléchargements",
        texte:
          "Récupérez un fichier depuis une adresse externe sans passer par votre poste. Vous pouvez fermer votre ordinateur, le téléchargement continue — et il reprend là où il s’était arrêté en cas d’incident.",
      },
    ],
  },
  {
    // Livré fin juillet 2026, jamais couvert sur la vitrine avant le
    // 2026-08-12 — ni même mentionné dans la documentation produit interne.
    id: "erp",
    surtitre: "La gestion d’entreprise",
    titre: "De la facture au bilan, dans le même bureau.",
    // Livraisons du 2026-09-01 : quatre chantiers ont fait passer l'ERP de
    // « facturation avec CRM » à une comptabilité en partie double complète.
    // Export PDF des états financiers et écritures de clôture d'exercice
    // restent hors scope — ne pas les promettre.
    page: PME,
    entrees: [
      {
        nom: "CRM",
        texte:
          "Clients, contacts et opportunités en kanban, partagés par toute l’équipe.",
      },
      {
        nom: "Devis et factures",
        texte:
          "Devis et factures PDF, TPS et TVQ calculées automatiquement (non composées, interrupteur par organisation), relances des retards envoyées seules.",
      },
      {
        nom: "Comptes fournisseurs",
        texte:
          "Factures fournisseurs ventilées, paiements, comptabilisation symétrique au volet ventes.",
      },
      {
        nom: "Grand livre",
        texte:
          "Comptabilité en partie double, plan de comptes par défaut, écritures automatiques à chaque vente — ou saisies à la main quand il le faut.",
      },
      {
        nom: "États financiers",
        texte:
          "Bilan et état des résultats calculés à la volée, à n’importe quelle date passée. Export CSV. Le rapport de taxes déduit les crédits de taxe sur les intrants.",
      },
      {
        nom: "Rapprochement bancaire",
        texte:
          "Importez votre relevé (OFX ou CSV générique), rapprochez vos transactions avec des candidats suggérés par montant et par date, ajustez les frais bancaires en une écriture.",
      },
      {
        nom: "Catalogue et inventaire",
        texte: "Votre inventaire se décrémente tout seul à chaque facture.",
      },
      {
        nom: "PayPal par équipe",
        texte: "Chaque équipe encaisse ses clients avec son propre compte.",
      },
      {
        nom: "Tableau de bord",
        texte:
          "Revenus, pipeline, comptes à recevoir et marge, en un coup d’œil.",
      },
      {
        nom: "Rôles ERP",
        texte:
          "Accès restreint module par module — comptabilité générale, fournisseurs, banque — pas un simple interrupteur ERP.",
      },
    ],
  },
  {
    id: "hebergement",
    surtitre: "Hébergement Web",
    titre: "Votre site, hébergé chez nous aussi.",
    intro: `${prixHebergement("fr")} — un produit à part, pas un module de plus.`,
    entrees: [
      {
        nom: "Quatre piles prêtes à l’emploi",
        texte:
          "WordPress, PHP générique, Node ou statique : un site provisionné en trois clics.",
      },
      {
        nom: "Courriel du domaine",
        texte:
          "Une adresse sur votre propre domaine, provisionnée automatiquement avec le site.",
      },
      {
        nom: "Sauvegarde automatique",
        texte: "Fichiers et base de données, chaque jour.",
      },
      {
        nom: "Bascule sans casse",
        texte:
          "Suite de tests avant de couper l’ancien hébergeur : web, base de données, DNS, courriel.",
      },
      {
        nom: "Migration",
        texte:
          "Connecteur SSH/SFTP générique pour rapatrier un site déjà hébergé ailleurs.",
      },
      {
        nom: "Outils d’administration",
        texte:
          "phpMyAdmin ou pgAdmin à la demande, plusieurs sites gérés depuis un seul compte.",
      },
    ],
  },
  {
    id: "equipe",
    surtitre: "À plusieurs",
    titre: "Le même bureau, à plusieurs.",
    page: PLATEFORME,
    entrees: [
      {
        nom: "Bureaux d’équipe",
        texte:
          "Plusieurs bureaux, partage entre équipes, invitations et approbation des accès.",
      },
      { nom: "Messagerie", texte: "Canaux, messages directs, présence." },
      {
        nom: "Courriel",
        texte:
          "Webmail intégré, avec une adresse @cloudos.ca que vous activez depuis votre bureau. Connexion d’un compte externe (Gmail, Outlook) par IMAP/SMTP ou OAuth.",
      },
      {
        nom: "Agenda et contacts",
        texte:
          "Agenda partagé et rappels. Synchronisation avec un service externe compatible CalDAV/CardDAV.",
      },
    ],
  },
  {
    id: "jeux",
    surtitre: "Jouer",
    titre: "Un studio de jeux, et une arcade gratuite.",
    page: PLATEFORME,
    entrees: [
      {
        nom: "Studio de jeux",
        texte:
          "Décrivez un jeu en conversation ; l’IA en discute les mécaniques, l’écrit sur Phaser 3, le compile et le teste automatiquement avant de vous le livrer. La compilation compte comme une tâche ; rejouer et revenir en arrière sont gratuits.",
      },
      {
        nom: "Arcades",
        texte:
          "Une salle d’environ 30 700 jeux HTML5 gratuits, organisée en salles par catégorie, cherchable depuis Spotlight. Classée sur ce qui se mesure — parties jouées, jeux essayés, séries de jours actifs — pas sur un score.",
      },
    ],
  },
  {
    id: "mines",
    surtitre: "Exploration minière",
    titre: "Les outils de l’exploration.",
    page: MINES,
    entrees: [
      {
        // « le calcul des échéances » était faux : GESTIM n'offre aucun service
        // interrogeable, les dates sont saisies à la main. Ce qui est calculé,
        // c'est le décompte jusqu'à la date, et c'est lui qui déclenche l'alerte.
        nom: "Titres miniers",
        texte:
          "Vous inscrivez vos titres et leurs échéances ; le décompte est suivi et vous êtes alerté avant la date.",
      },
      {
        nom: "Forages 3D",
        texte:
          "Le desurvey de vos relevés, et les traces affichées en trois dimensions.",
      },
      {
        nom: "Rapport d’exploration",
        texte:
          "Un premier jet rédigé à partir des données de votre projet, que vous révisez.",
      },
      {
        // « feuillet SNRC » n'existe nulle part dans le code d'import : la
        // requête se fait par emprise géographique d'un district minier, plus
        // un thème. Le commentaire disait « déjà corrigé sur /mines » alors que
        // cette page-là portait encore « feuillet SNRC » ; balayé pour de bon
        // sur /mines et /en/mining le 2026-07-28.
        nom: "Données ouvertes SIGÉOM",
        texte: "Les couches SIGÉOM, importées par district minier.",
      },
      {
        nom: "Import de couches",
        texte: ".gpkg, .geojson, .kml, et .zip pour un shapefile compressé.",
      },
    ],
  },
  {
    id: "compte",
    surtitre: "Votre compte",
    titre: "Votre forfait, vos factures, vos accès.",
    page: TARIFS,
    entrees: [
      {
        nom: "Forfait et jauge",
        texte: "Votre forfait, et la jauge d’usage du mois en cours.",
      },
      {
        nom: "Factures",
        texte: "Vos factures, consultables et téléchargeables depuis votre compte.",
      },
      {
        // Sans lien vers /securite : « Clés API », juste en dessous, en porte
        // déjà un — deux fois le même renvoi à la suite ne guide plus, il
        // encombre.
        nom: "Second facteur à la connexion",
        texte:
          "Un code par courriel à chaque connexion, pour qu’aucun compte ne repose sur un mot de passe seul.",
      },
      {
        nom: "Clés API",
        texte: "Une portée limitée, et une expiration que vous fixez.",
        lien: { href: "/securite", libelle: "Voir la sécurité" },
      },
      {
        nom: "Parcours d’accueil",
        texte: "Une visite guidée du bureau, à la première ouverture.",
      },
    ],
  },
];

/** Une ancre par section — la seule navigation possible sur une page si longue. */
const ANCRES: readonly Ancre[] = [
  { id: "bureau", libelle: { fr: "Le bureau", en: "Desktop" } },
  { id: "applications", libelle: { fr: "Applications", en: "Applications" } },
  { id: "calcul", libelle: { fr: "Calcul", en: "Compute" } },
  { id: "puissance", libelle: { fr: "Calcul", en: "Compute" } },
  { id: "automatisation", libelle: { fr: "Automatiser", en: "Automate" } },
  { id: "erp", libelle: { fr: "Gestion d’entreprise", en: "Business management" } },
  { id: "hebergement", libelle: { fr: "Hébergement Web", en: "Web Hosting" } },
  { id: "equipe", libelle: { fr: "À plusieurs", en: "Together" } },
  { id: "jeux", libelle: { fr: "Jouer", en: "Play" } },
  { id: "mines", libelle: { fr: "Mines", en: "Mining" } },
  { id: "compte", libelle: { fr: "Compte", en: "Account" } },
];

export default function FonctionsPage() {
  return (
    <>
      <HreflangLinks fr="/fonctions" en="/en/features" />
      <BreadcrumbJsonLd
        items={[
          { nom: "Accueil", chemin: "/" },
          { nom: "Fonctions", chemin: "/fonctions" },
        ]}
      />

      {/* Héros — court, sans bouton : cette page n'est pas une page de
          conversion, elle se consulte. Le closer en bas suffit. */}
      <section className="relative">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-3xl">
            <SurTitre>Fonctions</SurTitre>
            <h1 className="mt-2 font-display text-[1.9rem] leading-[1.1] font-extrabold tracking-[-0.02em] text-white sm:text-[2.4rem] os:text-[2.8rem]">
              Tout ce que le poste
              <br />
              de travail sait faire.
            </h1>
            <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-white/85">
              La liste complète, par usage. Ce qui est ici est disponible
              aujourd’hui.
            </p>
            {/* Toujours pas de bouton — la page se consulte —, mais une ligne
                d'information reste à sa place : la même que sur les trois
                autres pages produit. */}
            <p className="mt-3 text-[13px] text-white/60">
              Dès{" "}
              <a
                href="/tarifs#forfaits"
                data-cp-accent
                className="text-cp-subtle underline-offset-4 hover:text-[var(--acc-text)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {enDevise(PALIERS[0].prixMensuel)}/mois
              </a>
              , tout inclus.
            </p>
          </Reveal>
        </div>
      </section>

      <AncresSections ancres={ANCRES} />

      {SECTIONS.map((section) => (
        <SectionListe key={section.id} section={section} />
      ))}

      {/* Closer */}
      <section className="relative overflow-x-clip">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal>
            <FenetreCta
              soustitre="Créez votre compte et ouvrez le bureau — tout ce qui est listé ici est déjà dedans."
              bouton={{
                href: lienInscription("fonctions-closer"),
                libelle: "Commencer gratuitement",
              }}
              lien={{ href: "/tarifs", libelle: "Voir les tarifs" }}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}

/**
 * Une section : en-tête à gauche, liste à droite — le gabarit des pages à
 * sections du site.
 *
 * La liste est une `<dl>` : un nom, sa définition. C'est la structure exacte de
 * ce que la page est, et elle donne aux moteurs de recherche le couple
 * terme/description plutôt qu'une suite de paragraphes indistincts.
 */
function SectionListe({ section }: Readonly<{ section: SectionFonctions }>) {
  const { id, surtitre, titre, intro, page, entrees } = section;
  return (
    <section id={id} className="relative scroll-mt-24">
      <div className={`${SHELL} ${SECTION_Y}`}>
        <div className="grid gap-6 os:grid-cols-[2fr_3fr] os:items-start os:gap-12">
          <Reveal>
            <SurTitre>{surtitre}</SurTitre>
            <h2 className="mt-2 font-display text-[1.5rem] leading-[1.2] font-extrabold tracking-tight text-balance text-cp-heading sm:text-[1.75rem] os:text-[2rem]">
              {titre}
            </h2>
            {intro ? (
              <p className="mt-4 max-w-[46ch] text-[13px] leading-relaxed text-white/75">
                {intro}
              </p>
            ) : null}
            {page ? (
              <div className="mt-4">
                <LienOr href={page.href}>{page.libelle}</LienOr>
              </div>
            ) : null}
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01]">
              {entrees.map(({ nom, texte, lien }) => (
                <div
                  key={nom}
                  className="grid gap-x-6 gap-y-1 px-5 py-3.5 sm:grid-cols-[minmax(0,11rem)_1fr]"
                >
                  <dt className="font-display text-[14px] font-extrabold text-white">
                    {nom}
                  </dt>
                  <dd className="text-[13px] leading-relaxed text-white/85">
                    {texte}
                    {lien ? (
                      <>
                        {" "}
                        <LienOr href={lien.href} petit>
                          {lien.libelle}
                        </LienOr>
                      </>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Sur-titre or, style système. */
function SurTitre({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <p
      className="text-[13px] font-semibold uppercase tracking-[0.12em]"
      style={{ color: "var(--cta)" }}
    >
      {children}
    </p>
  );
}

/**
 * Lien or texte + flèche. `petit` le fait tenir dans la ligne d'une entrée,
 * où il suit une phrase au lieu de vivre seul sous un titre.
 */
function LienOr({
  href,
  children,
  petit = false,
}: Readonly<{
  href: string;
  children: ReactNode;
  petit?: boolean;
}>) {
  return (
    <a
      href={href}
      className={`group inline-flex items-baseline gap-1 font-medium transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
        petit ? "text-[13px]" : "gap-1.5 text-sm"
      }`}
      style={{ color: "var(--cta)" }}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform group-hover:translate-x-0.5"
      >
        →
      </span>
    </a>
  );
}
