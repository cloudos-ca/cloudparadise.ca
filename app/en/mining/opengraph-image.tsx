import { renderOgImage } from "@/lib/ogImage";

export const alt = "Cloud OS — Mining";
export { OG_SIZE as size } from "@/lib/ogImage";
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("Mining", "Mineral exploration, built in Abitibi");
}
