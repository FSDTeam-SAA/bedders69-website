"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  FilePlus2,
  Filter,
  MapPin,
  PoundSterling,
  Search,
  Users,
  XCircle,
  X,
  AlertCircle,
  Sparkles,
  Zap,
} from "lucide-react";
import CareCompanySidebar from "../../components/CareCompanySidebar";
import createJobApi from "../../create-job/api/createJobApi";
import { JobItem } from "../../create-job/types/createJob.types";

export default function JobPosts() {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);
  const [jobToClose, setJobToClose] = useState<JobItem | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      let remoteJobs: JobItem[] = [];
      try {
        const res = await createJobApi.getMyJobs();
        if (res?.data && Array.isArray(res.data)) {
          remoteJobs = res.data;
        }
      } catch (err: any) {
        console.warn("Could not fetch jobs from API, showing cached/local jobs:", err?.message);
      }

      // Merge with localStorage demo posted jobs
      let localJobs: JobItem[] = [];
      if (typeof window !== "undefined") {
        try {
          localJobs = JSON.parse(localStorage.getItem("bedders_posted_jobs") || "[]");
        } catch (e) {}
      }

      // Combine & remove duplicate IDs
      const combinedMap = new Map<string, JobItem>();
      [...localJobs, ...remoteJobs].forEach((item) => {
        const key = item._id || item.id;
        if (key && !combinedMap.has(key)) {
          combinedMap.set(key, item);
        }
      });

      setJobs(Array.from(combinedMap.values()));
    } catch (err: any) {
      setError(err?.message || "Failed to load job listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleConfirmClose = async () => {
    if (!jobToClose) return;
    const jobId = jobToClose._id || jobToClose.id;
    if (!jobId) return;

    setActionLoadingId(jobId);
    try {
      try {
        await createJobApi.closeJob(jobId);
      } catch (e) {
        console.warn("Closed locally:", e);
      }

      // Update state & localStorage
      setJobs((prev) =>
        prev.map((j) =>
          j._id === jobId || j.id === jobId ? { ...j, status: "closed" } : j
        )
      );

      if (typeof window !== "undefined") {
        const local: JobItem[] = JSON.parse(
          localStorage.getItem("bedders_posted_jobs") || "[]"
        );
        const updated = local.map((j) =>
          j._id === jobId || j.id === jobId ? { ...j, status: "closed" } : j
        );
        localStorage.setItem("bedders_posted_jobs", JSON.stringify(updated));
      }
    } finally {
      setActionLoadingId(null);
      setJobToClose(null);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchQuery.toLowerCase());

    if (statusFilter === "all") return matchesSearch;
    return matchesSearch && job.status === statusFilter;
  });

  // Calculate statistics
  const totalCount = jobs.length;
  const approvedCount = jobs.filter((j) => j.status === "approved").length;
  const pendingCount = jobs.filter((j) => j.status === "pending_approval").length;
  const rejectedCount = jobs.filter((j) => j.status === "rejected").length;
  const closedCount = jobs.filter((j) => j.status === "closed").length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Approved & Live
          </span>
        );
      case "pending_approval":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Pending Approval
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 border border-rose-200">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            Rejected
          </span>
        );
      case "closed":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 border border-slate-200">
            <span className="h-2 w-2 rounded-full bg-slate-400" />
            Closed
          </span>
        );
      case "draft":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-200">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            Draft
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 border border-gray-200 uppercase">
            <span className="h-2 w-2 rounded-full bg-gray-500" />
            {status}
          </span>
        );
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-['Wix_Madefor_Text',Arial,sans-serif] text-[#203746]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1920px] flex-col lg:flex-row">
        {/* Left Sidebar */}
        <CareCompanySidebar activeHref="/care-company/job-posts" />

        {/* Right Main Content */}
        <div className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-6xl space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                  My Job Posts
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Manage your active, pending, rejected, and closed job listings
                </p>
              </div>

              <Link
                href="/care-company/create-job"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2b6ea6] px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#20527f] transition-all cursor-pointer active:scale-95"
              >
                <FilePlus2 className="h-5 w-5" />
                <span>Create New Job</span>
              </Link>
            </div>

            {/* Stat Summary Cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-xs flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Total Jobs
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-800">
                  {totalCount}
                </span>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 shadow-xs flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">
                  Live Jobs
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700">
                  {approvedCount}
                </span>
              </div>
              <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-4 shadow-xs flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider">
                  Pending
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-700">
                  {pendingCount}
                </span>
              </div>
              <div className="rounded-2xl border border-rose-100 bg-rose-50/50 p-4 shadow-xs flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-rose-600 uppercase tracking-wider">
                  Rejected
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-rose-700">
                  {rejectedCount}
                </span>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-100/50 p-4 shadow-xs flex flex-col gap-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Closed
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-700">
                  {closedCount}
                </span>
              </div>
            </div>

            {/* Search & Status Filter Bar */}
            <div className="rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-xs flex flex-col sm:flex-row items-center gap-4 justify-between">
              {/* Search Bar */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search jobs by title or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-[#2b6ea6] focus:bg-white focus:outline-hidden transition-all"
                />
              </div>

              {/* Status Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                {[
                  { id: "all", label: "All" },
                  { id: "approved", label: "Live" },
                  { id: "pending_approval", label: "Pending" },
                  { id: "rejected", label: "Rejected" },
                  { id: "closed", label: "Closed" },
                  { id: "draft", label: "Draft" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      statusFilter === tab.id
                        ? "bg-[#2b6ea6] text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Jobs List */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3 bg-white rounded-2xl border border-slate-100 shadow-xs">
                <div className="h-8 w-8 rounded-full border-3 border-[#2b6ea6] border-t-transparent animate-spin" />
                <span className="text-sm font-medium text-slate-500">Loading your job posts...</span>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-2xl border border-slate-100 shadow-xs text-center">
                <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                  <Briefcase className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">No Job Listings Found</h3>
                <p className="text-sm text-slate-500 max-w-md mt-1 mb-6">
                  {searchQuery || statusFilter !== "all"
                    ? "No job posts matched your search or status filter. Try clearing filters."
                    : "You haven't created any job posts yet. Create your first job listing to find care professionals!"}
                </p>
                <Link
                  href="/care-company/create-job"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#2b6ea6] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#20527f] transition-all cursor-pointer"
                >
                  <FilePlus2 className="h-4 w-4" />
                  <span>Create Job Posting</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => {
                  const jobId = job._id || job.id || "job_id";
                  return (
                    <div
                      key={jobId}
                      className="group relative rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                    >
                      <div className="flex flex-col gap-3 flex-1">
                        {/* Title & Status Badges */}
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#2b6ea6] transition-colors">
                            {job.title}
                          </h3>
                          {getStatusBadge(job.status)}
                          {job.isFeaturedBoost && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-semibold text-purple-700 border border-purple-200">
                              <Sparkles className="h-3 w-3" /> Featured
                            </span>
                          )}
                          {job.isUrgentHire && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700 border border-rose-200">
                              <Zap className="h-3 w-3" /> Urgent
                            </span>
                          )}
                        </div>

                        {/* Details Meta */}
                        <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-medium text-slate-500">
                          {job.department && (
                            <span className="inline-flex items-center gap-1.5 text-slate-600 font-semibold">
                              <Building2 className="h-3.5 w-3.5 text-slate-400" />
                              {job.department}
                            </span>
                          )}
                          {job.location && (
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5 text-slate-400" />
                              {job.location}
                            </span>
                          )}
                          {(job.salaryMin || job.salaryMax) && (
                            <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                              <PoundSterling className="h-3.5 w-3.5 text-slate-400" />
                              {job.salaryMin ? `£${job.salaryMin.toLocaleString()}` : ""}
                              {job.salaryMin && job.salaryMax ? " – " : ""}
                              {job.salaryMax ? `£${job.salaryMax.toLocaleString()}` : ""} / year
                            </span>
                          )}
                          {job.createdAt && (
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5 text-slate-400" />
                              Posted {new Date(job.createdAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>

                        {/* Skills / Requirements tags */}
                        {job.requiredSkills && job.requiredSkills.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            {job.requiredSkills.slice(0, 4).map((skill, idx) => (
                              <span
                                key={idx}
                                className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                              >
                                {skill}
                              </span>
                            ))}
                            {job.requiredSkills.length > 4 && (
                              <span className="text-[11px] font-medium text-slate-400">
                                +{job.requiredSkills.length - 4} more
                              </span>
                            )}
                          </div>
                        )}

                        {/* Rejection Reason Banner on Job Card */}
                        {job.status === "rejected" && (job.rejectionReason || job.reason || job.rejection_reason) && (
                          <div className="mt-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs flex items-start gap-2.5 text-rose-800">
                            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-rose-900 block">Rejection Reason:</span>
                              <p className="mt-0.5 text-rose-700 font-medium">
                                {job.rejectionReason || job.reason || job.rejection_reason}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 shrink-0">
                        <button
                          onClick={() => setSelectedJob(job)}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View Details</span>
                        </button>

                        {job.status !== "closed" && (
                          <button
                            onClick={() => setJobToClose(job)}
                            disabled={actionLoadingId === jobId}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer disabled:opacity-50"
                          >
                            <XCircle className="h-4 w-4" />
                            <span>Close</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-100 flex flex-col gap-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-slate-800">
                    {selectedJob.title}
                  </h2>
                  {getStatusBadge(selectedJob.status)}
                </div>
                <p className="text-xs text-slate-500">
                  {selectedJob.department || "General Department"} • {selectedJob.location || "Location not specified"}
                </p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Details */}
            <div className="space-y-4 text-sm text-slate-700">
              {/* Rejection Reason inside Modal if Rejected */}
              {selectedJob.status === "rejected" && (selectedJob.rejectionReason || selectedJob.reason || selectedJob.rejection_reason) && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs flex items-start gap-3 text-rose-800">
                  <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-rose-900 text-sm">Rejection Reason</h4>
                    <p className="mt-1 text-rose-700 leading-relaxed font-medium">
                      {selectedJob.rejectionReason || selectedJob.reason || selectedJob.rejection_reason}
                    </p>
                  </div>
                </div>
              )}
              {/* Key Attributes */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Job Type</span>
                  <span className="font-semibold text-slate-800">{selectedJob.jobType || "Full-time"}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Salary Range</span>
                  <span className="font-semibold text-slate-800">
                    {selectedJob.salaryMin || selectedJob.salaryMax
                      ? `£${selectedJob.salaryMin || 0} - £${selectedJob.salaryMax || 0}`
                      : "Not specified"}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium block">Contract Type</span>
                  <span className="font-semibold text-slate-800">{selectedJob.contractType || "Permanent"}</span>
                </div>
              </div>

              {/* Description */}
              {selectedJob.description && (
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">Job Description</h4>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line text-xs">
                    {selectedJob.description}
                  </p>
                </div>
              )}

              {/* Requirements */}
              {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1.5">Essential Requirements</h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-600">
                    {selectedJob.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Required Skills */}
              {selectedJob.requiredSkills && selectedJob.requiredSkills.length > 0 && (
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1.5">Required Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedJob.requiredSkills.map((skill, idx) => (
                      <span key={idx} className="rounded-md bg-blue-50 text-blue-700 px-2.5 py-1 text-xs font-medium border border-blue-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedJob(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Closing a Job */}
      {jobToClose && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-100 flex flex-col gap-5">
            <button
              onClick={() => setJobToClose(null)}
              className="absolute right-5 top-5 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
                <AlertCircle className="h-6 w-6" strokeWidth={2} />
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="text-lg font-bold text-slate-800">
                  Close Job Listing?
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {jobToClose.title}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              Are you sure you want to close this job listing? Applicants will no longer be able to view or apply for this position once closed.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setJobToClose(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmClose}
                disabled={actionLoadingId === (jobToClose._id || jobToClose.id)}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                {actionLoadingId === (jobToClose._id || jobToClose.id)
                  ? "Closing Job..."
                  : "Yes, Close Job"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
