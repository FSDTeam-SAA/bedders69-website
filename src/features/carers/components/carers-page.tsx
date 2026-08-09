import React from "react";
import {
  BadgeCheck,
  Circle,
  BriefcaseBusiness,
  CalendarClock,
  Eye,
  FileCheck2,
  ShieldCheck,
  Stethoscope,
  UserRoundSearch,
} from "lucide-react";

const stats = [
  {
    label: "Applied Jobs",
    value: "06",
    icon: BriefcaseBusiness,
  },
  {
    label: "Profile Views",
    value: "12",
    icon: Eye,
  },
  {
    label: "Interviews",
    value: "12",
    icon: CalendarClock,
  },
  {
    label: "Total Quote",
    value: "12",
    icon: UserRoundSearch,
  },
];

const applications = [
  { title: "Senior Care Assistant", company: "Sunrise Care Group", status: "Pending", tone: "bg-yellow-600/10 text-yellow-600" },
  { title: "Registered Nurse - Dementia Ward", company: "Sunrise Care Group", status: "Reviewed", tone: "bg-fuchsia-900/10 text-fuchsia-900" },
  { title: "Care Manager", company: "Sunrise Care Group", status: "Shortlisted", tone: "bg-fuchsia-600/10 text-fuchsia-600" },
  { title: "Support Worker - Mental Health", company: "Sunrise Care Group", status: "Interview", tone: "bg-teal-400/10 text-teal-500" },
  { title: "Night Carer - Residential Home", company: "Sunrise Care Group", status: "Offered", tone: "bg-blue-600/10 text-blue-600" },
  { title: "Registered Nurse - Dementia Ward", company: "Sunrise Care Group", status: "Rejected", tone: "bg-red-600/10 text-red-600" },
];

const completionItems = [
  { label: "CV / Resume", complete: true },
  { label: "DBS Certificate", complete: false },
  { label: "Care Certificate", complete: false },
  { label: "Training Certificates", complete: false },
  { label: "First Aid Certificate", complete: false },
  { label: "Qualification Certificates", complete: false },
];

export function CarersPage() {
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
              {applications.map((application, index) => (
                <div key={`${application.title}-${index}`}>
                  <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:px-5 sm:py-3.5">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold leading-6 text-slate-800">
                        {application.title}
                      </h3>
                      <p className="mt-1 text-sm leading-4 text-gray-500">
                        {application.company}
                      </p>
                    </div>
                    <span className={`inline-flex rounded-full px-4 py-1.5 text-sm ${application.tone}`}>
                      {application.status}
                    </span>
                  </div>
                  {index < applications.length - 1 ? (
                    <div className="h-px w-full bg-neutral-300" />
                  ) : null}
                </div>
              ))}
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
                  <span className="text-cyan-700">27%</span>
                </div>
                <div className="h-2 rounded-full bg-neutral-300/80">
                  <div className="h-2 w-[27%] rounded-full bg-cyan-700" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
