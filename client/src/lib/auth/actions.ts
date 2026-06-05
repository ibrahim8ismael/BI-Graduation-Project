"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
	signSession,
	setSessionCookie,
	clearSessionCookie,
} from "@/lib/auth/session";
import { isRole, roleHomePath } from "@/lib/auth/roles";
import { findDemoUserByEmail } from "@/lib/auth/demo-users";

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

	// If a role tile was used, make sure the typed email matches that role.
	if (isRole(hiddenRole) && hiddenRole !== matched.role) {
		return {
			ok: false,
			error: "That email doesn't match the selected role tile.",
		};
	}

	if (password !== matched.password) {
		return { ok: false, error: "Invalid email or password." };
	}

	const session = await signSession({
		sub: matched.id,
		email,
		role: matched.role,
		accessToken: `demo-access-${matched.id}`,
		refreshToken: `demo-refresh-${matched.id}`,
	});
	await setSessionCookie(session);
	revalidatePath("/", "layout");
	redirect(roleHomePath(matched.role));
}

export async function logoutAction(): Promise<void> {
	await clearSessionCookie();
	revalidatePath("/", "layout");
	redirect("/login");
}
