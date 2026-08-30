"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
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
  const accountType = searchParams.get("type") || "care_company";

  const [selectedPlan, setSelectedPlan] = useState<PlanType>("free");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleContinue = () => {
    setLoading(true);

    if (typeof window !== "undefined") {
      localStorage.setItem("bedders_selected_plan", selectedPlan);
    }

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        // Direct to role dashboard or login
        if (accountType === "care_company") {
          router.push("/care-company");
        } else if (accountType === "agency") {
          router.push("/recruitment-agency");
        } else if (accountType === "supplier") {
          router.push("/supplier");
        } else if (accountType === "service_provider") {
          router.push("/service");
        } else {
          router.push("/login");
        }
      }, 1500);
    }, 1000);
  };

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
