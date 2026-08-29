"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RecruitmentAgencySidebar from "@/features/recruitment-agency/components/RecruitmentAgencySidebar";
import {
  Briefcase,
  CheckCircle2,
  ClipboardList,
  Users,
} from "lucide-react";

const timeFilters = ["1M", "3M", "6M", "1Y"];

export default function Overview() {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("1Y");

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-['Wix_Madefor_Text',Arial,sans-serif] text-[#203746]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1920px] flex-col lg:flex-row">
        {/* Left Sidebar */}
        <RecruitmentAgencySidebar activeHref="/recruitment-agency/overview" />

        {/* Right Main Content */}
        <div className="min-w-0 flex-1">
          {/* Top Header Banner */}
          <header className="w-full px-6 sm:px-10 py-5 bg-cyan-700/10 flex items-center justify-between border-b border-cyan-700/10">
            <div className="flex-1 flex flex-col justify-start items-start gap-1">
              <h1 className="text-black text-2xl sm:text-3xl font-semibold font-['Wix_Madefor_Text'] leading-tight">
                Overview
              </h1>
              <p className="text-slate-700 text-sm sm:text-base lg:text-lg font-normal font-['Wix_Madefor_Text'] leading-normal">
                View your profile summary, application status, and recent activity at a glance.
              </p>
            </div>

            {/* Profile Badge */}
            <Link
              href="/recruitment-agency/agency-profile"
              className="inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-2 pr-4 shadow-sm hover:bg-slate-50 transition-colors border border-slate-100 shrink-0 ml-4"
            >
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-cyan-700/20 bg-slate-100 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="CareRecruitPro"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold leading-tight text-slate-800">
                  CareRecruitPro
                </span>
                <span className="text-xs font-normal text-gray-500">
                  Agency
                </span>
              </div>
            </Link>
          </header>

          {/* Main Dashboard Grid Area */}
          <div className="mx-auto container p-4 sm:p-6 lg:p-8 space-y-6 pb-20 max-w-[1616px]">
            {/* Top 4 Stat Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Card 1: Total Requests */}
              <div className="p-5 bg-cyan-700/5 rounded-xl border border-zinc-100 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex items-center gap-5 transition-transform hover:-translate-y-0.5">
                <div className="size-14 p-3 bg-cyan-700/10 rounded-full flex justify-center items-center shrink-0">
                  <ClipboardList className="size-8 text-slate-800" strokeWidth={1.8} />
                </div>
                <div className="flex-1 flex flex-col justify-start items-start gap-1">
                  <span className="text-slate-700 text-base sm:text-lg font-medium font-['Wix_Madefor_Text'] leading-6">
                    Total Requests
                  </span>
                  <span className="text-black text-3xl sm:text-4xl font-semibold font-['Wix_Madefor_Text'] leading-tight">
                    46
                  </span>
                </div>
              </div>

              {/* Card 2: Total Applicant */}
              <div className="p-5 bg-cyan-700/5 rounded-xl border border-zinc-100 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex items-center gap-5 transition-transform hover:-translate-y-0.5">
                <div className="size-14 p-3 bg-cyan-700/10 rounded-full flex justify-center items-center shrink-0">
                  <Users className="size-8 text-slate-800" strokeWidth={1.8} />
                </div>
                <div className="flex-1 flex flex-col justify-start items-start gap-1">
                  <span className="text-slate-700 text-base sm:text-lg font-medium font-['Wix_Madefor_Text'] leading-6">
                    Total Applicant
                  </span>
                  <span className="text-black text-3xl sm:text-4xl font-semibold font-['Wix_Madefor_Text'] leading-tight">
                    5645
                  </span>
                </div>
              </div>

              {/* Card 3: Total Job Post */}
              <div className="p-5 bg-cyan-700/5 rounded-xl border border-zinc-100 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex items-center gap-5 transition-transform hover:-translate-y-0.5">
                <div className="size-14 p-3 bg-cyan-700/10 rounded-full flex justify-center items-center shrink-0">
                  <Briefcase className="size-8 text-slate-800" strokeWidth={1.8} />
                </div>
                <div className="flex-1 flex flex-col justify-start items-start gap-1">
                  <span className="text-slate-700 text-base sm:text-lg font-medium font-['Wix_Madefor_Text'] leading-6">
                    Total Job Post
                  </span>
                  <span className="text-black text-3xl sm:text-4xl font-semibold font-['Wix_Madefor_Text'] leading-tight">
                    120
                  </span>
                </div>
              </div>

              {/* Card 4: Completed Request */}
              <div className="p-5 bg-cyan-700/5 rounded-xl border border-zinc-100 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex items-center gap-5 transition-transform hover:-translate-y-0.5">
                <div className="size-14 p-3 bg-cyan-700/10 rounded-full flex justify-center items-center shrink-0">
                  <CheckCircle2 className="size-8 text-slate-800" strokeWidth={1.8} />
                </div>
                <div className="flex-1 flex flex-col justify-start items-start gap-1">
                  <span className="text-slate-700 text-base sm:text-lg font-medium font-['Wix_Madefor_Text'] leading-6">
                    Completed Request
                  </span>
                  <span className="text-black text-3xl sm:text-4xl font-semibold font-['Wix_Madefor_Text'] leading-tight">
                    25
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Placement Pipeline & Most Applied 5 Positions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {/* Placement Pipeline Chart Card (2 Columns) */}
              <div className="lg:col-span-2 p-5 sm:p-6 bg-cyan-700/5 rounded-xl border border-zinc-100 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between gap-6">
                {/* Header with Title & Filter Pills */}
                <div className="w-full flex items-center justify-between">
                  <h2 className="text-slate-800 text-xl sm:text-2xl font-semibold font-['Wix_Madefor_Text'] leading-7">
                    Placement Pipeline
                  </h2>
                  <div className="flex items-center gap-1.5">
                    {timeFilters.map((tf) => {
                      const isActive = selectedTimeFilter === tf;
                      return (
                        <button
                          key={tf}
                          type="button"
                          onClick={() => setSelectedTimeFilter(tf)}
                          className={`px-3 py-1 rounded-2xl text-xs transition-colors cursor-pointer ${
                            isActive
                              ? "bg-cyan-700 text-white font-medium"
                              : "border border-gray-400 text-gray-500 hover:bg-neutral-100 font-normal"
                          }`}
                        >
                          {tf}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* SVG Area Line Chart with Axis & Grid */}
                <div className="w-full flex flex-col gap-2">
                  <div className="w-full flex items-stretch gap-3">
                    {/* Y-Axis labels */}
                    <div className="h-64 sm:h-72 flex flex-col justify-between items-end text-gray-500 text-xs font-normal font-['Wix_Madefor_Text'] pr-1 select-none">
                      <span>5000</span>
                      <span>3000</span>
                      <span>2000</span>
                      <span>1000</span>
                      <span>500</span>
                      <span>100</span>
                    </div>

                    {/* Chart Container */}
                    <div className="flex-1 h-64 sm:h-72 relative flex flex-col justify-between">
                      {/* Grid Lines */}
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                        <div className="w-full border-b border-neutral-300/80" />
                        <div className="w-full border-b border-neutral-300/80" />
                        <div className="w-full border-b border-neutral-300/80" />
                        <div className="w-full border-b border-neutral-300/80" />
                        <div className="w-full border-b border-neutral-300/80" />
                        <div className="w-full border-b border-neutral-300/80" />
                      </div>

                      {/* SVG Wave Line & Gradient Area */}
                      <svg
                        className="w-full h-full absolute inset-0 overflow-visible"
                        viewBox="0 0 600 240"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient
                            id="pipelineGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop offset="0%" stopColor="#0e7490" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#0e7490" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Area Fill */}
                        <path
                          d="M 0 160 Q 40 155, 75 140 T 150 145 T 225 125 T 300 115 T 375 110 T 450 85 T 525 65 T 600 75 L 600 240 L 0 240 Z"
                          fill="url(#pipelineGradient)"
                        />

                        {/* Stroke Line */}
                        <path
                          d="M 0 160 Q 40 155, 75 140 T 150 145 T 225 125 T 300 115 T 375 110 T 450 85 T 525 65 T 600 75"
                          fill="none"
                          stroke="#0e7490"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        />
                      </svg>

                      {/* Tooltip / Marker at March (approx 12.5% across) */}
                      <div className="absolute left-[13%] top-[38%] bottom-0 flex flex-col items-center pointer-events-none">
                        <div className="px-2 py-1 bg-white rounded-md shadow-md border border-neutral-200 flex flex-col items-center -translate-y-full mb-1">
                          <span className="text-gray-500 text-[9px] leading-tight">March</span>
                          <span className="text-zinc-800 text-xs font-bold leading-tight">1500</span>
                        </div>
                        <div className="size-2 rounded-full bg-cyan-700 ring-4 ring-cyan-700/20" />
                        <div className="flex-1 w-px border-r border-dashed border-neutral-400" />
                      </div>
                    </div>
                  </div>

                  {/* X-Axis labels */}
                  <div className="w-full flex justify-between items-center pl-10 pr-2 pt-1 text-gray-500 text-xs font-normal font-['Wix_Madefor_Text'] select-none">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep</span>
                    <span>Oct</span>
                    <span>Nov</span>
                    <span>Dec</span>
                  </div>
                </div>
              </div>

              {/* Most Applied 5 Positions Donut Chart Card (1 Column) */}
              <div className="lg:col-span-1 p-5 sm:p-6 bg-cyan-700/5 rounded-xl border border-zinc-100 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between items-center gap-6">
                <h2 className="text-slate-800 text-xl sm:text-2xl font-semibold font-['Wix_Madefor_Text'] leading-7 text-center">
                  Most Applied 5 Positions
                </h2>

                {/* SVG Donut Chart */}
                <div className="relative size-60 sm:size-64 flex items-center justify-center">
                  <svg className="size-full -rotate-90" viewBox="0 0 200 200">
                    {/* Background circle */}
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      fill="transparent"
                      stroke="#f1f5f9"
                      strokeWidth="28"
                    />

                    {/* Segment 1: Support Worker (890 / 2549 ≈ 35%) -> Green */}
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      fill="transparent"
                      stroke="#22c55e"
                      strokeWidth="28"
                      strokeDasharray="154 440"
                      strokeDashoffset="0"
                    />

                    {/* Segment 2: Live-in Carer (720 / 2549 ≈ 28%) -> Amber/Orange */}
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      fill="transparent"
                      stroke="#f97316"
                      strokeWidth="28"
                      strokeDasharray="123 440"
                      strokeDashoffset="-154"
                    />

                    {/* Segment 3: Senior Carer (313 / 2549 ≈ 12%) -> Fuchsia/Pink */}
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      fill="transparent"
                      stroke="#d946ef"
                      strokeWidth="28"
                      strokeDasharray="53 440"
                      strokeDashoffset="-277"
                    />

                    {/* Segment 4: Support Worker (313 / 2549 ≈ 12%) -> Dark Slate */}
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      fill="transparent"
                      stroke="#1e293b"
                      strokeWidth="28"
                      strokeDasharray="53 440"
                      strokeDashoffset="-330"
                    />

                    {/* Segment 5: Live-in Carer (313 / 2549 ≈ 12%) -> Cyan 700 */}
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      fill="transparent"
                      stroke="#0e7490"
                      strokeWidth="28"
                      strokeDasharray="57 440"
                      strokeDashoffset="-383"
                    />
                  </svg>
                </div>

                {/* Legend with Color Dots and Counts */}
                <div className="w-full flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs">
                  <div className="inline-flex items-center gap-1.5">
                    <span className="size-2.5 bg-green-500 rounded-full shrink-0" />
                    <span className="text-slate-800 font-normal">Support Worker</span>
                    <span className="text-slate-800 font-semibold">890</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5">
                    <span className="size-2.5 bg-orange-500 rounded-full shrink-0" />
                    <span className="text-slate-800 font-normal">Live-in Carer</span>
                    <span className="text-slate-800 font-semibold">720</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5">
                    <span className="size-2.5 bg-fuchsia-500 rounded-full shrink-0" />
                    <span className="text-slate-800 font-normal">Senior Carer</span>
                    <span className="text-slate-800 font-semibold">313</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5">
                    <span className="size-2.5 bg-cyan-700 rounded-full shrink-0" />
                    <span className="text-slate-800 font-normal">Support Worker</span>
                    <span className="text-slate-800 font-semibold">313</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5">
                    <span className="size-2.5 bg-slate-800 rounded-full shrink-0" />
                    <span className="text-slate-800 font-normal">Live-in Carer</span>
                    <span className="text-slate-800 font-semibold">313</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}