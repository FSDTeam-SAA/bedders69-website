"use client";

import React, { useState, useEffect } from "react";
import {
  BadgeCheck,
  Circle,
  BriefcaseBusiness,
  CalendarClock,
  Eye,
  FileCheck2,
  ShieldCheck,
  UserRoundSearch,
  Loader2,
  Check,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Clock,
  Phone,
} from "lucide-react";

function getStatusTone(status?: string) {
  const s = (status || "").toLowerCase();
  if (s === "pending") return "bg-yellow-600/10 text-yellow-600";
  if (s === "reviewed") return "bg-fuchsia-900/10 text-fuchsia-900";
  if (s === "shortlisted") return "bg-fuchsia-600/10 text-fuchsia-600";
  if (s === "interview") return "bg-teal-400/10 text-teal-600";
  if (s === "offered" || s === "accepted") return "bg-blue-600/10 text-blue-600";
  if (s === "rejected" || s === "declined" || s === "withdrawn") return "bg-red-600/10 text-red-600";
  return "bg-slate-200 text-slate-700";
}

function isDocUploaded(
  profile: Record<string, any> | null,
  keywords: string[],
  fallbackIndex: number
): boolean {
  if (!profile) return false;
  const docs: string[] = Array.isArray(profile.documents) ? profile.documents : [];

  const matched = docs.some((url) => {
    const lower = String(url).toLowerCase();
    return keywords.some((kw) => lower.includes(kw));
  });

  if (matched) return true;
  return docs.length >= fallbackIndex;
}

export function CarersPage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Record<string, any> | null>(null);
  const [applications, setApplications] = useState<Array<Record<string, any>>>([]);
  const [totalApplications, setTotalApplications] = useState(0);

  const [contactRequests, setContactRequests] = useState<Array<Record<string, any>>>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const [profileRes, appsRes, requestsRes] = await Promise.all([
        fetch("/api/care/profile", { cache: "no-store" }),
        fetch("/api/care/my-applications?limit=20&sortBy=createdAt&sortOrder=desc", { cache: "no-store" }),
        fetch("/api/care/contact-requests", { cache: "no-store" }),
      ]);

      if (profileRes.ok) {
        const pBody = await profileRes.json();
        setProfile(pBody.data ?? pBody);
      }

      if (appsRes.ok) {
        const aBody = await appsRes.json();
        const appList = aBody.data || [];
        setApplications(appList);
        setTotalApplications(aBody.meta?.total || appList.length);
      }

      if (requestsRes.ok) {
        const rBody = await requestsRes.json();
        setContactRequests(rBody.data || []);
      }
    } catch (e) {
      console.error("Unable to load overview data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: "Accepted" | "Rejected") => {
    try {
      setUpdatingId(id);
      const res = await fetch(`/api/care/contact-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        throw new Error("Failed to update status");
      }
      setContactRequests((prev) =>
        prev.map((req) =>
          (req._id === id || req.id === id) ? { ...req, status: newStatus } : req
        )
      );
      triggerToast(
        `Contact request from agency has been ${newStatus === "Accepted" ? "accepted" : "declined"}.`
      );
    } catch (err: any) {
      alert(err?.message || "Failed to update request status");
    } finally {
      setUpdatingId(null);
    }
  };

  const appliedJobsCount = String(totalApplications).padStart(2, "0");
  const profileViewsCount = String(profile?.profileViews || 0).padStart(2, "0");
  const interviewsCount = String(
    applications.filter((a) => String(a.status).toLowerCase() === "interview").length
  ).padStart(2, "0");
  const inquiriesCount = String(contactRequests.length).padStart(2, "0");

  const stats = [
    {
      label: "Applied Jobs",
      value: appliedJobsCount,
      icon: BriefcaseBusiness,
    },
    {
      label: "Profile Views",
      value: profileViewsCount,
      icon: Eye,
    },
    {
      label: "Interviews",
      value: interviewsCount,
      icon: CalendarClock,
    },
    {
      label: "Agency Inquiries",
      value: inquiriesCount,
      icon: MessageSquare,
    },
  ];

  const completionItems = [
    {
      label: "CV / Resume",
      complete: Boolean(profile?.cv && String(profile.cv).trim() !== ""),
    },
    {
      label: "DBS Certificate",
      complete:
        Boolean(profile?.dbsCertificate && String(profile.dbsCertificate).trim() !== "") ||
        isDocUploaded(profile, ["dbs", "police", "crb", "background"], 1),
    },
    {
      label: "Care Certificate",
      complete:
        Boolean(profile?.careCertificate && String(profile.careCertificate).trim() !== "") ||
        isDocUploaded(profile, ["care_cert", "care-cert", "carecert"], 2),
    },
    {
      label: "Training Certificates",
      complete:
        Boolean(profile?.trainingCertificates && profile.trainingCertificates.length > 0) ||
        isDocUploaded(profile, ["training", "course", "workshop"], 3),
    },
    {
      label: "First Aid Certificate",
      complete:
        Boolean(profile?.firstAidCertificate && String(profile.firstAidCertificate).trim() !== "") ||
        isDocUploaded(profile, ["first_aid", "first-aid", "firstaid"], 4),
    },
    {
      label: "Qualification Certificates",
      complete:
        Boolean(profile?.qualificationCertificates && profile.qualificationCertificates.length > 0) ||
        isDocUploaded(profile, ["qualification", "degree", "diploma", "nvq"], 5),
    },
  ];

  const completedCount = completionItems.filter((i) => i.complete).length;
  const profileStrength = Math.round((completedCount / completionItems.length) * 100);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-white px-6 py-12">
        <div className="flex items-center gap-3 text-cyan-700">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-lg font-medium">Loading Overview...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-emerald-600 px-5 py-3 text-white shadow-xl animate-fade-in">
          <Check className="h-5 w-5 shrink-0" />
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      <div className="px-6 py-6 sm:px-8 xl:px-10 space-y-6">
        <section className="grid gap-4 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className="flex min-h-[100px] items-start gap-5 rounded-xl bg-[#eef6ff] p-5"
              >
                <div className="inline-flex rounded-[84px] bg-[#dceeff] p-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center">
                    <Icon className="h-8 w-8 text-cyan-700" strokeWidth={1.8} />
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-xl font-medium leading-6 text-slate-700">{stat.label}</p>
                  <p className="text-[40px] font-semibold leading-[48px] text-black">{stat.value}</p>
                </div>
              </article>
            );
          })}
        </section>

        {/* Agency Inquiries & Contact Requests Section */}
        <section className="space-y-4">
          <h2 className="text-3xl font-semibold leading-10 text-slate-800">
            Agency Inquiries & Contact Requests
          </h2>

          <div className="overflow-hidden rounded-2xl bg-[#eef6ff] border border-cyan-700/10">
            {contactRequests.length === 0 ? (
              <div className="p-8 text-center text-slate-500 font-medium">
                No agency contact requests received yet.
              </div>
            ) : (
              contactRequests.map((req, index) => {
                const id = req._id || req.id;
                const status = req.status || "Pending";
                const isPending = status.toLowerCase() === "pending";
                const isUpdating = updatingId === id;

                return (
                  <div key={id || index}>
                    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold text-slate-800">
                            {req.name || "Care Agency"}
                          </h3>
                          <span className="px-3 py-0.5 rounded-full bg-cyan-700/10 text-cyan-800 text-xs font-semibold">
                            {req.category || "Recruitment Agency"}
                          </span>
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
                          "{req.message || "Agency requested to connect with you."}"
                        </p>

                        <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="size-3.5" />
                            {req.time || "Recently"}
                          </span>
                          {req.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="size-3.5" />
                              {req.phone}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Status & Actions */}
                      <div className="flex items-center gap-3 shrink-0 sm:self-center">
                        <span
                          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold ${getStatusTone(
                            status
                          )}`}
                        >
                          {status}
                        </span>

                        {isPending && (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              disabled={isUpdating}
                              onClick={() => handleStatusChange(id, "Accepted")}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-50 shadow-xs"
                            >
                              {isUpdating ? (
                                <Loader2 className="size-3.5 animate-spin" />
                              ) : (
                                <CheckCircle2 className="size-3.5" />
                              )}
                              <span>Accept</span>
                            </button>
                            <button
                              type="button"
                              disabled={isUpdating}
                              onClick={() => handleStatusChange(id, "Rejected")}
                              className="px-4 py-2 bg-white hover:bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-50 shadow-xs"
                            >
                              {isUpdating ? (
                                <Loader2 className="size-3.5 animate-spin" />
                              ) : (
                                <XCircle className="size-3.5" />
                              )}
                              <span>Decline</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {index < contactRequests.length - 1 && (
                      <div className="h-px w-full bg-slate-200/80" />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>

        <section className="grid gap-4 2xl:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold leading-10 text-slate-800">
              Application Tracker
            </h2>
            <div className="overflow-hidden rounded-2xl bg-[#eef6ff]">
              {applications.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  No job applications found yet.
                </div>
              ) : (
                applications.map((app, index) => {
                  const jobTitle = app.jobId?.title || app.title || "Care Position";
                  const companyName = app.jobId?.companyId?.companyName || app.company || "Care Organization";
                  const statusStr = app.status
                    ? String(app.status).charAt(0).toUpperCase() + String(app.status).slice(1)
                    : "Pending";
                  const tone = getStatusTone(app.status);

                  return (
                    <div key={app._id || `${jobTitle}-${index}`}>
                      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:px-5 sm:py-3.5">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold leading-6 text-slate-800">
                            {jobTitle}
                          </h3>
                          <p className="mt-1 text-sm leading-4 text-gray-500">
                            {companyName}
                          </p>
                        </div>
                        <span className={`inline-flex rounded-full px-4 py-1.5 text-sm font-medium ${tone}`}>
                          {statusStr}
                        </span>
                      </div>
                      {index < applications.length - 1 ? (
                        <div className="h-px w-full bg-neutral-300" />
                      ) : null}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-semibold leading-10 text-slate-800">
              Profile Completion
            </h2>
            <div className="overflow-hidden rounded-2xl bg-[#eef6ff]">
              {completionItems.map((item, index) => (
                <div key={item.label}>
                  <div className="flex items-center gap-4 p-4 sm:px-5 sm:py-4">
                    <div
                      className={`inline-flex rounded-[66px] p-2.5 ${
                        item.complete ? "bg-cyan-700" : "bg-neutral-300"
                      }`}
                    >
                      {item.complete ? (
                        <FileCheck2 className="h-5 w-5 text-white" strokeWidth={1.8} />
                      ) : (
                        <Circle className="h-4 w-4 text-neutral-400 fill-neutral-400" strokeWidth={1.6} />
                      )}
                    </div>
                    <div className="flex-1 text-xl font-semibold leading-7 text-zinc-900 sm:text-[22px]">
                      {item.label}
                    </div>
                    {item.complete ? (
                      <BadgeCheck className="h-5 w-5 text-cyan-700" strokeWidth={1.8} />
                    ) : (
                      <ShieldCheck className="h-5 w-5 text-neutral-400" strokeWidth={1.8} />
                    )}
                  </div>
                  {index < completionItems.length - 1 ? (
                    <div className="h-px w-full bg-neutral-300" />
                  ) : null}
                </div>
              ))}
              <div className="border-t border-neutral-300 px-4 py-3 sm:px-5">
                <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
                  <span>Profile Strength</span>
                  <span className="text-cyan-700 font-semibold">{profileStrength}%</span>
                </div>
                <div className="h-2 rounded-full bg-neutral-300/80">
                  <div
                    className="h-2 rounded-full bg-cyan-700 transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(0, profileStrength))}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

