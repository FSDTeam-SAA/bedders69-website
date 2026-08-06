import React from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import { Button } from "@/components/button";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-blue-500 selection:text-white overflow-hidden relative">
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-zinc-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
                N
              </div>
              <span className="font-semibold text-lg tracking-tight hover:text-blue-400 transition-colors">
                Bedders69 Website
              </span>
            </Link>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/services" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Services
            </Link>
            <Link href="/marketplace" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Marketplace
            </Link>
            <Link href="/jobs" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Jobs
            </Link>
            <Link href="/carers" className="text-sm text-zinc-400 hover:text-white transition-colors font-medium text-blue-400">
              For Carers
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
              Docs
            </Button>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 z-10">{children}</main>

      {/* Footer */}
      <footer className="border-t border-zinc-900/80 py-8 bg-zinc-950/50 backdrop-blur-md z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-600">
            &copy; {new Date().getFullYear()} Bedders69. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <a href="https://nextjs.org" target="_blank" rel="noreferrer" className="hover:text-zinc-300 transition-colors">
              Next.js Docs
            </a>
            <a href="https://tailwindcss.com" target="_blank" rel="noreferrer" className="hover:text-zinc-300 transition-colors">
              Tailwind CSS
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
