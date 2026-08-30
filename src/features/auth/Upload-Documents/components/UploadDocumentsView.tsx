"use client";

import React, { useState, useRef, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  FileText,
  FileCheck,
  X,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export const UploadDocumentsView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accountType = searchParams.get("type") || "care_company";

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [supportingFiles, setSupportingFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const cvInputRef = useRef<HTMLInputElement>(null);
  const supportingInputRef = useRef<HTMLInputElement>(null);

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
    }
  };

  const handleSupportingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSupportingFiles((prev) => [...prev, ...Array.from(files)]);
    }
  };

  const removeSupportingFile = (index: number) => {
    setSupportingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const emailParam = searchParams.get("email") || "";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Retrieve email from search params or local storage
    let businessEmail = emailParam;
    if (!businessEmail && typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("bedders_business_info");
        if (stored) {
          const parsed = JSON.parse(stored);
          businessEmail = parsed.email || "";
        }
      } catch (err) {}
    }

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        router.push(
          `/verify-otp?email=${encodeURIComponent(businessEmail || "your email")}&type=${accountType}&from=business`
        );
      }, 1000);
    }, 1000);
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
      <div className="relative z-10 mx-auto flex w-full max-w-[890px] flex-col items-center">
        {/* Header */}
        <div className="flex w-full flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-semibold leading-[48px] text-slate-800 sm:text-4xl">
            Upload Documents
          </h1>
          <p className="text-base font-normal leading-6 text-gray-500 sm:text-xl">
            Upload your credentials and certifications
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex w-full flex-col gap-6 rounded-2xl border border-slate-100/90 bg-white p-6 shadow-[0px_10px_35px_rgba(27,44,84,0.06)] sm:p-8"
        >
          {submitted && (
            <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 animate-fade-in">
              <CheckCircle2 className="size-5 shrink-0" />
              <span>Documents submitted successfully! Redirecting to login...</span>
            </div>
          )}

          {/* CV / Resume Section */}
          <div className="flex flex-col gap-3">
            <label className="text-base font-medium leading-5 text-slate-800">
              CV / Resume
            </label>
            <input
              type="file"
              ref={cvInputRef}
              onChange={handleCvChange}
              accept=".pdf,.doc,.docx"
              className="hidden"
            />
            <div
              onClick={() => cvInputRef.current?.click()}
              className="flex min-h-60 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-neutral-400/80 bg-slate-50/50 p-6 text-center transition hover:border-cyan-700 hover:bg-cyan-50/20"
            >
              {cvFile ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <FileCheck className="size-7" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-800">{cvFile.name}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCvFile(null);
                      }}
                      className="rounded-full bg-red-100 p-1 text-red-600 hover:bg-red-200"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                  <span className="text-xs text-gray-400">
                    {(cvFile.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                </div>
              ) : (
                <>
                  {/* Styled double-rounded icon wrapper from Figma */}
                  <div className="flex size-16 items-center justify-center rounded-full bg-cyan-700/10 p-2.5">
                    <div className="flex size-12 items-center justify-center rounded-full bg-cyan-700/15 text-cyan-700">
                      <Upload className="size-6 stroke-[2]" />
                    </div>
                  </div>
                  <p className="text-sm font-normal text-gray-500 line-clamp-1">
                    Supported formats: <span className="font-medium text-slate-700">PDF, DOC, DOCX</span> • Max file size: 10 MB
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Supporting Documents Section */}
          <div className="flex flex-col gap-3">
            <label className="text-base font-medium leading-5 text-slate-800">
              Supporting Documents
            </label>
            <input
              type="file"
              ref={supportingInputRef}
              onChange={handleSupportingChange}
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              className="hidden"
            />
            <div
              onClick={() => supportingInputRef.current?.click()}
              className="flex min-h-60 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-neutral-400/80 bg-slate-50/50 p-6 text-center transition hover:border-cyan-700 hover:bg-cyan-50/20"
            >
              {/* Styled double-rounded icon wrapper from Figma */}
              <div className="flex size-16 items-center justify-center rounded-full bg-cyan-700/10 p-2.5">
                <div className="flex size-12 items-center justify-center rounded-full bg-cyan-700/15 text-cyan-700">
                  <Upload className="size-6 stroke-[2]" />
                </div>
              </div>
              <p className="max-w-[680px] text-sm font-normal leading-6 text-gray-500">
                Upload your supporting documents, including certificates, identification, DBS, proof of address, right-to-work documents, or any other relevant files.
              </p>
            </div>

            {/* List of uploaded supporting files */}
            {supportingFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {supportingFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700"
                  >
                    <FileText className="size-4 text-cyan-700" />
                    <span className="max-w-[200px] truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeSupportingFile(idx)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Actions inside form */}
          <div className="mt-4 flex w-full items-center justify-between border-t border-slate-100 pt-6">
            <button
              type="button"
              onClick={() => router.push(`/business-information?type=${accountType}`)}
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
                  <span>Submitting...</span>
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
