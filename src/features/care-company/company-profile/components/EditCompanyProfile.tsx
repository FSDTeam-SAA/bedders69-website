"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CareCompanySidebar from "@/features/care-company/components/CareCompanySidebar";
import {
  Calendar,
  ChevronLeft,
  Clock,
  MapPin,
  Plus,
  X,
  Check,
  Loader2,
} from "lucide-react";
import { useCompanyProfile } from "../hooks/useCompanyProfile";

export default function EditCompanyProfile() {
  const router = useRouter();
  const { profile, updateProfile, isUpdating, isLoading } = useCompanyProfile();

  // Form states matching screenshot
  const [companyName, setCompanyName] = useState("");
  const [tradingName, setTradingName] = useState("");
  const [about, setAbout] = useState("");
  const [services, setServices] = useState<string[]>([
    "Residential Care",
    "Dementia Care",
    "Respite Care",
    "Home Care",
    "Day Services",
  ]);
  const [isAddingService, setIsAddingService] = useState(false);
  const [newServiceText, setNewServiceText] = useState("");

  const [serviceHourDay, setServiceHourDay] = useState("Mon–Fri 7am–6pm · Sat 8am–2pm");
  const [serviceHourTime, setServiceHourTime] = useState("Emergency 24/7");
  const [serviceArea, setServiceArea] = useState(
    "Manchester, Greater Manchester"
  );
  const [founded, setFounded] = useState("2008");
  const [staffCount, setStaffCount] = useState("320+");
  const [locationsCount, setLocationsCount] = useState("8");
  const [cqcRating, setCqcRating] = useState("Outstanding (CQC)");

  // Jobs Post states
  const [jobName, setJobName] = useState("Senior Care Assistant");
  const [jobTime, setJobTime] = useState("Full Time");
  const [jobSalary, setJobSalary] = useState("£24,000–£28,000");

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync profile data from hook
  useEffect(() => {
    if (profile) {
      if (profile.companyName) setCompanyName(profile.companyName);
      if (profile.tradingName) setTradingName(profile.tradingName);
      if (profile.about) setAbout(profile.about);
      if (profile.serviceOffered && profile.serviceOffered.length > 0) setServices(profile.serviceOffered);
      if (profile.address) setServiceArea(profile.address);
      if (profile.founded) setFounded(profile.founded);
      if (profile.staffCount) setStaffCount(profile.staffCount);
      if (profile.locationsCount) setLocationsCount(profile.locationsCount);
      if (profile.cqcRating) setCqcRating(profile.cqcRating);
      if (profile.serviceHours) {
        const parts = profile.serviceHours.split("·");
        if (parts[0]) setServiceHourDay(parts[0].trim());
        if (parts[1]) setServiceHourTime(parts.slice(1).join("·").trim());
      }
    }
  }, [profile]);

  const handleAddService = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (newServiceText.trim() && !services.includes(newServiceText.trim())) {
      setServices([...services, newServiceText.trim()]);
      setNewServiceText("");
      setIsAddingService(false);
    }
  };

  const handleRemoveService = (serviceToRemove: string) => {
    setServices(services.filter((s) => s !== serviceToRemove));
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const combinedHours = [serviceHourDay, serviceHourTime].filter(Boolean).join(" · ");
    const success = await updateProfile({
      companyName,
      tradingName,
      about,
      serviceOffered: services,
      serviceHours: combinedHours,
      address: serviceArea,
      founded,
      staffCount,
      locationsCount,
      cqcRating,
    });

    if (success) {
      setToastMessage("Changes saved successfully!");
      setTimeout(() => {
        setToastMessage(null);
        router.push("/care-company/company-profile");
      }, 1000);
    } else {
      setToastMessage("Failed to update profile. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-['Wix_Madefor_Text',Arial,sans-serif] text-[#203746]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-white shadow-xl animate-fade-in">
          <Check className="h-5 w-5" />
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      <div className="mx-auto flex min-h-screen w-full max-w-[1920px] flex-col lg:flex-row">
        {/* Left Sidebar */}
        <CareCompanySidebar activeHref="/care-company/company-profile" />

        {/* Right Main Content */}
        <div className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/care-company/company-profile"
              className="inline-flex items-center gap-2 text-[#2b6ea6] hover:text-[#20527f] transition-colors group cursor-pointer"
            >
              <ChevronLeft className="h-6 w-6 stroke-[2.5] group-hover:-translate-x-0.5 transition-transform" />
              <h1 className="text-2xl font-bold leading-7 text-[#2b6ea6]">
                Edit Profile
              </h1>
            </Link>
            <p className="mt-1 text-xs leading-4 text-[#667481] pl-8">
              Your public company profile on the platform
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-6 max-w-6xl pb-16">
            {/* 1. Company Details Card */}
            <div className="w-full rounded-2xl bg-white p-6 sm:p-8 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.05)] border border-slate-100">
              <h2 className="text-xl font-bold leading-6 text-slate-800 mb-6">
                Company Details
              </h2>

              <div className="space-y-5">
                {/* Company Name */}
                <div className="space-y-2">
                  <label className="block text-base font-medium text-slate-800">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full h-12 px-4 rounded-md border border-neutral-200 outline-none text-base text-slate-700 bg-white focus:border-[#2b6ea6] focus:ring-1 focus:ring-[#2b6ea6] transition-all"
                    placeholder="Company Name"
                  />
                </div>

                {/* Trading Name */}
                <div className="space-y-2">
                  <label className="block text-base font-medium text-slate-800">
                    Trading Name
                  </label>
                  <input
                    type="text"
                    value={tradingName}
                    onChange={(e) => setTradingName(e.target.value)}
                    className="w-full h-12 px-4 rounded-md border border-neutral-200 outline-none text-base text-slate-700 bg-white focus:border-[#2b6ea6] focus:ring-1 focus:ring-[#2b6ea6] transition-all"
                    placeholder="Trading Name"
                  />
                </div>

                {/* About */}
                <div className="space-y-2">
                  <label className="block text-base font-medium text-slate-800">
                    About
                  </label>
                  <textarea
                    rows={6}
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Write here..."
                    className="w-full p-4 rounded-md border border-neutral-200 outline-none text-base text-slate-700 bg-white focus:border-[#2b6ea6] focus:ring-1 focus:ring-[#2b6ea6] transition-all resize-none placeholder:text-gray-400"
                  />
                </div>

                {/* Services */}
                <div className="space-y-2">
                  <label className="block text-base font-medium text-slate-800">
                    Services
                  </label>
                  <div className="w-full min-h-[52px] p-2.5 rounded-md border border-neutral-200 bg-white flex flex-wrap items-center gap-2 focus-within:border-[#2b6ea6]">
                    {services.map((service) => (
                      <span
                        key={service}
                        className="inline-flex items-center gap-1.5 bg-[#eaf1f6] text-[#2b6ea6] text-xs font-semibold px-3.5 py-1.5 rounded-full"
                      >
                        {service}
                        <button
                          type="button"
                          onClick={() => handleRemoveService(service)}
                          className="hover:text-red-500 transition-colors cursor-pointer"
                          aria-label={`Remove ${service}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}

                    {isAddingService ? (
                      <div className="inline-flex items-center gap-1">
                        <input
                          type="text"
                          autoFocus
                          value={newServiceText}
                          onChange={(e) => setNewServiceText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddService();
                            } else if (e.key === "Escape") {
                              setIsAddingService(false);
                            }
                          }}
                          placeholder="Service name..."
                          className="h-7 px-2 text-xs border border-[#2b6ea6] rounded-full outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddService()}
                          className="h-7 px-2.5 bg-[#2b6ea6] text-white text-xs font-bold rounded-full cursor-pointer hover:bg-[#20527f]"
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsAddingService(false)}
                          className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsAddingService(true)}
                        className="bg-[#2b6ea6] hover:bg-[#20527f] text-white text-xs font-bold px-4 py-1.5 rounded-full transition-colors cursor-pointer shadow-sm"
                      >
                        ADD +
                      </button>
                    )}
                  </div>
                </div>

                {/* Service Hours */}
                <div className="space-y-2">
                  <label className="block text-base font-medium text-slate-800">
                    Service Hours
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={serviceHourDay}
                        onChange={(e) => setServiceHourDay(e.target.value)}
                        placeholder="Day"
                        className="w-full h-12 pl-4 pr-11 rounded-md border border-neutral-200 outline-none text-base text-slate-700 bg-white focus:border-[#2b6ea6] focus:ring-1 focus:ring-[#2b6ea6] transition-all placeholder:text-gray-400"
                      />
                      <Calendar className="absolute right-3.5 h-5 w-5 text-[#2b6ea6] pointer-events-none stroke-[1.8]" />
                    </div>

                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={serviceHourTime}
                        onChange={(e) => setServiceHourTime(e.target.value)}
                        placeholder="Time"
                        className="w-full h-12 pl-4 pr-11 rounded-md border border-neutral-200 outline-none text-base text-slate-700 bg-white focus:border-[#2b6ea6] focus:ring-1 focus:ring-[#2b6ea6] transition-all placeholder:text-gray-400"
                      />
                      <Clock className="absolute right-3.5 h-5 w-5 text-[#2b6ea6] pointer-events-none stroke-[1.8]" />
                    </div>
                  </div>
                </div>

                {/* Service Area & Founded */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Service Area */}
                  <div className="space-y-2">
                    <label className="block text-base font-medium text-slate-800">
                      Service Area
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={serviceArea}
                        onChange={(e) => setServiceArea(e.target.value)}
                        className="w-full h-12 pl-4 pr-11 rounded-md border border-neutral-200 outline-none text-base text-slate-700 bg-white focus:border-[#2b6ea6] focus:ring-1 focus:ring-[#2b6ea6] transition-all"
                        placeholder="e.g. Manchester, Greater Manchester"
                      />
                      <MapPin className="absolute right-3.5 h-5 w-5 text-[#2b6ea6] pointer-events-none stroke-[1.8]" />
                    </div>
                  </div>

                  {/* Founded */}
                  <div className="space-y-2">
                    <label className="block text-base font-medium text-slate-800">
                      Founded
                    </label>
                    <input
                      type="text"
                      value={founded}
                      onChange={(e) => setFounded(e.target.value)}
                      className="w-full h-12 px-4 rounded-md border border-neutral-200 outline-none text-base text-slate-700 bg-white focus:border-[#2b6ea6] focus:ring-1 focus:ring-[#2b6ea6] transition-all"
                      placeholder="2008"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Jobs Post Card */}
            <div className="w-full rounded-2xl bg-white p-6 sm:p-8 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.05)] border border-slate-100">
              <h2 className="text-xl font-bold leading-6 text-slate-800 mb-6">
                Jobs Post
              </h2>

              <div className="space-y-5">
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-base font-medium text-slate-800">
                    Name
                  </label>
                  <input
                    type="text"
                    value={jobName}
                    onChange={(e) => setJobName(e.target.value)}
                    className="w-full h-12 px-4 rounded-md border border-neutral-200 outline-none text-base text-slate-700 bg-white focus:border-[#2b6ea6] focus:ring-1 focus:ring-[#2b6ea6] transition-all"
                    placeholder="Senior Care Assistant"
                  />
                </div>

                {/* Time */}
                <div className="space-y-2">
                  <label className="block text-base font-medium text-slate-800">
                    Time
                  </label>
                  <input
                    type="text"
                    value={jobTime}
                    onChange={(e) => setJobTime(e.target.value)}
                    className="w-full h-12 px-4 rounded-md border border-neutral-200 outline-none text-base text-slate-700 bg-white focus:border-[#2b6ea6] focus:ring-1 focus:ring-[#2b6ea6] transition-all"
                    placeholder="Full Time"
                  />
                </div>

                {/* Salary */}
                <div className="space-y-2">
                  <label className="block text-base font-medium text-slate-800">
                    Salary
                  </label>
                  <input
                    type="text"
                    value={jobSalary}
                    onChange={(e) => setJobSalary(e.target.value)}
                    className="w-full h-12 px-4 rounded-md border border-neutral-200 outline-none text-base text-slate-700 bg-white focus:border-[#2b6ea6] focus:ring-1 focus:ring-[#2b6ea6] transition-all"
                    placeholder="£24,000–£28,000"
                  />
                </div>
              </div>
            </div>

            {/* Actions: Save & Cancel */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <Link
                href="/care-company/company-profile"
                className="h-12 px-6 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold text-base hover:bg-slate-50 transition-colors flex items-center justify-center"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isUpdating}
                className="h-12 px-8 rounded-xl bg-[#2b6ea6] hover:bg-[#245e8f] text-white font-semibold text-base transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
              >
                {isUpdating && <Loader2 className="h-5 w-5 animate-spin" />}
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
