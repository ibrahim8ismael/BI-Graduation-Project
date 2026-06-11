import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { type Role, roleHomePath } from "@/lib/auth/roles";

export const getCurrentUser = cache(async () => {
  const session = await auth();
  if (!session?.user) return null;
  return {
    id: session.user.id!,
    email: session.user.email!,
    role: session.user.role,
  };
});

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireRole(allowed: readonly Role[]) {
  const user = await requireUser();
  if (!allowed.includes(user.role)) redirect("/forbidden");
  return user;
}

export async function redirectByAuthState(target: {
  signedIn: string;
  signedOut: string;
}) {
  const user = await getCurrentUser();
  redirect(user ? target.signedIn : target.signedOut);
}

export function homeForRole(role: Role): string {
  return roleHomePath(role);
}
