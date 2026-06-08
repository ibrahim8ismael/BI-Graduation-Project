bi-ecommerce-platform/
│
├── 📁 backend/                          # FastAPI Backend
│   ├── 📁 app/
│   │   ├── __init__.py
│   │   ├── main.py                      # Entry point
│   │   ├── config.py                    # Settings & env vars
│   │   ├── database.py                  # DB connections (MongoDB + PostgreSQL)
│   │   │
│   │   ├── 📁 api/                      # API Routes
│   │   │   ├── __init__.py
│   │   │   ├── auth.py                  # Login, JWT, roles
│   │   │   ├── ceo.py                   # CEO Dashboard endpoints
│   │   │   ├── product_manager.py       # PM Dashboard endpoints
│   │   │   ├── marketer.py              # Marketer Dashboard endpoints
│   │   │   ├── campaigns.py             # Campaign CRUD
│   │   │   ├── ml.py                    # ML predictions API
│   │   │   └── reports.py               # Export PDF/Excel
│   │   │
│   │   ├── 📁 models/                   # SQLAlchemy Models (PostgreSQL)
│   │   │   ├── __init__.py
│   │   │   ├── customer.py
│   │   │   ├── order.py
│   │   │   ├── product.py
│   │   │   ├── order_item.py
│   │   │   ├── campaign.py
│   │   │   ├── review.py
│   │   │   └── daily_metrics.py
│   │   │
│   │   ├── 📁 schemas/                  # Pydantic Schemas (Request/Response)
│   │   │   ├── __init__.py
│   │   │   ├── auth.py
│   │   │   ├── dashboard.py
│   │   │   ├── campaign.py
│   │   │   └── ml.py
│   │   │
│   │   ├── 📁 services/                 # Business Logic
│   │   │   ├── __init__.py
│   │   │   ├── auth_service.py
│   │   │   ├── ceo_service.py
│   │   │   ├── pm_service.py
│   │   │   ├── marketer_service.py
│   │   │   ├── campaign_service.py
│   │   │   └── report_service.py
│   │   │
│   │   ├── 📁 ml/                       # Machine Learning
│   │   │   ├── __init__.py
│   │   │   ├── revenue_forecast.py      # Prophet/ARIMA
│   │   │   ├── product_prediction.py    # Random Forest/XGBoost
│   │   │   ├── customer_segmentation.py # K-Means
│   │   │   ├── churn_prediction.py      # Optional
│   │   │   └── utils.py                 # Preprocessing helpers
│   │   │
│   │   └── 📁 core/                     # Security & Middleware
│   │       ├── __init__.py
│   │       ├── security.py              # Password hashing, JWT
│   │       ├── dependencies.py          # Role checking
│   │       └── exceptions.py            # Custom errors
│   │
│   ├── 📁 tests/
│   │   ├── __init__.py
│   │   ├── test_auth.py
│   │   ├── test_ceo.py
│   │   ├── test_pm.py
│   │   └── test_marketer.py
│   │
│   ├── 📁 alembic/                      # Database migrations
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
│
├── 📁 frontend/                         # React.js Frontend
│   ├── 📁 public/
│   │   ├── index.html
│   │   └── favicon.ico
│   │
│   ├── 📁 src/
│   │   ├── index.js
│   │   ├── App.js
│   │   ├── setupTests.js
│   │   │
│   │   ├── 📁 components/               # Reusable Components
│   │   │   ├── Layout/
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── DashboardLayout.jsx
│   │   │   ├── Charts/
│   │   │   │   ├── RevenueChart.jsx
│   │   │   │   ├── OrderTrendChart.jsx
│   │   │   │   ├── CategoryChart.jsx
│   │   │   │   ├── CampaignChart.jsx
│   │   │   │   └── ForecastChart.jsx
│   │   │   ├── Tables/
│   │   │   │   ├── DataTable.jsx
│   │   │   │   └── CampaignTable.jsx
│   │   │   └── Common/
│   │   │       ├── LoadingSpinner.jsx
│   │   │       ├── ErrorBoundary.jsx
│   │   │       └── ProtectedRoute.jsx
│   │   │
│   │   ├── 📁 pages/                    # Page Views
│   │   │   ├── Login.jsx
│   │   │   ├── 📁 CEO/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── FinancialOverview.jsx
│   │   │   │   ├── PerformanceHighlights.jsx
│   │   │   │   └── MLForecasts.jsx
│   │   │   ├── 📁 ProductManager/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── ProductPerformance.jsx
│   │   │   │   ├── TrendAnalytics.jsx
│   │   │   │   └── PredictiveAnalytics.jsx
│   │   │   ├── 📁 Marketer/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── CampaignManagement.jsx
│   │   │   │   ├── CampaignAnalytics.jsx
│   │   │   │   ├── CustomerInsights.jsx
│   │   │   │   └── ProductEffectiveness.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── 📁 hooks/                    # Custom React Hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useFetch.js
│   │   │   └── useDashboard.js
│   │   │
│   │   ├── 📁 services/                 # API Calls
│   │   │   ├── api.js                   # Axios instance
│   │   │   ├── authService.js
│   │   │   ├── ceoService.js
│   │   │   ├── pmService.js
│   │   │   ├── marketerService.js
│   │   │   └── reportService.js
│   │   │
│   │   ├── 📁 context/                  # React Context
│   │   │   ├── AuthContext.js
│   │   │   └── ThemeContext.js
│   │   │
│   │   ├── 📁 styles/                   # CSS/SCSS
│   │   │   ├── global.css
│   │   │   ├── variables.css
│   │   │   └── dashboard.css
│   │   │
│   │   └── 📁 utils/                    # Helpers
│   │       ├── formatters.js            # Date, currency formatting
│   │       ├── constants.js             # App constants
│   │       └── validators.js
│   │
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
│
├── 📁 etl/                              # ETL Pipeline
│   ├── 📁 extract/
│   │   ├── __init__.py
│   │   ├── mongodb_extractor.py         # Pull from MongoDB
│   │   └── api_extractor.py             # Optional: API sources
│   │
│   ├── 📁 transform/
│   │   ├── __init__.py
│   │   ├── cleaners.py                  # Data cleaning
│   │   ├── normalizers.py               # Table normalization
│   │   ├── encoders.py                  # Categorical encoding
│   │   └── validators.py                # Data validation
│   │
│   ├── 📁 load/
│   │   ├── __init__.py
│   │   ├── postgres_loader.py           # Load to PostgreSQL
│   │   └── bulk_inserter.py             # Bulk operations
│   │
│   ├── 📁 config/
│   │   └── etl_config.py                # Pipeline settings
│   │
│   ├── main.py                          # ETL runner
│   ├── scheduler.py                     # Cron/Airflow scheduler
│   ├── requirements.txt
│   └── Dockerfile
│
├── 📁 data/                             # Data Files
│   ├── 📁 raw/                          # Original data
│   ├── 📁 processed/                    # Cleaned data
│   ├── 📁 synthetic/                    # Generated fake data
│   │   └── generate_data.py             # Faker script
│   └── 📁 seeds/                        # Seed data for testing
│
├── 📁 ml/                               # ML Models (Standalone)
│   ├── 📁 notebooks/                    # Jupyter Notebooks
│   │   ├── 01_eda.ipynb                 # Exploratory Data Analysis
│   │   ├── 02_revenue_forecast.ipynb
│   │   ├── 03_product_prediction.ipynb
│   │   ├── 04_customer_segmentation.ipynb
│   │   └── 05_model_evaluation.ipynb
│   │
│   ├── 📁 models/                       # Saved Models (pickle/joblib)
│   │   ├── revenue_forecaster.pkl
│   │   ├── product_predictor.pkl
│   │   └── customer_segmenter.pkl
│   │
│   ├── 📁 scripts/                      # Training Scripts
│   │   ├── train_revenue_model.py
│   │   ├── train_product_model.py
│   │   └── train_segmentation.py
│   │
│   ├── 📁 data/                         # ML datasets
│   ├── requirements.txt
│   └── Dockerfile
│
├── 📁 database/                         # Database Scripts
│   ├── 📁 mongodb/
│   │   ├── init.js                      # MongoDB initialization
│   │   └── schema.js                    # Collection schemas
│   │
│   ├── 📁 postgres/
│   │   ├── 001_init.sql                 # Create tables
│   │   ├── 002_seed_data.sql            # Sample data
│   │   ├── 003_indexes.sql              # Performance indexes
│   │   └── 004_views.sql                # Analytics views
│   │
│   └── docker-compose.db.yml            # DB services only
│
├── 📁 docs/                             # Documentation
│   ├── 📁 architecture/
│   │   ├── system_diagram.png
│   │   ├── data_flow.png
│   │   └── er_diagram.png
│   │
│   ├── 📁 api/
│   │   └── openapi.yaml                 # API documentation
│   │
│   ├── 📁 reports/
│   │   └── graduation_report.md         # Your thesis doc
│   │
│   └── README.md
│
├── 📁 deployment/                       # Deployment Configs
│   ├── docker-compose.yml               # Full stack
│   ├── docker-compose.dev.yml           # Development
│   ├── nginx/
│   │   └── nginx.conf                   # Reverse proxy
│   └── 📁 k8s/                          # Kubernetes (optional)
│       ├── backend-deployment.yaml
│       ├── frontend-deployment.yaml
│       └── ingress.yaml
│
├── 📁 scripts/                          # Utility Scripts
│   ├── setup.sh                         # Initial setup
│   ├── run_etl.sh                       # Run ETL manually
│   ├── run_tests.sh                     # Run all tests
│   └── seed_db.sh                       # Seed databases
│
├── .gitignore
├── README.md                            # Main project README
├── Makefile                             # Common commands
└── docker-compose.yml                   # Root compose file