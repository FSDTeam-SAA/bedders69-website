"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RecruitmentAgencySidebar from "@/features/recruitment-agency/components/RecruitmentAgencySidebar";
import {
  Briefcase,
  CheckCircle2,
  ClipboardList,
  Loader2,
  Users,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const timeFilters = ["1M", "3M", "6M", "1Y"];

export default function Overview() {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("1Y");
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [stats, setStats] = useState({
    totalRequests: 0,
    completedRequests: 0,
    totalJobPosts: 0,
    totalApplicants: 0,
    mostApplied: [] as Array<{ title: string; count: number }>,
    monthlyPipeline: [] as number[],
    agencyName: "CareRecruitPro",
    logoUrl: "",
  });

  useEffect(() => {
    async function loadOverviewStats() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/recruitment-agency/overview", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setStats({
              totalRequests: data.totalRequests ?? 0,
              completedRequests: data.completedRequests ?? 0,
              totalJobPosts: data.totalJobPosts ?? 0,
              totalApplicants: data.totalApplicants ?? 0,
              mostApplied: Array.isArray(data.mostApplied) ? data.mostApplied : [],
              monthlyPipeline: Array.isArray(data.monthlyPipeline) ? data.monthlyPipeline : [],
              agencyName: data.agencyName || "CareRecruitPro",
              logoUrl: data.logoUrl || "",
            });
          }
        }
      } catch (err) {
        console.error("Failed to load agency overview stats:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadOverviewStats();
  }, []);

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
                {stats.logoUrl ? (
                  <img src={stats.logoUrl} alt={stats.agencyName} className="h-full w-full object-cover" />
                ) : (
                  <Image
                    src="/images/logo.png"
                    alt="CareRecruitPro"
                    fill
                    className="object-contain p-1"
                  />
                )}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold leading-tight text-slate-800">
                  {stats.agencyName}
                </span>
                <span className="text-xs font-normal text-gray-500">
                  Agency
                </span>
              </div>
            </Link>
          </header>

          {/* Main Dashboard Grid Area */}
          <div className="mx-auto container p-4 sm:p-6 lg:p-8 space-y-6 pb-20 max-w-[1616px]">
            {isLoading ? (
              <div className="flex w-full items-center justify-center p-12 bg-white rounded-xl border border-zinc-100">
                <Loader2 className="size-8 text-cyan-700 animate-spin" />
                <span className="ml-3 text-base text-slate-600">Loading overview dashboard metrics...</span>
              </div>
            ) : (
              <>
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
                        {stats.totalRequests}
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
                        {stats.totalApplicants}
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
                        {stats.totalJobPosts}
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
                        {stats.completedRequests}
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

                {/* Recharts Area Line Chart */}
                {(() => {
                  if (!isMounted) return null;

                  const monthsAll = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                  const currentMonthIdx = new Date().getMonth();

                  const rawPipeline = Array.isArray(stats.monthlyPipeline) && stats.monthlyPipeline.length === 12
                    ? stats.monthlyPipeline
                    : Array(12).fill(0);

                  let activeMonths = monthsAll;
                  let activeValues = rawPipeline;

                  if (selectedTimeFilter === "1M") {
                    const currentVal = rawPipeline[currentMonthIdx] ?? rawPipeline[rawPipeline.length - 1] ?? 0;
                    activeMonths = ["Week 1", "Week 2", "Week 3", "Week 4"];
                    activeValues = [
                      Math.round(currentVal * 0.1),
                      Math.round(currentVal * 0.25),
                      Math.round(currentVal * 0.5),
                      currentVal,
                    ];
                  } else if (selectedTimeFilter === "3M") {
                    const start = Math.max(0, currentMonthIdx - 2);
                    const end = currentMonthIdx + 1;
                    activeMonths = monthsAll.slice(start, end);
                    activeValues = rawPipeline.slice(start, end);
                  } else if (selectedTimeFilter === "6M") {
                    const start = Math.max(0, currentMonthIdx - 5);
                    const end = currentMonthIdx + 1;
                    activeMonths = monthsAll.slice(start, end);
                    activeValues = rawPipeline.slice(start, end);
                  }

                  const chartData = activeMonths.map((name, idx) => ({
                    name,
                    value: activeValues[idx] ?? 0,
                  }));

                  return (
                    <div className="w-full h-72 sm:h-80 pt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                          <defs>
                            <linearGradient id="pipelineColor" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0e7490" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#0e7490" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#64748b", fontSize: 12 }}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#64748b", fontSize: 12 }}
                            allowDecimals={false}
                          />
                          <RechartsTooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const item = payload[0];
                                return (
                                  <div className="bg-slate-900 text-white px-3 py-2 rounded-lg shadow-lg border border-slate-800 text-xs font-semibold">
                                    <p className="text-slate-300 text-[11px] mb-0.5">{item.payload.name}</p>
                                    <p className="text-white text-sm font-bold">{item.value} Placements</p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#0e7490"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#pipelineColor)"
                            activeDot={{ r: 6, fill: "#0e7490", stroke: "#ffffff", strokeWidth: 2 }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  );
                })()}
              </div>

              {/* Most Applied 5 Positions Donut Chart Card (1 Column) */}
              <div className="lg:col-span-1 p-5 sm:p-6 bg-cyan-700/5 rounded-xl border border-zinc-100 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between items-center gap-6">
                <h2 className="text-slate-800 text-xl sm:text-2xl font-semibold font-['Wix_Madefor_Text'] leading-7 text-center">
                  Most Applied 5 Positions
                </h2>

                {(() => {
                  if (!isMounted) return null;

                  const hasMostAppliedData = Array.isArray(stats.mostApplied) && stats.mostApplied.length > 0;
                  const pieColors = ["#22c55e", "#f97316", "#d946ef", "#0e7490", "#1e293b"];
                  const pieData = hasMostAppliedData
                    ? stats.mostApplied.map((item, idx) => ({
                        name: item.title,
                        value: item.count,
                        color: pieColors[idx % pieColors.length],
                      }))
                    : [];

                  if (!hasMostAppliedData) {
                    return (
                      <div className="w-full h-64 flex flex-col items-center justify-center text-gray-400 gap-3 py-6">
                        <div className="relative size-32 flex flex-col items-center justify-center rounded-full border-4 border-dashed border-cyan-700/20 bg-white shadow-inner">
                          <Users className="size-8 text-cyan-700/40 mb-1" />
                          <span className="text-xs text-slate-500 font-semibold">0 Applicants</span>
                        </div>
                        <p className="text-sm font-medium text-slate-600">No application data yet</p>
                      </div>
                    );
                  }

                  return (
                    <>
                      {/* Recharts Donut PieChart */}
                      <div className="w-full h-64 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={90}
                              paddingAngle={4}
                              dataKey="value"
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                              ))}
                            </Pie>
                            <RechartsTooltip
                              content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                  const data = payload[0];
                                  return (
                                    <div className="bg-slate-900 text-white px-3 py-2 rounded-lg shadow-lg border border-slate-800 text-xs font-semibold">
                                      <p className="text-slate-300 text-[11px] mb-0.5">{data.name}</p>
                                      <p className="text-white text-sm font-bold">{data.value} Applicants</p>
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Legend with Color Dots and Counts */}
                      <div className="w-full flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs">
                        {pieData.map((item, idx) => (
                          <div key={idx} className="inline-flex items-center gap-1.5">
                            <span
                              className="size-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-slate-800 font-normal">{item.name}</span>
                            <span className="text-slate-800 font-semibold">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
</main>
);
}