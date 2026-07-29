import { renderOgImage } from "@/lib/ogImage";

export const alt = "Cloud Paradise — Features";
export { OG_SIZE as size } from "@/lib/ogImage";
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(
    "One place. All your heavy tasks.",
    "Describe what you want: the AI picks the right engine and runs the job in the cloud.",
  );
}
