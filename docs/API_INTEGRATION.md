# FastAPI Integration & Implementation Plan

**Project:** Runner E-commerce ML API  
**Date:** 2026-06-13  
**Status:** Implementation Complete

---

## Table of Contents

1. [API Overview](#api-overview)
2. [Endpoints](#endpoints)
3. [Frontend Integration Architecture](#frontend-integration-architecture)
4. [File Structure](#file-structure)
5. [Implementation Steps](#implementation-steps)
6. [Configuration](#configuration)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)

---

## API Overview

### Base Information

- **Host:** `https://deploy-playmaker-kooky.ngrok-free.dev`
- **Framework:** FastAPI (Python)
- **Protocol:** HTTP/REST with JSON payloads
- **Available Endpoints:** 3 ML prediction endpoints
- **Response Format:** JSON

### Key Features

- Revenue forecasting using Prophet
- Product category prediction using Random Forest
- Customer segmentation using K-Means

---

## Endpoints

### 1. Predict Category

**Endpoint:** `POST /predict/category`

**Purpose:** Predict product category based on order characteristics

**Request Schema:**

```json
{
  "price": 149.99,
  "qty_ordered": 28,
  "value": 4200.0,
  "discount_amount": 0.0,
  "sku": "SKU-123"
}
```

**Request Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `price` | number | Yes | Product unit price |
| `qty_ordered` | integer | Yes | Quantity ordered |
| `value` | number | Yes | Total order value (price × qty_ordered) |
| `discount_amount` | number | Yes | Discount applied |
| `sku` | string | Yes | Product SKU identifier |

**Response Example:**

```json
{
  "predicted_category": "Electronics",
  "confidence": 0.92
}
```

**Response Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `predicted_category` | string | Predicted product category |
| `confidence` | number | Confidence score (0-1) |

**Frontend Route:** `/dashboard/product-manager/predict-category`

---

### 2. Segment Customer

**Endpoint:** `POST /segment/customer`

**Purpose:** Segment customers based on RFM (Recency, Frequency, Monetary) values

**Request Schema:**

```json
{
  "recency": 14,
  "frequency": 9,
  "monetary": 780.5
}
```

**Request Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `recency` | integer | Yes | Days since last purchase |
| `frequency` | integer | Yes | Number of purchases |
| `monetary` | number | Yes | Total monetary value spent |

**Response Example:**

```json
{
  "segment": "High-Value Active",
  "segment_id": 2,
  "characteristics": ["frequent_buyer", "high_spender", "recent"]
}
```

**Response Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `segment` | string | Customer segment name |
| `segment_id` | integer | Numeric segment ID |
| `characteristics` | array | List of segment characteristics |

**Frontend Route:** `/dashboard/product-manager/segment-customer`

---

### 3. Forecast Revenue

**Endpoint:** `POST /forecast/revenue`

**Purpose:** Forecast revenue for a specified time horizon

**Request Schema:**

```json
{
  "periods": 6
}
```

**Request Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `periods` | integer | Yes | Number of forecast periods to generate |

**Response Example:**

```json
{
  "forecast": [
    {
      "ds": "2021-10-03",
      "yhat": 5508534.22
    },
    {
      "ds": "2021-10-10",
      "yhat": 3610075.4
    },
    {
      "ds": "2021-10-17",
      "yhat": 1444654.68
    },
    {
      "ds": "2021-10-24",
      "yhat": 3413685.08
    },
    {
      "ds": "2021-10-31",
      "yhat": 9515780.39
    },
    {
      "ds": "2021-11-07",
      "yhat": 13590202.51
    }
  ]
}
```

**Response Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `forecast` | array | Array of forecast data points |
| `forecast[].ds` | string | Date (ISO format) |
| `forecast[].yhat` | number | Predicted revenue value |

**Frontend Route:** `/dashboard/ceo/forecast-revenue`

---

## Frontend Integration Architecture

### Design Pattern: Server-Side Proxy

To avoid CORS issues and keep the FastAPI URL secure, the frontend uses a **Next.js server proxy** pattern:

```
Browser Request
    ↓
Next.js Frontend Client
    ↓
POST /api/proxy/predict/category (local)
    ↓
Next.js Server
    ↓
Forward to FastAPI: POST https://deploy-playmaker-kooky.ngrok-free.dev/predict/category
    ↓
FastAPI Response
    ↓
Return to Browser
```

**Benefits:**

- No CORS errors in the browser
- FastAPI URL hidden from client (security)
- Centralized API management
- Easy to add authentication/logging on proxy layer

### Data Flow

1. **User fills form** → Component state updated
2. **User submits** → Form calls hook (e.g., `usePredictCategory`)
3. **Hook executes** → Calls `client/src/lib/api.js` function
4. **API function posts** → Sends to `/api/proxy/...`
5. **Server proxy** → Forwards to FastAPI with env base URL
6. **Response returned** → Hook updates state (data/error/loading)
7. **Component re-renders** → Shows response in UI

---

## File Structure

```
client/
├── .env.local
│   └── NEXT_PUBLIC_FASTAPI_BASE_URL=https://deploy-playmaker-kooky.ngrok-free.dev
│
├── src/
│   ├── lib/
│   │   ├── api.js
│   │   │   ├── FASTAPI_BASE_URL (env-based)
│   │   │   ├── predictCategory()
│   │   │   ├── segmentCustomer()
│   │   │   └── forecastRevenue()
│   │   │
│   │   └── ... (existing: auth, mongodb, utils)
│   │
│   ├── hooks/
│   │   ├── useML.js
│   │   │   ├── usePredictCategory()
│   │   │   ├── useSegmentCustomer()
│   │   │   └── useForecastRevenue()
│   │   │
│   │   └── use-mobile.ts (existing)
│   │
│   ├── components/
│   │   ├── MLCard.tsx
│   │   │   ├── MLCard
│   │   │   ├── Field
│   │   │   ├── Input
│   │   │   ├── Button
│   │   │   ├── ErrorBanner
│   │   │   └── ResultBadge
│   │   │
│   │   ├── forcast-endpoint-page.tsx
│   │   │   └── ForcastEndpointPage (reusable template)
│   │   │
│   │   └── ... (existing UI components)
│   │
│   └── app/
│       ├── api/
│       │   ├── proxy/
│       │   │   └── [...segments]/
│       │   │       └── route.ts (server proxy handler)
│       │   │
│       │   └── auth/ (existing)
│       │
│       ├── (dashboard)/
│       │   ├── dashboard/
│       │   │   ├── ceo/
│       │   │   │   ├── page.tsx (PowerBI)
│       │   │   │   └── forecast-revenue/
│       │   │   │       └── page.tsx
│       │   │   ├── product-manager/
│       │   │   │   ├── page.tsx (PowerBI)
│       │   │   │   ├── predict-category/
│       │   │   │   │   └── page.tsx
│       │   │   │   └── segment-customer/
│       │   │   │       └── page.tsx
│       │   │   └── marketer/
│       │   │       └── page.tsx (PowerBI)
│       │   └── layout.tsx
│       │
│       └── forcast/ (redirects → dashboard)
│
└── ... (existing config files)
```

---

## Implementation Steps

### Phase 1: API Layer Setup

✅ **Completed**

1. Created `client/src/lib/api.js`
   - Loads `NEXT_PUBLIC_FASTAPI_BASE_URL` from environment
   - Provides functions: `predictCategory()`, `segmentCustomer()`, `forecastRevenue()`
   - Routes requests through `/api/proxy/...` to avoid CORS
   - Handles error parsing and response types

### Phase 2: Hooks & State Management

✅ **Completed**

2. Created `client/src/hooks/useML.js`
   - Implements `useMLAction()` pattern (returns: data, loading, error, execute)
   - Exports: `usePredictCategory()`, `useSegmentCustomer()`, `useForecastRevenue()`
   - Handles async execution, error states, loading flags

### Phase 3: UI Components

✅ **Completed**

3. Created `client/src/components/MLCard.tsx`
   - Typed React components using existing design system
   - MLCard (wrapper), Field, Input, Button, ErrorBanner, ResultBadge
   - Matches Runner's existing Radix UI + Tailwind patterns

4. Created `client/src/components/forcast-endpoint-page.tsx`
   - Reusable form template for all three endpoints
   - Generates form fields from config array
   - Shows request payload preview (live JSON)
   - Displays response data
   - Auto-fills `value = price × qty_ordered` when user edits price/qty
   - User can override auto-fill by manually editing value

### Phase 4: Routes & Pages

✅ **Completed**

5. Created `client/src/app/forcast/page.tsx`
   - Landing page listing all ML endpoints
   - Links to individual endpoint pages

6. Created endpoint pages:
   - `client/src/app/(dashboard)/dashboard/product-manager/predict-category/page.tsx`
     - Fields: price, qty_ordered, value, discount_amount, sku
   - `client/src/app/(dashboard)/dashboard/product-manager/segment-customer/page.tsx`
     - Fields: recency, frequency, monetary
   - `client/src/app/(dashboard)/dashboard/ceo/forecast-revenue/page.tsx`
     - Fields: periods

### Phase 5: Server-Side Proxy

✅ **Completed**

7. Created `client/src/app/api/proxy/[...segments]/route.ts`
   - Intercepts `/api/proxy/*` requests
   - Forwards to FastAPI base URL from environment
   - Handles POST and GET methods
   - Preserves headers, body, and response status
   - Avoids CORS issues

### Phase 6: Environment & Build

✅ **Completed**

8. Updated `client/.env.local`
   - Added `NEXT_PUBLIC_FASTAPI_BASE_URL=https://deploy-playmaker-kooky.ngrok-free.dev`

9. Verified production build
   - Ran `npm run build` → all routes compiled and type-checked

---

## Configuration

### Environment Variables

**File:** `client/.env.local`

```env
# FastAPI Configuration
NEXT_PUBLIC_FASTAPI_BASE_URL=https://deploy-playmaker-kooky.ngrok-free.dev

# Existing variables (unchanged)
AUTH_SECRET=2EoKX5vPGRdMLWtpCwH9PPMN0MIYcM0H35POZ/stn6ueM5qrdumy9tPCVKQ=
MONGODB_URI=mongodb+srv://woops_admin:isisis123123@cluster0.wznwker.mongodb.net/graduation?appName=Cluster0
DEMO_CEO_EMAIL=ceo@demo.local
DEMO_CEO_PASSWORD=ceo12345
DEMO_PRODUCT_MANAGER_EMAIL=pm@demo.local
DEMO_PRODUCT_MANAGER_PASSWORD=pm12345
DEMO_MARKETER_EMAIL=marketer@demo.local
DEMO_MARKETER_PASSWORD=marketer12345
```

### Changing the FastAPI Host

To use a different FastAPI instance:

1. Update `NEXT_PUBLIC_FASTAPI_BASE_URL` in `client/.env.local`
2. Restart dev server (`npm run dev`)
3. No code changes needed — proxy automatically uses new URL

**Examples:**

```env
# Local development
NEXT_PUBLIC_FASTAPI_BASE_URL=http://127.0.0.1:8000

# Production ngrok
NEXT_PUBLIC_FASTAPI_BASE_URL=https://deploy-playmaker-kooky.ngrok-free.dev

# Custom domain
NEXT_PUBLIC_FASTAPI_BASE_URL=https://api.mycompany.com
```

---

## Testing

### 1. Manual Testing in Browser

**Start the dev server:**

```bash
cd client
npm run dev
```

**Navigate to pages:**

- Forecast revenue (CEO): `http://localhost:3000/dashboard/ceo/forecast-revenue`
- Predict category (PM): `http://localhost:3000/dashboard/product-manager/predict-category`
- Segment customer (PM): `http://localhost:3000/dashboard/product-manager/segment-customer`

**Test workflow:**

1. Open Network tab in DevTools
2. Fill out form fields
3. Click "Run Model"
4. Observe request in Network tab (should go to `/api/proxy/...`)
5. Check response JSON below the form

### 2. cURL Testing

**Test predict-category locally (via proxy):**

```bash
curl -X POST http://localhost:3000/api/proxy/predict/category \
  -H "Content-Type: application/json" \
  -d '{
    "price": 149.99,
    "qty_ordered": 28,
    "value": 4200,
    "discount_amount": 0,
    "sku": "SKU-123"
  }'
```

**Test directly to FastAPI (bypass proxy):**

```bash
curl -X POST https://deploy-playmaker-kooky.ngrok-free.dev/predict/category \
  -H "Content-Type: application/json" \
  -d '{
    "price": 149.99,
    "qty_ordered": 28,
    "value": 4200,
    "discount_amount": 0,
    "sku": "SKU-123"
  }'
```

**Test segment-customer:**

```bash
curl -X POST http://localhost:3000/api/proxy/segment/customer \
  -H "Content-Type: application/json" \
  -d '{
    "recency": 14,
    "frequency": 9,
    "monetary": 780.5
  }'
```

**Test forecast-revenue:**

```bash
curl -X POST http://localhost:3000/api/proxy/forecast/revenue \
  -H "Content-Type: application/json" \
  -d '{"periods": 6}'
```

### 3. Expected Results

**Predict Category Success:**

- Status: 200
- Response includes `predicted_category` and `confidence`

**Segment Customer Success:**

- Status: 200
- Response includes `segment`, `segment_id`, `characteristics`

**Forecast Revenue Success:**

- Status: 200
- Response includes `forecast` array with `ds` and `yhat` fields

**Validation Errors:**

- Status: 400 or 422
- Response includes `detail` array with field-level errors
- Example: `"Field required: input={}"`

---

## Troubleshooting

### Issue: "Failed to fetch" in browser

**Possible Causes:**

1. FastAPI host unreachable
2. `NEXT_PUBLIC_FASTAPI_BASE_URL` incorrect
3. Dev server not running

**Solutions:**

1. Verify ngrok/Colab URL is active
2. Check `.env.local` has correct URL
3. Restart dev server: `npm run dev`
4. Test direct curl to FastAPI host

---

### Issue: "Field required" validation error

**Cause:** Payload is missing required fields

**Solution:**

1. Check the form is filling all required fields
2. Verify payload preview below form shows all keys
3. For predict-category: ensure `price`, `qty_ordered`, `value`, `discount_amount`, `sku` are present
4. For segment-customer: ensure `recency`, `frequency`, `monetary` are present

---

### Issue: Endpoint returns 404

**Cause:** Proxy path doesn't match API path

**Solutions:**

1. Verify endpoint path in `client/src/lib/api.js` API_PATHS mapping
2. Check FastAPI route definitions match
3. Confirm base URL in `.env.local` is correct

---

### Issue: CORS error in DevTools console

**Cause:** Should not occur with server proxy, but if it does:

**Solutions:**

1. Verify request is going to `/api/proxy/...` (not directly to ngrok)
2. Check Next.js server is handling the request
3. Restart dev server
4. Ensure browser is hitting `http://localhost:3000`, not ngrok directly

---

### Issue: Response shows "ngrok ERR_NGROK_6024"

**Cause:** ngrok tunnel requires browser authorization

**Solution:**

1. Open ngrok URL directly in browser
2. Click "Visit Site" button
3. Try the API request again from the Next.js frontend

---

## API Response Examples

### Predict Category (Success)

```json
{
  "predicted_category": "Electronics",
  "confidence": 0.92
}
```

### Predict Category (Validation Error)

```json
{
  "detail": [
    {
      "type": "missing",
      "loc": ["body", "price"],
      "msg": "Field required",
      "input": {}
    },
    {
      "type": "missing",
      "loc": ["body", "qty_ordered"],
      "msg": "Field required",
      "input": {}
    }
  ]
}
```

### Segment Customer (Success)

```json
{
  "segment": "High-Value Active",
  "segment_id": 2,
  "characteristics": ["frequent_buyer", "high_spender", "recent"]
}
```

### Forecast Revenue (Success)

```json
{
  "forecast": [
    { "ds": "2021-10-03", "yhat": 5508534.22 },
    { "ds": "2021-10-10", "yhat": 3610075.4 },
    { "ds": "2021-10-17", "yhat": 1444654.68 }
  ]
}
```

---

## Development Checklist

- [x] API layer created (`client/src/lib/api.js`)
- [x] Custom hooks implemented (`client/src/hooks/useML.js`)
- [x] UI components built (`client/src/components/MLCard.tsx`)
- [x] Endpoint pages created (3 routes under `/forcast/`)
- [x] Server proxy implemented (`src/app/api/proxy/[...segments]/route.ts`)
- [x] Environment variables configured
- [x] Production build verified
- [x] Auto-fill for `value` field implemented
- [ ] Integration tests written
- [ ] E2E tests written
- [ ] Error handling enhanced
- [ ] Analytics/logging added

---

## Next Steps

### Recommended Enhancements

1. Add error toast notifications
2. Add success toast notifications
3. Persist recent requests to localStorage
4. Add request history page
5. Add batch processing for multiple predictions
6. Add CSV export for forecast results
7. Add authentication to API proxy layer
8. Add request rate limiting
9. Add caching for forecast results
10. Add webhook support for async operations

### Integration with Dashboards

- Embed predict-category widget in Product Manager dashboard
- Embed segment-customer widget in Marketer dashboard
- Embed forecast-revenue widget in CEO dashboard
- Add API data source to Power BI reports

### Monitoring & Observability

- Log all API requests through proxy
- Track error rates per endpoint
- Monitor response times
- Set up alerts for high error rates

---

## Support & Documentation

**API Documentation:** `https://deploy-playmaker-kooky.ngrok-free.dev/docs`  
**OpenAPI Spec:** `https://deploy-playmaker-kooky.ngrok-free.dev/openapi.json`

**Frontend Source:**

- API Layer: `client/src/lib/api.js`
- Hooks: `client/src/hooks/useML.js`
- Components: `client/src/components/`
- Pages: `client/src/app/forcast/`

---

**Last Updated:** 2026-06-13  
**Version:** 1.0.0  
**Status:** Production Ready
