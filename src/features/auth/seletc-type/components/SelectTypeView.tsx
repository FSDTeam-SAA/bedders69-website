"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building,
  Building2,
  Users2,
  UserCircle2,
  Package,
  Briefcase,
} from "lucide-react";
import { AccountType, AccountTypeOption } from "../types/select-type.types";

const ACCOUNT_TYPES: AccountTypeOption[] = [
  {
    id: "user",
    title: "User",
    description: "List your care business and recruit staff",
    iconType: "user",
  },
  {
    id: "care_company",
    title: "Care Company",
    description: "List your care business and recruit staff",
    iconType: "care_company",
  },
  {
    id: "agency",
    title: "Recruitment Agency",
    description: "Connect carers with employers",
    iconType: "agency",
  },
  {
    id: "carer",
    title: "Carer",
    description: "Find care jobs and showcase your skills",
    iconType: "carer",
  },
  {
    id: "supplier",
    title: "Product Supplier",
    description: "Sell products to the care industry",
    iconType: "supplier",
  },
  {
    id: "service_provider",
    title: "Service Provider",
    description: "Offer services to care businesses",
    iconType: "service_provider",
  },
];

const renderIcon = (type: AccountTypeOption["iconType"]) => {
  switch (type) {
    case "user":
      return <Building className="size-6 text-slate-800" strokeWidth={1.8} />;
    case "care_company":
      return <Building2 className="size-6 text-slate-800" strokeWidth={1.8} />;
    case "agency":
      return <Users2 className="size-6 text-slate-800" strokeWidth={1.8} />;
    case "carer":
      return <UserCircle2 className="size-6 text-slate-800" strokeWidth={1.8} />;
    case "supplier":
      return <Package className="size-6 text-slate-800" strokeWidth={1.8} />;
    case "service_provider":
      return <Briefcase className="size-6 text-slate-800" strokeWidth={1.8} />;
    default:
      return <Building className="size-6 text-slate-800" strokeWidth={1.8} />;
  }
};

export const SelectTypeView = () => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<AccountType>("user");

  const handleContinue = () => {
    if (!selectedType) return;
    if (typeof window !== "undefined") {
      localStorage.setItem("bedders_selected_role", selectedType);
    }

    if (selectedType === "user") {
      router.push("/signup/user");
    } else {
      router.push(`/business-information?type=${selectedType}`);
    }
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#F5F9FD] via-[#EEF5FC] to-[#E5F0FA] px-4 py-12 font-['Wix_Madefor_Text',Arial,sans-serif]">
      {/* Background Medical Watermarks */}
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
            Select Your Account Type
          </h1>
          <p className="text-base font-normal leading-6 text-gray-500 sm:text-xl">
            Choose the type that best describes you
          </p>
        </div>

        {/* Options Card */}
        <div className="mt-8 flex w-full flex-col gap-4 rounded-2xl border border-slate-100/90 bg-white p-6 shadow-[0px_10px_35px_rgba(27,44,84,0.06)] sm:p-8">
          {ACCOUNT_TYPES.map((option) => {
            const isSelected = selectedType === option.id;
            return (
              <div
                key={option.id}
                onClick={() => setSelectedType(option.id)}
                className={`flex w-full cursor-pointer items-center gap-4 rounded-lg p-4 sm:p-5 transition-all select-none ${
                  isSelected
                    ? "border-2 border-cyan-700 bg-cyan-50/20 shadow-xs"
                    : "border border-neutral-300 bg-white hover:border-cyan-700/60 hover:bg-slate-50/50"
                }`}
              >
                {/* Icon Wrapper */}
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-cyan-700/10">
                  {renderIcon(option.iconType)}
                </div>

                {/* Text Content */}
                <div className="flex flex-1 flex-col justify-center items-start text-left">
                  <div className="text-base font-medium leading-5 text-slate-800 sm:text-lg">
                    {option.title}
                  </div>
                  <div className="mt-1 text-sm font-normal leading-5 text-gray-500 sm:text-base">
                    {option.description}
                  </div>
                </div>

                {/* Optional Radio Indicator */}
                <div
                  className={`flex size-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                    isSelected
                      ? "border-cyan-700 bg-cyan-700"
                      : "border-neutral-300 bg-white"
                  }`}
                >
                  {isSelected && (
                    <div className="size-2 rounded-full bg-white" />
                  )}
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
            onClick={() => router.push("/login")}
            className="flex items-center gap-2 text-base font-medium text-slate-700 transition-colors hover:text-slate-900 cursor-pointer"
          >
            <ArrowLeft className="size-4.5" />
            <span>Back</span>
          </button>

          {/* Continue Button */}
          <button
            type="button"
            onClick={handleContinue}
            className="flex items-center gap-2 rounded-lg bg-cyan-700 px-8 py-3.5 text-base font-medium leading-5 text-white shadow-sm transition-all hover:bg-cyan-800 active:scale-[0.99] cursor-pointer"
          >
            <span>Continue</span>
            <ArrowRight className="size-4.5" />
          </button>
        </div>
      </div>
    </main>
  );
};
