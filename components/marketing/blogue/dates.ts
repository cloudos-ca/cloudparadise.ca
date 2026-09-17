import type { Lang } from "@/components/marketing/tokens";

/** « 17 septembre 2026 » / « September 17, 2026 » ; chaîne vide si la date est illisible. */
export function formaterDate(iso: string, lang: Lang): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(lang === "en" ? "en-CA" : "fr-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Toronto",
  }).format(date);
}
