"use client";

import { useEffect } from "react";
import { PageEntete } from "@/components/marketing/PageEntete";
import { BoutonCta } from "@/components/marketing/BoutonCta";
import { LECTURE, SECTION_Y, SHELL } from "@/components/marketing/tokens";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative">
      <div className={`${SHELL} ${SECTION_Y}`}>
        <PageEntete
          eyebrow="Error"
          titre="Something went wrong."
          soustitre="Try again, or go back home if the problem persists."
        />
        <div className={`${LECTURE} mt-8 flex flex-wrap gap-3`}>
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white/85 ring-1 ring-white/15 transition-colors hover:text-white hover:ring-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Try again
          </button>
          <BoutonCta href="/en">Back to home</BoutonCta>
        </div>
      </div>
    </section>
  );
}
