import { renderOgImage } from "@/lib/ogImage";

export const alt = "Cloud Paradise — Security";
export { OG_SIZE as size } from "@/lib/ogImage";
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("Security", "Your data, our hardware, in Quebec");
}
