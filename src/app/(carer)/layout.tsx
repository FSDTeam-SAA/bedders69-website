import React from "react";
import Link from "next/link";
import { User, Briefcase, Calendar, MessageSquare, LogOut, Bell } from "lucide-react";
import { Button } from "@/components/button";

export default function CarersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans relative">
      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-[30%] h-[30%] rounded-full bg-emerald-950/20 blur-[100px] pointer-events-none" />

      {/* Carer Portal Navbar */}
      <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-500/20">
                C
              </div>
              <span className="font-semibold text-lg tracking-tight hover:text-emerald-400 transition-colors">
                Carers Portal
              </span>
            </Link>
            <span className="h-5 w-[1px] bg-zinc-800" />
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950/50 border border-emerald-900/50 text-emerald-400 uppercase tracking-wider">
              Carer Mode
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/carers" className="text-sm font-medium text-zinc-200 hover:text-emerald-400 transition-colors flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Schedule
            </Link>
            <Link href="/carers/jobs" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
              <Briefcase className="h-4 w-4" /> Available Jobs
            </Link>
            <Link href="/carers/messages" className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
              <MessageSquare className="h-4 w-4" /> Messages
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
            </button>
            <div className="h-8 w-[1px] bg-zinc-800" />
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300 font-semibold border border-zinc-700">
                JD
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-zinc-200">John Doe</p>
                <p className="text-xs text-zinc-500">Verified Carer</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-red-400 hover:bg-red-950/20 p-2 h-9 w-9 rounded-xl">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Portal Layout Container */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <main className="z-10">{children}</main>
      </div>

      {/* Simple Portal Footer */}
      <footer className="border-t border-zinc-900 py-6 bg-zinc-950/50 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-xs text-zinc-650">
          <p>&copy; {new Date().getFullYear()} Bedders69 Carers Portal.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Support Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
