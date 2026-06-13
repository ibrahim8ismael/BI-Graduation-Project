"use client";

import { useCallback, useState } from "react";
import { forecastRevenue, predictCategory, segmentCustomer } from "@/lib/api";

function useMLAction(action) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (payload) => {
      setLoading(true);
      setError(null);

      try {
        const result = await action(payload);
        setData(result);
        return result;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unexpected request failure";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [action],
  );

  return { data, loading, error, execute };
}

export function usePredictCategory() {
  return useMLAction(predictCategory);
}

export function useSegmentCustomer() {
  return useMLAction(segmentCustomer);
}

export function useForecastRevenue() {
  return useMLAction(forecastRevenue);
}

export function useMLEndpoint(endpoint) {
  const actionMap = {
    "predict-category": predictCategory,
    "segment-customer": segmentCustomer,
    "forecast-revenue": forecastRevenue,
  };
  return useMLAction(actionMap[endpoint]);
}
