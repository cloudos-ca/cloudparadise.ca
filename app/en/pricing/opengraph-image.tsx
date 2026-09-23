import { PALIERS, enDevise } from "@/components/marketing/offre";
import { renderOgImage } from "@/lib/ogImage";

export const alt = "Cloud OS — Pricing";
export { OG_SIZE as size } from "@/lib/ogImage";
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(
    "One flat price. Everything included.",
    `Personal at ${enDevise(PALIERS[0].prixMensuel)}/mo, Business at ${enDevise(PALIERS[1].prixMensuel)}/mo.`,
  );
}
