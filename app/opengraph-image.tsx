import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Cloud Paradise";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Image de partage générée à la build, pas dessinée à la main : ce Next.js
 * sait le faire nativement (`next/og`), donc pas de fichier statique à tenir
 * à jour. Sert de secours à toutes les routes (FR et EN), aucune n'en a de
 * plus spécifique.
 */
export default async function Image() {
  const logo = await readFile(
    join(process.cwd(), "public/brand/logo-blanc-et-jaune.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

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
          gap: 28,
          background:
            "linear-gradient(140deg, #151f33 0%, #1b273d 60%, #1b273d 100%)",
        }}
      >
        <img src={logoSrc} height={220} alt="" />
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            color: "#dbe6fb",
            letterSpacing: -1,
          }}
        >
          Cloud Paradise
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#93a3c2" }}>
          Décrivez la tâche. On s’occupe du calcul.
        </div>
      </div>
    ),
    { ...size },
  );
}
