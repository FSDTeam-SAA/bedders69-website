import React, { useState } from "react";
import { MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { companies } from "@/Data/data";

interface ServicesListProps {
  searchQuery: string;
  selectedLocation: string;
  selectedServiceTypes: string[];
  selectedRegions: string[];
  selectedRating: string;
}

export const ServicesList = ({
  searchQuery,
  selectedLocation,
  selectedServiceTypes,
  selectedRegions,
  selectedRating,
}: ServicesListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Custom provider images matching Figma screenshots theme
  const providerImages = [
    "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1586773860418-d3b3dae6186f?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1586773860418-d3b3dae6186f?auto=format&fit=crop&q=80&w=400",
  ];

  const mapServiceTypeToTag = (type: string) => {
    switch (type) {
      case "Residential Care":
        return "Residential";
      case "Home Care":
        return "Home Care";
      case "Dementia Care":
        return "Dementia Care";
      case "Palliative Care":
        return "Nursing";
      case "Respite Care":
        return "Supported Living";
      default:
        return type;
    }
  };

  const filteredCompanies = companies.filter((company) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesName = company.name.toLowerCase().includes(q);
      const matchesLoc = company.location.toLowerCase().includes(q);
      if (!matchesName && !matchesLoc) return false;
    }

    if (selectedLocation) {
      if (!company.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }
    }

    if (selectedRegions.length > 0) {
      const matchesRegion = selectedRegions.some((reg) =>
        company.location.toLowerCase().includes(reg.toLowerCase())
      );
      if (!matchesRegion) return false;
    }

    if (selectedServiceTypes.length > 0) {
      const mappedTags = selectedServiceTypes.map(mapServiceTypeToTag);
      const matchesType = company.tags.some((tag) => mappedTags.includes(tag));
      if (!matchesType) return false;
    }

    if (selectedRating) {
      const stars = parseInt(selectedRating.split(" ")[0], 10);
      const companyRating = parseFloat(company.rating);
      if (companyRating < stars || companyRating >= stars + 1) {
        return false;
      }
    }

    return true;
  });

  const totalItems = filteredCompanies.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-8 w-full">
      
      {/* Grid of Listings - 3 Columns on large screens */}
      {paginatedCompanies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedCompanies.map((company, index) => {
            const imageIndex = index % providerImages.length;
            return (
              <div
                key={company.name + "-" + index}
                className="flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Image */}
                <div className="h-44 w-full relative">
                  <img
                    src={providerImages[imageIndex]}
                    alt={company.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details Content */}
                <div className="p-5 flex flex-col justify-between flex-1 gap-5">
                  <div className="flex flex-col gap-3">
                    
                    {/* Care Group Name */}
                    <h3 className="text-base font-bold text-[#1B2C54] font-['Wix_Madefor_Text'] leading-tight">
                      {company.name}
                    </h3>

                    {/* Location Pin */}
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <MapPin className="size-3.5 shrink-0" />
                      <span className="text-xs font-['Wix_Madefor_Text'] font-medium truncate">
                        {company.location}
                      </span>
                    </div>

                    {/* Star Ratings */}
                    <div className="flex items-center gap-1">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`size-3.5 fill-amber-400 text-transparent`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-slate-700 font-['Inter'] ml-1">
                        {company.rating}
                      </span>
                      <span className="text-[10px] text-slate-400 font-['Inter']">
                        ({company.reviews.split(" ")[0]} reviews)
                      </span>
                    </div>

                    {/* Styled Badges Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {company.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-[#E5F2FC] text-[#0A66C2] text-[10px] font-bold font-['Wix_Madefor_Text'] px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="bg-slate-100 text-slate-500 text-[10px] font-bold font-['Wix_Madefor_Text'] px-3 py-1 rounded-full">
                        +1
                      </span>
                    </div>

                  </div>

                  {/* View Details Button (Blue) */}
                  <Link
                    href={`/services/${encodeURIComponent(company.name.toLowerCase().replace(/\s+/g, "-"))}`}
                    className="w-full py-2.5 bg-[#2D6A9F] hover:bg-[#20527F] text-white text-xs font-bold font-['Wix_Madefor_Text'] rounded-lg transition-all shadow-sm text-center block cursor-pointer"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-sm font-medium text-slate-500 font-['Wix_Madefor_Text'] text-center">
            No care providers match your filters.
          </p>
          <p className="text-xs text-slate-400 font-['Wix_Madefor_Text'] mt-1">
            Try adjusting your search query or clear all filters.
          </p>
        </div>
      )}

      {/* Pagination Container */}
      {totalItems > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100 mt-4">
          <span className="text-xs text-slate-400 font-medium font-['Poppins']">
            Showing {startIndex + 1} to {endIndex} of {totalItems} results
          </span>

          <div className="flex items-center gap-1.5">
            {/* Previous square button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-8 h-8 rounded border flex items-center justify-center transition-all ${
                currentPage === 1
                  ? "text-slate-300 border-slate-100 cursor-not-allowed"
                  : "text-slate-600 border-slate-200 hover:bg-slate-50 active:scale-95"
              }`}
            >
              <ChevronLeft className="size-3.5" />
            </button>

            {/* Page number buttons */}
            <button
              onClick={() => handlePageChange(1)}
              className={`w-8 h-8 rounded font-medium font-['Poppins'] text-xs transition-all ${
                currentPage === 1
                  ? "bg-[#2D6A9F] text-white border border-[#2D6A9F]"
                  : "text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              1
            </button>

            <button
              onClick={() => handlePageChange(2)}
              className={`w-8 h-8 rounded font-medium font-['Poppins'] text-xs transition-all ${
                currentPage === 2
                  ? "bg-[#2D6A9F] text-white border border-[#2D6A9F]"
                  : "text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              2
            </button>

            <button
              onClick={() => handlePageChange(3)}
              className={`w-8 h-8 rounded font-medium font-['Poppins'] text-xs transition-all ${
                currentPage === 3
                  ? "bg-[#2D6A9F] text-white border border-[#2D6A9F]"
                  : "text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              3
            </button>

            <span className="text-slate-300 px-1 font-['Poppins'] text-xs">...</span>

            <button
              onClick={() => handlePageChange(8)}
              className={`w-8 h-8 rounded font-medium font-['Poppins'] text-xs transition-all ${
                currentPage === 8
                  ? "bg-[#2D6A9F] text-white border border-[#2D6A9F]"
                  : "text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              8
            </button>

            {/* Next square button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-8 h-8 rounded border flex items-center justify-center transition-all ${
                currentPage === totalPages
                  ? "text-slate-300 border-slate-100 cursor-not-allowed"
                  : "text-slate-600 border-slate-200 hover:bg-slate-50 active:scale-95"
              }`}
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
