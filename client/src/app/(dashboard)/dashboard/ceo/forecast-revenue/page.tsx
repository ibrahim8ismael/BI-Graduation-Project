import { requireRole } from "@/lib/auth/dal";
import { ForcastEndpointPage } from "@/components/forcast-endpoint-page";

export default async function CeoForecastRevenuePage() {
	await requireRole(["ceo"]);
	return (
		<ForcastEndpointPage
			endpoint="forecast-revenue"
			title="Forecast Revenue"
			description="Project future revenue based on historical data and growth trends."
			fields={[
				{
					name: "periods",
					label: "Forecast Periods",
					inputType: "number",
					placeholder: "6",
				},
			]}
		/>
	);
}
