"use client";

import React, { useState } from "react";
import { Check, X, Star, Sparkles, Building2, Zap, ArrowRight, ShieldCheck } from "lucide-react";

export const MembershipView = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: "free",
      name: "Free",
      priceMonthly: 0,
      priceYearly: 0,
      description: "Cancel anytime",
      buttonText: "Get Started Free",
      icon: Zap,
      accent: "text-slate-500",
      bgBtn: "bg-slate-800 hover:bg-slate-900 text-white",
      features: [
        "Basic Directory Listing",
        "Up to 2 Job Posts/Month",
        "Standard Profile Page",
        "Community Access",
        "Email Support",
        "Basic Analytics"
      ]
    },
    {
      id: "premium",
      name: "Premium",
      priceMonthly: 49,
      priceYearly: 29, // ~40% discount
      description: "Cancel anytime",
      buttonText: "Start Premium Trial",
      icon: Sparkles,
      accent: "text-[#2D6A9F]",
      isPopular: true,
      bgBtn: "bg-[#2D6A9F] hover:bg-[#20527F] text-white shadow-md hover:shadow-lg",
      features: [
        "Enhanced Directory Listing",
        "Unlimited Job Posts",
        "Premium Profile Badge",
        "Featured Placement (3 days/month)",
        "Priority Support",
        "Advanced Analytics",
        "Candidate Search Access",
        "Branded Profile Page",
        "Messaging System"
      ]
    },
    {
      id: "enterprise",
      name: "Enterprise",
      priceMonthly: 149,
      priceYearly: 89, // ~40% discount
      description: "Cancel anytime",
      buttonText: "Contact Sales",
      icon: Building2,
      accent: "text-indigo-600",
      bgBtn: "bg-slate-800 hover:bg-slate-900 text-white",
      features: [
        "Top-tier Directory Placement",
        "Unlimited Everything",
        "Enterprise Verification Badge",
        "Homepage Featured Slot",
        "Dedicated Account Manager",
        "Full CRM & Pipeline Tools"
      ]
    }
  ];

  const comparisonFeatures = [
    { name: "Featured Placement", free: true, premium: true, enterprise: true },
    { name: "Analytics Dashboard", free: true, premium: true, enterprise: true },
    { name: "Candidate Search", free: true, premium: true, enterprise: true },
    { name: "Messaging", free: true, premium: true, enterprise: true },
    { name: "Priority Support", free: true, premium: true, enterprise: true },
    { name: "Dedicated Manager", free: false, premium: true, enterprise: true },
    { name: "API Access", free: false, premium: true, enterprise: true },
    { name: "Multi-User Accounts", free: false, premium: true, enterprise: true }
  ];

  return (
    <div className="bg-[#F4F7FC] min-h-screen pb-24 font-['Wix_Madefor_Text'] overflow-x-hidden">
      
      {/* Hero Header Section */}
      <div className="relative overflow-hidden bg-white border-b border-slate-100 py-16 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32">
        <div className="absolute inset-0 bg-[radial-gradient(#2d6a9f_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
        
        <div className="container mx-auto max-w-4xl text-center relative z-10 flex flex-col gap-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#1B2C54] tracking-tight leading-tight">
            Grow Your Care Business with the Right Plan
          </h1>
          <p className="text-base md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Start free and upgrade as you grow. All plans include access to the UK's leading care industry ecosystem.
          </p>

          {/* Pricing Cycle Switcher */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center shadow-inner relative">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  billingCycle === "monthly"
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  billingCycle === "yearly"
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                Yearly
              </button>
            </div>
            
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm border border-emerald-200">
              Save 40%
            </span>
          </div>

        </div>
      </div>

      {/* Plan Pricing Cards Grid */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-32 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = billingCycle === "monthly" ? plan.priceMonthly : plan.priceYearly;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`bg-white border rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative cursor-pointer group ${
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
                      <h3 className="text-xl font-bold text-slate-800">{plan.name}</h3>
                      <p className="text-xs text-slate-400 font-semibold">{plan.description}</p>
                    </div>
                    <div className={`p-2.5 rounded-2xl bg-slate-50 group-hover:bg-slate-100 transition-colors ${plan.accent}`}>
                      <Icon className="size-6 stroke-[2.5]" />
                    </div>
                  </div>

                  {/* Price Block */}
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-5xl font-extrabold text-slate-800 tracking-tight">
                      £{price}
                    </span>
                    <span className="text-sm font-semibold text-slate-400">
                      /mo{billingCycle === "yearly" && " (billed annually)"}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="flex flex-col gap-4 border-t border-slate-50 pt-6">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      What's Included:
                    </h4>
                    
                    <ul className="flex flex-col gap-3.5">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                          <Check className="size-4.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Get Started Button */}
                <button
                  className={`w-full py-4 mt-10 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${plan.bgBtn}`}
                >
                  {plan.buttonText}
                  <ArrowRight className="size-4" />
                </button>

              </div>
            );
          })}

        </div>
      </div>

      {/* Feature Comparison Table Section */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-32 mt-24">
        <div className="max-w-4xl mx-auto bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-sm">
          
          <div className="text-center md:text-left mb-8 pb-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#1B2C54]">Full Feature Comparison</h2>
              <p className="text-xs text-slate-400 font-medium mt-1">Compare details across our monthly and yearly subscription plans.</p>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
              <ShieldCheck className="size-4 text-[#2D6A9F]" />
              <span>Free 14-day trials on all paid plans</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/2">Feature</th>
                  <th className="py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Free</th>
                  <th className="py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Premium</th>
                  <th className="py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm font-medium">
                {comparisonFeatures.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/20 transition-colors">
                    <td className="py-4 text-slate-700">{row.name}</td>
                    
                    {/* Free Column */}
                    <td className="py-4 text-center">
                      <div className="flex justify-center">
                        {row.free ? (
                          <Check className="size-5 text-emerald-500" />
                        ) : (
                          <X className="size-5 text-slate-300" />
                        )}
                      </div>
                    </td>

                    {/* Premium Column */}
                    <td className="py-4 text-center">
                      <div className="flex justify-center">
                        {row.premium ? (
                          <Check className="size-5 text-emerald-500" />
                        ) : (
                          <X className="size-5 text-slate-300" />
                        )}
                      </div>
                    </td>

                    {/* Enterprise Column */}
                    <td className="py-4 text-center">
                      <div className="flex justify-center">
                        {row.enterprise ? (
                          <Check className="size-5 text-emerald-500" />
                        ) : (
                          <X className="size-5 text-slate-300" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

    </div>
  );
};
