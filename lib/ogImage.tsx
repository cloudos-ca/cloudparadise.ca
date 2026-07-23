import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * Rendu partagé des images Open Graph par page — même traitement visuel que
 * l'image générique (`app/opengraph-image.tsx`), avec un titre/sous-titre
 * propres à la page plutôt que le tagline d'accueil pour tout le monde.
 */
export async function renderOgImage(titre: string, soustitre: string) {
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} height={160} alt="" />
        <div
          style={{
            display: "flex",
            fontSize: 52,
            fontWeight: 700,
            color: "#dbe6fb",
            letterSpacing: -1,
            textAlign: "center",
            maxWidth: 980,
          }}
        >
          {titre}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#93a3c2",
            textAlign: "center",
            maxWidth: 860,
          }}
        >
          {soustitre}
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
