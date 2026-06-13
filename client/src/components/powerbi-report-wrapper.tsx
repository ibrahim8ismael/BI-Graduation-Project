"use client";

import dynamic from "next/dynamic";

const PowerBiReportInner = dynamic(
  () => import("./powerbi-report").then((m) => m.PowerBiReport),
  { ssr: false, loading: () => <div className="flex h-full w-full items-center justify-center rounded-xl bg-surface-card"><p className="text-sm text-muted-foreground">Loading report&hellip;</p></div> }
);

export function PowerBiReport(props: {
  accessToken: string;
  embedUrl: string;
  reportId: string;
  pageName?: string;
}) {
  return <PowerBiReportInner {...props} />;
}
