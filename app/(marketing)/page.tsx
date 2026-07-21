import type { Metadata } from "next";
import { Hero } from "@/components/marketing/Hero";
import { ProblemeSolution } from "@/components/marketing/ProblemeSolution";
import { CommentCaMarche } from "@/components/marketing/CommentCaMarche";
import { Univers } from "@/components/marketing/Univers";
import { Reassurance } from "@/components/marketing/Reassurance";
import { Tarification } from "@/components/marketing/Tarification";
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
  openGraph: openGraphPage(TITRE_ACCUEIL, DESCRIPTION_ACCUEIL, "fr"),
};

export default function MarketingPage() {
  return (
    <>
      <Hero />
      <ProblemeSolution />
      <Univers />
      <CommentCaMarche />
      <Reassurance />
      <Tarification />
      <CtaFinal />
    </>
  );
}
