import Link from "next/link";
import CartIcon from "@/app/components/CartIcon";
import { Suspense } from "react";

const NAV = [
  { label: "Accueil", href: "/" },
  { label: "Admin", href: "/admin" },
  { label: "À propos", href: "/about" },
];

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "var(--bg-glass)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <nav className="mx-auto flex max-w-screen-2xl items-center justify-between px-8 py-5">
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.25rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            color: "var(--text)",
            textTransform: "uppercase",
          }}
        >
          Ma boutique
        </Link>

        <ul className="flex items-center gap-10">
          {NAV.map(({ label, href }) => (
            <li key={href} className="hidden sm:block">
              <Link
                href={href}
                style={{
                  fontFamily: "var(--font-jost)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  transition: "color 0.2s",
                }}
                className="hover:text-[var(--text)]"
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Suspense
              fallback={
                <span style={{ color: "var(--accent)", fontSize: "1.1rem" }}>◯</span>
              }
            >
              <CartIcon />
            </Suspense>
          </li>
        </ul>
      </nav>
    </header>
  );
}
