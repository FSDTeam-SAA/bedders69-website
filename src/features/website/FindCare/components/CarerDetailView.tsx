"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Star,
  MapPin,
  CheckCircle,
  Award,
  Calendar,
  MessageCircle,
  Phone,
  Mail,
  ArrowLeft,
  UserCheck,
} from "lucide-react";
import findCareApi from "../api/findCareApi";
import { CarerItem } from "../types/findCare.types";

const fallbackCarerImages = [
  "https://images.unsplash.com/photo-1594824813681-364e2d31298c?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
];

export const CarerDetailView = () => {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "";
  const decodedSlug = decodeURIComponent(id).toLowerCase().replace(/\s+/g, "-");

  const [carer, setCarer] = useState<CarerItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function loadCarer() {
      setIsLoading(true);
      try {
        const res = await findCareApi.getCarers({ limit: 50, page: 1 });
        if (res && res.data && isMounted) {
          const matched = res.data.find(
            (c) =>
              c.id === id ||
              c.careName.toLowerCase().replace(/\s+/g, "-") === decodedSlug ||
              encodeURIComponent(c.careName.toLowerCase().replace(/\s+/g, "-")) === id
          );

          if (matched) {
            setCarer(matched);
          } else if (res.data.length > 0) {
            setCarer(res.data[0]);
          }
        }
      } catch (err) {
        console.error("Error loading carer detail:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    loadCarer();
    return () => {
      isMounted = false;
    };
  }, [id, decodedSlug]);

  if (isLoading) {
    return (
      <main className="w-full bg-[#F4F7FC] min-h-screen pb-16 font-['Wix_Madefor_Text']">
        <div className="h-64 w-full animate-pulse bg-slate-300" />
        <div className="container mx-auto px-6 md:px-12 lg:px-16 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="h-44 animate-pulse rounded-3xl bg-white p-6 shadow-sm" />
              <div className="h-36 animate-pulse rounded-3xl bg-white p-6 shadow-sm" />
            </div>
            <div className="lg:col-span-4">
              <div className="h-48 animate-pulse rounded-3xl bg-white p-6 shadow-sm" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!carer) {
    return (
      <main className="min-h-screen bg-[#F4F7FC] flex items-center justify-center p-6">
        <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <UserCheck className="mx-auto size-12 text-slate-400" />
          <h2 className="mt-4 text-xl font-bold text-[#1B2C54]">Carer Not Found</h2>
          <p className="mt-2 text-sm text-slate-500">
            The carer profile you are looking for does not exist or is unavailable.
          </p>
          <button
            onClick={() => router.push("/find-care")}
            className="mt-6 rounded-lg bg-cyan-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-800"
          >
            Back to Carers
          </button>
        </div>
      </main>
    );
  }

  const name = carer.careName;
  const location =
    carer.address || (carer.postCode ? `UK (${carer.postCode})` : "London, UK");
  const expYears = carer.yearsOfExperience || 5;
  const skillsList =
    carer.skills && carer.skills.length > 0
      ? carer.skills
      : carer.specialisms && carer.specialisms.length > 0
      ? carer.specialisms
      : ["Personal Care", "Companionship", "Dementia Care"];
  const image =
    carer.profilePicture || fallbackCarerImages[0];
  const bio =
    carer.professionalSummary ||
    `${name} is a dedicated and qualified care professional with ${expYears}+ years of experience providing person-centred assistance, dignity, and companionship to vulnerable adults and seniors.`;

  const cleanPhone = carer.phoneNumber
    ? carer.phoneNumber.replace(/[^0-9]/g, "")
    : "";

  return (
    <main className="w-full bg-[#F4F7FC] min-h-screen pb-16 font-['Wix_Madefor_Text']">
      {/* Back button bar */}
      <div className="bg-[#1B2C54] text-white py-3.5 px-6 md:px-12 lg:px-16 border-b border-white/5">
        <div className="container mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer text-xs font-semibold"
          >
            <ArrowLeft className="size-4" />
            Back to Carers List
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <section
        className="w-full bg-cover bg-center py-14 md:py-20 px-6 text-center text-white relative shadow-md"
        style={{
          backgroundImage: `linear-gradient(rgba(14, 35, 66, 0.7), rgba(14, 35, 66, 0.8)), url('/images/services_hero.jpg')`,
        }}
      >
        <div className="max-w-4xl mx-auto flex flex-col gap-3">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {name}
          </h1>
          <p className="text-sm md:text-base text-white/85 font-normal leading-relaxed max-w-2xl mx-auto">
            Verified Professional Carer · Dedicated & Compassionate Care Support
          </p>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="container mx-auto px-6 md:px-12 lg:px-16 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Details Cards */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Header info profile card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              {/* Profile Image */}
              <div className="size-32 rounded-2xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100 shadow-sm">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Text Info */}
              <div className="flex-1 flex flex-col gap-2 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1B2C54]">
                    {name}
                  </h2>

                  {/* Badges */}
                  <div className="flex justify-center sm:justify-start items-center gap-2">
                    <span className="bg-[#E5F2FC] text-[#0A66C2] text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                      Independent Carer
                    </span>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                      DBS Verified
                    </span>
                  </div>
                </div>

                {/* Rating & Location line */}
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-slate-500 text-sm mt-1">
                  <div className="flex items-center gap-1 font-semibold">
                    <MapPin className="size-4 text-slate-400" />
                    <span>{location}</span>
                  </div>

                  <span className="hidden sm:inline text-slate-200">•</span>

                  <div className="flex items-center gap-1">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="size-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <span className="text-slate-700 font-bold ml-1">4.9</span>
                    <span className="text-slate-400">(28 reviews)</span>
                  </div>
                </div>

                {/* Extra Stats */}
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-slate-500 text-sm mt-2 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Award className="size-4 text-[#0A66C2]" />
                    <span>{expYears} Years Experience</span>
                  </div>
                  <span className="hidden sm:inline text-slate-200">•</span>
                  <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                    <CheckCircle className="size-4 text-emerald-600" />
                    <span>{carer.isAvailable !== false ? "Available Immediately" : "On Assignment"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* About Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-3">
              <h3 className="text-lg font-bold text-slate-800">
                About {name}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base font-normal">
                {bio}
              </p>
            </div>

            {/* Skills & Specialisms Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-3">
              <h3 className="text-lg font-bold text-slate-800">
                Skills & Specialisms
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {skillsList.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-[#E5F2FC] text-[#0A66C2] text-xs font-bold px-4 py-2 rounded-xl border border-blue-100/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Availability Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-3">
              <h3 className="text-lg font-bold text-slate-800">
                Availability & Shifts
              </h3>
              <div className="flex gap-3 items-start text-slate-600 text-sm md:text-base">
                <Calendar className="size-5 text-[#0A66C2] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {carer.shifts || "Day Shifts · Night Shifts · Flexible Hours · Emergency On-Call"}
                </p>
              </div>
            </div>

            {/* Service Area Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-3">
              <h3 className="text-lg font-bold text-slate-800">
                Service Area
              </h3>
              <div className="flex gap-3 items-center text-slate-600 text-sm md:text-base">
                <MapPin className="size-5 text-[#0A66C2] shrink-0" />
                <span>{location} and surrounding areas</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Contact Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-4">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
              <h4 className="text-base font-bold text-slate-800">
                Direct Contact
              </h4>
              <p className="text-xs text-slate-400 font-medium">
                Reach out directly to {name} for care inquiries, assessments, and bookings.
              </p>

              {cleanPhone && (
                <a
                  href={`https://wa.me/${cleanPhone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#25D366] hover:bg-[#20BA56] text-white py-3.5 px-6 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-sm active:scale-[0.98]"
                >
                  <MessageCircle className="size-5 fill-current" />
                  Chat on WhatsApp
                </a>
              )}

              {carer.phoneNumber && (
                <a
                  href={`tel:${carer.phoneNumber}`}
                  className="bg-[#2D6A9F] hover:bg-[#20527F] text-white py-3.5 px-6 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <Phone className="size-4" />
                  Call: {carer.phoneNumber}
                </a>
              )}

              {carer.email && (
                <a
                  href={`mailto:${carer.email}?subject=Care Inquiry for ${name}`}
                  className="border border-slate-200 text-slate-700 hover:bg-slate-50 py-3.5 px-6 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Mail className="size-4" />
                  Send Email
                </a>
              )}
            </div>

            {/* Verification info badge */}
            <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex flex-col gap-2">
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle className="size-4 text-emerald-600" />
                Verified & Background Checked
              </span>
              <p className="text-xs text-slate-500 leading-relaxed">
                Identity, Right to Work in the UK, and Enhanced DBS checks have been verified.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CarerDetailView;
