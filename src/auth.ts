import NextAuth, { User } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

interface IUser {
  id: string;
  name: string | null;
  email: string;
  password: string | null;
}

const getUser = async (
  email: string,
  password: string
): Promise<IUser | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    const isValidPassword = user?.password
      ? await bcrypt.compare(password, user.password)
      : false;

    if (!isValidPassword) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error fetching user from database:", error);
    return null;
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    GitHub,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = credentialsSchema.parse(credentials);

          const user = await getUser(email, password);

          if (!user) {
            throw new Error("Invalid credentials.");
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
          } as User;
        } catch (error) {
          console.error("Error authorizing user:", error);
          return null;
        }
      },
    }),
  ],
});
