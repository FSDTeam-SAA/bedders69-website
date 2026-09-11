"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FindCareHero } from "./FindCareHero";
import { FindCareFilterSidebar } from "./FindCareFilterSidebar";
import { CarersList } from "./CarersList";

export const FindCareView = () => {
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get("search") || searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [searchTriggeredQuery, setSearchTriggeredQuery] = useState(urlSearch);
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  useEffect(() => {
    if (urlSearch !== searchQuery) {
      setSearchQuery(urlSearch);
      setSearchTriggeredQuery(urlSearch);
    }
  }, [urlSearch]);

  const handleSearch = () => {
    setSearchTriggeredQuery(searchQuery);
  };

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
    setSearchQuery("");
    setSearchTriggeredQuery("");
    setSelectedServiceTypes([]);
    setSelectedRegions([]);
  };

  return (
    <div className="bg-[#F4F7FC] min-h-screen pb-16">
      <FindCareHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <FindCareFilterSidebar
            selectedServiceTypes={selectedServiceTypes}
            toggleServiceType={toggleServiceType}
            selectedRegions={selectedRegions}
            toggleRegion={toggleRegion}
            clearAllFilters={clearAllFilters}
          />
          <CarersList
            searchQuery={searchTriggeredQuery}
            selectedServiceTypes={selectedServiceTypes}
            selectedRegions={selectedRegions}
          />
        </div>
      </div>
    </div>
  );
};
