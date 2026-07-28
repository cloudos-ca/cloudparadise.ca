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
import { libelleDe } from "@/components/marketing/offre";
import { SECTION_Y, SHELL } from "@/components/marketing/tokens";
import { alternatesBilingues, openGraphPage } from "@/lib/seo";

const TITRE = "Fonctions — Cloud Paradise";
const DESCRIPTION =
  "La liste complète de ce que le poste de travail sait faire : le bureau, les applications, le calcul, l’automatisation, le travail d’équipe, l’exploration minière et la gestion du compte.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: alternatesBilingues("/fonctions", "/en/fonctions", "fr"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "fr"),
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
  /** La page qui développe les entrées de la section. */
  page: { href: string; libelle: string };
  entrees: readonly Entree[];
};

const PLATEFORME = { href: "/plateforme", libelle: "Voir la plateforme" };
const CALCUL = { href: "/calcul", libelle: "Voir le calcul" };
const MINES = { href: "/mines", libelle: "Voir l’exploration minière" };
const TARIFS = { href: "/tarifs", libelle: "Voir les tarifs" };

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
          "Recherche plein-texte à l’intérieur de vos fichiers, pas seulement dans leurs noms.",
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
    ],
  },
  {
    id: "puissance",
    surtitre: "La puissance",
    titre: "Le matériel lourd tourne chez nous.",
    page: CALCUL,
    entrees: [
      {
        nom: libelleDe("Calcul GPU", "fr"),
        texte:
          "Les traitements qui demandent une carte graphique, exécutés sur la nôtre.",
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
        texte: "Vos calculs de simulation, lancés sur notre matériel.",
      },
      // L'entrée de regroupement reste, et chaque geste prend sa ligne en
      // dessous : sur une page de référence, c'est la ligne nommée qui répond
      // au Ctrl-F d'un évaluateur, pas le résumé qui la précède.
      {
        nom: "Géomatique et SIG",
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
          "Webmail intégré, avec une adresse @cloudparadise.ca que vous activez depuis votre bureau.",
      },
      { nom: "Agenda", texte: "Agenda partagé et rappels." },
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
        // un thème. Déjà corrigé sur /mines au lot 4.
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
    titre: "Vos crédits, vos factures, vos accès.",
    page: TARIFS,
    entrees: [
      {
        nom: "Crédits et recharge",
        texte: "Votre solde, et une recharge quand vous le voulez.",
      },
      {
        nom: "Factures",
        texte: "Vos factures, consultables et téléchargeables depuis votre compte.",
      },
      {
        // Sans lien vers /securite : « Clés API », juste en dessous, en porte
        // déjà un — deux fois le même renvoi à la suite ne guide plus, il
        // encombre.
        nom: "Authentification à deux facteurs",
        texte: "Un code par courriel à chaque connexion.",
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
  { id: "puissance", libelle: { fr: "Puissance", en: "Power" } },
  { id: "automatisation", libelle: { fr: "Automatiser", en: "Automate" } },
  { id: "equipe", libelle: { fr: "À plusieurs", en: "Together" } },
  { id: "mines", libelle: { fr: "Mines", en: "Mining" } },
  { id: "compte", libelle: { fr: "Compte", en: "Account" } },
];

export default function FonctionsPage() {
  return (
    <>
      <HreflangLinks fr="/fonctions" en="/en/fonctions" />
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
            <h1 className="mt-2 font-display text-[1.9rem] leading-[1.1] font-bold tracking-[-0.02em] text-white sm:text-[2.4rem] os:text-[2.8rem]">
              Tout ce que le poste
              <br />
              de travail sait faire.
            </h1>
            <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-white/85">
              La liste complète, par usage. Ce qui est ici est disponible
              aujourd’hui.
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
                href: "https://app.cloudparadise.cloud/register",
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
            <h2 className="mt-2 font-display text-[1.5rem] leading-[1.2] font-bold tracking-tight text-balance text-[#eef4ff] sm:text-[1.75rem] os:text-[2rem]">
              {titre}
            </h2>
            {intro ? (
              <p className="mt-4 max-w-[46ch] text-[13px] leading-relaxed text-white/75">
                {intro}
              </p>
            ) : null}
            <div className="mt-4">
              <LienOr href={page.href}>{page.libelle}</LienOr>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01]">
              {entrees.map(({ nom, texte, lien }) => (
                <div
                  key={nom}
                  className="grid gap-x-6 gap-y-1 px-5 py-3.5 sm:grid-cols-[minmax(0,11rem)_1fr]"
                >
                  <dt className="font-display text-[14px] font-semibold text-white">
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
