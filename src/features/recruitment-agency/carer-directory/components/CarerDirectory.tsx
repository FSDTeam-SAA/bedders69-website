"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import RecruitmentAgencySidebar from "@/features/recruitment-agency/components/RecruitmentAgencySidebar";
import {
  Bell,
  Check,
  MapPin,
  Star,
} from "lucide-react";

interface CarerCardData {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  location: string;
  bio: string;
  image: string;
  specialties: string[];
  experienceYears: string;
  dbsVerified: boolean;
  rate: string;
  available: boolean;
}

const carersList: CarerCardData[] = [
  {
    id: "1",
    name: "Matthew Warkentin",
    rating: 4.9,
    reviewsCount: 67,
    location: "London, N1",
    bio: "Compassionate Care Assistant with 5+ years supporting elderly and vulnerable adults.",
    image: "/images/carer-male.png",
    specialties: ["Dementia Care", "Medication Admin"],
    experienceYears: "2 Years",
    dbsVerified: true,
    rate: "$150/hrs",
    available: true,
  },
  {
    id: "2",
    name: "Sarah Palmer",
    rating: 4.7,
    reviewsCount: 55,
    location: "Birmingham, B2",
    bio: "Dedicated Support Worker with a focus on mental health and well-being.",
    image: "/images/carer-female.png",
    specialties: ["Mental Health Support", "Crisis Intervention"],
    experienceYears: "3 Years",
    dbsVerified: true,
    rate: "$120/hrs",
    available: true,
  },
  {
    id: "3",
    name: "John Smith",
    rating: 4.8,
    reviewsCount: 80,
    location: "Manchester, M1",
    bio: "Experienced Home Carer specialized in personal care and companionship.",
    image: "/images/carer-male.png",
    specialties: ["Personal Care", "Companionship"],
    experienceYears: "4 Years",
    dbsVerified: true,
    rate: "$140/hrs",
    available: true,
  },
  {
    id: "4",
    name: "Matthew Warkentin",
    rating: 4.9,
    reviewsCount: 67,
    location: "London, N1",
    bio: "Compassionate Care Assistant with 5+ years supporting elderly and vulnerable adults.",
    image: "/images/carer-male.png",
    specialties: ["Dementia Care", "Medication Admin"],
    experienceYears: "2 Years",
    dbsVerified: true,
    rate: "$150/hrs",
    available: true,
  },
  {
    id: "5",
    name: "Sarah Palmer",
    rating: 4.7,
    reviewsCount: 55,
    location: "Birmingham, B2",
    bio: "Dedicated Support Worker with a focus on mental health and well-being.",
    image: "/images/carer-female.png",
    specialties: ["Mental Health Support", "Crisis Intervention"],
    experienceYears: "3 Years",
    dbsVerified: true,
    rate: "$120/hrs",
    available: true,
  },
  {
    id: "6",
    name: "John Smith",
    rating: 4.8,
    reviewsCount: 80,
    location: "Manchester, M1",
    bio: "Experienced Home Carer specialized in personal care and companionship.",
    image: "/images/carer-male.png",
    specialties: ["Personal Care", "Companionship"],
    experienceYears: "4 Years",
    dbsVerified: true,
    rate: "$140/hrs",
    available: true,
  },
];

export default function CarerDirectory() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-['Wix_Madefor_Text',Arial,sans-serif] text-[#203746]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-emerald-600 px-5 py-3 text-white shadow-xl animate-fade-in">
          <Check className="h-5 w-5" />
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      <div className="mx-auto flex min-h-screen w-full max-w-[1920px] flex-col lg:flex-row">
        {/* Left Sidebar */}
        <RecruitmentAgencySidebar activeHref="/recruitment-agency/carer-directory" />

        {/* Right Main Content */}
        <div className="min-w-0 flex-1">
          {/* Top Header Banner */}
          <header className="w-full px-6 sm:px-10 py-5 bg-cyan-700/10 flex items-center justify-between border-b border-cyan-700/10">
            <div className="flex-1 flex flex-col justify-start items-start gap-1">
              <h1 className="text-black text-2xl sm:text-3xl font-semibold font-['Wix_Madefor_Text'] leading-tight">
                Carer Directory
              </h1>
              <p className="text-slate-700 text-sm sm:text-base lg:text-lg font-normal font-['Wix_Madefor_Text'] leading-normal">
                Review and process job applications
              </p>
            </div>

            {/* Profile Badge */}
            <Link
              href="/recruitment-agency/agency-profile"
              className="inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-2 pr-4 shadow-sm hover:bg-slate-50 transition-colors border border-slate-100 shrink-0 ml-4"
            >
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-cyan-700/20 bg-slate-100 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="CareRecruitPro"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold leading-tight text-slate-800">
                  CareRecruitPro
                </span>
                <span className="text-xs font-normal text-gray-500">
                  Agency
                </span>
              </div>
            </Link>
          </header>

          {/* Grid of Carer Cards */}
          <div className="mx-auto container p-4 sm:p-6 lg:p-8 space-y-6 pb-20 max-w-[1616px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {carersList.map((carer, index) => (
                <div
                  key={`${carer.id}-${index}`}
                  className="bg-white rounded-2xl border border-neutral-200/80 shadow-[0px_2px_4px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group"
                >
                  {/* Top Image Box with Available Badge */}
                  <div className="relative w-full h-56 bg-slate-100 overflow-hidden">
                    <Image
                      src={carer.image}
                      alt={carer.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {carer.available && (
                      <span className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-xs text-slate-800 text-xs font-semibold rounded-full shadow-xs">
                        Available
                      </span>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex flex-col gap-4 flex-1 justify-between">
                    <div className="space-y-3">
                      {/* Rating & Location Row */}
                      <div className="flex items-center justify-between text-xs">
                        {/* Rating Stars */}
                        <div className="flex items-center gap-1 text-amber-500">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="size-3.5 fill-amber-400 text-amber-400"
                              />
                            ))}
                          </div>
                          <span className="font-semibold text-slate-700 ml-1">
                            {carer.rating} ({carer.reviewsCount})
                          </span>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-1 text-gray-500">
                          <MapPin className="size-3.5" />
                          <span>{carer.location}</span>
                        </div>
                      </div>

                      {/* Name */}
                      <Link
                        href={`/recruitment-agency/carer-directory/${carer.id}`}
                        className="text-cyan-700 hover:text-cyan-800 font-bold text-xl sm:text-2xl font-['Wix_Madefor_Text'] leading-tight block hover:underline"
                      >
                        {carer.name}
                      </Link>

                      {/* Bio */}
                      <p className="text-gray-500 text-xs sm:text-sm font-normal font-['Wix_Madefor_Text'] leading-relaxed line-clamp-2">
                        {carer.bio}
                      </p>

                      {/* Specialties Pills */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {carer.specialties.map((spec) => (
                          <span
                            key={spec}
                            className="px-3 py-1 bg-[#eef5fa] text-[#2b6ea6] rounded-full text-xs font-medium"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>

                      {/* Stat Badges */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        <span className="px-3 py-1 bg-[#eef5fa] text-slate-700 rounded-full text-xs font-medium">
                          {carer.experienceYears}
                        </span>
                        {carer.dbsVerified && (
                          <span className="px-3 py-1 bg-[#eef5fa] text-slate-700 rounded-full text-xs font-medium">
                            DBS Verified
                          </span>
                        )}
                        <span className="px-3 py-1 bg-[#eef5fa] text-slate-700 rounded-full text-xs font-medium">
                          {carer.rate}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Action Button */}
                    <div className="pt-2">
                      <Link
                        href={`/recruitment-agency/carer-directory/${carer.id}`}
                        className="w-full py-3 bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg font-medium text-sm font-['Wix_Madefor_Text'] transition-colors text-center block shadow-xs active:scale-[0.99]"
                      >
                        Contact Carer
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
