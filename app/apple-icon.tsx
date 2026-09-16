import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Icône d'écran d'accueil iOS — même traitement que `icon.tsx`. */
export default async function AppleIcon() {
  const logo = await readFile(
    join(process.cwd(), "public/brand/symbole-blanc-jaune.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(140deg, #151f33 0%, #1b273d 100%)",
        }}
      >
        <img src={logoSrc} width={size.width * 0.72} alt="" />
      </div>
    ),
    { ...size },
  );
}
