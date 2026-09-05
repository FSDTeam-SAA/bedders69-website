"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import RecruitmentAgencySidebar from "@/features/recruitment-agency/components/RecruitmentAgencySidebar";
import {
  Check,
  CheckSquare,
  ChevronDown,
  ChevronLeft,
  Loader2,
  MessageSquare,
  Send,
  X,
} from "lucide-react";

export default function CarerDetail({ id }: { id?: string }) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactMessage, setContactMessage] = useState("");
  const [isSendingContact, setIsSendingContact] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const {
    data: carer,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["agency-carer-detail", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await fetch(`/api/recruitment-agency/carers/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch carer details");
      }
      const result = await res.json();
      return result.data || result;
    },
    enabled: !!id,
  });

  const carerInfo = carer?.carerId && typeof carer.carerId === "object" ? carer.carerId : (carer || {});

  const name =
    carer?.name ||
    carer?.careName ||
    carerInfo?.careName ||
    carerInfo?.fullName ||
    carerInfo?.name ||
    "Carer Profile";

  const image =
    carer?.image ||
    carer?.profilePicture ||
    carerInfo?.profilePicture ||
    carerInfo?.image ||
    "/images/carer-male.png";

  const handle = "@" + name.toLowerCase().replace(/[^a-z0-9]/g, "");

  const email = carer?.email || carerInfo?.email || "carer@example.com";
  const phone = carer?.phoneNumber || carer?.phone || carerInfo?.phoneNumber || "+44 7700 900123";
  const location = carer?.location || carerInfo?.city || carerInfo?.location || "United Kingdom";
  const postCode = carer?.postCode || carerInfo?.postCode || "M1 1AA";
  const experienceYears = carer?.experience || carer?.experienceYears || carerInfo?.experience || "2+ Years";
  const bio =
    carer?.bio ||
    carer?.description ||
    carerInfo?.bio ||
    "Experienced healthcare assistant and care professional providing high-quality care.";

  const rawSkills = carer?.skills || carerInfo?.skills;
  const skillsList = Array.isArray(rawSkills) && rawSkills.length > 0
    ? rawSkills
    : ["Personal Care", "Medication Administration", "Companionship", "Moving & Handling", "First Aid"];

  const rawQuals = carer?.qualifications || carerInfo?.qualifications;
  const qualList = Array.isArray(rawQuals) && rawQuals.length > 0
    ? rawQuals
    : ["NVQ Level 3 Health & Social Care", "First Aid Certificate", "Dementia Care Training"];

  const workPreferences = [
    "Full-Time",
    "Part-Time",
    "Temporary",
    "Contract",
    "Live-in Care",
    "Day Shift",
    "Night Shift",
  ];

  const workTypes = [
    "Live-in Care",
    "Home Care",
    "Residential Care",
    "Nursing Home",
  ];

  const shifts = ["Day Shift", "Night Shift", "Weekend", "Flexible"];

  const openContactModal = () => {
    setContactMessage(`Hello ${name}, CareRecruitPro recruitment agency is interested in connecting with you regarding upcoming healthcare staffing opportunities.`);
    setShowContactModal(true);
  };

  const handleSendContactRequest = async () => {
    if (!id) return;
    setIsSendingContact(true);
    try {
      const res = await fetch("/api/recruitment-agency/contact-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUserId: id,
          name,
          message: contactMessage,
          category: "Agency Contact",
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to send contact request");
      }
      triggerToast(`Contact request sent successfully to ${name}!`);
      setShowContactModal(false);
    } catch (err: any) {
      alert(err?.message || "Failed to send contact request");
    } finally {
      setIsSendingContact(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-['Wix_Madefor_Text',Arial,sans-serif] text-[#203746]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-emerald-600 px-5 py-3 text-white shadow-xl animate-fade-in">
          <Check className="h-5 w-5 shrink-0" />
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 border border-slate-100 relative">
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="size-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="relative size-14 rounded-full overflow-hidden border border-cyan-700/20 bg-slate-100 shrink-0">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover"
                  unoptimized={image.startsWith("http")}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 font-['Wix_Madefor_Text']">
                  Contact {name}
                </h3>
                <p className="text-xs text-slate-500 font-normal">
                  Send a direct contact request to this carer
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">
                Your Message
              </label>
              <textarea
                rows={4}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-700/40 focus:border-cyan-700 transition-all font-['Wix_Madefor_Text'] resize-none"
                placeholder="Type your message to carer..."
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowContactModal(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium text-sm hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSendingContact || !contactMessage.trim()}
                onClick={handleSendContactRequest}
                className="px-6 py-2.5 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-medium text-sm transition-colors flex items-center gap-2 disabled:opacity-50 shadow-sm"
              >
                {isSendingContact ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    <span>Send Request</span>
                  </>
                )}
              </button>
            </div>
          </div>
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
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-500">
                <Loader2 className="size-10 animate-spin text-cyan-700" />
                <span className="font-semibold text-base">Loading carer details from backend...</span>
              </div>
            ) : isError ? (
              <div className="w-full bg-white rounded-2xl p-12 text-center border border-red-200/80 shadow-xs">
                <p className="text-red-600 font-semibold text-lg">Error loading carer details</p>
                <p className="text-gray-500 text-sm mt-1">{(error as Error)?.message || "Failed to load carer"}</p>
              </div>
            ) : (
              <>
                {/* Hero Profile Banner Card */}
                <div className="w-full bg-white rounded-2xl border border-neutral-200/80 shadow-[0px_2px_4px_rgba(0,0,0,0.03)] overflow-hidden">
                  {/* Banner Image */}
                  <div className="relative w-full h-48 sm:h-64 bg-slate-200">
                    <Image
                      src="/images/carer_directory_banner.jpg"
                      alt="Carer Banner"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Avatar + Carer Name & Action */}
                  <div className="px-6 sm:px-8 pb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5">
                    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
                      <div className="relative -mt-16 sm:-mt-20 shrink-0">
                        <div className="size-28 sm:size-36 rounded-full bg-white p-1.5 shadow-xl border-2 border-cyan-700/20 overflow-hidden relative">
                          <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover rounded-full"
                            unoptimized={image.startsWith("http")}
                          />
                        </div>
                      </div>

                      <div className="pb-1">
                        <h2 className="text-neutral-900 text-2xl sm:text-3xl font-semibold font-['Wix_Madefor_Text'] leading-tight">
                          {name}
                        </h2>
                        <p className="text-zinc-500 text-base sm:text-lg font-normal font-['Wix_Madefor_Text'] mt-0.5">
                          {handle}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={openContactModal}
                      className="px-6 py-3 bg-cyan-700 hover:bg-cyan-800 text-white rounded-xl font-medium text-sm transition-all flex items-center gap-2 shadow-xs active:scale-[0.99] shrink-0"
                    >
                      <MessageSquare className="size-4" />
                      <span>Contact Carer</span>
                    </button>
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
                        {email}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                        Phone Number
                      </span>
                      <span className="text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-5">
                        {phone}
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
                        Location / Region
                      </span>
                      <span className="text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-5">
                        {location}
                      </span>
                    </div>
                  </div>

                  {/* Row 3: Postcode & Verification */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                        Postcode
                      </span>
                      <span className="text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-5">
                        {postCode}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                        Status
                      </span>
                      <span className="text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-5">
                        {carer?.verified || "DBS Verified"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. About Me Card */}
                <div className="w-full p-6 sm:p-7 bg-cyan-700/5 rounded-xl border border-zinc-100/60 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                  <h3 className="text-slate-800 text-xl font-semibold font-['Wix_Madefor_Text'] leading-6">
                    About Me
                  </h3>

                  {/* Row 1: Experience */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                        Years of Experience
                      </span>
                      <span className="text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-5">
                        {experienceYears}
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
                      {bio}
                    </p>
                  </div>
                </div>

                {/* 3. Qualifications Card */}
                <div className="w-full p-6 sm:p-7 bg-cyan-700/5 rounded-xl border border-zinc-100/60 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                  <h3 className="text-slate-800 text-xl font-semibold font-['Wix_Madefor_Text'] leading-6">
                    Qualifications & Certifications
                  </h3>

                  <div className="flex flex-wrap items-center gap-3">
                    {qualList.map((qual: string) => (
                      <div
                        key={qual}
                        className="px-4 py-2 rounded-lg border border-neutral-400 bg-white text-gray-700 text-sm sm:text-base font-normal font-['Wix_Madefor_Text']"
                      >
                        {qual}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Skills Card */}
                <div className="w-full p-6 sm:p-7 bg-cyan-700/5 rounded-xl border border-zinc-100/60 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                  <h3 className="text-slate-800 text-xl font-semibold font-['Wix_Madefor_Text'] leading-6">
                    Skills
                  </h3>

                  <div className="flex flex-wrap items-center gap-3">
                    {skillsList.map((skill: string) => (
                      <div
                        key={skill}
                        className="px-4 py-2 rounded-lg border border-neutral-400 bg-white text-gray-700 text-sm sm:text-base font-normal font-['Wix_Madefor_Text']"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Work Preferences Card */}
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

                {/* 6. Availability & Coverage Card */}
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
                        {carer?.availability || "Available Immediately"}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                        Service Area / Region
                      </span>
                      <span className="text-gray-500 text-base font-normal font-['Wix_Madefor_Text'] leading-5">
                        {carer?.serviceArea || location}
                      </span>
                    </div>
                  </div>

                  {/* Row 2: Preferred Work Type & Preferred Shift with Checkmarks */}
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
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

