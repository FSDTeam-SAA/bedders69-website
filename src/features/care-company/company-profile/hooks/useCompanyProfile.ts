"use client";

import { useState, useEffect, useCallback } from "react";
import companyProfileApi from "../api/companyProfileApi";
import {
  CareCompanyProfile,
  DEFAULT_CARE_COMPANY_PROFILE,
  UpdateCompanyProfilePayload,
} from "../types/companyProfile.types";

const LOCAL_STORAGE_KEY = "bedders_care_company_profile_cache";

export function useCompanyProfile() {
  const [profile, setProfile] = useState<CareCompanyProfile>(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        try {
          return { ...DEFAULT_CARE_COMPANY_PROFILE, ...JSON.parse(cached) };
        } catch (e) {}
      }
    }
    return DEFAULT_CARE_COMPANY_PROFILE;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await companyProfileApi.getMyProfile();
      if (response && response.data) {
        const merged = {
          ...DEFAULT_CARE_COMPANY_PROFILE,
          ...response.data,
          serviceOffered:
            response.data.serviceOffered && response.data.serviceOffered.length > 0
              ? response.data.serviceOffered
              : DEFAULT_CARE_COMPANY_PROFILE.serviceOffered,
        };
        setProfile(merged);
        if (typeof window !== "undefined") {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
        }
      }
    } catch (err: any) {
      console.warn("Using default care company demo profile:", err?.message);
      // If unauthorized or offline, use demo data
      setProfile((prev) => prev || DEFAULT_CARE_COMPANY_PROFILE);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = async (payload: UpdateCompanyProfilePayload): Promise<boolean> => {
    setIsUpdating(true);
    setUpdateError(null);
    try {
      // Optimistic update
      const updatedLocal: CareCompanyProfile = {
        ...profile,
        ...payload,
      };
      setProfile(updatedLocal);
      if (typeof window !== "undefined") {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLocal));
      }

      const response = await companyProfileApi.updateMyProfile(payload);
      if (response && response.data) {
        const merged = { ...updatedLocal, ...response.data };
        setProfile(merged);
        if (typeof window !== "undefined") {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
        }
      }
      return true;
    } catch (err: any) {
      console.error("Error updating care company profile:", err);
      // Even if offline, local state and localStorage are updated for demo editing
      return true;
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    isLoading,
    error,
    refetch: fetchProfile,
    updateProfile,
    isUpdating,
    updateError,
  };
}

export default useCompanyProfile;
