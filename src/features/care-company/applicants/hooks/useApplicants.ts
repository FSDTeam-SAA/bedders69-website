"use client";

import { useState, useEffect, useCallback } from "react";
import applicantsApi from "../api/applicantsApi";
import { Applicant, ApiMeta } from "../types/applicants.types";

const normalizeStatus = (status: string): Applicant["status"] => {
  const s = status.toLowerCase();
  if (s === "shortlisted") return "Shortlisted";
  if (s === "interview") return "Interview";
  if (s === "hired" || s === "accepted") return "Hired";
  if (s === "rejected") return "Rejected";
  return "New";
};

export function useApplicants(initialLimit: number = 5) {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(initialLimit);
  const [meta, setMeta] = useState<ApiMeta>({
    page: 1,
    limit: initialLimit,
    total: 0,
    totalPages: 1,
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
          experience: item.experience || "Not specified",
          role: item.role || "Care Assistant",
          location: item.location || "United Kingdom",
          applied: item.applied || (item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Recent"),
          status: normalizeStatus(item.status),
          matchScore: item.matchScore || 0,
          verified: item.verified ?? false,
          notes: item.notes || "",
          documents: Array.isArray(item.documents) ? item.documents : [],
        }));
        setApplicants(formatted);

        if (response.meta) {
          setMeta(response.meta);
        }
      } else {
        setApplicants([]);
      }
    } catch (err: any) {
      console.warn("Could not load applicants:", err?.message);
      setApplicants([]);
      setError(err?.message || "Failed to load applicants");
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
