"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BoutonCta } from "./BoutonCta";
import { SHELL, type Lang } from "./tokens";
import { LIEN_CONNEXION, lienInscription, PAGES } from "@/lib/site";

/**
 * Liens de navigation — desktop et menu mobile lisent tous deux ce tableau.
 *
 * Cinq entrées, pas de menu déroulant : les cinq pages qui portent la décision
 * d'achat. `Mines` (un secteur parmi d'autres) et `Sécurité` (souveraineté)
 * sont des entrées secondaires — elles vivent au pied de page et dans les liens
 * de fin de section, on n'encombre pas la barre avec les pages qu'on lit après
 * avoir été convaincu. `Fonctions` garde sa place juste avant `Tarifs` : c'est
 * la référence exhaustive, elle sert à comparer avant d'aller voir les prix.
 * Uniquement de vraies pages : jamais d'ancre, la barre s'affiche partout et
 * une ancre y serait un lien bancal.
 *
 * `PME` entre en troisième position le 2026-07-30 : c'est devenu le segment
 * d'acquisition principal, celui qui arrive par la recherche organique. Les
 * mines restent servies, mais démarchées en direct — elles n'ont donc pas
 * besoin de la barre. Rang dans la barre = poids commercial, et l'accueil dit
 * la même chose dans le même ordre (`RenvoiPme` avant `RenvoiMines`).
 *
 * `fr` est le chemin français, et il sert de clé : le chemin anglais n'est pas
 * écrit ici, il est retrouvé dans `PAGES` par `hrefNav`. Les deux langues ne
 * portent plus le même segment (`/plateforme` contre `/en/platform`), donc un
 * segment unique préfixé de `/en` ne suffit plus — et le recopier ici rouvrirait
 * exactement la divergence que `PAGES_BILINGUES` vient de fermer.
 */
const NAV = [
  { libelle: { fr: "Plateforme", en: "Platform" }, fr: "/plateforme" },
  { libelle: { fr: "Calcul", en: "Compute" }, fr: "/calcul" },
  // « Small business » et non « SMEs » : c'est déjà le libellé du pied de page,
  // du fil d'Ariane et du titre Open Graph de la page, et c'est le terme
  // cherché en anglais canadien — le même raisonnement que celui qui a donné le
  // slug `/en/small-business` plutôt que `/en/smb` (voir `PAGES`, lib/site.ts).
  { libelle: { fr: "PME", en: "Small business" }, fr: "/pme" },
  { libelle: { fr: "Fonctions", en: "Features" }, fr: "/fonctions" },
  { libelle: { fr: "Tarifs", en: "Pricing" }, fr: "/tarifs" },
  // En dernier : le blogue informe, il ne vend pas — il ne dispute pas sa
  // place aux pages qui convertissent.
  { libelle: { fr: "Blogue", en: "Blog" }, fr: "/blogue" },
] as const;

/**
 * Les pages qui existent dans les deux langues — aujourd'hui, toutes.
 *
 * **Dérivée de `PAGES`, plus recopiée.** Cette liste décide où atterrit la
 * bascule de langue ; `PAGES` (lib/site.ts) décide de ce qu'annoncent le
 * sitemap, `llms.txt` et les `hreflang`. Tenues à la main toutes les deux,
 * elles divergeaient au premier renommage de slug — et la panne est silencieuse
 * : le build reste vert, seul le lien de bascule meurt. Une seule source, donc,
 * et `PAGES` est celle qui est déjà consommée par le référencement.
 *
 * Le repli de `cheminAutreLangue` couvre toujours la page publiée dans une
 * seule langue : elle n'a rien à faire dans `PAGES` (elle y annoncerait un
 * `hreflang` vers un 404), donc elle n'est pas ici non plus.
 */
const PAGES_BILINGUES = PAGES.map(({ fr, en }) => ({ fr, en }));

/** Chemin équivalent dans l'autre langue, ou la racine de cette langue si la page n'a pas de pendant. */
function cheminAutreLangue(pathname: string, lang: Lang): string {
  const page = PAGES_BILINGUES.find((p) => p[lang] === pathname);
  if (page) return lang === "fr" ? page.en : page.fr;
  return lang === "fr" ? "/en" : "/";
}

/**
 * Chemin absolu d'une entrée de nav, dans la langue affichée.
 *
 * Une seule fonction pour les deux rendus (barre et menu mobile) : c'est elle
 * qui garantit que l'URL comparée pour l'état actif est exactement celle du
 * lien, et non une variante reconstruite ailleurs.
 *
 * Le repli `/en` ne peut se produire que si une entrée de `NAV` sort de
 * `PAGES` — c'est-à-dire une page retirée du référencement mais laissée dans la
 * barre. Mieux vaut l'accueil anglais qu'un 404.
 */
function hrefNav(cheminFr: string, lang: Lang): string {
  if (lang === "fr") return cheminFr;
  return PAGES_BILINGUES.find((p) => p.fr === cheminFr)?.en ?? "/en";
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
export function TopBar({ lang = "fr" }: Readonly<{ lang?: Lang }>) {
  const [defile, setDefile] = useState(false);
  const [menuOuvert, setMenuOuvert] = useState(false);
  const heure = useHeureLocale(lang);
  const pathname = usePathname();
  const autreLangue = cheminAutreLangue(pathname, lang);

  useEffect(() => {
    const onScroll = () => setDefile(globalThis.scrollY > 8);
    onScroll();
    globalThis.addEventListener("scroll", onScroll, { passive: true });
    return () => globalThis.removeEventListener("scroll", onScroll);
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
            `ml-4` : air supplémentaire par rapport au bord gauche, en plus du
            padding de SHELL partagé avec le reste des sections. */}
        <Link
          href={lang === "en" ? "/en" : "/"}
          aria-label={lang === "en" ? "Cloud OS — home" : "Cloud OS — accueil"}
          className="ml-4 shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          {/* Lockup horizontal de la charte : symbole SVG + mot-symbole en
              Archivo — du texte, pas une image, donc net à toute densité et
              toujours dans la fonte du site. `aria-hidden` et `alt` vide : le
              lien porte déjà le nom via son aria-label, sinon un lecteur
              d'écran annoncerait « Cloud OS, accueil, CLOUD OS ». */}
          <span className="flex items-center gap-2.5">
            <Image
              src="/brand/symbole-blanc-jaune.svg"
              alt=""
              width={202}
              height={98}
              className="h-8 w-auto"
              loading="eager"
            />
            <span
              aria-hidden="true"
              className="font-display text-[21px] font-extrabold tracking-tight text-white"
            >
              CLOUD <span className="text-cp-yellow">OS</span>
            </span>
          </span>
        </Link>

        <nav
          aria-label={lang === "en" ? "Main navigation" : "Navigation principale"}
          className="hidden bar:block"
        >
          <ul className="flex items-center gap-5">
            {NAV.map(({ libelle, fr }) => {
              const href = hrefNav(fr, lang);
              // Égalité stricte, jamais `startsWith` : les six pages sont à
              // plat, et un préfixe ferait s'allumer deux entrées le jour où
              // une sous-page arrive.
              const actif = pathname === href;
              return (
                <li key={fr}>
                  <a
                    href={href}
                    aria-current={actif ? "page" : undefined}
                    className={`text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                      actif
                        ? "font-medium text-white"
                        : "text-cp-subtle hover:text-white"
                    }`}
                  >
                    {libelle[lang]}
                  </a>
                </li>
              );
            })}
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

          {/* Largeur réservée même vide : l'heure n'arrive qu'après
              l'hydratation (voir `useHeureLocale`) et sans `min-w` la barre
              décalerait le sélecteur de langue au premier affichage.

              Visible à partir de `horloge` (960px) et non de `bar` (840px), où
              la nav apparaît : à cinq entrées, la barre réclame 815px de
              fenêtre en français sans elle, et 894px avec. Entre les deux,
              l'horloge serait donc prise sur la rangée du bouton, qui est la
              seule chose que personne ne doit avoir à chercher. Elle est la
              première à partir parce qu'elle est le seul élément décoratif de
              la barre — d'où son seuil à elle, séparé de `os` depuis qu'elle
              n'y tenait plus qu'à 6px près. */}
          <span className="hidden min-w-[2.1rem] text-center text-xs tabular-nums text-white/70 horloge:inline-block">
            {heure}
          </span>

          {/* Bascule de langue. Toutes les pages ont désormais leur pendant,
              donc la bascule reste sur place ; `cheminAutreLangue` garde son
              repli vers la racine de l'autre langue, pour une page qui serait
              publiée dans une seule langue. */}
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
            href={LIEN_CONNEXION}
            className="hidden text-[13px] text-cp-subtle transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white bar:inline"
          >
            {lang === "en" ? "Log in" : "Se connecter"}
          </a>

          <BoutonCta
            href={lienInscription("topbar")}
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
              ...NAV.map(({ libelle, fr }) => ({
                libelle: libelle[lang],
                href: hrefNav(fr, lang),
              })),
              {
                libelle: lang === "en" ? "Log in" : "Se connecter",
                href: LIEN_CONNEXION,
              },
            ].map(({ libelle, href }) => {
              const actif = pathname === href;
              return (
                <li key={href}>
                  <a
                    href={href}
                    aria-current={actif ? "page" : undefined}
                    onClick={() => setMenuOuvert(false)}
                    className={`block py-2.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                      actif
                        ? "font-medium text-white"
                        : "text-cp-subtle hover:text-white"
                    }`}
                  >
                    {libelle}
                  </a>
                </li>
              );
            })}
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
 * Heure locale du visiteur, comme l'horloge d'une barre de menus.
 *
 * Rend `null` au premier passage — serveur et client doivent produire le même
 * balisage, et l'heure de rendu du serveur ne serait de toute façon ni la bonne
 * ni la bonne zone. L'horloge apparaît donc à l'hydratation.
 *
 * Format 24 h dans les deux langues : c'est un chrome de système, on veut une
 * largeur stable et la même lecture que la maquette, pas un « 2:32 p.m. » qui
 * s'allonge de deux caractères en anglais.
 */
function useHeureLocale(lang: Lang): string | null {
  const [heure, setHeure] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat(lang === "en" ? "en-CA" : "fr-CA", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tic = () => setHeure(format.format(new Date()));
    tic();
    // 15 s : la minute affichée n'est jamais fausse à l'œil, et c'est trois
    // rendus par minute d'un seul `<span>`.
    const id = setInterval(tic, 15_000);
    return () => clearInterval(id);
  }, [lang]);

  return heure;
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
}: Readonly<{
  actif: boolean;
  href: string;
  texte: string;
}>) {
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
