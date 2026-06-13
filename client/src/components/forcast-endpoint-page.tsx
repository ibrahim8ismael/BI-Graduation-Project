"use client";

import { FormEvent, ReactNode, useMemo, useState } from "react";
import {
  ErrorBanner,
  Field,
  Input,
  LoadingButton,
  MLCard,
  ResultBadge,
} from "@/components/MLCard";
import { useMLEndpoint } from "@/hooks/useML";

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

const endpointMeta: Record<
  EndpointKind,
  { accent: "teal" | "lavender" | "peach"; label: string; badge: string }
> = {
  "forecast-revenue": {
    accent: "teal",
    label: "Forecast Revenue",
    badge: "POST /forecast/revenue",
  },
  "predict-category": {
    accent: "lavender",
    label: "Predict Category",
    badge: "POST /predict/category",
  },
  "segment-customer": {
    accent: "peach",
    label: "Segment Customer",
    badge: "POST /segment/customer",
  },
};

function toPayloadValue(value: string, inputType: EndpointField["inputType"]) {
  if (inputType !== "number") return value;
  if (value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? value : parsed;
}

function buildPayload(
  fields: EndpointField[],
  values: Record<string, string>,
  endpoint: EndpointKind,
) {
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

  return payload;
}

function renderValue(value: unknown): ReactNode {
  if (Array.isArray(value)) {
    return (
      <div className="space-y-1.5">
        {value.length === 0 ? (
          <span className="text-xs text-muted-soft">Empty array</span>
        ) : (
          value.map((item, i) => (
            <div
              key={i}
              className="rounded-lg border border-hairline bg-surface-soft/30 p-2.5"
            >
              {typeof item === "object" && item !== null ? (
                <div className="space-y-1">
                  {Object.entries(item as Record<string, unknown>).map(
                    ([k, v]) => (
                      <div key={k} className="flex justify-between gap-3 text-xs">
                        <span className="text-muted-soft shrink-0">{k}</span>
                        <span className="font-medium text-body-strong text-right">
                          {typeof v === "object" && v !== null
                            ? renderValue(v)
                            : String(v ?? "—")}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              ) : (
                <span className="text-xs text-body-strong">
                  {String(item)}
                </span>
              )}
            </div>
          ))
        )}
      </div>
    );
  }

  if (typeof value === "object" && value !== null) {
    return (
      <div className="space-y-1">
        {Object.entries(value as Record<string, unknown>).map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3 text-xs">
            <span className="text-muted-soft">{k}</span>
            <span className="font-medium text-body-strong text-right">
              {renderValue(v)}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <span className="text-sm font-semibold text-ink">
      {String(value)}
    </span>
  );
}

function ResponsePanel({
  data,
  loading,
}: {
  data: unknown;
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-hairline border-t-ink" />
          <p className="text-xs text-muted-soft">Running model...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-xs text-muted-soft">No response yet.</p>
      </div>
    );
  }

  const entries = Object.entries(data as Record<string, unknown>);

  return (
    <div className="space-y-2">
      {entries.map(([key, value]) => (
        <div
          key={key}
          className="rounded-lg border border-hairline bg-surface-soft/50 px-3 py-2"
        >
          <div className="mb-1.5 text-xs font-medium text-body-strong">
            {key.replace(/_/g, " ")}
          </div>
          {renderValue(value)}
        </div>
      ))}
    </div>
  );
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

  const meta = endpointMeta[endpoint];
  const { data, error, loading, execute } = useMLEndpoint(endpoint);

  const payload = useMemo(
    () => buildPayload(fields, values, endpoint),
    [fields, values, endpoint],
  );

  const payloadPreview = useMemo(
    () => JSON.stringify(payload, null, 2),
    [payload],
  );

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await execute(payload);
  };

  return (
    <section className="flex flex-1 flex-col gap-6 p-6">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight text-ink">
          {title}
        </h1>
        <p className="text-sm text-muted">{description}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Form panel */}
        <div className="space-y-4">
          <MLCard accent={meta.accent}>
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

                      if (
                        endpoint === "predict-category" &&
                        field.name === "value"
                      ) {
                        setAutoFillValue(v === "");
                      }

                      if (
                        endpoint === "predict-category" &&
                        autoFillValue &&
                        (field.name === "price" ||
                          field.name === "qty_ordered")
                      ) {
                        const price = Number(
                          (field.name === "price"
                            ? v
                            : values.price) ?? NaN,
                        );
                        const qty = Number(
                          (field.name === "qty_ordered"
                            ? v
                            : values.qty_ordered) ?? NaN,
                        );
                        if (
                          !Number.isNaN(price) &&
                          !Number.isNaN(qty)
                        ) {
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

              <LoadingButton
                type="submit"
                loading={loading}
                className="w-full"
              >
                Run Model
              </LoadingButton>
            </form>

            <ErrorBanner message={error} />
          </MLCard>

          <MLCard title="Request Payload" description="Payload sent to the API.">
            <pre className="overflow-x-auto rounded-lg border border-hairline bg-surface-soft/50 p-3 text-xs leading-relaxed text-body">
              {payloadPreview}
            </pre>
          </MLCard>

          <div className="flex items-center gap-2">
            <ResultBadge label={meta.badge} variant="outline" />
            <ResultBadge label={meta.label} />
          </div>
        </div>

        {/* Response panel */}
        <div className="space-y-4">
          <MLCard
            title="Response"
            description="Model output from the API."
            accent={meta.accent}
          >
            <ResponsePanel
              data={data}
              loading={loading}
            />
          </MLCard>
        </div>
      </div>
    </section>
  );
}
