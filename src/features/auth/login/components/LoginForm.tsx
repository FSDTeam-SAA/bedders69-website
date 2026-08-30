"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const body = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(body.message || "Login failed. Please check your credentials.");
        return;
      }

      const destination = body.dashboardPath || "/";
      if (destination.startsWith("http")) {
        window.location.assign(destination);
      } else {
        router.push(destination);
        router.refresh();
      }
    } catch (err: any) {
      setLoading(false);
      setError("An unexpected error occurred. Please try again.");
    }
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

      {/* Main Form Center Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-[540px] flex-col items-center">
        {/* Header Titles */}
        <div className="flex w-full flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-semibold leading-[48px] text-slate-800 sm:text-4xl">
            Login To Your Account
          </h1>
          <p className="text-base font-normal leading-6 text-gray-500 sm:text-xl">
            Please enter your email and password to continue
          </p>
        </div>

        {/* Login Card */}
        <div className="mt-8 flex w-full flex-col gap-5 rounded-2xl border border-slate-100/90 bg-white p-6 shadow-[0px_10px_35px_rgba(27,44,84,0.06)] sm:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Error Alert */}
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50/80 px-4 py-3 text-sm font-medium text-red-600 animate-fade-in"
              >
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="flex flex-col gap-3">
              <label
                htmlFor="login-email"
                className="text-base font-medium leading-5 text-slate-800"
              >
                Email
              </label>
              <div className="relative w-full">
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="h-14 w-full rounded-lg border border-neutral-400/80 bg-white px-4 text-base font-normal text-slate-700 outline-none transition-all placeholder:text-gray-400 focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-3">
              <label
                htmlFor="login-password"
                className="text-base font-medium leading-5 text-slate-800"
              >
                Password
              </label>
              <div className="relative w-full">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-14 w-full rounded-lg border border-neutral-400/80 bg-white px-4 pr-12 text-base font-normal text-slate-700 outline-none transition-all placeholder:text-gray-400 focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex cursor-pointer items-center gap-2 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="size-4 rounded border-gray-400 text-cyan-700 accent-cyan-700 focus:ring-cyan-700"
                />
                <span className="text-sm font-normal leading-4 text-gray-500">
                  Remember me
                </span>
              </label>

              <Link
                href="/forgot-password"
                className="text-sm font-normal leading-4 text-cyan-700 transition-colors hover:text-cyan-800 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex h-13.5 w-full items-center justify-center gap-2 rounded-lg bg-cyan-700 px-8 text-base font-medium leading-5 text-white shadow-sm transition-all hover:bg-cyan-800 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                "Log In"
              )}
            </button>

            {/* Footer / Sign Up Link */}
            <div className="pt-1 text-center">
              <span className="text-base font-normal leading-5 text-gray-500">
                Don’t have an account?{" "}
              </span>
              <Link
                href="/signup"
                className="text-base font-medium leading-5 text-cyan-700 transition-colors hover:text-cyan-800 hover:underline"
              >
                Sign Up Here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};
