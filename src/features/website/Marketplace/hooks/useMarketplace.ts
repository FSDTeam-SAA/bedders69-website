"use client";

import { useState, useEffect, useCallback } from "react";
import marketplaceApi from "../api/marketplaceApi";
import {
  ApiMeta,
  MarketplaceItem,
  MarketplaceSearchParams,
} from "../types/marketplace.types";

export function useMarketplaceListings(
  params: MarketplaceSearchParams = { limit: 50, page: 1 }
) {
  const [listings, setListings] = useState<MarketplaceItem[]>([]);
  const [meta, setMeta] = useState<ApiMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchListings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await marketplaceApi.getListings(params);
      if (response && response.data) {
        setListings(response.data);
        if (response.meta) {
          setMeta(response.meta);
        }
      }
    } catch (err: any) {
      console.error("Error fetching marketplace listings:", err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load products"
      );
    } finally {
      setIsLoading(false);
    }
  }, [params.limit, params.page, params.search, params.category, params.city, params.postCode, params.minPrice, params.maxPrice, params.sortBy, params.sortOrder]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  return {
    listings,
    meta,
    isLoading,
    error,
    refetch: fetchListings,
  };
}
