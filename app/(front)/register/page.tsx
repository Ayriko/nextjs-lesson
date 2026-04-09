"use client";

import { useActionState, useEffect } from "react";
import { register } from "@/app/actions/auth";
import AuthField from "@/app/components/AuthField";
import Link from "next/link";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(register, null);

  // register() appelle login() en interne → cookie déjà posé côté serveur
  useEffect(() => {
    if (state?.success) window.location.href = "/";
  }, [state]);

  return (
    <div className="mx-auto max-w-md px-6 py-20" style={{ minHeight: "60vh" }}>
      <p
        style={{
          fontFamily: "var(--font-jost)",
          fontSize: "0.65rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--accent)",
        }}
      >
        Nouveau compte
      </p>
      <h1
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "2.5rem",
          fontWeight: 400,
          color: "var(--text)",
          marginTop: "0.5rem",
          marginBottom: "2.5rem",
        }}
      >
        Inscription
      </h1>

      <form action={formAction} className="flex flex-col gap-5">
        <AuthField label="Nom" name="name" type="text" placeholder="Jean Dupont" />
        <AuthField label="Email" name="email" type="email" placeholder="jean@exemple.fr" />
        <AuthField label="Mot de passe" name="password" type="password" placeholder="••••••••" />

        {state?.error && (
          <p
            style={{
              fontFamily: "var(--font-jost)",
              fontSize: "0.8rem",
              color: "#b94040",
              background: "rgba(185,64,64,0.08)",
              border: "1px solid rgba(185,64,64,0.2)",
              padding: "0.6rem 0.9rem",
              borderRadius: "8px",
            }}
          >
            {state.error}
          </p>
        )}

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
            padding: "0.85rem 1.5rem",
            borderRadius: "8px",
            cursor: isPending ? "default" : "pointer",
            transition: "background 0.2s",
            marginTop: "0.5rem",
          }}
        >
          {isPending ? "Création…" : "Créer mon compte"}
        </button>
      </form>

      <p
        style={{
          fontFamily: "var(--font-jost)",
          fontSize: "0.8rem",
          color: "var(--muted)",
          marginTop: "2rem",
          textAlign: "center",
        }}
      >
        Déjà un compte ?{" "}
        <Link href="/login" style={{ color: "var(--accent)", textDecoration: "underline" }}>
          Se connecter
        </Link>
      </p>
    </div>
  );
}

