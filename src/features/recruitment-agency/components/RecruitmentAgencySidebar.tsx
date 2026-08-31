"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Building2,
  ClipboardList,
  ContactRound,
  LayoutDashboard,
  LogOut,
  Shield,
  Users,
  X,
} from "lucide-react";

const navigation = [
  { label: "Overview", href: "/recruitment-agency/overview", icon: LayoutDashboard },
  { label: "Agency Profile", href: "/recruitment-agency/agency-profile", icon: Building2 },
  { label: "Staffing Requests", href: "/recruitment-agency/staffing-requests", icon: ClipboardList },
  { label: "Job Management", href: "/recruitment-agency/job-management", icon: Briefcase },
  { label: "Applicant Management", href: "/recruitment-agency/applicant-management", icon: Users },
  { label: "Carer Directory", href: "/recruitment-agency/carer-directory", icon: ContactRound },
  { label: "Security", href: "/recruitment-agency/security", icon: Shield },
];

export default function RecruitmentAgencySidebar({ activeHref }: { activeHref: string }) {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
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
      <aside className="w-full shrink-0 bg-[#fbfdff] px-4 py-6 shadow-[0_4px_6px_rgba(0,0,0,0.10)] lg:sticky lg:top-0 lg:h-screen lg:w-[386px] lg:self-start lg:overflow-y-auto lg:px-[17px] flex flex-col justify-between">
        <div>
          <Image
            src="/images/logo.png"
            alt="Bedders69"
            width={60}
            height={60}
            className="mx-auto h-[60px] w-[60px] object-contain"
            priority
          />
          <nav className="mt-[46px] grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {navigation.map(({ label, href, icon: Icon }) => {
              const active = href === activeHref;
              return (
                <Link
                  key={label}
                  href={href}
                  className={`flex h-[56px] items-center gap-3.5 rounded-lg px-6 text-base transition-colors ${
                    active
                      ? "bg-cyan-700 font-bold text-white shadow-[0_4px_6px_rgba(14,116,144,0.15)]"
                      : "font-normal text-slate-800 hover:bg-[#eef4f8]"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" strokeWidth={active ? 2.2 : 1.8} />
                  <span className="whitespace-nowrap">{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Log Out Button */}
        <div className="pt-6 border-t border-neutral-100">
          <button
            type="button"
            onClick={() => setShowLogoutModal(true)}
            className="flex h-[50px] w-full items-center gap-3 rounded-lg px-6 text-base text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer text-left"
          >
            <LogOut className="h-5 w-5 shrink-0" strokeWidth={1.8} />
            <span>Log Out</span>
          </button>
        </div>
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
                  Are you sure you want to log out from your agency account?
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              You will need to sign in again to manage your agency profile, placements, and candidate directory.
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
