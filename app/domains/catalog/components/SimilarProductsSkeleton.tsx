import ProductCardSkeleton from "./ProductCardSkeleton";

export default function SimilarProductsSkeleton() {
  return (
    <section>
      <div
        className="animate-pulse"
        style={{ height: "0.62rem", width: "160px", background: "var(--surface-raised)", borderRadius: "2px", marginBottom: "2rem" }}
      />
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-px"
        style={{ background: "var(--border)" }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
