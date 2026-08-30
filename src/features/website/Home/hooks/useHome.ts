"use client";

import { useEffect, useState, useCallback } from "react";
import homeApi from "../api/homeApi";
import {
  AgencyItem,
  AgencySearchParams,
  ApiMeta,
  CareCompanyItem,
  CareCompanySearchParams,
  JobItem,
  JobSearchParams,
  MarketplaceItem,
  MarketplaceSearchParams,
} from "../types/home.types";

export function useFeaturedCompanies(params: CareCompanySearchParams = { limit: 6, page: 1 }) {
  const [companies, setCompanies] = useState<CareCompanyItem[]>([]);
  const [meta, setMeta] = useState<ApiMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await homeApi.getFeaturedCareCompanies(params);
      if (response && response.data) {
        setCompanies(response.data);
        if (response.meta) {
          setMeta(response.meta);
        }
      }
    } catch (err: any) {
      console.error("Error fetching featured care companies:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load featured care companies"
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

export function useFeaturedAgencies(params: AgencySearchParams = { limit: 6, page: 1 }) {
  const [agencies, setAgencies] = useState<AgencyItem[]>([]);
  const [meta, setMeta] = useState<ApiMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAgencies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await homeApi.getFeaturedAgencies(params);
      if (response && response.data) {
        setAgencies(response.data);
        if (response.meta) {
          setMeta(response.meta);
        }
      }
    } catch (err: any) {
      console.error("Error fetching featured care agencies:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load featured care agencies"
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

export function useLatestJobs(params: JobSearchParams = { limit: 4, page: 1 }) {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [meta, setMeta] = useState<ApiMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await homeApi.getLatestJobs(params);
      if (response && response.data) {
        setJobs(response.data);
        if (response.meta) {
          setMeta(response.meta);
        }
      }
    } catch (err: any) {
      console.error("Error fetching latest jobs:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load care jobs"
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

export function useMarketplaceListings(params: MarketplaceSearchParams = { limit: 4, page: 1 }) {
  const [products, setProducts] = useState<MarketplaceItem[]>([]);
  const [meta, setMeta] = useState<ApiMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchListings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await homeApi.getMarketplaceListings(params);
      if (response && response.data) {
        setProducts(response.data);
        if (response.meta) {
          setMeta(response.meta);
        }
      }
    } catch (err: any) {
      console.error("Error fetching marketplace listings:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load marketplace products"
      );
    } finally {
      setIsLoading(false);
    }
  }, [params.limit, params.page, params.search, params.category, params.city, params.postCode, params.minPrice, params.maxPrice, params.sortBy, params.sortOrder]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  return {
    products,
    meta,
    isLoading,
    error,
    refetch: fetchListings,
  };
}