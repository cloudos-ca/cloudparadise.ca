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
} from "@/lib/seo";

const TITRE = "Cloud Paradise — Your cloud workstation";
const DESCRIPTION =
  "A complete online desktop: heavy compute in plain language, professional software and team collaboration. Hosted in Québec, nothing to install.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: alternatesBilingues("/", "/en", "en"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "en", [IMAGE_OG_PARTAGEE]),
};

export default function MarketingPageEn() {
  return (
    <>
      <HreflangLinks fr="/" en="/en" />
      <Hero lang="en" />
      <TroisPiliers lang="en" />
      <Determinisme lang="en" />
      <FamillesApps lang="en" />
      {/* PME avant Mines : segment d'acquisition principal d'abord, verticale
          de démarchage ensuite. L'ordre de ces deux lignes est la hiérarchie. */}
      <RenvoiPme lang="en" />
      <RenvoiMines lang="en" />
      <Tarification lang="en" />
      <CtaFinal lang="en" />
    </>
  );
}
