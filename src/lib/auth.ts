import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface User {
  id: number;  // Change to number since Prisma returns an integer ID
  email: string;
  name: string;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 24 hours
  },
  pages: {
    signIn: "/auth/login",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials!.email || !credentials!.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials!.email,
          },
        });

        if (!user) {
          throw new Error("No user found");
        }

        const isValid = await compare(credentials!.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return { id: user.id, email: user.email, name: user.name };  // Correct type (id as number)
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email ?? null;
        token.name = user.name ?? null;
      }
      if (trigger === "update" && session) {
        token.id = session.user.id;
        token.email = session.user.email;
        token.name = session.user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token as any;  // Keep as 'any' or type properly if needed
      return session;
    },
  },
};
