import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans">
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-12 px-16 py-section">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-5xl font-semibold leading-tight tracking-tight text-ink sm:text-6xl">
            Go to market with unique data
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-body">
            Flowtic helps GTM teams find, enrich, and activate data that drives pipeline.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/login"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            Get started
          </Link>
          <Link
            href="/login"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-hairline bg-background px-5 py-3 text-sm font-semibold text-ink transition-all hover:bg-accent hover:text-accent-foreground"
          >
            Sign in
          </Link>
        </div>
      </main>
    </div>
  );
}
