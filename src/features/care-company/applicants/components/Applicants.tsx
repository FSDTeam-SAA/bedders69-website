"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CareCompanySidebar from "@/features/care-company/components/CareCompanySidebar";
import {
    Check,
    ChevronLeft,
    ChevronRight,
    Download,
    Eye,
    FileText,
    ShieldCheck,
    X,
} from "lucide-react";

interface Applicant {
    id: string;
    name: string;
    initials: string;
    avatarBg: string;
    experience: string;
    role: string;
    location: string;
    applied: string;
    status: "New" | "Shortlisted" | "Interview" | "Hired" | "Rejected";
    matchScore: number;
    verified: boolean;
    notes: string;
    documents: { name: string; size: string }[];
}

const initialApplicants: Applicant[] = [
    {
        id: "1",
        name: "James Okafor",
        initials: "JO",
        avatarBg: "bg-emerald-600",
        experience: "5 years",
        role: "Senior Care Assistant",
        location: "Manchester",
        applied: "Today 10:23",
        status: "New",
        matchScore: 87,
        verified: true,
        notes:
            "Strong candidate — excellent dementia experience. Follow up re: availability.",
        documents: [
            { name: "CV / Resume", size: "245 KB" },
            { name: "NVQ Certificate", size: "182 KB" },
        ],
    },
    {
        id: "2",
        name: "Emma Williams",
        initials: "EW",
        avatarBg: "bg-indigo-600",
        experience: "8 years",
        role: "Registered Nurse",
        location: "Salford",
        applied: "Today 08:45",
        status: "Shortlisted",
        matchScore: 92,
        verified: true,
        notes:
            "Extensive clinical experience in dementia ward management and medication admin.",
        documents: [
            { name: "CV / Resume", size: "310 KB" },
            { name: "Nursing Pin Certificate", size: "215 KB" },
        ],
    },
    {
        id: "3",
        name: "Priya Patel",
        initials: "PP",
        avatarBg: "bg-rose-600",
        experience: "3 years",
        role: "Support Worker",
        location: "Stockport",
        applied: "Yesterday",
        status: "Interview",
        matchScore: 79,
        verified: true,
        notes: "Interview scheduled for Tuesday 2:00 PM via video call.",
        documents: [
            { name: "CV / Resume", size: "198 KB" },
            { name: "First Aid Certificate", size: "140 KB" },
        ],
    },
    {
        id: "4",
        name: "Michael Thompson",
        initials: "MT",
        avatarBg: "bg-blue-600",
        experience: "7 years",
        role: "Senior Care Assistant",
        location: "Bolton",
        applied: "2 weeks ago",
        status: "New",
        matchScore: 84,
        verified: true,
        notes: "Reliable background in residential care and complex physical support.",
        documents: [
            { name: "CV / Resume", size: "220 KB" },
            { name: "DBS Enhanced Check", size: "175 KB" },
        ],
    },
    {
        id: "5",
        name: "Lisa Chen",
        initials: "LC",
        avatarBg: "bg-teal-600",
        experience: "10 years",
        role: "Registered Nurse",
        location: "Wigan",
        applied: "2 weeks ago",
        status: "Hired",
        matchScore: 95,
        verified: true,
        notes: "Offer accepted! Induction scheduled for next Monday.",
        documents: [
            { name: "CV / Resume", size: "280 KB" },
            { name: "References & Clearances", size: "320 KB" },
        ],
    },
];

export default function Applicants() {
    const [applicants, setApplicants] = useState<Applicant[]>(initialApplicants);
    const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
        null
    );
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStage, setSelectedStage] = useState<string>("");
    const [newNote, setNewNote] = useState("");
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const openModal = (applicant: Applicant) => {
        setSelectedApplicant(applicant);
        setSelectedStage(applicant.status);
        setNewNote("");
    };

    const closeModal = () => {
        setSelectedApplicant(null);
    };

    const handleUpdateApplicant = () => {
        if (!selectedApplicant) return;

        const updated = applicants.map((app) => {
            if (app.id === selectedApplicant.id) {
                return {
                    ...app,
                    status: (selectedStage as Applicant["status"]) || app.status,
                    notes: newNote.trim()
                        ? `${app.notes}\nNote: ${newNote.trim()}`
                        : app.notes,
                };
            }
            return app;
        });

        setApplicants(updated);
        setToastMessage(`Applicant status updated successfully!`);
        closeModal();
        setTimeout(() => {
            setToastMessage(null);
        }, 2500);
    };

    const getStatusBadge = (status: Applicant["status"]) => {
        switch (status) {
            case "New":
                return (
                    <span className="inline-flex h-8 items-center justify-center rounded-full bg-slate-100 px-4 text-sm font-semibold text-[#2b6ea6]">
                        New
                    </span>
                );
            case "Shortlisted":
                return (
                    <span className="inline-flex h-8 items-center justify-center rounded-full bg-orange-50 px-4 text-sm font-semibold text-stone-600 border border-orange-100">
                        Shortlisted
                    </span>
                );
            case "Interview":
                return (
                    <span className="inline-flex h-8 items-center justify-center rounded-full bg-purple-100 px-4 text-sm font-semibold text-purple-700">
                        Interview
                    </span>
                );
            case "Hired":
                return (
                    <span className="inline-flex h-8 items-center justify-center rounded-full bg-emerald-50 px-4 text-sm font-semibold text-green-600 border border-emerald-100">
                        Hired
                    </span>
                );
            case "Rejected":
                return (
                    <span className="inline-flex h-8 items-center justify-center rounded-full bg-red-50 px-4 text-sm font-semibold text-red-600 border border-red-100">
                        Rejected
                    </span>
                );
            default:
                return (
                    <span className="inline-flex h-8 items-center justify-center rounded-full bg-slate-100 px-4 text-sm font-semibold text-slate-700">
                        {status}
                    </span>
                );
        }
    };

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
                <CareCompanySidebar activeHref="/care-company/applicants" />

                {/* Right Content */}
                <div className="min-w-0 flex-1">
                    {/* Header */}
                    <header className="flex min-h-[96px] w-full items-center justify-between bg-white px-6 py-6 border-b border-[#f0f1f2]">
                        <div className="flex flex-col justify-start items-start gap-1">
                            <h1 className="text-2xl font-bold leading-7 text-[#2b6ea6]">
                                Applicants
                            </h1>
                            <p className="text-xs font-normal leading-4 text-gray-500">
                                Manage your recruitment pipeline
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

                    {/* Main Table Area */}
                    <div className="mx-auto container p-4 sm:p-6 lg:p-8 space-y-6   pb-20">
                        {/* Table Card */}
                        <div className="w-full bg-white rounded-xl border border-neutral-100 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.06)] overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-100 h-11 border-b border-neutral-100 text-stone-600 text-xs font-medium font-['Poppins']">
                                            <th className="px-6 py-3 font-medium">Applicant</th>
                                            <th className="px-6 py-3 font-medium text-center">Role</th>
                                            <th className="px-6 py-3 font-medium text-center">Location</th>
                                            <th className="px-6 py-3 font-medium text-center">Applied</th>
                                            <th className="px-6 py-3 font-medium text-center">Status</th>
                                            <th className="px-6 py-3 font-medium text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-100">
                                        {applicants.map((applicant) => (
                                            <tr
                                                key={applicant.id}
                                                className="h-16 hover:bg-neutral-50/70 transition-colors"
                                            >
                                                {/* Applicant Name & Experience */}
                                                <td className="px-6 py-3.5">
                                                    <div className="flex flex-col">
                                                        <span className="text-zinc-800 text-sm font-semibold font-['Inter'] leading-5">
                                                            {applicant.name}
                                                        </span>
                                                        <span className="text-neutral-500 text-sm font-normal font-['Wix_Madefor_Text'] leading-4">
                                                            {applicant.experience}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Role */}
                                                <td className="px-6 py-3.5 text-center">
                                                    <span className="text-neutral-500 text-base font-normal font-['Poppins'] leading-5 line-clamp-1">
                                                        {applicant.role}
                                                    </span>
                                                </td>

                                                {/* Location */}
                                                <td className="px-6 py-3.5 text-center">
                                                    <span className="text-slate-900 text-base font-medium font-['Poppins'] leading-5">
                                                        {applicant.location}
                                                    </span>
                                                </td>

                                                {/* Applied Time */}
                                                <td className="px-6 py-3.5 text-center">
                                                    <span className="text-neutral-500 text-base font-normal font-['Poppins'] leading-5">
                                                        {applicant.applied}
                                                    </span>
                                                </td>

                                                {/* Status */}
                                                <td className="px-6 py-3.5 text-center">
                                                    {getStatusBadge(applicant.status)}
                                                </td>

                                                {/* Action - Eye Icon */}
                                                <td className="px-6 py-3.5 text-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => openModal(applicant)}
                                                        className="inline-flex items-center justify-center p-2 rounded-lg text-slate-800 hover:text-[#2b6ea6] hover:bg-slate-100 transition-colors cursor-pointer"
                                                        aria-label={`View details of ${applicant.name}`}
                                                    >
                                                        <Eye className="h-5 w-5 stroke-[1.8]" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Bar */}
                            <div className="p-6 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4">
                                <span className="text-neutral-400 text-base font-normal font-['Poppins']">
                                    Showing 1 to 5 of 12 results
                                </span>

                                <div className="flex items-center gap-2 select-none">
                                    <button
                                        type="button"
                                        disabled={currentPage === 1}
                                        className="size-10 rounded-sm border border-neutral-300 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 transition-colors cursor-pointer"
                                    >
                                        <ChevronLeft className="size-4" />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setCurrentPage(1)}
                                        className="size-10 rounded-sm bg-slate-900 text-white font-medium font-['Poppins'] text-base flex items-center justify-center"
                                    >
                                        1
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setCurrentPage(2)}
                                        className="size-10 rounded-sm border border-neutral-300 text-neutral-500 font-medium font-['Poppins'] text-base flex items-center justify-center hover:bg-neutral-50 transition-colors cursor-pointer"
                                    >
                                        2
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setCurrentPage(3)}
                                        className="size-10 rounded-sm border border-neutral-300 text-neutral-500 font-medium font-['Poppins'] text-base flex items-center justify-center hover:bg-neutral-50 transition-colors cursor-pointer"
                                    >
                                        3
                                    </button>

                                    <span className="size-10 rounded-sm border border-neutral-300 text-neutral-500 font-medium font-['Poppins'] text-base flex items-center justify-center">
                                        ...
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() => setCurrentPage(8)}
                                        className="size-10 rounded-sm border border-neutral-300 text-neutral-500 font-medium font-['Poppins'] text-base flex items-center justify-center hover:bg-neutral-50 transition-colors cursor-pointer"
                                    >
                                        8
                                    </button>

                                    <button
                                        type="button"
                                        className="size-10 rounded-sm border border-neutral-300 flex items-center justify-center text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer"
                                    >
                                        <ChevronRight className="size-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= APPLICANT DETAILS MODAL ================= */}
            {selectedApplicant && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-xs overflow-y-auto animate-fade-in">
                    <div className="relative w-full max-w-[820px] max-h-[92vh] overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl flex flex-col gap-5 border border-neutral-100 my-8">
                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={closeModal}
                            className="absolute right-5 top-5 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                            aria-label="Close modal"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {/* Header: Avatar, Name, Role, Badges */}
                        <div className="flex items-center gap-4 pr-8">
                            <div
                                className={`size-12 ${selectedApplicant.avatarBg} rounded-full flex items-center justify-center shrink-0 shadow-sm`}
                            >
                                <span className="text-white text-base font-bold font-['Inter']">
                                    {selectedApplicant.initials}
                                </span>
                            </div>

                            <div className="flex flex-col gap-1">
                                <h2 className="text-cyan-700 text-lg font-bold font-['Wix_Madefor_Text'] leading-5">
                                    {selectedApplicant.name}
                                </h2>
                                <p className="text-gray-500 text-sm font-normal font-['Wix_Madefor_Text'] leading-4">
                                    {selectedApplicant.role}
                                </p>
                                <div className="flex items-center gap-2 pt-0.5">
                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-sm">
                                        {selectedApplicant.status}
                                    </span>
                                    {selectedApplicant.verified && (
                                        <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-sm inline-flex items-center gap-1">
                                            <ShieldCheck className="size-3" /> Verified
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Match Score */}
                        <div className="p-3.5 bg-blue-50/70 rounded-md flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <span className="text-cyan-700 text-sm font-bold font-['Wix_Madefor_Text']">
                                    Match Score
                                </span>
                                <span className="text-cyan-700 text-2xl font-bold font-['Wix_Madefor_Text']">
                                    {selectedApplicant.matchScore}%
                                </span>
                            </div>
                            <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-cyan-700 rounded-full transition-all duration-500"
                                    style={{ width: `${selectedApplicant.matchScore}%` }}
                                />
                            </div>
                        </div>

                        {/* 2x2 Info Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div className="h-16 p-3.5 bg-slate-50 rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.04)] border border-neutral-100 flex flex-col justify-center gap-1">
                                <span className="text-gray-500 text-xs font-normal">Location</span>
                                <span className="text-cyan-700 text-sm font-semibold">
                                    {selectedApplicant.location}
                                </span>
                            </div>

                            <div className="h-16 p-3.5 bg-slate-50 rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.04)] border border-neutral-100 flex flex-col justify-center gap-1">
                                <span className="text-gray-500 text-xs font-normal">Experience</span>
                                <span className="text-cyan-700 text-sm font-semibold">
                                    {selectedApplicant.experience}
                                </span>
                            </div>

                            <div className="h-16 p-3.5 bg-slate-50 rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.04)] border border-neutral-100 flex flex-col justify-center gap-1">
                                <span className="text-gray-500 text-xs font-normal">Applied</span>
                                <span className="text-cyan-700 text-sm font-semibold">
                                    {selectedApplicant.applied}
                                </span>
                            </div>

                            <div className="h-16 p-3.5 bg-slate-50 rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.04)] border border-neutral-100 flex flex-col justify-center gap-1">
                                <span className="text-gray-500 text-xs font-normal">Status</span>
                                <span className="text-cyan-700 text-sm font-semibold">
                                    {selectedApplicant.status}
                                </span>
                            </div>
                        </div>

                        {/* Documents */}
                        <div className="space-y-2.5">
                            <h3 className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text']">
                                Documents
                            </h3>
                            <div className="space-y-2">
                                {selectedApplicant.documents.map((doc) => (
                                    <div
                                        key={doc.name}
                                        className="p-3.5 bg-slate-50 rounded-xl border border-neutral-100 flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <FileText className="h-5 w-5 text-red-500" strokeWidth={1.8} />
                                            <span className="text-slate-800 text-sm font-semibold">
                                                {doc.name}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-gray-500 text-xs font-normal">
                                                {doc.size}
                                            </span>
                                            <button
                                                type="button"
                                                className="p-1 rounded-md text-gray-500 hover:text-slate-900 hover:bg-gray-200 transition-colors cursor-pointer"
                                                title="Download Document"
                                            >
                                                <Download className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Update Stage */}
                        <div className="space-y-2.5">
                            <h3 className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text']">
                                Update Stage
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {/* Shortlist */}
                                <button
                                    type="button"
                                    onClick={() => setSelectedStage("Shortlisted")}
                                    className={`h-12 p-3 rounded-md flex items-center justify-center gap-2 cursor-pointer transition-all ${selectedStage === "Shortlisted"
                                        ? "bg-amber-100 border-2 border-amber-500 text-amber-800 font-bold"
                                        : "bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100/70 font-semibold"
                                        }`}
                                >
                                    <span className="text-base font-['Wix_Madefor_Text']">
                                        Shortlist
                                    </span>
                                </button>

                                {/* Invite to Interview */}
                                <button
                                    type="button"
                                    onClick={() => setSelectedStage("Interview")}
                                    className={`h-12 p-3 rounded-md flex items-center justify-center gap-2 cursor-pointer transition-all ${selectedStage === "Interview"
                                        ? "bg-purple-100 border-2 border-purple-500 text-purple-800 font-bold"
                                        : "bg-purple-50 border border-purple-200 text-purple-700 hover:bg-purple-100/70 font-semibold"
                                        }`}
                                >
                                    <span className="text-base font-['Wix_Madefor_Text']">
                                        Invite to Interview
                                    </span>
                                </button>

                                {/* Make Offer */}
                                <button
                                    type="button"
                                    onClick={() => setSelectedStage("Hired")}
                                    className={`h-12 p-3 rounded-md flex items-center justify-center gap-2 cursor-pointer transition-all ${selectedStage === "Hired"
                                        ? "bg-emerald-100 border-2 border-emerald-500 text-emerald-800 font-bold"
                                        : "bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100/70 font-semibold"
                                        }`}
                                >
                                    <span className="text-base font-['Wix_Madefor_Text']">
                                        Make Offer
                                    </span>
                                </button>

                                {/* Reject */}
                                <button
                                    type="button"
                                    onClick={() => setSelectedStage("Rejected")}
                                    className={`h-12 p-3 rounded-md flex items-center justify-center gap-2 cursor-pointer transition-all ${selectedStage === "Rejected"
                                        ? "bg-red-100 border-2 border-red-500 text-red-800 font-bold"
                                        : "bg-red-50 border border-red-200 text-red-600 hover:bg-red-100/70 font-semibold"
                                        }`}
                                >
                                    <span className="text-base font-['Wix_Madefor_Text']">
                                        Reject
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Internal Notes */}
                        <div className="space-y-2.5">
                            <h3 className="text-slate-800 text-base font-medium font-['Wix_Madefor_Text']">
                                Internal Notes
                            </h3>

                            {/* Note Display Box */}
                            {selectedApplicant.notes && (
                                <div className="p-3.5 bg-orange-50/80 rounded-md border border-orange-300">
                                    <p className="text-orange-950 text-sm font-medium font-['Wix_Madefor_Text'] leading-relaxed whitespace-pre-line">
                                        {selectedApplicant.notes}
                                    </p>
                                </div>
                            )}

                            {/* Add Note Input */}
                            <textarea
                                rows={3}
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                                placeholder="Add a private note..."
                                className="w-full p-3 rounded-md border border-neutral-300 outline-none text-sm text-slate-800 placeholder:text-gray-400 focus:border-[#2b6ea6] focus:ring-1 focus:ring-[#2b6ea6] bg-white resize-none"
                            />
                        </div>

                        {/* Modal Footer Buttons */}
                        <div className="flex items-center justify-between gap-4 pt-2">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="w-36 h-12 rounded-lg border border-cyan-700 text-cyan-700 hover:bg-neutral-50 font-medium text-base transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleUpdateApplicant}
                                className="w-36 h-12 rounded-lg bg-cyan-700 hover:bg-cyan-800 text-white font-medium text-base transition-colors cursor-pointer shadow-sm active:scale-[0.99]"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}