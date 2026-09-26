import type { FicheApplication } from "../types";

/**
 * Fichiers — ÉBAUCHE, à relire avant publication.
 *
 * Faits vérifiés dans le produit (cloudparadise_hpc) le 2026-09-25 :
 * - Dossiers, téléversement par glisser-déposer, copier/couper/coller, compression en .zip et
 *   extraction, propriétés, vue liste ou grille (files.toolbar / files.grid, fr.json ;
 *   src/components/os/apps/fichiers/).
 * - Téléversement jusqu'à 20 Go par fichier (MAX_UPLOAD_BYTES, src/lib/files/upload-client.ts).
 * - « Créer un document » : .docx, .xlsx ou .pptx (files.toolbar.docWord/docExcel/docPowerpoint) ; les
 *   formats bureautiques s'ouvrent dans l'éditeur intégré, les PDF dans le lecteur, images, vidéos et
 *   sons dans l'aperçu (src/lib/files/resolve-open.ts).
 * - « Télécharger une URL » : le fichier est récupéré en arrière-plan et déposé dans Fichiers
 *   (files.toolbar.directDownload*).
 * - Plusieurs fenêtres Fichiers à la fois, glisser-déposer d'une fenêtre à l'autre (commentaire du
 *   registre, app-registry.tsx).
 * - Corbeille avec restauration et vidage (src/lib/files/trash-core.ts : restoreTrashedNode,
 *   emptyTrash).
 * - Recherche dans le CONTENU des fichiers depuis Spotlight : texte extrait des PDF et documents
 *   (src/lib/search/index-file.ts) ; aussi sur /fonctions, déjà relue.
 * - Partage : un fichier ou un dossier (et son contenu) se partage avec une ou plusieurs ÉQUIPES
 *   (ShareTeamsDialog, src/components/os/share-teams-dialog.tsx). Aucun lien public ni partage
 *   à une personne hors équipe dans le code : ne pas le promettre.
 * - Onglet « Résultats » : les fichiers produits par vos tâches, rangés automatiquement dans
 *   Documents, Vidéos, Musiques, Images ou Fichiers (src/lib/files/categorize.ts).
 * - Comptes Google Drive et OneDrive : importer des fichiers, renvoyer un fichier vers le compte
 *   (files.cloud, fr.json ; src/lib/cloud/).
 * - Stockage objet sur l'infrastructure AWS ca-central-1 (Montréal) depuis la migration de septembre
 *   2026 (infra/aws/README.md) : « hébergé au Québec » tient.
 * - Pas `desktopOnly` : l'app n'est pas réservée à l'ordinateur. Forfait Personnel
 *   (GET /api/v1/apps/catalog : `plan: "personnel"`).
 *
 * À vérifier à la relecture :
 * - Que les connexions Google Drive et OneDrive sont configurées en production (sinon l'app affiche
 *   « Non configuré par l'administrateur ») : la fiche les cite.
 * - L'article « Partage de fichiers sécurisé » parle peut-être de liens publics avec expiration :
 *   Fichiers n'en a pas (partage par équipe seulement). Le lien reste pertinent, mais à relire.
 * - Aucune durée de conservation automatique de la Corbeille trouvée : la fiche n'en cite pas.
 */
export const fichiers: FicheApplication = {
  id: "fichiers",
  apps: ["files"],
  slug: { fr: "stockage-de-fichiers", en: "file-storage" },
  nom: { fr: "Fichiers", en: "Files" },
  titre: {
    fr: "Fichiers, votre stockage en ligne hébergé au Québec",
    en: "Files, your online storage hosted in Québec",
  },
  groupe: "bureau",
  forfait: "personnel",
  seo: {
    titre: {
      fr: "Stockage de fichiers en ligne, hébergé au Québec — Cloud OS",
      en: "Online file storage, hosted in Québec — Cloud OS",
    },
    description: {
      fr: "Rangez, ouvrez et partagez vos fichiers en équipe dans le navigateur : dossiers, recherche dans le contenu, corbeille. Vos données restent au Québec.",
      en: "Store, open and share your files with your team in the browser: folders, search inside documents, a trash bin. Your data stays in Québec.",
    },
  },
  accroche: {
    fr: "Tous vos fichiers au même endroit, ouverts d'un double-clic, partagés avec votre équipe.",
    en: "All your files in one place, opened with a double-click, shared with your team.",
  },
  motsCles: {
    fr: ["stockage de fichiers en ligne", "stockage infonuagique québec", "partage de fichiers en équipe", "alternative à google drive", "gestionnaire de fichiers en ligne"],
    en: ["online file storage", "cloud storage canada", "team file sharing", "google drive alternative", "online file manager"],
  },
  corps: {
    fr: [
      {
        titre: "Un vrai gestionnaire de fichiers, dans le navigateur",
        paragraphes: [
          "Fichiers est le cœur de votre bureau Cloud OS : vos documents, images, vidéos et archives y sont rangés en dossiers, comme sur votre ordinateur. Vous glissez des fichiers depuis votre poste pour les téléverser, vous copiez, coupez, collez, et vous ouvrez plusieurs fenêtres pour déplacer un fichier d'un dossier à l'autre.",
        ],
        points: [
          "Téléversement jusqu'à 20 Go par fichier.",
          "Compression en .zip et extraction d'une archive sur place.",
          "Récupération d'un fichier depuis une adresse Web, en arrière-plan.",
          "Une corbeille, pour restaurer ce qui a été supprimé trop vite.",
        ],
      },
      {
        titre: "Chaque fichier s'ouvre où il faut",
        paragraphes: [
          "Un double-clic suffit : un document Word, Excel ou PowerPoint s'ouvre dans l'éditeur intégré, un PDF dans le lecteur, une image, une vidéo ou un son dans l'aperçu, sans téléchargement. Vous pouvez aussi créer un nouveau document texte, classeur ou présentation directement dans le dossier où vous êtes.",
          "La recherche de Cloud OS ne se limite pas aux noms : elle fouille aussi le contenu de vos PDF et de vos documents. Et les fichiers produits par vos tâches arrivent dans l'onglet « Résultats », rangés d'eux-mêmes dans Documents, Vidéos, Musiques ou Images.",
        ],
      },
      {
        titre: "Partagés avec votre équipe, pas avec tout le monde",
        paragraphes: [
          "Un fichier ou un dossier, avec tout son contenu, se partage avec une ou plusieurs de vos équipes : ses membres le retrouvent dans leur propre bureau. Il n'y a pas de lien public qui circulerait hors de vos équipes. Les propriétés de chaque fichier indiquent qui en est propriétaire et avec quelles équipes il est partagé.",
          "Vous travaillez déjà avec Google Drive ou OneDrive ? Connectez votre compte pour en importer des fichiers, et renvoyez-y un fichier quand vous en avez besoin.",
        ],
      },
      {
        titre: "Vos données restent au Québec",
        paragraphes: [
          "Vos fichiers sont stockés sur l'infrastructure de Cloud OS, hébergée au Québec. Fichiers est compris dès le forfait Personnel, comme les applications qui s'en servent : bureautique, retouche d'image, montage vidéo et logiciels de bureau.",
        ],
      },
    ],
    en: [
      {
        titre: "A real file manager, in your browser",
        paragraphes: [
          "Files is the heart of your Cloud OS desktop: your documents, images, videos and archives are organized in folders, just like on your computer. You drag files from your computer to upload them, copy, cut and paste, and open several windows to move a file from one folder to another.",
        ],
        points: [
          "Uploads of up to 20 GB per file.",
          "Compress to .zip and extract an archive in place.",
          "Fetch a file from a web address, in the background.",
          "A trash bin, to restore what was deleted too quickly.",
        ],
      },
      {
        titre: "Every file opens in the right place",
        paragraphes: [
          "A double-click is all it takes: a Word, Excel or PowerPoint document opens in the built-in editor, a PDF in the viewer, an image, video or sound in the preview, with no download. You can also create a new document, spreadsheet or presentation right in the folder you are in.",
          "Cloud OS search does not stop at file names: it also looks inside your PDFs and documents. And the files your tasks produce land in the “Results” tab, sorted on their own into Documents, Videos, Music or Images.",
        ],
      },
      {
        titre: "Shared with your team, not with everyone",
        paragraphes: [
          "A file or a folder, with everything in it, can be shared with one or more of your teams: their members find it in their own desktop. There is no public link travelling outside your teams. Each file's properties show who owns it and which teams it is shared with.",
          "Already working with Google Drive or OneDrive? Connect your account to import files from it, and send a file back whenever you need to.",
        ],
      },
      {
        titre: "Your data stays in Québec",
        paragraphes: [
          "Your files are stored on the Cloud OS infrastructure, hosted in Québec. Files is included from the Personal plan, like the apps that use it: office, image editing, video editing and desktop software.",
        ],
      },
    ],
  },
  faq: {
    fr: [
      {
        question: "Où sont stockés mes fichiers ?",
        reponse: "Sur l'infrastructure de Cloud OS, hébergée au Québec. Ils n'en sortent vers Google Drive ou OneDrive que si vous choisissez vous-même de les y envoyer.",
      },
      {
        question: "Puis-je partager un fichier avec quelqu'un ?",
        reponse: "Oui, avec vos équipes : un fichier ou un dossier partagé apparaît chez chaque membre de l'équipe choisie. Fichiers ne crée pas de lien public ; pour partager avec une personne, invitez-la dans une équipe.",
      },
      {
        question: "Quelle taille de fichier puis-je téléverser ?",
        reponse: "Jusqu'à 20 Go par fichier.",
      },
      {
        question: "Un fichier supprimé est-il perdu ?",
        reponse: "Non, pas tout de suite : il passe d'abord par la corbeille, d'où vous pouvez le restaurer. Il n'est effacé pour de bon que lorsque vous videz la corbeille ou l'en supprimez.",
      },
    ],
    en: [
      {
        question: "Where are my files stored?",
        reponse: "On the Cloud OS infrastructure, hosted in Québec. They only go out to Google Drive or OneDrive if you choose to send them there yourself.",
      },
      {
        question: "Can I share a file with someone?",
        reponse: "Yes, with your teams: a shared file or folder shows up for every member of the team you pick. Files does not create public links; to share with a person, invite them to a team.",
      },
      {
        question: "How large a file can I upload?",
        reponse: "Up to 20 GB per file.",
      },
      {
        question: "Is a deleted file gone for good?",
        reponse: "Not right away: it goes to the trash bin first, where you can restore it. It is only erased for good when you empty the trash or delete it from there.",
      },
    ],
  },
  captures: [
    {
      src: "/applications/fichiers/fichiers-dossiers.webp",
      largeur: 1582,
      hauteur: 942,
      alt: {
        fr: "Fichiers dans Cloud OS : les dossiers et documents de l'espace personnel",
        en: "Files in Cloud OS: the folders and documents of the personal space",
      },
    },
  ],
  voisines: ["writer", "equipes", "bac-a-sable", "gimp"],
  articles: [
    { slug: "partage-de-fichiers-securise", titre: "Partage de fichiers sécurisé : ce que les équipes doivent exiger" },
    { slug: "migration-vers-le-cloud", titre: "Migration vers le cloud : la méthode qui évite les échecs" },
  ],
};
