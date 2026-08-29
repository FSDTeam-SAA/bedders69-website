"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import CareCompanySidebar from "@/features/care-company/components/CareCompanySidebar";
import { Check, ChevronLeft, Clock3, MapPin } from "lucide-react";

export interface CarerDetailData {
  id: string;
  name: string;
  subtitle?: string;
  about: string;
  skills: string[];
  availability: string;
  qualifications: string[];
  serviceArea: string;
}

export const savedCarersData: Record<string, CarerDetailData> = {
  "1": {
    id: "1",
    name: "Matthew Warkentin",
    subtitle: "See the details",
    about:
      "Matthew Warkentin is a compassionate and dedicated professional carer with over 8 years of experience supporting older adults and individuals with complex care needs. He specialises in residential care, dementia support, personal care, respite care, and medication assistance. Known for his patient-centred approach, Matthew is committed to promoting dignity, independence, and well-being while building trusted relationships with clients and their families. His goal is to deliver high-quality, compassionate care tailored to each individual's unique needs.",
    skills: [
      "Dementia Care",
      "Medication Admin",
      "Palliative Care",
      "Mental Health",
      "Night Shifts",
    ],
    availability:
      "Mon–Fri 7am–6pm · Sat 8am–2pm · Emergency 24/7 · Weekends · Day Shifts · Night Shifts · Live-In",
    qualifications: [
      "NVQ Level 3 Health & Social Care",
      "First Aid Certificate (2023)",
      "Dementia Care Training",
    ],
    serviceArea: "Manchester, Greater Manchester",
  },
  "2": {
    id: "2",
    name: "Sarah Palmer",
    subtitle: "See the details",
    about:
      "Sarah Palmer is a dedicated and empathetic support worker with over 6 years of expertise focusing on mental health, autism spectrum assistance, and emotional well-being. She excels in establishing secure and reassuring routines for her clients while actively promoting independence and confidence.",
    skills: [
      "Mental Health Support",
      "Crisis Intervention",
      "Autism Care",
      "Medication Management",
      "Day Shifts",
    ],
    availability:
      "Mon–Fri 8am–6pm · Sat 9am–3pm · Flexible Shifts · Emergency Support",
    qualifications: [
      "BSc in Health & Social Care",
      "Mental Health First Aid Certified",
      "Safeguarding Adults Level 3",
    ],
    serviceArea: "Birmingham, West Midlands",
  },
  "3": {
    id: "3",
    name: "John Smith",
    subtitle: "See the details",
    about:
      "John Smith is an experienced Home Carer specializing in personal care, palliative support, and companionship. With more than 7 years of direct care experience, John brings enthusiasm, respect, and utmost dependability to every household he assists.",
    skills: [
      "Personal Care",
      "Companionship",
      "Mobility Handling",
      "Respite Care",
      "Live-In Support",
    ],
    availability:
      "Mon–Sun 7am–8pm · Overnight Care · Live-In Available · Weekends",
    qualifications: [
      "NVQ Level 3 in Health and Social Care",
      "First Aid at Work (2024)",
      "Manual Handling & Hoist Certified",
    ],
    serviceArea: "Manchester, Greater Manchester",
  },
};

export default function SavedCarerDetail({ id }: { id: string }) {
  const carer = savedCarersData[id] || savedCarersData["1"];

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
                  {carer.name}
                </h1>
                <p className="text-xs font-normal leading-4 text-gray-500">
                  {carer.subtitle || "See the details"}
                </p>
              </div>
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

          {/* Details Cards Container */}
          <div className="p-4 sm:p-6 lg:p-8 space-y-4 max-w-6xl pb-16">
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
          </div>
        </div>
      </div>
    </main>
  );
}
