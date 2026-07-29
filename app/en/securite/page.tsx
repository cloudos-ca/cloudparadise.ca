import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BoutonCta } from "@/components/marketing/BoutonCta";
import { BreadcrumbJsonLd } from "@/components/marketing/BreadcrumbJsonLd";
import { FenetreCta } from "@/components/marketing/FenetreCta";
import { HreflangLinks } from "@/components/marketing/HreflangLinks";
import { Reveal } from "@/components/marketing/Reveal";
import { WindowCard } from "@/components/marketing/WindowCard";
import { SECTION_Y, SHELL } from "@/components/marketing/tokens";
import { alternatesBilingues, openGraphPage } from "@/lib/seo";

const TITRE = "Security — Cloud Paradise";
const DESCRIPTION =
  "Your data, our hardware, in Quebec. The language model runs on our own machines; the AI plans but computes nothing — a deterministic engine produces every result. Isolation per user and per team.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: alternatesBilingues("/securite", "/en/securite", "en"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "en"),
};

export default function SecuritePageEn() {
  return (
    <>
      <HreflangLinks fr="/securite" en="/en/securite" />
      <BreadcrumbJsonLd
        items={[
          { nom: "Home", chemin: "/en" },
          { nom: "Security", chemin: "/en/securite" },
        ]}
      />

      {/* Héros — une seule sortie : parler à un humain. */}
      <section className="relative">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-2xl">
            <SurTitre>Security</SurTitre>
            <h1 className="mt-2 font-display text-[2rem] leading-[1.1] font-bold tracking-[-0.02em] text-white sm:text-[2.6rem] os:text-[3rem]">
              Your data, our hardware,
              <br />
              in Quebec.
            </h1>
            <p className="mt-6 max-w-[56ch] text-[17px] leading-relaxed text-white/85">
              Four things we can state without hedging.
            </p>
            <div className="mt-7">
              <BoutonCta href="/en/contact" taille="lg">
                Talk to a human
              </BoutonCta>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 1 — L'hébergement */}
      <Section2Col surtitre="Hosting" titre="Our own hardware, not someone else’s.">
        <div className="space-y-4 text-[15px] leading-relaxed text-white/85">
          <p>
            Our servers are in Quebec, in our own premises, on hardware that
            belongs to Cloud Paradise.
          </p>
          <p>
            This is not capacity rented from a foreign cloud provider: your
            files sit on disks we own.
          </p>
        </div>
      </Section2Col>

      {/* 2 — L'intelligence artificielle */}
      <Section2Col
        surtitre="Artificial intelligence"
        titre="The model runs on our machines."
      >
        <div className="space-y-4 text-[15px] leading-relaxed text-white/85">
          <p>
            The language model that reads your requests runs on Cloud Paradise
            hardware, in Quebec.
          </p>
          <p>
            Your files and your requests are never sent to a third-party
            artificial intelligence provider.
          </p>
        </div>
      </Section2Col>

      {/* 3 — Le calcul : la section principale, plus d'espace + appui visuel */}
      <section className="relative">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-2xl">
            <SurTitre>Compute</SurTitre>
            <h2 className="mt-2 font-display text-[1.7rem] leading-[1.15] font-bold tracking-tight text-balance text-[#eef4ff] sm:text-3xl os:text-[2.4rem]">
              The artificial intelligence computes nothing.
            </h2>
          </Reveal>

          <div className="mt-9 grid gap-10 os:grid-cols-[1fr_1fr] os:items-center os:gap-14">
            <Reveal>
              <div className="space-y-4 text-[15px] leading-relaxed text-white/85">
                <p>
                  The artificial intelligence reads your request, plans it and
                  picks the tool. That is where it stops.
                </p>
                <p>
                  The result itself is produced by a deterministic engine: same
                  input, same output, on every run.
                </p>
                <p>
                  The AI never runs an arbitrary command, and access to data is
                  read-only.
                </p>
                <p className="font-medium text-white">
                  When you launch a compute task, the result is computed by a
                  deterministic engine, never written by the model.
                </p>
              </div>
            </Reveal>

            {/* Appui visuel : la même tâche relancée rend le même résultat —
                l'esprit de « La garantie », sans en reprendre la chaîne. */}
            <Reveal delay={0.1} className="mx-auto w-full max-w-[440px]">
              <WindowCard title="Verification · Cloud Paradise">
                <div className="p-5">
                  <p className="text-xs text-white/60">The same task, re-run</p>
                  <div className="mt-3 space-y-2 font-mono text-[12px]">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-white/70">Mon. 9:14 a.m.</span>
                      <span className="text-white">result 3f9c…a1</span>
                    </div>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-white/70">Thu. 2:37 p.m.</span>
                      <span className="text-white">result 3f9c…a1</span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-white/10 pt-3">
                    <span
                      className="rounded-md px-2.5 py-1 text-[11px] font-medium"
                      style={{
                        background:
                          "color-mix(in srgb, var(--soft) 14%, transparent)",
                        color: "var(--soft)",
                      }}
                    >
                      Identical result
                    </span>
                    <span className="text-xs text-white/60">
                      read-only access
                    </span>
                  </div>
                </div>
              </WindowCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4 — Les accès (prose, comme le reste de la page — pas de puces) */}
      <Section2Col surtitre="Access" titre="Everyone in their own space.">
        {/* Voir la note du miroir français : la 2FA par courriel est un
            plancher, pas un argument de vente. */}
        <div className="space-y-4 text-[15px] leading-relaxed text-white/85">
          <p>Every user and every team works in isolation.</p>
          <p>
            Signing in requires a second factor, sent by email. That is a floor,
            not a selling point: email is the weakest of the second factors, and
            it is there so that no account rests on a password alone.
          </p>
          <p>
            Session tokens are hashed, and API keys have a limited scope, with
            an expiry date.
          </p>
        </div>
      </Section2Col>

      {/* Closer — une seule sortie, pas de badge crédits ni de lien secondaire. */}
      <section className="relative overflow-x-clip">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal>
            <FenetreCta
              lang="en"
              badge={false}
              soustitre="Ask us the precise questions. We answer them."
              bouton={{ href: "/en/contact", libelle: "Talk to a human" }}
            />
          </Reveal>
        </div>
      </section>
    </>
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

/** Section en deux colonnes : en-tête à gauche, contenu à droite. */
function Section2Col({
  surtitre,
  titre,
  children,
}: Readonly<{
  surtitre: string;
  titre: string;
  children: ReactNode;
}>) {
  return (
    <section className="relative">
      <div className={`${SHELL} ${SECTION_Y}`}>
        <div className="grid gap-8 os:grid-cols-[2fr_3fr] os:items-start os:gap-12">
          <Reveal>
            <SurTitre>{surtitre}</SurTitre>
            <h2 className="mt-2 font-display text-[1.6rem] leading-[1.2] font-bold tracking-tight text-balance text-[#eef4ff] sm:text-3xl os:text-4xl">
              {titre}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>{children}</Reveal>
        </div>
      </div>
    </section>
  );
}
