"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  IconMail,
  IconMapPin,
  IconPhone,
  IconSend,
} from "./icons";
import { WindowCard } from "./WindowCard";
import {
  ADRESSE,
  COURRIEL,
  TELEPHONE,
  TELEPHONE_LIEN,
} from "./coordonnees";
import type { Lang } from "./tokens";

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
 * Sujets préremplis depuis l'URL (`/contact?sujet=<clé>`).
 *
 * La clé sert de tag de provenance (champ `source` caché, repris dans le
 * courriel), le libellé préremplit le champ Sujet visible. Aujourd'hui une
 * seule entrée : le bouton « Réservez une démo » de /mines.
 */
const SUJETS_PREREMPLIS: Record<string, { fr: string; en: string }> = {
  exploration: {
    fr: "Démonstration — exploration minière",
    en: "Demo — mineral exploration",
  },
};

/** Plafond du message, en miroir de `LIMITE_MESSAGE` côté route serveur (`app/api/contact/route.ts`). */
const LIMITE_MESSAGE = 5000;
const SEUIL_ALERTE = 4500;

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string },
      ) => Promise<string>;
    };
  }
}

/**
 * Récupère un jeton reCAPTCHA v3, invisible pour le visiteur.
 *
 * `action: "contact"` doit correspondre à ce que la route serveur attend :
 * un jeton obtenu ailleurs sur le site (une autre action) y est rejeté.
 */
function obtenirJetonRecaptcha(): Promise<string> {
  return new Promise((resolve, reject) => {
    const cleSite = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!cleSite || !window.grecaptcha) {
      reject(new Error("reCAPTCHA indisponible."));
      return;
    }
    window.grecaptcha.ready(() => {
      window
        .grecaptcha!.execute(cleSite, { action: "contact" })
        .then(resolve, reject);
    });
  });
}

/**
 * Validation volontairement permissive sur le courriel.
 *
 * Une adresse valide au sens de la RFC accepte des formes que presque aucune
 * regex ne couvre ; on se contente donc d'écarter les fautes de frappe
 * évidentes (pas d'arobase, pas de point après). Le vrai contrôle se fera à
 * l'envoi serveur.
 */
function valide(valeurs: Valeurs, lang: Lang): Partial<Record<Cle, string>> {
  const erreurs: Partial<Record<Cle, string>> = {};

  if (lang === "en") {
    if (!valeurs.nom.trim()) erreurs.nom = "Enter your name.";
    if (!valeurs.courriel.trim()) {
      erreurs.courriel = "Enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valeurs.courriel.trim())) {
      erreurs.courriel = "This email doesn’t look valid.";
    }
    if (!valeurs.sujet.trim()) erreurs.sujet = "Enter a subject.";
    if (!valeurs.message.trim()) erreurs.message = "Write your message.";
    return erreurs;
  }

  if (!valeurs.nom.trim()) erreurs.nom = "Indiquez votre nom.";
  if (!valeurs.courriel.trim()) {
    erreurs.courriel = "Indiquez votre courriel.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valeurs.courriel.trim())) {
    erreurs.courriel = "Ce courriel ne semble pas valide.";
  }
  if (!valeurs.sujet.trim()) erreurs.sujet = "Indiquez un sujet.";
  if (!valeurs.message.trim()) erreurs.message = "Écrivez votre message.";

  return erreurs;
}

const CHAMP_CLASSES =
  "mt-1.5 w-full rounded-lg border bg-white/[0.04] px-3 py-2 text-sm text-[#eef4ff] placeholder:text-[#93a3c2]/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]";

const BORDURE = (enErreur: boolean) =>
  enErreur ? "rgb(248 113 113 / 0.6)" : "rgb(255 255 255 / 0.12)";

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
 */
export function FenetreContact({ lang = "fr" }: { lang?: Lang }) {
  const reduceMotion = useReducedMotion();

  // Même respiration que les fenêtres du hero, en plus discret : celle-ci est
  // la cible d'une saisie, elle ne doit pas bouger sous le curseur.
  const flottement = reduceMotion
    ? undefined
    : {
        animate: { y: [0, -5, 0] },
        transition: {
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  return (
    <div className="relative">
      {/* Lueur d'accent derrière la fenêtre : elle la détache du fond au lieu
          de la laisser posée à plat. Décorative, donc hors flux et hors a11y. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-6 -inset-y-10 -z-10"
        style={{
          background:
            "radial-gradient(55% 50% at 50% 45%, color-mix(in srgb, var(--acc) 20%, transparent), transparent 72%)",
        }}
      />

      <motion.div {...flottement}>
        <WindowCard
          title={
            lang === "en"
              ? "New message · Cloud Paradise"
              : "Nouveau message · Cloud Paradise"
          }
          icone={<IconMail className="size-3.5" />}
        >
          <div className="grid os:grid-cols-[34fr_66fr]">
            <PanneauCoordonnees lang={lang} />
            <Composition lang={lang} />
          </div>
        </WindowCard>
      </motion.div>
    </div>
  );
}

/** Colonne de gauche : le panneau d'infos, façon barre latérale de client mail. */
function PanneauCoordonnees({ lang }: { lang: Lang }) {
  return (
    <aside
      // Colonne flex : la ligne d'ambiance est poussée en bas par `mt-auto`,
      // sinon le panneau — aussi haut que la composition d'en face — laisse un
      // grand vide sous la dernière coordonnée.
      // Le filet passe en bas quand la barre latérale repasse au-dessus du
      // volet de composition : en pile, une bordure droite ne sépare rien.
      className="flex flex-col border-b border-white/10 bg-black/[0.14] p-5 os:border-r os:border-b-0"
    >
      {/* Vrais titres de section : la page n'avait que son H1, donc aucune
          structure à parcourir au lecteur d'écran. L'apparence ne change pas. */}
      <h2 className="text-[11px] font-medium tracking-wide text-white/50">
        {lang === "en" ? "Contact info" : "Coordonnées"}
      </h2>

      <ul className="mt-4 space-y-4">
        {COORDONNEES.map(({ Icone, libelle, lignes, href }) => (
          <li key={libelle.fr} className="flex gap-3">
            <span
              data-cp-accent
              className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full"
              style={{
                background: "color-mix(in srgb, var(--acc) 15%, transparent)",
                color: "var(--acc-text)",
              }}
            >
              <Icone className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-[#eef4ff]">
                {libelle[lang]}
              </p>
              {href ? (
                <a
                  href={href}
                  className="mt-0.5 inline-block text-[13px] leading-relaxed break-words text-[#93a3c2] underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {lignes[0]}
                </a>
              ) : (
                <p className="mt-0.5 text-[13px] leading-relaxed text-[#93a3c2]">
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

      {/* Ligne d'ambiance, volontairement au conditionnel : c'est un usage
          observé, pas un engagement de délai. */}
      {/* Bloc de pied du panneau : c'est lui qui est poussé en bas, pas la
          seule ligne d'ambiance, sinon la carte s'en détacherait. */}
      <div className="os:mt-auto">
        <p className="mt-6 border-t border-white/10 pt-4 text-[11px] leading-relaxed text-[#93a3c2]">
          {lang === "en"
            ? "We reply within 1 business day."
            : "Réponse sous 1 jour ouvrable."}
        </p>
        <CarteVisite lang={lang} />
      </div>
    </aside>
  );
}

/**
 * Fiche de contact d'ambiance, en bas du panneau.
 *
 * Elle remplit le bas de la barre latérale — plus courte que la composition
 * d'en face — tout en restant dans la métaphore : c'est la fiche du
 * destinataire, comme dans un vrai client mail.
 */
function CarteVisite({ lang }: { lang: Lang }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mt-4 flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3">
      {/* Pastille de marque : l'anneau reprend le jaune du halo tel quel
          (#edbe54, jamais recoloré par l'accent), le disque suit l'accent. */}
      <span
        aria-hidden="true"
        data-cp-accent
        className="grid size-9 shrink-0 place-items-center rounded-full font-display text-sm font-bold"
        style={{
          background: "color-mix(in srgb, var(--acc) 26%, transparent)",
          boxShadow: "inset 0 0 0 1.5px #edbe54",
          color: "#eef4ff",
        }}
      >
        C
      </span>

      <div className="min-w-0">
        <p className="truncate text-[13px] font-medium text-[#eef4ff]">
          Cloud Paradise
        </p>
        <p className="truncate text-[11px] text-[#93a3c2]">
          {lang === "en" ? "Amos, Quebec" : "Amos, Québec"}
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-[11px] text-[#93a3c2]">
          {/* Décoratif : le texte à côté dit déjà la même chose, un
              `aria-label` ferait doublon au lecteur d'écran. */}
          <span
            aria-hidden="true"
            className={`size-1.5 shrink-0 rounded-full ${
              reduceMotion ? "" : "animate-pulse"
            }`}
            style={{ background: "#3fbf7f" }}
          />
          {lang === "en" ? "Online · available" : "En ligne · disponible"}
        </p>
      </div>
    </div>
  );
}

type Etat = "repos" | "envoi" | "succes" | "erreur";

/** Colonne de droite : la composition du courriel. */
function Composition({ lang }: { lang: Lang }) {
  const [valeurs, setValeurs] = useState<Valeurs>(VIDE);
  const [erreurs, setErreurs] = useState<Partial<Record<Cle, string>>>({});
  const [etat, setEtat] = useState<Etat>("repos");
  // Provenance, tirée de `?sujet=` : tag caché repris dans le courriel. Lu via
  // window plutôt que `useSearchParams` pour ne pas imposer de Suspense à la
  // page — le préremplissage n'a de sens que côté client, au montage.
  const [source, setSource] = useState("");

  useEffect(() => {
    const cle = new URLSearchParams(window.location.search).get("sujet");
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

  async function envoyer() {
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

    setEtat("envoi");
    try {
      const recaptchaToken = await obtenirJetonRecaptcha();
      const reponse = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...valeurs, source, recaptchaToken }),
      });
      if (!reponse.ok) throw new Error("Échec de l'envoi");

      setEtat("succes");
      setValeurs(VIDE);
    } catch {
      setEtat("erreur");
    }
  }

  return (
    // Pas de <form action> : le projet gère tout par handlers, et une
    // soumission native rechargerait la page pour rien.
    <div className="p-5 os:p-6">
      {/* Le volet de composition n'avait aucun titre : la barre de titre de la
          fenêtre n'en est pas un au sens du document. Annoncé, pas affiché —
          à l'écran, le formulaire se lit de lui-même. */}
      <h2 className="sr-only">
        {lang === "en" ? "Contact form" : "Formulaire de contact"}
      </h2>

      {/* Provenance, non éditable et invisible : c'est la valeur envoyée au
          serveur (et reprise dans le courriel), pas une saisie. */}
      <input type="hidden" name="source" value={source} readOnly />

      {/* Ligne destinataire : elle plante le décor « nouveau message ». Non
          modifiable — c'est la seule adresse possible — donc en texte plutôt
          qu'en input désactivé, qui promettrait une saisie inexistante. */}
      <div className="flex items-baseline gap-2 border-b border-white/10 pb-3">
        <span className="text-[11px] text-[#93a3c2]">
          {lang === "en" ? "To:" : "À :"}
        </span>
        <span className="text-[13px] text-[#dbe6fb]">Cloud Paradise</span>
        <span className="truncate text-[11px] text-[#93a3c2]">
          &lt;{COURRIEL}&gt;
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {CHAMPS.map(({ cle, libelle, type, autoComplete }) => (
          <div key={cle}>
            <label
              htmlFor={`contact-${cle}`}
              className="text-[13px] font-medium text-[#dbe6fb]"
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
            className="text-[13px] font-medium text-[#dbe6fb]"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            rows={6}
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

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={envoyer}
            disabled={etat === "envoi"}
            data-cp-accent
            className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60"
            style={{ background: "var(--acc)" }}
          >
            <IconSend className="size-4" />
            {etat === "envoi"
              ? lang === "en"
                ? "Sending…"
                : "Envoi…"
              : lang === "en"
                ? "Send"
                : "Envoyer"}
          </button>

          {/* Protégé par reCAPTCHA v3 : invisible pour le visiteur, donc pas
              de case à cocher ici — seule cette mention l'annonce, comme
              Google l'exige de tout site qui l'utilise. */}
          <p aria-live="polite" className="text-[11px] leading-relaxed">
            {etat === "succes" ? (
              <span className="text-[#dbe6fb]">
                {lang === "en"
                  ? "Message sent — we reply within 1 business day."
                  : "Message envoyé — réponse sous 1 jour ouvrable."}
              </span>
            ) : etat === "erreur" ? (
              <span className="text-red-300">
                {lang === "en" ? (
                  <>
                    Something went wrong. Try again, or email us directly at{" "}
                    <a
                      href={`mailto:${COURRIEL}`}
                      className="underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {COURRIEL}
                    </a>
                    .
                  </>
                ) : (
                  <>
                    L’envoi a échoué. Réessayez, ou écrivez directement à{" "}
                    <a
                      href={`mailto:${COURRIEL}`}
                      className="underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {COURRIEL}
                    </a>
                    .
                  </>
                )}
              </span>
            ) : (
              <span className="text-[#93a3c2]">
                {lang === "en" ? (
                  <>
                    This site is protected by reCAPTCHA — Google{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      className="underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://policies.google.com/terms"
                      className="underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Terms of Service
                    </a>
                    .
                  </>
                ) : (
                  <>
                    Ce site est protégé par reCAPTCHA — Google{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      className="underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Politique de confidentialité
                    </a>{" "}
                    et{" "}
                    <a
                      href="https://policies.google.com/terms"
                      className="underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Conditions d’utilisation
                    </a>
                    .
                  </>
                )}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Compteur de caractères du message.
 *
 * Discret tant qu'on est loin de la limite, il ne s'allume qu'à l'approche du
 * plafond — la saisie, elle, est bloquée net par `maxLength` sur le
 * `<textarea>`, donc il n'y a plus de risque de troncature à signaler ici,
 * juste la limite qui approche.
 */
function Compteur({ longueur }: { longueur: number }) {
  const alerte = longueur > SEUIL_ALERTE;

  return (
    <p
      id="message-compteur"
      className={`mt-1.5 text-right text-[11px] tabular-nums ${
        alerte ? "text-amber-300" : "text-[#93a3c2]"
      }`}
    >
      {longueur} / {LIMITE_MESSAGE}
    </p>
  );
}

function Erreur({ cle, message }: { cle: Cle; message?: string }) {
  if (!message) return null;
  return (
    <p id={`erreur-${cle}`} className="mt-1.5 text-[12px] text-red-300">
      {message}
    </p>
  );
}
