"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RecruitmentAgencySidebar from "@/features/recruitment-agency/components/RecruitmentAgencySidebar";
import {
  Bell,
  Check,
  CheckSquare,
  ChevronDown,
  ChevronLeft,
} from "lucide-react";

export default function CarerDetail({ id }: { id?: string }) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const skills = [
    "Personal Care",
    "Medication Administration",
    "Companionship",
    "Moving & Handling",
    "Live-in Care",
    "First Aid",
    "Catheter Care",
    "PEG Feeding",
    "Hoist Handling",
    "Record Keeping",
  ];

  const specialisms = [
    "Dementia Care",
    "Alzheimer's Care",
    "Parkinson's Care",
    "Stroke Recovery",
    "Diabetes Care",
    "Palliative Care",
    "Mental Health Support",
    "Learning Disabilities",
    "Brain Injury Support",
    "Autism Support",
    "Elderly Care",
    "End of Life Care",
  ];

  const workPreferences = [
    "Full-Time",
    "Part-Time",
    "Temporary",
    "Contract",
    "Live-in Care",
    "Day Shift",
    "Night Shift",
    "Weekend Only",
    "Flexible Hours",
  ];

  const workTypes = [
    "Live-in Care",
    "Home Care",
    "Residential Care",
    "Nursing Home",
    "Hospital Care",
  ];

  const shifts = ["Day Shift", "Night Shift", "Weekend", "Flexible", "Rotational"];

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
        <RecruitmentAgencySidebar activeHref="/recruitment-agency/carer-directory" />

        {/* Right Main Content */}
        <div className="min-w-0 flex-1">
          {/* Top Header Banner */}
          <header className="w-full px-6 sm:px-10 py-5 bg-cyan-700/10 flex items-center justify-between border-b border-cyan-700/10">
            <div className="flex items-center gap-3">
              <Link
                href="/recruitment-agency/carer-directory"
                className="p-1.5 rounded-lg text-slate-700 hover:text-cyan-700 hover:bg-white/50 transition-colors"
                title="Back to Carer Directory"
              >
                <ChevronLeft className="size-6 stroke-[2.5]" />
              </Link>
              <div className="flex flex-col justify-start items-start gap-0.5">
                <h1 className="text-black text-2xl sm:text-3xl font-semibold font-['Wix_Madefor_Text'] leading-tight">
                  Carer Details
                </h1>
                <p className="text-slate-700 text-sm sm:text-base lg:text-lg font-normal font-['Wix_Madefor_Text'] leading-normal">
                  Review complete profile and qualifications
                </p>
              </div>
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

          {/* Body Content Container */}
          <div className="mx-auto container p-4 sm:p-6 lg:p-8 space-y-6 pb-20 max-w-[1536px]">
            {/* Hero Profile Banner Card */}
            <div className="w-full bg-white rounded-2xl border border-neutral-200/80 shadow-[0px_2px_4px_rgba(0,0,0,0.03)] overflow-hidden">
              {/* Banner Image */}
              <div className="relative w-full h-48 sm:h-64 bg-slate-200">
                <Image
                  src="/images/carer_directory_banner.jpg"
                  alt="Carer Consultation"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Avatar + Carer Name */}
              <div className="px-6 sm:px-8 pb-6 flex flex-col sm:flex-row items-start sm:items-end gap-5">
                <div className="relative -mt-16 sm:-mt-20 shrink-0">
                  <div className="size-28 sm:size-36 rounded-full bg-white p-1.5 shadow-xl border-2 border-cyan-700/20 overflow-hidden relative">
                    <Image
                      src="/images/carer-male.png"
                      alt="Cody Fisher"
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                </div>

                <div className="flex-1 pb-1">
                  <h2 className="text-neutral-900 text-2xl sm:text-3xl font-semibold font-['Wix_Madefor_Text'] leading-tight">
                    Cody Fisher
                  </h2>
                  <p className="text-zinc-500 text-base sm:text-lg font-normal font-['Wix_Madefor_Text'] mt-0.5">
                    @codyfisher
                  </p>
                </div>
              </div>
            </div>

            {/* 1. Personal Information Card */}
            <div className="w-full p-6 sm:p-7 bg-cyan-700/5 rounded-xl border border-zinc-100/60 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-5">
              <h3 className="text-slate-800 text-xl font-semibold font-['Wix_Madefor_Text'] leading-6">
                Personal Information
              </h3>

              {/* Row 1: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                    Email
                  </span>
                  <span className="text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-5">
                    hwestiii@outlook.com
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                    Phone Number
                  </span>
                  <span className="text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-5">
                    (307) 555-0133
                  </span>
                </div>
              </div>

              {/* Row 2: Country & State/Region */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                    Country
                  </span>
                  <span className="text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-5">
                    United Kingdom
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                    State/Region
                  </span>
                  <div className="inline-flex items-center justify-between text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-5 max-w-xs">
                    <span>Greater Manchester</span>
                    <ChevronDown className="size-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Row 3: Nationality & Postcode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                    Nationality
                  </span>
                  <span className="text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-5">
                    British
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                    Postcode
                  </span>
                  <span className="text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-5">
                    M1 1AA
                  </span>
                </div>
              </div>

              {/* Row 4: Date of Birth & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                    Date of Birth
                  </span>
                  <span className="text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-5">
                    15/11/2003
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                    Gender
                  </span>
                  <span className="text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-5">
                    Male
                  </span>
                </div>
              </div>

              {/* Row 5: Address */}
              <div className="flex flex-col gap-1.5">
                <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                  Address
                </span>
                <span className="text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-5">
                  25 Oxford Road, Manchester
                </span>
              </div>
            </div>

            {/* 2. About Me Card */}
            <div className="w-full p-6 sm:p-7 bg-cyan-700/5 rounded-xl border border-zinc-100/60 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-5">
              <h3 className="text-slate-800 text-xl font-semibold font-['Wix_Madefor_Text'] leading-6">
                About Me
              </h3>

              {/* Row 1: Experience & Right to Work */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                    Years of Experience
                  </span>
                  <span className="text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-5">
                    8 Years
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                    Right to work in the UK
                  </span>
                  <span className="text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-5">
                    Yes
                  </span>
                </div>
              </div>

              {/* Row 2: Professional Summary */}
              <div className="flex flex-col gap-2">
                <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                  Professional Summary
                </span>
                <p className="text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-6 max-w-7xl">
                  Compassionate and dedicated Senior Care Assistant with over 8 years of experience providing high-quality care for elderly individuals, including dementia, palliative, and home care services. Skilled in medication administration, personal care, mobility assistance, and building strong relationships with clients and families. Committed to delivering person-centred care while maintaining dignity, safety, and independence.
                </p>
              </div>
            </div>

            {/* 3. Work Experience Card */}
            <div className="w-full p-6 sm:p-7 bg-cyan-700/5 rounded-xl border border-zinc-100/60 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-4">
              <h3 className="text-slate-800 text-xl font-semibold font-['Wix_Madefor_Text'] leading-6">
                Work Experience
              </h3>

              <div className="flex flex-col gap-1.5 pt-1">
                <h4 className="text-slate-800 text-2xl font-semibold font-['Wix_Madefor_Text'] leading-7">
                  ABC Care Ltd.
                </h4>
                <p className="text-slate-800 text-lg font-normal font-['Wix_Madefor_Text'] leading-6">
                  Support Worker · Full-time
                </p>
                <p className="text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-5">
                  May 12, 2019 - May 12, 2024
                </p>
              </div>
            </div>

            {/* 4. Skills Card */}
            <div className="w-full p-6 sm:p-7 bg-cyan-700/5 rounded-xl border border-zinc-100/60 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-5">
              <h3 className="text-slate-800 text-xl font-semibold font-['Wix_Madefor_Text'] leading-6">
                Skills
              </h3>

              <div className="flex flex-wrap items-center gap-3">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="px-4 py-2 rounded-lg border border-neutral-400 bg-white text-gray-700 text-sm sm:text-base font-normal font-['Wix_Madefor_Text']"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Specialisms Card */}
            <div className="w-full p-6 sm:p-7 bg-cyan-700/5 rounded-xl border border-zinc-100/60 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-5">
              <h3 className="text-slate-800 text-xl font-semibold font-['Wix_Madefor_Text'] leading-6">
                Specialisms
              </h3>

              <div className="flex flex-wrap items-center gap-3">
                {specialisms.map((spec) => (
                  <div
                    key={spec}
                    className="px-4 py-2 rounded-lg border border-neutral-400 bg-white text-gray-700 text-sm sm:text-base font-normal font-['Wix_Madefor_Text']"
                  >
                    {spec}
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Work Preferences Card */}
            <div className="w-full p-6 sm:p-7 bg-cyan-700/5 rounded-xl border border-zinc-100/60 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-5">
              <h3 className="text-slate-800 text-xl font-semibold font-['Wix_Madefor_Text'] leading-6">
                Work Preferences
              </h3>

              <div className="flex flex-wrap items-center gap-3">
                {workPreferences.map((pref) => (
                  <div
                    key={pref}
                    className="px-4 py-2 rounded-lg border border-neutral-400 bg-white text-gray-700 text-sm sm:text-base font-normal font-['Wix_Madefor_Text']"
                  >
                    {pref}
                  </div>
                ))}
              </div>
            </div>

            {/* 7. Availability & Coverage Card */}
            <div className="w-full p-6 sm:p-7 bg-cyan-700/5 rounded-xl border border-zinc-100/60 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-6">
              <h3 className="text-slate-800 text-xl font-semibold font-['Wix_Madefor_Text'] leading-6">
                Availability & Coverage
              </h3>

              {/* Row 1: Current Availability & Preferred Regions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                    Current Availability
                  </span>
                  <span className="text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-5">
                    Available Immediately
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                    Preferred Regions
                  </span>
                  <div className="inline-flex items-center justify-between text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-5 max-w-md">
                    <span>Greater Manchester, Lancashire</span>
                    <ChevronDown className="size-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Row 2: Preferred Cities & Maximum Travel Distance */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                    Preferred Cities
                  </span>
                  <span className="text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-5">
                    Manchester, Salford, Bolton
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                    Maximum Travel Distance
                  </span>
                  <span className="text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-5">
                    Up to 30 Miles
                  </span>
                </div>
              </div>

              {/* Row 3: Preferred Work Type & Preferred Shift with Checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                {/* Preferred Work Type */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                    Preferred Work Type
                  </span>
                  <div className="space-y-2">
                    {workTypes.map((type) => (
                      <div key={type} className="flex items-center gap-2 text-gray-600 text-base">
                        <CheckSquare className="size-4 text-gray-600 shrink-0" />
                        <span>{type}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preferred Shift */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                    Preferred Shift
                  </span>
                  <div className="space-y-2">
                    {shifts.map((shift) => (
                      <div key={shift} className="flex items-center gap-2 text-gray-600 text-base">
                        <CheckSquare className="size-4 text-gray-600 shrink-0" />
                        <span>{shift}</span>
                      </div>
                    ))}
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
