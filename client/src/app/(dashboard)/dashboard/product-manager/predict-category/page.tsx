import { requireRole } from "@/lib/auth/dal";
import { ForcastEndpointPage } from "@/components/forcast-endpoint-page";

export default async function PmPredictCategoryPage() {
	await requireRole(["product_manager"]);
	return (
		<ForcastEndpointPage
			endpoint="predict-category"
			title="Predict Category"
			description="Classify products based on pricing, volume, and discount patterns."
			fields={[
				{
					name: "price",
					label: "Price",
					inputType: "number",
					placeholder: "149.99",
				},
				{
					name: "qty_ordered",
					label: "Quantity Ordered",
					inputType: "number",
					placeholder: "28",
				},
				{
					name: "value",
					label: "Value",
					inputType: "number",
					placeholder: "4200",
				},
				{
					name: "discount_amount",
					label: "Discount Amount",
					inputType: "number",
					placeholder: "0",
				},
				{
					name: "sku",
					label: "SKU",
					inputType: "text",
					placeholder: "SKU-123",
				},
			]}
		/>
	);
}
