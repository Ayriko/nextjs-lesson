"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Spec = { label: string; value: string };

type Props = {
  description: string;
  specs: Spec[];
};

export default function ProductTabs({ description, specs }: Props) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") === "specifications" ? "specifications" : "description";

  return (
    <>
      {/* Onglets */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--border)", marginBottom: "1.75rem" }}>
        {(["description", "specifications"] as const).map((t) => (
          <Link
            key={t}
            href={`?tab=${t}`}
            style={{
              fontFamily: "var(--font-jost)",
              fontSize: "0.62rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: activeTab === t ? "var(--text)" : "var(--muted)",
              padding: "0.6rem 1.25rem",
              borderBottom: activeTab === t ? "2px solid var(--accent)" : "2px solid transparent",
              marginBottom: "-1px",
              transition: "color 0.2s",
            }}
          >
            {t === "description" ? "Description" : "Spécifications"}
          </Link>
        ))}
      </div>

      {/* Contenu */}
      {activeTab === "description" ? (
        <p style={{ fontFamily: "var(--font-jost)", fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.85 }}>
          {description}
        </p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-jost)", fontSize: "0.85rem" }}>
          <tbody>
            {specs.map(({ label, value }) => (
              <tr key={label} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "0.75rem 0", color: "var(--muted)", width: "40%", letterSpacing: "0.05em" }}>{label}</td>
                <td style={{ padding: "0.75rem 0", color: "var(--text)" }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
