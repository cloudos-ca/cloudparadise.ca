"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SHELL } from "./tokens";

/**
 * Ancres de navigation.
 *
 * Elles pointent vers les `id` posés sur les sections. Si une section est
 * renommée ou déplacée, c'est ici que ça se voit.
 */
const NAV = [
  { libelle: "Fonctions", href: "#univers" },
  { libelle: "Tarifs", href: "#tarifs" },
  { libelle: "Infrastructure", href: "#infrastructure" },
] as const;

/**
 * Barre de menu de l'OS.
 *
 * Volontairement fine : c'est un chrome de système, pas un en-tête marketing.
 * Elle vit dans le layout et non dans le hero, sinon `sticky` la libérerait dès
 * que le hero sort de l'écran.
 *
 * Pas d'avatar : sur une vitrine le visiteur n'est pas connecté, et posé
 * contre « Se connecter » il se faisait prendre pour le bouton de connexion.
 *
 * Chrome neutre à deux exceptions près : l'icône de recherche prend `--soft`
 * et le bouton « Commencer » prend `--acc`. Le reste ne bouge pas, pour que la
 * recoloration reste un signal et non un feu d'artifice.
 */
export function TopBar() {
  const [defile, setDefile] = useState(false);
  const [menuOuvert, setMenuOuvert] = useState(false);

  useEffect(() => {
    const onScroll = () => setDefile(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        defile
          ? "border-b border-white/[0.08] bg-[rgba(16,24,40,.72)] backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className={`${SHELL} flex h-[52px] items-center gap-6`}>
        <Image
          src="/brand/logo-blanc-et-jaune.png"
          alt="Cloud Paradise"
          width={512}
          height={380}
          className="h-9 w-auto shrink-0"
          loading="eager"
        />

        <nav aria-label="Navigation principale" className="hidden bar:block">
          <ul className="flex items-center gap-5">
            {NAV.map(({ libelle, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-[13px] text-cp-subtle transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  {libelle}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3.5">
          {/* Décorative, donc libre de porter l'accent : c'est elle qui fait
              vivre « tout se recolore » dès la barre, sans se faire prendre
              pour une commande de compte comme le faisait l'avatar. */}
          <svg
            aria-hidden="true"
            data-cp-accent
            viewBox="0 0 24 24"
            className="size-4 shrink-0"
            fill="none"
            stroke="var(--soft)"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>

          <span className="hidden text-xs tabular-nums text-white/55 bar:inline">
            14:32
          </span>

          <a
            href="/connexion"
            className="hidden text-[13px] text-cp-subtle transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white bar:inline"
          >
            Se connecter
          </a>

          <a
            href="/inscription"
            data-cp-accent
            className="shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ background: "var(--acc)" }}
          >
            Commencer
          </a>

          <button
            type="button"
            onClick={() => setMenuOuvert((v) => !v)}
            aria-expanded={menuOuvert}
            aria-controls="menu-mobile"
            aria-label="Menu de navigation"
            className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-md text-white/70 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white bar:hidden"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {menuOuvert ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOuvert && (
        <nav
          id="menu-mobile"
          aria-label="Navigation principale"
          className="border-t border-white/[0.08] bg-[rgba(16,24,40,.94)] backdrop-blur-md bar:hidden"
        >
          <ul className={`${SHELL} flex flex-col py-2`}>
            {[...NAV, { libelle: "Se connecter", href: "/connexion" }].map(
              ({ libelle, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={() => setMenuOuvert(false)}
                    className="block py-2.5 text-sm text-cp-subtle transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {libelle}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
