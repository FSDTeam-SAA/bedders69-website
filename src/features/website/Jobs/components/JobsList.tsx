"use client";

import React, { useState, useEffect, useMemo } from "react";
import { MapPin, Clock, Briefcase, ChevronLeft, ChevronRight, Banknote, Sparkles } from "lucide-react";
import Link from "next/link";
import jobsApi from "../api/jobsApi";
import { JobItem, JobProps } from "../types/jobs.types";
export type { JobProps };

interface JobsListProps {
  searchQuery: string;
  selectedCategory: string;
  selectedSalaries: string[];
  selectedExperience: string[];
  selectedPosted: string[];
  onApply: (job: JobProps) => void;
}

function formatJobType(type?: string) {
  if (!type) return "Full-Time";
  return type
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("-");
}

export const JobsList = ({
  searchQuery,
  selectedCategory,
  selectedSalaries,
  selectedExperience,
  selectedPosted,
  onApply,
}: JobsListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [backendJobs, setBackendJobs] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const itemsPerPage = 6;

  useEffect(() => {
    let isMounted = true;
    async function loadJobs() {
      setIsLoading(true);
      try {
        const res = await jobsApi.getJobs({ limit: 50, page: 1 });
        if (res && res.data && isMounted) {
          setBackendJobs(res.data);
        }
      } catch (err) {
        console.warn("Error fetching jobs:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadJobs();
    return () => {
      isMounted = false;
    };
  }, []);

  // Reset page when any filter criteria changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedSalaries, selectedExperience, selectedPosted]);

  // Map backend jobs to JobProps
  const allJobs = useMemo<JobProps[]>(() => {
    if (backendJobs && backendJobs.length > 0) {
      return backendJobs.map((j, idx) => {
        const salaryStr =
          j.salaryMin && j.salaryMax
            ? `£${j.salaryMin.toLocaleString()} – £${j.salaryMax.toLocaleString()}/yr`
            : j.salaryMin
            ? `From £${j.salaryMin.toLocaleString()}/yr`
            : "Competitive";

        const loc =
          j.city ||
          j.location ||
          (j.postCode ? `UK (${j.postCode})` : "United Kingdom");

        const tags =
          j.requiredSkills && j.requiredSkills.length > 0
            ? j.requiredSkills
            : ["Care Assistant", "Healthcare Support"];

        return {
          id: j.id,
          title: j.title,
          company: j.organization?.name || "Verified Care Provider",
          urgent: idx % 3 === 0,
          location: loc,
          type: formatJobType(j.jobType),
          salary: salaryStr,
          tags: tags,
          rawSalaryMin: j.salaryMin,
          rawSalaryMax: j.salaryMax,
          experienceYears: j.requiredExperience || 2,
          publishedAt: j.publishedAt || j.createdAt,
        };
      });
    }

    return [];
  }, [backendJobs]);

  // Filtering logic
  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      // 1. Search Query
      if (searchQuery && searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = job.title.toLowerCase().includes(q);
        const matchesCompany = job.company.toLowerCase().includes(q);
        const matchesLoc = job.location.toLowerCase().includes(q);
        const matchesTags = job.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCompany && !matchesLoc && !matchesTags) return false;
      }

      // 2. Category selection (from Hero pills)
      if (selectedCategory && selectedCategory !== "All") {
        const catLower = selectedCategory.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(catLower);
        const matchesTags = job.tags.some((t) => t.toLowerCase().includes(catLower));
        if (!matchesTitle && !matchesTags) return false;
      }

      // 3. Salary Range filter
      if (selectedSalaries.length > 0) {
        const matchesSalary = selectedSalaries.some((sal) => {
          const sMin = job.rawSalaryMin || 0;
          if (sal.includes("35k+") && sMin >= 35000) return true;
          if (sal.includes("25k–£35k") && sMin >= 25000 && sMin <= 36000) return true;
          if (sal.includes("18–£25") && sMin >= 18000 && sMin <= 26000) return true;
          if (sal.includes("14–£18") && sMin >= 14000 && sMin <= 20000) return true;
          if (sal.includes("10–£14") && sMin <= 16000) return true;
          return job.salary.toLowerCase().includes(sal.toLowerCase().slice(0, 3));
        });
        if (!matchesSalary) return false;
      }

      // 4. Experience Level filter
      if (selectedExperience.length > 0) {
        const matchesExp = selectedExperience.some((exp) => {
          const yrs = job.experienceYears || 0;
          if (exp.includes("Entry") && yrs <= 1) return true;
          if (exp.includes("1–3") && yrs >= 1 && yrs <= 3) return true;
          if (exp.includes("3–5") && yrs >= 3 && yrs <= 5) return true;
          if (exp.includes("5+") && yrs >= 5) return true;
          return false;
        });
        if (!matchesExp) return false;
      }

      // 5. Posted Date filter
      if (selectedPosted.length > 0 && job.publishedAt) {
        const pubDate = new Date(job.publishedAt);
        const now = new Date();
        const diffHours = (now.getTime() - pubDate.getTime()) / (1000 * 60 * 60);

        const matchesPosted = selectedPosted.some((p) => {
          if (p.includes("24 hours") && diffHours <= 24) return true;
          if (p.includes("3 days") && diffHours <= 72) return true;
          if (p.includes("week") && diffHours <= 168) return true;
          if (p.includes("month") && diffHours <= 720) return true;
          return false;
        });
        if (!matchesPosted) return false;
      }

      return true;
    });
  }, [allJobs, searchQuery, selectedCategory, selectedSalaries, selectedExperience, selectedPosted]);

  // Pagination calculation
  const totalItems = filteredJobs.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 380, behavior: "smooth" });
      }
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex-1 flex flex-col gap-5 font-['Wix_Madefor_Text'] w-full">
      {/* List Header info */}
      <div className="flex justify-between items-end border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800 font-['Poppins']">
            Available Vacancies{" "}
            <span className="text-sm font-normal text-slate-500">
              ({totalItems} found)
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Verified roles from regulated UK care providers
          </p>
        </div>
        {totalItems > 0 && (
          <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
            Page {currentPage} of {totalPages}
          </span>
        )}
      </div>

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col gap-3 animate-pulse"
            >
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-xl bg-slate-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-1/3 rounded bg-slate-200" />
                  <div className="h-4 w-1/4 rounded bg-slate-200" />
                </div>
              </div>
              <div className="h-4 w-2/3 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      )}

      {/* Jobs List */}
      {!isLoading && paginatedJobs.length > 0 && (
        <div className="flex flex-col gap-4">
          {paginatedJobs.map((job) => {
            const initial =
              job.company && job.company.trim().length > 0
                ? job.company.trim()[0].toUpperCase()
                : "C";

            const slug = encodeURIComponent(
              job.title.toLowerCase().replace(/\s+/g, "-")
            );
            const jobUrl = `/jobs/${slug}`;

            return (
              <div
                key={job.id || `${job.title}-${job.company}`}
                className="group bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-[0px_4px_6px_0px_rgba(43,110,166,0.06)] hover:shadow-[0px_10px_20px_0px_rgba(43,110,166,0.12)] transition-all duration-300 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between hover:-translate-y-0.5"
              >
                {/* Left Side: Job Info */}
                <div className="flex gap-4 items-start flex-1 min-w-0">
                  {/* Styled Avatar */}
                  <Link
                    href={jobUrl}
                    className="size-12 rounded-xl bg-gradient-to-br from-cyan-700 to-emerald-600 flex items-center justify-center shrink-0 text-white font-bold text-lg shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    {initial}
                  </Link>

                  <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link href={jobUrl} className="block cursor-pointer">
                        <h3 className="text-base md:text-lg font-bold text-[#1B2C54] leading-tight group-hover:text-cyan-700 transition-colors">
                          {job.title}
                        </h3>
                      </Link>
                      {job.urgent && (
                        <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1">
                          <Sparkles className="size-3 text-rose-500" />
                          Urgent
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 font-semibold truncate">
                      {job.company}
                    </p>

                    {/* Meta row: Location, Type, Salary */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 mt-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="size-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="size-3.5 text-slate-400 shrink-0" />
                        <span className="capitalize">{job.type}</span>
                      </div>
                      <div className="text-emerald-700 font-bold flex items-center gap-1">
                        <Banknote className="size-3.5 text-emerald-600 shrink-0" />
                        <span>{job.salary}</span>
                      </div>
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: Apply Action Button */}
                <div className="w-full md:w-auto shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 flex items-center gap-3">
                  <Link
                    href={jobUrl}
                    className="w-full md:w-auto px-4 py-3 border border-slate-200 hover:border-slate-300 text-slate-600 text-xs font-bold rounded-xl transition text-center hover:bg-slate-50"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => onApply(job)}
                    className="w-full md:w-32 py-3 bg-[#2D6A9F] hover:bg-[#20527F] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm hover:shadow text-center active:scale-98"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && paginatedJobs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-2xl border border-dashed border-slate-200 text-center shadow-sm">
          <div className="size-14 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-700 mb-3">
            <Briefcase className="size-7" />
          </div>
          <h3 className="text-base font-bold text-[#1B2C54]">
            No care vacancies found
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            No active jobs match your search or filter selections. Try adjusting your query or resetting filters.
          </p>
        </div>
      )}

      {/* Dynamic Pagination Bar */}
      {!isLoading && totalItems > 0 && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-6 border-t border-slate-200/80 font-['Poppins']">
          <span className="text-xs text-slate-500 font-medium">
            Showing {startIndex + 1} to {endIndex} of {totalItems} results
          </span>

          <div className="flex items-center gap-1.5">
            {/* Previous Arrow */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous Page"
              className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all ${
                currentPage === 1
                  ? "text-slate-300 border-slate-100 cursor-not-allowed bg-slate-50"
                  : "text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300 cursor-pointer active:scale-95 shadow-sm bg-white"
              }`}
            >
              <ChevronLeft className="size-4" />
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((pageItem, idx) => {
              if (pageItem === "...") {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    className="text-slate-400 px-1 text-xs select-none"
                  >
                    ...
                  </span>
                );
              }

              const pageNum = pageItem as number;
              const isActive = currentPage === pageNum;

              return (
                <button
                  key={`page-${pageNum}`}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-9 h-9 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm ${
                    isActive
                      ? "bg-[#2D6A9F] text-white border border-[#2D6A9F] shadow-cyan-900/10"
                      : "text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next Arrow */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next Page"
              className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all ${
                currentPage === totalPages
                  ? "text-slate-300 border-slate-100 cursor-not-allowed bg-slate-50"
                  : "text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300 cursor-pointer active:scale-95 shadow-sm bg-white"
              }`}
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsList;
