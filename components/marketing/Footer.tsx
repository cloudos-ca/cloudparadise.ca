import Image from "next/image";
import { SHELL, type Lang } from "./tokens";

/**
 * Liens de pied de page.
 *
 * Trois colonnes : la nav principale (Plateforme/Calcul/Mines/Tarifs), puis les
 * pages qu'on lit une fois convaincu (Fonctions, Sécurité), enfin le légal. Le
 * pied de page est le seul endroit où Fonctions et Sécurité sont accessibles
 * globalement, la barre de menu ne les portant pas. Tous les liens visent de
 * vraies pages — jamais d'ancre inerte.
 */
const COLONNES = {
  fr: [
    {
      titre: "Produit",
      liens: [
        { libelle: "Plateforme", href: "/plateforme" },
        { libelle: "Calcul", href: "/calcul" },
        { libelle: "Mines", href: "/mines" },
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
        { libelle: "Se connecter", href: "https://app.cloudparadise.cloud/login" },
      ],
    },
    {
      titre: "Légal",
      liens: [
        { libelle: "Conditions", href: "/conditions" },
        { libelle: "Confidentialité", href: "/confidentialite" },
        { libelle: "Contact", href: "/contact" },
      ],
    },
  ],
  en: [
    {
      titre: "Product",
      liens: [
        { libelle: "Platform", href: "/en/plateforme" },
        { libelle: "Compute", href: "/en/calcul" },
        { libelle: "Mining", href: "/en/mines" },
        { libelle: "Pricing", href: "/en/tarifs" },
      ],
    },
    {
      titre: "Learn more",
      liens: [
        { libelle: "Features", href: "/en/fonctions" },
        { libelle: "Security", href: "/en/securite" },
        { libelle: "Log in", href: "https://app.cloudparadise.cloud/login" },
      ],
    },
    {
      titre: "Legal",
      liens: [
        { libelle: "Terms", href: "/en/conditions" },
        { libelle: "Privacy", href: "/en/confidentialite" },
        { libelle: "Contact", href: "/en/contact" },
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
export function Footer({ lang = "fr" }: { lang?: Lang }) {
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
                          className="text-[13px] text-[#93a3c2] underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
