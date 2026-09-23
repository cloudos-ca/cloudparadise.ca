"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Recaptcha } from "./Recaptcha";
import { IconMail, IconMapPin, IconPhone, IconSend } from "./icons";
import { useBoucleActive } from "./useBoucleActive";
import { WindowCard } from "./WindowCard";
import {
  ADRESSE,
  COURRIEL,
  TELEPHONE,
  TELEPHONE_LIEN,
} from "./coordonnees";
import { SOFT_WASH, type Lang } from "./tokens";

/** Champs texte du volet de composition — l'ordre ici est l'ordre à l'écran. */
const CHAMPS = [
  {
    cle: "nom",
    libelle: { fr: "Nom", en: "Name" },
    type: "text",
    autoComplete: "name",
  },
  {
    cle: "courriel",
    libelle: { fr: "Courriel", en: "Email" },
    type: "email",
    autoComplete: "email",
  },
  {
    cle: "sujet",
    libelle: { fr: "Sujet", en: "Subject" },
    type: "text",
    autoComplete: "off",
  },
] as const;

type Cle = (typeof CHAMPS)[number]["cle"] | "message";
type Valeurs = Record<Cle, string>;

const VIDE: Valeurs = { nom: "", courriel: "", sujet: "", message: "" };

/**
 * Sujets préremplis depuis l'URL (`/contact#sujet=<clé>`).
 *
 * La clé sert de tag de provenance (champ `source` caché, repris dans le
 * courriel), le libellé préremplit le champ Sujet visible. Une entrée par
 * bouton « Réservez une démo » du site : /mines et /pme.
 *
 * **Un fragment, pas `?sujet=`.** La forme en chaîne de requête créait quatre
 * URL supplémentaires (`/contact?sujet=pme` et ses trois variantes), que les
 * robots explorent comme des pages à part entière. Chacune servait les balises
 * hreflang de `/contact` — donc aucune ne se référait à elle-même, et toutes
 * portaient des annotations hreflang alors que leur canonical désignait une
 * autre URL. Un audit SEO du 2026-08-01 remontait les deux symptômes : dix
 * conflits d'attributs hreflang, et quatre pages à un seul lien entrant.
 *
 * Le fragment ne change rien pour le visiteur et n'est jamais indexé comme une
 * URL distincte. Il n'est pas non plus envoyé au serveur — sans importance
 * ici : la clé n'a jamais été lue qu'au montage, côté client (voir plus bas).
 * **Ne pas revenir à `?sujet=`** sans rouvrir ces deux problèmes.
 *
 * Les deux langues sont renseignées même quand une seule page existe : c'est ce
 * composant-ci qui choisit, selon la langue de la page de contact atteinte, et
 * un visiteur peut arriver sur /en/contact avec un `?sujet=` venu d'ailleurs.
 */
const SUJETS_PREREMPLIS: Record<string, { fr: string; en: string }> = {
  exploration: {
    fr: "Démonstration — exploration minière",
    en: "Demo — mineral exploration",
  },
  pme: {
    fr: "Démonstration — PME",
    en: "Demo — small business",
  },
};

/** Plafond du message, en miroir de `LIMITE_MESSAGE` côté route serveur (`app/api/contact/route.ts`). */
const LIMITE_MESSAGE = 5000;
const SEUIL_ALERTE = 4500;

/**
 * Rouge de la palette, pas celui de Tailwind.
 *
 * `text-red-300` jurait avec le navy et n'appartenait à aucune des trois
 * couleurs du site. Ce corail désaturé garde la valeur d'alerte (c'est la seule
 * teinte chaude non dorée de la page) sans casser l'accord d'ensemble, et tient
 * environ 8:1 sur le fond de fenêtre.
 */
const TEXTE_ERREUR = "#f2a09a";

/**
 * Longueur maximale d'une adresse de courriel selon la RFC 5321.
 *
 * Vérifiée avant l'expression régulière, et pas seulement pour écarter une
 * adresse absurde : `[^\s@]` accepte le point, donc `[^\s@]+\.[^\s@]+$` offre
 * plusieurs découpages que le moteur essaie tous quand l'adresse ne
 * correspond pas — coût quadratique. Ici le seul à pouvoir ralentir la page
 * serait le visiteur lui-même, mais la règle doit rester identique des deux
 * côtés : la même borne est appliquée dans `app/api/contact/route.ts`, où
 * l'entrée est publique et où l'absence de limite était exploitable.
 */
const LIMITE_COURRIEL = 254;

/**
 * Validation volontairement permissive sur le courriel.
 *
 * Une adresse valide au sens de la RFC accepte des formes que presque aucune
 * regex ne couvre ; on se contente donc d'écarter les fautes de frappe
 * évidentes (pas d'arobase, pas de point après). Le vrai contrôle se fera à
 * l'envoi serveur.
 */
function courrielMalForme(valeur: string): boolean {
  return (
    valeur.length > LIMITE_COURRIEL ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valeur)
  );
}

function valide(valeurs: Valeurs, lang: Lang): Partial<Record<Cle, string>> {
  const erreurs: Partial<Record<Cle, string>> = {};

  if (lang === "en") {
    if (!valeurs.nom.trim()) erreurs.nom = "Enter your name.";
    if (!valeurs.courriel.trim()) {
      erreurs.courriel = "Enter your email.";
    } else if (courrielMalForme(valeurs.courriel.trim())) {
      erreurs.courriel = "This email doesn’t look valid.";
    }
    if (!valeurs.sujet.trim()) erreurs.sujet = "Enter a subject.";
    if (!valeurs.message.trim()) erreurs.message = "Write your message.";
    return erreurs;
  }

  if (!valeurs.nom.trim()) erreurs.nom = "Indiquez votre nom.";
  if (!valeurs.courriel.trim()) {
    erreurs.courriel = "Indiquez votre courriel.";
  } else if (courrielMalForme(valeurs.courriel.trim())) {
    erreurs.courriel = "Ce courriel ne semble pas valide.";
  }
  if (!valeurs.sujet.trim()) erreurs.sujet = "Indiquez un sujet.";
  if (!valeurs.message.trim()) erreurs.message = "Écrivez votre message.";

  return erreurs;
}

const CHAMP_CLASSES =
  "mt-1.5 w-full rounded-lg border bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-white/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const BORDURE = (enErreur: boolean) =>
  enErreur ? "rgb(242 160 154 / 0.55)" : "rgb(255 255 255 / 0.14)";

const COORDONNEES = [
  {
    Icone: IconMail,
    libelle: { fr: "Courriel", en: "Email" },
    lignes: [COURRIEL],
    href: `mailto:${COURRIEL}`,
  },
  {
    Icone: IconPhone,
    libelle: { fr: "Téléphone", en: "Phone" },
    lignes: [TELEPHONE],
    href: `tel:${TELEPHONE_LIEN}`,
  },
  {
    Icone: IconMapPin,
    libelle: { fr: "Adresse", en: "Address" },
    lignes: ADRESSE,
    href: null,
  },
] as const;

/**
 * La page Contact rendue comme l'app de messagerie du web OS.
 *
 * Tout tient dans une seule fenêtre : panneau d'infos à gauche, composition à
 * droite — la métaphore du client mail porte la page, là où un formulaire posé
 * sur le fond n'aurait été qu'un encadré de plus.
 *
 * `jeton` vient du serveur, via la page : c'est la preuve que le formulaire a
 * été rendu, et sans elle la route refuse l'envoi (voir `lib/jetonContact.ts`).
 */
export function FenetreContact({
  lang = "fr",
  jeton,
}: Readonly<{ lang?: Lang; jeton: string }>) {
  const cadre = useRef<HTMLDivElement>(null);
  // Même respiration que les fenêtres du hero, en plus discret : celle-ci est
  // la cible d'une saisie, elle ne doit pas bouger sous le curseur.
  //
  // Gardée : hors écran ou onglet caché, la boucle s'arrête au lieu de tenir
  // une frame en vie pour rien. Le respect de `prefers-reduced-motion` est
  // dans la règle CSS (`.cp-flotte`), plus dans une branche ici — voir
  // JobPanel.
  const anime = useBoucleActive(cadre);

  return (
    <div className="relative" ref={cadre} data-anime={anime ? "true" : "false"}>
      {/* Lueur d'accent derrière la fenêtre : elle la détache du fond au lieu
          de la laisser posée à plat. Décorative, donc hors flux et hors a11y. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-6 -inset-y-10 -z-10"
        style={{
          background:
            "radial-gradient(55% 50% at 50% 45%, color-mix(in srgb, var(--soft) 14%, transparent), transparent 72%)",
        }}
      />

      <div
        className="cp-flotte"
        style={{ ["--flotte-distance" as string]: "-5px", ["--flotte-duree" as string]: "9s" }}
      >
        <WindowCard
          title={
            lang === "en"
              ? "New message · Cloud OS"
              : "Nouveau message · Cloud OS"
          }
          icone={<IconMail className="size-3.5" />}
          // La 3e pastille prend le cyan de support, pas `--acc` : par défaut
          // `--acc` vaut #2d66ae, le bleu qui n'apparaît nulle part ailleurs
          // dans cette fenêtre. `--soft` est déjà la valeur des pastilles
          // d'icône du volet gauche, et suit la recoloration du bureau comme
          // elles.
          accent="var(--soft)"
        >
          <div className="grid os:grid-cols-[34fr_66fr]">
            <PanneauCoordonnees lang={lang} />
            <Composition lang={lang} jeton={jeton} />
          </div>
        </WindowCard>
      </div>
    </div>
  );
}

/** Colonne de gauche : le panneau d'infos, façon barre latérale de client mail. */
function PanneauCoordonnees({ lang }: Readonly<{ lang: Lang }>) {
  return (
    // Le filet passe en bas quand la barre latérale repasse au-dessus du volet
    // de composition : en pile, une bordure droite ne sépare rien.
    //
    // Plus de `flex flex-col` : il n'existait que pour porter le `mt-auto` du
    // bloc du bas (voir plus bas). Le volet est de toute façon étiré à la
    // hauteur du formulaire par la grille parente, teinte de fond comprise.
    <aside className="border-b border-white/10 bg-black/[0.14] p-5 os:border-r os:border-b-0">
      {/* Vrais titres de section : la page n'avait que son H1, donc aucune
          structure à parcourir au lecteur d'écran. L'apparence ne change pas. */}
      <h2 className="text-[11px] font-medium tracking-wide text-white/70">
        {lang === "en" ? "Contact info" : "Coordonnées"}
      </h2>

      <ul className="mt-4 space-y-4">
        {COORDONNEES.map(({ Icone, libelle, lignes, href }) => (
          <li key={libelle.fr} className="flex gap-3">
            {/* Cyan : la valeur d'icône secondaire du site, la même partout
                (JobPanel, Réassurance, /mines…). L'accent bleu qui traînait ici
                n'apparaît nulle part ailleurs dans l'interface. */}
            <span
              data-cp-accent
              className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full"
              style={{ background: SOFT_WASH, color: "var(--soft)" }}
            >
              <Icone className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-white">
                {libelle[lang]}
              </p>
              {href ? (
                <a
                  href={href}
                  className="mt-0.5 inline-block text-[13px] leading-relaxed break-words text-white/70 underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {lignes[0]}
                </a>
              ) : (
                <p className="mt-0.5 text-[13px] leading-relaxed text-white/70">
                  {lignes.map((ligne) => (
                    <span key={ligne} className="block">
                      {ligne}
                    </span>
                  ))}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Suite immédiate des coordonnées, et non pied de volet.
          `mt-auto` collait ce bloc au bas du volet, donc à la hauteur du
          formulaire d'en face : entre l'adresse et lui s'ouvrait un vide de
          plusieurs centaines de pixels qui ne séparait rien. Les trois groupes
          se lisent maintenant d'un trait, et l'espace libre se retrouve là où
          il ne gêne pas — sous le dernier élément. */}
      <div className="mt-6">
        <p className="border-t border-white/10 pt-4 text-[11px] leading-relaxed text-white">
          {lang === "en" ? "We reply quickly." : "On vous répond rapidement."}
        </p>
        <CarteVisite lang={lang} />
      </div>
    </aside>
  );
}

/**
 * Fiche du destinataire, en bas du panneau.
 *
 * Elle reste dans la métaphore : c'est la fiche du contact, comme dans un vrai
 * client mail. Elle ne dit que ce qui est vrai en permanence — le nom et la
 * ville. La ligne « En ligne · disponible » qui s'y trouvait était codée en
 * dur : elle affirmait qu'on répondait à trois heures du matin un dimanche.
 */
function CarteVisite({ lang }: Readonly<{ lang: Lang }>) {
  return (
    <div className="mt-4 flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3">
      {/* Pastille de marque : l'anneau reprend le jaune de la tuile tel quel
          (#edbe54, jamais recoloré par l'accent), le disque suit l'accent. */}
      <span
        aria-hidden="true"
        data-cp-accent
        className="grid size-9 shrink-0 place-items-center rounded-full font-display text-sm font-extrabold text-white"
        style={{
          background: "color-mix(in srgb, var(--soft) 22%, transparent)",
          boxShadow: "inset 0 0 0 1.5px #edbe54",
        }}
      >
        C
      </span>

      <div className="min-w-0">
        <p className="truncate text-[13px] font-medium text-white">
          Cloud OS
        </p>
        <p className="truncate text-[11px] text-white/70">
          {lang === "en" ? "Amos, Quebec" : "Amos, Québec"}
        </p>
      </div>
    </div>
  );
}

/**
 * États du volet de composition.
 *
 * Les trois échecs sont distincts parce qu'ils appellent trois gestes
 * différents du visiteur : réessayer, attendre, recharger. Un message unique
 * « L'envoi a échoué » les confondait tous.
 */
// `robot` : le défi reCAPTCHA n'est pas résolu (ou son jeton a expiré avant
// l'envoi). Distinct d'`echec` : ici rien n'a été tenté, et le visiteur a
// quelque chose à faire pour y remédier.
type Etat =
  | "repos"
  | "envoi"
  | "succes"
  | "echec"
  | "debit"
  | "expire"
  | "robot";

/**
 * Libellé du bouton d'envoi.
 *
 * En table plutôt qu'en ternaires croisés (état × langue) : deux axes
 * indépendants imbriqués se lisent mal, et la table rend visible d'un coup
 * d'œil qu'aucune combinaison ne manque.
 */
const LIBELLE_BOUTON = {
  fr: { repos: "Envoyer", envoi: "Envoi…" },
  en: { repos: "Send", envoi: "Sending…" },
} as const;

/** Colonne de droite : la composition du courriel. */
function Composition({
  lang,
  jeton,
}: Readonly<{ lang: Lang; jeton: string }>) {
  const [valeurs, setValeurs] = useState<Valeurs>(VIDE);
  const [erreurs, setErreurs] = useState<Partial<Record<Cle, string>>>({});
  const [etat, setEtat] = useState<Etat>("repos");
  // Provenance, tirée de `?sujet=` : tag caché repris dans le courriel. Lu
  // directement sur `location` plutôt que par `useSearchParams`, pour ne pas
  // imposer de Suspense à la page — le préremplissage n'a de sens que côté
  // client, au montage.
  const [source, setSource] = useState("");
  // Champ piège. Un humain ne le voit pas, ne le tabule pas et ne l'entend pas ;
  // un robot qui remplit tout ce qu'il trouve le remplit, et le serveur écarte
  // l'envoi en silence.
  const [piege, setPiege] = useState("");
  // Jeton du défi reCAPTCHA : nul tant que la case n'est pas cochée, et
  // remis à nul quand Google le fait expirer (au bout de ~2 minutes).
  const [jetonRobot, setJetonRobot] = useState<string | null>(null);
  // Incrémenté après un envoi réussi : vide la case pour le message suivant.
  const [resetRobot, setResetRobot] = useState(0);

  useEffect(() => {
    // Le fragment, pas la chaîne de requête — voir `SUJETS_PREREMPLIS`. Le
    // `slice(1)` retire le `#` ; `URLSearchParams` fait le reste du décodage.
    const cle = new URLSearchParams(globalThis.location.hash.slice(1)).get(
      "sujet",
    );
    if (!cle) return;
    const libelle = SUJETS_PREREMPLIS[cle]?.[lang];
    /* eslint-disable react-hooks/set-state-in-effect --
       Synchronisation depuis une source navigateur (l'URL) au montage : le
       rendu statique reste volontairement vide, on remplit après hydratation
       pour éviter tout décalage. On ne remplit que si le champ est encore vide,
       pour ne jamais écraser une saisie de l'utilisateur. */
    setSource(cle);
    if (libelle) setValeurs((v) => (v.sujet ? v : { ...v, sujet: libelle }));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [lang]);

  function modifier(cle: Cle, valeur: string) {
    setValeurs((v) => ({ ...v, [cle]: valeur }));
    // L'erreur disparaît dès qu'on corrige : la laisser afficher pendant que
    // l'utilisateur retape est inutilement punitif.
    setErreurs((e) => (e[cle] ? { ...e, [cle]: undefined } : e));
    if (etat !== "repos") setEtat("repos");
  }

  async function envoyer(evenement: FormEvent<HTMLFormElement>) {
    evenement.preventDefault();

    const trouvees = valide(valeurs, lang);
    setErreurs(trouvees);
    if (Object.keys(trouvees).length > 0) {
      // Le focus part sur le premier champ fautif, sinon l'erreur passe
      // inaperçue au clavier comme au lecteur d'écran.
      const premier = (["nom", "courriel", "sujet", "message"] as const).find(
        (c) => trouvees[c],
      );
      if (premier) document.getElementById(`contact-${premier}`)?.focus();
      return;
    }

    // Vérifié avant l'appel réseau : inutile de déranger le serveur, et le
    // visiteur voit tout de suite ce qui manque.
    if (!jetonRobot) {
      setEtat("robot");
      return;
    }

    setEtat("envoi");
    try {
      const reponse = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...valeurs,
          source,
          jeton,
          piege,
          recaptcha: jetonRobot,
        }),
      });

      if (reponse.ok) {
        setEtat("succes");
        setValeurs(VIDE);
        // Un jeton reCAPTCHA ne sert qu'une fois : sans cette remise à zéro, un
        // second message partirait avec un jeton déjà consommé et serait refusé.
        setJetonRobot(null);
        setResetRobot((n) => n + 1);
        return;
      }

      // Quel que soit le motif du refus, le jeton est consommé côté Google :
      // on repart d'une case vierge, sinon le renvoi échoue en boucle sans que
      // le visiteur voie pourquoi.
      setJetonRobot(null);
      setResetRobot((n) => n + 1);

      // Le serveur nomme le motif quand il refuse le défi ; un corps illisible
      // ne doit pas faire échouer la lecture du statut, d'où le repli à null.
      const motif = await reponse
        .json()
        .then((corps: { motif?: string }) => corps.motif)
        .catch(() => undefined);

      // Le statut porte le diagnostic : 429 = trop d'envois depuis cette
      // source, 403 = jeton de page expiré (onglet ouvert depuis des heures,
      // ou serveur redémarré). Tout le reste est un vrai échec.
      if (reponse.status === 429) setEtat("debit");
      else if (reponse.status === 403) setEtat("expire");
      else if (motif === "recaptcha") setEtat("robot");
      else setEtat("echec");
    } catch {
      // Réseau coupé : la requête n'est jamais partie.
      setEtat("echec");
    }
  }

  return (
    <form onSubmit={envoyer} noValidate className="p-5 os:p-6">
      {/* Le volet de composition n'avait aucun titre : la barre de titre de la
          fenêtre n'en est pas un au sens du document. Annoncé, pas affiché —
          à l'écran, le formulaire se lit de lui-même. */}
      <h2 className="sr-only">
        {lang === "en" ? "Contact form" : "Formulaire de contact"}
      </h2>

      {/* Provenance, non éditable et invisible : c'est la valeur envoyée au
          serveur (et reprise dans le courriel), pas une saisie. */}
      <input type="hidden" name="source" value={source} readOnly />

      <ChampPiege lang={lang} valeur={piege} onChange={setPiege} />

      {/* Ligne destinataire : elle plante le décor « nouveau message ». Non
          modifiable — c'est la seule adresse possible — donc en texte plutôt
          qu'en input désactivé, qui promettrait une saisie inexistante. */}
      <div className="flex items-baseline gap-2 border-b border-white/10 pb-3">
        <span className="text-[11px] text-white/70">
          {lang === "en" ? "To:" : "À :"}
        </span>
        <span className="text-[13px] text-white">Cloud OS</span>
        <span className="truncate text-[11px] text-white/70">
          &lt;{COURRIEL}&gt;
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {CHAMPS.map(({ cle, libelle, type, autoComplete }) => (
          <div key={cle}>
            <label
              htmlFor={`contact-${cle}`}
              className="text-[13px] font-medium text-white"
            >
              {libelle[lang]}
            </label>
            <input
              id={`contact-${cle}`}
              type={type}
              autoComplete={autoComplete}
              value={valeurs[cle]}
              onChange={(e) => modifier(cle, e.target.value)}
              aria-invalid={erreurs[cle] ? true : undefined}
              aria-describedby={erreurs[cle] ? `erreur-${cle}` : undefined}
              className={CHAMP_CLASSES}
              style={{ borderColor: BORDURE(Boolean(erreurs[cle])) }}
            />
            <Erreur cle={cle} message={erreurs[cle]} />
          </div>
        ))}

        <div>
          <label
            htmlFor="contact-message"
            className="text-[13px] font-medium text-white"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            // Cinq lignes et non six : c'est le champ qui fixe la hauteur de
            // toute la fenêtre, et la sixième ne servait qu'à la faire dépasser
            // le bas de l'écran. Le champ reste redimensionnable (`resize-y`)
            // pour un message long, et le compteur dit où est la limite.
            rows={5}
            maxLength={LIMITE_MESSAGE}
            value={valeurs.message}
            onChange={(e) => modifier("message", e.target.value)}
            aria-invalid={erreurs.message ? true : undefined}
            aria-describedby={
              erreurs.message
                ? "erreur-message message-compteur"
                : "message-compteur"
            }
            className={`${CHAMP_CLASSES} resize-y`}
            style={{ borderColor: BORDURE(Boolean(erreurs.message)) }}
          />
          <Erreur cle="message" message={erreurs.message} />
          <Compteur longueur={valeurs.message.length} />
        </div>

        {/* Le défi, entre le message et le bouton : c'est le dernier geste
            avant l'envoi, il se lit là où le regard descend déjà. Il s'ajoute
            au champ piège et à la limite de débit, il ne les remplace pas. */}
        <div className="mt-4">
          <Recaptcha
            lang={lang}
            onJeton={(jeton) => {
              setJetonRobot(jeton);
              // Cocher la case efface le reproche affiché juste avant.
              if (jeton) setEtat((e) => (e === "robot" ? "repos" : e));
            }}
            reinitialiser={resetRobot}
          />
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-4">
          {/* Or plein : c'est l'unique action de la page, donc l'action
              principale par définition. Comme `BoutonCta`, et pour la même
              raison, il ne porte pas `data-cp-accent` — la couleur de
              conversion ne suit pas la recoloration du bureau.

              Sans ombre portée dorée : le jaune est un signe de marque, il vit
              dans la tuile du logo. Posé sous un bouton il le dilue, et le système est
              plat par ailleurs. L'or seul suffit à désigner l'action ; le seul
              anneau qui reste est celui du focus, net et blanc. */}
          <button
            type="submit"
            disabled={etat === "envoi"}
            className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-[filter,transform] duration-150 hover:brightness-110 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              background: "var(--cta)",
              color: "var(--cta-texte)",
            }}
          >
            <IconSend className="size-4" />
            {LIBELLE_BOUTON[lang][etat === "envoi" ? "envoi" : "repos"]}
          </button>

          {/* Emplacement conservé même au repos : le lecteur d'écran doit
              trouver la région déjà en place pour en annoncer le changement. */}
          <p aria-live="polite" className="text-[11px] leading-relaxed">
            <MessageEtat etat={etat} lang={lang} />
          </p>
        </div>

        <MentionFinalite lang={lang} />
      </div>
    </form>
  );
}

/**
 * Mention de finalité, sous le bouton d'envoi.
 *
 * Exigée par la loi 25 : la personne doit savoir à quoi servent les
 * renseignements au moment où elle les fournit, pas après. Elle est donc au
 * point de collecte plutôt que reléguée à la politique — le lien y mène pour
 * qui veut le détail.
 *
 * Dit ce qui est vrai et rien de plus : la route ne fait qu'expédier un
 * courriel (voir `app/api/contact/route.ts`), sans base de données ni liste
 * d'envoi. Promettre moins serait faux ; promettre plus, invérifiable.
 *
 * Le lien reste blanc souligné et non doré : l'or de la page désigne l'action
 * de conversion, et deux dorés côte à côte sous le même bouton n'en laissent
 * ressortir aucun.
 */
function MentionFinalite({ lang }: Readonly<{ lang: Lang }>) {
  const href = lang === "en" ? "/en/privacy" : "/confidentialite";

  return (
    <p className="text-[12px] leading-relaxed text-white/70">
      {lang === "en"
        ? "Your contact details are only used to reply to your message. See our "
        : "Vos coordonnées servent uniquement à répondre à votre message. Voir notre "}
      <a
        href={href}
        className="text-white underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {lang === "en" ? "privacy policy" : "politique de confidentialité"}
      </a>
      {"."}
    </p>
  );
}

/**
 * Champ piège.
 *
 * Hors écran plutôt qu'en `display:none` ou `hidden` : les moissonneurs les
 * plus sommaires sautent ce qui est explicitement masqué, alors qu'ils
 * remplissent ce qui est dans le flux. Le nom `entreprise` est choisi pour
 * paraître légitime à un robot qui décide d'après l'attribut `name`.
 *
 * Invisible aux humains sur les trois canaux à la fois : à l'œil (hors cadre),
 * au clavier (`tabIndex={-1}`) et au lecteur d'écran (`aria-hidden`).
 */
function ChampPiege({
  lang,
  valeur,
  onChange,
}: Readonly<{
  lang: Lang;
  valeur: string;
  onChange: (v: string) => void;
}>) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-9999px",
        width: 1,
        height: 1,
        overflow: "hidden",
      }}
    >
      <label htmlFor="contact-entreprise">
        {lang === "en" ? "Company" : "Entreprise"}
      </label>
      <input
        id="contact-entreprise"
        name="entreprise"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={valeur}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

/** Lien mailto vers l'adresse de contact, identique dans les deux langues. */
function LienCourriel() {
  return (
    <a
      href={`mailto:${COURRIEL}`}
      className="underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {COURRIEL}
    </a>
  );
}

/**
 * Ligne d'état sous le bouton d'envoi.
 *
 * Un emplacement, cinq messages exclusifs. Extrait de `Composition` plutôt
 * qu'imbriqué : autant de branches croisées avec deux langues donnaient des
 * ternaires sur quatre niveaux dans le JSX, et à eux seuls l'essentiel de la
 * complexité du composant parent. En sortie de fonction, chaque cas se lit
 * isolément.
 *
 * Ni vert ni rouge par défaut : le succès prend le cyan de support du site, les
 * échecs le corail de la palette. Le point final est écrit `{"."}` et non collé
 * en fin de ligne — JSX supprime le saut de ligne entre `</a>` et le texte qui
 * suit, donc la ponctuation se recolle bien au lien, mais rien ne le dit à la
 * lecture. L'accolade rend l'intention explicite au lieu de la laisser dépendre
 * d'une règle de découpage des blancs.
 */
function MessageEtat({ etat, lang }: Readonly<{ etat: Etat; lang: Lang }>) {
  if (etat === "succes") {
    return (
      <span data-cp-accent style={{ color: "var(--soft)" }}>
        {lang === "en"
          ? "Message sent — we reply quickly."
          : "Message envoyé — on vous répond rapidement."}
      </span>
    );
  }

  if (etat === "debit") {
    return (
      <span style={{ color: TEXTE_ERREUR }}>
        {lang === "en"
          ? "Too many attempts. Wait a few minutes, or email us directly at "
          : "Trop de tentatives. Patientez quelques minutes, ou écrivez directement à "}
        <LienCourriel />
        {"."}
      </span>
    );
  }

  if (etat === "expire") {
    return (
      <span style={{ color: TEXTE_ERREUR }}>
        {lang === "en"
          ? "This page has been open for a while. Reload it and send again."
          : "Cette page est ouverte depuis un moment. Rechargez-la et renvoyez."}
      </span>
    );
  }

  if (etat === "robot") {
    return (
      <span style={{ color: TEXTE_ERREUR }}>
        {lang === "en"
          ? "Please confirm you are not a robot before sending."
          : "Confirmez que vous n’êtes pas un robot avant d’envoyer."}
      </span>
    );
  }

  if (etat === "echec") {
    return (
      <span style={{ color: TEXTE_ERREUR }}>
        {lang === "en"
          ? "Something went wrong. Try again, or email us directly at "
          : "L’envoi a échoué. Réessayez, ou écrivez directement à "}
        <LienCourriel />
        {"."}
      </span>
    );
  }

  return null;
}

/**
 * Compteur de caractères du message.
 *
 * Discret tant qu'on est loin de la limite, il ne s'allume qu'à l'approche du
 * plafond — la saisie, elle, est bloquée net par `maxLength` sur le
 * `<textarea>`, donc il n'y a plus de risque de troncature à signaler ici,
 * juste la limite qui approche.
 */
function Compteur({ longueur }: Readonly<{ longueur: number }>) {
  const alerte = longueur > SEUIL_ALERTE;

  return (
    <p
      id="message-compteur"
      className={`mt-1.5 text-right text-[11px] tabular-nums ${
        alerte ? "" : "text-white/70"
      }`}
      style={alerte ? { color: "var(--cta)" } : undefined}
    >
      {longueur} / {LIMITE_MESSAGE}
    </p>
  );
}

function Erreur({ cle, message }: Readonly<{ cle: Cle; message?: string }>) {
  if (!message) return null;
  return (
    <p
      id={`erreur-${cle}`}
      className="mt-1.5 text-[12px]"
      style={{ color: TEXTE_ERREUR }}
    >
      {message}
    </p>
  );
}
