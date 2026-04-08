import type { DefaultSession } from "next-auth";

/**
 * Extension des types générés par next-auth.
 * Sans ça, session.user.id et session.user.role seraient inconnus de TypeScript.
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}
