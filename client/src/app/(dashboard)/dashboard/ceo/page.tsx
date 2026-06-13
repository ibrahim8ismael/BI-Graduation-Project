import { requireRole } from "@/lib/auth/dal";
import { LogoutButton } from "@/components/logout-button";
import { PowerBiReport } from "@/components/powerbi-report-wrapper";

export default async function CeoDashboardPage() {
	const user = await requireRole(["ceo"]);
	return (
		<section className="flex flex-1 flex-col gap-4">
			<div className="flex items-start justify-between gap-4">
				<div>
					<h1 className="text-2xl font-semibold tracking-tight">
						Welcome, {user.email}
					</h1>
				</div>
				<LogoutButton />
			</div>

			<div className="h-[80vh] w-full overflow-hidden rounded-xl">
				<PowerBiReport
					accessToken={process.env.POWERBI_ACCESS_TOKEN!}
					embedUrl="https://app.powerbi.com/reportEmbed?reportId=8b62fd18-eed8-49b9-8f13-b40c9318db58"
					reportId="8b62fd18-eed8-49b9-8f13-b40c9318db58"
					pageName="ReportSection57b98b54828632d8dab3"
				/>
			</div>
		</section>
	);
}
