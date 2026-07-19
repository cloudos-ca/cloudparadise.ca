import { Hero } from "@/components/marketing/Hero";
import { ProblemeSolution } from "@/components/marketing/ProblemeSolution";
import { CommentCaMarche } from "@/components/marketing/CommentCaMarche";
import { Univers } from "@/components/marketing/Univers";
import { Reassurance } from "@/components/marketing/Reassurance";
import { Tarification } from "@/components/marketing/Tarification";
import { CtaFinal } from "@/components/marketing/CtaFinal";
import { Footer } from "@/components/marketing/Footer";

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
      <Footer />
    </>
  );
}
