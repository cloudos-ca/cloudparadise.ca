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

const TITRE = "Privacy Policy and Quebec’s Law 25 — Cloud OS";
const DESCRIPTION =
  "How Cloud OS collects, uses and protects personal information, in compliance with Quebec’s Law 25. Your rights and how to exercise them.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  robots: ROBOTS,
  alternates: alternatesBilingues("/confidentialite", "/en/privacy", "en"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "en", "/en/privacy", [IMAGE_OG_PARTAGEE]),
};

const MAJ = "October 1, 2026";

/** The designated privacy officer under Law 25, s. 3.1. */
const RESPONSABLE = "Maxime Murray";
/** Email dedicated to the privacy officer — distinct from the general
 * contact email (`COURRIEL`). */

const DENOMINATION_LEGALE = "Cloud OS S.E.N.C.";
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
              "Depending on your usage: your subscription history and transactions, along with the data required to process payments. Payment card details are handled directly by our payment provider (PayPal) and do not pass through our servers in full (see section 4).",
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
              "The content you enter in the AI planning chat to refine a job. This content is processed by an AI model operated by our subcontractor OVHcloud (see sections 2, 4 and 5).",
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
              "processing your input in the planning chat, using an AI model operated by our subcontractor OVHcloud, to suggest job plans to you.",
          },
          {
            terme: "Billing:",
            texte: "recording your subscription, processing payments, and preventing fraud.",
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
      "We do not use your files or your results to train models, nor for advertising profiling purposes. We do not reuse any information for a purpose incompatible with those above without your consent.",
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
      "Cloud OS operates the Service on infrastructure rented from cloud providers. We use a limited number of subcontractors (service providers) who process information on our behalf, solely under our instructions:",
      {
        liste: [
          {
            terme: "Infrastructure hosting — Amazon Web Services (AWS).",
            texte:
              "The application, the database, file storage and job results are hosted with Amazon Web Services, in its Canada region (Montreal, Quebec), on encrypted volumes. Video meetings (audio, video and screen sharing) go through the Amazon Chime SDK service, in the same region, where their recordings are also kept.",
          },
          {
            terme: "Entry point and email — OVHcloud.",
            texte:
              "The Service’s entry point, which receives encrypted connections before passing them to the application, and our mail server, which sends service emails, are hosted with OVHcloud, in Quebec (Canada).",
          },
          {
            terme: "Artificial intelligence — OVHcloud AI Endpoints.",
            texte:
              "The Service’s AI features (planning assistant, Assistant, document and image analysis, search across your documents, image generation, meeting summaries) send the content each request needs to AI models hosted by OVHcloud, whose service is operated in France.",
          },
          {
            terme: "GPU compute — RunPod.",
            texte:
              "Compute jobs that require a graphics card (GPU) run at RunPod (Runpod, Inc., United States): the job’s code and input data are sent there to run it. The data centre used is not fixed and may be outside Canada.",
          },
          {
            terme: "Payment — PayPal.",
            texte:
              "Payment processing for your subscription is handled by PayPal. Card or payment account details are entered and processed directly by PayPal; we only receive confirmation of the transaction.",
          },
        ],
      },
      "To avoid any ambiguity:",
      {
        liste: [
          {
            terme: "AI planning assistant:",
            texte:
              "content you enter there is sent to OVHcloud for processing, and to no other AI provider (in particular, not to OpenAI).",
          },
          {
            terme: "Transactional email:",
            texte:
              "service emails (confirmations, resets, alerts) are sent using our own mail server, hosted with OVHcloud in Quebec, without relying on a third-party sending service.",
          },
          {
            terme: "File hosting and storage:",
            texte:
              "the database and files are hosted with Amazon Web Services, in its Canada region (Montreal), on encrypted volumes.",
          },
          {
            terme: "Contact form:",
            texte:
              "the form on the Contact page is protected by Google reCAPTCHA, a service of Google LLC, which receives your IP address and technical data from your browser for this purpose, and processes them on its own servers, including outside Quebec.",
          },
          {
            // La portée est dite ici et à la section 6 : cette politique couvre
            // aussi l'application, où il n'y a aucun Google Analytics. Sans la préciser,
            // un utilisateur de l'application lit qu'il est mesuré alors qu'il
            // ne l'est pas — et l'omission joue contre l'argument de
            // souveraineté qu'elle affaiblit sans raison.
            terme: "Audience measurement:",
            texte:
              "we use Google Analytics and Google Ads, two services of Google LLC: browsing data on this site (pages visited, referrer, device, truncated IP address) is transmitted to Google, which processes it on its own servers, including outside Quebec. This measurement covers the marketing site only: the application carries none. Tracking only starts after your explicit consent (see section 6).",
          },
        ],
      },
      "We may also disclose information where required by law, to respond to a valid legal request, or to protect our rights, our security, and that of our users.",
    ],
  },
  {
    titre: "Hosting and data location",
    blocs: [
      "Your information (account, database, files, job results, meeting recordings) is hosted in Canada, with Amazon Web Services, in its Montreal region (Quebec). The Service’s entry point and our mail server are hosted with OVHcloud, in Quebec.",
      "The following disclosures are likely to result in processing outside Quebec:",
      {
        liste: [
          {
            texte:
              "processing of your requests by OVHcloud’s AI models, operated in France;",
          },
          {
            texte:
              "running GPU compute jobs at RunPod, whose data centre is not fixed and may be outside Canada, notably in the United States;",
          },
          { texte: "payment processing by PayPal;" },
          {
            texte:
              "audience and ad-conversion measurement of the marketing site by Google Analytics and Google Ads (only after your consent, see section 6), and protection of the contact form by Google reCAPTCHA.",
          },
        ],
      },
      "Law 25 requires, before any disclosure of personal information outside Quebec, a privacy impact assessment to verify that the information will benefit from adequate protection. This assessment is underway for PayPal and Google, whose disclosures are governed by their applicable terms pending its completion. Disclosures to OVHcloud and RunPod are governed by the applicable terms of those providers.",
    ],
  },
  {
    titre: "Cookies and trackers",
    blocs: [
      "We use cookies that are strictly necessary for the Service to function, notably to keep you signed in once logged in and for security. These cookies cannot be disabled without preventing the Service from working.",
      {
        liste: [
          {
            terme: "Audience measurement — Google Analytics.",
            texte:
              "We use Google Analytics 4, a service of Google LLC, to know which pages of this site are visited, how often, where visits come from, and which outbound links are clicked. Google sets cookies for this purpose (_ga, _ga_*), lasting at most two years, and receives the corresponding browsing data, which it processes on its own servers, including outside Quebec. Measurement stops at this site: the application carries no audience-measurement tool.",
          },
          {
            terme: "Ad conversion measurement — Google Ads.",
            texte:
              "We use the Google Ads tag, a service of Google LLC, to measure the effectiveness of our ads: whether a visit coming from a Google ad leads to an action on this site (for example a click to sign up or a contact form submission). Google sets advertising cookies for this purpose (including _gcl_au), lasting at most 90 days, and receives the corresponding browsing data, which it processes on its own servers, including outside Quebec. Like audience measurement, it covers the marketing site only.",
          },
        ],
      },
      "This tracking only starts once you click “Accept” in the banner shown on your first visit. If you click “Decline”, or make no choice, no audience-measurement or advertising cookie is set. You can change your mind at any time by clearing the browsing data stored for this site in your browser settings, which will show the banner again.",
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
                  This policy describes how Cloud OS (“Cloud OS”,
                  “we”) collects, uses, discloses, and protects the personal
                  information of individuals who use its computing platform
                  (the “Service”). It applies to the site, the application, and
                  any feature attached to it.
                </p>
                <p>
                  Cloud OS is a business established in Quebec and is
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
