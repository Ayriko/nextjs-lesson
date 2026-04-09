"use server";

import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/password";
import { encode } from "next-auth/jwt";
import { cookies } from "next/headers";
import crypto from "crypto";

type State = { error?: string; success?: boolean } | null;

// ─── Register ────────────────────────────────────────────────────────────────

export async function register(_prevState: State, formData: FormData): Promise<State> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!name || !email || !password) return { error: "Tous les champs sont requis." };
  if (password.length < 6) return { error: "Le mot de passe doit faire au moins 6 caractères." };

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "Un compte existe déjà avec cet email." };

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

  // On connecte directement après l'inscription
  return login(null, formData);
}

// ─── Login ────────────────────────────────────────────────────────────────────

/**
 * Server Action de login — tout se passe côté serveur :
 *  1. Vérifie les credentials en base
 *  2. Encode un JWT via next-auth
 *  3. Pose le cookie de session via cookies() (API Next.js serveur)
 *
 * Côté client, plus aucun signIn() — juste window.location.href = "/" après success.
 */
export async function login(_prevState: State, formData: FormData): Promise<State> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) return { error: "Tous les champs sont requis." };

  const user = await prisma.user.findUnique({ where: { email } });

  // Même message volontairement vague : ne pas indiquer si c'est l'email ou le mdp
  if (!user || !user.password) return { error: "Email ou mot de passe incorrect." };

  const valid = verifyPassword(password, user.password);
  if (!valid) return { error: "Email ou mot de passe incorrect." };

  // Durée de session : 30 jours
  const maxAge = 30 * 24 * 60 * 60;

  /**
   * encode() crée un JWT signé avec NEXTAUTH_SECRET.
   * On y met les mêmes champs que notre callback jwt() dans authOptions,
   * pour que getServerSession() les retrouve correctement.
   */
  const token = await encode({
    token: {
      sub: user.id,
      id: user.id,
      name: user.name ?? user.email,
      email: user.email,
      role: user.role,
    },
    secret: process.env.NEXTAUTH_SECRET!,
    maxAge,
  });

  /**
   * next-auth v4 utilise "next-auth.session-token" en dev
   * et "__Secure-next-auth.session-token" en production (HTTPS requis).
   */
  const isProduction = process.env.NODE_ENV === "production";
  const cookieName = isProduction
    ? "__Secure-next-auth.session-token"
    : "next-auth.session-token";

  const cookieStore = await cookies();
  cookieStore.set(cookieName, token, {
    httpOnly: true,   // inaccessible depuis JavaScript côté client
    sameSite: "lax",  // protège contre le CSRF
    path: "/",
    secure: isProduction,
    maxAge,
    expires: new Date(Date.now() + maxAge * 1000),
  });

  return { success: true };
}
