import NextAuth from "next-auth";
import { db } from "../db/db";

import { PrismaAdapter } from "@auth/prisma-adapter";

import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Resend from "next-auth/providers/resend";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: { scope: "read:user user:email" },
      },
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email ?? `${profile.id}@noemail.github.local`,
          image: profile.avatar_url,
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email ?? `${profile.sub}@noemail.google.local`,
          image: profile.picture,
        };
      },
    }),
    Resend({
      from: "vinend@vinend.my.id",
    }),
  ],
  secret: process.env.AUTH_SECRET,
  debug: false,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await db.user.findUnique({
          where: { email: user.email! },
          select: { role: true },
        });
        token.role = dbUser?.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.role = token.role;
      return session;
    },
  },
});
