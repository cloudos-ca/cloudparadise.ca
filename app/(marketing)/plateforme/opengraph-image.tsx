import { renderOgImage } from "@/lib/ogImage";

export const alt = "Cloud Paradise — Plateforme";
export { OG_SIZE as size } from "@/lib/ogImage";
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("Plateforme", "Un vrai bureau en ligne");
}
