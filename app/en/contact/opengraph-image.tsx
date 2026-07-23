import { OG_SIZE, renderOgImage } from "@/lib/ogImage";

export const alt = "Cloud Paradise — Contact";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(
    "Contact us",
    "A question about the service, pricing, or a specific project? Write to us, we reply.",
  );
}
