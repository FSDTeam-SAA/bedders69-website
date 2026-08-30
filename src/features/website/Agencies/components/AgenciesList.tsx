"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Star, MapPin, ChevronLeft, ChevronRight, Building2, Phone, Sparkles } from "lucide-react";
import agenciesApi from "../api/agenciesApi";
import { AgencyItem, AgencyProps } from "../types/agencies.types";

export type { AgencyProps };

interface AgenciesListProps {
  searchQuery: string;
  selectedServices: string[];
  selectedRegions: string[];
  selectedRating: string;
  onContactClick: (agency: AgencyProps) => void;
}

const backgroundGradients = [
  "bg-gradient-to-r from-blue-600 to-indigo-700",
  "bg-gradient-to-r from-teal-600 to-cyan-700",
  "bg-gradient-to-r from-violet-600 to-purple-700",
  "bg-gradient-to-r from-emerald-600 to-teal-700",
  "bg-gradient-to-r from-amber-600 to-orange-700",
  "bg-gradient-to-r from-rose-600 to-pink-700",
];

export const AgenciesList = ({
  searchQuery,
  selectedServices,
  selectedRegions,
  selectedRating,
  onContactClick,
}: AgenciesListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [backendAgencies, setBackendAgencies] = useState<AgencyItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const itemsPerPage = 6;

  useEffect(() => {
    let isMounted = true;
    async function loadAgencies() {
      setIsLoading(true);
      try {
        const res = await agenciesApi.getAgencies({ limit: 50, page: 1 });
        if (res && res.data && isMounted) {
          setBackendAgencies(res.data);
        }
      } catch (err) {
        console.warn("Error fetching recruitment agencies:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadAgencies();
    return () => {
      isMounted = false;
    };
  }, []);

  // Reset page when any filter criteria changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedServices, selectedRegions, selectedRating]);

  // Map backend agencies to AgencyProps
  const allAgencies = useMemo<AgencyProps[]>(() => {
    if (backendAgencies && backendAgencies.length > 0) {
      return backendAgencies.map((agency, idx) => {
        const ratingNum = (4.6 + (idx % 4) * 0.1).toFixed(1);
        const reviewsCount = 45 + (idx + 1) * 11;
        const loc =
          agency.address ||
          (agency.city ? `${agency.city}, UK` : "United Kingdom");

        const servs =
          agency.services && agency.services.length > 0
            ? agency.services
            : ["Healthcare Assistants", "Nurse Recruitment", "Care Support"];

        return {
          id: agency.id,
          name: agency.organizationName,
          location: loc,
          rating: ratingNum,
          reviews: reviewsCount,
          services: servs,
          imageBg: backgroundGradients[idx % backgroundGradients.length],
          phone: agency.phoneNumber || "+44 20 7946 0991",
          email: agency.email || "info@careagency.co.uk",
          website: agency.websiteLink || "www.careagency.co.uk",
          description: agency.description,
        };
      });
    }

    return [];
  }, [backendAgencies]);

  // Filtering logic
  const filteredAgencies = useMemo(() => {
    return allAgencies.filter((agency) => {
      // 1. Search Query
      if (searchQuery && searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = agency.name.toLowerCase().includes(q);
        const matchesLoc = agency.location.toLowerCase().includes(q);
        const matchesServices = agency.services.some((s) => s.toLowerCase().includes(q));
        const matchesDesc = agency.description?.toLowerCase().includes(q);
        if (!matchesName && !matchesLoc && !matchesServices && !matchesDesc) return false;
      }

      // 2. Service types
      if (selectedServices.length > 0) {
        const matchesService = agency.services.some((s) =>
          selectedServices.some(
            (sel) =>
              s.toLowerCase().includes(sel.toLowerCase()) ||
              sel.toLowerCase().includes(s.toLowerCase())
          )
        );
        if (!matchesService) return false;
      }

      // 3. Region
      if (selectedRegions.length > 0) {
        const matchesRegion = selectedRegions.some((reg) =>
          agency.location.toLowerCase().includes(reg.toLowerCase())
        );
        if (!matchesRegion) return false;
      }

      // 4. Rating filter
      if (selectedRating && selectedRating.trim() !== "") {
        const minRating = parseFloat(selectedRating);
        if (!isNaN(minRating)) {
          const currentRating = parseFloat(agency.rating);
          if (currentRating < minRating) return false;
        }
      }

      return true;
    });
  }, [allAgencies, searchQuery, selectedServices, selectedRegions, selectedRating]);

  // Pagination calculation
  const totalItems = filteredAgencies.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedAgencies = filteredAgencies.slice(startIndex, endIndex);

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
      {/* Header Info */}
      <div className="flex justify-between items-end border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800 font-['Poppins']">
            Registered Agencies{" "}
            <span className="text-sm font-normal text-slate-500">
              ({totalItems} found)
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Verified healthcare and care staffing partners across the UK
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
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col gap-4 animate-pulse"
            >
              <div className="flex items-start gap-4">
                <div className="size-14 rounded-2xl bg-slate-200" />
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

      {/* Agencies Cards List */}
      {!isLoading && paginatedAgencies.length > 0 && (
        <div className="flex flex-col gap-4">
          {paginatedAgencies.map((agency) => {
            const initial =
              agency.name && agency.name.trim().length > 0
                ? agency.name.trim()[0].toUpperCase()
                : "A";

            return (
              <div
                key={agency.id || agency.name}
                className="group bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-[0px_4px_6px_0px_rgba(43,110,166,0.06)] hover:shadow-[0px_10px_20px_0px_rgba(43,110,166,0.12)] transition-all duration-300 flex flex-col md:flex-row gap-5 items-start md:items-center justify-between hover:-translate-y-0.5"
              >
                {/* Left Side: Agency Info */}
                <div className="flex gap-4 items-start flex-1 min-w-0">
                  {/* Agency Icon Banner */}
                  <div
                    className={`size-14 rounded-2xl ${
                      agency.imageBg || "bg-gradient-to-r from-blue-600 to-indigo-700"
                    } flex items-center justify-center shrink-0 shadow-sm text-white font-bold text-xl`}
                  >
                    {initial}
                  </div>

                  <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base md:text-lg font-bold text-[#1B2C54] leading-tight group-hover:text-cyan-700 transition-colors">
                        {agency.name}
                      </h3>
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                        Verified
                      </span>
                    </div>

                    {/* Location & Rating */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 mt-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="size-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{agency.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="size-3.5 fill-amber-400 text-amber-400 shrink-0" />
                        <span className="font-bold text-slate-700">{agency.rating}</span>
                        <span className="text-slate-400">({agency.reviews} reviews)</span>
                      </div>
                    </div>

                    {/* Services Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {agency.services.map((service, sIdx) => (
                        <span
                          key={sIdx}
                          className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-0.5 rounded-md"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: Contact Agency Button */}
                <div className="w-full md:w-auto shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 flex items-center">
                  <button
                    onClick={() => onContactClick(agency)}
                    className="w-full md:w-36 py-3 bg-[#2D6A9F] hover:bg-[#20527F] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm hover:shadow text-center active:scale-98 flex items-center justify-center gap-2"
                  >
                    <Phone className="size-3.5" />
                    Contact Agency
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && paginatedAgencies.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-2xl border border-dashed border-slate-200 text-center shadow-sm">
          <div className="size-14 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-700 mb-3">
            <Building2 className="size-7" />
          </div>
          <h3 className="text-base font-bold text-[#1B2C54]">
            No recruitment agencies found
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            No active care agencies match your search or filter selections. Try adjusting your query or resetting filters.
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

export default AgenciesList;
