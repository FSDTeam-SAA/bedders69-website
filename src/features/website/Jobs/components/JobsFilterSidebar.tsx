import React from "react";
import { Check } from "lucide-react";

interface JobsFilterSidebarProps {
  selectedSalaries: string[];
  toggleSalary: (sal: string) => void;
  selectedExperience: string[];
  toggleExperience: (exp: string) => void;
  selectedPosted: string[];
  togglePosted: (posted: string) => void;
  clearAllFilters: () => void;
}

export const JobsFilterSidebar = ({
  selectedSalaries,
  toggleSalary,
  selectedExperience,
  toggleExperience,
  selectedPosted,
  togglePosted,
  clearAllFilters,
}: JobsFilterSidebarProps) => {

  const salaries = [
    "£10–£14/hr",
    "£14–£18/hr",
    "£18–£25/hr",
    "£25k–£35k",
    "£35k+",
  ];

  const experienceLevels = [
    "Entry Level",
    "1–3 years",
    "3–5 years",
    "5+ years",
  ];

  const postedTimes = [
    "Last 24 hours",
    "Last 3 days",
    "Last week",
    "Last month",
  ];

  return (
    <aside className="w-full lg:w-72 bg-white border border-slate-100 rounded-2xl p-6 flex flex-col gap-6 shadow-sm font-['Wix_Madefor_Text'] select-none">
      
      {/* Sidebar Label */}
      <div>
        <h2 className="text-base font-bold text-slate-800">
          Refine Results
        </h2>
      </div>

      {/* Salary Range */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Salary Range
        </h3>
        <div className="flex flex-col gap-3">
          {salaries.map((sal) => {
            const isChecked = selectedSalaries.includes(sal);
            return (
              <label key={sal} className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => toggleSalary(sal)}
                  className={`size-4.5 rounded border flex items-center justify-center transition-all ${
                    isChecked
                      ? "bg-cyan-700 border-cyan-700 text-white"
                      : "border-slate-200 group-hover:border-slate-300 bg-white"
                  }`}
                >
                  {isChecked && <Check className="size-3.5 stroke-[3]" />}
                </div>
                <span className="text-sm text-slate-500 group-hover:text-slate-900 transition-colors font-medium">
                  {sal}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Experience Level */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Experience Level
        </h3>
        <div className="flex flex-col gap-3">
          {experienceLevels.map((exp) => {
            const isChecked = selectedExperience.includes(exp);
            return (
              <label key={exp} className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => toggleExperience(exp)}
                  className={`size-4.5 rounded border flex items-center justify-center transition-all ${
                    isChecked
                      ? "bg-cyan-700 border-cyan-700 text-white"
                      : "border-slate-200 group-hover:border-slate-300 bg-white"
                  }`}
                >
                  {isChecked && <Check className="size-3.5 stroke-[3]" />}
                </div>
                <span className="text-sm text-slate-500 group-hover:text-slate-900 transition-colors font-medium">
                  {exp}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Posted Date */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Posted
        </h3>
        <div className="flex flex-col gap-3">
          {postedTimes.map((posted) => {
            const isChecked = selectedPosted.includes(posted);
            return (
              <label key={posted} className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => togglePosted(posted)}
                  className={`size-4.5 rounded border flex items-center justify-center transition-all ${
                    isChecked
                      ? "bg-cyan-700 border-cyan-700 text-white"
                      : "border-slate-200 group-hover:border-slate-300 bg-white"
                  }`}
                >
                  {isChecked && <Check className="size-3.5 stroke-[3]" />}
                </div>
                <span className="text-sm text-slate-500 group-hover:text-slate-900 transition-colors font-medium">
                  {posted}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Clear Filters (Red styled matching Figma) */}
      <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
          Filters
        </h3>
        <button
          onClick={clearAllFilters}
          className="w-full py-2.5 bg-white border border-[#EF4444]/60 hover:border-[#EF4444] text-[#EF4444] font-semibold text-sm rounded-xl transition-all cursor-pointer shadow-sm hover:bg-red-50/20 active:scale-98"
        >
          Clear All Filters
        </button>
      </div>

    </aside>
  );
};
