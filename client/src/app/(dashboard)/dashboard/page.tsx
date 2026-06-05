import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/dal";
import { roleHomePath } from "@/lib/auth/roles";

export default async function DashboardIndex() {
	const user = await requireUser();
	redirect(roleHomePath(user.role));
}
