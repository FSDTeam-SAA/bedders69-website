"use client";

import React, { useState, useRef, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Upload,
  Check,
  X,
  Loader2,
} from "lucide-react";

const COVERAGE_REGIONS = [
  "London",
  "South East",
  "South West",
  "East of England",
  "West Midlands",
  "East Midlands",
  "Yorkshire",
  "North West",
  "North East",
  "Wales",
  "Scotland",
  "Northern Ireland",
];

const SERVICES_OFFERED = [
  "Dementia Care",
  "Alzheimer's",
  "Parkinson's",
  "Stroke Recovery",
  "Diabetes",
  "COPD",
  "Brain Injury Support",
  "Mental Health Support",
  "Medication Administration",
  "Companionship",
  "Palliative Care",
  "Live-In Care",
  "Personal Care",
  "Manual Handling",
];

export const BusinessInformationView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accountType = searchParams.get("type") || "care_company";

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState<string | null>(null);

  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const toggleRegion = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverPhotoPreview(url);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Save business profile information in localStorage or state
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "bedders_business_info",
        JSON.stringify({
          accountType,
          companyName,
          email,
          phoneNumber,
          registrationNumber,
          website,
          address,
          selectedRegions,
          selectedServices,
        })
      );
    }

    setTimeout(() => {
      setLoading(false);
      router.push(`/upload-documents?type=${accountType}&email=${encodeURIComponent(email)}`);
    }, 600);
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#F5F9FD] via-[#EEF5FC] to-[#E5F0FA] px-4 py-12 font-['Wix_Madefor_Text',Arial,sans-serif]">
      {/* Background Medical Shield & Pulse Watermark Graphics */}
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
      <div className="relative z-10 mx-auto flex w-full max-w-[820px] flex-col items-center">
        {/* Header */}
        <div className="flex w-full flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-semibold leading-[48px] text-slate-800 sm:text-4xl">
            Business Information
          </h1>
          <p className="text-base font-normal leading-6 text-gray-500 sm:text-xl">
            Provide your business details to create your organization profile.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex w-full flex-col gap-6 rounded-2xl border border-slate-100/90 bg-white p-6 shadow-[0px_10px_35px_rgba(27,44,84,0.06)] sm:p-8"
        >
          {/* Company Name */}
          <div className="flex flex-col gap-3">
            <label className="text-base font-medium leading-5 text-slate-800">
              Company Name
            </label>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter your company name"
              className="h-14 w-full rounded-lg border border-neutral-400/80 bg-white px-4 text-base font-normal text-slate-700 outline-none transition-all placeholder:text-gray-400 focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700"
            />
          </div>

          {/* Email & Phone Number Row */}
          <div className="flex flex-col gap-5 sm:flex-row">
            <div className="flex-1 flex flex-col gap-3">
              <label className="text-base font-medium leading-5 text-slate-800">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="h-14 w-full rounded-lg border border-neutral-400/80 bg-white px-4 text-base font-normal text-slate-700 outline-none transition-all placeholder:text-gray-400 focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700"
              />
            </div>

            <div className="flex-1 flex flex-col gap-3">
              <label className="text-base font-medium leading-5 text-slate-800">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                className="h-14 w-full rounded-lg border border-neutral-400/80 bg-white px-4 text-base font-normal text-slate-700 outline-none transition-all placeholder:text-gray-400 focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700"
              />
            </div>
          </div>

          {/* Registration Number & Website Row */}
          <div className="flex flex-col gap-5 sm:flex-row">
            <div className="flex-1 flex flex-col gap-3">
              <label className="text-base font-medium leading-5 text-slate-800">
                Registration Number
              </label>
              <input
                type="text"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                placeholder="Enter your company Reg. No."
                className="h-14 w-full rounded-lg border border-neutral-400/80 bg-white px-4 text-base font-normal text-slate-700 outline-none transition-all placeholder:text-gray-400 focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700"
              />
            </div>

            <div className="flex-1 flex flex-col gap-3">
              <label className="text-base font-medium leading-5 text-slate-800">
                Website
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Enter website url"
                className="h-14 w-full rounded-lg border border-neutral-400/80 bg-white px-4 text-base font-normal text-slate-700 outline-none transition-all placeholder:text-gray-400 focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700"
              />
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-3">
            <label className="text-base font-medium leading-5 text-slate-800">
              Address
            </label>
            <textarea
              rows={3}
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your business address"
              className="w-full rounded-lg border border-neutral-400/80 bg-white p-4 text-base font-normal text-slate-700 outline-none transition-all placeholder:text-gray-400 focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 resize-none"
            />
          </div>

          {/* Logo & Cover Photo Upload */}
          <div className="flex flex-col gap-5 sm:flex-row">
            {/* Logo Upload Box */}
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-base font-medium leading-5 text-slate-800">
                Logo
              </label>
              <input
                type="file"
                ref={logoInputRef}
                onChange={handleLogoChange}
                accept="image/*"
                className="hidden"
              />
              <div
                onClick={() => logoInputRef.current?.click()}
                className="flex h-48 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-neutral-400/80 border-dashed bg-slate-50/50 p-6 text-center transition hover:border-cyan-700 hover:bg-cyan-50/20"
              >
                {logoPreview ? (
                  <div className="relative size-24 overflow-hidden rounded-lg border border-slate-200">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLogoPreview(null);
                      }}
                      className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-slate-900/80 text-white"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex size-12 items-center justify-center rounded-full bg-cyan-700/10 text-cyan-700">
                      <Camera className="size-6" strokeWidth={1.8} />
                    </div>
                    <p className="text-sm font-normal text-gray-500">
                      Drag and drop files or <span className="font-semibold text-cyan-700">click to browse</span>
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Cover Photo Upload Box */}
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-base font-medium leading-5 text-slate-800">
                Cover Photo
              </label>
              <input
                type="file"
                ref={coverInputRef}
                onChange={handleCoverChange}
                accept="image/*"
                className="hidden"
              />
              <div
                onClick={() => coverInputRef.current?.click()}
                className="flex h-48 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-neutral-400/80 border-dashed bg-slate-50/50 p-6 text-center transition hover:border-cyan-700 hover:bg-cyan-50/20"
              >
                {coverPhotoPreview ? (
                  <div className="relative size-24 overflow-hidden rounded-lg border border-slate-200">
                    <img
                      src={coverPhotoPreview}
                      alt="Cover preview"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCoverPhotoPreview(null);
                      }}
                      className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-slate-900/80 text-white"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex size-12 items-center justify-center rounded-full bg-cyan-700/10 text-cyan-700">
                      <Camera className="size-6" strokeWidth={1.8} />
                    </div>
                    <p className="text-sm font-normal text-gray-500">
                      Drag and drop files or <span className="font-semibold text-cyan-700">click to browse</span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Coverage Regions */}
          <div className="flex flex-col gap-3 pt-2">
            <label className="text-base font-medium leading-5 text-slate-800">
              Coverage Regions
            </label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {COVERAGE_REGIONS.map((region) => {
                const checked = selectedRegions.includes(region);
                return (
                  <label
                    key={region}
                    onClick={() => toggleRegion(region)}
                    className="flex cursor-pointer items-center gap-2 select-none py-1"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {}}
                      className="size-4 rounded border-gray-400 text-cyan-700 accent-cyan-700 focus:ring-cyan-700 cursor-pointer"
                    />
                    <span className="text-sm font-normal text-gray-600 truncate">
                      {region}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Services Offered */}
          <div className="flex flex-col gap-3 pt-2">
            <label className="text-base font-medium leading-5 text-slate-800">
              Services Offered
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES_OFFERED.map((service) => {
                const checked = selectedServices.includes(service);
                return (
                  <label
                    key={service}
                    onClick={() => toggleService(service)}
                    className="flex cursor-pointer items-center gap-2 select-none py-1"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {}}
                      className="size-4 rounded border-gray-400 text-cyan-700 accent-cyan-700 focus:ring-cyan-700 cursor-pointer"
                    />
                    <span className="text-sm font-normal text-gray-600 truncate">
                      {service}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Bottom Actions inside form */}
          <div className="mt-4 flex w-full items-center justify-between border-t border-slate-100 pt-6">
            <button
              type="button"
              onClick={() => router.push("/select-type")}
              className="flex items-center gap-2 text-base font-medium text-slate-700 transition-colors hover:text-slate-900 cursor-pointer"
            >
              <ArrowLeft className="size-4.5" />
              <span>Back</span>
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-cyan-700 px-8 py-3.5 text-base font-medium leading-5 text-white shadow-sm transition-all hover:bg-cyan-800 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight className="size-4.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
