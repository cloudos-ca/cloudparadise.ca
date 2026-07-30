import Image from "next/image";
import { SHELL, type Lang } from "./tokens";
import { LIEN_CONNEXION } from "@/lib/site";

/**
 * Liens de pied de page.
 *
 * Quatre colonnes : le produit (Plateforme/Calcul/Mines/Tarifs), les pages
 * qu'on lit une fois convaincu (Fonctions, Sécurité, connexion), l'entreprise
 * (Contact), enfin le légal. Le pied de page est le seul endroit où Mines et
 * Sécurité sont accessibles globalement, la barre de menu ne les portant plus.
 *
 * `Contact` a sa propre colonne et non celle du légal : écrire pour joindre
 * quelqu'un n'est pas un document contractuel, et le ranger à côté des
 * Conditions laissait entendre qu'il fallait une raison juridique pour nous
 * écrire. Une colonne d'un seul lien est ici assumée — les hauteurs
 * descendent 4/3/1/2, ce qui se lit comme un escalier plutôt qu'un trou.
 *
 * Tous les liens visent de vraies pages — jamais d'ancre inerte.
 */
const COLONNES = {
  fr: [
    {
      titre: "Produit",
      liens: [
        { libelle: "Plateforme", href: "/plateforme" },
        { libelle: "Calcul", href: "/calcul" },
        { libelle: "Mines", href: "/mines" },
        // Pas de pendant dans la colonne anglaise : `/en/pme` n'existe pas
        // encore. Un lien vers une page absente vaut moins qu'un lien manquant.
        { libelle: "PME", href: "/pme" },
        { libelle: "Tarifs", href: "/tarifs" },
      ],
    },
    {
      titre: "En savoir plus",
      liens: [
        { libelle: "Fonctions", href: "/fonctions" },
        { libelle: "Sécurité", href: "/securite" },
        // Même cible que la barre de menu : `#` ne faisait que remonter en
        // haut de page, ce qui est pire qu'un lien en attente d'être branché.
        { libelle: "Se connecter", href: LIEN_CONNEXION },
      ],
    },
    {
      titre: "Entreprise",
      liens: [{ libelle: "Contact", href: "/contact" }],
    },
    {
      titre: "Légal",
      liens: [
        { libelle: "Conditions", href: "/conditions" },
        { libelle: "Confidentialité", href: "/confidentialite" },
      ],
    },
  ],
  en: [
    {
      titre: "Product",
      liens: [
        { libelle: "Platform", href: "/en/platform" },
        { libelle: "Compute", href: "/en/compute" },
        { libelle: "Mining", href: "/en/mining" },
        { libelle: "Pricing", href: "/en/pricing" },
      ],
    },
    {
      titre: "Learn more",
      liens: [
        { libelle: "Features", href: "/en/features" },
        { libelle: "Security", href: "/en/security" },
        { libelle: "Log in", href: LIEN_CONNEXION },
      ],
    },
    {
      titre: "Company",
      liens: [{ libelle: "Contact", href: "/en/contact" }],
    },
    {
      titre: "Legal",
      liens: [
        { libelle: "Terms", href: "/en/terms" },
        { libelle: "Privacy", href: "/en/privacy" },
      ],
    },
  ],
} as const;

/**
 * Chrome neutre, à une exception près : la mention de copyright suit
 * désormais l'accent (`--acc-text`), comme signature discrète que la
 * recoloration va jusqu'en bas de page. Les colonnes de liens et le logo
 * (halo compris) restent fixes.
 */
export function Footer({ lang = "fr" }: Readonly<{ lang?: Lang }>) {
  return (
    <footer className="relative border-t border-white/[0.08]">
      <div className={`${SHELL} py-10`}>
        <div className="flex flex-col gap-8 os:flex-row os:justify-between">
          <div>
            <Image
              src="/brand/logo-blanc-et-jaune.svg"
              alt="Cloud Paradise"
              width={401}
              height={295}
              className="h-[84px] w-auto"
            />
            <p
              data-cp-accent
              className="mt-3 text-xs"
              style={{ color: "var(--acc-text)" }}
            >
              © 2026 Cloud Paradise
            </p>
          </div>

          <nav aria-label={lang === "en" ? "Footer links" : "Liens de pied de page"}>
            <div className="flex flex-wrap gap-x-12 gap-y-8 os:gap-16">
              {COLONNES[lang].map(({ titre, liens }) => (
                <div key={titre}>
                  <p className="text-xs font-medium text-white/70">{titre}</p>
                  <ul className="mt-3 space-y-2">
                    {liens.map(({ libelle, href }) => (
                      <li key={libelle}>
                        <a
                          href={href}
                          className="text-[13px] text-cp-muted underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                          {libelle}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        {/* Le crédit Unsplash a été retiré : les fonds sont des dégradés
            maison, donc rien à attribuer. À remettre si des photos arrivent. */}
      </div>
    </footer>
  );
}
