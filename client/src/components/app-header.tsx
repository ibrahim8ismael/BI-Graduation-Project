"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AppBreadcrumbs, type AppBreadcrumbPage } from "@/components/app-breadcrumbs";
import { CustomSidebarTrigger } from "@/components/custom-sidebar-trigger";
import { getNavLinks } from "@/components/app-shared";
import { NavUser } from "@/components/nav-user";
import { BellIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import type { Role } from "@/lib/auth/roles";
import type { SessionUser } from "@/components/nav-user";

function findActivePage(
	role: Role,
	pathname: string
): AppBreadcrumbPage | null {
	const links = getNavLinks(role);
	const match = links
		.filter((l) => l.path)
		.find((l) => {
			const base = l.path!.split("#")[0];
			return base && base === pathname;
		});
	if (!match) return null;
	return { title: match.title, icon: match.icon ?? undefined };
}

export function AppHeader({ role, user }: { role: Role; user: SessionUser }) {
	const pathname = usePathname();
	const page = findActivePage(role, pathname);
	return (
		<header
			className={cn(
				"pxx-4 mb-6 flex items-center justify-between gap-2 md:px-2"
			)}
		>
			<div className="flex items-center gap-3">
				<CustomSidebarTrigger />
				<Separator
					className="mr-2 h-4 data-[orientation=vertical]:self-center"
					orientation="vertical"
				/>
				<AppBreadcrumbs page={page} />
			</div>
			<div className="flex items-center gap-3">
				<Button aria-label="Notifications" size="icon" variant="ghost">
					<BellIcon />
				</Button>
				<Separator
					className="h-4 data-[orientation=vertical]:self-center"
					orientation="vertical"
				/>
				<NavUser user={user} role={role} />
			</div>
		</header>
	);
}
