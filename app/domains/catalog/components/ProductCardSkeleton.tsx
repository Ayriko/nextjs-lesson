export default function ProductCardSkeleton() {
  return (
    <div
      className="animate-pulse"
      style={{
        background: "var(--surface)",
        borderRadius: "12px",
        border: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      <div style={{ aspectRatio: "4 / 5", background: "var(--surface-raised)" }} />
      <div className="px-5 py-4">
        <div style={{ height: "1.15rem", width: "70%", background: "var(--surface-raised)", borderRadius: "4px" }} />
        <div className="mt-3 flex items-center justify-between">
          <div style={{ height: "0.9rem", width: "30%", background: "var(--surface-raised)", borderRadius: "4px" }} />
          <div style={{ height: "0.9rem", width: "1rem", background: "var(--surface-raised)", borderRadius: "4px" }} />
        </div>
      </div>
    </div>
  );
}
