import { renderOgImage } from "@/lib/ogImage";

export const alt = "Cloud Paradise — Pricing";
export { OG_SIZE as size } from "@/lib/ogImage";
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(
    "Pay for what you use. Nothing more.",
    "Credits, not a subscription. You only pay for what you run.",
  );
}
