import { renderOgImage } from "@/lib/ogImage";

export const alt = "Cloud OS — Contact";
export { OG_SIZE as size } from "@/lib/ogImage";
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(
    "Contact us",
    "A question about the service, pricing, or a specific project? Write to us, we reply.",
  );
}
