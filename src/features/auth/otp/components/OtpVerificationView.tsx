"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, CheckCircle2 } from "lucide-react";

export const OtpVerificationView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "your email";

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState<number>(45);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Automatically trigger real email OTP send on mount
  useEffect(() => {
    if (emailParam && emailParam !== "your email") {
      fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailParam }),
      }).catch((err) => console.error("Error sending initial OTP:", err));
    }
  }, [emailParam]);

  // Countdown timer for resend
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    // Take the last entered character if multiple typed
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pastedData) {
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pastedData[i] || "";
      }
      setOtp(newOtp);
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setTimer(45);
    setCanResend(false);
    setError("");

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailParam }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to resend OTP");
      }
    } catch (err: any) {
      setError("Failed to connect to server to resend OTP");
    }
  };

  const fromParam = searchParams.get("from") || "";
  const accountType = searchParams.get("type") || "care_company";

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      setError("Please enter the complete 6-digit OTP code.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailParam, otp: enteredOtp }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || "Invalid or expired OTP. Please try again.");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        if (fromParam === "business") {
          router.push(`/choose-plan?type=${accountType}`);
        } else {
          router.push("/login");
        }
      }, 1000);
    } catch (err: any) {
      setLoading(false);
      setError("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#F5F9FD] via-[#EEF5FC] to-[#E5F0FA] px-4 py-12 font-['Poppins',sans-serif]">
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

      {/* Main Card Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-[547px] flex-col items-center">
        <div className="flex w-full flex-col items-center justify-center gap-8 rounded-2xl border border-slate-100/90 bg-white p-6 shadow-[4px_8px_10px_0px_rgba(0,0,0,0.14)] sm:p-10">
          {/* Logo / Avatar */}
          <div className="flex size-28 items-center justify-center overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-105">
            <img
              src="/images/logo.png"
              alt="Bedders Care"
              className="h-full w-full object-contain"
            />
          </div>

          <form onSubmit={handleVerify} className="flex w-full flex-col items-center gap-6">
            {/* Header Titles */}
            <div className="flex flex-col items-center gap-1.5 text-center">
              <h1 className="text-xl font-medium text-gray-700 sm:text-2xl">
                Enter OTP
              </h1>
              <p className="text-xs text-gray-400 font-normal">
                Code sent to <span className="font-semibold text-slate-700">{emailParam}</span>
              </p>
            </div>

            {/* Error / Success feedback */}
            {error && (
              <div
                role="alert"
                className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-center text-xs font-medium text-red-600 animate-fade-in"
              >
                {error}
              </div>
            )}

            {success && (
              <div className="flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-center text-xs font-medium text-emerald-700 animate-fade-in">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>OTP Verified successfully! Redirecting...</span>
              </div>
            )}

            {/* 6 Digit OTP Inputs Row */}
            <div className="flex w-full flex-col items-center gap-4">
              <div className="flex w-full justify-center gap-2.5 sm:gap-3.5">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className={`h-16 w-12 sm:h-20 sm:w-16 rounded-lg text-center font-['Outfit',sans-serif] text-2xl font-medium text-slate-800 outline-none transition-all ${
                      digit
                        ? "border-2 border-cyan-700 bg-white shadow-xs"
                        : "border border-neutral-400 bg-white focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700"
                    }`}
                  />
                ))}
              </div>

              {/* Countdown Timer */}
              <div className="text-center text-sm font-normal text-gray-500">
                {timer > 0 ? (
                  <span>Resend code in {timer}s</span>
                ) : (
                  <span className="text-cyan-700 font-medium">Code expired. You can resend now.</span>
                )}
              </div>
            </div>

            {/* Actions & Resend */}
            <div className="flex w-full flex-col items-center gap-4">
              <div className="text-center text-sm font-normal text-gray-500">
                <span>Didn&apos;t Receive OTP? </span>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={!canResend}
                  className={`text-sm font-semibold transition-colors cursor-pointer ${
                    canResend
                      ? "text-slate-900 hover:text-cyan-700 underline"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  RESEND OTP
                </button>
              </div>

              {/* Verify Now Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 text-base font-medium text-white shadow-sm transition-all hover:bg-slate-800 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  "Verify Now"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};
