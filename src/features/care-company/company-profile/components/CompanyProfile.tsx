"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CareCompanySidebar from "@/features/care-company/components/CareCompanySidebar";
import CareCompanyHeaderBadge from "@/features/care-company/components/CareCompanyHeaderBadge";
import {
  CalendarPlus,
  Clock3,
  MapPin,
  Pencil,
  Star,
  Loader2,
  Briefcase,
} from "lucide-react";
import { useCompanyProfile } from "../hooks/useCompanyProfile";
import createJobApi from "@/features/care-company/create-job/api/createJobApi";
import { JobItem } from "@/features/care-company/create-job/types/createJob.types";

export default function CompanyProfile() {
  const { profile, isLoading } = useCompanyProfile();
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [jobsLoading, setJobsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function loadJobs() {
      try {
        const res = await createJobApi.getMyJobs();
        if (isMounted && res?.data && Array.isArray(res.data)) {
          setJobs(res.data);
        }
      } catch (e) {
        // Silently keep empty list if no jobs found or not authenticated
      } finally {
        if (isMounted) setJobsLoading(false);
      }
    }
    loadJobs();
    return () => {
      isMounted = false;
    };
  }, []);

  const companyName = profile?.companyName?.trim();
  const tradingName = profile?.tradingName?.trim() || companyName;
  const about = profile?.about?.trim();
  const services: string[] = Array.isArray(profile?.serviceOffered)
    ? profile.serviceOffered.filter(Boolean)
    : [];
  const serviceHours = profile?.serviceHours?.trim();
  const serviceArea = [profile?.address?.trim(), profile?.postCode?.trim()]
    .filter(Boolean)
    .join(", ");
  const founded = profile?.founded?.trim();
  const staff = profile?.staffCount?.trim();
  const locations = profile?.locationsCount?.trim();
  const rating = profile?.cqcRating?.trim();
  const logo = profile?.logo?.trim();

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-['Wix_Madefor_Text',Arial,sans-serif] text-[#203746]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1920px] flex-col lg:flex-row">
        <CareCompanySidebar activeHref="/care-company/company-profile" />

        <div className="min-w-0 flex-1">
          <header className="flex min-h-[100px] items-center justify-between bg-white px-6 py-[26px] border-b border-[#f0f1f2]">
            <div>
              <h1 className="text-2xl font-bold leading-7 text-[#2b6ea6]">Company Profile</h1>
              <p className="mt-2 text-xs leading-4 text-[#667481]">Your public company profile on the platform</p>
            </div>
            <CareCompanyHeaderBadge />
          </header>

          <div className="space-y-6 p-4 sm:p-6">
            <div className="flex justify-end">
              <Link
                href="/care-company/company-profile/edit"
                className="flex h-[54px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#2b6ea6] px-6 py-4 text-base font-semibold leading-5 text-white transition-colors hover:bg-[#245e8f]"
              >
                <Pencil className="h-4 w-4" strokeWidth={1.8} />
                Edit Profile
              </Link>
            </div>

            {isLoading ? (
              <div className="flex min-h-[300px] items-center justify-center rounded-2xl bg-white p-12 shadow-sm">
                <Loader2 className="h-8 w-8 animate-spin text-[#2b6ea6]" />
              </div>
            ) : (
              <>
                <section className="rounded-t-2xl bg-white p-6">
                  <h2 className="text-[32px] font-semibold leading-10 text-[#203746]">
                    {companyName || "No Company Name Provided"}
                  </h2>
                  {rating ? (
                    <div className="mt-2.5 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-md bg-[#eaf1f6] px-2.5 py-1 text-xs font-semibold text-[#2b6ea6]">
                        {rating}
                      </span>
                    </div>
                  ) : (
                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-xs text-[#8a98a5]">
                      <Star className="h-4 w-4 text-slate-300" strokeWidth={1.5} />
                      <span>No reviews yet</span>
                    </div>
                  )}
                </section>

                <div className="space-y-4">
                  <ProfileCard title="About">
                    {about ? (
                      <p className="max-w-[999px] text-base leading-relaxed text-[#667481] whitespace-pre-line">
                        {about}
                      </p>
                    ) : (
                      <p className="text-sm text-[#8a98a5] italic">No description provided.</p>
                    )}
                  </ProfileCard>

                  <ProfileCard title="Services">
                    {services.length > 0 ? (
                      <div className="flex flex-wrap items-center gap-2">
                        {services.map((service) => (
                          <span
                            key={service}
                            className="flex h-6 items-center justify-center rounded-full bg-[#eaf1f6] px-3 text-center text-xs font-semibold leading-4 text-[#2b6ea6]"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-[#8a98a5] italic">No services listed.</p>
                    )}
                  </ProfileCard>

                  <ProfileCard title="Service Hours">
                    {serviceHours ? (
                      <div className="flex items-start gap-2 text-base leading-5 text-[#667481]">
                        <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[#2b6ea6]" strokeWidth={1.7} />
                        <span>{serviceHours}</span>
                      </div>
                    ) : (
                      <p className="text-sm text-[#8a98a5] italic">No service hours specified.</p>
                    )}
                  </ProfileCard>

                  <ProfileCard title="Other Information">
                    <dl className="w-full space-y-2 text-base leading-5">
                      <InfoRow label="Staff" value={staff || "Not specified"} isMuted={!staff} />
                      <InfoRow label="Locations" value={locations || "Not specified"} isMuted={!locations} />
                      <InfoRow label="Rating" value={rating || "Not specified"} isMuted={!rating} />
                    </dl>
                  </ProfileCard>

                  <ProfileCard title="Founded">
                    {founded ? (
                      <div className="flex items-center gap-1.5 text-base leading-5 text-[#667481]">
                        <CalendarPlus className="h-4 w-4 text-[#2b6ea6]" strokeWidth={1.4} />
                        <span>{founded}</span>
                      </div>
                    ) : (
                      <p className="text-sm text-[#8a98a5] italic">Not specified</p>
                    )}
                  </ProfileCard>

                  <ProfileCard title="Service Area">
                    {serviceArea ? (
                      <div className="flex items-center gap-1.5 text-base leading-5 text-[#667481]">
                        <MapPin className="h-4 w-4 text-[#2b6ea6]" strokeWidth={1.7} />
                        <span>{serviceArea}</span>
                      </div>
                    ) : (
                      <p className="text-sm text-[#8a98a5] italic">No service area specified.</p>
                    )}
                  </ProfileCard>

                  <ProfileCard title="Jobs">
                    {jobsLoading ? (
                      <div className="flex items-center justify-center py-6 w-full">
                        <Loader2 className="h-5 w-5 animate-spin text-[#2b6ea6]" />
                      </div>
                    ) : jobs.length > 0 ? (
                      <div className="w-full space-y-4">
                        {jobs.map((job) => {
                          const details = [
                            job.jobType ? job.jobType.replace(/_/g, " ") : null,
                            job.salaryMin
                              ? `£${job.salaryMin.toLocaleString()}${job.salaryMax ? `–£${job.salaryMax.toLocaleString()}` : ""}`
                              : null,
                            job.location || job.city || null,
                          ]
                            .filter(Boolean)
                            .join(" · ");

                          return (
                            <Job
                              key={job._id || job.id}
                              title={job.title}
                              details={details || "Job details"}
                            />
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-6 text-center w-full">
                        <Briefcase className="h-8 w-8 text-slate-300 mb-2" strokeWidth={1.5} />
                        <p className="text-sm font-medium text-slate-500">No job posts found.</p>
                        <Link
                          href="/care-company/create-job"
                          className="mt-2 text-xs font-semibold text-[#2b6ea6] hover:underline"
                        >
                          + Post a new job
                        </Link>
                      </div>
                    )}
                  </ProfileCard>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function ProfileCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col items-start gap-3 rounded-xl border border-[#f0f1f2] bg-white p-5">
      <h2 className="text-2xl font-semibold leading-7 text-[#203746]">{title}</h2>
      {children}
    </section>
  );
}

function InfoRow({
  label,
  value,
  isMuted,
}: {
  label: string;
  value: string;
  isMuted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-6">
      <dt className="text-[#667481]">{label}</dt>
      <dd
        className={`text-right ${
          isMuted ? "text-[#8a98a5] italic font-normal" : "font-semibold text-[#2b6ea6]"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

function Job({ title, details }: { title: string; details: string }) {
  return (
    <article className="rounded-lg bg-white p-6 shadow-[0_4px_6px_rgba(0,0,0,0.06)] border border-slate-100">
      <h3 className="text-lg font-semibold leading-5 text-[#2b6ea6]">{title}</h3>
      <p className="mt-2 text-sm leading-4 text-[#667481] capitalize">{details}</p>
    </article>
  );
}
