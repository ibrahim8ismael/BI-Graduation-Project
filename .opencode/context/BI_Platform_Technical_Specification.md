# Business Intelligence Platform for E-Commerce
## Complete Technical Specification Document

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [System Architecture Overview](#2-system-architecture-overview)
3. [Frontend Architecture (Detailed)](#3-frontend-architecture-detailed)
4. [Backend API Specification](#4-backend-api-specification)
5. [Database & Data Warehouse](#5-database--data-warehouse)
6. [Machine Learning Module](#6-machine-learning-module)
7. [Data Flow & ETL Pipeline](#7-data-flow--etl-pipeline)
8. [Power BI Integration](#8-power-bi-integration)
9. [Implementation Roadmap](#9-implementation-roadmap)
10. [Tech Stack Summary](#10-tech-stack-summary)

---

## 1. Executive Summary

### 1.1 Project Vision
A comprehensive Business Intelligence (BI) platform designed specifically for e-commerce businesses. The platform transforms raw transactional data into actionable insights through three specialized dashboards, each tailored to a specific organizational role.

### 1.2 Target Users

| Role | Primary Need | Key Decisions |
|------|-------------|---------------|
| **CEO** | Financial health overview | Investment, expansion, strategic direction |
| **Product Manager** | Product performance intelligence | Inventory, pricing, product development |
| **Marketer** | Campaign effectiveness & growth | Marketing spend, customer acquisition, promotions |

### 1.3 Core Value Proposition
- **Unified Data View**: All business data consolidated in one data warehouse
- **Predictive Intelligence**: Machine learning forecasts for revenue and product trends
- **Role-Based Insights**: Each user sees only relevant metrics and controls
- **Dual Interface**: Power BI for advanced reporting + Web Platform for interactive operations

---

## 2. System Architecture Overview

### 2.1 High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DATA LAYER                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────────────────┐  │
│  │   MongoDB   │───▶│  ETL Pipeline│───▶│      PostgreSQL (DWH)           │  │
│  │  (Raw Data) │    │  (Python)    │    │  (Structured Analytics Tables)  │  │
│  └─────────────┘    └─────────────┘    └─────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ANALYTICS LAYER                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐  │
│  │   Data Analysis     │  │  Machine Learning   │  │     Power BI        │  │
│  │   (Jupyter/Pandas)  │  │  (Prophet/XGBoost)  │  │   (Direct Connect)  │  │
│  │                     │  │                     │  │                     │  │
│  │ • EDA Reports       │  │ • Revenue Forecast  │  │ • CEO Reports       │  │
│  │ • KPI Calculations  │  │ • Product Prediction│  │ • PM Reports        │  │
│  │ • Cohort Analysis   │  │ • Customer Segment  │  │ • Marketer Reports  │  │
│  └─────────────────────┘  └─────────────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         APPLICATION LAYER                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    FastAPI Backend (Python)                          │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │    │
│  │  │   Auth   │  │   CEO    │  │    PM    │  │    Marketer      │   │    │
│  │  │  Module  │  │   API    │  │   API    │  │      API         │   │    │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘   │    │
│  │                                                                     │    │
│  │  ┌─────────────────────────────────────────────────────────────┐   │    │
│  │  │              ML Integration Module                           │   │    │
│  │  │  • Loads trained models (.pkl)                              │   │    │
│  │  │  • Serves predictions via API endpoints                     │   │    │
│  │  │  • Real-time forecast generation                            │   │    │
│  │  └─────────────────────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                        │
│                              REST API (JSON)                                │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    React Frontend (Web Platform)                     │    │
│  │                                                                     │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐   │    │
│  │  │  CEO Dash   │  │   PM Dash   │  │     Marketer Dash       │   │    │
│  │  │  (Charts)   │  │  (Charts)   │  │     (Charts + Forms)    │   │    │
│  │  └─────────────┘  └─────────────┘  └─────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Component Interaction Flow

1. **Data Ingestion**: E-commerce data (or synthetic data) flows into MongoDB
2. **ETL Process**: Python scripts extract, clean, transform, and load data into PostgreSQL
3. **Analytics Computation**: Data Analysis scripts calculate KPIs and store results in `daily_metrics` table
4. **ML Training**: Models train on historical data and save as `.pkl` files
5. **API Serving**: FastAPI loads models and serves predictions alongside business data
6. **Frontend Consumption**: React app fetches data via authenticated API calls
7. **Power BI Reporting**: Power BI connects directly to PostgreSQL for executive reports

---

## 3. Frontend Architecture (Detailed)

### 3.1 Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Framework | React | 18.x | UI Component Library |
| Routing | React Router DOM | 6.x | Client-side Navigation |
| State Management | React Context API | Built-in | Global Auth State |
| HTTP Client | Axios | 1.x | API Communication |
| Charts | Recharts | 2.x | Interactive Data Visualization |
| Styling | CSS Modules | Built-in | Scoped Component Styles |
| Icons | Lucide React | Latest | Consistent Icon System |
| Build Tool | Create React App / Vite | Latest | Development & Bundling |

### 3.2 Project Structure

```
frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
│
├── src/
│   ├── index.js                          # Application entry point
│   ├── App.js                            # Root component with routing
│   ├── index.css                         # Global styles & CSS variables
│   │
│   ├── api/
│   │   ├── axiosConfig.js                # Axios instance with interceptors
│   │   ├── authAPI.js                    # Authentication endpoints
│   │   ├── ceoAPI.js                     # CEO dashboard endpoints
│   │   ├── productManagerAPI.js          # PM dashboard endpoints
│   │   └── marketerAPI.js                # Marketer dashboard endpoints
│   │
│   ├── context/
│   │   └── AuthContext.js                # Global authentication state
│   │                                       # - currentUser
│   │                                       # - login/logout functions
│   │                                       # - role-based access control
│   │
│   ├── hooks/
│   │   ├── useAuth.js                    # Consume auth context
│   │   ├── useDashboardData.js           # Fetch & cache dashboard metrics
│   │   └── useCampaignForm.js            # Manage campaign form state
│   │
│   ├── components/
│   │   │
│   │   ├── Layout/
│   │   │   ├── AppLayout.jsx             # Main app shell (sidebar + header)
│   │   │   ├── Sidebar.jsx               # Navigation sidebar
│   │   │   │                               # - Role-based menu items
│   │   │   │                               # - Active route highlighting
│   │   │   │                               # - Collapsible sections
│   │   │   ├── Header.jsx                # Top bar with user info
│   │   │   │                               # - User avatar & name
│   │   │   │                               # - Logout button
│   │   │   │                               # - Notification bell
│   │   │   └── Footer.jsx                # App footer
│   │   │
│   │   ├── Charts/
│   │   │   ├── RevenueLineChart.jsx      # Time-series revenue display
│   │   │   │                               # Props: data[], xKey, yKey
│   │   │   │                               # Features: tooltip, legend, zoom
│   │   │   ├── CategoryBarChart.jsx      # Horizontal/vertical bar chart
│   │   │   ├── ForecastChart.jsx         # Revenue forecast with confidence bands
│   │   │   │                               # Displays: historical + predicted
│   │   │   │                               # Colors: actual (blue), predicted (green)
│   │   │   ├── CampaignPieChart.jsx      # Campaign distribution (ROI, cost)
│   │   │   ├── CustomerSegmentChart.jsx  # K-Means cluster visualization
│   │   │   └── MetricCard.jsx            # KPI display card
│   │   │                                   # Props: title, value, change%, icon
│   │   │                                   # Features: color-coded trends
│   │   │
│   │   ├── Tables/
│   │   │   ├── DataTable.jsx             # Reusable sortable table
│   │   │   │                               # Props: columns[], data[], onRowClick
│   │   │   │                               # Features: sorting, pagination, search
│   │   │   ├── CampaignTable.jsx         # Campaign list with actions
│   │   │   │                               # Columns: Name, Dates, Cost, Revenue, ROI
│   │   │   │                               # Actions: View, Edit, Delete
│   │   │   └── ProductTable.jsx          # Product performance table
│   │   │
│   │   ├── Forms/
│   │   │   ├── CampaignForm.jsx          # Create/edit campaign form
│   │   │   │                               # Fields: Name, Date Range, Products, Cost
│   │   │   │                               # Validation: required, positive numbers
│   │   │   │                               # Submission: POST /api/marketer/campaigns
│   │   │   └── LoginForm.jsx             # Authentication form
│   │   │
│   │   └── Common/
│   │       ├── ProtectedRoute.jsx        # Route guard based on role
│   │       │                               # Redirects to login if unauthenticated
│   │       │                               # Redirects to 403 if wrong role
│   │       ├── LoadingSpinner.jsx        # Full-page & inline loading states
│   │       ├── ErrorBoundary.jsx         # Catch React rendering errors
│   │       ├── EmptyState.jsx            # No data display
│   │       ├── DateRangePicker.jsx       # Reusable date filter
│   │       └── NotificationToast.jsx     # Success/error feedback
│   │
│   ├── pages/
│   │   ├── LoginPage.jsx                 # Public login page
│   │   │                                   # - Centered card layout
│   │   │                                   # - Email + password inputs
│   │   │                                   # - Role selection (dev mode)
│   │   │
│   │   ├── CEO/
│   │   │   └── Dashboard.jsx             # CEO Financial Command Center
│   │   │                                   # Sections:
│   │   │                                   # 1. Financial Overview (4 metric cards)
│   │   │                                   #    - Total Revenue
│   │   │                                   #    - Total Orders
│   │   │                                   #    - Average Order Value
│   │   │                                   #    - Net Profit
│   │   │                                   # 2. Performance Highlights
│   │   │                                   #    - Best/Worst Performing Day
│   │   │                                   #    - Top/Underperforming Category
│   │   │                                   # 3. Revenue Trend Chart (monthly)
│   │   │                                   # 4. ML Revenue Forecast (12 months)
│   │   │                                   #    - Historical line + forecast line
│   │   │                                   #    - Confidence interval shading
│   │   │
│   │   ├── ProductManager/
│   │   │   └── Dashboard.jsx             # Product Intelligence Workspace
│   │   │                                   # Sections:
│   │   │                                   # 1. Category Performance
│   │   │                                   #    - Top categories by revenue
│   │   │                                   #    - Top categories by orders
│   │   │                                   #    - Repeat purchase rate
│   │   │                                   # 2. Sales Trend Analytics
│   │   │                                   #    - Monthly sales by category
│   │   │                                   #    - Weekly trend lines
│   │   │                                   # 3. Predictive Analytics
│   │   │                                   #    - Products likely to rise
│   │   │                                   #    - Products likely to fall
│   │   │                                   #    - Confidence scores
│   │   │
│   │   ├── Marketer/
│   │   │   ├── Dashboard.jsx             # Campaign & Customer Growth Hub
│   │   │   │                               # Sections:
│   │   │   │                               # 1. Campaign Summary Cards
│   │   │   │                               #    - Active campaigns count
│   │   │   │                               #    - Total campaign spend
│   │   │   │                               #    - Average ROI
│   │   │   │                               # 2. Campaign Performance Table
│   │   │   │                               # 3. Customer Insights Charts
│   │   │   │                               #    - New vs Returning (pie)
│   │   │   │                               #    - Customer acquisition trend
│   │   │   │                               # 4. Best Products in Campaigns
│   │   │   │
│   │   │   └── CampaignCreate.jsx        # Standalone campaign creation page
│   │   │                                   # Form with validation
│   │   │                                   # Product multi-select
│   │   │                                   # Date range picker
│   │   │
│   │   └── Unauthorized.jsx              # 403 Access Denied page
│   │
│   ├── styles/
│   │   ├── variables.css                 # CSS custom properties
│   │   │                                   # - Colors (primary, success, danger)
│   │   │                                   # - Spacing scale
│   │   │                                   # - Border radius
│   │   │                                   # - Shadows
│   │   ├── layout.css                    # Grid & flex utilities
│   │   └── dashboard.css                 # Dashboard-specific styles
│   │
│   └── utils/
│       ├── formatters.js                 # Number & date formatting
│       │                                   # - currencyFormat($1,234.56)
│       │                                   # - dateFormat(YYYY-MM-DD)
│       │                                   # - percentageFormat(12.5%)
│       ├── constants.js                  # App constants
│       │                                   # - API_BASE_URL
│       │                                   # - ROLES
│       │                                   # - CHART_COLORS
│       └── validators.js                 # Form validation helpers
│
├── package.json
└── .env
```

### 3.3 State Management Strategy

#### Authentication State (React Context)

```javascript
// AuthContext Structure
{
  user: {
    id: "uuid",
    email: "ceo@company.com",
    name: "Ahmed CEO",
    role: "ceo",              // "ceo" | "product_manager" | "marketer"
    token: "jwt_string"
  },
  isAuthenticated: true,
  isLoading: false,
  login: (credentials) => Promise,
  logout: () => void
}
```

#### Dashboard Data Fetching Pattern

```javascript
// useDashboardData Hook
const useDashboardData = (role, dateRange) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/${role}/dashboard`, {
          params: { startDate: dateRange.start, endDate: dateRange.end }
        });
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [role, dateRange]);

  return { data, loading, error, refetch: fetchData };
};
```

### 3.4 Routing Structure

| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/login` | LoginPage | Public | Authentication page |
| `/ceo` | CEODashboard | CEO only | Financial overview & forecasts |
| `/pm` | PMDashboard | PM only | Product analytics & predictions |
| `/marketer` | MarketerDashboard | Marketer only | Campaign management & analytics |
| `/marketer/campaigns/new` | CampaignCreate | Marketer only | Create new campaign form |
| `/unauthorized` | Unauthorized | All | 403 error page |
| `*` | NotFound | All | 404 error page |

### 3.5 Component Design System

#### Color Palette

```css
:root {
  /* Primary */
  --color-primary: #2563eb;
  --color-primary-light: #3b82f6;
  --color-primary-dark: #1d4ed8;

  /* Semantic */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  --color-info: #06b6d4;

  /* Neutral */
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-text-primary: #1e293b;
  --color-text-secondary: #64748b;
  --color-border: #e2e8f0;

  /* Role Colors */
  --color-ceo: #7c3aed;
  --color-pm: #059669;
  --color-marketer: #dc2626;
}
```

#### Metric Card Component

```
┌─────────────────────────────────────┐
│  [Icon]  Total Revenue              │
│          ─────────────────          │
│          $1,234,567                 │
│          ↑ 12.5% vs last month      │
└─────────────────────────────────────┘

Props:
- title: string
- value: number | string
- change: number (percentage)
- changeType: "positive" | "negative" | "neutral"
- icon: LucideIcon
- format: "currency" | "number" | "percentage"
```

#### Chart Component Specifications

**RevenueLineChart**
- X-axis: Date (monthly aggregation)
- Y-axis: Revenue amount
- Tooltip: Shows exact value + date
- Legend: Toggle series visibility
- Responsive: Adapts to container width

**ForecastChart**
- Historical data: Solid blue line
- Forecast data: Dashed green line
- Confidence interval: Shaded area (light green)
- Vertical line: Separator between historical and forecast

**CategoryBarChart**
- Orientation: Horizontal (for long category names)
- Sorting: Descending by default
- Colors: Gradient based on performance
- Labels: Value labels at bar end

### 3.6 API Integration Patterns

#### Axios Configuration

```javascript
// axiosConfig.js
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle 401/403
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

#### Error Handling Strategy

| Error Type | User Feedback | Action |
|-----------|--------------|--------|
| Network Error | Toast: "Connection failed" | Retry button |
| 401 Unauthorized | Redirect to login | Clear auth state |
| 403 Forbidden | Show 403 page | Log for security |
| 404 Not Found | Toast: "Resource not found" | Back button |
| 500 Server Error | Toast: "Server error" | Auto-retry x3 |
| Validation Error | Inline field errors | Highlight fields |

### 3.7 Responsive Design Strategy

| Breakpoint | Layout | Sidebar | Charts |
|-----------|--------|---------|--------|
| Desktop (>1200px) | Full sidebar + content | Expanded | Side-by-side |
| Tablet (768-1200px) | Collapsible sidebar | Icons only | Stacked |
| Mobile (<768px) | Bottom nav or hamburger | Hidden | Full width |

---

## 4. Backend API Specification

### 4.1 Authentication Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/api/auth/login` | User login | `{email, password}` | `{token, user}` |
| POST | `/api/auth/logout` | User logout | - | `{message}` |
| GET | `/api/auth/me` | Current user | - | `{id, name, email, role}` |

### 4.2 CEO Dashboard Endpoints

| Method | Endpoint | Description | Query Params | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/ceo/financial-overview` | KPI cards | `startDate, endDate` | `{revenue, orders, aov, profit}` |
| GET | `/api/ceo/performance-highlights` | Best/worst metrics | `startDate, endDate` | `{bestDay, worstDay, topCategory, underCategory}` |
| GET | `/api/ceo/revenue-trend` | Monthly revenue chart | `startDate, endDate` | `[{month, revenue}]` |
| GET | `/api/ceo/revenue-forecast` | ML 12-month forecast | - | `[{month, forecast, lower, upper}]` |

### 4.3 Product Manager Endpoints

| Method | Endpoint | Description | Query Params | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/pm/top-categories` | Category rankings | `metric` (revenue/orders/repeat) | `[{category, value, rank}]` |
| GET | `/api/pm/sales-trends` | Monthly category trends | `category, period` | `[{period, revenue, orders}]` |
| GET | `/api/pm/product-predictions` | ML product predictions | - | `[{product, trend, confidence}]` |

### 4.4 Marketer Endpoints

| Method | Endpoint | Description | Request Body / Query | Response |
|--------|----------|-------------|---------------------|----------|
| GET | `/api/marketer/campaigns` | List all campaigns | - | `[{id, name, dates, cost, revenue, roi}]` |
| POST | `/api/marketer/campaigns` | Create campaign | `{name, startDate, endDate, products, cost, promotion}` | `{id, ...}` |
| GET | `/api/marketer/campaigns/:id` | Campaign details | - | `{id, name, analytics, products}` |
| GET | `/api/marketer/campaign-analytics` | Campaign performance | `campaignId` | `{revenue, profit, cpa, roi, customers}` |
| GET | `/api/marketer/customer-insights` | Customer metrics | `campaignId` | `{newCustomers, returningCustomers, acquisitionRate}` |
| GET | `/api/marketer/best-products` | Top products in campaigns | `campaignId` | `[{product, unitsSold, revenue}]` |

### 4.5 Response Format Standard

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2026-04-21T10:30:00Z",
    "requestId": "uuid"
  }
}
```

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid date range",
    "details": ["endDate must be after startDate"]
  }
}
```

---

## 5. Database & Data Warehouse

### 5.1 PostgreSQL Schema

#### Core Tables

**customers**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Unique identifier |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Customer email |
| name | VARCHAR(255) | NOT NULL | Full name |
| created_at | TIMESTAMP | DEFAULT NOW() | Registration date |
| segment | VARCHAR(50) | | ML cluster label |

**products**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Unique identifier |
| name | VARCHAR(255) | NOT NULL | Product name |
| category | VARCHAR(100) | NOT NULL | Product category |
| price | DECIMAL(10,2) | NOT NULL | Unit price |
| cost | DECIMAL(10,2) | NOT NULL | Unit cost |
| created_at | TIMESTAMP | DEFAULT NOW() | Added date |

**orders**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Unique identifier |
| customer_id | UUID | FK → customers | Buyer reference |
| order_date | TIMESTAMP | NOT NULL | Purchase date |
| total_amount | DECIMAL(10,2) | NOT NULL | Order total |
| status | VARCHAR(20) | DEFAULT 'completed' | Order status |

**order_items**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Unique identifier |
| order_id | UUID | FK → orders | Parent order |
| product_id | UUID | FK → products | Product reference |
| quantity | INTEGER | NOT NULL | Units purchased |
| unit_price | DECIMAL(10,2) | NOT NULL | Price at purchase |

**campaigns**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Unique identifier |
| name | VARCHAR(255) | NOT NULL | Campaign name |
| start_date | DATE | NOT NULL | Campaign start |
| end_date | DATE | NOT NULL | Campaign end |
| cost | DECIMAL(12,2) | NOT NULL | Total spend |
| target_products | UUID[] | | Product IDs targeted |
| promotion_details | TEXT | | Discount/promo info |
| created_at | TIMESTAMP | DEFAULT NOW() | Creation date |

**reviews**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | Unique identifier |
| product_id | UUID | FK → products | Reviewed product |
| customer_id | UUID | FK → customers | Reviewer |
| rating | INTEGER | CHECK (1-5) | Star rating |
| comment | TEXT | | Review text |
| created_at | TIMESTAMP | DEFAULT NOW() | Review date |

#### Analytics Tables

**daily_metrics** (Pre-aggregated for dashboards)
| Column | Type | Description |
|--------|------|-------------|
| date | DATE | PK | Metric date |
| total_revenue | DECIMAL(12,2) | Daily revenue |
| total_orders | INTEGER | Order count |
| total_customers | INTEGER | Unique buyers |
| avg_order_value | DECIMAL(10,2) | AOV |
| new_customers | INTEGER | First-time buyers |
| returning_customers | INTEGER | Repeat buyers |

### 5.2 Indexes for Performance

```sql
-- Orders: Date range queries (dashboard filters)
CREATE INDEX idx_orders_date ON orders(order_date);
CREATE INDEX idx_orders_customer ON orders(customer_id);

-- Order Items: Product performance analysis
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- Campaigns: Active campaign lookups
CREATE INDEX idx_campaigns_dates ON campaigns(start_date, end_date);

-- Daily Metrics: Time-series queries
CREATE INDEX idx_daily_metrics_date ON daily_metrics(date);
```

---

## 6. Machine Learning Module

### 6.1 Models Overview

| Model | Algorithm | Purpose | Input | Output |
|-------|-----------|---------|-------|--------|
| Revenue Forecaster | Prophet | Predict next 12 months revenue | Daily revenue history | Monthly forecasts with confidence |
| Product Predictor | XGBoost | Predict product popularity trend | Sales history, reviews, price | Trend direction (rise/fall/stable) |
| Customer Segmenter | K-Means | Group customers by behavior | RFM metrics (Recency, Frequency, Monetary) | Cluster labels (0-4) |

### 6.2 Integration with Backend

```python
# backend/app/ml/revenue_forecast.py
import joblib
from prophet import Prophet
import pandas as pd
from sqlalchemy import create_engine

class RevenueForecaster:
    def __init__(self):
        self.model = joblib.load("models/revenue_forecaster.pkl")

    def predict(self, periods=365):
        future = self.model.make_future_dataframe(periods=periods)
        forecast = self.model.predict(future)
        return forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']]

    def retrain(self):
        # Fetch latest data from PostgreSQL
        engine = create_engine("postgresql://...")
        df = pd.read_sql("SELECT date, revenue FROM daily_metrics", engine)

        # Retrain model
        self.model = Prophet()
        self.model.fit(df)
        joblib.dump(self.model, "models/revenue_forecaster.pkl")

# FastAPI endpoint
@router.get("/revenue-forecast")
async def get_forecast():
    forecaster = RevenueForecaster()
    return forecaster.predict()
```

### 6.3 Model Training Schedule

| Model | Frequency | Trigger | Duration |
|-------|-----------|---------|----------|
| Revenue Forecaster | Weekly | Cron job (Sunday 2 AM) | ~5 minutes |
| Product Predictor | Bi-weekly | Manual or scheduled | ~10 minutes |
| Customer Segmenter | Monthly | First day of month | ~3 minutes |

---

## 7. Data Flow & ETL Pipeline

### 7.1 ETL Process Flow

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐     ┌─────────────┐
│   MongoDB   │────▶│   Extract    │────▶│  Transform   │────▶│  PostgreSQL │
│  (Source)   │     │  (Python)    │     │  (Pandas)    │     │   (Target)   │
└─────────────┘     └──────────────┘     └──────────────┘     └─────────────┘
                          │                    │
                          ▼                    ▼
                    ┌──────────────┐    ┌──────────────┐
                    │  pymongo     │    │ • Clean nulls│
                    │  connection  │    │ • Remove dups│
                    │ • Read all   │    │ • Normalize  │
                    │   collections│    │ • Type cast  │
                    └──────────────┘    │ • Aggregate  │
                                        └──────────────┘
```

### 7.2 ETL Steps Detail

**Step 1: Extract**
- Connect to MongoDB using `pymongo`
- Read collections: `users`, `orders`, `products`, `reviews`, `campaigns`
- Convert to pandas DataFrames

**Step 2: Transform**
- Handle missing values (drop or impute)
- Remove duplicate records
- Normalize nested JSON structures
- Convert data types (string dates → TIMESTAMP)
- Calculate derived fields (profit = revenue - cost)
- Aggregate for `daily_metrics` table

**Step 3: Load**
- Truncate and load pattern for fact tables
- Incremental load for large tables
- Bulk insert using `COPY` command for performance
- Update `daily_metrics` summary table

### 7.3 ETL Scheduling

```python
# scheduler.py (using APScheduler)
from apscheduler.schedulers.background import BackgroundScheduler

scheduler = BackgroundScheduler()

# Run ETL daily at 3:00 AM
scheduler.add_job(
    run_etl_pipeline,
    'cron',
    hour=3,
    minute=0,
    id='daily_etl'
)

# Run metrics aggregation hourly
scheduler.add_job(
    update_daily_metrics,
    'cron',
    hour='*',
    minute=15,
    id='hourly_metrics'
)

scheduler.start()
```

---

## 8. Power BI Integration

### 8.1 Connection Method

Power BI connects **directly** to PostgreSQL using the native PostgreSQL connector:

```
Power BI Desktop → Get Data → PostgreSQL Database
Server: localhost:5432 (or cloud instance)
Database: bi_warehouse
Authentication: Database (username/password)
```

### 8.2 Data Mode Selection

| Mode | Use Case | Refresh |
|------|----------|---------|
| **Import** | Small-medium datasets (<1GB) | Scheduled refresh in Power BI Service |
| **DirectQuery** | Large datasets, real-time needs | Live query on each interaction |

**Recommendation**: Use **Import** for historical data + **DirectQuery** for `daily_metrics` (if needed).

### 8.3 Power BI Reports Structure

**CEO Report**
- Page 1: Financial Overview (KPI cards + revenue trend)
- Page 2: Performance Highlights (best/worst day, category rankings)
- Page 3: ML Forecast (12-month prediction chart)

**Product Manager Report**
- Page 1: Category Performance (bar charts + tables)
- Page 2: Sales Trends (line charts by category)
- Page 3: Product Predictions (scatter plot with confidence)

**Marketer Report**
- Page 1: Campaign List (table with filters)
- Page 2: Campaign Analytics (ROI, CPA gauges)
- Page 3: Customer Insights (demographics, new vs returning)

### 8.4 Row-Level Security (RLS) in Power BI

```dax
// CEO sees everything
[Role] = "ceo"

// Product Manager sees product data only
[Role] = "product_manager"

// Marketer sees campaign data only
[Role] = "marketer"
```

---

## 9. Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Set up PostgreSQL database
- [ ] Create all tables and indexes
- [ ] Generate synthetic data (50K orders, 10K customers, 500 products)
- [ ] Build ETL pipeline (MongoDB → PostgreSQL)
- [ ] Populate `daily_metrics` table

### Phase 2: Backend Core (Week 3-4)
- [ ] FastAPI project setup
- [ ] Authentication system (JWT + roles)
- [ ] CEO API endpoints
- [ ] PM API endpoints
- [ ] Marketer API endpoints
- [ ] API testing with Postman

### Phase 3: Machine Learning (Week 5)
- [ ] Revenue forecasting model (Prophet)
- [ ] Product prediction model (XGBoost)
- [ ] Customer segmentation (K-Means)
- [ ] Integrate ML with FastAPI endpoints
- [ ] Model persistence (.pkl files)

### Phase 4: Frontend (Week 6-7)
- [ ] React project setup
- [ ] Authentication pages (login)
- [ ] Layout components (sidebar, header)
- [ ] CEO Dashboard with charts
- [ ] PM Dashboard with charts
- [ ] Marketer Dashboard + Campaign form
- [ ] API integration

### Phase 5: Power BI (Week 8)
- [ ] Connect Power BI to PostgreSQL
- [ ] Build CEO report
- [ ] Build PM report
- [ ] Build Marketer report
- [ ] Configure scheduled refresh

### Phase 6: Integration & Polish (Week 9-10)
- [ ] End-to-end testing
- [ ] Performance optimization
- [ ] Error handling review
- [ ] Documentation
- [ ] Demo preparation

---

## 10. Tech Stack Summary

### Backend & Data

| Technology | Purpose | Version |
|-----------|---------|---------|
| Python | Primary language | 3.11+ |
| FastAPI | Web framework | 0.100+ |
| SQLAlchemy | ORM | 2.0+ |
| PostgreSQL | Data warehouse | 15+ |
| MongoDB | Operational database | 6.0+ |
| Pandas | Data manipulation | 2.0+ |
| Prophet | Time-series forecasting | Latest |
| XGBoost | Gradient boosting | Latest |
| scikit-learn | ML utilities | Latest |
| joblib | Model serialization | Latest |

### Frontend

| Technology | Purpose | Version |
|-----------|---------|---------|
| React | UI framework | 18.2+ |
| React Router DOM | Routing | 6.14+ |
| Axios | HTTP client | 1.4+ |
| Recharts | Charts | 2.7+ |
| Lucide React | Icons | Latest |
| CSS Modules | Styling | Built-in |

### BI & Visualization

| Technology | Purpose |
|-----------|---------|
| Power BI Desktop | Report development |
| Power BI Service | Report sharing & refresh |

### Infrastructure

| Technology | Purpose |
|-----------|---------|
| Docker | Containerization (optional) |
| Cron / APScheduler | Job scheduling |
| Git | Version control |

---

## Appendix A: Sample API Responses

### CEO Financial Overview
```json
{
  "success": true,
  "data": {
    "totalRevenue": 1234567.89,
    "totalOrders": 15420,
    "averageOrderValue": 80.06,
    "netProfit": 345678.90,
    "period": {
      "start": "2026-01-01",
      "end": "2026-04-21"
    }
  }
}
```

### Revenue Forecast
```json
{
  "success": true,
  "data": {
    "forecast": [
      { "month": "2026-05", "forecast": 105000, "lower": 98000, "upper": 112000 },
      { "month": "2026-06", "forecast": 108000, "lower": 99000, "upper": 117000 }
    ],
    "modelUpdated": "2026-04-20T02:00:00Z"
  }
}
```

### Campaign List
```json
{
  "success": true,
  "data": {
    "campaigns": [
      {
        "id": "uuid",
        "name": "Summer Sale 2026",
        "startDate": "2026-06-01",
        "endDate": "2026-06-30",
        "cost": 50000.00,
        "revenue": 125000.00,
        "roi": 1.5,
        "status": "active"
      }
    ],
    "total": 12
  }
}
```

---

## Appendix B: Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/bi_warehouse
MONGODB_URL=mongodb://localhost:27017/ecommerce
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_ENV=development
```

---

*Document Version: 1.0*
*Last Updated: 2026-04-21*
*Project: Business Intelligence Platform for E-Commerce*
