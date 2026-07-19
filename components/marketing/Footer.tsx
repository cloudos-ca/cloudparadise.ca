import Image from "next/image";
import { SHELL } from "./tokens";

/**
 * Liens de pied de page.
 *
 * Tous en `#` pour l'instant : mieux vaut une ancre inerte qu'un lien vers une
 * page qui n'existe pas. À brancher quand les pages seront écrites.
 */
const COLONNES = [
  {
    titre: "Produit",
    liens: ["Fonctions", "Tarifs", "Se connecter"],
  },
  {
    titre: "Légal",
    liens: ["Conditions", "Confidentialité", "Contact"],
  },
] as const;

/**
 * Chrome neutre : le pied de page ne suit pas la recoloration globale. Seul le
 * logo garde ses couleurs, halo compris.
 */
export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08]">
      <div className={`${SHELL} py-10`}>
        <div className="flex flex-col gap-8 os:flex-row os:justify-between">
          <div>
            <Image
              src="/brand/logo-blanc-et-jaune.png"
              alt="Cloud Paradise"
              width={512}
              height={380}
              className="h-10 w-auto"
            />
            <p className="mt-3 text-xs text-[#93a3c2]">© 2026 Cloud Paradise</p>
          </div>

          <nav aria-label="Liens de pied de page">
            <div className="flex gap-12 os:gap-16">
              {COLONNES.map(({ titre, liens }) => (
                <div key={titre}>
                  <p className="text-xs font-medium text-white/70">{titre}</p>
                  <ul className="mt-3 space-y-2">
                    {liens.map((lien) => (
                      <li key={lien}>
                        <a
                          href="#"
                          className="text-[13px] text-[#93a3c2] underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                          {lien}
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
