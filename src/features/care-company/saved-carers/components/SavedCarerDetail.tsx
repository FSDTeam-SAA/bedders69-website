"use client";

import React from "react";
import Link from "next/link";
import CareCompanySidebar from "@/features/care-company/components/CareCompanySidebar";
import CareCompanyHeaderBadge from "@/features/care-company/components/CareCompanyHeaderBadge";
import { Check, ChevronLeft, Clock3, MapPin, Loader2 } from "lucide-react";
import { useSavedCarerDetail } from "../hooks/useSavedCarers";

interface SavedCarerDetailProps {
  id: string;
}

export default function SavedCarerDetail({ id }: SavedCarerDetailProps) {
  const { carer: apiCarer, isLoading, error } = useSavedCarerDetail(id);

  const carer = apiCarer
    ? {
        id: apiCarer.carerId || apiCarer.id || id,
        name: apiCarer.name || "Carer",
        subtitle: "See the details",
        about: apiCarer.bio || "No biography provided.",
        skills: Array.isArray(apiCarer.skills) && apiCarer.skills.length > 0 ? apiCarer.skills : [],
        availability: apiCarer.availability || "Not specified",
        qualifications:
          Array.isArray(apiCarer.qualifications) && apiCarer.qualifications.length > 0
            ? apiCarer.qualifications
            : [],
        serviceArea: apiCarer.serviceArea || apiCarer.location || "Not specified",
      }
    : null;

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-['Wix_Madefor_Text',Arial,sans-serif] text-[#203746]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1920px] flex-col lg:flex-row">
        {/* Left Sidebar */}
        <CareCompanySidebar activeHref="/care-company/save-carers" />

        {/* Right Main Content */}
        <div className="min-w-0 flex-1">
          {/* Header */}
          <header className="flex min-h-[96px] w-full items-center justify-between bg-white px-6 py-6 border-b border-[#f0f1f2]">
            <div className="inline-flex items-center gap-2.5">
              <Link
                href="/care-company/save-carers"
                className="inline-flex items-center justify-center text-[#2b6ea6] hover:text-[#20527f] transition-colors p-1 rounded-md hover:bg-neutral-50 cursor-pointer"
                aria-label="Back to Saved Carers"
              >
                <ChevronLeft className="h-6 w-6 stroke-[2.5]" />
              </Link>
              <div className="flex flex-col justify-start items-start gap-1">
                <h1 className="text-2xl font-bold leading-7 text-[#2b6ea6]">
                  {carer?.name || "Carer Details"}
                </h1>
                <p className="text-xs font-normal leading-4 text-gray-500">
                  {carer ? carer.subtitle : "Details view"}
                </p>
              </div>
            </div>
            <CareCompanyHeaderBadge />
          </header>

          {/* Details Content Area */}
          <div className="p-4 sm:p-6 lg:p-8 space-y-4 max-w-6xl pb-16">
            {isLoading ? (
              <div className="flex min-h-[300px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#2b6ea6]" />
              </div>
            ) : !carer ? (
              <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl bg-white p-12 text-center border border-slate-100">
                <p className="text-slate-600 font-medium">Carer details not found.</p>
                <Link
                  href="/care-company/save-carers"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#2b6ea6] px-4 py-2 text-sm font-medium text-white hover:bg-[#20527f] transition-colors"
                >
                  Back to Saved Carers
                </Link>
              </div>
            ) : (
              <>
                {/* 1. About */}
                <section className="self-stretch p-5 bg-white rounded-xl border border-zinc-100 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col justify-start items-start gap-4">
                  <h3 className="justify-center text-slate-800 text-2xl font-semibold font-['Wix_Madefor_Text'] leading-7">
                    About
                  </h3>
                  <p className="max-w-[999px] justify-start text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-relaxed">
                    {carer.about}
                  </p>
                </section>

                {/* 2. Skills & Specialisms */}
                <section className="self-stretch p-5 bg-white rounded-xl border border-zinc-100 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col justify-start items-start gap-4">
                  <h3 className="justify-center text-slate-800 text-2xl font-semibold font-['Wix_Madefor_Text'] leading-7">
                    Skills & Specialisms
                  </h3>
                  {carer.skills.length > 0 ? (
                    <div className="inline-flex flex-wrap justify-start items-center gap-2">
                      {carer.skills.map((skill) => (
                        <div
                          key={skill}
                          className="h-6 px-3 bg-slate-100 rounded-full flex justify-center items-center gap-2.5"
                        >
                          <span className="text-center justify-center text-cyan-700 text-xs font-semibold font-['Wix_Madefor_Text'] leading-4">
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No skills listed.</p>
                  )}
                </section>

                {/* 3. Availability */}
                <section className="self-stretch p-5 bg-white rounded-xl border border-zinc-100 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col justify-start items-start gap-4">
                  <h3 className="justify-center text-slate-800 text-2xl font-semibold font-['Wix_Madefor_Text'] leading-7">
                    Availability
                  </h3>
                  <div className="w-full max-w-[998px] inline-flex justify-start items-start gap-2">
                    <Clock3 className="h-5 w-5 text-cyan-700 mt-0.5 shrink-0" strokeWidth={1.8} />
                    <p className="justify-start text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-relaxed">
                      {carer.availability}
                    </p>
                  </div>
                </section>

                {/* 4. Qualifications */}
                <section className="self-stretch p-5 bg-white rounded-xl border border-zinc-100 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col justify-start items-start gap-4">
                  <h3 className="justify-center text-slate-800 text-2xl font-semibold font-['Wix_Madefor_Text'] leading-7">
                    Qualifications
                  </h3>
                  {carer.qualifications.length > 0 ? (
                    <div className="w-full max-w-[998px] flex flex-col justify-start items-start gap-2">
                      {carer.qualifications.map((qualification) => (
                        <div
                          key={qualification}
                          className="self-stretch inline-flex justify-start items-center gap-2"
                        >
                          <Check
                            className="h-4 w-4 text-emerald-500 shrink-0"
                            strokeWidth={2.5}
                          />
                          <span className="justify-center text-slate-800 text-sm font-normal font-['Wix_Madefor_Text'] leading-4">
                            {qualification}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No qualifications listed.</p>
                  )}
                </section>

                {/* 5. Service Area */}
                <section className="self-stretch p-5 bg-white rounded-xl border border-zinc-100 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col justify-start items-start gap-4">
                  <h3 className="justify-center text-slate-800 text-2xl font-semibold font-['Wix_Madefor_Text'] leading-7">
                    Service Area
                  </h3>
                  <div className="inline-flex justify-start items-center gap-2">
                    <div className="flex justify-start items-center gap-1">
                      <MapPin
                        className="h-4 w-4 text-cyan-700 shrink-0"
                        strokeWidth={1.8}
                      />
                      <span className="justify-start text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-5">
                        {carer.serviceArea}
                      </span>
                    </div>
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
