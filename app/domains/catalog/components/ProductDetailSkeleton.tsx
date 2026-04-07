import SimilarProductsSkeleton from "./SimilarProductsSkeleton";

export default function ProductDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div style={{ height: "0.65rem", width: "4rem", background: "var(--surface-raised)", borderRadius: "4px", marginBottom: "3rem" }} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Gallery */}
        <div>
          <div style={{ aspectRatio: "1 / 1", background: "var(--surface)", borderRadius: "12px" }} />
          <div className="mt-3 flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{ width: "5rem", height: "5rem", background: "var(--surface)", borderRadius: "8px" }} />
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div style={{ height: "0.62rem", width: "5rem", background: "var(--surface-raised)", borderRadius: "4px" }} />
          <div style={{ height: "3rem", width: "80%", background: "var(--surface-raised)", borderRadius: "4px", marginTop: "0.75rem" }} />
          <div style={{ height: "1px", background: "var(--border)", margin: "2rem 0" }} />
          <div className="space-y-2">
            <div style={{ height: "0.9rem", width: "100%", background: "var(--surface-raised)", borderRadius: "4px" }} />
            <div style={{ height: "0.9rem", width: "88%", background: "var(--surface-raised)", borderRadius: "4px" }} />
            <div style={{ height: "0.9rem", width: "72%", background: "var(--surface-raised)", borderRadius: "4px" }} />
          </div>
          <div className="flex items-center gap-6" style={{ marginTop: "2.5rem" }}>
            <div style={{ height: "2.25rem", width: "8rem", background: "var(--surface-raised)", borderRadius: "4px" }} />
            <div style={{ height: "2.75rem", width: "11rem", background: "var(--surface-raised)", borderRadius: "8px" }} />
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--border)", marginTop: "6rem", paddingTop: "4rem" }}>
        <SimilarProductsSkeleton />
      </div>
    </div>
  );
}
