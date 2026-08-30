"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CareCompanySidebar from "@/features/care-company/components/CareCompanySidebar";
import { Check, Eye, EyeOff, X, AlertCircle, Loader2 } from "lucide-react";
import { useSettings } from "../hooks/useSettings";

export default function Settings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { isSaving, error, setError, changePassword } = useSettings();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dynamic Validation checks
  const isMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasLowercase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword);
  const noSpaces = !/\s/.test(newPassword) && newPassword.length > 0;
  const isMatching =
    newPassword === confirmPassword &&
    newPassword.length > 0 &&
    confirmPassword.length > 0;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!currentPassword) {
      setError("Please enter your current password.");
      return;
    }

    if (!isMinLength) {
      setError("New password must be at least 8 characters long.");
      return;
    }

    if (!isMatching) {
      setError("New password and confirm password do not match.");
      return;
    }

    const result = await changePassword({
      oldPassword: currentPassword,
      newPassword,
    });

    if (result.success) {
      setToastMessage(result.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  const handleCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError(null);
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
        <CareCompanySidebar activeHref="/care-company/settings" />

        {/* Right Main Content */}
        <div className="min-w-0 flex-1">
          {/* Header */}
          <header className="flex min-h-[96px] w-full items-center justify-between bg-white px-6 py-6 border-b border-[#f0f1f2]">
            <div className="flex flex-col justify-start items-start gap-1">
              <h1 className="text-2xl font-bold leading-7 text-[#2b6ea6]">
                Password
              </h1>
              <p className="text-xs font-normal leading-4 text-gray-500">
                Manage your personal information and contact details.
              </p>
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

          {/* Form Container */}
          <div className="mx-auto container p-4 sm:p-6 lg:p-8 space-y-6 pb-20 max-w-[1486px]">
            <div className="w-full p-6 sm:p-8 bg-[#eef5fa]/60 rounded-xl border border-zinc-100 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col justify-center items-end gap-6">
              {/* Form Title */}
              <div className="self-stretch text-slate-800 text-2xl font-normal font-['Wix_Madefor_Text'] leading-7">
                Changes Password
              </div>

              {/* Error Banner */}
              {error && (
                <div className="self-stretch flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                  <AlertCircle className="size-5 shrink-0 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSave} className="self-stretch flex flex-col justify-start items-start gap-6">
                {/* Row 1: Current Password & New Password */}
                <div className="self-stretch grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
                  {/* Current Password */}
                  <div className="flex-1 flex flex-col justify-start items-start gap-2">
                    <label className="self-stretch justify-start text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                      Current Password
                    </label>
                    <div className="self-stretch h-12 px-4 rounded-sm border border-neutral-300 bg-white inline-flex justify-between items-center focus-within:border-[#2b6ea6] focus-within:ring-1 focus-within:ring-[#2b6ea6]">
                      <input
                        type={showCurrent ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password"
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
                    <div className="self-stretch h-12 px-4 rounded-sm border border-neutral-300 bg-white inline-flex justify-between items-center focus-within:border-[#2b6ea6] focus-within:ring-1 focus-within:ring-[#2b6ea6]">
                      <input
                        type={showNew ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
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
                  <div
                    className={`self-stretch h-12 px-4 rounded-sm border bg-white inline-flex justify-between items-center ${
                      confirmPassword && !isMatching
                        ? "border-red-400 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-400"
                        : "border-neutral-300 focus-within:border-[#2b6ea6] focus-within:ring-1 focus-within:ring-[#2b6ea6]"
                    }`}
                  >
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
                  {/* Rule 1: Min 8 characters */}
                  <div className="self-stretch inline-flex justify-start items-center gap-2">
                    {isMinLength ? (
                      <Check className="size-4 text-green-700 stroke-[2.5]" />
                    ) : (
                      <X className="size-4 text-neutral-400 stroke-[2.5]" />
                    )}
                    <span
                      className={`justify-start text-sm font-normal font-['Poppins'] leading-5 ${
                        isMinLength ? "text-green-700 font-medium" : "text-neutral-500"
                      }`}
                    >
                      Minimum 8–12 characters (recommend 12+ for stronger security).
                    </span>
                  </div>

                  {/* Rule 2: Uppercase letter */}
                  <div className="self-stretch inline-flex justify-start items-center gap-2">
                    {hasUppercase ? (
                      <Check className="size-4 text-green-700 stroke-[2.5]" />
                    ) : (
                      <X className="size-4 text-neutral-400 stroke-[2.5]" />
                    )}
                    <span
                      className={`justify-start text-sm font-normal font-['Poppins'] leading-5 ${
                        hasUppercase ? "text-green-700 font-medium" : "text-neutral-500"
                      }`}
                    >
                      At least one uppercase letter must.
                    </span>
                  </div>

                  {/* Rule 3: Lowercase letter */}
                  <div className="self-stretch inline-flex justify-start items-center gap-2">
                    {hasLowercase ? (
                      <Check className="size-4 text-green-700 stroke-[2.5]" />
                    ) : (
                      <X className="size-4 text-neutral-400 stroke-[2.5]" />
                    )}
                    <span
                      className={`justify-start text-sm font-normal font-['Poppins'] leading-5 ${
                        hasLowercase ? "text-green-700 font-medium" : "text-neutral-500"
                      }`}
                    >
                      At least one lowercase letter must.
                    </span>
                  </div>

                  {/* Rule 4: One number */}
                  <div className="self-stretch inline-flex justify-start items-center gap-2">
                    {hasNumber ? (
                      <Check className="size-4 text-green-700 stroke-[2.5]" />
                    ) : (
                      <X className="size-4 text-neutral-400 stroke-[2.5]" />
                    )}
                    <span
                      className={`justify-start text-sm font-normal font-['Poppins'] leading-5 ${
                        hasNumber ? "text-green-700 font-medium" : "text-neutral-500"
                      }`}
                    >
                      At least one number must (0–9).
                    </span>
                  </div>

                  {/* Rule 5: Special character */}
                  <div className="self-stretch inline-flex justify-start items-center gap-2">
                    {hasSpecial ? (
                      <Check className="size-4 text-green-700 stroke-[2.5]" />
                    ) : (
                      <X className="size-4 text-neutral-400 stroke-[2.5]" />
                    )}
                    <span
                      className={`justify-start text-sm font-normal font-['Poppins'] leading-5 ${
                        hasSpecial ? "text-green-700 font-medium" : "text-neutral-500"
                      }`}
                    >
                      At least special character (! @ # $ % ^ & * etc.).
                    </span>
                  </div>

                  {/* Rule 6: No spaces */}
                  <div className="self-stretch inline-flex justify-start items-center gap-2">
                    {noSpaces ? (
                      <Check className="size-4 text-green-700 stroke-[2.5]" />
                    ) : (
                      <X className="size-4 text-neutral-400 stroke-[2.5]" />
                    )}
                    <span
                      className={`justify-start text-sm font-normal font-['Poppins'] leading-5 ${
                        noSpaces ? "text-green-700 font-medium" : "text-neutral-500"
                      }`}
                    >
                      No spaces allowed.
                    </span>
                  </div>

                  {/* Rule 7: Matching passwords */}
                  {confirmPassword && (
                    <div className="self-stretch inline-flex justify-start items-center gap-2">
                      {isMatching ? (
                        <Check className="size-4 text-green-700 stroke-[2.5]" />
                      ) : (
                        <X className="size-4 text-red-600 stroke-[2.5]" />
                      )}
                      <span
                        className={`justify-start text-sm font-normal font-['Poppins'] leading-5 ${
                          isMatching
                            ? "text-green-700 font-medium"
                            : "text-red-600 font-medium"
                        }`}
                      >
                        {isMatching
                          ? "Passwords match."
                          : "Passwords do not match."}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom Action Buttons */}
                <div className="self-stretch inline-flex justify-end items-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="w-36 h-12 px-6 py-3 rounded-lg border border-cyan-700 flex justify-center items-center gap-2 text-cyan-700 hover:bg-cyan-50/50 text-sm font-medium font-['Wix_Madefor_Text'] leading-4 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="h-12 px-6 py-3 bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg flex justify-center items-center gap-2 text-sm font-medium font-['Wix_Madefor_Text'] leading-4 transition-colors cursor-pointer shadow-xs active:scale-[0.99] disabled:opacity-60"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Saving Changes...</span>
                      </>
                    ) : (
                      <span>Save Changes</span>
                    )}
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