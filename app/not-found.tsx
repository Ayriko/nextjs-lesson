import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="mx-auto max-w-screen-2xl px-8 py-32 flex flex-col gap-6"
      style={{ fontFamily: "var(--font-jost)" }}
    >
      <p style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--accent)" }}>
        404
      </p>
      <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 300, color: "var(--text)", lineHeight: 1.1 }}>
        Page<br /><em>introuvable.</em>
      </h1>
      <p style={{ fontSize: "0.9rem", color: "var(--muted)", maxWidth: "42ch", lineHeight: 1.8 }}>
        Cette page n'existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--bg)", background: "var(--accent)", border: "none", padding: "0.8rem 1.5rem", borderRadius: "8px", display: "inline-block", marginTop: "0.5rem" }}
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
