# 📊 Runner: Role-Based E-commerce BI Dashboards

## 🎯 Project Overview
This repository contains the Power BI implementation for **Runner**, an E-commerce Business Intelligence SaaS platform tailored for Small and Medium Businesses (SMBs) in the MENA region. 

To bridge the analytical gap and prevent data overload, we implemented a **Role-Based Analytics Architecture**. The system provides three distinct, tailored dashboards ensuring that each decision-maker—**CEO, Marketing Manager, and Product Manager**—sees only the KPIs and insights relevant to their specific use cases.

---

## 🛠️ Data Preparation & ETL (Power Query)
Before building the visuals, the raw dataset (`sales_06_FY2020-21_cleaned.csv` containing ~286K records) underwent crucial transformations using **Power Query**:
* **Data Cleaning:** Handled missing values (`Nulls`), standardized date formats, and corrected data types to prevent calculation errors.
* **Feature Engineering (Data Enrichment):**
  * Extracted specific `Month` and `Year` from order dates for Time-Intelligence analysis.
  * Created a conditional `Campaign_Name` column based on purchase dates (e.g., assigning November sales to "Black Friday Promo") to enable marketing tracking.

---

## 📈 The Dashboards & Use Cases

### 1. 🏢 CEO Dashboard (The Executive View)
**Goal:** Provide a high-level overview of the company's financial health, overall growth, and future forecasting.
* **Key Metrics (DAX Measures):** * `Total Revenue`: Overall financial intake.
  * `Total Orders`: Volume of successful transactions.
  * `Average Order Value (AOV)`: `DIVIDE([Total Revenue], [Total Orders], 0)`
* **Visual Insights Implemented:**
  * **Revenue Forecast (Predictive Analytics):** Utilized Power BI's built-in Machine Learning *Forecast* feature on Line Charts to predict future revenue trends based on historical data.
  * **Top & Worst Performers:** Bar and Column charts pinpointing the highest and lowest performing days and product categories at a glance.

### 2. 🎯 Marketing Manager Dashboard (The Campaign View)
**Goal:** Track campaign ROI, customer acquisition, and segment behavior to optimize marketing spend.
* **Key Metrics (DAX Measures):**
  * `Campaign Revenue` & `Campaign Net Profit`.
  * `Return on Investment (ROI %)`: Measures profitability of each marketing effort.
  * `Cost Per Acquisition (CPA)`: Evaluates marketing efficiency.
* **Visual Insights Implemented:**
  * **Campaign Effectiveness:** Clustered Bar Charts comparing different campaigns against their generated revenue.
  * **Customer Insights:** Interactive Maps (based on customer `City`/`State`) and Donut charts mapping revenue distribution to see where the most profitable customers are located during specific campaigns.

### 3. 📦 Product Manager Dashboard (The Inventory View)
**Goal:** Monitor product lifecycle, identify category trends, and forecast future product demand to avoid stockouts or dead stock.
* **Key Metrics & Visuals:**
  * **Category Performance Matrix:** Clustered Bar charts clearly ranking the `Top Performing Category` down to the `Underperforming Category`.
  * **Sales Trend Per Category:** A Line Chart utilizing the `Category` field as a legend, allowing the manager to track which product types are trending upwards or downwards over time.
  * **Product Performance Prediction:** Leveraging predictive line charts to forecast the future demand for specific categories.

---

## 🔐 Security & Access Control
To strictly enforce the Use Case boundaries (ensuring the Product Manager doesn't see Marketing Ad Spends, and the Marketer doesn't see overall net margins), the `.pbix` file is designed to integrate with **Row-Level Security (RLS)**.
* Specific Roles (`CEO_Role`, `Marketer_Role`, `Product_Role`) are defined.
* When integrated into the React Front-End via **Power BI Embedded**, the user's authentication token dynamically filters the dataset and pages so they only interact with their designated Use Cases.

---

## 🚀 How to Run
1. Download and install [Power BI Desktop](https://powerbi.microsoft.com/desktop/).
2. Clone this repository and open the `Runner_Dashboards.pbix` file.
3. If prompted for the dataset, update the Data Source Settings to point to your local `sales_06_FY2020-21_cleaned.csv` file.
4. Navigate through the page tabs at the bottom to view the different role-based dashboards.

---
