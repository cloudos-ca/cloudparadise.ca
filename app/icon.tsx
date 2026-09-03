import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const contentType = "image/png";

/**
 * Icônes app (favicon moderne + tailles du manifest) — même traitement que
 * `opengraph-image.tsx` : logo sur le dégradé de marque, généré à la build.
 * `favicon.ico` reste en place pour les onglets de navigateur historiques ;
 * ceci couvre les usages qui veulent du PNG (Android, PWA).
 */
export function generateImageMetadata() {
  return [
    { id: "192", size: { width: 192, height: 192 } },
    { id: "512", size: { width: 512, height: 512 } },
  ];
}

export default async function Icon({
  id,
}: Readonly<{ id: Promise<string | number> }>) {
  const iconId = await id;
  const size = iconId === "512" ? 512 : 192;

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
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(140deg, #151f33 0%, #1b273d 100%)",
        }}
      >
        <img src={logoSrc} width={size * 0.72} alt="" />
      </div>
    ),
    { width: size, height: size },
  );
}
