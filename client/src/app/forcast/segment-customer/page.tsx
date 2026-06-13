import { ForcastEndpointPage } from "@/components/forcast-endpoint-page";

export default function SegmentCustomerPage() {
  return (
    <ForcastEndpointPage
      endpoint="segment-customer"
      title="Segment Customer"
      description="Connected to POST /forcast/segment-customer"
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
