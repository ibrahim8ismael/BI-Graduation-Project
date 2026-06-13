import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const endpoints = [
  {
    href: "/forcast/predict-category",
    title: "Predict Category",
    description: "Send feature values and get a predicted category.",
  },
  {
    href: "/forcast/segment-customer",
    title: "Segment Customer",
    description: "Send RFM-like values and get customer segment output.",
  },
  {
    href: "/forcast/forecast-revenue",
    title: "Forecast Revenue",
    description: "Send forecast inputs and get projected revenue.",
  },
] as const;

export default function ForcastIndexPage() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">ML Endpoints</h1>
        <p className="text-sm text-muted-foreground">
          Configure NEXT_PUBLIC_FASTAPI_BASE_URL in .env.local, then use one of
          the endpoints below.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {endpoints.map((endpoint) => (
          <Link key={endpoint.href} href={endpoint.href}>
            <Card className="h-full transition-colors hover:border-primary/50">
              <CardHeader>
                <CardTitle className="text-base">{endpoint.title}</CardTitle>
                <CardDescription>{endpoint.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{endpoint.href}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
