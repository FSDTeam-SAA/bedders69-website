"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CareCompanySidebar from "@/features/care-company/components/CareCompanySidebar";
import { Check, Sparkles, X } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  subtext: string;
  price: string;
  period: string;
  features: string[];
  isCurrent?: boolean;
  isPopular?: boolean;
  buttonText: string;
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    subtext: "Billed monthly, cancel anytime",
    price: "£0",
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
    name: "Premium",
    subtext: "Billed monthly, cancel anytime",
    price: "£49",
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
    name: "Enterprise",
    subtext: "Billed monthly, cancel anytime",
    price: "£149",
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

export default function Membership() {
  const [currentPlanId, setCurrentPlanId] = useState<string>("free");
  const [selectedPlanModal, setSelectedPlanModal] = useState<Plan | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handlePlanAction = (plan: Plan) => {
    if (plan.id === currentPlanId) return;
    setSelectedPlanModal(plan);
  };

  const confirmUpgrade = () => {
    if (!selectedPlanModal) return;
    setCurrentPlanId(selectedPlanModal.id);
    setToastMessage(`Successfully upgraded to ${selectedPlanModal.name} Plan!`);
    setSelectedPlanModal(null);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-['Wix_Madefor_Text',Arial,sans-serif] text-[#203746]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-emerald-600 px-5 py-3 text-white shadow-xl animate-fade-in">
          <Check className="h-5 w-5" />
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      <div className="mx-auto flex min-h-screen w-full max-w-[1920px] flex-col lg:flex-row">
        {/* Left Sidebar */}
        <CareCompanySidebar activeHref="/care-company/membership" />

        {/* Right Main Content */}
        <div className="min-w-0 flex-1">
          {/* Header */}
          <header className="flex min-h-[96px] w-full items-center justify-between bg-white px-6 py-6 border-b border-[#f0f1f2]">
            <div className="flex flex-col justify-start items-start gap-1">
              <h1 className="text-2xl font-bold leading-7 text-[#2b6ea6]">
                Membership Plans
              </h1>
              <p className="text-xs font-normal leading-4 text-gray-500">
                Choose the plan that's right for you
              </p>
            </div>
            <Link
              href="/care-company/company-profile"
              className="inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-2 pr-4 shadow-sm hover:bg-slate-50 transition-colors border border-slate-100 shrink-0 ml-4"
            >
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-cyan-700/20 bg-slate-100 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Sunrise Care"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold leading-tight text-slate-800">
                  Sunrise Care
                </span>
                <span className="text-xs font-normal text-gray-500">
                  Care Company
                </span>
              </div>
            </Link>
          </header>

          {/* Pricing Cards Container */}
          <div className="mx-auto container p-4 sm:p-6 lg:p-8 space-y-6 pb-20 max-w-[1486px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {plans.map((plan) => {
                const isCurrent = currentPlanId === plan.id;
                const isHighlighted = plan.id === "premium" && !isCurrent;

                return (
                  <div
                    key={plan.id}
                    className={`h-[500px] p-6 rounded-2xl flex flex-col justify-between items-start transition-all duration-200 ${
                      isHighlighted
                        ? "bg-slate-100/90 rounded-2xl shadow-[3px_5px_10px_0px_rgba(0,0,0,0.14)] border-2 border-cyan-700"
                        : "bg-white rounded-2xl shadow-[0px_0px_10px_0px_rgba(0,0,0,0.15)] border border-neutral-100"
                    }`}
                  >
                    {/* Top: Plan Name & Subtitle */}
                    <div className="w-full flex flex-col justify-start items-start gap-2">
                      <h2 className="text-gray-900 text-2xl font-semibold font-['Wix_Madefor_Text'] leading-7">
                        {plan.name}
                      </h2>
                      <p className="text-slate-600 text-sm font-normal font-['Wix_Madefor_Text'] leading-4">
                        {plan.subtext}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="w-full justify-start pt-2">
                      <span className="text-cyan-700 text-4xl font-bold font-['Wix_Madefor_Text'] leading-10">
                        {plan.price}
                      </span>
                      <span className="text-cyan-700 text-base font-normal font-['Wix_Madefor_Text'] leading-5">
                        {plan.period}
                      </span>
                    </div>

                    {/* Features List */}
                    <div className="w-full flex flex-col justify-start items-start gap-4 py-2">
                      {plan.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="w-full inline-flex justify-start items-center gap-2"
                        >
                          <div className="size-5 bg-green-700 rounded-full flex justify-center items-center shrink-0">
                            <Check className="size-3 text-white stroke-[3]" />
                          </div>
                          <span className="flex-1 text-gray-900 text-sm font-normal font-['Wix_Madefor_Text'] leading-4">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <div className="w-full pt-2">
                      {isCurrent ? (
                        <button
                          type="button"
                          disabled
                          className="w-full px-8 py-4 rounded-lg border border-cyan-700 text-cyan-700 text-base font-semibold font-['Wix_Madefor_Text'] leading-6 flex justify-center items-center cursor-default bg-transparent"
                        >
                          Current Plan
                        </button>
                      ) : isHighlighted ? (
                        <button
                          type="button"
                          onClick={() => handlePlanAction(plan)}
                          className="w-full px-8 py-4 bg-cyan-700 hover:bg-cyan-800 text-white text-base font-semibold font-['Wix_Madefor_Text'] leading-6 rounded-lg flex justify-center items-center cursor-pointer shadow-sm transition-all active:scale-[0.99]"
                        >
                          Upgrade Now
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handlePlanAction(plan)}
                          className="w-full px-8 py-4 rounded-lg border border-cyan-700 text-cyan-700 hover:bg-cyan-50/50 text-base font-semibold font-['Wix_Madefor_Text'] leading-6 flex justify-center items-center cursor-pointer transition-all active:scale-[0.99]"
                        >
                          Upgrade Now
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Confirmation Modal */}
      {selectedPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-neutral-100 flex flex-col gap-5">
            <button
              type="button"
              onClick={() => setSelectedPlanModal(null)}
              className="absolute right-5 top-5 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="size-12 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700">
                <Sparkles className="size-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  Upgrade to {selectedPlanModal.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {selectedPlanModal.price}
                  {selectedPlanModal.period} · Billed monthly
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Plan Highlights
              </span>
              {selectedPlanModal.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                  <Check className="size-3.5 text-emerald-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedPlanModal(null)}
                className="flex-1 py-3 rounded-lg border border-neutral-300 text-slate-700 text-sm font-semibold hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmUpgrade}
                className="flex-1 py-3 bg-cyan-700 hover:bg-cyan-800 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Confirm Upgrade
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}