"use client";

import { useActionState } from "react";
import { Component as LoginVisual } from "@/components/ui/animated-characters-login-page";
import { loginAction, type LoginState } from "@/lib/auth/actions";

export function LoginForm() {
	const [state, action, pending] = useActionState<LoginState, FormData>(
		loginAction,
		null
	);
	const error = state && !state.ok ? state.error : undefined;
	return <LoginVisual action={action} pending={pending} error={error} />;
}
