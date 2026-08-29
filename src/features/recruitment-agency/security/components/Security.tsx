"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RecruitmentAgencySidebar from "@/features/recruitment-agency/components/RecruitmentAgencySidebar";
import {
  Bell,
  Check,
  Eye,
  EyeOff,
  X,
} from "lucide-react";

export default function Security() {
  const [currentPassword, setCurrentPassword] = useState("********");
  const [newPassword, setNewPassword] = useState("********");
  const [confirmPassword, setConfirmPassword] = useState("********");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setToastMessage("Password updated successfully!");
      setTimeout(() => setToastMessage(null), 3000);
    }, 600);
  };

  const handleCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
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
        <RecruitmentAgencySidebar activeHref="/recruitment-agency/security" />

        {/* Right Main Content */}
        <div className="min-w-0 flex-1">
          {/* Top Header Banner */}
          <header className="w-full px-6 sm:px-10 py-5 bg-cyan-700/10 flex items-center justify-between border-b border-cyan-700/10">
            <div className="flex-1 flex flex-col justify-start items-start gap-1">
              <h1 className="text-black text-2xl sm:text-3xl font-semibold font-['Wix_Madefor_Text'] leading-tight">
                Security
              </h1>
              <p className="text-slate-700 text-sm sm:text-base lg:text-lg font-normal font-['Wix_Madefor_Text'] leading-normal">
                Manage your account security and login preferences.
              </p>
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

          {/* Form Container */}
          <div className="mx-auto container p-4 sm:p-6 lg:p-8 space-y-6 pb-20 max-w-[1536px]">
            <div className="w-full p-6 sm:p-8 bg-cyan-700/5 rounded-xl border border-zinc-100 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col justify-center items-end gap-6">
              {/* Form Title */}
              <div className="self-stretch text-slate-800 text-2xl font-normal font-['Wix_Madefor_Text'] leading-7">
                Changes Password
              </div>

              <form onSubmit={handleSave} className="self-stretch flex flex-col justify-start items-start gap-6">
                {/* Row 1: Current Password & New Password */}
                <div className="self-stretch grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
                  {/* Current Password */}
                  <div className="flex-1 flex flex-col justify-start items-start gap-2">
                    <label className="self-stretch justify-start text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                      Current Password
                    </label>
                    <div className="self-stretch h-12 px-4 rounded-sm border border-neutral-300 bg-white inline-flex justify-between items-center focus-within:border-cyan-700 focus-within:ring-1 focus-within:ring-cyan-700">
                      <input
                        type={showCurrent ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Current password"
                        className="flex-1 bg-transparent text-slate-800 text-base font-normal font-['Wix_Madefor_Text'] leading-5 outline-none placeholder:text-gray-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="text-neutral-500 hover:text-neutral-700 p-1 cursor-pointer"
                        aria-label={showCurrent ? "Hide password" : "Show password"}
                      >
                        {showCurrent ? (
                          <EyeOff className="size-5" />
                        ) : (
                          <Eye className="size-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="flex-1 flex flex-col justify-start items-start gap-2">
                    <label className="self-stretch justify-start text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                      New Password
                    </label>
                    <div className="self-stretch h-12 px-4 rounded-sm border border-neutral-300 bg-white inline-flex justify-between items-center focus-within:border-cyan-700 focus-within:ring-1 focus-within:ring-cyan-700">
                      <input
                        type={showNew ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New password"
                        className="flex-1 bg-transparent text-slate-800 text-base font-normal font-['Wix_Madefor_Text'] leading-5 outline-none placeholder:text-gray-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="text-neutral-500 hover:text-neutral-700 p-1 cursor-pointer"
                        aria-label={showNew ? "Hide password" : "Show password"}
                      >
                        {showNew ? (
                          <EyeOff className="size-5" />
                        ) : (
                          <Eye className="size-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Row 2: Confirm New Password */}
                <div className="self-stretch flex flex-col justify-start items-start gap-2 w-full">
                  <label className="self-stretch justify-start text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                    Confirm New Password
                  </label>
                  <div className="self-stretch h-12 px-4 rounded-sm border border-red-500 bg-white inline-flex justify-between items-center focus-within:border-red-600 focus-within:ring-1 focus-within:ring-red-500">
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="flex-1 bg-transparent text-slate-800 text-base font-normal font-['Wix_Madefor_Text'] leading-5 outline-none placeholder:text-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="text-neutral-500 hover:text-neutral-700 p-1 cursor-pointer"
                      aria-label={showConfirm ? "Hide password" : "Show password"}
                    >
                      {showConfirm ? (
                        <EyeOff className="size-5" />
                      ) : (
                        <Eye className="size-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password Requirements Checklist */}
                <div className="self-stretch flex flex-col justify-start items-start gap-2 pt-1">
                  {/* Rule 1: Min 8-12 characters */}
                  <div className="self-stretch inline-flex justify-start items-center gap-2">
                    <Check className="size-4 text-green-700 stroke-[2.5]" />
                    <span className="justify-start text-green-700 text-sm font-normal font-['Poppins'] leading-5">
                      Minimum 8–12 characters (recommend 12+ for stronger security).
                    </span>
                  </div>

                  {/* Rule 2: Uppercase letter */}
                  <div className="self-stretch inline-flex justify-start items-center gap-2">
                    <Check className="size-4 text-green-700 stroke-[2.5]" />
                    <span className="justify-start text-green-700 text-sm font-normal font-['Poppins'] leading-5">
                      At least one uppercase letter must.
                    </span>
                  </div>

                  {/* Rule 3: Lowercase letter */}
                  <div className="self-stretch inline-flex justify-start items-center gap-2">
                    <Check className="size-4 text-green-700 stroke-[2.5]" />
                    <span className="justify-start text-green-700 text-sm font-normal font-['Poppins'] leading-5">
                      At least one lowercase letter must.
                    </span>
                  </div>

                  {/* Rule 4: One number */}
                  <div className="self-stretch inline-flex justify-start items-center gap-2">
                    <Check className="size-4 text-green-700 stroke-[2.5]" />
                    <span className="justify-start text-green-700 text-sm font-normal font-['Poppins'] leading-5">
                      At least one number must (0–9).
                    </span>
                  </div>

                  {/* Rule 5: Special character */}
                  <div className="self-stretch inline-flex justify-start items-center gap-2">
                    <X className="size-4 text-red-600 stroke-[2.5]" />
                    <span className="justify-start text-red-600 text-sm font-normal font-['Poppins'] leading-5">
                      At least special character (! @ # $ % ^ & * etc.).
                    </span>
                  </div>

                  {/* Rule 6: No spaces */}
                  <div className="self-stretch inline-flex justify-start items-center gap-2">
                    <X className="size-4 text-red-600 stroke-[2.5]" />
                    <span className="justify-start text-red-600 text-sm font-normal font-['Poppins'] leading-5">
                      No spaces allowed.
                    </span>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="self-stretch inline-flex justify-end items-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="w-36 h-12 px-6 py-3 rounded-lg border border-cyan-700 flex justify-center items-center gap-2 text-cyan-700 hover:bg-cyan-50/50 text-sm font-medium font-['Wix_Madefor_Text'] leading-4 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="h-12 px-6 py-3 bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg flex justify-center items-center gap-2 text-sm font-medium font-['Wix_Madefor_Text'] leading-4 transition-colors cursor-pointer shadow-xs active:scale-[0.99] disabled:opacity-60"
                  >
                    {isSaving ? "Saving Changes..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
