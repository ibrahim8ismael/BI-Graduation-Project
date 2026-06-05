import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import type { SessionUser } from "@/components/nav-user";
import type { Role } from "@/lib/auth/roles";

export function AppShell({
	user,
	role,
	children,
}: {
	user: SessionUser;
	role: Role;
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<AppSidebar role={role} />
			<SidebarInset className="p-4 md:p-6">
				<AppHeader role={role} user={user} />
				<div className="flex flex-1 flex-col gap-4">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
