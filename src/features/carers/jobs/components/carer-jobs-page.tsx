"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bookmark, MapPin } from "lucide-react";

type Job = { _id?: string; id?: string; title: string; city?: string; location?: string };

export function CarerJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState("Loading jobs…");

  useEffect(() => {
    Promise.all([fetch("/api/care/jobs"), fetch("/api/care/saved-jobs")])
      .then(async ([jobsResponse, savedResponse]) => {
        const jobsBody = await jobsResponse.json();
        const savedBody = await savedResponse.json();
        if (!jobsResponse.ok) throw Error(jobsBody.message);
        
        const rawJobs = Array.isArray(jobsBody.data)
          ? jobsBody.data
          : Array.isArray(jobsBody.data?.data)
            ? jobsBody.data.data
            : Array.isArray(jobsBody)
              ? jobsBody
              : [];

        const mappedJobs = rawJobs.map((j: any) => {
          const id = j._id || j.id;
          return { ...j, id, _id: id };
        });

        setJobs(mappedJobs);

        const ids = (savedBody.data || []).map(
          (item: { jobId: { _id?: string; id?: string } | string }) =>
            typeof item.jobId === "string"
              ? item.jobId
              : item.jobId._id || item.jobId.id || "",
        );
        setSaved(new Set(ids));
        setMessage("");
      })
      .catch((error) => setMessage(error.message || "Unable to load jobs"));
  }, []);

  async function save(id: string) {
    const active = saved.has(id);
    const response = await fetch("/api/care/saved-jobs", {
      method: active ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId: id }),
    });
    if (!response.ok) return setMessage("Unable to update saved jobs");
    setSaved((current) => {
      const next = new Set(current);
      if (active) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-white px-6 py-6 sm:px-8 xl:px-10">
      <h2 className="mb-5 text-2xl font-semibold">Job Board</h2>
      {message && <p className="mb-4 text-slate-600">{message}</p>}
      <div className="space-y-4">
        {jobs.map((job) => {
          const jobId = job._id || job.id || "";
          return (
            <article
              key={jobId}
              className="flex items-center justify-between rounded-xl bg-cyan-700/5 p-6"
            >
              <Link
                href={`/care/jobs/${jobId}`}
                className="min-w-0 flex-1 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-700"
              >
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="mt-2 flex items-center gap-1 text-slate-600">
                  <MapPin className="h-4 w-4" />
                  {job.city || job.location || "Location not specified"}
                </p>
                <span className="mt-3 inline-block text-sm font-medium text-cyan-700">
                  View details
                </span>
              </Link>
              <button
                onClick={() => save(jobId)}
                aria-label="Save job"
                className="ml-4 rounded-full bg-cyan-700/10 p-3"
              >
                <Bookmark
                  className={
                    saved.has(jobId)
                      ? "fill-cyan-700 text-cyan-700"
                      : "text-cyan-700"
                  }
                />
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
