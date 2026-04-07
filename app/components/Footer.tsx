import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}>
      <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.1rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--text)",
            }}
          >
            Ma boutique
          </p>
          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontSize: "0.78rem",
              color: "var(--muted)",
              marginTop: "0.6rem",
              lineHeight: 1.6,
            }}
          >
            Technologie raffinée,<br />sélectionnée pour les esprits exigeants.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "1rem",
            }}
          >
            Navigation
          </p>
          <ul className="space-y-2">
            {[["Accueil", "/"], ["À propos", "/about"], ["Admin", "/admin"]].map(
              ([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      fontFamily: "var(--font-jost)",
                      fontSize: "0.82rem",
                      color: "var(--muted)",
                      transition: "color 0.2s",
                    }}
                    className="hover:text-[var(--text)]"
                  >
                    {label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Legal */}
        <div className="sm:text-right">
          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontSize: "0.72rem",
              color: "var(--muted)",
              lineHeight: 1.8,
            }}
          >
            © 2026 Ma boutique trop bien.
            <br />
            Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
