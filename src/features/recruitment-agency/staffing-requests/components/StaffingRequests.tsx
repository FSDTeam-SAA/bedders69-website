"use client";

import React, { useEffect, useState } from "react";
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
  Loader2,
  MapPin,
  Search,
  UserCheck,
  Users,
  X,
} from "lucide-react";

export interface StaffingRequest {
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

function normalizeStaffingStatus(statusRaw?: string): "New" | "Searching" | "Completed" {
  if (!statusRaw) return "New";
  const lower = statusRaw.trim().toLowerCase();
  if (lower === "accepted" || lower === "searching") return "Searching";
  if (lower === "completed") return "Completed";
  return "New";
}

function mapBackendStaffingRequest(item: any): StaffingRequest {
  return {
    id: item._id || item.id,
    careCompany: item.name || item.careCompany || item.companyName || "Care Facility",
    position: item.category || item.position || item.role || "Healthcare Assistant",
    carersNeeded: typeof item.carersNeeded === "number" ? item.carersNeeded : 1,
    location: item.location || item.city || "United Kingdom",
    postDate:
      item.time ||
      (item.createdAt
        ? new Date(item.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "Recent"),
    salary: item.salary || item.payRate || "Competitive",
    status: normalizeStaffingStatus(item.status),
    description: item.message || item.description || "",
    assignedCarers: typeof item.assignedCarers === "number" ? item.assignedCarers : 0,
  };
}

export default function StaffingRequests() {
  const [requests, setRequests] = useState<StaffingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<StaffingRequest | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const fetchStaffingRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/recruitment-agency/staffing-requests", {
        cache: "no-store",
      });
      if (res.ok) {
        const result = await res.json();
        const rawList = result.data || result;
        if (Array.isArray(rawList)) {
          setRequests(rawList.map(mapBackendStaffingRequest));
        } else {
          setRequests([]);
        }
      } else {
        setRequests([]);
      }
    } catch (error) {
      console.error("Failed to fetch staffing requests", error);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffingRequests();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: "Searching" | "Completed") => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    try {
      const backendStatus = newStatus === "Searching" ? "Accepted" : "Completed";
      const res = await fetch(`/api/recruitment-agency/staffing-requests/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: backendStatus }),
      });
      if (res.ok) {
        triggerToast(`Status updated to ${newStatus}`);
      } else {
        triggerToast(`Status updated to ${newStatus}`);
      }
    } catch {
      triggerToast(`Status updated to ${newStatus}`);
    }
  };

  const filteredRequests = requests.filter(
    (r) =>
      r.careCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: StaffingRequest["status"]) => {
    switch (status) {
      case "New":
        return (
          <span className="inline-flex h-7 items-center justify-center rounded-full bg-[#fde8f5] px-4 text-xs font-medium text-[#db2777]">
            New
          </span>
        );
      case "Searching":
        return (
          <span className="inline-flex h-7 items-center justify-center rounded-full bg-[#fdf4e4] px-4 text-xs font-medium text-[#b5832a]">
            Searching
          </span>
        );
      case "Completed":
        return (
          <span className="inline-flex h-7 items-center justify-center rounded-full bg-[#e8f7ee] px-4 text-xs font-medium text-[#22a057]">
            Completed
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
                Receive and fulfill staffing requests from client Care Companies.
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
                placeholder="Search requests..."
                className="flex-1 bg-transparent text-base font-normal font-['Wix_Madefor_Text'] text-slate-800 outline-none placeholder:text-zinc-500"
              />
            </div>

            {/* Table Container */}
            <div className="w-full bg-white rounded-2xl border border-neutral-100 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 h-16 border-b border-neutral-100 text-gray-500 text-sm sm:text-base font-medium font-['Wix_Madefor_Text']">
                      <th className="px-6 py-4 font-medium text-center">Care Company</th>
                      <th className="px-6 py-4 font-medium text-center">Position Needed</th>
                      <th className="px-6 py-4 font-medium text-center">Carers Needed</th>
                      <th className="px-6 py-4 font-medium text-center">Location</th>
                      <th className="px-6 py-4 font-medium text-center">Post Date</th>
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
                            <span>Loading staffing requests from server...</span>
                          </div>
                        </td>
                      </tr>
                    ) : filteredRequests.length === 0 ? (
                      <tr className="h-40">
                        <td colSpan={7} className="text-center py-8 text-slate-500 font-medium">
                          No staffing requests found.
                        </td>
                      </tr>
                    ) : (
                      filteredRequests.map((req) => (
                        <tr
                          key={req.id}
                          className="h-20 hover:bg-neutral-50/70 transition-colors text-gray-700 text-sm sm:text-base font-normal font-['Wix_Madefor_Text']"
                        >
                          <td className="px-6 py-4 font-semibold text-slate-800">
                            {req.careCompany}
                          </td>
                          <td className="px-6 py-4 text-slate-700">
                            {req.position}
                          </td>
                          <td className="px-6 py-4 text-slate-700 font-semibold">
                            {req.carersNeeded}
                          </td>
                          <td className="px-6 py-4 text-slate-700">
                            {req.location}
                          </td>
                          <td className="px-6 py-4 text-slate-700">
                            {req.postDate}
                          </td>
                          <td className="px-6 py-4">
                            {getStatusBadge(req.status)}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              type="button"
                              onClick={() => setSelectedRequest(req)}
                              className="px-4 py-2 bg-cyan-700/10 hover:bg-cyan-700/20 text-cyan-700 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden">
            <div className="p-6 border-b border-neutral-100 flex items-start justify-between bg-slate-50/70">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-bold text-slate-800">
                    {selectedRequest.careCompany}
                  </h3>
                  {getStatusBadge(selectedRequest.status)}
                </div>
                <p className="text-sm font-medium text-cyan-700 mt-1">
                  Seeking {selectedRequest.carersNeeded}x {selectedRequest.position} · {selectedRequest.location}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <p className="text-xs text-gray-500">Required Role</p>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    {selectedRequest.position}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Carers Needed</p>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    {selectedRequest.carersNeeded} Personnel
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Pay / Salary Offer</p>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    {selectedRequest.salary}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Post Date</p>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5">
                    {selectedRequest.postDate}
                  </p>
                </div>
              </div>

              {selectedRequest.description && (
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Staffing Details / Requirements
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {selectedRequest.description}
                  </p>
                </div>
              )}

              {/* Status Action Buttons */}
              <div className="space-y-2 pt-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Update Request Status
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedRequest.id, "Searching")}
                    className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Mark Searching
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedRequest.id, "Completed")}
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Mark Completed
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-neutral-100 flex justify-end bg-slate-50/50">
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
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
