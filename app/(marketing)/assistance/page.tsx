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
import {
  ESSAI_JOURS,
  PALIERS,
  enDevise,
} from "@/components/marketing/offre";
import { SECTION_Y, SHELL } from "@/components/marketing/tokens";
import { alternatesBilingues, openGraphPage } from "@/lib/seo";
import { lienInscription } from "@/lib/site";

const LANG = "fr" as const;
const PERSONNEL = PALIERS[0];

const TITRE = "Bureau d’assistance hébergé au Québec — Cloud OS";
const DESCRIPTION = `Billetterie complète : portail client, courriel, clavardage, base de connaissances, engagements de service, rapports. Incluse dès ${enDevise(PERSONNEL.prixMensuel)} par mois, au Québec.`;

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: alternatesBilingues("/assistance", "/en/service-desk", LANG),
  openGraph: openGraphPage(TITRE, DESCRIPTION, LANG, "/assistance"),
};

const ANCRES: readonly Ancre[] = [
  { id: "canaux", libelle: { fr: "Les canaux", en: "Channels" } },
  { id: "billets", libelle: { fr: "Les billets", en: "Tickets" } },
  { id: "engagements", libelle: { fr: "Les engagements", en: "Commitments" } },
  { id: "mesure", libelle: { fr: "La mesure", en: "Measurement" } },
  { id: "souverainete", libelle: { fr: "Vos données", en: "Your data" } },
];

/**
 * Les quatre canaux d'arrivée d'une demande.
 *
 * Tous livrés (vagues 1, 2, 3 et 5 du module `desk` côté application). Ne rien
 * ajouter ici qui ne soit pas dans le produit : un canal annoncé et absent est
 * la première chose qu'un prospect teste.
 */
const CANAUX = [
  {
    Icone: IconUsers,
    titre: "Un portail à votre nom",
    texte:
      "Vos clients ouvrent et suivent leurs demandes sur une page qui porte votre nom et vos couleurs. Ils s’identifient par un lien reçu par courriel — aucun mot de passe à retenir, aucun compte à créer chez nous.",
  },
  {
    Icone: IconMail,
    titre: "Votre adresse de soutien",
    texte:
      "Branchez votre boîte courriel. Elle est relevée toutes les minutes : chaque message devient un billet, chaque réponse se range dans le bon fil, et vos réponses repartent de votre adresse, pièces jointes comprises.",
  },
  {
    Icone: IconMessage,
    titre: "Le clavardage sur votre site",
    texte:
      "Une bulle à coller sur votre site. Le premier message d’un visiteur ouvre un billet, la conversation est instantanée des deux côtés, et s’il part avant votre réponse, elle lui arrive par courriel.",
  },
  {
    Icone: IconFileText,
    titre: "La base de connaissances",
    texte:
      "Vos articles, cherchables depuis votre portail. Avant qu’un client n’ouvre un billet, on lui propose ce qui répond déjà à sa question — la demande qu’on évite est celle qui coûte le moins cher.",
  },
] as const;

/** Ce qui se passe dans un billet. */
const BILLETS = [
  {
    Icone: IconSparkles,
    titre: "Trié et pré-rédigé à l’arrivée",
    texte:
      "Chaque demande qui entre est classée — priorité, langue, catégorie — et une proposition de réponse vous attend. Vous relisez et vous envoyez, ou vous écrivez la vôtre. L’IA prépare le travail, elle ne répond jamais à votre place.",
  },
  {
    Icone: IconBolt,
    titre: "Des macros, pas du copier-coller",
    texte:
      "Une réponse type porte vos variables et agit sur le billet en même temps : elle change le statut, la priorité, l’assignation, la catégorie. Un geste dans le composeur, tout est appliqué à l’envoi.",
  },
  {
    Icone: IconUsers,
    titre: "Le fil public, et vos notes internes",
    texte:
      "Ce que le client voit et ce que votre équipe se dit vivent dans le même billet, sans risque de confusion — et sans un second outil pour la conversation interne.",
  },
  {
    Icone: IconCheck,
    titre: "Vos clients, déjà là",
    texte:
      "Le répertoire est celui de votre CRM : les mêmes clients, les mêmes contacts, une seule fiche. Rien à réimporter, rien à tenir à jour deux fois.",
  },
] as const;

export default function AssistancePage() {
  return (
    <>
      <HreflangLinks fr="/assistance" en="/en/service-desk" />
      <BreadcrumbJsonLd
        items={[
          { nom: "Accueil", chemin: "/" },
          { nom: "Bureau d’assistance", chemin: "/assistance" },
        ]}
      />

      {/* Héros — texte seul, aligné à gauche comme /mines et /securite. */}
      <section className="relative">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-4xl">
            <SurTitre>Bureau d’assistance</SurTitre>
            <h1 className="mt-2 font-display text-[1.7rem] leading-[1.12] font-extrabold tracking-[-0.02em] text-white sm:text-[2.3rem] os:text-[2.7rem]">
              Le service à la clientèle,
              <br />
              dans votre bureau.
            </h1>
            <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-white/85">
              Une billetterie complète pour répondre à vos clients : portail,
              courriel, clavardage et base de connaissances arrivent au même
              endroit. Elle est dans votre forfait — pas un logiciel de plus à
              acheter, pas un fournisseur de plus à qui confier vos
              conversations.
            </p>
            <div className="mt-7">
              <BoutonCta href={lienInscription("assistance-hero")} taille="lg">
                Essayer {ESSAI_JOURS} jours gratuitement
              </BoutonCta>
            </div>
          </Reveal>
        </div>
      </section>

      <AncresSections ancres={ANCRES} lang={LANG} />

      {/* 1 — Les canaux. Quatre cartes : c'est la section qui répond à
          « est-ce que ça remplace vraiment mon outil actuel ». */}
      <section id="canaux" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-2xl">
            <SurTitre>Les canaux</SurTitre>
            <TitreSection>Vos clients écrivent où ils veulent.</TitreSection>
            <p className="mt-4 max-w-[56ch] text-sm leading-relaxed text-white/85">
              Portail, courriel, clavardage, articles — quatre façons d’entrer,
              une seule file à traiter.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 grid gap-3.5 os:grid-cols-2">
            {CANAUX.map(({ Icone, titre, texte }) => (
              <Carte key={titre} Icone={Icone} titre={titre} texte={texte} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* 2 — Les billets. Même gabarit, plus une fenêtre pour montrer le
          produit plutôt que de le décrire une cinquième fois. */}
      <section id="billets" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-2xl">
            <SurTitre>Les billets</SurTitre>
            <TitreSection>Le travail est préparé avant vous.</TitreSection>
            <p className="mt-4 max-w-[56ch] text-sm leading-relaxed text-white/85">
              Le temps que vous ne passez pas à trier, vous le passez à
              répondre.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 grid gap-3.5 os:grid-cols-2">
            {BILLETS.map(({ Icone, titre, texte }) => (
              <Carte key={titre} Icone={Icone} titre={titre} texte={texte} />
            ))}

            <WindowCard title="Bureau d’assistance · Cloud OS">
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs text-white/60">Billet #1042</p>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{ background: "var(--cta-wash)", color: "var(--cta)" }}
                  >
                    Priorité haute
                  </span>
                </div>
                <p className="mt-3 text-sm font-medium text-white">
                  Facture de mars en double
                </p>
                <ul className="mt-3.5 space-y-2 text-[13px] text-white/85">
                  <li className="flex items-center gap-2">
                    <span data-cp-accent style={{ color: "var(--soft)" }}>
                      <IconSparkles className="size-4 shrink-0" />
                    </span>
                    Classé : Facturation · français
                  </li>
                  <li className="flex items-center gap-2">
                    <span data-cp-accent style={{ color: "var(--soft)" }}>
                      <IconFileText className="size-4 shrink-0" />
                    </span>
                    Brouillon de réponse prêt
                  </li>
                  <li className="flex items-center gap-2">
                    <span data-cp-accent style={{ color: "var(--soft)" }}>
                      <IconBolt className="size-4 shrink-0" />
                    </span>
                    Première réponse due dans 3 h 20
                  </li>
                </ul>
              </div>
            </WindowCard>
          </Reveal>
        </div>
      </section>

      {/* 3 — Les engagements. Le SLA est l'argument qui fait basculer une
          entreprise qui a déjà un outil : elle en a un, mais il ne tient pas
          compte des heures ouvrables ni de l'attente du client. */}
      <section id="engagements" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <div className="grid gap-8 os:grid-cols-[2fr_3fr] os:items-start os:gap-12">
            <Reveal>
              <SurTitre>Les engagements</SurTitre>
              <TitreSection>Une échéance qui compte juste.</TitreSection>
            </Reveal>
            <Reveal delay={0.1} className="space-y-4">
              <p className="text-sm leading-relaxed text-white/85">
                Chaque billet porte deux échéances : la première réponse et la
                résolution. Elles se comptent en{" "}
                <strong className="font-medium text-cp-heading">
                  heures ouvrables
                </strong>{" "}
                — un billet ouvert vendredi à 17 h n’est pas en retard le samedi
                matin.
              </p>
              <p className="text-sm leading-relaxed text-white/85">
                Et le compteur{" "}
                <strong className="font-medium text-cp-heading">
                  se met en pause pendant que vous attendez le client
                </strong>
                . Le délai que vous mesurez est celui dont vous êtes
                responsable, pas celui que votre client a mis à répondre.
                Quand une échéance approche, on vous alerte ; quand elle passe,
                le billet escalade.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4 — La mesure. Volontairement sobre : pas de promesse chiffrée, pas
          de « réduisez vos délais de 40 % ». On dit ce qui est mesuré. */}
      <section id="mesure" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-2xl">
            <SurTitre>La mesure</SurTitre>
            <TitreSection>Ce que vous pouvez enfin regarder.</TitreSection>
            <p className="mt-4 max-w-[56ch] text-sm leading-relaxed text-white/85">
              Sur la période et le découpage de votre choix, calculés à la
              demande.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-2.5">
            {[
              "Volume de demandes",
              "Délais médians et au 90ᵉ centile",
              "Attente client déduite",
              "Charge par agent",
              "Tenue des engagements",
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
              La satisfaction est demandée toute seule : quand un billet se
              termine, votre client reçoit une note de 1 à 5 à donner et un
              commentaire à laisser. La moyenne entre dans vos rapports.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 5 — Vos données. L'argument décisif contre Zoho, Freshdesk et
          Zendesk, et le seul qu'aucun d'eux ne peut copier. */}
      <section id="souverainete" className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <div className="grid gap-8 os:grid-cols-[2fr_3fr] os:items-start os:gap-12">
            <Reveal>
              <SurTitre>Vos données</SurTitre>
              <TitreSection>Les conversations de vos clients restent ici.</TitreSection>
            </Reveal>
            <Reveal delay={0.1} className="space-y-4">
              <p className="text-sm leading-relaxed text-white/85">
                Un billet contient souvent ce qu’un client a de plus sensible :
                son dossier, sa facture, son problème. Ces échanges vivent sur
                notre matériel, dans un local au Québec — pas chez un
                fournisseur américain, pas sur de la capacité louée.
              </p>
              <p className="text-sm leading-relaxed text-white/85">
                Le modèle de langage qui classe vos billets et prépare vos
                brouillons tourne sur ce même matériel. Le contenu des
                conversations de vos clients n’est envoyé à aucun fournisseur
                d’intelligence artificielle tiers.
              </p>
              <p className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-sm text-white/85">
                Vos billets sont les vôtres :{" "}
                <strong className="font-medium text-cp-heading">
                  nous ne les lisons pas
                </strong>
                . Chaque espace est cloisonné, et le vôtre l’est du nôtre.
              </p>
              <div className="pt-1">
                <a
                  href="/securite"
                  data-cp-accent
                  className="text-sm text-cp-subtle underline-offset-4 hover:text-[var(--acc-text)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Voir la sécurité →
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Closer. */}
      <section className="relative overflow-x-clip">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal>
            <FenetreCta
              soustitre={`Le Bureau d’assistance est inclus dans les deux forfaits, dès ${enDevise(PERSONNEL.prixMensuel)} par mois.`}
              bouton={{
                href: lienInscription("assistance-closer"),
                libelle: "Commencer gratuitement",
              }}
              lien={{ href: "/tarifs", libelle: "Voir les tarifs" }}
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
