"use client";

import { useState, useEffect, useCallback } from "react";
import findCareApi from "../api/findCareApi";
import {
  ApiMeta,
  CarerItem,
  CarerSearchParams,
} from "../types/findCare.types";

export function useCarers(
  params: CarerSearchParams = { limit: 50, page: 1 }
) {
  const [carers, setCarers] = useState<CarerItem[]>([]);
  const [meta, setMeta] = useState<ApiMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCarers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await findCareApi.getCarers(params);
      if (response && response.data) {
        setCarers(response.data);
        if (response.meta) {
          setMeta(response.meta);
        }
      }
    } catch (err: any) {
      console.error("Error fetching carers in FindCare module:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load carers"
      );
    } finally {
      setIsLoading(false);
    }
  }, [params.limit, params.page, params.search, params.city, params.postCode, params.skills, params.specialisms, params.yearsOfExperience, params.isAvailable, params.shifts, params.sortBy, params.sortOrder]);

  useEffect(() => {
    fetchCarers();
  }, [fetchCarers]);

  return {
    carers,
    meta,
    isLoading,
    error,
    refetch: fetchCarers,
  };
}
