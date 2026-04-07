import Link from "next/link";

type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  currency: string;
  category: string;
  stock: number;
  images: { main: string };
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="block group">
      <article
        style={{
          background: "var(--surface)",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid var(--border)",
          transition: "box-shadow 0.3s ease, transform 0.3s ease",
        }}
        className="hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5"
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 5" }}>
          <img
            src={product.images.main}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Soft gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(237,232,223,0.55) 0%, transparent 45%)",
            }}
          />

          {/* Category badge */}
          <span
            className="absolute top-3 left-3"
            style={{
              fontFamily: "var(--font-jost)",
              fontSize: "0.58rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--accent)",
              background: "rgba(246,242,236,0.82)",
              backdropFilter: "blur(6px)",
              border: "1px solid var(--border)",
              padding: "0.25rem 0.6rem",
              borderRadius: "20px",
            }}
          >
            {product.category}
          </span>

          {product.stock === 0 && (
            <span
              className="absolute top-3 right-3"
              style={{
                fontFamily: "var(--font-jost)",
                fontSize: "0.58rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--muted)",
                background: "rgba(246,242,236,0.82)",
                backdropFilter: "blur(6px)",
                border: "1px solid var(--border)",
                padding: "0.25rem 0.6rem",
                borderRadius: "20px",
              }}
            >
              Rupture
            </span>
          )}
        </div>

        {/* Info */}
        <div className="px-5 py-4">
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.15rem",
              fontWeight: 500,
              color: "var(--text)",
              lineHeight: 1.25,
              transition: "color 0.2s",
            }}
            className="group-hover:text-[var(--accent)]"
          >
            {product.name}
          </h2>
          <div className="mt-3 flex items-center justify-between">
            <span
              style={{
                fontFamily: "var(--font-jost)",
                fontWeight: 600,
                fontSize: "0.9rem",
                color: "var(--text)",
              }}
            >
              {product.price}{" "}
              <span style={{ color: "var(--muted)", fontWeight: 400 }}>
                {product.currency}
              </span>
            </span>
            <span
              style={{
                fontFamily: "var(--font-jost)",
                fontSize: "0.85rem",
                color: "var(--muted)",
                transition: "color 0.2s, transform 0.2s",
                display: "inline-block",
              }}
              className="group-hover:text-[var(--accent)] group-hover:translate-x-1"
            >
              →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
