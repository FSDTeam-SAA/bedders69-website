"use client";

import CareCompanyCard from "@/components/shared/careCard";
import { useFeaturedCompanies } from "../../hooks/useHome";
import { companies as fallbackCompanies } from "@/Data/data";
import { RefreshCw } from "lucide-react";

const REALISTIC_CARE_IMAGES = [
  "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&q=80&w=800", // Modern residential care home
  "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800", // Compassionate carer with senior
  "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800", // Care home senior activity
  "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800", // Consultation & specialist clinic
  "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800", // Home care assistant with senior
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800", // Specialist healthcare center
];

const FeaturedCompanies = () => {
  const { companies, isLoading, error, refetch } = useFeaturedCompanies({
    limit: 6,
    page: 1,
  });

  const displayList = companies && companies.length > 0 ? companies : fallbackCompanies;

  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-24">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-10 sm:gap-12 lg:gap-14">
        {/* Header */}
        <div className="flex w-full max-w-4xl flex-col items-center gap-2 text-center">
          <span className="text-base font-semibold uppercase leading-6 text-emerald-500">
            Verified Services
          </span>

          <h2 className="text-3xl font-bold leading-10 text-indigo-900 sm:text-4xl">
            Featured Care Companies
          </h2>

          <p className="text-sm font-normal leading-6 text-neutral-700 sm:text-base">
            From finding care to recruiting staff one platform for the entire UK care ecosystem
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

        {/* Real / Fallback Companies Grid */}
        {!isLoading && (!error || displayList.length > 0) && (
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayList.map((item: any, index: number) => {
              const name = item.companyName || item.name || "Care Provider";
              const location =
                item.address ||
                item.location ||
                item.postCode ||
                (item.coverageRegions && item.coverageRegions.length > 0
                  ? item.coverageRegions.join(", ")
                  : "United Kingdom");

              const tags =
                item.serviceOffered && item.serviceOffered.length > 0
                  ? item.serviceOffered
                  : item.tags && item.tags.length > 0
                  ? item.tags
                  : ["Care Provider", "Verified"];

              const rawImage = item.coverPhoto || item.logo || item.image;
              const image =
                rawImage &&
                !rawImage.includes("placehold") &&
                !rawImage.includes("care-company.jpg")
                  ? rawImage
                  : REALISTIC_CARE_IMAGES[index % REALISTIC_CARE_IMAGES.length];

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
                  rating={item.rating || "4.9"}
                  reviews={item.reviews || "18+"}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCompanies;
