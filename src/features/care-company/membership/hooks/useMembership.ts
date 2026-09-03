"use client";

import { useState, useEffect, useCallback } from "react";
import membershipApi from "../api/membershipApi";
import { MembershipPlan } from "../types/membership.types";

export function useMembership() {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [currentPlanId, setCurrentPlanId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await membershipApi.getMembershipPackages();
      const rawData = response?.data;
      const items: any[] = Array.isArray(rawData)
        ? rawData
        : Array.isArray((rawData as any)?.data)
        ? (rawData as any).data
        : [];

      if (items && items.length > 0) {
        const formatted: MembershipPlan[] = items.map((item, index) => {
          const title = item.title || item.name || "Membership Plan";
          const isFree = item.price === 0;
          const isMidTier = item.price > 0 && item.price < 100;
          const isPopular = typeof item.isPopular === "boolean" ? item.isPopular : isMidTier;
          const durationPeriod = item.duration ? `/${item.duration}` : "/month";

          let parsedFeatures: string[] = [];
          if (Array.isArray(item.features) && item.features.length > 0) {
            parsedFeatures = item.features;
          } else if (typeof item.content === "string" && item.content.trim()) {
            parsedFeatures = item.content
              .split(/\r?\n|,/)
              .map((f: string) => f.trim())
              .filter(Boolean);
          }

          return {
            id: item._id || String(index),
            _id: item._id,
            name: title,
            subtext: "",
            price: `£${item.price}`,
            rawPrice: item.price,
            period: durationPeriod,
            features: parsedFeatures,
            isCurrent: isFree,
            isPopular: isPopular,
            buttonText: isFree ? "Current Plan" : "Upgrade Now",
            description: "",
          };
        });

        let sorted = [...formatted];
        const popularIndex = sorted.findIndex((p) => p.isPopular);
        if (popularIndex !== -1 && sorted.length >= 2) {
          const [popularPlan] = sorted.splice(popularIndex, 1);
          sorted.splice(1, 0, popularPlan);
        }

        setPlans(sorted);
        const current = sorted.find((p) => p.rawPrice === 0);
        if (current) {
          setCurrentPlanId(current.id);
        }
      } else {
        setPlans([]);
      }
    } catch (err: any) {
      console.error("Error fetching membership plans:", err);
      setError(err?.message || "Failed to load membership plans");
      setPlans([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return {
    plans,
    currentPlanId,
    setCurrentPlanId,
    isLoading,
    error,
    refetch: fetchPlans,
  };
}

export default useMembership;
