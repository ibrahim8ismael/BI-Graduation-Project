import { AppShell } from "@/components/app-shell";
import { requireUser } from "@/lib/auth/dal";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await requireUser();
	return (
		<AppShell user={user} role={user.role}>
			{children}
		</AppShell>
	);
}
