import Link from "next/link";
import { Logo } from "@/components/logo";
import { submitDemoRequest } from "./actions";

function DemoForm() {
  return (
    <form
      action={submitDemoRequest}
      className="flex flex-col gap-5 rounded-2xl border border-hairline bg-background p-8 sm:p-10"
    >
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Free &bull; No commitment
        </span>
        <h2 className="text-2xl font-semibold text-ink">Book a demo</h2>
        <p className="text-sm text-body">
          Tell us about your business and we will show you what Runner can do.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="name" className="text-sm font-medium text-ink">
            Full name <span className="text-destructive">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Smith"
            className="h-11 w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-ink outline-none transition-[color,box-shadow] placeholder:text-muted-soft focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-ink">
            Email <span className="text-destructive">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            className="h-11 w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-ink outline-none transition-[color,box-shadow] placeholder:text-muted-soft focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="company" className="text-sm font-medium text-ink">
            Company <span className="text-destructive">*</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            placeholder="Acme Inc."
            className="h-11 w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-ink outline-none transition-[color,box-shadow] placeholder:text-muted-soft focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="size" className="text-sm font-medium text-ink">
            Company size
          </label>
          <select
            id="size"
            name="size"
            className="h-11 w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-ink outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <option value="">Select size</option>
            <option value="1-10">1&ndash;10 employees</option>
            <option value="11-50">11&ndash;50 employees</option>
            <option value="51-200">51&ndash;200 employees</option>
            <option value="200+">200+ employees</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="industry" className="text-sm font-medium text-ink">
            Industry
          </label>
          <select
            id="industry"
            name="industry"
            className="h-11 w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-ink outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <option value="">Select industry</option>
            <option value="ecommerce">E-commerce</option>
            <option value="retail">Retail</option>
            <option value="saas">SaaS</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="message" className="text-sm font-medium text-ink">
            What are you looking for?
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Tell us about your data stack, team size, or any specific challenges..."
            className="w-full resize-y rounded-md border border-input bg-background px-4 py-3 text-sm text-ink outline-none transition-[color,box-shadow] placeholder:text-muted-soft focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
      >
        Submit
      </button>
    </form>
  );
}

function SuccessState() {
  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl border border-hairline bg-background p-10 text-center sm:p-16">
      <div className="flex size-16 items-center justify-center rounded-full bg-success/10">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-success"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-ink">Thanks, we will be in touch</h2>
        <p className="max-w-sm text-sm text-body">
          A member of our team will reach out within 24 hours to schedule your
          personalized demo.
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-hairline bg-background px-6 py-3 text-sm font-semibold text-ink transition-all hover:bg-accent hover:text-accent-foreground"
      >
        Back to home
      </Link>
    </div>
  );
}

export default function BookDemoPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <nav className="flex items-center justify-between px-6 py-4 md:px-12 lg:px-24">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-6 w-auto text-ink" />
        </Link>
        <Link
          href="/login"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-ink"
        >
          Sign in
        </Link>
      </nav>

      <main className="flex flex-1 items-center justify-center px-6 py-section md:px-12 lg:px-24">
        <div className="w-full max-w-lg">
          <SearchParamSuccess searchParams={searchParams} />
        </div>
      </main>

      <footer className="flex flex-col items-center gap-6 bg-surface-soft px-6 py-12 md:px-12 lg:px-24">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-5 w-auto text-ink" />
        </Link>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Runner. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

async function SearchParamSuccess({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const params = await searchParams;
  return params.success === "true" ? <SuccessState /> : <DemoForm />;
}
