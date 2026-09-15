import { renderOgImage } from "@/lib/ogImage";

export const alt = "Cloud OS — Tarifs";
export { OG_SIZE as size } from "@/lib/ogImage";
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(
    "Payez ce que vous utilisez. Rien de plus.",
    "Des crédits, sans abonnement requis. Vous ne payez que ce qui est traité.",
  );
}
