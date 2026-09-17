"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Building2 } from "lucide-react";

const isDemo = (name?: string | null) => {
  if (!name) return true;
  const n = name.trim().toLowerCase();
  return (
    n === "" ||
    n.includes("sunrise") ||
    n.includes("carerecruitpro") ||
    n === "care company" ||
    n === "no name" ||
    n === "demo"
  );
};

export default function CareCompanyHeaderBadge() {
  const [companyName, setCompanyName] = useState<string>(() => {
    if (typeof window !== "undefined") {
      try {
        // 1. Check local profile cache
        const cached = localStorage.getItem("bedders_care_company_profile_cache");
        if (cached) {
          const parsed = JSON.parse(cached);
          const name = parsed?.tradingName || parsed?.companyName;
          if (name && !isDemo(name)) {
            return name.trim();
          }
        }

        // 2. Check registered business info
        const biz = localStorage.getItem("bedders_business_info");
        if (biz) {
          const parsedBiz = JSON.parse(biz);
          if (parsedBiz?.companyName && !isDemo(parsedBiz.companyName)) {
            return parsedBiz.companyName.trim();
          }
        }
      } catch (e) {}
    }
    return "";
  });

  const [logoUrl, setLogoUrl] = useState<string>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("bedders_care_company_profile_cache");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed?.logo) return parsed.logo;
        }
      } catch (e) {}
    }
    return "";
  });

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const res = await fetch("/api/care-company/profile", {
          cache: "no-store",
        });

        if (res.ok) {
          const json = await res.json();
          const data = json?.data || json;
          if (isMounted && data) {
            const realName = (
              data.tradingName ||
              data.companyName ||
              data.name ||
              ""
            ).trim();

            if (realName && !isDemo(realName)) {
              setCompanyName(realName);
            }

            const logo = data.logo || data.coverPhoto || data.logoUrl;
            if (logo) {
              setLogoUrl(logo);
            }

            // Sync clean cache
            try {
              const currentCache = localStorage.getItem(
                "bedders_care_company_profile_cache"
              );
              const parsedCache = currentCache ? JSON.parse(currentCache) : {};
              localStorage.setItem(
                "bedders_care_company_profile_cache",
                JSON.stringify({
                  ...parsedCache,
                  ...data,
                  companyName: data.companyName || realName,
                  tradingName: realName,
                })
              );
            } catch (e) {}
          }
        }
      } catch (e) {}
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Link
      href="/care-company/company-profile"
      className="inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-2 pr-4 shadow-sm hover:bg-slate-50 transition-colors border border-slate-100 shrink-0 ml-4"
    >
      <div className="relative h-10 w-10 overflow-hidden rounded-full border border-cyan-700/20 bg-slate-100 shrink-0 flex items-center justify-center">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={companyName || "Care Company"}
            className="h-full w-full object-cover p-1"
          />
        ) : (
          <Building2 className="h-5 w-5 text-[#2b6ea6]" />
        )}
      </div>
      <div className="flex flex-col text-left">
        <span className="text-sm font-semibold leading-tight text-slate-800">
          {companyName || "Care Company"}
        </span>
        <span className="text-xs font-normal text-gray-500">
          Care Company
        </span>
      </div>
    </Link>
  );
}
