"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RecruitmentAgencySidebar from "@/features/recruitment-agency/components/RecruitmentAgencySidebar";
import {
  Bell,
  Check,
  Eye,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

interface JobItem {
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

const initialJobs: JobItem[] = [
  {
    id: "job-1",
    position: "Support Worker",
    location: "London",
    workingHours: "Full-Time",
    experience: "1-2 Years",
    applications: 251,
    status: "Draft",
    salary: "£16.50 / Hour",
    description: "Support Worker required for residential home care in London.",
  },
  {
    id: "job-2",
    position: "Live-in Carer",
    location: "Manchester",
    workingHours: "Full-Time",
    experience: "1-2 Years",
    applications: 45,
    status: "Active",
    salary: "£34,000 / Year",
    description: "Experienced Live-in Carer to assist client with dementia support.",
  },
  {
    id: "job-3",
    position: "Senior Carer",
    location: "Birmingham",
    workingHours: "Full-Time",
    experience: "1-2 Years",
    applications: 154,
    status: "Closed",
    salary: "£36,000 / Year",
    description: "Senior Carer for supervisory responsibilities and medication administration.",
  },
  {
    id: "job-4",
    position: "Support Worker",
    location: "London",
    workingHours: "Full-Time",
    experience: "1-2 Years",
    applications: 251,
    status: "Draft",
    salary: "£17.00 / Hour",
    description: "Day and night support worker shifts across healthcare centers.",
  },
  {
    id: "job-5",
    position: "Live-in Carer",
    location: "Manchester",
    workingHours: "Full-Time",
    experience: "1-2 Years",
    applications: 45,
    status: "Active",
    salary: "£35,000 / Year",
    description: "Live-in Carer with compassionate demeanour and valid driving licence.",
  },
  {
    id: "job-6",
    position: "Senior Carer",
    location: "Birmingham",
    workingHours: "Full-Time",
    experience: "1-2 Years",
    applications: 154,
    status: "Closed",
    salary: "£37,500 / Year",
    description: "Team leader position overseeing care assistant duties and audits.",
  },
];

export default function JobManagement() {
  const [jobs, setJobs] = useState<JobItem[]>(initialJobs);
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

  // Preview Modal
  const [previewJob, setPreviewJob] = useState<JobItem | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePublishJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim()) {
      triggerToast("Please enter a Job Title");
      return;
    }

    const newJob: JobItem = {
      id: `job-${Date.now()}`,
      position: jobTitle,
      location: location.split(",")[0] || location,
      workingHours: employmentType,
      experience: experienceLevel.includes("1–2") ? "1-2 Years" : "2+ Years",
      applications: 0,
      status: "Active",
      salary: salary,
      description: jobDescription,
    };

    setJobs([newJob, ...jobs]);
    triggerToast("Job listing published successfully!");
    // Reset form
    setJobTitle("");
    setJobDescription("");
    setViewMode("list");
  };

  const handleDeleteJob = (id: string) => {
    setJobs(jobs.filter((j) => j.id !== id));
    triggerToast("Job listing removed");
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
                      placeholder="Search..."
                      className="flex-1 bg-transparent text-base font-normal font-['Wix_Madefor_Text'] text-slate-800 outline-none placeholder:text-zinc-500"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setViewMode("create")}
                    className="px-6 sm:px-8 py-3 bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg flex items-center justify-center gap-2 text-base font-normal font-['Wix_Madefor_Text'] cursor-pointer shadow-xs transition-colors"
                  >
                    <Plus className="size-5 stroke-[2.2]" />
                    <span>Post New Job</span>
                  </button>
                </div>

                {/* Table Card */}
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
                        {filteredJobs.map((job) => (
                          <tr
                            key={job.id}
                            className="h-20 hover:bg-neutral-50/70 transition-colors text-gray-700 text-sm sm:text-base font-normal font-['Wix_Madefor_Text']"
                          >
                            <td className="px-6 py-4 text-slate-700 font-normal">
                              {job.position}
                            </td>
                            <td className="px-6 py-4 text-slate-700 font-normal">
                              {job.location}
                            </td>
                            <td className="px-6 py-4 text-slate-700 font-normal">
                              {job.workingHours}
                            </td>
                            <td className="px-6 py-4 text-slate-700 font-normal">
                              {job.experience}
                            </td>
                            <td className="px-6 py-4 text-slate-700 font-normal">
                              {job.applications}
                            </td>
                            <td className="px-6 py-4">
                              {getStatusBadge(job.status)}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center gap-3 text-neutral-600">
                                <button
                                  type="button"
                                  onClick={() => setPreviewJob(job)}
                                  className="hover:text-cyan-700 transition-colors p-1 cursor-pointer"
                                  title="View Details"
                                >
                                  <Eye className="size-4 sm:size-5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setJobTitle(job.position);
                                    setLocation(job.location);
                                    setSalary(job.salary || "£16.50 / Hour");
                                    setJobDescription(job.description || "");
                                    setViewMode("create");
                                  }}
                                  className="hover:text-cyan-700 transition-colors p-1 cursor-pointer"
                                  title="Edit Job"
                                >
                                  <Pencil className="size-4 sm:size-5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteJob(job.id)}
                                  className="hover:text-red-600 transition-colors p-1 cursor-pointer"
                                  title="Delete Job"
                                >
                                  <Trash2 className="size-4 sm:size-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              /* VIEW 2: Create New Job Form */
              <form onSubmit={handlePublishJob} className="space-y-6">
                <div className="w-full p-6 sm:p-8 bg-cyan-700/5 rounded-2xl border border-zinc-100/60 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col justify-start items-start gap-5">
                  {/* Job Title */}
                  <div className="self-stretch flex flex-col justify-start items-start gap-2 w-full">
                    <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g., Senior Care Assistant"
                      className="self-stretch h-12 p-4 rounded-sm border border-neutral-400 bg-white text-base text-slate-800 outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 placeholder:text-gray-400 transition-all"
                      required
                    />
                  </div>

                  {/* Row: Employment Type & Experience Level */}
                  <div className="self-stretch grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                    <div className="flex-1 flex flex-col justify-start items-start gap-2">
                      <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                        Employment Type
                      </label>
                      <input
                        type="text"
                        value={employmentType}
                        onChange={(e) => setEmploymentType(e.target.value)}
                        placeholder="e.g., Full-time"
                        className="self-stretch h-12 p-4 rounded-sm border border-neutral-400 bg-white text-base text-slate-800 outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 placeholder:text-gray-400 transition-all"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-start items-start gap-2">
                      <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                        Experience Level
                      </label>
                      <input
                        type="text"
                        value={experienceLevel}
                        onChange={(e) => setExperienceLevel(e.target.value)}
                        placeholder="e.g., 1–2 years of experience"
                        className="self-stretch h-12 p-4 rounded-sm border border-neutral-400 bg-white text-base text-slate-800 outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 placeholder:text-gray-400 transition-all"
                      />
                    </div>
                  </div>

                  {/* Row: Location & Salary */}
                  <div className="self-stretch grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                    <div className="flex-1 flex flex-col justify-start items-start gap-2">
                      <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                        Location
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g., London, United Kingdom"
                        className="self-stretch h-12 p-4 rounded-sm border border-neutral-400 bg-white text-base text-slate-800 outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 placeholder:text-gray-400 transition-all"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-start items-start gap-2">
                      <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                        Salary
                      </label>
                      <input
                        type="text"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        placeholder="e.g., £14–£18 per hour"
                        className="self-stretch h-12 p-4 rounded-sm border border-neutral-400 bg-white text-base text-slate-800 outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 placeholder:text-gray-400 transition-all"
                      />
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="self-stretch flex flex-col justify-start items-start gap-3 w-full">
                    <label className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text'] leading-5">
                      Job Description
                    </label>
                    <textarea
                      rows={10}
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Describe the role, responsibilities, required qualifications, skills, and any additional information about the position."
                      className="self-stretch h-72 sm:h-96 p-4 rounded-lg border border-neutral-400 bg-white text-base text-slate-800 outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 placeholder:text-gray-400 transition-all resize-none leading-relaxed"
                    />
                  </div>
                </div>

                {/* Bottom Buttons: Cancel & Publish Job */}
                <div className="flex justify-end items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    className="w-36 h-12 px-6 py-3 rounded-lg border border-cyan-700 text-cyan-700 hover:bg-neutral-50 font-medium text-sm font-['Wix_Madefor_Text'] transition-colors cursor-pointer flex items-center justify-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="h-12 px-8 py-3 bg-cyan-700 hover:bg-cyan-800 text-white font-medium text-sm font-['Wix_Madefor_Text'] rounded-lg transition-colors cursor-pointer shadow-xs active:scale-[0.99]"
                  >
                    Publish Job
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* View Job Modal */}
      {previewJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-neutral-100 flex flex-col gap-5">
            <button
              type="button"
              onClick={() => setPreviewJob(null)}
              className="absolute right-5 top-5 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-800">
                  {previewJob.position}
                </h3>
                {getStatusBadge(previewJob.status)}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {previewJob.location} · {previewJob.workingHours} · {previewJob.experience}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-2.5 border border-slate-100 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Salary:</span>
                <span className="font-semibold text-slate-800">{previewJob.salary || "Competitive"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Applications:</span>
                <span className="font-semibold text-cyan-700">{previewJob.applications} candidates</span>
              </div>
              {previewJob.description && (
                <div className="pt-2 border-t border-slate-200">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {previewJob.description}
                  </p>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setPreviewJob(null)}
              className="w-full py-3 bg-cyan-700 hover:bg-cyan-800 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
