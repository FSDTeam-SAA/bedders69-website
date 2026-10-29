"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Loader2, CheckCircle2, Tag, X, AlertCircle } from "lucide-react";
import { PlanType, PricingPlan } from "../types/choose-plan.types";

const PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    description: "Basic listing and search",
  },
  {
    id: "premium",
    name: "Premium",
    price: "$49/mo",
    description: "Featured listing, verified badge, analytics",
  },
  {
    id: "business",
    name: "Business",
    price: "$149/mo",
    description: "Everything + dedicated support + API",
  },
];

export const ChoosePlanView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const membershipPlanId = searchParams.get("membershipPlan");

  let savedAccountType = "";
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("bedders_business_info");
      if (stored) {
        savedAccountType = JSON.parse(stored).accountType || "";
      }
    } catch (e) {}
  }
  const accountType = typeParam || savedAccountType || "care_company";
  const isExternalRole =
    accountType === "supplier" ||
    accountType === "product_supplier" ||
    accountType === "service_provider" ||
    accountType === "service";

  const [selectedPlan, setSelectedPlan] = useState<PlanType>("free");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponError, setCouponError] = useState("");
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCodeInput.trim().toUpperCase();
    if (!code) {
      setCouponError("Please enter a coupon code");
      return;
    }
    setIsValidatingCoupon(true);
    setCouponError("");
    try {
      const planPrice = selectedPlan === "premium" ? 49 : selectedPlan === "business" ? 149 : 50;
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          couponCode: code,
          category: "SUBSCRIPTION",
          amount: planPrice,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setAppliedCoupon(null);
        setCouponError(data?.message || "Invalid coupon code");
      } else if (data?.data) {
        setAppliedCoupon(data.data);
        setCouponCodeInput("");
        setCouponError("");
      }
    } catch {
      setCouponError("Failed to validate coupon");
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError("");
    setCouponCodeInput("");
  };

  useEffect(() => {
    if (isExternalRole) {
      setLoading(true);
      const bypassExternalRole = async () => {
        let email = "";
        let password = "";
        if (typeof window !== "undefined") {
          try {
            const stored = localStorage.getItem("bedders_business_info");
            if (stored) {
              const info = JSON.parse(stored);
              email = (info.email || "").trim().toLowerCase();
              password = info.password || "";
            }
          } catch (e) {}
        }

        if (email && password) {
          try {
            const loginRes = await fetch("/api/auth/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            });
            if (loginRes.ok) {
              const loginData = await loginRes.json();
              const destination = loginData.dashboardPath;
              if (destination && destination !== "/") {
                setSuccess(true);
                setTimeout(() => {
                  if (destination.startsWith("http")) {
                    window.location.assign(destination);
                  } else {
                    window.location.href = destination;
                  }
                }, 1000);
                return;
              }
            }
          } catch (err) {}
        }

        setTimeout(() => {
          router.replace(
            email
              ? `/login?verified=true&email=${encodeURIComponent(email)}`
              : "/login?verified=true"
          );
        }, 1000);
      };

      bypassExternalRole();
    }
  }, [isExternalRole, router]);

  const handleContinue = async () => {
    setLoading(true);
    setError("");

    try {
      let businessInfo: any = {};
      if (typeof window !== "undefined") {
        localStorage.setItem("bedders_selected_plan", selectedPlan);
        const stored = localStorage.getItem("bedders_business_info");
        if (stored) {
          try {
            businessInfo = JSON.parse(stored);
          } catch (e) {}
        }
      }

      const role = businessInfo.accountType || accountType || "care_company";
      const email = (businessInfo.email || "").trim().toLowerCase();
      const password = businessInfo.password || "Secret123!";
      const fullName = businessInfo.companyName || "Organization";

      if (email) {
        // Register in backend
        await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName,
            email,
            password,
            role,
          }),
        });

        // Attempt automatic login
        const loginRes = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (loginRes.ok) {
          const loginData = await loginRes.json();
          if (membershipPlanId) {
            const checkoutRes = await fetch(`/api/membership/checkout/${encodeURIComponent(membershipPlanId)}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ couponCode: appliedCoupon?.couponCode || undefined }),
            });
            const checkoutData = await checkoutRes.json().catch(() => ({}));
            const checkoutUrl = checkoutData?.data?.checkoutUrl;
            if (checkoutRes.ok && checkoutUrl) {
              window.location.assign(checkoutUrl);
              return;
            }
            throw new Error(checkoutData?.message || "Unable to start membership checkout");
          }
          setLoading(false);
          setSuccess(true);
          const destination = loginData.dashboardPath || "/login";
          setTimeout(() => {
            if (destination.startsWith("http")) {
              window.location.assign(destination);
            } else {
              window.location.href = destination;
            }
          }, 1200);
          return;
        }
      }

      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push(
          email
            ? `/login?verified=true&email=${encodeURIComponent(email)}`
            : "/login?verified=true"
        );
      }, 1200);
    } catch (err: any) {
      setLoading(false);
      router.push("/login?verified=true");
    }
  };

  if (isExternalRole) {
    const roleTitle =
      accountType === "service_provider" || accountType === "service"
        ? "Service Provider"
        : "Product Supplier";

    return (
      <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#F5F9FD] via-[#EEF5FC] to-[#E5F0FA] px-4 py-12 font-['Wix_Madefor_Text',Arial,sans-serif]">
        <div className="relative z-10 mx-auto flex w-full max-w-[500px] flex-col items-center text-center p-8 rounded-2xl border border-slate-100/90 bg-white shadow-[0px_10px_35px_rgba(27,44,84,0.06)]">
          <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-cyan-50 text-cyan-700">
            {success ? (
              <CheckCircle2 className="size-8 text-emerald-600" />
            ) : (
              <Loader2 className="size-8 animate-spin text-cyan-700" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            {success ? "Account Ready!" : `Setting Up ${roleTitle} Account`}
          </h2>
          <p className="text-sm text-slate-600">
            {success
              ? "Your account is ready. Redirecting to your dashboard..."
              : `${roleTitle} accounts do not require a subscription plan. Redirecting you to your dashboard...`}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#F5F9FD] via-[#EEF5FC] to-[#E5F0FA] px-4 py-12 font-['Wix_Madefor_Text',Arial,sans-serif]">
      {/* Background Medical Shield & Pulse Watermark Graphics */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
        {/* Soft Medical Shield Watermark on Left */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 opacity-[0.08] lg:left-10 lg:opacity-[0.14]">
          <svg
            width="600"
            height="700"
            viewBox="0 0 600 700"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-cyan-600"
          >
            <path
              d="M300 30L550 140V380C550 530 440 640 300 680C160 640 50 530 50 380V140L300 30Z"
              fill="currentColor"
            />
            <path
              d="M260 220H340V310H430V390H340V480H260V390H170V310H260V220Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Subtle Heartbeat Pulse Wave Graphic on Right */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 opacity-[0.06] lg:right-10 lg:opacity-[0.12]">
          <svg
            width="750"
            height="350"
            viewBox="0 0 750 350"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-cyan-600"
          >
            <path
              d="M0 175H200L230 110L270 240L310 70L360 280L400 140L430 200L460 175H750"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Subtle Hexagonal / Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#0e7490_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.035]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-[760px] flex-col items-center">
        {/* Header */}
        <div className="flex w-full flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-semibold leading-[48px] text-slate-800 sm:text-4xl">
            Choose Your Plan
          </h1>
          <p className="text-base font-normal leading-6 text-gray-500 sm:text-xl">
            Start free or unlock premium features
          </p>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-4 text-center text-sm font-medium text-emerald-700 animate-fade-in shadow-xs">
            <CheckCircle2 className="size-5 shrink-0" />
            <span>Plan selected successfully! Taking you to your dashboard...</span>
          </div>
        )}

        {/* Plans Card */}
        <div className="mt-8 flex w-full flex-col gap-4 rounded-2xl border border-slate-100/90 bg-white p-6 shadow-[0px_10px_35px_rgba(27,44,84,0.06)] sm:p-8">
          {PLANS.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`flex w-full cursor-pointer items-center justify-between rounded-lg p-5 transition-all select-none ${
                  isSelected
                    ? "border-2 border-cyan-700 bg-cyan-50/20 shadow-xs"
                    : "border border-neutral-400/80 bg-white hover:border-cyan-700/60 hover:bg-slate-50/50"
                }`}
              >
                {/* Plan Info */}
                <div className="flex flex-1 flex-col justify-center items-start text-left gap-1">
                  <div className="text-lg font-semibold leading-6 text-slate-800 sm:text-xl">
                    {plan.name}
                  </div>
                  <div className="text-sm font-normal leading-5 text-gray-500 sm:text-base">
                    {plan.description}
                  </div>
                </div>

                {/* Price */}
                <div className="text-right text-lg font-semibold leading-6 text-slate-800 sm:text-xl">
                  {plan.price}
                </div>
              </div>
            );
          })}

          {/* Coupon Input Section for Paid Plans */}
          {(selectedPlan !== "free" || membershipPlanId) && (
            <div className="mt-2 pt-4 border-t border-slate-100 flex flex-col gap-2">
              <span className="text-xs font-semibold text-slate-700">Have a subscription coupon?</span>
              {appliedCoupon ? (
                <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tag className="size-4 text-emerald-600" />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-emerald-800">
                          {appliedCoupon.couponCode}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                          {appliedCoupon.appliesTo}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-600 font-medium">
                        {appliedCoupon.discountValue}% discount applied
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="p-1 rounded-full text-emerald-700 hover:bg-emerald-100 transition cursor-pointer"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                      placeholder="Enter promo code"
                      className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-xs uppercase focus:outline-none focus:border-cyan-700 font-semibold"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={isValidatingCoupon || !couponCodeInput.trim()}
                      className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 disabled:opacity-60 text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      {isValidatingCoupon ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : (
                        "Apply"
                      )}
                    </button>
                  </div>
                  {couponError && (
                    <div className="flex items-center gap-1.5 p-2 bg-red-50 text-red-600 rounded-lg text-[11px] font-semibold">
                      <AlertCircle className="size-3.5 shrink-0" />
                      <span>{couponError}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Actions Bar */}
        <div className="mt-6 flex w-full items-center justify-between px-2">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-base font-medium text-slate-700 transition-colors hover:text-slate-900 cursor-pointer"
          >
            <ArrowLeft className="size-4.5" />
            <span>Back</span>
          </button>

          {/* Continue Button */}
          <button
            type="button"
            onClick={handleContinue}
            disabled={loading || success}
            className="flex items-center gap-2 rounded-lg bg-cyan-700 px-8 py-3.5 text-base font-medium leading-5 text-white shadow-sm transition-all hover:bg-cyan-800 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="size-4.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
};
