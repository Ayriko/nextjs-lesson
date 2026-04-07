import { prisma } from "@/lib/prisma";
import { getSponsoredProducts } from "@/lib/mockshop";
import ProductCard from "@/app/domains/catalog/components/ProductCard";
import SponsoredProductCard from "@/app/domains/catalog/components/SponsoredProductCard";

export default async function Home() {
  const [products, sponsored] = await Promise.all([
    prisma.product.findMany({ orderBy: { name: "asc" } }),
    getSponsoredProducts(4).catch(() => []),
  ]);

  return (
    <div>
      {/* Hero */}
      <section
        className="mx-auto max-w-7xl px-6 py-20"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <p
          style={{
            fontFamily: "var(--font-jost)",
            fontSize: "0.65rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          Catalogue 2026
        </p>
        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(3rem, 9vw, 6.5rem)",
            fontWeight: 300,
            lineHeight: 1.0,
            color: "var(--text)",
            marginTop: "1rem",
            letterSpacing: "-0.01em",
          }}
        >
          Technologie
          <br />
          <em>raffinée.</em>
        </h1>
        <p
          style={{
            fontFamily: "var(--font-jost)",
            fontSize: "0.85rem",
            color: "var(--muted)",
            marginTop: "1.75rem",
            maxWidth: "38ch",
            lineHeight: 1.75,
          }}
        >
          Matériel de qualité supérieure, sélectionné pour les esprits
          exigeants.
        </p>
      </section>

      {/* Sponsored products */}
      {sponsored.length > 0 && (
        <section
          className="mx-auto max-w-7xl px-6 py-16"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex items-baseline justify-between mb-8">
            <p
              style={{
                fontFamily: "var(--font-jost)",
                fontSize: "0.6rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              Partenaires
            </p>
            <span
              style={{
                fontFamily: "var(--font-jost)",
                fontSize: "0.58rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--accent)",
                border: "1px solid var(--accent)",
                padding: "0.2rem 0.5rem",
                borderRadius: "2px",
              }}
            >
              Sponsorisé
            </span>
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ background: "var(--border)" }}
          >
            {sponsored.map((product) => (
              <SponsoredProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Our products */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-baseline justify-between mb-8">
          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontSize: "0.6rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            {products.length} produits
          </p>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: "var(--border)" }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                images: product.images as { main: string },
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
