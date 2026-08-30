"use client";

import { useState, useEffect, useCallback } from "react";
import overviewApi from "../api/overviewApi";
import { DashboardOverviewData } from "../types/overview.types";

const INITIAL_FALLBACK_OVERVIEW: DashboardOverviewData = {
  company: {
    companyName: "Sunrise Care Services",
    tradingName: "Sunrise Care",
    logo: "/images/logo.png",
  },
  metrics: {
    profileViews: 620,
    activeJobs: 8,
    newApplicants: 47,
    contactRequests: 6,
  },
  recentApplicants: [
    { name: "James Okafor", role: "Senior Care Assistant", time: "10m ago" },
    { name: "Emma Williams", role: "Registered Nurse", time: "2h ago" },
    { name: "Priya Patel", role: "Support Worker", time: "Yesterday" },
    { name: "Michael Thompson", role: "Care Manager", time: "Yesterday" },
  ],
};

export function useOverview() {
  const [overview, setOverview] = useState<DashboardOverviewData>(
    INITIAL_FALLBACK_OVERVIEW
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOverview = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await overviewApi.getDashboardOverview();
      if (response && response.data) {
        setOverview(response.data);
      }
    } catch (err: any) {
      console.warn("Using fallback overview data:", err?.message);
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
