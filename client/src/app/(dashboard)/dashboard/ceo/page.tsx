import { requireRole } from "@/lib/auth/dal";
import { ROLE_LABELS } from "@/lib/auth/roles";
import { LogoutButton } from "@/components/logout-button";

export default async function CeoDashboardPage() {
	const user = await requireRole(["ceo"]);
	return (
		<section className="flex flex-1 flex-col gap-4">
			<div className="flex items-start justify-between gap-4">
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl font-semibold tracking-tight">
						Welcome, {user.email}
					</h1>
					<p className="text-sm text-muted-foreground">
						Signed in as {ROLE_LABELS.ceo}. This is a placeholder — wire up
						the CEO dashboards here.
					</p>
				</div>
				<LogoutButton />
			</div>
		</section>
	);
}
