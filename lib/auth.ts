import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { verifyPassword } from "./password";

/**
 * Configuration centralisée de NextAuth.
 * On l'exporte pour la réutiliser dans :
 *   - app/api/auth/[...nextauth]/route.ts  (handler HTTP)
 *   - getServerSession(authOptions)         (lecture session côté serveur)
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const valid = verifyPassword(credentials.password, user.password);
        if (!valid) return null;

        // L'objet retourné ici est mis dans le token JWT (callback jwt ci-dessous)
        return {
          id: user.id,
          name: user.name ?? user.email,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login", // Redirige vers notre propre page de login
  },

  callbacks: {
    /**
     * jwt : appelé à chaque création/refresh du token.
     * On y stocke id et role pour les retrouver dans la session.
     */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role: string }).role;
      }
      return token;
    },

    /**
     * session : appelé à chaque fois qu'on lit la session (useSession, getServerSession).
     * On expose id et role dans session.user.
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};
