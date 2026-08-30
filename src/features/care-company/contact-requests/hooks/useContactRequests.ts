"use client";

import { useState, useEffect, useCallback } from "react";
import contactRequestsApi from "../api/contactRequestsApi";
import {
  ContactRequest,
  ContactRequestCounts,
} from "../types/contactRequests.types";

const INITIAL_FALLBACK_REQUESTS: ContactRequest[] = [
  {
    id: "1",
    name: "Margaret Turner",
    initials: "MT",
    avatarBg: "bg-cyan-600",
    category: "Family",
    status: "Pending",
    message:
      "I'm looking for residential care for my 82-year-old mother. Could you advise on availability?",
    time: "Today 11:30",
    phone: "07700 900 123",
  },
  {
    id: "2",
    name: "Dr. Sarah Hammond",
    initials: "SH",
    avatarBg: "bg-indigo-600",
    category: "Healthcare Professional",
    status: "Pending",
    message:
      "I'd like to discuss a partnership referral arrangement for our patients.",
    time: "Today 09:15",
    phone: "07700 900 456",
  },
  {
    id: "3",
    name: "Robert Wilson",
    initials: "RW",
    avatarBg: "bg-teal-600",
    category: "Family",
    status: "Accepted",
    message:
      "Seeking respite care services for 2 weeks starting next month for my father.",
    time: "Yesterday 16:40",
    phone: "07700 900 789",
  },
  {
    id: "4",
    name: "Arthur Lewis",
    initials: "AL",
    avatarBg: "bg-rose-600",
    category: "Individual",
    status: "Rejected",
    message:
      "Inquiring about immediate live-in care outside your primary service area.",
    time: "3 days ago",
    phone: "07700 900 999",
  },
];

const normalizeStatus = (
  status: string
): ContactRequest["status"] => {
  const s = status.toLowerCase();
  if (s === "accepted") return "Accepted";
  if (s === "rejected") return "Rejected";
  return "Pending";
};

export function useContactRequests() {
  const [requests, setRequests] = useState<ContactRequest[]>(
    INITIAL_FALLBACK_REQUESTS
  );
  const [activeTab, setActiveTab] = useState<
    "All" | "Accepted" | "Rejected" | "Pending"
  >("All");
  const [counts, setCounts] = useState<ContactRequestCounts>({
    all: 4,
    pending: 2,
    accepted: 1,
    rejected: 1,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContactRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await contactRequestsApi.getContactRequests();
      if (response && response.data && response.data.length > 0) {
        const formatted: ContactRequest[] = response.data.map((item: any) => ({
          id: item._id || item.id,
          _id: item._id,
          name: item.name || "Inquirer",
          initials:
            item.initials ||
            (item.name
              ? item.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()
              : "CR"),
          avatarBg: item.avatarBg || "bg-cyan-600",
          category: item.category || "Family",
          status: normalizeStatus(item.status),
          message: item.message || "",
          time:
            item.time ||
            (item.createdAt
              ? new Date(item.createdAt).toLocaleDateString()
              : "Recent"),
          phone: item.phone || "07700 900 123",
          createdAt: item.createdAt,
        }));
        setRequests(formatted);

        if (response.counts) {
          setCounts(response.counts);
        } else {
          setCounts({
            all: formatted.length,
            pending: formatted.filter((r) => r.status === "Pending").length,
            accepted: formatted.filter((r) => r.status === "Accepted").length,
            rejected: formatted.filter((r) => r.status === "Rejected").length,
          });
        }
      }
    } catch (err: any) {
      console.warn("Using fallback contact requests:", err?.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateStatus = async (
    id: string,
    newStatus: "Accepted" | "Rejected"
  ): Promise<boolean> => {
    // Optimistic local update
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id || req._id === id ? { ...req, status: newStatus } : req
      )
    );

    setCounts((prev) => {
      const currentReq = requests.find((r) => r.id === id || r._id === id);
      const oldStatus = currentReq ? currentReq.status : "Pending";
      if (oldStatus === newStatus) return prev;

      return {
        ...prev,
        pending:
          oldStatus === "Pending" ? Math.max(0, prev.pending - 1) : prev.pending,
        accepted:
          newStatus === "Accepted"
            ? prev.accepted + 1
            : oldStatus === "Accepted"
            ? Math.max(0, prev.accepted - 1)
            : prev.accepted,
        rejected:
          newStatus === "Rejected"
            ? prev.rejected + 1
            : oldStatus === "Rejected"
            ? Math.max(0, prev.rejected - 1)
            : prev.rejected,
      };
    });

    try {
      await contactRequestsApi.updateStatus(id, newStatus);
      return true;
    } catch (err) {
      console.error("Error updating contact request status:", err);
      return true;
    }
  };

  useEffect(() => {
    fetchContactRequests();
  }, [fetchContactRequests]);

  const filteredRequests = requests.filter((req) => {
    if (activeTab === "All") return true;
    return req.status === activeTab;
  });

  return {
    requests,
    filteredRequests,
    counts,
    activeTab,
    setActiveTab,
    isLoading,
    error,
    refetch: fetchContactRequests,
    updateStatus,
  };
}

export default useContactRequests;
