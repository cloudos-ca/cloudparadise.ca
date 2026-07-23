import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";
import { HreflangLinks } from "@/components/marketing/HreflangLinks";
import { PageEntete } from "@/components/marketing/PageEntete";
import { Reveal } from "@/components/marketing/Reveal";
import {
  SectionsRedigees,
  type SectionRedigee,
} from "@/components/marketing/legal";
import {
  ADRESSE,
  COURRIEL,
  TELEPHONE,
  TELEPHONE_LIEN,
} from "@/components/marketing/coordonnees";
import { GrilleTarifaireLegale } from "@/components/marketing/GrilleTarifaireLegale";
import { ListeNumerotee } from "@/components/marketing/ListeNumerotee";
import { LECTURE, SECTION_Y, SHELL } from "@/components/marketing/tokens";
import { alternatesBilingues, openGraphPage } from "@/lib/seo";

const TITRE = "Conditions d’utilisation — Cloud Paradise";
const DESCRIPTION =
  "Conditions d’utilisation de Cloud Paradise : compte, crédits et tarification, utilisation acceptable, propriété du contenu, garanties et droit applicable.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  robots: { index: true, follow: true },
  alternates: alternatesBilingues("/conditions", "/en/conditions", "fr"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "fr", ["/opengraph-image"]),
};

const MAJ = "22 juillet 2026";
const VERSION = "1.0";

const ADRESSE_LIGNE = ADRESSE.join(", ");

const SECTIONS: readonly SectionRedigee[] = [
  {
    titre: "Qui nous sommes",
    blocs: [
      <>
        Le service « Cloud Paradise » (le « <strong className="font-medium text-[#dbe6fb]">Service</strong> », la
        « <strong className="font-medium text-[#dbe6fb]">Plateforme</strong> ») est exploité par Cloud Paradise
        (« <strong className="font-medium text-[#dbe6fb]">Cloud Paradise</strong> », « nous », « notre », « nos »),
        dont l’établissement est situé au :
      </>,
      {
        brut: (
          <blockquote className="border-l-2 border-white/15 pl-4 text-[#93a3c2]">
            <p>Cloud Paradise</p>
            <p>{ADRESSE_LIGNE}</p>
            <p>Canada</p>
            <p className="mt-2">
              Courriel :{" "}
              <a
                href={`mailto:${COURRIEL}`}
                className="underline underline-offset-2 transition-colors hover:text-[#eef4ff]"
              >
                {COURRIEL}
              </a>
            </p>
            <p>
              Téléphone :{" "}
              <a
                href={`tel:${TELEPHONE_LIEN}`}
                className="underline underline-offset-2 transition-colors hover:text-[#eef4ff]"
              >
                {TELEPHONE}
              </a>
            </p>
          </blockquote>
        ),
      },
    ],
  },
  {
    titre: "Objet et acceptation des conditions",
    blocs: [
      <>
        Les présentes conditions d’utilisation (les « Conditions ») encadrent votre accès au Service et
        son utilisation. En créant un compte, en accédant au Service ou en l’utilisant, vous reconnaissez
        avoir lu, compris et accepté d’être lié par les présentes Conditions ainsi que par notre{" "}
        <Link
          href="/confidentialite"
          className="underline underline-offset-2 transition-colors hover:text-[#eef4ff]"
        >
          Politique de confidentialité
        </Link>
        .
      </>,
      "Si vous utilisez le Service pour le compte d’une entreprise ou d’une autre entité, vous déclarez avoir l’autorité nécessaire pour lier cette entité aux présentes Conditions, et les termes « vous » et « votre » désignent alors cette entité.",
      "Si vous n’acceptez pas les présentes Conditions, vous ne devez pas utiliser le Service.",
    ],
  },
  {
    titre: "Définitions",
    blocs: [
      {
        liste: [
          {
            terme: "Compte :",
            texte:
              "l’espace personnel créé lors de votre inscription, protégé par un mot de passe et par une authentification à deux facteurs.",
          },
          {
            terme: "Contenu utilisateur :",
            texte:
              "tout fichier, jeu de données, URL, texte, instruction ou autre donnée que vous téléversez, saisissez ou soumettez au Service.",
          },
          {
            terme: "Traitement (ou « Plan ») :",
            texte:
              "une tâche que vous décrivez (en langage naturel ou au moyen d’un gabarit paramétré) et que la Plateforme achemine vers le moteur de calcul approprié.",
          },
          {
            terme: "Job :",
            texte: "une exécution d’un Traitement sur notre infrastructure de calcul.",
          },
          {
            terme: "Résultat :",
            texte: "les fichiers ou données produits par un Job.",
          },
          {
            terme: "Crédits :",
            texte:
              "l’unité de prépaiement permettant de payer l’exécution des Traitements (voir l’article 6).",
          },
          {
            terme: "Équipe :",
            texte:
              "un espace de collaboration permettant de partager des fichiers et des Traitements avec d’autres utilisateurs.",
          },
        ],
      },
    ],
  },
  {
    titre: "Description du Service",
    blocs: [
      "Cloud Paradise est une plateforme infonuagique qui transforme une demande — formulée en langage naturel ou au moyen d’un gabarit — en un traitement exécuté sur du matériel de calcul dédié (GPU, CPU à haute capacité, mémoire vive massive). Le Service comprend notamment :",
      {
        liste: [
          { texte: "le traitement de documents (conversion, OCR, traduction, classement, publipostage, archivage) ;" },
          { texte: "le traitement et la génération d’images ;" },
          { texte: "le traitement de données massives et l’interrogation de jeux de données ;" },
          { texte: "l’encodage et la conversion de médias audio et vidéo, la transcription et le sous-titrage ;" },
          { texte: "le calcul GPU / CUDA et la simulation ;" },
          { texte: "le rendu 3D ;" },
          { texte: "l’extraction de données web guidée (« web scraping ») ;" },
          { texte: "la planification et la récurrence de ces traitements." },
        ],
      },
      "Un agent d’orchestration fondé sur l’intelligence artificielle sert à comprendre l’intention d’une demande et à sélectionner le moteur d’exécution approprié ; le calcul final est effectué par des moteurs déterministes dédiés. Vous reconnaissez que le catalogue de fonctionnalités, les moteurs disponibles et la capacité de calcul peuvent évoluer dans le temps.",
    ],
  },
  {
    titre: "Compte, admissibilité et sécurité",
    blocs: [
      {
        liste: [
          {
            terme: "Admissibilité.",
            texte:
              "Vous devez être âgé d’au moins 18 ans, ou avoir l’âge de la majorité dans votre lieu de résidence, et avoir la capacité juridique de conclure un contrat pour utiliser le Service.",
          },
          {
            terme: "Création de compte.",
            texte:
              "L’inscription requiert un nom, une adresse de courriel valide et un mot de passe. Vous devez fournir des renseignements exacts et les tenir à jour. Votre adresse de courriel doit être vérifiée avant la première connexion.",
          },
          {
            terme: "Authentification à deux facteurs.",
            texte:
              "L’accès au compte est protégé par une authentification à deux facteurs : après la saisie de votre mot de passe, un code à usage unique vous est transmis par courriel. Vous êtes responsable de conserver l’accès à la boîte de courriel associée à votre compte.",
          },
          {
            terme: "Sécurité des identifiants.",
            texte: (
              <>
                Vous êtes responsable de la confidentialité de votre mot de passe et de toute activité
                effectuée au moyen de votre compte. Vous vous engagez à nous aviser sans délai à{" "}
                <a
                  href={`mailto:${COURRIEL}`}
                  className="underline underline-offset-2 transition-colors hover:text-[#eef4ff]"
                >
                  {COURRIEL}
                </a>{" "}
                de toute utilisation non autorisée ou de toute atteinte présumée à la sécurité de votre
                compte.
              </>
            ),
          },
          {
            terme: "Un compte par personne.",
            texte:
              "Vous ne pouvez pas partager vos identifiants ni céder votre compte sans notre autorisation écrite préalable. Pour collaborer, utilisez plutôt les Équipes (article 9).",
          },
        ],
      },
    ],
  },
  {
    titre: "Crédits, tarification et facturation",
    blocs: [
      {
        liste: [
          {
            terme: "Modèle « à l’usage ».",
            texte:
              "Le Service fonctionne par crédits prépayés. 1 crédit équivaut à 1 dollar canadien (CAD). Chaque Traitement consomme un nombre de crédits selon le type de moteur utilisé.",
          },
          {
            terme: "Crédits offerts à l’inscription.",
            texte:
              "Un montant de bienvenue en crédits (actuellement l’équivalent de 10 $ CAD) peut être offert à la création du compte, sans carte de crédit requise. Ce montant est promotionnel, sans valeur monétaire, non remboursable et non transférable ; il peut être modifié ou retiré en tout temps.",
          },
        ],
      },
      <>
        <strong className="font-medium text-[#dbe6fb]">Prix des traitements.</strong> Le prix de chaque
        type de traitement est affiché dans le Service et sur notre site avant l’exécution. À titre
        indicatif seulement, et sous réserve de modification, les tarifs par exécution sont de l’ordre
        de :
      </>,
      { brut: <GrilleTarifaireLegale lang="fr" /> },
      "Les prix en vigueur sont ceux affichés dans le Service au moment où vous soumettez un Traitement.",
      {
        liste: [
          {
            terme: "Débit des crédits.",
            texte:
              "Les crédits sont débités de votre solde au lancement d’un Job. Un Job qui échoue en raison d’une défaillance de notre infrastructure ne devrait pas vous être facturé ; toutefois, un Job qui échoue en raison d’un Contenu utilisateur invalide, d’instructions erronées ou d’un résultat que vous jugez insatisfaisant demeure facturable, car la capacité de calcul a été consommée.",
          },
          {
            terme: "Recharge de crédits.",
            texte:
              "L’achat de crédits supplémentaires s’effectue au moyen des modes de paiement offerts dans le Service (notamment PayPal). Les paiements sont traités par des prestataires tiers, selon leurs propres conditions ; nous ne stockons pas les données complètes de vos instruments de paiement.",
          },
          {
            terme: "Remboursements.",
            texte: (
              <>
                Sauf disposition contraire prévue par la loi applicable — notamment la{" "}
                <em>Loi sur la protection du consommateur</em> du Québec — les crédits achetés ne sont pas
                remboursables une fois consommés. Les crédits non utilisés peuvent faire l’objet d’un
                remboursement à notre discrétion ou lorsque la loi l’exige. Pour toute demande, écrivez à{" "}
                <a
                  href={`mailto:${COURRIEL}`}
                  className="underline underline-offset-2 transition-colors hover:text-[#eef4ff]"
                >
                  {COURRIEL}
                </a>
                .
              </>
            ),
          },
          {
            terme: "Taxes.",
            texte:
              "Les prix affichés peuvent être exclusifs des taxes applicables (TPS/TVQ). Les taxes requises seront ajoutées le cas échéant.",
          },
        ],
      },
    ],
  },
  {
    titre: "Utilisation acceptable",
    blocs: [
      "Vous vous engagez à utiliser le Service dans le respect des lois applicables et des présentes Conditions. Il vous est notamment interdit de :",
      {
        brut: (
          <ListeNumerotee
            items={[
              "téléverser, traiter ou diffuser un contenu illégal, diffamatoire, haineux, ou qui porte atteinte aux droits d’autrui (y compris les droits de propriété intellectuelle et à la vie privée) ;",
              "traiter du matériel pour lequel vous ne détenez pas les droits ou les autorisations nécessaires ;",
              "utiliser le Service pour créer, distribuer ou héberger des logiciels malveillants, ou pour porter atteinte à la sécurité de tout système ;",
              "tenter d’exécuter du code arbitraire, d’accéder à des ressources internes de notre infrastructure, de contourner les listes blanches d’opérations, les restrictions des agents de traitement ou les protections de la Plateforme ;",
              "utiliser la fonction d’extraction web (« scraping ») pour accéder à des ressources sans y être autorisé, contourner des mesures d’accès, ignorer les directives d’un site (par exemple robots.txt), ou viser des systèmes internes ou privés. La fonction applique des protections (validation de l’adresse résolue, restriction au même domaine, respect de robots.txt) que vous ne devez pas tenter de déjouer ;",
              "surcharger, perturber ou tester la charge de l’infrastructure d’une manière non autorisée (par exemple, automatisation abusive, soumission massive destinée à saturer la file d’attente) ;",
              "revendre, sous-licencier ou revendiquer le Service comme le vôtre sans autorisation ;",
              "utiliser le Service pour toute activité frauduleuse ou en violation de droits de tiers.",
            ]}
          />
        ),
      },
      "Nous nous réservons le droit de refuser, d’interrompre ou de supprimer tout Traitement ou Contenu utilisateur qui contreviendrait au présent article, et de suspendre les comptes concernés (article 13).",
    ],
  },
  {
    titre: "Contenu utilisateur",
    blocs: [
      {
        liste: [
          {
            terme: "Propriété.",
            texte:
              "Vous conservez tous vos droits de propriété sur votre Contenu utilisateur et sur les Résultats qui en découlent. Cloud Paradise ne revendique aucun droit de propriété sur votre Contenu utilisateur.",
          },
          {
            terme: "Licence limitée que vous nous accordez.",
            texte:
              "Vous nous accordez une licence non exclusive, limitée et révocable d’héberger, de stocker, de copier, de transmettre et de traiter votre Contenu utilisateur, uniquement dans la mesure nécessaire pour exploiter le Service, exécuter les Traitements que vous demandez, vous livrer les Résultats et assurer la sécurité et la maintenance de la Plateforme. Cette licence prend fin lorsque vous supprimez le contenu concerné, sous réserve des copies de sauvegarde temporaires et des obligations légales de conservation.",
          },
          {
            terme: "Vos responsabilités.",
            texte:
              "Vous déclarez et garantissez que vous détenez les droits nécessaires sur votre Contenu utilisateur et que son traitement par le Service ne viole aucune loi ni aucun droit de tiers. Vous êtes seul responsable de votre Contenu utilisateur, de vos instructions et des Résultats que vous choisissez d’utiliser.",
          },
          {
            terme: "Sauvegarde.",
            texte:
              "Vous êtes responsable de conserver vos propres copies de votre Contenu utilisateur. Bien que nous prenions des mesures raisonnables pour préserver les données, le Service n’est pas un service de sauvegarde et nous ne garantissons pas contre toute perte de données.",
          },
          {
            terme: "Liens de partage.",
            texte:
              "Certains Résultats peuvent être accessibles au moyen d’un lien de téléchargement transmis par courriel. Ce lien expire après un délai. Toute personne détenant un lien valide et non expiré peut accéder au Résultat correspondant ; il vous appartient de ne le partager qu’avec des destinataires de confiance.",
          },
        ],
      },
    ],
  },
  {
    titre: "Équipes et partage",
    blocs: [
      "Le Service permet de créer des Équipes et d’y inviter d’autres utilisateurs afin de partager des fichiers et des Traitements. Si vous êtes propriétaire d’une Équipe, vous êtes responsable de la gestion de ses membres et des invitations, et vous vous assurez que le partage de Contenu utilisateur au sein de l’Équipe respecte les droits applicables. Tout membre à qui du contenu est partagé doit respecter les présentes Conditions. Le retrait d’un membre ou la suppression d’une Équipe peut affecter son accès au contenu partagé.",
    ],
  },
  {
    titre: "Résultats, intelligence artificielle et absence de garantie de résultat",
    blocs: [
      "Le Service utilise un modèle d’intelligence artificielle pour interpréter vos demandes et pour paramétrer certains traitements. Vous reconnaissez que :",
      {
        liste: [
          {
            texte:
              "l’interprétation d’une demande en langage naturel peut être imparfaite ; il vous appartient de vérifier que le Traitement proposé correspond à votre intention avant de le soumettre ;",
          },
          {
            texte:
              "les moteurs de calcul produisent des résultats déterministes selon les paramètres fournis, mais nous ne garantissons pas que les Résultats seront exempts d’erreurs, exacts, complets ou adaptés à un usage particulier ;",
          },
          {
            texte:
              "vous êtes responsable de valider les Résultats avant de vous y fier, en particulier pour tout usage professionnel, financier, juridique ou critique ;",
          },
          {
            texte:
              "les modèles et paramètres peuvent évoluer, ce qui peut faire varier les Résultats d’une exécution à l’autre.",
          },
        ],
      },
    ],
  },
  {
    titre: "Disponibilité, capacité et maintenance",
    blocs: [
      "Nous nous efforçons d’assurer une bonne disponibilité du Service, mais celui-ci est fourni « tel quel » et « selon la disponibilité ». Vous reconnaissez notamment que :",
      {
        liste: [
          {
            texte:
              "la capacité de calcul peut être limitée ; selon la charge, un Job peut être mis en file d’attente et s’exécuter avec un délai ;",
          },
          {
            texte:
              "des interruptions planifiées (maintenance) ou imprévues (pannes, incidents) peuvent survenir ;",
          },
          {
            texte:
              "nous pouvons modifier, suspendre ou interrompre tout ou partie du Service, ainsi que les moteurs et fonctionnalités offerts, moyennant, dans la mesure du raisonnable, un préavis pour les changements importants.",
          },
        ],
      },
    ],
  },
  {
    titre: "Propriété intellectuelle de Cloud Paradise",
    blocs: [
      "Le Service, son interface (« Cloud OS »), son code, sa conception, ses marques, ses logos et l’ensemble des éléments qui le composent (à l’exclusion de votre Contenu utilisateur) sont la propriété de Cloud Paradise ou de ses concédants et sont protégés par les lois applicables. Aucune disposition des présentes ne vous transfère de droit de propriété sur le Service. Vous bénéficiez uniquement d’un droit d’utilisation limité, non exclusif et non transférable, pour la durée de votre relation avec nous et dans le respect des présentes Conditions.",
    ],
  },
  {
    titre: "Suspension et résiliation",
    blocs: [
      {
        liste: [
          {
            terme: "Résiliation par vous.",
            texte: (
              <>
                Vous pouvez cesser d’utiliser le Service et demander la fermeture de votre compte en tout
                temps en nous écrivant à{" "}
                <a
                  href={`mailto:${COURRIEL}`}
                  className="underline underline-offset-2 transition-colors hover:text-[#eef4ff]"
                >
                  {COURRIEL}
                </a>
                .
              </>
            ),
          },
          {
            terme: "Suspension ou résiliation par nous.",
            texte:
              "Nous pouvons suspendre ou désactiver votre compte, en tout ou en partie, immédiatement et sans préavis, si nous avons des motifs raisonnables de croire que vous avez enfreint les présentes Conditions, que votre utilisation présente un risque pour le Service, pour d’autres utilisateurs ou pour des tiers, ou lorsque la loi l’exige.",
          },
          {
            terme: "Effets de la résiliation.",
            texte:
              "À la fermeture du compte, votre accès au Service cesse et votre Contenu utilisateur peut être supprimé, sous réserve des obligations légales de conservation et des sauvegardes techniques temporaires. Les crédits non utilisés d’un compte fermé pour cause de violation des Conditions peuvent être perdus, dans la mesure permise par la loi. Les articles qui, par leur nature, doivent survivre à la résiliation (notamment les articles 8.3, 12, 14, 15, 16 et 18) demeurent en vigueur.",
          },
        ],
      },
    ],
  },
  {
    titre: "Exclusion de garanties",
    blocs: [
      "Dans la mesure maximale permise par la loi applicable, le Service est fourni « tel quel » et « selon la disponibilité », sans garantie d’aucune sorte, expresse ou implicite, y compris toute garantie implicite de qualité marchande, d’adéquation à un usage particulier, de titre ou d’absence de contrefaçon, ainsi que toute garantie de disponibilité continue, d’absence d’erreur ou de sécurité absolue.",
      <strong key="reserve" className="block font-medium text-[#dbe6fb]">
        Rien dans le présent article n’a pour effet d’exclure ou de limiter les garanties ou droits que
        la loi applicable, notamment la Loi sur la protection du consommateur du Québec, rend
        obligatoires et auxquels il ne peut être renoncé par contrat.
      </strong>,
    ],
  },
  {
    titre: "Limitation de responsabilité",
    blocs: [
      "Dans la mesure maximale permise par la loi applicable :",
      {
        liste: [
          {
            texte:
              "Cloud Paradise ne pourra être tenue responsable des dommages indirects, accessoires, spéciaux, punitifs ou consécutifs, ni de toute perte de profits, de revenus, de données, de clientèle ou d’occasions d’affaires, découlant de l’utilisation ou de l’impossibilité d’utiliser le Service ;",
          },
          {
            texte:
              "la responsabilité totale et cumulative de Cloud Paradise, pour toute réclamation liée au Service, ne pourra excéder le plus élevé des montants suivants : (a) le total des sommes que vous nous avez effectivement versées au cours des douze (12) mois précédant l’événement à l’origine de la réclamation, ou (b) cent dollars canadiens (100 $ CAD).",
          },
        ],
      },
      <strong key="reserve" className="block font-medium text-[#dbe6fb]">
        Ces limitations ne s’appliquent pas dans la mesure où elles seraient interdites par la loi
        applicable, notamment à l’égard d’un consommateur au sens de la Loi sur la protection du
        consommateur du Québec.
      </strong>,
    ],
  },
  {
    titre: "Indemnisation",
    blocs: [
      "Sous réserve des lois applicables, vous acceptez d’indemniser et de dégager de toute responsabilité Cloud Paradise et ses représentants à l’égard de toute réclamation, perte ou dépense (y compris des frais juridiques raisonnables) découlant de : (a) votre Contenu utilisateur ; (b) votre utilisation du Service en violation des présentes Conditions ou de la loi ; ou (c) votre violation des droits d’un tiers.",
    ],
  },
  {
    titre: "Protection des renseignements personnels",
    blocs: [
      <>
        Le traitement de vos renseignements personnels est régi par notre{" "}
        <Link
          href="/confidentialite"
          className="underline underline-offset-2 transition-colors hover:text-[#eef4ff]"
        >
          Politique de confidentialité
        </Link>
        , conforme à la Loi sur la protection des renseignements personnels dans le secteur privé du
        Québec (« Loi 25 »). En utilisant le Service, vous reconnaissez avoir pris connaissance de cette
        politique. Pour toute question relative à vos renseignements personnels ou pour exercer vos
        droits (accès, rectification, retrait), écrivez à{" "}
        <a
          href={`mailto:${COURRIEL}`}
          className="underline underline-offset-2 transition-colors hover:text-[#eef4ff]"
        >
          {COURRIEL}
        </a>
        .
      </>,
    ],
  },
  {
    titre: "Droit applicable et juridiction",
    blocs: [
      "Les présentes Conditions sont régies par les lois en vigueur dans la province de Québec et par les lois du Canada qui y sont applicables, sans égard aux règles de conflits de lois.",
      "Sous réserve des droits impératifs d’un consommateur — notamment le droit d’intenter un recours devant le tribunal de son domicile prévu par la Loi sur la protection du consommateur —, tout litige relatif au Service ou aux présentes Conditions relèvera de la compétence exclusive des tribunaux du district judiciaire d’Abitibi (Amos), Québec, Canada.",
      <>
        Conformément à l’article 55 de la <em>Charte de la langue française</em>, les parties confirment
        leur volonté que les présentes Conditions soient rédigées en français.{" "}
        <em>The parties confirm their wish that these Terms be drawn up in French.</em>
      </>,
    ],
  },
  {
    titre: "Modifications des Conditions",
    blocs: [
      "Nous pouvons modifier les présentes Conditions de temps à autre. En cas de modification importante, nous vous en aviserons par un moyen raisonnable (par exemple par courriel ou par un avis dans le Service) avant sa prise d’effet. La date de « Dernière mise à jour » figurant en tête du document indique la version en vigueur. La poursuite de votre utilisation du Service après l’entrée en vigueur d’une modification vaut acceptation de celle-ci ; si vous n’êtes pas d’accord, vous devez cesser d’utiliser le Service.",
    ],
  },
  {
    titre: "Dispositions générales",
    blocs: [
      {
        liste: [
          {
            terme: "Intégralité de l’entente.",
            texte:
              "Les présentes Conditions, avec la Politique de confidentialité, constituent l’entente complète entre vous et Cloud Paradise relativement au Service.",
          },
          {
            terme: "Divisibilité.",
            texte:
              "Si une disposition est jugée invalide ou inapplicable, les autres dispositions demeurent pleinement en vigueur.",
          },
          {
            terme: "Absence de renonciation.",
            texte: "Le fait de ne pas exercer un droit ne constitue pas une renonciation à ce droit.",
          },
          {
            terme: "Cession.",
            texte:
              "Vous ne pouvez céder vos droits en vertu des présentes sans notre consentement écrit. Nous pouvons céder les nôtres dans le cadre d’une réorganisation, d’une fusion ou d’une vente d’actifs.",
          },
        ],
      },
    ],
  },
  {
    titre: "Nous joindre",
    blocs: [
      "Pour toute question relative aux présentes Conditions :",
      {
        brut: (
          <blockquote className="border-l-2 border-white/15 pl-4 text-[#93a3c2]">
            <p className="text-[#dbe6fb]">Cloud Paradise</p>
            <p>{ADRESSE_LIGNE}, Canada</p>
            <p className="mt-2">
              Courriel :{" "}
              <a
                href={`mailto:${COURRIEL}`}
                className="underline underline-offset-2 transition-colors hover:text-[#eef4ff]"
              >
                {COURRIEL}
              </a>
            </p>
            <p>
              Téléphone :{" "}
              <a
                href={`tel:${TELEPHONE_LIEN}`}
                className="underline underline-offset-2 transition-colors hover:text-[#eef4ff]"
              >
                {TELEPHONE}
              </a>
            </p>
          </blockquote>
        ),
      },
    ],
  },
];

export default function ConditionsPage() {
  return (
    <section className="relative">
      <HreflangLinks fr="/conditions" en="/en/conditions" />
      <BreadcrumbJsonLd
        items={[
          { nom: "Accueil", chemin: "/" },
          { nom: "Conditions d’utilisation", chemin: "/conditions" },
        ]}
      />
      <div className={`${SHELL} ${SECTION_Y}`}>
        <PageEntete
          eyebrow="Légal"
          titre="Conditions d’utilisation"
          soustitre={`Dernière mise à jour : ${MAJ} — version ${VERSION}`}
        />

        <Reveal delay={0.1} className={`${LECTURE} mt-8`}>
          <SectionsRedigees sections={SECTIONS} />
        </Reveal>
      </div>
    </section>
  );
}
