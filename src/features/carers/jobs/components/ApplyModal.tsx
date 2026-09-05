"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { CalendarDays, CheckCircle2, FileText, X } from "lucide-react";

type Profile = {
  email?: string;
  phoneNumber?: string;
  cv?: string;
  cvFileName?: string;
  documents?: string[];
  documentNames?: string[];
};

type ApplyForm = {
  resumeUrl: string;
  coverLetter: string;
  expectedSalary: string;
  earliestStartDate: string;
};

const emptyForm: ApplyForm = {
  resumeUrl: "",
  coverLetter: "",
  expectedSalary: "",
  earliestStartDate: "",
};

const fileName = (url: string) =>
  decodeURIComponent(url.split("/").pop()?.split("?")[0] || "Document");

export interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: {
    _id?: string;
    id?: string;
    title: string;
  } | null;
  onSuccess?: () => void;
}

export function ApplyModal({ isOpen, onClose, job, onSuccess }: ApplyModalProps) {
  const [profile, setProfile] = useState<Profile>({});
  const [form, setForm] = useState<ApplyForm>(emptyForm);
  const [error, setError] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setError("");
      return;
    }

    let isMounted = true;
    (async () => {
      setError("");
      try {
        const profileRes = await fetch("/api/care/profile", { cache: "no-store" });
        const profileBody = await profileRes.json();
        if (profileRes.ok && isMounted) {
          const fetchedProfile = profileBody.data ?? profileBody;
          setProfile(fetchedProfile);

          const availableResumes = [
            fetchedProfile.cv,
            ...(fetchedProfile.documents ?? []),
          ].filter(Boolean);

          setForm({
            ...emptyForm,
            resumeUrl: availableResumes[0] || "",
          });
        }
      } catch {
        if (isMounted) setError("Unable to load profile data");
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  if (!isOpen || !job) return null;

  const jobId = job._id || job.id || "";

  const resumes = [profile.cv, ...(profile.documents ?? [])].filter(
    (url): url is string => Boolean(url)
  );

  const getResumeName = (url: string) =>
    url === profile.cv
      ? profile.cvFileName || fileName(url)
      : profile.documentNames?.[(profile.documents ?? []).indexOf(url)] || fileName(url);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!jobId) {
      setError("Invalid job selected.");
      return;
    }

    setIsApplying(true);
    setError("");

    try {
      const response = await fetch("/api/care/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, ...form }),
      });
      const body = await response.json();
      if (!response.ok) {
        throw new Error(body?.message || "Unable to submit your application.");
      }
      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Unable to submit your application."
      );
    } finally {
      setIsApplying(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 font-sans backdrop-blur-xs animate-fade-in">
      <div className="relative max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl sm:text-2xl font-bold text-[#1B2C54]">
          Apply to {job.title}
        </h2>

        {submitted ? (
          <div className="py-10 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
            <p className="mt-4 text-lg font-semibold text-slate-800">
              Application submitted successfully!
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Your application has been received by the care provider.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-xl bg-cyan-700 hover:bg-cyan-800 px-6 py-2.5 font-semibold text-white transition cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Email & Phone Number */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Email
                </label>
                <input
                  disabled
                  value={profile.email ?? "Loading..."}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-xs sm:text-sm text-slate-600 font-medium outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Phone Number
                </label>
                <input
                  disabled
                  value={profile.phoneNumber ?? "Not available"}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-xs sm:text-sm text-slate-600 font-medium outline-none"
                />
              </div>
            </div>

            {/* CV / Resume Section */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                CV / Resume
              </label>

              <div className="rounded-2xl bg-cyan-700/5 border border-cyan-700/10 p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-cyan-700 flex items-center justify-center text-white shrink-0">
                    <FileText className="size-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">
                      CV / Resume
                    </h4>
                    <p className="text-xs text-slate-500">
                      Upload your updated CV showing your work experience and skills.
                    </p>
                  </div>
                </div>

                {resumes.length > 0 ? (
                  <select
                    required
                    value={form.resumeUrl}
                    onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
                    className="w-full h-11 bg-white rounded-xl border border-slate-200 px-3.5 text-xs sm:text-sm text-slate-700 outline-none focus:border-cyan-700 cursor-pointer"
                  >
                    {resumes.map((url) => (
                      <option key={url} value={url}>
                        {getResumeName(url)}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-xs text-red-500 font-medium">
                    No CV found. Please upload a CV from your Documents page before applying.
                  </p>
                )}
              </div>
            </div>

            {/* Expected Salary & Start Date */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Expected Salary
                </label>
                <input
                  type="text"
                  value={form.expectedSalary}
                  onChange={(e) => setForm({ ...form, expectedSalary: e.target.value })}
                  placeholder="e.g. £30,000"
                  className="h-11 w-full rounded-xl border border-slate-200 px-3.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-cyan-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Earliest Start Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={form.earliestStartDate}
                    onChange={(e) => setForm({ ...form, earliestStartDate: e.target.value })}
                    className="h-11 w-full rounded-xl border border-slate-200 px-3.5 pr-10 text-xs sm:text-sm text-slate-800 outline-none focus:border-cyan-700"
                  />
                  <CalendarDays className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Cover Letter Textarea */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Cover Letter (Optional)
              </label>
              <textarea
                value={form.coverLetter}
                onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
                rows={3}
                placeholder="Write a brief intro..."
                className="w-full rounded-xl border border-slate-200 p-3.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-cyan-700 resize-none"
              />
            </div>

            {error && (
              <p role="alert" className="text-xs text-red-500 font-medium">
                {error}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isApplying || resumes.length === 0}
                className="px-6 py-2.5 rounded-xl bg-[#2D6A9F] hover:bg-[#20527F] disabled:bg-slate-300 text-white text-xs sm:text-sm font-semibold transition shadow-sm cursor-pointer"
              >
                {isApplying ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ApplyModal;
