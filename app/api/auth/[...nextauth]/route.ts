import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/app/lib/prisma";
import { compare } from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Partial<Record<"email" | "password", unknown>>) {
        const email = typeof credentials.email === "string" ? credentials.email : undefined;
        const password = typeof credentials.password === "string" ? credentials.password : undefined;
        if (!email || !password) return null;
        const user = await prisma.users.findUnique({
          where: { email }
        });
        if (!user || typeof user.password !== "string") return null;
        const isValid = await compare(password, user.password);
        if (!isValid) return null;
        return { id: user.id, name: user.name, email: user.email };
      }
    })
  ],
  session: { strategy: "jwt" as const },
  pages: {
    signIn: "/signin"
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    }
  }
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
