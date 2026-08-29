"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RecruitmentAgencySidebar from "@/features/recruitment-agency/components/RecruitmentAgencySidebar";
import {
  Bell,
  Briefcase,
  Building2,
  Check,
  ChevronDown,
  ChevronLeft,
  MapPin,
  X,
} from "lucide-react";

interface RequestData {
  id: string;
  companyName: string;
  companyLocation: string;
  position: string;
  carersNeeded: string;
  location: string;
  salary: string;
  details: string[];
}

const staffingRequestsData: Record<string, RequestData> = {
  "SR-1025": {
    id: "SR-1025",
    companyName: "Care Plus Ltd",
    companyLocation: "Austin, TX",
    position: "Support Worker",
    carersNeeded: "3 Carers",
    location: "London, United Kingdom",
    salary: "£18.50 / Hour",
    details: [
      "Care Plus Ltd. is seeking three experienced Support Workers to join their care team in London. The successful candidates will be responsible for delivering high-quality personal care and support to elderly clients, including individuals living with dementia. This is a full-time night shift position offering a competitive hourly rate of £18.50, with an expected start date of 15 August 2026.",
      "Applicants should have at least two years of professional care experience and be confident in medication administration, personal care, moving and handling, and supporting people with dementia. A valid DBS certificate and driving licence are required, while access to a personal vehicle is preferred. Candidates must demonstrate excellent communication skills, compassion, and the ability to work independently while maintaining high standards of care.",
      "The care company requires suitable candidates to be identified as soon as possible due to the urgent nature of this request. Once shortlisted, candidates will be reviewed by the company before interviews are arranged and final placements are confirmed. Any additional documents or care guidelines provided by the company should be reviewed before recommending candidates.",
    ],
  },
  "SR-1026": {
    id: "SR-1026",
    companyName: "Safe Hands Care",
    companyLocation: "Manchester, UK",
    position: "Live-in Carer",
    carersNeeded: "2 Carers",
    location: "Manchester, United Kingdom",
    salary: "£32,000 – £38,000 / Year",
    details: [
      "Safe Hands Care is actively searching for two dedicated Live-in Carers to assist clients with high-dependency and mobility needs in Greater Manchester.",
      "Candidates must have a minimum of 2 years live-in care background, NVQ Level 2/3 certifications, and strong interpersonal qualities to deliver compassionate care.",
      "Please review and submit qualified carer profiles promptly to initiate interview scheduling.",
    ],
  },
  "SR-1027": {
    id: "SR-1027",
    companyName: "Helping Hearts",
    companyLocation: "Birmingham, UK",
    position: "Senior Carer",
    carersNeeded: "5 Carers",
    location: "Birmingham, United Kingdom",
    salary: "£32,000 – £38,000 / Year",
    details: [
      "Helping Hearts requires five experienced Senior Carers for rotational day and night shifts supporting residential care facilities.",
      "All candidates should hold valid DBS clearance, medication management training, and manual handling certifications.",
    ],
  },
};

export default function StaffingRequestDetail({ id }: { id?: string }) {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [actionStatus, setActionStatus] = useState<"Accepted" | "Rejected" | null>(null);

  // Lookup data or fallback to SR-1025
  const request = (id && staffingRequestsData[id]) || staffingRequestsData["SR-1025"];

  const handleAction = (status: "Accepted" | "Rejected") => {
    setActionStatus(status);
    setToastMessage(`Request ${request.id} has been ${status.toLowerCase()}!`);
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
        <RecruitmentAgencySidebar activeHref="/recruitment-agency/staffing-requests" />

        {/* Right Main Content */}
        <div className="min-w-0 flex-1">
          {/* Top Header Banner */}
          <header className="w-full px-6 sm:px-10 py-5 bg-cyan-700/10 flex items-center justify-between border-b border-cyan-700/10">
            <div className="flex items-center gap-3">
              <Link
                href="/recruitment-agency/staffing-requests"
                className="p-1.5 rounded-lg text-slate-700 hover:text-cyan-700 hover:bg-white/50 transition-colors"
                title="Back to Staffing Requests"
              >
                <ChevronLeft className="size-6 stroke-[2.5]" />
              </Link>
              <div className="flex flex-col justify-start items-start gap-0.5">
                <h1 className="text-black text-2xl sm:text-3xl font-semibold font-['Wix_Madefor_Text'] leading-tight">
                  Request Details
                </h1>
                <p className="text-slate-700 text-sm sm:text-base lg:text-lg font-normal font-['Wix_Madefor_Text'] leading-normal">
                  Request ID : {request.id}
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

          {/* Request Details Content Card */}
          <div className="mx-auto container p-4 sm:p-6 lg:p-8 space-y-6 pb-20 max-w-[1536px]">
            <div className="w-full p-6 sm:p-8 bg-cyan-700/5 rounded-2xl border border-zinc-100/60 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col justify-start items-end gap-6">
              {/* Header inside Card: ID + Company + Action Buttons */}
              <div className="self-stretch flex flex-col sm:flex-row justify-between items-start sm:items-start gap-4">
                {/* Left: Request ID & Care Company */}
                <div className="flex-1 flex flex-col justify-start items-start gap-4">
                  <h2 className="text-slate-800 text-xl font-semibold font-['Wix_Madefor_Text'] leading-6">
                    Request ID : {request.id}
                  </h2>

                  <div className="inline-flex items-center gap-3">
                    {/* Icon Box */}
                    <div className="size-12 bg-slate-300 rounded-lg flex justify-center items-center shrink-0">
                      <Briefcase className="size-6 text-cyan-700 stroke-[1.8]" />
                    </div>

                    <div className="flex flex-col justify-center items-start gap-0.5">
                      <h3 className="text-slate-800 text-xl font-semibold font-['Wix_Madefor_Text'] leading-6">
                        {request.companyName}
                      </h3>
                      <div className="inline-flex items-center gap-1 text-zinc-500 text-sm font-normal font-['Wix_Madefor_Text']">
                        <MapPin className="size-3.5 text-zinc-500" />
                        <span>{request.companyLocation}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Action Pills */}
                <div className="flex items-center gap-2 pt-1">
                  {actionStatus === "Accepted" ? (
                    <div className="px-5 py-2 bg-green-500/20 text-green-700 text-sm font-medium rounded-full flex items-center gap-1">
                      <Check className="size-4" />
                      <span>Accepted</span>
                    </div>
                  ) : actionStatus === "Rejected" ? (
                    <div className="px-5 py-2 bg-red-500/20 text-red-600 text-sm font-medium rounded-full flex items-center gap-1">
                      <X className="size-4" />
                      <span>Rejected</span>
                    </div>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleAction("Accepted")}
                        className="w-20 px-5 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-600 rounded-full flex justify-center items-center text-sm font-normal font-['Wix_Madefor_Text'] transition-colors cursor-pointer"
                      >
                        Accept
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAction("Rejected")}
                        className="w-20 px-5 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-full flex justify-center items-center text-sm font-normal font-['Wix_Madefor_Text'] transition-colors cursor-pointer"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Row 1: Position & Carers Needed */}
              <div className="self-stretch grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                <div className="flex-1 flex flex-col justify-start items-start gap-1">
                  <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                    Position
                  </span>
                  <span className="text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-5">
                    {request.position}
                  </span>
                </div>

                <div className="flex-1 flex flex-col justify-start items-start gap-1">
                  <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                    Carers Needed
                  </span>
                  <div className="self-flex inline-flex items-center gap-2 text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-5">
                    <span>{request.carersNeeded}</span>
                    <ChevronDown className="size-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Row 2: Location & Salary */}
              <div className="self-stretch grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                <div className="flex-1 flex flex-col justify-start items-start gap-1">
                  <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                    Location
                  </span>
                  <span className="text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-5">
                    {request.location}
                  </span>
                </div>

                <div className="flex-1 flex flex-col justify-start items-start gap-1">
                  <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                    Salary
                  </span>
                  <span className="text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-5">
                    {request.salary}
                  </span>
                </div>
              </div>

              {/* Row 3: Request Details Text */}
              <div className="self-stretch flex flex-col justify-start items-start gap-3 w-full pt-1">
                <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                  Request Details
                </span>
                <div className="text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-6 space-y-4 max-w-7xl">
                  {request.details.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
