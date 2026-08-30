"use client";

import React, { useState, useEffect, useMemo } from "react";
import { MapPin, Star, ChevronLeft, ChevronRight, Building2, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import servicesApi from "../api/servicesApi";
import { CareCompanyItem } from "../types/services.types";
import { companies as fallbackCompanies } from "@/Data/data";

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
  const [backendCompanies, setBackendCompanies] = useState<CareCompanyItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const itemsPerPage = 6;

  // Custom provider images for nice fallback visual appearance
  const providerImages = [
    "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=400",
  ];

  // Fetch all care companies from backend API
  useEffect(() => {
    let isMounted = true;
    async function fetchCompanies() {
      setIsLoading(true);
      try {
        const response = await servicesApi.getCareCompanies({
          limit: 50,
          page: 1,
        });

        if (response && response.data && isMounted) {
          setBackendCompanies(response.data);
        }
      } catch (err) {
        console.warn("Could not fetch care companies:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchCompanies();
    return () => {
      isMounted = false;
    };
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedLocation, selectedServiceTypes, selectedRegions, selectedRating]);

  // Combine backend companies with formatted properties
  const allCompanies = useMemo(() => {
    if (backendCompanies && backendCompanies.length > 0) {
      return backendCompanies.map((c, index) => {
        const image =
          c.coverPhoto ||
          c.logo ||
          providerImages[index % providerImages.length];

        const loc =
          c.address ||
          c.postCode ||
          (c.coverageRegions && c.coverageRegions.length > 0
            ? c.coverageRegions.join(", ")
            : "United Kingdom");

        const tags =
          c.serviceOffered && c.serviceOffered.length > 0
            ? c.serviceOffered
            : ["Care Provider", "Verified"];

        return {
          id: c.id,
          name: c.companyName,
          location: loc,
          tags: tags,
          image: image,
          rating: "4.9",
          reviews: "18 reviews",
          email: c.email,
          phone: c.phoneNumber,
          website: c.websiteLink,
          coverageRegions: c.coverageRegions || [loc],
        };
      });
    }

    // Fallback to static data if backend returned empty
    return fallbackCompanies.map((c, index) => ({
      id: `static-${index}`,
      name: c.name,
      location: c.location,
      tags: c.tags,
      image: providerImages[index % providerImages.length],
      rating: c.rating,
      reviews: c.reviews,
      email: "",
      phone: "",
      website: "",
      coverageRegions: [c.location],
    }));
  }, [backendCompanies]);

  // Filter based on active search criteria
  const filteredCompanies = useMemo(() => {
    return allCompanies.filter((company) => {
      // 1. Text search (name, location, or tags)
      if (searchQuery && searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = company.name.toLowerCase().includes(q);
        const matchesLoc = company.location.toLowerCase().includes(q);
        const matchesTag = company.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesLoc && !matchesTag) return false;
      }

      // 2. Location filter from Hero dropdown
      if (selectedLocation && selectedLocation.trim() !== "") {
        const locQ = selectedLocation.toLowerCase().trim();
        const matchesLocation = company.location.toLowerCase().includes(locQ);
        const matchesRegions = company.coverageRegions?.some((r) =>
          r.toLowerCase().includes(locQ)
        );
        if (!matchesLocation && !matchesRegions) return false;
      }

      // 3. Regions checklist filter from Sidebar
      if (selectedRegions.length > 0) {
        const matchesRegion = selectedRegions.some((reg) =>
          company.location.toLowerCase().includes(reg.toLowerCase()) ||
          company.coverageRegions?.some((r) => r.toLowerCase().includes(reg.toLowerCase()))
        );
        if (!matchesRegion) return false;
      }

      // 4. Service Types checklist filter from Sidebar
      if (selectedServiceTypes.length > 0) {
        const matchesType = selectedServiceTypes.some((selectedType) => {
          const sTypeLower = selectedType.toLowerCase().replace(" care", "");
          return company.tags.some((tag) =>
            tag.toLowerCase().includes(sTypeLower) || sTypeLower.includes(tag.toLowerCase())
          );
        });
        if (!matchesType) return false;
      }

      // 5. Rating filter
      if (selectedRating && selectedRating.trim() !== "") {
        const stars = parseInt(selectedRating.split(" ")[0], 10);
        const companyRating = parseFloat(company.rating);
        if (companyRating < stars || companyRating >= stars + 1) {
          return false;
        }
      }

      return true;
    });
  }, [allCompanies, searchQuery, selectedLocation, selectedRegions, selectedServiceTypes, selectedRating]);

  // Pagination calculation
  const totalItems = filteredCompanies.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of listing section smoothly
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 380, behavior: "smooth" });
      }
    }
  };

  // Generate page numbers array dynamically
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
    <div className="flex-1 flex flex-col gap-8 w-full">
      {/* Header Info & Count */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h2 className="text-lg font-bold text-[#1B2C54]">
          Care Providers{" "}
          <span className="text-sm font-normal text-slate-500">
            ({totalItems} found)
          </span>
        </h2>
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
              <div className="h-44 w-full animate-pulse rounded-xl bg-slate-200" />
              <div className="mt-4 flex flex-col gap-3">
                <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
                <div className="mt-3 h-10 w-full animate-pulse rounded-lg bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grid of Listings */}
      {!isLoading && paginatedCompanies.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedCompanies.map((company) => {
            const slug = encodeURIComponent(
              company.name.toLowerCase().replace(/\s+/g, "-")
            );
            const detailsUrl = `/services/${slug}`;

            return (
              <div
                key={company.id || company.name}
                className="group flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-[0px_4px_6px_0px_rgba(43,110,166,0.06)] hover:shadow-[0px_10px_20px_0px_rgba(43,110,166,0.12)] transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <Link
                  href={detailsUrl}
                  className="h-44 w-full relative overflow-hidden bg-slate-100 block cursor-pointer"
                >
                  <img
                    src={company.image}
                    alt={company.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-white/90 text-cyan-700 opacity-0 shadow transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="size-4" />
                  </div>
                </Link>

                {/* Details Content */}
                <div className="p-5 flex flex-col justify-between flex-1 gap-5">
                  <div className="flex flex-col gap-3">
                    {/* Care Group Name */}
                    <Link href={detailsUrl} className="block cursor-pointer">
                      <h3 className="text-base font-bold text-[#1B2C54] line-clamp-1 group-hover:text-cyan-700 transition-colors">
                        {company.name}
                      </h3>
                    </Link>

                    {/* Location Pin */}
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <MapPin className="size-3.5 shrink-0" />
                      <span className="text-xs font-medium truncate">
                        {company.location}
                      </span>
                    </div>

                    {/* Star Ratings */}
                    <div className="flex items-center gap-1">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="size-3.5 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-slate-700 ml-1">
                        {company.rating}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        ({company.reviews.split(" ")[0]} reviews)
                      </span>
                    </div>

                    {/* Badges / Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {company.tags.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-[#E5F2FC] text-[#0A66C2] text-[10px] font-bold px-2.5 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {company.tags.length > 2 && (
                        <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2.5 py-1 rounded-full">
                          +{company.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Link
                    href={detailsUrl}
                    className="w-full py-2.5 bg-[#2D6A9F] hover:bg-[#20527F] text-white text-xs font-bold rounded-xl transition-all shadow-sm text-center block cursor-pointer"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && paginatedCompanies.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-2xl border border-dashed border-slate-200 text-center shadow-sm">
          <div className="size-14 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-700 mb-3">
            <Building2 className="size-7" />
          </div>
          <h3 className="text-base font-bold text-[#1B2C54]">
            No care providers found
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            No care providers match your active filters or search terms. Try adjusting your search or clearing filters.
          </p>
        </div>
      )}

      {/* Dynamic Pagination */}
      {!isLoading && totalItems > 0 && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200/80 mt-4">
          <span className="text-xs text-slate-500 font-medium">
            Showing {startIndex + 1} to {endIndex} of {totalItems} results
          </span>

          <div className="flex items-center gap-1.5">
            {/* Previous button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous Page"
              className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all ${
                currentPage === 1
                  ? "text-slate-300 border-slate-100 cursor-not-allowed bg-slate-50"
                  : "text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300 cursor-pointer active:scale-95 shadow-sm"
              }`}
            >
              <ChevronLeft className="size-4" />
            </button>

            {/* Dynamic Page Numbers */}
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

            {/* Next button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next Page"
              className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all ${
                currentPage === totalPages
                  ? "text-slate-300 border-slate-100 cursor-not-allowed bg-slate-50"
                  : "text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300 cursor-pointer active:scale-95 shadow-sm"
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

export default ServicesList;
