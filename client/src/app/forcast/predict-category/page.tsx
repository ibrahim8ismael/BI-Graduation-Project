import { ForcastEndpointPage } from "@/components/forcast-endpoint-page";

export default function PredictCategoryPage() {
  return (
    <ForcastEndpointPage
      endpoint="predict-category"
      title="Predict Category"
      description="Connected to POST /forcast/predict-category"
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
