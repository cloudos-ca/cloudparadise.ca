import type { Metadata } from "next";
import { Hero } from "@/components/marketing/Hero";
import { HreflangLinks } from "@/components/marketing/HreflangLinks";
import { TroisPiliers } from "@/components/marketing/TroisPiliers";
import { Determinisme } from "@/components/marketing/Determinisme";
import { FamillesApps } from "@/components/marketing/FamillesApps";
import { Tarification } from "@/components/marketing/Tarification";
import { RenvoiPme } from "@/components/marketing/RenvoiPme";
import { RenvoiMines } from "@/components/marketing/RenvoiMines";
import { CtaFinal } from "@/components/marketing/CtaFinal";
import {
  alternatesBilingues,
  IMAGE_OG_PARTAGEE,
  openGraphPage,
  TITRE_ACCUEIL,
  DESCRIPTION_ACCUEIL,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: TITRE_ACCUEIL,
  description: DESCRIPTION_ACCUEIL,
  alternates: alternatesBilingues("/", "/en", "fr"),
  openGraph: openGraphPage(TITRE_ACCUEIL, DESCRIPTION_ACCUEIL, "fr", "/", [IMAGE_OG_PARTAGEE]),
};

export default function MarketingPage() {
  return (
    <>
      <HreflangLinks fr="/" en="/en" />
      <Hero />
      <TroisPiliers />
      <Determinisme />
      <FamillesApps />
      {/* PME avant Mines : segment d'acquisition principal d'abord, verticale
          de démarchage ensuite. L'ordre de ces deux lignes est la hiérarchie. */}
      <RenvoiPme />
      <RenvoiMines />
      <Tarification />
      <CtaFinal />
    </>
  );
}
