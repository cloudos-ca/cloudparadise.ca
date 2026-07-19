import { Hero } from "@/components/marketing/Hero";
import { ProblemeSolution } from "@/components/marketing/ProblemeSolution";
import { CommentCaMarche } from "@/components/marketing/CommentCaMarche";
import { Univers } from "@/components/marketing/Univers";
import { Reassurance } from "@/components/marketing/Reassurance";
import { Tarification } from "@/components/marketing/Tarification";

export default function MarketingPage() {
  return (
    <>
      <Hero />
      <ProblemeSolution />
      <CommentCaMarche />
      <Univers />
      <Reassurance />
      <Tarification />
      {/* Section suivante : footer. */}
    </>
  );
}
