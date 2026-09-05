"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { ApplyModal } from "./ApplyModal";

type Job = {
  _id?: string;
  id?: string;
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

const formatType = (value?: string) =>
  value
    ?.replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

export function CarerJobDetailPage({ slug: jobId }: { slug: string }) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!jobId || jobId === "undefined") {
      setError("Invalid job ID.");
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const jobResponse = await fetch(`/api/care/jobs/${encodeURIComponent(jobId)}`, {
          cache: "no-store",
        });
        const jobBody = await jobResponse.json();
        if (!jobResponse.ok)
          throw new Error(jobBody?.message || "Unable to load this job.");
        setJob(jobBody.data ?? jobBody);
      } catch (cause) {
        setError(
          cause instanceof Error ? cause.message : "Unable to load this job.",
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [jobId]);

  const salary =
    job?.salaryMin || job?.salaryMax
      ? `${job.salaryCurrency === "GBP" || !job.salaryCurrency ? "£" : `${job.salaryCurrency} `}${job.salaryMin?.toLocaleString() ?? ""}${job.salaryMax ? ` – ${job.salaryMax.toLocaleString()}` : ""}`
      : "Salary not specified";

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
              onClick={() => setIsModalOpen(true)}
              className="mt-4 rounded-lg bg-cyan-700 px-6 py-3 font-semibold text-white hover:bg-cyan-800 transition cursor-pointer"
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

      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={job}
      />
    </div>
  );
}
