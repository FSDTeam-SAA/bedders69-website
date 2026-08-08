import React, { useState } from "react";
import { MapPin, Clock, Award, Briefcase, ChevronLeft, ChevronRight } from "lucide-react";

export interface JobProps {
  title: string;
  company: string;
  urgent: boolean;
  location: string;
  type: string;
  salary: string;
  tags: string[];
}

interface JobsListProps {
  searchQuery: string;
  selectedCategory: string;
  selectedSalaries: string[];
  selectedExperience: string[];
  selectedPosted: string[];
  onApply: (job: JobProps) => void;
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

  const initialJobs: JobProps[] = [
    {
      title: "Senior Care Assistant",
      company: "Sunrise Care Group",
      urgent: true,
      location: "London, UK",
      type: "Full-Time",
      salary: "£32,000 – £38,000",
      tags: ["NMC Registration", "Nursing"],
    },
    {
      title: "Registered Nurse – Dementia Ward",
      company: "Sunrise Care Group",
      urgent: true,
      location: "Birmingham, UK",
      type: "Full-Time",
      salary: "£35k+",
      tags: ["NMC Registration", "Nursing"],
    },
    {
      title: "Live-In Carer",
      company: "Sunrise Care Group",
      urgent: true,
      location: "Manchester, UK",
      type: "Full-Time",
      salary: "£14–£18/hr",
      tags: ["Personal Care", "Companionship"],
    },
    {
      title: "Care Manager",
      company: "Sunrise Care Group",
      urgent: true,
      location: "Leeds, UK",
      type: "Full-Time",
      salary: "£35k+",
      tags: ["Management", "Leadership"],
    },
    {
      title: "Support Worker – Mental Health",
      company: "Sunrise Care Group",
      urgent: true,
      location: "Bristol, UK",
      type: "Full-Time",
      salary: "£10–£14/hr",
      tags: ["Mental Health", "Crisis Intervention"],
    },
    {
      title: "Night Carer – Residential Home",
      company: "Sunrise Care Group",
      urgent: true,
      location: "Brighton, UK",
      type: "Full-Time",
      salary: "£14–£18/hr",
      tags: ["Night Care", "Residential Care"],
    }
  ];

  // Filter jobs
  const filteredJobs = initialJobs.filter((job) => {
    // 1. Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = job.title.toLowerCase().includes(q);
      const matchesCompany = job.company.toLowerCase().includes(q);
      const matchesTags = job.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchesTitle && !matchesCompany && !matchesTags) return false;
    }

    // 2. Category selection
    if (selectedCategory !== "All") {
      const matchesCategory = job.title.toLowerCase().includes(selectedCategory.toLowerCase()) || 
                              job.tags.some(t => t.toLowerCase().includes(selectedCategory.toLowerCase()));
      if (!matchesCategory) return false;
    }

    // 3. Salary Range filter
    if (selectedSalaries.length > 0) {
      const matchesSalary = selectedSalaries.some(sal => job.salary.includes(sal.split("–")[0]));
      if (!matchesSalary) return false;
    }

    return true;
  });

  return (
    <div className="flex-1 flex flex-col gap-5 font-['Wix_Madefor_Text'] w-full">
      
      {/* List Header info */}
      <div className="flex justify-between items-end border-b border-slate-100 pb-3">
        <h2 className="text-xl font-bold text-slate-800 font-['Poppins']">
          Available Vacancies ({filteredJobs.length})
        </h2>
      </div>

      {/* Jobs List */}
      {filteredJobs.length > 0 ? (
        <div className="flex flex-col gap-4">
          {filteredJobs.map((job, idx) => {
            return (
              <div
                key={idx}
                className="bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between"
              >
                
                {/* Left Side: Job Info */}
                <div className="flex gap-4 items-start flex-1">
                  
                  {/* Styled Icon Wrapper */}
                  <div className="size-12 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center shrink-0 text-cyan-700">
                    <Briefcase className="size-5 stroke-[2]" />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base md:text-lg font-bold text-[#1B2C54] leading-tight">
                        {job.title}
                      </h3>
                      {job.urgent && (
                        <span className="bg-red-50 text-red-700 border border-red-100 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                          Urgent
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs text-slate-400 font-medium">
                      {job.company}
                    </p>

                    {/* Meta row: Location, Type, Salary */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="size-3.5 text-slate-400" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="size-3.5 text-slate-400" />
                        <span>{job.type}</span>
                      </div>
                      <div className="text-[#2D6A9F] font-bold">
                        {job.salary}
                      </div>
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-slate-50 text-slate-500 border border-slate-100 text-[10px] font-bold px-2 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                  </div>

                </div>

                {/* Right Side: Apply Action Button */}
                <div className="w-full md:w-auto shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-50">
                  <button
                    onClick={() => onApply(job)}
                    className="w-full md:w-32 py-2.5 bg-[#2D6A9F] hover:bg-[#20527F] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-sm hover:shadow text-center active:scale-98"
                  >
                    Apply Now
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-sm font-medium text-slate-500 text-center">
            No care vacancies match your filter selections.
          </p>
        </div>
      )}

      {/* Pagination Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 pt-6 border-t border-slate-100 font-['Poppins']">
        <span className="text-xs text-slate-400 font-medium">
          Showing 1 to {filteredJobs.length} of {filteredJobs.length} results
        </span>
        
        <div className="flex items-center gap-1.5">
          {/* Previous Arrow */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="size-8.5 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all cursor-pointer bg-white"
          >
            <ChevronLeft className="size-4" />
          </button>
          
          {/* Page Numbers */}
          <button
            onClick={() => setCurrentPage(1)}
            className={`size-8.5 rounded-lg flex items-center justify-center text-xs font-semibold transition-all cursor-pointer ${
              currentPage === 1
                ? "bg-[#2D6A9F] text-white"
                : "border border-slate-200 text-slate-500 hover:bg-slate-50 bg-white"
            }`}
          >
            1
          </button>
          <button
            onClick={() => setCurrentPage(2)}
            className={`size-8.5 rounded-lg flex items-center justify-center text-xs font-semibold transition-all cursor-pointer ${
              currentPage === 2
                ? "bg-[#2D6A9F] text-white"
                : "border border-slate-200 text-slate-500 hover:bg-slate-50 bg-white"
            }`}
          >
            2
          </button>
          
          {/* Next Arrow */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(2, p + 1))}
            className="size-8.5 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all cursor-pointer bg-white"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
