import Link from "next/link";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import CartIcon from "@/app/components/CartIcon";
import UserMenu from "@/app/components/UserMenu";

/**
 * Header est un Server Component : on peut appeler getServerSession directement,
 * sans useSession ni SessionProvider. C'est plus rapide (pas de round-trip client).
 */
export default async function Header() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

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
        {/* Logo */}
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
          <li className="hidden sm:block">
            <NavLink href="/">Accueil</NavLink>
          </li>

          {/* Admin — visible uniquement pour le rôle "admin" */}
          {user?.role === "admin" && (
            <li className="hidden sm:block">
              <NavLink href="/admin">Admin</NavLink>
            </li>
          )}

          <li className="hidden sm:block">
            <NavLink href="/about">À propos</NavLink>
          </li>

          {/* Panier */}
          <li>
            <Suspense fallback={<span style={{ color: "var(--accent)" }}>◯</span>}>
              <CartIcon />
            </Suspense>
          </li>

          {/* Auth : trigram + déconnexion si connecté, bouton connexion sinon */}
          <li>
            {user ? (
              <UserMenu name={user.name ?? user.email ?? "?"} />
            ) : (
              <Link
                href="/login"
                style={{
                  fontFamily: "var(--font-jost)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  border: "1px solid var(--accent)",
                  padding: "0.3rem 0.7rem",
                  borderRadius: "20px",
                }}
              >
                Connexion
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
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
      {children}
    </Link>
  );
}
