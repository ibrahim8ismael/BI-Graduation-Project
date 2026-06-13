const DEFAULT_FASTAPI_BASE_URL = "http://127.0.0.1:8000";

export const FASTAPI_BASE_URL =
  process.env.NEXT_PUBLIC_FASTAPI_BASE_URL ||
  process.env.NEXT_PUBLIC_FASTAPI_URL ||
  DEFAULT_FASTAPI_BASE_URL;

function normalizeBaseUrl(baseUrl) {
  return baseUrl.replace(/\/+$/, "");
}

function buildUrl(pathname) {
  const safePathname = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${normalizeBaseUrl(FASTAPI_BASE_URL)}${safePathname}`;
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text ? { message: text } : null;
}

async function postJson(pathname, payload) {
  // route requests through local proxy to avoid CORS issues
  const proxyPath = `/api/proxy${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
  const response = await fetch(proxyPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    const message =
      (data && typeof data === "object" && (data.detail || data.message)) ||
      `Request failed with status ${response.status}`;

    throw new Error(String(message));
  }

  return data;
}

const API_PATHS = {
  "predict-category": "/predict/category",
  "segment-customer": "/segment/customer",
  "forecast-revenue": "/forecast/revenue",
};

export function requestForecastEndpoint(endpoint, payload) {
  const apiPath = API_PATHS[endpoint] || `/forcast/${endpoint}`;
  return postJson(apiPath, payload);
}

export function predictCategory(payload) {
  return requestForecastEndpoint("predict-category", payload);
}

export function segmentCustomer(payload) {
  return requestForecastEndpoint("segment-customer", payload);
}

export function forecastRevenue(payload) {
  return requestForecastEndpoint("forecast-revenue", payload);
}
