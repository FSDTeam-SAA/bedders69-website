"use client";

import { useState, useEffect, useCallback } from "react";
import jobsApi from "../api/jobsApi";
import {
  ApiMeta,
  JobItem,
  JobSearchParams,
} from "../types/jobs.types";

export function useJobs(
  params: JobSearchParams = { limit: 50, page: 1 }
) {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [meta, setMeta] = useState<ApiMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await jobsApi.getJobs(params);
      if (response && response.data) {
        setJobs(response.data);
        if (response.meta) {
          setMeta(response.meta);
        }
      }
    } catch (err: any) {
      console.error("Error fetching jobs in Jobs module:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load jobs"
      );
    } finally {
      setIsLoading(false);
    }
  }, [params.limit, params.page, params.search, params.city, params.postCode, params.jobType, params.requiredSkills, params.minExperience, params.salaryMin, params.sortBy, params.sortOrder]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return {
    jobs,
    meta,
    isLoading,
    error,
    refetch: fetchJobs,
  };
}
