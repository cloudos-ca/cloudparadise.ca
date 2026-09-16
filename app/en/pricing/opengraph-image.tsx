import { renderOgImage } from "@/lib/ogImage";

export const alt = "Cloud OS — Pricing";
export { OG_SIZE as size } from "@/lib/ogImage";
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(
    "Pay for what you use. Nothing more.",
    "Credits, no subscription required. You only pay for what you run.",
  );
}
