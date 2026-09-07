import React from "react";
import Link from "next/link";
import {
  Home,
  Search,
  HeartHandshake,
  Briefcase,
  ShoppingBag,
  Compass,
} from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | Bedders Care Ecosystem",
  description: "The page you are looking for does not exist or has been moved.",
};

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-[#0e2342] to-slate-950 px-4 py-16 sm:px-6 lg:px-8">
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Animated Badge Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10 p-4 shadow-2xl backdrop-blur-md outline outline-1 outline-white/20">
          <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-600 to-emerald-500 text-white shadow-lg">
            <Compass className="h-10 w-10 animate-spin-slow" strokeWidth={1.75} />
          </div>
        </div>

        {/* 404 Big Display */}
        <h1 className="text-7xl font-extrabold tracking-tight sm:text-8xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 drop-shadow-sm">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable. Let&apos;s help you find what you need.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-cyan-950/50 transition-all hover:from-cyan-500 hover:to-teal-500 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Home className="h-5 w-5" />
            Back to Homepage
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-md border border-white/15 transition-all hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Search className="h-5 w-5 text-cyan-400" />
            Browse Services
          </Link>
        </div>

        {/* Quick Links Card Section */}
        <div className="mt-14 rounded-2xl bg-white/5 p-6 backdrop-blur-md border border-white/10 shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
            Popular Destinations
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <QuickDestinationCard
              href="/find-care"
              icon={HeartHandshake}
              title="Find Care"
              subtitle="Explore carers & providers"
              color="text-rose-400"
            />
            <QuickDestinationCard
              href="/jobs"
              icon={Briefcase}
              title="Care Jobs"
              subtitle="Browse active job listings"
              color="text-amber-400"
            />
            <QuickDestinationCard
              href="/marketplace"
              icon={ShoppingBag}
              title="Marketplace"
              subtitle="Care products & equipment"
              color="text-emerald-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickDestinationCard({
  href,
  icon: Icon,
  title,
  subtitle,
  color,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:-translate-y-0.5 text-center"
    >
      <Icon className={`h-6 w-6 ${color} mb-2 group-hover:scale-110 transition-transform`} />
      <h3 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
        {title}
      </h3>
      <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
    </Link>
  );
}
