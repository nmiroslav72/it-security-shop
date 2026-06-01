// @ts-nocheck
import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe NextAuth config (bez Prisma-e).
 * Koristi se u middleware-u koji radi na Edge runtime-u.
 */
export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [], // pravi provideri se dodaju u src/lib/auth.ts
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = (user as { id: string }).id;
        token.role = (user as { role: string }).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};
