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
import { JobPanel } from "@/components/marketing/JobPanel";
import { Reveal } from "@/components/marketing/Reveal";
import { WindowCard } from "@/components/marketing/WindowCard";
import { PALIERS, enDevise, libelleDe, type TypeTache } from "@/components/marketing/offre";
import {
  IconAdjustments,
  IconCalendar,
  IconCheck,
  IconCoin,
  IconDatabase,
  IconFileText,
  IconGift,
  IconBolt,
  IconMail,
  IconMessage,
  IconRefresh,
  IconSearch,
  IconUsers,
} from "@/components/marketing/icons";
import { SECTION_Y, SHELL, type Lang } from "@/components/marketing/tokens";
import { alternatesBilingues, openGraphPage } from "@/lib/seo";
import { lienInscription } from "@/lib/site";
import {
  contenuPme,
  type CleCarteEquipe,
  type CleCarteDesk,
  type CleCarteErp,
  type ClePointBudget,
  type SectionMetier,
} from "@/content/pme";

/**
 * /pme — le poste de travail des PME québécoises.
 *
 * Calquée sur /mines : même structure de sections, mêmes composants, même
 * rythme vertical. Ce qui change, c'est l'angle — /mines s'adresse à un
 * secteur, /pme à trois métiers (comptabilité, administration, marketing) qui
 * n'ont en commun que de ne pas avoir de département informatique.
 *
 * **Toute la copie vit dans `content/pme.fr.ts`**, et rien dans ce fichier.
 * C'est le seul écart de forme avec le reste de la vitrine, et il est
 * volontaire : les versions française et anglaise de cette page ne diront pas
 * la même chose (proximité d'un côté, souveraineté canadienne de l'autre), donc
 * la copie ne peut pas vivre dans des objets `{ fr, en }` où l'une passerait
 * pour la traduction de l'autre. Voir l'en-tête de `content/pme.ts`.
 *
 * Conséquence pratique : le miroir anglais est **ce fichier**, recopié dans
 * `app/en/small-business/page.tsx` avec `LANG` à `"en"` et les chemins
 * inversés. Un `diff` entre les deux ne doit rien montrer d'autre.
 */

/** Locale servie par cette route. Le miroir est `/en/small-business`. */
const LANG: Lang = "fr";
const C = contenuPme(LANG);

export const metadata: Metadata = {
  title: C.meta.titre,
  description: C.meta.description,
  alternates: alternatesBilingues("/pme", "/en/small-business", "fr"),
  openGraph: openGraphPage(C.meta.titre, C.meta.description, "fr", "/pme"),
};

/**
 * Les ancres, dans la forme bilingue attendue par `AncresSections`.
 *
 * Les deux champs portent le même libellé : la page est mono-locale, et c'est
 * `lang` qui décide lequel des deux est lu. Construit une fois au module et non
 * dans le corps du composant — `ancres` est une dépendance de l'`useEffect` qui
 * arme l'`IntersectionObserver`, un nouveau tableau à chaque rendu le
 * relancerait pour rien.
 */
const ANCRES: readonly Ancre[] = C.ancres.map(({ id, libelle }) => ({
  id,
  libelle: { fr: libelle, en: libelle },
}));

/**
 * Clé de contenu → pictogramme. Le contenu nomme l'icône, le rendu la fournit :
 * c'est ce qui garde `content/pme.*.ts` en texte pur et empêche les deux
 * fichiers de langue de diverger sur autre chose que des mots.
 */
const ICONES_EQUIPE: Record<CleCarteEquipe, typeof IconUsers> = {
  bureaux: IconUsers,
  messagerie: IconMessage,
  courriel: IconMail,
  agenda: IconCalendar,
};

/** Les mêmes trois icônes que les cartes correspondantes de /tarifs. */
const ICONES_BUDGET: Record<ClePointBudget, typeof IconGift> = {
  offert: IconGift,
  traite: IconCheck,
  consulter: IconSearch,
};

const ICONES_ERP: Record<CleCarteErp, typeof IconUsers> = {
  crm: IconUsers,
  facturation: IconFileText,
  grandLivre: IconAdjustments,
  etatsFinanciers: IconCoin,
  banque: IconRefresh,
  inventaire: IconDatabase,
};

const ICONES_DESK: Record<CleCarteDesk, typeof IconUsers> = {
  portail: IconUsers,
  courriel: IconMail,
  clavardage: IconMessage,
  engagements: IconBolt,
};

export default function PmePage() {
  return (
    <>
      <HreflangLinks fr="/pme" en="/en/small-business" />
      <BreadcrumbJsonLd
        items={[
          { nom: C.filAriane.accueil, chemin: "/" },
          { nom: C.filAriane.page, chemin: "/pme" },
        ]}
      />

      {/* Héros — texte seul, aligné à gauche comme /mines. Deux sorties : la
          démo (principale) et le compte gratuit (secondaire). */}
      <section className="relative">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-4xl">
            <SurTitre>{C.hero.surtitre}</SurTitre>
            <h1 className="mt-2 font-display text-[1.7rem] leading-[1.12] font-extrabold tracking-[-0.02em] text-white sm:text-[2.15rem] os:text-[2.5rem]">
              {C.hero.lignes.map((ligne, i) => (
                // Clé par index : ce sont des lignes de mise en page, pas des
                // données — même titre, mêmes lignes, même ordre, à chaque rendu.
                <span key={i} className="block">
                  {ligne}
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-[60ch] text-[17px] leading-relaxed text-white/85">
              {C.hero.texte}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <BoutonCta href="/contact#sujet=pme" taille="lg">
                {C.hero.cta}
              </BoutonCta>
              <LienOr href={lienInscription("pme-hero")}>{C.hero.lienCompte}</LienOr>
            </div>
            <p className="mt-4 text-[13px] text-white/60">
              Dès{" "}
              <a
                href="/tarifs#forfaits"
                data-cp-accent
                className="text-cp-subtle underline-offset-4 hover:text-[var(--acc-text)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {enDevise(PALIERS[0].prixMensuel)}/mois
              </a>
              , tout inclus.
            </p>
          </Reveal>
        </div>
      </section>

      <AncresSections ancres={ANCRES} lang={LANG} />

      {C.metiers.map((metier) => (
        <MetierSection key={metier.id} metier={metier} />
      ))}

      {/* La gestion d'entreprise — ERP livré fin juillet 2026, enrichi d'une
          comptabilité en partie double complète le 2026-09-01, jamais montré
          sur la vitrine avant cette section. Même motif de grille que
          « À plusieurs » juste en dessous (deux colonnes) : ce sont aussi des
          applications du bureau, pas des puces illustrées. */}
      <section id={C.erp.id} className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-2xl">
            <SurTitre>{C.erp.surtitre}</SurTitre>
            <TitreSection>{C.erp.titre}</TitreSection>
            <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-white/85">
              {C.erp.texte}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 grid gap-3.5 sm:grid-cols-2">
            {C.erp.cartes.map(({ cle, titre, texte }) => {
              const Icone = ICONES_ERP[cle];
              return (
                <WindowCard
                  key={cle}
                  title={titre}
                  icone={<Icone className="size-4" />}
                >
                  <p className="p-5 text-[13px] leading-relaxed text-white/85">
                    {texte}
                  </p>
                </WindowCard>
              );
            })}
          </Reveal>

          <Reveal delay={0.15} className="mt-6">
            <LienOr href="/fonctions#erp">{C.erp.lien}</LienOr>
          </Reveal>
        </div>
      </section>

      {/* Le service à la clientèle — quatre fenêtres, même gabarit que l'ERP
          juste au-dessus : les deux modules partagent le répertoire de clients,
          et les présenter à l'identique le dit sans l'écrire. */}
      <section id={C.desk.id} className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-2xl">
            <SurTitre>{C.desk.surtitre}</SurTitre>
            <TitreSection>{C.desk.titre}</TitreSection>
            <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-white/85">
              {C.desk.texte}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 grid gap-3.5 sm:grid-cols-2">
            {C.desk.cartes.map(({ cle, titre, texte }) => {
              const Icone = ICONES_DESK[cle];
              return (
                <WindowCard
                  key={cle}
                  title={titre}
                  icone={<Icone className="size-4" />}
                >
                  <p className="p-5 text-[13px] leading-relaxed text-white/85">
                    {texte}
                  </p>
                </WindowCard>
              );
            })}
          </Reveal>

          <Reveal delay={0.15} className="mt-6">
            <LienOr href="/assistance">{C.desk.lien}</LienOr>
          </Reveal>
        </div>
      </section>

      {/* À plusieurs — quatre fenêtres du bureau, en 2 × 2. Le titre de chaque
          carte est le titre de sa fenêtre : ce sont des applications, autant
          les montrer comme telles plutôt que comme des puces illustrées. */}
      <section id={C.equipe.id} className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal className="max-w-2xl">
            <SurTitre>{C.equipe.surtitre}</SurTitre>
            <TitreSection>{C.equipe.titre}</TitreSection>
            <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-white/85">
              {C.equipe.texte}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 grid gap-3.5 sm:grid-cols-2">
            {C.equipe.cartes.map(({ cle, titre, texte }) => {
              const Icone = ICONES_EQUIPE[cle];
              return (
                <WindowCard
                  key={cle}
                  title={titre}
                  icone={<Icone className="size-4" />}
                >
                  <p className="p-5 text-[13px] leading-relaxed text-white/85">
                    {texte}
                  </p>
                </WindowCard>
              );
            })}
          </Reveal>

          <Reveal delay={0.15} className="mt-6">
            <LienOr href="/plateforme">{C.equipe.lien}</LienOr>
          </Reveal>
        </div>
      </section>

      {/* Le budget — en-tête à gauche, les trois garanties à droite, dans le
          motif à pictos de l'accueil (Tarification.tsx). */}
      <section id={C.budget.id} className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <div className="grid gap-8 os:grid-cols-[2fr_3fr] os:items-start os:gap-12">
            <Reveal>
              <SurTitre>{C.budget.surtitre}</SurTitre>
              <TitreSection>{C.budget.titre}</TitreSection>
              <p className="mt-4 text-sm leading-relaxed text-white/85">
                {C.budget.texte}
              </p>
              <div className="mt-4">
                <LienOr href="/tarifs">{C.budget.lien}</LienOr>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="space-y-5">
                {C.budget.points.map(({ cle, titre, texte }) => {
                  const Icone = ICONES_BUDGET[cle];
                  return (
                    <li key={cle} className="flex gap-3.5">
                      <span
                        className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full"
                        style={{
                          background:
                            "color-mix(in srgb, var(--soft) 12%, transparent)",
                          color: "var(--soft)",
                        }}
                      >
                        <Icone className="size-[21px]" />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-cp-heading">
                          {titre}
                        </p>
                        <p className="mt-1 text-[13px] leading-relaxed text-white/85">
                          {texte}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vos données — même disposition que « L'ancrage local » de /mines. */}
      <section id={C.donnees.id} className="relative scroll-mt-24">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <div className="grid gap-8 os:grid-cols-[2fr_3fr] os:items-start os:gap-12">
            <Reveal>
              <SurTitre>{C.donnees.surtitre}</SurTitre>
              <TitreSection>{C.donnees.titre}</TitreSection>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4 text-[15px] leading-relaxed text-white/85">
                {C.donnees.paragraphes.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-5">
                <LienOr href="/securite">{C.donnees.lien}</LienOr>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Closer — deux sorties, comme le héros. Le badge d'offre reste : la
          section budget a annoncé le principe du forfait, pas le montant. */}
      <section className="relative overflow-x-clip">
        <div className={`${SHELL} ${SECTION_Y}`}>
          <Reveal>
            <FenetreCta
              soustitre={C.closer.soustitre}
              // « sans carte » est déjà dit par la section budget, juste
              // au-dessus — le répéter dans le badge l'affaiblirait.
              badgeSansCarte={false}
              bouton={{
                href: "/contact#sujet=pme",
                libelle: C.closer.bouton,
              }}
              lien={{ href: lienInscription("pme-closer"), libelle: C.closer.lien }}
              lang={LANG}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}

/**
 * Une section « métier ». En-tête à gauche, liste `entrée → sortie` à droite —
 * la disposition de `GesteSection` sur /calcul, qui est aussi ce que ces
 * sections sont : des transformations concrètes, pas des promesses.
 *
 * La fenêtre de tâche passe avant ou après la liste selon `jobEnTete`. C'est du
 * rythme, pas du sens : trois sections identiquement composées se liraient
 * comme une seule.
 */
function MetierSection({ metier }: Readonly<{ metier: SectionMetier }>) {
  const fenetre = metier.job ? (
    // « Plan » et non l'intitulé de la tâche : c'est le nom que l'application
    // donne à ses fenêtres de travail, et `JobPanel` répète déjà l'intitulé
    // juste en dessous — deux fois la même phrase à trois pixels d'écart.
    <WindowCard title="Plan · Cloud OS">
      <JobPanel
        title={metier.job.titre}
        chip={libelleDe(metier.factures[0], LANG).toUpperCase()}
        logs={metier.job.logs}
        lang={LANG}
      />
    </WindowCard>
  ) : null;

  return (
    <section id={metier.id} className="relative scroll-mt-24">
      <div className={`${SHELL} ${SECTION_Y}`}>
        <div className="grid gap-8 os:grid-cols-[2fr_3fr] os:items-start os:gap-12">
          <Reveal>
            <p className="text-[13px] font-semibold uppercase tracking-[0.12em]">
              <span style={{ color: "var(--cta)" }}>{metier.surtitre}</span>
              <span className="font-normal tracking-normal text-white/70 normal-case">
                {` · ${C.facturation.prefixe} ${listeFacturee(metier.factures)}`}
              </span>
            </p>
            <TitreSection>{metier.titre}</TitreSection>
            <p className="mt-4 text-sm leading-relaxed text-white/85">
              {metier.texte}
            </p>
            {metier.lienTarifs ? (
              <div className="mt-4">
                <LienOr href="/tarifs">{metier.lienTarifs}</LienOr>
              </div>
            ) : null}
          </Reveal>

          <Reveal delay={0.1}>
            {metier.jobEnTete && fenetre ? (
              <div className="mb-6">{fenetre}</div>
            ) : null}

            <ul className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01]">
              {metier.transformations.map((ex) => (
                <li
                  key={ex.entree}
                  className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 px-5 py-4"
                >
                  <span className="text-sm text-white/70">
                    <Chiffres>{ex.entree}</Chiffres>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-sm font-semibold"
                    style={{ color: "var(--cta)" }}
                  >
                    →
                  </span>
                  <span className="text-sm font-medium text-white">
                    <Chiffres>{ex.sortie}</Chiffres>
                  </span>
                </li>
              ))}
            </ul>

            {!metier.jobEnTete && fenetre ? (
              <div className="mt-6">{fenetre}</div>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * « Média, Images et Extraction web » — les noms lus dans `offre.ts`, la
 * ponctuation dans le fichier de contenu.
 *
 * Contrairement à /calcul, qui se tait dès qu'une section couvre plusieurs
 * types, on énumère ici : la page s'adresse à des gens qui découvrent le modèle
 * de forfaits et pour qui « voir le détail des tarifs » est une étape de plus.
 * Énumérer des noms n'est pas compter des modes — aucun total n'est affiché, et
 * la liste suit `factures`, donc elle suit le produit.
 */
function listeFacturee(factures: readonly TypeTache[]): string {
  const noms = factures.map((type) => libelleDe(type, LANG));
  // `.at(-1)` rend `string | undefined`, là où l'indexation annonçait `string`
  // et rendait `undefined` quand même sur une liste vide — la concaténation
  // écrivait alors « undefined » dans la page, sans que rien ne le signale. La
  // garde ci-dessous est le prix, honnête, de ce type exact. `factures` est
  // toujours renseigné aujourd'hui : ce n'est pas un cas atteint, c'est un cas
  // qui ne peut plus produire de texte faux.
  const dernier = noms.at(-1);
  if (dernier === undefined) return "";
  if (noms.length === 1) return dernier;
  return (
    noms.slice(0, -1).join(C.facturation.separateur) +
    C.facturation.joncteur +
    dernier
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

/** Lien or texte + flèche. */
function LienOr({
  href,
  children,
}: Readonly<{ href: string; children: ReactNode }>) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-1.5 text-sm font-medium transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      style={{ color: "var(--cta)" }}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform group-hover:translate-x-0.5"
      >
        →
      </span>
    </a>
  );
}

/**
 * Dore les nombres « purs » d'une chaîne (« 200 », « 5 000 »), sans toucher à
 * ceux collés à une lettre (« 4K », « H.265 »). Copie de /calcul — ces quatre
 * helpers sont dupliqués page par page dans ce dépôt, c'est la convention.
 */
const NOMBRE =
  /((?<![\p{L}\d.])\d[\d  ]*\d(?![\p{L}\d])|(?<![\p{L}\d.])\d(?![\p{L}\d]))/gu;

function Chiffres({ children }: Readonly<{ children: string }>) {
  const segments = children.split(NOMBRE);
  // Clé par index, et c'est la seule correcte ici : `split` sur un motif à
  // groupe capturant rend des segments vides aux jointures, donc plusieurs
  // chaînes identiques dans le même tableau.
  return (
    <>
      {segments.map((seg, i) =>
        i % 2 === 1 ? (
          <span key={i} className="font-semibold" style={{ color: "var(--cta)" }}>
            {seg}
          </span>
        ) : (
          <span key={i}>{seg}</span>
        ),
      )}
    </>
  );
}
