import { Hero } from "@/components/marketing/Hero";
import { ProblemeSolution } from "@/components/marketing/ProblemeSolution";
import { CommentCaMarche } from "@/components/marketing/CommentCaMarche";
import { Univers } from "@/components/marketing/Univers";
import { Reassurance } from "@/components/marketing/Reassurance";

export default function MarketingPage() {
  return (
    <>
      <Hero />
      <ProblemeSolution />
      <CommentCaMarche />
      <Univers />
      <Reassurance />
      {/* Sections suivantes : tarifs, footer. */}
    </>
  );
}
