"use client";

import { useEffect } from "react";

/**
 * Dernier recours : ne se déclenche que si un layout racine lui-même plante
 * (très improbable, ni `(marketing)/layout.tsx` ni `en/layout.tsx` ne font de
 * traitement de données). Doit fournir son propre `<html>`/`<body>` et rester
 * simple — pas d'export `metadata` possible sur un Client Component, et mieux
 * vaut ne dépendre de rien qui pourrait, lui aussi, avoir causé le plantage.
 */
export default function GlobalError({
  error,
  unstable_retry,
}: Readonly<{
  error: Error & { digest?: string };
  unstable_retry: () => void;
}>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  // `fr-CA` comme les deux layouts racines (voir RootDocument) : ce
  // document-ci ne passe pas par eux, l'étiquette est donc écrite en dur.
  return (
    <html lang="fr-CA">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          background: "#1b273d",
          color: "#eef4ff",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
          Une erreur est survenue.
        </h1>
        {/* Valeur littérale et non `text-cp-muted` : global-error remplace le
            document entier, feuille de styles comprise. C'est le même gris que
            le token — à garder synchronisé avec `--color-cp-muted`. */}
        <p style={{ color: "#9daac5", maxWidth: "32rem" }}>
          Réessayez dans un instant. Si le problème persiste, revenez plus
          tard.
        </p>
        <button
          type="button"
          onClick={() => unstable_retry()}
          style={{
            padding: "0.625rem 1.25rem",
            borderRadius: "0.5rem",
            border: "1px solid rgba(255,255,255,.2)",
            background: "transparent",
            color: "#eef4ff",
            cursor: "pointer",
          }}
        >
          Réessayer
        </button>
      </body>
    </html>
  );
}
