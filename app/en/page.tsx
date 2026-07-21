import type { Metadata } from "next";
import { Hero } from "@/components/marketing/Hero";
import { ProblemeSolution } from "@/components/marketing/ProblemeSolution";
import { CommentCaMarche } from "@/components/marketing/CommentCaMarche";
import { Univers } from "@/components/marketing/Univers";
import { Reassurance } from "@/components/marketing/Reassurance";
import { Tarification } from "@/components/marketing/Tarification";
import { CtaFinal } from "@/components/marketing/CtaFinal";
import { alternatesBilingues, openGraphPage } from "@/lib/seo";

const TITRE = "Cloud Paradise — Describe the task. We handle the compute.";
const DESCRIPTION =
  "Drop your files, say what you want in plain words. The AI picks the right mode and runs the job in the cloud. You just grab the result.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: alternatesBilingues("/", "/en", "en"),
  openGraph: openGraphPage(TITRE, DESCRIPTION, "en"),
};

export default function MarketingPageEn() {
  return (
    <>
      <Hero lang="en" />
      <ProblemeSolution lang="en" />
      <Univers lang="en" />
      <CommentCaMarche lang="en" />
      <Reassurance lang="en" />
      <Tarification lang="en" />
      <CtaFinal lang="en" />
    </>
  );
}
