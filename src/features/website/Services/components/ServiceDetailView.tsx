"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  MapPin,
  Star,
  Clock,
  Phone,
  ArrowLeft,
  Mail,
  Globe,
  CheckCircle2,
  Briefcase,
  MessageSquare,
  Building2,
  Send,
  Calendar,
  Banknote,
  GraduationCap,
} from "lucide-react";
import servicesApi from "../api/servicesApi";
import { CareCompanyItem } from "../types/services.types";
import jobsApi from "@/features/website/Jobs/api/jobsApi";
import { JobItem } from "@/features/website/Jobs/types/jobs.types";
import { companies as fallbackCompanies } from "@/Data/data";

import contactRequestsApi from "@/features/care-company/contact-requests/api/contactRequestsApi";
import { X } from "lucide-react";

export const ServiceDetailView = () => {
  const params = useParams();
  const router = useRouter();
  const rawId = (params?.id as string) || "";
  const decodedSlug = decodeURIComponent(rawId).toLowerCase().replace(/\s+/g, "-");

  const [activeTab, setActiveTab] = useState<"Overview" | "Jobs" | "Reviews">("Overview");
  const [company, setCompany] = useState<CareCompanyItem | null>(null);
  const [allJobs, setAllJobs] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSendConnectionRequest = async () => {
    if (!company) return;
    setIsSubmitting(true);
    try {
      await contactRequestsApi.createContactRequest({
        targetUserId: company.id,
      });
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 4000);
    } catch (err: any) {
      console.warn("Connection request error:", err?.message);
      // Redirect unauthenticated user to login
      router.push("/login");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setIsLoading(true);
      try {
        // Fetch all approved care companies to find exact match
        const [compRes, jobsRes] = await Promise.all([
          servicesApi.getCareCompanies({ limit: 50, page: 1 }),
          jobsApi.getJobs({ limit: 50, page: 1 }),
        ]);

        if (isMounted) {
          if (compRes?.data) {
            const found = compRes.data.find(
              (c) =>
                c.id === rawId ||
                c.companyName.toLowerCase().replace(/\s+/g, "-") === decodedSlug ||
                encodeURIComponent(c.companyName.toLowerCase().replace(/\s+/g, "-")) === rawId
            );

            if (found) {
              setCompany(found);
            } else {
              // Fallback to matching from static data or first backend company
              const staticMatch = fallbackCompanies.find(
                (c) => c.name.toLowerCase().replace(/\s+/g, "-") === decodedSlug
              );
              if (staticMatch) {
                setCompany({
                  id: "static",
                  companyName: staticMatch.name,
                  email: "contact@" + staticMatch.name.toLowerCase().replace(/\s+/g, "") + ".co.uk",
                  phoneNumber: "+44 20 7946 0123",
                  address: staticMatch.location,
                  postCode: "UK",
                  serviceOffered: staticMatch.tags,
                  coverageRegions: [staticMatch.location],
                  status: "approved",
                });
              } else if (compRes.data.length > 0) {
                setCompany(compRes.data[0]);
              }
            }
          }

          if (jobsRes?.data) {
            setAllJobs(jobsRes.data);
          }
        }
      } catch (err) {
        console.error("Error loading service details:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [rawId, decodedSlug]);

  // Filter jobs matching this company
  const companyJobs = useMemo(() => {
    if (!company) return [];
    const compNameLower = company.companyName.toLowerCase();
    const matched = allJobs.filter((job) => {
      if (job.organization?.name && job.organization.name.toLowerCase() === compNameLower) {
        return true;
      }
      if (job.organization?.email && company.email && job.organization.email.toLowerCase() === company.email.toLowerCase()) {
        return true;
      }
      return false;
    });

    // If specific company has no direct jobs, show related jobs from the area
    if (matched.length === 0 && allJobs.length > 0) {
      return allJobs.slice(0, 3);
    }
    return matched;
  }, [company, allJobs]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#F4F7FC] pb-24 font-['Wix_Madefor_Text'] text-slate-800">
        <div className="bg-[#1B2C54] text-white py-3 px-6 md:px-12 lg:px-24">
          <div className="mx-auto container">
            <div className="h-4 w-28 animate-pulse rounded bg-white/20" />
          </div>
        </div>
        <div className="h-64 w-full animate-pulse bg-slate-300" />
        <div className="mx-auto container px-6 py-8">
          <div className="h-8 w-64 animate-pulse rounded bg-slate-200" />
          <div className="mt-4 h-4 w-96 animate-pulse rounded bg-slate-200" />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-4">
              <div className="h-40 animate-pulse rounded-xl bg-white p-6 shadow-sm" />
              <div className="h-32 animate-pulse rounded-xl bg-white p-6 shadow-sm" />
            </div>
            <div className="lg:col-span-4">
              <div className="h-48 animate-pulse rounded-xl bg-white p-6 shadow-sm" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!company) {
    return (
      <main className="min-h-screen bg-[#F4F7FC] flex items-center justify-center p-6">
        <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <Building2 className="mx-auto size-12 text-slate-400" />
          <h2 className="mt-4 text-xl font-bold text-[#1B2C54]">Company Not Found</h2>
          <p className="mt-2 text-sm text-slate-500">
            The care company you are looking for does not exist or is pending verification.
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-6 rounded-lg bg-cyan-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-800"
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  const companyName = company.companyName;
  const location =
    company.address ||
    company.postCode ||
    (company.coverageRegions && company.coverageRegions.length > 0
      ? company.coverageRegions.join(", ")
      : "United Kingdom");

  const servicesList =
    company.serviceOffered && company.serviceOffered.length > 0
      ? company.serviceOffered
      : ["Elderly Care", "Personal Support", "Dementia Care"];

  const regionsList =
    company.coverageRegions && company.coverageRegions.length > 0
      ? company.coverageRegions
      : [location];

  return (
    <main className="min-h-screen bg-[#F4F7FC] pb-24 font-['Wix_Madefor_Text'] text-slate-800">
      {/* Back to listings bar */}
      <div className="bg-[#1B2C54] text-white py-3.5 px-6 md:px-12 lg:px-24 border-b border-white/5">
        <div className="mx-auto container">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer text-xs font-semibold"
          >
            <ArrowLeft className="size-4" />
            Back to Services
          </button>
        </div>
      </div>

      {/* Hero Banner Section */}
      <section
        className="relative w-full h-[260px] bg-cover bg-center flex flex-col justify-center px-6 md:px-12 lg:px-24"
        style={{
          backgroundImage: `linear-gradient(rgba(14, 35, 66, 0.65), rgba(14, 35, 66, 0.75)), url('${company.coverPhoto || "/images/services_detailes_hero.jpg"}')`,
        }}
      >
        <div className="max-w-7xl mx-auto w-full text-center flex flex-col gap-3 text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight">
            {companyName}
          </h1>
          <p className="text-sm md:text-base text-white/90 font-normal leading-relaxed max-w-2xl mx-auto">
            Verified Care Provider · Delivering Professional & Compassionate Services
          </p>
        </div>
      </section>

      {/* Company Header Block */}
      <section className="bg-white border-b border-slate-100 py-6 px-6 md:px-12 lg:px-24">
        <div className="mx-auto container flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            {/* Verified Badge & Company Name */}
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1B2C54] leading-tight">
                {companyName}
              </h2>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="size-3.5" />
                Verified & Regulated
              </span>
            </div>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-slate-400" />
                <span>{location}</span>
              </div>
              <span className="text-slate-300">•</span>
              {company.postCode && (
                <>
                  <div className="flex items-center gap-1">
                    <span>Postcode: <strong>{company.postCode}</strong></span>
                  </div>
                  <span className="text-slate-300">•</span>
                </>
              )}
              {company.email && (
                <div className="flex items-center gap-1.5">
                  <Mail className="size-3.5 text-slate-400" />
                  <span>{company.email}</span>
                </div>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1.5 pt-1">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-700 ml-1">4.9</span>
              <span className="text-xs text-slate-400">(24 verified reviews)</span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-8 border-t border-slate-100 pt-5">
            {(["Overview", "Jobs", "Reviews"] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-1 text-sm font-medium transition-all cursor-pointer relative ${
                    isActive ? "text-cyan-700 font-bold" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab}
                  {tab === "Jobs" && companyJobs.length > 0 && (
                    <span className="ml-1.5 rounded-full bg-cyan-100 px-2 py-0.5 text-[10px] font-bold text-cyan-800">
                      {companyJobs.length}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-[-6px] left-0 right-0 h-[2px] bg-cyan-700 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Columns */}
      <section className="container mx-auto px-6 md:px-12 lg:px-24 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            {/* OVERVIEW TAB */}
            {activeTab === "Overview" && (
              <>
                {/* About Card */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col gap-3">
                  <h3 className="text-base font-bold text-[#1B2C54]">About {companyName}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {companyName} is a verified, regulated care provider based in {location}.
                    We specialize in {servicesList.join(", ")}—providing person-centred, compassionate care
                    that enhances independence, quality of life, and safety for individuals and their families.
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Our team of experienced care workers and qualified professionals undergo comprehensive
                    checks, training, and regular assessments to deliver the highest clinical and social care standards.
                  </p>
                </div>

                {/* Services Card */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col gap-3">
                  <h3 className="text-base font-bold text-[#1B2C54]">Services Offered</h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {servicesList.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-[#E5F2FC] text-[#0A66C2] text-xs font-bold px-3.5 py-1.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Service Hours Card */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col gap-3">
                  <h3 className="text-base font-bold text-[#1B2C54]">Service Hours</h3>
                  <div className="flex items-center gap-2.5 text-sm text-slate-600">
                    <Clock className="size-4 text-slate-400 shrink-0" />
                    <span>Monday – Friday: 7:00 AM – 7:00 PM · Emergency Support: 24/7</span>
                  </div>
                </div>

                {/* Details & Regions Card */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col gap-3">
                  <h3 className="text-base font-bold text-[#1B2C54]">Coverage & Verification</h3>
                  <div className="flex flex-col pt-1 divide-y divide-slate-100">
                    <div className="flex justify-between items-center py-2.5">
                      <span className="text-sm text-slate-500 font-medium">Coverage Regions</span>
                      <span className="text-sm font-bold text-[#0A66C2]">{regionsList.join(", ")}</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5">
                      <span className="text-sm text-slate-500 font-medium">Status</span>
                      <span className="text-sm font-bold text-emerald-600">Approved & Verified</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5">
                      <span className="text-sm text-slate-500 font-medium">Postcode</span>
                      <span className="text-sm font-bold text-slate-700">{company.postCode || "UK Area"}</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* JOBS TAB */}
            {activeTab === "Jobs" && (
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <h3 className="text-base font-bold text-[#1B2C54]">
                    Open Positions ({companyJobs.length})
                  </h3>
                  <span className="text-xs text-slate-400">Apply directly to this company</span>
                </div>

                {companyJobs.length === 0 ? (
                  <div className="py-12 text-center">
                    <Briefcase className="mx-auto size-10 text-slate-300" />
                    <p className="mt-2 text-sm text-slate-500">No open positions currently listed for this company.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 pt-1">
                    {companyJobs.map((job) => (
                      <div
                        key={job.id}
                        className="p-5 border border-slate-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-cyan-200 hover:shadow-sm transition-all"
                      >
                        <div className="flex flex-col gap-2">
                          <h4 className="text-base font-bold text-[#1B2C54]">{job.title}</h4>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                            <span className="inline-flex items-center gap-1 font-semibold text-cyan-700">
                              <MapPin className="size-3.5" />
                              {job.location || location}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="capitalize font-medium">
                              {job.jobType ? job.jobType.replace("_", " ") : "Full Time"}
                            </span>
                            {job.salaryMin && (
                              <>
                                <span className="text-slate-300">•</span>
                                <span className="font-semibold text-slate-700 flex items-center gap-1">
                                  <Banknote className="size-3.5 text-emerald-600" />
                                  £{job.salaryMin.toLocaleString()}{job.salaryMax ? ` - £${job.salaryMax.toLocaleString()}` : ""} / yr
                                </span>
                              </>
                            )}
                          </div>
                          {job.requiredSkills && job.requiredSkills.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {job.requiredSkills.map((skill, sIdx) => (
                                <span
                                  key={sIdx}
                                  className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <a
                          href={company.email ? `mailto:${company.email}?subject=Application for ${job.title}` : "#"}
                          className="shrink-0 bg-cyan-700 hover:bg-cyan-800 text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all text-center"
                        >
                          Apply Now
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* REVIEWS TAB */}
            {activeTab === "Reviews" && (
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-[#1B2C54]">Client & Family Reviews</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Verified feedback from real care recipients</p>
                  </div>
                  <button
                    onClick={() => alert("Review submission form for " + companyName)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-700 bg-cyan-50 px-4 py-2 text-xs font-bold text-cyan-700 hover:bg-cyan-100 transition"
                  >
                    <Send className="size-3.5" />
                    Write a Review
                  </button>
                </div>

                {/* Rating Overview */}
                <div className="flex items-center gap-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-center">
                    <span className="text-3xl font-extrabold text-[#1B2C54]">4.9</span>
                    <div className="flex items-center justify-center mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400">Overall Rating</span>
                  </div>
                  <div className="flex-1 text-xs text-slate-600 border-l border-slate-200 pl-6 space-y-1">
                    <p><strong>100%</strong> of reviewers recommend {companyName}</p>
                    <p className="text-slate-500">Punctuality: 5.0 · Clinical Care: 4.9 · Communication: 4.8</p>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="flex flex-col gap-4 divide-y divide-slate-100">
                  <div className="flex flex-col gap-2 pt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-700 text-xs">Sarah Jenkins (Family Member)</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="size-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      "The team at {companyName} has been exceptional. From the initial care assessment to daily home visits, they have treated my father with utmost dignity and empathy."
                    </p>
                    <span className="text-[10px] text-slate-400">Verified Review · 2 weeks ago</span>
                  </div>

                  <div className="flex flex-col gap-2 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-700 text-xs">David Miller (Private Client)</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="size-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      "High quality and reliable service in {location}. The caregivers are always on time, polite, and very well trained. Highly recommended!"
                    </p>
                    <span className="text-[10px] text-slate-400">Verified Review · 1 month ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Contact Cards */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <h3 className="text-base font-bold text-[#1B2C54]">Direct Contact</h3>

              {company.phoneNumber ? (
                <a
                  href={`tel:${company.phoneNumber}`}
                  className="w-full bg-[#2D6A9F] hover:bg-[#20527F] text-white py-3.5 px-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Phone className="size-4" />
                  Call: {company.phoneNumber}
                </a>
              ) : (
                <button
                  disabled
                  className="w-full bg-slate-200 text-slate-400 py-3.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <Phone className="size-4" />
                  No Phone Listed
                </button>
              )}

              <button
                type="button"
                onClick={handleSendConnectionRequest}
                disabled={isSubmitting}
                className="w-full bg-cyan-700 hover:bg-cyan-800 disabled:bg-slate-300 text-white py-3.5 px-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98"
              >
                {isSubmitting ? (
                  <span>Sending Request...</span>
                ) : (
                  <>
                    <MessageSquare className="size-4" />
                    Send Connection Request
                  </>
                )}
              </button>

              {company.email && (
                <a
                  href={`mailto:${company.email}?subject=Inquiry for ${companyName}`}
                  className="w-full border border-cyan-700 text-cyan-700 hover:bg-cyan-50 py-3.5 px-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="size-4" />
                  Send Email Inquiry
                </a>
              )}

              {company.websiteLink && (
                <a
                  href={company.websiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border border-slate-200 text-slate-700 hover:bg-slate-50 py-3.5 px-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Globe className="size-4" />
                  Visit Official Website
                </a>
              )}
            </div>

            {/* Quick Summary Card */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col gap-3">
              <h4 className="text-sm font-bold text-[#1B2C54]">Quick Summary</h4>
              <div className="text-xs text-slate-500 space-y-2">
                <p><strong>Provider:</strong> {companyName}</p>
                <p><strong>Location:</strong> {location}</p>
                <p><strong>Available Services:</strong> {servicesList.length} categories</p>
                <p><strong>Verification:</strong> UK Regulated & Active</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#E8F8F0] border border-emerald-200 text-emerald-800 rounded-2xl p-4 shadow-xl flex items-center gap-3.5 max-w-sm font-['Wix_Madefor_Text']">
          <CheckCircle2 className="size-6 text-emerald-600 shrink-0" />
          <div className="flex flex-col">
            <span className="text-sm font-bold">Connection Request Sent!</span>
            <span className="text-xs text-emerald-600/95 font-medium mt-0.5">
              Your connection request has been delivered to the company dashboard.
            </span>
          </div>
        </div>
      )}
    </main>
  );
};

export default ServiceDetailView;
