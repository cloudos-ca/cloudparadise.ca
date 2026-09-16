import Link from "next/link";
import { IconCube, IconLock, IconMessage } from "./icons";
import { Reveal } from "./Reveal";
import { SECTION_Y, SHELL, type Lang } from "./tokens";

/**
 * Les trois piliers de l'accueil.
 *
 * C'est le pivot de la refonte : faire passer la perception de « service de
 * calcul » à « poste de travail ». Chaque pilier ouvre la page qui le
 * développe (calcul, plateforme, sécurité) — d'où les liens en bas de carte.
 *
 * Sans animation propre : la section porte du sens, pas un effet. Seul le
 * `Reveal` d'entrée reste, commun à toute la landing.
 */

type Pilier = {
  Icone: typeof IconMessage;
  titre: string;
  texte: string;
  lien: string;
  /** Segment sans langue ; le préfixe `/en` est ajouté à l'affichage. */
  href: string;
};

const TEXTES = {
  fr: {
    eyebrow: "Ce qu’on fait",
    titre: "Pas un service de calcul. Un poste de travail.",
    piliers: [
      {
        Icone: IconMessage,
        titre: "Le calcul en langage humain",
        texte:
          "Décrivez la tâche en mots simples. L’IA choisit la méthode et lance le calcul lourd à votre place — aucune commande, aucune configuration.",
        lien: "Découvrir le calcul",
        href: "/calcul",
      },
      {
        Icone: IconCube,
        titre: "Un espace de travail complet",
        texte:
          "Un vrai bureau en ligne : bureautique, image, vidéo, 3D et SIG, et la collaboration d’équipe. Rien à installer.",
        lien: "Voir la plateforme",
        href: "/plateforme",
      },
      {
        Icone: IconLock,
        titre: "Vos données, au Québec",
        texte:
          "Notre modèle de langage tourne sur notre matériel, dans un local au Québec. Vos fichiers ne sont jamais envoyés à un fournisseur d’intelligence artificielle tiers.",
        lien: "La souveraineté",
        href: "/securite",
      },
    ] as Pilier[],
  },
  en: {
    eyebrow: "What we do",
    titre: "Not a compute service. A workstation.",
    piliers: [
      {
        Icone: IconMessage,
        titre: "Compute in plain language",
        texte:
          "Describe the task in plain words. The AI picks the method and runs the heavy job for you — no commands, no setup.",
        lien: "Explore compute",
        href: "/compute",
      },
      {
        Icone: IconCube,
        titre: "A complete workspace",
        texte:
          "A real online desktop: office, image, video, 3D and GIS, plus team collaboration. Nothing to install.",
        lien: "See the platform",
        href: "/platform",
      },
      {
        Icone: IconLock,
        titre: "Your data, in Québec",
        texte:
          "Our language model runs on our own hardware, in a facility in Québec. Your files are never sent to a third-party AI provider.",
        lien: "On sovereignty",
        href: "/security",
      },
    ] as Pilier[],
  },
} as const;

export function TroisPiliers({ lang = "fr" }: Readonly<{ lang?: Lang }>) {
  const t = TEXTES[lang];
  const prefixe = lang === "en" ? "/en" : "";

  return (
    <section className="relative">
      <div className={`${SHELL} ${SECTION_Y}`}>
        <Reveal>
          <p
            className="text-[13px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: "var(--cta)" }}
          >
            {t.eyebrow}
          </p>
          <h2 className="mt-2 max-w-[24ch] font-display text-[1.6rem] leading-[1.2] font-extrabold tracking-tight text-balance text-cp-heading sm:text-3xl os:text-4xl">
            {t.titre}
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 grid gap-3.5 os:grid-cols-3">
          {t.piliers.map(({ Icone, titre, texte, lien, href }) => (
            <Link
              key={titre}
              href={`${prefixe}${href}`}
              className="group flex flex-col rounded-xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_40px_-16px_rgba(0,0,0,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {/* Cercle neutre, icône en or : l'or reste un accent-texte, jamais
                  un fond. */}
              <span
                className="grid size-11 place-items-center rounded-full bg-white/[0.05]"
                style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,.08)" }}
              >
                <Icone className="size-[22px]" style={{ color: "var(--cta)" }} />
              </span>
              <p className="mt-5 font-display text-lg font-extrabold text-cp-heading">
                {titre}
              </p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/85">
                {texte}
              </p>
              <span
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium"
                style={{ color: "var(--cta)" }}
              >
                {lien}
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
