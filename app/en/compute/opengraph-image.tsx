import { renderOgImage } from "@/lib/ogImage";

export const alt = "Cloud Paradise — Compute";
export { OG_SIZE as size } from "@/lib/ogImage";
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("Compute", "All your heavy tasks, in one place");
}
