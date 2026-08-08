"use client";

import React, { useState } from "react";
import { AgenciesHero } from "./AgenciesHero";
import { AgenciesSidebar } from "./AgenciesSidebar";
import { AgenciesList } from "./AgenciesList";
import { X, Send, CheckCircle2, Phone, Globe, Mail, MapPin } from "lucide-react";

export const AgenciesView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTriggeredQuery, setSearchTriggeredQuery] = useState("");

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState("");

  // Contact Modal States
  const [contactingAgency, setContactingAgency] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Simulated Agency Contact details lookup
  const getAgencyDetails = (agencyName: string) => {
    switch (agencyName) {
      case "Apex Care Agency":
        return {
          phone: "+44 161 8899 11",
          email: "contact@apexcare.co.uk",
          website: "www.apexcare.co.uk",
          address: "Manchester, M1 1AE",
        };
      case "Guardian Staffing":
        return {
          phone: "+44 121 7788 22",
          email: "info@guardianstaffing.co.uk",
          website: "www.guardianstaffing.co.uk",
          address: "Birmingham, B1 2AA",
        };
      case "Sunrise Health Link":
        return {
          phone: "+44 207 5544 33",
          email: "admin@sunrisehealth.co.uk",
          website: "www.sunrisehealth.co.uk",
          address: "London, EC1A 1BB",
        };
      case "Elite Carers Direct":
        return {
          phone: "+44 117 3322 44",
          email: "hello@elitecarers.co.uk",
          website: "www.elitecarers.co.uk",
          address: "Bristol, BS1 3AD",
        };
      case "Beacon Recruitment":
        return {
          phone: "+44 161 4455 66",
          email: "jobs@beaconrecruitment.co.uk",
          website: "www.beaconrecruitment.co.uk",
          address: "Manchester, M2 2BC",
        };
      default: // CareFirst Recruitment
        return {
          phone: "+44 208 9988 77",
          email: "admin@carefirst.co.uk",
          website: "www.carefirst.co.uk",
          address: "London, W1A 1AA",
        };
    }
  };

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

  const handleContactClick = (agencyName: string) => {
    setContactingAgency(agencyName);
    setName("");
    setEmail("");
    setMessage("");
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setContactingAgency(null);
      setShowSuccessToast(true);

      setTimeout(() => {
        setShowSuccessToast(false);
      }, 4000);
    }, 1200);
  };

  const currentDetails = contactingAgency ? getAgencyDetails(contactingAgency) : null;

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

      {/* FIGMA: Contact Agency Modal (5151:8194) */}
      {contactingAgency && currentDetails && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in font-['Wix_Madefor_Text']">
          <div className="bg-white rounded-3xl w-full max-w-2xl border border-slate-100 shadow-2xl p-6 md:p-8 flex flex-col gap-6 relative max-h-[95vh] overflow-y-auto animate-scale-up">
            
            {/* Close Button */}
            <button
              onClick={() => setContactingAgency(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-all cursor-pointer"
            >
              <X className="size-5" />
            </button>

            {/* Header: Title */}
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-3xl md:text-4xl font-semibold text-[#1B2C54]">
                Contact Agency
              </h2>
              <div className="mt-3 p-4 bg-slate-50 rounded-2xl flex flex-col gap-1 border border-slate-100">
                <span className="text-sm font-bold text-slate-800">
                  {contactingAgency}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Recruitment & Directory Service
                </span>
              </div>
            </div>

            {/* Agency Contact Details Grid (Figma: Frame 2147234793) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/50 p-5 rounded-2xl border border-slate-100/50 text-sm">
              <div className="flex items-center gap-3 text-slate-700">
                <div className="size-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2D6A9F] shrink-0">
                  <Phone className="size-4" />
                </div>
                <span className="font-semibold">{currentDetails.phone}</span>
              </div>

              <div className="flex items-center gap-3 text-slate-700">
                <div className="size-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2D6A9F] shrink-0">
                  <Globe className="size-4" />
                </div>
                <a
                  href={`https://${currentDetails.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:underline text-[#2D6A9F]"
                >
                  {currentDetails.website}
                </a>
              </div>

              <div className="flex items-center gap-3 text-slate-700">
                <div className="size-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2D6A9F] shrink-0">
                  <Mail className="size-4" />
                </div>
                <span className="font-semibold break-all">{currentDetails.email}</span>
              </div>

              <div className="flex items-center gap-3 text-slate-700">
                <div className="size-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2D6A9F] shrink-0">
                  <MapPin className="size-4" />
                </div>
                <span className="font-semibold">{currentDetails.address}</span>
              </div>
            </div>

            {/* Message Form (Figma: Send a message) */}
            <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
              
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-50 pb-2">
                Send a message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Your Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-slate-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#2D6A9F] focus:ring-1 focus:ring-[#2D6A9F] font-medium transition-all"
                    required
                  />
                </div>

                {/* Your Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-slate-700">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@gmail.com"
                    className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#2D6A9F] focus:ring-1 focus:ring-[#2D6A9F] font-medium transition-all"
                    required
                  />
                </div>

              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-slate-700">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type here..."
                  className="w-full border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#2D6A9F] focus:ring-1 focus:ring-[#2D6A9F] font-medium transition-all"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end items-center gap-3 mt-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setContactingAgency(null)}
                  className="w-full sm:w-auto px-6 py-3 border border-slate-200 hover:border-slate-300 text-slate-600 rounded-2xl text-sm font-bold transition-all cursor-pointer text-center hover:bg-slate-50 active:scale-98"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 bg-[#2D6A9F] hover:bg-[#20527F] disabled:bg-slate-300 text-white rounded-2xl text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm hover:shadow active:scale-98"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <Send className="size-4 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Success Notification Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#E8F8F0] border border-emerald-200 text-emerald-800 rounded-2xl p-4 shadow-xl flex items-center gap-3.5 max-w-sm animate-fade-in font-['Wix_Madefor_Text']">
          <CheckCircle2 className="size-6 text-emerald-600 shrink-0" />
          <div className="flex flex-col">
            <span className="text-sm font-bold">Inquiry Sent!</span>
            <span className="text-xs text-emerald-600/95 font-medium mt-0.5">Your message has been sent to the agency. They will contact you shortly.</span>
          </div>
        </div>
      )}

    </div>
  );
};
