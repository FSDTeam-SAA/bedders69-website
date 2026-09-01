"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bookmark,
  Briefcase,
  Building2,
  ContactRound,
  FilePlus2,
  LayoutDashboard,
  LogOut,
  Medal,
  Settings,
  UsersRound,
  X,
} from "lucide-react";

const navigation = [
  { label: "Dashboard Overview", href: "/care-company/dashboard-overview", icon: LayoutDashboard },
  { label: "Company Profile", href: "/care-company/company-profile", icon: Building2 },
  { label: "Saved Carers", href: "/care-company/save-carers", icon: Bookmark },
  { label: "My Job Posts", href: "/care-company/job-posts", icon: Briefcase },
  { label: "Create Job", href: "/care-company/create-job", icon: FilePlus2 },
  { label: "Applicants", href: "/care-company/applicants", icon: UsersRound },
  { label: "Contact Requests", href: "/care-company/contact-requests", icon: ContactRound },
  { label: "Membership", href: "/care-company/membership", icon: Medal },
  { label: "Settings", href: "/care-company/settings", icon: Settings },
];

export default function CareCompanySidebar({ activeHref }: { activeHref: string }) {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      // Clear cookies on client side as fallback
      document.cookie = "bedders_role=; path=/; max-age=0";
      document.cookie = "bedders_access_token=; path=/; max-age=0";
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setShowLogoutModal(false);
      setIsLoggingOut(false);
      router.replace("/login");
      router.refresh();
    }
  };

  return (
    <>
      <aside className="w-full shrink-0 bg-[#fbfdff] px-4 py-6 shadow-[0_4px_6px_rgba(0,0,0,0.10)] lg:sticky lg:top-0 lg:h-screen lg:w-[386px] lg:self-start lg:overflow-y-auto lg:px-[17px]">
        <Image
          src="/images/logo.png"
          alt="Bedders69"
          width={60}
          height={60}
          className="mx-auto h-[60px] w-[60px] object-contain"
          priority
        />
        <nav className="mt-[46px] grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {navigation.map(({ label, href, icon: Icon }) => {
            const active = href === activeHref;
            return (
              <Link
                key={label}
                href={href}
                className={`flex h-[60px] items-center gap-4 rounded-lg px-8 text-lg transition-colors ${
                  active
                    ? "bg-[#2b6ea6] font-bold text-white shadow-[0_4px_6px_rgba(43,110,166,0.10)]"
                    : "font-normal text-[#667481] hover:bg-[#eef4f8]"
                }`}
              >
                <Icon className="h-6 w-6 shrink-0" strokeWidth={active ? 2.2 : 1.7} />
                <span className="whitespace-nowrap">{label}</span>
              </Link>
            );
          })}

          {/* Log Out Button */}
          <button
            type="button"
            onClick={() => setShowLogoutModal(true)}
            className="flex h-[60px] w-full items-center gap-4 rounded-lg px-8 text-lg text-[#2b6ea6] hover:bg-[#eef4f8] transition-colors cursor-pointer text-left"
          >
            <LogOut className="h-6 w-6 shrink-0" strokeWidth={1.8} />
            <span>Log Out</span>
          </button>
        </nav>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-neutral-100 flex flex-col gap-5">
            <button
              type="button"
              onClick={() => setShowLogoutModal(false)}
              className="absolute right-5 top-5 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shrink-0">
                <LogOut className="size-6" strokeWidth={2} />
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="text-xl font-bold text-slate-800">
                  Log Out
                </h3>
                <p className="text-xs text-gray-500">
                  Are you sure you want to log out from your account?
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              You will need to enter your credentials again to access your company dashboard and recruitment pipeline.
            </p>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3 rounded-lg border border-neutral-300 text-slate-700 text-sm font-semibold hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                disabled={isLoggingOut}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                {isLoggingOut ? "Logging out..." : "Log Out"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
