"use client";

import { useState, useEffect, useCallback } from "react";
import membershipApi from "../api/membershipApi";
import { PackageItem, PackageSearchParams } from "../types/membership.types";

export function useMembershipPackages(
  params: PackageSearchParams = { type: "membership", limit: 20, page: 1 }
) {
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPackages = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const items = await membershipApi.getMembershipPackages(params);
      setPackages(items);
    } catch (err: any) {
      console.error("Error fetching membership packages:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load membership packages"
      );
    } finally {
      setIsLoading(false);
    }
  }, [params.limit, params.page, params.searchTerm, params.type, params.sortBy, params.sortOrder]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  return {
    packages,
    isLoading,
    error,
    refetch: fetchPackages,
  };
}
