import React, { useState } from "react";
import { Star, MapPin, ChevronLeft, ChevronRight, Building2, Phone } from "lucide-react";

export interface AgencyProps {
  name: string;
  location: string;
  rating: string;
  reviews: number;
  services: string[];
  imageBg: string;
}

interface AgenciesListProps {
  searchQuery: string;
  selectedServices: string[];
  selectedRegions: string[];
  selectedRating: string;
  onContactClick: (agencyName: string) => void;
}

export const AgenciesList = ({
  searchQuery,
  selectedServices,
  selectedRegions,
  selectedRating,
  onContactClick,
}: AgenciesListProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const initialAgencies: AgencyProps[] = [
    {
      name: "CareFirst Recruitment",
      location: "London, UK",
      rating: "4.9",
      reviews: 142,
      services: ["Residential Care", "Home Care"],
      imageBg: "bg-gradient-to-r from-blue-500 to-indigo-600",
    },
    {
      name: "Apex Care Agency",
      location: "Manchester, UK",
      rating: "4.8",
      reviews: 98,
      services: ["Live-In Care", "Dementia Care"],
      imageBg: "bg-gradient-to-r from-teal-500 to-cyan-600",
    },
    {
      name: "Guardian Staffing",
      location: "Birmingham, UK",
      rating: "4.7",
      reviews: 75,
      services: ["Palliative Care", "Home Care"],
      imageBg: "bg-gradient-to-r from-violet-500 to-purple-600",
    },
    {
      name: "Sunrise Health Link",
      location: "London, UK",
      rating: "4.9",
      reviews: 110,
      services: ["Residential Care", "Dementia Care"],
      imageBg: "bg-gradient-to-r from-emerald-500 to-teal-600",
    },
    {
      name: "Elite Carers Direct",
      location: "Bristol, UK",
      rating: "4.6",
      reviews: 54,
      services: ["Live-In Care", "Home Care"],
      imageBg: "bg-gradient-to-r from-amber-500 to-orange-600",
    },
    {
      name: "Beacon Recruitment",
      location: "Manchester, UK",
      rating: "4.5",
      reviews: 42,
      services: ["Palliative Care", "Residential Care"],
      imageBg: "bg-gradient-to-r from-rose-500 to-pink-600",
    }
  ];

  // Filters logic
  const filteredAgencies = initialAgencies.filter((agency) => {
    // 1. Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesName = agency.name.toLowerCase().includes(q);
      const matchesLocation = agency.location.toLowerCase().includes(q);
      const matchesServices = agency.services.some(s => s.toLowerCase().includes(q));
      if (!matchesName && !matchesLocation && !matchesServices) return false;
    }

    // 2. Service types
    if (selectedServices.length > 0) {
      const matchesService = agency.services.some(s => selectedServices.includes(s));
      if (!matchesService) return false;
    }

    // 3. Region
    if (selectedRegions.length > 0) {
      const matchesRegion = selectedRegions.some(reg => agency.location.toLowerCase().includes(reg.toLowerCase()));
      if (!matchesRegion) return false;
    }

    // 4. Rating
    if (selectedRating) {
      const minRating = parseFloat(selectedRating.split("+")[0] || selectedRating.split(" ")[0]);
      if (parseFloat(agency.rating) < minRating) return false;
    }

    return true;
  });

  return (
    <div className="flex-1 flex flex-col gap-6 font-['Wix_Madefor_Text'] w-full">
      
      {/* Title block */}
      <div className="flex justify-between items-end border-b border-slate-100 pb-3">
        <h2 className="text-xl font-bold text-slate-800 font-['Poppins']">
          Recruitment Agencies ({filteredAgencies.length})
        </h2>
      </div>

      {/* Grid of cards */}
      {filteredAgencies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgencies.map((agency, index) => {
            return (
              <div
                key={index}
                className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
              >
                
                {/* Header Banner Logo block */}
                <div className={`w-full h-32 ${agency.imageBg} flex items-center justify-center relative`}>
                  <Building2 className="size-10 text-white/90" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-white/95 px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm text-xs font-bold text-slate-800">
                    <Star className="size-3 fill-amber-400 text-amber-400" />
                    <span>{agency.rating}</span>
                  </div>
                </div>

                {/* Info block */}
                <div className="p-5 flex-1 flex flex-col gap-3">
                  
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base font-bold text-slate-800 leading-tight">
                      {agency.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                      <MapPin className="size-3.5" />
                      <span>{agency.location}</span>
                    </div>
                  </div>

                  {/* Stars Rating line */}
                  <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold mt-1">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`size-3.5 ${
                            i < Math.floor(parseFloat(agency.rating))
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-slate-600 ml-1">
                      {agency.rating} ({agency.reviews} reviews)
                    </span>
                  </div>

                  {/* Services badges list */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {agency.services.map((serv) => (
                      <span
                        key={serv}
                        className="bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 px-2 py-0.5 rounded"
                      >
                        {serv}
                      </span>
                    ))}
                  </div>

                  {/* Contact Button */}
                  <button
                    onClick={() => onContactClick(agency.name)}
                    className="w-full mt-auto py-2.5 bg-white hover:bg-[#E5F2FC] text-[#2D6A9F] border border-[#2D6A9F]/40 hover:border-[#2D6A9F] text-xs font-semibold rounded-xl transition-all cursor-pointer text-center active:scale-98"
                  >
                    Contact
                  </button>

                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-sm font-medium text-slate-500 text-center">
            No recruitment agencies match your filter selections.
          </p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 pt-6 border-t border-slate-100 font-['Poppins']">
        <span className="text-xs text-slate-400 font-medium">
          Showing 1 to {filteredAgencies.length} of {filteredAgencies.length} results
        </span>
        
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="size-8.5 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all cursor-pointer bg-white"
          >
            <ChevronLeft className="size-4" />
          </button>
          
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
            onClick={() => setCurrentPage((p) => Math.min(1, p + 1))}
            className="size-8.5 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all cursor-pointer bg-white"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
