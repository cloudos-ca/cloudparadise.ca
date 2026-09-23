import { PALIERS, enDevise } from "@/components/marketing/offre";
import { renderOgImage } from "@/lib/ogImage";

export const alt = "Cloud OS — Tarifs";
export { OG_SIZE as size } from "@/lib/ogImage";
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(
    "Un prix fixe. Tout inclus.",
    `Personnel à ${enDevise(PALIERS[0].prixMensuel)}/mois, Entreprise à ${enDevise(PALIERS[1].prixMensuel)}/mois.`,
  );
}
