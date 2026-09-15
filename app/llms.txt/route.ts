import { PAGES, SITE_URL, urlSite } from "@/lib/site";

/**
 * `llms.txt` — le plan du site à l'usage des modèles de langage.
 *
 * Route et non fichier statique : la version dans `public/` portait dix-huit
 * URL de production en dur, donc elle mentait depuis le dev et n'avait aucun
 * moyen de suivre un changement de domaine. Elle avait déjà décroché du
 * sitemap au passage — dix pages annoncées d'un côté, six de l'autre côté pour
 * l'anglais. Ici la liste vient de `lib/site.ts`, la même que celle du
 * sitemap : une page ajoutée là apparaît dans les deux sorties, ou dans
 * aucune.
 *
 * `force-static` : sans lui, Next 15+ traite un `GET` comme dynamique par
 * défaut et le fichier serait recalculé à chaque requête. Rien ici ne dépend
 * de la requête.
 */
export const dynamic = "force-static";

/**
 * Le préambule — la seule partie rédigée à la main.
 *
 * Il décrit ce qu'est le produit, ce qu'aucune liste de pages ne dit. Le reste
 * du fichier est dérivé.
 */
const PREAMBULE = `# Cloud OS

> Un poste de travail complet dans le navigateur : un vrai bureau, des applications professionnelles, et le calcul lourd lancé en langage courant. Décrivez la tâche, on s'occupe du calcul.

Cloud OS est un bureau en ligne où l'on travaille (fenêtres, fichiers, bureautique, image, vidéo, audio, 3D, SIG, messagerie, courriel, agenda) et où l'on lance des tâches lourdes en décrivant le résultat voulu : documents, données, images, génération d'images, média, extraction web, calcul GPU, rendu 3D, impression 3D, simulation, géomatique et SIG, transcription de mémo vocal, sources de données externes. L'intelligence artificielle lit la demande et choisit le moteur, mais ne calcule jamais le résultat : un moteur déterministe le produit. Facturation aux crédits, sans abonnement requis — un abonnement mensuel optionnel existe pour un usage régulier. Une gestion d'entreprise en partie double (CRM, facturation, grand livre, états financiers) et un hébergement web indépendant sont aussi disponibles. Serveurs et modèle de langage hébergés au Québec. Site bilingue français/anglais, entreprise basée à Amos, Québec, Canada.`;

/** Une ligne de liste Markdown : `- [Titre](url): résumé.` */
function ligne(titre: string, chemin: string, resume?: string): string {
  const lien = `- [${titre}](${urlSite(chemin)})`;
  return resume ? `${lien}: ${resume}` : lien;
}

export function GET(): Response {
  const corps = [
    PREAMBULE,
    "",
    "## Pages (français)",
    "",
    ...PAGES.map((p) => ligne(p.titre.fr, p.fr, p.resume?.fr)),
    "",
    "## Pages (English)",
    "",
    ...PAGES.map((p) => ligne(p.titre.en, p.en, p.resume?.en)),
    "",
  ].join("\n");

  return new Response(corps, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // Même politique que les autres ressources statiques du site : le
      // contenu ne change qu'au déploiement.
      "Cache-Control": "public, max-age=0, must-revalidate",
      // `SITE_URL` figure déjà dans chaque lien ; l'en-tête sert de repère
      // rapide pour vérifier depuis quel environnement le fichier a été servi.
      "X-Site-Origin": SITE_URL,
    },
  });
}
