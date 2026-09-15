import { renderOgImage } from "@/lib/ogImage";

export const alt = "Cloud OS — Mines";
export { OG_SIZE as size } from "@/lib/ogImage";
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("Mines", "L’exploration minière, conçue en Abitibi");
}
