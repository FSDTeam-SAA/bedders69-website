"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export const UserSignupView = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!agreeTerms) {
      setError("Please agree to the Terms and Conditions to continue.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter your password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: `${firstName} ${lastName}`.trim(),
          email,
          password,
          role: "family",
        }),
      });

      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
      }, 1000);
    } catch (err: any) {
      setLoading(false);
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#F5F9FD] via-[#EEF5FC] to-[#E5F0FA] px-4 py-12 font-['Wix_Madefor_Text',Arial,sans-serif]">
      {/* Background Medical Watermarks */}
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

      {/* Main Center Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-[727px] flex-col items-center">
        <div className="w-full rounded-2xl border border-slate-100/90 bg-white p-6 shadow-[0px_10px_35px_rgba(27,44,84,0.06)] sm:p-10">
          {/* Header with Logo Avatar & Title */}
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="flex size-24 items-center justify-center overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-105">
              <img
                src="/images/logo.png"
                alt="Bedders Care"
                className="h-full w-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl font-['Poppins',sans-serif]">
              Create Your Account
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            {/* Error / Success Feedback */}
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50/80 px-4 py-3 text-sm font-medium text-red-600 animate-fade-in"
              >
                {error}
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 animate-fade-in">
                <CheckCircle2 className="size-5 shrink-0" />
                <span>Account created successfully! Redirecting to login...</span>
              </div>
            )}

            {/* First & Last Name Row */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1 flex flex-col gap-2">
                <label className="text-base font-medium text-gray-700 leading-5">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Type your name"
                  className="h-14 w-full rounded-lg border border-neutral-400/80 bg-white px-4 text-base font-normal text-slate-700 outline-none transition placeholder:text-gray-400 focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700"
                />
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <label className="text-base font-medium text-gray-700 leading-5">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Type your name"
                  className="h-14 w-full rounded-lg border border-neutral-400/80 bg-white px-4 text-base font-normal text-slate-700 outline-none transition placeholder:text-gray-400 focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-2">
              <label className="text-base font-medium text-gray-700 leading-5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type your email"
                className="h-14 w-full rounded-lg border border-neutral-400/80 bg-white px-4 text-base font-normal text-slate-700 outline-none transition placeholder:text-gray-400 focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700"
              />
            </div>

            {/* Create Password */}
            <div className="flex flex-col gap-2">
              <label className="text-base font-medium text-gray-700 leading-5">
                Create Password
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-14 w-full rounded-lg border border-neutral-400/80 bg-white px-4 pr-12 text-base font-normal text-slate-700 outline-none transition placeholder:text-gray-400 focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-slate-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
              <label className="text-base font-medium text-gray-700 leading-5">
                Confirm Password
              </label>
              <div className="relative w-full">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-14 w-full rounded-lg border border-neutral-400/80 bg-white px-4 pr-12 text-base font-normal text-slate-700 outline-none transition placeholder:text-gray-400 focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-slate-600"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-center gap-3 pt-1">
              <input
                id="terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="size-4.5 rounded border-gray-400 text-cyan-700 accent-cyan-700 focus:ring-cyan-700 cursor-pointer"
              />
              <label
                htmlFor="terms"
                className="text-base font-medium text-gray-600 cursor-pointer select-none"
              >
                I agree to the Terms and Conditions
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-8 text-base font-semibold text-white shadow-sm transition-all hover:bg-slate-800 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                "Sign up"
              )}
            </button>

            {/* Footer / Already have account */}
            <div className="pt-2 text-center">
              <span className="text-base font-normal text-gray-500">
                Already have an account?{" "}
              </span>
              <Link
                href="/login"
                className="text-base font-semibold text-slate-800 transition-colors hover:text-cyan-700 hover:underline"
              >
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};
