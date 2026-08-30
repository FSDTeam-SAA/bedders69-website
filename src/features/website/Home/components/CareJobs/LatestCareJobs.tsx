"use client";

import { ArrowUpRight, Briefcase, RefreshCw } from "lucide-react";
import CareJobCard from "@/components/shared/JobCard";
import { useLatestJobs } from "../../hooks/useHome";
import Link from "next/link";

function formatPostedDate(dateStr?: string) {
  if (!dateStr) return "Recently posted";
  const date = new Date(dateStr);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays <= 0) return "Posted today";
  if (diffInDays === 1) return "1 day ago";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return date.toLocaleDateString("en-GB", { month: "short", day: "numeric" });
}

function formatJobType(type?: string) {
  if (!type) return "Full-Time";
  return type
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("-");
}

const LatestCareJobs = () => {
  const { jobs, isLoading, error, refetch } = useLatestJobs({
    limit: 4,
    page: 1,
  });

  return (
    <section className="w-full bg-[#f4f9ff] px-4 py-16 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-24">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-10 sm:gap-12 lg:gap-14">
        {/* Heading */}
        <div className="flex w-full flex-col items-start gap-2">
          <span className="text-base font-semibold uppercase leading-6 text-emerald-500">
            Latest Roles
          </span>

          <h2 className="text-3xl font-bold leading-10 text-cyan-700 sm:text-4xl">
            Care <span className="text-green-700">Jobs</span> Vacancies Across the UK
          </h2>

          <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-normal leading-6 text-neutral-700 sm:text-base">
              Rewarding roles updated daily
            </p>

            <Link
              href="/jobs"
              className="flex items-center gap-1.5 text-base font-bold tracking-tight text-cyan-700 transition hover:text-cyan-800 sm:text-lg"
            >
              Browse All Jobs
              <ArrowUpRight className="size-5" />
            </Link>
          </div>
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex w-full flex-col gap-4 rounded-2xl bg-white p-5 shadow-[0px_4px_6px_0px_rgba(43,110,166,0.08)]"
              >
                <div className="flex items-start gap-3">
                  <div className="size-12 animate-pulse rounded-xl bg-slate-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
                  </div>
                </div>
                <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-5 w-1/3 animate-pulse rounded bg-slate-200" />
                  <div className="h-7 w-20 animate-pulse rounded-lg bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="flex w-full max-w-md flex-col items-center justify-center gap-3 rounded-2xl border border-red-100 bg-red-50/50 p-8 text-center mx-auto">
            <p className="text-sm font-medium text-red-600">{error}</p>
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 rounded-lg bg-cyan-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-800"
            >
              <RefreshCw className="size-4" />
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && (!jobs || jobs.length === 0) && (
          <div className="flex w-full max-w-md flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center mx-auto">
            <div className="flex size-14 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">
              <Briefcase className="size-7" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold text-slate-800">
                No care jobs listed yet
              </h3>
              <p className="text-sm text-slate-500">
                Approved job openings from UK care providers will appear here automatically.
              </p>
            </div>
            <Link
              href="/login"
              className="rounded-lg bg-cyan-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-cyan-800"
            >
              Post a Job
            </Link>
          </div>
        )}

        {/* Live Jobs Grid from Backend API */}
        {!isLoading && !error && jobs && jobs.length > 0 && (
          <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
            {jobs.map((job, index) => {
              const salaryFormatted =
                job.salaryMin && job.salaryMax
                  ? `£${job.salaryMin.toLocaleString()} - £${job.salaryMax.toLocaleString()} / yr`
                  : job.salaryMin
                  ? `From £${job.salaryMin.toLocaleString()} / yr`
                  : undefined;

              const location =
                job.city || job.location || (job.postCode ? `UK (${job.postCode})` : "United Kingdom");

              return (
                <CareJobCard
                  key={job.id}
                  id={job.id}
                  title={job.title}
                  company={job.organization?.name || "Care Provider"}
                  location={location}
                  type={formatJobType(job.jobType)}
                  tags={job.requiredSkills || ["Care Assistant", "Healthcare"]}
                  posted={formatPostedDate(job.publishedAt || job.createdAt)}
                  salary={salaryFormatted}
                  featured={index < 2}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestCareJobs;
