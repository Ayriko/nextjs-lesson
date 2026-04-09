"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className="mx-auto max-w-screen-2xl px-8 py-32 flex flex-col gap-6"
      style={{ fontFamily: "var(--font-jost)" }}
    >
      <p style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--accent)" }}>
        Erreur
      </p>
      <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 300, color: "var(--text)", lineHeight: 1.1 }}>
        Quelque chose<br /><em>s'est mal passé.</em>
      </h1>
      <p style={{ fontSize: "0.9rem", color: "var(--muted)", maxWidth: "42ch", lineHeight: 1.8 }}>
        Une erreur inattendue s'est produite. Vous pouvez réessayer ou revenir à l'accueil.
      </p>
      <div className="flex gap-4 mt-2">
        <button
          onClick={reset}
          style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--bg)", background: "var(--accent)", border: "none", padding: "0.8rem 1.5rem", borderRadius: "8px", cursor: "pointer" }}
        >
          Réessayer
        </button>
        <Link
          href="/"
          style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text)", border: "1px solid var(--border)", padding: "0.8rem 1.5rem", borderRadius: "8px" }}
        >
          Accueil
        </Link>
      </div>
    </div>
  );
}
