"use client";

import {
	Avatar,
	AvatarFallback,
} from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	UserIcon,
	BellIcon,
	CommandIcon,
	LifeBuoyIcon,
	BookOpenIcon,
	CreditCardIcon,
	LogOutIcon,
} from "lucide-react";
import { logoutAction } from "@/lib/auth/actions";
import { ROLE_LABELS } from "@/lib/auth/roles";
import type { Role } from "@/lib/auth/roles";

export type SessionUser = {
	id: string;
	email: string;
	role: Role;
};

function initials(email: string): string {
	const local = email.split("@")[0] ?? email;
	return local.charAt(0).toUpperCase();
}

export function NavUser({ user, role }: { user: SessionUser; role: Role }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className="size-8 cursor-pointer">
					<AvatarFallback>{initials(user.email)}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-60">
				<DropdownMenuItem className="flex items-center justify-start gap-2">
					<DropdownMenuLabel className="flex items-center gap-3">
						<Avatar className="size-10">
							<AvatarFallback>{initials(user.email)}</AvatarFallback>
						</Avatar>
						<div>
							<span className="font-medium text-foreground break-all">
								{user.email}
							</span>
							<br />
							<div className="mt-0.5 text-[10px] text-muted-foreground">
								{ROLE_LABELS[role]}
							</div>
						</div>
					</DropdownMenuLabel>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<UserIcon />
						Profile
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<BellIcon />
						Notifications
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CommandIcon />
						Keyboard shortcuts
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<LifeBuoyIcon />
						Help
					</DropdownMenuItem>
					<DropdownMenuItem>
						<BookOpenIcon />
						Guides
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<CreditCardIcon />
						Plan & billing
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<form action={logoutAction}>
						<DropdownMenuItem
							className="w-full cursor-pointer"
							variant="destructive"
							onSelect={(e) => {
								e.preventDefault();
								const el = e.currentTarget as Element | null;
								const form = el?.closest("form") as HTMLFormElement | null;
								form?.requestSubmit();
							}}
						>
							<LogOutIcon />
							Log out
						</DropdownMenuItem>
					</form>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
