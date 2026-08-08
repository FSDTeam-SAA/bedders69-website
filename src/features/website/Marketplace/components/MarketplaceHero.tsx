import React from "react";
import { Search } from "lucide-react";

interface MarketplaceHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const MarketplaceHero = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: MarketplaceHeroProps) => {
  const categories = [
    "All",
    "Beds & Mattresses",
    "Medication Management",
    "Mobility Aids",
    "Continence Care",
    "Technology & Safety",
    "Moving & Handling",
  ];

  return (
    <section className="w-full bg-slate-50 py-8 px-6 md:px-12 lg:px-20 xl:px-32">
      <div className="mx-auto container flex flex-col gap-8">
        
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
              Care Products Marketplace
            </h1>
            <p className="text-sm md:text-base text-white/85 font-normal leading-relaxed max-w-2xl mx-auto font-['Wix_Madefor_Text']">
              Discover trusted care products and medical equipment from verified suppliers across the UK.
            </p>
          </div>
        </div>

        {/* Category Tabs & Search Row */}
        <div className="flex flex-col xl:flex-row justify-between items-center gap-4 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 items-center w-full xl:w-auto">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    isActive
                      ? "bg-[#2D6A9F] text-white border-[#2D6A9F] shadow-sm"
                      : "bg-slate-50 border-slate-200/60 hover:bg-slate-100 text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="w-full xl:w-80 bg-slate-50 border border-slate-200/60 rounded-xl px-3.5 py-2 flex items-center gap-2">
            <Search className="size-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search products ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-slate-700 placeholder-slate-400 font-semibold focus:outline-none font-['Wix_Madefor_Text']"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
