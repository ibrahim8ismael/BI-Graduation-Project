# Frontend File Structure — Role-Based Auth Plan

## What already exists

**Backend (FastAPI)** is mostly ready:
- `POST /api/v1/auth/login` (OAuth2 form: `username` + `password`) → returns `{ access_token, refresh_token, user: { id, email, role } }`
- `POST /api/v1/auth/register` → creates user with role
- `GET /api/v1/auth/me` → returns current user (Bearer token)
- Roles: `"ceo" | "product_manager" | "marketer"` (Literal in `models/user.py`)
- JWT access (30 min) + refresh (7 days), signed HS256

**Backend gaps**:
- No `/auth/refresh` route (token exists but no endpoint to use it)
- No `/auth/logout`
- No CORS configured in `main.py` — frontend calls will fail until added
- No role-guard dependency for per-role API routes

**Frontend (Next.js 16 + React 19)**:
- `/login` page renders `animated-characters-login-page.tsx` with a hardcoded mock check (`erik@gmail.com / 1234`, `alert(...)`)
- No auth context, no token storage, no protected routes, no role guards, no logout, no dashboards
- Tailwind v4 + shadcn primitives wired up (button/input/label/checkbox), `cn` helper at `src/lib/utils.ts`

---

## Architecture decisions

### Decision 1 — Where the session lives

| Option | Pros | Cons |
|---|---|---|
| **A. httpOnly cookie set by Next proxy (`proxy.ts`)** — Next reads `Authorization` from cookie, forwards to FastAPI | Tokens never touch JS → XSS-safe; enables Next.js `proxy.ts` redirects (Next 16 renamed middleware → proxy); SSR-friendly | More code; need a Next Route Handler `/api/auth/login` that proxies FastAPI + sets the cookie |
| **B. `localStorage` + client-only `AuthProvider`** | Simplest, no proxy, no Route Handlers | Vulnerable to XSS; SSR cannot check auth; all dashboards must be `"use client"`; flash-of-unauthenticated on refresh |
| **C. Hybrid (cookie for proxy redirect + in-memory user)** | Best of both | More moving parts for a graduation project |

**Recommended: A** — matches the Next.js 16 official authentication guide, gives clean URL guards (`/dashboard/*` redirects to `/login` server-side), and is the only option that lets `proxy.ts` enforce role-based routes without flashing the wrong UI.

### Decision 2 — URL structure for role dashboards

| Option | URLs | Notes |
|---|---|---|
| **A. Role in URL** | `/dashboard/ceo`, `/dashboard/product-manager`, `/dashboard/marketer` | Bookmarkable per role; easy guards; recommended |
| **B. Single `/dashboard` that renders by role** | `/dashboard` (server reads role, renders different layout) | Cleaner URL but harder to deep-link; harder to share screenshots/links per role |
| **C. Per-role top-level** | `/ceo`, `/product-manager`, `/marketer` | Shorter but pollutes root namespace |

**Recommended: A** with route groups → `app/(auth)/login`, `app/(dashboard)/dashboard/ceo`, etc.

### Decision 3 — How users get accounts

The backend has `/auth/register` open to anyone. For a BI dashboard, public self-registration with arbitrary role is a security hole (anyone could register as `ceo`).

- **A.** Remove `register` from public auth; seed users via a script / admin tool.
- **B.** Keep public registration but force `role` server-side to a default (e.g. `marketer`) and add an admin promotion endpoint.
- **C.** Build a sign-up page on the frontend that lets users self-select role (insecure but simplest for a demo).

**Recommended: A** — add a small `scripts/seed_users.py` to create one user per role.

---

## Proposed file layout (frontend)

```
client/src/
├── app/
│   ├── layout.tsx                    # root (unchanged)
│   ├── page.tsx                      # landing → redirect to /dashboard if auth, else /login
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx              # uses the animated component, wires to action
│   ├── (dashboard)/
│   │   ├── layout.tsx                # shared sidebar/topbar + role-gated nav, calls verifySession()
│   │   ├── dashboard/
│   │   │   ├── page.tsx              # role router: redirects to /dashboard/<role>
│   │   │   ├── ceo/
│   │   │   │   └── page.tsx          # CEO Financial Command Center
│   │   │   ├── product-manager/
│   │   │   │   └── page.tsx          # Product Intelligence Workspace
│   │   │   └── marketer/
│   │   │       ├── page.tsx          # Campaign & Customer Growth Hub
│   │   │       └── campaigns/
│   │   │           ├── page.tsx      # list
│   │   │           └── new/page.tsx  # create campaign form
│   ├── api/
│   │   └── auth/
│   │       ├── login/route.ts        # POST → calls FastAPI /auth/login, sets httpOnly cookie
│   │       ├── logout/route.ts       # POST → clears cookie
│   │       └── refresh/route.ts      # POST → refresh access token
│   ├── forbidden.tsx                 # 403 (Next 16 built-in)
│   └── unauthorized.tsx              # 401 (Next 16 built-in)
├── proxy.ts                          # NEW (Next 16 replaces middleware.ts) — optimistic redirects
├── components/
│   ├── ui/                           # shadcn primitives (existing + new: card, dropdown, avatar…)
│   ├── auth/
│   │   ├── login-form.tsx            # extracted form fragment, accepts action prop
│   │   └── logout-button.tsx
│   └── dashboard/
│       ├── sidebar.tsx               # role-aware navigation
│       ├── topbar.tsx                # user menu, logout
│       └── kpi-card.tsx              # reusable metric tile
└── lib/
    ├── utils.ts                      # cn (existing)
    ├── auth/
    │   ├── session.ts                # cookie read/write, JWT decode (jose)
    │   ├── dal.ts                    # verifySession(), getCurrentUser() — server-only
    │   ├── roles.ts                  # Role type, route map, hasRole(), default route per role
    │   └── actions.ts                # "use server" loginAction, logoutAction
    └── api/
        └── client.ts                 # typed fetch wrapper that attaches Bearer token
```

## Proposed file changes (backend)

```
server/app/
├── main.py                           # ADD CORSMiddleware (allow http://localhost:3000)
├── auth/routes.py                    # ADD /auth/refresh, /auth/logout
├── core/security.py                  # ADD require_role(*roles) dependency factory
└── (no other changes)
scripts/
└── seed_users.py                     # NEW — create one user per role for dev
```

---

## Auth flow (Decision A)

```
Browser            Next.js Route Handler        FastAPI
  │                       │                        │
  │ POST /api/auth/login  │                        │
  │   {email, password}   │                        │
  │──────────────────────▶│                        │
  │                       │ POST /api/v1/auth/login│
  │                       │  (OAuth2 form)         │
  │                       │───────────────────────▶│
  │                       │◀── {access, refresh,   │
  │                       │       user}            │
  │                       │ Set-Cookie:            │
  │                       │   session=<JWT>        │
  │                       │   (httpOnly, secure,   │
  │                       │    sameSite=lax)       │
  │◀──────────────────────│                        │
  │ 200 {user}            │                        │
  │                       │                        │
  │ GET /dashboard/ceo    │                        │
  │──────────────────────▶│ proxy.ts: read cookie  │
  │                       │ if no session → /login │
  │                       │ if role !== "ceo"      │
  │                       │   → /forbidden         │
  │                       │ else render            │
```

- **`proxy.ts`** does optimistic checks (cookie-only, no DB) — fast, runs on every request.
- **`lib/auth/dal.ts`** does the secure check inside Server Components via `verifySession()` cached with React `cache()`.
- **Role guard** is centralized in `lib/auth/roles.ts`:
  ```ts
  export const ROLE_HOME: Record<Role, string> = {
    ceo: "/dashboard/ceo",
    product_manager: "/dashboard/product-manager",
    marketer: "/dashboard/marketer",
  };
  export const ROLE_ROUTES: Record<Role, string[]> = {
    ceo: ["/dashboard/ceo"],
    product_manager: ["/dashboard/product-manager"],
    marketer: ["/dashboard/marketer", "/dashboard/marketer/campaigns"],
  };
  ```

---

## Login component changes

The current `animated-characters-login-page.tsx` has the form built in with a mock `handleSubmit`. Refactor:

1. Keep the visual component as-is.
2. Replace its hardcoded `handleSubmit` with a prop `onSubmit?: (email, password) => Promise<{ error?: string }>` so the visual is decoupled from auth logic.
3. In `app/(auth)/login/page.tsx`, pass a Server Action that calls `/api/auth/login` and then `redirect(ROLE_HOME[user.role])`.
4. Remove the `erik@gmail.com / 1234` demo branch.

---

## Implementation order

1. **Backend** — add CORS + `/auth/refresh` + `/auth/logout` + `require_role()` dependency + seed script.
2. **Frontend foundations** — install `jose` (JWT decode), create `lib/auth/{session,dal,roles,actions}.ts`, create `api/auth/{login,logout,refresh}/route.ts`, create `proxy.ts`.
3. **Wire login** — refactor `animated-characters-login-page.tsx` to accept `onSubmit`, update `app/(auth)/login/page.tsx`.
4. **Dashboard shell** — `app/(dashboard)/layout.tsx` with sidebar/topbar, `dashboard/page.tsx` role router.
5. **Per-role pages** — stubs first (titles + KPI placeholders), then wire to real BI endpoints later.
6. **Polish** — `forbidden.tsx`, `unauthorized.tsx`, root `page.tsx` redirect logic.

---

## Open questions

1. **Decision 1**: Cookie+proxy (A — recommended), localStorage (B), or hybrid (C)?
2. **Decision 2**: `/dashboard/<role>` URLs (A — recommended), single `/dashboard` (B), or `/<role>` top-level (C)?
3. **Decision 3**: Remove public `/register` and add a seed script (A — recommended), keep public register with forced role (B), or keep open self-registration (C)?
4. **Logout UX**: redirect to `/login` or to a landing page?
5. **Scope for this round**:
   - **(i)** lay down the full auth + routing skeleton with empty dashboard pages,
   - **(ii)** auth + routing plus real KPI cards for the CEO dashboard now (with the others as stubs), or
   - **(iii)** all three role dashboards fully built with mock data, wired to real APIs later?
6. **Backend API base URL** for the Next proxy — `http://localhost:8000/api/v1` for dev, configurable via `NEXT_PUBLIC_API_URL` / `API_URL` env var?
7. **Token storage in cookie** — store the full FastAPI access token verbatim, or have Next sign its own session JWT (with `userId`+`role`) and keep the FastAPI token in a separate httpOnly cookie for outbound calls?
