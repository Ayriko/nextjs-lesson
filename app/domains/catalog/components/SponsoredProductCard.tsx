import Link from "next/link";
import type { MockShopProduct } from "@/lib/mockshop";

type Props = {
  product: MockShopProduct;
};

export default function SponsoredProductCard({ product }: Props) {
  const image = product.images[0];
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const currency = product.priceRange.minVariantPrice.currencyCode;

  return (
    <Link href={`/products/sponsored/${product.handle}`} className="block group">
      <article style={{ background: "var(--bg)" }}>
        {/* Image */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "4 / 5" }}
        >
          {image ? (
            <img
              src={image.url}
              alt={image.altText ?? product.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "var(--surface)" }} />
          )}

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(13,12,16,0.6) 0%, transparent 50%)",
            }}
          />

          {/* Sponsored badge */}
          <span
            className="absolute top-3 left-3"
            style={{
              fontFamily: "var(--font-jost)",
              fontSize: "0.58rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--bg)",
              background: "var(--accent)",
              padding: "0.25rem 0.6rem",
              borderRadius: "2px",
            }}
          >
            Sponsorisé
          </span>
        </div>

        {/* Info */}
        <div className="px-5 py-4" style={{ borderTop: "1px solid var(--border)" }}>
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
            {product.title}
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
              {price.toFixed(2)}{" "}
              <span style={{ color: "var(--muted)", fontWeight: 400 }}>
                {currency}
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
