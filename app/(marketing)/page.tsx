import { Hero } from "@/components/marketing/Hero";
import { ProblemeSolution } from "@/components/marketing/ProblemeSolution";

export default function MarketingPage() {
  return (
    // L'espacement entre panneaux vit ici, pas dans les sections : elles
    // restent ainsi réutilisables et alignées sur la même gouttière.
    <div className="flex flex-col gap-3 py-3 os:gap-6 os:py-6">
      <Hero />
      <ProblemeSolution />
      {/* Sections suivantes : modes, tarifs, footer. */}
    </div>
  );
}
