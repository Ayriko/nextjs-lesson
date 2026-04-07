export default function ProductCardSkeleton() {
  return (
    <div
      className="animate-pulse"
      style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}
    >
      {/* Image placeholder */}
      <div
        style={{
          aspectRatio: "4 / 5",
          background: "var(--surface)",
        }}
      />
      {/* Info */}
      <div className="px-5 py-4" style={{ borderTop: "1px solid var(--border)" }}>
        <div style={{ height: "1.15rem", width: "70%", background: "var(--surface-raised)", borderRadius: "2px" }} />
        <div className="mt-3 flex items-center justify-between">
          <div style={{ height: "0.9rem", width: "30%", background: "var(--surface-raised)", borderRadius: "2px" }} />
          <div style={{ height: "0.9rem", width: "1rem", background: "var(--surface-raised)", borderRadius: "2px" }} />
        </div>
      </div>
    </div>
  );
}
