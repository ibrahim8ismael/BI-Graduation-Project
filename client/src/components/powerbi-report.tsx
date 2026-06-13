"use client";

import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

export function PowerBiReport({
  accessToken,
  embedUrl,
  reportId,
  pageName,
}: {
  accessToken: string;
  embedUrl: string;
  reportId: string;
  pageName?: string;
}) {
  return (
    <PowerBIEmbed
      embedConfig={{
        type: "report",
        id: reportId,
        embedUrl,
        accessToken,
        tokenType: models.TokenType.Embed,
        pageName,
        settings: {
          panes: {
            pageNavigation: { visible: false },
            filters: { visible: false },
          },
        },
      }}
      cssClassName="h-full w-full"
    />
  );
}
