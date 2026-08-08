import React from "react";
import { Search } from "lucide-react";

interface FindCareHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
}

export const FindCareHero = ({
  searchQuery,
  setSearchQuery,
  onSearch,
}: FindCareHeroProps) => {
  return (
    <section className="w-full bg-slate-50 py-8 px-6 md:px-12 lg:px-24">
      <div className="mx-auto container">
        
        {/* Banner */}
        <div
          className="relative w-full rounded-3xl overflow-hidden py-16 px-6 md:px-12 lg:px-20 text-center flex flex-col items-center gap-8 bg-cover bg-center shadow-md"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.5)), url('/images/services_hero.jpg')`
          }}
        >
          {/* Titles */}
          <div className="flex flex-col gap-3 max-w-4xl text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight font-['Wix_Madefor_Text']">
              Explore Assisted Care Facilities Near You
            </h1>
            <p className="text-sm md:text-base text-white/80 font-normal leading-relaxed max-w-2xl mx-auto font-['Wix_Madefor_Text']">
              Browse a wide selection of assisted care’s facilities, compare their services, and discover the best match for your loved one’s needs all in one place.
            </p>
          </div>

          {/* Search Inputs */}
          <div className="w-full max-w-2xl bg-white/95 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 shadow-xl backdrop-blur-sm">
            <div className="flex-1 flex items-center gap-3 px-3 py-2 border border-slate-100 rounded-xl bg-white">
              <Search className="size-5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search by name or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-slate-700 placeholder-slate-400 text-sm font-medium focus:outline-none font-['Poppins']"
                onKeyDown={(e) => e.key === "Enter" && onSearch()}
              />
            </div>
            
            <button
              onClick={onSearch}
              className="bg-[#2D6A9F] hover:bg-[#20527F] text-white px-8 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow active:scale-98"
            >
              <Search className="size-4" />
              Search
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
