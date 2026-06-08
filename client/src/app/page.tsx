import Link from "next/link";
import { Logo } from "@/components/logo";

const stats = [
  { label: "Total Revenue", value: "$284,920" },
  { label: "Orders", value: "1,842" },
  { label: "Avg. Order Value", value: "$154.70" },
  { label: "Active Customers", value: "3,214" },
] as const;

const achievements = [
  { value: "10K+", label: "Orders analyzed" },
  { value: "3", label: "Data sources" },
  { value: "85%", label: "Forecast accuracy" },
  { value: "Real-time", label: "Dashboard updates" },
] as const;

const pipelineSteps = [
  {
    number: "01",
    title: "E-commerce Data",
    desc: "Connect your store — orders, products, customers, and campaigns.",
  },
  {
    number: "02",
    title: "MongoDB",
    desc: "Raw data lands in MongoDB for flexible, fast ingestion.",
  },
  {
    number: "03",
    title: "ETL Pipeline",
    desc: "Python-based pipeline cleans, normalizes, and enriches daily.",
  },
  {
    number: "04",
    title: "PostgreSQL",
    desc: "Structured analytics warehouse optimized for fast queries.",
  },
  {
    number: "05",
    title: "ML Models",
    desc: "Prophet, Random Forest, and K-Means train on your data.",
  },
  {
    number: "06",
    title: "Dashboards",
    desc: "Role-based views surface the metrics that matter to you.",
  },
] as const;

const features = [
  {
    title: "Revenue & Forecasting",
    tagline: "CEO Dashboard",
    description:
      "Financial KPIs, revenue trends, and ML-powered forecasts that predict where your business is heading — so you can act before the quarter ends.",
    color: "bg-brand-teal",
    textColor: "text-on-dark",
    chart: (
      <svg viewBox="0 0 240 80" className="w-full h-20" aria-hidden>
        <defs>
          <linearGradient id="ceo-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 70 L10 60 L30 65 L50 40 L70 45 L90 25 L110 30 L130 15 L150 20 L170 8 L190 12 L210 5 L230 10 L240 8 L240 80 L0 80 Z"
          fill="url(#ceo-fill)"
          className="text-white/60"
        />
        <path
          d="M0 70 L10 60 L30 65 L50 40 L70 45 L90 25 L110 30 L130 15 L150 20 L170 8 L190 12 L210 5 L230 10 L240 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-white"
        />
        <circle cx="240" cy="8" r="3" className="fill-white" />
      </svg>
    ),
  },
  {
    title: "Product Intelligence",
    tagline: "Product Manager Dashboard",
    description:
      "Category performance, trend analysis, and demand prediction — surface which products drive margin and which need attention before inventory stacks up.",
    color: "bg-brand-lavender",
    textColor: "text-ink",
    chart: (
      <svg viewBox="0 0 240 80" className="w-full h-20" aria-hidden>
        <circle
          cx="120"
          cy="40"
          r="32"
          fill="none"
          stroke="currentColor"
          strokeWidth="14"
          strokeDasharray="100 100"
          className="text-ink/10"
        />
        <circle
          cx="120"
          cy="40"
          r="32"
          fill="none"
          stroke="currentColor"
          strokeWidth="14"
          strokeDasharray="45 155"
          strokeDashoffset="-10"
          className="text-ink/80"
        />
        <circle
          cx="120"
          cy="40"
          r="32"
          fill="none"
          stroke="currentColor"
          strokeWidth="14"
          strokeDasharray="25 175"
          strokeDashoffset="-57"
          className="text-ink/50"
        />
        <circle
          cx="120"
          cy="40"
          r="32"
          fill="none"
          stroke="currentColor"
          strokeWidth="14"
          strokeDasharray="18 182"
          strokeDashoffset="-83"
          className="text-ink/20"
        />
      </svg>
    ),
  },
  {
    title: "Campaign Analytics",
    tagline: "Marketer Dashboard",
    description:
      "Campaign ROI, customer segmentation, and real-time conversion tracking — build campaigns, measure impact, and double down on what works.",
    color: "bg-brand-pink",
    textColor: "text-on-dark",
    chart: (
      <svg viewBox="0 0 240 80" className="w-full h-20" aria-hidden>
        <defs>
          <linearGradient id="mkt-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 75 L15 70 L30 72 L50 60 L65 55 L80 40 L95 35 L110 25 L125 28 L140 18 L155 22 L170 10 L185 15 L200 8 L215 12 L230 6 L240 10 L240 80 L0 80 Z"
          fill="url(#mkt-fill)"
          className="text-white/60"
        />
        <path
          d="M0 75 L15 70 L30 72 L50 60 L65 55 L80 40 L95 35 L110 25 L125 28 L140 18 L155 22 L170 10 L185 15 L200 8 L215 12 L230 6 L240 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-white"
        />
        <circle cx="240" cy="10" r="3" className="fill-white" />
      </svg>
    ),
  },
] as const;

const mlModels = [
  {
    name: "Revenue Forecast",
    algorithm: "Prophet",
    description:
      "Predicts future revenue trends using historical data with seasonal decomposition. Identifies growth patterns and flags anomalies before they impact your bottom line.",
    accuracy: "85%+",
    metric: "forecast accuracy",
  },
  {
    name: "Product Prediction",
    algorithm: "Random Forest",
    description:
      "Forecasts product demand across categories. Helps inventory planning, identifies rising stars, and prevents overstock before it eats margins.",
    accuracy: "82%",
    metric: "demand accuracy",
  },
  {
    name: "Customer Segmentation",
    algorithm: "K-Means",
    description:
      "Clusters customers by purchase behavior, lifetime value, and engagement. Enables targeted campaigns and personalized recommendations at scale.",
    accuracy: "4",
    metric: "distinct segments",
  },
] as const;

const faqs = [
  {
    q: "What is Runner?",
    a: "Runner is a business intelligence platform built for e-commerce GTM teams. It unifies data from your store into a single analytics warehouse, runs ML models on top, and surfaces insights through role-specific dashboards.",
  },
  {
    q: "Who is Runner for?",
    a: "Runner is designed for CEOs, Product Managers, and Marketers who need data-driven decisions. Each role gets a tailored dashboard — financial forecasts for executives, product intelligence for PMs, and campaign analytics for marketers.",
  },
  {
    q: "What data sources are supported?",
    a: "Runner connects to MongoDB where your e-commerce data lives — orders, products, customers, reviews, and campaigns. The ETL pipeline then processes this into our analytics warehouse (PostgreSQL).",
  },
  {
    q: "How does the machine learning work?",
    a: "Three models run on your data: Prophet for revenue forecasting, Random Forest for product demand prediction, and K-Means for customer segmentation. Models retrain periodically and serve predictions through the dashboard.",
  },
  {
    q: "Do I need technical skills to use it?",
    a: "Not for the dashboards. The platform handles the pipeline and ML automatically. Campaign creation and data exploration are designed for non-technical users.",
  },
  {
    q: "How do I get started?",
    a: "Book a demo and we will walk you through connecting your data, setting up the pipeline, and customizing your dashboards. No commitment required.",
  },
] as const;

function NavBar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 md:px-12 lg:px-24">
      <Link href="/" className="flex items-center gap-2">
        <Logo className="h-6 w-auto text-ink" />
      </Link>
      <div className="hidden items-center gap-6 sm:flex">
        <Link
          href="#features"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-ink"
        >
          Features
        </Link>
        <Link
          href="#how-it-works"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-ink"
        >
          How it works
        </Link>
        <Link
          href="#faq"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-ink"
        >
          FAQ
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-ink"
        >
          Sign in
        </Link>
        <Link
          href="/book-demo"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
        >
          Book a demo
        </Link>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="flex flex-col items-center px-6 pt-16 pb-section md:px-12 lg:px-24">
      <div className="flex max-w-3xl flex-col items-center gap-6 text-center">
        <h1 className="text-5xl font-semibold leading-tight tracking-tight text-ink sm:text-6xl lg:text-7xl lg:tracking-[-1.5px]">
          Go to market with data that works
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-body">
          Runner helps GTM teams unify e-commerce data, uncover revenue insights,
          and activate AI-powered forecasts — all in one platform.
        </p>
        <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row">
          <Link
            href="/book-demo"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 sm:w-auto"
          >
            Book a demo
          </Link>
          <Link
            href="#features"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-hairline bg-background px-6 py-3 text-sm font-semibold text-ink transition-all hover:bg-accent hover:text-accent-foreground sm:w-auto"
          >
            See dashboards
          </Link>
        </div>
      </div>

      <div className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-1 rounded-xl bg-surface-card px-5 py-4"
          >
            <span className="text-xs font-medium text-muted">{stat.label}</span>
            <span className="text-xl font-semibold tabular-nums text-ink">
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatsBarSection() {
  return (
    <section className="border-y border-hairline bg-surface-card/50 px-6 py-12 md:px-12 lg:px-24">
      <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
        {achievements.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-1 text-center">
            <span className="text-3xl font-semibold tabular-nums text-ink">
              {item.value}
            </span>
            <span className="text-sm text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="flex flex-col items-center gap-12 px-6 py-section md:px-12 lg:px-24"
    >
      <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
        <span className="inline-flex rounded-full border border-hairline bg-surface-card px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Pipeline
        </span>
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          From raw data to actionable insights
        </h2>
        <p className="text-body">
          Your data flows through an automated pipeline — no manual exports or
          spreadsheet wrangling.
        </p>
      </div>

      <div className="grid w-full max-w-5xl gap-4 md:grid-cols-6 md:gap-0">
        {pipelineSteps.map((step, index) => (
          <div key={step.number} className="relative flex flex-col items-center">
            <div className="flex w-full flex-col items-center gap-3 px-3 text-center">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {step.number}
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-ink">{step.title}</span>
                <span className="text-xs leading-relaxed text-muted-foreground">
                  {step.desc}
                </span>
              </div>
            </div>
            {index < pipelineSteps.length - 1 && (
              <span
                className="hidden text-2xl text-muted-foreground/40 md:absolute md:-right-3 md:top-5 md:flex"
                aria-hidden
              >
                &rarr;
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:gap-8">
        {[
          { src: "MongoDB", label: "Operational DB" },
          { src: "Python", label: "ETL Pipeline" },
          { src: "PostgreSQL", label: "Data Warehouse" },
          { src: "scikit-learn", label: "ML Models" },
          { src: "Next.js", label: "Dashboards" },
        ].map((tech) => (
          <span
            key={tech.src}
            className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-card px-4 py-2 text-xs font-medium text-muted-foreground"
          >
            {tech.src}
            <span className="text-muted-soft">&bull;</span>
            <span>{tech.label}</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section
      id="features"
      className="flex flex-col items-center gap-12 px-6 py-section md:px-12 lg:px-24"
    >
      <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
        <span className="inline-flex rounded-full border border-hairline bg-surface-card px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Dashboards
        </span>
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Built for every role
        </h2>
        <p className="text-body">
          Each dashboard surfaces the metrics that matter — from executive
          strategy to campaign execution.
        </p>
      </div>

      <div className="grid w-full max-w-5xl gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className={`flex flex-col gap-5 rounded-2xl ${feature.color} p-8 ${feature.textColor}`}
          >
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider opacity-60">
                {feature.tagline}
              </span>
              <h3 className="text-xl font-semibold tracking-tight">
                {feature.title}
              </h3>
            </div>
            <p className="text-sm leading-relaxed opacity-80">
              {feature.description}
            </p>
            <div className="mt-auto">{feature.chart}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

function MLCapabilitiesSection() {
  return (
    <section
      id="ml-capabilities"
      className="flex flex-col items-center gap-12 bg-surface-card/30 px-6 py-section md:px-12 lg:px-24"
    >
      <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
        <span className="inline-flex rounded-full border border-hairline bg-surface-card px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Machine Learning
        </span>
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Predict. Segment. Optimize.
        </h2>
        <p className="text-body">
          Three models trained on your data to forecast revenue, predict demand,
          and segment customers automatically.
        </p>
      </div>

      <div className="grid w-full max-w-5xl gap-6 md:grid-cols-3">
        {mlModels.map((model) => (
          <article
            key={model.name}
            className="flex flex-col gap-4 rounded-2xl border border-hairline bg-background p-8"
          >
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-ochre">
                {model.algorithm}
              </span>
              <h3 className="text-lg font-semibold text-ink">{model.name}</h3>
            </div>
            <p className="text-sm leading-relaxed text-body">{model.description}</p>
            <div className="mt-auto flex items-baseline gap-1.5 rounded-lg bg-surface-card px-4 py-3">
              <span className="text-2xl font-semibold tabular-nums text-ink">
                {model.accuracy}
              </span>
              <span className="text-xs text-muted-foreground">{model.metric}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section
      id="faq"
      className="flex flex-col items-center gap-12 px-6 py-section md:px-12 lg:px-24"
    >
      <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Frequently asked questions
        </h2>
      </div>

      <div className="w-full max-w-2xl divide-y divide-hairline">
        {faqs.map((faq) => (
          <details key={faq.q} className="group cursor-pointer py-5">
            <summary className="flex items-center justify-between text-sm font-medium text-ink">
              {faq.q}
              <span className="ml-4 text-lg text-muted-foreground transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-body">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="px-6 py-section md:px-12 lg:px-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-2xl bg-surface-soft px-8 py-16 text-center sm:px-16">
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Ready to find your next growth lever?
        </h2>
        <p className="max-w-md text-body">
          Connect your data, get instant dashboards, and let ML find the
          opportunities you are missing.
        </p>
        <Link
          href="/book-demo"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
        >
          Book a demo
        </Link>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="flex flex-col items-center gap-6 bg-surface-soft px-6 py-12 md:px-12 lg:px-24">
      <Link href="/" className="flex items-center gap-2">
        <Logo className="h-5 w-auto text-ink" />
      </Link>
      <p className="text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Runner. All rights reserved.
      </p>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <NavBar />
      <main className="flex flex-1 flex-col">
        <HeroSection />
        <StatsBarSection />
        <HowItWorksSection />
        <FeaturesSection />
        <MLCapabilitiesSection />
        <FaqSection />
        <CtaSection />
      </main>
      <FooterSection />
    </div>
  );
}
