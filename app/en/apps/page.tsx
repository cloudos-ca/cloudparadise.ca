import { IndexApplications } from "@/components/marketing/applications/IndexApplications";
import { metadonneesIndex } from "@/components/marketing/applications/metadonnees";

/**
 * /en/apps — le catalogue des applications. Généré au build : tout le contenu est
 * dans le dépôt (`content/applications/`).
 *
 * Le miroir est `app/(marketing)/applications/page.tsx`.
 */
export const metadata = metadonneesIndex("en");

export default function ApplicationsPage() {
  return <IndexApplications lang="en" />;
}
