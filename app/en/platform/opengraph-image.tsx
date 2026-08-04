import { renderOgImage } from "@/lib/ogImage";

export const alt = "Cloud Paradise — Platform";
export { OG_SIZE as size } from "@/lib/ogImage";
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("Platform", "A real desktop in your browser");
}
