import { IndexApplications } from "@/components/marketing/applications/IndexApplications";
import { metadonneesIndex } from "@/components/marketing/applications/metadonnees";

/**
 * /applications — le catalogue des applications. Généré au build : tout le contenu est
 * dans le dépôt (`content/applications/`).
 *
 * Le miroir est `app/en/apps/page.tsx`.
 */
export const metadata = metadonneesIndex("fr");

export default function ApplicationsPage() {
  return <IndexApplications lang="fr" />;
}
