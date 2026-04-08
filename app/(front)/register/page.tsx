"use client";

import { useActionState, useEffect, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { register } from "@/app/actions/auth";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  /**
   * On stocke email et password dans des refs (pas du state) pour deux raisons :
   *   1. Les refs ne déclenchent pas de re-render inutile.
   *   2. On en a besoin uniquement au moment où state.success devient true —
   *      pas à chaque frappe clavier.
   *
   * Le mot de passe ne transite JAMAIS dans la réponse du serveur.
   * Il reste en mémoire côté client jusqu'à ce que signIn() le consomme.
   */
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const [state, formAction, isPending] = useActionState(register, null);

  /**
   * Quand le Server Action retourne { success: true }, le compte existe en base.
   * On enchaîne immédiatement signIn("credentials", ...) côté client.
   * next-auth poste vers /api/auth/callback/credentials, vérifie le mot de passe
   * (notre authorize dans lib/auth.ts), et pose le cookie de session.
   * Ensuite router.push("/") déclenche un re-render serveur du layout :
   * getServerSession() voit la session → Header affiche le trigram.
   */
  useEffect(() => {
    if (!state?.success) return;

    signIn("credentials", {
      email: emailRef.current,
      password: passwordRef.current,
      redirect: false,
    }).then((result) => {
      if (!result?.error) {
        router.refresh(); // force le re-render des Server Components (Header)
        router.push("/");
      }
    });
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

      {/*
        onChange sur le form met à jour les refs à chaque modification.
        On lit les valeurs des inputs par leur name, sans contrôler chaque champ.
      */}
      <form
        action={formAction}
        className="flex flex-col gap-5"
        onChange={(e) => {
          const form = e.currentTarget;
          emailRef.current =
            (form.elements.namedItem("email") as HTMLInputElement)?.value ?? "";
          passwordRef.current =
            (form.elements.namedItem("password") as HTMLInputElement)?.value ?? "";
        }}
      >
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

function AuthField({
  label, name, type, placeholder,
}: {
  label: string; name: string; type: string; placeholder: string;
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
