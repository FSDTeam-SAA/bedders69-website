"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Check,
  X,
  Star,
  Sparkles,
  Building2,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import membershipApi from "../api/membershipApi";
import { PackageItem, PlanCardProps } from "../types/membership.types";

export const MembershipView = () => {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [backendPackages, setBackendPackages] = useState<PackageItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Modal / Success states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadPackages() {
      setIsLoading(true);
      try {
        const pkgs = await membershipApi.getMembershipPackages();
        if (pkgs && pkgs.length > 0 && isMounted) {
          setBackendPackages(pkgs);
        }
      } catch (err) {
        console.warn("Could not load membership packages:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadPackages();
    return () => {
      isMounted = false;
    };
  }, []);

  // Map backend packages to UI presentation plans
  const plans = useMemo<any[]>(() => {
    if (backendPackages && backendPackages.length > 0) {
      const mapped = backendPackages.map((pkg: any) => {
        const title = pkg.title || pkg.name || "Membership Plan";
        const isFree = pkg.price === 0;
        const isEnterprise = pkg.price >= 100;
        const isPopular =
          typeof pkg.isPopular === "boolean"
            ? pkg.isPopular
            : !isFree && !isEnterprise;

        const price = pkg.price;
        const period = pkg.duration ? `/${pkg.duration}` : "/month";

        let icon = Zap;
        let accent = "text-slate-500";
        let bgBtn = "bg-slate-800 hover:bg-slate-900 text-white";
        let btnText = isFree ? "Get Started Free" : "Upgrade Now";

        if (isPopular) {
          icon = Sparkles;
          accent = "text-[#2D6A9F]";
          bgBtn = "bg-[#2D6A9F] hover:bg-[#20527F] text-white shadow-md hover:shadow-lg";
        } else if (isEnterprise) {
          icon = Building2;
          accent = "text-indigo-600";
          bgBtn = "bg-slate-800 hover:bg-slate-900 text-white";
        }

        let features: string[] = [];
        if (Array.isArray(pkg.features) && pkg.features.length > 0) {
          features = pkg.features;
        } else if (typeof pkg.content === "string" && pkg.content.trim()) {
          features = pkg.content
            .split(/\r?\n|,/)
            .map((f: string) => f.trim())
            .filter(Boolean);
        }

        return {
          id: pkg._id || pkg.id || title.toLowerCase().replace(/\s+/g, "-"),
          name: title,
          price,
          period,
          duration: pkg.duration,
          description: "",
          buttonText: btnText,
          icon,
          accent,
          isPopular,
          bgBtn,
          features,
        };
      });

      let sorted = [...mapped];
      const popularIndex = sorted.findIndex((p) => p.isPopular);
      if (popularIndex !== -1 && sorted.length >= 2) {
        const [popularPlan] = sorted.splice(popularIndex, 1);
        sorted.splice(1, 0, popularPlan);
      }
      return sorted;
    }

    return [];
  }, [backendPackages]);

  const comparisonFeatures = [
    { name: "Directory Placement", free: "Standard", premium: "Enhanced", enterprise: "Top-Tier Featured" },
    { name: "Job Postings", free: "2 / month", premium: "Unlimited", enterprise: "Unlimited Priority" },
    { name: "Candidate Search Access", free: false, premium: true, enterprise: true },
    { name: "Analytics Dashboard", free: "Basic", premium: "Advanced", enterprise: "Real-time & Custom" },
    { name: "Direct Messaging", free: false, premium: true, enterprise: true },
    { name: "Priority Support", free: false, premium: true, enterprise: true },
    { name: "Dedicated Account Manager", free: false, premium: false, enterprise: true },
    { name: "API & Custom Integrations", free: false, premium: false, enterprise: true },
  ];

  const selectedPlan = plans.find((p) => p.id === selectedPlanId) || plans[1];

  const handlePlanAction = (planId: string) => {
    setSelectedPlanId(planId);
    setIsModalOpen(true);
    setIsSuccess(false);
  };

  const handleConfirmPlan = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="bg-[#F4F7FC] min-h-screen pb-24 font-['Wix_Madefor_Text'] overflow-x-hidden">
      {/* Hero Header Section */}
      <div className="relative overflow-hidden bg-white border-b border-slate-100 py-16 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32">
        <div className="absolute inset-0 bg-[radial-gradient(#2d6a9f_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

        <div className="container mx-auto max-w-4xl text-center relative z-10 flex flex-col gap-6">
          <span className="text-xs font-bold text-[#0A66C2] bg-[#E5F2FC] px-4 py-1.5 rounded-full uppercase tracking-wider mx-auto">
            Flexible Care Provider Plans
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#1B2C54] tracking-tight leading-tight">
            Grow Your Care Business with the Right Plan
          </h1>
          <p className="text-base md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Start free and upgrade as you grow. Connect with thousands of clients, care staff, and suppliers across the UK.
          </p>


        </div>
      </div>

      {/* Plan Pricing Cards Grid */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-32 -mt-10 relative z-20">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col justify-between animate-pulse min-h-[460px]"
              >
                <div className="space-y-4">
                  <div className="h-6 w-1/3 bg-slate-200 rounded" />
                  <div className="h-10 w-1/2 bg-slate-200 rounded" />
                  <div className="h-24 w-full bg-slate-200 rounded" />
                </div>
                <div className="h-12 w-full bg-slate-200 rounded-2xl" />
              </div>
            ))}
          </div>
        ) : plans.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm max-w-xl mx-auto">
            <h3 className="text-xl font-bold text-slate-800">
              No Membership Plans Available
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              There are currently no membership plans listed. Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan) => {
              const Icon = plan.icon;

              return (
                <div
                  key={plan.id}
                  className={`bg-white border rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative group ${
                    plan.isPopular
                      ? "border-[#2D6A9F] shadow-lg ring-4 ring-[#2D6A9F]/5 scale-102 lg:scale-105"
                      : "border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200"
                  }`}
                >
                  {/* Popular Pill Tag */}
                  {plan.isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#2D6A9F] text-white text-xs font-extrabold px-4 py-1.5 rounded-full flex items-center gap-1 shadow-sm uppercase tracking-wider">
                      <Star className="size-3.5 fill-white" />
                      Most Popular
                    </div>
                  )}

                  <div>
                    {/* Plan Meta Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-xl font-bold text-slate-800">
                          {plan.name}
                        </h3>
                        {plan.description && (
                          <p className="text-xs text-slate-400 font-semibold">
                            {plan.description}
                          </p>
                        )}
                      </div>
                      <div
                        className={`p-2.5 rounded-2xl bg-slate-50 group-hover:bg-slate-100 transition-colors ${plan.accent}`}
                      >
                        <Icon className="size-6 stroke-[2.5]" />
                      </div>
                    </div>

                    {/* Price Block */}
                    <div className="flex items-baseline gap-1 mb-8">
                      <span className="text-5xl font-extrabold text-slate-800 tracking-tight">
                        £{plan.price}
                      </span>
                      <span className="text-sm font-semibold text-slate-400">
                        {plan.period}
                      </span>
                    </div>

                    {/* Features List */}
                    {plan.features && plan.features.length > 0 && (
                      <div className="flex flex-col gap-3.5 mb-8 border-t border-slate-100 pt-6">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Included Features
                        </span>
                        {plan.features.map((feature: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-3 text-sm">
                            <Check className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="text-slate-600 font-medium">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handlePlanAction(plan.id)}
                    className={`w-full py-4 rounded-2xl text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98 ${plan.bgBtn}`}
                  >
                    <span>{plan.buttonText}</span>
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Feature Comparison Matrix Section */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-32 mt-24">
        <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm flex flex-col gap-8">
          <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1B2C54]">
              Compare Plan Features
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Everything you need to evaluate the best fit for your organization.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-4 text-sm font-bold text-slate-800">
                    Feature Overview
                  </th>
                  <th className="py-4 text-sm font-bold text-slate-800 text-center">
                    Free Starter
                  </th>
                  <th className="py-4 text-sm font-bold text-[#2D6A9F] text-center">
                    Premium Growth
                  </th>
                  <th className="py-4 text-sm font-bold text-indigo-600 text-center">
                    Enterprise Scale
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {comparisonFeatures.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 font-medium text-slate-700">
                      {row.name}
                    </td>
                    <td className="py-4 text-center text-slate-500">
                      {typeof row.free === "boolean" ? (
                        row.free ? (
                          <Check className="size-4 text-emerald-600 mx-auto" />
                        ) : (
                          <X className="size-4 text-slate-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-xs font-semibold">{row.free}</span>
                      )}
                    </td>
                    <td className="py-4 text-center text-slate-700 font-semibold">
                      {typeof row.premium === "boolean" ? (
                        row.premium ? (
                          <Check className="size-4 text-emerald-600 mx-auto" />
                        ) : (
                          <X className="size-4 text-slate-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-xs font-bold text-[#2D6A9F]">{row.premium}</span>
                      )}
                    </td>
                    <td className="py-4 text-center text-slate-700 font-semibold">
                      {typeof row.enterprise === "boolean" ? (
                        row.enterprise ? (
                          <Check className="size-4 text-emerald-600 mx-auto" />
                        ) : (
                          <X className="size-4 text-slate-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-xs font-bold text-indigo-600">{row.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Plan Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in font-['Wix_Madefor_Text']">
          <div className="bg-white rounded-3xl w-full max-w-lg border border-slate-100 shadow-2xl p-6 md:p-8 flex flex-col gap-6 relative animate-scale-up">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition cursor-pointer"
            >
              <X className="size-5" />
            </button>

            {!isSuccess ? (
              <>
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-xs font-bold text-[#0A66C2] uppercase tracking-wider">
                    Plan Activation
                  </span>
                  <h3 className="text-2xl font-bold text-[#1B2C54] mt-1">
                    {selectedPlan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-extrabold text-slate-800">
                      £{selectedPlan?.price}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {selectedPlan?.period}
                    </span>
                  </div>
                </div>

                {selectedPlan?.features && selectedPlan.features.length > 0 && (
                  <div className="flex flex-col gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-xs font-bold text-slate-700">What is included:</span>
                    {selectedPlan.features.slice(0, 5).map((f: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                        <Check className="size-3.5 text-emerald-600" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 cursor-pointer transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmPlan}
                    disabled={isProcessing}
                    className="px-6 py-2.5 rounded-xl bg-[#2D6A9F] hover:bg-[#20527F] disabled:bg-slate-300 text-white text-xs font-bold shadow-sm transition cursor-pointer flex items-center gap-2"
                  >
                    {isProcessing ? "Activating Plan..." : "Confirm & Proceed"}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-6 gap-4">
                <div className="size-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shadow-sm">
                  <CheckCircle2 className="size-8" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-2xl font-bold text-[#1B2C54]">
                    Plan Selected!
                  </h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    You have chosen the <strong>{selectedPlan?.name}</strong> plan. Your entitlements and dashboard access have been configured.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-2 w-36 py-2.5 bg-[#2D6A9F] hover:bg-[#20527F] text-white text-xs font-bold rounded-xl shadow-sm transition"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipView;
