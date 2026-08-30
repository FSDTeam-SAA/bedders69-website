import { UploadDocumentsView } from "@/features/auth/Upload-Documents";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Upload Documents | Bedders - UK Care Industry Ecosystem",
  description: "Upload your credentials and certifications on Bedders.",
};

export default function UploadDocumentsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F9FD]" />}>
      <UploadDocumentsView />
    </Suspense>
  );
}
