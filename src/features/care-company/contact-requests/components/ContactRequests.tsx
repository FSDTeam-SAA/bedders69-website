"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CareCompanySidebar from "@/features/care-company/components/CareCompanySidebar";
import {
  Check,
  CheckCircle2,
  Clock,
  MessageSquare,
  Phone,
  X,
  XCircle,
  Loader2,
} from "lucide-react";
import { useContactRequests } from "../hooks/useContactRequests";

export default function ContactRequests() {
  const {
    filteredRequests,
    counts,
    activeTab,
    setActiveTab,
    isLoading,
    updateStatus,
  } = useContactRequests();

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleStatusChange = async (
    id: string,
    newStatus: "Accepted" | "Rejected"
  ) => {
    const target = filteredRequests.find((r) => r.id === id || r._id === id);
    await updateStatus(id, newStatus);
    setToastMessage(
      `Contact request from ${target?.name || "User"} has been ${
        newStatus === "Accepted" ? "accepted" : "declined"
      }.`
    );
    setTimeout(() => setToastMessage(null), 3000);
  };

  const countAll = counts.all;
  const countAccepted = counts.accepted;
  const countRejected = counts.rejected;
  const countPending = counts.pending;

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-['Wix_Madefor_Text',Arial,sans-serif] text-[#203746]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-white shadow-xl animate-fade-in">
          <Check className="h-5 w-5" />
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      <div className="mx-auto flex min-h-screen w-full max-w-[1920px] flex-col lg:flex-row">
        {/* Left Sidebar */}
        <CareCompanySidebar activeHref="/care-company/contact-requests" />

        {/* Right Content */}
        <div className="min-w-0 flex-1">
          {/* Header */}
          <header className="flex min-h-[96px] w-full items-center justify-between bg-white px-6 py-6 border-b border-[#f0f1f2]">
            <div className="flex flex-col justify-start items-start gap-1">
              <h1 className="text-2xl font-bold leading-7 text-[#2b6ea6]">
                Contact Requests
              </h1>
              <p className="text-xs font-normal leading-4 text-gray-500">
                Manage incoming inquiries from families and healthcare professionals
              </p>
            </div>
            <Link
              href="/care-company/company-profile"
              className="inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-2 pr-4 shadow-sm hover:bg-slate-50 transition-colors border border-slate-100 shrink-0 ml-4"
            >
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-cyan-700/20 bg-slate-100 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Sunrise Care"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold leading-tight text-slate-800">
                  Sunrise Care
                </span>
                <span className="text-xs font-normal text-gray-500">
                  Care Company
                </span>
              </div>
            </Link>
          </header>

          {/* Main Content Area */}
          <div className="mx-auto container p-4 sm:p-6 lg:p-8 space-y-6 pb-20 max-w-[1486px]">
            {/* Filter Tabs (Pills) */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* All */}
              <button
                type="button"
                onClick={() => setActiveTab("All")}
                className={`h-10 px-5 rounded-full inline-flex items-center justify-center font-semibold text-sm transition-all cursor-pointer ${
                  activeTab === "All"
                    ? "bg-cyan-700 text-white shadow-sm"
                    : "bg-white text-gray-500 border border-sky-950/10 hover:bg-neutral-50"
                }`}
              >
                All ({countAll})
              </button>

              {/* Accepted */}
              <button
                type="button"
                onClick={() => setActiveTab("Accepted")}
                className={`h-10 px-5 rounded-full inline-flex items-center justify-center font-semibold text-sm transition-all cursor-pointer ${
                  activeTab === "Accepted"
                    ? "bg-cyan-700 text-white shadow-sm"
                    : "bg-white text-gray-500 border border-sky-950/10 hover:bg-neutral-50"
                }`}
              >
                Accepted ({countAccepted})
              </button>

              {/* Rejected */}
              <button
                type="button"
                onClick={() => setActiveTab("Rejected")}
                className={`h-10 px-5 rounded-full inline-flex items-center justify-center font-semibold text-sm transition-all cursor-pointer ${
                  activeTab === "Rejected"
                    ? "bg-cyan-700 text-white shadow-sm"
                    : "bg-white text-gray-500 border border-sky-950/10 hover:bg-neutral-50"
                }`}
              >
                Rejected ({countRejected})
              </button>

              {/* Pending */}
              <button
                type="button"
                onClick={() => setActiveTab("Pending")}
                className={`h-10 px-5 rounded-full inline-flex items-center justify-center font-semibold text-sm transition-all cursor-pointer ${
                  activeTab === "Pending"
                    ? "bg-cyan-700 text-white shadow-sm"
                    : "bg-white text-gray-500 border border-sky-950/10 hover:bg-neutral-50"
                }`}
              >
                Pending ({countPending})
              </button>
            </div>

            {/* Requests Cards List */}
            <div className="flex flex-col gap-4">
              {isLoading ? (
                <div className="w-full p-12 bg-white rounded-2xl border border-sky-950/10 text-center flex flex-col items-center justify-center gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-cyan-700" />
                  <p className="text-slate-600 font-medium text-sm">
                    Loading contact requests...
                  </p>
                </div>
              ) : filteredRequests.length === 0 ? (
                <div className="w-full p-12 bg-white rounded-2xl border border-sky-950/10 text-center flex flex-col items-center justify-center gap-2">
                  <MessageSquare className="h-10 w-10 text-gray-400" />
                  <p className="text-slate-700 font-semibold text-base">
                    No contact requests in this filter
                  </p>
                  <p className="text-gray-500 text-xs">
                    Try selecting another tab to view other inquiries.
                  </p>
                </div>
              ) : (
                filteredRequests.map((request) => (
                  <div
                    key={request.id}
                    className="w-full p-6 bg-white rounded-2xl border border-sky-950/10 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] flex flex-col justify-center items-start gap-4 transition-all hover:shadow-[0px_4px_8px_rgba(0,0,0,0.04)]"
                  >
                    <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      {/* Left: Avatar + Details */}
                      <div className="flex items-start gap-4 flex-1">
                        {/* Avatar */}
                        <div
                          className={`size-10 ${request.avatarBg} rounded-full flex justify-center items-center shrink-0 shadow-xs`}
                        >
                          <span className="text-white text-sm font-bold font-['Inter']">
                            {request.initials}
                          </span>
                        </div>

                        {/* Text Block */}
                        <div className="flex flex-col gap-2.5 max-w-3xl">
                          {/* Name & Badges */}
                          <div className="flex flex-wrap items-center gap-2.5">
                            <h2 className="text-cyan-700 text-base font-bold font-['Wix_Madefor_Text'] leading-5">
                              {request.name}
                            </h2>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 bg-slate-100 rounded-sm text-gray-600 text-xs font-semibold font-['Wix_Madefor_Text']">
                                {request.category}
                              </span>
                              {request.status === "Pending" && (
                                <span className="px-2 py-0.5 bg-amber-100 rounded-sm text-amber-800 text-xs font-semibold font-['Wix_Madefor_Text']">
                                  Pending
                                </span>
                              )}
                              {request.status === "Accepted" && (
                                <span className="px-2 py-0.5 bg-emerald-100 rounded-sm text-emerald-800 text-xs font-semibold font-['Wix_Madefor_Text']">
                                  Accepted
                                </span>
                              )}
                              {request.status === "Rejected" && (
                                <span className="px-2 py-0.5 bg-red-100 rounded-sm text-red-800 text-xs font-semibold font-['Wix_Madefor_Text']">
                                  Declined
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Message Content */}
                          <p className="text-slate-600 text-sm font-normal font-['Inter'] leading-relaxed">
                            {request.message}
                          </p>

                          {/* Time & Phone */}
                          <div className="flex items-center gap-4 text-gray-500 text-xs font-normal font-['Wix_Madefor_Text'] pt-0.5">
                            <div className="flex items-center gap-1.5">
                              <Clock className="size-3.5 text-gray-400" />
                              <span>{request.time}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Phone className="size-3.5 text-gray-400" />
                              <span>{request.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="w-full sm:w-28 flex sm:flex-col justify-end items-stretch gap-2 shrink-0 pt-2 sm:pt-0">
                        {request.status === "Pending" ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleStatusChange(request.id, "Accepted")}
                              className="flex-1 sm:w-full h-9 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-xl inline-flex justify-center items-center gap-1.5 text-white text-sm font-bold font-['Wix_Madefor_Text'] transition-colors cursor-pointer shadow-xs active:scale-[0.98]"
                            >
                              <Check className="size-3.5 stroke-[2.5]" />
                              <span>Accept</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleStatusChange(request.id, "Rejected")}
                              className="flex-1 sm:w-full h-9 px-4 py-2 rounded-xl border border-gray-400 hover:bg-gray-100 flex justify-center items-center text-gray-600 text-sm font-semibold font-['Wix_Madefor_Text'] transition-colors cursor-pointer active:scale-[0.98]"
                            >
                              <span>Decline</span>
                            </button>
                          </>
                        ) : request.status === "Accepted" ? (
                          <div className="h-9 px-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center gap-1.5 text-emerald-700 text-xs font-semibold">
                            <CheckCircle2 className="size-3.5" />
                            <span>Accepted</span>
                          </div>
                        ) : (
                          <div className="h-9 px-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-center gap-1.5 text-red-700 text-xs font-semibold">
                            <XCircle className="size-3.5" />
                            <span>Declined</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}