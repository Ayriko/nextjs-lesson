"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DevTools() {
  const [boom, setBoom] = useState(false);
  const router = useRouter();

  if (boom) throw new Error("Erreur de test déclenchée depuis DevTools.");

  const btnStyle = {
    fontFamily: "var(--font-jost)",
    fontSize: "0.65rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    border: "1px solid var(--border)",
    background: "transparent",
    color: "var(--muted)",
    padding: "0.4rem 0.9rem",
    borderRadius: "6px",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        fontFamily: "var(--font-jost)",
        fontSize: "0.6rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "var(--muted)",
        borderTop: "1px solid var(--border)",
        padding: "1rem 0",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      <span>Dev</span>
      <button style={btnStyle} onClick={() => setBoom(true)}>
        Tester error.tsx
      </button>
      <button style={btnStyle} onClick={() => router.push("/route-inexistante")}>
        Tester not-found.tsx
      </button>
    </div>
  );
}
