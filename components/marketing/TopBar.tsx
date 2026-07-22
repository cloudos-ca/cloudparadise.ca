"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BoutonCta } from "./BoutonCta";
import { SHELL, type Lang } from "./tokens";

/**
 * Liens de navigation — desktop et menu mobile lisent tous deux ce tableau.
 *
 * Uniquement de vraies pages : « Infrastructure » a été retiré parce qu'il ne
 * pointait que vers une section de l'accueil, ce qui obligeait à quitter la
 * page courante pour un simple défilement. La barre vit dans le layout et
 * s'affiche sur toutes les pages ; une ancre y est toujours un lien bancal.
 *
 * `chemin` est le segment sans langue ; le lien se construit à l'affichage
 * selon `lang` (`/fonctions` en français, `/en/fonctions` en anglais).
 */
const NAV = [
  { libelle: { fr: "Fonctions", en: "Features" }, chemin: "fonctions" },
  { libelle: { fr: "Tarifs", en: "Pricing" }, chemin: "tarifs" },
  { libelle: { fr: "Contact", en: "Contact" }, chemin: "contact" },
] as const;

/** Les pages qui existent dans les deux langues. */
const PAGES_BILINGUES = [
  { fr: "/", en: "/en" },
  { fr: "/fonctions", en: "/en/fonctions" },
  { fr: "/tarifs", en: "/en/tarifs" },
  { fr: "/contact", en: "/en/contact" },
  { fr: "/conditions", en: "/en/conditions" },
  { fr: "/confidentialite", en: "/en/confidentialite" },
] as const;

/** Chemin équivalent dans l'autre langue, ou la racine de cette langue si la page n'a pas de pendant. */
function cheminAutreLangue(pathname: string, lang: Lang): string {
  const page = PAGES_BILINGUES.find((p) => p[lang] === pathname);
  if (page) return lang === "fr" ? page.en : page.fr;
  return lang === "fr" ? "/en" : "/";
}

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
export function TopBar({ lang = "fr" }: { lang?: Lang }) {
  const [defile, setDefile] = useState(false);
  const [menuOuvert, setMenuOuvert] = useState(false);
  const pathname = usePathname();
  const autreLangue = cheminAutreLangue(pathname, lang);

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
      <div className={`${SHELL} flex h-[78px] items-center gap-6`}>
        {/* Le logo ramène à l'accueil — convention attendue de toute barre de
            site, et le seul retour depuis les pages intérieures depuis que
            « Infrastructure » a quitté la navigation.
            `alt` vide : le texte du lien porte déjà le nom, sinon un lecteur
            d'écran annoncerait « Cloud Paradise, accueil, Cloud Paradise ».
            `ml-4` : air supplémentaire par rapport au bord gauche, en plus du
            padding de SHELL partagé avec le reste des sections. */}
        <Link
          href={lang === "en" ? "/en" : "/"}
          aria-label={
            lang === "en" ? "Cloud Paradise — home" : "Cloud Paradise — accueil"
          }
          className="ml-4 shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          {/* Lockup empilé (halo / nuage / « paradise ») : la marque n'est
              lisible qu'à partir d'une certaine hauteur, d'où la barre à 78px
              pour lui laisser la place. Hauteur explicite + w-auto = ratio
              401:295 gardé. */}
          <Image
            src="/brand/logo-blanc-et-jaune.svg"
            alt=""
            width={401}
            height={295}
            className="h-[54px] w-auto"
            loading="eager"
          />
        </Link>

        <nav
          aria-label={lang === "en" ? "Main navigation" : "Navigation principale"}
          className="hidden bar:block"
        >
          <ul className="flex items-center gap-5">
            {NAV.map(({ libelle, chemin }) => (
              <li key={chemin}>
                <a
                  href={lang === "en" ? `/en/${chemin}` : `/${chemin}`}
                  className="text-[13px] text-cp-subtle transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  {libelle[lang]}
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

          {/* Bascule de langue : l'anglais s'arrête aux quatre pages
              traduites, `cheminAutreLangue` ramène à la racine de l'autre
              langue depuis une page qui n'a pas de pendant (Conditions,
              Confidentialité). */}
          <div className="hidden items-center gap-1 text-[13px] bar:flex">
            <SelecteurLangue
              actif={lang === "fr"}
              href={lang === "fr" ? pathname : autreLangue}
              texte="FR"
            />
            <span aria-hidden="true" className="text-white/25">
              /
            </span>
            <SelecteurLangue
              actif={lang === "en"}
              href={lang === "en" ? pathname : autreLangue}
              texte="EN"
            />
          </div>

          <a
            href="https://app.cloudparadise.cloud/login"
            className="hidden text-[13px] text-cp-subtle transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white bar:inline"
          >
            {lang === "en" ? "Log in" : "Se connecter"}
          </a>

          <BoutonCta
            href="https://app.cloudparadise.cloud/register"
            taille="sm"
            className="shrink-0"
          >
            {lang === "en" ? "Get started" : "Commencer"}
          </BoutonCta>

          <button
            type="button"
            onClick={() => setMenuOuvert((v) => !v)}
            aria-expanded={menuOuvert}
            aria-controls="menu-mobile"
            aria-label={lang === "en" ? "Navigation menu" : "Menu de navigation"}
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
          aria-label={lang === "en" ? "Main navigation" : "Navigation principale"}
          className="border-t border-white/[0.08] bg-[rgba(16,24,40,.94)] backdrop-blur-md bar:hidden"
        >
          <ul className={`${SHELL} flex flex-col py-2`}>
            {[
              ...NAV.map(({ libelle, chemin }) => ({
                libelle: libelle[lang],
                href: lang === "en" ? `/en/${chemin}` : `/${chemin}`,
              })),
              {
                libelle: lang === "en" ? "Log in" : "Se connecter",
                href: "https://app.cloudparadise.cloud/login",
              },
            ].map(({ libelle, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setMenuOuvert(false)}
                  className="block py-2.5 text-sm text-cp-subtle transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {libelle}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-1.5 pt-2.5 text-sm">
              <SelecteurLangue
                actif={lang === "fr"}
                href={lang === "fr" ? pathname : autreLangue}
                texte="Français"
              />
              <span aria-hidden="true" className="text-white/25">
                /
              </span>
              <SelecteurLangue
                actif={lang === "en"}
                href={lang === "en" ? pathname : autreLangue}
                texte="English"
              />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

/**
 * Un des deux côtés du sélecteur de langue.
 *
 * La langue active n'est pas un lien — se cliquer soi-même ne fait rien
 * d'utile, et un `<a>` inerte inviterait quand même le clic.
 */
function SelecteurLangue({
  actif,
  href,
  texte,
}: {
  actif: boolean;
  href: string;
  texte: string;
}) {
  if (actif) {
    return (
      <span aria-current="true" className="font-medium text-white">
        {texte}
      </span>
    );
  }
  return (
    <a
      href={href}
      className="text-cp-subtle transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      {texte}
    </a>
  );
}
