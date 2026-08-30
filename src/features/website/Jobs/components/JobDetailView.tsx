"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Briefcase,
  MapPin,
  Clock,
  Banknote,
  Building2,
  Calendar,
  CheckCircle2,
  ArrowLeft,
  Share2,
  Send,
  UploadCloud,
  FileText,
  X,
  Check,
  Award,
} from "lucide-react";
import jobsApi from "../api/jobsApi";
import { JobItem } from "../types/jobs.types";

function formatJobType(type?: string) {
  if (!type) return "Full-Time";
  return type
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("-");
}

export const JobDetailView = () => {
  const params = useParams();
  const router = useRouter();
  const rawId = (params?.id as string) || "";
  const decodedSlug = decodeURIComponent(rawId).toLowerCase().replace(/\s+/g, "-");

  const [job, setJob] = useState<JobItem | null>(null);
  const [allJobs, setAllJobs] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Application Modal state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [startDate, setStartDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadJob() {
      setIsLoading(true);
      try {
        const res = await jobsApi.getJobs({ limit: 50, page: 1 });
        if (res && res.data && isMounted) {
          setAllJobs(res.data);
          const found = res.data.find(
            (j) =>
              j.id === rawId ||
              j.title.toLowerCase().replace(/\s+/g, "-") === decodedSlug ||
              encodeURIComponent(j.title.toLowerCase().replace(/\s+/g, "-")) === rawId
          );
          if (found) {
            setJob(found);
          } else if (res.data.length > 0) {
            setJob(res.data[0]);
          }
        }
      } catch (err) {
        console.error("Error loading job details:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadJob();
    return () => {
      isMounted = false;
    };
  }, [rawId, decodedSlug]);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#F4F7FC] pb-24 font-['Wix_Madefor_Text'] text-slate-800">
        <div className="bg-[#1B2C54] text-white py-3.5 px-6 md:px-12 lg:px-24">
          <div className="mx-auto container">
            <div className="h-4 w-28 animate-pulse rounded bg-white/20" />
          </div>
        </div>
        <div className="h-64 w-full animate-pulse bg-slate-300" />
        <div className="mx-auto container px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="h-40 animate-pulse rounded-2xl bg-white p-6 shadow-sm" />
              <div className="h-64 animate-pulse rounded-2xl bg-white p-6 shadow-sm" />
            </div>
            <div className="lg:col-span-4">
              <div className="h-64 animate-pulse rounded-2xl bg-white p-6 shadow-sm" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="min-h-screen bg-[#F4F7FC] flex items-center justify-center p-6">
        <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <Briefcase className="mx-auto size-12 text-slate-400" />
          <h2 className="mt-4 text-xl font-bold text-[#1B2C54]">Job Not Found</h2>
          <p className="mt-2 text-sm text-slate-500">
            The care job vacancy you are looking for does not exist or has expired.
          </p>
          <button
            onClick={() => router.push("/jobs")}
            className="mt-6 rounded-lg bg-cyan-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-800"
          >
            Back to Jobs
          </button>
        </div>
      </main>
    );
  }

  const title = job.title;
  const companyName = job.organization?.name || "Verified Care Provider";
  const location =
    job.city || job.location || (job.postCode ? `UK (${job.postCode})` : "United Kingdom");
  const jobType = formatJobType(job.jobType);
  const salaryStr =
    job.salaryMin && job.salaryMax
      ? `£${job.salaryMin.toLocaleString()} – £${job.salaryMax.toLocaleString()} / year`
      : job.salaryMin
      ? `From £${job.salaryMin.toLocaleString()} / year`
      : "Competitive Salary";

  const skills =
    job.requiredSkills && job.requiredSkills.length > 0
      ? job.requiredSkills
      : ["Person-Centred Care", "Dementia Support", "Medication Assistance"];

  const expYears = job.requiredExperience || 2;

  // Other related jobs
  const relatedJobs = allJobs.filter((j) => j.id !== job.id).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#F4F7FC] pb-24 font-['Wix_Madefor_Text'] text-slate-800">
      {/* Back button header */}
      <div className="bg-[#1B2C54] text-white py-3.5 px-6 md:px-12 lg:px-24 border-b border-white/5">
        <div className="mx-auto container">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer text-xs font-semibold"
          >
            <ArrowLeft className="size-4" />
            Back to Jobs
          </button>
        </div>
      </div>

      {/* Hero Banner Section */}
      <section
        className="relative w-full py-16 px-6 md:px-12 lg:px-24 bg-cover bg-center text-white flex flex-col justify-center shadow-md"
        style={{
          backgroundImage: `linear-gradient(rgba(14, 35, 66, 0.8), rgba(14, 35, 66, 0.85)), url('/images/care_job.jpg')`,
        }}
      >
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-emerald-500/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {jobType}
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full">
              Verified Opportunity
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/90 font-medium">
            <div className="flex items-center gap-1.5 font-bold text-cyan-300">
              <Building2 className="size-4" />
              <span>{companyName}</span>
            </div>
            <span className="text-white/40">•</span>
            <div className="flex items-center gap-1.5">
              <MapPin className="size-4 text-white/70" />
              <span>{location}</span>
            </div>
            <span className="text-white/40">•</span>
            <div className="flex items-center gap-1.5 font-bold text-emerald-400">
              <Banknote className="size-4" />
              <span>{salaryStr}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details Layout */}
      <section className="container mx-auto px-6 md:px-12 lg:px-24 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Job Details */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Overview Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-4">
              <h2 className="text-xl font-bold text-[#1B2C54]">About the Role</h2>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                {job.description ||
                  `${companyName} is seeking a compassionate, skilled and committed ${title} to join our professional care team in ${location}. In this role, you will deliver high quality, person-centred support tailored to our residents and service users, ensuring their dignity, independence and safety.`}
              </p>
            </div>

            {/* Key Responsibilities Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-4">
              <h2 className="text-xl font-bold text-[#1B2C54]">Key Responsibilities</h2>
              <div className="flex flex-col gap-3">
                {[
                  "Provide compassionate, person-centred daily living assistance and emotional support.",
                  "Assist service users with mobility, personal hygiene, and daily care routines.",
                  "Administer prescribed medication in strict compliance with safety guidelines.",
                  "Maintain accurate and confidential daily care logs, incident reports, and care plan updates.",
                  "Communicate effectively with families, healthcare professionals, and multidisciplinary teams.",
                  "Promote independence, dignity, choice, and social engagement for all individuals.",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="size-4.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements & Skills Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-4">
              <h2 className="text-xl font-bold text-[#1B2C54]">Requirements & Required Skills</h2>
              <div className="flex flex-wrap gap-2 pt-1 pb-3 border-b border-slate-100">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-[#E5F2FC] text-[#0A66C2] text-xs font-bold px-3.5 py-1.5 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-2.5 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Award className="size-4 text-[#0A66C2]" />
                  <span>
                    Minimum <strong>{expYears}+ years</strong> relevant care/nursing experience
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span>Valid Right to Work in the UK & Enhanced DBS check (preferred/provided)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span>NVQ Level 2/3 Health & Social Care or relevant professional registration</span>
                </div>
              </div>
            </div>

            {/* Benefits Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-4">
              <h2 className="text-xl font-bold text-[#1B2C54]">What We Offer</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
                {[
                  "Competitive compensation & paid overtime",
                  "28 days paid annual leave + bank holidays",
                  "Comprehensive ongoing training & CPD progression",
                  "Company pension scheme contribution",
                  "Employee Assistance Programme (EAP)",
                  "Free uniform & paid annual DBS renewals",
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className="size-2 rounded-full bg-cyan-700 shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Jobs Section */}
            {relatedJobs.length > 0 && (
              <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-4">
                <h3 className="text-lg font-bold text-[#1B2C54]">Other Similar Vacancies</h3>
                <div className="flex flex-col gap-3">
                  {relatedJobs.map((rj) => (
                    <div
                      key={rj.id}
                      onClick={() => router.push(`/jobs/${encodeURIComponent(rj.title.toLowerCase().replace(/\s+/g, "-"))}`)}
                      className="p-4 rounded-xl border border-slate-100 hover:border-cyan-200 hover:bg-slate-50/50 transition cursor-pointer flex flex-col sm:flex-row justify-between sm:items-center gap-3"
                    >
                      <div>
                        <h4 className="text-sm font-bold text-[#1B2C54]">{rj.title}</h4>
                        <p className="text-xs text-slate-400">{rj.organization?.name || "Care Provider"} · {rj.city || rj.location}</p>
                      </div>
                      <span className="text-xs font-bold text-cyan-700">View Position &rarr;</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Application Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-6">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
              <h3 className="text-base font-bold text-[#1B2C54]">Apply for this Position</h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Submit your application directly to <strong>{companyName}</strong>. Our recruiting team will review your application promptly.
              </p>

              <button
                onClick={() => {
                  setIsApplyModalOpen(true);
                  setIsSubmitted(false);
                }}
                className="w-full bg-[#2D6A9F] hover:bg-[#20527F] text-white py-3.5 px-6 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98"
              >
                <Send className="size-4" />
                Apply Now
              </button>

              {job.organization?.email && (
                <a
                  href={`mailto:${job.organization.email}?subject=Application for ${title}`}
                  className="w-full border border-slate-200 text-slate-700 hover:bg-slate-50 py-3.5 px-6 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 text-center"
                >
                  Send Direct Email
                </a>
              )}
            </div>

            {/* Quick Job Overview Sidebar */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
              <h4 className="text-sm font-bold text-[#1B2C54]">Job Overview</h4>
              <div className="flex flex-col divide-y divide-slate-100 text-xs">
                <div className="flex justify-between py-2.5">
                  <span className="text-slate-400 font-medium">Employer:</span>
                  <span className="font-bold text-slate-700">{companyName}</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-slate-400 font-medium">Location:</span>
                  <span className="font-bold text-slate-700">{location}</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-slate-400 font-medium">Contract:</span>
                  <span className="font-bold text-slate-700">{jobType}</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-slate-400 font-medium">Salary:</span>
                  <span className="font-bold text-emerald-700">{salaryStr}</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span className="text-slate-400 font-medium">Experience:</span>
                  <span className="font-bold text-slate-700">{expYears}+ Years</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Application Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl border border-slate-100 shadow-2xl p-6 md:p-8 flex flex-col gap-6 relative max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-all cursor-pointer"
            >
              <X className="size-5" />
            </button>

            {/* Header banner */}
            <div className="flex flex-col gap-1 border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-bold text-[#1B2C54]">Apply for Job</h2>
              <div className="mt-3 p-4 bg-slate-50 rounded-2xl flex flex-col gap-1 border border-slate-100">
                <span className="text-sm font-bold text-slate-800">{title}</span>
                <span className="text-xs text-slate-400 font-medium">
                  {companyName} · {location} · {salaryStr}
                </span>
              </div>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleApplySubmit} className="flex flex-col gap-5">
                {/* Upload CV */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">Upload CV</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setCvFile(e.target.files[0]);
                      }
                    }}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-200 hover:border-[#2D6A9F] rounded-2xl p-6 flex flex-col items-center justify-center gap-2.5 cursor-pointer transition-all bg-slate-50/50 hover:bg-blue-50/10"
                  >
                    <UploadCloud className="size-8 text-slate-400" />
                    {cvFile ? (
                      <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                        <FileText className="size-4" />
                        <span>{cvFile.name}</span>
                      </div>
                    ) : (
                      <>
                        <span className="text-sm font-semibold text-slate-700">
                          Click to upload your CV
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          Supports PDF, DOC, DOCX
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">
                    Cover Letter (optional)
                  </label>
                  <textarea
                    rows={4}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Briefly introduce your qualifications and experience..."
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#2D6A9F] font-medium"
                  />
                </div>

                {/* Expected Salary & Earliest Start Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700">Expected Salary</label>
                    <input
                      type="text"
                      value={expectedSalary}
                      onChange={(e) => setExpectedSalary(e.target.value)}
                      placeholder="e.g. £28,000"
                      className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#2D6A9F]"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700">
                      Earliest Start Date
                    </label>
                    <input
                      type="text"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      placeholder="e.g. Immediately / 2 weeks"
                      className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#2D6A9F]"
                      required
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(false)}
                    className="px-6 py-3 border border-slate-200 text-slate-600 rounded-2xl text-sm font-bold transition hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-[#2D6A9F] hover:bg-[#20527F] disabled:bg-slate-300 text-white rounded-2xl text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-6 gap-6">
                <div className="size-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                  <Check className="size-10 stroke-[3.5]" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-[#1B2C54]">
                    Application Submitted!
                  </h3>
                  <p className="text-slate-500 text-sm max-w-md mx-auto">
                    {companyName} has received your application and will review your qualifications shortly.
                  </p>
                </div>
                <button
                  onClick={() => setIsApplyModalOpen(false)}
                  className="w-40 py-3 bg-[#2D6A9F] hover:bg-[#20527F] text-white text-sm font-semibold rounded-2xl transition cursor-pointer shadow-sm"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default JobDetailView;
