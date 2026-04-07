import { notFound } from "next/navigation";
import { getSponsoredProduct } from "@/lib/mockshop";
import Link from "next/link";
import ProductImageGallery from "@/app/domains/catalog/components/ProductImageGallery";

export default async function SponsoredProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getSponsoredProduct(handle);

  if (!product) notFound();

  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const currency = product.priceRange.minVariantPrice.currencyCode;

  const images = {
    main: product.images[0]?.url ?? "",
    gallery: product.images.slice(1).map((img) => img.url),
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Back link */}
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-jost)",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--muted)",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          transition: "color 0.2s",
          marginBottom: "2.5rem",
        }}
        className="hover:text-[var(--text)]"
      >
        ← Retour
      </Link>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: Gallery */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ProductImageGallery images={images} alt={product.title} />
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          {/* Sponsored badge */}
          <span
            style={{
              fontFamily: "var(--font-jost)",
              fontSize: "0.58rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--bg)",
              background: "var(--accent)",
              padding: "0.25rem 0.6rem",
              borderRadius: "2px",
              display: "inline-block",
              alignSelf: "flex-start",
            }}
          >
            Sponsorisé
          </span>

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 400,
              color: "var(--text)",
              lineHeight: 1.1,
              marginTop: "0.75rem",
            }}
          >
            {product.title}
          </h1>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: "var(--border)",
              margin: "1.75rem 0",
            }}
          />

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontSize: "0.875rem",
              color: "var(--muted)",
              lineHeight: 1.8,
            }}
          >
            {product.description}
          </p>

          {/* Price — no cart button */}
          <div style={{ marginTop: "2.5rem" }}>
            <p
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "2rem",
                fontWeight: 500,
                color: "var(--text)",
                lineHeight: 1,
              }}
            >
              {price.toFixed(2)}{" "}
              <span
                style={{
                  fontFamily: "var(--font-jost)",
                  fontSize: "1rem",
                  fontWeight: 400,
                  color: "var(--muted)",
                }}
              >
                {currency}
              </span>
            </p>
            <p
              style={{
                fontFamily: "var(--font-jost)",
                fontSize: "0.72rem",
                color: "var(--muted)",
                marginTop: "0.75rem",
                letterSpacing: "0.05em",
              }}
            >
              Produit partenaire — disponible chez nos revendeurs agréés.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
