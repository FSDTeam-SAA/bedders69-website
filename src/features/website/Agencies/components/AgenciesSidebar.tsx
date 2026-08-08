import React from "react";
import { Check } from "lucide-react";

interface AgenciesSidebarProps {
  selectedServices: string[];
  toggleService: (service: string) => void;
  selectedRegions: string[];
  toggleRegion: (region: string) => void;
  selectedRating: string;
  setSelectedRating: (rating: string) => void;
  clearAllFilters: () => void;
}

export const AgenciesSidebar = ({
  selectedServices,
  toggleService,
  selectedRegions,
  toggleRegion,
  selectedRating,
  setSelectedRating,
  clearAllFilters,
}: AgenciesSidebarProps) => {

  const services = [
    "Residential Care",
    "Home Care",
    "Live-In Care",
    "Dementia Care",
    "Palliative Care",
  ];

  const regions = [
    "London",
    "Manchester",
    "Birmingham",
    "Bristol",
  ];

  const ratings = [
    "5 Stars",
    "4+ Stars",
    "3+ Stars",
  ];

  return (
    <aside className="w-full lg:w-72 bg-white border border-slate-100 rounded-2xl p-6 flex flex-col gap-6 shadow-sm font-['Wix_Madefor_Text'] select-none">
      
      {/* Sidebar Title */}
      <div>
        <h2 className="text-base font-bold text-slate-800">
          Filters
        </h2>
      </div>

      {/* Service Type */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Service Type
        </h3>
        <div className="flex flex-col gap-3">
          {services.map((service) => {
            const isChecked = selectedServices.includes(service);
            return (
              <label key={service} className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => toggleService(service)}
                  className={`size-4.5 rounded border flex items-center justify-center transition-all ${
                    isChecked
                      ? "bg-cyan-700 border-cyan-700 text-white"
                      : "border-slate-200 group-hover:border-slate-300 bg-white"
                  }`}
                >
                  {isChecked && <Check className="size-3.5 stroke-[3]" />}
                </div>
                <span className="text-sm text-slate-500 group-hover:text-slate-900 transition-colors font-medium">
                  {service}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Region */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Region
        </h3>
        <div className="flex flex-col gap-3">
          {regions.map((region) => {
            const isChecked = selectedRegions.includes(region);
            return (
              <label key={region} className="flex items-center gap-3 cursor-pointer group">
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

      {/* Rating */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Rating
        </h3>
        <div className="flex flex-col gap-3">
          {ratings.map((rating) => {
            const isChecked = selectedRating === rating;
            return (
              <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => setSelectedRating(isChecked ? "" : rating)}
                  className={`size-4.5 rounded border flex items-center justify-center transition-all ${
                    isChecked
                      ? "bg-cyan-700 border-cyan-700 text-white"
                      : "border-slate-200 group-hover:border-slate-300 bg-white"
                  }`}
                >
                  {isChecked && <Check className="size-3.5 stroke-[3]" />}
                </div>
                <span className="text-sm text-slate-500 group-hover:text-slate-900 transition-colors font-medium">
                  {rating}
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
