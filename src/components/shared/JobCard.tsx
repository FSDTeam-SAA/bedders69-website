"use client";

import { Clock3, MapPin, Banknote, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export interface CareJobCardProps {
  id?: string;
  title: string;
  company: string;
  location: string;
  type: string;
  tags: string[];
  posted: string;
  salary?: string;
  featured?: boolean;
}

const JobCard = ({
  id,
  title,
  company,
  location,
  type,
  tags = [],
  posted,
  salary,
  featured = false,
}: CareJobCardProps) => {
  // First letter of company for avatar
  const initial = company && company.trim().length > 0 ? company.trim()[0].toUpperCase() : "C";
  const slug = encodeURIComponent(title.toLowerCase().replace(/\s+/g, "-"));
  const jobUrl = `/jobs/${slug}`;

  return (
    <div className="group flex w-full flex-col justify-between gap-4 rounded-2xl bg-white p-5 shadow-[0px_4px_6px_0px_rgba(43,110,166,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_10px_20px_0px_rgba(43,110,166,0.14)]">
      {/* Header */}
      <div className="flex w-full items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <Link
            href={jobUrl}
            className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-700 to-emerald-600 shadow-sm text-white font-bold text-lg cursor-pointer hover:opacity-90 transition-opacity"
          >
            {initial}
          </Link>

          <div className="min-w-0 flex-1">
            <Link href={jobUrl} className="block cursor-pointer">
              <h3 className="truncate text-base font-bold leading-5 tracking-tight text-indigo-900 sm:text-lg transition-colors group-hover:text-cyan-700">
                {title}
              </h3>
            </Link>
            <p className="mt-1 truncate text-sm font-medium leading-4 text-slate-500">{company}</p>
          </div>
        </div>

        {featured && (
          <span className="shrink-0 rounded-full bg-cyan-50 border border-cyan-200 px-3 py-1 text-xs font-semibold leading-4 text-cyan-700">
            Featured
          </span>
        )}
      </div>

      {/* Details (Location, Type, Salary) */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <MapPin className="size-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{location || "United Kingdom"}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Clock3 className="size-3.5 text-slate-400 shrink-0" />
          <span className="capitalize">{type}</span>
        </div>

        {salary && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <Banknote className="size-3.5 text-emerald-500 shrink-0" />
            <span>{salary}</span>
          </div>
        )}
      </div>

      {/* Tags + Posted Time + Action */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          {tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold leading-4 text-slate-600"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
              +{tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-xs font-medium text-slate-400">{posted}</span>
          <Link
            href={jobUrl}
            className="inline-flex items-center gap-1 rounded-lg bg-cyan-50 px-3 py-1.5 text-xs font-bold text-cyan-700 transition hover:bg-cyan-100"
          >
            View Details
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;