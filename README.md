# BI E-Commerce Platform

A full-stack business intelligence platform for e-commerce analytics with role-based dashboards, automated ETL pipelines, and machine learning forecasting.

## Architecture

```
Data Generation → MongoDB → ETL Pipeline → PostgreSQL → FastAPI → Next.js UI
                                        ↘            ↗
                                     ML Models (Prophet, RF, K-Means)
```

### Data Pipeline
1. **Synthetic Data Generation** — Python + Faker generates realistic e-commerce data (users, orders, products, reviews, campaigns, transactions)
2. **MongoDB** — Operational document store for raw data
3. **ETL Pipeline** — Extract from MongoDB, transform with pandas, load into PostgreSQL (runs daily via cron/Airflow)
4. **PostgreSQL** — Data warehouse with optimized analytics tables, indexes, and views

### Machine Learning
| Model | Algorithm | Purpose |
|---|---|---|
| Revenue Forecast | Prophet / ARIMA | Predict revenue trends |
| Product Prediction | Random Forest / XGBoost | Forecast product demand |
| Customer Segmentation | K-Means | Cluster customers by behavior |

Models are trained periodically, serialized as `.pkl`, and served via the backend API.

### Backend (FastAPI)
- **REST API** serving dashboard endpoints per role
- **JWT auth** with 3 roles (CEO, Product Manager, Marketer)
- **ML inference** endpoints for real-time predictions
- **Campaign CRUD** — interactive campaigns (differentiator from Power BI-only)
- **Report export** — PDF / Excel generation

### Frontend (Next.js)
Role-specific dashboards with:
- **CEO** — Financial overview, revenue forecasts (ML API), performance highlights
- **Product Manager** — Product analytics, trend analysis, predictive insights
- **Marketer** — Campaign management & analytics, customer insights, product effectiveness

## Design System

Inspired by clay.com's warm, playful B2B aesthetic. Cream-tinted canvas (`#fffaf0`), dark-navy ink type, saturated 6-color brand palette (pink, teal, lavender, peach, ochre, mint), rounded surfaces (12–24px), and Inter typography.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Recharts |
| Backend | FastAPI, SQLAlchemy, Pydantic, Alembic |
| Database | MongoDB (operational), PostgreSQL (warehouse) |
| ML | Python, scikit-learn, Prophet, Jupyter |
| Auth | JWT (jose), httpOnly cookies, role-based |
| BI | Power BI (direct connection to PostgreSQL) |
| Infra | Docker, Docker Compose, Nginx, optional Kubernetes |

## Getting Started

### Frontend

```bash
cd client
npm install
npm run dev
```

Open http://localhost:3000.

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Full Stack

```bash
docker-compose up --build
```

## Project Structure

```
├── client/          Next.js frontend
├── backend/         FastAPI REST API
├── etl/             ETL pipeline (extract → transform → load)
├── ml/              ML notebooks, training scripts, saved models
├── data/            Raw, processed, and synthetic data
├── database/        MongoDB schemas, PostgreSQL migrations, seed data
├── deployment/      Docker, Nginx, Kubernetes configs
├── docs/            Architecture docs, API spec, graduation report
└── scripts/         Setup, ETL, test, seed utilities
```
