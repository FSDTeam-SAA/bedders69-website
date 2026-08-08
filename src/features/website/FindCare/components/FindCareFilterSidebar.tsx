import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

interface FindCareFilterSidebarProps {
  selectedServiceTypes: string[];
  toggleServiceType: (type: string) => void;
  selectedRegions: string[];
  toggleRegion: (region: string) => void;
  selectedRating: string;
  setSelectedRating: (rating: string) => void;
  clearAllFilters: () => void;
}

export const FindCareFilterSidebar = ({
  selectedServiceTypes,
  toggleServiceType,
  selectedRegions,
  toggleRegion,
  selectedRating,
  setSelectedRating,
  clearAllFilters,
}: FindCareFilterSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const serviceTypes = [
    "Residential Care",
    "Home Care",
    "Dementia Care",
    "Palliative Care",
    "Respite Care",
  ];

  const regions = [
    "London",
    "Manchester",
    "Birmingham",
    "Leeds",
    "Bristol",
    "Brighton",
  ];

  const ratings = ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Stars"];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <aside className="w-full lg:w-72 bg-white border border-slate-100 rounded-2xl p-6 flex flex-col gap-6 shadow-sm font-['Wix_Madefor_Text'] select-none">
      
      {/* Header */}
      <div className="pb-1">
        <h2 className="text-base font-bold text-slate-800">
          Filters
        </h2>
      </div>

      {/* Service Types Checklist */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          SERVICE TYPES
        </h3>
        <div className="flex flex-col gap-3">
          {serviceTypes.map((type) => {
            const isChecked = selectedServiceTypes.includes(type);
            return (
              <label
                key={type}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div
                  onClick={() => toggleServiceType(type)}
                  className={`size-4.5 rounded border flex items-center justify-center transition-all ${
                    isChecked
                      ? "bg-cyan-700 border-cyan-700 text-white"
                      : "border-slate-200 group-hover:border-slate-300 bg-white"
                  }`}
                >
                  {isChecked && <Check className="size-3.5 stroke-[3]" />}
                </div>
                <span className="text-sm text-slate-500 group-hover:text-slate-900 transition-colors font-medium">
                  {type}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Region Checklist */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          REGION
        </h3>
        <div className="flex flex-col gap-3">
          {regions.map((region) => {
            const isChecked = selectedRegions.includes(region);
            return (
              <label
                key={region}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div
                  onClick={() => toggleRegion(region)}
                  className={`size-4.5 rounded border flex items-center justify-center transition-all ${
                    isChecked
                      ? "bg-cyan-700 border-cyan-700 text-white"
                      : "border-slate-200 group-hover:border-slate-300 bg-white"
                  }`}
                >
                  {isChecked && <Check className="size-3.5 stroke-[3]" />}
                </div>
                <span className="text-sm text-slate-500 group-hover:text-slate-900 transition-colors font-medium">
                  {region}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Custom Ratings Dropdown */}
      <div className="flex flex-col gap-3 relative" ref={dropdownRef}>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          RATINGS
        </h3>
        
        {/* Toggle Button */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-500 font-medium flex items-center justify-between cursor-pointer hover:border-slate-300 transition-all"
        >
          <span>{selectedRating || "Select"}</span>
          {isOpen ? (
            <ChevronUp className="size-4 text-slate-400" />
          ) : (
            <ChevronDown className="size-4 text-slate-400" />
          )}
        </div>

        {/* Dropdown Options Box */}
        {isOpen && (
          <div className="absolute top-[72px] left-0 right-0 bg-white border border-slate-200 rounded-2xl shadow-lg z-20 py-2.5 flex flex-col overflow-hidden">
            {ratings.map((rate) => {
              const isSelected = selectedRating === rate;
              return (
                <div
                  key={rate}
                  onClick={() => {
                    setSelectedRating(isSelected ? "" : rate);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 cursor-pointer flex items-center justify-between"
                >
                  <span>{rate}</span>
                  {isSelected && <Check className="size-4 text-emerald-600 stroke-[3]" />}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Clear Filters Button (Red theme matching Figma) */}
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
