import type { MetadataRoute } from "next";

/**
 * Manifest minimal : le site est une vitrine, pas une app installable avec
 * mode hors-ligne — ceci couvre l'ajout à l'écran d'accueil et l'icône
 * Android/PWA, sans prétendre à plus.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cloud OS",
    short_name: "Cloud OS",
    description: "Décrivez la tâche. On s’occupe du calcul.",
    start_url: "/",
    display: "standalone",
    background_color: "#1b273d",
    theme_color: "#1b273d",
    icons: [
      { src: "/icon/192", sizes: "192x192", type: "image/png" },
      { src: "/icon/512", sizes: "512x512", type: "image/png" },
      {
        src: "/icon/maskable",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
