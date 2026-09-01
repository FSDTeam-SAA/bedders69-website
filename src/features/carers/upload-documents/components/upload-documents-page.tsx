"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { CheckCircle2, ExternalLink, FileText, Upload, Loader2 } from "lucide-react";

type UploadedDocuments = {
  cv?: string;
  dbsCertificate?: string;
  careCertificate?: string;
  trainingCertificates?: string[];
  firstAidCertificate?: string;
  qualificationCertificates?: string[];
  documents?: string[];
};

function getFileName(url: string) {
  return decodeURIComponent(url.split("/").pop()?.split("?")[0] || "Document");
}

function UploadCard({
  label,
  description = "",
  inputId,
  fileLabel,
  onChange,
  accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png",
  multiple = false,
}: {
  label: string;
  description?: string;
  inputId: string;
  fileLabel: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  multiple?: boolean;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-2">
      <label htmlFor={inputId} className="text-base font-semibold leading-5 text-slate-800">
        {label}
      </label>
      <label
        htmlFor={inputId}
        className="flex min-h-[140px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-300 bg-cyan-700/5 px-4 py-4 text-center transition hover:bg-cyan-700/10 hover:border-cyan-700/40"
      >
        <div className="inline-flex items-center justify-center rounded-full bg-cyan-700/10 p-2">
          <Upload className="h-5 w-5 text-cyan-700" strokeWidth={1.8} />
        </div>
        <p className="text-sm font-medium text-slate-700">{fileLabel}</p>
        {description && <p className="text-xs text-gray-500">{description}</p>}
        <input
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={onChange}
          className="hidden"
        />
      </label>
    </div>
  );
}

export function UploadDocumentsPage() {
  const [cvResume, setCvResume] = useState<File | null>(null);
  const [dbsCert, setDbsCert] = useState<File | null>(null);
  const [careCert, setCareCert] = useState<File | null>(null);
  const [trainingCerts, setTrainingCerts] = useState<File[]>([]);
  const [firstAidCert, setFirstAidCert] = useState<File | null>(null);
  const [qualificationCerts, setQualificationCerts] = useState<File[]>([]);
  const [supportingDocuments, setSupportingDocuments] = useState<File[]>([]);

  const [submitted, setSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingUploads, setIsLoadingUploads] = useState(true);
  const [submitError, setSubmitError] = useState("");
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocuments>({});

  useEffect(() => {
    async function loadUploadedDocuments() {
      try {
        const response = await fetch("/api/care/profile", { cache: "no-store" });
        const body = await response.json();

        if (!response.ok) {
          throw new Error(body?.message || "Unable to load uploaded documents.");
        }

        const profile: UploadedDocuments = body.data ?? body;
        setUploadedDocs({
          cv: profile.cv,
          dbsCertificate: profile.dbsCertificate,
          careCertificate: profile.careCertificate,
          trainingCertificates: Array.isArray(profile.trainingCertificates) ? profile.trainingCertificates : [],
          firstAidCertificate: profile.firstAidCertificate,
          qualificationCertificates: Array.isArray(profile.qualificationCertificates) ? profile.qualificationCertificates : [],
          documents: Array.isArray(profile.documents) ? profile.documents : [],
        });
      } catch (error) {
        setSubmitError(
          error instanceof Error ? error.message : "Unable to load uploaded documents."
        );
      } finally {
        setIsLoadingUploads(false);
      }
    }

    void loadUploadedDocuments();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const hasAnyFile =
      cvResume ||
      dbsCert ||
      careCert ||
      trainingCerts.length > 0 ||
      firstAidCert ||
      qualificationCerts.length > 0 ||
      supportingDocuments.length > 0;

    if (!hasAnyFile) {
      setSubmitError("Please select at least one document or certificate to upload.");
      return;
    }

    setIsUploading(true);
    setSubmitError("");
    setSubmitted(false);

    try {
      const formData = new FormData();
      if (cvResume) formData.append("cv", cvResume);
      if (dbsCert) formData.append("dbsCertificate", dbsCert);
      if (careCert) formData.append("careCertificate", careCert);
      trainingCerts.forEach((file) => formData.append("trainingCertificates", file));
      if (firstAidCert) formData.append("firstAidCertificate", firstAidCert);
      qualificationCerts.forEach((file) => formData.append("qualificationCertificates", file));
      supportingDocuments.forEach((file) => formData.append("documents", file));

      const response = await fetch("/api/care/profile", {
        method: "PATCH",
        body: formData,
      });
      const body = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(body?.message || "Unable to upload documents. Please try again.");
      }

      const profile: UploadedDocuments = body.data ?? body;
      setUploadedDocs({
        cv: profile.cv,
        dbsCertificate: profile.dbsCertificate,
        careCertificate: profile.careCertificate,
        trainingCertificates: Array.isArray(profile.trainingCertificates) ? profile.trainingCertificates : [],
        firstAidCertificate: profile.firstAidCertificate,
        qualificationCertificates: Array.isArray(profile.qualificationCertificates) ? profile.qualificationCertificates : [],
        documents: Array.isArray(profile.documents) ? profile.documents : [],
      });

      // Clear input selections after successful upload
      setCvResume(null);
      setDbsCert(null);
      setCareCert(null);
      setTrainingCerts([]);
      setFirstAidCert(null);
      setQualificationCerts([]);
      setSupportingDocuments([]);

      setSubmitted(true);
    } catch (error) {
      setSubmitted(false);
      setSubmitError(
        error instanceof Error ? error.message : "Unable to upload documents. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white px-6 py-6 sm:px-8 xl:px-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <UploadCard
            label="CV / Resume"
            inputId="cv-resume"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setCvResume(e.target.files?.[0] ?? null)}
            fileLabel={cvResume ? cvResume.name : "Upload CV (.pdf, .doc, .docx)"}
          />

          <UploadCard
            label="DBS Certificate"
            inputId="dbs-cert"
            onChange={(e) => setDbsCert(e.target.files?.[0] ?? null)}
            fileLabel={dbsCert ? dbsCert.name : "Upload DBS Certificate"}
          />

          <UploadCard
            label="Care Certificate"
            inputId="care-cert"
            onChange={(e) => setCareCert(e.target.files?.[0] ?? null)}
            fileLabel={careCert ? careCert.name : "Upload Care Certificate"}
          />

          <UploadCard
            label="Training Certificates"
            inputId="training-certs"
            multiple
            onChange={(e) => setTrainingCerts(Array.from(e.target.files ?? []))}
            fileLabel={
              trainingCerts.length > 0
                ? `${trainingCerts.length} training certificate(s) selected`
                : "Upload Training Certificates"
            }
          />

          <UploadCard
            label="First Aid Certificate"
            inputId="first-aid-cert"
            onChange={(e) => setFirstAidCert(e.target.files?.[0] ?? null)}
            fileLabel={firstAidCert ? firstAidCert.name : "Upload First Aid Certificate"}
          />

          <UploadCard
            label="Qualification Certificates"
            inputId="qualification-certs"
            multiple
            onChange={(e) => setQualificationCerts(Array.from(e.target.files ?? []))}
            fileLabel={
              qualificationCerts.length > 0
                ? `${qualificationCerts.length} qualification file(s) selected`
                : "Upload Qualification Certificates"
            }
          />

          <div className="md:col-span-2 xl:col-span-3">
            <UploadCard
              label="Other Supporting Documents"
              inputId="supporting-documents"
              multiple
              onChange={(e) => setSupportingDocuments(Array.from(e.target.files ?? []))}
              fileLabel={
                supportingDocuments.length > 0
                  ? `${supportingDocuments.length} supporting document(s) selected`
                  : "Upload additional certificates, ID, proof of address, or right-to-work documents."
              }
            />
          </div>
        </div>

        <section className="rounded-2xl border border-cyan-700/10 bg-cyan-700/5 p-6">
          <h2 className="text-lg font-semibold text-slate-800">Uploaded Certificates & Documents</h2>
          {isLoadingUploads ? (
            <div className="mt-4 flex items-center gap-2 text-sm text-cyan-700">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading uploaded documents…</span>
            </div>
          ) : (
            <div className="mt-4 flex flex-col gap-3">
              {uploadedDocs.cv && (
                <a
                  href={uploadedDocs.cv}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 text-sm font-medium text-cyan-700 shadow-xs hover:bg-cyan-50"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <FileText className="h-4 w-4 shrink-0" />
                    <span className="truncate">CV / Resume: {getFileName(uploadedDocs.cv)}</span>
                  </span>
                  <ExternalLink className="h-4 w-4 shrink-0" />
                </a>
              )}

              {uploadedDocs.dbsCertificate && (
                <a
                  href={uploadedDocs.dbsCertificate}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 text-sm font-medium text-cyan-700 shadow-xs hover:bg-cyan-50"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <FileText className="h-4 w-4 shrink-0" />
                    <span className="truncate">DBS Certificate: {getFileName(uploadedDocs.dbsCertificate)}</span>
                  </span>
                  <ExternalLink className="h-4 w-4 shrink-0" />
                </a>
              )}

              {uploadedDocs.careCertificate && (
                <a
                  href={uploadedDocs.careCertificate}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 text-sm font-medium text-cyan-700 shadow-xs hover:bg-cyan-50"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <FileText className="h-4 w-4 shrink-0" />
                    <span className="truncate">Care Certificate: {getFileName(uploadedDocs.careCertificate)}</span>
                  </span>
                  <ExternalLink className="h-4 w-4 shrink-0" />
                </a>
              )}

              {uploadedDocs.trainingCertificates?.map((doc, idx) => (
                <a
                  key={doc}
                  href={doc}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 text-sm font-medium text-cyan-700 shadow-xs hover:bg-cyan-50"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <FileText className="h-4 w-4 shrink-0" />
                    <span className="truncate">Training Certificate #{idx + 1}: {getFileName(doc)}</span>
                  </span>
                  <ExternalLink className="h-4 w-4 shrink-0" />
                </a>
              ))}

              {uploadedDocs.firstAidCertificate && (
                <a
                  href={uploadedDocs.firstAidCertificate}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 text-sm font-medium text-cyan-700 shadow-xs hover:bg-cyan-50"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <FileText className="h-4 w-4 shrink-0" />
                    <span className="truncate">First Aid Certificate: {getFileName(uploadedDocs.firstAidCertificate)}</span>
                  </span>
                  <ExternalLink className="h-4 w-4 shrink-0" />
                </a>
              )}

              {uploadedDocs.qualificationCertificates?.map((doc, idx) => (
                <a
                  key={doc}
                  href={doc}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 text-sm font-medium text-cyan-700 shadow-xs hover:bg-cyan-50"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <FileText className="h-4 w-4 shrink-0" />
                    <span className="truncate">Qualification Certificate #{idx + 1}: {getFileName(doc)}</span>
                  </span>
                  <ExternalLink className="h-4 w-4 shrink-0" />
                </a>
              ))}

              {uploadedDocs.documents?.map((doc, idx) => (
                <a
                  key={doc}
                  href={doc}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 text-sm font-medium text-cyan-700 shadow-xs hover:bg-cyan-50"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <FileText className="h-4 w-4 shrink-0" />
                    <span className="truncate">Supporting Document #{idx + 1}: {getFileName(doc)}</span>
                  </span>
                  <ExternalLink className="h-4 w-4 shrink-0" />
                </a>
              ))}

              {!uploadedDocs.cv &&
                !uploadedDocs.dbsCertificate &&
                !uploadedDocs.careCertificate &&
                (!uploadedDocs.trainingCertificates || uploadedDocs.trainingCertificates.length === 0) &&
                !uploadedDocs.firstAidCertificate &&
                (!uploadedDocs.qualificationCertificates || uploadedDocs.qualificationCertificates.length === 0) &&
                (!uploadedDocs.documents || uploadedDocs.documents.length === 0) && (
                  <p className="text-sm text-slate-500">No documents or certificates uploaded yet.</p>
                )}
            </div>
          )}
        </section>

        {submitted ? (
          <div className="flex w-full items-center gap-2 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
            Documents & certificates uploaded successfully!
          </div>
        ) : null}

        {submitError ? (
          <p role="alert" className="text-sm font-medium text-rose-600">{submitError}</p>
        ) : null}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isUploading}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-8 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-cyan-800 disabled:opacity-50 active:scale-95"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Uploading Documents...</span>
              </>
            ) : (
              <>
                <Upload className="h-5 w-5" />
                <span>Upload Documents & Certificates</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

