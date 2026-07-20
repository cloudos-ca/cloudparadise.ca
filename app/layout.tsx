import type { Metadata } from "next";
import { MatomoAnalytics } from "@/components/marketing/MatomoAnalytics";
import { comfortaa, workSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cloud Paradise — Décrivez la tâche. On s'occupe du calcul.",
  description:
    "Déposez vos fichiers, dites ce que vous voulez en mots simples. L'IA choisit le bon mode et lance le calcul dans le cloud. Vous n'avez qu'à récupérer le résultat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${comfortaa.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        {children}
        {/* Site entier (FR + EN) : voir MatomoAnalytics.tsx pour la porte de
            consentement. */}
        <MatomoAnalytics />
      </body>
    </html>
  );
}
