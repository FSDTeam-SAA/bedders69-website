"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Bookmark, MapPin } from "lucide-react";
type Job = { _id?: string; id?: string; title: string; city?: string; location?: string };
type Saved = { jobId: Job };
export function CarerSavedJobsPage() {
  const [jobs, setJobs] = useState<Saved[]>([]);
  const [msg, setMsg] = useState("Loading saved jobs…");
  useEffect(() => {
    fetch("/api/care/saved-jobs")
      .then(async (r) => {
        const b = await r.json();
        if (!r.ok) throw Error(b.message);
        setJobs(b.data || []);
        setMsg("");
      })
      .catch((e) => setMsg(e.message || "Unable to load saved jobs"));
  }, []);
  async function remove(id: string) {
    const r = await fetch("/api/care/saved-jobs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId: id }),
    });
    if (!r.ok) return setMsg("Unable to remove saved job");
    setJobs((v) => v.filter((x) => (x.jobId._id || x.jobId.id) !== id));
  }
  async function apply(id: string) {
    const r = await fetch("/api/care/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobId: id }),
    });
    const b = await r.json();
    setMsg(r.ok ? "Application submitted successfully" : b.message || "Unable to apply");
  }
  return (
    <div className="min-h-screen bg-white px-6 py-6 sm:px-8 xl:px-10">
      <h2 className="mb-5 text-2xl font-semibold">Saved Jobs</h2>
      {msg && <p className="mb-4 text-slate-600">{msg}</p>}
      <div className="space-y-4">
        {jobs.map(({ jobId: job }) => {
          const id = job._id || job.id || "";
          return (
            <article
              key={id}
              className="flex items-center justify-between rounded-xl bg-cyan-700/5 p-6"
            >
              <Link href={`/care/jobs/${id}`} className="min-w-0 flex-1 hover:underline">
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="mt-2 flex items-center gap-1 text-slate-600">
                  <MapPin className="h-4 w-4" />
                  {job.city || job.location || "Location not specified"}
                </p>
              </Link>
              <div className="flex gap-2">
                <button
                  onClick={() => remove(id)}
                  aria-label="Remove saved job"
                  className="rounded-full bg-cyan-700/10 p-3"
                >
                  <Bookmark className="fill-cyan-700 text-cyan-700" />
                </button>
                <button
                  onClick={() => apply(id)}
                  className="rounded-lg bg-cyan-700 px-4 text-white"
                >
                  Apply now
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
