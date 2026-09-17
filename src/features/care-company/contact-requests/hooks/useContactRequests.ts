"use client";

import { useState, useEffect, useCallback } from "react";
import contactRequestsApi from "../api/contactRequestsApi";
import {
  ContactRequest,
  ContactRequestCounts,
} from "../types/contactRequests.types";

const normalizeStatus = (
  status: string
): ContactRequest["status"] => {
  const s = status ? status.toLowerCase() : "pending";
  if (s === "accepted") return "Accepted";
  if (s === "rejected") return "Rejected";
  return "Pending";
};

export function useContactRequests() {
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [activeTab, setActiveTab] = useState<
    "All" | "Accepted" | "Rejected" | "Pending"
  >("All");
  const [counts, setCounts] = useState<ContactRequestCounts>({
    all: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContactRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await contactRequestsApi.getContactRequests();
      const rawData = response?.data || [];
      const formatted: ContactRequest[] = rawData.map((item: any) => ({
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
        phone: item.phone || "N/A",
        createdAt: item.createdAt,
      }));
      setRequests(formatted);

      if (response?.counts) {
        setCounts(response.counts);
      } else {
        setCounts({
          all: formatted.length,
          pending: formatted.filter((r) => r.status === "Pending").length,
          accepted: formatted.filter((r) => r.status === "Accepted").length,
          rejected: formatted.filter((r) => r.status === "Rejected").length,
        });
      }
    } catch (err: any) {
      console.warn("Could not fetch contact requests:", err?.message);
      setError(err?.message || "Failed to load contact requests");
      setRequests([]);
      setCounts({ all: 0, pending: 0, accepted: 0, rejected: 0 });
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
