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

const TITRE = "Privacy Policy — Cloud Paradise";
const DESCRIPTION =
  "How Cloud Paradise collects, uses and protects personal information, in compliance with Quebec’s Law 25. Your rights and how to exercise them.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  robots: ROBOTS,
  alternates: alternatesBilingues("/confidentialite", "/en/privacy", "en"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "en", "/en/privacy", [IMAGE_OG_PARTAGEE]),
};

const MAJ = "July 30, 2026";

/** The designated privacy officer under Law 25, s. 3.1. */
const RESPONSABLE = "Maxime Murray";
/** Email dedicated to the privacy officer — distinct from the general
 * contact email (`COURRIEL`). */

const DENOMINATION_LEGALE = "Cloud Paradise S.E.N.C.";
const ADRESSE_LIGNE = ADRESSE.join(", ");

const SECTIONS: readonly SectionRedigee[] = [
  {
    titre: "Information we collect",
    blocs: [
      "We collect only the information necessary to operate the Service.",
      {
        liste: [
          {
            terme: "Account information.",
            texte:
              "Your first name, last name, email address, and the password you choose. Your password is never stored in plain text: it is stored as a cryptographic hash (bcrypt).",
          },
          {
            terme: "Team and workspace information.",
            texte:
              "When you create or join a team, we keep your membership in that workspace, your role, and any invitations exchanged.",
          },
          {
            terme: "Billing information.",
            texte:
              "Depending on your usage: your history of credit purchases and transactions, along with the data required to process payments. Payment card details are handled directly by our payment provider (PayPal) and do not pass through our servers in full (see section 4).",
          },
          {
            terme: "Files and datasets you submit.",
            texte:
              "The files you upload to run a job, and the results produced (including downloadable archives). These files may contain personal information you place in them; you remain responsible for them and must only submit information you have the right to process.",
          },
          {
            terme: "Job-related information.",
            texte:
              "The processing plans you create, the chosen processing mode, execution parameters, streamed execution logs, and your job history.",
          },
          {
            terme: "Exchanges with the planning assistant.",
            texte:
              "The content you enter in the AI planning chat to refine a job. This content is processed by an AI model self-hosted on Cloud Paradise’s infrastructure; it is not sent to any third-party AI provider (see sections 2 and 4).",
          },
          {
            terme: "Messages exchanged in internal messaging.",
            texte:
              "When you use team messaging, the content of your messages and your presence status.",
          },
          {
            terme: "Technical logs and connection data.",
            texte:
              "IP address, timestamps, browser type, pages visited, and technical events (errors, executions), for the security and operation of the Service.",
          },
        ],
      },
    ],
  },
  {
    titre: "Purposes for which we use this information",
    blocs: [
      "We use your information for the following purposes only:",
      {
        liste: [
          {
            terme: "Providing the Service:",
            texte:
              "authenticating your account, running the jobs you request, streaming logs, and delivering results to you.",
          },
          {
            terme: "AI planning assistance:",
            texte:
              "processing your input in the planning chat, using a self-hosted model, to suggest job plans to you.",
          },
          {
            terme: "Billing:",
            texte: "recording your credit purchases, processing payments, and preventing fraud.",
          },
          {
            terme: "Support and service communications:",
            texte:
              "responding to your requests and sending you essential notices (confirmations, password resets, security alerts, important changes to the Service). These transactional messages are not marketing communications.",
          },
          {
            terme: "Security and integrity:",
            texte: "detecting abuse, preventing incidents, and protecting the Service and its users.",
          },
          {
            terme: "Improving the Service:",
            texte:
              "for internal analysis purposes, based on aggregated or de-identified information whenever possible.",
          },
        ],
      },
      "We do not use your files or your results to train models, nor for advertising profiling purposes. Since the AI model used for the planning assistant is self-hosted, your exchanges are also never used to train a third party’s models. We do not reuse any information for a purpose incompatible with those above without your consent.",
      <>
        <strong className="font-semibold text-white">
          Automated processing.
        </strong>{" "}
        The planning assistant suggests plans to you, but decisions about
        execution remain yours: no decision producing effects on you is made
        solely on the basis of automated processing.
      </>,
    ],
  },
  {
    titre: "Basis for processing and consent",
    blocs: [
      "We process your information on the following bases:",
      {
        liste: [
          {
            terme: "Performance of the contract:",
            texte:
              "the information necessary to provide the Service you requested (account, job execution, billing).",
          },
          {
            terme: "Consent:",
            texte:
              "for any processing that goes beyond what is necessary to provide the Service. This consent is requested separately, in clear and simple terms, for each purpose.",
          },
          {
            terme: "Legal obligations and legitimate interest:",
            texte: "security, fraud prevention, and retention required by law.",
          },
        ],
      },
      "You may withdraw your consent at any time for processing that relies on it (see section 8). Withdrawal has no retroactive effect and may, depending on the case, limit your access to certain features.",
    ],
  },
  {
    titre: "Disclosure to third parties",
    blocs: [
      "We do not sell any personal information.",
      "A significant part of our infrastructure is self-hosted by Cloud Paradise (application hosting, database, file storage, service email delivery, and the AI model). These processing activities therefore do not involve any third-party provider.",
      "We use a limited number of subcontractors (service providers) who process information on our behalf, solely under our instructions and subject to confidentiality and security commitments:",
      {
        liste: [
          {
            terme: "Payment — PayPal.",
            texte:
              "Payment processing for credit purchases is handled by PayPal. Card or payment account details are entered and processed directly by PayPal; we only receive confirmation of the transaction.",
          },
          {
            terme: "Physical hosting of the infrastructure.",
            texte:
              "Our servers are operated directly by Cloud Paradise, on our own business premises located at 238, 1st Avenue West, Amos, Quebec — no third-party data centre is involved.",
          },
        ],
      },
      "To avoid any ambiguity:",
      {
        liste: [
          {
            terme: "AI planning assistant:",
            texte:
              "the model is self-hosted on our servers. Content you enter there is not shared with any third party (in particular, not with OpenAI).",
          },
          {
            terme: "Transactional email:",
            texte:
              "service emails (confirmations, resets, alerts) are sent using our own mail server, without relying on a third-party sending service.",
          },
          {
            terme: "File hosting and storage:",
            texte:
              "the database and files are hosted on our own infrastructure (self-hosted object storage), not with a third-party cloud provider.",
          },
          {
            // La portée est dite ici et à la section 6 : cette politique couvre
            // aussi l'application, où il n'y a aucun Matomo. Sans la préciser,
            // un utilisateur de l'application lit qu'il est mesuré alors qu'il
            // ne l'est pas — et l'omission joue contre l'argument de
            // souveraineté qu'elle affaiblit sans raison.
            terme: "Audience measurement:",
            texte:
              "we use Matomo, an audience-measurement tool self-hosted on our own infrastructure — no browsing data is shared with a third party (in particular, not with Google Analytics). This measurement covers the marketing site only: the application carries none. Tracking only starts after your explicit consent (see section 6).",
          },
        ],
      },
      "We may also disclose information where required by law, to respond to a valid legal request, or to protect our rights, our security, and that of our users.",
    ],
  },
  {
    titre: "Hosting and data location",
    blocs: [
      "Your information (account, database, files, job results) and processing by the AI assistant are hosted on infrastructure operated by Cloud Paradise, located in Amos, Quebec, Canada.",
      "Unlike a model relying on external cloud services, the vast majority of processing takes place on our own infrastructure and is not disclosed outside Quebec. This is also true of audience-measurement data (Matomo), hosted on that same infrastructure.",
      "The only disclosure likely to result in processing outside Quebec is payment processing by PayPal. Law 25 requires, before any disclosure of personal information outside Quebec, a privacy impact assessment to verify that the information will benefit from adequate protection. This assessment is underway for PayPal, and the disclosure is governed by that provider’s applicable terms pending its completion.",
    ],
  },
  {
    titre: "Cookies and trackers",
    blocs: [
      "We use cookies that are strictly necessary for the Service to function, notably to keep you signed in once logged in and for security. These cookies cannot be disabled without preventing the Service from working.",
      {
        liste: [
          {
            terme: "Audience measurement — Matomo.",
            texte:
              "We use Matomo, self-hosted on our own infrastructure, to know which pages of this site are visited, how often, and which outbound links are clicked. Measurement stops at this site: the application carries no audience-measurement tool. No data is shared with a third-party service (in particular, not with Google Analytics), and this information is never used for advertising purposes.",
          },
        ],
      },
      "This tracking only starts once you click “Accept” in the banner shown on your first visit. If you click “Decline”, or make no choice, no audience-measurement cookie is set. You can change your mind at any time by clearing the browsing data stored for this site in your browser settings, which will show the banner again.",
    ],
  },
  {
    titre: "Data retention",
    blocs: [
      "We retain your information only for as long as necessary for the purposes for which it was collected, or for the period required by law.",
      {
        liste: [
          {
            terme: "Submitted files and job results:",
            texte:
              "kept in your workspace until you delete them. Files you upload are not erased once the job finishes: they stay with you exactly as the results do. You may delete them at any time; they are then destroyed from our storage systems. This retention has one limit: after 1 year of account inactivity, they are deleted automatically.",
          },
          {
            terme: "Deleting your account:",
            texte:
              "when you request the deletion of your account, a 30-day grace period begins. During those 30 days, you may cancel your request and recover your account intact. The grace period covers the whole account: your files, your results and your account information.",
          },
          {
            terme: "Permanent purge:",
            texte:
              "once those 30 days have elapsed, all your files and all your account data are permanently purged. Only your invoices are kept beyond that point.",
          },
          {
            terme: "Invoices:",
            texte:
              "kept for six (6) years, the only exception to the purge, to meet tax and accounting obligations.",
          },
          {
            terme: "Technical logs:",
            texte: "kept for 12 months for security and troubleshooting purposes.",
          },
        ],
      },
      "Once the applicable periods expire, information is securely destroyed or irreversibly anonymized.",
    ],
  },
  {
    titre: "Your rights",
    blocs: [
      "Subject to the conditions set out in Law 25, you may exercise the following rights:",
      {
        liste: [
          {
            terme: "Access:",
            texte: "obtain a copy of the personal information we hold about you.",
          },
          {
            terme: "Correction:",
            texte: "have inaccurate, incomplete, or ambiguous information corrected.",
          },
          {
            terme: "Withdrawal of consent:",
            texte: "withdraw a previously given consent, for processing that depends on it.",
          },
          {
            terme: "Portability:",
            texte:
              "obtain, in a structured, commonly used technological format, the computerized information you provided to us (see Settings → Account → Export my data).",
          },
          {
            terme: "De-indexing / cessation of distribution:",
            texte:
              "request that the distribution of information cease, or that a hyperlink be de-indexed, in the cases provided for by law.",
          },
        ],
      },
      "To exercise any of these rights, contact our privacy officer (section 10). We respond within 30 days of receiving your request.",
    ],
  },
  {
    titre: "Security",
    blocs: [
      "We implement reasonable security measures, appropriate to the sensitivity of the information, including:",
      {
        liste: [
          { texte: "encryption in transit of communications (HTTPS/TLS);" },
          {
            texte: "encryption at rest of the database and object storage (encrypted disk);",
          },
          {
            texte:
              "hashing of passwords using the bcrypt algorithm (no password stored in plain text);",
          },
          {
            texte:
              "access control based on the principle of least privilege, a role and permission system, and access logging.",
          },
        ],
      },
      <>
        <strong className="font-semibold text-white">
          Privacy incident.
        </strong>{" "}
        In the event of an incident presenting a risk of serious harm, we take
        reasonable measures to contain it, we notify Quebec’s access to
        information commission (the CAI) and the individuals concerned, and we
        record the incident in a register, in accordance with Law 25.
      </>,
    ],
  },
  {
    titre: "Privacy officer",
    blocs: [
      "In accordance with Law 25, we have designated a privacy officer responsible for ensuring compliance with this policy and handling your requests.",
      {
        liste: [
          { terme: "Officer:", texte: RESPONSABLE },
          {
            terme: "Email:",
            texte: (
              <a href={`mailto:${COURRIEL_RESPONSABLE}`}>
                {COURRIEL_RESPONSABLE}
              </a>
            ),
          },
          { terme: "Address:", texte: ADRESSE_LIGNE },
        ],
      },
    ],
  },
  {
    titre: "Changes to this policy",
    blocs: [
      "We may amend this policy to reflect changes to the Service or to our legal obligations. The “Last updated” date indicates the version in effect. In the event of a significant change, we will notify you by a reasonable means (a notice within the Service or by email) before it takes effect.",
    ],
  },
  {
    titre: "Contact us and recourse",
    blocs: [
      <>
        For any question relating to this policy or to your personal
        information, contact our privacy officer (section 10) or visit our{" "}
        <Link href="/en/contact">
          Contact page
        </Link>
        .
      </>,
      <>
        If you believe we have not adequately addressed your concerns, you may
        file a complaint with Quebec’s access to information commission (the
        CAI):{" "}
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

/** Voir la version française : référence stable pour l'effet d'`AncresSections`. */
const ANCRES = ancresDe(SECTIONS);

export default function ConfidentialitePageEn() {
  return (
    <section className="relative" data-page-sobre>
      <HreflangLinks fr="/confidentialite" en="/en/privacy" />
      <BreadcrumbJsonLd
        items={[
          { nom: "Home", chemin: "/en" },
          { nom: "Privacy Policy", chemin: "/en/privacy" },
        ]}
      />
      <div className={`${SHELL} ${SECTION_Y}`}>
        <div className={CONTENEUR_LEGAL}>
          <PageEntete eyebrow="Legal" titre="Privacy Policy" />
          <p className={`${LECTURE} mt-3 text-[13px] text-white/70`}>
            Last updated: {MAJ}
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
              <div className="prose-legal space-y-4 text-base leading-[1.7] text-white/85">
                <p>
                  This policy describes how Cloud Paradise (“Cloud Paradise”,
                  “we”) collects, uses, discloses, and protects the personal
                  information of individuals who use its computing platform
                  (the “Service”). It applies to the site, the application, and
                  any feature attached to it.
                </p>
                <p>
                  Cloud Paradise is a business established in Quebec and is
                  subject to Quebec’s Act respecting the protection of personal
                  information in the private sector, as amended by “Law 25”.
                </p>
                <p>
                  Data controller: {DENOMINATION_LEGALE}, doing business at{" "}
                  {ADRESSE_LIGNE}.
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
