"use client";

import { useActionState } from "react";
import { updateProduct } from "@/app/actions/product";
import type { UpdateProductState } from "@/app/actions/product";
import type { ProductUpdate } from "@/lib/schemas/product";

type Props = {
  id: string;
  defaultValues: ProductUpdate;
};

/**
 * useActionState attend une action (prevState, formData) => state.
 * updateProduct prend (id, prevState, formData) — on fixe l'id avec .bind() :
 *   updateProduct.bind(null, id)  →  (prevState, formData) => state  ✓
 *
 * bind() crée une nouvelle fonction avec `id` pré-rempli en premier argument.
 * C'est la technique standard pour passer des paramètres statiques à une
 * Server Action utilisée dans useActionState.
 */

export default function EditProductForm({ id, defaultValues }: Props) {
  const updateWithId = updateProduct.bind(null, id);
  const [state, formAction, isPending] = useActionState<UpdateProductState, FormData>(
    updateWithId,
    null
  );

  return (
    <form action={formAction} className="flex flex-col gap-6 mt-8">
      {state?.error && (
        <div
          style={{
            fontFamily: "var(--font-jost)",
            fontSize: "0.85rem",
            color: "#b94040",
            background: "rgba(185,64,64,0.08)",
            border: "1px solid rgba(185,64,64,0.25)",
            padding: "0.6rem 0.9rem",
            borderRadius: "8px",
          }}
        >
          {state.error}
        </div>
      )}

      {state?.success && (
        <div
          style={{
            fontFamily: "var(--font-jost)",
            fontSize: "0.85rem",
            color: "#3a7a50",
            background: "rgba(58,122,80,0.08)",
            border: "1px solid rgba(58,122,80,0.25)",
            padding: "0.6rem 0.9rem",
            borderRadius: "8px",
          }}
        >
          {state.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field
          label="Nom"
          name="name"
          defaultValue={defaultValues.name}
          errors={state?.errors?.name}
        />
        <Field
          label="Catégorie"
          name="category"
          defaultValue={defaultValues.category}
          errors={state?.errors?.category}
        />
        <Field
          label="Marque"
          name="brand"
          defaultValue={defaultValues.brand}
          errors={state?.errors?.brand}
        />
        <Field
          label="Prix (€)"
          name="price"
          type="number"
          step="0.01"
          defaultValue={String(defaultValues.price)}
          errors={state?.errors?.price}
        />
        <Field
          label="Stock"
          name="stock"
          type="number"
          defaultValue={String(defaultValues.stock)}
          errors={state?.errors?.stock}
        />
      </div>

      <Field
        label="Description"
        name="description"
        textarea
        defaultValue={defaultValues.description}
        errors={state?.errors?.description}
      />

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          style={{
            fontFamily: "var(--font-jost)",
            fontSize: "0.7rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--bg)",
            background: isPending ? "var(--muted)" : "var(--accent)",
            border: "none",
            padding: "0.8rem 1.5rem",
            borderRadius: "8px",
            cursor: isPending ? "default" : "pointer",
            transition: "background 0.2s",
          }}
        >
          {isPending ? "Enregistrement…" : "Enregistrer les modifications"}
        </button>

        <button
          type="submit"
          name="_intent"
          value="test_error"
          disabled={isPending}
          style={{
            fontFamily: "var(--font-jost)",
            fontSize: "0.7rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#b94040",
            background: "transparent",
            border: "1px solid rgba(185,64,64,0.35)",
            padding: "0.8rem 1.5rem",
            borderRadius: "8px",
            cursor: isPending ? "default" : "pointer",
            transition: "border-color 0.2s",
          }}
        >
          Tester une erreur
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  errors,
  type = "text",
  step,
  textarea = false,
}: {
  label: string;
  name: string;
  defaultValue: string;
  errors?: string[];
  type?: string;
  step?: string;
  textarea?: boolean;
}) {
  const inputStyle = {
    fontFamily: "var(--font-jost)",
    fontSize: "0.9rem",
    color: "var(--text)",
    background: "var(--surface)",
    border: `1px solid ${errors?.length ? "#b94040" : "var(--border)"}`,
    borderRadius: "8px",
    padding: "0.7rem 1rem",
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s",
  };

  return (
    <label className="flex flex-col gap-1.5">
      <span
        style={{
          fontFamily: "var(--font-jost)",
          fontSize: "0.62rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        {label}
      </span>

      {textarea ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          rows={4}
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = errors?.length ? "#b94040" : "var(--border)")
          }
        />
      ) : (
        <input
          name={name}
          type={type}
          step={step}
          defaultValue={defaultValue}
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = errors?.length ? "#b94040" : "var(--border)")
          }
        />
      )}

      {/* Erreurs Zod par champ */}
      {errors?.map((err) => (
        <span
          key={err}
          style={{
            fontFamily: "var(--font-jost)",
            fontSize: "0.72rem",
            color: "#b94040",
          }}
        >
          {err}
        </span>
      ))}
    </label>
  );
}
