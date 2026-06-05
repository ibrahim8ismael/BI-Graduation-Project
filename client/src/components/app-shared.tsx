import type { ReactNode } from "react";
import {
	LayoutGridIcon,
	BarChart3Icon,
	ShoppingCartIcon,
	FileTextIcon,
	UsersIcon,
	MegaphoneIcon,
	TrendingUpIcon,
	PackageIcon,
	TargetIcon,
	SparklesIcon,
} from "lucide-react";
import type { Role } from "@/lib/auth/roles";

export type SidebarNavItem = {
	title: string;
	path?: string;
	icon?: ReactNode;
	isActive?: boolean;
	subItems?: SidebarNavItem[];
};

export type SidebarNavGroup = {
	label: string;
	items: SidebarNavItem[];
};

function dashboardPath(): string {
	return "/dashboard";
}

function ceoGroups(): SidebarNavGroup[] {
	const dashPath = dashboardPath();
	return [
		{
			label: "Overview",
			items: [
				{
					title: "Financial overview",
					path: `${dashPath}/ceo`,
					icon: <LayoutGridIcon />,
				},
				{
					title: "Performance",
					path: `${dashPath}/ceo#performance`,
					icon: <TrendingUpIcon />,
				},
			],
		},
		{
			label: "Campaigns",
			items: [
				{
					title: "Campaign analytics",
					path: `${dashPath}/ceo#campaigns`,
					icon: <MegaphoneIcon />,
				},
			],
		},
		{
			label: "Store",
			items: [
				{
					title: "Orders",
					path: `${dashPath}/ceo#orders`,
					icon: <ShoppingCartIcon />,
				},
				{
					title: "Products",
					path: `${dashPath}/ceo#products`,
					icon: <FileTextIcon />,
				},
			],
		},
	];
}

function productManagerGroups(): SidebarNavGroup[] {
	const dashPath = dashboardPath();
	return [
		{
			label: "Products",
			items: [
				{
					title: "Product performance",
					path: `${dashPath}/product-manager`,
					icon: <PackageIcon />,
				},
				{
					title: "Catalog",
					path: `${dashPath}/product-manager#catalog`,
					icon: <FileTextIcon />,
				},
			],
		},
		{
			label: "Trends",
			items: [
				{
					title: "Sales trends",
					path: `${dashPath}/product-manager#trends`,
					icon: <BarChart3Icon />,
				},
				{
					title: "Forecasts",
					path: `${dashPath}/product-manager#forecasts`,
					icon: <SparklesIcon />,
				},
			],
		},
		{
			label: "Customers",
			items: [
				{
					title: "Customer segments",
					path: `${dashPath}/product-manager#segments`,
					icon: <UsersIcon />,
				},
			],
		},
	];
}

function marketerGroups(): SidebarNavGroup[] {
	const dashPath = dashboardPath();
	return [
		{
			label: "Campaigns",
			items: [
				{
					title: "All campaigns",
					path: `${dashPath}/marketer`,
					icon: <MegaphoneIcon />,
				},
				{
					title: "New campaign",
					path: `${dashPath}/marketer#new`,
					icon: <TargetIcon />,
				},
			],
		},
		{
			label: "Analytics",
			items: [
				{
					title: "Campaign ROI",
					path: `${dashPath}/marketer#roi`,
					icon: <BarChart3Icon />,
				},
				{
					title: "Customer insights",
					path: `${dashPath}/marketer#customers`,
					icon: <UsersIcon />,
				},
			],
		},
		{
			label: "Performance",
			items: [
				{
					title: "Channel mix",
					path: `${dashPath}/marketer#channels`,
					icon: <LayoutGridIcon />,
				},
			],
		},
	];
}

export function getNavGroups(role: Role): SidebarNavGroup[] {
	switch (role) {
		case "ceo":
			return ceoGroups();
		case "product_manager":
			return productManagerGroups();
		case "marketer":
			return marketerGroups();
	}
}

export function getNavLinks(role: Role): SidebarNavItem[] {
	const groups = getNavGroups(role);
	return groups.flatMap((group) =>
		group.items.flatMap((item) =>
			item.subItems?.length ? [item, ...item.subItems] : [item]
		)
	);
}

export const ROLE_LABELS_DISPLAY: Record<Role, string> = {
	ceo: "CEO",
	product_manager: "Product Manager",
	marketer: "Marketer",
};
