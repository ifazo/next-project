import type { NextAuthConfig, User } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import prisma from "./lib/prisma";

const credentialsSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });
  
  const getUser = async (
    email: string,
    password: string
  ): Promise<User | null> => {
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

export default {
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
            return null;
          }

          return user;
        } catch (error) {
          console.error("Error authorizing user:", error);
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
