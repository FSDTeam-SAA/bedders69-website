import { UserSignupView } from "@/features/auth/user-signup";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create Your Account | Bedders - UK Care Industry Ecosystem",
  description: "Create your Bedders user account.",
};

export default function UserSignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F9FD]" />}>
      <UserSignupView />
    </Suspense>
  );
}
