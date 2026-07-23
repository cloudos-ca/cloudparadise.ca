import { OG_SIZE, renderOgImage } from "@/lib/ogImage";

export const alt = "Cloud Paradise — Pricing";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(
    "Pay for what you use. Nothing more.",
    "Credits, not a subscription. You only pay for what you run.",
  );
}
