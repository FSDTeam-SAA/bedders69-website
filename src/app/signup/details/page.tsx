import { UserSignupView } from "@/features/auth/user-signup";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create Your Account | Bedders - UK Care Industry Ecosystem",
  description: "Create your Bedders account.",
};

export default function SignupDetailsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F9FD]" />}>
      <UserSignupView />
    </Suspense>
  );
}
