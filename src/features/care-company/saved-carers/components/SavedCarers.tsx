"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CareCompanySidebar from "@/features/care-company/components/CareCompanySidebar";
import { MapPin, Star, BookmarkCheck, MessageSquare } from "lucide-react";

interface SavedCarer {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  bio: string;
  skills: string[];
  experience: string;
  verified: string;
  rate: string;
  available: boolean;
  image: string;
}

const initialSavedCarers: SavedCarer[] = [
  {
    id: "1",
    name: "Matthew Warkentin",
    rating: 4.9,
    reviews: 67,
    location: "London, N1",
    bio: "Compassionate Care Assistant with 5+ years supporting elderly and vulnerable adults.",
    skills: ["Dementia Care", "Medication Admin"],
    experience: "2 Years",
    verified: "DBS Verified",
    rate: "$150/hrs",
    available: true,
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    name: "Sarah Palmer",
    rating: 4.7,
    reviews: 35,
    location: "Birmingham, B2",
    bio: "Dedicated Support Worker with a focus on mental health and well-being.",
    skills: ["Mental Health Support", "Crisis Intervention"],
    experience: "3 Years",
    verified: "DBS Verified",
    rate: "$120/hrs",
    available: true,
    image:
      "https://images.unsplash.com/photo-1594824813527-39908cf8b5cf?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    name: "John Smith",
    rating: 4.8,
    reviews: 50,
    location: "Manchester, M1",
    bio: "Experienced Home Carer specialized in personal care and companionship.",
    skills: ["Personal Care", "Companionship"],
    experience: "4 Years",
    verified: "DBS Verified",
    rate: "$140/hrs",
    available: true,
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80",
  },
];

export default function SavedCarers() {
  const [carers] = useState<SavedCarer[]>(initialSavedCarers);
  const [contactedCarer, setContactedCarer] = useState<string | null>(null);

  const handleContact = (carerName: string) => {
    setContactedCarer(carerName);
    setTimeout(() => {
      setContactedCarer(null);
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-['Wix_Madefor_Text',Arial,sans-serif] text-[#203746]">
      {/* Contact Toast */}
      {contactedCarer && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-emerald-600 px-5 py-3 text-white shadow-xl animate-fade-in">
          <MessageSquare className="h-5 w-5" />
          <span className="font-semibold text-sm">
            Contact request initiated for {contactedCarer}!
          </span>
        </div>
      )}

      <div className="mx-auto flex min-h-screen w-full max-w-[1920px] flex-col lg:flex-row">
        {/* Left Sidebar */}
        <CareCompanySidebar activeHref="/care-company/save-carers" />

        {/* Right Content */}
        <div className="min-w-0 flex-1">
          {/* Header */}
          <header className="flex min-h-[96px] w-full items-center justify-between bg-white px-6 py-6 border-b border-[#f0f1f2]">
            <div className="flex flex-col justify-start items-start gap-1">
              <h1 className="text-2xl font-bold leading-7 text-[#2b6ea6]">
                Saved Carers
              </h1>
              <p className="text-xs font-normal leading-4 text-gray-500">
                {carers.length} carers saved
              </p>
            </div>
            <Link
              href="/care-company/company-profile"
              className="inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-2 pr-4 shadow-sm hover:bg-slate-50 transition-colors border border-slate-100 shrink-0 ml-4"
            >
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-cyan-700/20 bg-slate-100 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Sunrise Care"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold leading-tight text-slate-800">
                  Sunrise Care
                </span>
                <span className="text-xs font-normal text-gray-500">
                  Care Company
                </span>
              </div>
            </Link>
          </header>

          {/* Carers Grid */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {carers.map((carer) => (
              <div
                key={carer.id}
                className="overflow-hidden rounded-2xl bg-white shadow-[0px_4px_6px_0px_rgba(0,0,0,0.06)] border border-neutral-100 flex flex-col transition-all hover:shadow-lg group"
              >
                {/* Image Section with Available Badge */}
                <Link
                  href={`/care-company/save-carers/${carer.id}`}
                  className="relative h-64 w-full overflow-hidden bg-neutral-100 block cursor-pointer"
                >
                  <img
                    src={carer.image}
                    alt={carer.name}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                  {carer.available && (
                    <div className="absolute left-4 top-4 rounded-[45px] bg-white px-3.5 py-1.5 shadow-sm flex items-center justify-center">
                      <span className="text-xs font-bold leading-4 text-[#2b6ea6]">
                        Available
                      </span>
                    </div>
                  )}
                </Link>

                {/* Content Section */}
                <div className="p-6 flex flex-col justify-between flex-1 gap-6">
                  <div className="space-y-4">
                    {/* Rating & Location Row */}
                    <div className="flex items-center justify-between">
                      {/* Rating Stars */}
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-3.5 w-3.5 fill-[#eab308] text-[#eab308]"
                              strokeWidth={1.5}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 font-normal">
                          {carer.rating} ({carer.reviews})
                        </span>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-1 text-gray-500">
                        <MapPin className="h-3.5 w-3.5 text-gray-400" />
                        <span className="text-xs font-normal">
                          {carer.location}
                        </span>
                      </div>
                    </div>

                    {/* Name & Bio */}
                    <div className="space-y-2">
                      <Link
                        href={`/care-company/save-carers/${carer.id}`}
                        className="block hover:underline"
                      >
                        <h2 className="text-2xl font-semibold leading-7 text-[#2b6ea6]">
                          {carer.name}
                        </h2>
                      </Link>
                      <p className="text-sm font-normal leading-5 text-gray-500 min-h-[40px]">
                        {carer.bio}
                      </p>
                    </div>

                    {/* Skill & Info Badges */}
                    <Link
                      href={`/care-company/save-carers/${carer.id}`}
                      className="block space-y-2 pt-1"
                    >
                      {/* Skills Row */}
                      <div className="flex items-center gap-1.5">
                        {carer.skills.map((skill) => (
                          <div
                            key={skill}
                            className="flex-1 rounded-[100px] bg-slate-100 px-3 py-2 text-center"
                          >
                            <span className="text-xs sm:text-sm font-medium text-[#2b6ea6] whitespace-nowrap">
                              {skill}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Experience, Verified & Rate Row */}
                      <div className="flex items-center gap-1.5">
                        <div className="flex-1 rounded-[45px] bg-slate-100 px-2 py-2 text-center">
                          <span className="text-xs sm:text-sm font-medium text-[#2b6ea6] whitespace-nowrap">
                            {carer.experience}
                          </span>
                        </div>
                        <div className="flex-1 rounded-[100px] bg-slate-100 px-2 py-2 text-center">
                          <span className="text-xs sm:text-sm font-medium text-[#2b6ea6] whitespace-nowrap">
                            {carer.verified}
                          </span>
                        </div>
                        <div className="flex-1 rounded-[100px] bg-slate-100 px-2 py-2 text-center">
                          <span className="text-xs sm:text-sm font-medium text-[#2b6ea6] whitespace-nowrap">
                            {carer.rate}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Action Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContact(carer.name);
                    }}
                    className="w-full rounded-md bg-[#2b6ea6] py-3 text-center text-base font-semibold text-white transition-colors hover:bg-[#20527f] cursor-pointer shadow-sm active:scale-[0.99]"
                  >
                    Contact Carer
                  </button>
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