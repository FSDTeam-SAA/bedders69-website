"use client";

import React, { useRef, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Paperclip,
  Upload,
} from "lucide-react";

type CarerJobDetailPageProps = {
  slug: string;
};

const detailSections = {
  role:
    "We are looking for a compassionate and dedicated Senior Care Assistant to join our growing team. In this role, you will provide high-quality care and support to individuals in their homes and care facilities while promoting independence, dignity, and wellbeing.",
  whatYoullDo: [
    "Provide personal care and daily living support.",
    "Assist clients with mobility and transfers.",
    "Administer medication following care plans.",
    "Maintain accurate care records and reports.",
    "Communicate effectively with families and healthcare professionals.",
    "Support clients with meal preparation and daily routines.",
    "Promote dignity, respect, and independence.",
  ],
  raiseBar: [
    "Deliver exceptional person-centred care.",
    "Build positive relationships with clients and families.",
    "Maintain high standards of safeguarding and compliance.",
    "Respond professionally to changing care needs.",
    "Contribute to a supportive and collaborative care team.",
  ],
  bring: [
    "Minimum 1 year of care experience.",
    "Valid Right to Work in the UK.",
    "DBS Certificate (Preferred).",
    "Excellent communication skills.",
    "Compassionate and patient attitude.",
    "Ability to work independently.",
    "Driving Licence (Preferred).",
    "NVQ Level 2 or 3 in Health & Social Care (Preferred).",
  ],
  benefits: [
    "Competitive Salary",
    "Paid Annual Leave",
    "Pension Scheme",
    "Ongoing Training",
    "Career Progression",
    "Flexible Working",
    "Employee Assistance Programme",
    "Mileage Allowance",
    "Free Uniform",
    "Paid DBS Renewal",
  ],
  workingHours: [
    "Full-Time",
    "Day Shift",
    "Night Shift",
    "Weekend Availability",
    "Flexible Rotating Schedule",
    "40 Hours per Week",
  ],
  assessment: [
    "Do you have the legal right to work in the UK?",
    "Do you hold a valid DBS certificate?",
    "Are you available for night shifts?",
    "Do you have access to your own vehicle?",
  ],
};

function BulletList({ items }: { items: string[] }) {
  return (
    <div className="flex w-full flex-col items-start gap-2">
      {items.map((item) => (
        <div key={item} className="inline-flex w-full items-start gap-3">
          <div className="mt-4 h-0 w-3 border border-sky-950" />
          <div className="flex-1 text-xl font-normal leading-8 text-zinc-900">{item}</div>
        </div>
      ))}
    </div>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full flex-col items-start gap-3">
      <h2 className="w-full text-2xl font-medium leading-7 text-zinc-900">{title}</h2>
      {children}
    </section>
  );
}

export function CarerJobDetailPage({ slug }: CarerJobDetailPageProps) {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [showResumeError, setShowResumeError] = useState(false);
  const [selectedResume, setSelectedResume] = useState<File | null>(null);
  const resumeInputRef = useRef<HTMLInputElement | null>(null);
  const normalizedTitle = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  const title =
    normalizedTitle === "Senior Care Assistant" ? normalizedTitle : "Senior Care Assistant";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedResume) {
      setShowResumeError(true);
      return;
    }

    setShowResumeError(false);
    setApplicationSubmitted(true);
  };

  const handleCloseModal = () => {
    setIsApplyModalOpen(false);
    setApplicationSubmitted(false);
    setShowResumeError(false);
    setSelectedResume(null);
  };

  return (
    <>
      <div className="min-h-screen bg-white px-6 py-6 sm:px-8 xl:px-10">
        <div className="flex w-full flex-col items-start gap-8">
          <div className="inline-flex w-full items-start gap-2.5">
            <div className="flex flex-1 flex-col items-start gap-5">
              <h1 className="w-full text-3xl font-semibold leading-10 text-zinc-900">{title}</h1>
              <div className="inline-flex w-full max-w-[905px] items-center gap-2.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-300">
                  <BriefcaseBusiness className="h-6 w-6 text-cyan-700" strokeWidth={1.6} />
                </div>
                <div className="flex flex-1 flex-col items-start gap-1">
                  <div className="inline-flex items-center gap-2.5">
                    <div className="text-xl font-semibold leading-6 text-slate-800">
                      Sunrise Care Group
                    </div>
                    <div className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-zinc-500" strokeWidth={1.5} />
                      <div className="text-sm font-normal leading-4 text-zinc-500">
                        Austin, TX
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex items-start gap-1">
                    <div className="rounded-sm bg-slate-100 px-2 py-1 text-xs leading-4 text-zinc-500">
                      Full-Time
                    </div>
                    <div className="rounded-sm bg-slate-100 px-2 py-1 text-xs leading-4 text-zinc-500">
                      1-2 Years
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex self-stretch flex-col items-end justify-between">
              <div className="text-xl font-semibold leading-6 text-cyan-700">
                £32,000 – £38,000
              </div>
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-700 px-8 py-4 text-base font-medium leading-5 text-white"
              >
                Apply Now
                <ChevronRight className="h-4 w-4" strokeWidth={1.6} />
              </button>
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-8">
            <DetailSection title="Role">
              <div className="w-full text-xl font-normal leading-8 text-zinc-900">
                {detailSections.role}
              </div>
            </DetailSection>

            <DetailSection title="What You'll Do">
              <BulletList items={detailSections.whatYoullDo} />
            </DetailSection>

            <DetailSection title="How You'll Raise the Bar">
              <BulletList items={detailSections.raiseBar} />
            </DetailSection>

            <DetailSection title="What You Bring">
              <BulletList items={detailSections.bring} />
            </DetailSection>

            <DetailSection title="Salary & Benefits">
              <div className="text-xl font-semibold leading-6">
                <span className="text-cyan-700">£32,000 – £38,000 </span>
                <span className="text-slate-800">per year</span>
              </div>
              <BulletList items={detailSections.benefits} />
            </DetailSection>

            <DetailSection title="Working Hours">
              <BulletList items={detailSections.workingHours} />
            </DetailSection>

            <DetailSection title="Assessment">
              <BulletList items={detailSections.assessment} />
            </DetailSection>
          </div>
        </div>
      </div>
      {isApplyModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 px-4 backdrop-blur-md">
          <div className="w-full max-w-[900px] rounded-lg bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
            {applicationSubmitted ? (
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-700/10 text-cyan-700">
                  <CheckCircle2 className="h-8 w-8" strokeWidth={1.8} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-[32px] font-semibold leading-10 text-slate-800">
                    Application Submitted
                  </h2>
                  <p className="text-lg leading-6 text-gray-500">
                    Your application for {title} has been submitted successfully.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mt-2 inline-flex items-center justify-center rounded-lg bg-cyan-700 px-8 py-3 text-base font-medium leading-5 text-white"
                >
                  Close
                </button>
              </div>
            ) : (
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="text-3xl font-semibold leading-10 text-slate-800">
                  Apply to {title}
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="text-base font-medium leading-5 text-slate-800">Email</span>
                    <input
                      type="email"
                      required
                      defaultValue="tim.jennings@example.com"
                      className="h-14 rounded-md border border-neutral-400 px-4 text-base text-slate-800 outline-none transition focus:border-cyan-700"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-base font-medium leading-5 text-slate-800">
                      Phone Number
                    </span>
                    <input
                      type="tel"
                      required
                      defaultValue="(308) 555-0121"
                      className="h-14 rounded-md border border-neutral-400 px-4 text-base text-slate-800 outline-none transition focus:border-cyan-700"
                    />
                  </label>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-base font-medium leading-5 text-slate-800">
                    CV / Resume
                  </span>
                  <input
                    ref={resumeInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0] ?? null;
                      setSelectedResume(file);
                      if (file) {
                        setShowResumeError(false);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => resumeInputRef.current?.click()}
                    className="flex w-full items-center gap-4 rounded-md border border-cyan-700/20 bg-cyan-700/10 p-5 text-left transition hover:border-cyan-700/40 hover:bg-cyan-700/15"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-700 text-white">
                      <Upload className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="text-[32px] font-semibold leading-10 text-slate-800">
                        CV / Resume
                      </div>
                      <p className="text-xl leading-6 text-gray-500">
                        Upload your updated CV showing your work experience and skills.
                      </p>
                      <p className="text-sm leading-5 text-gray-500">
                        Supported formats: PDF, DOC, DOCX
                      </p>
                    </div>
                  </button>
                  {selectedResume ? (
                    <div className="inline-flex items-center gap-2 rounded-md border border-cyan-700/15 bg-white px-4 py-3 text-slate-800">
                      <Paperclip className="h-4 w-4 text-cyan-700" strokeWidth={1.8} />
                      <span className="text-sm font-medium leading-5">{selectedResume.name}</span>
                    </div>
                  ) : showResumeError ? (
                    <p className="text-sm leading-5 text-red-500">
                      Please upload your resume before submitting.
                    </p>
                  ) : null}
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="text-base font-medium leading-5 text-slate-800">
                      Expected Salary
                    </span>
                    <input
                      type="text"
                      placeholder="e.g. £30,000"
                      className="h-14 rounded-md border border-neutral-400 px-4 text-base text-slate-800 outline-none transition placeholder:text-gray-500 focus:border-cyan-700"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-base font-medium leading-5 text-slate-800">
                      Earliest Start Date
                    </span>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="DD/MM/YYYY"
                        className="h-14 w-full rounded-md border border-neutral-400 px-4 pr-12 text-base text-slate-800 outline-none transition placeholder:text-gray-500 focus:border-cyan-700"
                      />
                      <CalendarDays
                        className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
                        strokeWidth={1.7}
                      />
                    </div>
                  </label>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="inline-flex min-w-24 items-center justify-center rounded-lg border border-cyan-700 px-8 py-3 text-base font-medium leading-5 text-cyan-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex min-w-24 items-center justify-center rounded-lg bg-cyan-700 px-8 py-3 text-base font-medium leading-5 text-white"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
