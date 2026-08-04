import { IconCube } from "./icons";
import { JobPanel } from "./JobPanel";
import { WindowCard } from "./WindowCard";
import { SOFT_WASH, type Lang } from "./tokens";

/**
 * La fenêtre « Plan » du bureau, reconstruite en HTML.
 *
 * Remplace la capture `/plateforme/plan.jpg` : l'interface d'origine fait
 * 2048 px de large pour 756 px de haut, donc une fois posée dans la colonne de
 * contenu son texte tombait sous 5 px — l'image ne montrait plus qu'une
 * texture de lignes grises. Une capture qu'on ne peut pas lire ne démontre
 * rien ; elle occupe seulement la place de la démonstration.
 *
 * Reconstruite plutôt que recadrée : le HTML reste net à tout zoom, suit la
 * recoloration du bureau comme le reste du site, et se replie proprement en
 * mobile là où une image large impose son ratio. Elle réutilise le châssis
 * `WindowCard` et le `JobPanel` de l'accueil — c'est la même fenêtre que
 * partout ailleurs, pas un visuel de plus.
 *
 * La scène reste celle de la capture : la même tâche, les mêmes quatre étapes,
 * le même journal, le même fichier en sortie. Deux écarts assumés — le nom de
 * la tâche est corrigé (l'original s'appelait « Test Docx to PDF » alors qu'il
 * convertit un PDF en DOCX), et les avertissements LibreOffice du journal sont
 * retirés : ils n'apprennent rien au visiteur et une page de vente n'a pas à
 * exhiber une trace d'erreur transitoire.
 */

const TEXTES = {
  fr: {
    fenetre: "Plan · Cloud Paradise",
    tache: "Convertir un PDF en DOCX",
    chip: "DOCUMENTS",
    fichier: "rapport-trimestriel.pdf",
    demandeLabel: "Votre demande",
    demande:
      "« Convertis ce PDF en document Word, en gardant la mise en page. »",
    planLabel: "Spécification finalisée",
    etapes: [
      {
        titre: "Chargement du fichier",
        texte: "Le PDF est chargé dans la plateforme.",
      },
      {
        titre: "Conversion",
        texte: "Le service DOCS convertit le PDF en format DOCX.",
      },
      {
        titre: "Validation",
        texte: "Le contenu converti est vérifié avant d’être rendu.",
      },
      {
        titre: "Dépôt du résultat",
        texte: "Le fichier DOCX est déposé dans le répertoire de sortie.",
      },
    ],
    jobTitre: "Opération documentaire",
    jobChip: "DOCS",
    logs: [
      "analyse de la tâche : traitement documentaire",
      "voie retenue : conversion de document",
      // « nœud docs-agent-prod02 » : un identifiant numéroté laissait deviner
      // une grappe de machines. Le moteur se nomme, il ne se compte pas.
      "assigné au moteur documentaire",
      "convert — 1 fichier",
      "terminé en 1875 ms",
    ],
    resultatLabel: "Résultat",
    resultat: "rapport-trimestriel.docx",
  },
  en: {
    fenetre: "Plan · Cloud Paradise",
    tache: "Convert a PDF to DOCX",
    chip: "DOCUMENTS",
    fichier: "quarterly-report.pdf",
    demandeLabel: "Your request",
    demande: "“Convert this PDF to a Word document, keeping the layout.”",
    planLabel: "Finalized specification",
    etapes: [
      { titre: "File upload", texte: "The PDF is loaded into the platform." },
      {
        titre: "Conversion",
        texte: "The DOCS service converts the PDF to DOCX format.",
      },
      {
        titre: "Validation",
        texte: "The converted content is checked before it is returned.",
      },
      {
        titre: "Output",
        texte: "The DOCX file is written to the output directory.",
      },
    ],
    jobTitre: "Document operation",
    jobChip: "DOCS",
    logs: [
      "task analysis: document processing",
      "route selected: document conversion",
      "assigned to the document engine",
      "convert — 1 file",
      "done in 1875 ms",
    ],
    resultatLabel: "Result",
    resultat: "quarterly-report.docx",
  },
} as const;

export function FenetrePlan({ lang = "fr" }: Readonly<{ lang?: Lang }>) {
  const t = TEXTES[lang];

  return (
    <WindowCard title={t.fenetre} icone={<IconCube className="size-3.5" />}>
      <div className="grid os:grid-cols-[55fr_45fr]">
        {/* Volet gauche : ce que le visiteur a demandé, et ce que la plateforme
            a décidé d'en faire. C'est la moitié qui porte l'argument — l'autre
            ne fait que l'exécuter. */}
        <div className="border-b border-white/10 p-5 os:border-r os:border-b-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <p className="font-display text-[15px] font-semibold text-[#eef4ff]">
              {t.tache}
            </p>
            <span
              data-cp-accent
              className="shrink-0 rounded px-2 py-0.5 text-[10px] font-medium tracking-wide"
              style={{ background: SOFT_WASH, color: "var(--soft)" }}
            >
              {t.chip}
            </span>
          </div>
          <p className="mt-1 font-mono text-[11px] text-cp-muted">
            {t.fichier}
          </p>

          <p className="mt-5 text-[11px] font-medium tracking-wide text-white/70">
            {t.demandeLabel}
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-white/85 italic">
            {t.demande}
          </p>

          <p className="mt-5 text-[11px] font-medium tracking-wide text-white/70">
            {t.planLabel}
          </p>
          {/* Numérotée parce que c'est vraiment une séquence : chaque étape
              attend la précédente. Un `<ol>` le dit aussi au lecteur d'écran,
              là où quatre puces ne diraient que « quatre choses ». */}
          <ol className="mt-2.5 space-y-2.5">
            {t.etapes.map(({ titre, texte }, i) => (
              <li key={titre} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-px grid size-5 shrink-0 place-items-center rounded-full font-mono text-[10px] font-medium text-white/70"
                  style={{ background: "rgba(255,255,255,.07)" }}
                >
                  {i + 1}
                </span>
                <p className="text-[13px] leading-relaxed text-white/85">
                  <span className="font-medium text-white">{titre}</span>
                  {" — "}
                  {texte}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Volet droit : l'exécution. Le `JobPanel` est celui de l'accueil,
            avec sa progression, ses lignes de journal et son badge de fin. */}
        <div className="flex flex-col">
          <JobPanel
            title={t.jobTitre}
            chip={t.jobChip}
            logs={t.logs}
            lang={lang}
          />
          <div className="mt-auto border-t border-white/10 px-4 py-3.5">
            <p className="text-[11px] font-medium tracking-wide text-white/70">
              {t.resultatLabel}
            </p>
            <p className="mt-1 font-mono text-[12px] break-all text-white">
              {t.resultat}
            </p>
          </div>
        </div>
      </div>
    </WindowCard>
  );
}
