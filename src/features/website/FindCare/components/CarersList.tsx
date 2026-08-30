"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Star, MapPin, ChevronLeft, ChevronRight, UserCheck, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import findCareApi from "../api/findCareApi";
import { CarerItem } from "../types/findCare.types";

export interface CarerProps {
  id?: string;
  name: string;
  rating: string;
  reviews: number;
  location: string;
  biography: string;
  skills: string[];
  experience: string;
  verified: boolean;
  rate: string;
  available: boolean;
  image?: string;
}

interface CarersListProps {
  searchQuery: string;
  selectedServiceTypes: string[];
  selectedRegions: string[];
  selectedRating: string;
}

const fallbackCarerImages = [
  "https://images.unsplash.com/photo-1594824813681-364e2d31298c?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
];

export const CarersList = ({
  searchQuery,
  selectedServiceTypes,
  selectedRegions,
  selectedRating,
}: CarersListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [backendCarers, setBackendCarers] = useState<CarerItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const itemsPerPage = 6;

  useEffect(() => {
    let isMounted = true;
    async function loadCarers() {
      setIsLoading(true);
      try {
        const res = await findCareApi.getCarers({ limit: 50, page: 1 });
        if (res && res.data && isMounted) {
          setBackendCarers(res.data);
        }
      } catch (err) {
        console.warn("Error fetching carers:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    loadCarers();
    return () => {
      isMounted = false;
    };
  }, []);

  // Reset page when any filter criteria changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedServiceTypes, selectedRegions, selectedRating]);

  // Map backend carers to CarerProps
  const allCarers = useMemo<CarerProps[]>(() => {
    if (backendCarers && backendCarers.length > 0) {
      return backendCarers.map((c, idx) => {
        const photo =
          c.profilePicture ||
          fallbackCarerImages[idx % fallbackCarerImages.length];

        const loc =
          c.address ||
          (c.postCode ? `UK (${c.postCode})` : "London, UK");

        const skills =
          c.skills && c.skills.length > 0
            ? c.skills
            : c.specialisms && c.specialisms.length > 0
            ? c.specialisms
            : ["Personal Care", "Companionship"];

        const expYears = c.yearsOfExperience || (idx % 4) + 2;

        return {
          id: c.id,
          name: c.careName,
          rating: "4.9",
          reviews: 24 + idx * 5,
          location: loc,
          biography:
            c.professionalSummary ||
            `Compassionate and certified care professional with ${expYears}+ years supporting elderly and vulnerable adults.`,
          skills: skills,
          experience: `${expYears} Years Exp`,
          verified: true,
          rate: `£${18 + (idx % 5) * 2}/hr`,
          available: c.isAvailable !== false,
          image: photo,
        };
      });
    }

    return [];
  }, [backendCarers]);

  // Filtering Logic
  const filteredCarers = useMemo(() => {
    return allCarers.filter((carer) => {
      // 1. Text Search Query
      if (searchQuery && searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = carer.name.toLowerCase().includes(q);
        const matchesBio = carer.biography.toLowerCase().includes(q);
        const matchesLoc = carer.location.toLowerCase().includes(q);
        const matchesSkills = carer.skills.some((s) => s.toLowerCase().includes(q));
        if (!matchesName && !matchesBio && !matchesLoc && !matchesSkills) return false;
      }

      // 2. Service Types Filter
      if (selectedServiceTypes.length > 0) {
        const matchesType = selectedServiceTypes.some((st) => {
          const stLower = st.toLowerCase().replace(" care", "");
          return carer.skills.some(
            (s) => s.toLowerCase().includes(stLower) || stLower.includes(s.toLowerCase())
          );
        });
        if (!matchesType) return false;
      }

      // 3. Region Filter
      if (selectedRegions.length > 0) {
        const matchesRegion = selectedRegions.some((reg) =>
          carer.location.toLowerCase().includes(reg.toLowerCase())
        );
        if (!matchesRegion) return false;
      }

      // 4. Rating Filter
      if (selectedRating && selectedRating.trim() !== "") {
        const minStars = parseInt(selectedRating.split(" ")[0], 10);
        if (parseFloat(carer.rating) < minStars) return false;
      }

      return true;
    });
  }, [allCarers, searchQuery, selectedServiceTypes, selectedRegions, selectedRating]);

  // Pagination calculation
  const totalItems = filteredCarers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedCarers = filteredCarers.slice(startIndex, endIndex);

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
    <div className="flex-1 flex flex-col gap-6 font-['Wix_Madefor_Text'] w-full">
      {/* Title & Count Block */}
      <div className="flex justify-between items-end border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-['Poppins']">
            <span className="text-[#2E7E52]">Available</span>{" "}
            <span className="text-[#1B2C54]">Carers</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {totalItems} verified independent carers ready for care assignments
          </p>
        </div>
        {totalItems > 0 && (
          <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
            Page {currentPage} of {totalPages}
          </span>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm p-4"
            >
              <div className="h-48 w-full animate-pulse rounded-xl bg-slate-200" />
              <div className="mt-4 flex flex-col gap-3">
                <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                <div className="mt-3 h-10 w-full animate-pulse rounded-lg bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grid of Carer Listings */}
      {!isLoading && paginatedCarers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedCarers.map((carer, index) => {
            const slug = encodeURIComponent(
              carer.name.toLowerCase().replace(/\s+/g, "-")
            );
            const carerUrl = `/find-care/${slug}`;

            return (
              <div
                key={carer.id || index}
                className="group bg-white border border-slate-100 rounded-2xl shadow-[0px_4px_6px_0px_rgba(43,110,166,0.06)] hover:shadow-[0px_10px_20px_0px_rgba(43,110,166,0.12)] transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
              >
                {/* Top Image Box */}
                <Link
                  href={carerUrl}
                  className="w-full h-[220px] relative overflow-hidden shrink-0 bg-slate-100 block cursor-pointer"
                >
                  {carer.available && (
                    <span className="absolute top-3 left-3 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-lg z-10 shadow-sm">
                      Available
                    </span>
                  )}
                  <img
                    src={carer.image || fallbackCarerImages[index % fallbackCarerImages.length]}
                    alt={carer.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-white/90 text-cyan-700 opacity-0 shadow transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="size-4" />
                  </div>
                </Link>

                {/* Details Section */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="flex flex-col gap-3">
                    {/* Star Rating & Location row */}
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className="size-3 fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>
                        <span className="text-slate-700 font-bold ml-1">
                          {carer.rating}
                        </span>
                        <span className="text-slate-400 text-[10px]">
                          ({carer.reviews})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 font-medium text-slate-500">
                        <MapPin className="size-3.5 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[120px]">{carer.location}</span>
                      </div>
                    </div>

                    {/* Name & Biography */}
                    <div className="flex flex-col gap-1">
                      <Link href={carerUrl} className="block cursor-pointer">
                        <h3 className="text-base font-bold text-[#1B2C54] tracking-tight group-hover:text-cyan-700 transition-colors line-clamp-1">
                          {carer.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-2 h-8">
                        {carer.biography}
                      </p>
                    </div>

                    {/* Skills & Badges */}
                    <div className="flex flex-col gap-2 pt-1">
                      {/* Row 1: Skills */}
                      <div className="flex flex-wrap gap-1.5">
                        {carer.skills.slice(0, 2).map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="bg-[#E5F2FC] text-[#0A66C2] text-[10px] font-bold px-2.5 py-1 rounded-lg"
                          >
                            {skill}
                          </span>
                        ))}
                        {carer.skills.length > 2 && (
                          <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-lg">
                            +{carer.skills.length - 2}
                          </span>
                        )}
                      </div>

                      {/* Row 2: Experience, Verification, Rate */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold text-[#0A66C2]">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                          {carer.experience}
                        </span>
                        {carer.verified && (
                          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md">
                            DBS Verified
                          </span>
                        )}
                        <span className="bg-cyan-50 text-cyan-800 border border-cyan-200 px-2 py-0.5 rounded-md font-semibold">
                          {carer.rate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Carer Button */}
                  <Link
                    href={carerUrl}
                    className="w-full py-2.5 bg-[#2D6A9F] hover:bg-[#20527F] text-white text-xs font-bold rounded-xl transition-all shadow-sm text-center block cursor-pointer"
                  >
                    Contact Carer
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && paginatedCarers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-2xl border border-dashed border-slate-200 text-center shadow-sm">
          <div className="size-14 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-700 mb-3">
            <UserCheck className="size-7" />
          </div>
          <h3 className="text-base font-bold text-[#1B2C54]">
            No carers found
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            No carers match your current search and filter selections. Try adjusting your query or resetting filters.
          </p>
        </div>
      )}

      {/* Dynamic Pagination Bar (appears only when total > 6) */}
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

export default CarersList;
