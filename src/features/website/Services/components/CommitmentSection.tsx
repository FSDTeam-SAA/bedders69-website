import React from "react";
import { Star } from "lucide-react";

export const CommitmentSection = () => {
  return (
    <section className="w-full bg-white py-20 px-6 md:px-12 lg:px-24 border-y border-slate-100">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Text & 4 Service Cards */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          
          {/* Tagline & Headers */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-[#2E7E52] uppercase tracking-wider font-['Plus_Jakarta_Sans']">
              • OUR COMMITMENT
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1B2C54] font-['Poppins'] leading-tight">
              Your Well-Being<br />Is Our Priority
            </h2>
            <p className="text-xs md:text-sm text-slate-500 font-normal leading-relaxed max-w-xl font-['Plus_Jakarta_Sans']">
              Our care plans are designed around the unique needs and preferences of each individual, so they can live comfortably and confidently at home or in the right residential setting.
            </p>
          </div>

          {/* 2x2 Grid of Bordered Service Blocks (No icons, matching Figma) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            
            {/* Companion Care */}
            <div className="p-4 bg-[#E8F8F0] border border-[#2E7E52]/40 rounded-xl flex flex-col gap-1">
              <h4 className="text-xs font-bold text-[#2E7E52] font-['Wix_Madefor_Text']">
                Companion Care
              </h4>
              <p className="text-[11px] text-[#2E7E52]/80 font-normal font-['Wix_Madefor_Text']">
                Emotional support and daily assistance
              </p>
            </div>

            {/* Dementia Care */}
            <div className="p-4 bg-[#F5EEFD] border border-[#9F7AEA]/40 rounded-xl flex flex-col gap-1">
              <h4 className="text-xs font-bold text-[#9F7AEA] font-['Wix_Madefor_Text']">
                Dementia Care
              </h4>
              <p className="text-[11px] text-[#9F7AEA]/80 font-normal font-['Wix_Madefor_Text']">
                Specialist memory support services
              </p>
            </div>

            {/* Personal Care */}
            <div className="p-4 bg-[#EBF8FF] border border-[#3182CE]/40 rounded-xl flex flex-col gap-1">
              <h4 className="text-xs font-bold text-[#3182CE] font-['Wix_Madefor_Text']">
                Personal Care
              </h4>
              <p className="text-[11px] text-[#3182CE]/80 font-normal font-['Wix_Madefor_Text']">
                Hands-on help with daily living
              </p>
            </div>

            {/* Respite Care */}
            <div className="p-4 bg-[#FFF7ED] border border-[#ED8936]/40 rounded-xl flex flex-col gap-1">
              <h4 className="text-xs font-bold text-[#ED8936] font-['Wix_Madefor_Text']">
                Respite Care
              </h4>
              <p className="text-[11px] text-[#ED8936]/80 font-normal font-['Wix_Madefor_Text']">
                Temporary relief for family carers
              </p>
            </div>

          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <button className="px-6 py-3 bg-[#2D6A9F] hover:bg-[#20527F] text-white font-semibold font-['Poppins'] text-xs rounded-xl transition-all shadow-sm">
              Find Care Services Near You
            </button>
          </div>
        </div>

        {/* Right Column: Visual Layout with overlapping satisfaction card */}
        <div className="lg:col-span-5 flex flex-row items-center gap-6 justify-center lg:justify-end">
          
          {/* Main Image */}
          <div className="w-64 h-80 rounded-2xl overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=400"
              alt="Care assistance"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Satisfaction Card */}
          <div className="w-48 bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-lg flex flex-col">
            <div className="h-28 bg-slate-100 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=300"
                alt="Client satisfaction caregiver"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex flex-col gap-1.5 text-left">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-amber-400 text-transparent" />
                ))}
              </div>
              <span className="text-2xl font-black text-slate-800 font-['Inter'] leading-none mt-1">
                98%
              </span>
              <span className="text-[10px] text-slate-400 font-medium font-['Inter']">
                Client satisfaction
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
