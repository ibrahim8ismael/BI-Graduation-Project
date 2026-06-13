import type { ReactNode } from "react";
import {
	LayoutGridIcon,
	UsersIcon,
	MegaphoneIcon,
	PackageIcon,
	SparklesIcon,
	LineChartIcon,
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
					title: "Forecast revenue",
					path: `${dashPath}/ceo/forecast-revenue`,
					icon: <LineChartIcon />,
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
					title: "Predict category",
					path: `${dashPath}/product-manager/predict-category`,
					icon: <SparklesIcon />,
				},
				{
					title: "Segment customer",
					path: `${dashPath}/product-manager/segment-customer`,
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
