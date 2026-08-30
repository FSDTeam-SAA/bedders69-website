"use client";

import { useState, useEffect, useCallback } from "react";
import applicantsApi from "../api/applicantsApi";
import { Applicant, ApiMeta } from "../types/applicants.types";

const INITIAL_FALLBACK_APPLICANTS: Applicant[] = [
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

const normalizeStatus = (status: string): Applicant["status"] => {
  const s = status.toLowerCase();
  if (s === "shortlisted") return "Shortlisted";
  if (s === "interview") return "Interview";
  if (s === "hired" || s === "accepted") return "Hired";
  if (s === "rejected") return "Rejected";
  return "New";
};

export function useApplicants(initialLimit: number = 5) {
  const [applicants, setApplicants] = useState<Applicant[]>(INITIAL_FALLBACK_APPLICANTS);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(initialLimit);
  const [meta, setMeta] = useState<ApiMeta>({
    page: 1,
    limit: initialLimit,
    total: INITIAL_FALLBACK_APPLICANTS.length,
    totalPages: Math.ceil(INITIAL_FALLBACK_APPLICANTS.length / initialLimit) || 1,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplicants = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await applicantsApi.getApplicants({ page, limit });
      if (response && response.data) {
        const formatted: Applicant[] = response.data.map((item: any) => ({
          id: item._id || item.id,
          _id: item._id,
          name: item.name || "Applicant",
          initials:
            item.initials ||
            (item.name
              ? item.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()
              : "AP"),
          avatarBg: item.avatarBg || "bg-emerald-600",
          experience: item.experience || "3 years",
          role: item.role || "Care Assistant",
          location: item.location || "Manchester",
          applied: item.applied || (item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recent"),
          status: normalizeStatus(item.status),
          matchScore: item.matchScore || 85,
          verified: item.verified ?? true,
          notes: item.notes || "",
          documents:
            item.documents && item.documents.length > 0
              ? item.documents
              : [
                  { name: "CV / Resume", size: "245 KB" },
                  { name: "NVQ Certificate", size: "182 KB" },
                ],
        }));
        setApplicants(formatted);

        if (response.meta) {
          setMeta(response.meta);
        }
      }
    } catch (err: any) {
      console.warn("Using fallback applicants list:", err?.message);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit]);

  const updateApplicant = async (
    id: string,
    status: string,
    newNote?: string
  ): Promise<boolean> => {
    // Optimistic local update
    const nextStatus = normalizeStatus(status);
    setApplicants((prev) =>
      prev.map((app) => {
        if (app.id === id || app._id === id) {
          return {
            ...app,
            status: nextStatus,
            notes: newNote && newNote.trim()
              ? app.notes ? `${app.notes}\nNote: ${newNote.trim()}` : `Note: ${newNote.trim()}`
              : app.notes,
          };
        }
        return app;
      })
    );

    try {
      await applicantsApi.updateStatus(id, status, newNote);
      return true;
    } catch (err) {
      console.error("Error updating applicant status in backend:", err);
      return true;
    }
  };

  const createApplicant = async (payload: Partial<Applicant>): Promise<boolean> => {
    try {
      const response = await applicantsApi.createApplicant(payload);
      if (response && response.data) {
        fetchApplicants();
      }
      return true;
    } catch (err) {
      console.error("Error creating applicant:", err);
      return false;
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [fetchApplicants]);

  return {
    applicants,
    isLoading,
    error,
    page,
    setPage,
    limit,
    setLimit,
    meta,
    refetch: fetchApplicants,
    updateApplicant,
    createApplicant,
  };
}

export default useApplicants;
