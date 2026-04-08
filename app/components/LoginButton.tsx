"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span
          style={{
            fontFamily: "var(--font-jost)",
            fontSize: "0.72rem",
            color: "var(--muted)",
            letterSpacing: "0.04em",
          }}
        >
          {session.user?.name}
        </span>
        <button
          onClick={() => signOut()}
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
            (e.currentTarget as HTMLButtonElement).style.color = "var(--text)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--text)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
          }}
        >
          Déconnexion
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn()}
      style={{
        fontFamily: "var(--font-jost)",
        fontSize: "0.6rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--accent)",
        border: "1px solid var(--accent)",
        padding: "0.3rem 0.7rem",
        borderRadius: "20px",
        background: "transparent",
        cursor: "pointer",
        transition: "background 0.2s, color 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "var(--accent)";
        (e.currentTarget as HTMLButtonElement).style.color = "var(--bg)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)";
      }}
    >
      Connexion
    </button>
  );
}
