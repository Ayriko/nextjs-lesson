"use client";

import { useTransition } from "react";
import { revalidateSponsored } from "@/app/actions/revalidate";

export default function RefreshSponsoredButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => revalidateSponsored())}
      disabled={isPending}
      style={{
        fontFamily: "var(--font-jost)",
        fontSize: "0.6rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: isPending ? "var(--muted)" : "var(--accent)",
        border: "1px solid",
        borderColor: isPending ? "var(--border)" : "var(--accent)",
        padding: "0.3rem 0.7rem",
        borderRadius: "20px",
        background: "transparent",
        cursor: isPending ? "default" : "pointer",
        transition: "opacity 0.2s",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
      }}
    >
      <span
        style={{
          display: "inline-block",
          transition: "transform 0.6s",
          transform: isPending ? "rotate(180deg)" : "rotate(0deg)",
        }}
      >
        ↻
      </span>
      {isPending ? "Actualisation…" : "Actualiser"}
    </button>
  );
}
