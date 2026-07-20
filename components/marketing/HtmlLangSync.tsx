"use client";

import { useEffect } from "react";
import type { Lang } from "./tokens";

/**
 * Corrige `<html lang>` pour les pages anglaises.
 *
 * Le layout racine (`app/layout.tsx`) pose `lang="fr"` une fois pour toutes —
 * un seul layout racine peut définir `<html>`, et les pages françaises restent
 * à leur place plutôt que de déplacer tout l'arbre sous un segment `[lang]`.
 * Ce composant corrige l'attribut côté client, uniquement monté dans
 * `app/en/layout.tsx`.
 */
export function HtmlLangSync({ lang }: { lang: Lang }) {
  useEffect(() => {
    const precedent = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = precedent;
    };
  }, [lang]);

  return null;
}
