"use client";

import React from "react";
import { ChevronRight, ChevronDown, Lock } from "lucide-react";
import { LOOKING_FOR_OPTIONS, UK_CITIES } from "../constants";

interface ServicesHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  selectedLookingFor: string;
  setSelectedLookingFor: (category: string) => void;
  onSearch: () => void;
}

export const ServicesHero = ({
  searchQuery,
  setSearchQuery,
  selectedLocation,
  setSelectedLocation,
  selectedLookingFor,
  setSelectedLookingFor,
  onSearch,
}: ServicesHeroProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <section className="w-full bg-slate-50 py-8 px-6 md:px-12 lg:px-24">
      <div className="mx-auto container">

        {/* Banner with Background Image and Overlay */}
        <div
          className="relative w-full rounded-3xl overflow-hidden py-16 px-6 md:px-12 lg:px-20 text-center flex flex-col items-center gap-10 bg-cover bg-center shadow-md"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.55)), url('/images/services_hero.jpg')`
          }}
        >

          {/* Header Text */}
          <div className="flex flex-col gap-3 max-w-6xl text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight font-['Wix_Madefor_Text']">
              Explore Assisted Care Facilities Near You
            </h1>
            <p className="text-sm md:text-base text-white/80 font-normal leading-relaxed max-w-2xl mx-auto font-['Wix_Madefor_Text']">
              Browse a wide selection of assisted care’s facilities, compare their services, and discover the best match for your loved one’s needs all in one place.
            </p>
          </div>

          {/* Search Box Card */}
          <div className="w-full max-w-6xl bg-[#1B2C54]/95 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-4 shadow-xl backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">

              {/* Search by Postcode or Name */}
              <div className="md:col-span-4 flex flex-col gap-2 text-left">
                <label className="text-sm font-semibold text-white font-['Poppins']">
                  Search by postcode or name
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter postcode or name"
                  className="relative z-10 w-full px-4 py-3 bg-white text-slate-800 border-none rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-['Poppins'] text-sm"
                />
              </div>

              {/* I'm looking for Select */}
              <div className="md:col-span-3 flex flex-col gap-2 text-left">
                <label className="text-sm font-semibold text-white font-['Poppins']">
                  I&apos;m looking for
                </label>
                <div className="relative">
                  <select
                    value={selectedLookingFor}
                    onChange={(e) => setSelectedLookingFor(e.target.value)}
                    className="relative z-10 w-full px-4 py-3 bg-white text-slate-600 border-none rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-['Poppins'] text-sm appearance-none cursor-pointer"
                  >
                    <option value="">Select what you need</option>
                    {LOOKING_FOR_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 size-4 pointer-events-none" />
                </div>
              </div>

              {/* Location Select */}
              <div className="md:col-span-3 flex flex-col gap-2 text-left">
                <label className="text-sm font-semibold text-white font-['Poppins']">
                  Location
                </label>
                <div className="relative">
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="relative z-10 w-full px-4 py-3 bg-white text-slate-600 border-none rounded-xl outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-['Poppins'] text-sm appearance-none cursor-pointer"
                  >
                    <option value="">Location</option>
                    {UK_CITIES.map((city) => <option key={city} value={city}>{city}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 size-4 pointer-events-none" />
                </div>
                {/* <p className="text-xs text-white/70">There are 76 cities in the UK</p> */}
              </div>

              {/* Search Button (Green) */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#2E7E52] hover:bg-[#236340] text-white font-semibold font-['Poppins'] text-sm rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  Search Now
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </form>

            {/* Lock Security Info */}
            <div className="flex items-center gap-2 text-white/90 text-sm mt-1">
              <Lock className="size-4 text-white" />
              <span className="font-['Poppins'] text-sm font-medium">
                Carers can only be searched by someone registered
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
