import NextAuth, { User as NextAuthUser, Session as NextAuthSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import authConfig from "./auth.config";

interface User extends NextAuthUser {
  role: string;
}

interface Session extends NextAuthSession {
  role: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
        token.role = (user as User).role;
      }
      return token;
    },
    async session({ session, token }) {
      (session as unknown as Session).role = token.role as string;
      session.user = {
        id: token.id as string,
        name: token.name,
        image: token.picture,
        email: token.email as string,
        emailVerified: null,
      };
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
    signOut: "/",
    error: "/error",
  },
  secret: process.env.AUTH_SECRET,
});
