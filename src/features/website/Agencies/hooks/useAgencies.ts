"use client";

import { useState, useEffect, useCallback } from "react";
import agenciesApi from "../api/agenciesApi";
import {
  ApiMeta,
  AgencyItem,
  AgencySearchParams,
} from "../types/agencies.types";

export function useAgencies(
  params: AgencySearchParams = { limit: 50, page: 1 }
) {
  const [agencies, setAgencies] = useState<AgencyItem[]>([]);
  const [meta, setMeta] = useState<ApiMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAgencies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await agenciesApi.getAgencies(params);
      if (response && response.data) {
        setAgencies(response.data);
        if (response.meta) {
          setMeta(response.meta);
        }
      }
    } catch (err: any) {
      console.error("Error fetching agencies in Agencies module:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load agencies"
      );
    } finally {
      setIsLoading(false);
    }
  }, [params.limit, params.page, params.search, params.city, params.postCode, params.sortBy, params.sortOrder]);

  useEffect(() => {
    fetchAgencies();
  }, [fetchAgencies]);

  return {
    agencies,
    meta,
    isLoading,
    error,
    refetch: fetchAgencies,
  };
}
