"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RecruitmentAgencySidebar from "@/features/recruitment-agency/components/RecruitmentAgencySidebar";
import {
  Bell,
  Check,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  Filter,
  MapPin,
  Search,
  UserCheck,
  Users,
  X,
} from "lucide-react";

interface StaffingRequest {
  id: string;
  careCompany: string;
  position: string;
  carersNeeded: number;
  location: string;
  postDate: string;
  salary: string;
  status: "New" | "Searching" | "Completed";
  description?: string;
  assignedCarers?: number;
}

const initialStaffingRequests: StaffingRequest[] = [
  {
    id: "SR-1025",
    careCompany: "Care Plus Ltd",
    position: "Support Worker",
    carersNeeded: 5,
    location: "London",
    postDate: "May 20, 2015",
    salary: "£32,000 – £38,000",
    status: "New",
    description: "Urgent need for 5 experienced support workers for residential care facility in Central London.",
    assignedCarers: 0,
  },
  {
    id: "SR-1026",
    careCompany: "Safe Hands Care",
    position: "Live-in Carer",
    carersNeeded: 2,
    location: "Manchester",
    postDate: "August 24, 2013",
    salary: "£32,000 – £38,000",
    status: "Searching",
    description: "Seeking 2 dedicated live-in carers with dementia training for private home placements in Greater Manchester.",
    assignedCarers: 1,
  },
  {
    id: "SR-1027",
    careCompany: "Helping Hearts",
    position: "Senior Carer",
    carersNeeded: 5,
    location: "Birmingham",
    postDate: "August 7, 2017",
    salary: "£32,000 – £38,000",
    status: "Completed",
    description: "All 5 senior carer roles successfully fulfilled and placed.",
    assignedCarers: 5,
  },
  {
    id: "SR-1028",
    careCompany: "Sunrise Care Group",
    position: "Registered Nurse",
    carersNeeded: 3,
    location: "Salford",
    postDate: "October 12, 2023",
    salary: "£36,000 – £42,000",
    status: "New",
    description: "Night shift registered nurses needed for specialized dementia care center.",
    assignedCarers: 0,
  },
  {
    id: "SR-1029",
    careCompany: "Oakwood Health",
    position: "Dementia Care Assistant",
    carersNeeded: 4,
    location: "Stockport",
    postDate: "November 5, 2023",
    salary: "£28,000 – £33,000",
    status: "Searching",
    description: "Day shift support for complex elderly care and medication assistance.",
    assignedCarers: 2,
  },
];

export default function StaffingRequests() {
  const [requests, setRequests] = useState<StaffingRequest[]>(initialStaffingRequests);
  const [selectedRequest, setSelectedRequest] = useState<StaffingRequest | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const openModal = (req: StaffingRequest) => {
    setSelectedRequest(req);
  };

  const closeModal = () => {
    setSelectedRequest(null);
  };

  const handleAssignCarer = () => {
    if (!selectedRequest) return;
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === selectedRequest.id) {
          const newAssigned = Math.min((r.assignedCarers || 0) + 1, r.carersNeeded);
          const newStatus = newAssigned === r.carersNeeded ? "Completed" : "Searching";
          return {
            ...r,
            assignedCarers: newAssigned,
            status: newStatus,
          };
        }
        return r;
      })
    );
    setToastMessage(`Assigned a suitable carer to request ${selectedRequest.id}!`);
    closeModal();
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getStatusBadge = (status: StaffingRequest["status"]) => {
    switch (status) {
      case "New":
        return (
          <span className="inline-flex h-8 items-center justify-center rounded-full bg-amber-100/70 px-4 text-xs sm:text-sm font-medium text-amber-800">
            New
          </span>
        );
      case "Searching":
        return (
          <span className="inline-flex h-8 items-center justify-center rounded-full bg-blue-100 px-4 text-xs sm:text-sm font-medium text-blue-700">
            Searching
          </span>
        );
      case "Completed":
        return (
          <span className="inline-flex h-8 items-center justify-center rounded-full bg-emerald-100 px-4 text-xs sm:text-sm font-medium text-emerald-700">
            Completed
          </span>
        );
      default:
        return (
          <span className="inline-flex h-8 items-center justify-center rounded-full bg-slate-100 px-4 text-xs font-medium text-slate-700">
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
        <RecruitmentAgencySidebar activeHref="/recruitment-agency/staffing-requests" />

        {/* Right Main Content */}
        <div className="min-w-0 flex-1">
          {/* Top Header Banner */}
          <header className="w-full px-6 sm:px-10 py-5 bg-cyan-700/10 flex items-center justify-between border-b border-cyan-700/10">
            <div className="flex-1 flex flex-col justify-start items-start gap-1">
              <h1 className="text-black text-2xl sm:text-3xl font-semibold font-['Wix_Madefor_Text'] leading-tight">
                Staffing Requests
              </h1>
              <p className="text-slate-700 text-sm sm:text-base lg:text-lg font-normal font-['Wix_Madefor_Text'] leading-normal">
                Manage staffing requests received from care companies and assign suitable carers.
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

          {/* Table Container */}
          <div className="mx-auto container p-4 sm:p-6 lg:p-8 space-y-6 pb-20 max-w-[1616px]">
            <div className="w-full bg-white rounded-2xl border border-neutral-100 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 h-16 border-b border-neutral-100 text-gray-500 text-sm sm:text-base font-medium font-['Wix_Madefor_Text']">
                      <th className="px-6 py-4 font-medium text-center">Request ID</th>
                      <th className="px-6 py-4 font-medium text-center">Care Company</th>
                      <th className="px-6 py-4 font-medium text-center">Position</th>
                      <th className="px-6 py-4 font-medium text-center">Carers Needed</th>
                      <th className="px-6 py-4 font-medium text-center">Location</th>
                      <th className="px-6 py-4 font-medium text-center">Post date</th>
                      <th className="px-6 py-4 font-medium text-center">Salary</th>
                      <th className="px-6 py-4 font-medium text-center">Status</th>
                      <th className="px-6 py-4 font-medium text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {requests.map((req) => (
                      <tr
                        key={req.id}
                        className="h-20 hover:bg-neutral-50/70 transition-colors text-gray-700 text-sm sm:text-base font-normal font-['Wix_Madefor_Text']"
                      >
                        {/* Request ID */}
                        <td className="px-6 py-4 font-medium text-slate-700">
                          {req.id}
                        </td>

                        {/* Care Company */}
                        <td className="px-6 py-4 text-slate-700">
                          {req.careCompany}
                        </td>

                        {/* Position */}
                        <td className="px-6 py-4 text-slate-700">
                          {req.position}
                        </td>

                        {/* Carers Needed */}
                        <td className="px-6 py-4 text-slate-700">
                          {req.carersNeeded}
                        </td>

                        {/* Location */}
                        <td className="px-6 py-4 text-slate-700">
                          {req.location}
                        </td>

                        {/* Post date */}
                        <td className="px-6 py-4 text-slate-700">
                          {req.postDate}
                        </td>

                        {/* Salary */}
                        <td className="px-6 py-4 text-slate-700">
                          {req.salary}
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          {getStatusBadge(req.status)}
                        </td>

                        {/* Action */}
                        <td className="px-6 py-4">
                          <Link
                            href={`/recruitment-agency/staffing-requests/${req.id}`}
                            className="text-slate-700 hover:text-cyan-700 hover:underline font-medium text-sm sm:text-base cursor-pointer transition-colors"
                          >
                            {req.status === "Searching" ? "Manage" : "View"}
                          </Link>
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

      {/* Staffing Request Details & Assign Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-neutral-100 flex flex-col gap-5">
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-5 top-5 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="size-12 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700">
                <Users className="size-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  {selectedRequest.position}
                </h3>
                <p className="text-xs text-gray-500">
                  {selectedRequest.careCompany} · {selectedRequest.id}
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-3 border border-slate-100 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Location:</span>
                <span className="font-semibold text-slate-800">{selectedRequest.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Carers Needed:</span>
                <span className="font-semibold text-slate-800">{selectedRequest.carersNeeded}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Salary Range:</span>
                <span className="font-semibold text-slate-800">{selectedRequest.salary}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <div>{getStatusBadge(selectedRequest.status)}</div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Assigned:</span>
                <span className="font-semibold text-cyan-700">
                  {selectedRequest.assignedCarers || 0} of {selectedRequest.carersNeeded} Carers
                </span>
              </div>
              {selectedRequest.description && (
                <div className="pt-2 border-t border-slate-200">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedRequest.description}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 py-3 rounded-lg border border-neutral-300 text-slate-700 text-sm font-semibold hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleAssignCarer}
                className="flex-1 py-3 bg-cyan-700 hover:bg-cyan-800 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <UserCheck className="size-4" />
                <span>Assign Carer</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
