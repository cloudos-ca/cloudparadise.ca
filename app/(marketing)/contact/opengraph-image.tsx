import { OG_SIZE, renderOgImage } from "@/lib/ogImage";

export const alt = "Cloud Paradise — Contact";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(
    "Contactez-nous",
    "Une question sur le service, la tarification ou un projet particulier ? Écrivez-nous, on répond.",
  );
}
