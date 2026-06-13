"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  Button,
  ErrorBanner,
  Field,
  Input,
  MLCard,
  ResultBadge,
} from "@/components/MLCard";
import {
  useForecastRevenue,
  usePredictCategory,
  useSegmentCustomer,
} from "@/hooks/useML";

type EndpointKind =
  | "predict-category"
  | "segment-customer"
  | "forecast-revenue";

type EndpointField = {
  name: string;
  label: string;
  inputType: "text" | "number";
  placeholder?: string;
};

type EndpointPageProps = {
  endpoint: EndpointKind;
  title: string;
  description: string;
  fields: EndpointField[];
};

const endpointLabel: Record<EndpointKind, string> = {
  "predict-category": "Predict Category",
  "segment-customer": "Segment Customer",
  "forecast-revenue": "Forecast Revenue",
};

function toPayloadValue(value: string, inputType: EndpointField["inputType"]) {
  if (inputType !== "number") {
    return value;
  }

  if (value.trim() === "") {
    return null;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? value : parsed;
}

export function ForcastEndpointPage({
  endpoint,
  title,
  description,
  fields,
}: EndpointPageProps) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    fields.reduce(
      (acc, field) => {
        acc[field.name] = "";
        return acc;
      },
      {} as Record<string, string>,
    ),
  );
  const [autoFillValue, setAutoFillValue] = useState(true);

  const hook =
    endpoint === "predict-category"
      ? usePredictCategory
      : endpoint === "segment-customer"
        ? useSegmentCustomer
        : useForecastRevenue;

  const { data, error, loading, execute } = hook();

  const payloadPreview = useMemo(() => {
    const payload = fields.reduce(
      (acc, field) => {
        acc[field.name] = toPayloadValue(
          values[field.name] ?? "",
          field.inputType,
        );
        return acc;
      },
      {} as Record<string, string | number | null>,
    );

    // Auto-calc value for predict-category when not provided
    if (endpoint === "predict-category") {
      const maybePrice = Number(payload["price"] ?? NaN);
      const maybeQty = Number(payload["qty_ordered"] ?? NaN);
      if (
        (payload["value"] == null || payload["value"] === "") &&
        !Number.isNaN(maybePrice) &&
        !Number.isNaN(maybeQty)
      ) {
        payload["value"] = maybePrice * maybeQty;
      }
    }

    return JSON.stringify(payload, null, 2);
  }, [fields, values]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = fields.reduce(
      (acc, field) => {
        acc[field.name] = toPayloadValue(
          values[field.name] ?? "",
          field.inputType,
        );
        return acc;
      },
      {} as Record<string, string | number | null>,
    );

    // Auto-calc value for predict-category when not provided
    if (endpoint === "predict-category") {
      const maybePrice = Number(payload["price"] ?? NaN);
      const maybeQty = Number(payload["qty_ordered"] ?? NaN);
      if (
        (payload["value"] == null || payload["value"] === "") &&
        !Number.isNaN(maybePrice) &&
        !Number.isNaN(maybeQty)
      ) {
        payload["value"] = maybePrice * maybeQty;
      }
    }

    await execute(payload);
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8">
      <MLCard
        title={title}
        description={description}
        footer={
          <div className="flex w-full items-center justify-between gap-3">
            <ResultBadge label={`Endpoint: /forcast/${endpoint}`} />
            <ResultBadge label={endpointLabel[endpoint]} />
          </div>
        }
      >
        <form className="space-y-4" onSubmit={onSubmit}>
          {fields.map((field) => (
            <Field key={field.name} htmlFor={field.name} label={field.label}>
              <Input
                id={field.name}
                type={field.inputType}
                value={values[field.name] ?? ""}
                placeholder={field.placeholder}
                onChange={(event) => {
                  const v = event.target.value;
                  setValues((prev) => ({ ...prev, [field.name]: v }));

                  // If user edits the value input directly, disable auto-fill.
                  if (
                    endpoint === "predict-category" &&
                    field.name === "value"
                  ) {
                    setAutoFillValue(v === "");
                  }

                  // Auto-fill `value` when price or qty change, if autoFillValue is enabled.
                  if (
                    endpoint === "predict-category" &&
                    autoFillValue &&
                    (field.name === "price" || field.name === "qty_ordered")
                  ) {
                    const price = Number(
                      (field.name === "price" ? v : values.price) ?? NaN,
                    );
                    const qty = Number(
                      (field.name === "qty_ordered" ? v : values.qty_ordered) ??
                        NaN,
                    );
                    if (!Number.isNaN(price) && !Number.isNaN(qty)) {
                      setValues((prev) => ({
                        ...prev,
                        value: String(price * qty),
                      }));
                    }
                  }
                }}
              />
            </Field>
          ))}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Sending..." : "Run Model"}
          </Button>
        </form>

        <ErrorBanner message={error} />
      </MLCard>

      <MLCard
        title="Request Payload"
        description="Payload that will be sent to your FastAPI endpoint."
      >
        <pre className="overflow-x-auto rounded-md border bg-muted/30 p-4 text-xs">
          {payloadPreview}
        </pre>
      </MLCard>

      <MLCard title="Response" description="Latest response from FastAPI.">
        <pre className="overflow-x-auto rounded-md border bg-muted/30 p-4 text-xs">
          {data ? JSON.stringify(data, null, 2) : "No response yet."}
        </pre>
      </MLCard>
    </div>
  );
}
