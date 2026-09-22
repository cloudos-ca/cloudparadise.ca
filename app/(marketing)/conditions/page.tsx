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
  COURRIEL,
  TELEPHONE,
  TELEPHONE_LIEN,
} from "@/components/marketing/coordonnees";
import { ListeNumerotee } from "@/components/marketing/ListeNumerotee";
import { LECTURE, SECTION_Y, SHELL } from "@/components/marketing/tokens";
import {
  DUREES,
  ESSAI_JOURS,
  GARANTIE_DUREE_MIN,
  GARANTIE_JOURS,
  PALIERS,
  enDevise,
} from "@/components/marketing/offre";
import {
  alternatesBilingues,
  IMAGE_OG_PARTAGEE,
  openGraphPage,
  ROBOTS,
} from "@/lib/seo";

/** « 12 ou 24 » — les seules durées d’engagement qui ouvrent droit à la
 * garantie de l’article « Forfaits, enveloppe et jauge », dérivées de
 * `DUREES` plutôt que réécrites en toutes lettres. */
function dureesGarantie(): string {
  const mois = DUREES.filter((d) => d.mois >= GARANTIE_DUREE_MIN).map((d) => String(d.mois));
  if (mois.length <= 1) return mois.join("");
  return `${mois.slice(0, -1).join(", ")} ou ${mois[mois.length - 1]}`;
}

const TITRE = "Conditions d’utilisation — Cloud OS";
const DESCRIPTION =
  "Conditions d’utilisation de Cloud OS : compte et abonnement, utilisation acceptable, propriété du contenu, garanties et droit applicable.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  robots: ROBOTS,
  alternates: alternatesBilingues("/conditions", "/en/terms", "fr"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "fr", "/conditions", [IMAGE_OG_PARTAGEE]),
};

const MAJ = "30 juillet 2026";
const VERSION = "1.0";

const ADRESSE_LIGNE = ADRESSE.join(", ");

const SECTIONS: readonly SectionRedigee[] = [
  {
    titre: "Qui nous sommes",
    blocs: [
      <>
        Le service « Cloud OS » (le « <strong className="font-semibold text-white">Service</strong> », la
        « <strong className="font-semibold text-white">Plateforme</strong> ») est exploité par Cloud OS
        (« <strong className="font-semibold text-white">Cloud OS</strong> », « nous », « notre », « nos »),
        dont l’établissement est situé au :
      </>,
      {
        brut: (
          <blockquote className="border-l-2 border-white/15 pl-4 text-white/85">
            <p>Cloud OS</p>
            <p>{ADRESSE_LIGNE}</p>
            <p>Canada</p>
            <p className="mt-2">
              Courriel :{" "}
              <a href={`mailto:${COURRIEL}`}>
                {COURRIEL}
              </a>
            </p>
            <p>
              Téléphone :{" "}
              <a href={`tel:${TELEPHONE_LIEN}`}>
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
        <Link href="/confidentialite">
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
      // « CPU à haute capacité, mémoire vive massive » : deux superlatifs non
      // quantifiés dans un document contractuel, que rien sur le site ne vient
      // borner. Remplacés par ce qui est vérifiable — du matériel dédié au
      // calcul — sans descendre au numéro de modèle, interdit par le plan de
      // contenu.
      "Cloud OS est une plateforme infonuagique qui transforme une demande — formulée en langage naturel ou au moyen d’un gabarit — en un traitement exécuté sur du matériel de calcul dédié (GPU, CPU et mémoire réservés au calcul). Le Service comprend notamment :",
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
                <a href={`mailto:${COURRIEL}`}>
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
              "Vous ne pouvez pas partager vos identifiants ni céder votre compte sans notre autorisation écrite préalable. Pour collaborer, utilisez plutôt les Équipes (voir l’article « Équipes et partage »).",
          },
        ],
      },
    ],
  },
  {
    titre: "Forfaits, enveloppe et jauge",
    blocs: [
      "Le Service est offert par abonnement mensuel à prix fixe, hors taxes, selon deux forfaits :",
      {
        liste: PALIERS.map((palier) => ({
          terme: `${palier.nom.fr} — ${enDevise(palier.prixMensuel)} par mois.`,
          texte: <>Inclus : {palier.inclusions.fr.join(", ")}.</>,
        })),
      },
      "Chaque forfait se renouvelle chaque mois, à la date de votre abonnement, au même prix. Ce qui reste de votre enveloppe à la fin du mois est reporté une fois sur le mois suivant, jusqu’à concurrence d’un mois complet ; au-delà de ce report, le surplus n’est pas cumulé.",
      "Une jauge en pourcentage indique votre consommation du mois en cours. Nous vous prévenons à 80 %. À 100 %, vous choisissez : attendre le renouvellement, ou ajouter immédiatement un mois d’enveloppe supplémentaire, au prix de votre forfait, sans que cela change votre abonnement ni sa date de renouvellement.",
      <>
        Au sein d’une Équipe (voir l’article « Équipes et partage »), chaque membre peut mettre son
        enveloppe en commun dans un pool partagé entre tous les membres de l’Équipe. On rejoint ou on
        quitte le pool à tout moment ; en le quittant, on reprend sa part de ce qui reste, calculée au
        prorata de ce qu’on y a mis.
      </>,
      "Vous pouvez mettre votre abonnement en pause pour une durée de un à trois mois : aucun montant n’est facturé pendant la pause, et votre enveloppe n’est pas perdue — elle vous attend à la reprise.",
      `Sur un engagement de ${dureesGarantie()} mois, vous bénéficiez d’une garantie de remboursement intégral de ${GARANTIE_JOURS} jours à compter de la souscription, une seule fois par compte.`,
      `Un essai gratuit de ${ESSAI_JOURS} jours, sans carte, vous permet d’utiliser le Service avant de vous engager.`,
      "Les prix affichés sont hors taxes. Les taxes canadiennes applicables, déterminées selon votre province, s’ajoutent au montant indiqué ; elles sont affichées avant le paiement et figurent sur la facture.",
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
      "Nous nous réservons le droit de refuser, d’interrompre ou de supprimer tout Traitement ou Contenu utilisateur qui contreviendrait au présent article, et de suspendre les comptes concernés (voir l’article « Suspension et résiliation »).",
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
              "Vous conservez tous vos droits de propriété sur votre Contenu utilisateur et sur les Résultats qui en découlent. Cloud OS ne revendique aucun droit de propriété sur votre Contenu utilisateur.",
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
    titre: "Propriété intellectuelle de Cloud OS",
    blocs: [
      "Le Service, son interface, son code, sa conception, ses marques, ses logos et l’ensemble des éléments qui le composent (à l’exclusion de votre Contenu utilisateur) sont la propriété de Cloud OS ou de ses concédants et sont protégés par les lois applicables. Aucune disposition des présentes ne vous transfère de droit de propriété sur le Service. Vous bénéficiez uniquement d’un droit d’utilisation limité, non exclusif et non transférable, pour la durée de votre relation avec nous et dans le respect des présentes Conditions.",
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
                Vous pouvez cesser d’utiliser le Service et demander la suppression de votre compte en
                tout temps, depuis le Service ou en nous écrivant à{" "}
                <a href={`mailto:${COURRIEL}`}>
                  {COURRIEL}
                </a>
                {". La demande ouvre un délai de grâce de 30 jours, pendant lequel vous pouvez l’annuler et retrouver votre compte intact."}
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
              "À l’expiration du délai de grâce de 30 jours, votre accès au Service cesse et l’ensemble de votre compte — Contenu utilisateur, Résultats et renseignements de compte — est purgé définitivement, sous réserve des sauvegardes techniques temporaires. Les factures sont conservées six (6) ans pour répondre aux obligations fiscales et comptables ; la politique de confidentialité détaille les durées applicables. Les dispositions qui, par leur nature, doivent survivre à la résiliation — notamment vos responsabilités quant au Contenu utilisateur (article « Contenu utilisateur »), ainsi que les articles « Propriété intellectuelle de Cloud OS », « Exclusion de garanties », « Limitation de responsabilité », « Indemnisation » et « Droit applicable et juridiction » — demeurent en vigueur.",
          },
        ],
      },
    ],
  },
  {
    titre: "Exclusion de garanties",
    blocs: [
      "Dans la mesure maximale permise par la loi applicable, le Service est fourni « tel quel » et « selon la disponibilité », sans garantie d’aucune sorte, expresse ou implicite, y compris toute garantie implicite de qualité marchande, d’adéquation à un usage particulier, de titre ou d’absence de contrefaçon, ainsi que toute garantie de disponibilité continue, d’absence d’erreur ou de sécurité absolue.",
      <strong key="reserve" className="block font-semibold text-white">
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
              "Cloud OS ne pourra être tenue responsable des dommages indirects, accessoires, spéciaux, punitifs ou consécutifs, ni de toute perte de profits, de revenus, de données, de clientèle ou d’occasions d’affaires, découlant de l’utilisation ou de l’impossibilité d’utiliser le Service ;",
          },
          {
            texte:
              "la responsabilité totale et cumulative de Cloud OS, pour toute réclamation liée au Service, ne pourra excéder le plus élevé des montants suivants : (a) le total des sommes que vous nous avez effectivement versées au cours des douze (12) mois précédant l’événement à l’origine de la réclamation, ou (b) cent dollars canadiens (100 $ CAD).",
          },
        ],
      },
      <strong key="reserve" className="block font-semibold text-white">
        Ces limitations ne s’appliquent pas dans la mesure où elles seraient interdites par la loi
        applicable, notamment à l’égard d’un consommateur au sens de la Loi sur la protection du
        consommateur du Québec.
      </strong>,
    ],
  },
  {
    titre: "Indemnisation",
    blocs: [
      "Sous réserve des lois applicables, vous acceptez d’indemniser et de dégager de toute responsabilité Cloud OS et ses représentants à l’égard de toute réclamation, perte ou dépense (y compris des frais juridiques raisonnables) découlant de : (a) votre Contenu utilisateur ; (b) votre utilisation du Service en violation des présentes Conditions ou de la loi ; ou (c) votre violation des droits d’un tiers.",
    ],
  },
  {
    titre: "Protection des renseignements personnels",
    blocs: [
      <>
        Le traitement de vos renseignements personnels est régi par notre{" "}
        <Link href="/confidentialite">
          Politique de confidentialité
        </Link>
        , conforme à la Loi sur la protection des renseignements personnels dans le secteur privé du
        Québec (« Loi 25 »). En utilisant le Service, vous reconnaissez avoir pris connaissance de cette
        politique. Pour toute question relative à vos renseignements personnels ou pour exercer vos
        droits (accès, rectification, retrait), écrivez à{" "}
        <a href={`mailto:${COURRIEL}`}>
          {COURRIEL}
        </a>
        {"."}
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
              "Les présentes Conditions, avec la Politique de confidentialité, constituent l’entente complète entre vous et Cloud OS relativement au Service.",
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
          <blockquote className="border-l-2 border-white/15 pl-4 text-white/85">
            <p className="text-white">Cloud OS</p>
            <p>{ADRESSE_LIGNE}, Canada</p>
            <p className="mt-2">
              Courriel :{" "}
              <a href={`mailto:${COURRIEL}`}>
                {COURRIEL}
              </a>
            </p>
            <p>
              Téléphone :{" "}
              <a href={`tel:${TELEPHONE_LIEN}`}>
                {TELEPHONE}
              </a>
            </p>
          </blockquote>
        ),
      },
    ],
  },
];

/** Référence stable, calculée au module : `AncresSections` en dépend par effet. */
const ANCRES = ancresDe(SECTIONS);

export default function ConditionsPage() {
  return (
    // `data-page-sobre` éteint la lueur haute du fond, pour cette page seule
    // (voir globals.css) : un document qu'on lit d'un bout à l'autre n'a pas
    // besoin d'un halo derrière son premier paragraphe.
    <section className="relative" data-page-sobre>
      <HreflangLinks fr="/conditions" en="/en/terms" />
      <BreadcrumbJsonLd
        items={[
          { nom: "Accueil", chemin: "/" },
          { nom: "Conditions d’utilisation", chemin: "/conditions" },
        ]}
      />
      <div className={`${SHELL} ${SECTION_Y}`}>
        <div className={CONTENEUR_LEGAL}>
          <PageEntete eyebrow="Légal" titre="Conditions d’utilisation" />
          {/* Métadonnée du document, pas un sous-titre : elle date la version
              qu'on lit, elle n'annonce pas ce qu'elle contient. Discrète, donc,
              mais à une taille qui se lit encore. */}
          <p className={`${LECTURE} mt-3 text-[13px] text-white/70`}>
            Dernière mise à jour : {MAJ} — version {VERSION}
          </p>

          <div className={GABARIT_LEGAL}>
            {/* Premier dans le DOM, posé à droite à partir de `lg` : au clavier
                et au lecteur d'écran, un sommaire se rencontre avant le texte
                qu'il résume, et sur écran étroit il se replie au-dessus. */}
            <div className="lg:col-start-2 lg:row-start-1">
              <AncresSections
                ancres={ANCRES}
                disposition="colonne"
                titre="Sommaire"
              />
            </div>

            {/* `min-w-0` : sans ça, la colonne se laisse élargir par la grille
                tarifaire et son `overflow-x-auto` ne contient plus rien.

                Pas de `Reveal` ici : son repli de sécurité remplace le
                `motion.div` par un `div` nu au bout d'1,5 s, ce qui remonte tout
                le sous-arbre — l'`IntersectionObserver` du sommaire gardait
                alors les anciens nœuds et ne suivait plus le défilement. Une
                apparition unique sur un document de onze mille pixels
                n'apportait de toute façon rien ; l'en-tête garde la sienne via
                `PageEntete`. */}
            <div className="min-w-0 lg:col-start-1 lg:row-start-1">
              <SectionsRedigees sections={SECTIONS} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
