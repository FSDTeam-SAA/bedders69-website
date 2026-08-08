import React, { useState } from "react";
import { Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export interface CarerProps {
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

export const CarersList = ({
  searchQuery,
  selectedServiceTypes,
  selectedRegions,
  selectedRating,
}: CarersListProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const initialCarers: CarerProps[] = [
    {
      name: "Matthew Warkentin",
      rating: "4.9",
      reviews: 67,
      location: "London, N1",
      biography: "Compassionate Care Assistant with 5+ years supporting elderly and vulnerable adults.",
      skills: ["Dementia Care", "Medication Admin"],
      experience: "2 Years",
      verified: true,
      rate: "$150/hrs",
      available: true,
    },
    {
      name: "Sarah Palmer",
      rating: "4.7",
      reviews: 55,
      location: "Birmingham, B2",
      biography: "Dedicated Support Worker with a focus on mental health and well-being.",
      skills: ["Mental Health Support", "Crisis Intervention"],
      experience: "3 Years",
      verified: true,
      rate: "$120/hrs",
      available: true,
      image: "/images/carer-female.png",
    },
    {
      name: "John Smith",
      rating: "4.8",
      reviews: 80,
      location: "Manchester, M1",
      biography: "Experienced Home Carer specialized in personal care and companionship.",
      skills: ["Personal Care", "Companionship"],
      experience: "4 Years",
      verified: true,
      rate: "$140/hrs",
      available: true,
      image: "/images/carer-male.png",
    },
    {
      name: "Matthew Warkentin",
      rating: "4.9",
      reviews: 67,
      location: "London, N1",
      biography: "Compassionate Care Assistant with 5+ years supporting elderly and vulnerable adults.",
      skills: ["Dementia Care", "Medication Admin"],
      experience: "2 Years",
      verified: true,
      rate: "$150/hrs",
      available: true,
    },
    {
      name: "Sarah Palmer",
      rating: "4.7",
      reviews: 55,
      location: "Birmingham, B2",
      biography: "Dedicated Support Worker with a focus on mental health and well-being.",
      skills: ["Mental Health Support", "Crisis Intervention"],
      experience: "3 Years",
      verified: true,
      rate: "$120/hrs",
      available: true,
      image: "/images/carer-female.png",
    },
    {
      name: "John Smith",
      rating: "4.8",
      reviews: 80,
      location: "Manchester, M1",
      biography: "Experienced Home Carer specialized in personal care and companionship.",
      skills: ["Personal Care", "Companionship"],
      experience: "4 Years",
      verified: true,
      rate: "$140/hrs",
      available: true,
      image: "/images/carer-male.png",
    }
  ];

  // Filtering Logic
  const filteredCarers = initialCarers.filter((carer) => {
    // 1. Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesName = carer.name.toLowerCase().includes(q);
      const matchesBiography = carer.biography.toLowerCase().includes(q);
      const matchesSkills = carer.skills.some((s) => s.toLowerCase().includes(q));
      if (!matchesName && !matchesBiography && !matchesSkills) return false;
    }

    // 2. Service Types
    if (selectedServiceTypes.length > 0) {
      const matchesType = carer.skills.some((skill) =>
        selectedServiceTypes.includes(skill)
      );
      if (!matchesType) return false;
    }

    // 3. Region / Location
    if (selectedRegions.length > 0) {
      const matchesRegion = selectedRegions.some((reg) =>
        carer.location.toLowerCase().includes(reg.toLowerCase())
      );
      if (!matchesRegion) return false;
    }

    // 4. Rating
    if (selectedRating) {
      const minStars = parseInt(selectedRating.split(" ")[0]);
      if (parseFloat(carer.rating) < minStars) return false;
    }

    return true;
  });

  return (
    <div className="flex-1 flex flex-col gap-6 font-['Wix_Madefor_Text']">
      
      {/* Title Block */}
      <div className="flex justify-between items-end border-b border-slate-100 pb-4 container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold font-['Poppins']">
          <span className="text-[#2E7E52]">Available</span> <span className="text-[#1B2C54]">Carers</span>
        </h2>
        <p className="text-sm font-semibold text-cyan-700 font-['Plus_Jakarta_Sans'] cursor-pointer hover:underline flex items-center gap-1">
          Browse All Carers &rarr;
        </p>
      </div>

      {/* Grid List */}
      {filteredCarers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCarers.map((carer, index) => {
            return (
              <div
                key={index}
                className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
              >
                
                {/* Top Image Box */}
                {carer.image ? (
                  <div className="w-full h-[220px] relative overflow-hidden shrink-0 bg-slate-50">
                    {carer.available && (
                      <span className="absolute top-3 left-3 bg-[#E5F2FC] text-[#0A66C2] text-xs font-bold px-3 py-1 rounded-lg z-10">
                        Available
                      </span>
                    )}
                    <img
                      src={carer.image}
                      alt={carer.name}
                      className="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="w-full h-[220px] bg-[#BCC4CD] rounded-t-2xl flex flex-col justify-center items-center p-6 relative shrink-0 border-b border-slate-100/60">
                    {carer.available && (
                      <span className="absolute top-3 left-3 bg-[#E5F2FC] text-[#0A66C2] text-xs font-bold px-3 py-1 rounded-lg">
                        Available
                      </span>
                    )}
                    <p className="text-white text-sm font-bold text-center leading-relaxed font-['Poppins']">
                      Individual chose not to show their photo
                    </p>
                  </div>
                )}

                {/* Details Section */}
                <div className="p-5 flex-1 flex flex-col gap-3.5">
                  
                  {/* Star Rating & Location row */}
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`size-3 fill-amber-400 text-transparent`}
                          />
                        ))}
                      </div>
                      <span className="text-slate-600 font-bold ml-1">
                        {carer.rating} ({carer.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-1 font-medium text-slate-500">
                      <MapPin className="size-3.5 text-slate-400" />
                      <span>{carer.location}</span>
                    </div>
                  </div>

                  {/* Name & biography */}
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-lg font-bold text-slate-800 tracking-tight font-['Wix_Madefor_Text']">
                      {carer.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-2 h-8">
                      {carer.biography}
                    </p>
                  </div>

                  {/* Skills & Badges */}
                  <div className="flex flex-col gap-2 pt-1.5">
                    {/* Row 1: Skills */}
                    <div className="flex flex-wrap gap-1.5">
                      {carer.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="bg-[#E5F2FC] text-[#0A66C2] text-[10px] font-bold px-2.5 py-1 rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Row 2: Experience, Verification, Rate */}
                    <div className="flex flex-wrap gap-1.5 text-[10px] font-bold text-[#0A66C2]">
                      <span className="bg-[#E5F2FC] px-2.5 py-1 rounded-lg">
                        {carer.experience}
                      </span>
                      {carer.verified && (
                        <span className="bg-[#E5F2FC] px-2.5 py-1 rounded-lg">
                          DBS Verified
                        </span>
                      )}
                      <span className="bg-[#E5F2FC] px-2.5 py-1 rounded-lg">
                        {carer.rate}
                      </span>
                    </div>
                  </div>

                  {/* Contact Carer CTA Button */}
                  <Link
                    href={`/find-care/${encodeURIComponent(carer.name.toLowerCase().replace(/\s+/g, "-"))}`}
                    className="w-full mt-auto py-2.5 bg-[#2D6A9F] hover:bg-[#20527F] text-white text-xs font-bold font-['Wix_Madefor_Text'] rounded-lg transition-all shadow-sm cursor-pointer hover:shadow active:scale-98 text-center block"
                  >
                    Contact Carer
                  </Link>

                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-sm font-medium text-slate-500 text-center">
            No carers match your current search and filter selections.
          </p>
        </div>
      )}

      {/* Pagination Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-6 border-t border-slate-100 font-['Poppins']">
        <span className="text-xs text-slate-400 font-medium">
          Showing 1 to {filteredCarers.length} of {filteredCarers.length} results
        </span>
        
        <div className="flex items-center gap-1.5">
          {/* Previous Arrow */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="size-8.5 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all cursor-pointer bg-white"
          >
            <ChevronLeft className="size-4" />
          </button>
          
          {/* Page Numbers */}
          <button
            onClick={() => setCurrentPage(1)}
            className={`size-8.5 rounded-lg flex items-center justify-center text-xs font-semibold transition-all cursor-pointer ${
              currentPage === 1
                ? "bg-[#2D6A9F] text-white"
                : "border border-slate-200 text-slate-500 hover:bg-slate-50 bg-white"
            }`}
          >
            1
          </button>
          <button
            onClick={() => setCurrentPage(2)}
            className={`size-8.5 rounded-lg flex items-center justify-center text-xs font-semibold transition-all cursor-pointer ${
              currentPage === 2
                ? "bg-[#2D6A9F] text-white"
                : "border border-slate-200 text-slate-500 hover:bg-slate-50 bg-white"
            }`}
          >
            2
          </button>
          <button
            onClick={() => setCurrentPage(3)}
            className={`size-8.5 rounded-lg flex items-center justify-center text-xs font-semibold transition-all cursor-pointer ${
              currentPage === 3
                ? "bg-[#2D6A9F] text-white"
                : "border border-slate-200 text-slate-500 hover:bg-slate-50 bg-white"
            }`}
          >
            3
          </button>
          
          <span className="size-8.5 flex items-center justify-center text-slate-400 font-medium text-xs">
            ..
          </span>
          
          <button
            onClick={() => setCurrentPage(8)}
            className={`size-8.5 rounded-lg flex items-center justify-center text-xs font-semibold transition-all cursor-pointer ${
              currentPage === 8
                ? "bg-[#2D6A9F] text-white"
                : "border border-slate-200 text-slate-500 hover:bg-slate-50 bg-white"
            }`}
          >
            8
          </button>

          {/* Next Arrow */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(8, p + 1))}
            className="size-8.5 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all cursor-pointer bg-white"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
