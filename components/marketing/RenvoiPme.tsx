import Link from "next/link";
import { Reveal } from "./Reveal";
import { SECTION_Y, SHELL, type Lang } from "./tokens";

/**
 * Section d'appel pour les PME — le segment d'acquisition principal, celui qui
 * arrive par la recherche organique. Elle passe donc avant `RenvoiMines`, qui
 * sert une verticale travaillée en démarchage direct : sur l'accueil, l'ordre
 * de lecture EST la hiérarchie commerciale.
 *
 * Squelette repris tel quel de `RenvoiMines` : mêmes `Reveal` et mêmes délais,
 * même `SECTION_Y`, même sur-titre or, même `h2`, même rangée d'étiquettes,
 * même lien de fin. Deux écarts, tous deux volontaires :
 *   - sept étiquettes contre six, et une phrase de plus dans le paragraphe :
 *     c'est par là que la hiérarchie entre les deux segments se lit à l'œil,
 *     sans qu'aucun des deux blocs change de forme ;
 *   - étiquettes en police système, pas en mono. La mono de `RenvoiMines` est
 *     un signal et non une décoration — elle dit « identifiant technique »
 *     (GESTIM, NI 43-101, NAD83 UTM). « Comptabilité » n'en est pas un, et
 *     l'écrire en mono emprunterait une crédibilité qui ne s'applique pas ici.
 *
 * Aucun fond, aucun dégradé : le fond de page est continu et porté par le
 * layout, les sections sont des blocs transparents posés dessus.
 *
 * Toute la copie vient de /pme (`content/pme.fr.ts` et `content/pme.en.ts`) —
 * héros pour le titre et le paragraphe, sur-titres des trois métiers et titres
 * des quatre fenêtres d'équipe pour les étiquettes. Rien n'est écrit ici qui ne
 * soit déjà sur la page qu'on annonce, dans les mêmes mots.
 */

const TEXTES = {
  fr: {
    eyebrow: "PME",
    // Les deux premières lignes du `h1` de /pme. La troisième (« Sans
    // département informatique ») ouvre le paragraphe : dans le titre elle
    // ferait déborder les deux lignes que tient `max-w-[20ch]`, et c'est la
    // phrase qui fait le plus de travail — elle ne pouvait pas disparaître.
    titre: "Le poste de travail des PME québécoises.",
    texte:
      "Sans département informatique. Vos documents, vos chiffres et vos médias dans le même espace de travail. Vous décrivez ce que vous voulez obtenir, le calcul se fait chez nous — rien à installer, personne à embaucher.",
    // Les trois métiers de la page, puis les quatre fenêtres de la section
    // « À plusieurs ». Sans les articles des sur-titres : une pastille nomme,
    // elle ne fait pas de phrase.
    etiquettes: [
      "Comptabilité",
      "Administration",
      "Marketing",
      "Bureaux d’équipe",
      "Messagerie",
      "Courriel",
      "Agenda",
    ],
    lien: "Voir la page PME",
    href: "/pme",
    ariaEtiquettes: "Ce que couvre le poste de travail des PME",
  },
  en: {
    eyebrow: "Small business",
    titre: "The workstation for Canadian businesses.",
    texte:
      "No IT department required. Your documents, your numbers and your media in one workspace. Describe what you want back — the heavy work runs on our hardware. Nothing to install, nobody to hire.",
    etiquettes: [
      "Accounting",
      "Administration",
      "Marketing",
      "Team workspaces",
      "Messaging",
      "Email",
      "Calendar",
    ],
    lien: "See the Small business page",
    href: "/en/small-business",
    ariaEtiquettes: "What the small-business workstation covers",
  },
} as const;

export function RenvoiPme({ lang = "fr" }: Readonly<{ lang?: Lang }>) {
  const t = TEXTES[lang];
  return (
    <section className="relative">
      <div className={`${SHELL} ${SECTION_Y}`}>
        <Reveal className="max-w-2xl">
          <p
            className="text-[13px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: "var(--cta)" }}
          >
            {t.eyebrow}
          </p>
          <h2 className="mt-2 max-w-[20ch] font-display text-[1.6rem] leading-[1.2] font-bold tracking-tight text-balance text-cp-heading sm:text-3xl os:text-4xl">
            {t.titre}
          </h2>
          <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-white/85">
            {t.texte}
          </p>
        </Reveal>

        {/* Les métiers couverts, en pastilles — mêmes pastilles que la section
            minière, police système pour la raison dite en tête de fichier. */}
        <Reveal delay={0.1} className="mt-6">
          <ul aria-label={t.ariaEtiquettes} className="flex flex-wrap gap-2">
            {t.etiquettes.map((etiquette) => (
              <li
                key={etiquette}
                className="rounded-full border border-white/[0.14] bg-white/[0.04] px-3.5 py-1.5 text-[13px] text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
              >
                {etiquette}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15} className="mt-7">
          <Link
            href={t.href}
            className="group inline-flex items-center gap-1.5 text-sm font-medium transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ color: "var(--cta)" }}
          >
            {t.lien}
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
