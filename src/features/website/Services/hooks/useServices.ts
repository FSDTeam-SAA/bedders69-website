"use client";

import { useState, useEffect, useCallback } from "react";
import servicesApi from "../api/servicesApi";
import {
  ApiMeta,
  CareCompanyItem,
  CareCompanySearchParams,
} from "../types/services.types";

export function useCareCompanies(
  params: CareCompanySearchParams = { limit: 50, page: 1 }
) {
  const [companies, setCompanies] = useState<CareCompanyItem[]>([]);
  const [meta, setMeta] = useState<ApiMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await servicesApi.getCareCompanies(params);
      if (response && response.data) {
        setCompanies(response.data);
        if (response.meta) {
          setMeta(response.meta);
        }
      }
    } catch (err: any) {
      console.error("Error fetching care companies in Services module:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load care companies"
      );
    } finally {
      setIsLoading(false);
    }
  }, [params.limit, params.page, params.search, params.postCode, params.sortBy, params.sortOrder]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return {
    companies,
    meta,
    isLoading,
    error,
    refetch: fetchCompanies,
  };
}
