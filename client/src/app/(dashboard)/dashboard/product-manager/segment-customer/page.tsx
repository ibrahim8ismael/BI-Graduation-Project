import { requireRole } from "@/lib/auth/dal";
import { ForcastEndpointPage } from "@/components/forcast-endpoint-page";

export default async function PmSegmentCustomerPage() {
	await requireRole(["product_manager"]);
	return (
		<ForcastEndpointPage
			endpoint="segment-customer"
			title="Segment Customer"
			description="Analyze customer segments using recency, frequency, and monetary value."
			fields={[
				{
					name: "recency",
					label: "Recency",
					inputType: "number",
					placeholder: "14",
				},
				{
					name: "frequency",
					label: "Frequency",
					inputType: "number",
					placeholder: "9",
				},
				{
					name: "monetary",
					label: "Monetary Value",
					inputType: "number",
					placeholder: "780.5",
				},
			]}
		/>
	);
}
