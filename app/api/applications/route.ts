import { NextResponse } from "next/server";
import { fichesPourLeProduit } from "@/lib/applications";

/**
 * Les fiches du catalogue, pour la Logithèque du produit (cloudparadise_hpc,
 * `src/lib/os/vitrine-fiches.ts`) : la fiche détail d'une application y reprend le texte et les
 * captures de sa page ici, sous ses boutons Ouvrir et Ajouter au bureau.
 *
 * Le pendant de `GET /api/v1/apps/catalog` côté produit : là-bas le produit dit ce qui existe, ici la
 * vitrine dit comment elle le décrit. Une seule rédaction, deux affichages.
 *
 * Générée au build, comme les pages du catalogue : les fiches sont dans le dépôt.
 */
export const dynamic = "force-static";

export function GET() {
  return NextResponse.json({ fiches: fichesPourLeProduit() });
}
