import { renderOgImage } from "@/lib/ogImage";

export const alt = "Cloud OS — Sécurité";
export { OG_SIZE as size } from "@/lib/ogImage";
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("Sécurité", "Vos données, notre matériel, au Québec");
}
