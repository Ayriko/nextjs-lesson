export default function Loading() {
  return (
    <div
      className="mx-auto max-w-screen-2xl px-8 py-32 flex flex-col items-center justify-center gap-6"
      style={{ minHeight: "60vh" }}
    >
      <div
        style={{
          width: "2rem",
          height: "2rem",
          borderRadius: "50%",
          border: "2px solid var(--border)",
          borderTopColor: "var(--accent)",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <p
        style={{
          fontFamily: "var(--font-jost)",
          fontSize: "0.6rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        Chargement
      </p>
    </div>
  );
}
