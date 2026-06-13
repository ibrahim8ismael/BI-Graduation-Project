import { ForcastEndpointPage } from "@/components/forcast-endpoint-page";

export default function ForecastRevenuePage() {
  return (
    <ForcastEndpointPage
      endpoint="forecast-revenue"
      title="Forecast Revenue"
      description="Connected to POST /forcast/forecast-revenue"
      fields={[
        {
          name: "horizon_days",
          label: "Horizon (days)",
          inputType: "number",
          placeholder: "30",
        },
        {
          name: "recent_revenue",
          label: "Recent Revenue",
          inputType: "number",
          placeholder: "24500",
        },
        {
          name: "growth_rate",
          label: "Growth Rate",
          inputType: "number",
          placeholder: "0.12",
        },
      ]}
    />
  );
}
