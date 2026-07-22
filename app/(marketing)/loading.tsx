import { LECTURE, SECTION_Y, SHELL } from "@/components/marketing/tokens";

/**
 * N'apparaît en pratique que lors d'une navigation client entre pages FR —
 * toutes les pages marketing sont statiquement générées, donc surtout utile
 * comme filet le temps que le JS du routeur prenne le relais.
 */
export default function Loading() {
  return (
    <section aria-hidden="true" className="relative">
      <div className={`${SHELL} ${SECTION_Y}`}>
        <div className={`${LECTURE} animate-pulse space-y-4 motion-reduce:animate-none`}>
          <div className="h-3 w-24 rounded-full bg-white/10" />
          <div className="h-8 w-3/4 rounded-lg bg-white/10" />
          <div className="h-4 w-full rounded-lg bg-white/[0.06]" />
          <div className="h-4 w-5/6 rounded-lg bg-white/[0.06]" />
        </div>
      </div>
    </section>
  );
}
