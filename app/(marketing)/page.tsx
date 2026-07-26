import type { Metadata } from "next";
import { Hero } from "@/components/marketing/Hero";
import { HreflangLinks } from "@/components/marketing/HreflangLinks";
import { TroisPiliers } from "@/components/marketing/TroisPiliers";
import { Determinisme } from "@/components/marketing/Determinisme";
import { FamillesApps } from "@/components/marketing/FamillesApps";
import { Tarification } from "@/components/marketing/Tarification";
import { RenvoiMines } from "@/components/marketing/RenvoiMines";
import { CtaFinal } from "@/components/marketing/CtaFinal";
import {
  alternatesBilingues,
  openGraphPage,
  TITRE_ACCUEIL,
  DESCRIPTION_ACCUEIL,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: TITRE_ACCUEIL,
  description: DESCRIPTION_ACCUEIL,
  alternates: alternatesBilingues("/", "/en", "fr"),
  openGraph: openGraphPage(TITRE_ACCUEIL, DESCRIPTION_ACCUEIL, "fr", ["/opengraph-image"]),
};

export default function MarketingPage() {
  return (
    <>
      <HreflangLinks fr="/" en="/en" />
      <Hero />
      <TroisPiliers />
      <Determinisme />
      <FamillesApps />
      <Tarification />
      <RenvoiMines />
      <CtaFinal />
    </>
  );
}
