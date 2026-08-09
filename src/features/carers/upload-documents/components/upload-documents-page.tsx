"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Upload } from "lucide-react";

type UploadErrors = {
  cvResume?: string;
  supportingDocuments?: string;
};

function UploadCard({
  label,
  description,
  inputId,
  fileLabel,
  error,
  onChange,
  accept,
  multiple = false,
}: {
  label: string;
  description: string;
  inputId: string;
  fileLabel: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  accept: string;
  multiple?: boolean;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-3">
      <label htmlFor={inputId} className="text-base font-medium leading-5 text-slate-800">
        {label}
      </label>
      <label
        htmlFor={inputId}
        className={`flex h-64 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-4 py-6 text-center transition hover:bg-cyan-50/40 ${
          error ? "border-red-400" : "border-neutral-400"
        }`}
      >
        <div className="inline-flex items-center justify-center rounded-[59px] bg-cyan-700/10 p-2">
          <div className="inline-flex items-center justify-center rounded-[54px] bg-cyan-700/10 p-2">
            <div className="flex h-6 w-6 items-center justify-center overflow-hidden">
              <Upload className="h-4 w-4 text-cyan-700" strokeWidth={1.8} />
            </div>
          </div>
        </div>
        <p className="max-w-[320px] text-base leading-5 text-gray-500">{fileLabel}</p>
        <p className="max-w-[710px] text-base leading-5 text-gray-500">{description}</p>
        <input
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={onChange}
          className="hidden"
        />
      </label>
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </div>
  );
}

export function UploadDocumentsPage() {
  const router = useRouter();
  const [cvResumeName, setCvResumeName] = useState("");
  const [supportingCountText, setSupportingCountText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<UploadErrors>({});

  function handleCvChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setCvResumeName(file?.name ?? "");
    setErrors((current) => ({ ...current, cvResume: "" }));
  }

  function handleSupportingChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || files.length === 0) {
      setSupportingCountText("");
    } else if (files.length === 1) {
      setSupportingCountText(files[0].name);
    } else {
      setSupportingCountText(`${files.length} files selected`);
    }
    setErrors((current) => ({ ...current, supportingDocuments: "" }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: UploadErrors = {};
    if (!cvResumeName) nextErrors.cvResume = "Please upload your CV / Resume.";
    if (!supportingCountText) nextErrors.supportingDocuments = "Please upload supporting documents.";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
    router.push("/carers");
  }

  return (
    <div className="min-h-screen bg-white px-6 py-6 sm:px-8 xl:px-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid gap-4 xl:grid-cols-2">
          <UploadCard
            label="CV / Resume"
            inputId="cv-resume"
            accept=".pdf,.doc,.docx"
            onChange={handleCvChange}
            fileLabel={cvResumeName || "Supported formats: PDF, DOC, DOCX • Max file size: 10 MB"}
            description=""
            error={errors.cvResume}
          />

          <UploadCard
            label="Supporting Documents"
            inputId="supporting-documents"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            multiple
            onChange={handleSupportingChange}
            fileLabel={
              supportingCountText ||
              "Upload your supporting documents, including certificates, identification, DBS, proof of address, right-to-work documents, or any other relevant files."
            }
            description=""
            error={errors.supportingDocuments}
          />
        </div>

        {submitted ? (
          <div className="flex w-full items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            Documents uploaded successfully.
          </div>
        ) : null}
      </form>
    </div>
  );
}
