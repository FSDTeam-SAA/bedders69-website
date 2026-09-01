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
} from "lucide-react";

function getStatusTone(status?: string) {
  const s = (status || "").toLowerCase();
  if (s === "pending") return "bg-yellow-600/10 text-yellow-600";
  if (s === "reviewed") return "bg-fuchsia-900/10 text-fuchsia-900";
  if (s === "shortlisted") return "bg-fuchsia-600/10 text-fuchsia-600";
  if (s === "interview") return "bg-teal-400/10 text-teal-600";
  if (s === "offered" || s === "accepted") return "bg-blue-600/10 text-blue-600";
  if (s === "rejected" || s === "withdrawn") return "bg-red-600/10 text-red-600";
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

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [profileRes, appsRes] = await Promise.all([
          fetch("/api/care/profile", { cache: "no-store" }),
          fetch("/api/care/my-applications?limit=20&sortBy=createdAt&sortOrder=desc", { cache: "no-store" }),
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
      } catch (e) {
        console.error("Unable to load overview data", e);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const appliedJobsCount = String(totalApplications).padStart(2, "0");
  const profileViewsCount = String(profile?.profileViews || 0).padStart(2, "0");
  const interviewsCount = String(
    applications.filter((a) => String(a.status).toLowerCase() === "interview").length
  ).padStart(2, "0");
  const totalQuoteCount = "12";

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
      label: "Total Quote",
      value: totalQuoteCount,
      icon: UserRoundSearch,
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
      <div className="px-6 py-6 sm:px-8 xl:px-10">
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

        <section className="mt-6 grid gap-4 2xl:grid-cols-2">
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
