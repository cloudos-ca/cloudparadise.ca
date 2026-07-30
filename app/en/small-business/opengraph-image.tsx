import { renderOgImage } from "@/lib/ogImage";
import { contenuPme } from "@/content/pme";

const OG = contenuPme("en").og;

export const alt = OG.alt;
export { OG_SIZE as size } from "@/lib/ogImage";
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(OG.titre, OG.soustitre);
}
