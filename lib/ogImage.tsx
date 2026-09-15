import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * Lockup et polices ne changent pas d'un appel à l'autre : lus et encodés une
 * seule fois, puis partagés par les seize routes `opengraph-image.tsx` du
 * site — et par l'image générique — plutôt que relus depuis le disque à
 * chaque rendu. Les TTF (`lib/og-fonts/`) sont dans le dépôt : la build ne
 * dépend d'aucun réseau, et satori compose en Archivo/Manrope au lieu de sa
 * police par défaut.
 */
let ressources: Promise<{
  lockupSrc: string;
  archivo: Buffer;
  manrope: Buffer;
}> | null = null;

export function chargerRessourcesOg() {
  ressources ??= Promise.all([
    readFile(join(process.cwd(), "public/brand/lockup-horizontal-fonce.png")),
    readFile(join(process.cwd(), "lib/og-fonts/Archivo-ExtraBold.ttf")),
    readFile(join(process.cwd(), "lib/og-fonts/Manrope-Regular.ttf")),
  ]).then(([lockup, archivo, manrope]) => ({
    lockupSrc: `data:image/png;base64,${lockup.toString("base64")}`,
    archivo,
    manrope,
  }));
  return ressources;
}

/** Les deux familles de la charte, déclarées à satori. */
export function polices(archivo: Buffer, manrope: Buffer) {
  return [
    { name: "Archivo", data: archivo, style: "normal" as const, weight: 800 as const },
    { name: "Manrope", data: manrope, style: "normal" as const, weight: 400 as const },
  ];
}

/**
 * Rendu partagé des images Open Graph par page — même traitement visuel que
 * l'image générique (`app/opengraph-image.tsx`), avec un titre/sous-titre
 * propres à la page plutôt que le tagline d'accueil pour tout le monde.
 */
export async function renderOgImage(titre: string, soustitre: string) {
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
          gap: 32,
          background:
            "linear-gradient(140deg, #151f33 0%, #1b273d 60%, #1b273d 100%)",
        }}
      >
        {/* satori ne rend que des <img> nus — next/image n'existe pas ici. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={lockupSrc} height={110} alt="" />
        <div
          style={{
            display: "flex",
            fontFamily: "Archivo",
            fontSize: 52,
            fontWeight: 800,
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
            fontFamily: "Manrope",
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
    { ...OG_SIZE, fonts: polices(archivo, manrope) },
  );
}
