import { OtpVerificationView } from "@/features/auth/otp";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Verify OTP | Bedders - UK Care Industry Ecosystem",
  description: "Enter the OTP sent to your email to verify your Bedders account.",
};

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F9FD]" />}>
      <OtpVerificationView />
    </Suspense>
  );
}
