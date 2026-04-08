"use server";

import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import crypto from "crypto";

type RegisterState = { error?: string; success?: boolean } | null;

/**
 * Server Action appelée depuis la page /register via useActionState.
 * "use server" garantit que ce code s'exécute uniquement côté serveur —
 * le mot de passe ne transite jamais en clair côté client.
 *
 * Signature imposée par useActionState : (prevState, formData) => newState
 */
export async function register(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Tous les champs sont requis." };
  }

  if (password.length < 6) {
    return { error: "Le mot de passe doit faire au moins 6 caractères." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Un compte existe déjà avec cet email." };
  }

  await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      name,
      email,
      password: hashPassword(password),
      role: "user",
      updatedAt: new Date(),
    },
  });

  // On retourne success:true au lieu de redirect() pour que le client
  // puisse enchaîner signIn() sans quitter la page.
  return { success: true };
}
