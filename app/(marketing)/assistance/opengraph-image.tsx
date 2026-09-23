import { renderOgImage } from "@/lib/ogImage";

export const alt = "Cloud OS — Bureau d’assistance";
export { OG_SIZE as size } from "@/lib/ogImage";
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(
    "Bureau d’assistance",
    "Le service à la clientèle, hébergé au Québec",
  );
}
