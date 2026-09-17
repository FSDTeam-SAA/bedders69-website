"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Building2 } from "lucide-react";

export default function AgencyHeaderBadge() {
  const [agencyName, setAgencyName] = useState<string>("Agency");
  const [logoUrl, setLogoUrl] = useState<string>("");

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const res = await fetch("/api/recruitment-agency/agency-profile", {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data) {
            if (data.name) setAgencyName(data.name);
            const logo = data.logoUrl || data.logo || data.profilePicture;
            if (logo) setLogoUrl(logo);
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
      href="/recruitment-agency/agency-profile"
      className="inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-2 pr-4 shadow-sm hover:bg-slate-50 transition-colors border border-slate-100 shrink-0 ml-4"
    >
      <div className="relative h-10 w-10 overflow-hidden rounded-full border border-cyan-700/20 bg-slate-100 shrink-0 flex items-center justify-center">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={agencyName}
            className="h-full w-full object-cover"
          />
        ) : (
          <Building2 className="h-5 w-5 text-cyan-700" />
        )}
      </div>
      <div className="flex flex-col text-left">
        <span className="text-sm font-semibold leading-tight text-slate-800">
          {agencyName}
        </span>
        <span className="text-xs font-normal text-gray-500">
          Agency
        </span>
      </div>
    </Link>
  );
}
