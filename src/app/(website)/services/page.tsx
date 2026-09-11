"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ServicesHero } from "@/features/website/Services/components/ServicesHero";
import { ServicesFilterSidebar } from "@/features/website/Services/components/ServicesFilterSidebar";
import { ServicesList } from "@/features/website/Services/components/ServicesList";
import { CommitmentSection } from "@/features/website/Services/components/CommitmentSection";

const ServicesContent = () => {
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get("search") || searchParams.get("q") || "";
  const urlLocation = searchParams.get("location") || "";

  // Search state
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedLocation, setSelectedLocation] = useState(urlLocation);
  const [searchTriggeredQuery, setSearchTriggeredQuery] = useState(urlSearch);
  const [searchTriggeredLocation, setSearchTriggeredLocation] = useState(urlLocation);

  // Synchronize when URL searchParams change
  useEffect(() => {
    if (urlSearch !== searchQuery) {
      setSearchQuery(urlSearch);
      setSearchTriggeredQuery(urlSearch);
    }
    if (urlLocation !== selectedLocation) {
      setSelectedLocation(urlLocation);
      setSearchTriggeredLocation(urlLocation);
    }
  }, [urlSearch, urlLocation]);

  // Sidebar filters state
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState("");

  // Toggle handlers
  const toggleServiceType = (type: string) => {
    setSelectedServiceTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleRegion = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  };

  const clearAllFilters = () => {
    setSelectedServiceTypes([]);
    setSelectedRegions([]);
    setSelectedRating("");
    setSearchQuery("");
    setSelectedLocation("");
    setSearchTriggeredQuery("");
    setSearchTriggeredLocation("");
  };

  const handleSearch = () => {
    setSearchTriggeredQuery(searchQuery);
    setSearchTriggeredLocation(selectedLocation);
  };

  return (
    <main className="min-h-screen bg-[#F4F7FC] text-slate-800">

      {/* 1. Hero Search Section */}
      <ServicesHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        onSearch={handleSearch}
      />

      {/* 2. Main Filters & Listings Section */}
      <section className="mx-auto container py-12 px-4 md:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Filters Sidebar */}
          <ServicesFilterSidebar
            selectedServiceTypes={selectedServiceTypes}
            toggleServiceType={toggleServiceType}
            selectedRegions={selectedRegions}
            toggleRegion={toggleRegion}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            clearAllFilters={clearAllFilters}
          />

          {/* Directory Listings */}
          <ServicesList
            searchQuery={searchTriggeredQuery || searchQuery}
            selectedLocation={searchTriggeredLocation || selectedLocation}
            selectedServiceTypes={selectedServiceTypes}
            selectedRegions={selectedRegions}
            selectedRating={selectedRating}
          />
        </div>
      </section>

      {/* 3. Commitment credibility section */}
      <CommitmentSection />

    </main>
  );
};

const ServicesPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F4F7FC]" />}>
      <ServicesContent />
    </Suspense>
  );
};

export default ServicesPage;
