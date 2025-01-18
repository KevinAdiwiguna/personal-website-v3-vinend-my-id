import NextAuth from "next-auth"
import { db } from "../db/db"

import { PrismaAdapter } from "@auth/prisma-adapter"

import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import Resend from "next-auth/providers/resend"

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
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Resend({
      from: "vinend@vinend.my.id",
    })
  ],
  secret: process.env.AUTH_SECRET,
  debug: true,
})