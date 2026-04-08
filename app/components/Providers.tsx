"use client";

import { SessionProvider } from "next-auth/react";

/**
 * SessionProvider doit être un Client Component.
 * On l'isole ici pour que layout.tsx reste un Server Component.
 * Il rend useSession() et signIn/signOut disponibles dans tout l'arbre client.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
