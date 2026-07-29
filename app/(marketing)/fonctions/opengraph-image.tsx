import { renderOgImage } from "@/lib/ogImage";

export const alt = "Cloud Paradise — Fonctions";
export { OG_SIZE as size } from "@/lib/ogImage";
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(
    "Tout ce que le poste de travail sait faire.",
    "La liste complète, par usage. Ce qui est ici est disponible aujourd’hui.",
  );
}
