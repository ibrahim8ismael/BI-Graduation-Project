import { requireRole } from "@/lib/auth/dal";
import { PowerBiReport } from "@/components/powerbi-report-wrapper";

export default async function MarketerDashboardPage() {
	const user = await requireRole(["marketer"]);
	return (
		<section className="flex flex-1 flex-col gap-4">
			<div>
				<h1 className="text-2xl font-semibold tracking-tight">
					Welcome, {user.email}
				</h1>
			</div>

			<div className="h-[80vh] w-full overflow-hidden rounded-xl">
				<PowerBiReport
					accessToken={process.env.POWERBI_ACCESS_TOKEN!}
					embedUrl="https://app.powerbi.com/reportEmbed?reportId=8b62fd18-eed8-49b9-8f13-b40c9318db58"
					reportId="8b62fd18-eed8-49b9-8f13-b40c9318db58"
					pageName="b4b6da05ac5a2816e956"
				/>
			</div>
		</section>
	);
}
