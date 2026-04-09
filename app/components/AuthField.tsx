export default function AuthField({ label, name, type, placeholder }: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span
        style={{
          fontFamily: "var(--font-jost)",
          fontSize: "0.65rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required
        style={{
          fontFamily: "var(--font-jost)",
          fontSize: "0.95rem",
          color: "var(--text)",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          padding: "0.7rem 1rem",
          outline: "none",
          transition: "border-color 0.2s",
          width: "100%",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
      />
    </label>
  );
}
