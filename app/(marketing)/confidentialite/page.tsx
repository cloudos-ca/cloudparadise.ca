import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";
import { HreflangLinks } from "@/components/marketing/HreflangLinks";
import { PageEntete } from "@/components/marketing/PageEntete";
import { AncresSections } from "@/components/marketing/AncresSections";
import {
  ancresDe,
  CONTENEUR_LEGAL,
  GABARIT_LEGAL,
  SectionsRedigees,
  type SectionRedigee,
} from "@/components/marketing/legal";
import {
  ADRESSE,
  COURRIEL_RESPONSABLE,
} from "@/components/marketing/coordonnees";
import { LECTURE, SECTION_Y, SHELL } from "@/components/marketing/tokens";
import {
  alternatesBilingues,
  IMAGE_OG_PARTAGEE,
  openGraphPage,
  ROBOTS,
} from "@/lib/seo";

const TITRE = "Politique de confidentialité — Cloud Paradise";
const DESCRIPTION =
  "Comment Cloud Paradise recueille, utilise et protège les renseignements personnels, conformément à la Loi 25 du Québec. Vos droits et comment les exercer.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  robots: ROBOTS,
  alternates: alternatesBilingues("/confidentialite", "/en/privacy", "fr"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "fr", [IMAGE_OG_PARTAGEE]),
};

const MAJ = "30 juillet 2026";

/** Le responsable désigné au sens de la Loi 25, art. 3.1. */
const RESPONSABLE = "Maxime Murray";
/** Courriel dédié au responsable de la protection des renseignements
 * personnels — distinct du courriel de contact général (`COURRIEL`). */

const DENOMINATION_LEGALE = "Cloud Paradise S.E.N.C.";
const ADRESSE_LIGNE = ADRESSE.join(", ");

const SECTIONS: readonly SectionRedigee[] = [
  {
    titre: "Renseignements que nous recueillons",
    blocs: [
      "Nous recueillons uniquement les renseignements nécessaires à l’exploitation du Service.",
      {
        liste: [
          {
            terme: "Renseignements de compte.",
            texte:
              "Votre prénom, votre nom, votre adresse courriel et le mot de passe que vous choisissez. Le mot de passe n’est jamais conservé en clair : il est stocké sous forme d’empreinte cryptographique (hachage bcrypt).",
          },
          {
            terme: "Renseignements d’équipe et d’espace de travail.",
            texte:
              "Lorsque vous créez ou rejoignez une équipe, nous conservons votre appartenance à cet espace, votre rôle et les invitations échangées.",
          },
          {
            terme: "Renseignements de facturation.",
            texte:
              "Selon votre utilisation : l’historique de vos achats de crédits et des transactions, ainsi que les données nécessaires au traitement des paiements. Les renseignements de carte de paiement sont traités directement par notre prestataire de paiement (PayPal) et ne transitent pas par nos serveurs sous forme complète (voir section 4).",
          },
          {
            terme: "Fichiers et jeux de données que vous déposez.",
            texte:
              "Les fichiers que vous téléversez pour exécuter une tâche, ainsi que les résultats produits (y compris les archives téléchargeables). Ces fichiers peuvent contenir des renseignements personnels que vous y placez ; vous en demeurez responsable et ne devez y déposer que des renseignements que vous avez le droit de traiter.",
          },
          {
            terme: "Renseignements liés aux tâches.",
            texte:
              "Les plans de calcul que vous créez, le mode de traitement choisi, les paramètres d’exécution, les journaux d’exécution diffusés en continu et l’historique des tâches.",
          },
          {
            terme: "Échanges avec l’assistant de planification.",
            texte:
              "Le contenu que vous saisissez dans le chat de planification par IA afin d’affiner une tâche. Ce contenu est traité par un modèle d’intelligence artificielle auto-hébergé sur l’infrastructure de Cloud Paradise ; il n’est transmis à aucun fournisseur d’IA tiers (voir sections 2 et 4).",
          },
          {
            terme: "Messages échangés dans la messagerie interne.",
            texte:
              "Lorsque vous utilisez la messagerie d’équipe, le contenu de vos messages et votre statut de présence.",
          },
          {
            terme: "Journaux techniques et données de connexion.",
            texte:
              "Adresse IP, horodatage, type de navigateur, pages consultées et événements techniques (erreurs, exécutions), aux fins de sécurité et de fonctionnement du Service.",
          },
        ],
      },
    ],
  },
  {
    titre: "Fins auxquelles nous utilisons ces renseignements",
    blocs: [
      "Nous utilisons vos renseignements aux seules fins suivantes :",
      {
        liste: [
          {
            terme: "Fournir le Service :",
            texte:
              "authentifier votre compte, exécuter les tâches que vous demandez, diffuser les journaux et vous remettre les résultats.",
          },
          {
            terme: "Assistance de planification par IA :",
            texte:
              "traiter vos saisies dans le chat de planification, au moyen d’un modèle auto-hébergé, pour vous proposer des plans de tâche.",
          },
          {
            terme: "Facturation :",
            texte:
              "établir vos achats de crédits, traiter les paiements et prévenir la fraude.",
          },
          {
            terme: "Soutien et communications de service :",
            texte:
              "répondre à vos demandes et vous transmettre des avis essentiels (confirmations, réinitialisation de mot de passe, alertes de sécurité, changements importants au Service). Ces messages transactionnels ne sont pas des communications commerciales.",
          },
          {
            terme: "Sécurité et intégrité :",
            texte:
              "détecter les abus, prévenir les incidents et protéger le Service et ses utilisateurs.",
          },
          {
            terme: "Amélioration du Service :",
            texte:
              "à des fins d’analyse interne, sur la base de renseignements agrégés ou dépersonnalisés lorsque cela est possible.",
          },
        ],
      },
      "Nous n’utilisons pas vos fichiers ni vos résultats pour entraîner des modèles ni à des fins de profilage publicitaire. Le modèle d’IA utilisé pour l’assistant de planification étant auto-hébergé, vos échanges ne servent pas non plus à entraîner des modèles d’un tiers. Nous ne réutilisons aucun renseignement à une fin incompatible avec celles ci-dessus sans votre consentement.",
      <>
        <strong className="font-semibold text-white">
          Traitement automatisé.
        </strong>{" "}
        L’assistant de planification vous suggère des plans, mais les décisions
        concernant l’exécution vous appartiennent : aucune décision produisant
        des effets sur vous n’est prise sur le seul fondement d’un traitement
        automatisé.
      </>,
    ],
  },
  {
    titre: "Fondement du traitement et consentement",
    blocs: [
      "Nous traitons vos renseignements sur les fondements suivants :",
      {
        liste: [
          {
            terme: "Exécution du contrat :",
            texte:
              "les renseignements nécessaires pour vous fournir le Service que vous avez demandé (compte, exécution des tâches, facturation).",
          },
          {
            terme: "Consentement :",
            texte:
              "pour tout traitement qui va au-delà de ce qui est nécessaire à la fourniture du Service. Ce consentement est demandé de manière distincte, en termes clairs et simples, pour chaque fin.",
          },
          {
            terme: "Obligations légales et intérêt légitime :",
            texte:
              "sécurité, prévention de la fraude et conservation exigée par la loi.",
          },
        ],
      },
      "Vous pouvez retirer votre consentement en tout temps pour les traitements qui reposent sur celui-ci (voir section 8). Le retrait n’a pas d’effet rétroactif et peut, selon le cas, limiter votre accès à certaines fonctionnalités.",
    ],
  },
  {
    titre: "Communication à des tiers",
    blocs: [
      "Nous ne vendons aucun renseignement personnel.",
      "Une part importante de notre infrastructure est auto-hébergée par Cloud Paradise (hébergement applicatif, base de données, stockage des fichiers, envoi des courriels de service et modèle d’intelligence artificielle). Ces traitements ne font donc pas intervenir de fournisseur tiers.",
      "Nous faisons appel à un nombre limité de sous-traitants (fournisseurs de services) qui traitent des renseignements pour notre compte, uniquement selon nos instructions et sous des engagements de confidentialité et de sécurité :",
      {
        liste: [
          {
            terme: "Paiement — PayPal.",
            texte:
              "Le traitement des paiements pour l’achat de crédits est confié à PayPal. Les renseignements de carte ou de compte de paiement sont saisis et traités directement par PayPal ; nous en recevons uniquement la confirmation de la transaction.",
          },
          {
            terme: "Hébergement physique de l’infrastructure.",
            texte:
              "Nos serveurs sont exploités par Cloud Paradise directement, dans nos propres locaux d’affaires situés au 238, 1ère Avenue Ouest, Amos (Québec) — aucun centre de données tiers n’intervient.",
          },
        ],
      },
      "Pour éviter toute ambiguïté :",
      {
        liste: [
          {
            terme: "Assistant de planification par IA :",
            texte:
              "le modèle est auto-hébergé sur nos serveurs. Le contenu que vous y saisissez n’est communiqué à aucun tiers (notamment pas à OpenAI).",
          },
          {
            terme: "Courriel transactionnel :",
            texte:
              "les courriels de service (confirmations, réinitialisations, alertes) sont envoyés au moyen de notre propre serveur de messagerie, sans recourir à un service d’envoi tiers.",
          },
          {
            terme: "Hébergement et stockage des fichiers :",
            texte:
              "la base de données et les fichiers sont hébergés sur notre propre infrastructure (stockage objet auto-hébergé), et non chez un fournisseur infonuagique tiers.",
          },
          {
            terme: "Mesure d’audience :",
            texte:
              "nous utilisons Matomo, un outil de mesure d’audience auto-hébergé sur notre propre infrastructure — aucune donnée de navigation n’est communiquée à un tiers (notamment pas à Google Analytics). Le suivi ne démarre qu’après votre consentement explicite (voir la section 6).",
          },
        ],
      },
      "Nous pouvons aussi communiquer des renseignements lorsque la loi l’exige, pour répondre à une demande légale valide, ou pour protéger nos droits, notre sécurité et ceux de nos utilisateurs.",
    ],
  },
  {
    titre: "Hébergement et localisation des données",
    blocs: [
      "Vos renseignements (compte, base de données, fichiers, résultats de tâches) et le traitement par l’assistant d’IA sont hébergés sur l’infrastructure exploitée par Cloud Paradise, située à Amos (Québec), Canada.",
      "À la différence d’un modèle reposant sur des services infonuagiques externes, la très grande majorité des traitements se déroule sur notre propre infrastructure et ne fait pas l’objet d’une communication hors Québec. C’est aussi le cas des données de mesure d’audience (Matomo), hébergées sur cette même infrastructure.",
      "La seule communication susceptible d’entraîner un traitement hors Québec est le traitement des paiements par PayPal. La Loi 25 exige, avant toute communication de renseignements personnels hors Québec, une évaluation des facteurs relatifs à la vie privée afin de vérifier que les renseignements bénéficieront d’une protection adéquate. Cette évaluation est en cours pour PayPal, et la communication est encadrée par les conditions applicables de ce prestataire en attendant sa finalisation.",
    ],
  },
  {
    titre: "Témoins (cookies) et traceurs",
    blocs: [
      "Nous utilisons des témoins strictement nécessaires au fonctionnement du Service, notamment pour maintenir votre session une fois connecté et pour la sécurité. Ces témoins ne peuvent pas être désactivés sans empêcher le Service de fonctionner.",
      {
        liste: [
          {
            terme: "Mesure d’audience — Matomo.",
            texte:
              "Nous utilisons Matomo, auto-hébergé sur notre propre infrastructure, pour savoir quelles pages sont consultées, en quel nombre, et quels liens sortants sont cliqués. Aucune donnée n’est transmise à un service tiers (notamment pas à Google Analytics), et ces renseignements ne servent à aucune fin publicitaire.",
          },
        ],
      },
      "Ce suivi ne démarre qu’après que vous ayez cliqué « Accepter » dans la bannière affichée à votre première visite. Si vous cliquez « Refuser », ou si vous ne faites aucun choix, aucun témoin de mesure d’audience n’est déposé. Vous pouvez changer d’avis en tout temps en effaçant les données de navigation stockées pour ce site depuis les paramètres de votre navigateur, ce qui réaffichera la bannière.",
    ],
  },
  {
    titre: "Conservation des données",
    blocs: [
      "Nous ne conservons vos renseignements que le temps nécessaire aux fins pour lesquelles ils ont été recueillis, ou pour la durée exigée par la loi.",
      {
        liste: [
          {
            terme: "Fichiers déposés et résultats de tâches :",
            texte:
              "conservés dans votre espace de travail jusqu’à ce que vous les supprimiez. Les fichiers que vous téléversez ne sont pas effacés une fois la tâche terminée : ils demeurent chez vous au même titre que les résultats. Vous pouvez les supprimer en tout temps ; ils sont alors détruits de nos systèmes de stockage. Cette conservation connaît une limite : après 1 an d’inactivité du compte, ils sont supprimés automatiquement.",
          },
          {
            terme: "Suppression de votre compte :",
            texte:
              "lorsque vous demandez la suppression de votre compte, un délai de grâce de 30 jours s’ouvre. Pendant ces 30 jours, vous pouvez annuler votre demande et retrouver votre compte intact. Ce délai porte sur l’ensemble du compte : vos fichiers, vos résultats et vos renseignements de compte.",
          },
          {
            terme: "Purge définitive :",
            texte:
              "à l’expiration de ces 30 jours, tous vos fichiers et toutes les données de votre compte sont purgés définitivement. Seules vos factures sont conservées au-delà.",
          },
          {
            terme: "Factures :",
            texte:
              "conservées six (6) ans, seule exception à la purge, pour répondre aux obligations fiscales et comptables.",
          },
          {
            terme: "Journaux techniques :",
            texte: "conservés 12 mois à des fins de sécurité et de dépannage.",
          },
        ],
      },
      "À l’expiration des délais applicables, les renseignements sont détruits de façon sécuritaire ou anonymisés de manière irréversible.",
    ],
  },
  {
    titre: "Vos droits",
    blocs: [
      "Sous réserve des conditions prévues par la Loi 25, vous pouvez exercer les droits suivants :",
      {
        liste: [
          {
            terme: "Accès :",
            texte:
              "obtenir une copie des renseignements personnels que nous détenons à votre sujet.",
          },
          {
            terme: "Rectification :",
            texte:
              "faire corriger des renseignements inexacts, incomplets ou équivoques.",
          },
          {
            terme: "Retrait du consentement :",
            texte:
              "retirer un consentement précédemment donné, pour les traitements qui en dépendent.",
          },
          {
            terme: "Portabilité :",
            texte:
              "obtenir, dans un format technologique structuré et couramment utilisé, les renseignements informatisés que vous nous avez fournis (voir Paramètres → Compte → Exporter mes données).",
          },
          {
            terme: "Désindexation / cessation de diffusion :",
            texte:
              "demander la cessation de la diffusion d’un renseignement ou la désindexation d’un hyperlien dans les cas prévus par la loi.",
          },
        ],
      },
      "Pour exercer l’un de ces droits, communiquez avec le responsable de la protection des renseignements personnels (section 10). Nous répondons dans un délai de 30 jours suivant la réception de votre demande.",
    ],
  },
  {
    titre: "Sécurité",
    blocs: [
      "Nous mettons en place des mesures de sécurité raisonnables, adaptées à la sensibilité des renseignements, notamment :",
      {
        liste: [
          { texte: "le chiffrement en transit des communications (HTTPS/TLS) ;" },
          {
            texte:
              "le chiffrement au repos de la base de données et du stockage objet (disque chiffré) ;",
          },
          {
            texte:
              "le hachage des mots de passe au moyen de l’algorithme bcrypt (aucun mot de passe conservé en clair) ;",
          },
          {
            texte:
              "le contrôle des accès selon le principe du moindre privilège, un système de rôles et de permissions, et la journalisation des accès.",
          },
        ],
      },
      <>
        <strong className="font-semibold text-white">
          Incident de confidentialité.
        </strong>{" "}
        En cas d’incident présentant un risque de préjudice sérieux, nous
        prenons les mesures raisonnables pour le limiter, nous avisons la
        Commission d’accès à l’information du Québec ainsi que les personnes
        concernées et nous consignons l’incident dans un registre, conformément
        à la Loi 25.
      </>,
    ],
  },
  {
    titre: "Responsable de la protection des renseignements personnels",
    blocs: [
      "Conformément à la Loi 25, nous avons désigné un responsable de la protection des renseignements personnels, chargé de veiller au respect de la présente politique et de traiter vos demandes.",
      {
        liste: [
          { terme: "Responsable :", texte: RESPONSABLE },
          {
            terme: "Courriel :",
            texte: (
              <a href={`mailto:${COURRIEL_RESPONSABLE}`}>
                {COURRIEL_RESPONSABLE}
              </a>
            ),
          },
          { terme: "Adresse :", texte: ADRESSE_LIGNE },
        ],
      },
    ],
  },
  {
    titre: "Modifications de la politique",
    blocs: [
      "Nous pouvons modifier la présente politique afin de refléter l’évolution du Service ou de nos obligations légales. La date de « Dernière mise à jour » indique la version en vigueur. En cas de changement important, nous vous en informons par un moyen raisonnable (avis dans le Service ou courriel) avant son entrée en vigueur.",
    ],
  },
  {
    titre: "Nous joindre et recours",
    blocs: [
      <>
        Pour toute question relative à la présente politique ou à vos
        renseignements personnels, communiquez avec notre responsable (section
        10) ou visitez notre{" "}
        <Link href="/contact">
          page Contact
        </Link>
        .
      </>,
      <>
        Si vous estimez que nous n’avons pas répondu adéquatement à vos
        préoccupations, vous pouvez porter plainte auprès de la Commission
        d’accès à l’information du Québec :{" "}
        <a
          href="https://www.cai.gouv.qc.ca"
          target="_blank"
          rel="noopener noreferrer"
        >
          cai.gouv.qc.ca
        </a>
        {"."}
      </>,
    ],
  },
];

/** Référence stable, calculée au module : `AncresSections` en dépend par effet. */
const ANCRES = ancresDe(SECTIONS);

export default function ConfidentialitePage() {
  return (
    // `data-page-sobre` éteint la lueur haute du fond — voir /conditions.
    <section className="relative" data-page-sobre>
      <HreflangLinks fr="/confidentialite" en="/en/privacy" />
      <BreadcrumbJsonLd
        items={[
          { nom: "Accueil", chemin: "/" },
          { nom: "Politique de confidentialité", chemin: "/confidentialite" },
        ]}
      />
      <div className={`${SHELL} ${SECTION_Y}`}>
        <div className={CONTENEUR_LEGAL}>
          <PageEntete eyebrow="Légal" titre="Politique de confidentialité" />
          {/* Métadonnée du document — voir /conditions pour le même traitement. */}
          <p className={`${LECTURE} mt-3 text-[13px] text-white/70`}>
            Dernière mise à jour : {MAJ}
          </p>

          <div className={GABARIT_LEGAL}>
            <div className="lg:col-start-2 lg:row-start-1">
              <AncresSections
                ancres={ANCRES}
                disposition="colonne"
                titre="Sommaire"
              />
            </div>

            {/* Pas de `Reveal` ici : son repli de sécurité remplace le
                `motion.div` par un `div` nu au bout d'1,5 s, ce qui remonte tout
                le sous-arbre — l'`IntersectionObserver` du sommaire gardait
                alors les anciens nœuds et ne suivait plus le défilement. */}
            <div className="min-w-0 lg:col-start-1 lg:row-start-1">
              {/* Chapeau du document : hors numérotation, donc hors sommaire,
                  mais au même corps de texte que les sections. */}
              <div className="prose-legal space-y-4 text-base leading-[1.7] text-white/85">
                <p>
                  La présente politique décrit comment Cloud Paradise
                  («&nbsp;Cloud Paradise&nbsp;», «&nbsp;nous&nbsp;») recueille,
                  utilise, communique et protège les renseignements personnels
                  des personnes qui utilisent sa plateforme de calcul (le
                  «&nbsp;Service&nbsp;»). Elle s’applique au site, à
                  l’application et à toute fonctionnalité qui y est rattachée.
                </p>
                <p>
                  Cloud Paradise est une entreprise établie au Québec et est
                  assujettie à la Loi sur la protection des renseignements
                  personnels dans le secteur privé telle que modifiée par la
                  Loi 25.
                </p>
                <p>
                  Responsable du traitement : {DENOMINATION_LEGALE}, faisant
                  affaires au {ADRESSE_LIGNE}.
                </p>
              </div>

              <div className="mt-14">
                <SectionsRedigees sections={SECTIONS} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
