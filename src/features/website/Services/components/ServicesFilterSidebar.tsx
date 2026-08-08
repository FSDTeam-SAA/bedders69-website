import React from "react";
import { Check } from "lucide-react";

interface ServicesFilterSidebarProps {
  selectedServiceTypes: string[];
  toggleServiceType: (type: string) => void;
  selectedRegions: string[];
  toggleRegion: (region: string) => void;
  selectedRating: string;
  setSelectedRating: (rating: string) => void;
  clearAllFilters: () => void;
}

export const ServicesFilterSidebar = ({
  selectedServiceTypes,
  toggleServiceType,
  selectedRegions,
  toggleRegion,
  selectedRating,
  setSelectedRating,
  clearAllFilters,
}: ServicesFilterSidebarProps) => {

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

  return (
    <aside className="w-full lg:w-72 bg-white border border-slate-100 rounded-2xl p-6 flex flex-col gap-8 shadow-sm">
      
      {/* Header */}
      <div className="pb-2 border-b border-slate-100">
        <h2 className="text-base font-semibold text-slate-800 font-['Wix_Madefor_Text']">
          Filters
        </h2>
      </div>

      {/* Service Types Checklist */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-bold text-slate-400 tracking-wider font-['Wix_Madefor_Text'] uppercase">
          Service Types
        </h3>
        <div className="flex flex-col gap-3">
          {serviceTypes.map((type) => {
            const isChecked = selectedServiceTypes.includes(type);
            return (
              <label
                key={type}
                className="flex items-center gap-3 cursor-pointer group text-slate-600 hover:text-slate-900 transition-colors"
              >
                <div
                  onClick={() => toggleServiceType(type)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                    isChecked
                      ? "bg-cyan-700 border-cyan-700 shadow-sm"
                      : "border-slate-350 group-hover:border-slate-400"
                  }`}
                >
                  {isChecked && <Check className="text-white size-3 stroke-[3.5px]" />}
                </div>
                <span className="text-xs font-medium font-['Wix_Madefor_Text'] select-none">
                  {type}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Regions Checklist */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-bold text-slate-400 tracking-wider font-['Wix_Madefor_Text'] uppercase">
          Region
        </h3>
        <div className="flex flex-col gap-3">
          {regions.map((region) => {
            const isChecked = selectedRegions.includes(region);
            return (
              <label
                key={region}
                className="flex items-center gap-3 cursor-pointer group text-slate-600 hover:text-slate-900 transition-colors"
              >
                <div
                  onClick={() => toggleRegion(region)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                    isChecked
                      ? "bg-cyan-700 border-cyan-700 shadow-sm"
                      : "border-slate-350 group-hover:border-slate-400"
                  }`}
                >
                  {isChecked && <Check className="text-white size-3 stroke-[3.5px]" />}
                </div>
                <span className="text-xs font-medium font-['Wix_Madefor_Text'] select-none">
                  {region}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Clear All Filters Block */}
      <div className="flex flex-col gap-3 pt-6 border-t border-slate-100">
        <span className="text-xs font-semibold text-slate-500 font-['Wix_Madefor_Text'] text-left">
          Filters
        </span>
        <button
          onClick={clearAllFilters}
          className="w-full py-3 bg-white hover:bg-rose-50/50 border border-rose-500 hover:border-rose-600 text-rose-500 hover:text-rose-600 font-semibold font-['Wix_Madefor_Text'] text-sm rounded-lg transition-all"
        >
          Clear All Filters
        </button>
      </div>

    </aside>
  );
};
