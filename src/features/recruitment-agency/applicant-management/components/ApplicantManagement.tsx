"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RecruitmentAgencySidebar from "@/features/recruitment-agency/components/RecruitmentAgencySidebar";
import {
  Bell,
  Calendar,
  Check,
  CheckCircle2,
  Download,
  Eye,
  FileCheck,
  FileText,
  Mail,
  MapPin,
  Phone,
  Search,
  UserCheck,
  UserX,
  Users,
  X,
} from "lucide-react";

export type ApplicantStatus =
  | "Pending"
  | "Reviewed"
  | "Shortlisted"
  | "Interview"
  | "Offered"
  | "Rejected"
  | "Hired";

export interface Applicant {
  id: string;
  candidate: string;
  position: string;
  email: string;
  phoneNumber: string;
  expectedSalary: string;
  earliestStartDate: string;
  appliedDate: string;
  status: ApplicantStatus;
  experience?: string;
  matchScore?: number;
  location?: string;
  notes?: string;
}

const initialApplicants: Applicant[] = [
  {
    id: "app-1",
    candidate: "Darrell Steward",
    position: "Support Worker",
    email: "hwestiii@outlook.com",
    phoneNumber: "(207) 555-0119",
    expectedSalary: "$150,001-$200,000",
    earliestStartDate: "May 12, 2019",
    appliedDate: "May 6, 2012",
    status: "Pending",
    experience: "4 years experience in eldercare and autism support",
    matchScore: 92,
    location: "London, UK",
    notes: "Has excellent references from previous care home.",
  },
  {
    id: "app-2",
    candidate: "Marvin McKinney",
    position: "Live-in Carer",
    email: "papathan@yahoo.ca",
    phoneNumber: "(229) 555-0109",
    expectedSalary: "$100,001-$150,000",
    earliestStartDate: "September 24, 2017",
    appliedDate: "May 31, 2015",
    status: "Reviewed",
    experience: "6 years live-in care with advanced dementia certification",
    matchScore: 88,
    location: "Manchester, UK",
    notes: "Available for immediate 2-week rotational shifts.",
  },
  {
    id: "app-3",
    candidate: "Ronald Richards",
    position: "Senior Carer",
    email: "wenzlaff@mac.com",
    phoneNumber: "(505) 555-0125",
    expectedSalary: "$50,001-$100,000",
    earliestStartDate: "October 24, 2018",
    appliedDate: "February 11, 2014",
    status: "Shortlisted",
    experience: "8 years in NHS trust hospitals & senior residential care",
    matchScore: 95,
    location: "Birmingham, UK",
    notes: "NVQ Level 3 in Health and Social Care verified.",
  },
  {
    id: "app-4",
    candidate: "Ralph Edwards",
    position: "Support Worker",
    email: "shawnce@att.net",
    phoneNumber: "(307) 555-0133",
    expectedSalary: "$40,001-$50,000",
    earliestStartDate: "September 9, 2013",
    appliedDate: "November 28, 2015",
    status: "Interview",
    experience: "3 years supporting young adults with learning disabilities",
    matchScore: 84,
    location: "Leeds, UK",
    notes: "Interview scheduled for Tuesday at 11:00 AM.",
  },
  {
    id: "app-5",
    candidate: "Savannah Nguyen",
    position: "Live-in Carer",
    email: "garyjb@sbcglobal.net",
    phoneNumber: "(302) 555-0107",
    expectedSalary: "$20,000-$30,000",
    earliestStartDate: "November 7, 2017",
    appliedDate: "August 7, 2017",
    status: "Offered",
    experience: "5 years private live-in care and palliative support",
    matchScore: 91,
    location: "Sheffield, UK",
    notes: "Offer letter sent; awaiting signature.",
  },
  {
    id: "app-6",
    candidate: "Jerome Bell",
    position: "Senior Carer",
    email: "oevans@icloud.com",
    phoneNumber: "(252) 555-0126",
    expectedSalary: "$30,001-$40,000",
    earliestStartDate: "August 2, 2013",
    appliedDate: "May 29, 2017",
    status: "Rejected",
    experience: "1 year healthcare assistant",
    matchScore: 58,
    location: "Liverpool, UK",
    notes: "Does not meet the minimum 3 years requirement for Senior role.",
  },
  {
    id: "app-7",
    candidate: "Ralph Edwards",
    position: "Support Worker",
    email: "shawnce@att.net",
    phoneNumber: "(307) 555-0133",
    expectedSalary: "$40,001-$50,000",
    earliestStartDate: "September 9, 2013",
    appliedDate: "November 28, 2015",
    status: "Hired",
    experience: "5 years comprehensive support experience",
    matchScore: 96,
    location: "London, UK",
    notes: "Onboarding completed; starts next Monday.",
  },
];

export default function ApplicantManagement() {
  const [applicants, setApplicants] = useState<Applicant[]>(initialApplicants);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [internalNote, setInternalNote] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const openApplicantModal = (app: Applicant) => {
    setSelectedApplicant(app);
    setInternalNote(app.notes || "");
  };

  const closeApplicantModal = () => {
    setSelectedApplicant(null);
  };

  const handleUpdateStatus = (newStatus: ApplicantStatus) => {
    if (!selectedApplicant) return;
    setApplicants((prev) =>
      prev.map((a) =>
        a.id === selectedApplicant.id
          ? { ...a, status: newStatus, notes: internalNote }
          : a
      )
    );
    setSelectedApplicant((prev) =>
      prev ? { ...prev, status: newStatus, notes: internalNote } : null
    );
    triggerToast(`Status updated to "${newStatus}" for ${selectedApplicant.candidate}!`);
  };

  const handleSaveNote = () => {
    if (!selectedApplicant) return;
    setApplicants((prev) =>
      prev.map((a) =>
        a.id === selectedApplicant.id ? { ...a, notes: internalNote } : a
      )
    );
    triggerToast("Notes updated successfully!");
  };

  const filteredApplicants = applicants.filter(
    (a) =>
      a.candidate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: ApplicantStatus) => {
    switch (status) {
      case "Pending":
        return (
          <span className="inline-flex h-7 items-center justify-center rounded-full bg-[#fdf4e4] px-4 text-xs sm:text-sm font-medium text-[#b5832a]">
            Pending
          </span>
        );
      case "Reviewed":
        return (
          <span className="inline-flex h-7 items-center justify-center rounded-full bg-[#f3e8f4] px-4 text-xs sm:text-sm font-medium text-[#9333ea]">
            Reviewed
          </span>
        );
      case "Shortlisted":
        return (
          <span className="inline-flex h-7 items-center justify-center rounded-full bg-[#fde8f5] px-4 text-xs sm:text-sm font-medium text-[#db2777]">
            Shortlisted
          </span>
        );
      case "Interview":
        return (
          <span className="inline-flex h-7 items-center justify-center rounded-full bg-[#e0f7fa] px-4 text-xs sm:text-sm font-medium text-[#0891b2]">
            Interview
          </span>
        );
      case "Offered":
        return (
          <span className="inline-flex h-7 items-center justify-center rounded-full bg-[#e6f0fa] px-4 text-xs sm:text-sm font-medium text-[#2563eb]">
            Offered
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex h-7 items-center justify-center rounded-full bg-[#fdeeee] px-4 text-xs sm:text-sm font-medium text-[#e05656]">
            Rejected
          </span>
        );
      case "Hired":
        return (
          <span className="inline-flex h-7 items-center justify-center rounded-full bg-[#e8f7ee] px-4 text-xs sm:text-sm font-medium text-[#22a057]">
            Hired
          </span>
        );
      default:
        return (
          <span className="inline-flex h-7 items-center justify-center rounded-full bg-slate-100 px-4 text-xs font-medium text-slate-700">
            {status}
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
        <RecruitmentAgencySidebar activeHref="/recruitment-agency/applicant-management" />

        {/* Right Main Content */}
        <div className="min-w-0 flex-1">
          {/* Top Header Banner */}
          <header className="w-full px-6 sm:px-10 py-5 bg-cyan-700/10 flex items-center justify-between border-b border-cyan-700/10">
            <div className="flex-1 flex flex-col justify-start items-start gap-1">
              <h1 className="text-black text-2xl sm:text-3xl font-semibold font-['Wix_Madefor_Text'] leading-tight">
                Applicant Management
              </h1>
              <p className="text-slate-700 text-sm sm:text-base lg:text-lg font-normal font-['Wix_Madefor_Text'] leading-normal">
                Review and process job applications
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
            {/* Search Input Bar */}
            <div className="w-full max-w-[420px] h-12 px-4 bg-[#eef2f5] rounded-xl flex items-center gap-2 border border-transparent focus-within:border-cyan-700/40 focus-within:bg-white transition-all">
              <Search className="size-5 text-zinc-500 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search candidate, role, email..."
                className="flex-1 bg-transparent text-base font-normal font-['Wix_Madefor_Text'] text-slate-800 outline-none placeholder:text-zinc-500"
              />
            </div>

            {/* Table Container */}
            <div className="w-full bg-white rounded-2xl border border-neutral-100 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 h-16 border-b border-neutral-100 text-gray-500 text-sm sm:text-base font-medium font-['Wix_Madefor_Text']">
                      <th className="px-5 py-4 font-medium text-center">Candidate</th>
                      <th className="px-5 py-4 font-medium text-center">Position</th>
                      <th className="px-5 py-4 font-medium text-center">Email</th>
                      <th className="px-5 py-4 font-medium text-center">Phone Number</th>
                      <th className="px-5 py-4 font-medium text-center">Expected Salary</th>
                      <th className="px-5 py-4 font-medium text-center">Earliest Start Date</th>
                      <th className="px-5 py-4 font-medium text-center">Applied Date</th>
                      <th className="px-5 py-4 font-medium text-center">Status</th>
                      <th className="px-5 py-4 font-medium text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filteredApplicants.map((app) => (
                      <tr
                        key={app.id}
                        className="h-20 hover:bg-neutral-50/70 transition-colors text-gray-700 text-sm sm:text-base font-normal font-['Wix_Madefor_Text']"
                      >
                        <td className="px-5 py-4 font-medium text-slate-800">
                          {app.candidate}
                        </td>
                        <td className="px-5 py-4 text-slate-700">
                          {app.position}
                        </td>
                        <td className="px-5 py-4 text-slate-700 text-xs sm:text-sm">
                          {app.email}
                        </td>
                        <td className="px-5 py-4 text-slate-700 text-xs sm:text-sm">
                          {app.phoneNumber}
                        </td>
                        <td className="px-5 py-4 text-slate-700 font-normal">
                          {app.expectedSalary}
                        </td>
                        <td className="px-5 py-4 text-slate-700">
                          {app.earliestStartDate}
                        </td>
                        <td className="px-5 py-4 text-slate-700">
                          {app.appliedDate}
                        </td>
                        <td className="px-5 py-4">
                          {getStatusBadge(app.status)}
                        </td>
                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() => openApplicantModal(app)}
                            className="p-2 text-neutral-600 hover:text-cyan-700 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                            title="View Applicant Profile"
                          >
                            <Eye className="size-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Beautiful Rich View Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-100 max-h-[92vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 sm:p-7 border-b border-neutral-100 flex items-start justify-between bg-slate-50/70">
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-full bg-cyan-700/10 text-cyan-700 font-bold text-xl flex items-center justify-center border border-cyan-700/20">
                  {selectedApplicant.candidate.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold text-slate-800">
                      {selectedApplicant.candidate}
                    </h3>
                    {getStatusBadge(selectedApplicant.status)}
                  </div>
                  <p className="text-sm font-medium text-cyan-700 mt-0.5">
                    {selectedApplicant.position} · {selectedApplicant.location || "United Kingdom"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeApplicantModal}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-7 space-y-6 overflow-y-auto">
              {/* Match Score Bar */}
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-5 text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-800">
                    Candidate Compatibility Score
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-emerald-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full"
                      style={{ width: `${selectedApplicant.matchScore || 90}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-emerald-900">
                    {selectedApplicant.matchScore || 90}%
                  </span>
                </div>
              </div>

              {/* 2x2 Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                  <Mail className="size-5 text-cyan-700 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Email Address</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">
                      {selectedApplicant.email}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                  <Phone className="size-5 text-cyan-700 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Phone Number</p>
                    <p className="text-sm font-semibold text-slate-800">
                      {selectedApplicant.phoneNumber}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                  <Calendar className="size-5 text-cyan-700 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Earliest Start Date</p>
                    <p className="text-sm font-semibold text-slate-800">
                      {selectedApplicant.earliestStartDate}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                  <FileText className="size-5 text-cyan-700 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Expected Salary</p>
                    <p className="text-sm font-semibold text-slate-800">
                      {selectedApplicant.expectedSalary}
                    </p>
                  </div>
                </div>
              </div>

              {/* Experience Summary */}
              {selectedApplicant.experience && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Experience & Background
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {selectedApplicant.experience}
                  </p>
                </div>
              )}

              {/* Uploaded Documents */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-slate-800">
                  Attached Documents
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded-xl border border-neutral-200 flex items-center justify-between hover:border-cyan-700 transition-colors">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileText className="size-5 text-cyan-700 shrink-0" />
                      <span className="text-xs font-semibold text-slate-800 truncate">
                        Resume_CV_{selectedApplicant.candidate.split(" ")[0]}.pdf
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => triggerToast("Resume downloaded")}
                      className="p-1.5 text-gray-400 hover:text-cyan-700 cursor-pointer"
                      title="Download"
                    >
                      <Download className="size-4" />
                    </button>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-neutral-200 flex items-center justify-between hover:border-cyan-700 transition-colors">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileCheck className="size-5 text-emerald-600 shrink-0" />
                      <span className="text-xs font-semibold text-slate-800 truncate">
                        DBS_Certificate.pdf
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => triggerToast("DBS certificate downloaded")}
                      className="p-1.5 text-gray-400 hover:text-cyan-700 cursor-pointer"
                      title="Download"
                    >
                      <Download className="size-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Internal Recruitment Notes */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-800">
                    Internal Notes
                  </label>
                  <button
                    type="button"
                    onClick={handleSaveNote}
                    className="text-xs font-semibold text-cyan-700 hover:underline cursor-pointer"
                  >
                    Save Notes
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={internalNote}
                  onChange={(e) => setInternalNote(e.target.value)}
                  placeholder="Add internal candidate assessment or interview notes..."
                  className="w-full p-3 rounded-xl border border-neutral-300 bg-white text-sm text-slate-800 outline-none focus:border-cyan-700 focus:ring-1 focus:ring-cyan-700 transition-all placeholder:text-gray-400 resize-none"
                />
              </div>

              {/* Update Pipeline Stage */}
              <div className="space-y-3 pt-2">
                <p className="text-sm font-semibold text-slate-800">
                  Update Pipeline Stage
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus("Reviewed")}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      selectedApplicant.status === "Reviewed"
                        ? "bg-[#9333ea] text-white border-[#9333ea]"
                        : "border-[#9333ea]/30 text-[#9333ea] hover:bg-[#9333ea]/10"
                    }`}
                  >
                    Mark Reviewed
                  </button>

                  <button
                    type="button"
                    onClick={() => handleUpdateStatus("Shortlisted")}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      selectedApplicant.status === "Shortlisted"
                        ? "bg-[#db2777] text-white border-[#db2777]"
                        : "border-[#db2777]/30 text-[#db2777] hover:bg-[#db2777]/10"
                    }`}
                  >
                    Shortlist
                  </button>

                  <button
                    type="button"
                    onClick={() => handleUpdateStatus("Interview")}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      selectedApplicant.status === "Interview"
                        ? "bg-[#0891b2] text-white border-[#0891b2]"
                        : "border-[#0891b2]/30 text-[#0891b2] hover:bg-[#0891b2]/10"
                    }`}
                  >
                    Schedule Interview
                  </button>

                  <button
                    type="button"
                    onClick={() => handleUpdateStatus("Offered")}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      selectedApplicant.status === "Offered"
                        ? "bg-[#2563eb] text-white border-[#2563eb]"
                        : "border-[#2563eb]/30 text-[#2563eb] hover:bg-[#2563eb]/10"
                    }`}
                  >
                    Send Offer
                  </button>

                  <button
                    type="button"
                    onClick={() => handleUpdateStatus("Hired")}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      selectedApplicant.status === "Hired"
                        ? "bg-[#22a057] text-white border-[#22a057]"
                        : "border-[#22a057]/30 text-[#22a057] hover:bg-[#22a057]/10"
                    }`}
                  >
                    Hire Candidate
                  </button>

                  <button
                    type="button"
                    onClick={() => handleUpdateStatus("Rejected")}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      selectedApplicant.status === "Rejected"
                        ? "bg-[#e05656] text-white border-[#e05656]"
                        : "border-[#e05656]/30 text-[#e05656] hover:bg-[#e05656]/10"
                    }`}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-neutral-100 flex justify-end bg-slate-50/50">
              <button
                type="button"
                onClick={closeApplicantModal}
                className="w-32 py-2.5 bg-neutral-200 hover:bg-neutral-300 text-slate-700 font-semibold text-sm rounded-lg transition-colors cursor-pointer"
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
