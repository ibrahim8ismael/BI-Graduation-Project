import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import { cache } from "react";
import { SESSION_COOKIE } from "@/lib/auth/config";
import { type Role, isRole } from "@/lib/auth/roles";

const ALG = "HS256";
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

function getSecret(): Uint8Array {
	const secret = process.env.SESSION_SECRET;
	if (!secret) {
		throw new Error(
			"SESSION_SECRET is not set. Add it to client/.env.local before running the app."
		);
	}
	return new TextEncoder().encode(secret);
}

export type SessionPayload = {
	sub: string;
	email: string;
	role: Role;
	accessToken: string;
	refreshToken: string;
};

/** Sign a short-lived Next session cookie wrapping the FastAPI tokens. */
export async function signSession(payload: SessionPayload): Promise<string> {
	return new SignJWT({
		email: payload.email,
		role: payload.role,
		accessToken: payload.accessToken,
		refreshToken: payload.refreshToken,
	})
		.setProtectedHeader({ alg: ALG })
		.setSubject(payload.sub)
		.setIssuedAt()
		.setExpirationTime(`${SESSION_TTL_SECONDS}s`)
		.sign(getSecret());
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
	try {
		const { payload } = await jwtVerify(token, getSecret(), { algorithms: [ALG] });
		if (typeof payload.sub !== "string") return null;
		const role = payload.role;
		const email = payload.email;
		const accessToken = payload.accessToken;
		const refreshToken = payload.refreshToken;
		if (!isRole(role)) return null;
		if (typeof email !== "string") return null;
		if (typeof accessToken !== "string") return null;
		if (typeof refreshToken !== "string") return null;
		return {
			sub: payload.sub,
			email,
			role,
			accessToken,
			refreshToken,
		};
	} catch {
		return null;
	}
}

export async function setSessionCookie(token: string): Promise<void> {
	const store = await cookies();
	store.set(SESSION_COOKIE, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: SESSION_TTL_SECONDS,
	});
}

export async function clearSessionCookie(): Promise<void> {
	const store = await cookies();
	store.delete(SESSION_COOKIE);
}

export async function getSessionToken(): Promise<string | undefined> {
	const store = await cookies();
	return store.get(SESSION_COOKIE)?.value;
}

/**
 * Cached Data Access Layer for the current session.
 * React's `cache()` dedupes calls per request, so multiple components
 * hitting this won't re-verify the JWT.
 */
export const getSession = cache(async (): Promise<SessionPayload | null> => {
	const token = await getSessionToken();
	if (!token) return null;
	return verifySession(token);
});

/** Redirects to /login if unauthenticated. Use in protected route handlers. */
export async function requireSession(): Promise<SessionPayload> {
	const session = await getSession();
	if (!session) redirect("/login");
	return session;
}
