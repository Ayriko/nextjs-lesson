"use client";

import { signOut } from "next-auth/react";

/**
 * Composant client minimal : reçoit le nom depuis le Header (server component)
 * et gère le signout côté client. On évite de rendre le Header entier client
 * juste pour ce bouton.
 */
export default function UserMenu({ name }: { name: string }) {
  const trigram = name
    .trim()
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-3">
      {/* Cercle trigram */}
      <div
        style={{
          fontFamily: "var(--font-jost)",
          fontSize: "0.6rem",
          fontWeight: 600,
          letterSpacing: "0.05em",
          color: "var(--bg)",
          background: "var(--accent)",
          width: "2rem",
          height: "2rem",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {trigram}
      </div>

      {/* Bouton signout */}
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        style={{
          fontFamily: "var(--font-jost)",
          fontSize: "0.6rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--muted)",
          border: "1px solid var(--border)",
          padding: "0.3rem 0.7rem",
          borderRadius: "20px",
          background: "transparent",
          cursor: "pointer",
          transition: "color 0.2s, border-color 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--text)";
          e.currentTarget.style.borderColor = "var(--text)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--muted)";
          e.currentTarget.style.borderColor = "var(--border)";
        }}
      >
        Déconnexion
      </button>
    </div>
  );
}
