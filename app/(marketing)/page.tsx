import { Hero } from "@/components/marketing/Hero";
import { ProblemeSolution } from "@/components/marketing/ProblemeSolution";
import { CommentCaMarche } from "@/components/marketing/CommentCaMarche";
import { Univers } from "@/components/marketing/Univers";

export default function MarketingPage() {
  return (
    <>
      <Hero />
      <ProblemeSolution />
      <CommentCaMarche />
      <Univers />
      {/* Sections suivantes : tarifs, footer. */}
    </>
  );
}
