import React from "react";
import { Search } from "lucide-react";

interface AgenciesHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
}

export const AgenciesHero = ({
  searchQuery,
  setSearchQuery,
  onSearch,
}: AgenciesHeroProps) => {
  return (
    <section className="w-full bg-slate-50 py-8 px-6 md:px-12 lg:px-20 xl:px-32">
      <div className="mx-auto container">
        
        {/* Banner Card */}
        <div
          className="relative w-full rounded-3xl overflow-hidden py-16 px-6 md:px-12 lg:px-20 text-center flex flex-col items-center gap-8 bg-cover bg-center shadow-md animate-fade-in"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.5)), url('/images/care_job.jpg')`
          }}
        >
          {/* Titles */}
          <div className="flex flex-col gap-3 max-w-4xl text-white">
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight font-['Wix_Madefor_Text']">
              Recruitment Agency Directory
            </h1>
            <p className="text-sm md:text-base text-white/85 font-normal leading-relaxed max-w-2xl mx-auto font-['Wix_Madefor_Text']">
              Find and connect with leading care recruitment agencies across the UK. Discover certified staff and vacancies in residential and home care settings.
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
              className="bg-[#2D6A9F] hover:bg-[#20527F] text-white px-8 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow active:scale-98 shrink-0"
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
