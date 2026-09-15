import { ImageResponse } from "next/og";
import { chargerRessourcesOg, polices } from "@/lib/ogImage";

export const alt = "Cloud OS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Image de partage générée à la build, pas dessinée à la main : ce Next.js
 * sait le faire nativement (`next/og`), donc pas de fichier statique à tenir
 * à jour. Sert de secours à toutes les routes (FR et EN), aucune n'en a de
 * plus spécifique. Le lockup porte déjà le nom — pas de titre redondant,
 * seul le tagline l'accompagne.
 */
export default async function Image() {
  const { lockupSrc, archivo, manrope } = await chargerRessourcesOg();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
          background:
            "linear-gradient(140deg, #151f33 0%, #1b273d 60%, #1b273d 100%)",
        }}
      >
        <img src={lockupSrc} height={170} alt="" />
        <div style={{ display: "flex", fontFamily: "Manrope", fontSize: 30, color: "#93a3c2" }}>
          Décrivez la tâche. On s’occupe du calcul.
        </div>
      </div>
    ),
    { ...size, fonts: polices(archivo, manrope) },
  );
}
