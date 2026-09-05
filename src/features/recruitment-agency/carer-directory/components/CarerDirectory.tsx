"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import RecruitmentAgencySidebar from "@/features/recruitment-agency/components/RecruitmentAgencySidebar";
import {
  Bell,
  Check,
  Loader2,
  MapPin,
  MessageSquare,
  Send,
  Star,
  X,
} from "lucide-react";

export interface CarerCardData {
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

function mapBackendCarer(item: any): CarerCardData {
  const carerInfo = typeof item.carerId === "object" ? item.carerId : (item.carerUserId || item);
  
  const name =
    item.careName ||
    item.name ||
    carerInfo?.careName ||
    carerInfo?.fullName ||
    carerInfo?.name ||
    "Carer Profile";

  const image =
    item.profilePicture ||
    item.image ||
    carerInfo?.profilePicture ||
    carerInfo?.image ||
    "/images/carer-male.png";

  const location =
    [item.address, item.postCode].filter(Boolean).join(", ") ||
    item.location ||
    carerInfo?.city ||
    carerInfo?.location ||
    carerInfo?.postCode ||
    "United Kingdom";

  const bio =
    item.professionalSummary ||
    item.bio ||
    item.description ||
    carerInfo?.bio ||
    "Experienced healthcare assistant and care professional.";

  const rating = typeof item.rating === "number" ? item.rating : 4.8;

  const reviewsCount =
    typeof item.reviews === "number"
      ? item.reviews
      : typeof item.reviewsCount === "number"
      ? item.reviewsCount
      : 24;

  const rawSkills =
    (Array.isArray(item.skills) && item.skills.length > 0 ? item.skills : null) ||
    (Array.isArray(item.specialisms) && item.specialisms.length > 0 ? item.specialisms : null) ||
    item.specialties ||
    carerInfo?.skills ||
    carerInfo?.specialties;
    
  const specialties =
    Array.isArray(rawSkills) && rawSkills.length > 0
      ? rawSkills
      : ["Personal Care", "Dementia Care"];

  const experienceYears =
    item.yearsOfExperience
      ? `${item.yearsOfExperience} Years`
      : item.experience || item.experienceYears || carerInfo?.experience || "2+ Years";

  const dbsVerified =
    item.verified === "DBS Verified" ||
    item.verified === true ||
    item.dbsVerified === true ||
    carerInfo?.dbsVerified === true ||
    item.profileCompletionStatus === "approved";

  const rate = item.rate || item.hourlyRate || carerInfo?.rate || "£15/hr";

  const available =
    typeof item.isAvailable === "boolean"
      ? item.isAvailable
      : typeof item.available === "boolean"
      ? item.available
      : true;

  return {
    id: item._id || item.id || item.carerId || `carer-${Math.random()}`,
    name,
    rating,
    reviewsCount,
    location,
    bio,
    image,
    specialties,
    experienceYears,
    dbsVerified,
    rate,
    available,
  };
}

export default function CarerDirectory() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedCarerForContact, setSelectedCarerForContact] = useState<CarerCardData | null>(null);
  const [contactMessage, setContactMessage] = useState("");
  const [isSendingContact, setIsSendingContact] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const openContactModal = (carer: CarerCardData) => {
    setSelectedCarerForContact(carer);
    setContactMessage(`Hello ${carer.name}, CareRecruitPro recruitment agency is interested in connecting with you regarding upcoming healthcare staffing opportunities.`);
  };

  const handleSendContactRequest = async () => {
    if (!selectedCarerForContact) return;
    setIsSendingContact(true);
    try {
      const res = await fetch("/api/recruitment-agency/contact-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUserId: selectedCarerForContact.id,
          name: selectedCarerForContact.name,
          message: contactMessage,
          category: "Agency Contact",
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to send contact request");
      }
      triggerToast(`Contact request sent successfully to ${selectedCarerForContact.name}!`);
      setSelectedCarerForContact(null);
    } catch (err: any) {
      alert(err?.message || "Failed to send contact request");
    } finally {
      setIsSendingContact(false);
    }
  };

  // Client-side TanStack Query fetching directly from /api/recruitment-agency/carers
  const {
    data: carers = [],
    isLoading,
    isError,
    error,
  } = useQuery<CarerCardData[]>({
    queryKey: ["agency-carers"],
    queryFn: async () => {
      const res = await fetch("/api/recruitment-agency/carers");
      if (!res.ok) {
        throw new Error("Failed to fetch carers directory");
      }
      const result = await res.json();
      const rawList = result.data || result;
      if (Array.isArray(rawList)) {
        return rawList.map(mapBackendCarer);
      }
      return [];
    },
  });

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-['Wix_Madefor_Text',Arial,sans-serif] text-[#203746]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 rounded-xl bg-emerald-600 px-5 py-3 text-white shadow-xl animate-fade-in">
          <Check className="h-5 w-5 shrink-0" />
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Contact Carer Modal */}
      {selectedCarerForContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 border border-slate-100 relative">
            <button
              onClick={() => setSelectedCarerForContact(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="size-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="relative size-14 rounded-full overflow-hidden border border-cyan-700/20 bg-slate-100 shrink-0">
                <Image
                  src={selectedCarerForContact.image}
                  alt={selectedCarerForContact.name}
                  fill
                  className="object-cover"
                  unoptimized={selectedCarerForContact.image.startsWith("http")}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 font-['Wix_Madefor_Text']">
                  Contact {selectedCarerForContact.name}
                </h3>
                <p className="text-xs text-slate-500 font-normal">
                  Send a direct contact request to this carer
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">
                Your Message
              </label>
              <textarea
                rows={4}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-700/40 focus:border-cyan-700 transition-all font-['Wix_Madefor_Text'] resize-none"
                placeholder="Type your message to carer..."
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedCarerForContact(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium text-sm hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSendingContact || !contactMessage.trim()}
                onClick={handleSendContactRequest}
                className="px-6 py-2.5 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-medium text-sm transition-colors flex items-center gap-2 disabled:opacity-50 shadow-sm"
              >
                {isSendingContact ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    <span>Send Request</span>
                  </>
                )}
              </button>
            </div>
          </div>
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
                Browse, search, and manage your agency carer directory.
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
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-500">
                <Loader2 className="size-10 animate-spin text-cyan-700" />
                <span className="font-semibold text-base">Loading carers from backend...</span>
              </div>
            ) : isError ? (
              <div className="w-full bg-white rounded-2xl p-12 text-center border border-red-200/80 shadow-xs">
                <p className="text-red-600 font-semibold text-lg">Error loading carers</p>
                <p className="text-gray-500 text-sm mt-1">{(error as Error)?.message || "Failed to load carers"}</p>
              </div>
            ) : carers.length === 0 ? (
              <div className="w-full bg-white rounded-2xl p-12 text-center border border-neutral-200/80 shadow-xs">
                <p className="text-slate-600 font-semibold text-lg">No carers found in directory.</p>
                <p className="text-gray-400 text-sm mt-1">Carers added or saved by your agency will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {carers.map((carer, index) => (
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
                        unoptimized={carer.image.startsWith("http")}
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

                      {/* Bottom Action Buttons */}
                      <div className="pt-2 grid grid-cols-2 gap-2.5">
                        <Link
                          href={`/recruitment-agency/carer-directory/${carer.id}`}
                          className="py-2.5 px-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-medium text-xs font-['Wix_Madefor_Text'] transition-colors text-center block shadow-2xs"
                        >
                          View Profile
                        </Link>
                        <button
                          type="button"
                          onClick={() => openContactModal(carer)}
                          className="py-2.5 px-3 bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg font-medium text-xs font-['Wix_Madefor_Text'] transition-colors text-center flex items-center justify-center gap-1.5 shadow-2xs active:scale-[0.99]"
                        >
                          <MessageSquare className="size-3.5" />
                          <span>Contact Carer</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
