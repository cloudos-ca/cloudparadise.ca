import { Comfortaa, Work_Sans } from "next/font/google";

/** Titrage — H1 en 700. */
export const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--font-comfortaa",
});

/** Texte courant — 400, et 500 pour boutons et accents. */
export const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-work",
});
