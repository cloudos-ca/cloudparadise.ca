import type { FicheApplication } from "../types";

/**
 * VSCodium — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Image `linuxserver/vscodium` (src/lib/marketplace/desktop-apps-catalog.ts), diffusée dans une
 *   fenêtre du bureau ; ordinateur seulement (`desktopOnly`, app-registry.tsx).
 * - L'image installe le .deb publié par le projet VSCodium (github.com/VSCodium/vscodium/releases),
 *   plus `git` (Dockerfile de github.com/linuxserver/docker-vscodium, lu le 2026-09-25).
 * - `openCmd: "codium"` : un fichier importé depuis Fichiers s'ouvre directement dans l'éditeur
 *   (importFilesToDesktopAppAction).
 * - « Enregistrer » renvoie dans Fichiers les fichiers nouveaux ou modifiés de ~/Stockage, chacun
 *   comme un nouveau fichier (exportDesktopAppFilesAction). NON récursif (listStorageFiles) : un
 *   dossier de projet avec sous-dossiers n'est pas renvoyé tel quel. D'où le passage sur Git.
 * - Session temporaire : tout /config (le dossier personnel, donc extensions et réglages) est en RAM
 *   et disparaît à la fermeture (compose-validate.ts, appfiles-session.ts).
 * - VSCodium : binaires MIT du code source de VS Code, sans la télémétrie ni la licence Microsoft ;
 *   extensions depuis Open VSX par défaut (vscodium.com, FAQ du projet).
 * - Forfait : `personnel` (GET /api/v1/apps/catalog).
 *
 * À vérifier à la relecture :
 * - Le pont fichiers (MARKETPLACE_APPFILES) est actif en production.
 * - Que la session atteint bien Internet (clone/push Git, Open VSX) : aucune restriction de sortie
 *   dans compose-validate.ts, mais pas essayé.
 * - Chaque ouverture consomme des crédits (chargeForJob « MARKETPLACE ») : pas de « sans supplément ».
 * - La fiche ne dit rien de VS Code (desktop-vscode), retenu en attente de vérification de licence.
 */
export const vscodium: FicheApplication = {
  id: "vscodium",
  apps: ["desktop-vscodium"],
  slug: { fr: "vscodium", en: "vscodium" },
  nom: { fr: "VSCodium", en: "VSCodium" },
  tiers: { editeur: "The VSCodium project", licence: "MIT", site: "https://vscodium.com/" },
  titre: {
    fr: "VSCodium en ligne, l'éditeur de code libre sans rien installer",
    en: "VSCodium online, the open-source code editor with nothing to install",
  },
  groupe: "developpement",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "VSCodium en ligne : éditeur de code libre — Cloud OS",
      en: "VSCodium online: open-source code editor — Cloud OS",
    },
    description: {
      fr: "Codez avec VSCodium, la version libre et sans télémétrie de l'éditeur VS Code, directement dans le navigateur. Rien à installer, hébergé au Québec.",
      en: "Code with VSCodium, the free, open-source build of the VS Code editor without telemetry, right in your browser. Nothing to install, hosted in Québec.",
    },
  },
  accroche: {
    fr: "L'éditeur de code libre, sans télémétrie, dans votre navigateur.",
    en: "The open-source code editor, without telemetry, in your browser.",
  },
  motsCles: {
    fr: ["vscodium en ligne", "éditeur de code en ligne", "vs code sans télémétrie", "ide dans le navigateur", "alternative à vs code"],
    en: ["vscodium online", "online code editor", "vs code without telemetry", "ide in the browser", "vs code alternative"],
  },
  corps: {
    fr: [
      {
        titre: "Le code de VS Code, sans la télémétrie",
        paragraphes: [
          "VSCodium est construit à partir du code source ouvert de l'éditeur VS Code, sous licence MIT, sans la télémétrie ni la licence propriétaire du binaire de Microsoft. Vous retrouvez l'interface que vous connaissez : explorateur de fichiers, recherche, terminal intégré, coloration et complétion pour la plupart des langages.",
          "Les extensions s'installent depuis Open VSX, le registre ouvert qu'utilise VSCodium. Dans Cloud OS, c'est l'éditeur lui-même qui tourne, dans une fenêtre de votre bureau en ligne.",
        ],
      },
      {
        titre: "Vos fichiers, ou votre dépôt Git",
        paragraphes: [
          "Pour retoucher quelques fichiers, envoyez-les depuis l'application Fichiers : ils s'ouvrent directement dans l'éditeur, et vous les renvoyez dans Fichiers une fois modifiés, comme de nouveaux fichiers. L'original n'est jamais écrasé.",
          "Pour un projet entier, Git est installé dans la session : clonez votre dépôt, travaillez, puis poussez vos commits avant de fermer.",
        ],
      },
      {
        titre: "Ce qu'il faut savoir",
        paragraphes: [
          "La session de VSCodium est temporaire : ce qui n'est ni renvoyé dans Fichiers ni poussé dans votre dépôt disparaît à la fermeture, extensions et réglages compris. VSCodium s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
        ],
      },
    ],
    en: [
      {
        titre: "VS Code's source, without the telemetry",
        paragraphes: [
          "VSCodium is built from the open-source code of the VS Code editor, under the MIT licence, without the telemetry or the proprietary licence of Microsoft's binary. You get the interface you know: file explorer, search, built-in terminal, highlighting and completion for most languages.",
          "Extensions install from Open VSX, the open registry VSCodium uses. In Cloud OS, the editor itself runs in a window of your online desktop.",
        ],
      },
      {
        titre: "Your files, or your Git repository",
        paragraphes: [
          "To touch up a few files, send them from the Files app: they open straight in the editor, and you send them back to Files once edited, as new files. The original is never overwritten.",
          "For a whole project, Git is installed in the session: clone your repository, work, then push your commits before closing.",
        ],
      },
      {
        titre: "Good to know",
        paragraphes: [
          "A VSCodium session is temporary: anything neither sent back to Files nor pushed to your repository is gone when it closes, extensions and settings included. VSCodium is used from a computer; it is not offered on phones.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Quelle différence entre VSCodium et VS Code ?",
        reponse: "VSCodium est compilé à partir du même code source ouvert, mais sans la télémétrie ni la licence propriétaire du binaire de Microsoft. Ses extensions viennent du registre ouvert Open VSX.",
      },
      {
        question: "Mes extensions et réglages sont-ils conservés ?",
        reponse: "Non. La session est temporaire : les extensions et réglages repartent de zéro à chaque ouverture. Votre code, lui, est conservé s'il est renvoyé dans Fichiers ou poussé dans votre dépôt Git.",
      },
      {
        question: "VSCodium est-il compris dans l'abonnement ?",
        reponse: "Oui, dès le forfait Personnel, comme les autres logiciels du bureau.",
      },
    ],
    en: [
      {
        question: "What is the difference between VSCodium and VS Code?",
        reponse: "VSCodium is compiled from the same open-source code, but without the telemetry or the proprietary licence of Microsoft's binary. Its extensions come from the open Open VSX registry.",
      },
      {
        question: "Are my extensions and settings kept?",
        reponse: "No. The session is temporary: extensions and settings start fresh each time. Your code is kept if it is sent back to Files or pushed to your Git repository.",
      },
      {
        question: "Is VSCodium included in the subscription?",
        reponse: "Yes, from the Personal plan, like the other desktop software.",
      },
    ],
  },
  captures: [],
  voisines: ["agent-de-code", "github-desktop", "bac-a-sable"],
  articles: [],
};
