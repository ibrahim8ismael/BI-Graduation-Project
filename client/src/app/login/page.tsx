import type { Metadata } from "next";
import LoginPage from "@/components/ui/animated-characters-login-page";

export const metadata: Metadata = {
  title: "Log in",
  description: "Sign in to your account",
};

export default function Login() {
  return <LoginPage />;
}
