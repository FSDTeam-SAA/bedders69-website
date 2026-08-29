"use client";

import React, { useState } from "react";
import Image from "next/image";
import RecruitmentAgencySidebar from "@/features/recruitment-agency/components/RecruitmentAgencySidebar";
import {
  Bell,
  Camera,
  Check,
  ChevronDown,
  FileText,
  Pencil,
  Plus,
  ShieldCheck,
  UploadCloud,
  X,
} from "lucide-react";

export default function AgencyProfile() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Business Information States
  const [agencyName, setAgencyName] = useState("CareRecruitPro");
  const [companyRegNumber, setCompanyRegNumber] = useState("CRN-8849204");
  const [website, setWebsite] = useState("https://www.carerecruitpro.co.uk");
  const [companyDescription, setCompanyDescription] = useState(
    "Leading healthcare & care recruitment agency providing qualified and vetted care assistants, nurses, and support workers across Greater Manchester and surrounding regions."
  );

  // Contact Information States
  const [email, setEmail] = useState("info@carerecruitpro.co.uk");
  const [phoneNumber, setPhoneNumber] = useState("+44 161 800 2345");
  const [altEmail, setAltEmail] = useState("admissions@carerecruitpro.co.uk");
  const [address, setAddress] = useState(
    "100 King Street, Manchester, M2 4WU, United Kingdom"
  );

  // Specialisations
  const [specialisations, setSpecialisations] = useState<string[]>([
    "Live-in Care",
    "Dementia Care",
    "Elderly Care",
    "Nursing",
    "Mental Health",
  ]);
  const [newTagInput, setNewTagInput] = useState("");
  const [showAddTag, setShowAddTag] = useState(false);

  // Edit toggles
  const [isEditingBusiness, setIsEditingBusiness] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);

  const handleAddTag = () => {
    if (newTagInput.trim() && !specialisations.includes(newTagInput.trim())) {
      setSpecialisations([...specialisations, newTagInput.trim()]);
      setNewTagInput("");
      setShowAddTag(false);
      triggerToast("Specialisation added!");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSpecialisations(specialisations.filter((t) => t !== tag));
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
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
        <RecruitmentAgencySidebar activeHref="/recruitment-agency/agency-profile" />

        {/* Right Main Content */}
        <div className="min-w-0 flex-1">
          {/* Top Header Banner */}
          <header className="w-full px-6 sm:px-10 py-5 bg-cyan-700/10 flex items-center justify-between border-b border-cyan-700/10">
            <div className="flex-1 flex flex-col justify-start items-start gap-1">
              <h1 className="text-black text-2xl sm:text-3xl font-semibold font-['Wix_Madefor_Text'] leading-tight">
                Agency Profile
              </h1>
              <p className="text-slate-700 text-sm sm:text-base lg:text-lg font-normal font-['Wix_Madefor_Text'] leading-normal">
                Manage your agency's public profile, business information, services, and verification details.
              </p>
            </div>

            {/* Profile Badge */}
            <div className="inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-2 pr-4 shadow-sm border border-slate-100 shrink-0 ml-4">
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
            </div>
          </header>

          {/* Main Content Area */}
          <div className="mx-auto container p-4 sm:p-6 lg:p-8 space-y-6 pb-20 max-w-[1616px]">
            {/* Hero Profile Banner Card */}
            <div className="w-full bg-white rounded-2xl border border-neutral-200/80 shadow-[0px_2px_4px_rgba(0,0,0,0.03)] overflow-hidden">
              {/* Banner Image */}
              <div className="relative w-full h-48 sm:h-64 bg-slate-200">
                <Image
                  src="/images/agency_banner.jpg"
                  alt="Agency Team Banner"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Edit Banner Button */}
                <button
                  type="button"
                  onClick={() => triggerToast("Upload banner image triggered")}
                  className="absolute top-4 right-4 size-9 bg-indigo-900/85 hover:bg-indigo-900 text-white rounded-full flex items-center justify-center shadow-md cursor-pointer transition-colors"
                  title="Change Banner Photo"
                >
                  <Pencil className="size-4" />
                </button>
              </div>

              {/* Avatar + Agency Name */}
              <div className="px-6 sm:px-8 pb-6 flex flex-col sm:flex-row items-start sm:items-end gap-5">
                <div className="relative -mt-16 sm:-mt-20 shrink-0">
                  {/* Avatar Circle */}
                  <div className="size-28 sm:size-36 rounded-full bg-white p-1.5 shadow-xl border-2 border-cyan-700/20 flex items-center justify-center overflow-hidden">
                    <div className="size-full rounded-full bg-gradient-to-br from-cyan-600 to-teal-700 flex flex-col items-center justify-center text-white">
                      <ShieldCheck className="size-12 sm:size-16 stroke-[1.8]" />
                    </div>
                  </div>
                  {/* Edit Avatar Badge */}
                  <button
                    type="button"
                    onClick={() => triggerToast("Upload logo photo triggered")}
                    className="absolute bottom-1 right-1 size-8 bg-indigo-900 hover:bg-indigo-950 text-white rounded-full flex items-center justify-center shadow-md cursor-pointer transition-colors"
                    title="Change Agency Logo"
                  >
                    <Pencil className="size-3.5" />
                  </button>
                </div>

                <div className="flex-1 pb-1">
                  <h2 className="text-neutral-900 text-2xl sm:text-3xl font-semibold font-['Wix_Madefor_Text'] leading-tight">
                    CareRecruitPro
                  </h2>
                  <p className="text-zinc-500 text-base sm:text-lg font-normal font-['Wix_Madefor_Text'] mt-0.5">
                    Agency
                  </p>
                </div>
              </div>
            </div>

            {/* 1. Business Information Card */}
            <div className="w-full p-6 bg-cyan-700/5 rounded-xl border border-zinc-100 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-5">
              <div className="w-full flex items-center justify-between">
                <h3 className="text-slate-800 text-xl font-semibold font-['Wix_Madefor_Text'] leading-6">
                  Business Information
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingBusiness(!isEditingBusiness);
                    if (isEditingBusiness) triggerToast("Business Information saved!");
                  }}
                  className="p-1.5 rounded-lg text-slate-700 hover:text-cyan-700 hover:bg-white/60 transition-colors cursor-pointer"
                  title="Edit Business Information"
                >
                  <Pencil className="size-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Agency Name */}
                <div className="space-y-2">
                  <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                    Agency Name
                  </label>
                  <input
                    type="text"
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    placeholder="Enter agency name"
                    className="w-full h-12 p-4 rounded-lg border border-neutral-300 bg-white text-base text-slate-800 outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 transition-all placeholder:text-gray-400"
                  />
                </div>

                {/* Registration Number & Website */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                      Company Registration Number
                    </label>
                    <input
                      type="text"
                      value={companyRegNumber}
                      onChange={(e) => setCompanyRegNumber(e.target.value)}
                      placeholder="Enter company registration number"
                      className="w-full h-12 p-4 rounded-lg border border-neutral-300 bg-white text-base text-slate-800 outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 transition-all placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                      Website
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://www.youragency.com"
                        className="w-full h-12 p-4 pr-10 rounded-lg border border-neutral-300 bg-white text-base text-slate-800 outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 transition-all placeholder:text-gray-400"
                      />
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Company Description */}
                <div className="space-y-2">
                  <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                    Company Description
                  </label>
                  <textarea
                    rows={4}
                    value={companyDescription}
                    onChange={(e) => setCompanyDescription(e.target.value)}
                    placeholder="Write details about the company..."
                    className="w-full h-28 p-4 rounded-lg border border-neutral-300 bg-white text-base text-slate-800 outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 transition-all placeholder:text-gray-400 resize-none leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* 2. Contact Information Card */}
            <div className="w-full p-6 bg-cyan-700/5 rounded-xl border border-zinc-100 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-5">
              <div className="w-full flex items-center justify-between">
                <h3 className="text-slate-800 text-xl font-semibold font-['Wix_Madefor_Text'] leading-6">
                  Contact Information
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingContact(!isEditingContact);
                    if (isEditingContact) triggerToast("Contact Information saved!");
                  }}
                  className="p-1.5 rounded-lg text-slate-700 hover:text-cyan-700 hover:bg-white/60 transition-colors cursor-pointer"
                  title="Edit Contact Information"
                >
                  <Pencil className="size-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Email & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full h-12 p-4 rounded-lg border border-neutral-300 bg-white text-base text-slate-800 outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 transition-all placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full h-12 p-4 rounded-lg border border-neutral-300 bg-white text-base text-slate-800 outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Alternative Email Address (Optional) */}
                <div className="space-y-2">
                  <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                    Alternative Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={altEmail}
                    onChange={(e) => setAltEmail(e.target.value)}
                    placeholder="Enter your alternate email address"
                    className="w-full h-12 p-4 rounded-lg border border-neutral-300 bg-white text-base text-slate-800 outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 transition-all placeholder:text-gray-400"
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                    Address
                  </label>
                  <textarea
                    rows={4}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your full address"
                    className="w-full h-28 p-4 rounded-lg border border-neutral-300 bg-white text-base text-slate-800 outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 transition-all placeholder:text-gray-400 resize-none leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* 3. Specialisations Card */}
            <div className="w-full p-6 bg-cyan-700/5 rounded-xl border border-zinc-100 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-5">
              <div className="w-full flex items-center justify-between">
                <h3 className="text-slate-800 text-xl font-semibold font-['Wix_Madefor_Text'] leading-6">
                  Specialisations
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddTag(!showAddTag)}
                    className="p-1.5 rounded-lg text-slate-700 hover:text-cyan-700 hover:bg-white/60 transition-colors cursor-pointer"
                    title="Add Specialisation"
                  >
                    <Plus className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerToast("Specialisations updated!")}
                    className="p-1.5 rounded-lg text-slate-700 hover:text-cyan-700 hover:bg-white/60 transition-colors cursor-pointer"
                    title="Edit Specialisations"
                  >
                    <Pencil className="size-5" />
                  </button>
                </div>
              </div>

              {/* Add Tag Row */}
              {showAddTag && (
                <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-cyan-700/30">
                  <input
                    type="text"
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    placeholder="e.g. Respite Care"
                    className="flex-1 px-3 py-1.5 text-sm outline-none text-slate-800"
                    onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3 py-1.5 bg-cyan-700 text-white rounded text-xs font-semibold hover:bg-cyan-800 cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              )}

              {/* Specialisation Pills */}
              <div className="flex flex-wrap items-center gap-3">
                {specialisations.map((spec) => (
                  <div
                    key={spec}
                    className="px-4 py-2 rounded-lg border border-neutral-300 bg-white flex items-center gap-2 group hover:border-cyan-700 transition-colors"
                  >
                    <span className="text-gray-700 text-sm sm:text-base font-normal font-['Wix_Madefor_Text']">
                      {spec}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(spec)}
                      className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Documents Card */}
            <div className="w-full p-6 bg-cyan-700/5 rounded-xl border border-zinc-100 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col gap-5">
              <div className="w-full flex items-center justify-between">
                <h3 className="text-slate-800 text-xl font-semibold font-['Wix_Madefor_Text'] leading-6">
                  Documents
                </h3>
                <button
                  type="button"
                  onClick={() => triggerToast("Documents section ready")}
                  className="p-1.5 rounded-lg text-slate-700 hover:text-cyan-700 hover:bg-white/60 transition-colors cursor-pointer"
                  title="Edit Documents"
                >
                  <Pencil className="size-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Document 1: Business Registration */}
                <div className="p-5 sm:p-6 bg-white rounded-lg border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-cyan-700/50">
                  <div className="flex items-start gap-4">
                    <FileText className="size-8 text-black shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div className="flex flex-col gap-1">
                      <h4 className="text-zinc-900 text-lg sm:text-xl font-semibold font-['Wix_Madefor_Text'] leading-tight">
                        Business Registration
                      </h4>
                      <p className="text-zinc-600 text-sm sm:text-base font-normal font-['Wix_Madefor_Text'] leading-snug">
                        Upload your official business registration document.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => triggerToast("Upload Business Registration document initiated")}
                    className="px-4 py-2 bg-yellow-600/10 hover:bg-yellow-600/20 rounded-full border border-yellow-600/20 flex items-center gap-1.5 text-yellow-700 text-sm font-medium transition-colors cursor-pointer shrink-0"
                  >
                    <UploadCloud className="size-4" />
                    <span>Upload</span>
                  </button>
                </div>

                {/* Document 2: Company Documents */}
                <div className="p-5 sm:p-6 bg-white rounded-lg border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-cyan-700/50">
                  <div className="flex items-start gap-4">
                    <FileText className="size-8 text-black shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div className="flex flex-col gap-1">
                      <h4 className="text-zinc-900 text-lg sm:text-xl font-semibold font-['Wix_Madefor_Text'] leading-tight">
                        Company Documents
                      </h4>
                      <p className="text-zinc-600 text-sm sm:text-base font-normal font-['Wix_Madefor_Text'] leading-snug">
                        Upload any additional documents required to verify your business.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => triggerToast("Upload Company Documents initiated")}
                    className="px-4 py-2 bg-yellow-600/10 hover:bg-yellow-600/20 rounded-full border border-yellow-600/20 flex items-center gap-1.5 text-yellow-700 text-sm font-medium transition-colors cursor-pointer shrink-0"
                  >
                    <UploadCloud className="size-4" />
                    <span>Upload</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
