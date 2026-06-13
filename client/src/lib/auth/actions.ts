"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "@/lib/auth";
import { findDemoUserByEmail } from "@/lib/auth/demo-users";
import { isRole, roleHomePath } from "@/lib/auth/roles";

export type LoginState = { ok: true } | { ok: false; error: string } | null;

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const hiddenRole = String(formData.get("role") ?? "");

  if (!email || !password) {
    return { ok: false, error: "Email and password are required." };
  }

  const matched = findDemoUserByEmail(email);
  if (!matched) {
    return { ok: false, error: "Invalid email or password." };
  }

  if (isRole(hiddenRole) && hiddenRole !== matched.role) {
    return {
      ok: false,
      error: "That email doesn't match the selected role tile.",
    };
  }

  if (password !== matched.password) {
    return { ok: false, error: "Invalid email or password." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      role: matched.role,
      redirect: false,
    });
  } catch {
    return { ok: false, error: "Invalid email or password." };
  }

  revalidatePath("/", "layout");
  redirect(roleHomePath(matched.role));
}

export async function logoutAction(): Promise<void> {
  await signOut({ redirect: false });
  revalidatePath("/", "layout");
  redirect("/login");
}
