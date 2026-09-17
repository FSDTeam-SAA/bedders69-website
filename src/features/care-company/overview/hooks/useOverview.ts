"use client";

import { useState, useEffect, useCallback } from "react";
import overviewApi from "../api/overviewApi";
import { DashboardOverviewData } from "../types/overview.types";

const INITIAL_OVERVIEW: DashboardOverviewData = {
  company: {
    companyName: "",
    tradingName: "",
    logo: "",
  },
  metrics: {
    profileViews: 0,
    activeJobs: 0,
    newApplicants: 0,
    contactRequests: 0,
  },
  recentApplicants: [],
};

export function useOverview() {
  const [overview, setOverview] = useState<DashboardOverviewData>(INITIAL_OVERVIEW);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOverview = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await overviewApi.getDashboardOverview();
      if (response && response.data) {
        setOverview({
          company: {
            companyName: response.data.company?.companyName || "",
            tradingName: response.data.company?.tradingName || "",
            logo: response.data.company?.logo || "",
          },
          metrics: {
            profileViews: response.data.metrics?.profileViews ?? 0,
            activeJobs: response.data.metrics?.activeJobs ?? 0,
            newApplicants: response.data.metrics?.newApplicants ?? 0,
            contactRequests: response.data.metrics?.contactRequests ?? 0,
          },
          recentApplicants: Array.isArray(response.data.recentApplicants)
            ? response.data.recentApplicants
            : [],
        });
      }
    } catch (err: any) {
      console.warn("Could not fetch overview data:", err?.message);
      setError(err?.message || "Failed to load dashboard overview");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);

  return {
    overview,
    isLoading,
    error,
    refetch: fetchOverview,
  };
}

export default useOverview;
