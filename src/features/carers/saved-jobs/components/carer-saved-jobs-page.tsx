import Link from "next/link";
import React from "react";
import {
  Bookmark,
  BriefcaseBusiness,
  ChevronRight,
  Clock3,
  MapPin,
  Search,
} from "lucide-react";

const locations = ["United States", "Vietnam", "Nepal", "Germany", "Netherlands"];
const shifts = ["Day Shift", "Night Shift", "Weekend", "Flexible", "Rotational"];
const experienceLevels = ["Entry Level", "1 - 2 Years", "3 - 5 Years", "5+ Years"];
const jobTypes = ["Full-Time", "Part-Time", "Flexible Hours"];

const jobs = [
  "Senior Care Assistant",
  "Registered Nurse – Dementia Ward",
  "Care Manager",
].map((title) => ({
  slug: title.toLowerCase().replace(/[–\s]+/g, "-"),
  title,
  company: "Sunrise Care Group",
  location: "Austin, TX",
  type: "Full-Time",
  salary: "£32,000 – £38,000",
}));

function FilterSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <>
      <div className="h-px w-full bg-neutral-300" />
      <div className="flex w-full flex-col items-center gap-4 bg-cyan-700/5 p-4">
        <div className="inline-flex w-full items-center justify-between">
          <div className="text-lg font-semibold leading-5 text-slate-800">{title}</div>
          <ChevronRight className="h-5 w-5 text-slate-800" strokeWidth={1.5} />
        </div>
        <div className="flex w-full flex-col items-start gap-3">
          {items.map((item) => (
            <label key={item} className="inline-flex w-full items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-500 accent-cyan-700" />
              <span className="text-base leading-5 text-gray-500">{item}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
}

function SavedJobCard({
  slug,
  title,
  company,
  location,
  type,
  salary,
}: {
  slug: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
}) {
  return (
    <article className="inline-flex w-full items-center gap-4 rounded-xl bg-cyan-700/5 p-6">
      <div className="flex flex-1 flex-col items-start gap-4">
        <div className="inline-flex w-full items-center gap-2.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-300">
            <BriefcaseBusiness className="h-6 w-6 text-cyan-700" strokeWidth={1.6} />
          </div>
          <div className="flex flex-1 flex-col items-start gap-1">
            <h3 className="w-full text-xl font-semibold leading-6 text-slate-800">{title}</h3>
            <p className="w-full text-base leading-5 text-gray-500">{company}</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-5">
          <div className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-zinc-500" strokeWidth={1.6} />
            <span className="text-sm leading-4 text-zinc-500">{location}</span>
          </div>
          <div className="inline-flex items-center gap-1">
            <Clock3 className="h-3.5 w-3.5 text-zinc-500" strokeWidth={1.6} />
            <span className="text-sm leading-4 text-zinc-500">{type}</span>
          </div>
        </div>
      </div>

      <div className="flex h-full flex-col items-end justify-between self-stretch">
        <div className="text-base font-medium leading-5 text-cyan-700">{salary}</div>
        <div className="inline-flex items-start gap-2.5">
          <button className="inline-flex items-center justify-center rounded-[84px] bg-cyan-700/10 p-2">
            <Bookmark className="h-5 w-5 fill-cyan-700 text-cyan-700" strokeWidth={1.5} />
          </button>
          <Link
            href={`/carers/jobs/${slug}`}
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-700 px-5 py-2.5 text-sm font-medium leading-4 text-white"
          >
            Apply Now
            <ChevronRight className="h-4 w-4" strokeWidth={1.6} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function CarerSavedJobsPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-6 sm:px-8 xl:px-10">
      <div className="flex items-start gap-6">
        <aside className="w-96 shrink-0 overflow-hidden rounded-xl">
          <div className="bg-cyan-700/5 p-4">
            <div className="inline-flex w-full items-center gap-2 rounded-xl bg-black/5 p-4">
              <Search className="h-5 w-5 text-zinc-600" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent text-base leading-5 text-zinc-600 outline-none placeholder:text-zinc-600"
              />
            </div>
          </div>

          <div className="h-px w-full bg-neutral-300" />
          <div className="bg-cyan-700/5 p-4">
            <div className="text-lg font-semibold leading-5 text-slate-800">Salary Range</div>
            <div className="mt-4 flex flex-col items-center gap-2">
              <div className="w-full">
                <div className="h-2.5 rounded-[43px] bg-cyan-700" />
                <div className="-mt-3 flex justify-between">
                  <div className="rounded-[95px] bg-slate-800 p-0.5">
                    <div className="h-3 w-3 rounded-full bg-cyan-700" />
                  </div>
                  <div className="rounded-[95px] bg-slate-800 p-0.5">
                    <div className="h-3 w-3 rounded-full bg-cyan-700" />
                  </div>
                </div>
              </div>
              <div className="inline-flex w-full items-center justify-between">
                <div className="flex w-16 items-center justify-center rounded-sm px-3 py-1.5 outline outline-1 outline-neutral-400">
                  <span className="text-xs leading-4 text-gray-500">0</span>
                </div>
                <div className="flex w-16 items-center justify-center rounded-sm px-3 py-1.5 outline outline-1 outline-neutral-400">
                  <span className="text-xs leading-4 text-gray-500">500000</span>
                </div>
              </div>
            </div>
          </div>

          <FilterSection title="Location" items={locations} />
          <FilterSection title="Shift" items={shifts} />
          <FilterSection title="Experience" items={experienceLevels} />
          <FilterSection title="Job Type" items={jobTypes} />
        </aside>

        <section className="flex-1 space-y-4">
          {jobs.map((job, index) => (
            <SavedJobCard key={`${job.title}-${index}`} {...job} />
          ))}
        </section>
      </div>
    </div>
  );
}
