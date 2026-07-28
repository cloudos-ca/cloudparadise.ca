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
import { GrilleTarifaireLegale } from "@/components/marketing/GrilleTarifaireLegale";
import { ListeNumerotee } from "@/components/marketing/ListeNumerotee";
import { LECTURE, SECTION_Y, SHELL } from "@/components/marketing/tokens";
import { alternatesBilingues, openGraphPage, ROBOTS } from "@/lib/seo";

const TITRE = "Terms of Use — Cloud Paradise";
const DESCRIPTION =
  "Cloud Paradise Terms of Use: account, credits and pricing, acceptable use, content ownership, warranties, and governing law.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  robots: ROBOTS,
  alternates: alternatesBilingues("/conditions", "/en/conditions", "en"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "en", ["/opengraph-image"]),
};

const MAJ = "July 22, 2026";
const VERSION = "1.0";

const ADRESSE_LIGNE = ADRESSE.join(", ");

const SECTIONS: readonly SectionRedigee[] = [
  {
    titre: "Who we are",
    blocs: [
      <>
        The “Cloud Paradise” service (the “<strong className="font-semibold text-white">Service</strong>”,
        the “<strong className="font-semibold text-white">Platform</strong>”) is operated by Cloud
        Paradise (“<strong className="font-semibold text-white">Cloud Paradise</strong>”, “we”, “us”,
        “our”), whose place of business is located at:
      </>,
      {
        brut: (
          <blockquote className="border-l-2 border-white/15 pl-4 text-white/85">
            <p>Cloud Paradise</p>
            <p>{ADRESSE_LIGNE}</p>
            <p>Canada</p>
            <p className="mt-2">
              Email:{" "}
              <a href={`mailto:${COURRIEL}`}>
                {COURRIEL}
              </a>
            </p>
            <p>
              Phone:{" "}
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
    titre: "Purpose and acceptance of these Terms",
    blocs: [
      <>
        These terms of use (the “Terms”) govern your access to and use of the
        Service. By creating an account, accessing the Service, or using it,
        you acknowledge that you have read, understood, and agreed to be
        bound by these Terms as well as by our{" "}
        <Link href="/en/confidentialite">
          Privacy Policy
        </Link>
        .
      </>,
      "If you use the Service on behalf of a company or other entity, you represent that you have the authority to bind that entity to these Terms, and the terms “you” and “your” then refer to that entity.",
      "If you do not agree to these Terms, you must not use the Service.",
    ],
  },
  {
    titre: "Definitions",
    blocs: [
      {
        liste: [
          {
            terme: "Account:",
            texte:
              "the personal space created upon registration, protected by a password and by two-factor authentication.",
          },
          {
            terme: "User Content:",
            texte:
              "any file, dataset, URL, text, instruction, or other data you upload, enter, or submit to the Service.",
          },
          {
            terme: "Job (or “Plan”):",
            texte:
              "a task you describe (in natural language or via a parameterized template) that the Platform routes to the appropriate computing engine.",
          },
          {
            terme: "Run:",
            texte: "an execution of a Job on our computing infrastructure.",
          },
          {
            terme: "Result:",
            texte: "the files or data produced by a Run.",
          },
          {
            terme: "Credits:",
            texte:
              "the prepayment unit used to pay for the execution of Jobs (see article 6).",
          },
          {
            terme: "Team:",
            texte:
              "a collaboration space allowing you to share files and Jobs with other users.",
          },
        ],
      },
    ],
  },
  {
    titre: "Description of the Service",
    blocs: [
      "Cloud Paradise is a cloud platform that turns a request — expressed in natural language or via a template — into a job run on dedicated computing hardware (GPU, high-capacity CPU, massive RAM). The Service includes, among other things:",
      {
        liste: [
          { texte: "document processing (conversion, OCR, translation, sorting, mail merge, archiving);" },
          { texte: "image processing and generation;" },
          { texte: "large-scale data processing and dataset querying;" },
          { texte: "audio and video encoding and conversion, transcription, and subtitling;" },
          { texte: "GPU / CUDA computing and simulation;" },
          { texte: "3D rendering;" },
          { texte: "guided web data extraction (“web scraping”);" },
          { texte: "scheduling and recurrence of these jobs." },
        ],
      },
      "An AI-based orchestration agent is used to understand the intent of a request and select the appropriate execution engine; the actual computation is performed by dedicated, deterministic engines. You acknowledge that the catalogue of features, available engines, and computing capacity may change over time.",
    ],
  },
  {
    titre: "Account, eligibility, and security",
    blocs: [
      {
        liste: [
          {
            terme: "Eligibility.",
            texte:
              "You must be at least 18 years old, or the age of majority in your place of residence, and have the legal capacity to enter into a contract to use the Service.",
          },
          {
            terme: "Account creation.",
            texte:
              "Registration requires a name, a valid email address, and a password. You must provide accurate information and keep it up to date. Your email address must be verified before your first login.",
          },
          {
            terme: "Two-factor authentication.",
            texte:
              "Account access is protected by two-factor authentication: after entering your password, a one-time code is sent to you by email. You are responsible for maintaining access to the email inbox associated with your account.",
          },
          {
            terme: "Credential security.",
            texte: (
              <>
                You are responsible for the confidentiality of your password
                and for any activity carried out through your account. You
                agree to notify us without delay at{" "}
                <a href={`mailto:${COURRIEL}`}>
                  {COURRIEL}
                </a>{" "}
                of any unauthorized use or any suspected breach of your
                account’s security.
              </>
            ),
          },
          {
            terme: "One account per person.",
            texte:
              "You may not share your credentials or transfer your account without our prior written authorization. To collaborate, use Teams instead (article 9).",
          },
        ],
      },
    ],
  },
  {
    titre: "Credits, pricing, and billing",
    blocs: [
      {
        liste: [
          {
            terme: "“Pay-as-you-go” model.",
            texte:
              "The Service operates on prepaid credits. 1 credit equals 1 Canadian dollar (CAD). Each Job consumes a number of credits depending on the type of engine used.",
          },
          {
            terme: "Sign-up credit bonus.",
            texte:
              "A welcome amount of credits (currently the equivalent of CAD 10) may be offered when you create your account, no credit card required. This amount is promotional, has no cash value, is non-refundable and non-transferable, and may be changed or withdrawn at any time.",
          },
        ],
      },
      <>
        <strong className="font-semibold text-white">Job pricing.</strong>{" "}
        The price of each type of job is displayed in the Service and on our
        site before execution. For guidance only, and subject to change,
        per-run rates are approximately:
      </>,
      { brut: <GrilleTarifaireLegale lang="en" /> },
      "The prices in effect are those displayed in the Service at the time you submit a Job.",
      {
        liste: [
          {
            terme: "Credit deduction.",
            texte:
              "Credits are deducted from your balance when a Run starts. A Run that fails due to a failure of our infrastructure should not be billed to you; however, a Run that fails due to invalid User Content, incorrect instructions, or a result you consider unsatisfactory remains billable, because computing capacity was consumed.",
          },
          {
            terme: "Topping up credits.",
            texte:
              "Purchasing additional credits is done using the payment methods offered in the Service (including PayPal). Payments are processed by third-party providers, under their own terms; we do not store the complete data of your payment instruments.",
          },
          {
            terme: "Refunds.",
            texte: (
              <>
                Except as otherwise provided by applicable law — notably
                Quebec’s <em>Consumer Protection Act</em> — purchased credits
                are non-refundable once consumed. Unused credits may be
                refunded at our discretion or where required by law. For any
                request, write to{" "}
                <a href={`mailto:${COURRIEL}`}>
                  {COURRIEL}
                </a>
                {"."}
              </>
            ),
          },
          {
            terme: "Taxes.",
            texte:
              "Displayed prices may exclude applicable taxes (GST/QST). Required taxes will be added where applicable.",
          },
        ],
      },
    ],
  },
  {
    titre: "Acceptable use",
    blocs: [
      "You agree to use the Service in compliance with applicable laws and these Terms. You are, in particular, prohibited from:",
      {
        brut: (
          <ListeNumerotee
            items={[
              "uploading, processing, or distributing content that is illegal, defamatory, hateful, or that infringes the rights of others (including intellectual property and privacy rights);",
              "processing material for which you do not hold the necessary rights or authorizations;",
              "using the Service to create, distribute, or host malicious software, or to compromise the security of any system;",
              "attempting to execute arbitrary code, access internal resources of our infrastructure, or bypass operation allowlists, processing-agent restrictions, or Platform protections;",
              "using the web extraction (“scraping”) feature to access resources without authorization, bypass access controls, ignore a site’s directives (for example, robots.txt), or target internal or private systems. The feature applies protections (resolved-address validation, same-domain restriction, respect for robots.txt) that you must not attempt to defeat;",
              "overloading, disrupting, or load-testing the infrastructure in an unauthorized manner (for example, abusive automation, or bulk submissions intended to saturate the queue);",
              "reselling, sublicensing, or holding out the Service as your own without authorization;",
              "using the Service for any fraudulent activity or in violation of third-party rights.",
            ]}
          />
        ),
      },
      "We reserve the right to refuse, interrupt, or remove any Job or User Content that would violate this article, and to suspend the accounts concerned (article 13).",
    ],
  },
  {
    titre: "User Content",
    blocs: [
      {
        liste: [
          {
            terme: "Ownership.",
            texte:
              "You retain all ownership rights in your User Content and in the Results derived from it. Cloud Paradise claims no ownership rights over your User Content.",
          },
          {
            terme: "Limited license you grant us.",
            texte:
              "You grant us a non-exclusive, limited, revocable license to host, store, copy, transmit, and process your User Content, solely to the extent necessary to operate the Service, run the Jobs you request, deliver Results to you, and ensure the security and maintenance of the Platform. This license ends when you delete the content concerned, subject to temporary backup copies and legal retention obligations.",
          },
          {
            terme: "Your responsibilities.",
            texte:
              "You represent and warrant that you hold the necessary rights to your User Content and that its processing by the Service does not violate any law or any third-party right. You are solely responsible for your User Content, your instructions, and the Results you choose to use.",
          },
          {
            terme: "Backup.",
            texte:
              "You are responsible for keeping your own copies of your User Content. While we take reasonable measures to preserve data, the Service is not a backup service and we do not guarantee against any data loss.",
          },
          {
            terme: "Share links.",
            texte:
              "Some Results may be accessible via a download link sent by email. This link expires after a period of time. Anyone holding a valid, unexpired link can access the corresponding Result; it is your responsibility to share it only with trusted recipients.",
          },
        ],
      },
    ],
  },
  {
    titre: "Teams and sharing",
    blocs: [
      "The Service lets you create Teams and invite other users to share files and Jobs. If you own a Team, you are responsible for managing its members and invitations, and for ensuring that sharing of User Content within the Team complies with applicable rights. Any member with whom content is shared must comply with these Terms. Removing a member or deleting a Team may affect their access to shared content.",
    ],
  },
  {
    titre: "Results, artificial intelligence, and no guarantee of outcome",
    blocs: [
      "The Service uses an artificial intelligence model to interpret your requests and to configure certain jobs. You acknowledge that:",
      {
        liste: [
          {
            texte:
              "interpretation of a natural-language request may be imperfect; it is your responsibility to verify that the proposed Job matches your intent before submitting it;",
          },
          {
            texte:
              "computing engines produce deterministic results based on the parameters provided, but we do not guarantee that Results will be error-free, accurate, complete, or fit for any particular purpose;",
          },
          {
            texte:
              "you are responsible for validating Results before relying on them, particularly for any professional, financial, legal, or critical use;",
          },
          {
            texte:
              "models and parameters may evolve, which may cause Results to vary from one run to another.",
          },
        ],
      },
    ],
  },
  {
    titre: "Availability, capacity, and maintenance",
    blocs: [
      "We strive to ensure good availability of the Service, but it is provided “as is” and “as available”. You acknowledge in particular that:",
      {
        liste: [
          {
            texte:
              "computing capacity may be limited; depending on load, a Run may be queued and execute with a delay;",
          },
          {
            texte: "planned (maintenance) or unplanned (outages, incidents) interruptions may occur;",
          },
          {
            texte:
              "we may modify, suspend, or discontinue all or part of the Service, as well as the engines and features offered, providing reasonable notice for significant changes where practicable.",
          },
        ],
      },
    ],
  },
  {
    titre: "Cloud Paradise’s intellectual property",
    blocs: [
      "The Service, its interface (“Cloud OS”), its code, design, trademarks, logos, and all elements that make it up (excluding your User Content) are the property of Cloud Paradise or its licensors and are protected by applicable law. Nothing in these Terms transfers to you any ownership right in the Service. You are granted only a limited, non-exclusive, non-transferable right to use it, for the duration of your relationship with us and subject to these Terms.",
    ],
  },
  {
    titre: "Suspension and termination",
    blocs: [
      {
        liste: [
          {
            terme: "Termination by you.",
            texte: (
              <>
                You may stop using the Service and request the closure of
                your account at any time by writing to us at{" "}
                <a href={`mailto:${COURRIEL}`}>
                  {COURRIEL}
                </a>
                {"."}
              </>
            ),
          },
          {
            terme: "Suspension or termination by us.",
            texte:
              "We may suspend or disable your account, in whole or in part, immediately and without notice, if we have reasonable grounds to believe that you have breached these Terms, that your use poses a risk to the Service, to other users, or to third parties, or where required by law.",
          },
          {
            terme: "Effects of termination.",
            texte:
              "Upon account closure, your access to the Service ends and your User Content may be deleted, subject to legal retention obligations and temporary technical backups. Unused credits from an account closed for breach of the Terms may be forfeited, to the extent permitted by law. Articles that by their nature must survive termination (notably articles 8.3, 12, 14, 15, 16, and 18) remain in effect.",
          },
        ],
      },
    ],
  },
  {
    titre: "Disclaimer of warranties",
    blocs: [
      "To the maximum extent permitted by applicable law, the Service is provided “as is” and “as available”, without warranty of any kind, express or implied, including any implied warranty of merchantability, fitness for a particular purpose, title, or non-infringement, as well as any warranty of continuous availability, error-free operation, or absolute security.",
      <strong key="reserve" className="block font-semibold text-white">
        Nothing in this article excludes or limits the warranties or rights
        that applicable law, notably Quebec’s Consumer Protection Act, makes
        mandatory and which cannot be waived by contract.
      </strong>,
    ],
  },
  {
    titre: "Limitation of liability",
    blocs: [
      "To the maximum extent permitted by applicable law:",
      {
        liste: [
          {
            texte:
              "Cloud Paradise shall not be liable for indirect, incidental, special, punitive, or consequential damages, nor for any loss of profits, revenue, data, goodwill, or business opportunities, arising from the use or inability to use the Service;",
          },
          {
            texte:
              "Cloud Paradise’s total and cumulative liability, for any claim related to the Service, shall not exceed the greater of: (a) the total amounts you have actually paid us during the twelve (12) months preceding the event giving rise to the claim, or (b) one hundred Canadian dollars (CAD 100).",
          },
        ],
      },
      <strong key="reserve" className="block font-semibold text-white">
        These limitations do not apply to the extent they would be prohibited
        by applicable law, notably with respect to a consumer within the
        meaning of Quebec’s Consumer Protection Act.
      </strong>,
    ],
  },
  {
    titre: "Indemnification",
    blocs: [
      "Subject to applicable law, you agree to indemnify and hold harmless Cloud Paradise and its representatives against any claim, loss, or expense (including reasonable legal fees) arising from: (a) your User Content; (b) your use of the Service in violation of these Terms or of the law; or (c) your violation of a third party’s rights.",
    ],
  },
  {
    titre: "Protection of personal information",
    blocs: [
      <>
        The processing of your personal information is governed by our{" "}
        <Link href="/en/confidentialite">
          Privacy Policy
        </Link>
        , which complies with Quebec’s Act respecting the protection of
        personal information in the private sector (“Law 25”). By using the
        Service, you acknowledge that you have reviewed that policy. For any
        question about your personal information or to exercise your rights
        (access, correction, withdrawal), write to{" "}
        <a href={`mailto:${COURRIEL}`}>
          {COURRIEL}
        </a>
        {"."}
      </>,
    ],
  },
  {
    titre: "Governing law and jurisdiction",
    blocs: [
      "These Terms are governed by the laws in force in the province of Quebec and by the laws of Canada applicable therein, without regard to conflict of laws rules.",
      "Subject to the mandatory rights of a consumer — notably the right to bring proceedings before the court of their domicile under the Consumer Protection Act — any dispute relating to the Service or to these Terms shall fall within the exclusive jurisdiction of the courts of the judicial district of Abitibi (Amos), Quebec, Canada.",
      <>
        In accordance with section 55 of the <em>Charter of the French
        Language</em>, the parties confirm their wish that these Terms be
        drawn up in French. <em>Les parties confirment leur volonté que les
        présentes Conditions soient rédigées en français.</em>
      </>,
    ],
  },
  {
    titre: "Changes to these Terms",
    blocs: [
      "We may amend these Terms from time to time. In the event of a significant change, we will notify you by a reasonable means (for example by email or by a notice within the Service) before it takes effect. The “Last updated” date at the top of the document indicates the version in effect. Continued use of the Service after a change takes effect constitutes acceptance of that change; if you do not agree, you must stop using the Service.",
    ],
  },
  {
    titre: "General provisions",
    blocs: [
      {
        liste: [
          {
            terme: "Entire agreement.",
            texte:
              "These Terms, together with the Privacy Policy, constitute the entire agreement between you and Cloud Paradise regarding the Service.",
          },
          {
            terme: "Severability.",
            texte:
              "If a provision is found to be invalid or unenforceable, the remaining provisions remain in full effect.",
          },
          {
            terme: "No waiver.",
            texte: "Failure to exercise a right does not constitute a waiver of that right.",
          },
          {
            terme: "Assignment.",
            texte:
              "You may not assign your rights under these Terms without our written consent. We may assign ours as part of a reorganization, merger, or asset sale.",
          },
        ],
      },
    ],
  },
  {
    titre: "Contact us",
    blocs: [
      "For any question relating to these Terms:",
      {
        brut: (
          <blockquote className="border-l-2 border-white/15 pl-4 text-white/85">
            <p className="text-white">Cloud Paradise</p>
            <p>{ADRESSE_LIGNE}, Canada</p>
            <p className="mt-2">
              Email:{" "}
              <a href={`mailto:${COURRIEL}`}>
                {COURRIEL}
              </a>
            </p>
            <p>
              Phone:{" "}
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

/** Voir la version française : référence stable pour l'effet d'`AncresSections`. */
const ANCRES = ancresDe(SECTIONS);

export default function ConditionsPageEn() {
  return (
    <section className="relative" data-page-sobre>
      <HreflangLinks fr="/conditions" en="/en/conditions" />
      <BreadcrumbJsonLd
        items={[
          { nom: "Home", chemin: "/en" },
          { nom: "Terms of Use", chemin: "/en/conditions" },
        ]}
      />
      <div className={`${SHELL} ${SECTION_Y}`}>
        <div className={CONTENEUR_LEGAL}>
          <PageEntete eyebrow="Legal" titre="Terms of Use" />
          <p className={`${LECTURE} mt-3 text-[13px] text-white/55`}>
            Last updated: {MAJ} — version {VERSION}
          </p>

          <div className={GABARIT_LEGAL}>
            <div className="lg:col-start-2 lg:row-start-1">
              <AncresSections
                ancres={ANCRES}
                lang="en"
                disposition="colonne"
                titre="Contents"
              />
            </div>

            {/* Voir la version française : pas de `Reveal` sur le corps, son
                repli remontait le sous-arbre sous l'observateur du sommaire. */}
            <div className="min-w-0 lg:col-start-1 lg:row-start-1">
              <SectionsRedigees sections={SECTIONS} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
