"use client";

import React, { useState } from "react";
import { AgenciesHero } from "./AgenciesHero";
import { AgenciesSidebar } from "./AgenciesSidebar";
import { AgenciesList } from "./AgenciesList";
import { AgencyProps } from "../types/agencies.types";
import { X, Send, CheckCircle2, Phone, Globe, Mail, MapPin } from "lucide-react";

import { useRouter } from "next/navigation";
import contactRequestsApi from "@/features/care-company/contact-requests/api/contactRequestsApi";

export const AgenciesView = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTriggeredQuery, setSearchTriggeredQuery] = useState("");

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSearch = () => {
    setSearchTriggeredQuery(searchQuery);
  };

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
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
    setSelectedServices([]);
    setSelectedRegions([]);
    setSelectedRating("");
  };

  const handleContactClick = async (agency: AgencyProps) => {
    setIsSubmitting(true);
    try {
      await contactRequestsApi.createContactRequest({
        targetUserId: agency.id,
      });
      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 4000);
    } catch (err: any) {
      console.warn("Connection request error:", err?.message);
      // If user is not logged in, redirect to login page
      router.push("/login");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F4F7FC] min-h-screen pb-16 relative">
      {/* Hero Banner */}
      <AgenciesHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />

      {/* Main Layout */}
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <AgenciesSidebar
            selectedServices={selectedServices}
            toggleService={toggleService}
            selectedRegions={selectedRegions}
            toggleRegion={toggleRegion}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
            clearAllFilters={clearAllFilters}
          />

          <AgenciesList
            searchQuery={searchTriggeredQuery}
            selectedServices={selectedServices}
            selectedRegions={selectedRegions}
            selectedRating={selectedRating}
            onContactClick={handleContactClick}
          />
        </div>
      </div>

      {/* Success Notification Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#E8F8F0] border border-emerald-200 text-emerald-800 rounded-2xl p-4 shadow-xl flex items-center gap-3.5 max-w-sm animate-fade-in font-['Wix_Madefor_Text']">
          <CheckCircle2 className="size-6 text-emerald-600 shrink-0" />
          <div className="flex flex-col">
            <span className="text-sm font-bold font-['Wix_Madefor_Text']">Connection Request Sent!</span>
            <span className="text-xs text-emerald-600/95 font-medium mt-0.5 font-['Wix_Madefor_Text']">
              Your request has been sent to the agency dashboard.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgenciesView;
