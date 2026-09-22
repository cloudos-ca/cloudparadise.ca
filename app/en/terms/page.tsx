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
  dureeMaxMois,
  dureesGarantie,
  dureesRecurrentes,
  dureesToutes,
  ESSAI_JOURS,
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

const TITRE = "Terms of Use — Cloud OS";
const DESCRIPTION =
  "Cloud OS Terms of Use: your account and subscription, acceptable use, ownership of your content, warranties, and the governing law.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  robots: ROBOTS,
  alternates: alternatesBilingues("/conditions", "/en/terms", "en"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "en", "/en/terms", [IMAGE_OG_PARTAGEE]),
};

const MAJ = "July 30, 2026";
const VERSION = "1.0";

const ADRESSE_LIGNE = ADRESSE.join(", ");

const SECTIONS: readonly SectionRedigee[] = [
  {
    titre: "Who we are",
    blocs: [
      <>
        The “Cloud OS” service (the “<strong className="font-semibold text-white">Service</strong>”,
        the “<strong className="font-semibold text-white">Platform</strong>”) is operated by
        Cloud OS (“<strong className="font-semibold text-white">Cloud OS</strong>”, “we”, “us”,
        “our”), whose place of business is located at:
      </>,
      {
        brut: (
          <blockquote className="border-l-2 border-white/15 pl-4 text-white/85">
            <p>Cloud OS</p>
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
        <Link href="/en/privacy">
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
      "Cloud OS is a cloud platform that turns a request — expressed in natural language or via a template — into a job run on dedicated computing hardware (GPU, CPU and memory reserved for compute). The Service includes, among other things:",
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
              "You may not share your credentials or transfer your account without our prior written authorization. To collaborate, use Teams instead (see the “Teams and sharing” article).",
          },
        ],
      },
    ],
  },
  {
    titre: "Plans, allowance, and usage gauge",
    blocs: [
      "The Service is offered by fixed-price subscription, before tax, under two plans:",
      {
        liste: PALIERS.map((palier) => ({
          terme: `${palier.nom.en} — ${enDevise(palier.prixMensuel)} a month (≈ ${palier.tachesParMois} tasks a month, depending on the type of task).`,
          texte: <>Includes: {palier.inclusions.en.join(", ")}.</>,
        })),
      },
      `You choose your commitment length (${dureesToutes("en")} months): the monthly price decreases with the length, but never changes at renewal. A commitment of ${dureesRecurrentes("en")} months is charged in recurring monthly instalments; a ${dureeMaxMois()}-month commitment is paid in a single payment, at subscription.`,
      "Whatever length you choose, your gauge renews every month, on your subscription’s date, up to your plan’s allowance. Whatever is left of the allowance at the end of the month is carried over once to the following month, capped at one full month; beyond that carry-over, the surplus is not accumulated further.",
      "A percentage gauge shows your usage for the current month. We warn you at 80%. At 100%, you choose: wait for the renewal, or immediately add a month’s worth of extra allowance, at your plan’s price, without changing your subscription or its renewal date.",
      <>
        Within a Team (see the “Teams and sharing” article), a member with their own paid, active
        plan — a trial does not pool — can pool their allowance into the Team’s pool, provided the
        Team’s owner themselves holds an active Business plan. You may join or leave the pool at
        any time; on leaving, you take back your share of what remains, prorated to what you put in.
      </>,
      `You may pause a recurring subscription — neither a ${dureeMaxMois()}-month commitment paid in a single payment, nor the trial — for one to three months, once every 12 months: nothing is billed during the pause, and your allowance is not lost — it is waiting for you when you resume.`,
      `On a commitment of ${dureesGarantie("en")} months, you benefit from a full money-back guarantee of ${GARANTIE_JOURS} days from the time you subscribe, once per account and provided you have not purchased any extra month of allowance since.`,
      `A free ${ESSAI_JOURS}-day trial, with no card required, lets you use the Service before committing.`,
      <>
        Outside of this guarantee, termination (see the “Suspension and termination” article) does
        not give rise to any pro-rated refund: access to the Service continues until the end of the
        period already paid for.
      </>,
      "Prices shown are before tax. Applicable Canadian taxes, determined by your province, are added to the amount shown; they are displayed before payment and appear on the invoice.",
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
      "We reserve the right to refuse, interrupt, or remove any Job or User Content that would violate this article, and to suspend the accounts concerned (see the “Suspension and termination” article).",
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
              "You retain all ownership rights in your User Content and in the Results derived from it. Cloud OS claims no ownership rights over your User Content.",
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
    titre: "Cloud OS’s intellectual property",
    blocs: [
      "The Service, its interface, its code, design, trademarks, logos, and all elements that make it up (excluding your User Content) are the property of Cloud OS or its licensors and are protected by applicable law. Nothing in these Terms transfers to you any ownership right in the Service. You are granted only a limited, non-exclusive, non-transferable right to use it, for the duration of your relationship with us and subject to these Terms.",
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
                You may stop using the Service and request the deletion of
                your account at any time, from within the Service or by writing to us at{" "}
                <a href={`mailto:${COURRIEL}`}>
                  {COURRIEL}
                </a>
                {". The request opens a 30-day grace period, during which you may cancel it and recover your account intact."}
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
              "Once the 30-day grace period has elapsed, your access to the Service ends and your entire account — User Content, Results, and account information — is permanently purged, subject to temporary technical backups. Invoices are kept for six (6) years to meet tax and accounting obligations; the privacy policy sets out the applicable periods. The provisions that by their nature must survive termination — notably your responsibilities regarding User Content (the “User Content” article), as well as the “Cloud OS’s intellectual property”, “Disclaimer of warranties”, “Limitation of liability”, “Indemnification”, and “Governing law and jurisdiction” articles — remain in effect.",
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
              "Cloud OS shall not be liable for indirect, incidental, special, punitive, or consequential damages, nor for any loss of profits, revenue, data, goodwill, or business opportunities, arising from the use or inability to use the Service;",
          },
          {
            texte:
              "Cloud OS’s total and cumulative liability, for any claim related to the Service, shall not exceed the greater of: (a) the total amounts you have actually paid us during the twelve (12) months preceding the event giving rise to the claim, or (b) one hundred Canadian dollars (CAD 100).",
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
      "Subject to applicable law, you agree to indemnify and hold harmless Cloud OS and its representatives against any claim, loss, or expense (including reasonable legal fees) arising from: (a) your User Content; (b) your use of the Service in violation of these Terms or of the law; or (c) your violation of a third party’s rights.",
    ],
  },
  {
    titre: "Protection of personal information",
    blocs: [
      <>
        The processing of your personal information is governed by our{" "}
        <Link href="/en/privacy">
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
              "These Terms, together with the Privacy Policy, constitute the entire agreement between you and Cloud OS regarding the Service.",
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
            <p className="text-white">Cloud OS</p>
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
      <HreflangLinks fr="/conditions" en="/en/terms" />
      <BreadcrumbJsonLd
        items={[
          { nom: "Home", chemin: "/en" },
          { nom: "Terms of Use", chemin: "/en/terms" },
        ]}
      />
      <div className={`${SHELL} ${SECTION_Y}`}>
        <div className={CONTENEUR_LEGAL}>
          <PageEntete eyebrow="Legal" titre="Terms of Use" />
          <p className={`${LECTURE} mt-3 text-[13px] text-white/70`}>
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
