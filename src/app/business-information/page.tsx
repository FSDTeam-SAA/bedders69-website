import { BusinessInformationView } from "@/features/auth/Business-Information";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Business Information | Bedders - UK Care Industry Ecosystem",
  description: "Provide your business details to create your organization profile.",
};

export default function BusinessInformationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F9FD]" />}>
      <BusinessInformationView />
    </Suspense>
  );
}
