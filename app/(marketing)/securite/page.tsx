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

const TITRE = "Sécurité — Cloud Paradise";
const DESCRIPTION =
  "Vos données, notre matériel, au Québec. Le modèle de langage tourne chez nous ; l’IA planifie mais ne calcule rien — un moteur déterministe produit chaque résultat. Isolation par utilisateur et par équipe.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: alternatesBilingues("/securite", "/en/securite", "fr"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "fr"),
};

const ACCES = [
  "Isolation par utilisateur et par équipe.",
  "Authentification à deux facteurs par courriel.",
  "Jetons de session hachés.",
  "Clés API à portée limitée, avec expiration.",
];

export default function SecuritePage() {
  return (
    <>
      <HreflangLinks fr="/securite" en="/en/securite" />
      <BreadcrumbJsonLd
        items={[
          { nom: "Accueil", chemin: "/" },
          { nom: "Sécurité", chemin: "/securite" },
        ]}
      />

      {/* Héros — une seule sortie : parler à un humain. */}
      <section className="relative">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-2xl">
            <SurTitre>Sécurité</SurTitre>
            <h1 className="mt-2 font-display text-[2rem] leading-[1.1] font-bold tracking-[-0.02em] text-white sm:text-[2.6rem] os:text-[3rem]">
              Vos données, notre matériel, au Québec.
            </h1>
            <p className="mt-6 max-w-[56ch] text-[17px] leading-relaxed text-white/85">
              Quatre choses que nous pouvons affirmer sans détour, et que vous
              pouvez vérifier en nous posant la question.
            </p>
            <div className="mt-7">
              <BoutonCta href="/contact" taille="lg">
                Parlez à un humain
              </BoutonCta>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 1 — L'hébergement */}
      <Section2Col surtitre="L’hébergement" titre="Notre matériel, pas celui d’un autre.">
        <div className="space-y-4 text-[15px] leading-relaxed text-white/85">
          <p>
            Nos serveurs sont au Québec, dans un local, sur du matériel qui
            appartient à Cloud Paradise.
          </p>
          <p>
            Ce n’est pas de la capacité louée chez un fournisseur infonuagique
            étranger : vos fichiers reposent sur des disques que nous possédons.
          </p>
        </div>
      </Section2Col>

      {/* 2 — L'intelligence artificielle */}
      <Section2Col
        surtitre="L’intelligence artificielle"
        titre="Le modèle tourne chez nous."
      >
        <div className="space-y-4 text-[15px] leading-relaxed text-white/85">
          <p>
            Le modèle de langage qui lit vos demandes s’exécute sur le matériel
            de Cloud Paradise, au Québec.
          </p>
          <p>
            Vos fichiers et vos demandes ne sont jamais envoyés à un fournisseur
            d’intelligence artificielle tiers.
          </p>
        </div>
      </Section2Col>

      {/* 3 — Le calcul : la section principale, plus d'espace + appui visuel */}
      <section className="relative">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-2xl">
            <SurTitre>Le calcul</SurTitre>
            <h2 className="mt-2 font-display text-[1.7rem] leading-[1.15] font-bold tracking-tight text-balance text-[#eef4ff] sm:text-3xl os:text-[2.4rem]">
              L’intelligence artificielle ne calcule rien.
            </h2>
          </Reveal>

          <div className="mt-9 grid gap-10 os:grid-cols-[1fr_1fr] os:items-center os:gap-14">
            <Reveal>
              <div className="space-y-4 text-[15px] leading-relaxed text-white/85">
                <p>
                  L’intelligence artificielle lit votre demande, la planifie et
                  choisit l’outil. Elle s’arrête là.
                </p>
                <p>
                  Le résultat, lui, est produit par un moteur déterministe : à
                  même entrée, même sortie, à chaque exécution.
                </p>
                <p>
                  L’IA n’exécute jamais de commande arbitraire, et les accès aux
                  données se font en lecture seule.
                </p>
                <p className="font-medium text-white">
                  Le résultat n’est jamais généré par le modèle. Il est calculé.
                </p>
              </div>
            </Reveal>

            {/* Appui visuel : la même tâche relancée rend le même résultat —
                l'esprit de « La garantie », sans en reprendre la chaîne. */}
            <Reveal delay={0.1} className="mx-auto w-full max-w-[440px]">
              <WindowCard title="Vérification · Cloud Paradise">
                <div className="p-5">
                  <p className="text-xs text-white/60">
                    La même tâche, relancée
                  </p>
                  <div className="mt-3 space-y-2 font-mono text-[12px]">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-white/70">lun. 09 h 14</span>
                      <span className="text-white">résultat 3f9c…a1</span>
                    </div>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-white/70">jeu. 14 h 37</span>
                      <span className="text-white">résultat 3f9c…a1</span>
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
                      Résultat identique
                    </span>
                    <span className="text-xs text-white/60">
                      accès en lecture seule
                    </span>
                  </div>
                </div>
              </WindowCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4 — Les accès */}
      <Section2Col surtitre="Les accès" titre="Chacun chez soi.">
        <ul className="space-y-3">
          {ACCES.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-[0.55rem] size-1.5 shrink-0 rounded-full"
                style={{ background: "var(--soft)" }}
              />
              <span className="text-[15px] leading-relaxed text-white/85">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </Section2Col>

      {/* Closer — une seule sortie, pas de badge crédits ni de lien secondaire. */}
      <section className="relative overflow-x-clip">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal>
            <FenetreCta
              badge={false}
              soustitre="La meilleure vérification, c’est de nous poser la question."
              bouton={{ href: "/contact", libelle: "Parlez à un humain" }}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}

/** Sur-titre or, style système. */
function SurTitre({ children }: { children: ReactNode }) {
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
}: {
  surtitre: string;
  titre: string;
  children: ReactNode;
}) {
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
