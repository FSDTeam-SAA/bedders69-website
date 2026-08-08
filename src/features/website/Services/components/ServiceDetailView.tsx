"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MapPin, Star, Clock, Phone, ArrowLeft } from "lucide-react";
import { companies } from "@/Data/data";

export const ServiceDetailView = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // Find the company by matching the slugified name
  const company = companies.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, "-") === decodeURIComponent(id)
  ) || companies[0];

  const [activeTab, setActiveTab] = useState("Overview");

  // Custom metadata based on company name to match the Figma design
  const companyMeta: Record<string, {
    founded: string;
    staff: string;
    locations: string;
    cqcRating: string;
    about: string;
    hours: string;
  }> = {
    "Sunrise Care Group": {
      founded: "2008",
      staff: "320+",
      locations: "8",
      cqcRating: "Outstanding (CQC)",
      about: "Sunrise Care Group has built a strong reputation for providing professional, compassionate, and reliable care services throughout Greater Manchester. Our dedicated team specialises in elderly care, dementia support, personal care, and assisted living, ensuring every individual receives personalised support that enhances their quality of life. By combining experienced professionals with a person-centred approach, we strive to make a meaningful difference for every client and their family.",
      hours: "Mon–Fri 7am–6pm · Sat 8am–2pm · Emergency 24/7"
    },
    "Helping Hands Care": {
      founded: "2011",
      staff: "450+",
      locations: "12",
      cqcRating: "Good (CQC)",
      about: "Helping Hands Care is dedicated to helping individuals live independently in the comfort of their own homes. We provide outstanding personalized home care services in Greater London. From companionship to complex care, our highly trained caregivers are matched to suit your specific lifestyle and requirements.",
      hours: "Mon–Fri 8am–6pm · Sat 9am–4pm · Emergency 24/7"
    },
    "Care Support UK": {
      founded: "2015",
      staff: "180+",
      locations: "4",
      cqcRating: "Good (CQC)",
      about: "Care Support UK delivers premium nursing and personal care support for families in West Midlands. Our care team is comprised of registered nurses and healthcare assistants who undergo rigorous selection and regular training to deliver high clinical standards with empathy and care.",
      hours: "Mon–Fri 7:30am–5:30pm · Sat 9am–1pm · Emergency 24/7"
    }
  };

  const meta = companyMeta[company.name] || {
    founded: "2012",
    staff: "150+",
    locations: "5",
    cqcRating: "Good (CQC)",
    about: `${company.name} provides high-quality and compassionate care services in ${company.location}. We are committed to supporting individuals and their families with person-centred care programs designed to improve overall well-being and daily independence.`,
    hours: "Mon–Fri 8am–6pm · Emergency 24/7"
  };

  const allTags = Array.from(new Set([...company.tags, "Respite Care", "Day Services"]));

  return (
    <main className="min-h-screen bg-[#F4F7FC] pb-24 font-['Wix_Madefor_Text'] text-slate-800">

      {/* Back to listings bar */}
      <div className="bg-[#1B2C54] text-white py-3 px-6 md:px-12 lg:px-24 border-b border-white/5">
        <div className="mx-auto container">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer text-xs font-semibold"
          >
            <ArrowLeft className="size-4" />
            Back to Services
          </button>
        </div>
      </div>

      {/* Hero Banner Section */}
      <section
        className="relative w-full h-[280px] bg-cover bg-center flex flex-col justify-center px-6 md:px-12 lg:px-24"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.5)), url('/images/services_detailes_hero.jpg')`
        }}
      >
        <div className="max-w-7xl mx-auto w-full text-center flex flex-col gap-3 text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight font-['Wix_Madefor_Text']">
            Professional Care Services Across the UK
          </h1>
          <p className="text-sm md:text-base text-white/80 font-normal leading-relaxed max-w-2xl mx-auto">
            Find trusted care providers, specialist support, and essential healthcare services tailored to individuals, families, and businesses.
          </p>
        </div>
      </section>

      {/* Company Header Block */}
      <section className="bg-white border-b border-slate-100 py-6 px-6 md:px-12 lg:px-24">
        <div className="mx-auto container flex flex-col gap-6">

          <div className="flex flex-col gap-3">
            {/* Company Name */}
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1B2C54] leading-tight">
              {company.name}
            </h2>

            {/* Meta row */}  
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1">
                <MapPin className="size-3.5 text-slate-400" />
                <span>{company.location}</span>
              </div>
              <span className="text-slate-300">•</span>
              <div>
                <span>Founded {meta.founded}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 pt-1">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-3.5 fill-amber-400 text-transparent"
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-700 font-['Inter'] ml-1">
                {company.rating}
              </span>
              <span className="text-xs text-slate-400 font-['Inter']">
                ({company.reviews.split(" ")[0]} reviews)
              </span>
            </div>
          </div>

          {/* Tab Selection Navigation */}
          <div className="flex gap-8 border-t border-slate-100 pt-5">
            {["Overview", "Jobs", "Reviews"].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-1 text-sm font-medium transition-all cursor-pointer relative ${isActive
                    ? "text-cyan-700 font-bold"
                    : "text-slate-500 hover:text-slate-800"
                    }`}
                >
                  {tab}
                  {isActive && (
                    <span className="absolute bottom-[-6px] left-0 right-0 h-[2px] bg-cyan-700 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* Content Columns */}
      <section className="container mx-auto px-6 md:px-12 lg:px-24 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Details Cards */}
          <div className="lg:col-span-8 flex flex-col gap-4">

            {activeTab === "Overview" && (
              <>
                {/* About Card */}
                <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex flex-col gap-3">
                  <h3 className="text-base font-bold text-[#1B2C54]">
                    About
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {meta.about}
                  </p>
                </div>

                {/* Services Card */}
                <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex flex-col gap-3">
                  <h3 className="text-base font-bold text-[#1B2C54]">
                    Services
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {allTags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#E5F2FC] text-[#0A66C2] text-[11px] font-bold px-3 py-1.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Service Hours Card */}
                <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex flex-col gap-3">
                  <h3 className="text-base font-bold text-[#1B2C54]">
                    Service Hours
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="size-4 text-slate-400 shrink-0" />
                    <span>{meta.hours}</span>
                  </div>
                </div>

                {/* Others Information's Card */}
                <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex flex-col gap-3">
                  <h3 className="text-base font-bold text-[#1B2C54]">
                    Others Information's
                  </h3>
                  <div className="flex flex-col pt-1">
                    {/* Staff Row */}
                    <div className="flex justify-between items-center py-2.5 border-b border-slate-100/60">
                      <span className="text-sm text-slate-500 font-medium">Staff</span>
                      <span className="text-sm font-bold text-[#0A66C2]">{meta.staff}</span>
                    </div>
                    {/* Locations Row */}
                    <div className="flex justify-between items-center py-2.5 border-b border-slate-100/60">
                      <span className="text-sm text-slate-500 font-medium">Locations</span>
                      <span className="text-sm font-bold text-[#0A66C2]">{meta.locations}</span>
                    </div>
                    {/* Rating Row */}
                    <div className="flex justify-between items-center py-2.5">
                      <span className="text-sm text-slate-500 font-medium">Rating</span>
                      <span className="text-sm font-bold text-[#0A66C2]">{meta.cqcRating}</span>
                    </div>
                  </div>
                </div>

                {/* Service Area Card */}
                <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex flex-col gap-3">
                  <h3 className="text-base font-bold text-[#1B2C54]">
                    Service Area
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="size-4 text-slate-400 shrink-0" />
                    <span>{company.location}</span>
                  </div>
                </div>
              </>
            )}

            {activeTab === "Jobs" && (
              <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex flex-col gap-4">
                <h3 className="text-base font-bold text-[#1B2C54]">
                  Open Positions
                </h3>
                <div className="flex flex-col gap-3 pt-1">
                  <div className="p-4 border border-slate-100 rounded-xl flex justify-between items-center hover:border-slate-200 transition-colors">
                    <div className="flex flex-col gap-1">
                      <h4 className="text-sm font-bold text-[#1B2C54]">Senior Care Assistant</h4>
                      <p className="text-[11px] text-slate-400 font-semibold">Full-time · Manchester</p>
                    </div>
                    <button className="bg-[#2D6A9F] hover:bg-[#20527F] text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer">
                      Apply Now
                    </button>
                  </div>
                  <div className="p-4 border border-slate-100 rounded-xl flex justify-between items-center hover:border-slate-200 transition-colors">
                    <div className="flex flex-col gap-1">
                      <h4 className="text-sm font-bold text-[#1B2C54]">Support Worker (Dementia Specialist)</h4>
                      <p className="text-[11px] text-slate-400 font-semibold">Part-time · Greater Manchester</p>
                    </div>
                    <button className="bg-[#2D6A9F] hover:bg-[#20527F] text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Reviews" && (
              <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex flex-col gap-5">
                <h3 className="text-base font-bold text-[#1B2C54]">
                  Client Reviews
                </h3>
                <div className="flex flex-col gap-5 pt-1">
                  <div className="flex flex-col gap-2 pb-5 border-b border-slate-100/60">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-700 text-xs">Margaret H. (Family Member)</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="size-3 fill-amber-400 text-transparent" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      "The staff at Sunrise Care have been outstanding. They look after my mother with such dignity and patience. It has brought our family immense peace of mind."
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-700 text-xs">John D. (Client)</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="size-3 fill-amber-400 text-transparent" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      "Very professional home care service. The carers are punctual, friendly, and always ready to go the extra mile. Highly recommend."
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Contact Button */}
          <div className="lg:col-span-4">
            <button className="w-full bg-[#2D6A9F] hover:bg-[#20527F] text-white py-3.5 px-6 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-sm hover:shadow active:scale-[0.98]">
              <Phone className="size-4 fill-current" />
              Contact Company
            </button>
          </div>

        </div>
      </section>

    </main>
  );
};
