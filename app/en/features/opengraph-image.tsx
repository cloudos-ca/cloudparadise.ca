import { renderOgImage } from "@/lib/ogImage";

export const alt = "Cloud OS — Features";
export { OG_SIZE as size } from "@/lib/ogImage";
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(
    "Everything the workstation can do.",
    "The full list, by use case. What’s here is available today.",
  );
}
