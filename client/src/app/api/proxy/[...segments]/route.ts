import { NextResponse, type NextRequest } from "next/server";

const FASTAPI_BASE =
  process.env.NEXT_PUBLIC_FASTAPI_BASE_URL || "http://127.0.0.1:8000";

function normalizeBase(url: string) {
  return url.replace(/\/+$/, "");
}

export async function POST(request: NextRequest, context: any) {
  const params = await (context?.params ?? {});
  const path = Array.isArray(params.segments)
    ? `/${params.segments.join("/")}`
    : "/";

  const upstream = `${normalizeBase(FASTAPI_BASE)}${path}`;

  const body = await request.text();

  const headers: Record<string, string> = {};
  request.headers.forEach((v, k) => {
    // skip host-related headers
    if (k.toLowerCase() === "host") return;
    headers[k] = v;
  });

  // ensure JSON content-type if body looks like JSON
  if (body && !headers["content-type"]) {
    headers["content-type"] = "application/json";
  }

  const res = await fetch(upstream, {
    method: "POST",
    headers,
    body: body || undefined,
  });

  const respHeaders = new Headers(res.headers);

  // Return body as-is and forward status
  const text = await res.text();

  // Use NextResponse to preserve control
  const out = new NextResponse(text, {
    status: res.status,
    headers: respHeaders,
  });

  return out;
}

export async function GET(request: NextRequest, context: any) {
  const params = await (context?.params ?? {});
  const path = Array.isArray(params.segments)
    ? `/${params.segments.join("/")}`
    : "/";
  const upstream = `${normalizeBase(FASTAPI_BASE)}${path}`;

  const res = await fetch(upstream, { method: "GET" });

  const text = await res.text();
  return new NextResponse(text, { status: res.status, headers: res.headers });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
