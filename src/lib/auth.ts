import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface User {
	id: number;
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
		signIn: "/authentication/login",
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
                
                if (!credentials?.email || !credentials?.password) {
                  return null;
                }
              
                const user = await prisma.user.findUnique({
                  where: { email: credentials.email },
                });
              
                if (!user || !(await compare(credentials.password, user.password))) {
                  throw new Error("Invalid credentials");
                }
              
                return {
                  id: user.id.toString(), // Cast id from number to string
                  email: user.email,
                  name: user.name,
                };
              }
              
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
			session.user = token as any; 
			return session;
		},
	},
};

