"use client";

import { useActionState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type State = { error?: string; success?: boolean } | null;

/**
 * Ici l'action n'est PAS un Server Action ("use server") car signIn()
 * de next-auth/react est une fonction client qui poste vers /api/auth/callback.
 * On utilise quand même useActionState pour gérer l'état du formulaire
 * de façon cohérente avec le reste du TP.
 */
async function loginAction(_prevState: State, formData: FormData): Promise<State> {
  const result = await signIn("credentials", {
    email: formData.get("email"),
    password: formData.get("password"),
    redirect: false, // on gère la redirection nous-mêmes
  });

  if (result?.error) {
    return { error: "Email ou mot de passe incorrect." };
  }

  return { success: true };
}

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(loginAction, null);

  // Quand l'action retourne { success: true }, on redirige
  useEffect(() => {
    if (state?.success) {
      router.refresh(); // force le re-render des Server Components (Header)
      router.push("/");
    }
  }, [state, router]);

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
        Accès membre
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
        Connexion
      </h1>

      <form action={formAction} className="flex flex-col gap-5">
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
          {isPending ? "Connexion…" : "Se connecter"}
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
        Pas encore de compte ?{" "}
        <Link
          href="/register"
          style={{ color: "var(--accent)", textDecoration: "underline" }}
        >
          S&apos;inscrire
        </Link>
      </p>
    </div>
  );
}

function AuthField({
  label,
  name,
  type,
  placeholder,
}: {
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
