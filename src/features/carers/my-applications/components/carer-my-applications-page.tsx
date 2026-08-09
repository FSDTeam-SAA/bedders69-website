import React from "react";
import { BriefcaseBusiness, Clock3, MapPin, Search } from "lucide-react";

const filters = ["All", "Reviewed", "Shortlisted", "Interview", "Offered", "Rejected", "Hired"];

const applications = [
  {
    title: "Senior Care Assistant",
    company: "Sunrise Care Group",
    location: "Austin, TX",
    type: "Full-Time",
    salary: "£32,000 – £38,000",
    status: "Pending",
    tone: "bg-yellow-600/10 text-yellow-600",
  },
  {
    title: "Registered Nurse – Dementia Ward",
    company: "Sunrise Care Group",
    location: "Austin, TX",
    type: "Full-Time",
    salary: "£32,000 – £38,000",
    status: "Reviewed",
    tone: "bg-fuchsia-900/10 text-fuchsia-900",
  },
  {
    title: "Care Manager",
    company: "Sunrise Care Group",
    location: "Austin, TX",
    type: "Full-Time",
    salary: "£32,000 – £38,000",
    status: "Shortlisted",
    tone: "bg-fuchsia-600/10 text-fuchsia-600",
  },
  {
    title: "Support Worker – Mental Health",
    company: "Sunrise Care Group",
    location: "Austin, TX",
    type: "Full-Time",
    salary: "£32,000 – £38,000",
    status: "Interview",
    tone: "bg-cyan-400/20 text-cyan-500",
  },
  {
    title: "Night Carer – Residential Home",
    company: "Sunrise Care Group",
    location: "Austin, TX",
    type: "Full-Time",
    salary: "£32,000 – £38,000",
    status: "Offered",
    tone: "bg-blue-600/10 text-blue-600",
  },
  {
    title: "Registered Nurse – Dementia Ward",
    company: "Sunrise Care Group",
    location: "Austin, TX",
    type: "Full-Time",
    salary: "£32,000 – £38,000",
    status: "Rejected",
    tone: "bg-red-600/10 text-red-500",
  },
  {
    title: "Care Manager",
    company: "Sunrise Care Group",
    location: "Austin, TX",
    type: "Full-Time",
    salary: "£32,000 – £38,000",
    status: "Hired",
    tone: "bg-green-500/10 text-green-500",
  },
];

function FilterChip({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button
      type="button"
      className={`rounded-[100px] border px-4 py-1.5 text-sm leading-4 transition ${
        active
          ? "border-cyan-700 bg-cyan-700 text-white"
          : "border-gray-500 text-gray-500 hover:border-cyan-700 hover:text-cyan-700"
      }`}
    >
      {label}
    </button>
  );
}

function ApplicationCard({
  title,
  company,
  location,
  type,
  salary,
  status,
  tone,
}: (typeof applications)[number]) {
  return (
    <article className="rounded-xl bg-cyan-700/5 p-6">
      <div className="flex items-center gap-4">
        <div className="flex flex-1 flex-col justify-center gap-4">
          <div className="inline-flex items-center gap-2.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-300">
              <BriefcaseBusiness className="h-6 w-6 text-cyan-700" strokeWidth={1.6} />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <h3 className="text-xl font-semibold leading-6 text-slate-800">{title}</h3>
              <p className="text-base leading-5 text-gray-500">{company}</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-5">
            <div className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-zinc-500" strokeWidth={1.5} />
              <span className="text-sm leading-4 text-zinc-500">{location}</span>
            </div>
            <div className="inline-flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5 text-zinc-500" strokeWidth={1.5} />
              <span className="text-sm leading-4 text-zinc-500">{type}</span>
            </div>
          </div>
        </div>
        <div className="flex w-36 self-stretch flex-col items-end justify-between">
          <div className={`rounded-[100px] px-4 py-1.5 text-base leading-5 ${tone}`}>
            {status}
          </div>
          <div className="self-stretch text-center text-base font-medium leading-5 text-cyan-700">
            {salary}
          </div>
        </div>
      </div>
    </article>
  );
}

export function CarerMyApplicationsPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-6 sm:px-8 xl:px-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col justify-between gap-4 2xl:flex-row 2xl:items-center">
          <div className="flex w-full max-w-[520px] items-center gap-2 overflow-hidden rounded-xl bg-black/5 p-4">
            <Search className="h-5 w-5 text-zinc-600" strokeWidth={1.6} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent text-base leading-5 text-zinc-600 outline-none placeholder:text-zinc-600"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter, index) => (
              <FilterChip key={filter} label={filter} active={index === 0} />
            ))}
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {applications.map((application, index) => (
            <ApplicationCard key={`${application.title}-${index}`} {...application} />
          ))}
        </div>
      </div>
    </div>
  );
}
