import { Hero } from "@/components/marketing/Hero";
import { ProblemeSolution } from "@/components/marketing/ProblemeSolution";
import { CommentCaMarche } from "@/components/marketing/CommentCaMarche";

export default function MarketingPage() {
  return (
    <>
      <Hero />
      <ProblemeSolution />
      <CommentCaMarche />
      {/* Sections suivantes : modes, tarifs, footer. */}
    </>
  );
}
