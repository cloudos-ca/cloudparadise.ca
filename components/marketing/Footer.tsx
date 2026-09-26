import Image from "next/image";
import { SHELL, type Lang } from "./tokens";
import { LIEN_CONNEXION } from "@/lib/site";

/**
 * Liens de pied de page.
 *
 * Quatre colonnes : le produit (Plateforme/Calcul/Mines/Tarifs), les pages
 * qu'on lit une fois convaincu (Fonctions, Sécurité, connexion), l'entreprise
 * (Contact, Blogue), enfin le légal. Le pied de page est le seul endroit où
 * Mines et Sécurité sont accessibles globalement, la barre de menu ne les
 * portant plus.
 *
 * `Contact` a sa propre colonne et non celle du légal : écrire pour joindre
 * quelqu'un n'est pas un document contractuel, et le ranger à côté des
 * Conditions laissait entendre qu'il fallait une raison juridique pour nous
 * écrire. Le blogue l'y rejoint : c'est la voix de l'entreprise, pas une page
 * produit. Les hauteurs descendent 5/3/2/2, un escalier plutôt qu'un trou.
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
        { libelle: "PME", href: "/pme" },
        { libelle: "Assistance", href: "/assistance" },
        { libelle: "Aperçu mobile", href: "https://mobile.cloudos.ca" },
        { libelle: "Tarifs", href: "/tarifs" },
      ],
    },
    {
      titre: "En savoir plus",
      liens: [
        { libelle: "Applications", href: "/applications" },
        { libelle: "Fonctions", href: "/fonctions" },
        { libelle: "Sécurité", href: "/securite" },
        // Même cible que la barre de menu : `#` ne faisait que remonter en
        // haut de page, ce qui est pire qu'un lien en attente d'être branché.
        { libelle: "Se connecter", href: LIEN_CONNEXION },
      ],
    },
    {
      titre: "Entreprise",
      liens: [
        { libelle: "Contact", href: "/contact" },
        { libelle: "Blogue", href: "/blogue" },
      ],
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
        { libelle: "Small business", href: "/en/small-business" },
        { libelle: "Service Desk", href: "/en/service-desk" },
        { libelle: "Mobile preview", href: "https://mobile.cloudos.ca" },
        { libelle: "Pricing", href: "/en/pricing" },
      ],
    },
    {
      titre: "Learn more",
      liens: [
        { libelle: "Apps", href: "/en/apps" },
        { libelle: "Features", href: "/en/features" },
        { libelle: "Security", href: "/en/security" },
        { libelle: "Log in", href: LIEN_CONNEXION },
      ],
    },
    {
      titre: "Company",
      liens: [
        { libelle: "Contact", href: "/en/contact" },
        { libelle: "Blog", href: "/en/blog" },
      ],
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
 * (tuile jaune comprise) restent fixes.
 */
export function Footer({ lang = "fr" }: Readonly<{ lang?: Lang }>) {
  return (
    <footer className="relative border-t border-white/[0.08]">
      <div className={`${SHELL} py-10`}>
        <div className="flex flex-col gap-8 os:flex-row os:justify-between">
          <div>
            {/* Lockup horizontal : le mot-symbole est du texte visible — c'est
                lui le nom accessible, d'où l'`alt` vide sur le symbole. */}
            <span className="flex items-center gap-3">
              <Image
                src="/brand/symbole-blanc-jaune.svg"
                alt=""
                width={202}
                height={98}
                className="h-10 w-auto"
              />
              <span className="font-display text-[25px] font-extrabold tracking-tight text-white">
                CLOUD <span className="text-cp-yellow">OS</span>
              </span>
            </span>
            <p
              data-cp-accent
              className="mt-3 text-xs"
              style={{ color: "var(--acc-text)" }}
            >
              © 2026 Cloud OS
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
