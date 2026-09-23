import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  AncresSections,
  type Ancre,
} from "@/components/marketing/AncresSections";
import { BoutonCta } from "@/components/marketing/BoutonCta";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";
import { FenetreCta } from "@/components/marketing/FenetreCta";
import { HreflangLinks } from "@/components/marketing/HreflangLinks";
import { Reveal } from "@/components/marketing/Reveal";
import { WindowCard } from "@/components/marketing/WindowCard";
import {
  IconBolt,
  IconCheck,
  IconFileText,
  IconMail,
  IconMessage,
  IconSparkles,
  IconUsers,
} from "@/components/marketing/icons";
import { ESSAI_JOURS, PALIERS, enDevise } from "@/components/marketing/offre";
import { SECTION_Y, SHELL } from "@/components/marketing/tokens";
import { alternatesBilingues, openGraphPage } from "@/lib/seo";
import { lienInscription } from "@/lib/site";

const LANG = "en" as const;
const PERSONNEL = PALIERS[0];

const TITRE = "Service Desk — customer support hosted in Quebec | Cloud OS";
const DESCRIPTION = `A complete ticketing system for your customer support: customer portal, email, live chat, knowledge base, service commitments and reports. Included in your plan, from ${enDevise(PERSONNEL.prixMensuel)} a month. Your data stays in Quebec.`;

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: alternatesBilingues("/assistance", "/en/service-desk", LANG),
  openGraph: openGraphPage(TITRE, DESCRIPTION, LANG, "/en/service-desk"),
};

const ANCRES: readonly Ancre[] = [
  { id: "canaux", libelle: { fr: "Les canaux", en: "Channels" } },
  { id: "billets", libelle: { fr: "Les billets", en: "Tickets" } },
  { id: "engagements", libelle: { fr: "Les engagements", en: "Commitments" } },
  { id: "mesure", libelle: { fr: "La mesure", en: "Measurement" } },
  { id: "souverainete", libelle: { fr: "Vos données", en: "Your data" } },
];

/** Voir la version française : quatre canaux, tous livrés. Ne rien ajouter ici
 *  qui ne soit pas dans le produit. */
const CANAUX = [
  {
    Icone: IconUsers,
    titre: "A portal under your name",
    texte:
      "Your customers open and follow their requests on a page carrying your name and your colours. They identify themselves through a link sent by email — no password to remember, no account to create with us.",
  },
  {
    Icone: IconMail,
    titre: "Your support address",
    texte:
      "Connect your mailbox. It is checked every minute: each message becomes a ticket, each reply lands in the right thread, and your answers go back out from your address, attachments included.",
  },
  {
    Icone: IconMessage,
    titre: "Live chat on your site",
    texte:
      "A bubble to drop onto your website. A visitor’s first message opens a ticket, the conversation is instant on both sides, and if they leave before your reply, it reaches them by email.",
  },
  {
    Icone: IconFileText,
    titre: "The knowledge base",
    texte:
      "Your articles, searchable from your portal. Before a customer opens a ticket, we offer them what already answers their question — the cheapest request is the one you avoid.",
  },
] as const;

/** Ce qui se passe dans un billet. */
const BILLETS = [
  {
    Icone: IconSparkles,
    titre: "Sorted and drafted on arrival",
    texte:
      "Every incoming request is classified — priority, language, category — and a suggested reply is waiting for you. Read it over and send, or write your own. The AI prepares the work; it never answers in your place.",
  },
  {
    Icone: IconBolt,
    titre: "Macros, not copy-paste",
    texte:
      "A canned reply carries your variables and acts on the ticket at the same time: it changes the status, the priority, the assignee, the category. One gesture in the composer, all of it applied on send.",
  },
  {
    Icone: IconUsers,
    titre: "The public thread, and your internal notes",
    texte:
      "What the customer sees and what your team says to each other live in the same ticket, with no risk of confusion — and without a second tool for the internal conversation.",
  },
  {
    Icone: IconCheck,
    titre: "Your customers, already there",
    texte:
      "The directory is your CRM’s: the same customers, the same contacts, one record. Nothing to re-import, nothing to keep up to date twice.",
  },
] as const;

export default function ServiceDeskPage() {
  return (
    <>
      <HreflangLinks fr="/assistance" en="/en/service-desk" />
      <BreadcrumbJsonLd
        items={[
          { nom: "Home", chemin: "/en" },
          { nom: "Service Desk", chemin: "/en/service-desk" },
        ]}
      />

      <section className="relative">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-4xl">
            <SurTitre>Service Desk</SurTitre>
            <h1 className="mt-2 font-display text-[1.7rem] leading-[1.12] font-extrabold tracking-[-0.02em] text-white sm:text-[2.3rem] os:text-[2.7rem]">
              Customer support,
              <br />
              inside your desktop.
            </h1>
            <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-white/85">
              A complete ticketing system for answering your customers: portal,
              email, live chat and knowledge base all land in one place. It is
              in your plan — not one more piece of software to buy, not one more
              provider to hand your conversations to.
            </p>
            <div className="mt-7">
              <BoutonCta
                href={lienInscription("service-desk-hero")}
                taille="lg"
              >
                Try {ESSAI_JOURS} days free
              </BoutonCta>
            </div>
          </Reveal>
        </div>
      </section>

      <AncresSections ancres={ANCRES} lang={LANG} />

      <section id="canaux" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-2xl">
            <SurTitre>Channels</SurTitre>
            <TitreSection>Your customers write wherever they like.</TitreSection>
            <p className="mt-4 max-w-[56ch] text-sm leading-relaxed text-white/85">
              Portal, email, chat, articles — four ways in, one queue to work
              through.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 grid gap-3.5 os:grid-cols-2">
            {CANAUX.map(({ Icone, titre, texte }) => (
              <Carte key={titre} Icone={Icone} titre={titre} texte={texte} />
            ))}
          </Reveal>
        </div>
      </section>

      <section id="billets" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-2xl">
            <SurTitre>Tickets</SurTitre>
            <TitreSection>The work is prepared before you get there.</TitreSection>
            <p className="mt-4 max-w-[56ch] text-sm leading-relaxed text-white/85">
              The time you don’t spend sorting is time you spend answering.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 grid gap-3.5 os:grid-cols-2">
            {BILLETS.map(({ Icone, titre, texte }) => (
              <Carte key={titre} Icone={Icone} titre={titre} texte={texte} />
            ))}

            <WindowCard title="Service Desk · Cloud OS">
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs text-white/60">Ticket #1042</p>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{ background: "var(--cta-wash)", color: "var(--cta)" }}
                  >
                    High priority
                  </span>
                </div>
                <p className="mt-3 text-sm font-medium text-white">
                  March invoice charged twice
                </p>
                <ul className="mt-3.5 space-y-2 text-[13px] text-white/85">
                  <li className="flex items-center gap-2">
                    <span data-cp-accent style={{ color: "var(--soft)" }}>
                      <IconSparkles className="size-4 shrink-0" />
                    </span>
                    Classified: Billing · English
                  </li>
                  <li className="flex items-center gap-2">
                    <span data-cp-accent style={{ color: "var(--soft)" }}>
                      <IconFileText className="size-4 shrink-0" />
                    </span>
                    Draft reply ready
                  </li>
                  <li className="flex items-center gap-2">
                    <span data-cp-accent style={{ color: "var(--soft)" }}>
                      <IconBolt className="size-4 shrink-0" />
                    </span>
                    First reply due in 3 h 20
                  </li>
                </ul>
              </div>
            </WindowCard>
          </Reveal>
        </div>
      </section>

      <section id="engagements" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <div className="grid gap-8 os:grid-cols-[2fr_3fr] os:items-start os:gap-12">
            <Reveal>
              <SurTitre>Commitments</SurTitre>
              <TitreSection>A deadline that counts fairly.</TitreSection>
            </Reveal>
            <Reveal delay={0.1} className="space-y-4">
              <p className="text-sm leading-relaxed text-white/85">
                Every ticket carries two deadlines: first reply and resolution.
                They are counted in{" "}
                <strong className="font-medium text-cp-heading">
                  business hours
                </strong>{" "}
                — a ticket opened at 5 p.m. on Friday is not overdue on Saturday
                morning.
              </p>
              <p className="text-sm leading-relaxed text-white/85">
                And the clock{" "}
                <strong className="font-medium text-cp-heading">
                  pauses while you are waiting on the customer
                </strong>
                . The delay you measure is the one you are responsible for, not
                the time your customer took to reply. When a deadline gets
                close, we warn you; when it passes, the ticket escalates.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="mesure" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-2xl">
            <SurTitre>Measurement</SurTitre>
            <TitreSection>What you can finally look at.</TitreSection>
            <p className="mt-4 max-w-[56ch] text-sm leading-relaxed text-white/85">
              Over the period and the breakdown you choose, computed on demand.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-2.5">
            {[
              "Request volume",
              "Median and 90th-percentile delays",
              "Customer wait deducted",
              "Load per agent",
              "Commitments met",
              "Satisfaction",
            ].map((mesure) => (
              <span
                key={mesure}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[13px] text-cp-heading"
              >
                {mesure}
              </span>
            ))}
          </Reveal>
          <Reveal delay={0.15} className="mt-6">
            <p className="max-w-[58ch] text-sm leading-relaxed text-white/85">
              Satisfaction asks for itself: when a ticket closes, your customer
              receives a 1-to-5 rating to give and a comment to leave. The
              average feeds your reports.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="souverainete" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <div className="grid gap-8 os:grid-cols-[2fr_3fr] os:items-start os:gap-12">
            <Reveal>
              <SurTitre>Your data</SurTitre>
              <TitreSection>Your customers’ conversations stay here.</TitreSection>
            </Reveal>
            <Reveal delay={0.1} className="space-y-4">
              <p className="text-sm leading-relaxed text-white/85">
                A ticket often holds what a customer has that is most sensitive:
                their file, their invoice, their problem. Those exchanges live on
                our own hardware, in a room in Quebec — not with an American
                provider, not on rented capacity.
              </p>
              <p className="text-sm leading-relaxed text-white/85">
                The language model that classifies your tickets and prepares
                your drafts runs on that same hardware. The content of your
                customers’ conversations is sent to no third-party AI provider.
              </p>
              <p className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-sm text-white/85">
                Your tickets are yours:{" "}
                <strong className="font-medium text-cp-heading">
                  we do not read them
                </strong>
                . Every space is walled off, and yours is walled off from ours.
              </p>
              <div className="pt-1">
                <a
                  href="/en/security"
                  data-cp-accent
                  className="text-sm text-cp-subtle underline-offset-4 hover:text-[var(--acc-text)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  See security →
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-x-clip">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal>
            <FenetreCta
              lang={LANG}
              soustitre={`The Service Desk is included in both plans, from ${enDevise(PERSONNEL.prixMensuel)} a month.`}
              bouton={{
                href: lienInscription("service-desk-closer"),
                libelle: "Start for free",
              }}
              lien={{ href: "/en/pricing", libelle: "See pricing" }}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}

/** Carte à icône, gabarit commun aux sections « canaux » et « billets ». */
function Carte({
  Icone,
  titre,
  texte,
}: Readonly<{ Icone: typeof IconMail; titre: string; texte: string }>) {
  return (
    <div className="flex gap-4 rounded-xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors hover:border-white/15">
      <span
        className="grid size-10 shrink-0 place-items-center rounded-lg"
        style={{
          background: "color-mix(in srgb, var(--soft) 12%, transparent)",
          color: "var(--soft)",
        }}
      >
        <Icone className="size-[21px]" />
      </span>
      <div className="min-w-0">
        <p className="font-display text-[15px] font-extrabold text-white">
          {titre}
        </p>
        <p className="mt-1 text-[13px] leading-relaxed text-white/85">{texte}</p>
      </div>
    </div>
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

/** Titre de section, style système, collé au sur-titre. */
function TitreSection({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <h2 className="mt-2 font-display text-[1.6rem] leading-[1.2] font-extrabold tracking-tight text-balance text-cp-heading sm:text-3xl os:text-4xl">
      {children}
    </h2>
  );
}
