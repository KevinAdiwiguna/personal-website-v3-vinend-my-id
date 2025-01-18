"use server"

import { signIn, signOut } from "@/lib/auth";

export const OAuthGithub = async () => {
  await signIn("github", { redirectTo: "/", redirect: true });
}

export const OAuthGoogle = async () => {
  await signIn("google", { redirectTo: "/", redirect: true });
}

export const ResendAuth = async (formData: FormData) => {
  await signIn("resend", formData)
}

export const SignOut = async () => {
  await signOut({ redirect: true, redirectTo: "/" });
}