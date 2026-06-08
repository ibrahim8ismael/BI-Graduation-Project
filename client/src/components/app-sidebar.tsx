"use client";

import { LogoIcon } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavGroup } from "@/components/nav-group";
import { getNavGroups } from "@/components/app-shared";
import { LatestChange } from "@/components/latest-change";
import { ThemeToggle } from "@/components/theme-toggle";
import { PlusIcon, SearchIcon } from "lucide-react";
import type { Role } from "@/lib/auth/roles";
import { usePathname } from "next/navigation";

export function AppSidebar({ role }: { role: Role }) {
	const pathname = usePathname();
	const groups = getNavGroups(role);

	return (
		<Sidebar collapsible="icon" variant="floating">
			<SidebarHeader className="h-14 justify-center">
				<SidebarMenuButton asChild>
					<a href="/dashboard">
						<LogoIcon />
						<span className="font-medium">Flowtic</span>
					</a>
				</SidebarMenuButton>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenuItem className="flex items-center gap-2">
						<SidebarMenuButton
							className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
							tooltip="Quick add"
						>
							<PlusIcon />
							<span>Quick add</span>
						</SidebarMenuButton>
						<Button
							aria-label="Search"
							className="size-8 group-data-[collapsible=icon]:opacity-0"
							size="icon"
							variant="outline"
						>
							<SearchIcon />
							<span className="sr-only">Search</span>
						</Button>
					</SidebarMenuItem>
				</SidebarGroup>
				{groups.map((group, index) => (
					<NavGroup
						key={`sidebar-group-${index}`}
						{...group}
						activePath={pathname}
					/>
				))}
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu className="gap-0">
					<SidebarMenuItem>
						<ThemeToggle />
					</SidebarMenuItem>
				</SidebarMenu>
				<LatestChange />
			</SidebarFooter>
		</Sidebar>
	);
}
