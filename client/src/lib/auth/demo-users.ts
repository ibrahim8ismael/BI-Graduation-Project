import "server-only";
import { type Role } from "@/lib/auth/roles";

export type DemoUser = {
	id: string;
	role: Role;
	email: string;
	password: string;
};

const ENV: Record<Role, { email: string; password: string }> = {
	ceo: {
		email: required("DEMO_CEO_EMAIL"),
		password: required("DEMO_CEO_PASSWORD"),
	},
	product_manager: {
		email: required("DEMO_PRODUCT_MANAGER_EMAIL"),
		password: required("DEMO_PRODUCT_MANAGER_PASSWORD"),
	},
	marketer: {
		email: required("DEMO_MARKETER_EMAIL"),
		password: required("DEMO_MARKETER_PASSWORD"),
	},
};

function required(name: string): string {
	const value = process.env[name];
	if (!value) {
		throw new Error(
			`${name} is not set. Add it to client/.env.local before running the app.`
		);
	}
	return value;
}

function buildUsers(): Record<Role, DemoUser> {
	return (Object.keys(ENV) as Role[]).reduce(
		(acc, role) => {
			acc[role] = {
				id: `demo-${role}-001`,
				role,
				email: ENV[role].email,
				password: ENV[role].password,
			};
			return acc;
		},
		{} as Record<Role, DemoUser>
	);
}

const USERS = buildUsers();

/** Look up a demo user by role. Returns null if the role is unknown. */
export function getDemoUser(role: Role): DemoUser {
	return USERS[role];
}

/** Find the demo user whose email matches, across all roles. */
export function findDemoUserByEmail(email: string): DemoUser | null {
	const normalized = email.trim().toLowerCase();
	return (Object.values(USERS) as DemoUser[]).find(
		(user) => user.email.toLowerCase() === normalized
	) ?? null;
}
