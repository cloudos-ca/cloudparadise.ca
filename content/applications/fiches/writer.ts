import type { FicheApplication } from "../types";

/**
 * Writer — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés le 2026-09-25 :
 * - Texte, tableur et présentation en co-édition (/fonctions de la vitrine, déjà relue).
 * - L'éditeur est Collabora Online, servi par l'infrastructure de Cloud OS
 *   (infra/aws/cloudos/compose/data.yml, dépôt cloudparadise_hpc) ; un nouveau document est un .docx
 *   (constaté sur dev avec le compte de captures).
 * - Ordinateur seulement (`desktopOnly`, app-registry.tsx).
 *
 * À trancher à la relecture : Collabora tourne en édition « Développeur » (CODE), destinée par son
 * éditeur à l'usage personnel et aux essais. Nommer Collabora sur la fiche, ou non.
 */
export const writer: FicheApplication = {
  id: "writer",
  apps: ["writer"],
  slug: { fr: "traitement-de-texte", en: "word-processor" },
  nom: { fr: "Writer", en: "Writer" },
  titre: {
    fr: "Writer, le traitement de texte en ligne",
    en: "Writer, the online word processor",
  },
  groupe: "bureautique",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Traitement de texte en ligne, en co-édition — Cloud OS",
      en: "Online word processor with co-editing — Cloud OS",
    },
    description: {
      fr: "Rédigez vos documents Word dans le navigateur, à plusieurs en même temps, sans rien installer. Vos fichiers restent dans votre espace, hébergé au Québec.",
      en: "Write your Word documents in the browser, several people at once, with nothing to install. Your files stay in your own space, hosted in Québec.",
    },
  },
  accroche: {
    fr: "Vos documents Word, dans le navigateur, à plusieurs.",
    en: "Your Word documents, in the browser, together.",
  },
  motsCles: {
    fr: ["traitement de texte en ligne", "éditeur docx en ligne", "co-édition de documents", "alternative à word en ligne"],
    en: ["online word processor", "online docx editor", "document co-editing", "online word alternative"],
  },
  corps: {
    fr: [
      {
        titre: "Un vrai traitement de texte, pas un bloc-notes",
        paragraphes: [
          "Writer ouvre vos documents dans une fenêtre du bureau, avec ce qu'on attend d'un traitement de texte complet : styles de titres, mise en page, tableaux, images, révision. Un nouveau document est enregistré au format Word (.docx), celui que vos clients et partenaires ouvrent sans se poser de question.",
        ],
      },
      {
        titre: "À plusieurs sur le même document",
        paragraphes: [
          "Writer fait partie de la suite bureautique de Cloud OS — texte, tableur et présentation — en co-édition : plusieurs personnes travaillent sur le même fichier, au même moment, sans s'échanger de versions par courriel.",
        ],
      },
      {
        titre: "Vos documents restent chez vous",
        paragraphes: [
          "Chaque document vit dans l'application Fichiers de votre espace, hébergé au Québec. Rien à installer ni à mettre à jour sur votre poste.",
        ],
        points: [
          "Compris dès le forfait Personnel, sans licence par utilisateur à acheter à part.",
          "Writer s'utilise depuis un ordinateur ; il n'est pas proposé sur téléphone.",
        ],
      },
    ],
    en: [
      {
        titre: "A real word processor, not a notepad",
        paragraphes: [
          "Writer opens your documents in a window of the desktop, with what you expect from a full word processor: heading styles, page layout, tables, images, track changes. A new document is saved in Word format (.docx), the one your clients and partners open without a second thought.",
        ],
      },
      {
        titre: "Several people on the same document",
        paragraphes: [
          "Writer is part of the Cloud OS office suite — text, spreadsheet and presentation — with co-editing: several people work on the same file at the same time, without emailing versions back and forth.",
        ],
      },
      {
        titre: "Your documents stay with you",
        paragraphes: [
          "Every document lives in the Files app of your own space, hosted in Québec. Nothing to install or update on your computer.",
        ],
        points: [
          "Included from the Personal plan, with no per-user licence to buy separately.",
          "Writer is used from a computer; it is not offered on phones.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Writer ouvre-t-il les fichiers Word ?",
        reponse: "Oui. Writer ouvre et enregistre les documents Word (.docx) ; un nouveau document est créé dans ce format.",
      },
      {
        question: "Peut-on travailler à plusieurs sur un document ?",
        reponse: "Oui. La suite bureautique de Cloud OS fonctionne en co-édition : plusieurs personnes modifient le même fichier en même temps.",
      },
      {
        question: "Faut-il acheter une licence de traitement de texte ?",
        reponse: "Non. Writer est compris dans l'abonnement dès le forfait Personnel, comme le reste de la suite bureautique.",
      },
    ],
    en: [
      {
        question: "Does Writer open Word files?",
        reponse: "Yes. Writer opens and saves Word documents (.docx); a new document is created in that format.",
      },
      {
        question: "Can several people work on one document?",
        reponse: "Yes. The Cloud OS office suite supports co-editing: several people edit the same file at the same time.",
      },
      {
        question: "Do I need to buy a word processor licence?",
        reponse: "No. Writer is included in the subscription from the Personal plan, like the rest of the office suite.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/writer/writer-document.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "Writer ouvert dans Cloud OS sur un compte rendu de campagne de forage",
        en: "Writer open in Cloud OS on a drilling campaign report",
      },
    },
  ],
  voisines: ["erp", "gimp"],
  articles: [
    { slug: "onlyoffice-vs-libreoffice", titre: "OnlyOffice vs LibreOffice : quelle suite choisir pour votre PME ?" },
    { slug: "partage-de-fichiers-securise", titre: "Partage de fichiers sécurisé : ce que les équipes doivent exiger" },
  ],
};
