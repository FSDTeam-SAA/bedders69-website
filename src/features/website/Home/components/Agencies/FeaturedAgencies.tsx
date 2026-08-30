"use client";

import CareCompanyCard from "@/components/shared/careCard";
import { useFeaturedAgencies } from "../../hooks/useHome";
import { fallbackAgencies } from "@/Data/data";
import { RefreshCw } from "lucide-react";

const REALISTIC_AGENCY_IMAGES = [
  "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800", // Healthcare staffing agency team
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800", // Staffing recruitment meeting
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800", // Healthcare agency workplace
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800", // Recruitment director
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800", // Nurse recruitment manager
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800", // Healthcare staffing consultation
];

const FeaturedAgencies = () => {
  const { agencies, isLoading, error, refetch } = useFeaturedAgencies({
    limit: 6,
    page: 1,
  });

  const displayList = agencies && agencies.length > 0 ? agencies : fallbackAgencies;

  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-24">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-10 sm:gap-12 lg:gap-14">
        {/* Heading */}
        <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center">
          <span className="text-base font-semibold uppercase leading-6 text-emerald-500">
            Verified Services
          </span>

          <h2 className="text-3xl font-bold leading-10 text-indigo-900 sm:text-4xl">
            Featured Care Agencies
          </h2>

          <p className="text-sm font-normal leading-6 text-neutral-700 sm:text-base">
            From finding care to recruiting staff — one platform for the entire UK care ecosystem
          </p>
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col overflow-hidden rounded-2xl bg-white p-4 shadow-[0px_4px_6px_0px_rgba(43,110,166,0.10)]"
              >
                <div className="aspect-video w-full animate-pulse rounded-xl bg-slate-200" />
                <div className="mt-4 flex flex-col gap-3">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
                  <div className="mt-2 h-11 w-full animate-pulse rounded-lg bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="flex w-full max-w-md flex-col items-center justify-center gap-3 rounded-2xl border border-red-100 bg-red-50/50 p-8 text-center">
            <p className="text-sm font-medium text-red-600">{error}</p>
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 rounded-lg bg-indigo-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-800"
            >
              <RefreshCw className="size-4" />
              Try Again
            </button>
          </div>
        )}

        {/* Real / Fallback Agencies Grid */}
        {!isLoading && (!error || displayList.length > 0) && (
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayList.map((item: any, index: number) => {
              const name = item.organizationName || item.name || "Care Agency";
              const location =
                [item.city, item.address, item.postCode].filter(Boolean).join(", ") ||
                item.location ||
                "United Kingdom";

              const tags =
                item.services && item.services.length > 0
                  ? item.services
                  : item.tags && item.tags.length > 0
                  ? item.tags
                  : ["Healthcare Staffing", "Nurse Recruitment"];

              const rawImage = item.coverPhoto || item.logo || item.image;
              const image =
                rawImage &&
                !rawImage.includes("placehold") &&
                !rawImage.includes("agency_banner.jpg")
                  ? rawImage
                  : REALISTIC_AGENCY_IMAGES[index % REALISTIC_AGENCY_IMAGES.length];

              return (
                <CareCompanyCard
                  key={item.id || index}
                  id={item.id}
                  name={name}
                  location={location}
                  tags={tags}
                  image={image}
                  email={item.email}
                  phoneNumber={item.phoneNumber}
                  websiteLink={item.websiteLink}
                  rating={item.rating || "4.8"}
                  reviews={item.reviews || "20+"}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedAgencies;
