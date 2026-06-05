/** Roles synced with the FastAPI backend (`server/app/models/user.py`). */
export const ROLES = ["ceo", "product_manager", "marketer"] as const;
export type Role = (typeof ROLES)[number];

export function isRole(value: unknown): value is Role {
	return typeof value === "string" && (ROLES as readonly string[]).includes(value);
}

export const ROLE_LABELS: Record<Role, string> = {
	ceo: "CEO",
	product_manager: "Product Manager",
	marketer: "Marketer",
};

/** URL path each role lands on after sign-in. */
export const ROLE_HOME: Record<Role, string> = {
	ceo: "/dashboard/ceo",
	product_manager: "/dashboard/product-manager",
	marketer: "/dashboard/marketer",
};

export function roleHomePath(role: Role): string {
	return ROLE_HOME[role];
}
