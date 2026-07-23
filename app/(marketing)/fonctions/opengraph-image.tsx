import { OG_SIZE, renderOgImage } from "@/lib/ogImage";

export const alt = "Cloud Paradise — Fonctions";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(
    "Un seul endroit. Toutes vos tâches lourdes.",
    "Décrivez ce que vous voulez : l’IA choisit le bon moteur et lance le calcul dans le cloud.",
  );
}
