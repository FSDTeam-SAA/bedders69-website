"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BriefcaseBusiness,
  Building2,
  Lock,
  SearchCheck,
  ShoppingBag,
  Search,
  X,
  ChevronDown,
  ArrowUpRight,
  Loader2,
  UserCheck,
  MapPin,
} from "lucide-react";
import homeApi from "../../api/homeApi";
import {
  companies as fallbackCompanies,
  fallbackAgencies,
  products as fallbackProducts,
} from "@/Data/data";

interface SearchResultItem {
  id: string;
  title: string;
  subtitle?: string;
  location?: string;
  category: "care" | "agency" | "jobs" | "products" | "carers";
  href: string;
  tag?: string;
}

interface MemberAvatar {
  name: string;
  image: string;
  role?: string;
}

const DEFAULT_COMMUNITY_AVATARS: MemberAvatar[] = [
  {
    name: "Sarah M. (Registered Nurse)",
    image:
      "https://images.unsplash.com/photo-1594824813571-638f026385a4?auto=format&fit=crop&q=80&w=120",
    role: "Registered Nurse",
  },
  {
    name: "David K. (Senior Carer)",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=120",
    role: "Senior Carer",
  },
  {
    name: "Dr. Elena R. (Care Specialist)",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=120",
    role: "Care Specialist",
  },
  {
    name: "Marcus L. (Support Worker)",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=120",
    role: "Support Worker",
  },
];

const Banner = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Dynamic community members & stats
  const [communityStats, setCommunityStats] = useState<{
    totalMembers: number;
    avatars: MemberAvatar[];
  }>({
    totalMembers: 10000,
    avatars: DEFAULT_COMMUNITY_AVATARS,
  });

  // Categorized search results
  const [careResults, setCareResults] = useState<SearchResultItem[]>([]);
  const [agencyResults, setAgencyResults] = useState<SearchResultItem[]>([]);
  const [jobResults, setJobResults] = useState<SearchResultItem[]>([]);
  const [productResults, setProductResults] = useState<SearchResultItem[]>([]);
  const [carerResults, setCarerResults] = useState<SearchResultItem[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch community statistics & member avatars
  useEffect(() => {
    let isMounted = true;

    const fetchCommunityData = async () => {
      try {
        const statsRes = await homeApi.getCommunityStats();
        if (isMounted && statsRes?.data) {
          const apiTotal = statsRes.data.totalMembers || 0;
          const apiAvatars = (statsRes.data.avatars || []).filter(
            (a) => a.image && a.image.trim().length > 0
          );

          const combinedAvatars: MemberAvatar[] = [
            ...apiAvatars,
            ...DEFAULT_COMMUNITY_AVATARS.slice(apiAvatars.length),
          ].slice(0, 4);

          setCommunityStats({
            totalMembers: apiTotal > 0 ? apiTotal : 10000,
            avatars: combinedAvatars,
          });
          return;
        }
      } catch {
        // Fallback to getCarers
        try {
          const carersRes = await homeApi.getCarers({ limit: 4 });
          if (isMounted && carersRes?.data && carersRes.data.length > 0) {
            const carerAvatars: MemberAvatar[] = carersRes.data
              .filter(
                (c): c is typeof c & { profilePicture: string } =>
                  Boolean(c.profilePicture)
              )
              .map((c) => ({
                name: c.careName || "Carer",
                image: c.profilePicture,
                role: c.specialisms?.[0] || "Carer",
              }));

            const combined: MemberAvatar[] = [
              ...carerAvatars,
              ...DEFAULT_COMMUNITY_AVATARS.slice(carerAvatars.length),
            ].slice(0, 4);

            const total = carersRes.meta?.total || 10000;
            setCommunityStats({
              totalMembers: total > 0 ? total : 10000,
              avatars: combined,
            });
            return;
          }
        } catch {
          // Keep default fallback
        }
      }
    };

    fetchCommunityData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Close dropdown on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Debounced search logic
  const performSearch = useCallback(
    async (query: string, category: string) => {
      const q = query.toLowerCase().trim();
      if (!q) {
        setCareResults([]);
        setAgencyResults([]);
        setJobResults([]);
        setProductResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      const fetchCare = category === "" || category === "care";
      const fetchAgency = category === "" || category === "agency";
      const fetchJobs = category === "" || category === "jobs";
      const fetchProducts = category === "" || category === "products";
      const fetchCarers = category === "" || category === "carers";

      // 1. Care Companies (Services)
      let foundCare: SearchResultItem[] = [];
      if (fetchCare) {
        try {
          const res = await homeApi.getFeaturedCareCompanies({
            search: q,
            limit: 4,
          });
          if (res?.data && res.data.length > 0) {
            foundCare = res.data.map((c) => ({
              id: c.id,
              title: c.companyName,
              subtitle: c.serviceOffered?.[0] || "Care Provider",
              location: c.address || c.postCode || "United Kingdom",
              category: "care",
              href: `/services/${encodeURIComponent(
                c.companyName.toLowerCase().replace(/\s+/g, "-")
              )}`,
              tag: "Care Provider",
            }));
          }
        } catch {
          // Fallback to static data
        }
        if (foundCare.length === 0) {
          foundCare = fallbackCompanies
            .filter(
              (c) =>
                c.name.toLowerCase().includes(q) ||
                c.location.toLowerCase().includes(q) ||
                c.tags.some((t) => t.toLowerCase().includes(q))
            )
            .slice(0, 4)
            .map((c) => ({
              id: c.id || c.name,
              title: c.name,
              subtitle: c.tags?.[0] || "Care Home",
              location: c.location,
              category: "care",
              href: `/services/${encodeURIComponent(
                c.name.toLowerCase().replace(/\s+/g, "-")
              )}`,
              tag: "Care Provider",
            }));
        }
      }

      // 2. Care Agencies
      let foundAgencies: SearchResultItem[] = [];
      if (fetchAgency) {
        try {
          const res = await homeApi.getFeaturedAgencies({
            search: q,
            limit: 4,
          });
          if (res?.data && res.data.length > 0) {
            foundAgencies = res.data.map((a) => ({
              id: a.id,
              title: a.organizationName,
              subtitle: a.services?.[0] || "Recruitment Agency",
              location: a.address || a.city || a.postCode || "United Kingdom",
              category: "agency",
              href: `/agencies?search=${encodeURIComponent(a.organizationName)}`,
              tag: "Agency",
            }));
          }
        } catch {
          // Fallback to static agencies
        }
        if (foundAgencies.length === 0) {
          foundAgencies = fallbackAgencies
            .filter(
              (a) =>
                a.name.toLowerCase().includes(q) ||
                a.location.toLowerCase().includes(q) ||
                a.tags.some((t) => t.toLowerCase().includes(q))
            )
            .slice(0, 4)
            .map((a) => ({
              id: a.id || a.name,
              title: a.name,
              subtitle: a.tags?.[0] || "Recruitment Agency",
              location: a.location,
              category: "agency",
              href: `/agencies?search=${encodeURIComponent(a.name)}`,
              tag: "Agency",
            }));
        }
      }

      // 3. Jobs
      let foundJobs: SearchResultItem[] = [];
      if (fetchJobs) {
        try {
          const res = await homeApi.getLatestJobs({ search: q, limit: 4 });
          if (res?.data && res.data.length > 0) {
            foundJobs = res.data.map((j) => ({
              id: j.id,
              title: j.title,
              subtitle: j.organization?.name || "Care Vacancy",
              location: j.city || j.location || j.postCode || "UK",
              category: "jobs",
              href: `/jobs/${encodeURIComponent(
                j.title.toLowerCase().replace(/\s+/g, "-")
              )}`,
              tag: "Job Vacancy",
            }));
          }
        } catch {
          // Ignore
        }
      }

      // 4. Products (Marketplace)
      let foundProducts: SearchResultItem[] = [];
      if (fetchProducts) {
        try {
          const res = await homeApi.getMarketplaceListings({
            search: q,
            limit: 4,
          });
          if (res?.data && res.data.length > 0) {
            foundProducts = res.data.map((p) => ({
              id: p.id,
              title: p.title,
              subtitle: p.category || "Care Product",
              location: p.price ? `£${p.price}` : undefined,
              category: "products",
              href: `/marketplace/${encodeURIComponent(
                p.title.toLowerCase().replace(/\s+/g, "-")
              )}`,
              tag: "Product",
            }));
          }
        } catch {
          // Fallback
        }
        if (foundProducts.length === 0) {
          foundProducts = fallbackProducts
            .filter(
              (p) =>
                p.name.toLowerCase().includes(q) ||
                p.category.toLowerCase().includes(q) ||
                p.seller.toLowerCase().includes(q)
            )
            .slice(0, 4)
            .map((p, idx) => ({
              id: `prod-${idx}`,
              title: p.name,
              subtitle: p.category,
              location: p.price,
              category: "products",
              href: `/marketplace/${encodeURIComponent(
                p.name.toLowerCase().replace(/\s+/g, "-")
              )}`,
              tag: "Product",
            }));
        }
      }

      // 5. Carers
      let foundCarers: SearchResultItem[] = [];
      if (fetchCarers) {
        try {
          const res = await homeApi.getCarers({ search: q, limit: 4 });
          if (res?.data && res.data.length > 0) {
            foundCarers = res.data.map((c) => ({
              id: c.id,
              title: c.careName,
              subtitle: c.specialisms?.[0] || "Independent Carer",
              location: c.address || c.postCode || "UK",
              category: "carers",
              href: `/find-care/${encodeURIComponent(
                c.careName.toLowerCase().replace(/\s+/g, "-")
              )}`,
              tag: "Carer",
            }));
          }
        } catch {
          // Ignore
        }
      }

      setCareResults(foundCare);
      setAgencyResults(foundAgencies);
      setJobResults(foundJobs);
      setProductResults(foundProducts);
      setCarerResults(foundCarers);
      setIsLoading(false);
    },
    []
  );

  // Debounce search input
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const timer = setTimeout(() => {
        performSearch(searchQuery, selectedCategory);
      }, 250);
      return () => clearTimeout(timer);
    } else {
      setCareResults([]);
      setAgencyResults([]);
      setJobResults([]);
      setProductResults([]);
      setCarerResults([]);
      setIsLoading(false);
    }
  }, [searchQuery, selectedCategory, performSearch]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsDropdownOpen(false);

    const queryParam = searchQuery.trim()
      ? `?search=${encodeURIComponent(searchQuery.trim())}`
      : "";

    switch (selectedCategory) {
      case "care":
        router.push(`/services${queryParam}`);
        break;
      case "agency":
        router.push(`/agencies${queryParam}`);
        break;
      case "products":
        router.push(`/marketplace${queryParam}`);
        break;
      case "jobs":
        router.push(`/jobs${queryParam}`);
        break;
      case "carers":
        router.push(`/find-care${queryParam}`);
        break;
      default:
        // Overall search across everything -> defaults to primary care directory
        router.push(`/services${queryParam}`);
        break;
    }
  };

  const totalResultsCount =
    careResults.length +
    agencyResults.length +
    jobResults.length +
    productResults.length +
    carerResults.length;

  const hasAnyQuery = searchQuery.trim().length >= 2;

  return (
    <section className="relative overflow-hidden bg-white">
      <Image
        src="/images/home-hero.png"
        alt="Care Industry"
        width={1920}
        height={1080}
        priority
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-white/0 from-[9%] via-white/60 via-[43%] to-white/90" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] px-4 pb-16 pt-12 sm:px-6 md:px-8 lg:min-h-[780px] lg:items-center lg:px-12 xl:px-20 2xl:px-24">
        <div className="flex w-full max-w-[760px] flex-col items-start gap-6 lg:gap-8">
          <div className="flex w-full flex-col items-start gap-4">
            <h3 className="text-lg font-bold leading-7 text-green-700 sm:text-xl lg:text-2xl">
              Your Trusted Care Directory
            </h3>

            <h1 className="w-full text-4xl font-bold leading-tight text-cyan-700 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
              Find. Connect. Care. <br />
              <span className="font-semibold text-slate-800">
                All in One Place
              </span>
            </h1>

            <p className="max-w-[700px] text-base leading-7 text-gray-500 sm:text-lg lg:text-2xl">
              The centralised ecosystem for the UK care industry connecting care
              companies, carers, agencies, and families with everything they
              need.
            </p>
          </div>

          {/* Search Card Container */}
          <div
            ref={containerRef}
            className="relative w-full rounded-2xl bg-[#1e3a5f]/85 px-4 py-5 shadow-[0_24px_48px_rgba(14,35,66,0.22)] outline outline-1 outline-blue-900/40 backdrop-blur-md sm:px-6 sm:py-6 lg:px-8 lg:py-8 font-['Wix_Madefor_Text']"
          >
            <form
              onSubmit={handleSearchSubmit}
              className="grid gap-4 xl:grid-cols-[1fr_1fr_180px] xl:items-end"
            >
              {/* Input 1: Postcode or Name */}
              <div className="flex flex-col gap-2.5">
                <label className="text-base font-bold leading-5 text-white">
                  Search by postcode or name
                </label>
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsDropdownOpen(true);
                    }}
                    onFocus={() => {
                      if (searchQuery.trim().length >= 2) {
                        setIsDropdownOpen(true);
                      }
                    }}
                    placeholder="Enter postcode or name"
                    className="h-14 w-full rounded-lg bg-white pl-5 pr-10 text-base text-neutral-800 outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-cyan-400 transition-all shadow-inner"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setIsDropdownOpen(false);
                        inputRef.current?.focus();
                      }}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
                      title="Clear"
                    >
                      <X className="size-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Input 2: I'm looking for (Category) */}
              <div className="flex flex-col gap-2.5">
                <label className="text-base font-bold leading-5 text-white">
                  I&apos;m looking for
                </label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      if (searchQuery.trim().length >= 2) {
                        setIsDropdownOpen(true);
                      }
                    }}
                    className="h-14 w-full appearance-none rounded-lg bg-white pl-5 pr-10 text-base font-medium text-neutral-700 outline-none focus:ring-2 focus:ring-cyan-400 transition-all cursor-pointer shadow-inner"
                  >
                    <option value="">Select what you need</option>
                    <option value="care">Care</option>
                    <option value="agency">Care Agencies</option>
                    <option value="products">Products</option>
                    <option value="jobs">Jobs</option>
                    <option value="carers">Carers</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="h-14 w-full rounded-lg bg-green-700 px-6 text-base font-semibold text-white shadow-md transition-all hover:bg-green-800 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <>
                    <Search className="size-5" />
                    <span>Search Now</span>
                  </>
                )}
              </button>
            </form>

            {/* Info Badge */}
            <div className="mt-4 flex items-center gap-2 text-white/90">
              <Lock className="h-4 w-4 shrink-0" strokeWidth={1.8} />
              <p className="text-xs font-medium leading-5 sm:text-sm">
                Carers can only be searched by someone registered
              </p>
            </div>

            {/* LIVE SEARCH RESULTS DROPDOWN */}
            {isDropdownOpen && hasAnyQuery && (
              <div className="absolute left-0 right-0 top-full mt-3 z-50 rounded-2xl bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-slate-100 max-h-[460px] overflow-y-auto animate-fade-in font-['Wix_Madefor_Text']">
                {/* Header Summary Bar */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Search className="size-4 text-cyan-700" />
                    <span className="text-sm font-bold text-slate-800">
                      Results for &ldquo;{searchQuery}&rdquo;
                    </span>
                    {selectedCategory && (
                      <span className="rounded-full bg-cyan-50 px-2.5 py-0.5 text-xs font-semibold text-cyan-700 capitalize">
                        {selectedCategory === "care"
                          ? "Care"
                          : selectedCategory === "agency"
                          ? "Care Agencies"
                          : selectedCategory === "carers"
                          ? "Carers"
                          : selectedCategory}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {isLoading ? (
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                        <Loader2 className="size-3.5 animate-spin text-cyan-700" />
                        <span>Searching...</span>
                      </div>
                    ) : (
                      <span className="text-xs font-semibold text-slate-400">
                        {totalResultsCount} found
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(false)}
                      className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                </div>

                {/* Empty State */}
                {!isLoading && totalResultsCount === 0 && (
                  <div className="py-8 text-center flex flex-col items-center gap-2">
                    <Search className="size-8 text-slate-300" />
                    <p className="text-sm font-semibold text-slate-700">
                      No matching results found
                    </p>
                    <p className="text-xs text-slate-400 max-w-sm">
                      We couldn&apos;t find any records matching &ldquo;
                      {searchQuery}&rdquo;. Try searching with another postcode
                      or name.
                    </p>
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="mt-2 text-xs font-bold text-cyan-700 hover:underline flex items-center gap-1"
                    >
                      Search all directory records anyway
                      <ArrowUpRight className="size-3.5" />
                    </button>
                  </div>
                )}

                {/* CATEGORY RESULTS LIST */}
                <div className="space-y-4">
                  {/* 1. Care Companies */}
                  {careResults.length > 0 && (
                    <ResultsGroup
                      title="Care Providers & Facilities"
                      icon={SearchCheck}
                      iconColor="text-cyan-700"
                      bgColor="bg-cyan-50"
                      viewAllHref={`/services?search=${encodeURIComponent(
                        searchQuery
                      )}`}
                      onSelect={() => setIsDropdownOpen(false)}
                      items={careResults}
                    />
                  )}

                  {/* 2. Care Agencies */}
                  {agencyResults.length > 0 && (
                    <ResultsGroup
                      title="Care Recruitment Agencies"
                      icon={Building2}
                      iconColor="text-emerald-700"
                      bgColor="bg-emerald-50"
                      viewAllHref={`/agencies?search=${encodeURIComponent(
                        searchQuery
                      )}`}
                      onSelect={() => setIsDropdownOpen(false)}
                      items={agencyResults}
                    />
                  )}

                  {/* 3. Jobs */}
                  {jobResults.length > 0 && (
                    <ResultsGroup
                      title="Care Vacancies & Jobs"
                      icon={BriefcaseBusiness}
                      iconColor="text-amber-700"
                      bgColor="bg-amber-50"
                      viewAllHref={`/jobs?search=${encodeURIComponent(
                        searchQuery
                      )}`}
                      onSelect={() => setIsDropdownOpen(false)}
                      items={jobResults}
                    />
                  )}

                  {/* 4. Products */}
                  {productResults.length > 0 && (
                    <ResultsGroup
                      title="Care Marketplace Products"
                      icon={ShoppingBag}
                      iconColor="text-purple-700"
                      bgColor="bg-purple-50"
                      viewAllHref={`/marketplace?search=${encodeURIComponent(
                        searchQuery
                      )}`}
                      onSelect={() => setIsDropdownOpen(false)}
                      items={productResults}
                    />
                  )}

                  {/* 5. Carers */}
                  {carerResults.length > 0 && (
                    <ResultsGroup
                      title="Carers"
                      icon={UserCheck}
                      iconColor="text-blue-700"
                      bgColor="bg-blue-50"
                      viewAllHref={`/find-care?search=${encodeURIComponent(
                        searchQuery
                      )}`}
                      onSelect={() => setIsDropdownOpen(false)}
                      items={carerResults}
                    />
                  )}
                </div>

                {/* Bottom Action Footer */}
                {totalResultsCount > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Press{" "}
                      <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-100 border rounded font-mono">
                        Enter
                      </kbd>{" "}
                      to view full results
                    </span>
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="px-4 py-2 bg-[#1e3a5f] hover:bg-[#152a45] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Explore all results</span>
                      <ArrowUpRight className="size-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quicklinks */}
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <QuickLink
              icon={SearchCheck}
              title="Care Providers"
              description={
                <>
                  Find trusted
                  <br />
                  care companies
                </>
              }
              iconBg="bg-cyan-700"
              href="/services"
            />
            <QuickLink
              icon={Building2}
              title="Care Agencies"
              description={
                <>
                  Connect with local
                  <br />
                  care agencies
                </>
              }
              iconBg="bg-green-700"
              href="/agencies"
            />
            <QuickLink
              icon={ShoppingBag}
              title="Products"
              description={
                <>
                  Discover care
                  <br />
                  products
                </>
              }
              iconBg="bg-purple-700"
              href="/marketplace"
            />
            <QuickLink
              icon={BriefcaseBusiness}
              title="Jobs"
              description={
                <>
                  Find care jobs
                  <br />
                  near you
                </>
              }
              iconBg="bg-amber-500"
              href="/jobs"
            />
          </div>

          <Link
            href="/signup"
            className="group flex flex-wrap items-center gap-3.5 transition-all hover:opacity-95 cursor-pointer"
            title="Join the UK care community"
          >
            <div className="flex -space-x-2.5 overflow-visible py-1">
              {communityStats.avatars.map((avatar, idx) => (
                <div
                  key={idx}
                  className="relative h-10 w-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-slate-100 transition-all duration-200 group-hover:scale-105 group-hover:shadow-md"
                  style={{ zIndex: 10 - idx }}
                  title={avatar.name}
                >
                  <img
                    src={avatar.image}
                    alt={avatar.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        DEFAULT_COMMUNITY_AVATARS[
                          idx % DEFAULT_COMMUNITY_AVATARS.length
                        ].image;
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <p className="text-base font-bold tracking-tight text-cyan-700 group-hover:text-cyan-800 transition-colors">
                Join {communityStats.totalMembers.toLocaleString()}+
              </p>
              <ArrowUpRight className="size-4 text-cyan-600 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

const ResultsGroup = ({
  title,
  icon: Icon,
  iconColor,
  bgColor,
  viewAllHref,
  items,
  onSelect,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  bgColor: string;
  viewAllHref: string;
  items: SearchResultItem[];
  onSelect: () => void;
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <div className={`p-1 rounded-md ${bgColor}`}>
            <Icon className={`size-3.5 ${iconColor}`} />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {title} ({items.length})
          </span>
        </div>
        <Link
          href={viewAllHref}
          onClick={onSelect}
          className="text-xs font-semibold text-cyan-700 hover:text-cyan-800 hover:underline flex items-center gap-1"
        >
          View all
          <ArrowUpRight className="size-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onClick={onSelect}
            className="group flex items-start gap-2.5 p-2.5 rounded-xl border border-slate-100 hover:border-cyan-600/30 hover:bg-slate-50/70 transition-all text-left"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-cyan-700 transition-colors">
                  {item.title}
                </span>
                {item.tag && (
                  <span className="shrink-0 rounded bg-slate-100 px-1.5 py-0.2 text-[9px] font-bold text-slate-500 uppercase">
                    {item.tag}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                {item.subtitle && (
                  <span className="truncate">{item.subtitle}</span>
                )}
                {item.location && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 truncate">
                      <MapPin className="size-3 text-slate-400 shrink-0" />
                      {item.location}
                    </span>
                  </>
                )}
              </div>
            </div>
            <ArrowUpRight className="size-4 text-slate-300 group-hover:text-cyan-700 group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
          </Link>
        ))}
      </div>
    </div>
  );
};

const QuickLink = ({
  icon: Icon,
  title,
  description,
  iconBg,
  href,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: React.ReactNode;
  iconBg: string;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="group flex w-full items-center gap-2 rounded-lg bg-white p-3 shadow-[4px_4px_7px_0px_rgba(0,0,0,0.15)] hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer"
    >
      <div
        className={`flex h-14 w-12 shrink-0 items-center justify-center rounded-lg ${iconBg} group-hover:scale-105 transition-transform`}
      >
        <Icon className="h-6 w-6 text-white" strokeWidth={1.8} />
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-semibold leading-4 text-neutral-700 group-hover:text-cyan-700 transition-colors">
          {title}
        </h4>
        <p className="text-xs font-normal leading-4 text-neutral-500">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default Banner;
