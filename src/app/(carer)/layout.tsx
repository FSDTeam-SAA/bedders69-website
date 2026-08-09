"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BadgeCheck,
  Bell,
  BookmarkPlus,
  Briefcase,
  FileText,
  LayoutDashboard,
  LogOut,
  Save,
  Shield,
  UserCircle2,
} from "lucide-react";
import Image from "next/image";

const standaloneOnboardingRoutes: string[] = [];

const navigationItems = [
  { href: "/carers", label: "Overview", icon: LayoutDashboard },
  { href: "/carers/jobs", label: "Job Board", icon: Briefcase },
  { href: "/carers/professional-information", label: "Professional Profile", icon: BadgeCheck },
  { href: "/carers/upload-documents", label: "Documents", icon: FileText },
  { href: "/carers/my-applications", label: "My Applications", icon: BookmarkPlus },
  { href: "/carers/saved-jobs", label: "Saved Jobs", icon: Save },
  { href: "/carers/profile", label: "My Profile", icon: UserCircle2 },
  { href: "/carers/security", label: "Security", icon: Shield },
];

const headerContent: Record<string, { title: string; description: string }> = {
  "/carers": {
    title: "Overview",
    description:
      "View your profile summary, application status, and recent activity at a glance.",
  },
  "/carers/jobs": {
    title: "Job Board",
    description:
      "Find and apply for care jobs that match your skills and location.",
  },
  "/carers/profile": {
    title: "My Profile",
    description: "Manage your personal information and contact details.",
  },
  "/carers/professional-information": {
    title: "Professional Profile",
    description: "Manage your experience, skills, and care work preferences.",
  },
  "/carers/my-applications": {
    title: "My Applications",
    description: "Track your submitted applications and their latest status.",
  },
  "/carers/upload-documents": {
    title: "Documents",
    description: "Upload and manage your professional documents and certifications.",
  },
  "/carers/saved-jobs": {
    title: "Saved Jobs",
    description:
      "Keep track of jobs you're interested in. Review saved opportunities and apply whenever you're ready.",
  },
  "/carers/security": {
    title: "Security",
    description: "Manage your account security and login preferences.",
  },
};

export default function CarersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const currentHeader = pathname.startsWith("/carers/profile")
    ? headerContent["/carers/profile"]
    : pathname.startsWith("/carers/professional-information")
      ? headerContent["/carers/professional-information"]
    : pathname.startsWith("/carers/my-applications")
      ? headerContent["/carers/my-applications"]
    : pathname.startsWith("/carers/upload-documents")
      ? headerContent["/carers/upload-documents"]
    : pathname.startsWith("/carers/saved-jobs")
      ? headerContent["/carers/saved-jobs"]
    : pathname.startsWith("/carers/security")
      ? headerContent["/carers/security"]
    : pathname.startsWith("/carers/jobs")
      ? headerContent["/carers/jobs"]
      : headerContent["/carers"];

  if (standaloneOnboardingRoutes.some((route) => pathname.startsWith(route))) {
    return children;
  }

  function handleLogout() {
    setIsLogoutModalOpen(false);
    router.push("/");
  }

  return (
    <div className="min-h-screen overflow-hidden bg-white text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden h-screen w-[304px] shrink-0 flex-col justify-between bg-[#eaf6ff] xl:flex">
          <div className="flex flex-1 flex-col gap-10 p-5">
            <Link
              href="/carers"
              className="inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white/70 ml-20"
            >
              <Image
                src="/images/logo.png"
                width={64}
                height={64}
                alt="Bedders69 logo"
                className="h-16 w-16 object-contain"
              />
            </Link>

            <nav className="flex flex-col gap-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/carers"
                    ? pathname === item.href
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center gap-3 rounded-lg p-4 text-[13px] leading-5 transition-colors ${
                      isActive
                        ? "bg-cyan-700 text-white"
                        : "text-slate-800 hover:bg-white/70"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <button
            type="button"
            onClick={() => setIsLogoutModalOpen(true)}
            className="inline-flex items-center text-center gap-2 border-t border-neutral-100 bg-red-500/10 p-5 text-[13px] text-red-500 transition hover:bg-red-500/15 cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-base">Log Out</span>
          </button>
        </aside>

        <div className="flex h-screen flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="sticky top-0 z-20 bg-white">
              <div className="inline-flex w-full items-center gap-2.5 bg-cyan-700/10 px-6 py-5 sm:px-8 xl:px-10">
                <div className="flex-1">
                  <h1 className="text-3xl font-semibold leading-10 text-black">
                    {currentHeader.title}
                  </h1>
                  <p className="text-xl font-normal leading-6 text-slate-700">
                    {currentHeader.description}
                  </p>
                </div>
                <button className="inline-flex items-center justify-center rounded-[61px] bg-white p-3 text-slate-700 shadow-sm">
                  <Bell className="h-8 w-8" strokeWidth={1.8} />
                </button>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>

      {isLogoutModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/25 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold leading-10 text-slate-800">Log Out</h2>
              <p className="text-base leading-6 text-gray-500">
                Are you sure you want to log out of your account?
              </p>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(false)}
                className="inline-flex min-w-[120px] items-center justify-center rounded-lg border border-cyan-700 px-6 py-3 text-base font-medium leading-5 text-cyan-700 transition hover:bg-cyan-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex min-w-[120px] items-center justify-center rounded-lg bg-red-500 px-6 py-3 text-base font-medium leading-5 text-white transition hover:bg-red-600 cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
