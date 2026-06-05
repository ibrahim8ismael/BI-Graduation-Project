import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getSession, requireSession } from "@/lib/auth/session";
import { type Role, roleHomePath } from "@/lib/auth/roles";

/** Cached "who am I" check used by layouts & server components. */
export const getCurrentUser = cache(async () => {
	const session = await getSession();
	if (!session) return null;
	return {
		id: session.sub,
		email: session.email,
		role: session.role,
	};
});

export async function requireUser() {
	const session = await requireSession();
	return {
		id: session.sub,
		email: session.email,
		role: session.role,
	};
}

/** Ensures the current user has one of the allowed roles; otherwise /forbidden. */
export async function requireRole(allowed: readonly Role[]) {
	const user = await requireUser();
	if (!allowed.includes(user.role)) {
		redirect("/forbidden");
	}
	return user;
}

/** Send the visitor home based on whether they're signed in. */
export async function redirectByAuthState(target: { signedIn: string; signedOut: string }) {
	const user = await getCurrentUser();
	redirect(user ? target.signedIn : target.signedOut);
}

export function homeForRole(role: Role): string {
	return roleHomePath(role);
}
