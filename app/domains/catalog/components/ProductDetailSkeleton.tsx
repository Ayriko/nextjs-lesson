import SimilarProductsSkeleton from "./SimilarProductsSkeleton";

export default function ProductDetailSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Back link */}
      <div style={{ height: "0.65rem", width: "4rem", background: "var(--surface-raised)", borderRadius: "2px", marginBottom: "2.5rem" }} />

      {/* Two-column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: image gallery */}
        <div>
          <div style={{ aspectRatio: "1 / 1", background: "var(--surface)", borderRadius: "2px" }} />
          <div className="mt-3 flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{ width: "4rem", height: "4rem", background: "var(--surface)", borderRadius: "2px" }} />
            ))}
          </div>
        </div>

        {/* Right: info */}
        <div>
          <div style={{ height: "0.62rem", width: "5rem", background: "var(--surface-raised)", borderRadius: "2px" }} />
          <div style={{ height: "2.5rem", width: "80%", background: "var(--surface-raised)", borderRadius: "2px", marginTop: "0.75rem" }} />
          <div style={{ height: "1px", background: "var(--border)", margin: "1.75rem 0" }} />
          <div className="space-y-2">
            <div style={{ height: "0.875rem", width: "100%", background: "var(--surface-raised)", borderRadius: "2px" }} />
            <div style={{ height: "0.875rem", width: "90%", background: "var(--surface-raised)", borderRadius: "2px" }} />
            <div style={{ height: "0.875rem", width: "75%", background: "var(--surface-raised)", borderRadius: "2px" }} />
          </div>
          <div className="flex items-center gap-6" style={{ marginTop: "2.5rem" }}>
            <div style={{ height: "2rem", width: "7rem", background: "var(--surface-raised)", borderRadius: "2px" }} />
            <div style={{ height: "2.5rem", width: "10rem", background: "var(--surface-raised)", borderRadius: "2px" }} />
          </div>
        </div>
      </div>

      {/* Similar products */}
      <div style={{ borderTop: "1px solid var(--border)", marginTop: "5rem", paddingTop: "4rem" }}>
        <SimilarProductsSkeleton />
      </div>
    </div>
  );
}
