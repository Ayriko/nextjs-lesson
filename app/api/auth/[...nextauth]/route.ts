import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Next.js App Router expose GET et POST sur /api/auth/*.
 * next-auth gère lui-même toutes les routes :
 *   /api/auth/signin, /api/auth/signout, /api/auth/session, /api/auth/callback/...
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
