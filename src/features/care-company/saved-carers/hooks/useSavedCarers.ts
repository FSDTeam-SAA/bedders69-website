"use client";

import { useState, useEffect, useCallback } from "react";
import savedCarersApi from "../api/savedCarersApi";
import { SavedCarerItem } from "../types/savedCarers.types";

export function useSavedCarers() {
  const [carers, setCarers] = useState<SavedCarerItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCarers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await savedCarersApi.getSavedCarers();
      if (response && response.data) {
        setCarers(response.data);
      } else {
        setCarers([]);
      }
    } catch (err: any) {
      console.warn("Could not load saved carers:", err?.message);
      setCarers([]);
      setError(err?.message || "Failed to load saved carers");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveCarer = async (carer: Partial<SavedCarerItem>): Promise<boolean> => {
    try {
      const response = await savedCarersApi.saveCarer(carer);
      if (response && response.data) {
        setCarers((prev) => [response.data, ...prev.filter((c) => (c.carerId || c.id) !== (carer.carerId || carer.id))]);
      }
      return true;
    } catch (err) {
      console.error("Error saving carer:", err);
      return false;
    }
  };

  const removeCarer = async (id: string): Promise<boolean> => {
    try {
      await savedCarersApi.removeSavedCarer(id);
      setCarers((prev) => prev.filter((c) => c.carerId !== id && c.id !== id && c._id !== id));
      return true;
    } catch (err) {
      console.error("Error removing saved carer:", err);
      // Optimistic removal for UI
      setCarers((prev) => prev.filter((c) => c.carerId !== id && c.id !== id && c._id !== id));
      return true;
    }
  };

  useEffect(() => {
    fetchCarers();
  }, [fetchCarers]);

  return {
    carers,
    isLoading,
    error,
    refetch: fetchCarers,
    saveCarer,
    removeCarer,
  };
}

export function useSavedCarerDetail(id: string) {
  const [carer, setCarer] = useState<SavedCarerItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await savedCarersApi.getSavedCarerDetail(id);
      if (response && response.data) {
        setCarer(response.data);
      }
    } catch (err: any) {
      setCarer(null);
      setError(err?.message || "Failed to load carer detail");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return {
    carer,
    isLoading,
    error,
    refetch: fetchDetail,
  };
}

export default useSavedCarers;
