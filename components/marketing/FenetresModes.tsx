import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "./Reveal";
import { WindowCard } from "./WindowCard";
import { TEINTES } from "./modes";
import type { TypeTache } from "./offre";
import {
  IconCpu,
  IconCube,
  IconDatabase,
  IconFileText,
  IconFlask,
  IconMovie,
  IconPhoto,
  IconPrinter3d,
  IconSparkles,
  IconWorldSearch,
} from "./icons";
import type { Lang } from "./tokens";

type Bilingue = { fr: string; en: string };
type ListeBilingue = { fr: readonly string[]; en: readonly string[] };

/**
 * Les modes de traitement, tels qu'ils existent dans le produit.
 *
 * Une fenêtre par capacité, pas par ligne tarifaire : Images regroupe
 * traitement et génération ici, même si la grille de /tarifs les facture
 * séparément (deux tarifs très différents sous une même capacité). `type`
 * sert de clé de couleur (partagée avec /tarifs) ; `nom` est le libellé
 * affiché, parfois plus explicite.
 *
 * Aucun prix ici : c'est une page de fonctions. Et aucun décompte de modes
 * nulle part — ce nombre bouge avec le produit.
 */
const MODES: readonly {
  type: TypeTache;
  nom: Bilingue;
  Icone: (p: { className?: string; style?: CSSProperties }) => ReactNode;
  phrase: Bilingue;
  puces: ListeBilingue;
  techno: Bilingue;
}[] = [
  {
    type: "IA",
    nom: { fr: "IA / Auto", en: "AI / Auto" },
    Icone: IconSparkles,
    phrase: {
      fr: "Le cerveau qui orchestre tout.",
      en: "The brain that orchestrates everything.",
    },
    puces: {
      fr: [
        "Lit votre demande, repère vos fichiers et choisit le bon moteur.",
        "Découpe les gros lots (un dossier de 200 contrats est traité fichier par fichier).",
      ],
      en: [
        "Reads your request, finds your files, and picks the right engine.",
        "Splits big batches (a folder of 200 contracts gets processed file by file).",
      ],
    },
    techno: {
      fr: "routeur intelligent · choisit le mode automatiquement",
      en: "smart router · picks the mode automatically",
    },
  },
  {
    type: "Documents",
    nom: { fr: "Documents", en: "Documents" },
    Icone: IconFileText,
    phrase: {
      fr: "Traitez vos documents par lots, sans les ouvrir un par un.",
      en: "Process your documents in batches, without opening them one by one.",
    },
    puces: {
      fr: [
        "Traduction, conversion, fusion, extraction de texte.",
        "OCR : transforme vos scans en texte exploitable.",
        "Analyse financière (BI) : un lot de PDF/Excel → un rapport PDF.",
      ],
      en: [
        "Translation, conversion, merging, text extraction.",
        "OCR: turns your scans into usable text.",
        "Financial analysis (BI): a batch of PDF/Excel → a PDF report.",
      ],
    },
    techno: {
      fr: "entrée .pdf .docx .odt .pptx .xlsx .rtf + images (OCR) · sortie pdf/docx/odt/html/txt",
      en: "input .pdf .docx .odt .pptx .xlsx .rtf + images (OCR) · output pdf/docx/odt/html/txt",
    },
  },
  {
    type: "Données",
    nom: { fr: "Données", en: "Data" },
    Icone: IconDatabase,
    phrase: {
      fr: "Interrogez et transformez vos données comme une base.",
      en: "Query and transform your data like a database.",
    },
    puces: {
      fr: [
        "Requêtes SQL sur vos fichiers, jointures, agrégations.",
        "Exports en CSV, JSON ou graphique.",
      ],
      en: [
        "SQL queries on your files, joins, aggregations.",
        "Export to CSV, JSON, or chart.",
      ],
    },
    techno: {
      fr: "moteur DuckDB · .csv .tsv .xlsx .json .parquet",
      en: "DuckDB engine · .csv .tsv .xlsx .json .parquet",
    },
  },
  {
    type: "Média",
    nom: { fr: "Média", en: "Media" },
    Icone: IconMovie,
    phrase: {
      fr: "Encodez, convertissez et transcrivez audio et vidéo.",
      en: "Encode, convert, and transcribe audio and video.",
    },
    puces: {
      fr: [
        "Transcodage vidéo/audio, formats et codecs au choix.",
        "Transcription (audio/vidéo → texte ou sous-titres SRT) via Whisper.",
      ],
      en: [
        "Video/audio transcoding, your choice of formats and codecs.",
        "Transcription (audio/video → text or SRT subtitles) via Whisper.",
      ],
    },
    techno: {
      fr: "ffmpeg + Whisper · mp4 mkv webm mov mp3 wav flac…",
      en: "ffmpeg + Whisper · mp4 mkv webm mov mp3 wav flac…",
    },
  },
  {
    type: "Scraping",
    nom: { fr: "Scraping", en: "Scraping" },
    Icone: IconWorldSearch,
    phrase: {
      fr: "Extrayez des données du web à grande échelle.",
      en: "Extract web data at scale.",
    },
    puces: {
      fr: [
        "Récupération structurée de milliers de pages.",
        "Cédulable : relancez l’extraction automatiquement (récurrent).",
      ],
      en: [
        "Structured extraction of thousands of pages.",
        "Schedulable: rerun the extraction automatically (recurring).",
      ],
    },
    techno: {
      fr: "extraction web · exécution récurrente possible",
      en: "web extraction · recurring runs available",
    },
  },
  {
    type: "Calcul GPU",
    nom: { fr: "Calcul GPU / CUDA", en: "GPU Compute / CUDA" },
    Icone: IconCpu,
    phrase: {
      fr: "Du calcul scientifique intensif sur nœuds spécialisés.",
      en: "Intensive scientific computing on specialized nodes.",
    },
    puces: {
      fr: [
        "Algèbre linéaire, finance quantitative, bio-informatique.",
        "Décrivez en langage naturel (l’IA génère le CUDA) ou uploadez votre .cu.",
      ],
      en: [
        "Linear algebra, quantitative finance, bioinformatics.",
        "Describe it in plain language (the AI generates the CUDA) or upload your .cu.",
      ],
    },
    techno: {
      fr: "Tesla K20Xm (FP64) · ex. matrices, N-corps, Monte-Carlo, alignement ADN",
      en: "Tesla K20Xm (FP64) · e.g. matrices, N-body, Monte Carlo, DNA alignment",
    },
  },
  {
    type: "Rendu 3D",
    nom: { fr: "Rendu 3D", en: "3D Rendering" },
    Icone: IconCube,
    phrase: {
      fr: "Rendez vos scènes 3D lourdes sans bloquer votre machine.",
      en: "Render your heavy 3D scenes without locking up your machine.",
    },
    puces: {
      fr: ["Image fixe ou animation, en sortie PNG/JPEG."],
      en: ["Still image or animation, output PNG/JPEG."],
    },
    techno: {
      fr: "Blender en ligne de commande (Cycles/Eevee selon la scène)",
      en: "Blender command-line (Cycles/Eevee depending on the scene)",
    },
  },
  {
    type: "Images",
    nom: { fr: "Images", en: "Images" },
    Icone: IconPhoto,
    phrase: { fr: "Traitez et générez des images.", en: "Process and generate images." },
    puces: {
      fr: [
        "Traitement : redimensionner, convertir (PNG/JPG/WebP/AVIF), détourer le fond, améliorer.",
        "Analyse par IA de vision : décrire, classer, détecter, OCR.",
        "Génération : texte → image, et agrandissement IA ×4.",
      ],
      en: [
        "Processing: resize, convert (PNG/JPG/WebP/AVIF), remove background, enhance.",
        "AI vision analysis: describe, classify, detect, OCR.",
        "Generation: text → image, and AI upscale ×4.",
      ],
    },
    techno: {
      fr: "traitement CPU + vision IA · génération par diffusion (GPU)",
      en: "CPU processing + AI vision · diffusion-based generation (GPU)",
    },
  },
  {
    type: "Impression 3D",
    nom: { fr: "Impression 3D", en: "3D Printing" },
    Icone: IconPrinter3d,
    phrase: {
      fr: "Générez des modèles prêts à imprimer.",
      en: "Generate print-ready models.",
    },
    puces: {
      fr: ["Décrivez l’objet en langage naturel, l’IA génère le modèle."],
      en: ["Describe the object in plain language, the AI generates the model."],
    },
    techno: {
      fr: "génération de modèles 3D par IA · sortie imprimable",
      en: "AI 3D model generation · printable output",
    },
  },
  {
    type: "Simulation",
    nom: { fr: "Simulation", en: "Simulation" },
    Icone: IconFlask,
    phrase: {
      fr: "Lancez des simulations scientifiques dans le cloud.",
      en: "Run scientific simulations in the cloud.",
    },
    puces: {
      fr: ["Modélisez et exécutez vos simulations sans matériel dédié."],
      en: ["Model and run your simulations without dedicated hardware."],
    },
    techno: {
      fr: "simulation scientifique · calcul dans le cloud",
      en: "scientific simulation · cloud compute",
    },
  },
];

/**
 * Les modes, un par fenêtre du bureau.
 *
 * Grille à deux colonnes plutôt qu'une liste alternée : à huit blocs, une
 * alternance gauche/droite ferait une page trois fois plus longue pour le même
 * contenu, et le va-et-vient fatiguerait avant la fin. Deux colonnes tuilées
 * évoquent en plus un bureau, ce que la métaphore appelle.
 */
export function FenetresModes({ lang = "fr" }: { lang?: Lang }) {
  return (
    <>
      {/* La grille passait directement du H1 de la page aux H3 des fenêtres :
          un niveau sauté pour un lecteur d'écran. Ce titre nomme le groupe sans
          rien ajouter à l'écran, où les huit fenêtres se lisent d'elles-mêmes. */}
      <h2 className="sr-only">
        {lang === "en" ? "Processing modes" : "Les modes de traitement"}
      </h2>

      <ul className="grid gap-5 os:grid-cols-2 os:gap-6">
      {MODES.map(({ type, nom, Icone, phrase, puces, techno }, i) => {
        const teinte = TEINTES[type];
        return (
          <li key={type}>
            {/* Décalage court et plafonné : les premières fenêtres s'ouvrent
                l'une après l'autre, les dernières n'attendent pas une seconde
                entière pour apparaître. */}
            <Reveal delay={Math.min(i, 3) * 0.06} className="h-full">
              <WindowCard
                title={nom[lang]}
                accent={teinte}
                icone={<Icone className="size-3.5" />}
                className="flex h-full flex-col"
              >
                <div className="flex flex-1 flex-col p-4 os:p-5">
                  <Apercu teinte={teinte} Icone={Icone} />

                  <h3 className="mt-4 font-display text-[15px] font-bold tracking-tight text-[#eef4ff]">
                    {/* Le nom vit dans la barre de titre, qui n'est pas un
                        titre au sens du document : on le redonne ici pour les
                        lecteurs d'écran, sans le répéter à l'écran. */}
                    <span className="sr-only">{nom[lang]} — </span>
                    {phrase[lang]}
                  </h3>

                  <ul className="mt-3 space-y-2">
                    {puces[lang].map((p) => (
                      <li
                        key={p}
                        className="flex gap-2 text-[13px] leading-relaxed text-[#93a3c2]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[7px] size-1 shrink-0 rounded-full"
                          style={{ background: teinte }}
                        />
                        {p}
                      </li>
                    ))}
                  </ul>

                  {/* La ligne techno est repoussée en pied de fenêtre : les
                      fenêtres n'ont pas toutes le même nombre de puces, et sans
                      ça les mentions techniques se retrouvaient à des hauteurs
                      différentes d'une colonne à l'autre. */}
                  <p className="mt-4 border-t border-white/[0.08] pt-3 font-mono text-[11px] leading-relaxed break-words text-[#8494b6] os:mt-auto">
                    {techno[lang]}
                  </p>
                </div>
              </WindowCard>
            </Reveal>
          </li>
        );
      })}
      </ul>
    </>
  );
}

/**
 * Aperçu d'application, en tenant-lieu.
 *
 * Volontairement abstrait : une capture inventée pour huit modes serait huit
 * mensonges. Ce bandeau ne prétend rien montrer — il donne à la fenêtre le
 * poids visuel d'une app, et la teinte du mode s'y lit d'un coup d'œil.
 */
function Apercu({
  teinte,
  Icone,
}: {
  teinte: string;
  Icone: (p: { className?: string; style?: CSSProperties }) => ReactNode;
}) {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden rounded-lg border border-white/[0.06] bg-black/20 px-3 py-3"
      style={{
        backgroundImage: `radial-gradient(120% 100% at 100% 0%, color-mix(in srgb, ${teinte} 16%, transparent), transparent 70%)`,
      }}
    >
      {/* Filigrane : l'icône du mode, assez pâle pour rester un fond. */}
      <Icone
        className="absolute -right-2 -bottom-3 size-16"
        style={{ color: teinte, opacity: 0.14 }}
      />

      <div className="relative space-y-2">
        {[
          { chip: 0.9, barre: "72%" },
          { chip: 0.55, barre: "88%" },
          { chip: 0.3, barre: "54%" },
        ].map(({ chip, barre }) => (
          <div key={barre} className="flex items-center gap-2">
            <span
              className="size-2.5 shrink-0 rounded-[3px]"
              style={{ background: teinte, opacity: chip }}
            />
            <span
              className="h-1.5 rounded-full bg-white/10"
              style={{ width: barre }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
