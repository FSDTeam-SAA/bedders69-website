"use client";

import { useState, useEffect, useCallback } from "react";
import companyProfileApi from "../api/companyProfileApi";
import {
  CareCompanyProfile,
  DEFAULT_CARE_COMPANY_PROFILE,
  UpdateCompanyProfilePayload,
} from "../types/companyProfile.types";

const LOCAL_STORAGE_KEY = "bedders_care_company_profile_cache";

const isDemo = (str?: string) => {
  if (!str) return false;
  const s = str.trim().toLowerCase();
  return (
    s.includes("sunrise") ||
    s.includes("carerecruitpro") ||
    s === "care company" ||
    s === "no name" ||
    s === "demo"
  );
};

export function useCompanyProfile() {
  const [profile, setProfile] = useState<CareCompanyProfile>(() => {
    if (typeof window !== "undefined") {
      // 1. Try local cache
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          // If cached data contains any demo data, clear it immediately
          if (
            isDemo(parsed?.companyName) ||
            isDemo(parsed?.tradingName) ||
            isDemo(parsed?.about)
          ) {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
          } else if (parsed?.companyName || parsed?.tradingName) {
            return {
              ...DEFAULT_CARE_COMPANY_PROFILE,
              ...parsed,
              tradingName: parsed.tradingName || parsed.companyName,
            };
          }
        } catch (e) {}
      }

      // 2. Fallback to registered business info if available
      try {
        const biz = localStorage.getItem("bedders_business_info");
        if (biz) {
          const parsedBiz = JSON.parse(biz);
          if (parsedBiz?.companyName && !isDemo(parsedBiz.companyName)) {
            return {
              ...DEFAULT_CARE_COMPANY_PROFILE,
              companyName: parsedBiz.companyName,
              tradingName: parsedBiz.companyName,
              email: parsedBiz.email || "",
              phoneNumber: parsedBiz.phoneNumber || "",
              address: parsedBiz.address || "",
            };
          }
        }
      } catch (e) {}
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
        const data = response.data;
        const realCompanyName = (data.companyName || (data as any).name || "").trim();
        const realTradingName = (data.tradingName || realCompanyName).trim();

        const cleanProfile: CareCompanyProfile = {
          ...DEFAULT_CARE_COMPANY_PROFILE,
          ...data,
          companyName: realCompanyName,
          tradingName: realTradingName,
          serviceOffered: Array.isArray(data.serviceOffered) ? data.serviceOffered : [],
        };
        setProfile(cleanProfile);
        if (typeof window !== "undefined") {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cleanProfile));
        }
      }
    } catch (err: any) {
      console.warn("Could not fetch care company profile:", err?.message);
      setError(err?.message || "Failed to load profile");
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
      setUpdateError(err?.message || "Failed to update profile");
      return false;
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
