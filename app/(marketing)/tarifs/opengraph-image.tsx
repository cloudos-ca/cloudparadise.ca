import { OG_SIZE, renderOgImage } from "@/lib/ogImage";

export const alt = "Cloud Paradise — Tarifs";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(
    "Payez ce que vous utilisez. Rien de plus.",
    "Des crédits, pas d’abonnement. Vous ne payez que ce qui est traité.",
  );
}
