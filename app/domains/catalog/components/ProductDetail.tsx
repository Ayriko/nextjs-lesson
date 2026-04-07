import { notFound } from "next/navigation";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import ProductImageGallery from "./ProductImageGallery";
import AddToCartButton from "./AddToCartButton";
import SimilarProducts from "./SimilarProducts";
import SimilarProductsSkeleton from "./SimilarProductsSkeleton";

export default async function ProductDetail({ slug }: { slug: string }) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) notFound();

  const images = product.images as { main: string; gallery: string[] };

  return (
    <>
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
          marginBottom: "3rem",
        }}
        className="hover:text-[var(--text)]"
      >
        ← Retour
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Gallery */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ProductImageGallery images={images} alt={product.name} />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span
            style={{
              fontFamily: "var(--font-jost)",
              fontSize: "0.62rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            {product.category}
          </span>

          <h1
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: 400,
              color: "var(--text)",
              lineHeight: 1.1,
              marginTop: "0.75rem",
            }}
          >
            {product.name}
          </h1>

          <div style={{ height: "1px", background: "var(--border)", margin: "2rem 0" }} />

          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontSize: "0.9rem",
              color: "var(--muted)",
              lineHeight: 1.85,
            }}
          >
            {product.description}
          </p>

          {product.stock > 0 && product.stock <= 10 && (
            <p
              style={{
                fontFamily: "var(--font-jost)",
                fontSize: "0.7rem",
                letterSpacing: "0.08em",
                color: "var(--accent)",
                marginTop: "1.5rem",
              }}
            >
              Plus que {product.stock} en stock
            </p>
          )}

          <div className="flex items-center gap-6" style={{ marginTop: "2.5rem" }}>
            <p
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "2.25rem",
                fontWeight: 500,
                color: "var(--text)",
                lineHeight: 1,
              }}
            >
              {product.price}{" "}
              <span style={{ fontFamily: "var(--font-jost)", fontSize: "1rem", fontWeight: 400, color: "var(--muted)" }}>
                {product.currency}
              </span>
            </p>
            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                currency: product.currency,
                stock: product.stock,
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--border)", marginTop: "6rem", paddingTop: "4rem" }}>
        <Suspense fallback={<SimilarProductsSkeleton />}>
          <SimilarProducts category={product.category} excludeId={product.id} />
        </Suspense>
      </div>
    </>
  );
}
