import { ChoosePlanView } from "@/features/auth/Choose-Your-Plan";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Choose Your Plan | Bedders - UK Care Industry Ecosystem",
  description: "Start free or unlock premium features for your care business on Bedders.",
};

export default function ChoosePlanPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F9FD]" />}>
      <ChoosePlanView />
    </Suspense>
  );
}
