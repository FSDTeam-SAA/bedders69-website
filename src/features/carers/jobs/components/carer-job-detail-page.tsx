"use client";

import { FormEvent, useEffect, useState } from "react";
import { CalendarDays, CheckCircle2, MapPin } from "lucide-react";

type Job = {
  id: string;
  title: string;
  description?: string;
  city?: string;
  location?: string;
  jobType?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  requiredSkills?: string[];
  requirements?: string[];
  organization?: { name?: string } | null;
};
type Profile = {
  email?: string;
  phoneNumber?: string;
  cv?: string;
  documents?: string[];
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
const formatType = (value?: string) =>
  value
    ?.replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

export function CarerJobDetailPage({ slug: jobId }: { slug: string }) {
  const [job, setJob] = useState<Job | null>(null);
  const [profile, setProfile] = useState<Profile>({});
  const [form, setForm] = useState<ApplyForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const [jobResponse, profileResponse] = await Promise.all([
          fetch(`/api/care/jobs/${encodeURIComponent(jobId)}`, {
            cache: "no-store",
          }),
          fetch("/api/care/profile", { cache: "no-store" }),
        ]);
        const [jobBody, profileBody] = await Promise.all([
          jobResponse.json(),
          profileResponse.json(),
        ]);
        if (!jobResponse.ok)
          throw new Error(jobBody?.message || "Unable to load this job.");
        if (!profileResponse.ok)
          throw new Error(
            profileBody?.message || "Unable to load your profile.",
          );
        setJob(jobBody.data ?? jobBody);
        setProfile(profileBody.data ?? profileBody);
      } catch (cause) {
        setError(
          cause instanceof Error ? cause.message : "Unable to load this job.",
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [jobId]);
  const resumes = [profile.cv, ...(profile.documents ?? [])].filter(
    (url): url is string => Boolean(url),
  );
  const salary =
    job?.salaryMin || job?.salaryMax
      ? `${job.salaryCurrency === "GBP" || !job.salaryCurrency ? "£" : `${job.salaryCurrency} `}${job.salaryMin?.toLocaleString() ?? ""}${job.salaryMax ? ` – ${job.salaryMax.toLocaleString()}` : ""}`
      : "Salary not specified";
  function openModal() {
    setError("");
    setSubmitted(false);
    setForm({ ...emptyForm, resumeUrl: resumes[0] ?? "" });
    setIsModalOpen(true);
  }
  async function apply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!job) return;
    setIsApplying(true);
    setError("");
    try {
      const response = await fetch("/api/care/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: job.id, ...form }),
      });
      const body = await response.json();
      if (!response.ok)
        throw new Error(body?.message || "Unable to submit your application.");
      setSubmitted(true);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Unable to submit your application.",
      );
    } finally {
      setIsApplying(false);
    }
  }
  if (loading)
    return (
      <div role="status" className="p-10 text-center text-slate-600">
        Loading job details…
      </div>
    );
  if (!job)
    return (
      <div role="alert" className="p-10 text-center text-red-600">
        {error || "Job not found."}
      </div>
    );
  return (
    <div className="min-h-screen bg-white px-6 py-6 sm:px-8 xl:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-7 sm:flex-row">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              {job.title}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-slate-600">
              <MapPin className="h-4 w-4" />
              {job.city || job.location || "Location not specified"}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              {job.organization?.name || "Organisation not specified"} ·{" "}
              {formatType(job.jobType) || "Job type not specified"}
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xl font-semibold text-cyan-700">{salary}</p>
            <button
              type="button"
              onClick={openModal}
              className="mt-4 rounded-lg bg-cyan-700 px-6 py-3 font-semibold text-white hover:bg-cyan-800"
            >
              Apply now
            </button>
          </div>
        </div>
        <div className="space-y-8 py-8">
          <section>
            <h2 className="text-xl font-semibold text-slate-900">
              About the role
            </h2>
            <p className="mt-3 whitespace-pre-wrap leading-7 text-slate-700">
              {job.description || "No job description provided."}
            </p>
          </section>
          {job.requirements?.length ? (
            <section>
              <h2 className="text-xl font-semibold text-slate-900">
                Requirements
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                {job.requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}
          {job.requiredSkills?.length ? (
            <section>
              <h2 className="text-xl font-semibold text-slate-900">Skills</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {job.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-cyan-50 px-3 py-1 text-sm text-cyan-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <form
            onSubmit={apply}
            className="max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl"
          >
            <h2 className="text-2xl font-semibold text-slate-800">
              Apply to {job.title}
            </h2>
            {submitted ? (
              <div className="py-10 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
                <p className="mt-4 text-lg font-medium">
                  Application submitted successfully.
                </p>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-6 rounded-lg bg-cyan-700 px-5 py-2.5 font-semibold text-white"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-medium text-slate-700">
                    Email
                    <input
                      disabled
                      value={profile.email ?? "Not available"}
                      className="mt-1 h-11 w-full rounded-md border border-slate-300 bg-slate-100 px-3 text-slate-600"
                    />
                  </label>
                  <label className="text-sm font-medium text-slate-700">
                    Phone number
                    <input
                      disabled
                      value={profile.phoneNumber ?? "Not available"}
                      className="mt-1 h-11 w-full rounded-md border border-slate-300 bg-slate-100 px-3 text-slate-600"
                    />
                  </label>
                </div>
                <label className="mt-4 block text-sm font-medium text-slate-700">
                  CV / Resume
                  <select
                    required
                    value={form.resumeUrl}
                    onChange={(e) =>
                      setForm({ ...form, resumeUrl: e.target.value })
                    }
                    className="mt-1 h-12 w-full rounded-md border border-slate-300 px-3"
                  >
                    <option value="">Select an uploaded document</option>
                    {resumes.map((url) => (
                      <option key={url} value={url}>
                        {fileName(url)}
                      </option>
                    ))}
                  </select>
                </label>
                {resumes.length === 0 ? (
                  <p className="mt-2 text-sm text-red-600">
                    Upload a CV or supporting document from your Documents page
                    before applying.
                  </p>
                ) : null}
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-medium text-slate-700">
                    Expected salary
                    <input
                      value={form.expectedSalary}
                      onChange={(e) =>
                        setForm({ ...form, expectedSalary: e.target.value })
                      }
                      placeholder="e.g. £30,000"
                      className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3"
                    />
                  </label>
                  <label className="text-sm font-medium text-slate-700">
                    Earliest start date
                    <div className="relative">
                      <input
                        type="date"
                        value={form.earliestStartDate}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            earliestStartDate: e.target.value,
                          })
                        }
                        className="mt-1 h-11 w-full rounded-md border border-slate-300 px-3"
                      />
                      <CalendarDays className="pointer-events-none absolute right-3 top-4 h-4 w-4 text-slate-500" />
                    </div>
                  </label>
                </div>
                <label className="mt-4 block text-sm font-medium text-slate-700">
                  Cover letter (optional)
                  <textarea
                    value={form.coverLetter}
                    onChange={(e) =>
                      setForm({ ...form, coverLetter: e.target.value })
                    }
                    rows={4}
                    className="mt-1 w-full rounded-md border border-slate-300 p-3"
                  />
                </label>
                {error ? (
                  <p role="alert" className="mt-4 text-sm text-red-600">
                    {error}
                  </p>
                ) : null}
                <div className="mt-6 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-lg border border-cyan-700 px-5 py-2.5 font-medium text-cyan-700"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isApplying || resumes.length === 0}
                    className="rounded-lg bg-cyan-700 px-5 py-2.5 font-semibold text-white disabled:opacity-60"
                  >
                    {isApplying ? "Submitting…" : "Submit"}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      ) : null}
    </div>
  );
}
