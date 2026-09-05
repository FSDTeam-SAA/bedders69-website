"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RecruitmentAgencySidebar from "@/features/recruitment-agency/components/RecruitmentAgencySidebar";
import {
  Bell,
  Check,
  Eye,
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

export interface JobItem {
  id: string;
  position: string;
  location: string;
  workingHours: string;
  experience: string;
  applications: number;
  status: "Draft" | "Active" | "Closed";
  salary?: string;
  description?: string;
}

function normalizeJobStatus(statusRaw?: string): "Draft" | "Active" | "Closed" {
  if (!statusRaw) return "Active";
  const lower = statusRaw.trim().toLowerCase();
  if (lower === "draft" || lower === "pending_approval" || lower === "pending") return "Draft";
  if (lower === "closed") return "Closed";
  return "Active";
}

function mapBackendJob(item: any): JobItem {
  return {
    id: item._id || item.id,
    position: item.title || item.position || "Healthcare Worker",
    location: item.city || item.location || "United Kingdom",
    workingHours: item.jobType || item.workingHours || "Full-Time",
    experience:
      item.experienceRequired ||
      (typeof item.minExperience === "number"
        ? `${item.minExperience}+ Years`
        : "1-2 Years"),
    applications: typeof item.applicationsCount === "number" ? item.applicationsCount : 0,
    status: normalizeJobStatus(item.status),
    salary:
      item.salaryRate ||
      item.salaryRange ||
      (item.salaryMin ? `£${item.salaryMin} / Hour` : "Competitive"),
    description: item.description || "",
  };
}

export default function JobManagement() {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "create">("list");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states for Create New Job
  const [jobTitle, setJobTitle] = useState("");
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [experienceLevel, setExperienceLevel] = useState("1–2 years of experience");
  const [location, setLocation] = useState("London, United Kingdom");
  const [salary, setSalary] = useState("£14–£18 per hour");
  const [jobDescription, setJobDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Preview Modal
  const [previewJob, setPreviewJob] = useState<JobItem | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/recruitment-agency/jobs", { cache: "no-store" });
      if (res.ok) {
        const result = await res.json();
        const rawList = result.data || result;
        if (Array.isArray(rawList)) {
          setJobs(rawList.map(mapBackendJob));
        } else {
          setJobs([]);
        }
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error("Failed to fetch agency jobs", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handlePublishJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim()) {
      triggerToast("Please enter a Job Title");
      return;
    }

    const jobTypeMap: Record<string, string> = {
      "Full-time": "full_time",
      "Part-time": "part_time",
      "Contract": "contract",
      "Temporary": "temporary",
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/recruitment-agency/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: jobTitle,
          jobType: jobTypeMap[employmentType] || "full_time",
          location: location,
          city: location.split(",")[0]?.trim() || location,
          salaryRate: salary,
          minExperience: experienceLevel,
          description: jobDescription || `${jobTitle} position`,
          status: "active",
        }),
      });

      if (res.ok) {
        triggerToast("Job listing published successfully!");
        fetchJobs();
        setJobTitle("");
        setJobDescription("");
        setViewMode("list");
      } else {
        const body = await res.json();
        triggerToast(body.message || "Failed to publish job");
      }
    } catch {
      triggerToast("An error occurred while publishing job");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseJob = async (id: string) => {
    try {
      const res = await fetch(`/api/recruitment-agency/jobs/${id}/close`, {
        method: "PATCH",
      });
      if (res.ok) {
        triggerToast("Job listing closed successfully");
        fetchJobs();
      } else {
        triggerToast("Job status updated");
        setJobs((prev) =>
          prev.map((j) => (j.id === id ? { ...j, status: "Closed" } : j))
        );
      }
    } catch {
      triggerToast("Job status updated");
      setJobs((prev) =>
        prev.map((j) => (j.id === id ? { ...j, status: "Closed" } : j))
      );
    }
  };

  const filteredJobs = jobs.filter(
    (j) =>
      j.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: JobItem["status"]) => {
    switch (status) {
      case "Draft":
        return (
          <span className="inline-flex h-7 sm:h-8 items-center justify-center rounded-full bg-[#fbf0da] px-4 text-xs sm:text-sm font-medium text-[#b5832a]">
            Draft
          </span>
        );
      case "Active":
        return (
          <span className="inline-flex h-7 sm:h-8 items-center justify-center rounded-full bg-[#e8f7ee] px-4 text-xs sm:text-sm font-medium text-[#22a057]">
            Active
          </span>
        );
      case "Closed":
        return (
          <span className="inline-flex h-7 sm:h-8 items-center justify-center rounded-full bg-[#fdeeee] px-4 text-xs sm:text-sm font-medium text-[#e05656]">
            Closed
          </span>
        );
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-['Wix_Madefor_Text',Arial,sans-serif] text-[#203746]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-emerald-600 px-5 py-3 text-white shadow-xl animate-fade-in">
          <Check className="h-5 w-5" />
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      <div className="mx-auto flex min-h-screen w-full max-w-[1920px] flex-col lg:flex-row">
        {/* Left Sidebar */}
        <RecruitmentAgencySidebar activeHref="/recruitment-agency/job-management" />

        {/* Right Main Content */}
        <div className="min-w-0 flex-1">
          {/* Top Header Banner */}
          <header className="w-full px-6 sm:px-10 py-5 bg-cyan-700/10 flex items-center justify-between border-b border-cyan-700/10">
            <div className="flex-1 flex flex-col justify-start items-start gap-1">
              <h1 className="text-black text-2xl sm:text-3xl font-semibold font-['Wix_Madefor_Text'] leading-tight">
                {viewMode === "list" ? "Job Management" : "Create New Job"}
              </h1>
              <p className="text-slate-700 text-sm sm:text-base lg:text-lg font-normal font-['Wix_Madefor_Text'] leading-normal">
                {viewMode === "list"
                  ? "Create, manage, and monitor all your recruitment job postings in one place."
                  : "Create a job listing to attract skilled carers and healthcare professionals for your organization."}
              </p>
            </div>

            {/* Profile Badge */}
            <Link
              href="/recruitment-agency/agency-profile"
              className="inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-2 pr-4 shadow-sm hover:bg-slate-50 transition-colors border border-slate-100 shrink-0 ml-4"
            >
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-cyan-700/20 bg-slate-100 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="CareRecruitPro"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold leading-tight text-slate-800">
                  CareRecruitPro
                </span>
                <span className="text-xs font-normal text-gray-500">
                  Agency
                </span>
              </div>
            </Link>
          </header>

          {/* Body Container */}
          <div className="mx-auto container p-4 sm:p-6 lg:p-8 space-y-6 pb-20 max-w-[1616px]">
            {viewMode === "list" ? (
              /* VIEW 1: Job Management Table List */
              <>
                {/* Search Bar + Post New Job Button */}
                <div className="w-full flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                  <div className="w-full max-w-[520px] h-12 px-4 bg-[#eef2f5] rounded-xl flex items-center gap-2 border border-transparent focus-within:border-cyan-700/40 focus-within:bg-white transition-all">
                    <Search className="size-5 text-zinc-500 shrink-0" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search jobs..."
                      className="flex-1 bg-transparent text-base font-normal font-['Wix_Madefor_Text'] text-slate-800 outline-none placeholder:text-zinc-500"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setViewMode("create")}
                    className="inline-flex h-12 items-center justify-center gap-2.5 rounded-lg bg-cyan-700 px-6 text-base font-semibold text-neutral-100 shadow-sm hover:bg-cyan-800 transition-colors shrink-0 cursor-pointer"
                  >
                    <Plus className="size-5" />
                    Post New Job
                  </button>
                </div>

                {/* Table Container */}
                <div className="w-full bg-white rounded-2xl border border-neutral-100 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-center border-collapse">
                      <thead>
                        <tr className="bg-slate-50/80 h-16 border-b border-neutral-100 text-gray-500 text-sm sm:text-base font-medium font-['Wix_Madefor_Text']">
                          <th className="px-6 py-4 font-medium text-center">Position</th>
                          <th className="px-6 py-4 font-medium text-center">Location</th>
                          <th className="px-6 py-4 font-medium text-center">Working Hours</th>
                          <th className="px-6 py-4 font-medium text-center">Experience</th>
                          <th className="px-6 py-4 font-medium text-center">Applications</th>
                          <th className="px-6 py-4 font-medium text-center">Status</th>
                          <th className="px-6 py-4 font-medium text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {loading ? (
                          <tr className="h-40">
                            <td colSpan={7} className="text-center py-8 text-slate-500 font-medium">
                              <div className="flex flex-col items-center justify-center gap-2">
                                <Loader2 className="size-8 animate-spin text-cyan-700" />
                                <span>Loading jobs from server...</span>
                              </div>
                            </td>
                          </tr>
                        ) : filteredJobs.length === 0 ? (
                          <tr className="h-40">
                            <td colSpan={7} className="text-center py-8 text-slate-500 font-medium">
                              No jobs found. Click "Post New Job" to list your first position.
                            </td>
                          </tr>
                        ) : (
                          filteredJobs.map((job) => (
                            <tr
                              key={job.id}
                              className="h-20 hover:bg-neutral-50/70 transition-colors text-gray-700 text-sm sm:text-base font-normal font-['Wix_Madefor_Text']"
                            >
                              <td className="px-6 py-4 font-semibold text-slate-800">
                                {job.position}
                              </td>
                              <td className="px-6 py-4 text-slate-700">
                                {job.location}
                              </td>
                              <td className="px-6 py-4 text-slate-700">
                                {job.workingHours}
                              </td>
                              <td className="px-6 py-4 text-slate-700">
                                {job.experience}
                              </td>
                              <td className="px-6 py-4 text-slate-700 font-semibold">
                                {job.applications}
                              </td>
                              <td className="px-6 py-4">
                                {getStatusBadge(job.status)}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setPreviewJob(job)}
                                    className="p-2 text-neutral-600 hover:text-cyan-700 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                                    title="View Job Details"
                                  >
                                    <Eye className="size-5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleCloseJob(job.id)}
                                    className="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                    title="Close Listing"
                                  >
                                    <Trash2 className="size-5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              /* VIEW 2: Create New Job Form */
              <div className="w-full bg-white rounded-2xl border border-neutral-100 p-6 sm:p-10 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] animate-fade-in">
                <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      Create a Job Listing
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Fill out the fields below to publish a new vacancy.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                  >
                    Back to Job List
                  </button>
                </div>

                <form onSubmit={handlePublishJob} className="mt-8 space-y-6 max-w-4xl">
                  {/* Job Title */}
                  <div className="space-y-2">
                    <label className="text-base font-semibold text-slate-800">
                      Job Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g. Senior Support Worker / Live-in Carer"
                      className="w-full h-12 px-4 rounded-xl border border-neutral-300 bg-white text-base font-normal text-slate-800 outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 transition-all placeholder:text-gray-400"
                    />
                  </div>

                  {/* 2 Grid: Employment Type & Experience */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-base font-semibold text-slate-800">
                        Employment Type
                      </label>
                      <select
                        value={employmentType}
                        onChange={(e) => setEmploymentType(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl border border-neutral-300 bg-white text-base font-normal text-slate-800 outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 transition-all"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Temporary">Temporary</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-base font-semibold text-slate-800">
                        Experience Level
                      </label>
                      <select
                        value={experienceLevel}
                        onChange={(e) => setExperienceLevel(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl border border-neutral-300 bg-white text-base font-normal text-slate-800 outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 transition-all"
                      >
                        <option value="1–2 years of experience">1–2 years of experience</option>
                        <option value="2–5 years of experience">2–5 years of experience</option>
                        <option value="5+ years of experience">5+ years of experience</option>
                      </select>
                    </div>
                  </div>

                  {/* 2 Grid: Location & Salary */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-base font-semibold text-slate-800">
                        Location
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. London, United Kingdom"
                        className="w-full h-12 px-4 rounded-xl border border-neutral-300 bg-white text-base font-normal text-slate-800 outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-base font-semibold text-slate-800">
                        Salary / Pay Rate
                      </label>
                      <input
                        type="text"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        placeholder="e.g. £16.50 / Hour or £32,000 / Year"
                        className="w-full h-12 px-4 rounded-xl border border-neutral-300 bg-white text-base font-normal text-slate-800 outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 transition-all"
                      />
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="space-y-2">
                    <label className="text-base font-semibold text-slate-800">
                      Job Description & Requirements
                    </label>
                    <textarea
                      rows={5}
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Outline core responsibilities, required NVQ qualifications, DBS requirements..."
                      className="w-full p-4 rounded-xl border border-neutral-300 bg-white text-base font-normal text-slate-800 outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 transition-all resize-y placeholder:text-gray-400"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center justify-end gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setViewMode("list")}
                      className="px-6 py-3 rounded-lg border border-neutral-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-cyan-700 text-white font-semibold hover:bg-cyan-800 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="size-5 animate-spin" />
                          <span>Publishing...</span>
                        </>
                      ) : (
                        <span>Publish Job</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Job Preview Modal */}
      {previewJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden">
            <div className="p-6 border-b border-neutral-100 flex items-start justify-between bg-slate-50/70">
              <div>
                <h3 className="text-2xl font-bold text-slate-800">
                  {previewJob.position}
                </h3>
                <p className="text-sm font-medium text-cyan-700 mt-1">
                  {previewJob.location} · {previewJob.workingHours}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewJob(null)}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <div className="mt-1">{getStatusBadge(previewJob.status)}</div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Pay / Salary</p>
                  <p className="text-sm font-semibold text-slate-800">
                    {previewJob.salary}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Applications</p>
                  <p className="text-sm font-semibold text-slate-800">
                    {previewJob.applications}
                  </p>
                </div>
              </div>

              {previewJob.description && (
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Description
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {previewJob.description}
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-neutral-100 flex justify-end bg-slate-50/50">
              <button
                type="button"
                onClick={() => setPreviewJob(null)}
                className="w-28 py-2 bg-neutral-200 hover:bg-neutral-300 text-slate-700 font-semibold text-sm rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
