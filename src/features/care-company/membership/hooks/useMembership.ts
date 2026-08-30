"use client";

import { useState, useEffect, useCallback } from "react";
import membershipApi from "../api/membershipApi";
import { MembershipPlan } from "../types/membership.types";

const INITIAL_FALLBACK_PLANS: MembershipPlan[] = [
  {
    id: "free",
    name: "Free Starter",
    subtext: "Essential access for care providers starting out.",
    price: "£0",
    rawPrice: 0,
    period: "/month",
    features: [
      "Basic directory listing",
      "Up to 2 job posts/month",
      "Standard profile page",
      "Community access",
    ],
    isCurrent: true,
    buttonText: "Current Plan",
  },
  {
    id: "premium",
    name: "Premium Growth",
    subtext: "Comprehensive features and candidate access.",
    price: "£49",
    rawPrice: 49,
    period: "/month",
    features: [
      "Enhanced directory listing",
      "Unlimited job posts",
      "Premium profile badge",
      "Priority support",
      "Featured placement (3 days/month)",
    ],
    isPopular: true,
    buttonText: "Upgrade Now",
  },
  {
    id: "enterprise",
    name: "Enterprise Scale",
    subtext: "Full platform access and dedicated account manager.",
    price: "£149",
    rawPrice: 149,
    period: "/month",
    features: [
      "Top-tier directory placement",
      "Unlimited everything",
      "Enterprise verification badge",
      "Homepage featured slot",
      "Dedicated account manager",
    ],
    buttonText: "Upgrade Now",
  },
];

export function useMembership() {
  const [plans, setPlans] = useState<MembershipPlan[]>(INITIAL_FALLBACK_PLANS);
  const [currentPlanId, setCurrentPlanId] = useState<string>("free");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await membershipApi.getMembershipPackages();
      const items = response?.data?.data;
      if (items && items.length > 0) {
        const formatted: MembershipPlan[] = items.map((item, index) => {
          const isFree = item.price === 0;
          const isMidTier = item.price > 0 && item.price < 100;
          return {
            id: item._id || String(index),
            _id: item._id,
            name: item.name,
            subtext: item.description || "Billed monthly, cancel anytime",
            price: `£${item.price}`,
            rawPrice: item.price,
            period: "/month",
            features: item.features || [],
            isCurrent: isFree,
            isPopular: isMidTier,
            buttonText: isFree ? "Current Plan" : "Upgrade Now",
            description: item.description,
            durationDays: item.durationDays,
            usageLimit: item.usageLimit,
          };
        });

        setPlans(formatted);
        const current = formatted.find((p) => p.rawPrice === 0);
        if (current) {
          setCurrentPlanId(current.id);
        }
      }
    } catch (err: any) {
      console.warn("Using fallback membership plans:", err?.message);
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
